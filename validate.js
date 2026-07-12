const fs = require('fs');
const path = require('path');

const dir = 'src/content/posts/en';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

let hasErrors = false;
for (const f of files) {
  const fullPath = path.join(dir, f);
  const content = fs.readFileSync(fullPath, 'utf8');
  try {
    JSON.parse(content);
  } catch(e) {
    hasErrors = true;
    console.log(`ERROR in ${f}: ${e.message}`);
    const pos = parseInt(e.message.match(/position (\d+)/)?.[1] || 0);
    const snippet = content.substring(Math.max(0,pos-50), pos+80);
    console.log('Context:', JSON.stringify(snippet));
    console.log('---');
  }
}
if (!hasErrors) console.log('All JSON files are VALID');
