const fs = require('fs');
const content = fs.readFileSync('new_posts_en_2.js', 'utf8');
const wrapped = 'const posts = [\n' + content + '\n];';
fs.writeFileSync('temp.js', wrapped);
