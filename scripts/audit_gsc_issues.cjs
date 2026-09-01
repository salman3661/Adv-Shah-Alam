const fs = require('fs');
const path = require('path');

// 1. Audit noindex pages in posts
const enDir = 'src/content/posts/en';
const bnDir = 'src/content/posts/bn';

const today = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Dhaka' }).split(' ')[0];
console.log('Today in Dhaka:', today);

function checkPosts(dir, lang) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  let draftCount = 0;
  let futureCount = 0;
  let missingContent = 0;
  let shortContent = 0;
  
  for (const f of files) {
    const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
    if (data.isDraft) {
      draftCount++;
      console.log(`[DRAFT] ${lang} ${f}`);
    }
    if (data.publishedDate > today) {
      futureCount++;
      console.log(`[FUTURE/SCHEDULED - NOINDEX] ${lang} ${f} (pubDate: ${data.publishedDate})`);
    }
    const body = (data.content || data.body || data.sections || '') + '';
    if (!body || body.length < 200) {
      missingContent++;
      console.log(`[THIN/EMPTY CONTENT - SOFT 404 RISK] ${lang} ${f} (length: ${body.length})`);
    }
  }
  console.log(`Summary for ${lang}: total ${files.length}, drafts: ${draftCount}, future: ${futureCount}, thin: ${missingContent}`);
}

console.log('--- EN POSTS ---');
checkPosts(enDir, 'en');

console.log('--- BN POSTS ---');
checkPosts(bnDir, 'bn');
