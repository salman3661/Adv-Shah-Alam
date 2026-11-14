import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const gscPages = fs.readFileSync(path.join(ROOT, 'baseline', 'gsc-pages.csv'), 'utf8').trim().split(/\r?\n/).slice(1);
const adsRows = fs.readFileSync(path.join(ROOT, 'baseline', 'adsense-earnings-by-page.csv'), 'utf8').trim().split(/\r?\n/).slice(1);

let totalClicks = 0;
let totalImp = 0;
for (const r of gscPages) {
  const cols = r.split(',');
  totalClicks += Number(cols[1] || 0);
  totalImp += Number(cols[2] || 0);
}

const scorecard = {
  generatedAt: new Date().toISOString(),
  baselineGscPages: gscPages.length,
  baselineClicks7d: totalClicks,
  baselineImpressions7d: totalImp,
  baselineCtr: totalImp > 0 ? Number(((totalClicks / totalImp) * 100).toFixed(2)) : 0,
  adsenseTrackedPages: adsRows.length,
  kpisToTrackWeekly: [
    'GSC organic clicks & CTR on top 100 queries (title-test-plan.csv)',
    'GA4 conversion events: whatsapp_click, call_click, form_submit, consult_cta_click',
    'NRB Paid Case Review bookings (/nrb-legal-help -> /contact?service=case-review)',
    'AdSense RPM & CLS (<0.05) across /blog/*, /bn/blog/*, and /services/*',
    'Index coverage: 0 soft-404s, 0 hreflang errors, 0 schema errors',
  ],
};

console.log('=== WEEKLY SEO & MONETIZATION SCORECARD ===');
console.log(JSON.stringify(scorecard, null, 2));
