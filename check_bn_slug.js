const fs = require('fs');

const tempPath = './temp_blogPostsBn.js';
const posts = require(tempPath);

const newPosts = posts.filter(p => p.publishedDate === '2026-03-24');
console.log(newPosts.map(p => p.slug).join(', '));
