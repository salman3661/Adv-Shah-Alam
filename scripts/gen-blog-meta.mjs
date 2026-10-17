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
const KEEP = ['slug', 'title', 'category', 'readTime', 'publishedDate', 'lastModified', 'isDraft', '_draft', 'bnSlug', 'enSlug', 'metaTitle', 'metaDescription', 'keywords', 'lang', 'impressions', 'clicks', 'featured'];

const plain = (html = '', n = 300) => String(html).replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim().slice(0, n);

// Posts whose URL is a plain (unconditional) 301 source in vercel.json are consolidated into a master pillar.
// Keep them out of list / related / popular widgets so internal links never point at redirected URLs.
const vercelCfg = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
const redirectSources = new Set((vercelCfg.redirects || []).filter((r) => !r.has).map((r) => r.source));

// Load GA4 pageViews and popular_bn fallback ranks so Popular sorting works even for posts without embedded GSC stats
const ga4Views = {};
try {
  const ga4 = JSON.parse(fs.readFileSync(path.join(root, 'src', 'content', 'ga4_summary.json'), 'utf8'));
  for (const row of ga4.topPages || []) {
    const m = String(row.path || '').match(/\/(?:bn\/blog|blog)\/([^/?#]+)/);
    if (m) ga4Views[m[1]] = (ga4Views[m[1]] || 0) + (Number(row.pageViews) || 0);
  }
} catch {}

// Also read GSC export Excel if available locally to enrich English & Bengali impressions/clicks
const gscMap = {};
try {
  const xlsxMod = await import('xlsx');
  const XLSX = xlsxMod.default || xlsxMod;
  const gscPath = path.join(root, 'Search Console CSV', 'advmdshahalam.me-Performance-on-Search-2026-10-17.xlsx');
  if (fs.existsSync(gscPath)) {
    const wb = XLSX.readFile(gscPath);
    const pages = XLSX.utils.sheet_to_json(wb.Sheets['Pages'] || {});
    for (const r of pages) {
      const u = String(r['Top pages'] || '');
      const m = u.match(/\/(?:bn\/blog|blog)\/([^/?#]+)/);
      if (m) {
        gscMap[m[1]] = {
          clicks: Number(r.Clicks) || 0,
          impressions: Number(r.Impressions) || 0,
        };
      }
    }
  }
} catch {}

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
      const gsc = gscMap[j.slug];
      const imp = Math.max(Number(m.impressions) || 0, gsc ? gsc.impressions : 0);
      const clk = Math.max(Number(m.clicks) || 0, gsc ? gsc.clicks : 0);
      const views = ga4Views[j.slug] || 0;
      if (imp > 0) m.impressions = imp;
      if (clk > 0) m.clicks = clk;
      if (views > 0) m.pageViews = views;
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
