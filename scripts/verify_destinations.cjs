const fs = require('fs');
const path = require('path');

const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
const redirects = config.redirects || [];

// Read all existing EN and BN post slugs
const enDir = 'src/content/posts/en';
const bnDir = 'src/content/posts/bn';

const enFiles = fs.readdirSync(enDir).filter(f => f.endsWith('.json'));
const bnFiles = fs.readdirSync(bnDir).filter(f => f.endsWith('.json'));

const enSlugs = new Set(enFiles.map(f => {
  const data = JSON.parse(fs.readFileSync(path.join(enDir, f), 'utf8'));
  return data.slug || f.replace('.json', '');
}));

const bnSlugs = new Set(bnFiles.map(f => {
  const data = JSON.parse(fs.readFileSync(path.join(bnDir, f), 'utf8'));
  return data.slug || f.replace('.json', '');
}));

console.log(`Found ${enSlugs.size} EN posts and ${bnSlugs.size} BN posts`);

const validCoreRoutes = new Set([
  '/',
  '/en',
  '/blog',
  '/bn/blog',
  '/advocate-md-shah-alam',
  '/education',
  '/contact',
  '/privacy-policy',
  '/services/criminal-lawyer',
  '/services/bail-lawyer',
  '/services/divorce-lawyer',
  '/services/land-lawyer',
  '/services/supreme-court-lawyer',
  '/services/company-corporate-lawyer',
  '/services/tax-lawyer'
]);

for (const r of redirects) {
  if (r.has) continue;
  let dest = r.destination;
  if (dest.startsWith('https://www.advmdshahalam.me')) {
    dest = dest.replace('https://www.advmdshahalam.me', '');
  }
  
  if (validCoreRoutes.has(dest)) continue;
  
  if (dest.startsWith('/blog/')) {
    const slug = dest.replace('/blog/', '');
    if (!enSlugs.has(slug)) {
      console.log(`[DEAD DESTINATION] ${r.source} -> ${r.destination} (EN slug "${slug}" not found!)`);
    }
  } else if (dest.startsWith('/bn/blog/')) {
    const slug = dest.replace('/bn/blog/', '');
    if (!bnSlugs.has(slug)) {
      console.log(`[DEAD DESTINATION] ${r.source} -> ${r.destination} (BN slug "${slug}" not found!)`);
    }
  } else {
    console.log(`[UNKNOWN DESTINATION] ${r.source} -> ${r.destination}`);
  }
}
