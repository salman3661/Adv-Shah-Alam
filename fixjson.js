const fs = require('fs');

const file = 'src/content/posts/en/flat-apartment-purchase-legal-checklist-bangladesh.json';
let content = fs.readFileSync(file, 'utf8');

// The problem: the file has literal " characters inside a JSON string value
// around "2–3 years" - these need to be escaped as \"
// But we can't just replace all " because those are used for the JSON structure
// 
// The actual content in the file at that position is:
// Vague "2–3 years" timelines
// We need to replace the quotes with unicode left/right double quotes or escape them

// Replace the specific unescaped double-quoted text
const before = 'Vague "2\u20133 years" timelines';
const after = 'Vague 2\u20133 year timelines';

if (content.includes(before)) {
  content = content.replace(before, after);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Replacement made. Validating...');
} else {
  console.log('Pattern not found. Checking what is there...');
  const pos = 12531 - 100;
  console.log(JSON.stringify(content.substring(pos, pos + 250)));
}

try {
  JSON.parse(content);
  console.log('JSON is now VALID');
} catch(e) {
  console.log('Still has error:', e.message);
}
