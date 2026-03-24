const fs = require('fs');
let content = fs.readFileSync('./src/data/blogPostsBn.js', 'utf8');

// The 15th post (already existed with date 2026-03-24)
// Let's print it to see if it needs fixing
const tempPath = './temp_eval.js';
fs.writeFileSync(tempPath, content.replace(/export\s+default\s+postsBn;/, 'module.exports = postsBn;').replace(/export\s+const\s+isPublishedBn/, 'const isPublishedBn'));
const posts = require(tempPath);
const post15 = posts.find(p => p.slug === 'udgam-kar-tds-bivaad-bangladesh');
console.log("Post 15 text:");
console.log(JSON.stringify(post15, null, 2));
fs.unlinkSync(tempPath);
