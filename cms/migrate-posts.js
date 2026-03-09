/**
 * cms/migrate-posts.js
 * ─────────────────────────────────────────────────────────────────
 * Converts src/data/blogPosts.js  →  cms/data/blog_posts_en.json
 * Converts src/data/blogPostsBn.js → cms/data/blog_posts_bn.json
 *
 * Run with:  node cms/migrate-posts.js
 *
 * Output is ready to POST to Directus via:
 *   POST /items/blog_posts  (one item at a time, or use bulk import)
 * ─────────────────────────────────────────────────────────────────
 */

import { createRequire } from 'module';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

// ─── Load current JS data ─────────────────────────────────────────
// We read the file as text and exec it to get the exported array.
// This avoids needing a build step.

function loadJsData(relPath) {
    const filePath = path.join(root, relPath);
    const code = readFileSync(filePath, 'utf-8');

    // Strip ES module export syntax to get a plain JS object
    const wrapped = code
        .replace(/^export\s+(const|default)\s+/gm, 'const exported = ')
        .replace(/^export\s+\{[^}]+\};?$/gm, '')
        .replace(/export\s+default\s+/g, 'const exported = ')
        + '\n; exported;';

    // Use Function constructor to safely evaluate
    try {
        return new Function('module', 'require', `
            const module = { exports: {} };
            ${code
                .replace(/^export\s+default\s+/m, 'module.exports = ')
                .replace(/^export\s+const\s+(\w+)/gm, (_, name) => `const ${name}`)
                .replace(/^export\s+\{[^}]+\};?$/gm, '')
            }
            return module.exports;
        `)();
    } catch {
        // Fallback: dynamic import (requires Node 18+, .mjs or type:module)
        console.warn(`Could not eval ${relPath} — try running as ESM`);
        return [];
    }
}

// ─── Shared transformer ────────────────────────────────────────────
function transformPost(post, language) {
    const slug = post.slug;
    const pairId = language === 'bn'
        ? (post.enSlug ? `pair-${post.enSlug}` : `pair-${slug.replace(/-bn$/, '')}`)
        : `pair-${slug}`;

    return {
        // Identity
        status:         'published',
        language,
        pairId,
        slug,
        enSlug:         post.enSlug || null,

        // Content
        title:          post.title,
        category:       post.category,
        readTime:       post.readTime || null,
        publishedDate:  post.publishedDate || '2026-03-02',
        scheduledDate:  null,

        // Body
        heroIntro:      post.heroIntro || null,
        toc:            post.toc || [],
        sections:       post.sections || [],
        faqs:           post.faqs || [],
        relatedServiceLinks: post.relatedServiceLinks || [],

        // SEO
        metaTitle:      post.metaTitle || post.title,
        metaDescription:post.metaDescription || '',
        keywords:       post.keywords || [],
        canonicalUrl:   language === 'bn'
            ? `https://www.advmdshahalam.me/bn/blog/${slug}`
            : `https://www.advmdshahalam.me/blog/${slug}`,
        ogTitle:        post.metaTitle || post.title,
        ogDescription:  post.metaDescription || '',

        // Media (will need to be updated after image upload in Directus)
        featuredImage:    null,
        featuredImageAlt: post.title,
    };
}

// ─── Main ─────────────────────────────────────────────────────────
async function main() {
    console.log('📦 Starting blog post migration...\n');

    const outDir = path.join(__dirname, 'data');
    mkdirSync(outDir, { recursive: true });

    // ── English posts ──
    let enPosts = [];
    try {
        // Try to dynamically import as ESM
        const mod = await import(`${path.join(root, 'src/data/blogPosts.js').replace(/\\/g, '/')}?t=${Date.now()}`);
        const raw = mod.default ?? mod.posts ?? [];
        // Filter: only published posts (isPublished helper from the file)
        enPosts = raw.filter(p => p.publishedDate && !p._draft);
        console.log(`✅  Loaded ${enPosts.length} English posts`);
    } catch (e) {
        console.error('❌  Could not load blogPosts.js:', e.message);
        console.log('ℹ️   Run: node --experimental-vm-modules cms/migrate-posts.js');
    }

    // ── Bangla posts ──
    let bnPosts = [];
    try {
        const mod = await import(`${path.join(root, 'src/data/blogPostsBn.js').replace(/\\/g, '/')}?t=${Date.now()}`);
        const raw = mod.default ?? mod.postsBn ?? [];
        bnPosts = raw.filter(p => p.publishedDate && !p._draft);
        console.log(`✅  Loaded ${bnPosts.length} Bangla posts`);
    } catch (e) {
        console.error('❌  Could not load blogPostsBn.js:', e.message);
    }

    // ── Transform ──
    const enTransformed = enPosts.map(p => transformPost(p, 'en'));
    const bnTransformed = bnPosts.map(p => transformPost(p, 'bn'));
    const allPosts = [...enTransformed, ...bnTransformed];

    // ── Write ──
    writeFileSync(
        path.join(outDir, 'blog_posts_en.json'),
        JSON.stringify(enTransformed, null, 2),
        'utf-8'
    );
    writeFileSync(
        path.join(outDir, 'blog_posts_bn.json'),
        JSON.stringify(bnTransformed, null, 2),
        'utf-8'
    );
    writeFileSync(
        path.join(outDir, 'blog_posts_all.json'),
        JSON.stringify(allPosts, null, 2),
        'utf-8'
    );

    console.log(`\n✅  Written:
  cms/data/blog_posts_en.json   (${enTransformed.length} posts)
  cms/data/blog_posts_bn.json   (${bnTransformed.length} posts)
  cms/data/blog_posts_all.json  (${allPosts.length} total)

📌  Next step: Import blog_posts_all.json via Directus admin panel:
   Settings → Data Model → blog_posts → Import
   OR use the Directus API:
   POST https://your-directus.com/items/blog_posts   (with Authorization: Bearer <token>)
`);
}

main().catch(console.error);
