const fs = require('fs');
const path = require('path');

const sitemap = fs.readFileSync('./public/sitemap.xml', 'utf8');

const sitemapUrls = [];
const sitemapRegex = /<loc>(.*?)<\/loc>/g;
let match;
while ((match = sitemapRegex.exec(sitemap)) !== null) {
    sitemapUrls.push(match[1].trim());
}

let dateMatch;
const sitemapDates = {};
const urlEntryRegex = /<url>\s*<loc>(.*?)<\/loc>\s*<lastmod>(.*?)<\/lastmod>/g;
while ((dateMatch = urlEntryRegex.exec(sitemap)) !== null) {
  sitemapDates[dateMatch[1]] = dateMatch[2];
}

const checkUrl = (uri) => {
    const fullUrl = `https://www.advmdshahalam.me${uri}`;
    const inSitemap = sitemapUrls.includes(fullUrl);
    const date = sitemapDates[fullUrl];
    return { fullUrl, inSitemap, date };
}

console.log("=== SITEMAP VERIFICATION ===\n");

const priorityEN = [
    '/blog/hire-criminal-lawyer-bangladesh',
    '/blog/company-registration-cost-bangladesh',
    '/blog/writ-petition-high-court-guide-bangladesh',
    '/blog/how-to-file-divorce-petition-bangladesh',
    '/blog/land-registration-fees-process-bangladesh'
];

console.log("EN BLOGS:");
priorityEN.forEach(u => console.log(checkUrl(u)));

const priorityBN = [
    '/bn/blog/criminal-lawyer-kivabe-neben-bangladesh',
    '/bn/blog/jamin-khoroch-bangladesh',
    '/bn/blog/mittha-mamla-kharej-bangladesh',
    '/bn/blog/divorce-mamla-dakhil-bangladesh',
    '/bn/blog/police-abiyog-hoirani-bangladesh',
    '/bn/blog/cyber-crime-lawyer-neben-bangladesh',
    '/bn/blog/jomi-nibondhon-fees-prokriya-bangladesh',
    '/bn/blog/uttaradhikar-certificate-bangladesh',
    '/bn/blog/bhara-tikki-bibad-bangladesh',
    '/bn/blog/gharelu-nirjaton-aini-suraksha-bangladesh'
];

console.log("\nBN BLOGS:");
priorityBN.forEach(u => console.log(checkUrl(u)));

const services = [
    '/services/criminal-lawyer',
    '/services/bail-lawyer',
    '/services/divorce-lawyer',
    '/services/land-lawyer',
    '/services/supreme-court-lawyer',
    '/services/company-corporate-lawyer',
    '/services/tax-lawyer'
];

console.log("\nSERVICES:");
services.forEach(u => console.log(checkUrl(u)));

