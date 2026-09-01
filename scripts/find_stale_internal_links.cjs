const fs = require('fs');
const path = require('path');

const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
const redirects = config.redirects || [];
const redirectSources = redirects.filter(r => !r.has).map(r => r.source);

console.log(`Checking internal links for ${redirectSources.length} redirect sources...`);

// Check all JSON posts
const dirs = ['src/content/posts/en', 'src/content/posts/bn', 'src'];

function scanDir(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory() && !full.includes('node_modules') && !full.includes('.git') && !full.includes('dist')) {
      files = files.concat(scanDir(full));
    } else if (e.isFile() && (full.endsWith('.json') || full.endsWith('.jsx') || full.endsWith('.js') || full.endsWith('.html'))) {
      files.push(full);
    }
  }
  return files;
}

const allFiles = scanDir('src').concat(['index.html', 'generate_sitemap.js']);

let foundAny = 0;
for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  for (const src of redirectSources) {
    if (content.includes(src) && !file.includes('vercel.json') && !file.includes('scripts')) {
      console.log(`[STALE LINK] In "${file}": references redirected URL "${src}"`);
      foundAny++;
    }
  }
}

console.log(`Scan finished. Found ${foundAny} stale internal references to redirected URLs.`);
