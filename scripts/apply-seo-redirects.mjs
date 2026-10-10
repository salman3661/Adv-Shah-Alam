/**
 * scripts/apply-seo-redirects.mjs
 *
 * Applies seo/redirect-clusters.json to vercel.json as permanent (301) redirects and
 * guarantees the resulting redirect table is "clean":
 *   - every cluster source -> its master (existing rule for the same source is overwritten)
 *   - any OTHER rule that pointed at a now-redirected URL is re-pointed straight at the master
 *     (no redirect chains / hops)
 *   - masters are never redirect sources (no loops)
 *   - masters exist as published posts
 * Also writes seo/redirects-map.csv + seo/redirects-map.json (human/CDN-friendly exports).
 *
 * Usage:  node scripts/apply-seo-redirects.mjs          (apply + validate)
 *         node scripts/apply-seo-redirects.mjs --check  (validate only, exit 1 on problems)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const CHECK_ONLY = process.argv.includes('--check');
const clustersPath = path.join(ROOT, 'seo', 'redirect-clusters.json');
const vercelPath = path.join(ROOT, 'vercel.json');
const BN_DIR = path.join(ROOT, 'src', 'content', 'posts', 'bn');

const cfg = JSON.parse(fs.readFileSync(clustersPath, 'utf8'));
const vercel = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
const base = cfg.basePath;

// source URL -> { dest URL, cluster }
const wanted = new Map();
const masters = new Set();
for (const c of cfg.clusters) {
  masters.add(base + c.master);
  for (const s of c.sources) wanted.set(base + s, { dest: base + c.master, cluster: c.name });
}

const problems = [];
for (const m of masters) {
  if (wanted.has(m)) problems.push(`Master is also a redirect source: ${m}`);
  const slug = m.replace(base, '');
  const f = path.join(BN_DIR, slug + '.json');
  if (!fs.existsSync(f)) problems.push(`Master post file missing: ${slug}.json`);
  else {
    const p = JSON.parse(fs.readFileSync(f, 'utf8'));
    if (p.isDraft || p._draft) problems.push(`Master is a draft: ${slug}`);
  }
}

const isPlain = (r) => !r.has && !/[:*(]/.test(r.source);
let overwritten = 0, repointed = 0, added = 0, removedMasterRules = 0;

// 1. drop any existing rule whose source is a master (would create a loop)
vercel.redirects = vercel.redirects.filter((r) => {
  if (isPlain(r) && masters.has(r.source)) { removedMasterRules++; problems.push(`(fixed) removed rule that redirected master ${r.source}`); return false; }
  return true;
});

// 2. overwrite/insert cluster rules
const seen = new Set();
for (const r of vercel.redirects) {
  if (isPlain(r) && wanted.has(r.source)) {
    const w = wanted.get(r.source);
    if (r.destination !== w.dest || r.statusCode !== 301) { r.destination = w.dest; r.statusCode = 301; delete r.permanent; overwritten++; }
    seen.add(r.source);
  }
}
for (const [src, w] of wanted) {
  if (!seen.has(src)) { vercel.redirects.push({ source: src, destination: w.dest, statusCode: 301 }); added++; }
}

// 3. flatten: resolve every plain rule's destination through the final table
const table = new Map(vercel.redirects.filter(isPlain).map((r) => [r.source, r]));
const resolve = (u) => {
  const hops = new Set();
  while (table.has(u)) {
    if (hops.has(u)) { problems.push(`Redirect loop at ${u}`); return u; }
    hops.add(u);
    u = table.get(u).destination;
  }
  return u;
};
for (const r of vercel.redirects) {
  if (!r.destination || /^https?:/.test(r.destination)) continue;
  const final = resolve(r.destination);
  if (final !== r.destination) { r.destination = final; repointed++; }
}

// 4. validation
for (const [src, w] of wanted) {
  const r = table.get(src);
  if (!r || r.destination !== w.dest || r.statusCode !== 301) problems.push(`Rule not in place: ${src}`);
}
for (const r of vercel.redirects) {
  if (isPlain(r) && table.has(r.destination) && table.get(r.destination).destination !== r.destination) problems.push(`Chain remains: ${r.source} -> ${r.destination}`);
  if (isPlain(r) && r.source === r.destination) problems.push(`Self redirect: ${r.source}`);
}
const dup = vercel.redirects.filter(isPlain).map((r) => r.source).filter((s, i, a) => a.indexOf(s) !== i);
if (dup.length) problems.push(`Duplicate sources: ${[...new Set(dup)].join(', ')}`);

const fatal = problems.filter((p) => !p.startsWith('(fixed)'));
console.log(`[seo-redirects] clusters=${cfg.clusters.length} sources=${wanted.size} masters=${masters.size}`);
console.log(`[seo-redirects] added=${added} overwritten=${overwritten} chain-flattened=${repointed} master-loop-rules-removed=${removedMasterRules}`);
problems.forEach((p) => console.log('  - ' + p));

if (CHECK_ONLY) { process.exit(fatal.length ? 1 : 0); }
if (fatal.length) { console.error('[seo-redirects] refusing to write: fix problems above'); process.exit(1); }

fs.writeFileSync(vercelPath, JSON.stringify(vercel, null, 2) + '\n');

// 5. exports
const rows = [...wanted].map(([from, w]) => ({ from, to: w.dest, status: 301, cluster: w.cluster }));
fs.writeFileSync(path.join(ROOT, 'seo', 'redirects-map.json'), JSON.stringify(rows, null, 2) + '\n');
fs.writeFileSync(
  path.join(ROOT, 'seo', 'redirects-map.csv'),
  'from,to,status,cluster\n' + rows.map((r) => `${r.from},${r.to},${r.status},"${r.cluster}"`).join('\n') + '\n'
);
console.log(`[seo-redirects] wrote vercel.json (${vercel.redirects.length} redirects) + seo/redirects-map.{csv,json}`);
