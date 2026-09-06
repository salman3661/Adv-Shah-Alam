const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const dir = path.join(__dirname, '..', 'Search Console CSV');
const file7d = path.join(dir, 'advmdshahalam.me-Performance-on-Search-2026-09-06 (1).xlsx');
const file24h = path.join(dir, 'advmdshahalam.me-Performance-on-Search-2026-09-06.xlsx');

const wb7d = XLSX.readFile(file7d);
const queries7d = XLSX.utils.sheet_to_json(wb7d.Sheets['Queries']);

const wb24h = XLSX.readFile(file24h);
const queries24h = XLSX.utils.sheet_to_json(wb24h.Sheets['Queries']);

// Read existing bn post slugs
const bnPostsDir = path.join(__dirname, '..', 'src', 'content', 'posts', 'bn');
const existingSlugs = fs.readdirSync(bnPostsDir).map(f => f.replace('.json', ''));

console.log(`Existing BN posts: ${existingSlugs.length}`);

// Merge queries
const qMap = new Map();

queries7d.forEach(q => {
  const query = q['Top queries'].trim();
  qMap.set(query, {
    query,
    clicks7d: q.Clicks || 0,
    imp7d: q.Impressions || 0,
    ctr7d: q.CTR || 0,
    pos7d: q.Position || 0,
    clicks24h: 0,
    imp24h: 0,
    ctr24h: 0,
    pos24h: 0
  });
});

queries24h.forEach(q => {
  const query = q['Top queries'].trim();
  if (qMap.has(query)) {
    const item = qMap.get(query);
    item.clicks24h = q.Clicks || 0;
    item.imp24h = q.Impressions || 0;
    item.ctr24h = q.CTR || 0;
    item.pos24h = q.Position || 0;
  } else {
    qMap.set(query, {
      query,
      clicks7d: 0,
      imp7d: 0,
      ctr7d: 0,
      pos7d: 0,
      clicks24h: q.Clicks || 0,
      imp24h: q.Impressions || 0,
      ctr24h: q.CTR || 0,
      pos24h: q.Position || 0
    });
  }
});

const allQueries = Array.from(qMap.values());

// Filter high CTR (>= 5%) and significant impressions (>= 15)
const highCtr = allQueries
  .filter(q => (q.ctr7d >= 0.04 || q.ctr24h >= 0.05) && (q.imp7d >= 10 || q.imp24h >= 8))
  .sort((a, b) => b.clicks7d - a.clicks7d);

console.log('\n=== TOP HIGH CTR QUERIES ===');
highCtr.slice(0, 40).forEach((q, i) => {
  console.log(`${i+1}. "${q.query}" | 7d: ${q.clicks7d}c / ${q.imp7d}i (${(q.ctr7d*100).toFixed(1)}% CTR, pos ${q.pos7d.toFixed(1)}) | 24h: ${q.clicks24h}c / ${q.imp24h}i (${(q.ctr24h*100).toFixed(1)}%)`);
});

// Also look at highest impressions queries where CTR is low or moderate (Huge Opportunity)
const highImp = allQueries
  .filter(q => q.imp7d >= 100)
  .sort((a, b) => b.imp7d - a.imp7d);

console.log('\n=== HIGHEST IMPRESSIONS QUERIES (7D >= 100) ===');
highImp.slice(0, 30).forEach((q, i) => {
  console.log(`${i+1}. "${q.query}" | 7d: ${q.clicks7d}c / ${q.imp7d}i (${(q.ctr7d*100).toFixed(1)}% CTR, pos ${q.pos7d.toFixed(1)})`);
});

// 24h trending queries
const trending24h = allQueries
  .filter(q => q.clicks24h >= 1 || q.imp24h >= 20)
  .sort((a, b) => b.clicks24h - a.clicks24h || b.imp24h - a.imp24h);

console.log('\n=== TOP 24H ACTIVE QUERIES ===');
trending24h.slice(0, 30).forEach((q, i) => {
  console.log(`${i+1}. "${q.query}" | 24h: ${q.clicks24h}c / ${q.imp24h}i (${(q.ctr24h*100).toFixed(1)}%) | 7d: ${q.clicks7d}c / ${q.imp7d}i`);
});
