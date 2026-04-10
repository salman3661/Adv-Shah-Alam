import { createHmac } from 'crypto';

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000;
const CORS_HEADERS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function verifyToken(authHeader) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || !authHeader?.startsWith('Bearer ')) return false;
  try {
    const raw = Buffer.from(authHeader.slice(7), 'base64url').toString('utf8');
    const [ts, sig] = raw.split('.');
    if (!ts || !sig) return false;
    const age = Date.now() - parseInt(ts, 10);
    if (isNaN(age) || age < 0 || age > TOKEN_TTL_MS) return false;
    const expected = createHmac('sha256', secret).update(ts).digest('hex');
    return sig === expected;
  } catch { return false; }
}

// ─── Google API helpers ──────────────────────────────────────────────────────

/**
 * Get a Google OAuth2 access token using a service account key.
 * The key must be stored as a base64-encoded JSON string in GOOGLE_SERVICE_ACCOUNT_KEY.
 */
async function getGoogleAccessToken(scopes) {
  const keyB64 = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!keyB64) throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY not set');

  let key;
  try {
    key = JSON.parse(Buffer.from(keyB64, 'base64').toString('utf8'));
  } catch {
    throw new Error('Failed to parse GOOGLE_SERVICE_ACCOUNT_KEY (must be base64-encoded JSON)');
  }

  const now = Math.floor(Date.now() / 1000);
  const header  = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    iss: key.client_email,
    scope: scopes.join(' '),
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  })).toString('base64url');

  const { createSign } = await import('crypto');
  const sign = createSign('RSA-SHA256');
  sign.update(`${header}.${payload}`);
  const sig = sign.sign(key.private_key, 'base64url');

  const jwt = `${header}.${payload}.${sig}`;

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!tokenRes.ok) {
    const err = await tokenRes.text();
    throw new Error(`Google token error: ${err.slice(0, 300)}`);
  }
  const { access_token } = await tokenRes.json();
  return access_token;
}

// ─── Search Console ──────────────────────────────────────────────────────────

async function getSearchConsoleData() {
  const siteUrl = process.env.GSC_SITE_URL;
  if (!siteUrl) throw new Error('GSC_SITE_URL not set');

  const token = await getGoogleAccessToken(['https://www.googleapis.com/auth/webmasters.readonly']);

  const endDate   = new Date().toISOString().split('T')[0];
  const startDate = new Date(Date.now() - 28 * 86400 * 1000).toISOString().split('T')[0];

  // Top blog post pages
  const pagesRes = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        startDate, endDate,
        dimensions: ['page'],
        dimensionFilterGroups: [{
          filters: [{ dimension: 'page', operator: 'contains', expression: '/blog/' }],
        }],
        rowLimit: 20,
        orderBy: [{ fieldName: 'clicks', sortOrder: 'DESCENDING' }],
      }),
    },
  );
  if (!pagesRes.ok) { const e = await pagesRes.text(); throw new Error(`GSC pages error: ${e.slice(0, 200)}`); }
  const pagesData = await pagesRes.json();

  // Top queries for blog posts
  const queriesRes = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        startDate, endDate,
        dimensions: ['query'],
        dimensionFilterGroups: [{
          filters: [{ dimension: 'page', operator: 'contains', expression: '/blog/' }],
        }],
        rowLimit: 20,
        orderBy: [{ fieldName: 'clicks', sortOrder: 'DESCENDING' }],
      }),
    },
  );
  if (!queriesRes.ok) { const e = await queriesRes.text(); throw new Error(`GSC queries error: ${e.slice(0, 200)}`); }
  const queriesData = await queriesRes.json();

  // Summary: totals
  const rows = pagesData.rows || [];
  const totalClicks      = rows.reduce((s, r) => s + (r.clicks || 0), 0);
  const totalImpressions = rows.reduce((s, r) => s + (r.impressions || 0), 0);
  const avgCTR           = totalImpressions > 0 ? totalClicks / totalImpressions : 0;
  const avgPosition      = rows.length > 0 ? rows.reduce((s, r) => s + (r.position || 0), 0) / rows.length : 0;

  return {
    period: `${startDate} → ${endDate}`,
    summary: { clicks: totalClicks, impressions: totalImpressions, ctr: avgCTR, avgPosition },
    topPages:   (pagesData.rows   || []).map((r) => ({ page: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position })),
    topQueries: (queriesData.rows || []).map((r) => ({ query: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position })),
  };
}

// ─── GA4 ─────────────────────────────────────────────────────────────────────

async function getGA4Data() {
  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!propertyId) throw new Error('GA4_PROPERTY_ID not set');

  const token = await getGoogleAccessToken([
    'https://www.googleapis.com/auth/analytics.readonly',
  ]);

  const endDate   = 'today';
  const startDate = '28daysAgo';

  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'pagePath' }],
        metrics: [
          { name: 'screenPageViews' },
          { name: 'sessions' },
          { name: 'newUsers' },
          { name: 'bounceRate' },
        ],
        dimensionFilter: {
          filter: {
            fieldName: 'pagePath',
            stringFilter: { matchType: 'CONTAINS', value: '/blog/' },
          },
        },
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 20,
      }),
    },
  );

  if (!res.ok) { const e = await res.text(); throw new Error(`GA4 error: ${e.slice(0, 200)}`); }
  const data = await res.json();

  const rows = (data.rows || []).map((row) => ({
    page:       row.dimensionValues?.[0]?.value,
    pageviews:  parseInt(row.metricValues?.[0]?.value || '0'),
    sessions:   parseInt(row.metricValues?.[1]?.value || '0'),
    newUsers:   parseInt(row.metricValues?.[2]?.value || '0'),
    bounceRate: parseFloat(row.metricValues?.[3]?.value || '0'),
  }));

  const totalViews = rows.reduce((s, r) => s + r.pageviews, 0);
  const totalSessions = rows.reduce((s, r) => s + r.sessions, 0);

  return {
    period: `${startDate} → ${endDate}`,
    summary: { pageviews: totalViews, sessions: totalSessions },
    topPages: rows,
  };
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).set(CORS_HEADERS).end();
  Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  if (!verifyToken(req.headers.authorization)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const source = req.query?.source;

  // Check which env vars are configured
  const config = {
    gscConfigured:  !!process.env.GOOGLE_SERVICE_ACCOUNT_KEY && !!process.env.GSC_SITE_URL,
    ga4Configured:  !!process.env.GOOGLE_SERVICE_ACCOUNT_KEY && !!process.env.GA4_PROPERTY_ID,
    missingEnvVars: [
      !process.env.GOOGLE_SERVICE_ACCOUNT_KEY && 'GOOGLE_SERVICE_ACCOUNT_KEY',
      !process.env.GSC_SITE_URL               && 'GSC_SITE_URL',
      !process.env.GA4_PROPERTY_ID            && 'GA4_PROPERTY_ID',
    ].filter(Boolean),
  };

  if (!source) {
    return res.status(200).json({ ok: true, config });
  }

  if (source === 'gsc') {
    if (!config.gscConfigured) {
      return res.status(200).json({ configured: false, missing: config.missingEnvVars });
    }
    try {
      const data = await getSearchConsoleData();
      return res.status(200).json({ configured: true, data });
    } catch (err) {
      console.error('[admin-analytics GSC]', err.message);
      return res.status(500).json({ error: err.message });
    }
  }

  if (source === 'ga4') {
    if (!config.ga4Configured) {
      return res.status(200).json({ configured: false, missing: config.missingEnvVars });
    }
    try {
      const data = await getGA4Data();
      return res.status(200).json({ configured: true, data });
    } catch (err) {
      console.error('[admin-analytics GA4]', err.message);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(400).json({ error: 'source must be "gsc" or "ga4"' });
}
