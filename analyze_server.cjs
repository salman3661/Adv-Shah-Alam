const fs = require('fs');
const html = fs.readFileSync('server_html.html', 'utf8');

console.log('1. AdSense script in head:', html.includes('pagead2.googlesyndication.com'));
console.log('2. Client ID:', html.includes('ca-pub-1781126556775676'));

const jsAssets = html.match(/assets\/[^"]+\.js/g) || [];
console.log('3. Script tags in HTML:', jsAssets);
