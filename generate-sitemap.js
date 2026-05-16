/**
 * Sitemap Generator for advmdshahalam.me
 * Scans all blog posts (EN/BN) and generates a complete sitemap.xml
 */
const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://advmdshahalam.me';
const TODAY = new Date().toISOString().split('T')[0];

// Static pages
const staticPages = [
  { loc: '/', priority: '1.0', changefreq: 'weekly', lastmod: TODAY },
  { loc: '/advocate-md-shah-alam', priority: '0.9', changefreq: 'monthly', lastmod: TODAY },
  { loc: '/blog', priority: '0.8', changefreq: 'weekly', lastmod: TODAY },
  { loc: '/bn/blog', priority: '0.8', changefreq: 'weekly', lastmod: TODAY },
  { loc: '/education', priority: '0.6', changefreq: 'monthly', lastmod: TODAY },
  // Service pages - high priority
  { loc: '/services/criminal-lawyer', priority: '0.9', changefreq: 'monthly', lastmod: TODAY },
  { loc: '/services/bail-lawyer', priority: '0.9', changefreq: 'monthly', lastmod: TODAY },
  { loc: '/services/divorce-lawyer', priority: '0.9', changefreq: 'monthly', lastmod: TODAY },
  { loc: '/services/land-lawyer', priority: '0.9', changefreq: 'monthly', lastmod: TODAY },
  { loc: '/services/supreme-court-lawyer', priority: '0.9', changefreq: 'monthly', lastmod: TODAY },
  { loc: '/services/company-corporate-lawyer', priority: '0.9', changefreq: 'monthly', lastmod: TODAY },
  { loc: '/services/tax-lawyer', priority: '0.9', changefreq: 'monthly', lastmod: TODAY },
];

// Redirected slugs to EXCLUDE from sitemap
const redirectedSlugs = new Set([
  'hire-criminal-lawyer-bangladesh',
  'hire-cyber-crime-lawyer-bangladesh',
  'contract-breach-specific-performance-bangladesh',
  'land-dispute-resolution-bangladesh',
]);

function getPublishedDate(jsonData) {
  return jsonData.publishedDate || jsonData.updatedDate || TODAY;
}

function scanBlogPosts(dir, prefix) {
  const posts = [];
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    if (!file.endsWith('.json')) continue;
    if (file === 'README.md') continue;
    
    try {
      const content = fs.readFileSync(path.join(dir, file), 'utf-8');
      const data = JSON.parse(content);
      
      // Skip drafts
      if (data.draft === true) continue;
      
      // Skip posts without a slug
      if (!data.slug) continue;
      
      // Skip redirected slugs
      if (redirectedSlugs.has(data.slug)) continue;
      
      // Skip future-dated posts
      const pubDate = data.publishedDate || data.updatedDate;
      if (pubDate && new Date(pubDate) > new Date()) continue;
      
      const lastmod = data.updatedDate || data.publishedDate || TODAY;
      
      posts.push({
        loc: `${prefix}/${data.slug}`,
        priority: '0.7',
        changefreq: 'monthly',
        lastmod: lastmod,
      });
    } catch (err) {
      // If JSON parsing fails, skip
      console.warn(`Skipping ${file}: ${err.message}`);
    }
  }
  
  return posts;
}

// Scan English and Bengali posts
const enPosts = scanBlogPosts(
  path.join(__dirname, 'src', 'content', 'posts', 'en'),
  '/blog'
);
const bnPosts = scanBlogPosts(
  path.join(__dirname, 'src', 'content', 'posts', 'bn'),
  '/bn/blog'
);

console.log(`Found ${enPosts.length} English blog posts`);
console.log(`Found ${bnPosts.length} Bengali blog posts`);

// Combine all URLs
const allUrls = [...staticPages, ...enPosts, ...bnPosts];

// Generate XML
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

for (const url of allUrls) {
  xml += '  <url>\n';
  xml += `    <loc>${DOMAIN}${url.loc}</loc>\n`;
  xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
  xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
  xml += `    <priority>${url.priority}</priority>\n`;
  xml += '  </url>\n';
}

xml += '</urlset>';

// Write sitemap
const outPath = path.join(__dirname, 'public', 'sitemap.xml');
fs.writeFileSync(outPath, xml, 'utf-8');

console.log(`\nGenerated sitemap.xml with ${allUrls.length} URLs`);
console.log(`Written to: ${outPath}`);
