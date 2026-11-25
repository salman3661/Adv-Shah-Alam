#!/usr/bin/env node
/**
 * scripts/qa/schema-dedupe.mjs — Rendered-DOM Structured Data De-dupe & FAQ Visibility CI Gate (v11)
 *
 * Renders ALL sitemap URLs in headless Chromium (concurrent worker pool) and enforces:
 *   1. Exactly 1 <script type="application/ld+json"> block in the FINAL rendered DOM.
 *   2. Every top-level / @graph @type appears at most ONCE (no duplicate LegalService, FAQPage,
 *      BreadcrumbList, WebSite, Person, BlogPosting, etc.).
 *   3. Every FAQPage has valid Question/Answer pairs (and /uttara-lawyer + /bn/uttara-lawyer
 *      specifically have FAQPage === 1, questions === 6, and 6/6 visible in rendered DOM).
 *   4. Every LegalService node matches canonical telephone, Uttara Sector 12 address, and
 *      (when present) canonical openingHoursSpecification.
 */
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { createRequire } from 'node:module';
import { ADVOCATE_NAP, OFFICE_HOURS } from '../../src/seo/entity.js';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const DIST = path.join(ROOT, 'dist');
const SITEMAP = path.join(ROOT, 'public/sitemap.xml');

const CANONICAL_HOURS_JSON = JSON.stringify(OFFICE_HOURS.schema);
const CONCURRENCY = Number(process.env.SCHEMA_DEDUPE_CONCURRENCY || 4);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

function resolveDistFile(uPath) {
  const clean = uPath === '/' ? 'index.html' : uPath.replace(/^\/+/, '');
  for (const c of [path.join(DIST, clean), path.join(DIST, `${clean}.html`), path.join(DIST, clean, 'index.html')]) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  }
  return null;
}

const xml = fs.readFileSync(SITEMAP, 'utf8');
const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => new URL(m[1].trim()).pathname);

const server = http.createServer((req, res) => {
  const clean = decodeURIComponent((req.url || '/').split('?')[0]);
  const f = resolveDistFile(clean);
  if (!f) {
    res.writeHead(404);
    res.end('404');
    return;
  }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

const require = createRequire(import.meta.url);
const { chromium } = require('playwright-core');
const chromePath =
  process.env.CHROMIUM_PATH ||
  ['/usr/bin/chromium', '/usr/bin/google-chrome', '/usr/bin/chromium-browser'].find((p) => fs.existsSync(p)) ||
  '/usr/bin/chromium';

const browser = await chromium.launch({ executablePath: chromePath, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const ctx = await browser.newContext();

// Block external requests & heavy media/font assets so 826-URL rendered DOM check is fast & low-memory
await ctx.route('**/*', (route) => {
  const req = route.request();
  const u = req.url();
  const rt = req.resourceType();
  if (!u.startsWith(base) && !u.startsWith('data:') && !u.startsWith('blob:')) return route.abort();
  if (rt === 'image' || rt === 'font' || rt === 'media' || rt === 'stylesheet') return route.abort();
  return route.continue();
});

const errors = [];
const keyReports = new Map();
const KEY_ROUTES = new Set([
  '/',
  '/en',
  '/contact',
  '/bn/contact',
  '/uttara-lawyer',
  '/bn/uttara-lawyer',
  '/gulshan-lawyer',
  '/bn/gulshan-lawyer',
  '/banani-lawyer',
  '/bn/banani-lawyer',
  '/bashundhara-ra-lawyer',
  '/bn/bashundhara-ra-lawyer',
  '/services/land-lawyer',
  '/bn/services/land-lawyer',
  '/review',
  '/nrb-legal-help',
]);

let checked = 0;
let totalFaqPages = 0;
let totalLegalServices = 0;
let idx = 0;

async function worker() {
  let page = await ctx.newPage();
  let handled = 0;
  while (true) {
    const i = idx++;
    if (i >= urls.length) break;
    const uPath = urls[i];
    if (handled > 0 && handled % 50 === 0) {
      await page.close().catch(() => {});
      page = await ctx.newPage();
    }
    handled++;
    try {
      let data;
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          await page.goto(`${base}${uPath}`, { waitUntil: 'load', timeout: 20000 });
          if (uPath === '/uttara-lawyer' || uPath === '/bn/uttara-lawyer') {
            await page.waitForSelector('article', { timeout: 5000 });
          } else {
            await page.waitForTimeout(60);
          }
          data = await page.evaluate(() => {
            const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map((s) => s.textContent || '');
            const bodyText = (document.body?.innerText || '').replace(/\s+/g, ' ');
            return { scripts, bodyText };
          });
          break;
        } catch (err) {
          if (attempt === 0) {
            await page.close().catch(() => {});
            page = await ctx.newPage();
            continue;
          }
          throw err;
        }
      }

      const blockCount = data.scripts.length;
      if (blockCount !== 1) {
        errors.push(`${uPath}: expected 1 ld+json block in rendered DOM, found ${blockCount}`);
      }

      const typeCounts = {};
      let faqQuestions = [];
      let legalServiceNodes = [];

      for (const raw of data.scripts) {
        let parsed;
        try {
          parsed = JSON.parse(raw);
        } catch (e) {
          errors.push(`${uPath}: invalid JSON-LD (${e.message})`);
          continue;
        }
        const topNodes = Array.isArray(parsed['@graph']) ? parsed['@graph'] : Array.isArray(parsed) ? parsed : [parsed];
        for (const n of topNodes) {
          if (!n || typeof n !== 'object') continue;
          const types = Array.isArray(n['@type']) ? n['@type'] : n['@type'] ? [n['@type']] : [];
          for (const t of types) {
            typeCounts[t] = (typeCounts[t] || 0) + 1;
          }
          if (types.includes('FAQPage')) {
            const items = Array.isArray(n.mainEntity) ? n.mainEntity : [];
            if (items.length === 0) {
              errors.push(`${uPath}: empty FAQPage.mainEntity`);
            }
            for (const q of items) {
              if (!q?.name || !q?.acceptedAnswer?.text) {
                errors.push(`${uPath}: invalid FAQPage Question/Answer entry`);
              } else {
                faqQuestions.push(q.name);
              }
            }
          }
          if (types.includes('LegalService')) {
            legalServiceNodes.push(n);
          }
        }
      }

      for (const [t, c] of Object.entries(typeCounts)) {
        if (c > 1) {
          errors.push(`${uPath}: duplicate @type "${t}" (${c} times) in rendered DOM`);
        }
      }

      for (const ls of legalServiceNodes) {
        if (ls.telephone && ls.telephone !== ADVOCATE_NAP.telephone) {
          errors.push(`${uPath}: LegalService telephone mismatch (${ls.telephone})`);
        }
        if (ls.address) {
          const addrs = Array.isArray(ls.address) ? ls.address : [ls.address];
          const hasUttara = addrs.some((a) => String(a?.streetAddress || '').includes('Sector 12, Uttara West'));
          if (!hasUttara) {
            errors.push(`${uPath}: LegalService address missing canonical "Sector 12, Uttara West"`);
          }
        }
        if (ls.openingHoursSpecification && JSON.stringify(ls.openingHoursSpecification) !== CANONICAL_HOURS_JSON) {
          errors.push(`${uPath}: LegalService openingHoursSpecification mismatch`);
        }
      }

      if (typeCounts.FAQPage) totalFaqPages += typeCounts.FAQPage;
      if (typeCounts.LegalService) totalLegalServices += typeCounts.LegalService;

      // Special assertion for /uttara-lawyer + /bn/uttara-lawyer (v11 Part 2)
      let visibleFaqCount = null;
      if (uPath === '/uttara-lawyer' || uPath === '/bn/uttara-lawyer') {
        if ((typeCounts.FAQPage || 0) !== 1) {
          errors.push(`${uPath}: expected FAQPage=1, got ${typeCounts.FAQPage || 0}`);
        }
        if (faqQuestions.length !== 6) {
          errors.push(`${uPath}: expected 6 FAQ questions, got ${faqQuestions.length}`);
        }
        visibleFaqCount = faqQuestions.filter((q) => data.bodyText.includes(q.replace(/\s+/g, ' ').trim())).length;
        if (visibleFaqCount !== faqQuestions.length) {
          errors.push(`${uPath}: only ${visibleFaqCount}/${faqQuestions.length} FAQ questions visible in rendered DOM`);
        }
      }

      if (KEY_ROUTES.has(uPath)) {
        keyReports.set(uPath, {
          blocks: blockCount,
          faqPages: typeCounts.FAQPage || 0,
          faqQ: faqQuestions.length,
          visibleFaqCount,
          legalServices: typeCounts.LegalService || 0,
          breadcrumbs: typeCounts.BreadcrumbList || 0,
        });
      }
      checked++;
    } catch (e) {
      errors.push(`${uPath}: render error (${e.message})`);
    }
  }
  await page.close();
}

await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
await browser.close();
server.close();

console.log(`[schema-dedupe] rendered ${checked}/${urls.length} sitemap URLs in headless Chrome (FAQPage=${totalFaqPages}, LegalService=${totalLegalServices}, errors=${errors.length})`);
for (const r of KEY_ROUTES) {
  const rep = keyReports.get(r);
  if (rep) {
    const vis = rep.visibleFaqCount !== null ? ` visibleInDOM=${rep.visibleFaqCount}/${rep.faqQ}` : '';
    console.log(`  ${r.padEnd(28)} blocks=${rep.blocks} FAQPage=${rep.faqPages}(${rep.faqQ}q)${vis} LegalService=${rep.legalServices} BreadcrumbList=${rep.breadcrumbs}`);
  }
}

if (errors.length) {
  for (const e of errors.slice(0, 40)) console.error('  FAIL:', e);
  if (errors.length > 40) console.error(`  ... and ${errors.length - 40} more errors`);
  process.exit(1);
}
console.log(`[schema-dedupe] PASS — ${checked}/${urls.length} PASS, 0 errors`);
