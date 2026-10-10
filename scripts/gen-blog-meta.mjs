/**
 * scripts/gen-blog-meta.mjs
 * Builds lightweight metadata indexes (src/content/posts-meta-{en,bn}.json) so list pages
 * and "related post" widgets do NOT have to bundle the full text of every article.
 * Full articles are loaded on demand (one small chunk per post) by BlogPost / BlogPostBn.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const KEEP = ['slug', 'title', 'category', 'readTime', 'publishedDate', 'lastModified', 'isDraft', '_draft', 'bnSlug', 'enSlug', 'metaTitle', 'metaDescription', 'keywords', 'lang'];

const plain = (html = '', n = 300) => String(html).replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim().slice(0, n);

// Posts whose URL is a plain (unconditional) 301 source in vercel.json are consolidated into a master pillar.
// Keep them out of list / related / popular widgets so internal links never point at redirected URLs.
const vercelCfg = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
const redirectSources = new Set((vercelCfg.redirects || []).filter((r) => !r.has).map((r) => r.source));

for (const lang of ['en', 'bn']) {
  const dir = path.join(root, 'src', 'content', 'posts', lang);
  const out = [];
  const urlPrefix = lang === 'en' ? '/blog/' : '/bn/blog/';
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.json')).sort()) {
    try {
      const j = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
      if (!j || !j.slug) continue;
      if (redirectSources.has(urlPrefix + j.slug)) continue;
      const m = {};
      for (const k of KEEP) if (j[k] !== undefined) m[k] = j[k];
      m.heroIntro = plain(j.heroIntro, 170);
      out.push(m);
    } catch (e) {
      console.warn('[gen-blog-meta] skip', f, e.message);
    }
  }
  const target = path.join(root, 'src', 'content', `posts-meta-${lang}.json`);
  fs.writeFileSync(target, JSON.stringify(out));
  console.log(`[gen-blog-meta] ${lang}: ${out.length} posts, ${(fs.statSync(target).size / 1024).toFixed(0)} KB`);
}
