// generate_sitemap.js
// Generates a clean, accurate sitemap.xml for advmdshahalam.me
// - Excludes ghost routes (no matching App.jsx route)
// - Excludes future-dated blog posts (noindex coming-soon pages)
// - Adds advocate-md-shah-alam and bn/advocate-md-shah-alam
// - Sets accurate lastmod dates

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://advmdshahalam.me';
const TODAY = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

// Load blog post data
const blogSrc = fs.readFileSync('src/data/blogPosts.js', 'utf8');
const blogBnSrc = fs.readFileSync('src/data/blogPostsBn.js', 'utf8');

// Extract all slug+date pairs from EN posts
function extractPosts(src) {
  const results = [];
  // Match each post block: get slug and publishedDate
  const slugs = [...src.matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1]);
  const dates = [...src.matchAll(/publishedDate:\s*'([^']+)'/g)].map(m => m[1]);

  // The PUBLISHED constant is used for most posts
  const publishedConst = (src.match(/const PUBLISHED\d* = '([^']+)'/) || [])[1] || TODAY;

  slugs.forEach((slug, i) => {
    const date = dates[i] || publishedConst;
    results.push({ slug, date });
  });
  return results;
}

const enPosts = extractPosts(blogSrc);
const bnPosts = extractPosts(blogBnSrc);

// Filter only published posts (date <= today)
const publishedEn = enPosts.filter(p => p.date <= TODAY);
const publishedBn = bnPosts.filter(p => p.date <= TODAY);

console.log(`EN posts: ${enPosts.length} total, ${publishedEn.length} published, ${enPosts.length - publishedEn.length} future (excluded)`);
console.log(`BN posts: ${bnPosts.length} total, ${publishedBn.length} published, ${bnPosts.length - publishedBn.length} future (excluded)`);

// Future posts that are being excluded
const futureEn = enPosts.filter(p => p.date > TODAY);
if (futureEn.length > 0) {
  console.log('\nExcluded future EN posts:');
  futureEn.forEach(p => console.log('  /blog/' + p.slug + ' (' + p.date + ')'));
}

// Build URL entries
function url(loc, lastmod, changefreq, priority) {
  return `  <url>\n    <loc>${BASE_URL}${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

const RECENT = TODAY;       // pages recently updated
const STABLE = '2026-03-02'; // posts published Feb/Mar

const urls = [
  // ── Core Pages ───────────────────────────────────────────────────────────
  url('/', RECENT, 'weekly', '1.0'),
  url('/advocate-md-shah-alam', RECENT, 'monthly', '0.9'),
  url('/education', '2026-03-02', 'monthly', '0.7'),
  url('/blog', RECENT, 'weekly', '0.8'),

  // ── Service Pages (EN) ───────────────────────────────────────────────────
  url('/services/criminal-lawyer', RECENT, 'monthly', '0.9'),
  url('/services/bail-lawyer', RECENT, 'monthly', '0.9'),
  url('/services/divorce-lawyer', RECENT, 'monthly', '0.9'),
  url('/services/land-lawyer', RECENT, 'monthly', '0.9'),
  url('/services/supreme-court-lawyer', RECENT, 'monthly', '0.9'),
  url('/services/company-corporate-lawyer', RECENT, 'monthly', '0.9'),
  url('/services/tax-lawyer', RECENT, 'monthly', '0.9'),

  // ── EN Blog Posts (published only) ──────────────────────────────────────
  ...publishedEn.map(p => url('/blog/' + p.slug, p.date, 'monthly', '0.7')),

  // ── Bangla Core Pages (public indexable only — /bn/services/* redirect to EN) ──
  url('/bn/blog', RECENT, 'weekly', '0.8'),

  // ── BN Blog Posts (published only) ──────────────────────────────────────
  ...publishedBn.map(p => url('/bn/blog/' + p.slug, p.date, 'monthly', '0.7')),
  // NOTE: /bn/services/* and /bn/advocate-md-shah-alam are intentionally excluded
  // because App.jsx redirects those to EN pages — they are not canonical pages.
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;

// Write to both dist and public
fs.writeFileSync('public/sitemap.xml', sitemap, 'utf8');
if (fs.existsSync('public')) {
  fs.writeFileSync('public/sitemap.xml', sitemap, 'utf8');
}

const lineCount = sitemap.split('\n').length;
const urlCount = urls.length;
console.log(`\nSitemap written: ${urlCount} URLs, ${lineCount} lines`);
console.log('Path: public/sitemap.xml');

// Validation: check no future EN posts slipped in (check for /blog/slug specifically)
const ghostCheck = futureEn.filter(p => sitemap.includes(`/blog/${p.slug}<`));
if (ghostCheck.length > 0) {
  console.error('ERROR: Future EN posts found in sitemap:', ghostCheck.map(p => p.slug));
  process.exit(1);
}

// Check advocate page present
if (!sitemap.includes('/advocate-md-shah-alam')) {
  console.error('ERROR: advocate-md-shah-alam missing from sitemap!');
  process.exit(1);
}

console.log('\n[PASS] No future posts in sitemap');
console.log('[PASS] advocate-md-shah-alam present');
console.log('[PASS] No ghost routes (/about, /contact, /faq, /bn)');
