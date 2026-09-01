const fs = require('fs');
const path = require('path');

function inspectDir(dir, lang) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  let count = 0;
  for (const f of files) {
    const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
    let totalText = '';
    if (data.heroIntro) totalText += data.heroIntro;
    if (data.quickAnswer) totalText += JSON.stringify(data.quickAnswer);
    if (Array.isArray(data.sections)) {
      totalText += data.sections.map(s => (s.h2 || '') + (s.content || '')).join(' ');
    }
    if (Array.isArray(data.faqs)) {
      totalText += data.faqs.map(faq => (faq.question || '') + (faq.answer || '')).join(' ');
    }
    if (typeof data.content === 'string') totalText += data.content;
    
    if (totalText.trim().length < 300) {
      console.log(`[EMPTY OR VERY THIN POST] ${lang}: ${f} (text length: ${totalText.trim().length})`);
      count++;
    }
  }
  console.log(`${lang}: found ${count} thin posts out of ${files.length}`);
}

console.log('--- EN ---');
inspectDir('src/content/posts/en', 'en');

console.log('--- BN ---');
inspectDir('src/content/posts/bn', 'bn');
