const fs = require('fs');
const path = require('path');

// 1. Read vercel.json redirects
const vercel = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
const redirects = vercel.redirects || [];

// Create a mapping from redirect source to final destination
const redirectMap = new Map();
for (const r of redirects) {
  if (r.has) continue;
  redirectMap.set(r.source, r.destination);
}

console.log(`Loaded ${redirectMap.size} redirect rules for internal link replacement.`);

// Function to scan all files
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

const targetFiles = scanDir('src').concat(['index.html']);

let totalReplacements = 0;
let filesModified = 0;

// Sort sources by length descending to avoid partial substring collisions
const sortedSources = Array.from(redirectMap.keys()).sort((a, b) => b.length - a.length);

for (const file of targetFiles) {
  if (file.includes('vercel.json') || file.includes('scripts')) continue;
  
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  let fileReplacements = 0;
  
  for (const src of sortedSources) {
    const dest = redirectMap.get(src);
    // Don't replace exact root paths if they might collide, but for specific URLs:
    if (src === '/bn' || src === '/about' || src === '/privacy') {
      // Use boundary / quote matching for short words
      // e.g. href="/bn" or "to": "/bn" or href="/privacy"
      const regexHref = new RegExp(`href=["']${src}["']`, 'g');
      content = content.replace(regexHref, `href="${dest}"`);
      
      const regexTo = new RegExp(`to=["']${src}["']`, 'g');
      content = content.replace(regexTo, `to="${dest}"`);
      
      const regexJson = new RegExp(`"${src}"`, 'g');
      content = content.replace(regexJson, `"${dest}"`);
    } else {
      if (content.includes(src)) {
        const count = (content.match(new RegExp(src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
        content = content.split(src).join(dest);
        fileReplacements += count;
      }
    }
  }
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    filesModified++;
    totalReplacements += fileReplacements;
    console.log(`[UPDATED] ${file} (${fileReplacements} links fixed)`);
  }
}

console.log(`Finished updating internal links! Modified ${filesModified} files with ${totalReplacements} updated links.`);
