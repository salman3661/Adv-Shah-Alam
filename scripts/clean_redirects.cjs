const fs = require('fs');
const path = require('path');

// 1. Read vercel.json
const vercel = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
let redirects = vercel.redirects || [];

// Fix 1: Remove self redirects
redirects = redirects.filter(r => {
  if (!r.has && r.source === r.destination) {
    console.log(`Removed self-redirect: ${r.source}`);
    return false;
  }
  return true;
});

// Fix 2: Clean soft hyphens and invisible chars
redirects = redirects.map(r => {
  const cleanSource = r.source.replace(/[\u00ad\u200b\u200c\u200d]/g, '');
  const cleanDest = r.destination.replace(/[\u00ad\u200b\u200c\u200d]/g, '');
  return { ...r, source: cleanSource, destination: cleanDest };
});

// Fix 3: Flatten redirect chains
// Build resolution map
const directMap = new Map();
for (const r of redirects) {
  if (r.has) continue;
  directMap.set(r.source, r.destination);
}

// Function to resolve final destination (max 5 hops to prevent loop)
function resolveFinal(src) {
  let curr = src;
  let hops = 0;
  while (directMap.has(curr) && hops < 5) {
    curr = directMap.get(curr);
    hops++;
  }
  return curr;
}

// Flatten
const flattenedRedirects = [];
const seenSources = new Set();

for (const r of redirects) {
  if (r.has) {
    flattenedRedirects.push(r);
    continue;
  }
  
  if (seenSources.has(r.source)) {
    console.log(`Removed duplicate redirect source: ${r.source}`);
    continue;
  }
  seenSources.add(r.source);
  
  const finalDest = resolveFinal(r.source);
  if (finalDest === r.source) {
    console.log(`Skipping circular loop: ${r.source}`);
    continue;
  }
  
  flattenedRedirects.push({
    source: r.source,
    destination: finalDest,
    statusCode: 301
  });
}

vercel.redirects = flattenedRedirects;
fs.writeFileSync('vercel.json', JSON.stringify(vercel, null, 2), 'utf8');

console.log(`Cleaned redirects! Total valid flattened redirects: ${flattenedRedirects.length}`);
