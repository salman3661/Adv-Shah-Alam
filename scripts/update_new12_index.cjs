const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'src', 'content', 'blog-bn-index.json');
const postsDir = path.join(__dirname, '..', 'src', 'content', 'posts', 'bn');

const newSlugs = [
  'high-court-agam-jamin-anticipatory-bail-khoroch-2026',
  'stree-korthrik-swamike-divorce-talak-tawfiz-niyom-2026',
  'batwara-mamla-court-fee-khoroch-shomoy-2026',
  'court-marriage-kagoj-patro-sarkari-khoroch-2026',
  'cyber-crime-complaint-online-police-helpline-2026',
  'bari-vara-ain-varatia-ucched-jamanat-niyom-2026',
  'police-clearance-certificate-online-abedon-verification-2026',
  'nabaloker-jomi-bikroy-ferot-guardian-ain-2026',
  'babar-sampattite-meyer-adhikar-farayez-ain-2026',
  'mithya-yautuk-mamla-theke-mukti-nari-shishu-2026',
  'rs-bs-khatian-shongshodhon-deyani-mamla-2026',
  'pending-case-passport-police-verification-clearance-2026'
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
        readTime: post.readTime || '১৬ মিনিট',
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
