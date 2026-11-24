#!/usr/bin/env node
/**
 * scripts/qa/nap-consistency.mjs — Canonical NAP, Office Hours & Day-Count CI Gate (v8 + v9)
 *
 * 1. Computes distinct open days from OFFICE_HOURS.schema (must be 7: Sun-Thu + Fri-Sat).
 * 2. Scans all 820 sitemap URLs in dist/ and checks:
 *    - Every JSON-LD `openingHoursSpecification` matches the canonical schedule:
 *      Sunday-Thursday 08:00-22:00, Friday-Saturday 10:00-22:00.
 *    - No stale chamber hours (`9:00 AM – 9:00 PM`, `9:00 AM – 5:00 PM`, `10:00 AM – 6:00 PM`,
 *      `6:00 PM – 11:00 PM`, `7:00 PM and 10:00 PM`, `10:00 AM – 2:00 PM`, `Friday: Closed`, etc.)
 *      appear in any chamber/office hours block.
 *    - Day-count consistency gate (v9): every `"N days a week"` / `"N দিন সপ্তাহে"` / `"সপ্তাহের N দিন"`
 *      claim for the chamber must have N == distinctDays (7), never 6.
 *    - Third-party blocks (DIP Head Office, CCIC Malibagh, PCSW 01320000888, Labour Act weekly holiday)
 *      are whitelisted.
 *    - No conflicting legacy Blogspot/about.me NAP strings (`Mantrust Nazma Monzil`, `shahalam0332@gmail.com`,
 *      `15+ years`) appear on any page.
 * 3. Renders key routes (`/`, `/en`, `/contact`, `/bn/contact`, `/uttara-lawyer`, `/bn/uttara-lawyer`,
 *    `/blog/uttara-dhaka-lawyer-legal-services-2026`, `/blog/passport-lost-stolen-expired-bangladesh`)
 *    in headless Chromium and verifies rendered DOM hours + day-count (`7 days a week` on `/contact`).
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
const DISTINCT_OPEN_DAYS = new Set(OFFICE_HOURS.schema.flatMap((s) => s.dayOfWeek)).size;

const BN_DIGIT_MAP = { '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4', '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9' };
const toAsciiInt = (s) => Number(String(s).replace(/[\u09E6-\u09EF]/g, (c) => BN_DIGIT_MAP[c] || c));

const FORBIDDEN_PATTERNS = [
  { re: /9:00\s*AM\s*[–-]\s*9:00\s*PM/i, label: 'Stale 9:00 AM – 9:00 PM chamber hours' },
  { re: /9\s*AM\s*[–-]\s*9\s*PM/i, label: 'Stale 9 AM – 9 PM chamber hours' },
  { re: /10:00\s*AM\s*[–-]\s*6:00\s*PM/i, label: 'Stale 10:00 AM – 6:00 PM chamber hours' },
  { re: /10:00\s*AM\s*[–-]\s*2:00\s*PM/i, label: 'Stale Saturday 10:00 AM – 2:00 PM chamber hours' },
  { re: /Friday:\s*Closed/i, label: 'Stale Friday: Closed chamber hours' },
  { re: /শুক্রবার:\s*বন্ধ/u, label: 'Stale BN শুক্রবার: বন্ধ chamber hours' },
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

// Whitelisted third-party pages where a non-chamber schedule or statutory day-count is mentioned
const THIRD_PARTY_ALLOW = new Map([
  ['/bn/blog/cyber-crime-abiyog-korar-dhap-2026', [/সকাল\s*৯টা\s*[–-]\s*রাত\s*৯টা/u]],
  ['/bn/blog/shramik-odhikar-labour-ain-bn', [/সপ্তাহে\s*১\s*দিন/u]],
]);

function checkDayCountClaims(text, uPath, errors) {
  const allowedList = THIRD_PARTY_ALLOW.get(uPath) || [];
  const dayRe = /\b(\d+|[\u09E6-\u09EF]+)\s*(?:days\s+a\s+week|দিন\s+সপ্তাহে)|সপ্তাহে[র]?\s*(\d+|[\u09E6-\u09EF]+)\s*দিন/giu;
  for (const m of text.matchAll(dayRe)) {
    if (allowedList.some((a) => a.test(m[0]))) continue;
    const n = toAsciiInt(m[1] || m[2]);
    if (n !== DISTINCT_OPEN_DAYS) {
      errors.push(`${uPath}: day-count mismatch "${m[0]}" (found ${n}, expected ${DISTINCT_OPEN_DAYS} from OFFICE_HOURS)`);
    }
  }
}

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
if (DISTINCT_OPEN_DAYS !== 7) {
  errors.push(`OFFICE_HOURS.schema distinct open days=${DISTINCT_OPEN_DAYS} (expected 7)`);
}

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

  // 2. Check visible text for forbidden chamber hours / conflicting NAP / day-count drift
  const textOnly = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ');
  const allowedList = THIRD_PARTY_ALLOW.get(uPath) || [];
  for (const { re, label } of FORBIDDEN_PATTERNS) {
    if (allowedList.some((a) => a.source === re.source)) continue;
    if (re.test(textOnly)) {
      errors.push(`${uPath}: ${label}`);
    }
  }
  checkDayCountClaims(textOnly, uPath, errors);
}

// 3. Rendered DOM hours & day-count parity on key routes
const KEY_ROUTES = [
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
const chromePath =
  process.env.CHROMIUM_PATH ||
  ['/usr/bin/chromium', '/usr/bin/google-chrome', '/usr/bin/chromium-browser'].find((p) => fs.existsSync(p)) ||
  '/usr/bin/chromium';
const browser = await chromium.launch({ executablePath: chromePath, args: ['--no-sandbox'] });
const ctx = await browser.newContext();

const EN_HOURS_ROUTES = new Set([
  '/contact',
  '/en',
  '/blog/uttara-dhaka-lawyer-legal-services-2026',
  '/uttara-lawyer',
  '/gulshan-lawyer',
  '/banani-lawyer',
  '/bashundhara-ra-lawyer',
]);
const BN_HOURS_ROUTES = new Set([
  '/bn/contact',
  '/',
  '/bn/uttara-lawyer',
  '/bn/gulshan-lawyer',
  '/bn/banani-lawyer',
  '/bn/bashundhara-ra-lawyer',
]);

for (const route of KEY_ROUTES) {
  const page = await ctx.newPage();
  await page.goto(`${base}${route}`, { waitUntil: 'networkidle' });
  const domText = await page.evaluate(() => document.body.innerText);
  for (const { re, label } of FORBIDDEN_PATTERNS) {
    if (re.test(domText)) {
      errors.push(`[DOM] ${route}: ${label}`);
    }
  }
  checkDayCountClaims(domText, `[DOM] ${route}`, errors);
  if (route === '/contact') {
    if (!/available\s+7\s+days\s+a\s+week/i.test(domText)) {
      errors.push(`[DOM] /contact: missing "available 7 days a week" in rendered DOM`);
    }
  }
  if (EN_HOURS_ROUTES.has(route)) {
    if (!/Sunday\s*[–-]\s*Thursday:\s*8:00\s*AM\s*[–-]\s*10:00\s*PM/i.test(domText) && !/Sun[–-]Thu\s*08:00[–-]22:00/i.test(domText)) {
      errors.push(`[DOM] ${route}: canonical EN office hours not found in rendered DOM`);
    }
  }
  if (BN_HOURS_ROUTES.has(route)) {
    if (!/রবিবার\s*[–-]\s*বৃহস্পতিবার:\s*সকাল\s*৮:০০\s*[–-]\s*রাত\s*১০:০০/u.test(domText) && !/রবি[–-]বৃহস্পতি\s*সকাল\s*৮টা[–-]রাত\s*১০টা/u.test(domText)) {
      errors.push(`[DOM] ${route}: canonical BN office hours not found in rendered DOM`);
    }
  }
  await page.close();
}

await browser.close();
server.close();

console.log(`[nap-consistency] checked=${urls.length}/${urls.length} sitemap URLs, distinctOpenDays=${DISTINCT_OPEN_DAYS}, schemaSpecsChecked=${schemaSpecsChecked}, domRoutesChecked=${KEY_ROUTES.length}, errors=${errors.length}`);
if (errors.length) {
  for (const e of errors) console.error('  FAIL:', e);
  process.exit(1);
}
console.log(`[nap-consistency] PASS — ${urls.length}/${urls.length} PASS, 0 errors`);
