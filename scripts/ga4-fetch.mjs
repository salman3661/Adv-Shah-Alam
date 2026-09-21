// scripts/ga4-fetch.mjs
// Automates fetching Google Analytics 4 (GA4) traffic, sources, and page analytics
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const PROPERTY_ID = '520583213'; // Property ID for Md. Shah Alam
const KEY_PATH = path.resolve('gsc-service-account.json');
const OUTPUT_PATH = path.resolve('src/content/ga4_summary.json');

function base64url(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

async function getAccessToken(credentials) {
  const header = { alg: 'RS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const claimSet = {
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
    aud: credentials.token_uri,
    exp: now + 3600,
    iat: now
  };

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedClaimSet = base64url(JSON.stringify(claimSet));
  const signatureInput = `${encodedHeader}.${encodedClaimSet}`;

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signatureInput);
  const signature = signer.sign(credentials.private_key, 'base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const jwt = `${signatureInput}.${signature}`;

  const res = await fetch(credentials.token_uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt
    })
  });

  const data = await res.json();
  if (!data.access_token) {
    throw new Error('Failed to obtain GA4 access token: ' + JSON.stringify(data));
  }
  return data.access_token;
}

async function runReport(token, requestBody) {
  const url = `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runReport`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  const data = await res.json();
  if (data.error) {
    throw new Error(data.error.message || JSON.stringify(data.error));
  }
  return data;
}

export async function fetchGA4Analytics() {
  if (!fs.existsSync(KEY_PATH)) {
    console.warn('[GA4] Service account key not found at', KEY_PATH);
    return null;
  }

  const credentials = JSON.parse(fs.readFileSync(KEY_PATH, 'utf8'));
  console.log('[GA4] Authenticating with Google Analytics Data API...');
  const token = await getAccessToken(credentials);
  console.log('[GA4] Access token obtained. Fetching reports for Property:', PROPERTY_ID);

  // 1. Overall Traffic & Channel Overview (Last 7 Days)
  const channelsReport = await runReport(token, {
    dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
    dimensions: [{ name: 'sessionDefaultChannelGroup' }, { name: 'sessionSourceMedium' }],
    metrics: [
      { name: 'activeUsers' },
      { name: 'sessions' },
      { name: 'screenPageViews' },
      { name: 'engagementRate' }
    ],
    orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
    limit: 25
  });

  // 2. Top Performing Pages (Last 7 Days)
  const pagesReport = await runReport(token, {
    dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
    dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
    metrics: [
      { name: 'activeUsers' },
      { name: 'screenPageViews' },
      { name: 'userEngagementDuration' }
    ],
    orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    limit: 50
  });

  // 3. Geographic Overview (Last 7 Days)
  const geoReport = await runReport(token, {
    dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
    dimensions: [{ name: 'country' }, { name: 'city' }],
    metrics: [{ name: 'activeUsers' }, { name: 'screenPageViews' }],
    orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
    limit: 30
  });

  // Parse Channels
  const channels = (channelsReport.rows || []).map(r => ({
    channel: r.dimensionValues[0].value,
    sourceMedium: r.dimensionValues[1].value,
    activeUsers: parseInt(r.metricValues[0].value, 10),
    sessions: parseInt(r.metricValues[1].value, 10),
    pageViews: parseInt(r.metricValues[2].value, 10),
    engagementRate: (parseFloat(r.metricValues[3].value) * 100).toFixed(1) + '%'
  }));

  // Parse Pages
  const topPages = (pagesReport.rows || []).map(r => ({
    path: r.dimensionValues[0].value,
    title: r.dimensionValues[1].value,
    activeUsers: parseInt(r.metricValues[0].value, 10),
    pageViews: parseInt(r.metricValues[1].value, 10)
  }));

  // Parse Geo
  const locations = (geoReport.rows || []).map(r => ({
    country: r.dimensionValues[0].value,
    city: r.dimensionValues[1].value,
    activeUsers: parseInt(r.metricValues[0].value, 10)
  }));

  const summary = {
    updatedAt: new Date().toISOString(),
    propertyId: PROPERTY_ID,
    channels,
    topPages,
    locations
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(summary, null, 2), 'utf8');
  console.log(`✅ [GA4 Sync Success] Saved traffic summary to ${OUTPUT_PATH}`);
  return summary;
}

// Auto-run if executed directly
if (process.argv[1] && process.argv[1].endsWith('ga4-fetch.mjs')) {
  fetchGA4Analytics()
    .then(() => process.exit(0))
    .catch(err => {
      console.error('❌ [GA4 Error]:', err.message);
      process.exit(1);
    });
}
