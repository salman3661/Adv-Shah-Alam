#!/usr/bin/env node
/**
 * scripts/qa/cls-gate.mjs — Headless Chromium CLS CI Gate (v11.4)
 *
 * Samples >= 40 representative pages machine-extracted from public/sitemap.xml
 * (15 EN blog posts + 15 BN blog posts + 8 local landing pages + 6 service pages
 *  + 2 contact pages + 2 blog hubs = 48 pages) and enforces:
 *   1. CLS <= 0.055 on every sampled page (1366x900 desktop viewport).
 *   2. adsbygoogle.js is NOT loaded before user interaction/scroll (prevents
 *      pre-interaction Auto Ads injection above the fold).
 *
 * Usage:
 *   node scripts/qa/cls-gate.mjs                         # tests local dist/
 *   node scripts/qa/cls-gate.mjs --base https://www.advmdshahalam.me
 */
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { createRequire } from 'node:module';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const DIST = path.join(ROOT, 'dist');
const SITEMAP = path.join(ROOT, 'public/sitemap.xml');
const MAX_CLS = 0.055;

const argv = process.argv.slice(2);
const baseIdx = argv.indexOf('--base');
const LIVE_BASE = baseIdx >= 0 && argv[baseIdx + 1] ? argv[baseIdx + 1].replace(/\/$/, '') : null;

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

function pickEvenly(arr, count) {
  if (arr.length <= count) return [...arr];
  const out = [];
  const step = (arr.length - 1) / (count - 1);
  for (let i = 0; i < count; i++) out.push(arr[Math.round(i * step)]);
  return out;
}

const xml = fs.readFileSync(SITEMAP, 'utf8');
const allPaths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1].trim()).pathname);

const enPosts = allPaths.filter((p) => /^\/blog\/[^/]+$/.test(p) && !p.startsWith('/blog/topic'));
const bnPosts = allPaths.filter((p) => /^\/bn\/blog\/[^/]+$/.test(p) && !p.startsWith('/bn/blog/topic'));
const localPages = allPaths.filter((p) => /^\/(bn\/)?(uttara|gulshan|banani|bashundhara-ra)-lawyer$/.test(p));
const servicePages = allPaths.filter((p) => /^\/(bn\/)?services\/[^/]+$/.test(p));
const corePages = ['/contact', '/bn/contact', '/blog', '/bn/blog'].filter((p) => allPaths.includes(p));

const sampleRoutes = [
  ...pickEvenly(enPosts, 15).map((p) => ({ path: p, type: 'en-post' })),
  ...pickEvenly(bnPosts, 15).map((p) => ({ path: p, type: 'bn-post' })),
  ...localPages.map((p) => ({ path: p, type: 'local' })),
  ...pickEvenly(servicePages, 6).map((p) => ({ path: p, type: 'service' })),
  ...corePages.map((p) => ({ path: p, type: p.includes('contact') ? 'contact' : 'blog-hub' })),
];

let server = null;
let base = LIVE_BASE;

if (!base) {
  server = http.createServer((req, res) => {
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
  base = `http://127.0.0.1:${server.address().port}`;
}

const require = createRequire(import.meta.url);
const { chromium } = require('playwright-core');
const chromePath =
  process.env.CHROMIUM_PATH ||
  ['/usr/bin/chromium', '/usr/bin/google-chrome', '/usr/bin/chromium-browser'].find((p) => fs.existsSync(p)) ||
  '/usr/bin/chromium';

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
});

const CONCURRENCY = LIVE_BASE ? 2 : 4;
const results = [];
const failures = [];
let cursor = 0;

async function worker() {
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  if (!LIVE_BASE) {
    await ctx.route('**/*', (route) => {
      const u = route.request().url();
      if (!u.startsWith(base)) return route.abort();
      return route.continue();
    });
  }
  while (true) {
    const idx = cursor++;
    if (idx >= sampleRoutes.length) break;
    const item = sampleRoutes[idx];
    const page = await ctx.newPage();
    try {
      await page.addInitScript(() => {
        window.__clsTotal = 0;
        window.__clsSources = [];
        try {
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (!entry.hadRecentInput) {
                window.__clsTotal += entry.value;
                for (const s of entry.sources || []) {
                  window.__clsSources.push({
                    v: Number(entry.value.toFixed(4)),
                    tag: s.node?.tagName || '',
                    txt: (s.node?.innerText || '').replace(/\s+/g, ' ').slice(0, 48),
                  });
                }
              }
            }
          }).observe({ type: 'layout-shift', buffered: true });
        } catch {
          // PerformanceObserver unsupported
        }
      });

      await page.goto(base + item.path, { waitUntil: LIVE_BASE ? 'load' : 'networkidle', timeout: 30000 });
      await page.waitForSelector('h1', { timeout: 8000 }).catch(() => {});
      await page.waitForTimeout(LIVE_BASE ? 3000 : 800);

      const m = await page.evaluate(() => ({
        cls: Number((window.__clsTotal || 0).toFixed(4)),
        adsLoadedBeforeScroll: Boolean(document.querySelector('script[src*="adsbygoogle.js"]')),
        sources: (window.__clsSources || []).slice(0, 3),
      }));

      results.push({ ...item, ...m });
      if (m.cls > MAX_CLS) {
        failures.push(`${item.path} (${item.type}): CLS=${m.cls} > ${MAX_CLS} ${JSON.stringify(m.sources)}`);
      }
      if (m.adsLoadedBeforeScroll) {
        failures.push(`${item.path} (${item.type}): adsbygoogle.js loaded before interaction`);
      }
    } catch (err) {
      failures.push(`${item.path} (${item.type}): error ${err.message}`);
    } finally {
      await page.close();
    }
  }
  await ctx.close();
}

await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
await browser.close();
if (server) server.close();

const clsValues = results.map((r) => r.cls).sort((a, b) => a - b);
const median = clsValues.length ? clsValues[Math.floor(clsValues.length / 2)] : 0;
const maxCls = clsValues.length ? clsValues[clsValues.length - 1] : 0;

const byType = {};
for (const r of results) {
  if (!byType[r.type]) byType[r.type] = [];
  byType[r.type].push(r.cls);
}
const typeSummary = Object.entries(byType)
  .map(([t, vals]) => {
    const s = [...vals].sort((a, b) => a - b);
    const med = s[Math.floor(s.length / 2)] ?? 0;
    const mx = s[s.length - 1] ?? 0;
    return `${t}(n=${vals.length}, med=${med.toFixed(4)}, max=${mx.toFixed(4)})`;
  })
  .join(' | ');

if (failures.length) {
  console.error(`❌ [cls-gate] FAIL (${failures.length}/${sampleRoutes.length}):`);
  for (const f of failures.slice(0, 20)) console.error(`  - ${f}`);
  process.exit(1);
}

console.log(
  `✅ [cls-gate] PASS: ${results.length}/${sampleRoutes.length} pages <= ${MAX_CLS} (median=${median.toFixed(4)}, max=${maxCls.toFixed(4)}, 0 pre-interaction adsbygoogle.js)`
);
console.log(`   Breakdown: ${typeSummary}`);
