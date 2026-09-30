const fs = require('fs');
const html = fs.readFileSync('live_dom_new.html', 'utf8');
const parts = html.split('<div class="adsense-wrapper');
for (let i = 1; i <= 4; i++) {
  console.log(`\n=== WRAPPER ${i} FULL ===`);
  console.log(parts[i].slice(0, 700));
}
