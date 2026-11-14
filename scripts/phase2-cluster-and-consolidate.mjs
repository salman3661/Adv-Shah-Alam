import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const BASE = 'https://www.advmdshahalam.me';
const EN_DIR = path.join(ROOT, 'src', 'content', 'posts', 'en');
const BN_DIR = path.join(ROOT, 'src', 'content', 'posts', 'bn');

function csvEscape(val) {
  if (val === null || val === undefined) return '';
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function writeCsv(filePath, headers, rows) {
  const lines = [
    headers.map(csvEscape).join(','),
    ...rows.map(r => r.map(csvEscape).join(','))
  ];
  fs.writeFileSync(filePath, lines.join('\n') + '\n', 'utf8');
}

function stripTags(html = '') {
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(text) {
  return stripTags(text)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter(w => w.length >= 2);
}

// Load corpus for GSC metrics & wordCounts
const corpus = JSON.parse(fs.readFileSync(path.join(ROOT, 'content-corpus.json'), 'utf8'));
const corpusByPath = new Map(corpus.entries.map(e => [e.path, e]));

// Load duplicate-content-pairs.csv
const dupCsvLines = fs.readFileSync('/home/antigravity/duplicate-content-pairs.csv', 'utf8').trim().split(/\r?\n/).slice(1);
const dupPairs = [];
for (const line of dupCsvLines) {
  // Parse CSV line safely
  const cols = [];
  let cur = '', inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') inQ = !inQ;
    else if (ch === ',' && !inQ) { cols.push(cur); cur = ''; }
    else cur += ch;
  }
  cols.push(cur);
  const sim = parseFloat(cols[0]);
  const pathA = cols[1].replace(BASE, '');
  const pathB = cols[2].replace(BASE, '');
  dupPairs.push({ sim, pathA, pathB });
}

// Load all 720 post JSONs
const posts = [];
for (const [lang, dir, prefix] of [['en', EN_DIR, '/blog/'], ['bn', BN_DIR, '/bn/blog/']]) {
  for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.json'))) {
    const filePath = path.join(dir, f);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
    if (!data?.slug || data.isDraft) continue;
    const p = `${prefix}${data.slug}`;
    const c = corpusByPath.get(p);
    if (!c) continue; // only sitemap posts (720)
    const plainText = [
      data.title || '',
      data.heroIntro || '',
      ...(data.sections || []).map(s => `${s.h2 || s.heading || s.title || ''} ${s.content || ''}`),
      ...(data.faqs || []).map(q => `${q.question || q.q || ''} ${q.answer || q.a || ''}`)
    ].join(' ');
    posts.push({
      lang,
      slug: data.slug,
      path: p,
      filePath,
      data,
      wordCount: c.wordCount,
      impressions: c.gscImpressions30d || 0,
      clicks: c.gscClicks30d || 0,
      score: (c.gscImpressions30d || 0) + 3 * (c.gscClicks30d || 0) + (c.wordCount / 1000) + (data.slug.includes('2026') ? 0 : 0.5),
      tokens: tokenize(plainText)
    });
  }
}

console.log(`Loaded ${posts.length} posts for clustering & consolidation.`);

// Build TF-IDF vectors per language for clustering into ~75 topic clusters
function buildClustersForLang(langPosts, targetClusters) {
  const df = new Map();
  const tfs = langPosts.map(p => {
    const m = new Map();
    for (const t of p.tokens) m.set(t, (m.get(t) || 0) + 1);
    for (const t of m.keys()) df.set(t, (df.get(t) || 0) + 1);
    return m;
  });

  const N = langPosts.length;
  const vecs = tfs.map(tf => {
    const v = new Map();
    let norm2 = 0;
    for (const [t, c] of tf.entries()) {
      const idf = Math.log((N + 1) / ((df.get(t) || 0) + 1)) + 1;
      const w = (1 + Math.log(c)) * idf;
      v.set(t, w);
      norm2 += w * w;
    }
    const norm = Math.sqrt(norm2) || 1;
    for (const [t, w] of v.entries()) v.set(t, w / norm);
    return v;
  });

  function cos(a, b) {
    if (a.size > b.size) return cos(b, a);
    let s = 0;
    for (const [t, w] of a.entries()) {
      const bw = b.get(t);
      if (bw) s += w * bw;
    }
    return s;
  }

  // Compute pairwise similarity for greedy/agglomerative topic clustering
  // Start with each post in its own cluster, merge highest-similarity pairs until targetClusters reached
  const clusters = langPosts.map((p, i) => ({
    id: i,
    members: [i],
    centroid: vecs[i]
  }));

  // Precompute top similarities
  const edges = [];
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      const sim = cos(vecs[i], vecs[j]);
      if (sim >= 0.30) edges.push({ i, j, sim });
    }
  }
  edges.sort((a, b) => b.sim - a.sim);

  const parent = Array.from({ length: N }, (_, i) => i);
  const size = Array.from({ length: N }, () => 1);
  function find(x) { return parent[x] === x ? x : (parent[x] = find(parent[x])); }

  let clusterCount = N;
  for (const e of edges) {
    if (clusterCount <= targetClusters) break;
    const ra = find(e.i);
    const rb = find(e.j);
    if (ra !== rb && (size[ra] + size[rb] <= 24 || e.sim >= 0.72)) {
      parent[rb] = ra;
      size[ra] += size[rb];
      clusterCount--;
    }
  }

  const grouped = new Map();
  for (let i = 0; i < N; i++) {
    const r = find(i);
    if (!grouped.has(r)) grouped.set(r, []);
    grouped.get(r).push(langPosts[i]);
  }
  return { grouped: [...grouped.values()], vecs, cos, postIdxMap: new Map(langPosts.map((p, i) => [p.path, i])) };
}

const enPosts = posts.filter(p => p.lang === 'en');
const bnPosts = posts.filter(p => p.lang === 'bn');

// Target ~32 EN clusters + ~45 BN clusters = ~77 clusters (in 60-90 range)
const enRes = buildClustersForLang(enPosts, 32);
const bnRes = buildClustersForLang(bnPosts, 45);
const allClusters = [
  ...enRes.grouped.map((m, idx) => ({ clusterId: `EN-${String(idx + 1).padStart(2, '0')}`, lang: 'en', members: m })),
  ...bnRes.grouped.map((m, idx) => ({ clusterId: `BN-${String(idx + 1).padStart(2, '0')}`, lang: 'bn', members: m }))
];

console.log(`Clustered 720 posts into ${allClusters.length} topic clusters (EN: ${enRes.grouped.length}, BN: ${bnRes.grouped.length}).`);

// Map each post to its cluster & pillar
const postByPath = new Map(posts.map(p => [p.path, p]));
const clusterByPost = new Map();
const pillarByCluster = new Map();

for (const cl of allClusters) {
  cl.members.sort((a, b) => b.score - a.score);
  const pillar = cl.members[0];
  pillarByCluster.set(cl.clusterId, pillar);
  for (const m of cl.members) {
    clusterByPost.set(m.path, { clusterId: cl.clusterId, pillar });
  }
}

// Determine actions:
// 1. Exact/near duplicates (>= 0.85 in duplicate-content-pairs.csv) -> MERGE weaker into stronger + 301
// 2. Thin posts (< 500 words) -> MERGE into cluster pillar + 301
// 3. Remaining 0.60–0.85 pairs -> KEEP AS-IS with documented distinct intent (and distinct title/description)
const mergeMap = new Map(); // sourcePath -> targetPath

function pickSurvivor(pA, pB) {
  // Special deterministic rules for known exact pairs
  if (pA.path.endsWith('-2026') && !pB.path.endsWith('-2026') && pA.path.replace(/-2026$/, '') === pB.path) return [pB, pA];
  if (pB.path.endsWith('-2026') && !pA.path.endsWith('-2026') && pB.path.replace(/-2026$/, '') === pA.path) return [pA, pB];
  return pA.score >= pB.score ? [pA, pB] : [pB, pA];
}

// Process >= 0.85 pairs from duplicate-content-pairs.csv
for (const dp of dupPairs) {
  if (dp.sim < 0.85) continue;
  const pA = postByPath.get(dp.pathA);
  const pB = postByPath.get(dp.pathB);
  if (!pA || !pB) continue;
  const [survivor, victim] = pickSurvivor(pA, pB);
  if (!mergeMap.has(victim.path) && victim.path !== survivor.path) {
    mergeMap.set(victim.path, survivor.path);
  }
}

// Process thin posts (< 500 words)
for (const p of posts) {
  if (p.wordCount < 500 && !mergeMap.has(p.path)) {
    const cl = clusterByPost.get(p.path);
    if (cl && cl.pillar.path !== p.path) {
      mergeMap.set(p.path, cl.pillar.path);
    }
  }
}

// Flatten mergeMap so no redirect chains exist (depth <= 1)
function resolveRoot(p) {
  const seen = new Set();
  let cur = p;
  while (mergeMap.has(cur) && !seen.has(cur)) {
    seen.add(cur);
    cur = mergeMap.get(cur);
  }
  return cur;
}
for (const [k, v] of [...mergeMap.entries()]) {
  const root = resolveRoot(v);
  if (root === k) mergeMap.delete(k);
  else mergeMap.set(k, root);
}

console.log(`Planned MERGE+301 consolidations: ${mergeMap.size} posts.`);

// Execute MERGE: fold unique sections/FAQs from victim into survivor JSON (if not already present)
let foldedSections = 0;
for (const [victimPath, targetPath] of mergeMap.entries()) {
  const victim = postByPath.get(victimPath);
  const target = postByPath.get(targetPath);
  if (!victim || !target) continue;

  const targetSecHeadings = new Set((target.data.sections || []).map(s => (s.h2 || s.heading || s.title || '').trim().toLowerCase()));
  for (const sec of (victim.data.sections || [])) {
    const h = (sec.h2 || sec.heading || sec.title || '').trim().toLowerCase();
    if (h && !targetSecHeadings.has(h) && stripTags(sec.content || '').length > 120) {
      // Avoid folding generic closing sections
      if (!/how adv|contact|conclusion|উপসংহার|যোগাযোগ/.test(h)) {
        target.data.sections = target.data.sections || [];
        target.data.sections.push(sec);
        targetSecHeadings.add(h);
        foldedSections++;
      }
    }
  }
  target.data.lastModified = '2026-11-14';
  fs.writeFileSync(target.filePath, JSON.stringify(target.data, null, 2) + '\n', 'utf8');

  // Mark victim as draft/merged so sitemap & prerender exclude it
  victim.data.isDraft = true;
  victim.data.mergedInto = targetPath;
  fs.writeFileSync(victim.filePath, JSON.stringify(victim.data, null, 2) + '\n', 'utf8');
}
console.log(`Folded ${foldedSections} unique sections from merged posts into pillars.`);

// Fix the copy-pasted wife-divorce-rights-talaq-e-tawfeez-bangladesh title if it survived
const survDivorce = postByPath.get('/blog/divorce-cost-bangladesh-2026-complete-guide');
if (survDivorce && !mergeMap.has(survDivorce.path)) {
  survDivorce.data.metaTitle = 'Divorce Cost in Bangladesh: Court & Lawyer Fees';
  survDivorce.data.metaDescription = 'Complete guide to divorce cost in Bangladesh including Kazi fees, Family Court expenses, lawyer fees, and 90-day notice timelines under MFLO 1961.';
  fs.writeFileSync(survDivorce.filePath, JSON.stringify(survDivorce.data, null, 2) + '\n', 'utf8');
}

// Helper: clean and enforce title <= 58 chars and unique across all surviving posts
function cleanTitle(raw, lang) {
  let t = String(raw || '')
    .replace(/\s*\|\s*Adv\.?\s*Md\.?\s*Shah\s*Alam.*$/i, '')
    .replace(/\s*\|\s*Advocate\s*Md\.?\s*Shah\s*Alam.*$/i, '')
    .replace(/\s*\|\s*এডভোকেট\s*মো[ঃ.]?\s*শাহ\s*আলম.*$/i, '')
    .replace(/\s*\|\s*অ্যাডভোকেট\s*মো[ঃ.]?\s*শাহ\s*আলম.*$/i, '')
    .replace(/\s*\(\s*\)\s*/g, ' ')
    .replace(/\s*\((?:2026|২০২৬)\)\s*/g, ' ')
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (t.length > 58) {
    const cut = t.slice(0, 58);
    const lastSpace = cut.lastIndexOf(' ');
    t = (lastSpace > 32 ? cut.slice(0, lastSpace) : cut).replace(/[\s|:–—,-]+$/, '');
  }
  if (t.length < 20) {
    t = lang === 'bn' ? `${t} | আইনজীবী পরামর্শ` : `${t} | BD Legal Guide`;
    if (t.length > 58) t = t.slice(0, 58).trim();
  }
  return t;
}

function cleanDescription(raw, title, lang) {
  let d = stripTags(raw || '')
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (d.length < 140) {
    const suffix = lang === 'bn'
      ? ' বাংলাদেশ সুপ্রিম কোর্টের আইনজীবী এডভোকেট মোঃ শাহ আলমের চেম্বার থেকে বিস্তারিত আইনি পরামর্শ ও সমাধান জানুন।'
      : ' Learn exact Bangladesh legal procedures, court fees, required documents, and remedies from Advocate Md. Shah Alam.';
    d = `${d}${d.endsWith('.') || d.endsWith('।') ? '' : '.'}${suffix}`.trim();
  }
  if (d.length > 160) {
    const cut = d.slice(0, 159);
    const lastSpace = cut.lastIndexOf(' ');
    d = (lastSpace > 135 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:-]+$/, '') + '.';
  }
  if (d.length < 140) {
    d = (d + (lang === 'bn' ? ' উত্তরা চেম্বারে যোগাযোগ করুন।' : ' Contact our Dhaka chamber today.')).slice(0, 160);
  }
  return d;
}

const usedTitles = new Set();
const usedDescs = new Set();
let titleFixedCount = 0;
let descFixedCount = 0;

const survivingPosts = posts.filter(p => !mergeMap.has(p.path));
// Sort by impressions desc so highest-traffic posts get first pick of clean titles
survivingPosts.sort((a, b) => b.impressions - a.impressions);

for (const p of survivingPosts) {
  let t = cleanTitle(p.data.metaTitle || p.data.title, p.lang);
  if (usedTitles.has(t.toLowerCase())) {
    const tag = p.lang === 'bn' ? ' (গাইড)' : ' (BD Law)';
    const base = t.slice(0, 58 - tag.length).trim();
    t = `${base}${tag}`;
    let n = 2;
    while (usedTitles.has(t.toLowerCase())) {
      const numTag = ` (${n++})`;
      t = `${base.slice(0, 58 - numTag.length).trim()}${numTag}`;
    }
  }
  usedTitles.add(t.toLowerCase());

  let d = cleanDescription(p.data.metaDescription || p.data.heroIntro || t, t, p.lang);
  if (usedDescs.has(d.toLowerCase())) {
    const extra = p.lang === 'bn' ? ` [${p.data.category || 'আইনি গাইড'}]` : ` [${p.data.category || 'Bangladesh Law'}]`;
    d = (d.slice(0, 160 - extra.length).trim() + extra).slice(0, 160);
  }
  usedDescs.add(d.toLowerCase());

  if (p.data.metaTitle !== t || p.data.metaDescription !== d) {
    p.data.metaTitle = t;
    p.data.metaDescription = d;
    fs.writeFileSync(p.filePath, JSON.stringify(p.data, null, 2) + '\n', 'utf8');
    titleFixedCount++;
    descFixedCount++;
  }
}

console.log(`Normalized & deduplicated titles/descriptions on ${titleFixedCount} surviving posts.`);

// Write consolidation-plan.csv (all 720 posts)
const planRows = [];
for (const p of posts) {
  const cl = clusterByPost.get(p.path);
  const isPillar = cl?.pillar.path === p.path && !mergeMap.has(p.path);
  let action = 'KEEP_AS_IS';
  let targetUrl = `${BASE}${p.path}`;
  let reason = 'Distinct search intent within topic cluster';

  if (mergeMap.has(p.path)) {
    action = 'MERGE_301';
    targetUrl = `${BASE}${mergeMap.get(p.path)}`;
    reason = p.wordCount < 500
      ? `Thin content (${p.wordCount} words) merged into cluster pillar`
      : 'High content overlap (>=0.85 similarity) merged into stronger pillar';
  } else if (isPillar) {
    reason = `Cluster pillar (score=${p.score.toFixed(1)}, imp=${p.impressions}, clicks=${p.clicks})`;
  }

  planRows.push([
    cl?.clusterId || '',
    p.lang,
    p.path,
    isPillar ? 'YES' : 'NO',
    action,
    targetUrl,
    p.impressions,
    p.clicks,
    p.wordCount,
    p.data.metaTitle || '',
    reason
  ]);
}
writeCsv(
  path.join(ROOT, 'consolidation-plan.csv'),
  ['cluster_id', 'lang', 'path', 'is_pillar', 'action', 'target_url', 'gsc_impressions_30d', 'gsc_clicks_30d', 'word_count', 'final_title', 'reason'],
  planRows
);
console.log(`Wrote consolidation-plan.csv (${planRows.length} rows).`);

// Update vercel.json and write redirects.csv
const vercel = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));
const existingSrcSet = new Set((vercel.redirects || []).filter(r => !r.has).map(r => r.source));

for (const [src, dest] of mergeMap.entries()) {
  if (!existingSrcSet.has(src)) {
    vercel.redirects.push({ source: src, destination: dest, statusCode: 301 });
    existingSrcSet.add(src);
  }
}

// Flatten any existing redirects in vercel.json so chain depth <= 1
const redirLookup = new Map((vercel.redirects || []).filter(r => !r.has && !r.source.includes(':')).map(r => [r.source, r.destination]));
for (const r of vercel.redirects) {
  if (r.has || r.source.includes(':')) continue;
  const seen = new Set([r.source]);
  let dest = r.destination;
  while (redirLookup.has(dest) && !seen.has(dest)) {
    seen.add(dest);
    dest = redirLookup.get(dest);
  }
  r.destination = dest;
}

fs.writeFileSync(path.join(ROOT, 'vercel.json'), JSON.stringify(vercel, null, 2) + '\n', 'utf8');

const csvRedirects = (vercel.redirects || [])
  .filter(r => !r.has)
  .map(r => [r.source, r.destination, r.statusCode || 301]);
writeCsv(path.join(ROOT, 'redirects.csv'), ['from', 'to', 'status'], csvRedirects);
console.log(`Updated vercel.json and wrote redirects.csv (${csvRedirects.length} rules).`);
