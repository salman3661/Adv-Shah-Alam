// generate_sitemap.js
// Auto-generates a comprehensive sitemap.xml for advmdshahalam.me
// - Scans ALL blog JSON files in src/content/posts/en/ and bn/
// - Excludes slugs that have 301 redirects (from vercel.json)
// - Uses non-www canonical domain

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.advmdshahalam.me';
const TODAY = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

// ── Load redirect sources from vercel.json to exclude them ──────────────────
const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
const redirectSources = new Set(
    (vercelConfig.redirects || [])
        .filter(r => !r.has) // skip conditional redirects (e.g. www→non-www)
        .map(r => r.source)
);

// ── Scan all EN blog post JSON files ────────────────────────────────────────
const enPostDir = path.join('src', 'content', 'posts', 'en');
const enJsonFiles = fs.readdirSync(enPostDir).filter(f => f.endsWith('.json'));
const enPosts = enJsonFiles.map(f => {
    const data = JSON.parse(fs.readFileSync(path.join(enPostDir, f), 'utf8'));
    return data;
}).filter(post => {
    // Exclude drafts
    if (post.isDraft) return false;
    // Exclude posts whose URL is a redirect source
    if (redirectSources.has(`/blog/${post.slug}`)) return false;
    // Exclude future-dated posts (not yet published — they render with noindex)
    if (post.publishedDate && post.publishedDate > TODAY) return false;
    return true;
});

// ── Scan all BN blog post JSON files ────────────────────────────────────────
const bnPostDir = path.join('src', 'content', 'posts', 'bn');
const bnJsonFiles = fs.readdirSync(bnPostDir).filter(f => f.endsWith('.json'));
const bnPosts = bnJsonFiles.map(f => {
    const data = JSON.parse(fs.readFileSync(path.join(bnPostDir, f), 'utf8'));
    return data;
}).filter(post => {
    if (post.isDraft) return false;
    if (redirectSources.has(`/bn/blog/${post.slug}`)) return false;
    // Exclude future-dated posts (not yet published — they render with noindex)
    if (post.publishedDate && post.publishedDate > TODAY) return false;
    return true;
});

// ── Helper: prefer lastModified → publishedDate → today ────────────────────
function getDate(post) {
    return post.lastModified || post.publishedDate || TODAY;
}

// ── Build URL entries ───────────────────────────────────────────────────────
function url(loc, lastmod, changefreq, priority) {
    return `  <url>\n    <loc>${BASE_URL}${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

const urls = [
    // ── Core Pages ───────────────────────────────────────────────────────────
    url('/', TODAY, 'weekly', '1.0'),
    url('/en', TODAY, 'weekly', '1.0'),
    url('/advocate-md-shah-alam', TODAY, 'monthly', '0.9'),
    url('/contact', TODAY, 'monthly', '0.9'),
    url('/blog', TODAY, 'weekly', '0.8'),
    url('/education', TODAY, 'monthly', '0.6'),
    url('/privacy-policy', TODAY, 'yearly', '0.3'),
    url('/terms', TODAY, 'yearly', '0.3'),

    // ── Service Pages ────────────────────────────────────────────────────────
    url('/services/criminal-lawyer', TODAY, 'monthly', '0.9'),
    url('/services/bail-lawyer', TODAY, 'monthly', '0.9'),
    url('/services/divorce-lawyer', TODAY, 'monthly', '0.9'),
    url('/services/land-lawyer', TODAY, 'monthly', '0.9'),
    url('/services/supreme-court-lawyer', TODAY, 'monthly', '0.9'),
    url('/services/company-corporate-lawyer', TODAY, 'monthly', '0.9'),
    url('/services/tax-lawyer', TODAY, 'monthly', '0.9'),

    // ── All EN Blog Posts (auto-detected, excluding redirected slugs) ────────
    ...enPosts.map(post => url('/blog/' + post.slug, getDate(post), 'monthly', '0.7')),

    // ── BN Blog Index ────────────────────────────────────────────────────────
    url('/bn/blog', TODAY, 'weekly', '0.7'),

    // ── All BN Blog Posts (auto-detected, excluding redirected slugs) ────────
    ...bnPosts.map(post => url('/bn/blog/' + post.slug, getDate(post), 'monthly', '0.6')),
];

// ── Generate XML ────────────────────────────────────────────────────────────
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;

// Write to public (Vite copies to dist at build time)
fs.writeFileSync('public/sitemap.xml', sitemap, 'utf8');

const enCount = enPosts.length;
const bnCount = bnPosts.length;
const urlCount = urls.length;

console.log(`\nSitemap written: ${urlCount} URLs`);
console.log(`  Core pages: 4`);
console.log(`  Service pages: 7`);
console.log(`  EN blog posts: ${enCount}`);
console.log(`  BN blog posts: ${bnCount}`);
console.log(`  BN blog index: 1`);
console.log(`Path: public/sitemap.xml`);
console.log(`Base URL: ${BASE_URL}`);

// ── Validation ──────────────────────────────────────────────────────────────
let errors = 0;

// Check no non-www URLs leaked in
if (sitemap.replace(/www\.advmdshahalam\.me/g, '').includes('advmdshahalam.me')) {
    console.error('ERROR: non-www bare URLs found in sitemap! Must be www only.');
    errors++;
}

// Check no redirect-source slugs leaked in
const redirectSourceSlugs = [...redirectSources];
const leaked = redirectSourceSlugs.filter(s => sitemap.includes(`<loc>${BASE_URL}${s}</loc>`));
if (leaked.length > 0) {
    console.error('ERROR: Redirect-source URLs found in sitemap:', leaked);
    errors++;
}

// Check for duplicate <loc> entries
const locRegex = /<loc>(.*?)<\/loc>/g;
const allLocs = [];
let match;
while ((match = locRegex.exec(sitemap)) !== null) {
    allLocs.push(match[1]);
}
const uniqueLocs = new Set(allLocs);
if (allLocs.length !== uniqueLocs.size) {
    const dupes = allLocs.filter((loc, i) => allLocs.indexOf(loc) !== i);
    console.error('ERROR: Duplicate URLs found in sitemap:', [...new Set(dupes)]);
    errors++;
}

if (errors > 0) {
    console.error(`\n[FAIL] ${errors} validation error(s)`);
    process.exit(1);
}

console.log('\n[PASS] No non-www URLs');
console.log('[PASS] No redirect-source slugs');
console.log('[PASS] No duplicate URLs');
console.log(`[PASS] Total: ${urlCount} URLs`);
