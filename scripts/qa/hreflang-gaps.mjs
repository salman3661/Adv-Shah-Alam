#!/usr/bin/env node
/**
 * scripts/qa/hreflang-gaps.mjs — permanent CI gate for unpaired EN/BN twins
 *
 * 1. Reads live URLs from reports/live-urls.json (fallback: src/content/posts/{en,bn})
 * 2. Reads reciprocal hreflang pairs from post JSONs (enSlug / bnSlug) & built HTML
 * 3. Finds EN and BN posts whose distinctive slug token sets overlap by >= 2 tokens
 *    and especially whose slugs are identical modulo a trailing "-bn"
 * 4. HARD FAIL (exit 1) if any unpaired candidate has identical slugs modulo "-bn"
 * 5. Prints warning summary for softer candidates (exit 0)
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const EN_DIR = path.join(ROOT, 'src/content/posts/en');
const BN_DIR = path.join(ROOT, 'src/content/posts/bn');

const GENERIC = new Set([
  'bangladesh', 'bd', 'bn', '2026', '2025', 'guide', 'blog', 'ain', 'mamla', 'proti',
  'niyom', 'nibandhon', 'kora', 'karar', 'law', 'legal', 'right', 'rights', 'help',
  'new', 'best', 'complete', 'prokriya', 'dhaka', 'uttara', 'kivabe', 'korar', 'ki',
  'vs', 'and', 'for', 'the', 'from', 'how', 'what', 'when', 'why', 'cost', 'process',
  'rules', 'file', 'case', 'court', 'act', 'online', 'check', 'apply',
]);

function toks(slug) {
  return new Set(
    slug
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((t) => t.length > 2 && !GENERIC.has(t))
  );
}

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, ''));
}

const livePath = path.join(ROOT, 'reports/live-urls.json');
const liveSet = fs.existsSync(livePath) ? new Set(JSON.parse(fs.readFileSync(livePath, 'utf8')).paths || []) : null;
const vPath = path.join(ROOT, 'vercel.json');
const redSources = fs.existsSync(vPath) ? new Set((JSON.parse(fs.readFileSync(vPath, 'utf8')).redirects || []).filter((r) => !r.has).map((r) => r.source)) : new Set();

const enPosts = new Map();
for (const f of fs.readdirSync(EN_DIR).filter((x) => x.endsWith('.json'))) {
  const slug = f.replace(/\.json$/, '');
  const d = readJson(path.join(EN_DIR, f));
  if (d.isDraft || d._draft || redSources.has(`/blog/${slug}`)) continue;
  enPosts.set(slug, { slug, title: d.title || '', twin: d.bnSlug || null });
}

const bnPosts = new Map();
for (const f of fs.readdirSync(BN_DIR).filter((x) => x.endsWith('.json'))) {
  const slug = f.replace(/\.json$/, '');
  const d = readJson(path.join(BN_DIR, f));
  if (d.isDraft || d._draft || redSources.has(`/bn/blog/${slug}`)) continue;
  bnPosts.set(slug, { slug, title: d.title || '', twin: d.enSlug || null });
}

const hardFails = [];
const softCandidates = [];

for (const [es, en] of enPosts) {
  // Check identical modulo -bn
  for (const candBn of [es, `${es}-bn`]) {
    if (bnPosts.has(candBn)) {
      const bn = bnPosts.get(candBn);
      const pairedTogether = en.twin === candBn && bn.twin === es;
      if (!pairedTogether && !en.twin && !bn.twin) {
        hardFails.push({ en, bn });
      }
    }
  }
  if (en.twin) continue;
  const et = toks(es);
  if (et.size < 2) continue;
  for (const [bs, bn] of bnPosts) {
    if (bn.twin) continue;
    const bt = toks(bs);
    const ov = [...et].filter((t) => bt.has(t));
    if (ov.length >= 2) {
      const score = ov.length / new Set([...et, ...bt]).size;
      if (score >= 0.4) {
        softCandidates.push({ score, ov, en, bn });
      }
    }
  }
}

softCandidates.sort((a, b) => b.score - a.score);
console.log(`[hreflang-gaps] liveUrls=${liveSet ? liveSet.size : 'n/a'} en=${enPosts.size} bn=${bnPosts.size} hardFails=${hardFails.length} softWarnings=${softCandidates.length}`);

for (const { en, bn } of hardFails) {
  console.error(`[hreflang-gaps] HARD FAIL (identical slug modulo -bn, unpaired):`);
  console.error(`  EN: /blog/${en.slug}  (${en.title})`);
  console.error(`  BN: /bn/blog/${bn.slug}  (${bn.title})`);
}

for (const { score, ov, en, bn } of softCandidates.slice(0, 15)) {
  console.log(`  [warn] score=${score.toFixed(2)} [${ov.join(',')}] /blog/${en.slug} <-> /bn/blog/${bn.slug}`);
  console.log(`         EN: ${en.title.slice(0, 75)}`);
  console.log(`         BN: ${bn.title.slice(0, 75)}`);
}

if (hardFails.length > 0) {
  process.exit(1);
}
