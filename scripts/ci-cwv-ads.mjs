#!/usr/bin/env node
/**
 * ci-cwv-ads.mjs — Verify AdSense unit caps, zero ad above H1/direct-answer,
 * non-collapsing unfilled ad slots, .gcta-bar clearance, CLS < 0.05, and LCP/HTML telemetry.
 *
 * Usage:
 *   node scripts/ci-cwv-ads.mjs
 *   node scripts/ci-cwv-ads.mjs --base https://www.advmdshahalam.me
 *   node scripts/ci-cwv-ads.mjs --max-lcp 1500 --max-html-kb 60
 */
import fs from 'fs';
import http from 'http';
import path from 'path';
import { chromium } from 'playwright-core';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

function resolveStaticFile(urlPath) {
  const clean = urlPath.split('?')[0];
  if (clean === '/') return path.join(DIST, 'index.html');
  const rel = clean.replace(/^\/+/, '');
  for (const c of [path.join(DIST, rel), path.join(DIST, `${rel}.html`), path.join(DIST, rel, 'index.html')]) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  }
  return null;
}

function startDistServer() {
  const server = http.createServer((req, res) => {
    const reqPath = (req.url || '/').split('?')[0];
    const file = resolveStaticFile(reqPath);
    if (file) {
      const ext = path.extname(file).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      fs.createReadStream(file).pipe(res);
      return;
    }
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('Not found');
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)));
}

const ROUTES = [
  { path: '/', type: 'home', maxAds: 3, exactAds: null, isPost: false },
  { path: '/en', type: 'home', maxAds: 3, exactAds: null, isPost: false },
  { path: '/contact', type: 'contact', maxAds: 2, exactAds: null, isPost: false },
  { path: '/bn/contact', type: 'contact', maxAds: 2, exactAds: null, isPost: false },
  { path: '/blog', type: 'blog-hub', maxAds: 2, exactAds: null, isPost: false },
  { path: '/blog/page/2', type: 'blog-hub', maxAds: 2, exactAds: null, isPost: false },
  { path: '/bn/blog', type: 'blog-hub', maxAds: 2, exactAds: null, isPost: false },
  { path: '/services/criminal-lawyer', type: 'service', maxAds: 4, exactAds: 4, isPost: false },
  { path: '/bn/services/criminal-lawyer', type: 'service', maxAds: 4, exactAds: 4, isPost: false },
  { path: '/blog/anticipatory-bail-bangladesh', type: 'post-en', maxAds: 4, exactAds: null, isPost: true },
  { path: '/blog/138-ni-act-bangladesh-cheque-case-guide', type: 'post-en', maxAds: 4, exactAds: null, isPost: true },
  { path: '/bn/blog/sampatti-uttoradhikar-ain-2026-bn', type: 'post-bn', maxAds: 2, exactAds: 2, isPost: true },
  { path: '/bn/blog/adalate-jomi-krok-obomukto-korar-niyom-2026-bn', type: 'post-bn', maxAds: 2, exactAds: 2, isPost: true },
];

const CHROMIUM = process.env.CHROMIUM_PATH || '/usr/bin/chromium';

function parseArg(flag) {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : null;
}

async function measureViewport(context, baseUrl, routeSpec, vp, opts) {
  const page = await context.newPage();
  const url = `${baseUrl.replace(/\/$/, '')}${routeSpec.path}`;

  await page.addInitScript(() => {
    window.__cwv = { cls: 0, lcp: 0, lcpTag: '' };
    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) window.__cwv.cls += entry.value;
        }
      }).observe({ type: 'layout-shift', buffered: true });
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1];
        if (last) {
          window.__cwv.lcp = last.startTime;
          window.__cwv.lcpTag = last.element ? `${last.element.tagName}.${(last.element.className || '').toString().slice(0, 30)}` : '';
        }
      }).observe({ type: 'largest-contentful-paint', buffered: true });
    } catch {}
  });

  const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  const status = resp ? resp.status() : 0;
  const htmlBytes = resp ? (await resp.body()).length : 0;

  // Capture initial pre-scroll CLS/LCP (ensures AdSense script does not run before scroll)
  await page.waitForTimeout(700);
  const preScroll = await page.evaluate(() => ({
    cls: Number((window.__cwv?.cls || 0).toFixed(4)),
    adsLoadedBeforeScroll: Boolean(document.querySelector('script[src*="adsbygoogle.js"]')),
  }));

  // Trigger scroll & wait for lazy sections / below-fold mounts
  await page.evaluate(async () => {
    const maxY = Math.max(document.body.scrollHeight, 1200);
    window.scrollTo(0, Math.floor(maxY * 0.45));
    await new Promise((r) => setTimeout(r, 250));
    window.scrollTo(0, Math.floor(maxY * 0.85));
    await new Promise((r) => setTimeout(r, 250));
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(900);

  // Measure ad counts (manual vs Google Auto Ads), position relative to H1 & direct-answer, unfilled reservation & CWV
  const res = await page.evaluate((minReservedH) => {
    const h1 = document.querySelector('h1');
    const da = document.querySelector('.direct-answer');
    const h1Bottom = h1 ? h1.getBoundingClientRect().bottom + window.scrollY : 0;
    const daBottom = da ? da.getBoundingClientRect().bottom + window.scrollY : 0;
    const boundaryY = Math.max(h1Bottom, daBottom);

    const allIns = Array.from(document.querySelectorAll('ins.adsbygoogle'))
      .filter((el) => !el.hasAttribute('data-anchor-status'));
    const manualIns = allIns.filter((el) => Boolean(el.closest('.ad-slot-reserved')));
    const autoIns = allIns.filter((el) => !el.closest('.ad-slot-reserved'));

    let manualAboveBoundary = 0;
    for (const ins of manualIns) {
      const y = ins.getBoundingClientRect().top + window.scrollY;
      if (boundaryY > 0 && y < boundaryY - 5) {
        manualAboveBoundary += 1;
      }
    }

    // Verify unfilled behavior does not collapse height below minReservedH
    let unfilledHeightOk = true;
    let firstReservedH = null;
    const firstWrap = document.querySelector('.ad-slot-reserved');
    if (firstWrap) {
      const innerIns = firstWrap.querySelector('ins.adsbygoogle');
      firstWrap.setAttribute('data-ad-status-wrapper', 'unfilled');
      if (innerIns) innerIns.setAttribute('data-ad-status', 'unfilled');
      firstReservedH = Math.round(firstWrap.getBoundingClientRect().height);
      if (firstReservedH < minReservedH) {
        unfilledHeightOk = false;
      }
    }

    // Mobile .gcta-bar check
    let gctaOk = true;
    const gcta = document.querySelector('.gcta-bar');
    if (gcta && window.innerWidth <= 768) {
      const style = getComputedStyle(gcta);
      const rect = gcta.getBoundingClientRect();
      if (style.display === 'none' || rect.bottom > window.innerHeight + 2) {
        gctaOk = false;
      }
    }

    return {
      adCount: manualIns.length,
      autoAdCount: autoIns.length,
      adsAboveBoundary: manualAboveBoundary,
      firstReservedH,
      unfilledHeightOk,
      gctaOk,
      cls: Number((window.__cwv?.cls || 0).toFixed(4)),
      lcp: Math.round(window.__cwv?.lcp || 0),
      lcpTag: window.__cwv?.lcpTag || '',
    };
  }, vp.name === 'mobile' ? 100 : 250);

  await page.close();

  const failures = [];
  const warnings = [];
  if (status !== 200) failures.push(`HTTP ${status}`);
  if (preScroll.adsLoadedBeforeScroll) failures.push('adsbygoogle.js loaded before scroll');
  if (preScroll.cls >= 0.05) failures.push(`preScrollCLS=${preScroll.cls} >= 0.05`);
  if (res.adCount > 4) failures.push(`adCount=${res.adCount} > 4 max`);
  if (res.adCount > routeSpec.maxAds) failures.push(`adCount=${res.adCount} > ${routeSpec.maxAds} (${routeSpec.type})`);
  if (routeSpec.exactAds !== null && res.adCount !== routeSpec.exactAds) {
    failures.push(`adCount=${res.adCount} != ${routeSpec.exactAds} exact (${routeSpec.type})`);
  }
  if (res.adsAboveBoundary > 0) failures.push(`adsAboveH1OrDirectAnswer=${res.adsAboveBoundary}`);
  if (!res.unfilledHeightOk) failures.push(`unfilledHeight=${res.firstReservedH}px < ${vp.name === 'mobile' ? 100 : 250}px`);
  if (!res.gctaOk) failures.push('mobile .gcta-bar overlap/offscreen');
  if (res.cls >= 0.05) {
    if (res.autoAdCount > 0 && preScroll.cls < 0.05) {
      warnings.push(`postScrollAutoAds=${res.autoAdCount} CLS=${res.cls} (dashboard Auto Ads)`);
    } else {
      failures.push(`CLS=${res.cls} >= 0.05`);
    }
  }
  if (res.autoAdCount > 0) {
    warnings.push(`dashboardAutoAds=${res.autoAdCount}`);
  }
  if (opts.maxLcp && vp.name === 'mobile' && res.lcp > opts.maxLcp) {
    failures.push(`mobileLCP=${res.lcp}ms > ${opts.maxLcp}ms (${res.lcpTag})`);
  }
  const htmlKb = Number((htmlBytes / 1024).toFixed(1));
  if (opts.maxHtmlKb && routeSpec.isPost && htmlKb > opts.maxHtmlKb) {
    failures.push(`htmlSize=${htmlKb}KB > ${opts.maxHtmlKb}KB`);
  }

  return { route: routeSpec.path, vp: vp.name, htmlKb, preCls: preScroll.cls, ...res, failures, warnings };
}

async function main() {
  const explicitBase = parseArg('--base') || process.env.CI_BASE;
  const maxLcp = Number(parseArg('--max-lcp') || 0);
  const maxHtmlKb = Number(parseArg('--max-html-kb') || 0);

  let server = null;
  let baseUrl = explicitBase;
  if (!baseUrl) {
    if (!fs.existsSync(DIST)) {
      console.error('dist/ not found — run npm run build first');
      process.exit(2);
    }
    server = await startDistServer();
    baseUrl = `http://127.0.0.1:${server.address().port}`;
  }

  const browser = await chromium.launch({
    executablePath: fs.existsSync(CHROMIUM) ? CHROMIUM : undefined,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--headless=new'],
  });

  const viewports = [
    { name: 'mobile', width: 390, height: 844 },
    { name: 'desktop', width: 1366, height: 900 },
  ];

  const results = [];
  try {
    for (const vp of viewports) {
      const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, ignoreHTTPSErrors: true });
      for (const r of ROUTES) {
        results.push(await measureViewport(ctx, baseUrl, r, vp, { maxLcp, maxHtmlKb }));
      }
      await ctx.close();
    }
  } finally {
    await browser.close();
    if (server) server.close();
  }

  let failCount = 0;
  for (const r of results) {
    const ok = r.failures.length === 0;
    if (!ok) failCount++;
    const warnNote = r.warnings.length ? `  [WARN: ${r.warnings.join('; ')}]` : '';
    console.log(
      `${ok ? '✓' : '✗'} [${r.vp.padEnd(7)}] ${r.route.padEnd(46)} manual=${r.adCount} auto=${r.autoAdCount} minH=${r.firstReservedH ?? '-'} preCLS=${r.preCls} CLS=${r.cls} LCP=${r.lcp}ms (${r.htmlKb}KB)${ok ? warnNote : '  FAIL: ' + r.failures.join('; ')}`
    );
  }
  console.log(`\nCWV & ADSENSE SUMMARY: ${results.length - failCount}/${results.length} passed, ${failCount} failed`);
  if (failCount > 0) process.exit(1);
}

main().catch((e) => {
  console.error('FATAL:', e);
  process.exit(2);
});
