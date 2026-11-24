#!/usr/bin/env node
/**
 * scripts/qa/local-crosslink.mjs — Local Landing Page Cross-Link & Depth CI Gate (v10.1)
 *
 * 1. Scans all sitemap URLs in dist/ and counts inbound internal links to all 4 EN & 4 BN
 *    local landing pages (/uttara-lawyer, /gulshan-lawyer, /banani-lawyer, /bashundhara-ra-lawyer + /bn/*).
 * 2. HARD FAIL if any of the 4 primary EN or 4 BN local landing pages has < 700 inbound links.
 * 3. Verifies mutual cross-links between all 4 local landing pages (EN -> sibling EN, BN -> sibling BN).
 * 4. Verifies each of the 6 new local landing pages has >= 1,200 words and >= 6 FAQPage questions.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const DIST = path.join(ROOT, 'dist');
const SITEMAP = path.join(ROOT, 'public/sitemap.xml');

const EN_LOCALS = ['/uttara-lawyer', '/gulshan-lawyer', '/banani-lawyer', '/bashundhara-ra-lawyer'];
const BN_LOCALS = ['/bn/uttara-lawyer', '/bn/gulshan-lawyer', '/bn/banani-lawyer', '/bn/bashundhara-ra-lawyer'];
const ALL_LOCALS = [...EN_LOCALS, ...BN_LOCALS];
const NEW_LOCALS = [
  '/gulshan-lawyer',
  '/bn/gulshan-lawyer',
  '/banani-lawyer',
  '/bn/banani-lawyer',
  '/bashundhara-ra-lawyer',
  '/bn/bashundhara-ra-lawyer',
];
const MIN_INBOUND = 700;
const MIN_WORDS = 1200;
const MIN_FAQS = 6;

function resolveDistFile(uPath) {
  const clean = uPath === '/' ? 'index.html' : uPath.replace(/^\/+/, '');
  for (const c of [path.join(DIST, clean), path.join(DIST, `${clean}.html`), path.join(DIST, clean, 'index.html')]) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  }
  return null;
}

function extractHrefs(html) {
  const set = new Set();
  for (const m of html.matchAll(/href=["']([^"']+)["']/gi)) {
    const raw = m[1].split('?')[0].split('#')[0];
    if (raw.startsWith('/')) set.add(raw);
    else if (raw.startsWith('https://www.advmdshahalam.me/')) {
      set.add(raw.replace('https://www.advmdshahalam.me', '') || '/');
    }
  }
  return set;
}

function countVisibleWords(html) {
  const bodyMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  const src = bodyMatch ? bodyMatch[1] : html;
  const text = src
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text ? text.split(' ').length : 0;
}

const xml = fs.readFileSync(SITEMAP, 'utf8');
const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => new URL(m[1].trim()).pathname);

const inbound = Object.fromEntries(ALL_LOCALS.map((p) => [p, 0]));
const errors = [];
const pageStats = {};

for (const uPath of urls) {
  const f = resolveDistFile(uPath);
  if (!f) {
    errors.push(`${uPath}: missing dist file`);
    continue;
  }
  const html = fs.readFileSync(f, 'utf8');
  const hrefs = extractHrefs(html);

  for (const target of ALL_LOCALS) {
    if (uPath !== target && hrefs.has(target)) {
      inbound[target]++;
    }
  }

  // Mutual sibling cross-link check on local pages
  if (EN_LOCALS.includes(uPath)) {
    for (const sib of EN_LOCALS) {
      if (sib !== uPath && !hrefs.has(sib)) {
        errors.push(`${uPath}: missing sibling cross-link to ${sib}`);
      }
    }
  }
  if (BN_LOCALS.includes(uPath)) {
    for (const sib of BN_LOCALS) {
      if (sib !== uPath && !hrefs.has(sib)) {
        errors.push(`${uPath}: missing sibling cross-link to ${sib}`);
      }
    }
  }

  // Word count & FAQPage schema check on 6 new local pages
  if (NEW_LOCALS.includes(uPath)) {
    const words = countVisibleWords(html);
    let faqCount = 0;
    for (const m of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
      try {
        const parsed = JSON.parse(m[1]);
        const nodes = Array.isArray(parsed['@graph']) ? parsed['@graph'] : [parsed];
        for (const n of nodes) {
          if (n['@type'] === 'FAQPage' && Array.isArray(n.mainEntity)) {
            faqCount += n.mainEntity.length;
          }
        }
      } catch {
        // invalid JSON-LD caught by ci-schema-lint
      }
    }
    pageStats[uPath] = { words, faqCount };
    if (words < MIN_WORDS) {
      errors.push(`${uPath}: word count ${words} < ${MIN_WORDS} target`);
    }
    if (faqCount < MIN_FAQS) {
      errors.push(`${uPath}: FAQPage question count ${faqCount} < ${MIN_FAQS} target`);
    }
  }
}

console.log(`[local-crosslink] scanned ${urls.length} sitemap URLs:`);
for (const p of ALL_LOCALS) {
  console.log(`  ${p.padEnd(28)} <- ${inbound[p]}/${urls.length}`);
  if (inbound[p] < MIN_INBOUND) {
    errors.push(`${p}: inbound count ${inbound[p]}/${urls.length} < ${MIN_INBOUND} target`);
  }
}
console.log('[local-crosslink] new local page depth & FAQPage schema:');
for (const p of NEW_LOCALS) {
  const st = pageStats[p] || { words: 0, faqCount: 0 };
  console.log(`  ${p.padEnd(28)} words=${st.words} faqs=${st.faqCount}`);
}

if (errors.length) {
  for (const e of errors) console.error('  FAIL:', e);
  process.exit(1);
}
console.log(`[local-crosslink] PASS — all 8 local pages >= ${MIN_INBOUND}/${urls.length} inbound, all 6 new local pages >= ${MIN_WORDS} words & >= ${MIN_FAQS} FAQs, 0 errors`);
