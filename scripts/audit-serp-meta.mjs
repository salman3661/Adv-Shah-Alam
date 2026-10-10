/**
 * scripts/audit-serp-meta.mjs
 *
 * Mobile-SERP meta audit for every published article (EN + BN, redirect sources excluded).
 *   - title length   : must be <= 55 characters (Google truncates mobile titles by pixel width; ~55 chars is the safe budget)
 *   - self-promotion : brand / "best lawyer" / contact-call-to-action text in <title> or meta description
 *   - missing        : empty metaTitle / metaDescription (runtime would render a blank <title>)
 *
 * Applies seo/meta-overrides.json (exact, editor-approved copy) with --apply-overrides,
 * and a conservative, rule-based clean-up of the remaining titles with --fix-titles:
 *   1. strip brand suffix/prefix (" | Advocate ...", " - Advocate ...") and bracketed teaser tails "[...]" / "(…)"
 *   2. if still > 55, cut at the last natural separator (: | - – — ? ,) that leaves >= 25 chars
 *   3. otherwise leave untouched and list it for a human editor (never truncate mid-phrase)
 *
 *   node scripts/audit-serp-meta.mjs [--apply-overrides] [--fix-titles] [--list]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const ARGS = new Set(process.argv.slice(2));
const MAX_TITLE = 55;
const vercel = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));
const redirectSources = new Set((vercel.redirects || []).filter((r) => !r.has).map((r) => r.source));
const DIRS = { en: path.join(ROOT, 'src/content/posts/en'), bn: path.join(ROOT, 'src/content/posts/bn') };
const PREFIX = { en: '/blog/', bn: '/bn/blog/' };

// self-promotion / brand patterns (title + description)
const PROMO = [
  /অ্যাডভোকেট\s*(মো\.?|মোঃ)?\s*শাহ\s*আলম/u, /এডভোকেট\s*(মো\.?|মোঃ)?\s*শাহ\s*আলম/u, /শাহ\s*আলম/u,
  /Shah\s*Alam/i, /Advocate\s+Md/i, /Law\s+Chambers?/i, /Supreme\s+Court\s+(lawyer|advocate)/i,
  /\bbest\s+(lawyer|advocate)/i, /\btop\s+(lawyer|advocate)/i, /\bhire\s+(a\s+)?(lawyer|advocate)/i,
  /call\s+now|contact\s+(us|now)|free\s+consult|book\s+(a\s+)?consult/i,
  /সেরা\s*(আইনজীবী|উকিল)/u, /আমাদের\s*(চেম্বার|আইনজীবী|ফার্ম)/u, /ফ্রি\s*(পরামর্শ|কনসাল্ট)/u, /যোগাযোগ\s*করুন/u,
];
const BRAND_TAIL = /\s*[|\-–—•]\s*(Advocate|অ্যাডভোকেট|এডভোকেট|Law Chambers?|Adv\.?|Shah Alam|শাহ আলম)[^|]*$/iu;
const BRACKET_TAIL = /\s*[\[\(（【][^\]\)）】]*[\]\)）】]\s*$/u;
// Natural title break points only: spaced dash / pipe ("A | B", "A – B"), colon, question mark. Never a hyphen inside a word, never a comma.
const CUT_POINTS = /(\s[|–—-]\s)|([:?])(?=\s)/g;

const len = (s) => [...String(s || '')].length;
const promoHit = (s) => PROMO.some((re) => re.test(s || ''));

function loadAll() {
  const out = [];
  for (const lang of ['en', 'bn']) {
    for (const f of fs.readdirSync(DIRS[lang]).filter((x) => x.endsWith('.json'))) {
      const file = path.join(DIRS[lang], f);
      let raw; let j;
      try { raw = fs.readFileSync(file, 'utf8'); j = JSON.parse(raw.replace(/^\uFEFF/, '')); } catch { continue; }
      if (!j || !j.slug || j.isDraft || j._draft) continue;
      if (redirectSources.has(PREFIX[lang] + j.slug)) continue;
      out.push({ lang, file, raw, j });
    }
  }
  return out;
}

/** Replace a top-level JSON string property value in raw text, preserving every other byte of the file. */
function setProp(raw, key, value) {
  const re = new RegExp(`("${key}"\\s*:\\s*)"(?:[^"\\\\]|\\\\.)*"`);
  if (!re.test(raw)) return null;
  const out = raw.replace(re, (_, pre) => `${pre}${JSON.stringify(value)}`);
  JSON.parse(out.replace(/^\uFEFF/, ''));
  return out;
}

function suggestTitle(title, lang) {
  let t = String(title || '').trim();
  t = t.replace(BRAND_TAIL, '').replace(BRACKET_TAIL, '').trim();
  if (len(t) <= MAX_TITLE) return t;
  // EN titles carry the search keyword before the first break; cutting loses intent -> human editor.
  if (lang === 'en') return null;
  // cut at the last natural break point that keeps a meaningful head (25..55 chars)
  let best = null;
  for (const m of t.matchAll(CUT_POINTS)) {
    const head = t.slice(0, m[2] === '?' ? m.index + 1 : m.index).trim();
    const n = len(head);
    if (n >= 25 && n <= MAX_TITLE) best = head;
  }
  if (best) {
    const cut = best.replace(/[\s:|\-–—,]+$/u, '').trim();
    if (len(cut) >= 25) return cut;
  }
  return null; // needs a human
}

const posts = loadAll();

// --- 1. editor-approved overrides ------------------------------------------------------------------
if (ARGS.has('--apply-overrides')) {
  const ov = JSON.parse(fs.readFileSync(path.join(ROOT, 'seo', 'meta-overrides.json'), 'utf8')).overrides;
  let n = 0;
  for (const o of ov) {
    const rec = posts.find((p) => p.lang === o.lang && p.j.slug === o.slug);
    if (!rec) { console.log('  override target missing:', o.lang, o.slug); continue; }
    let raw = rec.raw;
    if (o.metaTitle) raw = setProp(raw, 'metaTitle', o.metaTitle) ?? raw;
    if (o.metaDescription) raw = setProp(raw, 'metaDescription', o.metaDescription) ?? raw;
    if (raw !== rec.raw) { fs.writeFileSync(rec.file, raw); rec.raw = raw; rec.j = JSON.parse(raw.replace(/^\uFEFF/, '')); n++; }
    console.log(`  override ${o.slug}: title ${len(o.metaTitle)} chars`);
    if (len(o.metaTitle) > MAX_TITLE) console.log('    WARNING: override title exceeds', MAX_TITLE);
  }
  console.log(`[serp-meta] overrides applied to ${n} file(s)`);
}

// --- 2. rule-based clean-up -------------------------------------------------------------------------
const DRY = ARGS.has('--dry');
const needsHuman = [];
const samples = [];
let fixed = 0;
if (ARGS.has('--fix-titles')) {
  const protectedSlugs = new Set(JSON.parse(fs.readFileSync(path.join(ROOT, 'seo', 'meta-overrides.json'), 'utf8')).overrides.map((o) => o.slug));
  for (const rec of posts) {
    if (protectedSlugs.has(rec.j.slug)) continue;
    const title = rec.j.metaTitle || '';
    if (!title) continue;
    if (len(title) <= MAX_TITLE && !promoHit(title)) continue;
    const s = suggestTitle(title, rec.lang);
    if (s && s !== title && len(s) <= MAX_TITLE && !promoHit(s)) {
      if (DRY) { fixed++; samples.push([`${rec.lang}:${rec.j.slug}`, title, s]); continue; }
      const raw = setProp(rec.raw, 'metaTitle', s);
      if (raw) { fs.writeFileSync(rec.file, raw); rec.raw = raw; rec.j.metaTitle = s; fixed++; }
    } else needsHuman.push(rec);
  }
  console.log(`[serp-meta] titles ${DRY ? 'that WOULD be ' : ''}auto-fixed: ${fixed}; left for a human editor: ${needsHuman.length}`);
  const outFile = DRY ? (process.env.SAMPLES_OUT || path.join(ROOT, 'seo', '_title_samples.json')) : path.join(ROOT, 'seo', 'serp-meta-needs-human.json');
  fs.writeFileSync(outFile, JSON.stringify({ samples, needsHuman: needsHuman.map((r) => ({ id: `${r.lang}:${r.j.slug}`, metaTitle: r.j.metaTitle, chars: len(r.j.metaTitle) })) }, null, 1) + '\n');
}


// --- 3. report ---------------------------------------------------------------------------------------
const stats = { total: posts.length, longTitle: [], promoTitle: [], promoDesc: [], noTitle: [], noDesc: [] };
for (const { lang, j } of posts) {
  const id = `${lang}:${j.slug}`;
  if (!j.metaTitle) stats.noTitle.push(id); else {
    if (len(j.metaTitle) > MAX_TITLE) stats.longTitle.push(`${id} (${len(j.metaTitle)})`);
    if (promoHit(j.metaTitle)) stats.promoTitle.push(id);
  }
  if (!j.metaDescription) stats.noDesc.push(id); else if (promoHit(j.metaDescription)) stats.promoDesc.push(id);
}
console.log(`[serp-meta] published posts audited: ${stats.total}`);
console.log(`  title > ${MAX_TITLE} chars : ${stats.longTitle.length}`);
console.log(`  promo text in title   : ${stats.promoTitle.length}`);
console.log(`  promo text in desc    : ${stats.promoDesc.length}`);
console.log(`  missing title / desc  : ${stats.noTitle.length} / ${stats.noDesc.length}`);
if (ARGS.has('--list')) {
  fs.writeFileSync(path.join(ROOT, 'seo', 'serp-meta-todo.json'), JSON.stringify(stats, null, 2) + '\n');
  console.log('  wrote seo/serp-meta-todo.json');
}
process.exit(stats.longTitle.length || stats.promoTitle.length || stats.noTitle.length ? 1 : 0);
