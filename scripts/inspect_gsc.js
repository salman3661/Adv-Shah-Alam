const xlsx = require('xlsx');
const path = require('path');

const filePath = path.join(__dirname, '..', 'Search Console CSV', 'Performance Last 24Hr.xlsx');
const workbook = xlsx.readFile(filePath);

const queries = xlsx.utils.sheet_to_json(workbook.Sheets['Queries']);
queries.sort((a,b) => (b.Impressions || 0) - (a.Impressions || 0));

console.log('=== NEXT BATCH OF SEARCH CONSOLE QUERIES (35 - 100) ===');
queries.slice(35, 105).forEach((q, idx) => {
  const query = q['Top queries'];
  const imp = q['Impressions'];
  const clk = q['Clicks'];
  const ctr = (Number(q['CTR'] || 0) * 100).toFixed(1);
  const pos = Number(q['Position'] || 0).toFixed(1);
  console.log(`${idx+36}. "${query}" | Imp: ${imp} | Clicks: ${clk} | CTR: ${ctr}% | Pos: ${pos}`);
});
