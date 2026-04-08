/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  src/utils/indexNow.js                                       ║
 * ║  IndexNow integration for instant Bing/Yandex crawl signal   ║
 * ║                                                              ║
 * ║  Key file lives at:                                          ║
 * ║  /public/b88cb6f2bcc144ba92303e49cd3b7970.txt               ║
 * ║                                                              ║
 * ║  USAGE (single URL):                                         ║
 * ║    import { submitToIndexNow } from '../utils/indexNow';     ║
 * ║    submitToIndexNow(window.location.href);                   ║
 * ║                                                              ║
 * ║  USAGE (bulk — e.g. after sitemap regeneration):            ║
 * ║    import { submitMultipleUrls } from '../utils/indexNow';   ║
 * ║    submitMultipleUrls([                                       ║
 * ║      'https://advmdshahalam.me/',                            ║
 * ║      'https://advmdshahalam.me/blog',                        ║
 * ║    ]);                                                        ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 *  ⚠️  DO NOT call these functions on every render.
 *      Safe call sites:
 *        - After publishing a new blog post
 *        - After a content update deploy
 *        - Once per session via sessionStorage guard (see submitOncePerSession)
 */

const INDEXNOW_KEY = 'b88cb6f2bcc144ba92303e49cd3b7970';
const INDEXNOW_HOST = 'advmdshahalam.me';
const INDEXNOW_API  = 'https://api.indexnow.org/indexnow';

// ─── Single URL submission ────────────────────────────────────────────────────
/**
 * Submits a single URL to IndexNow (GET variant).
 * @param {string} url - The full URL to submit, e.g. window.location.href
 */
export const submitToIndexNow = async (url) => {
  const endpoint = `${INDEXNOW_API}?url=${encodeURIComponent(url)}&key=${INDEXNOW_KEY}`;
  try {
    const res = await fetch(endpoint);
    if (res.ok || res.status === 202) {
      console.log('[IndexNow] Submitted:', url);
    } else {
      console.warn('[IndexNow] Unexpected status', res.status, 'for', url);
    }
  } catch (error) {
    // Network errors are non-fatal — never break the page
    console.error('[IndexNow] Submission failed:', error);
  }
};

// ─── Bulk URL submission ──────────────────────────────────────────────────────
/**
 * Submits multiple URLs to IndexNow in a single POST request (more efficient).
 * Recommended for sitemap-level submissions after a content deploy.
 * @param {string[]} urls - Array of full URLs to submit
 */
export const submitMultipleUrls = async (urls) => {
  if (!Array.isArray(urls) || urls.length === 0) {
    console.warn('[IndexNow] submitMultipleUrls: no URLs provided.');
    return;
  }
  try {
    const res = await fetch(INDEXNOW_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host:    INDEXNOW_HOST,
        key:     INDEXNOW_KEY,
        keyLocation: `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
    });
    if (res.ok || res.status === 202) {
      console.log(`[IndexNow] Bulk submitted ${urls.length} URL(s).`);
    } else {
      console.warn('[IndexNow] Bulk submission status:', res.status);
    }
  } catch (error) {
    console.error('[IndexNow] Bulk submission failed:', error);
  }
};

// ─── Session-guarded single submission ───────────────────────────────────────
/**
 * Submits the current page URL once per browser session.
 * Safe to call inside a React component (no double-fire on re-renders).
 *
 * Usage inside a page component (NOT inside a render loop):
 *   useEffect(() => { submitOncePerSession(window.location.href); }, []);
 *
 * @param {string} url - The full URL to submit
 */
export const submitOncePerSession = (url) => {
  const storageKey = `indexnow_sent_${url}`;
  if (typeof sessionStorage === 'undefined') return;       // SSR guard
  if (sessionStorage.getItem(storageKey)) return;          // already sent this session
  sessionStorage.setItem(storageKey, '1');
  submitToIndexNow(url);
};

// ─── Full-site bulk list (edit to match your live sitemap) ───────────────────
/**
 * Convenience list of all canonical page URLs.
 * Call submitMultipleUrls(ALL_SITE_URLS) after a deploy to ping the whole site.
 */
export const ALL_SITE_URLS = [
  `https://${INDEXNOW_HOST}/`,
  `https://${INDEXNOW_HOST}/blog`,
  `https://${INDEXNOW_HOST}/advocate-md-shah-alam`,
  `https://${INDEXNOW_HOST}/education`,
  `https://${INDEXNOW_HOST}/services/criminal-lawyer`,
  `https://${INDEXNOW_HOST}/services/divorce-lawyer`,
  `https://${INDEXNOW_HOST}/services/land-lawyer`,
  `https://${INDEXNOW_HOST}/services/bail-lawyer`,
  `https://${INDEXNOW_HOST}/services/supreme-court-lawyer`,
  `https://${INDEXNOW_HOST}/services/tax-lawyer`,
  `https://${INDEXNOW_HOST}/services/company-corporate-lawyer`,
];
