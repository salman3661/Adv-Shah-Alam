const fs = require('fs');
const path = require('path');

const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
const redirects = config.redirects || [];

console.log(`Total redirects: ${redirects.length}`);

// 1. Check self redirects
const selfRedirects = redirects.filter(r => r.source === r.destination);
console.log('Self-redirects (source === destination):', selfRedirects);

// 2. Check redirect map for loops & chains
const map = new Map();
for (const r of redirects) {
  if (r.has) continue;
  if (map.has(r.source)) {
    console.log('Duplicate source:', r.source);
  }
  map.set(r.source, r.destination);
}

// Check chains and loops
for (const [src, dest] of map.entries()) {
  if (src === dest) {
    console.log(`Loop: ${src} -> ${dest}`);
  }
  if (map.has(dest)) {
    const next = map.get(dest);
    console.log(`Chain: ${src} -> ${dest} -> ${next}`);
    if (next === src) {
      console.log(`Circular Loop: ${src} <-> ${dest}`);
    }
  }
}

// 3. Check for special / hidden unicode characters
for (const r of redirects) {
  for (let i = 0; i < r.source.length; i++) {
    const code = r.source.charCodeAt(i);
    if (code > 127) {
      console.log(`Non-ascii char in source: ${r.source} (char code ${code} at ${i})`);
    }
  }
}
