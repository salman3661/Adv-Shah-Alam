// generate_rss.js
// Generates standard RSS 2.0 feeds with full Media & Dublin Core syndication
// Fully compatible with Buffer, Make.com, Zapier, Feedly, and social aggregators

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.advmdshahalam.me';
const TODAY = new Date().toISOString().split('T')[0];
const DEFAULT_IMAGE = `${BASE_URL}/images/hero/hero-md-shah-alam.png`;

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
                const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
                data._prefix = prefix;
                return data;
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
        const postUrl = `${BASE_URL}${post._prefix || (lang === 'bn' ? '/bn/blog' : '/blog')}/${post.slug}`;
        const pubDate = new Date(post.publishedDate || post.lastModified || TODAY).toUTCString();
        const rawDesc = post.metaDescription || (post.heroIntro ? post.heroIntro.replace(/<[^>]+>/g, '').slice(0, 300) : '');
        const desc = rawDesc.replace(/]]>/g, '').trim();
        const author = 'Advocate Md. Shah Alam';
        const category = (post.category || 'Law').replace(/]]>/g, '');
        const cleanTitle = (post.title || '').replace(/]]>/g, '');

        return `    <item>
      <title><![CDATA[${cleanTitle}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${desc}]]></description>
      <content:encoded><![CDATA[<p>${desc}</p>]]></content:encoded>
      <dc:creator><![CDATA[${author}]]></dc:creator>
      <category><![CDATA[${category}]]></category>
      <pubDate>${pubDate}</pubDate>
      <enclosure url="${DEFAULT_IMAGE}" length="76800" type="image/png" />
      <media:content url="${DEFAULT_IMAGE}" medium="image" type="image/png" />
      <media:thumbnail url="${DEFAULT_IMAGE}" />
    </item>`;
    }).join('\n');

    return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${title}</title>
    <link>${BASE_URL}</link>
    <description>${description}</description>
    <language>${lang === 'bn' ? 'bn-BD' : 'en-US'}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <image>
      <url>${DEFAULT_IMAGE}</url>
      <title>${title}</title>
      <link>${BASE_URL}</link>
      <width>144</width>
      <height>144</height>
    </image>
${channelItems}
  </channel>
</rss>`;
}

// 1. Bengali RSS (Top 30 latest posts)
const sortedBn = sortPosts([...bnPosts]).slice(0, 30);
const bnRss = buildRssXml(
    sortedBn,
    'অ্যাডভোকেট মো. শাহ আলম — আইন কানুন ও আইনি পরামর্শ ব্লগ',
    'বাংলাদেশ সুপ্রিম কোর্ট ও জেলা জজ আদালতের প্র্যাকটিসিং আইনজীবীর আইন বিষয়ক পরামর্শ, নজির ও গাইড।',
    `${BASE_URL}/rss-bn.xml`,
    'bn'
);
fs.writeFileSync('public/rss-bn.xml', bnRss, 'utf8');

// Also write common aliases for buffer / aggregators
fs.writeFileSync('public/feed.xml', bnRss, 'utf8');
fs.writeFileSync('public/rss', bnRss, 'utf8');
fs.writeFileSync('public/feed', bnRss, 'utf8');

// 2. Main RSS (Combined latest 30 posts)
const combined = sortPosts([...bnPosts, ...enPosts]).slice(0, 30);
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
console.log(`  - public/feed.xml & aliases created`);
