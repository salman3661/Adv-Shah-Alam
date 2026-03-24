const fs = require('fs');
const fileContent = fs.readFileSync('./src/data/blogPostsBn.js', 'utf-8');
const evalContent = fileContent
    .replace(/export\s+default\s+postsBn;/, 'module.exports = postsBn;')
    .replace(/export\s+const\s+isPublishedBn/, 'const isPublishedBn');
fs.writeFileSync('./temp2.js', evalContent);
const posts = require('./temp2.js');
const newPosts = posts.filter(p => p.publishedDate === '2026-03-24');
console.log("Found: " + newPosts.map(p => p.slug).join(', '));
fs.unlinkSync('./temp2.js');
