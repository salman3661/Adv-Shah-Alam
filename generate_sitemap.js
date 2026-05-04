// generate_sitemap.js
// Generates a clean, Tier-A-only sitemap.xml for advmdshahalam.me
// - Contains ONLY high-quality, canonical, indexable URLs (~35)
// - Excludes all 301-redirected, noindexed, thin, and duplicate slugs
// - Uses non-www canonical domain

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://advmdshahalam.me';
const TODAY = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

// ── TIER A EN Blog Slugs (canonical, high-quality, substantial content) ─────
const TIER_A_EN_SLUGS = [
    'bail-process-bangladesh',
    'divorce-procedure-bangladesh',
    'cheque-dishonour-case-law-bangladesh',
    'child-custody-law-bangladesh',
    'anticipatory-bail-bangladesh',
    'court-marriage-procedure-bangladesh',
    'wife-rights-after-divorce-bangladesh',
    'mutation-process-bangladesh',
    'fir-after-what-to-do-bangladesh',
    'writ-petition-high-court-bangladesh',
    'domestic-violence-law-bangladesh',
    'inheritance-law-bangladesh-legal-guide',
    'arrest-without-warrant-bangladesh',
    'how-to-register-land-bangladesh',
    'cyber-crime-digital-security-act-bangladesh',
    'how-to-stop-false-criminal-case-bangladesh',
    'criminal-appeal-procedure-bangladesh',
    'narcotics-case-law-bangladesh',
    'land-dispute-legal-remedies-bangladesh',
    'how-to-file-fir-bangladesh',
    'how-to-file-gd-bangladesh-police-station',
    'divorce-alimony-maintenance-wife-bangladesh',
    'contract-breach-legal-action-bangladesh',
];

// ── TIER A BN Blog Slugs (high-quality, paired with EN via hreflang) ────────
const TIER_A_BN_SLUGS = [
    'bail-process-bangladesh-bn',
    'divorce-procedure-bangladesh-bn',
    'land-dispute-case-bangladesh-bn',
    'cheque-dishonour-case-law-bangladesh-bn',
    'child-custody-law-bangladesh-bn',
    'criminal-defence-strategy-bangladesh-bn',
];

// Load blog post data to get publish dates
const enIndex = JSON.parse(fs.readFileSync('src/content/blog-en-index.json', 'utf8'));
const bnIndex = JSON.parse(fs.readFileSync('src/content/blog-bn-index.json', 'utf8'));

const enPosts = enIndex.posts;
const bnPosts = bnIndex.posts;

// Get published date for a slug, fallback to today
function getDate(posts, slug) {
    const post = posts.find(p => p.slug === slug);
    return (post && post.publishedDate) || TODAY;
}

// Build URL entries
function url(loc, lastmod, changefreq, priority) {
    return `  <url>\n    <loc>${BASE_URL}${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

const urls = [
    // ── Core Pages ───────────────────────────────────────────────────────────
    url('/', TODAY, 'weekly', '1.0'),
    url('/advocate-md-shah-alam', TODAY, 'monthly', '0.9'),
    url('/blog', TODAY, 'weekly', '0.8'),

    // ── Service Pages ────────────────────────────────────────────────────────
    url('/services/criminal-lawyer', TODAY, 'monthly', '0.9'),
    url('/services/bail-lawyer', TODAY, 'monthly', '0.9'),
    url('/services/divorce-lawyer', TODAY, 'monthly', '0.9'),
    url('/services/land-lawyer', TODAY, 'monthly', '0.9'),
    url('/services/supreme-court-lawyer', TODAY, 'monthly', '0.9'),
    url('/services/company-corporate-lawyer', TODAY, 'monthly', '0.9'),
    url('/services/tax-lawyer', TODAY, 'monthly', '0.9'),

    // ── Tier A EN Blog Posts ─────────────────────────────────────────────────
    ...TIER_A_EN_SLUGS.map(slug => url('/blog/' + slug, getDate(enPosts, slug), 'monthly', '0.7')),

    // ── Tier A BN Blog Posts ─────────────────────────────────────────────────
    url('/bn/blog', TODAY, 'weekly', '0.7'),
    ...TIER_A_BN_SLUGS.map(slug => url('/bn/blog/' + slug, getDate(bnPosts, slug), 'monthly', '0.6')),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;

// Write to public (Vite copies to dist at build time)
fs.writeFileSync('public/sitemap.xml', sitemap, 'utf8');

const urlCount = urls.length;
console.log(`\nSitemap written: ${urlCount} URLs`);
console.log('Path: public/sitemap.xml');
console.log(`Base URL: ${BASE_URL}`);

// Validation
const hasWww = sitemap.includes('www.advmdshahalam.me');
if (hasWww) {
    console.error('ERROR: www URLs found in sitemap! Must be non-www only.');
    process.exit(1);
}

// Check no redirect-source slugs leaked in
const BANNED_SLUGS = [
    'how-to-get-bail-bangladesh-2026',
    'divorce-process-bangladesh-complete-guide',
    'how-to-file-divorce-petition-bangladesh',
    'cheque-dishonour-case-bangladesh',
    'cheque-dishonour-bangladesh-section-138',
    'anticipatory-bail-high-court-bangladesh',
    'child-custody-2026-bangladesh',
    'child-custody-bangladesh-muslim-law',
    'writ-petition-bangladesh-high-court',
    'land-dispute-case-bangladesh',
    'hire-criminal-lawyer-bangladesh',
    'hire-cyber-crime-lawyer-bangladesh',
];
const leaked = BANNED_SLUGS.filter(s => sitemap.includes(`/blog/${s}<`));
if (leaked.length > 0) {
    console.error('ERROR: Banned slugs found in sitemap:', leaked);
    process.exit(1);
}

console.log('\n[PASS] No www URLs');
console.log('[PASS] No banned/redirected slugs');
console.log(`[PASS] Total: ${urlCount} URLs (target: 30-40)`);
