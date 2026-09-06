const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const dir = path.join(__dirname, '..', 'Search Console CSV');
const file7d = path.join(dir, 'advmdshahalam.me-Performance-on-Search-2026-09-06 (1).xlsx');
const wb7d = XLSX.readFile(file7d);
const queries7d = XLSX.utils.sheet_to_json(wb7d.Sheets['Queries']);

const file24h = path.join(dir, 'advmdshahalam.me-Performance-on-Search-2026-09-06.xlsx');
const wb24h = XLSX.readFile(file24h);
const queries24h = XLSX.utils.sheet_to_json(wb24h.Sheets['Queries']);

const bnPostsDir = path.join(__dirname, '..', 'src', 'content', 'posts', 'bn');
const existingFiles = fs.readdirSync(bnPostsDir).filter(f => f.endsWith('.json'));

console.log(`Total BN post files: ${existingFiles.length}`);

// Let's inspect Bengali queries with highest impressions and CTR
const bnQueries = queries7d.filter(q => {
  const query = q['Top queries'];
  // Check if contains Bengali characters
  return /[\u0980-\u09FF]/.test(query);
});

console.log(`Bengali queries in 7d: ${bnQueries.length}`);

// Sort by impressions
const topBnImp = [...bnQueries].sort((a, b) => b.Impressions - a.Impressions);

console.log('\n--- TOP BENGALI QUERIES BY IMPRESSIONS ---');
topBnImp.slice(0, 45).forEach((q, i) => {
  console.log(`${i+1}. "${q['Top queries']}" | Clicks: ${q.Clicks}, Imp: ${q.Impressions}, CTR: ${(q.CTR*100).toFixed(1)}%, Pos: ${q.Position?.toFixed(1)}`);
});

// Sort by CTR with min 10 impressions
const topBnCtr = [...bnQueries]
  .filter(q => q.Impressions >= 10)
  .sort((a, b) => b.CTR - a.CTR);

console.log('\n--- TOP BENGALI QUERIES BY CTR (min 10 imp) ---');
topBnCtr.slice(0, 35).forEach((q, i) => {
  console.log(`${i+1}. "${q['Top queries']}" | Clicks: ${q.Clicks}, Imp: ${q.Impressions}, CTR: ${(q.CTR*100).toFixed(1)}%, Pos: ${q.Position?.toFixed(1)}`);
});
