const fs = require('fs');
const blog = fs.readFileSync('src/data/blogPosts.js','utf8');
const sitemap = fs.readFileSync('dist/sitemap.xml','utf8');
const app = fs.readFileSync('src/App.jsx','utf8');

// Extract routes
const routes = [];
const routeRe = /path="([^"]+)"/g;
let m;
while ((m = routeRe.exec(app)) !== null) routes.push(m[1]);
console.log('All routes:', routes.join(', '));

// Check if ghost pages in sitemap
const sitemapGhosts = ['/about', '/contact', '/faq', '/bn/about', '/bn/contact', '/bn/faq', '/bn'];
console.log('\n=== SITEMAP GHOST ROUTE CHECK ===');
sitemapGhosts.forEach(r => {
  const inSitemap = sitemap.includes('advmdshahalam.me' + r + '<');
  const inRoutes = routes.includes(r);
  if (inSitemap && !inRoutes) {
    console.log('[GHOST] ' + r + ' IN sitemap but NOT in App.jsx routes');
  } else if (inSitemap) {
    console.log('[OK]    ' + r);
  }
});

// PUBLISHED constant value
const publishedConst = (blog.match(/const PUBLISHED = '([^']+)'/) || [])[1];
console.log('\nPUBLISHED constant:', publishedConst);

// Count future-dated posts - use simple string search
const today = '2026-04-03';
let futureCount = 0;
const futureList = [];
const slugs = [...blog.matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1]);
const dates = [...blog.matchAll(/publishedDate:\s*'([^']+)'/g)].map(m => m[1]);
console.log('\nTotal posts:', slugs.length, '| Dates found:', dates.length);
for (let i = 0; i < Math.min(slugs.length, dates.length); i++) {
  if (dates[i] > today) { futureList.push(slugs[i] + ' (' + dates[i] + ')'); futureCount++; }
}
console.log('Future-dated (noindex) posts:', futureCount);
futureList.forEach(p => console.log('  ' + p));

// Check App.jsx for /advocate-md-shah-alam route
const hasAdvocate = app.includes('advocate-md-shah-alam');
const hasEducation = app.includes('education');
const hasTaxLawyer = app.includes('tax-lawyer');
const hasCorporate = app.includes('company-corporate-lawyer');
console.log('\nKey route checks:');
console.log('advocate-md-shah-alam:', hasAdvocate);
console.log('education:', hasEducation);
console.log('tax-lawyer:', hasTaxLawyer);
console.log('company-corporate-lawyer:', hasCorporate);

// Check if advocate page is in sitemap
console.log('\nAdvocate page in sitemap:', sitemap.includes('advocate-md-shah-alam'));
console.log('Education page in sitemap:', sitemap.includes('/education'));
console.log('Tax lawyer in sitemap:', sitemap.includes('tax-lawyer'));
