#!/usr/bin/env node
/**
 * scripts/stage-b/apply-redirects.mjs — Stage B 301 consolidation (idempotent)
 *
 *   node scripts/stage-b/apply-redirects.mjs           apply + validate
 *   node scripts/stage-b/apply-redirects.mjs --check   validate only (exit 1 on problems)
 *
 * For seo/stage-b-clusters.json it:
 *  1. writes permanent 301 rules (never 302, never deletes content) into vercel.json
 *  2. flattens any existing redirect whose DESTINATION is a now-redirected source (no chains)
 *  3. rewrites internal links in post/content/public files from source -> master
 *     (source pages themselves are not served, so they are left untouched)
 *  4. drops hreflang twin pointers (enSlug/bnSlug) that referenced a redirected source,
 *     so no hreflang points at a 301 URL
 *  5. never adds noindex; never touches sitemap.xml (generate_sitemap.js already excludes
 *     every vercel.json redirect source when the site is built)
 */
import fs from 'node:fs';
import path from 'node:path';
import { assertLiveUrl } from '../qa/url-truth.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const CHECK = process.argv.includes('--check');
const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'seo/stage-b-clusters.json'), 'utf8'));
const vPath = path.join(ROOT, 'vercel.json');
const vercel = JSON.parse(fs.readFileSync(vPath, 'utf8'));

const wanted = new Map(); const masters = new Set(); const problems = [];
for (const c of cfg.clusters) {
  assertLiveUrl(c.master);
  masters.add(c.master);
  for (const s of c.sources) {
    assertLiveUrl(s);
    wanted.set(s, c.master);
  }
}
for (const m of masters) {
  if (wanted.has(m)) problems.push(`master is also a source: ${m}`);
  const f = m.startsWith('/bn/') ? `src/content/posts/bn/${m.slice(9)}.json` : `src/content/posts/en/${m.slice(6)}.json`;
  if (!fs.existsSync(path.join(ROOT, f))) problems.push(`master post missing: ${f}`);
}
const isPlain = (r) => !r.has && !/[:*(]/.test(r.source);

let added = 0, flattened = 0;
vercel.redirects = (vercel.redirects || []).filter((r) => !(isPlain(r) && masters.has(r.source)));
const have = new Map(vercel.redirects.filter(isPlain).map((r) => [r.source, r]));
for (const [src, dest] of wanted) {
  const r = have.get(src);
  if (r) { if (r.destination !== dest || r.statusCode !== 301) { r.destination = dest; r.statusCode = 301; delete r.permanent; added++; } }
  else { vercel.redirects.push({ source: src, destination: dest, statusCode: 301 }); added++; }
}
const table = new Map(vercel.redirects.filter(isPlain).map((r) => [r.source, r]));
const resolve = (u) => { const seen = new Set(); while (table.has(u)) { if (seen.has(u)) { problems.push(`loop at ${u}`); return u; } seen.add(u); u = table.get(u).destination; } return u; };
for (const r of vercel.redirects) {
  if (!r.destination || /^https?:/.test(r.destination)) continue;
  const fin = resolve(r.destination);
  if (fin !== r.destination) { r.destination = fin; flattened++; }
}
for (const r of vercel.redirects) {
  if (!isPlain(r)) continue;
  if (r.source === r.destination) problems.push(`self redirect ${r.source}`);
  if (table.has(r.destination)) problems.push(`chain ${r.source} -> ${r.destination}`);
  if (r.statusCode !== 301 && wanted.has(r.source)) problems.push(`non-301 for ${r.source}`);
}
const dups = vercel.redirects.filter(isPlain).map((r) => r.source).filter((s, i, a) => a.indexOf(s) !== i && wanted.has(s)); // pre-existing unrelated duplicates are not ours to fix
if (dups.length) problems.push(`duplicate sources ${[...new Set(dups)]}`);

// ── internal link rewrite (raw text, formatting untouched) ──
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\\-]/g, '\\$&');
const keys = [...wanted.keys()].sort((a, b) => b.length - a.length);
const re = new RegExp(`(${keys.map(esc).join('|')})(?![A-Za-z0-9_-])`, 'g');
const sourceFiles = new Set([...wanted.keys()].map((s) => (s.startsWith('/bn/') ? `src/content/posts/bn/${s.slice(9)}.json` : `src/content/posts/en/${s.slice(6)}.json`)));
const SKIP = /posts-meta-(en|bn)\.json$|related-links-(en|bn)\.json$|ga4_summary\.json$|blog-(en|bn)-index\.json$|node_modules|sitemap\.xml$/;
const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p); else if (/\.(json|jsx|js|md|txt)$/.test(e.name) && !SKIP.test(p)) files.push(p);
  }
})(path.join(ROOT, 'src'));
files.push(path.join(ROOT, 'public/llms.txt'));
let rewritten = 0, filesTouched = 0;
const touched = [];
for (const f of files) {
  const rel = path.relative(ROOT, f);
  if (sourceFiles.has(rel) || !fs.existsSync(f)) continue;
  const txt = fs.readFileSync(f, 'utf8');
  let n = 0;
  const out = txt.replace(re, (m) => { n++; return wanted.get(m); });
  if (n) {
    rewritten += n; filesTouched++; touched.push(`${rel} (${n})`);
    if (!CHECK) fs.writeFileSync(f, out, 'utf8');
  }
}

// ── hreflang twins that point at a redirected source ──
const srcSlugs = new Set([...wanted.keys()].map((s) => s.split('/').pop()));
const twinFixes = [];
for (const lang of ['en', 'bn']) {
  const dir = path.join(ROOT, 'src/content/posts', lang);
  for (const fn of fs.readdirSync(dir).filter((x) => x.endsWith('.json'))) {
    const rel = `src/content/posts/${lang}/${fn}`;
    if (sourceFiles.has(rel)) continue;
    const raw = fs.readFileSync(path.join(dir, fn), 'utf8');
    const d = JSON.parse(raw.replace(/^\uFEFF/, ''));
    const field = lang === 'en' ? 'bnSlug' : 'enSlug';
    if (d[field] && srcSlugs.has(d[field])) {
      twinFixes.push(`${rel}: dropped ${field}="${d[field]}"`);
      if (!CHECK) { delete d[field]; fs.writeFileSync(path.join(dir, fn), JSON.stringify(d, null, 2) + '\n', 'utf8'); }
    }
  }
}

console.log(`[stage-b] sources=${wanted.size} masters=${masters.size}  rules added/updated=${added}  chains flattened=${flattened}`);
console.log(`[stage-b] internal links rewritten=${rewritten} in ${filesTouched} files`);
touched.forEach((t) => console.log('   ' + t));
twinFixes.forEach((t) => console.log('   hreflang: ' + t));
problems.forEach((p) => console.log('  PROBLEM ' + p));
if (problems.length) { console.error('[stage-b] refusing to write vercel.json'); process.exit(1); }
if (!CHECK) {
  fs.writeFileSync(vPath, JSON.stringify(vercel, null, 2) + '\n', 'utf8');
  const rows = [...wanted].map(([from, to]) => ({ from, to, status: 301 }));
  fs.writeFileSync(path.join(ROOT, 'seo/stage-b-redirects-map.csv'), 'from,to,status\n' + rows.map((r) => `${r.from},${r.to},${r.status}`).join('\n') + '\n');
  console.log(`[stage-b] wrote vercel.json (${vercel.redirects.length} redirects) + seo/stage-b-redirects-map.csv`);
}
