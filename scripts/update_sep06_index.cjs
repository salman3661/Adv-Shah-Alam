const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'src', 'content', 'blog-bn-index.json');
const bnPostsDir = path.join(__dirname, '..', 'src', 'content', 'posts', 'bn');

const newSlugs = [
  'biye-notun-ain-2026-kabinnama-sarkari-fee-hisab',
  'madok-mamla-jamin-niyom-madokdrobbo-ain-2026',
  'thanay-ovijog-dakhil-online-gd-korar-niyom-2026',
  'christian-uttaradhikar-ain-sampatti-banton-bangladesh-2026',
  'paurosabha-elakay-jomi-registry-khoroch-hisab-2026',
  'jamin-pawar-por-kakhon-nakoch-hote-pare-ain-2026',
  'mrito-babar-sampatti-banton-faraiz-hisab-2026',
  'oprotteharjogyo-power-of-attorney-batil-korar-ain-2026',
  'nabaloker-sampatti-bikroy-o-ferot-ain-2026',
  'stree-korthrik-swamike-talak-denmohor-niyom-2026'
];

const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

const newEntries = newSlugs.map(slug => {
  const postFile = path.join(bnPostsDir, `${slug}.json`);
  const post = JSON.parse(fs.readFileSync(postFile, 'utf8'));
  return {
    slug: post.slug,
    title: post.title,
    category: post.category,
    readTime: post.readTime,
    publishedDate: post.publishedDate,
    isDraft: false,
    enSlug: null,
    metaTitle: post.metaTitle,
    metaDescription: post.metaDescription
  };
});

// Filter out any existing entries with same slugs
const existingFiltered = indexData.posts.filter(p => !newSlugs.includes(p.slug));

// Prepend new entries at top
indexData.posts = [...newEntries, ...existingFiltered];

fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2), 'utf8');
console.log(`✓ blog-bn-index.json updated successfully! Total posts: ${indexData.posts.length}`);
