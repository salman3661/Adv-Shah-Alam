const fs = require('fs');
const html = fs.readFileSync('live_dom_new.html', 'utf8');
const iframes = html.match(/<iframe id="aswift_\d+[^>]*>/g) || [];
console.log('Total iframes found:', iframes.length);
iframes.forEach((ifr, idx) => {
  console.log(`\n--- IFRAME ${idx} ---`);
  console.log(ifr);
});
