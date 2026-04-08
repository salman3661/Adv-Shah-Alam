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
const HOST = 'advmdshahalam.me';
const API  = 'https://api.indexnow.org/indexnow';

// ── All canonical URLs to submit after a deploy ──────────────────────────────
const ALL_SITE_URLS = [
  `https://${HOST}/`,
  `https://${HOST}/blog`,
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

// ── Resolve URL list from CLI args or fall back to full site list ─────────────
const args = process.argv.slice(2);  // e.g. ["--", "/blog"] or ["/blog"]
const paths = args.filter(a => a.startsWith('/'));

const urlsToSubmit = paths.length > 0
  ? paths.map(p => `https://${HOST}${p}`)
  : ALL_SITE_URLS;

// ── Submit via POST (single API call, up to 10,000 URLs supported) ────────────
async function submit() {
  console.log(`\n[IndexNow] Submitting ${urlsToSubmit.length} URL(s) to Bing...\n`);
  urlsToSubmit.forEach(u => console.log('  •', u));
  console.log();

  const body = {
    host:        HOST,
    key:         KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList:     urlsToSubmit,
  };

  try {
    const res = await fetch(API, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body:    JSON.stringify(body),
    });

    // IndexNow returns 200 or 202 on success
    if (res.status === 200 || res.status === 202) {
      console.log(`[IndexNow] ✅  Success — HTTP ${res.status}`);
      console.log('[IndexNow] Bing will crawl submitted URLs shortly.\n');
    } else if (res.status === 400) {
      console.error('[IndexNow] ❌  400 Bad Request — check URL format or key.\n');
    } else if (res.status === 403) {
      console.error('[IndexNow] ❌  403 Forbidden — key file not accessible at:');
      console.error(`            https://${HOST}/${KEY}.txt\n`);
    } else if (res.status === 422) {
      console.error('[IndexNow] ❌  422 Unprocessable — one or more URLs are invalid.\n');
    } else if (res.status === 429) {
      console.error('[IndexNow] ⚠️  429 Too Many Requests — wait 24 hours and retry.\n');
    } else {
      const text = await res.text().catch(() => '');
      console.warn(`[IndexNow] ⚠️  Unexpected HTTP ${res.status}`, text, '\n');
    }
  } catch (err) {
    console.error('[IndexNow] ❌  Network error:', err.message, '\n');
    process.exitCode = 1;
  }
}

submit();
