// generate_rss.js
// Generates standard RSS 2.0 feeds for automated social media syndication (LinkedIn, Buffer, Make.com, IFTTT)
// Produces: public/rss.xml (all latest posts) and public/rss-bn.xml (Bengali posts)

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.advmdshahalam.me';
const TODAY = new Date().toISOString().split('T')[0];

const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
const redirectSources = new Set(
    (vercelConfig.redirects || [])
        .filter(r => !r.has)
        .map(r => r.source)
);

function getPosts(dir, prefix) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir)
        .filter(f => f.endsWith('.json'))
        .map(f => {
            try {
                return JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
            } catch {
                return null;
            }
        })
        .filter(post => {
            if (!post || post.isDraft || !post.slug) return false;
            if (redirectSources.has(`${prefix}/${post.slug}`)) return false;
            if (post.publishedDate && post.publishedDate > TODAY) return false;
            return true;
        });
}

const bnPosts = getPosts(path.join('src', 'content', 'posts', 'bn'), '/bn/blog');
const enPosts = getPosts(path.join('src', 'content', 'posts', 'en'), '/blog');

function sortPosts(posts) {
    return posts.sort((a, b) => {
        const dateA = new Date(a.publishedDate || a.lastModified || '2026-01-01');
        const dateB = new Date(b.publishedDate || b.lastModified || '2026-01-01');
        return dateB - dateA;
    });
}

function buildRssXml(items, title, description, feedUrl, lang = 'bn') {
    const channelItems = items.map(post => {
        const postUrl = post.enSlug !== undefined ? `${BASE_URL}/bn/blog/${post.slug}` : `${BASE_URL}/blog/${post.slug}`;
        const pubDate = new Date(post.publishedDate || post.lastModified || TODAY).toUTCString();
        const desc = post.metaDescription || (post.heroIntro ? post.heroIntro.replace(/<[^>]+>/g, '').slice(0, 300) : '');
        const author = 'Advocate Md. Shah Alam';

        return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${desc}]]></description>
      <category>${post.category || 'Law'}</category>
      <author>contact@advmdshahalam.me (${author})</author>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    }).join('\n');

    return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${title}</title>
    <link>${BASE_URL}</link>
    <description>${description}</description>
    <language>${lang === 'bn' ? 'bn-BD' : 'en-US'}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <image>
      <url>${BASE_URL}/images/hero/hero-md-shah-alam.png</url>
      <title>${title}</title>
      <link>${BASE_URL}</link>
    </image>
${channelItems}
  </channel>
</rss>`;
}

// 1. Bengali RSS (Top 50 latest posts)
const sortedBn = sortPosts([...bnPosts]).slice(0, 50);
const bnRss = buildRssXml(
    sortedBn,
    'অ্যাডভোকেট মো. শাহ আলম — আইন কানুন ও আইনি পরামর্শ ব্লগ',
    'বাংলাদেশ সুপ্রিম কোর্ট ও জেলা জজ আদালতের প্র্যাকটিসিং আইনজীবীর আইন বিষয়ক পরামর্শ, নজির ও গাইড।',
    `${BASE_URL}/rss-bn.xml`,
    'bn'
);
fs.writeFileSync('public/rss-bn.xml', bnRss, 'utf8');

// 2. Main RSS (Combined latest 60 posts)
const combined = sortPosts([...bnPosts, ...enPosts]).slice(0, 60);
const mainRss = buildRssXml(
    combined,
    'Advocate Md. Shah Alam Law Chambers — Legal Insights & Case Guides',
    'Authoritative legal guides on Bangladesh Law, Supreme Court, Land Law, Family Law, Criminal Defence.',
    `${BASE_URL}/rss.xml`,
    'bn'
);
fs.writeFileSync('public/rss.xml', mainRss, 'utf8');

console.log(`✓ RSS feeds generated successfully:`);
console.log(`  - public/rss-bn.xml (${sortedBn.length} latest Bengali articles)`);
console.log(`  - public/rss.xml (${combined.length} combined latest articles)`);
