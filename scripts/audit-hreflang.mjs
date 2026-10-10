/**
 * scripts/audit-hreflang.mjs
 *
 * Audits & repairs bilingual (EN <-> BN) post pairs declared via `enSlug` (on BN posts) / `bnSlug` (on EN posts).
 *
 * Rules enforced:
 *   1. a declared partner must exist, be published, and not be a 301 source (hreflang to a 404/redirect is ignored by Google
 *      and can invalidate the whole annotation set)
 *   2. pairs must be reciprocal (A -> B implies B -> A) - Google requires return links
 *   3. a BN/EN post pair that shares an identical slug is materialised as an explicit pair so runtime (React Helmet)
 *      and pre-rendered HTML emit exactly the same tags
 *
 * With --fix:
 *   - dead partners are set to null (field kept, so history is visible in git diff)
 *   - missing reciprocal fields are written into the partner JSON (raw-text edit, formatting kept)
 *   - many-to-one conflicts (two BN posts claim one EN post) are NOT auto-resolved, only reported
 *
 *   node scripts/audit-hreflang.mjs [--fix]
 * Exit code 1 when problems remain.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const FIX = process.argv.includes('--fix');
const DIRS = { en: path.join(ROOT, 'src/content/posts/en'), bn: path.join(ROOT, 'src/content/posts/bn') };
const vercel = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));
const redirectSources = new Set((vercel.redirects || []).filter((r) => !r.has).map((r) => r.source));
const PREFIX = { en: '/blog/', bn: '/bn/blog/' };
const FIELD = { en: 'bnSlug', bn: 'enSlug' }; // field stored on a post of <lang>, pointing to the OTHER language
const other = (l) => (l === 'en' ? 'bn' : 'en');

const load = (lang) => {
  const m = new Map();
  for (const f of fs.readdirSync(DIRS[lang]).filter((x) => x.endsWith('.json'))) {
    try {
      const raw = fs.readFileSync(path.join(DIRS[lang], f), 'utf8');
      const j = JSON.parse(raw.replace(/^\uFEFF/, ''));
      if (j && j.slug) m.set(j.slug, { j, file: path.join(DIRS[lang], f), raw });
    } catch { /* ignore broken files */ }
  }
  return m;
};
const posts = { en: load('en'), bn: load('bn') };
const live = (lang, slug) => {
  const r = posts[lang].get(slug);
  return Boolean(r && !r.j.isDraft && !r.j._draft && !redirectSources.has(PREFIX[lang] + slug));
};
const partnerOf = (lang, slug) => posts[lang].get(slug)?.j[FIELD[lang]] || null;

function writeField(lang, slug, value) {
  const rec = posts[lang].get(slug);
  const field = FIELD[lang];
  const val = value === null ? 'null' : JSON.stringify(value);
  let out;
  const existing = new RegExp(`("${field}"\\s*:\\s*)(null|"[^"]*")`);
  if (existing.test(rec.raw)) out = rec.raw.replace(existing, `$1${val}`);
  else {
    const re = /("slug"\s*:\s*"[^"]*"\s*,)(\r?\n)([ \t]*)/;
    if (!re.test(rec.raw)) return false;
    out = rec.raw.replace(re, `$1$2$3"${field}": ${val},$2$3`);
  }
  JSON.parse(out.replace(/^\uFEFF/, '')); // sanity
  fs.writeFileSync(rec.file, out);
  rec.raw = out;
  rec.j[field] = value;
  return true;
}

const report = { manual: [], dead: [], implicit: [], missingBack: [], conflict: [], pairs: 0 };

// pass 0: editorial overrides (seo/hreflang-pairs.json: { "<bn-slug>": "<en-slug>" }) - force both directions
const manualPath = path.join(ROOT, 'seo', 'hreflang-pairs.json');
if (fs.existsSync(manualPath)) {
  const manual = JSON.parse(fs.readFileSync(manualPath, 'utf8')).pairs || {};
  for (const [bnSlug, enSlug] of Object.entries(manual)) {
    if (!live('bn', bnSlug) || !live('en', enSlug)) { report.conflict.push(`manual pair not live: BN ${bnSlug} <-> EN ${enSlug}`); continue; }
    if (partnerOf('bn', bnSlug) === enSlug && partnerOf('en', enSlug) === bnSlug) continue;
    report.manual.push(`BN ${bnSlug} <-> EN ${enSlug}`);
    if (FIX) { writeField('bn', bnSlug, enSlug); writeField('en', enSlug, bnSlug); }
  }
}


// pass 1: dead partners
for (const lang of ['en', 'bn']) {
  for (const [slug] of posts[lang]) {
    if (!live(lang, slug)) continue;
    const p = partnerOf(lang, slug);
    if (p && !live(other(lang), p)) {
      report.dead.push(`${lang.toUpperCase()} ${slug} -> ${other(lang).toUpperCase()} ${p}`);
      if (FIX) writeField(lang, slug, null);
    }
  }
}
// pass 2: implicit same-slug pairs (neither side declares a partner)
for (const [slug] of posts.bn) {
  if (!live('bn', slug) || !live('en', slug)) continue;
  if (!partnerOf('bn', slug) && !partnerOf('en', slug)) {
    report.implicit.push(slug);
    if (FIX) { writeField('bn', slug, slug); writeField('en', slug, slug); }
  }
}
// pass 3: reciprocity
for (const lang of ['en', 'bn']) {
  for (const [slug] of posts[lang]) {
    if (!live(lang, slug)) continue;
    const p = partnerOf(lang, slug);
    if (!p || !live(other(lang), p)) continue;
    const back = partnerOf(other(lang), p);
    if (back === slug) { if (lang === 'bn') report.pairs++; continue; }
    if (!back) {
      report.missingBack.push(`${lang.toUpperCase()} ${slug} -> ${other(lang).toUpperCase()} ${p}`);
      if (FIX) { writeField(other(lang), p, slug); if (lang === 'bn') report.pairs++; }
    } else {
      report.conflict.push(`${lang.toUpperCase()} ${slug} -> ${other(lang).toUpperCase()} ${p}, but ${other(lang).toUpperCase()} ${p} points to ${back}`);
    }
  }
}

console.log(`[hreflang] ${FIX ? 'FIX mode' : 'audit mode'} | reciprocal pairs: ${report.pairs}`);
console.log(`[hreflang] dead partners: ${report.dead.length} | implicit same-slug pairs: ${report.implicit.length} | missing back-links: ${report.missingBack.length} | conflicts: ${report.conflict.length}`);
if (!FIX) {
  report.manual.forEach((x) => console.log('  MANUAL       ' + x));
  report.dead.forEach((x) => console.log('  DEAD         ' + x));
  report.implicit.forEach((x) => console.log('  IMPLICIT     ' + x));
  report.missingBack.forEach((x) => console.log('  MISSING-BACK ' + x));
}
report.conflict.forEach((x) => console.log('  CONFLICT     ' + x));
const remaining = FIX ? report.conflict.length : report.manual.length + report.dead.length + report.implicit.length + report.missingBack.length + report.conflict.length;
process.exit(remaining ? 1 : 0);
