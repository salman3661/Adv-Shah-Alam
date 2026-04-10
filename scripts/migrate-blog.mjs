// scripts/migrate-blog.mjs
// Converts blogPosts.js + blogPostsBn.js → individual JSON files per post
// Run: node scripts/migrate-blog.mjs

import { createRequire } from 'module';
import { fileURLToPath, pathToFileURL } from 'url';
import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// ── helpers ──────────────────────────────────────────────────────────
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function safeSlug(slug) {
  // Validate slug is filesystem-safe
  return /^[a-z0-9-]+$/.test(slug);
}

// ── Main ─────────────────────────────────────────────────────────────
async function run() {
  console.log('📚 Loading blog data files...');

  // Dynamic import resolves template literals and const resolves
  const enModule = await import(pathToFileURL(path.join(root, 'src/data/blogPosts.js')).href);
  const bnModule = await import(pathToFileURL(path.join(root, 'src/data/blogPostsBn.js')).href);

  const enPosts = enModule.default;
  const bnPosts = bnModule.default;

  console.log(`  EN: ${enPosts.length} posts`);
  console.log(`  BN: ${bnPosts.length} posts`);

  const enDir = path.join(root, 'src/content/posts/en');
  const bnDir = path.join(root, 'src/content/posts/bn');
  ensureDir(enDir);
  ensureDir(bnDir);

  // ── Migrate EN ──────────────────────────────────────────────────────
  const enIndex = [];
  let enOk = 0, enSkip = 0;

  for (const post of enPosts) {
    const slug = post.slug;
    if (!slug || !safeSlug(slug)) {
      console.warn(`  ⚠ Skipping EN post with unsafe slug: "${slug}"`);
      enSkip++;
      continue;
    }

    // Add lang field
    const postWithLang = { ...post, lang: 'en' };

    fs.writeFileSync(
      path.join(enDir, `${slug}.json`),
      JSON.stringify(postWithLang, null, 2),
      'utf8',
    );

    enIndex.push({
      slug: post.slug,
      title: post.title,
      category: post.category,
      readTime: post.readTime,
      publishedDate: post.publishedDate,
      isDraft: post.isDraft || false,
      bnSlug: post.bnSlug || null,
      metaTitle: post.metaTitle,
      metaDescription: post.metaDescription,
    });

    enOk++;
  }

  fs.writeFileSync(
    path.join(root, 'src/content/blog-en-index.json'),
    JSON.stringify({ posts: enIndex }, null, 2),
    'utf8',
  );

  console.log(`  ✅ EN: wrote ${enOk} post files${enSkip ? `, skipped ${enSkip}` : ''}`);

  // ── Migrate BN ──────────────────────────────────────────────────────
  const bnIndex = [];
  let bnOk = 0, bnSkip = 0;

  for (const post of bnPosts) {
    const slug = post.slug;
    if (!slug || !safeSlug(slug)) {
      console.warn(`  ⚠ Skipping BN post with unsafe slug: "${slug}"`);
      bnSkip++;
      continue;
    }

    const postWithLang = { ...post, lang: 'bn' };

    fs.writeFileSync(
      path.join(bnDir, `${slug}.json`),
      JSON.stringify(postWithLang, null, 2),
      'utf8',
    );

    bnIndex.push({
      slug: post.slug,
      title: post.title,
      category: post.category,
      readTime: post.readTime,
      publishedDate: post.publishedDate,
      isDraft: post.isDraft || false,
      enSlug: post.enSlug || null,
      metaTitle: post.metaTitle,
      metaDescription: post.metaDescription,
    });

    bnOk++;
  }

  fs.writeFileSync(
    path.join(root, 'src/content/blog-bn-index.json'),
    JSON.stringify({ posts: bnIndex }, null, 2),
    'utf8',
  );

  console.log(`  ✅ BN: wrote ${bnOk} post files${bnSkip ? `, skipped ${bnSkip}` : ''}`);

  console.log('\n✨ Migration complete!');
  console.log(`   EN index: src/content/blog-en-index.json (${enIndex.length} entries)`);
  console.log(`   BN index: src/content/blog-bn-index.json (${bnIndex.length} entries)`);
  console.log(`   Posts:    src/content/posts/en/ (${enOk} files)`);
  console.log(`             src/content/posts/bn/ (${bnOk} files)`);
  console.log('\nNext: update Blog.jsx to use import.meta.glob from content/posts/');
}

run().catch((err) => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
