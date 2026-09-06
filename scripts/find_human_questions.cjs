const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const dir = path.join(__dirname, '..', 'Search Console CSV');
const wb7d = XLSX.readFile(path.join(dir, 'advmdshahalam.me-Performance-on-Search-2026-09-06 (1).xlsx'));
const queries7d = XLSX.utils.sheet_to_json(wb7d.Sheets['Queries']);

const wb24h = XLSX.readFile(path.join(dir, 'advmdshahalam.me-Performance-on-Search-2026-09-06.xlsx'));
const queries24h = XLSX.utils.sheet_to_json(wb24h.Sheets['Queries']);

const allQueries = [...queries7d, ...queries24h];
const bn = allQueries.filter(q => /[\u0980-\u09FF]/.test(q['Top queries']));

const questionKeywords = ['কিভাবে', 'কীভাবে', 'কি কি', 'কী কী', 'কী করব', 'কি করব', 'করণীয়', 'কত টাকা', 'কত খরচ', 'নিয়ম', 'উপায়', 'শাস্তি', 'বাঁচব', 'বাচার', 'পাবেন', 'যায় কি', 'হলে কি', 'না দিলে', 'করলে কি'];

const humanQuestions = bn.filter(q => {
  const query = q['Top queries'];
  return questionKeywords.some(k => query.includes(k)) || query.includes('কি') || query.includes('কী');
});

const map = new Map();
humanQuestions.forEach(q => {
  const query = q['Top queries'].trim();
  if (!map.has(query)) {
    map.set(query, { query, clicks: q.Clicks || 0, imp: q.Impressions || 0, pos: q.Position || 0, ctr: q.CTR || 0 });
  } else {
    const item = map.get(query);
    item.clicks = Math.max(item.clicks, q.Clicks || 0);
    item.imp = Math.max(item.imp, q.Impressions || 0);
  }
});

const list = Array.from(map.values()).sort((a,b) => b.clicks - a.clicks || b.imp - a.imp);

console.log(`Total question queries: ${list.length}`);
list.slice(0, 60).forEach((q, i) => {
  console.log(`${i+1}. "${q.query}" | Clicks: ${q.clicks}, Imp: ${q.imp}, CTR: ${(q.ctr*100).toFixed(1)}%, Pos: ${q.pos.toFixed(1)}`);
});
