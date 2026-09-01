const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const dir = 'c:/Users/User/Desktop/Antigravity/Search Console CSV';
const f24 = path.join(dir, 'last 24 hr advmdshahalam.me-Performance-on-Search-2026-08-26.xlsx');
const f7d = path.join(dir, 'last 7 days advmdshahalam.me-Performance-on-Search-2026-08-26 (1).xlsx');

function inspectExcel(filepath, label) {
  console.log(`\n================== ${label} ==================`);
  const wb = xlsx.readFile(filepath);
  console.log('Sheet names:', wb.SheetNames);
  
  const qSheetName = wb.SheetNames.find(s => s.toLowerCase().includes('quer') || s.toLowerCase().includes('query') || s.toLowerCase().includes('queries')) || wb.SheetNames[0];
  const ws = wb.Sheets[qSheetName];
  const data = xlsx.utils.sheet_to_json(ws);
  console.log(`Total queries found in ${qSheetName}:`, data.length);
  
  // Sort by Impressions descending
  data.sort((a, b) => (b.Impressions || b.impressions || 0) - (a.Impressions || a.impressions || 0));
  
  console.log('\nTop 30 queries by impressions:');
  data.slice(0, 30).forEach((row, i) => {
    const q = row['Top queries'] || row['Query'] || row['query'] || Object.values(row)[0];
    const imp = row.Impressions || row.impressions || 0;
    const clk = row.Clicks || row.clicks || 0;
    const ctr = row.CTR || row.ctr || '0%';
    const pos = row.Position || row.position || 0;
    console.log(`${i + 1}. "${q}" | Imp: ${imp} | Clicks: ${clk} | CTR: ${ctr} | Pos: ${typeof pos === 'number' ? pos.toFixed(1) : pos}`);
  });

  return data;
}

inspectExcel(f24, 'LAST 24 HOURS (Aug 26, 2026)');
inspectExcel(f7d, 'LAST 7 DAYS (Aug 26, 2026)');
