const fs = require('fs');

if (!fs.existsSync('live_dom_mobile.html')) {
  console.log('not found');
  process.exit(1);
}

const html = fs.readFileSync('live_dom_mobile.html', 'utf8');
const insTags = html.match(/<ins[^>]*>/g) || [];
console.log('Mobile <ins> tags:', insTags.length);

insTags.forEach((tag, idx) => {
  const slotMatch = tag.match(/data-ad-slot="([^"]+)"/);
  const statusMatch = tag.match(/data-ad-status="([^"]+)"/);
  const adsbygoogleMatch = tag.match(/data-adsbygoogle-status="([^"]+)"/);
  console.log(idx, 'Slot:', slotMatch ? slotMatch[1] : 'none', '| Ad Status:', statusMatch ? statusMatch[1] : 'none', '| Google:', adsbygoogleMatch ? adsbygoogleMatch[1] : 'none');
});
