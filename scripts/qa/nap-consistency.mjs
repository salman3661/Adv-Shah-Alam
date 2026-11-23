#!/usr/bin/env node
/**
 * scripts/qa/nap-consistency.mjs — Canonical NAP & Office Hours CI Gate (v8)
 *
 * 1. Scans all 820 sitemap URLs in dist/ and checks:
 *    - Every JSON-LD `openingHoursSpecification` matches the canonical schedule:
 *      Sunday-Thursday 09:00-17:00, Saturday 10:00-14:00 (Friday Closed).
 *    - No stale chamber hours (`9:00 AM – 9:00 PM`, `10:00 AM – 6:00 PM`, `6:00 PM – 11:00 PM`,
 *      `7:00 PM and 10:00 PM`, `রাত ৯:০০`, `রাত ১০:০০টা`, `রাত ১১টা`, `closes: '21:00'`, `closes: '18:00'`)
 *      appear in any chamber/office hours block.
 *    - Third-party blocks (DIP Head Office, CCIC Malibagh, PCSW 01320000888, court/land offices)
 *      are whitelisted.
 *    - No conflicting legacy Blogspot NAP strings (`Mantrust Nazma Monzil`, `shahalam0332@gmail.com`,
 *      `15+ years`) appear on any page.
 * 2. When `--dom` is passed (or by default on the key hours routes `/`, `/en`, `/contact`, `/bn/contact`,
 *    `/uttara-lawyer`, `/bn/uttara-lawyer`, `/blog/uttara-dhaka-lawyer-legal-services-2026`),
 *    renders the pages in headless Chromium and verifies prerender <-> rendered DOM hours parity.
 */
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { createRequire } from 'node:module';
import { OFFICE_HOURS } from '../../src/seo/entity.js';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const DIST = path.join(ROOT, 'dist');
const SITEMAP = path.join(ROOT, 'public/sitemap.xml');

const CANONICAL_SPEC_JSON = JSON.stringify(OFFICE_HOURS.schema);

const FORBIDDEN_PATTERNS = [
  { re: /9:00\s*AM\s*[–-]\s*9:00\s*PM/i, label: 'Stale 9:00 AM – 9:00 PM chamber hours' },
  { re: /9\s*AM\s*[–-]\s*9\s*PM/i, label: 'Stale 9 AM – 9 PM chamber hours' },
  { re: /10:00\s*AM\s*[–-]\s*6:00\s*PM/i, label: 'Stale 10:00 AM – 6:00 PM chamber hours' },
  { re: /6:00\s*PM\s*(?:[–-]|to)\s*11:00\s*PM/i, label: 'Stale 6:00 PM – 11:00 PM evening chamber hours' },
  { re: /between\s+7:00\s*PM\s+and\s+10:00\s*PM/i, label: 'Stale 7:00 PM – 10:00 PM chamber hours' },
  { re: /সকাল\s*৯:০০(?:টা)?\s*(?:[–-]|থেকে)\s*রাত\s*৯:০০/u, label: 'Stale BN সকাল ৯:০০ – রাত ৯:০০ chamber hours' },
  { re: /সকাল\s*৯টা\s*[–-]\s*রাত\s*৯টা/u, label: 'Stale BN সকাল ৯টা – রাত ৯টা chamber hours' },
  { re: /সন্ধ্যা\s*৬টা\s*(?:[–-]|থেকে)\s*রাত\s*১১টা/u, label: 'Stale BN সন্ধ্যা ৬টা – রাত ১১টা chamber hours' },
  { re: /সন্ধ্যা\s*৭:০০টা\s*থেকে\s*রাত\s*১০:০০টা/u, label: 'Stale BN সন্ধ্যা ৭:০০টা – রাত ১০:০০টা chamber hours' },
  { re: /Mantrust\s+Nazma\s+Monzil/i, label: 'Conflicting legacy address Mantrust Nazma Monzil' },
  { re: /shahalam0332@gmail\.com/i, label: 'Conflicting legacy email shahalam0332@gmail.com' },
  { re: /\b15\+\s*years\s+of\s+experience/i, label: 'Conflicting 15+ years experience claim' },
];

// Whitelisted third-party pages where a non-chamber schedule is mentioned (e.g. PCSW helpline 9am-9pm)
const THIRD_PARTY_ALLOW = new Map([
  ['/bn/blog/cyber-crime-abiyog-korar-dhap-2026', [/সকাল\s*৯টা\s*[–-]\s*রাত\s*৯টা/u]],
]);

function resolveDistFile(uPath) {
  const clean = uPath === '/' ? 'index.html' : uPath.replace(/^\/+/, '');
  for (const c of [path.join(DIST, clean), path.join(DIST, `${clean}.html`), path.join(DIST, clean, 'index.html')]) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  }
  return null;
}

function checkOpeningHoursSpec(node, uPath, errors) {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) {
    for (const item of node) checkOpeningHoursSpec(item, uPath, errors);
    return;
  }
  if (node.openingHoursSpecification) {
    const actual = JSON.stringify(node.openingHoursSpecification);
    if (actual !== CANONICAL_SPEC_JSON) {
      errors.push(`${uPath}: JSON-LD openingHoursSpecification mismatch: ${actual}`);
    }
  }
  for (const v of Object.values(node)) {
    if (v && typeof v === 'object') checkOpeningHoursSpec(v, uPath, errors);
  }
}

const xml = fs.readFileSync(SITEMAP, 'utf8');
const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => new URL(m[1].trim()).pathname);

const errors = [];
let schemaSpecsChecked = 0;

for (const uPath of urls) {
  const f = resolveDistFile(uPath);
  if (!f) {
    errors.push(`${uPath}: missing dist file`);
    continue;
  }
  const html = fs.readFileSync(f, 'utf8');

  // 1. Check JSON-LD openingHoursSpecification
  for (const m of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const parsed = JSON.parse(m[1]);
      if (JSON.stringify(parsed).includes('openingHoursSpecification')) schemaSpecsChecked++;
      checkOpeningHoursSpec(parsed, uPath, errors);
    } catch (e) {
      errors.push(`${uPath}: invalid JSON-LD (${e.message})`);
    }
  }

  // 2. Check visible text for forbidden chamber hours / conflicting NAP
  const textOnly = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ');
  const allowedList = THIRD_PARTY_ALLOW.get(uPath) || [];
  for (const { re, label } of FORBIDDEN_PATTERNS) {
    if (allowedList.some((a) => a.source === re.source)) continue;
    if (re.test(textOnly)) {
      errors.push(`${uPath}: ${label}`);
    }
  }
}

// 3. Rendered DOM hours parity on key routes
const KEY_ROUTES = [
  '/',
  '/en',
  '/contact',
  '/bn/contact',
  '/uttara-lawyer',
  '/bn/uttara-lawyer',
  '/blog/uttara-dhaka-lawyer-legal-services-2026',
  '/blog/passport-lost-stolen-expired-bangladesh',
];

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2' };
const server = http.createServer((req, res) => {
  const clean = decodeURIComponent((req.url || '/').split('?')[0]);
  const f = resolveDistFile(clean);
  if (!f) { res.writeHead(404); res.end('404'); return; }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

const require = createRequire(import.meta.url);
const { chromium } = require('playwright-core');
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] });
const ctx = await browser.newContext();

for (const route of KEY_ROUTES) {
  const page = await ctx.newPage();
  await page.goto(`${base}${route}`, { waitUntil: 'networkidle' });
  const domText = await page.evaluate(() => document.body.innerText);
  for (const { re, label } of FORBIDDEN_PATTERNS) {
    if (re.test(domText)) {
      errors.push(`[DOM] ${route}: ${label}`);
    }
  }
  if (route === '/contact' || route === '/en' || route === '/blog/uttara-dhaka-lawyer-legal-services-2026' || route === '/uttara-lawyer') {
    if (!/Sunday\s*[–-]\s*Thursday:\s*9:00\s*AM\s*[–-]\s*5:00\s*PM/i.test(domText) && !/Sun[–-]Thu\s*09:00[–-]17:00/i.test(domText)) {
      errors.push(`[DOM] ${route}: canonical EN office hours not found in rendered DOM`);
    }
  }
  if (route === '/bn/contact' || route === '/' || route === '/bn/uttara-lawyer') {
    if (!/রবিবার\s*[–-]\s*বৃহস্পতিবার:\s*সকাল\s*৯:০০\s*[–-]\s*বিকেল\s*৫:০০/u.test(domText) && !/রবি[–-]বৃহস্পতি\s*৯টা[–-]৫টা/u.test(domText)) {
      errors.push(`[DOM] ${route}: canonical BN office hours not found in rendered DOM`);
    }
  }
  await page.close();
}

await browser.close();
server.close();

console.log(`[nap-consistency] checked=${urls.length}/${urls.length} sitemap URLs, schemaSpecsChecked=${schemaSpecsChecked}, domRoutesChecked=${KEY_ROUTES.length}, errors=${errors.length}`);
if (errors.length) {
  for (const e of errors) console.error('  FAIL:', e);
  process.exit(1);
}
console.log(`[nap-consistency] PASS — ${urls.length}/${urls.length} PASS, 0 errors`);
