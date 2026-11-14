import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const BASE = 'https://www.advmdshahalam.me';
const vercel = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));
const sitemapXml = fs.readFileSync(path.join(ROOT, 'public', 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].replace(BASE, '') || '/');

function stripTags(html = '') {
  return String(html).replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

function decodeEntities(s = '') {
  return s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

// 1. Check all sitemap URLs in dist/: H1=1, unique title <= 60 (and <= 58), unique desc, no noindex
const titles = new Map();
const descs = new Map();
let h1Errors = 0;
let titleLenErrors = 0;
let titleDupErrors = 0;
let descDupErrors = 0;
let noindexSitemapErrors = 0;

for (const rel of sitemapUrls) {
  const htmlPath = rel === '/' ? path.join(DIST, 'index.html') : path.join(DIST, rel.replace(/^\/+/, ''), 'index.html');
  if (!fs.existsSync(htmlPath)) {
    console.error('MISSING dist HTML for sitemap URL:', rel);
    process.exitCode = 1;
    continue;
  }
  const html = fs.readFileSync(htmlPath, 'utf8');

  // H1 check
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  if (h1s.length !== 1) {
    h1Errors++;
    console.error(`H1 count=${h1s.length} on ${rel}`);
  }

  // Noindex check
  if (/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html)) {
    noindexSitemapErrors++;
    console.error(`NOINDEX on sitemap URL: ${rel}`);
  }

  // Title check
  const tm = html.match(/<title>([\s\S]*?)<\/title>/i);
  const title = tm ? decodeEntities(tm[1].trim()) : '';
  if (title.length > 58 || title.length === 0) {
    titleLenErrors++;
    console.error(`Title len=${title.length} on ${rel}: "${title}"`);
  }
  const tk = title.toLowerCase();
  if (titles.has(tk)) {
    titleDupErrors++;
    console.error(`Duplicate title "${title}" on ${rel} and ${titles.get(tk)}`);
  } else {
    titles.set(tk, rel);
  }

  // Description check
  const dm = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  const desc = dm ? decodeEntities(dm[1].trim()) : '';
  const dk = desc.toLowerCase();
  if (descs.has(dk)) {
    descDupErrors++;
    console.error(`Duplicate desc on ${rel} and ${descs.get(dk)}`);
  } else {
    descs.set(dk, rel);
  }
}

// 2. Redirect chain & live-target check
const redirMap = new Map();
for (const r of (vercel.redirects || [])) {
  if (!r.has && !r.source.includes(':')) {
    redirMap.set(r.source, r.destination);
  }
}
let chainErrors = 0;
let brokenTargetErrors = 0;
for (const [src, dest] of redirMap.entries()) {
  if (redirMap.has(dest)) {
    chainErrors++;
    console.error(`Redirect chain: ${src} -> ${dest} -> ${redirMap.get(dest)}`);
  }
  const cleanDest = dest.split('#')[0];
  const destPath = cleanDest === '/' ? path.join(DIST, 'index.html') : path.join(DIST, cleanDest.replace(/^\/+/, ''), 'index.html');
  if (!fs.existsSync(destPath)) {
    brokenTargetErrors++;
    console.error(`Redirect target missing in dist/: ${src} -> ${dest}`);
  }
}

// 3. Cosine similarity >= 0.90 check across all surviving posts
const EN_DIR = path.join(ROOT, 'src', 'content', 'posts', 'en');
const BN_DIR = path.join(ROOT, 'src', 'content', 'posts', 'bn');
function checkSimilarity(dir, lang) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  const docs = [];
  for (const f of files) {
    const d = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8').replace(/^\uFEFF/, ''));
    if (!d?.slug || d.isDraft) continue;
    const text = [d.title || '', d.heroIntro || '', ...(d.sections || []).map(s => `${s.h2 || s.heading || ''} ${s.content || ''}`)].join(' ');
    const tokens = stripTags(text).toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter(w => w.length >= 2);
    const tf = new Map();
    for (const t of tokens) tf.set(t, (tf.get(t) || 0) + 1);
    docs.push({ slug: d.slug, tf });
  }
  const df = new Map();
  for (const doc of docs) for (const t of doc.tf.keys()) df.set(t, (df.get(t) || 0) + 1);
  const N = docs.length;
  const vecs = docs.map(doc => {
    const v = new Map();
    let norm2 = 0;
    for (const [t, c] of doc.tf.entries()) {
      const w = (1 + Math.log(c)) * (Math.log((N + 1) / ((df.get(t) || 0) + 1)) + 1);
      v.set(t, w);
      norm2 += w * w;
    }
    const norm = Math.sqrt(norm2) || 1;
    for (const [t, w] of v.entries()) v.set(t, w / norm);
    return v;
  });
  let ge90 = 0;
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      let s = 0;
      const a = vecs[i], b = vecs[j];
      if (a.size <= b.size) {
        for (const [t, w] of a.entries()) { const bw = b.get(t); if (bw) s += w * bw; }
      } else {
        for (const [t, w] of b.entries()) { const aw = a.get(t); if (aw) s += w * aw; }
      }
      if (s >= 0.90) {
        ge90++;
        console.error(`Similarity >= 0.90 (${s.toFixed(3)}) in ${lang}: ${docs[i].slug} <-> ${docs[j].slug}`);
      }
    }
  }
  return ge90;
}

const simErrors = checkSimilarity(EN_DIR, 'en') + checkSimilarity(BN_DIR, 'bn');

console.log('\n=== CI SEO LINT SUMMARY ===');
console.log({
  sitemapUrls: sitemapUrls.length,
  h1Errors,
  titleLenErrors,
  titleDupErrors,
  descDupErrors,
  noindexSitemapErrors,
  chainErrors,
  brokenTargetErrors,
  simGe90Pairs: simErrors
});

if (h1Errors + titleLenErrors + titleDupErrors + descDupErrors + noindexSitemapErrors + chainErrors + brokenTargetErrors + simErrors > 0) {
  process.exit(1);
}
