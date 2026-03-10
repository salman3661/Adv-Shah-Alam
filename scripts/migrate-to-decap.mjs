/**
 * scripts/migrate-to-decap.mjs
 * ─────────────────────────────────────────────────────────────────────────
 * Converts src/data/blogPosts.js  → src/content/posts/en/{slug}.md
 * Converts src/data/blogPostsBn.js → src/content/posts/bn/{slug}.md
 *
 * Run with:  node scripts/migrate-to-decap.mjs
 *
 * The website continues to read from src/data/blogPosts.js (no changes there).
 * The markdown files are ONLY for the Decap CMS dashboard to edit content via UI.
 * ─────────────────────────────────────────────────────────────────────────
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

// ── YAML helpers ──────────────────────────────────────────────────────────

/**
 * Escapes a string for use as a YAML scalar (double-quoted).
 */
function yamlStr(val) {
    if (val == null) return '""';
    return JSON.stringify(String(val));
}

/**
 * Serialises a value to YAML inline format.
 * Used for simple scalars, lists, and clean objects.
 */
function toYaml(val, indent = 0) {
    const pad = ' '.repeat(indent);
    if (val === null || val === undefined) return 'null';
    if (typeof val === 'boolean') return String(val);
    if (typeof val === 'number') return String(val);
    if (typeof val === 'string') return yamlStr(val);
    if (Array.isArray(val)) {
        if (val.length === 0) return '[]';
        const items = val.map(item => {
            if (typeof item === 'string') return `${pad}  - ${yamlStr(item)}`;
            if (typeof item === 'object' && item !== null) {
                // Block mapping inside a sequence
                const lines = Object.entries(item).map(([k, v]) => {
                    if (typeof v === 'string') return `${pad}    ${k}: ${yamlStr(v)}`;
                    // For nested arrays/objects inside list items (e.g. sections.content)
                    if (typeof v === 'object' || Array.isArray(v)) {
                        return `${pad}    ${k}: ${toYaml(v, indent + 4)}`;
                    }
                    return `${pad}    ${k}: ${toYaml(v, indent + 4)}`;
                });
                return `${pad}  -\n${lines.join('\n')}`;
            }
            return `${pad}  - ${String(item)}`;
        });
        return `\n${items.join('\n')}`;
    }
    if (typeof val === 'object') {
        const lines = Object.entries(val).map(([k, v]) => `${pad}  ${k}: ${toYaml(v, indent + 2)}`);
        return `\n${lines.join('\n')}`;
    }
    return yamlStr(val);
}

// ── Markdown generator ────────────────────────────────────────────────────

function postToMarkdown(post, lang) {
    const lines = [];
    lines.push('---');

    // ── Core fields ──
    lines.push(`draft: false`);
    lines.push(`slug: ${yamlStr(post.slug)}`);
    lines.push(`title: ${yamlStr(post.title)}`);
    lines.push(`category: ${yamlStr(post.category)}`);
    lines.push(`publishedDate: ${yamlStr(post.publishedDate || '2026-03-02')}`);
    lines.push(`readTime: ${yamlStr(post.readTime || (lang === 'bn' ? '৭ মিনিট' : '7 min read'))}`);

    if (lang === 'bn' && post.enSlug) {
        lines.push(`enSlug: ${yamlStr(post.enSlug)}`);
    }
    if (post.pairId) {
        lines.push(`pairId: ${yamlStr(post.pairId)}`);
    }

    // ── SEO ──
    lines.push(`metaTitle: ${yamlStr(post.metaTitle || post.title)}`);
    lines.push(`metaDescription: ${yamlStr(post.metaDescription || '')}`);

    // keywords array
    if (Array.isArray(post.keywords) && post.keywords.length > 0) {
        lines.push(`keywords:`);
        for (const kw of post.keywords) {
            lines.push(`  - ${yamlStr(kw)}`);
        }
    } else {
        lines.push(`keywords: []`);
    }

    if (post.canonicalUrl) {
        lines.push(`canonicalUrl: ${yamlStr(post.canonicalUrl)}`);
    }

    // ── Media ──
    if (post.featuredImage) {
        lines.push(`featuredImage: ${yamlStr(post.featuredImage)}`);
    }
    if (post.featuredImageAlt) {
        lines.push(`featuredImageAlt: ${yamlStr(post.featuredImageAlt)}`);
    }

    // ── Body ──
    lines.push(`heroIntro: ${yamlStr(post.heroIntro || '')}`);

    // toc
    if (Array.isArray(post.toc) && post.toc.length > 0) {
        lines.push(`toc:`);
        for (const item of post.toc) {
            lines.push(`  - ${yamlStr(typeof item === 'string' ? item : item.item || '')}`);
        }
    } else {
        lines.push(`toc: []`);
    }

    // sections (list of {h2, content})
    if (Array.isArray(post.sections) && post.sections.length > 0) {
        lines.push(`sections:`);
        for (const sec of post.sections) {
            lines.push(`  - h2: ${yamlStr(sec.h2 || '')}`);
            lines.push(`    content: ${yamlStr(sec.content || '')}`);
        }
    } else {
        lines.push(`sections: []`);
    }

    // faqs (list of {question, answer})
    if (Array.isArray(post.faqs) && post.faqs.length > 0) {
        lines.push(`faqs:`);
        for (const faq of post.faqs) {
            lines.push(`  - question: ${yamlStr(faq.question || '')}`);
            lines.push(`    answer: ${yamlStr(faq.answer || '')}`);
        }
    } else {
        lines.push(`faqs: []`);
    }

    // relatedServiceLinks (list of {text, to})
    if (Array.isArray(post.relatedServiceLinks) && post.relatedServiceLinks.length > 0) {
        lines.push(`relatedServiceLinks:`);
        for (const link of post.relatedServiceLinks) {
            lines.push(`  - text: ${yamlStr(link.text || '')}`);
            lines.push(`    to: ${yamlStr(link.to || '')}`);
        }
    } else {
        lines.push(`relatedServiceLinks: []`);
    }

    lines.push('---');
    // Minimal body — content lives in the sections frontmatter above
    lines.push('');
    return lines.join('\n');
}

// ── Main ──────────────────────────────────────────────────────────────────

async function main() {
    console.log('📦 Decap CMS Content Migration\n');

    const enDir = path.join(root, 'src/content/posts/en');
    const bnDir = path.join(root, 'src/content/posts/bn');
    mkdirSync(enDir, { recursive: true });
    mkdirSync(bnDir, { recursive: true });

    // ── English posts ──────────────────────────────────────────────────
    let enPosts = [];
    try {
        const url = `file:///${path.join(root, 'src/data/blogPosts.js').replace(/\\/g, '/')}?t=${Date.now()}`;
        const mod = await import(url);
        const raw = mod.default || mod.posts || [];
        enPosts = Array.isArray(raw) ? raw.filter(p => p && p.slug && !p._draft) : [];
        console.log(`✅  Loaded ${enPosts.length} English posts from blogPosts.js`);
    } catch (e) {
        console.error('❌  Could not load blogPosts.js:', e.message);
        process.exit(1);
    }

    // ── Bangla posts ───────────────────────────────────────────────────
    let bnPosts = [];
    try {
        const url = `file:///${path.join(root, 'src/data/blogPostsBn.js').replace(/\\/g, '/')}?t=${Date.now()}`;
        const mod = await import(url);
        const raw = mod.default || mod.postsBn || [];
        bnPosts = Array.isArray(raw) ? raw.filter(p => p && p.slug && !p._draft) : [];
        console.log(`✅  Loaded ${bnPosts.length} Bangla posts from blogPostsBn.js`);
    } catch (e) {
        console.error('❌  Could not load blogPostsBn.js:', e.message);
        process.exit(1);
    }

    // ── Write EN markdown files ────────────────────────────────────────
    let enWritten = 0;
    for (const post of enPosts) {
        const filename = `${post.slug}.md`;
        const filepath = path.join(enDir, filename);
        const md = postToMarkdown(post, 'en');
        writeFileSync(filepath, md, 'utf-8');
        enWritten++;
    }
    console.log(`\n✅  Written ${enWritten} files → src/content/posts/en/`);

    // ── Write BN markdown files ────────────────────────────────────────
    let bnWritten = 0;
    for (const post of bnPosts) {
        const filename = `${post.slug}.md`;
        const filepath = path.join(bnDir, filename);
        const md = postToMarkdown(post, 'bn');
        writeFileSync(filepath, md, 'utf-8');
        bnWritten++;
    }
    console.log(`✅  Written ${bnWritten} files → src/content/posts/bn/`);

    console.log(`\n✅  Migration complete!`);
    console.log(`\n   next steps:`);
    console.log(`   1. git add src/content/posts/ && git commit -m "feat: migrate posts to Decap CMS markdown"`);
    console.log(`   2. Vercel deploys automatically`);
    console.log(`   3. Open /admin → English Blog Posts & Bangla Blog Posts collections should now show entries`);
}

main().catch(err => {
    console.error('❌  Migration failed:', err);
    process.exit(1);
});
