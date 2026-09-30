const fs = require('fs');

if (!fs.existsSync('live_dom_dump.html')) {
  console.log('live_dom_dump.html not found');
  process.exit(1);
}

const html = fs.readFileSync('live_dom_dump.html', 'utf8');
const insTags = html.match(/<ins[^>]*>/g) || [];
console.log('Total <ins> tags in live DOM:', insTags.length);

insTags.forEach((tag, idx) => {
  const slotMatch = tag.match(/data-ad-slot="([^"]+)"/);
  const slot = slotMatch ? slotMatch[1] : 'none';
  const formatMatch = tag.match(/data-ad-format="([^"]+)"/);
  const format = formatMatch ? formatMatch[1] : 'none';
  const layoutMatch = tag.match(/data-ad-layout="([^"]+)"/);
  const layout = layoutMatch ? layoutMatch[1] : 'none';
  const statusMatch = tag.match(/data-adsbygoogle-status="([^"]+)"/);
  const status = statusMatch ? statusMatch[1] : 'not-processed';
  const adStatusMatch = tag.match(/data-ad-status="([^"]+)"/);
  const adStatus = adStatusMatch ? adStatusMatch[1] : 'no-status';

  console.log(`[Ad #${idx}] Slot: ${slot} | Format: ${format} | Layout: ${layout} | Google: ${status} | Fill: ${adStatus}`);
});

const iframes = html.match(/<iframe id="aswift_[^>]*>/g) || [];
console.log('\nTotal AdSense iframes rendered:', iframes.length);
