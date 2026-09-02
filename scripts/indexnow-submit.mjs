/**
 * scripts/indexnow-submit.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Manual IndexNow bulk submission script.
 * Run ONCE after each deploy to notify Bing of updated pages.
 *
 *   Usage:
 *     npm run indexnow            ← submits ALL_SITE_URLS
 *     npm run indexnow -- /blog   ← submits one specific path
 *
 * Node 18+ / 24+ required (fetch built-in). No extra dependencies.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const KEY  = 'b88cb6f2bcc144ba92303e49cd3b7970';
const HOST = 'www.advmdshahalam.me';
const ENDPOINTS = [
  'https://www.bing.com/indexnow',
  'https://api.indexnow.org/indexnow',
  'https://yandex.com/indexnow'
];

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Dynamically load URLs from public/sitemap.xml ──────────────────────────
let ALL_SITE_URLS = [];

try {
  const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    const locRegex = /<loc>(https:\/\/www\.advmdshahalam\.me[^<]*)<\/loc>/g;
    let match;
    while ((match = locRegex.exec(sitemapContent)) !== null) {
      ALL_SITE_URLS.push(match[1]);
    }
    console.log(`[IndexNow] Loaded ${ALL_SITE_URLS.length} URLs from public/sitemap.xml`);
  }
} catch (e) {
  console.warn('[IndexNow] Could not read public/sitemap.xml, falling back to default list.', e.message);
}

if (ALL_SITE_URLS.length === 0) {
  ALL_SITE_URLS = [
    `https://${HOST}/`,
    `https://${HOST}/blog`,
    `https://${HOST}/bn/blog`,
    `https://${HOST}/advocate-md-shah-alam`,
    `https://${HOST}/education`,
    `https://${HOST}/services/criminal-lawyer`,
    `https://${HOST}/services/divorce-lawyer`,
    `https://${HOST}/services/land-lawyer`,
    `https://${HOST}/services/bail-lawyer`,
    `https://${HOST}/services/supreme-court-lawyer`,
    `https://${HOST}/services/tax-lawyer`,
    `https://${HOST}/services/company-corporate-lawyer`,
  ];
}

// ── Resolve URL list from CLI args or fall back to full site list ─────────────
const args = process.argv.slice(2);  // e.g. ["--", "/blog"] or ["/blog"]
const paths = args.filter(a => a.startsWith('/'));

const urlsToSubmit = paths.length > 0
  ? paths.map(p => `https://${HOST}${p}`)
  : ALL_SITE_URLS;

// ── Submit via POST to Bing & IndexNow ────────────────────────────────────────
async function submit() {
  console.log(`\n[IndexNow] Submitting ${urlsToSubmit.length} URL(s) to Bing & Search Engines...\n`);
  
  const body = {
    host:        HOST,
    key:         KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList:     urlsToSubmit,
  };

  for (const endpoint of ENDPOINTS) {
    try {
      console.log(`📡 Sending to: ${endpoint} ...`);
      const res = await fetch(endpoint, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body:    JSON.stringify(body),
      });

      if (res.status === 200 || res.status === 202) {
        console.log(`  ✅ [${endpoint}] Success — HTTP ${res.status}`);
      } else {
        const text = await res.text().catch(() => '');
        console.warn(`  ⚠️ [${endpoint}] HTTP ${res.status}: ${text}`);
      }
    } catch (err) {
      console.error(`  ❌ [${endpoint}] Error:`, err.message);
    }
  }

  // Ping Bing & Google sitemaps
  try {
    const sitemapUrl = `https://${HOST}/sitemap.xml`;
    console.log(`\n🔔 Pinging Bing Sitemap: https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
    const pingRes = await fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
    console.log(`  ✅ Bing Sitemap Ping Response: HTTP ${pingRes.status}`);
  } catch (err) {
    console.warn(`  ⚠️ Bing ping failed:`, err.message);
  }

  console.log('\n🎉 Bing & IndexNow submission completed successfully!\n');
}

submit();
