#!/usr/bin/env node
/**
 * scripts/qa/verify-stage.mjs — rendered-DOM verification for Stage A / Stage B
 *
 *   --search                  /blog?q= must filter (three probe queries must differ)
 *   --redirects               every Stage-B source URL must be 301 -> KEEP -> 200 (no chain),
 *                             and after hydration the browser must end on the KEEP URL
 *   --base <url>              verify a live/preview origin instead of serving ./dist locally
 *
 * Local mode serves ./dist with an async http server that emulates vercel.json `redirects`
 * (non-conditional rules, `:path*`) and falls back to the SPA shell for unknown routes.
 * Never uses spawnSync (would deadlock the in-process server). Reports measured output only.
 */
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { createRequire } from 'node:module';
import { assertLiveUrl } from './url-truth.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const DIST = path.join(ROOT, 'dist');
const args = process.argv.slice(2);
const has = (f) => args.includes(f);
const arg = (f) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : null; };
const CHROMIUM = process.env.CHROMIUM_PATH || '/usr/bin/chromium';

const stageBCfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'seo/stage-b-clusters.json'), 'utf8'));
export const STAGE_B = stageBCfg.clusters.flatMap((c) => c.sources.map((src) => [src, c.master]));

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' };

function loadRedirects() {
  const v = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));
  return (v.redirects || []).filter((r) => !r.has).map((r) => ({ source: r.source, destination: r.destination, status: r.statusCode || 308 }));
}
function matchRedirect(rules, p) {
  for (const r of rules) {
    if (r.source === p) return r;
    const m = r.source.match(/^(.*)\/:([a-z]+)\*$/i);
    if (m && (p === m[1] || p.startsWith(m[1] + '/'))) {
      const rest = p.slice(m[1].length).replace(/^\//, '');
      return { ...r, destination: r.destination.replace(`:${m[2]}*`, rest) };
    }
  }
  return null;
}
function resolveFile(p) {
  const clean = decodeURIComponent(p.split('?')[0]);
  if (clean === '/') return path.join(DIST, 'index.html');
  const rel = clean.replace(/^\/+/, '');
  for (const c of [path.join(DIST, rel), path.join(DIST, `${rel}.html`), path.join(DIST, rel, 'index.html')]) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  }
  return null;
}
function serveDist() {
  const rules = loadRedirects();
  const server = http.createServer((req, res) => {
    const p = (req.url || '/').split('?')[0];
    const rule = matchRedirect(rules, p);
    if (rule) { res.writeHead(rule.status, { Location: rule.destination }); res.end(); return; }
    const f = resolveFile(p);
    if (f) {
      res.writeHead(200, { 'Content-Type': MIME[path.extname(f).toLowerCase()] || 'application/octet-stream' });
      fs.createReadStream(f).pipe(res);
      return;
    }
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(fs.readFileSync(path.join(DIST, '404.html')));
  });
  return new Promise((r) => server.listen(0, '127.0.0.1', () => r(server)));
}

function httpGet(base, p) {
  // single hop, never follows redirects
  const u = new URL(p, base);
  const lib = u.protocol === 'https:' ? import('node:https') : Promise.resolve(http);
  return lib.then((m) => new Promise((resolve, reject) => {
    const rq = (m.default || m).request(u, { method: 'GET', headers: { 'user-agent': 'verify-stage/1.0' } }, (res) => {
      res.resume();
      res.on('end', () => resolve({ status: res.statusCode, location: res.headers.location || null }));
    });
    rq.on('error', reject);
    rq.end();
  }));
}

async function chromium() {
  const require = createRequire(import.meta.url);
  for (const m of ['playwright', 'playwright-core']) {
    try { return require(m).chromium; } catch { /* next */ }
  }
  for (const base of ['/usr/local/lib/node_modules', '/usr/lib/node_modules']) {
    for (const m of ['playwright', 'playwright-core']) {
      try { return require(require.resolve(m, { paths: [base] })).chromium; } catch { /* next */ }
    }
  }
  throw new Error('playwright not found');
}

let server = null;
let base = arg('--base');
if (!base) {
  if (!fs.existsSync(DIST)) { console.error('dist/ missing — run npm run build first'); process.exit(2); }
  server = await serveDist();
  base = `http://127.0.0.1:${server.address().port}`;
}
base = base.replace(/\/$/, '');
console.log(`# verify-stage base=${base}`);

let failures = 0;
const browserType = await chromium();
const browser = await browserType.launch({ executablePath: fs.existsSync(CHROMIUM) ? CHROMIUM : undefined, args: ['--no-sandbox'] });
const ctx = await browser.newContext();

if (has('--search')) {
  const results = [];
  for (const q of ['bail', 'cheque', 'zzzzznotfound']) {
    const page = await ctx.newPage();
    await page.goto(`${base}/blog?q=${q}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(800);
    const r = await page.evaluate(() => {
      const links = [...document.querySelectorAll('a[href^="/blog/"]')]
        .map((a) => a.getAttribute('href'))
        .filter((h) => /^\/blog\/[^/?#]+$/.test(h) && !/^\/blog\/(page|topic)$/.test(h));
      return { h1: document.querySelector('h1')?.textContent.trim().slice(0, 90), postLinks: new Set(links).size, first: [...new Set(links)].slice(0, 3) };
    });
    results.push({ q, ...r });
    console.log(JSON.stringify({ q, ...r }));
    await page.close();
  }
  const distinct = new Set(results.map((r) => `${r.postLinks}|${r.first.join(',')}`)).size;
  const ok = distinct === 3;
  console.log(`[search] filtered sets differ per query: ${ok ? 'PASS' : 'FAIL'} (${distinct}/3 distinct)`);
  if (!ok) failures++;
}

if (has('--redirects')) {
  for (const [src, keep] of STAGE_B) {
    assertLiveUrl(src);
    assertLiveUrl(keep);
    if (!has('--skip-live')) {
      const liveRes = await fetch(`https://www.advmdshahalam.me${src}`, { redirect: 'manual' });
      if (liveRes.status !== 200) {
        console.log(`FAIL  ${src} is HTTP ${liveRes.status} on LIVE (must be 200 before redirecting)`);
        failures++;
      }
    }
    const hop1 = await httpGet(base, src);
    const loc = hop1.location ? new URL(hop1.location, base).pathname : null;
    const hop2 = await httpGet(base, keep);
    const static301 = hop1.status === 301 && loc === keep;
    const noChain = hop2.status === 200;
    // hydrated: real browser follows redirect and must end at KEEP with an H1 that is not a 404
    const page = await ctx.newPage();
    const resp = await page.goto(`${base}${src}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    const info = await page.evaluate(() => ({ path: location.pathname, h1: document.querySelector('h1')?.textContent.trim().slice(0, 70), canon: document.querySelector('link[rel=canonical]')?.href }));
    await page.close();
    const hydrated = info.path === keep && resp && resp.status() === 200 && !/not found|404/i.test(info.h1 || '');
    const canonOk = !info.canon || new URL(info.canon).pathname === keep;
    const ok = static301 && noChain && hydrated && canonOk;
    if (!ok) failures++;
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${src}\n      hop1=${hop1.status} -> ${loc}   target=${hop2.status}   browser-final=${info.path} h1="${info.h1}" canonical=${info.canon ? new URL(info.canon).pathname : '-'}`);
    // static output: the source must not ship its own prerendered page (no self-canonical on a 301 source)
    if (!arg('--base')) {
      const f = resolveFile(src.replace(/^\//, '/'));
      if (f) { console.log(`FAIL  dist still contains a prerendered page for redirect source ${src}`); failures++; }
    }
  }
  console.log(`[redirects] ${STAGE_B.length - 0} source URLs checked; failures so far: ${failures}`);
}

await browser.close();
if (server) server.close();
process.exitCode = failures ? 1 : 0;
