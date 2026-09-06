const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'src', 'content', 'posts', 'bn');

const slugs = [
  'biye-notun-ain-2026-kabinnama-sarkari-fee-hisab',
  'madok-mamla-jamin-niyom-madokdrobbo-ain-2026',
  'thanay-ovijog-dakhil-online-gd-korar-niyom-2026',
  'christian-uttaradhikar-ain-sampatti-banton-bangladesh-2026',
  'paurosabha-elakay-jomi-registry-khoroch-hisab-2026',
  'jamin-pawar-por-kakhon-nakoch-hote-pare-ain-2026',
  'mrito-babar-sampatti-banton-faraiz-hisab-2026',
  'oprotteharjogyo-power-of-attorney-batil-korar-ain-2026',
  'nabaloker-sampatti-bikroy-o-ferot-ain-2026',
  'stree-korthrik-swamike-talak-denmohor-niyom-2026'
];

slugs.forEach(slug => {
  const p = JSON.parse(fs.readFileSync(path.join(dir, slug + '.json'), 'utf8'));
  let text = p.title + ' ' + (p.heroIntro || '') + ' ';
  if (p.quickAnswer) text += p.quickAnswer.heading + ' ' + (p.quickAnswer.points || []).join(' ');
  p.sections.forEach(s => {
    text += ' ' + s.heading + ' ' + s.content.replace(/<[^>]+>/g, ' ');
  });
  p.faqs.forEach(f => {
    text += ' ' + f.question + ' ' + f.answer;
  });
  const words = text.trim().split(/\s+/).length;
  console.log(`${slug} -> Words: ${words} (${p.sections.length} sections)`);
});
