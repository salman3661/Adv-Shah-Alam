import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();

function readJsonSafe(relPath, fallback = null) {
  try {
    const p = path.join(ROOT, relPath);
    if (!fs.existsSync(p)) return fallback;
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch {
    return fallback;
  }
}

function readCsvLinesSafe(relPath) {
  try {
    const p = path.join(ROOT, relPath);
    if (!fs.existsSync(p)) return [];
    return fs.readFileSync(p, 'utf8').trim().split(/\r?\n/).slice(1);
  } catch {
    return [];
  }
}

const gscPages = readCsvLinesSafe('baseline/gsc-pages.csv');
const adsRows = readCsvLinesSafe('baseline/adsense-earnings-by-page.csv');
const gscQueries = readJsonSafe('scripts/gsc_live_queries.json', []);
const ga4 = readJsonSafe('src/content/ga4_summary.json', {});
const adsense = readJsonSafe('src/content/adsense_summary.json', {});

let baselineClicks = 0;
let baselineImp = 0;
for (const r of gscPages) {
  const cols = r.split(',');
  baselineClicks += Number(cols[1] || 0);
  baselineImp += Number(cols[2] || 0);
}

// Combined GSC opportunities
const queryRows = Array.isArray(gscQueries) ? gscQueries : [];
const strikingDistance = queryRows
  .filter((q) => q.position >= 8 && q.position <= 20 && q.impressions >= 100)
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 10)
  .map((q) => ({
    query: q.keys?.[0] || '',
    position: Number(q.position.toFixed(1)),
    impressions: q.impressions,
    clicks: q.clicks,
    ctrPct: Number((q.ctr * 100).toFixed(2)),
  }));

const lowCtrRefreshCandidates = queryRows
  .filter((q) => q.impressions >= 200 && q.ctr < 0.03)
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 10)
  .map((q) => ({
    query: q.keys?.[0] || '',
    position: Number(q.position.toFixed(1)),
    impressions: q.impressions,
    clicks: q.clicks,
    ctrPct: Number((q.ctr * 100).toFixed(2)),
  }));

// Combined GA4 traffic & language split
const ga4Channels = (ga4.channels || []).slice(0, 8);
const ga4TotalSessions = (ga4.channels || []).reduce((sum, c) => sum + (Number(c.sessions) || 0), 0);
const ga4OrganicSessions = (ga4.channels || [])
  .filter((c) => c.channel === 'Organic Search')
  .reduce((sum, c) => sum + (Number(c.sessions) || 0), 0);

// Combined AdSense live KPIs & geo breakdown
const ads30 = adsense?.last30Days?.totals || {};
const adsMtd = adsense?.monthToDate?.totals || {};
const countries = adsense?.countries || [];
const bd = countries.find((c) => c.COUNTRY_CODE === 'BD') || {};
const tier1Codes = new Set(['US', 'GB', 'AU', 'CA', 'DE', 'CH', 'IE', 'NZ', 'SE', 'NO']);
const tier1Agg = countries
  .filter((c) => tier1Codes.has(c.COUNTRY_CODE))
  .reduce(
    (acc, c) => ({
      earnings: acc.earnings + (Number(c.ESTIMATED_EARNINGS) || 0),
      views: acc.views + (Number(c.PAGE_VIEWS) || 0),
    }),
    { earnings: 0, views: 0 }
  );
const previewLeakageDomains = (adsense?.domains || [])
  .filter((d) => d.DOMAIN_NAME !== 'www.advmdshahalam.me' && d.DOMAIN_NAME !== 'advmdshahalam.me')
  .length;

// Modeled baseline EN vs BN page split
let enViews = 0;
let enEarnings = 0;
let bnViews = 0;
let bnEarnings = 0;
for (const r of adsRows) {
  const cols = r.split(',');
  const lang = cols[2];
  const views = Number(cols[3] || 0);
  const rev = Number(cols[7] || 0);
  if (lang === 'en') {
    enViews += views;
    enEarnings += rev;
  } else if (lang === 'bn') {
    bnViews += views;
    bnEarnings += rev;
  }
}

const scorecard = {
  generatedAt: new Date().toISOString(),
  adsenseLive: {
    updatedAt: adsense.updatedAt || null,
    account: adsense.account || null,
    last30Days: {
      earningsUsd: ads30.ESTIMATED_EARNINGS ?? null,
      pageViews: ads30.PAGE_VIEWS ?? null,
      pageRpmUsd: ads30.PAGE_VIEWS_RPM ?? null,
      impressions: ads30.IMPRESSIONS ?? null,
      clicks: ads30.CLICKS ?? null,
      ctrPct: ads30.IMPRESSIONS_CTR != null ? Number((ads30.IMPRESSIONS_CTR * 100).toFixed(2)) : null,
    },
    monthToDate: {
      earningsUsd: adsMtd.ESTIMATED_EARNINGS ?? null,
      pageViews: adsMtd.PAGE_VIEWS ?? null,
      pageRpmUsd: adsMtd.PAGE_VIEWS_RPM ?? null,
    },
    geoSplit30d: {
      bangladesh: {
        earningsUsd: bd.ESTIMATED_EARNINGS ?? null,
        pageViews: bd.PAGE_VIEWS ?? null,
        rpmUsd: bd.PAGE_VIEWS_RPM ?? null,
      },
      tier1Western: {
        earningsUsd: Number(tier1Agg.earnings.toFixed(2)),
        pageViews: tier1Agg.views,
        blendedRpmUsd: tier1Agg.views > 0 ? Number(((tier1Agg.earnings / tier1Agg.views) * 1000).toFixed(2)) : null,
      },
    },
    adUnits: adsense.adUnits || [],
    previewDomainLeakageCount: previewLeakageDomains,
  },
  ga4Live: {
    updatedAt: ga4.updatedAt || null,
    propertyId: ga4.propertyId || null,
    sessions7d: ga4TotalSessions,
    organicSessions7d: ga4OrganicSessions,
    channelsTop8: ga4Channels,
    topPagesCount: (ga4.topPages || []).length,
  },
  gscCombined: {
    baselinePagesTracked: gscPages.length,
    baselineClicks7d: baselineClicks,
    baselineImpressions7d: baselineImp,
    baselineCtrPct: baselineImp > 0 ? Number(((baselineClicks / baselineImp) * 100).toFixed(2)) : 0,
    liveQueriesTracked: queryRows.length,
    strikingDistanceTop10: strikingDistance,
    lowCtrRefreshTop10: lowCtrRefreshCandidates,
  },
  languageModeledBaseline: {
    en: {
      pageViews: enViews,
      estEarningsUsd: Number(enEarnings.toFixed(4)),
      modeledRpmUsd: enViews > 0 ? Number(((enEarnings / enViews) * 1000).toFixed(2)) : 0,
    },
    bn: {
      pageViews: bnViews,
      estEarningsUsd: Number(bnEarnings.toFixed(4)),
      modeledRpmUsd: bnViews > 0 ? Number(((bnEarnings / bnViews) * 1000).toFixed(2)) : 0,
    },
  },
  monthlyTarget100to200Path: {
    optionA_AdSenseOnlyTier1En: '12,000-22,000 EN/NRB monthly views at $8-$10 RPM = $96-$220/mo',
    optionB_BlendedRpmGrowth: '50,000 monthly views at $2.50-$3.50 blended RPM = $125-$175/mo',
    optionC_HybridFastest: 'Increase EN/NRB AdSense ($50-$100/mo) + 2-4 NRB Paid Case Reviews ($30-$75 each = $60-$300/mo) = $110-$400+/mo',
  },
};

console.log('=== COMBINED WEEKLY SEO, TRAFFIC & MONETIZATION SCORECARD (GSC + GA4 + AdSense) ===');
console.log(JSON.stringify(scorecard, null, 2));
