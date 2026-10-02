const fs = require('fs');
const html = fs.readFileSync('live_dom_dump.html', 'utf8');
const pos = html.indexOf('aswift_1');
console.log(html.substring(pos - 150, pos + 250));
