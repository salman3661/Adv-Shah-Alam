const fs = require('fs');
const html = fs.readFileSync('live_dom_dump.html', 'utf8');
const matches = html.match(/<ins class="adsbygoogle"[\s\S]*?<\/ins>/g) || [];
console.log('Ad #1:');
console.log(matches[1]);
