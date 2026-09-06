const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'src', 'content', 'blog-bn-index.json');
const postsDir = path.join(__dirname, '..', 'src', 'content', 'posts', 'bn');

const newSlugs = [
  '494-dhara-talak-chara-dwitio-biye-shasti-2026',
  'sole-nama-solenama-deyani-adalat-niyom-2026',
  'jibito-mayer-sampatti-vager-ain-adhikar-2026',
  '138-dhara-cheque-bounce-jamin-joggo-kina-2026',
  'swami-korthrik-streeke-talak-notis-prokriya-2026',
  'heba-bil-ewaz-dalil-batil-korar-niyom-2026',
  'high-court-writ-petition-khoroch-papers-2026',
  'jomi-dokhol-145-dhara-ucched-mamla-2026',
  'swami-khorposh-voronposhon-na-dile-ain-2026',
  'vuya-warish-sanad-batil-mamla-ain-2026',
  'cheque-dishonour-notis-shomoy-niyom-2026',
  'nishedhagya-injunction-omanno-korle-shasti-2026'
];

const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
const existingSlugs = new Set(indexData.posts.map(p => p.slug));

const newEntries = [];

for (const slug of newSlugs) {
  if (!existingSlugs.has(slug)) {
    const postFile = path.join(postsDir, `${slug}.json`);
    if (fs.existsSync(postFile)) {
      const post = JSON.parse(fs.readFileSync(postFile, 'utf8'));
      newEntries.push({
        slug: post.slug,
        title: post.title,
        category: post.category,
        readTime: post.readTime || '১৫ মিনিট',
        publishedDate: post.publishedDate || '2026-09-06',
        isDraft: false,
        enSlug: null,
        metaTitle: post.metaTitle || post.title,
        metaDescription: post.metaDescription || ''
      });
    }
  }
}

console.log(`Adding ${newEntries.length} new entries to blog-bn-index.json...`);
indexData.posts = [...newEntries, ...indexData.posts];
fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2), 'utf8');
console.log(`✓ Updated blog-bn-index.json. Total posts now: ${indexData.posts.length}`);
