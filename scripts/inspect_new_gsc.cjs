const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const dir = path.join(__dirname, '..', 'Search Console CSV');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.xlsx'));

files.forEach(file => {
  console.log('====================================');
  console.log('FILE:', file);
  console.log('====================================');
  const wb = XLSX.readFile(path.join(dir, file));
  wb.SheetNames.forEach(sheetName => {
    const ws = wb.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(ws);
    console.log(`Sheet: ${sheetName} | Rows: ${data.length}`);
    if (data.length > 0) {
      console.log('  Keys:', Object.keys(data[0]));
      console.log('  Top 5:');
      data.slice(0, 5).forEach((row, i) => console.log(`    ${i+1}.`, JSON.stringify(row)));
    }
  });
});
