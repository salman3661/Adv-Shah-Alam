const fs = require('fs');
const path = require('path');

const enDir = 'src/content/posts/en';
const bnDir = 'src/content/posts/bn';

function getTopPosts(dir) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  const posts = files.map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')));
  // Sort by clicks/impressions or title
  return posts
    .filter(p => !p.isDraft)
    .sort((a, b) => ((b.clicks || 0) * 10 + (b.impressions || 0)) - ((a.clicks || 0) * 10 + (a.impressions || 0)))
    .slice(0, 10)
    .map(p => p.slug);
}

console.log('Top EN Slugs:', getTopPosts(enDir));
console.log('Top BN Slugs:', getTopPosts(bnDir));
