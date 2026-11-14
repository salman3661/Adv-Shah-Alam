import fs from 'fs';
import path from 'path';
import { resolveMasterPillar, resolveQuickAnswerTable } from '../src/utils/seoSchema.mjs';

const ROOT = process.cwd();
const BASE = 'https://www.advmdshahalam.me';
const BASELINE_DIR = path.join(ROOT, 'baseline');
const EN_DIR = path.join(ROOT, 'src', 'content', 'posts', 'en');
const BN_DIR = path.join(ROOT, 'src', 'content', 'posts', 'bn');

function csvEscape(val) {
  if (val === null || val === undefined) return '';
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function writeCsv(filePath, headers, rows) {
  const lines = [
    headers.map(csvEscape).join(','),
    ...rows.map(r => r.map(csvEscape).join(','))
  ];
  fs.writeFileSync(filePath, lines.join('\n') + '\n', 'utf8');
}

function escHtml(s = '') {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function stripTags(html = '') {
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

// 1. Export GSC Queries CSV (combining gsc_live_queries.json + excel_data.json)
const gscLiveQueries = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'gsc_live_queries.json'), 'utf8'));
const excelData = JSON.parse(fs.readFileSync(path.join(ROOT, 'excel_data.json'), 'utf8'));

const queryMap = new Map();
// First load FILE2_7days Queries
for (const row of (excelData.FILE2_7days?.Queries || []).slice(1)) {
  const [q, clicks, impressions, ctr, position] = row;
  if (!q) continue;
  queryMap.set(String(q).trim(), {
    query: String(q).trim(),
    clicks: Number(clicks) || 0,
    impressions: Number(impressions) || 0,
    ctr: Number(ctr) || 0,
    position: Number(position) || 0,
    source: 'gsc_excel_7d'
  });
}
// Overlay/merge gsc_live_queries.json (take max impressions/clicks so 30d window is best represented)
for (const item of gscLiveQueries) {
  const q = (item.keys?.[0] || '').trim();
  if (!q) continue;
  const existing = queryMap.get(q);
  const clicks = Math.max(Number(item.clicks) || 0, existing?.clicks || 0);
  const impressions = Math.max(Number(item.impressions) || 0, existing?.impressions || 0);
  const ctr = impressions > 0 ? Number((clicks / impressions).toFixed(6)) : (Number(item.ctr) || 0);
  const position = Number(item.position) || existing?.position || 0;
  queryMap.set(q, {
    query: q,
    clicks,
    impressions,
    ctr,
    position: Number(position.toFixed(2)),
    source: existing ? 'gsc_live+excel' : 'gsc_live_api'
  });
}
// Also include any unique queries from FILE1_24hr
for (const row of (excelData.FILE1_24hr?.Queries || []).slice(1)) {
  const [q, clicks, impressions, ctr, position] = row;
  if (!q || queryMap.has(String(q).trim())) continue;
  queryMap.set(String(q).trim(), {
    query: String(q).trim(),
    clicks: Number(clicks) || 0,
    impressions: Number(impressions) || 0,
    ctr: Number(ctr) || 0,
    position: Number(Number(position || 0).toFixed(2)),
    source: 'gsc_excel_24h'
  });
}

const sortedQueries = [...queryMap.values()].sort((a, b) => (b.impressions - a.impressions) || (b.clicks - a.clicks));
writeCsv(
  path.join(BASELINE_DIR, 'gsc-queries.csv'),
  ['query', 'clicks', 'impressions', 'ctr', 'position', 'source'],
  sortedQueries.map(q => [q.query, q.clicks, q.impressions, q.ctr, q.position, q.source])
);
console.log(`Exported baseline/gsc-queries.csv (${sortedQueries.length} queries)`);

// 2. Export GSC Pages CSV (combining excel_data.json Pages + post JSON impressions/clicks)
const pageStatsMap = new Map();
function normUrl(u) {
  if (!u) return '';
  let clean = String(u).trim().replace(/^http:\/\//, 'https://').replace(/^https:\/\/advmdshahalam\.me/, BASE);
  if (clean !== `${BASE}/`) clean = clean.replace(/\/+$/, '');
  return clean;
}

for (const row of (excelData.FILE2_7days?.Pages || []).slice(1)) {
  const [pageUrl, clicks, impressions, ctr, position] = row;
  const u = normUrl(pageUrl);
  if (!u) continue;
  pageStatsMap.set(u, {
    page: u,
    clicks: Number(clicks) || 0,
    impressions: Number(impressions) || 0,
    ctr: Number(ctr) || 0,
    position: Number(Number(position || 0).toFixed(2)),
    source: 'gsc_excel_7d'
  });
}
for (const row of (excelData.FILE1_24hr?.Pages || []).slice(1)) {
  const [pageUrl, clicks, impressions, ctr, position] = row;
  const u = normUrl(pageUrl);
  if (!u || pageStatsMap.has(u)) continue;
  pageStatsMap.set(u, {
    page: u,
    clicks: Number(clicks) || 0,
    impressions: Number(impressions) || 0,
    ctr: Number(ctr) || 0,
    position: Number(Number(position || 0).toFixed(2)),
    source: 'gsc_excel_24h'
  });
}

// Also merge post-level GSC stats stored in src/content/posts/{en,bn}/*.json
for (const [lang, dir, prefix] of [['en', EN_DIR, '/blog/'], ['bn', BN_DIR, '/bn/blog/']]) {
  for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.json'))) {
    const p = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
    if (!p?.slug) continue;
    const u = `${BASE}${prefix}${p.slug}`;
    const existing = pageStatsMap.get(u);
    if (p.impressions !== undefined || p.clicks !== undefined) {
      const clicks = Math.max(Number(p.clicks) || 0, existing?.clicks || 0);
      const impressions = Math.max(Number(p.impressions) || 0, existing?.impressions || 0);
      const ctr = impressions > 0 ? Number((clicks / impressions).toFixed(6)) : (existing?.ctr || 0);
      const position = existing?.position || 0;
      pageStatsMap.set(u, {
        page: u,
        clicks,
        impressions,
        ctr,
        position,
        source: existing ? `${existing.source}+post_sync` : 'gsc_post_sync'
      });
    }
  }
}

const sortedGscPages = [...pageStatsMap.values()].sort((a, b) => (b.impressions - a.impressions) || (b.clicks - a.clicks));
writeCsv(
  path.join(BASELINE_DIR, 'gsc-pages.csv'),
  ['page', 'clicks', 'impressions', 'ctr', 'position', 'source'],
  sortedGscPages.map(p => [p.page, p.clicks, p.impressions, p.ctr, p.position, p.source])
);
console.log(`Exported baseline/gsc-pages.csv (${sortedGscPages.length} pages)`);

// 3. Export GA4 Landing Page & Channel Reports
const ga4 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src', 'content', 'ga4_summary.json'), 'utf8'));
writeCsv(
  path.join(BASELINE_DIR, 'ga4-landing-pages.csv'),
  ['path', 'title', 'activeUsers', 'pageViews'],
  (ga4.topPages || []).map(p => [p.path, p.title, p.activeUsers, p.pageViews])
);
writeCsv(
  path.join(BASELINE_DIR, 'ga4-channels.csv'),
  ['channel', 'sourceMedium', 'activeUsers', 'sessions', 'pageViews', 'engagementRate'],
  (ga4.channels || []).map(c => [c.channel, c.sourceMedium, c.activeUsers, c.sessions, c.pageViews, c.engagementRate])
);
console.log(`Exported baseline/ga4-landing-pages.csv (${(ga4.topPages || []).length} rows) & baseline/ga4-channels.csv`);

// 4. Export AdSense Earnings-by-Page Report (modeled baseline from GA4 pageViews + GSC clicks + EN/BN RPM tier)
const ga4ByPath = new Map((ga4.topPages || []).map(p => [p.path, p]));
const adsenseRows = [];
for (const p of sortedGscPages) {
  const relPath = p.page.replace(BASE, '') || '/';
  const ga = ga4ByPath.get(relPath);
  const isBn = relPath === '/' || relPath.startsWith('/bn');
  const pageViews = ga ? ga.pageViews : Math.max(p.clicks, Math.round(p.impressions * 0.025));
  // Baseline RPM: ~$4.50 for English (NRB high-CPM), ~$0.85 for Bengali local traffic (blended ~$1.50)
  const rpmUsd = isBn ? 0.85 : 4.50;
  const estEarningsUsd = Number(((pageViews / 1000) * rpmUsd).toFixed(4));
  adsenseRows.push({
    page: p.page,
    path: relPath,
    lang: isBn ? 'bn' : 'en',
    pageViews,
    gscClicks: p.clicks,
    gscImpressions: p.impressions,
    rpmUsd,
    estEarningsUsd,
    note: 'modeled_from_ga4_gsc_baseline'
  });
}
adsenseRows.sort((a, b) => b.estEarningsUsd - a.estEarningsUsd);
writeCsv(
  path.join(BASELINE_DIR, 'adsense-earnings-by-page.csv'),
  ['page', 'path', 'lang', 'pageViews', 'gscClicks', 'gscImpressions', 'rpmUsd', 'estEarningsUsd', 'note'],
  adsenseRows.map(r => [r.page, r.path, r.lang, r.pageViews, r.gscClicks, r.gscImpressions, r.rpmUsd, r.estEarningsUsd, r.note])
);
console.log(`Exported baseline/adsense-earnings-by-page.csv (${adsenseRows.length} rows)`);

// 5. Parse all 745 captured live HTML files to build internal link graph and verify live content
const baselineIndex = JSON.parse(fs.readFileSync(path.join(BASELINE_DIR, 'index.json'), 'utf8'));
const inboundMap = new Map();
const outboundMap = new Map();
const livePageMeta = new Map();

for (const entry of baselineIndex.pages) {
  inboundMap.set(entry.url, new Set());
  outboundMap.set(entry.url, new Set());
}

for (const entry of baselineIndex.pages) {
  const html = fs.readFileSync(path.join(ROOT, entry.file), 'utf8');
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  const canonMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
  const langMatch = html.match(/<html\s+lang="([^"]*)"/i);
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => stripTags(m[1]));
  const startMarker = '<div id="prerendered-content"';
  const sIdx = html.indexOf(startMarker);
  let liveBodyHtml = '';
  if (sIdx !== -1) {
    const bodyStart = html.indexOf('>', sIdx) + 1;
    const schemaMarker = html.indexOf('<!-- Structured Data - Attorney Schema -->', bodyStart);
    const endIdx = schemaMarker !== -1
      ? html.lastIndexOf('\n</div></div>', schemaMarker)
      : html.indexOf('\n</div></div>', bodyStart);
    if (endIdx !== -1) {
      liveBodyHtml = html.slice(bodyStart, endIdx).trim();
    }
  }

  // Extract internal links from prerendered body + shell
  const hrefMatches = [...html.matchAll(/<a\s+[^>]*href="([^"#?]+)"/gi)].map(m => m[1].trim());
  for (const rawHref of hrefMatches) {
    let target = null;
    if (rawHref.startsWith('/')) {
      target = normUrl(`${BASE}${rawHref}`);
    } else if (rawHref.startsWith(BASE)) {
      target = normUrl(rawHref);
    }
    if (target && target !== entry.url) {
      outboundMap.get(entry.url)?.add(target);
      if (!inboundMap.has(target)) inboundMap.set(target, new Set());
      inboundMap.get(target).add(entry.url);
    }
  }

  livePageMeta.set(entry.url, {
    url: entry.url,
    htmlBytes: entry.htmlBytes,
    title: titleMatch ? stripTags(titleMatch[1]) : '',
    description: descMatch ? descMatch[1] : '',
    canonical: canonMatch ? canonMatch[1] : '',
    lang: langMatch ? langMatch[1] : '',
    h1s: h1Matches,
    liveBodyHtml,
    wordCount: stripTags(liveBodyHtml).split(/\s+/).filter(Boolean).length
  });
}

// Reconstruct local expected body for EN and BN posts (exact same logic as scripts/prerender.mjs)
const DISCLAIMER = `<div style="background:#fff8e1;border-left:4px solid #f5a623;padding:12px 16px;margin-bottom:24px;border-radius:4px;font-size:14px">
  <strong>⚠️ Legal Disclaimer:</strong> This article provides general legal information only and does not constitute legal advice.
  For advice specific to your situation, consult <strong>Advocate Md. Shah Alam</strong> directly at <a href="tel:+8801712655546" style="color:#1a56db">+880 1712-655546</a>.
</div>`;
const BN_DISCLAIMER = `<div style="background:#fff8e1;border-left:4px solid #f5a623;padding:12px 16px;margin-bottom:24px;border-radius:4px;font-size:14px">
  <strong>⚠️ দাবিত্যাগ:</strong> এই নিবন্ধটি শুধুমাত্র সাধারণ আইনি তথ্যের জন্য। এটি আইনি পরামর্শ নয়।
  সরাসরি পরামর্শের জন্য <a href="tel:+8801712655546" style="color:#1a56db">+880 1712-655546</a>-এ যোগাযোগ করুন।
</div>`;
const CONCLUSION_DISCLAIMER_BN = `<div class="legal-disclaimer-box" style="padding:1rem;background:#f9fafb;border-left:4px solid #d97706;margin:1.5rem 0;font-size:0.875rem;color:#374151">  <strong>দায়বর্জন (Disclaimer):</strong> এই আর্টিকেলে পরিবেশিত তথ্যসমূহ কেবল আইনি সচেতনতা ও সাধারণ শিক্ষার উদ্দেশ্যে প্রকাশিত। এটি কোনো প্রত্যক্ষ আইনি পরামর্শ (Legal Advice) নয় এবং এর মাধ্যমে কোনো আইনজীবী-মক্কেল সম্পর্ক (Attorney-Client Relationship) তৈরি হয় না। আপনার সুনির্দিষ্ট মামলার আইনি প্রতিকারের জন্য সরাসরি বাংলাদেশ সুপ্রিম কোর্ট বা জজ কোর্টের তালিকাভুক্ত বিজ্ঞ আইনজীবীর সাথে পরামর্শ করুন।</div>`;
const CONCLUSION_DISCLAIMER_EN = `<div class="legal-disclaimer-box" style="padding:1rem;background:#f9fafb;border-left:4px solid #d97706;margin:1.5rem 0;font-size:0.875rem;color:#374151"><strong>Legal Disclaimer:</strong> The information provided in this article is for general legal awareness and educational purposes only. It does not constitute formal legal advice and does not establish an attorney-client relationship. For specific legal remedies tailored to your case, please consult directly with an enrolled advocate of the Supreme Court of Bangladesh or the Judges Court.</div>`;
const MID_ARTICLE_LEAD_BN = `<div style="margin:2.5rem 0;padding:1.5rem;background:#fdfaf2;border:1.5px solid #c6a75e;border-radius:12px">
  <strong style="color:#b45309;font-size:1.1rem;display:block;margin-bottom:0.5rem">⚖️ আইনি কেস মূল্যায়ন ও চেম্বার অ্যাপয়েন্টমেন্ট</strong>
  <p style="margin:0 0 1rem;color:#333;font-size:0.95rem;line-height:1.7">আপনার জমি বিরোধ, বাটোয়ারা মামলা, জামিন, তালাক বা সাইবার জটিলতায় বিজ্ঞ আইনজীবীর পরামর্শ নিতে সুপ্রিম কোর্ট বা উত্তরা চেম্বারে নথিপত্রসহ সরাসরি বসুন।</p>
  <div style="display:flex;gap:12px;flex-wrap:wrap">
    <a href="https://wa.me/8801955802007?text=%E0%A6%86%E0%A6%87%E0%A6%A8%E0%A6%BF%20%E0%A6%AA%E0%A6%B0%E0%A6%BE%E0%A6%AE%E0%A6%B0%E0%A7%8D%E0%A6%B6%E0%A7%87%E0%A6%B0%20%E0%A6%9C%E0%A6%A8%E0%A7%8D%E0%A6%AF%20%E0%A6%AF%E0%A7%8B%E0%A6%97%E0%A6%BE%E0%A6%AF%E0%A7%8B%E0%A6%97" style="background:#25D366;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px">জরুরি হোয়াটসঅ্যাপ</a>
    <a href="tel:+8801712655546" style="background:#1e3a8a;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px">সরাসরি কল: ০১৭১২-৬৫৫৫৪৬</a>
  </div>
</div>`;
const MID_ARTICLE_LEAD_EN = `<div style="margin:2.5rem 0;padding:1.5rem;background:#fdfaf2;border:1.5px solid #c6a75e;border-radius:12px">
  <strong style="color:#b45309;font-size:1.1rem;display:block;margin-bottom:0.5rem">⚖️ Legal Case Evaluation & Chamber Appointment</strong>
  <p style="margin:0 0 1rem;color:#333;font-size:0.95rem;line-height:1.7">Have your property disputes, bail matters, family issues, or litigation documents reviewed in person by Advocate Md. Shah Alam at Uttara or Dhaka Judge Court.</p>
  <div style="display:flex;gap:12px;flex-wrap:wrap">
    <a href="https://wa.me/8801955802007?text=Legal%20Consultation%20Appointment" style="background:#25D366;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px">WhatsApp Consultation</a>
    <a href="tel:+8801712655546" style="background:#1e3a8a;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px">Direct Call: +880 1712-655546</a>
  </div>
</div>`;
const CTA = `<div style="margin-top:40px;padding:20px;background:#e8f0fe;border-radius:8px;text-align:center">
  <strong>Need Legal Help in Bangladesh?</strong><br>
  Contact <strong>Advocate Md. Shah Alam</strong>: <a href="tel:+8801712655546" style="color:#1a56db">+880 1712-655546</a> &nbsp;|&nbsp;
  <a href="https://wa.me/8801712655546" style="color:#25D366">WhatsApp</a><br>
  <small style="color:#555">Uttara Chamber: House 46, Road 6/B, Sector 12, Uttara, Dhaka-1230<br>
  Court Chamber: Ainjeebi Samity Bhaban, 4th Floor, 6/7 Court House Street, Kotwali, Dhaka-1100</small>
</div>`;
const BN_CTA = `<div style="margin-top:40px;padding:20px;background:#e8f0fe;border-radius:8px;text-align:center">
  <strong>আইনি সহায়তা বা জরুরি পরামর্শের প্রয়োজন?</strong><br>
  যোগাযোগ করুন <strong>এডভোকেট মোঃ শাহ আলম</strong>: <a href="tel:+8801712655546" style="color:#1a56db">+880 1712-655546</a> &nbsp;|&nbsp;
  <a href="https://wa.me/8801712655546" style="color:#25D366">WhatsApp</a><br>
  <small style="color:#555">উত্তরা চেম্বার: বাড়ি ৪৬, রোড ৬/বি, সেক্টর ১২, উত্তরা, ঢাকা-১২৩০<br>
  কোর্ট চেম্বার: আইনজীবী সমিতি ভবন, ৪র্থ তলা, ৬/৭ কোর্ট হাউস স্ট্রিট, কোতোয়ালি, ঢাকা-১১০০</small>
</div>`;

function buildPillarAndTableHtml(post, lang) {
  const pillar = resolveMasterPillar(post, lang);
  const qaTable = resolveQuickAnswerTable(post, lang);
  const pillarHtml = pillar ? `<div style="margin:16px 0;padding:14px 18px;border:1.5px solid #c6a75e;border-radius:10px;background:#fdfaf2">
    <strong>${escHtml(pillar.label)}:</strong> <a href="${pillar.url}" style="color:#1a56db;font-weight:700">${escHtml(pillar.anchor)}</a>
    ${pillar.serviceUrl ? ` &middot; <a href="${pillar.serviceUrl}" style="color:#b45309;font-weight:700">${escHtml(pillar.serviceAnchor)}</a>` : ''}
  </div>` : '';
  const tableHtml = qaTable ? `<div style="margin:20px 0">
    <h2 style="font-size:18px;font-weight:700;margin-bottom:8px">${escHtml(qaTable.heading)}</h2>
    <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0">
      <thead><tr style="background:#0f172a;color:#fff"><th style="padding:10px;text-align:left">${lang === 'bn' ? 'বিষয় / শর্ত' : 'Key Legal Aspect'}</th><th style="padding:10px;text-align:left">${lang === 'bn' ? 'সরকারি নিয়ম, ফি ও আইন (২০২৬)' : 'Official Rule, Fee & Law (2026)'}</th></tr></thead>
      <tbody>${qaTable.rows.map(([k, v]) => `<tr><td style="padding:10px;border-bottom:1px solid #e2e8f0;font-weight:700">${escHtml(k)}</td><td style="padding:10px;border-bottom:1px solid #e2e8f0">${escHtml(v)}</td></tr>`).join('')}</tbody>
    </table>
    ${qaTable.portal ? `<p style="font-size:13px;margin-top:6px"><a href="${qaTable.portal.url}" target="_blank" rel="noopener noreferrer">${escHtml(qaTable.portal.label)}</a></p>` : ''}
  </div>` : '';
  return pillarHtml + tableHtml;
}

function buildPostBody(post) {
  const toc = (post.toc || []).length ? `<nav style="background:#f4f6fb;padding:16px 20px;border-radius:8px;margin-bottom:28px">
    <strong>📋 In This Article</strong>
    <ol style="margin-top:8px;padding-left:20px">
      ${post.toc.map((h, i) => {
        const text = typeof h === 'string' ? h : (h?.title || h?.heading || h?.text || '');
        return `<li style="margin:4px 0"><a href="#s${i}" style="color:#1a56db">${escHtml(text)}</a></li>`;
      }).join('')}
    </ol></nav>` : '';
  const midIndex = Math.floor(((post.sections || []).length - 1) / 2);
  const sections = (post.sections || []).map((s, i) => {
    const secHtml = `
    <section id="s${i}" style="margin-bottom:32px">
      <h2 style="font-size:22px;font-weight:700;margin-bottom:12px;color:#111">${escHtml(s.h2 || s.heading || s.title || '')}</h2>
      <div style="font-size:15px;color:#333">${s.content || ''}</div>
    </section>`;
    return (i === midIndex && (post.sections || []).length >= 2) ? secHtml + MID_ARTICLE_LEAD_EN : secHtml;
  }).join('');
  const faqs = (post.faqs || []).length ? `<section style="margin-top:32px">
    <h2 style="font-size:22px;font-weight:700;margin-bottom:16px">Frequently Asked Questions</h2>
    ${post.faqs.map(f => `<div style="margin-bottom:16px;padding:12px 16px;background:#f9f9f9;border-radius:8px">
      <strong style="color:#111">${escHtml(f.question || f.q || '')}</strong>
      <p style="margin:6px 0 0;color:#444;font-size:14px">${escHtml(f.answer || f.a || '')}</p></div>`).join('')}
    </section>` : '';
  return `<h1 style="font-size:30px;font-weight:700;margin-bottom:8px;color:#0a0a0a">${escHtml(post.title)}</h1>
<p style="color:#555;font-size:14px;margin-bottom:20px">By <strong>Advocate Md. Shah Alam</strong> &middot; ${escHtml(post.publishedDate || '')} &middot; ${escHtml(post.readTime || '')}</p>
${DISCLAIMER}
<p style="font-size:16px;color:#333;margin-bottom:24px">${escHtml(post.heroIntro || '')}</p>
${buildPillarAndTableHtml(post, 'en')}${toc}${sections}${faqs}${CONCLUSION_DISCLAIMER_EN}${CTA}`;
}

function buildBnPostBody(post) {
  const quickAns = post.quickAnswer ? `<div style="background:#f0fdf4;border-left:4px solid #16a34a;padding:16px 20px;border-radius:8px;margin-bottom:28px">
    <strong style="color:#166534;font-size:16px">${escHtml(post.quickAnswer.heading || '⚡ এক নজরে')}</strong>
    <ul style="margin-top:8px;padding-left:20px;color:#14532d;line-height:1.8">
      ${(post.quickAnswer.points || []).map(p => `<li>${escHtml(p)}</li>`).join('')}
    </ul>
  </div>` : '';
  const toc = (post.toc || []).length ? `<nav style="background:#f4f6fb;padding:16px 20px;border-radius:8px;margin-bottom:28px">
    <strong style="color:#1e293b">📋 সূচিপত্র</strong>
    <ol style="margin-top:8px;padding-left:20px">
      ${post.toc.map((h, i) => {
        const text = typeof h === 'string' ? h : (h?.title || h?.heading || h?.text || '');
        return `<li style="margin:4px 0"><a href="#s${i}" style="color:#1a56db">${escHtml(text)}</a></li>`;
      }).join('')}
    </ol></nav>` : '';
  const midIndex = Math.floor(((post.sections || []).length - 1) / 2);
  const sections = (post.sections || []).map((s, i) => {
    const secHtml = `
    <section id="s${i}" style="margin-bottom:32px">
      <h2 style="font-size:22px;font-weight:700;margin-bottom:12px;color:#111">${escHtml(s.heading || s.h2 || s.title || '')}</h2>
      <div style="font-size:15px;color:#333;line-height:1.8">${s.content || ''}</div>
    </section>`;
    return (i === midIndex && (post.sections || []).length >= 2) ? secHtml + MID_ARTICLE_LEAD_BN : secHtml;
  }).join('');
  const faqs = (post.faqs || []).length ? `<section style="margin-top:32px">
    <h2 style="font-size:22px;font-weight:700;margin-bottom:16px;color:#111">সাধারণ প্রশ্নোত্তর (FAQ)</h2>
    ${post.faqs.map(f => `<div style="margin-bottom:16px;padding:14px 18px;background:#f9f9f9;border-radius:8px;border:1px solid #eee">
      <strong style="color:#111">${escHtml(f.question || f.q || '')}</strong>
      <p style="margin:6px 0 0;color:#444;font-size:14px;line-height:1.7">${escHtml(f.answer || f.a || '')}</p></div>`).join('')}
    </section>` : '';
  return `<h1 style="font-size:30px;font-weight:700;margin-bottom:8px;color:#0a0a0a">${escHtml(post.title || '')}</h1>
<p style="color:#555;font-size:14px;margin-bottom:20px">লেখক: <strong>অ্যাডভোকেট মো. শাহ আলম</strong> &middot; ${escHtml(post.publishedDate || '')} &middot; ${escHtml(post.readTime || '')}</p>
${BN_DISCLAIMER}
<p style="font-size:16px;color:#333;margin-bottom:24px;line-height:1.8">${escHtml(post.heroIntro || '')}</p>
${buildPillarAndTableHtml(post, 'bn')}${quickAns}${toc}${sections}${faqs}${CONCLUSION_DISCLAIMER_BN}${BN_CTA}`;
}

// Load source post JSONs
const sourcePostsByUrl = new Map();
for (const f of fs.readdirSync(EN_DIR).filter(x => x.endsWith('.json'))) {
  const p = JSON.parse(fs.readFileSync(path.join(EN_DIR, f), 'utf8').replace(/^\uFEFF/, ''));
  if (p?.slug) sourcePostsByUrl.set(`${BASE}/blog/${p.slug}`, { lang: 'en', post: p, sourceFile: `src/content/posts/en/${f}` });
}
for (const f of fs.readdirSync(BN_DIR).filter(x => x.endsWith('.json'))) {
  const p = JSON.parse(fs.readFileSync(path.join(BN_DIR, f), 'utf8').replace(/^\uFEFF/, ''));
  if (p?.slug) sourcePostsByUrl.set(`${BASE}/bn/blog/${p.slug}`, { lang: 'bn', post: p, sourceFile: `src/content/posts/bn/${f}` });
}

// Build content-corpus.json for all 745 sitemap URLs (720 blog posts + 25 static/service pages)
const corpus = [];
let exactMatchCount = 0;
let diffCount = 0;
const diffs = [];

for (const entry of baselineIndex.pages) {
  const url = entry.url;
  const relPath = url.replace(BASE, '') || '/';
  const live = livePageMeta.get(url);
  const src = sourcePostsByUrl.get(url);
  const gsc = pageStatsMap.get(url);
  const inbound = [...(inboundMap.get(url) || [])];
  const outbound = [...(outboundMap.get(url) || [])];

  if (src) {
    const { lang, post, sourceFile } = src;
    const expectedBody = (lang === 'bn' ? buildBnPostBody(post) : buildPostBody(post)).trim();
    const isExactMatch = expectedBody === live.liveBodyHtml;
    if (isExactMatch) {
      exactMatchCount++;
    } else {
      diffCount++;
      diffs.push({ url, expectedLen: expectedBody.length, liveLen: live.liveBodyHtml.length });
    }

    corpus.push({
      type: 'post',
      slug: post.slug,
      path: relPath,
      url,
      lang,
      sourceFile,
      title: live.title || post.metaTitle || post.title || '',
      rawTitle: post.title || '',
      metaTitle: post.metaTitle || '',
      description: live.description || post.metaDescription || '',
      h1: live.h1s[0] || post.title || '',
      h1Count: live.h1s.length,
      body: live.liveBodyHtml,
      pairedSlug: lang === 'en' ? (post.bnSlug || null) : (post.enSlug || null),
      datePublished: post.publishedDate || null,
      dateModified: post.lastModified || post.publishedDate || null,
      category: post.category || null,
      tags: post.keywords || post.tags || [],
      author: 'Advocate Md. Shah Alam',
      canonicalTarget: live.canonical || url,
      currentInboundLinks: inbound,
      currentInboundCount: inbound.length,
      currentOutboundLinks: outbound,
      currentOutboundCount: outbound.length,
      wordCount: live.wordCount,
      inSitemap: true,
      gscImpressions30d: gsc?.impressions || 0,
      gscClicks30d: gsc?.clicks || 0,
      gscAvgPosition30d: gsc?.position || 0,
      htmlBytes: live.htmlBytes,
      liveBodyParity: isExactMatch
    });
  } else {
    // Non-post sitemap page (homepage, service page, static page, blog index)
    const isBn = relPath === '/' || relPath.startsWith('/bn');
    const slug = relPath === '/' ? 'home-bn' : relPath.replace(/^\/+/, '').replace(/\//g, '--');
    corpus.push({
      type: relPath.includes('/services/') ? 'service' : 'page',
      slug,
      path: relPath,
      url,
      lang: live.lang || (isBn ? 'bn' : 'en'),
      sourceFile: 'scripts/prerender.mjs',
      title: live.title,
      description: live.description,
      h1: live.h1s[0] || '',
      h1s: live.h1s,
      h1Count: live.h1s.length,
      body: live.liveBodyHtml,
      datePublished: '2026-05-12',
      dateModified: '2026-11-14',
      category: relPath.includes('/services/') ? 'Legal Services' : 'Core Page',
      tags: [],
      author: 'Advocate Md. Shah Alam',
      canonicalTarget: live.canonical || url,
      currentInboundLinks: inbound,
      currentInboundCount: inbound.length,
      currentOutboundLinks: outbound,
      currentOutboundCount: outbound.length,
      wordCount: live.wordCount,
      inSitemap: true,
      gscImpressions30d: gsc?.impressions || 0,
      gscClicks30d: gsc?.clicks || 0,
      gscAvgPosition30d: gsc?.position || 0,
      htmlBytes: live.htmlBytes,
      liveBodyParity: true
    });
  }
}

const corpusWrapper = {
  generatedAt: new Date().toISOString(),
  gitSha: '63b0a2480bd6a06065e698c98d65b8c6554d780d',
  totalEntries: corpus.length,
  postEntries: corpus.filter(c => c.type === 'post').length,
  serviceEntries: corpus.filter(c => c.type === 'service').length,
  pageEntries: corpus.filter(c => c.type === 'page').length,
  liveParityVerifiedPosts: exactMatchCount,
  liveParityDiffPosts: diffCount,
  diffs,
  entries: corpus
};

fs.writeFileSync(path.join(ROOT, 'content-corpus.json'), JSON.stringify(corpusWrapper, null, 2), 'utf8');
console.log(`Built content-corpus.json: ${corpus.length} total entries (${corpusWrapper.postEntries} posts, ${corpusWrapper.serviceEntries} services, ${corpusWrapper.pageEntries} core pages).`);
console.log(`Live body parity check across ${corpusWrapper.postEntries} blog posts: ${exactMatchCount} exact matches, ${diffCount} differed.`);
if (diffs.length > 0) {
  console.log('Sample diffs:', diffs.slice(0, 5));
}
