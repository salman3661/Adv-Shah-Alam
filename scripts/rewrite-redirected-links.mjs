/**
 * scripts/rewrite-redirected-links.mjs
 *
 * Rewrites internal links that point at a 301-redirected /bn/blog/<source> URL so they point
 * straight at the cluster master (saves a hop + keeps link equity on the pillar).
 * Operates on raw text so JSON formatting is untouched.
 *
 *   node scripts/rewrite-redirected-links.mjs           # dry run (report only)
 *   node scripts/rewrite-redirected-links.mjs --write   # apply
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const WRITE = process.argv.includes('--write');
const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'seo', 'redirect-clusters.json'), 'utf8'));

const map = new Map();
for (const c of cfg.clusters) for (const s of c.sources) map.set(s, c.master);

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\\-]/g, '\\$&');
// longest slugs first; negative lookahead stops partial-slug matches (e.g. ...-bangladesh vs ...-bangladesh-2026)
const keys = [...map.keys()].sort((a, b) => b.length - a.length);
const re = new RegExp(`/bn/blog/(${keys.map(esc).join('|')})(?![A-Za-z0-9_-])`, 'g');

const SCAN = [
  path.join(ROOT, 'src'),
  path.join(ROOT, 'public'),
];
const SKIP = /posts-meta-(en|bn)\.json$|ga4_summary\.json$|node_modules/;
const EXT = /\.(json|jsx|js|md|xml|txt)$/;

const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (EXT.test(e.name) && !SKIP.test(p)) files.push(p);
  }
})(SCAN[0]);
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(txt|md)$/.test(e.name)) files.push(p);
  }
})(SCAN[1]);

let total = 0;
const perFile = [];
for (const f of files) {
  const text = fs.readFileSync(f, 'utf8');
  let n = 0;
  const out = text.replace(re, (_, slug) => { n++; return `/bn/blog/${map.get(slug)}`; });
  if (n) {
    total += n;
    perFile.push([path.relative(ROOT, f), n]);
    if (WRITE) fs.writeFileSync(f, out);
  }
}
console.log(`[rewrite-links] ${WRITE ? 'rewrote' : 'would rewrite'} ${total} link(s) in ${perFile.length} file(s)`);
perFile.sort((a, b) => b[1] - a[1]).slice(0, 40).forEach(([f, n]) => console.log(`  ${n}\t${f}`));
