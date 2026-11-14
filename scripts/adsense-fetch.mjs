// scripts/adsense-fetch.mjs
// Automates fetching Google AdSense Management API v2 earnings, RPM, impressions, clicks & CTR
import fs from 'fs';
import path from 'path';

const OUTPUT_PATH = path.resolve('src/content/adsense_summary.json');

/** Lightweight .env / .env.local loader (no external dotenv dependency required). */
function loadEnvFiles() {
  for (const filename of ['.env', '.env.local']) {
    const envPath = path.resolve(filename);
    if (!fs.existsSync(envPath)) continue;
    try {
      const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx === -1) continue;
        const key = trimmed.slice(0, eqIdx).trim();
        let val = trimmed.slice(eqIdx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (key && !(key in process.env)) {
          process.env[key] = val;
        }
      }
    } catch (err) {
      console.warn(`[AdSense Env Warning] Could not read ${filename}:`, err.message);
    }
  }
}

async function getOAuthAccessToken(clientId, clientSecret, refreshToken) {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
    signal: AbortSignal.timeout(10000),
  });

  const data = await res.json();
  if (!res.ok || !data.access_token) {
    throw new Error(`OAuth token exchange failed (${res.status}): ${JSON.stringify(data)}`);
  }
  return data.access_token;
}

async function generateReport(token, accountName, { dateRange = 'LAST_30_DAYS', dimensions = [], metrics = [], orderBy = [] } = {}) {
  const params = new URLSearchParams();
  params.set('dateRange', dateRange);
  for (const d of dimensions) params.append('dimensions', d);
  for (const m of metrics) params.append('metrics', m);
  for (const o of orderBy) params.append('orderBy', o);

  const url = `https://adsense.googleapis.com/v2/${accountName}/reports:generate?${params.toString()}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
    signal: AbortSignal.timeout(15000),
  });

  const data = await res.json();
  if (!res.ok || data.error) {
    throw new Error(`AdSense API error (${res.status}): ${JSON.stringify(data.error || data)}`);
  }
  return data;
}

function parseReportRows(report) {
  const headers = (report.headers || []).map(h => h.name);
  const currency = (report.headers || []).find(h => h.currencyCode)?.currencyCode || 'USD';

  const mapRow = (cells = []) => {
    const obj = {};
    headers.forEach((name, idx) => {
      const raw = cells[idx]?.value ?? null;
      if (name === 'DATE' || name === 'MONTH' || name.includes('COUNTRY') || name.includes('DOMAIN') || name.includes('AD_UNIT')) {
        obj[name] = raw;
      } else if (raw !== null && raw !== '') {
        const num = Number(raw);
        obj[name] = Number.isNaN(num) ? raw : num;
      } else {
        obj[name] = 0;
      }
    });
    return obj;
  };

  return {
    currency,
    startDate: report.startDate || null,
    endDate: report.endDate || null,
    totals: report.totals ? mapRow(report.totals.cells) : null,
    averages: report.averages ? mapRow(report.averages.cells) : null,
    rows: (report.rows || []).map(r => mapRow(r.cells)),
  };
}

export async function fetchAdSenseAnalytics() {
  loadEnvFiles();

  const rawPubId = (process.env.ADSENSE_PUB_ID || '').trim();
  const clientId = (process.env.ADSENSE_CLIENT_ID || '').trim();
  const clientSecret = (process.env.ADSENSE_CLIENT_SECRET || '').trim();
  const refreshToken = (process.env.ADSENSE_REFRESH_TOKEN || '').trim();

  if (!rawPubId || !clientId || !clientSecret || !refreshToken) {
    console.warn('[AdSense] OAuth credentials or ADSENSE_PUB_ID not configured — skipping live fetch.');
    return null;
  }

  const accountName = rawPubId.startsWith('accounts/') ? rawPubId : `accounts/${rawPubId}`;
  const coreMetrics = [
    'ESTIMATED_EARNINGS',
    'PAGE_VIEWS',
    'PAGE_VIEWS_RPM',
    'IMPRESSIONS',
    'CLICKS',
    'IMPRESSIONS_CTR',
  ];

  console.log(`[AdSense] Refreshing OAuth 2.0 access token for ${accountName}...`);
  const token = await getOAuthAccessToken(clientId, clientSecret, refreshToken);
  console.log('[AdSense API] Authenticated successfully. Fetching reports...');

  // 1. Daily breakdown (Last 30 days)
  const dailyRaw = await generateReport(token, accountName, {
    dateRange: 'LAST_30_DAYS',
    dimensions: ['DATE'],
    metrics: coreMetrics,
    orderBy: ['+DATE'],
  });
  const daily = parseReportRows(dailyRaw);

  // 2. Month-to-date summary
  const mtdRaw = await generateReport(token, accountName, {
    dateRange: 'MONTH_TO_DATE',
    metrics: coreMetrics,
  });
  const mtd = parseReportRows(mtdRaw);

  // 3. Monthly breakdown (Year to date)
  const monthlyRaw = await generateReport(token, accountName, {
    dateRange: 'YEAR_TO_DATE',
    dimensions: ['MONTH'],
    metrics: coreMetrics,
    orderBy: ['+MONTH'],
  });
  const monthly = parseReportRows(monthlyRaw);

  // 4. Country breakdown (Last 30 days — tracks EN/NRB vs BD RPM)
  let countries = { rows: [] };
  try {
    const countryRaw = await generateReport(token, accountName, {
      dateRange: 'LAST_30_DAYS',
      dimensions: ['COUNTRY_CODE', 'COUNTRY_NAME'],
      metrics: coreMetrics,
      orderBy: ['-ESTIMATED_EARNINGS'],
    });
    countries = parseReportRows(countryRaw);
  } catch (err) {
    console.warn('[AdSense Country Report Note]:', err.message);
  }

  // 5. Ad unit breakdown (Last 30 days)
  let adUnits = { rows: [] };
  try {
    const unitRaw = await generateReport(token, accountName, {
      dateRange: 'LAST_30_DAYS',
      dimensions: ['AD_UNIT_ID', 'AD_UNIT_NAME'],
      metrics: coreMetrics,
      orderBy: ['-ESTIMATED_EARNINGS'],
    });
    adUnits = parseReportRows(unitRaw);
  } catch (err) {
    console.warn('[AdSense AdUnit Report Note]:', err.message);
  }

  // 6. Domain breakdown (Last 30 days)
  let domains = { rows: [] };
  try {
    const domainRaw = await generateReport(token, accountName, {
      dateRange: 'LAST_30_DAYS',
      dimensions: ['DOMAIN_NAME'],
      metrics: coreMetrics,
      orderBy: ['-ESTIMATED_EARNINGS'],
    });
    domains = parseReportRows(domainRaw);
  } catch (err) {
    console.warn('[AdSense Domain Report Note]:', err.message);
  }

  const summary = {
    updatedAt: new Date().toISOString(),
    account: accountName,
    currency: daily.currency || mtd.currency || 'USD',
    last30Days: {
      startDate: daily.startDate,
      endDate: daily.endDate,
      totals: daily.totals,
      averages: daily.averages,
    },
    monthToDate: {
      startDate: mtd.startDate,
      endDate: mtd.endDate,
      totals: mtd.totals,
    },
    daily: daily.rows,
    monthly: monthly.rows,
    countries: countries.rows.slice(0, 30),
    adUnits: adUnits.rows.slice(0, 30),
    domains: domains.rows.slice(0, 20),
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(summary, null, 2), 'utf8');
  console.log(`✅ [AdSense Sync Success] Saved monetization summary to ${OUTPUT_PATH}`);
  return summary;
}

if (process.argv[1] && process.argv[1].endsWith('adsense-fetch.mjs')) {
  fetchAdSenseAnalytics().catch(err => {
    console.warn('⚠️ [AdSense Note]:', err.message);
  });
}
