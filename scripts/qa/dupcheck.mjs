#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const EN_DIR = path.join(ROOT, 'src/content/posts/en');
const BN_DIR = path.join(ROOT, 'src/content/posts/bn');

function tokenize(text) {
  return (text || '')
    .replace(/<[^>]+>/g, ' ')
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter((w) => w.length > 2);
}

function loadRawDocs(dir) {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      const d = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
      const text = [
        d.title || '',
        d.heroIntro || '',
        ...(d.sections || []).map((s) => `${s.h2 || ''} ${s.content || ''}`),
      ].join(' ');
      return { slug: f.replace('.json', ''), tokens: tokenize(text) };
    });
}

function buildTfIdfVectors(docs) {
  const N = docs.length;
  const df = new Map();
  const tfs = docs.map((doc) => {
    const tf = new Map();
    const seen = new Set();
    for (const w of doc.tokens) {
      tf.set(w, (tf.get(w) || 0) + 1);
      if (!seen.has(w)) {
        seen.add(w);
        df.set(w, (df.get(w) || 0) + 1);
      }
    }
    return tf;
  });

  return tfs.map((tf, idx) => {
    const vec = new Map();
    let norm2 = 0;
    for (const [w, count] of tf.entries()) {
      const idf = Math.log(1 + N / (1 + (df.get(w) || 1)));
      const weight = count * idf;
      vec.set(w, weight);
      norm2 += weight * weight;
    }
    const norm = Math.sqrt(norm2) || 1;
    for (const [w, weight] of vec.entries()) vec.set(w, weight / norm);
    return { slug: docs[idx].slug, vec };
  });
}

function cosine(a, b) {
  let s = 0;
  const [small, big] = a.size <= b.size ? [a, b] : [b, a];
  for (const [k, v] of small.entries()) {
    const bv = big.get(k);
    if (bv) s += v * bv;
  }
  return s;
}

const args = process.argv.slice(2);
const fileArgIdx = args.indexOf('--file');
if (fileArgIdx !== -1 && args[fileArgIdx + 1]) {
  const targetPath = path.resolve(args[fileArgIdx + 1]);
  const d = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
  const text = [d.title || '', d.heroIntro || '', ...(d.sections || []).map((s) => `${s.h2 || ''} ${s.content || ''}`)].join(' ');
  const isBn = /[\u0980-\u09FF]/.test(text);
  const raw = loadRawDocs(isBn ? BN_DIR : EN_DIR).filter((x) => x.slug !== d.slug);
  raw.push({ slug: d.slug, tokens: tokenize(text) });
  const vecs = buildTfIdfVectors(raw);
  const targetVec = vecs[vecs.length - 1].vec;
  let maxSim = 0;
  let maxSlug = '';
  for (let i = 0; i < vecs.length - 1; i++) {
    const sim = cosine(targetVec, vecs[i].vec);
    if (sim > maxSim) {
      maxSim = sim;
      maxSlug = vecs[i].slug;
    }
  }
  console.log({ slug: d.slug, maxSim: +maxSim.toFixed(4), closestSlug: maxSlug, verdict: maxSim >= 0.80 ? 'REJECT' : 'PUBLISH' });
  if (maxSim >= 0.80) process.exit(1);
  process.exit(0);
}

let pairsGe90 = 0;
for (const [lang, dir] of [['en', EN_DIR], ['bn', BN_DIR]]) {
  const vecs = buildTfIdfVectors(loadRawDocs(dir));
  for (let i = 0; i < vecs.length; i++) {
    for (let j = i + 1; j < vecs.length; j++) {
      const sim = cosine(vecs[i].vec, vecs[j].vec);
      if (sim >= 0.90) {
        pairsGe90++;
        console.error(`[dupcheck] ${lang} >=0.90 (${sim.toFixed(3)}): ${vecs[i].slug} <-> ${vecs[j].slug}`);
      }
    }
  }
}
console.log({ corpusPairsGe90: pairsGe90 });
if (pairsGe90 > 0 && args.includes('--strict')) process.exit(1);
