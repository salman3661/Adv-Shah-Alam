import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const BASE = 'https://www.advmdshahalam.me';
const sitemapXml = fs.readFileSync(path.join(ROOT, 'public', 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const sitemapSet = new Set(sitemapUrls);

function toRel(url) {
  return url.replace(BASE, '') || '/';
}
function toDistPath(rel) {
  return rel === '/' ? path.join(DIST, 'index.html') : path.join(DIST, rel.replace(/^\/+/, ''), 'index.html');
}

// 1. Parse hreflang, canonical, html lang, og:locale for every sitemap page
const pageData = new Map();
let enBdErrors = 0;
let missingHreflang = 0;
let langErrors = 0;
let ogLocaleErrors = 0;
let canonicalErrors = 0;
let brokenTargetErrors = 0;
let xDefaultErrors = 0;
let nonReciprocalErrors = 0;

for (const url of sitemapUrls) {
  const rel = toRel(url);
  const fp = toDistPath(rel);
  const html = fs.readFileSync(fp, 'utf8');

  const htmlLangMatch = html.match(/<html\s+lang="([^"]*)"/i);
  const htmlLang = htmlLangMatch ? htmlLangMatch[1] : '';

  const ogLocaleMatch = html.match(/<meta\s+property="og:locale"\s+content="([^"]*)"/i);
  const ogLocale = ogLocaleMatch ? ogLocaleMatch[1] : '';

  const canonMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
  const canonical = canonMatch ? canonMatch[1] : '';

  const expectedLang = (rel === '/' || rel === '/review' || rel.startsWith('/bn/')) ? 'bn' : 'en';
  const expectedOgLocale = expectedLang === 'bn' ? 'bn_BD' : 'en_US';

  if (htmlLang !== expectedLang) {
    langErrors++;
    console.error(`LANG ERROR on ${rel}: got "${htmlLang}", expected "${expectedLang}"`);
  }
  if (ogLocale !== expectedOgLocale) {
    ogLocaleErrors++;
    console.error(`OG:LOCALE ERROR on ${rel}: got "${ogLocale}", expected "${expectedOgLocale}"`);
  }
  if (canonical !== url) {
    canonicalErrors++;
    console.error(`CANONICAL ERROR on ${rel}: got "${canonical}", expected "${url}"`);
  }

  const alts = [...html.matchAll(/<link\s+rel="alternate"\s+hreflang="([^"]+)"\s+href="([^"]+)"\s*\/?>/gi)]
    .map((m) => ({ hreflang: m[1], href: m[2] }));

  if (alts.some((a) => a.hreflang === 'en-BD' || a.hreflang === 'bn-BD')) {
    enBdErrors++;
    console.error(`REGIONAL HREFLANG ERROR (en-BD/bn-BD) on ${rel}`);
  }
  if (alts.length === 0) {
    missingHreflang++;
    console.error(`MISSING HREFLANG on ${rel}`);
  }

  for (const a of alts) {
    if (!sitemapSet.has(a.href)) {
      brokenTargetErrors++;
      console.error(`HREFLANG TARGET NOT IN SITEMAP on ${rel}: ${a.hreflang} -> ${a.href}`);
    } else if (!fs.existsSync(toDistPath(toRel(a.href)))) {
      brokenTargetErrors++;
      console.error(`HREFLANG TARGET MISSING IN DIST on ${rel}: ${a.hreflang} -> ${a.href}`);
    }
  }

  const enAlt = alts.find((a) => a.hreflang === 'en');
  const bnAlt = alts.find((a) => a.hreflang === 'bn');
  const xDefAlt = alts.find((a) => a.hreflang === 'x-default');
  if (enAlt && bnAlt) {
    if (alts.length !== 3 || !xDefAlt || xDefAlt.href !== enAlt.href) {
      xDefaultErrors++;
      console.error(`BILINGUAL HREFLANG TAGS ERROR on ${rel}: expected exact 3 tags (en, bn, x-default->EN)`);
    }
  }

  pageData.set(url, { rel, expectedLang, alts });
}

// 2. Check 100% reciprocity across all bilingual pairs and build hreflang-map.csv
const rows = ['en_path,bn_path,confidence,evidence'];
const seenPairs = new Set();

for (const [url, data] of pageData.entries()) {
  const enAlt = data.alts.find((a) => a.hreflang === 'en');
  const bnAlt = data.alts.find((a) => a.hreflang === 'bn');
  if (enAlt && bnAlt) {
    const partnerUrl = data.expectedLang === 'en' ? bnAlt.href : enAlt.href;
    const partner = pageData.get(partnerUrl);
    if (!partner) {
      nonReciprocalErrors++;
      console.error(`PARTNER MISSING: ${url} -> ${partnerUrl}`);
      continue;
    }
    const pEn = partner.alts.find((a) => a.hreflang === 'en');
    const pBn = partner.alts.find((a) => a.hreflang === 'bn');
    if (!pEn || !pBn || pEn.href !== enAlt.href || pBn.href !== bnAlt.href) {
      nonReciprocalErrors++;
      console.error(`NON-RECIPROCAL: ${url} <-> ${partnerUrl}`);
    }
    const key = `${enAlt.href}|${bnAlt.href}`;
    if (!seenPairs.has(key)) {
      seenPairs.add(key);
      const enRel = toRel(enAlt.href);
      const bnRel = toRel(bnAlt.href);
      const ev = enRel.startsWith('/blog/') ? 'json_reciprocal_slug_pair' : 'core_or_service_route_pair';
      rows.push(`${enRel},${bnRel},1.0,${ev}`);
    }
  } else {
    const selfRel = data.rel;
    if (data.expectedLang === 'en') rows.push(`${selfRel},,unpaired,en_only`);
    else rows.push(`,${selfRel},unpaired,bn_only`);
  }
}

fs.writeFileSync(path.join(ROOT, 'hreflang-map.csv'), rows.join('\n') + '\n');

const summary = {
  totalSitemapPages: sitemapUrls.length,
  bilingualPairs: seenPairs.size,
  enBdErrors,
  missingHreflang,
  langErrors,
  ogLocaleErrors,
  canonicalErrors,
  brokenTargetErrors,
  xDefaultErrors,
  nonReciprocalErrors,
};
console.log('\n=== PHASE 3 HREFLANG VALIDATOR ===');
console.log(summary);

const totalErrors = enBdErrors + missingHreflang + langErrors + ogLocaleErrors + canonicalErrors + brokenTargetErrors + xDefaultErrors + nonReciprocalErrors;
if (totalErrors > 0) process.exit(1);
