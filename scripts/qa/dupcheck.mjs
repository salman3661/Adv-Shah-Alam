#!/usr/bin/env node
/**
 * scripts/qa/dupcheck.mjs — intent-level duplicate gate (v4)
 *
 * Google matches on title + intent, not only body cosine, so three independent
 * measurements are taken against every corpus post and the WORST one decides:
 *
 *   body  : TF-IDF cosine of title+hero+sections          >= 0.80
 *   title : token cosine of the title                      >= 0.85
 *   h2    : Jaccard overlap of the H2-heading token sets   >= 0.45
 *   intent: IDF cosine of stemmed title+slug+metaDescription+keywords >= 0.65
 *           (or >= 0.50 together with body >= 0.65). Added in v4 because the three
 *           thresholds above flag 0/4 of the owner-verified clusters (see RELEASE-NOTES).
 *   xlang : EN post vs BN post that look like the same topic but are NOT
 *           declared twins (bnSlug/enSlug) -> flagged explicitly (advisory)
 *
 * Verdicts (--file mode):
 *   publish         clear of all thresholds                              exit 0
 *   merge-candidate a threshold is hit -> rewrite with a DISTINCT angle  exit 0
 *                   (conflicting URLs + overlapping headings are printed)
 *   reject          near-total subset: body >= 0.90 AND title >= 0.90    exit 1
 * Publishing is blocked ONLY on `reject`.
 *
 * Modes:
 *   --file <post.json>    gate one candidate against the corpus
 *   --scan                full pairwise corpus scan, prints every cluster above threshold
 *   --scan --strict       exit 1 if any cluster is found
 *   --scan --include-redirected   also scan posts that vercel.json already 301s
 *   --regression          assert the 4 known clusters (A-D) are all detected (exit 1 if not)
 *   --json                machine-readable output for --scan
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const DIRS = { en: path.join(ROOT, 'src/content/posts/en'), bn: path.join(ROOT, 'src/content/posts/bn') };

export const TH = { body: 0.8, title: 0.85, h2: 0.45, intent: 0.65, intentWeak: 0.5, intentWeakBody: 0.65, rejectBody: 0.9, rejectTitle: 0.9, xlangSlug: 0.5 };

const STOP = new Set(['the', 'and', 'for', 'with', 'how', 'what', 'bangladesh', 'law', 'guide', 'complete', 'আইন', 'বাংলাদেশ', 'বাংলাদেশে', 'ও', 'এর', 'কী', 'কি', 'এবং']);

function tokenize(text, minLen = 2) {
  return (text || '')
    .replace(/<[^>]+>/g, ' ')
    .toLowerCase()
    .split(/[^\p{L}\p{M}\p{N}]+/u)
    .filter((w) => w.length >= minLen);
}
const stem = (w) => [...w].slice(0, 5).join('');
const contentTokens = (t) => tokenize(t, 3);
const titleTokens = (t) => tokenize(t, 2).filter((w) => !STOP.has(w) && !/^20\d\d$/.test(w));

function readJson(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, '')); } catch { return null; }
}

function redirectedSources() {
  const v = readJson(path.join(ROOT, 'vercel.json')) || {};
  return new Set((v.redirects || []).filter((r) => !r.has).map((r) => r.source));
}

export function docFromPost(d, slug, lang) {
  const sections = d.sections || [];
  const h2s = sections.map((s) => s.h2 || s.heading || '').filter(Boolean);
  const body = [d.title || '', d.heroIntro || '', ...sections.map((s) => `${s.h2 || s.heading || ''} ${s.content || ''}`)].join(' ');
  return {
    slug, lang,
    url: `${lang === 'bn' ? '/bn' : ''}/blog/${slug}`,
    title: d.title || '',
    h2s,
    bodyTokens: contentTokens(body),
    titleTokens: titleTokens(d.title),
    h2Set: new Set(h2s.flatMap((h) => titleTokens(h.replace(/^[\d\u09E6-\u09EF]+[.)\s]+/u, '')))),
    intentTokens: tokenize(`${d.title || ''} ${slug.replace(/-/g, ' ').replace(/\b(2026|bn|bd)\b/g, ' ')} ${d.metaDescription || ''} ${Array.isArray(d.keywords) ? d.keywords.join(' ') : d.keywords || ''}`, 2).map(stem),
    twin: d.bnSlug || d.enSlug || null,
    words: tokenize(body, 1).length,
  };
}

export function loadCorpus({ includeRedirected = false } = {}) {
  const red = includeRedirected ? new Set() : redirectedSources();
  const docs = [];
  for (const lang of ['en', 'bn']) {
    for (const f of fs.readdirSync(DIRS[lang]).filter((x) => x.endsWith('.json'))) {
      const slug = f.replace(/\.json$/, '');
      const url = `${lang === 'bn' ? '/bn' : ''}/blog/${slug}`;
      if (red.has(url)) continue;
      const d = readJson(path.join(DIRS[lang], f));
      if (!d || d.isDraft || d._draft) continue;
      docs.push(docFromPost(d, slug, lang));
    }
  }
  return docs;
}

function buildIdf(docs) {
  const df = new Map();
  for (const d of docs) for (const w of new Set(d.bodyTokens)) df.set(w, (df.get(w) || 0) + 1);
  const N = docs.length;
  return (w) => Math.log(1 + N / (1 + (df.get(w) || 1)));
}
function buildIntentIdf(docs) {
  const df = new Map();
  for (const d of docs) for (const w of new Set(d.intentTokens)) df.set(w, (df.get(w) || 0) + 1);
  const N = docs.length;
  return (w) => Math.log(1 + N / (1 + (df.get(w) || 1)));
}
function tfidfVec(tokens, idf) {
  const tf = new Map();
  for (const w of tokens) tf.set(w, (tf.get(w) || 0) + 1);
  const vec = new Map();
  let n2 = 0;
  for (const [w, c] of tf) { const x = c * idf(w); vec.set(w, x); n2 += x * x; }
  const n = Math.sqrt(n2) || 1;
  for (const [w, x] of vec) vec.set(w, x / n);
  return vec;
}
function cosine(a, b) {
  let s = 0;
  const [sm, bg] = a.size <= b.size ? [a, b] : [b, a];
  for (const [k, v] of sm) { const o = bg.get(k); if (o) s += v * o; }
  return s;
}
function tokenCosine(a, b) {
  const fa = new Map(), fb = new Map();
  for (const w of a) fa.set(w, (fa.get(w) || 0) + 1);
  for (const w of b) fb.set(w, (fb.get(w) || 0) + 1);
  let dot = 0, na = 0, nb = 0;
  for (const [, v] of fa) na += v * v;
  for (const [, v] of fb) nb += v * v;
  for (const [k, v] of fa) if (fb.has(k)) dot += v * fb.get(k);
  return dot / (Math.sqrt(na * nb) || 1);
}
function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let i = 0;
  for (const x of a) if (b.has(x)) i++;
  return i / (a.size + b.size - i);
}
const slugSet = (s) => new Set(s.split('-').filter((x) => x.length > 2 && !/^20\d\d$/.test(x)));

function compare(a, b, vecA, vecB, iA, iB) {
  const body = cosine(vecA, vecB);
  const intent = iA && iB ? cosine(iA, iB) : 0;
  const title = tokenCosine(a.titleTokens, b.titleTokens);
  const h2 = jaccard(a.h2Set, b.h2Set);
  const flags = [];
  if (body >= TH.body) flags.push('body');
  if (title >= TH.title) flags.push('title');
  if (h2 >= TH.h2) flags.push('h2');
  if (intent >= TH.intent || (intent >= TH.intentWeak && body >= TH.intentWeakBody)) flags.push('intent');
  // same-intent cross-language: different language, not declared twins, near-identical slug vocabulary
  let xlang = false;
  if (a.lang !== b.lang) {
    const en = a.lang === 'en' ? a : b, bn = a.lang === 'bn' ? a : b;
    const declared = en.twin === bn.slug || bn.twin === en.slug;
    if (!declared && jaccard(slugSet(en.slug), slugSet(bn.slug)) >= TH.xlangSlug) { xlang = true; flags.push('xlang'); }
  }
  return { body, title, h2, intent, flags, xlang };
}

const shared = (a, b) => a.h2s.filter((h) => {
  const ts = new Set(titleTokens(h));
  return ts.size && b.h2s.some((o) => jaccard(ts, new Set(titleTokens(o))) >= 0.6);
});

function scanCorpus(docs) {
  const idf = buildIdf(docs);
  const vecs = docs.map((d) => tfidfVec(d.bodyTokens, idf));
  const iidf = buildIntentIdf(docs);
  const ivecs = docs.map((d) => tfidfVec(d.intentTokens, iidf));
  const pairs = [];
  for (let i = 0; i < docs.length; i++) {
    for (let j = i + 1; j < docs.length; j++) {
      if (docs[i].lang !== docs[j].lang && !(docs[i].twin || docs[j].twin)) {
        // cross-language pairs are only evaluated by the xlang rule
      }
      const r = compare(docs[i], docs[j], vecs[i], vecs[j], ivecs[i], ivecs[j]);
      // body/title/h2 are only meaningful inside one language; cross-language only via xlang
      const sameLang = docs[i].lang === docs[j].lang;
      const flags = sameLang ? r.flags.filter((f) => f !== 'xlang') : r.flags.filter((f) => f === 'xlang');
      if (flags.length) pairs.push({ a: docs[i], b: docs[j], ...r, flags });
    }
  }
  return pairs;
}

function clusters(pairs, only) {
  const parent = new Map();
  const find = (x) => { while (parent.get(x) !== x) { parent.set(x, parent.get(parent.get(x))); x = parent.get(x); } return x; };
  const add = (x) => { if (!parent.has(x)) parent.set(x, x); };
  const use = pairs.filter((p) => !only || only(p));
  for (const p of use) { add(p.a.url); add(p.b.url); parent.set(find(p.a.url), find(p.b.url)); }
  const groups = new Map();
  for (const u of parent.keys()) { const r = find(u); (groups.get(r) || groups.set(r, []).get(r)).push(u); }
  return [...groups.values()].filter((g) => g.length > 1).map((g) => g.sort());
}

// The four intent clusters verified by the owner's re-measurement (21 Nov 2026).
export const KNOWN_CLUSTERS = {
  A: ['/blog/power-of-attorney-land-transfer-bangladesh', '/blog/power-of-attorney-property-transfer-registration-bangladesh'],
  B: ['/bn/blog/mithya-nari-nirjaton-mamla-atmoraksha-bd', '/bn/blog/mithya-nari-nirjaton-mamla-theke-bachar-ain-2026', '/bn/blog/dv-act-mithya-nari-nirjaton-mamla-defense-2026-bn', '/bn/blog/mithya-nari-nirjaton-mamla-protirodh-defense-2026-bn'],
  C: ['/blog/bangladesh-cyber-crime-complaint-portal-guide-2026', '/blog/cyber-crime-helpline-bangladesh-2026'],
  D: ['/bn/blog/varatia-ucched-ainee-notice-bari-bhara-ain', '/bn/blog/varatia-ucched-dokan-basa-106-dhara-legal-notice-2026-bn'],
};

const args = process.argv.slice(2);
const has = (f) => args.includes(f);
const fileIdx = args.indexOf('--file');
const includeRedirected = has('--include-redirected') || has('--regression');
const f3 = (x) => x.toFixed(3);

if (fileIdx !== -1 && args[fileIdx + 1]) {
  const file = path.resolve(args[fileIdx + 1]);
  const d = readJson(file);
  if (!d) { console.error(`[dupcheck] cannot read ${file}`); process.exit(2); }
  const lang = d.lang === 'bn' || /\/bn\//.test(file) || /[\u0980-\u09FF]/.test(d.title || '') ? 'bn' : 'en';
  const cand = docFromPost(d, d.slug || path.basename(file, '.json'), lang);
  const corpus = loadCorpus({ includeRedirected }).filter((x) => x.url !== cand.url);
  const idf = buildIdf([...corpus, cand]);
  const cv = tfidfVec(cand.bodyTokens, idf);
  const iidf = buildIntentIdf([...corpus, cand]);
  const civ = tfidfVec(cand.intentTokens, iidf);
  const hits = [];
  let worstBody = 0, worstTitle = 0, worstH2 = 0, worstIntent = 0;
  for (const o of corpus) {
    const r = compare(cand, o, cv, tfidfVec(o.bodyTokens, idf), civ, tfidfVec(o.intentTokens, iidf));
    if (o.lang === cand.lang) { worstBody = Math.max(worstBody, r.body); worstTitle = Math.max(worstTitle, r.title); worstH2 = Math.max(worstH2, r.h2); worstIntent = Math.max(worstIntent, r.intent); }
    const flags = o.lang === cand.lang ? r.flags.filter((f) => f !== 'xlang') : r.flags.filter((f) => f === 'xlang');
    if (flags.length) hits.push({ o, ...r, flags });
  }
  const reject = hits.some((h) => h.body >= TH.rejectBody && h.title >= TH.rejectTitle);
  const verdict = reject ? 'reject' : hits.length ? 'merge-candidate' : 'publish';
  console.log(JSON.stringify({ slug: cand.slug, verdict, worst: { body: +f3(worstBody), title: +f3(worstTitle), h2: +f3(worstH2), intent: +f3(worstIntent) }, thresholds: TH }));
  if (hits.length) {
    console.log(`[dupcheck] ${verdict.toUpperCase()}: rewrite with a distinct angle. Competing URL(s):`);
    for (const h of hits.sort((x, y) => y.body + y.title - x.body - x.title).slice(0, 8)) {
      console.log(`  - ${h.o.url}  [${h.flags.join('+')}]  body=${f3(h.body)} title=${f3(h.title)} h2=${f3(h.h2)} intent=${f3(h.intent)}`);
      const sh = shared(cand, h.o);
      if (sh.length) console.log(`      overlapping headings: ${sh.slice(0, 6).map((x) => `"${x}"`).join(' | ')}`);
    }
  }
  process.exit(reject ? 1 : 0);
}

if (has('--pair')) {
  const i = args.indexOf('--pair');
  const docs = loadCorpus({ includeRedirected: true });
  const idf = buildIdf(docs);
  const iidf = buildIntentIdf(docs);
  const a = docs.find((d) => d.url === args[i + 1]);
  const b = docs.find((d) => d.url === args[i + 2]);
  if (!a || !b) { console.error('[dupcheck] pair not found'); process.exit(2); }
  const r = compare(a, b, tfidfVec(a.bodyTokens, idf), tfidfVec(b.bodyTokens, idf), tfidfVec(a.intentTokens, iidf), tfidfVec(b.intentTokens, iidf));
  console.log(JSON.stringify({ a: a.url, b: b.url, body: +f3(r.body), title: +f3(r.title), h2: +f3(r.h2), intent: +f3(r.intent), flags: r.flags }));
  process.exit(0);
}

if (has('--scan') || has('--regression')) {
  const docs = loadCorpus({ includeRedirected });
  const pairs = scanCorpus(docs);
  const sameLangPairs = pairs.filter((p) => !p.flags.includes('xlang'));
  const intentPairs = sameLangPairs;
  const cl = clusters(intentPairs);
  const byUrl = new Map(docs.map((d) => [d.url, d]));

  if (has('--regression')) {
    let fail = 0;
    const comps = cl.map((g) => new Set(g));
    for (const [name, urls] of Object.entries(KNOWN_CLUSTERS)) {
      const ok = comps.some((c) => urls.every((u) => c.has(u)));
      console.log(`[regression] cluster ${name} (${urls.length} URLs): ${ok ? 'DETECTED' : 'MISSED'}`);
      if (!ok) fail++;
    }
    console.log(`[regression] ${fail === 0 ? 'PASS' : 'FAIL'} — ${Object.keys(KNOWN_CLUSTERS).length - fail}/${Object.keys(KNOWN_CLUSTERS).length} known clusters detected`);
    process.exit(fail ? 1 : 0);
  }

  const out = {
    posts: docs.length,
    thresholds: TH,
    pairs: intentPairs.length,
    clusters: cl.length,
    crossLanguageFlags: pairs.filter((p) => p.flags.includes('xlang')).length,
  };
  if (has('--json')) {
    console.log(JSON.stringify({ ...out, clusterList: cl, pairList: intentPairs.map((p) => ({ a: p.a.url, b: p.b.url, flags: p.flags, body: +f3(p.body), title: +f3(p.title), h2: +f3(p.h2), intent: +f3(p.intent) })) }, null, 1));
  } else {
    console.log(`# dupcheck --scan  posts=${out.posts}  thresholds: body>=${TH.body} title>=${TH.title} h2>=${TH.h2} intent>=${TH.intent}`);
    console.log(`pairs flagged: ${out.pairs}   clusters: ${out.clusters}   cross-language (undeclared twin) flags: ${out.crossLanguageFlags}`);
    cl.sort((x, y) => y.length - x.length).forEach((g, i) => {
      console.log(`\nCLUSTER ${i + 1} (${g.length} URLs)`);
      const longest = g.map((u) => byUrl.get(u)).sort((a, b) => b.words - a.words);
      longest.forEach((d) => console.log(`  ${d.url}  (${d.words} words)`));
      for (const p of intentPairs.filter((q) => g.includes(q.a.url) && g.includes(q.b.url))) {
        console.log(`    pair [${p.flags.join('+')}] body=${f3(p.body)} title=${f3(p.title)} h2=${f3(p.h2)} intent=${f3(p.intent)}  ${p.a.slug} <-> ${p.b.slug}`);
      }
    });
    for (const p of pairs.filter((q) => q.flags.includes('xlang'))) {
      console.log(`\nXLANG ${p.a.url} <-> ${p.b.url}  (same topic, not declared twins)`);
    }
  }
  process.exitCode = has('--strict') && cl.length ? 1 : 0;
} else {
// default (ci:qa): corpus health summary — never fails unless --strict

  const docs = loadCorpus({ includeRedirected });
  const pairs = scanCorpus(docs).filter((p) => !p.flags.includes('xlang'));
  const cl = clusters(pairs);
  console.log({ posts: docs.length, intentPairs: pairs.length, clusters: cl.length });
  process.exitCode = has('--strict') && cl.length ? 1 : 0;
}
