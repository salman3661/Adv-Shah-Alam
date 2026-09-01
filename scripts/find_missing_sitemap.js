const fs = require('fs');

const sitemapXml = fs.readFileSync('public/sitemap.xml', 'utf8');

const bnPostDir = 'src/content/posts/bn';
const bnFiles = fs.readdirSync(bnPostDir).filter(f => f.endsWith('.json'));

console.log('=== Checking BN files against Sitemap ===');
let bnMissing = [];
bnFiles.forEach(f => {
  const data = JSON.parse(fs.readFileSync(`${bnPostDir}/${f}`, 'utf8'));
  const url = `https://www.advmdshahalam.me/bn/blog/${data.slug}`;
  if (!sitemapXml.includes(url)) {
    bnMissing.push({ file: f, slug: data.slug });
  }
});
console.log('Total BN missing from sitemap:', bnMissing.length);
bnMissing.forEach(m => console.log('  BN missing:', m.file, '->', m.slug));

const enPostDir = 'src/content/posts/en';
const enFiles = fs.readdirSync(enPostDir).filter(f => f.endsWith('.json'));

console.log('\n=== Checking EN files against Sitemap ===');
let enMissing = [];
enFiles.forEach(f => {
  const data = JSON.parse(fs.readFileSync(`${enPostDir}/${f}`, 'utf8'));
  const url = `https://www.advmdshahalam.me/blog/${data.slug}`;
  if (!sitemapXml.includes(url)) {
    enMissing.push({ file: f, slug: data.slug });
  }
});
console.log('Total EN missing from sitemap:', enMissing.length);
enMissing.forEach(m => console.log('  EN missing:', m.file, '->', m.slug));
