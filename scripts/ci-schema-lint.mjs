import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const BASE = 'https://www.advmdshahalam.me';
const sitemapXml = fs.readFileSync(path.join(ROOT, 'public', 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

let jsonErrors = 0;
let aggregateRatingErrors = 0;
let duplicateIdErrors = 0;
let breadcrumbErrors = 0;
let blogScopeErrors = 0;
let institutionalErrors = 0;
let totalSchemasParsed = 0;

function extractNodes(obj, out = []) {
  if (!obj || typeof obj !== 'object') return out;
  if (Array.isArray(obj)) {
    for (const item of obj) extractNodes(item, out);
    return out;
  }
  out.push(obj);
  if (Array.isArray(obj['@graph'])) extractNodes(obj['@graph'], out);
  return out;
}

for (const url of sitemapUrls) {
  const rel = url.replace(BASE, '') || '/';
  const fp = rel === '/' ? path.join(DIST, 'index.html') : path.join(DIST, rel.replace(/^\/+/, ''), 'index.html');
  const html = fs.readFileSync(fp, 'utf8');

  const scripts = [...html.matchAll(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  const pageIds = new Set();
  const pageTypes = new Set();
  let breadcrumbCount = 0;

  for (const m of scripts) {
    const raw = m[1].trim();
    if (/aggregateRating/i.test(raw)) {
      aggregateRatingErrors++;
      console.error(`AGGREGATE RATING FOUND on ${rel}`);
    }
    let parsed;
    try {
      parsed = JSON.parse(raw);
      totalSchemasParsed++;
    } catch (e) {
      jsonErrors++;
      console.error(`INVALID JSON-LD on ${rel}: ${e.message}`);
      continue;
    }

    const nodes = extractNodes(parsed);
    for (const n of nodes) {
      const types = Array.isArray(n['@type']) ? n['@type'] : (n['@type'] ? [n['@type']] : []);
      for (const t of types) pageTypes.add(t);

      // Top-level graph @id uniqueness check (only check direct top-level or @graph items, not nested references)
      if (n['@id'] && types.length > 0) {
        if (pageIds.has(n['@id'])) {
          duplicateIdErrors++;
          console.error(`DUPLICATE @id "${n['@id']}" on ${rel}`);
        } else {
          pageIds.add(n['@id']);
        }
      }

      if (types.includes('BreadcrumbList')) {
        breadcrumbCount++;
        const items = n.itemListElement || [];
        if (!Array.isArray(items) || items.length === 0) {
          breadcrumbErrors++;
          console.error(`EMPTY BreadcrumbList on ${rel}`);
        } else {
          items.forEach((it, idx) => {
            if (it['@type'] !== 'ListItem' || it.position !== idx + 1 || typeof it.item !== 'string' || !it.item.startsWith('https://')) {
              breadcrumbErrors++;
              console.error(`INVALID BreadcrumbList item on ${rel}: ${JSON.stringify(it)}`);
            }
          });
        }
      }
    }
  }

  if (breadcrumbCount > 1) {
    breadcrumbErrors++;
    console.error(`MULTIPLE BreadcrumbList (${breadcrumbCount}) on ${rel}`);
  }

  const isBlogPost = (rel.startsWith('/blog/') || rel.startsWith('/bn/blog/'));
  if (isBlogPost) {
    for (const forbidden of ['LegalService', 'LocalBusiness', 'WebSite', 'Attorney']) {
      if (pageTypes.has(forbidden)) {
        blogScopeErrors++;
        console.error(`FORBIDDEN SCHEMA "${forbidden}" on blog post ${rel}`);
      }
    }
    if (!pageTypes.has('BlogPosting')) {
      blogScopeErrors++;
      console.error(`MISSING BlogPosting on blog post ${rel}`);
    }
  }

  const isInstitutional = ['/', '/en', '/advocate-md-shah-alam', '/education', '/contact', '/bn/contact'].includes(rel);
  if (isInstitutional) {
    for (const req of ['WebSite', 'Person', 'LegalService', 'BreadcrumbList']) {
      if (!pageTypes.has(req)) {
        institutionalErrors++;
        console.error(`MISSING "${req}" on institutional page ${rel}`);
      }
    }
  }
}

const summary = {
  pagesChecked: sitemapUrls.length,
  totalSchemasParsed,
  jsonErrors,
  aggregateRatingErrors,
  duplicateIdErrors,
  breadcrumbErrors,
  blogScopeErrors,
  institutionalErrors,
};
console.log('\n=== PHASE 4 CI SCHEMA LINT ===');
console.log(summary);

const totalErr = jsonErrors + aggregateRatingErrors + duplicateIdErrors + breadcrumbErrors + blogScopeErrors + institutionalErrors;
if (totalErr > 0) process.exit(1);
