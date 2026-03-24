const fs = require('fs');

const DOMAIN = 'https://www.advmdshahalam.me';
const DATE = '2026-03-24';

const extractPosts = (fileContent, regex) => {
    // We'll read the parsed files we generated earlier, or just write a regex
    let slugs = [];
    let match;
    while ((match = regex.exec(fileContent)) !== null) {
        slugs.push(match[1]);
    }
    return slugs;
};

const enContent = fs.readFileSync('./src/data/blogPosts.js', 'utf8');
const bnContent = fs.readFileSync('./src/data/blogPostsBn.js', 'utf8');

// Regex to capture slug: '...'
const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;

const enSlugs = extractPosts(enContent, slugRegex);
const bnSlugs = extractPosts(bnContent, slugRegex);

// Also we have static pages and services
const staticPages = [
    '', '/about', '/education', '/contact', '/blog', '/faq',
    '/bn', '/bn/about', '/bn/education', '/bn/contact', '/bn/blog', '/bn/faq'
];

const services = [
    'criminal-lawyer', 'bail-lawyer', 'divorce-lawyer', 'land-lawyer',
    'supreme-court-lawyer', 'company-corporate-lawyer', 'tax-lawyer'
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

const addUrl = (path, priority = 0.8) => {
    xml += `  <url>\n    <loc>${DOMAIN}${path}</loc>\n    <lastmod>${DATE}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
};

// Add static
staticPages.forEach(p => addUrl(p, p === '' || p === '/bn' ? 1.0 : 0.8));

// Add services
services.forEach(s => {
    addUrl(`/services/${s}`, 0.9);
    addUrl(`/bn/services/${s}`, 0.9);
});

// Add EN blogs
enSlugs.forEach(slug => {
    addUrl(`/blog/${slug}`, 0.7);
});

// Add BN blogs
bnSlugs.forEach(slug => {
    addUrl(`/bn/blog/${slug}`, 0.7);
});

xml += `</urlset>`;

fs.writeFileSync('./public/sitemap.xml', xml, 'utf8');
console.log(`Generated sitemap.xml with ${staticPages.length + services.length * 2 + enSlugs.length + bnSlugs.length} URLs.`);
