const fs = require('fs');
const html = fs.readFileSync('live_dom_dump.html', 'utf8');

const matches = html.match(/<ins class="adsbygoogle"[\s\S]*?<\/ins>/g) || [];
console.log('Inspecting each <ins> container:');

matches.forEach((m, idx) => {
  const slotMatch = m.match(/data-ad-slot="([^"]+)"/);
  const slot = slotMatch ? slotMatch[1] : 'unknown';
  const hasIframe = m.includes('<iframe');
  const iframeSrc = (m.match(/<iframe[^>]+id="([^"]+)"/) || [])[1] || 'none';
  const innerHtmlLen = m.length;
  console.log(`Ad #${idx} (Slot: ${slot}): hasIframe=${hasIframe}, iframeId=${iframeSrc}, length=${innerHtmlLen}`);
});
