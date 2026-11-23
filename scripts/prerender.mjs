/**
 * prerender.mjs  (v2 — full-site pre-rendering)
 * ─────────────────────────────────────────────────────────────
 * Fixes ALL Google Search Console indexing problems:
 *
 *  1. Soft 404  → Home, Blog index, Service pages, Education, Advocate
 *                 page now all get real HTML content (was empty <div id="root">)
 *
 *  2. Crawled – currently not indexed → Content-rich HTML injected so Google
 *                 sees value on every URL it crawls
 *
 *  3. Duplicate / Google chose different canonical → every pre-rendered file
 *                 has the correct www canonical injected in <head>, overriding
 *                 the generic index.html fallback
 *
 *  4. EN + BN blog posts → 210 posts get full article HTML
 *
 * Run AFTER vite build:  node scripts/prerender.mjs
 * Integrated via:        "postbuild": "node scripts/prerender.mjs"
 */

import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildEntityGraph, buildHreflang, jsonLd, resolveMasterPillar, resolveQuickAnswerTable } from '../src/utils/seoSchema.mjs';
import { evergreenYear } from '../src/utils/evergreenYear.mjs';
import { GOOGLE_REVIEW_URL, REVIEW_CONTENT } from '../src/content/reviewContent.mjs';
import { SERVICE_PAGES_EN, SERVICE_PAGES_BN } from '../src/content/servicePagesData.mjs';
import { buildPersonEntity, buildLegalServiceEntity, buildWebSiteEntity, AREA_SERVED, getServiceAreaServed, buildServicePageSchema } from '../src/seo/entity.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT   = path.resolve(__dirname, '..');
const DIST   = path.join(ROOT, 'dist');
const EN_DIR = path.join(ROOT, 'src', 'content', 'posts', 'en');
const BN_DIR = path.join(ROOT, 'src', 'content', 'posts', 'bn');
const BASE   = 'https://www.advmdshahalam.me';

// ── JSON content files ──────────────────────────────────────────────────────
const siteInfo = JSON.parse(fs.readFileSync(path.join(ROOT,'src','content','siteInfo.json'),'utf8'));
const faq      = JSON.parse(fs.readFileSync(path.join(ROOT,'src','content','faq.json'),'utf8'));
const services = JSON.parse(fs.readFileSync(path.join(ROOT,'src','content','services.json'),'utf8'));
const about    = JSON.parse(fs.readFileSync(path.join(ROOT,'src','content','about.json'),'utf8'));
const hero     = JSON.parse(fs.readFileSync(path.join(ROOT,'src','content','hero.json'),'utf8'));
const aboutBn  = JSON.parse(fs.readFileSync(path.join(ROOT,'src','content','about_bn.json'),'utf8'));
const heroBn   = JSON.parse(fs.readFileSync(path.join(ROOT,'src','content','hero_bn.json'),'utf8'));
const topics   = JSON.parse(fs.readFileSync(path.join(ROOT,'src','content','topics.json'),'utf8'));
const pageHeadings = JSON.parse(fs.readFileSync(path.join(ROOT,'src','content','pageHeadings.json'),'utf8'));
const relatedEn = JSON.parse(fs.readFileSync(path.join(ROOT,'src','content','related-links-en.json'),'utf8'));
const relatedBn = JSON.parse(fs.readFileSync(path.join(ROOT,'src','content','related-links-bn.json'),'utf8'));

function coverFor(category = '') {
  const c = String(category);
  const rules = [
    ['cyber', /সাইবার|cyber/i],
    ['criminal', /ফৌজদারি|criminal/i],
    ['immigration', /অভিবাসন|প্রবাসী|immigration|citizenship|nrb|overseas/i],
    ['family', /পারিবারিক|family/i],
    ['land', /ভূমি|সম্পত্তি|জমি|land|property|real estate|inheritance/i],
    ['business', /কর |কর$|corporate|business|company|banking|commercial|tax|finance/i],
    ['civil', /দেওয়ানি|civil|litigation|procedure|supreme|constitutional|document/i],
  ];
  for (const [k, re] of rules) if (re.test(c)) return `/images/covers/${k}.webp`;
  return '/images/covers/general.webp';
}

function freshnessTs(post) {
  const t = (d) => (d ? new Date(d).getTime() || 0 : 0);
  return Math.max(t(post.publishedAt), t(post.publishedDate), t(post.lastModified));
}

// ── Redirect Sources from vercel.json (Filter out redirected pages) ──────────
const vercelConfig = jsonLoad(path.join(ROOT, 'vercel.json')) || {};
const redirectSources = new Set(
  (vercelConfig.redirects || [])
    .filter(r => !r.has)
    .map(r => r.source)
);

// ── helpers ─────────────────────────────────────────────────────────────────
function readBase() {
  const baseCache = path.join(DIST, '.base.html');
  let html = fs.existsSync(baseCache)
    ? fs.readFileSync(baseCache, 'utf8')
    : fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
  if (!fs.existsSync(baseCache)) {
    fs.writeFileSync(baseCache, html, 'utf8');
  }
  html = html.replace(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/g, (match, href) => {
    return `<link rel="preload" href="${href}" as="style" />\n  ${match}`;
  });
  return html;
}
function ensureDir(d) { fs.mkdirSync(d, { recursive: true }); }
function write(filePath, html) { ensureDir(path.dirname(filePath)); fs.writeFileSync(filePath, html, 'utf8'); }
function escHtml(s='') { return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function jsonLoad(p) { try { return JSON.parse(fs.readFileSync(p,'utf8').replace(/^\uFEFF/, '')); } catch { return null; } }

/**
 * Inject page-specific title, description, canonical, Open Graph tags,
 * and structured data into the base HTML.
 */
function buildHeroShell(lang = 'bn') {
  const isBn = lang === 'bn';
  const hc = isBn ? heroBn : hero;
  const pills = isBn
    ? [
        { label: '১০+ বছরের অভিজ্ঞতা', dotColor: '#1A3FBF' },
        { label: 'সুপ্রিম কোর্টের আইনজীবী', dotColor: '#C6A75E' },
        { label: 'উত্তরা, ঢাকা', dotColor: '#22C55E' },
      ]
    : [
        { label: '10+ Years Experience', dotColor: '#1A3FBF' },
        { label: 'Supreme Court Advocate', dotColor: '#C6A75E' },
        { label: 'Uttara, Dhaka', dotColor: '#22C55E' },
      ];

  const pillsHtml = pills
    .map(
      (p) =>
        `<span style="display:inline-flex;align-items:center;gap:0.42rem;padding:0.32rem 1rem;border-radius:9999px;font-size:0.72rem;font-weight:700;letter-spacing:0.01em;background:var(--hero-pill-bg);border:1.5px solid var(--hero-pill-border);color:var(--hero-pill-text);box-shadow:0 2px 10px rgba(0,0,0,0.07)"><span style="width:7px;height:7px;border-radius:50%;background:${p.dotColor};flex-shrink:0"></span>${escHtml(p.label)}</span>`
    )
    .join('');

  return `<section id="home" class="relative overflow-hidden google-anno-skip" style="background:var(--hero-section-bg);min-height:100vh;display:flex;flex-direction:column;justify-content:center">
  <div class="container mx-auto px-6 relative z-10" style="padding-top:6.75rem;padding-bottom:3.5rem">
    <div class="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
      <div class="order-2 md:order-1">
        <div style="display:flex;flex-wrap:wrap;gap:0.6rem;margin-bottom:1.5rem">${pillsHtml}</div>
        ${
          hc.emergencyBadge
            ? `<div style="margin-bottom:1.25rem"><span style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.38rem 0.95rem;border-radius:9999px;font-size:0.72rem;font-weight:700;background:rgba(239,68,68,0.08);border:1.5px solid rgba(239,68,68,0.25);color:#dc2626"><span style="width:7px;height:7px;border-radius:50%;background:#ef4444;flex-shrink:0"></span>${escHtml(hc.emergencyBadge)}</span></div>`
            : ''
        }
        <h1 style="font-size:clamp(2rem, 4.5vw, 3.2rem);font-weight:800;line-height:1.13;margin-bottom:0.75rem;color:var(--hero-heading);letter-spacing:-0.03em">${escHtml(hc.headline)} <span style="color:var(--hero-accent)">${escHtml(hc.headlineAccent)}</span></h1>
        <p style="font-size:0.97rem;line-height:1.68;margin-bottom:1.4rem;color:var(--hero-sub);font-weight:400;max-width:450px">${escHtml(hc.subheading)}</p>
        <div style="display:flex;gap:0.7rem;flex-wrap:wrap">
          <a href="https://wa.me/8801712655546" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.72rem 1.4rem;border-radius:0.65rem;background:#128043;color:#fff;font-size:0.875rem;font-weight:700;text-decoration:none;box-shadow:0 4px 16px rgba(18,128,67,0.38)">${escHtml(hc.cta1Label)}</a>
          <a href="#contact" style="display:inline-flex;align-items:center;gap:0.45rem;padding:0.72rem 1.4rem;border-radius:0.65rem;background:var(--hero-cta-sec-bg);color:var(--hero-cta-sec-text);font-size:0.875rem;font-weight:600;text-decoration:none;border:1.5px solid var(--hero-cta-sec-border)">${escHtml(hc.cta2Label)}</a>
        </div>
      </div>
      <div class="order-1 md:order-2 flex justify-center md:justify-end google-anno-skip">
        <div class="google-anno-skip" style="position:relative;width:100%;max-width:340px;aspect-ratio:4/5">
          <div style="position:relative;border-radius:1.5rem;overflow:hidden;border:1px solid var(--hero-photo-border);box-shadow:0 20px 56px var(--hero-photo-shadow);height:100%;z-index:1">
            <img src="/images/hero/hero-md-shah-alam.webp" srcset="/images/hero/hero-md-shah-alam-420.webp 420w, /images/hero/hero-md-shah-alam.webp 828w" sizes="(max-width: 768px) 240px, 340px" alt="${escHtml(hc.photoAlt)}" loading="eager" fetchpriority="high" decoding="sync" width="600" height="750" style="width:100%;height:100%;object-fit:cover;object-position:top;display:block" />
            <div style="position:absolute;bottom:0;left:0;right:0;height:38%;background:linear-gradient(to top, rgba(10,17,36,0.7) 0%, transparent 100%)"></div>
            <div style="position:absolute;bottom:0.875rem;right:0.875rem;background:linear-gradient(135deg, #1A3FBF 0%, #3B5FD4 100%);color:#fff;font-size:0.68rem;font-weight:700;padding:0.38rem 0.85rem;border-radius:0.5rem">${escHtml(hc.photoBadgeBottom)}</div>
            <div style="position:absolute;top:0.875rem;left:0.875rem;background:rgba(10,17,36,0.7);color:#C6A75E;font-size:0.63rem;font-weight:700;padding:0.32rem 0.7rem;border-radius:0.5rem;border:1px solid rgba(198,167,94,0.35)">${escHtml(hc.photoBadgeTop)}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

function buildPage(base, { title, description, canonical, body, lang='en', extraHead='', ogImage='', robots='index, follow' }) {
  let h = base;
  h = h.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`);
  if (lang !== 'bn') h = h.replace(/\s*<link rel="preload" href="\/fonts\/NotoSerifBengali[^>]*>/g, '');
  h = h.replace(/<title>[^<]*<\/title>/, `<title>${escHtml(title)}</title>`);
  h = h.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escHtml(description)}">`);
  h = h.replace(/<meta name="robots"[^>]*>/, `<meta name="robots" content="${escHtml(robots)}">`);
  
  // Clean canonical: strip any tracking params or trailing slashes
  const cleanCanonical = canonical ? (canonical.replace(/\/+$/, '') === BASE ? `${BASE}/` : canonical.replace(/\/+$/, '')) : '';
  const isHomePage = cleanCanonical === `${BASE}/` || cleanCanonical === `${BASE}/en`;
  if (!isHomePage) {
    h = h.replace(/\s*<!--\s*Preload LCP hero image[\s\S]*?fetchpriority="high"\s*\/>/g, '');
  }
  h = h.replace(/<link rel="canonical"[^>]*>/g, '');

  h = h.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${escHtml(title)}">`);
  h = h.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${escHtml(description)}">`);
  h = h.replace(/<meta property="og:locale"[^>]*>/, `<meta property="og:locale" content="${lang === 'bn' ? 'bn_BD' : 'en_US'}">`);
  if (cleanCanonical) {
    h = h.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${cleanCanonical}">`);
    h = h.replace(/<meta name="twitter:url"[^>]*>/, `<meta name="twitter:url" content="${cleanCanonical}">`);
  }
  h = h.replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${escHtml(title)}">`);
  h = h.replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${escHtml(description)}">`);
  if (ogImage) {
    h = h.replace(/<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${ogImage}">`);
    h = h.replace(/<meta name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${ogImage}">`);
  }

  let headInjections = cleanCanonical ? `<link rel="canonical" href="${cleanCanonical}">\n` : '';
  if (extraHead) {
    headInjections += `${extraHead}\n`;
  }
  if (headInjections) {
    h = h.replace('</head>', `${headInjections}</head>`);
  }

  // Hidden from users, visible to crawlers — no flash, no layout shift
  const visibleShell = isHomePage ? `\n${buildHeroShell(lang)}` : '';
  const prerendered = `${visibleShell}\n<div id="prerendered-content" aria-hidden="true" style="display:none !important;visibility:hidden !important;opacity:0 !important;height:0 !important;width:0 !important;overflow:hidden !important;position:absolute !important;pointer-events:none !important">\n${body}\n</div>`;
  h = h.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${prerendered}</div>`);
  return h;
}

// ── shared disclaimers & CTAs ────────────────────────────────────────────────
const DISCLAIMER = `<div style="background:#fff8e1;border-left:4px solid #f5a623;padding:12px 16px;margin-bottom:24px;border-radius:4px;font-size:14px">
  <strong>⚠️ Legal Disclaimer:</strong> This article provides general legal information only and does not constitute legal advice.
  For advice specific to your situation, consult <strong>Advocate Md. Shah Alam</strong> directly at <a href="tel:+8801712655546" style="color:#1a56db">+880 1712-655546</a>.
</div>`;

const BN_DISCLAIMER = `<div style="background:#fff8e1;border-left:4px solid #f5a623;padding:12px 16px;margin-bottom:24px;border-radius:4px;font-size:14px">
  <strong>⚠️ দাবিত্যাগ:</strong> এই নিবন্ধটি শুধুমাত্র সাধারণ আইনি তথ্যের জন্য। এটি আইনি পরামর্শ নয়।
  সরাসরি পরামর্শের জন্য <a href="tel:+8801712655546" style="color:#1a56db">+880 1712-655546</a>-এ যোগাযোগ করুন।
</div>`;

// Mandatory concluding legal disclaimer box (Step 6)
const CONCLUSION_DISCLAIMER_BN = `<div class="legal-disclaimer-box" style="padding:1rem;background:#f9fafb;border-left:4px solid #d97706;margin:1.5rem 0;font-size:0.875rem;color:#374151">  <strong>দায়বর্জন (Disclaimer):</strong> এই আর্টিকেলে পরিবেশিত তথ্যসমূহ কেবল আইনি সচেতনতা ও সাধারণ শিক্ষার উদ্দেশ্যে প্রকাশিত। এটি কোনো প্রত্যক্ষ আইনি পরামর্শ (Legal Advice) নয় এবং এর মাধ্যমে কোনো আইনজীবী-মক্কেল সম্পর্ক (Attorney-Client Relationship) তৈরি হয় না। আপনার সুনির্দিষ্ট মামলার আইনি প্রতিকারের জন্য সরাসরি বাংলাদেশ সুপ্রিম কোর্ট বা জজ কোর্টের তালিকাভুক্ত বিজ্ঞ আইনজীবীর সাথে পরামর্শ করুন।</div>`;

const CONCLUSION_DISCLAIMER_EN = `<div class="legal-disclaimer-box" style="padding:1rem;background:#f9fafb;border-left:4px solid #d97706;margin:1.5rem 0;font-size:0.875rem;color:#374151"><strong>Legal Disclaimer:</strong> The information provided in this article is for general legal awareness and educational purposes only. It does not constitute formal legal advice and does not establish an attorney-client relationship. For specific legal remedies tailored to your case, please consult directly with an enrolled advocate of the Supreme Court of Bangladesh or the Judges Court.</div>`;

// Mid-article lead capture widget (Step 7)
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

const CTA = `<div style="margin-top:40px;padding:24px;background:linear-gradient(135deg,#0B1220 0%,#132A4A 100%);border:1px solid rgba(201,162,39,0.45);border-radius:12px;color:#F8FAFC;text-align:left">
  <strong style="font-size:1.15rem;color:#FFFFFF;display:block;margin-bottom:8px">Need Legal Help From Advocate Md. Shah Alam?</strong>
  <p style="margin:0 0 16px;color:#CBD5E1;font-size:0.95rem;line-height:1.6">Consult directly on property disputes, bail, family law, cheque dishonor, or NRB legal matters.</p>
  <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:14px">
    <a href="https://wa.me/8801955802007?text=Hello%20Advocate%20Md.%20Shah%20Alam%2C%20I%20need%20legal%20consultation." data-cta="post-bottom-whatsapp" style="display:inline-flex;align-items:center;min-height:44px;background:#16A34A;color:#FFFFFF;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px">WhatsApp: +880 1955-802007</a>
    <a href="tel:+8801712655546" data-cta="post-bottom-call" style="display:inline-flex;align-items:center;min-height:44px;background:#C9A227;color:#0B1220;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:800;font-size:14px">Call Now: +880 1712-655546</a>
  </div>
  <small style="color:#CBD5E1;display:block;line-height:1.5">Uttara Chamber: House 46, Road 6/B, Sector 12, Uttara, Dhaka-1230<br>
  Court Chamber: Ainjeebi Samity Bhaban, 4th Floor, 6/7 Court House Street, Kotwali, Dhaka-1100</small>
</div>`;

const BN_CTA = `<div style="margin-top:40px;padding:24px;background:linear-gradient(135deg,#0B1220 0%,#132A4A 100%);border:1px solid rgba(201,162,39,0.45);border-radius:12px;color:#F8FAFC;text-align:left">
  <strong style="font-size:1.15rem;color:#FFFFFF;display:block;margin-bottom:8px">আইনি সহায়তা বা জরুরি পরামর্শের প্রয়োজন?</strong>
  <p style="margin:0 0 16px;color:#CBD5E1;font-size:0.95rem;line-height:1.7">জমি-জমা, জামিন, পারিবারিক, চেক ডিজঅনার বা প্রবাসী (NRB) আইনি বিষয়ে এডভোকেট মোঃ শাহ আলমের সরাসরি পরামর্শ নিন।</p>
  <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:14px">
    <a href="https://wa.me/8801955802007?text=%E0%A6%86%E0%A6%B8%E0%A6%B8%E0%A6%BE%E0%A6%B2%E0%A6%BE%E0%A6%AE%E0%A7%81%20%E0%A6%86%E0%A6%B2%E0%A6%BE%E0%A6%87%E0%A6%95%E0%A7%81%E0%A6%AE%2C%20%E0%A6%86%E0%A6%AE%E0%A6%BF%20%E0%A6%86%E0%A6%87%E0%A6%A8%E0%A6%BF%20%E0%A6%AA%E0%A6%B0%E0%A6%BE%E0%A6%AE%E0%A6%B0%E0%A7%8D%E0%A6%B6%20%E0%A6%A8%E0%A6%BF%E0%A6%A4%E0%A7%87%20%E0%A6%9A%E0%A6%BE%E0%A6%87%E0%A5%A4" data-cta="post-bottom-whatsapp" style="display:inline-flex;align-items:center;min-height:44px;background:#16A34A;color:#FFFFFF;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px">WhatsApp: ০১৯৫৫-৮০২০০৭</a>
    <a href="tel:+8801712655546" data-cta="post-bottom-call" style="display:inline-flex;align-items:center;min-height:44px;background:#C9A227;color:#0B1220;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:800;font-size:14px">সরাসরি কল: ০১৭১২-৬৫৫৫৪৬</a>
  </div>
  <small style="color:#CBD5E1;display:block;line-height:1.5">উত্তরা চেম্বার: বাড়ি ৪৬, রোড ৬/বি, সেক্টর ১২, উত্তরা, ঢাকা-১২৩০<br>
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

// ── blog post body builder ───────────────────────────────────────────────────
function buildPostBody(post, postBySlug = new Map()) {
  const rel = relatedEn[post.slug] || {};
  const hubTopic = topics.find(t => t.slug === rel.h) || topics[0];
  const crossPosts = (rel.r || []).map(s => postBySlug.get(s)).filter(Boolean);
  const inlineCross = crossPosts.slice(0, 3);
  const footerCross = crossPosts.slice(3, 6);

  const inlineCrossHtml = inlineCross.length ? `<aside aria-label="Related Bangladesh Legal Guides" style="margin:20px 0 28px;padding:16px 20px;background:#F7F8FA;border-radius:10px;border:1px solid #E2E8F0;border-left:4px solid #132A4A">
    <strong style="display:block;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;color:#132A4A;margin-bottom:8px">Related Statutory Procedures &amp; Guides</strong>
    <ul style="margin:0;padding-left:20px;line-height:1.8">${inlineCross.map(rp => `<li><a href="/blog/${rp.slug}" style="color:#1a56db;font-weight:600">${escHtml(rp.title)}</a></li>`).join('')}</ul>
  </aside>` : '';

  const toc = (post.toc||[]).length ? `<nav style="background:#f4f6fb;padding:16px 20px;border-radius:8px;margin-bottom:28px">
    <strong>📋 In This Article</strong>
    <ol style="margin-top:8px;padding-left:20px">
      ${post.toc.map((h,i)=>{
        const text = typeof h === 'string' ? h : (h?.title || h?.heading || h?.text || '');
        return `<li style="margin:4px 0"><a href="#s${i}" style="color:#1a56db">${escHtml(text)}</a></li>`;
      }).join('')}
    </ol></nav>` : '';

  const midIndex = Math.floor(((post.sections || []).length - 1) / 2);
  const sections = (post.sections||[]).map((s,i)=>{
    let secHtml = `
    <section id="s${i}" style="margin-bottom:32px">
      <h2 style="font-size:22px;font-weight:700;margin-bottom:12px;color:#111">${escHtml(s.h2 || s.heading || s.title || '')}</h2>
      <div style="font-size:15px;color:#333">${s.content||''}</div>
    </section>`;
    if (i === 0 && inlineCrossHtml) secHtml += inlineCrossHtml;
    if (i === midIndex && (post.sections || []).length >= 2) secHtml += MID_ARTICLE_LEAD_EN;
    return secHtml;
  }).join('');

  const faqs = (post.faqs||[]).length ? `<section style="margin-top:32px">
    <h2 style="font-size:22px;font-weight:700;margin-bottom:16px">Frequently Asked Questions</h2>
    ${post.faqs.map(f=>`<div style="margin-bottom:16px;padding:12px 16px;background:#f9f9f9;border-radius:8px">
      <strong style="color:#111">${escHtml(f.question || f.q || '')}</strong>
      <p style="margin:6px 0 0;color:#444;font-size:14px">${escHtml(f.answer || f.a || '')}</p></div>`).join('')}
    </section>` : '';

  const relatedArticlesHtml = (footerCross.length || hubTopic) ? `<section aria-label="Related Articles" style="margin-top:28px;padding:18px 20px;background:#F7F8FA;border-radius:10px;border:1px solid #CBD5E1">
    <h2 style="font-size:18px;font-weight:700;margin-bottom:10px;color:#0B1220">Related Legal Guides &amp; Practice Areas</h2>
    <ul style="margin:0;padding-left:20px;line-height:1.85">
      ${footerCross.map(rp => `<li><a href="/blog/${rp.slug}" style="color:#1a56db;font-weight:600">${escHtml(rp.title)}</a></li>`).join('')}
      ${hubTopic ? `<li><a href="/blog/topic/${hubTopic.slug}" style="color:#0B1220;font-weight:700">Explore all ${escHtml(hubTopic.en)}</a></li>
      <li><a href="/services/${hubTopic.service}" style="color:#1a56db;font-weight:700">Consult ${escHtml(hubTopic.serviceEn)} in Dhaka</a></li>` : ''}
    </ul>
  </section>` : '';

  const directAnswerText = (post.directAnswer || (post.heroIntro || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()).split(/\s+/).slice(0, 58).join(' ');
  const directAnswer = directAnswerText ? `<p class="direct-answer"><strong>Quick Legal Answer:</strong> ${escHtml(directAnswerText)}${directAnswerText.endsWith('.') ? '' : '...'}</p>` : '';

  const breadcrumbNav = `<nav aria-label="Breadcrumb" style="font-size:13px;color:#475569;margin-bottom:14px">
    <a href="/en" style="color:#132A4A">Home</a> &rsaquo; <a href="/blog" style="color:#132A4A">Blog</a>${hubTopic ? ` &rsaquo; <a href="/blog/topic/${hubTopic.slug}" style="color:#132A4A;font-weight:700">${escHtml(hubTopic.shortEn || hubTopic.en)}</a>` : ''}
  </nav>`;

  return `${breadcrumbNav}
<h1 style="font-size:30px;font-weight:700;margin-bottom:8px;color:#0B1220">${escHtml(evergreenYear(post.title))}</h1>
<p style="color:#475569;font-size:14px;margin-bottom:20px">By <a href="/advocate-md-shah-alam" style="color:#132A4A;font-weight:700">Advocate Md. Shah Alam</a> &middot; ${escHtml(post.publishedDate||'')} &middot; ${escHtml(post.readTime||'')}</p>
${directAnswer}
${DISCLAIMER}
<p style="font-size:16px;color:#333;margin-bottom:24px">${escHtml(post.heroIntro||'')}</p>
<article>
${buildPillarAndTableHtml(post, 'en')}${toc}${sections}${faqs}${relatedArticlesHtml}${CONCLUSION_DISCLAIMER_EN}
</article>
<section style="margin-top:32px;padding:18px;background:#F7F8FA;border-radius:8px;border:1px solid #E2E8F0">
  <h2 style="font-size:18px;font-weight:700;margin-bottom:10px;color:#0B1220">Related Legal Resources &amp; Services</h2>
  <p style="font-size:14px;line-height:1.8"><a href="/services/criminal-lawyer">Criminal Defense</a> &middot; <a href="/services/bail-lawyer">Bail &amp; Anticipatory Bail</a> &middot; <a href="/services/divorce-lawyer">Divorce &amp; Family Law</a> &middot; <a href="/services/land-lawyer">Land &amp; Property Law</a> &middot; <a href="/uttara-lawyer">Uttara Lawyer</a> &middot; <a href="/bn/uttara-lawyer">উত্তরা আইনজীবী</a> &middot; <a href="/nrb-legal-help">NRB Legal Help</a> &middot; <a href="/contact">Book Consultation</a></p>
</section>
${CTA}`;
}

function buildBnPostBody(post, postBySlug = new Map()) {
  const rel = relatedBn[post.slug] || {};
  const hubTopic = topics.find(t => t.slug === rel.h) || topics[0];
  const crossPosts = (rel.r || []).map(s => postBySlug.get(s)).filter(Boolean);
  const inlineCross = crossPosts.slice(0, 3);
  const footerCross = crossPosts.slice(3, 6);

  const inlineCrossHtml = inlineCross.length ? `<aside aria-label="সংশ্লিষ্ট আইনি গাইড" style="margin:20px 0 28px;padding:16px 20px;background:#F7F8FA;border-radius:10px;border:1px solid #E2E8F0;border-left:4px solid #132A4A">
    <strong style="display:block;font-size:14px;color:#132A4A;margin-bottom:8px">সংশ্লিষ্ট আইনি প্রক্রিয়া ও নির্দেশিকা</strong>
    <ul style="margin:0;padding-left:20px;line-height:1.8">${inlineCross.map(rp => `<li><a href="/bn/blog/${rp.slug}" style="color:#1a56db;font-weight:600">${escHtml(rp.title)}</a></li>`).join('')}</ul>
  </aside>` : '';

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
    let secHtml = `
    <section id="s${i}" style="margin-bottom:32px">
      <h2 style="font-size:22px;font-weight:700;margin-bottom:12px;color:#111">${escHtml(s.heading || s.h2 || s.title || '')}</h2>
      <div style="font-size:15px;color:#333;line-height:1.8">${s.content || ''}</div>
    </section>`;
    if (i === 0 && inlineCrossHtml) secHtml += inlineCrossHtml;
    if (i === midIndex && (post.sections || []).length >= 2) secHtml += MID_ARTICLE_LEAD_BN;
    return secHtml;
  }).join('');

  const faqs = (post.faqs || []).length ? `<section style="margin-top:32px">
    <h2 style="font-size:22px;font-weight:700;margin-bottom:16px;color:#111">সাধারণ প্রশ্নোত্তর (FAQ)</h2>
    ${post.faqs.map(f => `<div style="margin-bottom:16px;padding:14px 18px;background:#f9f9f9;border-radius:8px;border:1px solid #eee">
      <strong style="color:#111">${escHtml(f.question || f.q || '')}</strong>
      <p style="margin:6px 0 0;color:#444;font-size:14px;line-height:1.7">${escHtml(f.answer || f.a || '')}</p></div>`).join('')}
    </section>` : '';

  const relatedArticlesHtmlBn = (footerCross.length || hubTopic) ? `<section aria-label="সংশ্লিষ্ট নিবন্ধ" style="margin-top:28px;padding:18px 20px;background:#F7F8FA;border-radius:10px;border:1px solid #CBD5E1">
    <h2 style="font-size:18px;font-weight:700;margin-bottom:10px;color:#0B1220">সংশ্লিষ্ট আইনি নিবন্ধ ও সেবা</h2>
    <ul style="margin:0;padding-left:20px;line-height:1.9">
      ${footerCross.map(rp => `<li><a href="/bn/blog/${rp.slug}" style="color:#1a56db;font-weight:600">${escHtml(rp.title)}</a></li>`).join('')}
      ${hubTopic ? `<li><a href="/bn/blog/topic/${hubTopic.slug}" style="color:#0B1220;font-weight:700">সব ${escHtml(hubTopic.bn)} দেখুন</a></li>
      <li><a href="/bn/services/${hubTopic.service}" style="color:#1a56db;font-weight:700">ঢাকায় ${escHtml(hubTopic.serviceBn)}-এর পরামর্শ নিন</a></li>` : ''}
    </ul>
  </section>` : '';

  const directAnswerBnText = (post.directAnswer || (post.heroIntro || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()).split(/\s+/).slice(0, 58).join(' ');
  const directAnswerBn = directAnswerBnText ? `<p class="direct-answer"><strong>সংক্ষিপ্ত আইনি উত্তর:</strong> ${escHtml(directAnswerBnText)}${directAnswerBnText.endsWith('।') ? '' : '...'}</p>` : '';

  const breadcrumbNavBn = `<nav aria-label="Breadcrumb" style="font-size:13px;color:#475569;margin-bottom:14px">
    <a href="/" style="color:#132A4A">হোম</a> &rsaquo; <a href="/bn/blog" style="color:#132A4A">বাংলা ব্লগ</a>${hubTopic ? ` &rsaquo; <a href="/bn/blog/topic/${hubTopic.slug}" style="color:#132A4A;font-weight:700">${escHtml(hubTopic.shortBn || hubTopic.bn)}</a>` : ''}
  </nav>`;

  return `${breadcrumbNavBn}
<h1 style="font-size:30px;font-weight:700;margin-bottom:8px;color:#0B1220">${escHtml(evergreenYear(post.title || ''))}</h1>
<p style="color:#475569;font-size:14px;margin-bottom:20px">লেখক: <a href="/advocate-md-shah-alam" style="color:#132A4A;font-weight:700">অ্যাডভোকেট মো. শাহ আলম</a> &middot; ${escHtml(post.publishedDate || '')} &middot; ${escHtml(post.readTime || '')}</p>
${directAnswerBn}
${BN_DISCLAIMER}
<p style="font-size:16px;color:#333;margin-bottom:24px;line-height:1.8">${escHtml(post.heroIntro || '')}</p>
<article>
${buildPillarAndTableHtml(post, 'bn')}${quickAns}${toc}${sections}${faqs}${relatedArticlesHtmlBn}${CONCLUSION_DISCLAIMER_BN}
</article>
<section style="margin-top:32px;padding:18px;background:#F7F8FA;border-radius:8px;border:1px solid #E2E8F0">
  <h2 style="font-size:18px;font-weight:700;margin-bottom:10px;color:#0B1220">সংশ্লিষ্ট আইনি সেবা ও পরামর্শ</h2>
  <p style="font-size:14px;line-height:1.8"><a href="/bn/services/criminal-lawyer">ফৌজদারি আইনজীবী</a> &middot; <a href="/bn/services/bail-lawyer">জামিন আইনজীবী</a> &middot; <a href="/bn/services/divorce-lawyer">তালাক ও পারিবারিক আইন</a> &middot; <a href="/bn/services/land-lawyer">জমি ও সম্পত্তি আইন</a> &middot; <a href="/bn/uttara-lawyer">উত্তরা আইনজীবী</a> &middot; <a href="/uttara-lawyer">Uttara Lawyer</a> &middot; <a href="/nrb-legal-help">প্রবাসী (NRB) আইনি সহায়তা</a> &middot; <a href="/bn/contact">চেম্বারে যোগাযোগ</a></p>
</section>
${BN_CTA}`;
}

// ── service page static HTML builder (shared single source of truth) ──────────
function buildServiceStaticBody(d, isBn) {
  const homeLabel = isBn ? 'হোম' : 'Home';
  const homeHref = isBn ? '/' : '/en';
  const servicesLabel = isBn ? 'আইনি সেবাসমূহ' : 'Legal Services';
  const servicesHref = isBn ? '/#services' : '/en#services';

  const breadcrumbHtml = `<nav aria-label="Breadcrumb" style="font-size:13px;color:#475569;margin-bottom:14px"><a href="${homeHref}" style="color:#132A4A">${homeLabel}</a> &rsaquo; <a href="${servicesHref}" style="color:#132A4A">${servicesLabel}</a> &rsaquo; <span>${escHtml(d.h1)}</span></nav>`;

  const directAnswerHtml = d.directAnswer
    ? `<p class="direct-answer" style="padding:14px 18px;border-left:4px solid #C9A227;background:#F7F8FA;border-radius:8px;font-size:16px;line-height:1.7;margin:0 0 18px">${escHtml(d.directAnswer)}</p>`
    : '';

  const introHtml = d.intro ? `<p style="font-size:15px;line-height:1.8;color:#334155;margin-bottom:20px">${d.intro}</p>` : '';

  const glanceHtml = d.atAGlance?.length
    ? `<section style="margin:20px 0;padding:16px;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:10px">
  <h2 style="font-size:18px;font-weight:700;margin:0 0 12px;color:#0B1220">${isBn ? 'এক নজরে গুরুত্বপূর্ণ তথ্য' : 'Legal Service At a Glance'}</h2>
  <ul style="padding-left:20px;margin:0;line-height:1.9;color:#1E293B">
    ${d.atAGlance.map(g => `<li><strong>${escHtml(g.label)}:</strong> ${escHtml(g.value)}</li>`).join('\n    ')}
  </ul>
</section>`
    : '';

  const sectionsHtml = (d.sections || []).map(sec => `
<section style="margin:22px 0">
  <h2 style="font-size:21px;font-weight:700;margin:0 0 10px;color:#0B1220">${escHtml(sec.heading)}</h2>
  <div style="font-size:15px;line-height:1.8;color:#334155">${sec.html}</div>
</section>`).join('');

  const feeTableHtml = d.feeTable
    ? `<section style="margin:24px 0">
  <h2 style="font-size:21px;font-weight:700;margin:0 0 8px;color:#0B1220">${escHtml(d.feeTable.heading)}</h2>
  ${d.feeTable.note ? `<p style="font-size:13px;color:#475569;font-style:italic;margin:0 0 12px">${escHtml(d.feeTable.note)}</p>` : ''}
  <table style="width:100%;border-collapse:collapse;font-size:14px;background:#fff;border:1px solid #CBD5E1">
    <thead><tr style="background:#132A4A;color:#fff">${d.feeTable.columns.map(c => `<th style="padding:10px;text-align:left">${escHtml(c)}</th>`).join('')}</tr></thead>
    <tbody>${d.feeTable.rows.map(r => `<tr style="border-top:1px solid #E2E8F0">${r.map(cell => `<td style="padding:10px">${escHtml(cell)}</td>`).join('')}</tr>`).join('')}</tbody>
  </table>
</section>`
    : '';

  const procedureHtml = d.procedure
    ? `<section style="margin:22px 0">
  <h2 style="font-size:20px;font-weight:700;margin:0 0 10px;color:#0B1220">${escHtml(d.procedure.heading)}</h2>
  <ol style="padding-left:22px;line-height:1.9;color:#334155">${d.procedure.steps.map(st => `<li>${escHtml(st)}</li>`).join('')}</ol>
</section>`
    : '';

  const docsHtml = d.documentsChecklist
    ? `<section style="margin:22px 0">
  <h2 style="font-size:20px;font-weight:700;margin:0 0 10px;color:#0B1220">${escHtml(d.documentsChecklist.heading)}</h2>
  <ul style="padding-left:22px;line-height:1.9;color:#334155">${d.documentsChecklist.items.map(it => `<li>${escHtml(it)}</li>`).join('')}</ul>
</section>`
    : '';

  const caseNoteHtml = d.caseNote
    ? `<div style="margin:20px 0;padding:16px;border-left:4px solid #C9A227;background:#F8FAFC;border-radius:8px">
  <strong style="display:block;color:#0B1220;margin-bottom:6px">${escHtml(d.caseNote.title)}</strong>
  <p style="margin:0;color:#334155;font-size:14px;line-height:1.75">${escHtml(d.caseNote.body)}</p>
</div>`
    : '';

  const coverageHtml = d.coverage?.length
    ? `<section style="margin:22px 0">
  <h2 style="font-size:20px;font-weight:700;margin:0 0 10px;color:#0B1220">${isBn ? 'মূল আইনি সেবা ক্ষেত্রসমূহ' : 'What We Cover'}</h2>
  <ul style="padding-left:22px;line-height:1.9;color:#334155">${d.coverage.map(c => `<li>${escHtml(c)}</li>`).join('')}</ul>
  ${d.contextNote ? `<p style="margin-top:10px;color:#334155;font-size:14px">${d.contextNote}</p>` : ''}
</section>`
    : '';

  const faqHtml = d.faqItems?.length
    ? `<section style="margin:24px 0">
  <h2 style="font-size:21px;font-weight:700;margin:0 0 12px;color:#0B1220">${isBn ? 'সাধারণ জিজ্ঞাসা (FAQ)' : 'Frequently Asked Questions'}</h2>
  ${d.faqItems.map(f => `<div style="margin:10px 0;padding:14px;background:#F7F8FA;border:1px solid #E2E8F0;border-radius:8px">
    <h3 style="font-size:16px;font-weight:700;color:#0B1220;margin:0 0 6px">${escHtml(f.q)}</h3>
    <p style="margin:0;color:#334155;font-size:14px;line-height:1.75">${escHtml(f.a)}</p>
  </div>`).join('')}
</section>`
    : '';

  const linksHtml = (d.relatedBlogLinks?.length || d.relatedServices?.length)
    ? `<section style="margin:22px 0">
  ${d.relatedBlogLinks?.length ? `<h2 style="font-size:19px;font-weight:700;margin:0 0 10px;color:#0B1220">${isBn ? 'সংশ্লিষ্ট আইনি গাইড ও প্রবন্ধ' : 'Further Reading'}</h2>
  <ul style="padding-left:20px;line-height:1.9">${d.relatedBlogLinks.map(l => `<li><a href="${l.to}" style="color:#1a56db">${escHtml(l.title)}</a></li>`).join('')}</ul>` : ''}
  ${d.relatedServices?.length ? `<h2 style="font-size:19px;font-weight:700;margin:18px 0 10px;color:#0B1220">${isBn ? 'অন্যান্য আইনি সেবাসমূহ' : 'Other Legal Services in Bangladesh'}</h2>
  <ul style="padding-left:20px;line-height:1.9">${d.relatedServices.map(s => `<li><a href="${s.to}" style="color:#1a56db">${escHtml(s.label)}</a></li>`).join('')}</ul>` : ''}
</section>`
    : '';

  return `<article>
${breadcrumbHtml}
<h1 style="font-size:28px;font-weight:700;margin-bottom:14px;color:#0a0a0a">${escHtml(d.h1)}</h1>
${directAnswerHtml}
${introHtml}
${glanceHtml}
${sectionsHtml}
<p style="font-size:14px;color:#334155;margin:16px 0">${isBn ? 'উত্তরা, গুলশান, বনানী ও বসুন্ধরা চেম্বার সেবা: <a href="/bn/uttara-lawyer" style="color:#1a56db;font-weight:600">উত্তরা আইনজীবী (সেক্টর ১২)</a> &middot; <a href="/uttara-lawyer" style="color:#1a56db">English</a>' : 'Local chamber services for Uttara, Gulshan, Banani &amp; Bashundhara: <a href="/uttara-lawyer" style="color:#1a56db;font-weight:600">Uttara Lawyer (Sector 12)</a> &middot; <a href="/bn/uttara-lawyer" style="color:#1a56db">বাংলা</a>'}</p>
${feeTableHtml}
${procedureHtml}
${docsHtml}
${caseNoteHtml}
${coverageHtml}
${faqHtml}
${linksHtml}
<div style="margin:20px 0;padding:14px 18px;background:#F8FAFC;border-left:4px solid #C9A227;border-radius:8px;color:#0B1220;font-size:14px;line-height:1.7">
  ${isBn
    ? '<strong>প্রথম পরামর্শ ফ্রি।</strong> WhatsApp বা ফোনে আপনার মামলার কথা বলুন — কোনো ফি ছাড়াই আমি প্রথম মতামত দেব। কাজ এগোলে তখন ফি নির্ধারিত হবে।'
    : '<strong>First consultation is free.</strong> Share your case details on WhatsApp or phone — you will receive an initial legal opinion at no charge. Fees apply only when formal work proceeds.'}
</div>
${isBn ? BN_CTA : CTA}
${isBn ? CONCLUSION_DISCLAIMER_BN : CONCLUSION_DISCLAIMER_EN}
</article>`;
}

// ── page-specific content builders ────────────────────────────────────────────

function homeBodyBn() {
  const serviceList = services.items.map(s =>
    `<li style="margin-bottom:8px"><a href="/bn${s.link}" style="color:#1a56db;font-weight:600">${escHtml(s.titleBn || s.title)}</a> — ${escHtml(s.descBn || s.desc)}</li>`
  ).join('');

  const faqList = faq.items.map(f =>
    `<div style="margin-bottom:16px;padding:12px 16px;background:#f9f9f9;border-radius:8px">
      <strong style="color:#111">${escHtml(f.q_bn || f.q)}</strong>
      <p style="margin:6px 0 0;color:#444;font-size:14px">${escHtml(f.a_bn || f.a)}</p>
    </div>`
  ).join('');

  return `
<h2 style="font-size:26px;font-weight:700;margin-bottom:8px;color:#0a0a0a">বিশ্বস্ত আইনজীবী বাংলাদেশ — এডভোকেট মোঃ শাহ আলম</h2>
<p style="font-size:16px;color:#444;margin-bottom:16px">ফৌজদারি, পারিবারিক, জামিন ও জমি সংক্রান্ত মামলার অভিজ্ঞ আইনজীবী। চেম্বার: উত্তরা, ঢাকা।</p>
<div style="margin:0 0 24px;padding:14px 18px;background:#F8FAFC;border-left:4px solid #C9A227;border-radius:8px;color:#0B1220;font-size:14px;line-height:1.7"><strong>প্রথম পরামর্শ ফ্রি।</strong> WhatsApp বা ফোনে আপনার মামলার কথা বলুন — কোনো অগ্রিম ফি ছাড়াই আমি প্রথম আইনি মতামত দেব। কাজ এগোলে চেম্বারে এসে কাগজপত্র দেখানোর পর ফি নির্ধারিত হবে।</div>

<section style="margin-bottom:32px">
  <h2 style="font-size:22px;font-weight:700;margin-bottom:12px;color:#111">আমাদের সম্পর্কে</h2>
  ${aboutBn.bio.map(p=>`<p style="color:#333;margin-bottom:12px">${escHtml(p)}</p>`).join('')}
  <blockquote style="border-left:4px solid #c6a75e;padding:12px 16px;margin:16px 0;color:#555;font-style:italic">
    "${escHtml(aboutBn.personalNote)}" — <strong>${escHtml(aboutBn.personalNoteAuthor)}</strong>
  </blockquote>
</section>

<section style="margin-bottom:32px">
  <h2 style="font-size:22px;font-weight:700;margin-bottom:12px;color:#111">আইনি সেবাসমূহ</h2>
  <ul style="padding-left:20px;list-style:none">
    ${serviceList}
  </ul>
</section>

<section style="margin-bottom:32px">
  <h2 style="font-size:22px;font-weight:700;margin-bottom:16px;color:#111">আপনার জিজ্ঞাসা (FAQ)</h2>
  ${faqList}
</section>

<section style="margin-bottom:32px">
  <h2 style="font-size:22px;font-weight:700;margin-bottom:12px;color:#111">চেম্বার ও যোগাযোগ</h2>
  <ul style="padding-left:20px;color:#333;line-height:2">
    <li><strong>ফোন:</strong> <a href="tel:+8801712655546" style="color:#1a56db">+880 1712-655546</a></li>
    <li><strong>WhatsApp:</strong> <a href="https://wa.me/8801955802007" style="color:#25D366">+880 1955-802007</a></li>
    <li><strong>ইমেইল:</strong> <a href="mailto:contact@advmdshahalam.me" style="color:#1a56db">contact@advmdshahalam.me</a></li>
    <li><strong>উত্তরা সন্ধ্যা চেম্বার:</strong> বাড়ি ৪৬, রাস্তা ৬/বি, সেক্টর ১২, উত্তরা, ঢাকা-১২৩০</li>
    <li><strong>জজ কোর্ট চেম্বার:</strong> আইনজীবী সমিতি ভবন, ১ম তলা (হল রুম), ৬/৭ কোর্ট হাউস স্ট্রিট, কোতোয়ালি, ঢাকা</li>
    <li><strong>অফিস সময়:</strong> রবিবার – বৃহস্পতিবার: সকাল ৮:০০ – রাত ১০:০০; শুক্র – শনিবার (উত্তরা চেম্বার): সকাল ১০:০০ – রাত ১০:০০</li>
  </ul>
</section>
<nav aria-label="Site Directory" style="margin-top:24px;padding:16px;background:#F7F8FA;border-radius:8px">
  <a href="/en">English Home</a> &middot; <a href="/advocate-md-shah-alam">Advocate Md. Shah Alam</a> &middot; <a href="/education">Education</a> &middot; <a href="/blog">English Blog</a> &middot; <a href="/bn/blog">বাংলা ব্লগ</a> &middot; <a href="/nrb-legal-help">NRB Legal Help</a> &middot; <a href="/contact">Contact</a> &middot; <a href="/bn/contact">যোগাযোগ</a> &middot; <a href="/review">Client Reviews</a> &middot; <a href="/privacy-policy">Privacy Policy</a> &middot; <a href="/terms-of-service">Terms of Service</a> &middot; <a href="/services/criminal-lawyer">Criminal</a> &middot; <a href="/services/bail-lawyer">Bail</a> &middot; <a href="/services/divorce-lawyer">Divorce</a> &middot; <a href="/services/land-lawyer">Land</a> &middot; <a href="/services/supreme-court-lawyer">Supreme Court</a> &middot; <a href="/services/company-corporate-lawyer">Corporate</a> &middot; <a href="/services/tax-lawyer">Tax</a> &middot; <a href="/bn/services/criminal-lawyer">ফৌজদারি</a> &middot; <a href="/bn/services/bail-lawyer">জামিন</a> &middot; <a href="/bn/services/divorce-lawyer">তালাক</a> &middot; <a href="/bn/services/land-lawyer">জমি</a> &middot; <a href="/bn/services/supreme-court-lawyer">সুপ্রিম কোর্ট</a> &middot; <a href="/bn/services/company-corporate-lawyer">কর্পোরেট</a> &middot; <a href="/bn/services/tax-lawyer">আয়কর ও ভ্যাট</a>
</nav>`;
}

function homeBody() {
  const serviceList = services.items.map(s =>
    `<li style="margin-bottom:8px"><a href="${s.link}" style="color:#1a56db;font-weight:600">${escHtml(s.title)}</a> — ${escHtml(s.desc)}</li>`
  ).join('');

  const faqList = faq.items.map(f =>
    `<div style="margin-bottom:16px;padding:12px 16px;background:#f9f9f9;border-radius:8px">
      <strong style="color:#111">${escHtml(f.q)}</strong>
      <p style="margin:6px 0 0;color:#444;font-size:14px">${escHtml(f.a)}</p>
    </div>`
  ).join('');

  return `
<h2 style="font-size:26px;font-weight:700;margin-bottom:8px;color:#0a0a0a">Trusted Lawyer in Bangladesh – Advocate Md. Shah Alam</h2>
<p style="font-size:16px;color:#444;margin-bottom:24px">Experienced Criminal, Divorce &amp; Bail Lawyer with Chamber in Uttara, Dhaka — Serving Clients Across Bangladesh.</p>

<section style="margin-bottom:32px">
  <h2 style="font-size:22px;font-weight:700;margin-bottom:12px;color:#111">About Advocate Md. Shah Alam</h2>
  ${about.bio.map(p=>`<p style="color:#333;margin-bottom:12px">${escHtml(p)}</p>`).join('')}
  <blockquote style="border-left:4px solid #c6a75e;padding:12px 16px;margin:16px 0;color:#555;font-style:italic">
    "${escHtml(about.quote)}" — <strong>${escHtml(about.quoteAuthor)}</strong>
  </blockquote>
</section>

<section style="margin-bottom:32px">
  <h2 style="font-size:22px;font-weight:700;margin-bottom:12px;color:#111">Practice Areas</h2>
  <ul style="padding-left:20px;list-style:none">
    ${serviceList}
  </ul>
</section>

<section style="margin-bottom:32px">
  <h2 style="font-size:22px;font-weight:700;margin-bottom:16px;color:#111">Frequently Asked Legal Questions</h2>
  ${faqList}
</section>

<section style="margin-bottom:32px">
  <h2 style="font-size:22px;font-weight:700;margin-bottom:12px;color:#111">Contact & Location</h2>
  <ul style="padding-left:20px;color:#333;line-height:2">
    <li><strong>Phone:</strong> <a href="tel:+8801712655546" style="color:#1a56db">+880 1712-655546</a></li>
    <li><strong>WhatsApp:</strong> <a href="https://wa.me/8801955802007" style="color:#25D366">+880 1955-802007</a></li>
    <li><strong>Email:</strong> <a href="mailto:contact@advmdshahalam.me" style="color:#1a56db">contact@advmdshahalam.me</a></li>
    <li><strong>Uttara Chamber:</strong> House 46, Road 6/B, Sector 12, Uttara West, Dhaka-1230</li>
    <li><strong>Court Chamber:</strong> Ainjeebi Samity Bhaban, 4th Floor, 6/7 Court House Street, Kotwali, Dhaka-1100</li>
    <li><strong>Office Hours:</strong> Sunday – Thursday: 8:00 AM – 10:00 PM; Friday – Saturday (Uttara Chamber): 10:00 AM – 10:00 PM</li>
  </ul>
</section>`;
}

function advocateBody() {
  return `
<div style="display:flex;flex-wrap:wrap;gap:24px;align-items:center;margin-bottom:28px">
  <img src="/images/hero/hero-md-shah-alam.png" alt="Advocate Md. Shah Alam — Supreme Court Lawyer Bangladesh" width="220" height="223" style="border-radius:16px;border:2px solid #c6a75e;object-fit:cover;box-shadow:0 8px 24px rgba(0,0,0,0.15);max-width:100%;height:auto" />
  <div>
    <h1 style="font-size:30px;font-weight:700;margin-bottom:8px;color:#0a0a0a">${escHtml(pageHeadings.advocate)}</h1>
    <p style="font-size:16px;color:#555;margin-bottom:12px">LL.M (Dhaka International University) | Enrolled: Bangladesh Bar Council | Supreme Court of Bangladesh</p>
    <p style="font-size:14px;color:#777">Supreme Court &amp; Judge Court Advocate with 10+ years of legal practice in Uttara, Dhaka, Bangladesh.</p>
  </div>
</div>

<section style="margin-bottom:28px">
  <h2 style="font-size:22px;font-weight:700;margin-bottom:12px;color:#111">Professional Profile</h2>
  ${about.bio.map(p=>`<p style="color:#333;margin-bottom:12px">${escHtml(p)}</p>`).join('')}
  <blockquote style="border-left:4px solid #c6a75e;padding:12px 16px;margin:16px 0;color:#555;font-style:italic">
    "${escHtml(about.quote)}"
  </blockquote>
</section>

<section style="margin-bottom:28px">
  <h2 style="font-size:22px;font-weight:700;margin-bottom:12px;color:#111">Education & Qualifications</h2>
  <ul style="padding-left:20px;color:#333;line-height:2">
    <li><strong>LL.M</strong> — Dhaka International University</li>
    <li><strong>LL.B &amp; Bar Council</strong> — Metro Police Ideal Law College, Dhaka</li>
    <li><strong>LL.B</strong> — Gazipur Law College, Gazipur</li>
    <li><strong>BBA, MBA</strong> — Asian University of Bangladesh</li>
    <li><strong>HSC, BA</strong> — Tongi Govt. University &amp; College</li>
    <li><strong>SSC</strong> — Maligram High School, Bhanga, Faridpur</li>
  </ul>
</section>

<section style="margin-bottom:28px">
  <h2 style="font-size:22px;font-weight:700;margin-bottom:12px;color:#111">Professional Memberships</h2>
  <ul style="padding-left:20px;color:#333;line-height:2">
    <li>Bangladesh Bar Council (Enrolled Advocate)</li>
    <li>Authorised to practise at the Supreme Court of Bangladesh</li>
    <li>APP Metro Sessions Court, Dhaka</li>
  </ul>
</section>

<section style="margin-bottom:28px">
  <h2 style="font-size:22px;font-weight:700;margin-bottom:12px;color:#111">Practice Areas</h2>
  <ul style="padding-left:20px;color:#333;line-height:2">
    ${services.items.map(s=>`<li><a href="${s.link}" style="color:#1a56db">${escHtml(s.title)}</a> — ${escHtml(s.desc)}</li>`).join('')}
  </ul>
</section>

<section style="margin-bottom:28px">
  <h2 style="font-size:22px;font-weight:700;margin-bottom:12px;color:#111">Courts, Tribunals &amp; Consultation Process</h2>
  <p style="color:#333;margin-bottom:12px;line-height:1.8">Advocate Md. Shah Alam regularly appears before the High Court Division of the Supreme Court of Bangladesh, the Dhaka Chief Metropolitan Magistrate (CMM) and Chief Judicial Magistrate (CJM) Courts, the Metropolitan Sessions Judge Court, Family Courts, Land Survey Tribunals, and Special Tribunals across Dhaka and Gazipur. Whether representing resident clients in Dhaka or Non-Resident Bangladeshis (NRBs) living abroad, every matter is handled with direct statutory precision, verified documentary records, and timely court filings.</p>
  <p style="color:#333;margin-bottom:12px;line-height:1.8"><strong>Legal Practice &amp; Statutory Scope:</strong> Criminal defence and urgent bail advocacy under the Code of Criminal Procedure, 1898 (including Sections 497 and 498 anticipatory bail, Section 54 remand protection, and Section 138 Negotiable Instruments Act cheque dishonour defence); land and property litigation under the Specific Relief Act, 1877, Transfer of Property Act, 1882, Registration Act, 1908, and State Acquisition and Tenancy Act, 1950 (title verification, mutation, partition suits, deed cancellation, and Lis Pendens protection); family and inheritance matters under the Muslim Family Laws Ordinance, 1961 and Family Courts Act, 2023 (talaq registration, Denmohor, maintenance, and child custody); corporate and commercial filings before RJSC under the Companies Act, 1994; and constitutional writ petitions under Article 102 of the Constitution of Bangladesh.</p>
</section>

<section style="margin-bottom:28px">
  <h2 style="font-size:22px;font-weight:700;margin-bottom:12px;color:#111">NRB Legal Assistance &amp; Overseas Representation</h2>
  <p style="color:#333;margin-bottom:12px;line-height:1.8">A substantial portion of the chamber's work supports Non-Resident Bangladeshis (NRBs) residing in the United Kingdom, United States, Canada, the UAE, Saudi Arabia, and Europe. Distance often complicates routine property verification, Sub-Registry deed retrieval, Embassy-attested Power of Attorney execution, inheritance partition, and overseas divorce recognition under Section 13 of the Code of Civil Procedure, 1908. Through structured remote coordination, NRB clients can review legal options before travelling to Dhaka. Visit our dedicated <a href="/nrb-legal-help" style="color:#1a56db;font-weight:600">NRB Legal Help Desk</a> for step-by-step guidance.</p>
</section>

<section style="margin-bottom:28px;padding:18px 20px;background:#F8FAFC;border-left:4px solid #C9A227;border-radius:8px">
  <h2 style="font-size:20px;font-weight:700;margin-bottom:10px;color:#0B1220">Free Initial Consultation (EN &amp; BN)</h2>
  <p style="color:#1E293B;margin-bottom:10px;line-height:1.75"><strong>First Consultation is Free.</strong> Share your case details on WhatsApp (+880 1955-802007) or phone (+880 1712-655546) — you will receive an initial legal opinion at no charge and with no advance payment. Chamber fees apply only when you visit the chamber with documents or proceed with formal legal representation.</p>
  <p style="color:#1E293B;margin-bottom:0;line-height:1.75"><strong>প্রথম পরামর্শ ফ্রি।</strong> কোনো অগ্রিম ফি ছাড়াই WhatsApp বা ফোনে আপনার মামলার কথা বলুন — আমি প্রথম আইনি মতামত দেব। কাগজপত্র নিয়ে চেম্বারে এসে মামলা বা দলিলের কাজ শুরু করলে তখন চেম্বার ফি নির্ধারিত হবে।</p>
</section>

<section style="margin-bottom:28px">
  <h2 style="font-size:22px;font-weight:700;margin-bottom:12px;color:#111">Chambers, Office Hours &amp; Get in Touch</h2>
  <ul style="padding-left:20px;color:#333;line-height:2">
    <li><strong>Uttara Chamber:</strong> House 46, Road 6/B, Sector 12, Uttara West, Dhaka 1230, Bangladesh</li>
    <li><strong>Judge Court Chamber:</strong> Lawyers Association Building, 4th Floor, 6/7 Court House Street, Kotwali, Dhaka 1100</li>
    <li><strong>Consultation Hours:</strong> Sunday – Thursday: 8:00 AM – 10:00 PM; Friday – Saturday (Uttara Chamber): 10:00 AM – 10:00 PM</li>
    <li><strong>Phone:</strong> <a href="tel:+8801712655546" style="color:#1a56db">+880 1712-655546</a> · <strong>WhatsApp:</strong> <a href="https://wa.me/8801955802007" style="color:#1a56db">+880 1955-802007</a></li>
    <li><strong>Direct Intake:</strong> <a href="/contact" style="color:#1a56db;font-weight:600">Contact Chamber &amp; Book Free Initial Consultation →</a></li>
  </ul>
</section>
${CTA}`;
}

function blogIndexBody(posts, lang='en') {
  const prefix = lang === 'bn' ? '/bn/blog' : '/blog';
  const totalPages = Math.max(1, Math.ceil(posts.length / 24));
  const recentPosts = posts.slice(0, 24);
  const listItems = recentPosts.map(p => {
    const path = `${prefix}/${p.slug}`;
    return `<li style="margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid #eee">
      <a href="${path}" style="color:#132A4A;font-weight:600;font-size:15px">${escHtml(p.title||p.metaTitle||p.slug)}</a>
      ${p.publishedDate ? `<span style="color:#64748b;font-size:13px;margin-left:8px">${p.publishedDate}</span>` : ''}
      ${p.heroIntro ? `<p style="color:#475569;font-size:14px;margin:4px 0 0">${escHtml(p.heroIntro.slice(0,120))}…</p>` : ''}
    </li>`;
  }).join('');

  const pageNav = Array.from({ length: totalPages }, (_, i) => {
    const n = i + 1;
    const href = n === 1 ? prefix : `${prefix}/page/${n}`;
    return `<a href="${href}" style="padding:6px 12px;border:1px solid #CBD5E1;border-radius:6px;margin:2px;display:inline-block;${n === 1 ? 'background:#132A4A;color:#fff;font-weight:700' : 'color:#132A4A'}">${n}</a>`;
  }).join(' ');

  const topicNav = topics.map(t => `<a href="${prefix}/topic/${t.slug}" style="padding:6px 12px;background:#F7F8FA;border:1px solid #CBD5E1;border-radius:6px;margin:3px;display:inline-block;color:#132A4A;font-size:13px;font-weight:600">${escHtml(lang === 'bn' ? t.shortBn : t.shortEn)}</a>`).join(' ');

  if (lang === 'bn') return `
<h1 style="font-size:28px;font-weight:700;margin-bottom:8px;color:#0B1220">${escHtml(pageHeadings.blogBn)}</h1>
<p style="color:#475569;margin-bottom:16px">বাংলাদেশের আইন বিষয়ক বিস্তারিত নিবন্ধ। ফৌজদারি, তালাক, জামিন, জমি-জমা, কোম্পানি ও সুপ্রিম কোর্ট আইন।</p>
<nav aria-label="Topics" style="margin-bottom:20px">${topicNav}</nav>
<ul style="padding-left:0;list-style:none">${listItems}</ul>
<nav aria-label="Pagination" style="margin-top:24px">${pageNav}</nav>`;

  return `
<h1 style="font-size:28px;font-weight:700;margin-bottom:8px;color:#0B1220">${escHtml(pageHeadings.blogEn)}</h1>
<p style="color:#475569;margin-bottom:16px">Detailed legal articles on Bangladesh criminal law, divorce, bail, property, company law, and Supreme Court procedures — written by an experienced Dhaka lawyer.</p>
<nav aria-label="Topics" style="margin-bottom:20px">${topicNav}</nav>
<ul style="padding-left:0;list-style:none">${listItems}</ul>
<nav aria-label="Pagination" style="margin-top:24px">${pageNav}</nav>`;
}

function educationBody() {
  return `
<h1 style="font-size:28px;font-weight:700;margin-bottom:8px;color:#0a0a0a">${escHtml(pageHeadings.education)}</h1>
<p style="color:#555;margin-bottom:24px">A comprehensive timeline of academic achievements, professional milestones, and legal service to the nation.</p>
<section style="margin-bottom:28px">
  <h2 style="font-size:22px;font-weight:700;margin-bottom:12px;color:#111">Academic Qualifications</h2>
  <ul style="padding-left:20px;color:#333;line-height:2.2">
    <li><strong>LL.M (Master of Laws)</strong> — Dhaka International University</li>
    <li><strong>LL.B &amp; Bar Council Enrolment</strong> — Metro Police Ideal Law College, Dhaka</li>
    <li><strong>LL.B</strong> — Gazipur Law College, Gazipur</li>
    <li><strong>BBA &amp; MBA</strong> — Asian University of Bangladesh</li>
    <li><strong>HSC &amp; BA</strong> — Tongi Govt. University &amp; College</li>
    <li><strong>SSC</strong> — Maligram High School, Bhanga, Faridpur</li>
  </ul>
</section>
<section style="margin-bottom:28px">
  <h2 style="font-size:22px;font-weight:700;margin-bottom:12px;color:#111">Professional Career</h2>
  <ul style="padding-left:20px;color:#333;line-height:2.2">
    <li>Enrolled as Advocate with <strong>Bangladesh Bar Council</strong></li>
    <li>Practising at the <strong>Supreme Court of Bangladesh</strong> — High Court Division &amp; Appellate Division</li>
    <li>APP (Assistant Public Prosecutor) — <strong>Metro Sessions Court, Dhaka</strong></li>
    <li>10+ years of continuous legal practice across Bangladesh (enrolled since 2015)</li>
    <li>5,000+ cases handled — criminal, civil, family, land, and corporate</li>
  </ul>
</section>
<section style="margin-bottom:28px">
  <h2 style="font-size:22px;font-weight:700;margin-bottom:12px;color:#111">Areas of Legal Practice</h2>
  <ul style="padding-left:20px;color:#333;line-height:2">
    ${services.items.map(s=>`<li><a href="${s.link}" style="color:#1a56db">${escHtml(s.title)}</a> — ${escHtml(s.desc)}</li>`).join('')}
  </ul>
</section>
<section style="margin-bottom:28px">
  <h2 style="font-size:22px;font-weight:700;margin-bottom:12px;color:#111">Bar Enrollment, Advocacy Training &amp; Judicial Practice</h2>
  <p style="color:#333;margin-bottom:12px;line-height:1.8">Following his LL.B and LL.M degrees, Advocate Md. Shah Alam completed formal pupillage and passed the Bangladesh Bar Council enrolment examinations in 2015, earning admission to practise before the District and Sessions Judge Courts, Metropolitan Magistrate Courts, Family Courts, and Special Tribunals across Bangladesh. He subsequently obtained permission to practise before the High Court Division of the Supreme Court of Bangladesh, handling constitutional writ petitions under Article 102, anticipatory bail applications under Section 498 CrPC, criminal appeals, and company matters.</p>
  <p style="color:#333;margin-bottom:12px;line-height:1.8">Serving as Assistant Public Prosecutor (APP) at the Metro Sessions Court, Dhaka further deepened his command of criminal procedure, evidentiary cross-examination, bail jurisprudence, and trial advocacy. Clients can <a href="/advocate-md-shah-alam" style="color:#1a56db;font-weight:600">view his full legal profile</a> or <a href="/contact" style="color:#1a56db;font-weight:600">request a free initial consultation</a> via WhatsApp or phone.</p>
</section>
${CTA}`;
}

const CONTACT_FAQS_EN = [
  {
    q: 'How do I book a chamber consultation appointment?',
    a: 'You can call +880 1712-655546 directly or send your case summary through our WhatsApp intake form (+880 1955-802007) for a free initial online opinion, or schedule an in-person session at our Uttara Sector 12 or Dhaka Judge Court chamber.',
  },
  {
    q: 'Is the initial online consultation free?',
    a: 'Yes, the first online or WhatsApp consultation is free with no advance payment required. If you visit the chamber in person with case documents for detailed drafting, vetting, or court filing, standard chamber fees are discussed transparently at the chamber.',
  },
  {
    q: 'Can I contact urgently for bail or arrest matters?',
    a: 'Yes, urgent criminal defence inquiries involving FIR registration, police custody remand protection, Section 497 surrender petitions, or High Court anticipatory bail are prioritized by phone and WhatsApp.',
  },
];

const CONTACT_FAQS_BN = [
  {
    q: 'আইনি পরামর্শের জন্য কীভাবে অ্যাপয়েন্টমেন্ট নেব?',
    a: 'আপনি সরাসরি 01712655546 নম্বরে কল করে অথবা ওয়েবসাইটের হোয়াটসঅ্যাপ ফর্মে (+880 1955-802007) বার্তা পাঠিয়ে ফ্রি প্রাথমিক পরামর্শ নিতে পারেন কিংবা উত্তরা চেম্বার ও ঢাকা জজ কোর্ট চেম্বারে সাক্ষাতের সময় নির্ধারণ করতে পারেন।',
  },
  {
    q: 'প্রাথমিক অনলাইন পরামর্শের জন্য কি কোনো অগ্রিম ফি দিতে হয়?',
    a: 'না, প্রথম অনলাইন বা হোয়াটসঅ্যাপ পরামর্শ সম্পূর্ণ ফ্রি এবং কোনো অগ্রিম পেমেন্টের প্রয়োজন নেই। পরবর্তীতে জরুরি কাগজপত্র নিয়ে চেম্বারে সাক্ষাৎ করলে বা মামলা পরিচালনার দায়িত্ব দিলে চেম্বারে ফি নির্ধারিত হয়।',
  },
  {
    q: 'জরুরি গ্রেপ্তার, থানা জিডি বা জামিনের ক্ষেত্রে কি দ্রুত যোগাযোগ করা যাবে?',
    a: 'হ্যাঁ, জরুরি ফৌজদারি মামলা, থানা জিডি, পুলিশ রিমান্ড প্রতিরোধ এবং হাইকোর্ট বিভাগে ৪৯৮ ধারায় আগাম জামিনের বিষয়ে হোয়াটসঅ্যাপে বার্তা দিলে বা সরাসরি ফোনে দ্রুত পরামর্শ প্রদান করা হয়।',
  },
];

function contactBody() {
  return `<nav aria-label="Breadcrumb" style="font-size:13px;color:#475569;margin-bottom:14px"><a href="/en" style="color:#132A4A">Home</a> &rsaquo; <span>Contact</span></nav>
<h1 style="font-size:28px;font-weight:700;margin-bottom:8px;color:#0a0a0a">${escHtml(pageHeadings.contactEn)}</h1>
<p style="color:#555;margin-bottom:16px;line-height:1.7">Trusted criminal defence, divorce, High Court bail, land property, tax tribunal, and corporate lawyer in Uttara &amp; Dhaka Judge Court — available 6 days a week for confidential in-chamber and remote consultations.</p>
<div style="margin:14px 0 20px;padding:14px 18px;background:#F8FAFC;border-left:4px solid #C9A227;border-radius:8px;color:#0B1220;font-size:14px;line-height:1.7"><strong>First Consultation is Free.</strong> Share your case details on WhatsApp or phone — you will receive an initial legal opinion at no charge. Fees apply only if you proceed with formal representation or document drafting.</div>

<section style="margin:20px 0">
  <h2 style="font-size:20px;font-weight:700;margin:20px 0 10px">Chamber Locations &amp; Direct Contact Details</h2>
  <ul style="padding-left:20px;color:#333;line-height:2.1">
    <li><strong>Uttara Chamber (Primary Evening Office):</strong> House 46, Road 6/B, Sector 12, Uttara West, Dhaka-1230 — private evening client consultations and case review meetings.</li>
    <li><strong>Court Chamber (Dhaka Judge Court):</strong> Ainjeebi Samity Bhaban, 4th Floor, 6/7 Court House Street, Kotwali, Dhaka-1100 — adjacent to Chief Metropolitan Magistrate and Sessions Courts.</li>
    <li><strong>Direct Phone Hotline:</strong> <a href="tel:+8801712655546" style="color:#1a56db">+880 1712-655546</a> (Sunday – Thursday: 8:00 AM – 10:00 PM; Friday – Saturday (Uttara Chamber): 10:00 AM – 10:00 PM)</li>
    <li><strong>Emergency WhatsApp Desk:</strong> <a href="https://wa.me/8801955802007" style="color:#25D366">+880 1955-802007</a> (available 7 days for urgent inquiries)</li>
    <li><strong>Email:</strong> <a href="mailto:contact@advmdshahalam.me" style="color:#1a56db">contact@advmdshahalam.me</a> · <strong>bKash Paid Review:</strong> 01712655546</li>
  </ul>
</section>

<section style="margin:20px 0">
  <h2 style="font-size:20px;font-weight:700;margin:20px 0 10px">Court Jurisdiction &amp; Remote NRB Representation</h2>
  <p style="color:#334155;line-height:1.8;margin-bottom:10px">Enrolled with the Bangladesh Bar Council since 2015, <a href="/advocate-md-shah-alam" style="color:#1a56db;font-weight:600">Advocate Md. Shah Alam</a> represents clients before the Dhaka Chief Metropolitan &amp; Judicial Magistrate Courts, Metropolitan Sessions Judge Court, Family Courts, Administrative &amp; Cyber Tribunals, and the High Court Division of the Supreme Court of Bangladesh.</p>
  <p style="color:#334155;line-height:1.8">Non-Resident Bangladeshis (NRBs) residing in the UK, USA, Canada, UAE, Saudi Arabia, and Europe can book remote video case evaluations, land deed &amp; khatian title vetting, Embassy-attested Power of Attorney drafts, and overseas divorce or litigation support without travelling to Dhaka through our dedicated <a href="/nrb-legal-help" style="color:#1a56db;font-weight:600">NRB Legal Help Desk</a>.</p>
</section>

<section style="margin:20px 0">
  <h2 style="font-size:20px;font-weight:700;margin:20px 0 10px">Pre-Visit Document Checklist &amp; Indicative Consultation Fee</h2>
  <ul style="padding-left:20px;color:#333;line-height:2">
    <li><strong>Criminal &amp; Bail Matters:</strong> Copy of the FIR, General Diary (GD), charge sheet, arrest memo, or certified lower court rejection order.</li>
    <li><strong>Land &amp; Property Disputes:</strong> Registered sale deeds (Saf Kabala), Bia deeds, CS/SA/RS/BS khatian records, and e-mutation (Namjari) receipts.</li>
    <li><strong>Divorce &amp; Custody Matters:</strong> Registered Kabinnama, municipal talaq notice copies, or foreign court decree where applicable.</li>
    <li><strong>Indicative Consultation &amp; Case Review Fee:</strong> BDT 3,000 (\$30) for structured 45-minute strategy review; BDT 5,000–8,000 (\$50–\$75) for written deed/khatian opinion (indicative only; chamber &amp; court schedules govern). bKash: 01712655546.</li>
  </ul>
</section>

<section style="margin:20px 0">
  <h2 style="font-size:20px;font-weight:700;margin:20px 0 10px">Expert Practice Areas &amp; Service Guides</h2>
  <ul style="padding-left:20px;color:#333;line-height:2">
    ${services.items.map(s=>`<li><a href="${s.link}" style="color:#1a56db">${escHtml(s.title)}</a> — ${escHtml(s.desc)}</li>`).join('')}
  </ul>
</section>

<section style="margin:24px 0">
  <h2 style="font-size:20px;font-weight:700;margin:20px 0 12px">Frequently Asked Questions</h2>
  ${CONTACT_FAQS_EN.map(f => `<div style="margin:10px 0;padding:12px 16px;background:#F7F8FA;border-radius:8px">
    <h3 style="font-size:16px;font-weight:700;margin:0 0 6px;color:#0B1220">${escHtml(f.q)}</h3>
    <p style="margin:0;color:#334155;font-size:14px;line-height:1.7">${escHtml(f.a)}</p>
  </div>`).join('')}
</section>
${CTA}
<p style="margin-top:16px;color:#555;font-size:13px"><strong>Disclaimer:</strong> Contacting us does not create an attorney-client relationship. Information submitted is kept confidential. Advocate Md. Shah Alam is enrolled with the Bangladesh Bar Council.</p>`;
}

function contactBodyBn() {
  return `<nav aria-label="Breadcrumb" style="font-size:13px;color:#475569;margin-bottom:14px"><a href="/" style="color:#132A4A">হোম</a> &rsaquo; <span>যোগাযোগ</span></nav>
<h1 style="font-size:28px;font-weight:700;margin-bottom:8px;color:#0a0a0a">${escHtml(pageHeadings.contactBn)}</h1>
<p style="color:#555;margin-bottom:16px;line-height:1.7">বাংলাদেশ সুপ্রিম কোর্ট ও ঢাকা জজ কোর্টের অভিজ্ঞ আইনজীবীর সাথে ফোন, হোয়াটসঅ্যাপ বা উত্তরা ও কোর্ট চেম্বারে সরাসরি সাক্ষাতের মাধ্যমে ফৌজদারি, জামিন, তালাক, জমি-জমা, কর ও কোম্পানি মামলার পূর্ণাঙ্গ আইনি সমাধান নিশ্চিত করুন।</p>
<div style="margin:14px 0 20px;padding:14px 18px;background:#F8FAFC;border-left:4px solid #C9A227;border-radius:8px;color:#0B1220;font-size:14px;line-height:1.7"><strong>প্রথম পরামর্শ ফ্রি।</strong> WhatsApp বা ফোনে আপনার মামলার কথা বলুন — কোনো ফি ছাড়াই আমি প্রথম মতামত দেব। কাজ এগোলে তখন ফি নির্ধারিত হবে।</div>

<section style="margin:20px 0">
  <h2 style="font-size:20px;font-weight:700;margin:20px 0 10px">চেম্বার ঠিকানা ও সরাসরি যোগাযোগের মাধ্যম</h2>
  <ul style="padding-left:20px;color:#333;line-height:2.1">
    <li><strong>উত্তরা চেম্বার (প্রধান কার্যালয়):</strong> বাড়ি ৪৬, সড়ক ৬/বি, সেক্টর ১২, উত্তরা পশ্চিম, ঢাকা-১২৩০ — সরাসরি আইনি পরামর্শ ও গোপনীয় ক্লায়েন্ট মিটিং চেম্বার।</li>
    <li><strong>কোর্ট চেম্বার (ঢাকা বিচার আদালত):</strong> আইনজীবী সমিতি ভবন, ৪র্থ তলা, ৬/৭ কোর্ট হাউস স্ট্রিট, কোতোয়ালি, ঢাকা-১১০০ — ঢাকা জজ কোর্ট ও মহানগর দায়রা আদালত সংলগ্ন।</li>
    <li><strong>সরাসরি হটলাইন কল:</strong> <a href="tel:+8801712655546" style="color:#1a56db">+880 1712-655546</a> (রবিবার – বৃহস্পতিবার: সকাল ৮:০০ – রাত ১০:০০; শুক্র – শনিবার (উত্তরা চেম্বার): সকাল ১০:০০ – রাত ১০:০০)</li>
    <li><strong>জরুরি হোয়াটসঅ্যাপ:</strong> <a href="https://wa.me/8801955802007" style="color:#25D366">+880 1955-802007</a> (সপ্তাহের ৭ দিন জরুরি সহায়তার জন্য সচল)</li>
    <li><strong>ইমেইল:</strong> <a href="mailto:contact@advmdshahalam.me" style="color:#1a56db">contact@advmdshahalam.me</a> · <strong>বিকাশ পেইড কনসালটেশন:</strong> ০১৭১২৬৫৫৫৪৬</li>
  </ul>
</section>

<section style="margin:20px 0">
  <h2 style="font-size:20px;font-weight:700;margin:20px 0 10px">আদালত অধিক্ষেত্র ও প্রবাসী (NRB) দূরবর্তী সেবা</h2>
  <p style="color:#334155;line-height:1.8;margin-bottom:10px">বাংলাদেশ বার কাউন্সিল ও সুপ্রিম কোর্টে ২০১৫ সাল থেকে তালিকাভুক্ত <a href="/advocate-md-shah-alam" style="color:#1a56db;font-weight:600">অ্যাডভোকেট মো. শাহ আলম</a> ঢাকা চিফ মেট্রোপলিটন ম্যাজিস্ট্রেট (CMM) কোর্ট, মহানগর দায়রা জজ আদালত, পারিবারিক আদালত, বিশেষ ট্রাইব্যুনাল এবং বাংলাদেশ সুপ্রিম কোর্টের হাইকোর্ট ও আপিল বিভাগে মামলা পরিচালনা করেন।</p>
  <p style="color:#334155;line-height:1.8">যুক্তরাজ্য, যুক্তরাষ্ট্র, কানাডা, সংযুক্ত আরব আমিরাত, সৌদি আরব ও ইউরোপে বসবাসরত প্রবাসী বাংলাদেশিরা দেশে না এসেই ভিডিও কলের মাধ্যমে জমি ও খতিয়ান যাচাই, দূতাবাস-সত্যায়িত পাওয়ার অব অ্যাটর্নি, তালাক নোটিশ বা প্রতারণা মামলার আইনি সহায়তা নিতে পারেন আমাদের <a href="/nrb-legal-help" style="color:#1a56db;font-weight:600">প্রবাসী আইনি সহায়তা ডেস্ক</a>-এর মাধ্যমে।</p>
</section>

<section style="margin:20px 0">
  <h2 style="font-size:20px;font-weight:700;margin:20px 0 10px">সাক্ষাতের পূর্বে প্রস্তুতি ও পরামর্শ ফি (আনুমানিক)</h2>
  <ul style="padding-left:20px;color:#333;line-height:2">
    <li><strong>ফৌজদারি ও জামিন মামলা:</strong> এজাহার (FIR), জিডি, চার্জশিট বা নিম্ন আদালতের জামিন নামঞ্জুর আদেশের কপি সঙ্গে রাখুন।</li>
    <li><strong>জমি ও সম্পত্তি বিরোধ:</strong> সিএস/এসএ/আরএস/বিএস খতিয়ান, সর্বশেষ বায়া দলিল এবং ই-নামজারি ডিসিআর কপি।</li>
    <li><strong>পারিবারিক ও তালাক মামলা:</strong> কাবিননামা, সন্তানের জন্ম সনদ ও প্রয়োজনে প্রেরিত তালাক নোটিশের কপি।</li>
    <li><strong>পেইড কেস রিভিউ ও দলিল ভেটিং ফি:</strong> ৪৫ মিনিটের ভিডিও/চেম্বার পরামর্শ (৳৩,০০০ / \$৩০) থেকে বিস্তারিত দলিল যাচাই (৳৮,০০০ / \$৭৫) — আনুমানিক; মামলার জটিলতা অনুযায়ী নির্ধারিত। বিকাশ: ০১৭১২৬৫৫৫৪৬।</li>
  </ul>
</section>

<section style="margin:20px 0">
  <h2 style="font-size:20px;font-weight:700;margin:20px 0 10px">প্রধান আইনি সেবা ক্ষেত্রসমূহ</h2>
  <ul style="padding-left:20px;color:#333;line-height:2">
    ${services.items.map(s=>`<li><a href="/bn${s.link}" style="color:#1a56db">${escHtml(s.titleBn || s.title)}</a> — ${escHtml(s.descBn || s.desc)}</li>`).join('')}
  </ul>
</section>

<section style="margin:24px 0">
  <h2 style="font-size:20px;font-weight:700;margin:20px 0 12px">যোগাযোগ সংক্রান্ত সাধারণ প্রশ্নাবলী (FAQ)</h2>
  ${CONTACT_FAQS_BN.map(f => `<div style="margin:10px 0;padding:12px 16px;background:#F7F8FA;border-radius:8px">
    <h3 style="font-size:16px;font-weight:700;margin:0 0 6px;color:#0B1220">${escHtml(f.q)}</h3>
    <p style="margin:0;color:#334155;font-size:14px;line-height:1.7">${escHtml(f.a)}</p>
  </div>`).join('')}
</section>
${BN_CTA}
<p style="margin-top:16px;color:#555;font-size:13px"><strong>আইনি সতর্কবার্তা:</strong> মেসেজ বা ফোন কল করার মাধ্যমে সরাসরি আইনজীবী-ক্লায়েন্ট চুক্তি গঠিত হয় না। প্রেরিত সকল তথ্য সম্পূর্ণ গোপন রাখা হয়। অ্যাডভোকেট মো. শাহ আলম বাংলাদেশ বার কাউন্সিলের তালিকাভুক্ত আইনজীবী।</p>`;
}

function privacyBody() {
  return `<h1 style="font-size:30px;font-weight:700;margin-bottom:12px;color:#0f172a">${escHtml(pageHeadings.privacy)}</h1>
<p style="color:#64748b;font-size:14px;margin-bottom:24px">Last updated: May 18, 2026</p>
<div style="font-size:15px;color:#334155;line-height:1.8">
  <h2 style="font-size:20px;font-weight:700;margin:24px 0 10px;color:#0f172a">1. Introduction</h2>
  <p>Welcome to <strong>advmdshahalam.me</strong> ("Website"), operated by <strong>Advocate Md. Shah Alam</strong> ("we", "us", or "our"). We are dedicated to maintaining the confidentiality and integrity of personal information. This Privacy Policy details how we collect, use, disclose, and safeguard user data when you access or use our website.</p>

  <h2 style="font-size:20px;font-weight:700;margin:24px 0 10px;color:#0f172a">2. Information We Collect</h2>
  <p>We may collect personal details that you voluntarily submit through our consultation form, email, or WhatsApp, including your name, contact phone number, email address, and summary of your legal inquiry. In addition, we collect automated browsing data such as IP address, browser type, referral URLs, operating system, and pages viewed.</p>

  <h2 style="font-size:20px;font-weight:700;margin:24px 0 10px;color:#0f172a">3. How We Use Your Information</h2>
  <p>Information gathered is utilized to respond directly to client consultations, provide legal assistance, monitor and improve site performance, analyze traffic metrics, and present relevant advertisements.</p>

  <h2 style="font-size:20px;font-weight:700;margin:24px 0 10px;color:#0f172a">4. Google AdSense &amp; Advertising Cookie Policy</h2>
  <p>This Website uses <strong>Google AdSense</strong>, a third-party advertising service provided by Google LLC (1600 Amphitheatre Parkway, Mountain View, CA 94043, USA). Google and its third-party advertising partners utilize cookies—including the <strong>DoubleClick DART cookie</strong>—to serve advertisements to users based on their prior visits to this website and other websites across the Internet.</p>
  <p>Third-party advertising vendors and ad networks display advertisements on advmdshahalam.me. These cookies enable Google and its network partners to show targeted ads tailored to user browsing history. We do not control cookies placed by Google AdSense.</p>
  <p><strong>Opt-Out:</strong> Users may opt out of personalized advertising at any time by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style="color:#1a56db;text-decoration:underline">Google Ads Settings</a> or through the <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" style="color:#1a56db;text-decoration:underline">Digital Advertising Alliance opt-out portal</a>. You may also adjust cookie preferences directly in your browser settings.</p>

  <h2 style="font-size:20px;font-weight:700;margin:24px 0 10px;color:#0f172a">5. Google Analytics Disclosures</h2>
  <p>We implement Google Analytics to examine traffic patterns, audience demographics, and user behavior. Google Analytics relies on cookies to collect non-personally identifiable statistical metrics. For further information on Google data handling, visit <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" style="color:#1a56db;text-decoration:underline">Google's Privacy &amp; Terms</a>.</p>

  <h2 style="font-size:20px;font-weight:700;margin:24px 0 10px;color:#0f172a">6. Data Retention, Confidentiality &amp; User Rights</h2>
  <p>We implement administrative and technical security measures to protect your personal data from unauthorized access, alteration, or disclosure. Inquiry records submitted through WhatsApp or our contact form are retained only for as long as necessary to evaluate your preliminary consultation, comply with Bangladesh Bar Council record-keeping obligations, or resolve active legal proceedings. Under applicable data privacy principles, you have the right to request access to, correction of, or deletion of your personal contact details submitted to our chamber.</p>

  <h2 style="font-size:20px;font-weight:700;margin:24px 0 10px;color:#0f172a">7. External Links &amp; Policy Updates</h2>
  <p>This Website contains links to official government portals (such as Bangladesh Judiciary, Land Ministry, and RJSC resources) and partner services. We are not responsible for the privacy practices of external websites. We may update this Privacy Policy periodically to reflect changes in Bangladesh statutory regulations, Google AdSense requirements, or chamber procedures, with the revised effective date posted at the top of this page.</p>

  <h2 style="font-size:20px;font-weight:700;margin:24px 0 10px;color:#0f172a">8. Contact Information</h2>
  <p>For any privacy inquiries, data deletion requests, or questions regarding this Privacy Policy, please contact:<br>
  <strong>Advocate Md. Shah Alam</strong><br>
  Chamber: House 46, Road 6/B, Sector 12, Uttara West, Dhaka-1230, Bangladesh<br>
  Email: <a href="mailto:contact@advmdshahalam.me" style="color:#1a56db">contact@advmdshahalam.me</a> | Phone: <a href="tel:+8801712655546" style="color:#1a56db">+880 1712-655546</a></p>
</div>`;
}

function termsBody() {
  return `<h1 style="font-size:30px;font-weight:700;margin-bottom:12px;color:#0f172a">${escHtml(pageHeadings.terms)}</h1>
<p style="color:#64748b;font-size:14px;margin-bottom:24px">Last updated: May 12, 2026</p>
<div style="font-size:15px;color:#334155;line-height:1.8">
  <h2 style="font-size:20px;font-weight:700;margin:24px 0 10px;color:#0f172a">1. Acceptance of Terms</h2>
  <p>By browsing, accessing, or using <strong>advmdshahalam.me</strong> ("Website"), you agree to be bound by these Terms and Conditions. If you do not accept these terms, you must refrain from using the Website or relying on any published materials.</p>

  <h2 style="font-size:20px;font-weight:700;margin:24px 0 10px;color:#0f172a">2. Legal Disclaimer &amp; No Attorney-Client Relationship</h2>
  <p>The information, articles, statutory summaries, and legal guides published on this website are provided solely for <strong>general informational and educational purposes</strong>. Nothing on this website constitutes formal legal counsel, a binding legal opinion, or solicitation under the Bangladesh Bar Council Canons of Professional Conduct and Etiquette.</p>
  <p>Accessing this website, sending messages via contact forms, or initiating WhatsApp communications for a free preliminary consultation does not by itself establish an attorney-client relationship. Formal representation begins only upon execution of a signed Vakalatnama or written engagement agreement and acceptance of the brief at our Uttara or Judge Court chamber.</p>

  <h2 style="font-size:20px;font-weight:700;margin:24px 0 10px;color:#0f172a">3. Scope of Free Initial Consultation &amp; Chamber Fees</h2>
  <p>We offer a free initial online or telephone consultation so prospective clients can outline their legal issue and understand potential procedural pathways without any advance payment. Where a matter requires physical inspection of original deeds, FIRs, court records, legal drafting, or appearance before a court or tribunal, standard professional fees and official court costs are discussed transparently during the chamber appointment.</p>

  <h2 style="font-size:20px;font-weight:700;margin:24px 0 10px;color:#0f172a">4. Intellectual Property Rights</h2>
  <p>All original content, legal guides, articles, logos, graphics, and code on this Website are the exclusive intellectual property of Advocate Md. Shah Alam and are protected under the Copyright Act, 2023 and applicable laws of Bangladesh. Unauthorized reproduction, scraping, or commercial republication is strictly prohibited.</p>

  <h2 style="font-size:20px;font-weight:700;margin:24px 0 10px;color:#0f172a">5. Third-Party Advertisements (Google AdSense)</h2>
  <p>This Website displays third-party advertisements served through Google AdSense. We do not endorse, guarantee, or assume liability for products, claims, or services advertised by third parties. Please refer to our <a href="/privacy-policy" style="color:#1a56db;text-decoration:underline">Privacy Policy</a> for details on advertising cookies.</p>

  <h2 style="font-size:20px;font-weight:700;margin:24px 0 10px;color:#0f172a">6. Limitation of Liability &amp; Governing Law</h2>
  <p>To the maximum extent permitted by law, Advocate Md. Shah Alam and associated chambers shall not be held liable for any loss, missed limitation period, or damages arising from reliance on general statutory summaries provided on this Website without formal legal advice.</p>
  <p>These terms are governed by and construed under the laws of the People's Republic of Bangladesh. Any dispute arising in connection with the Website shall fall under the exclusive jurisdiction of the competent courts in Dhaka, Bangladesh.</p>

  <h2 style="font-size:20px;font-weight:700;margin:24px 0 10px;color:#0f172a">7. Contact Us</h2>
  <p>Advocate Md. Shah Alam Law Chambers<br>
  House 46, Road 6/B, Sector 12, Uttara West, Dhaka-1230, Bangladesh<br>
  Phone: <a href="tel:+8801712655546" style="color:#1a56db">+880 1712-655546</a> | Email: <a href="mailto:contact@advmdshahalam.me" style="color:#1a56db">contact@advmdshahalam.me</a></p>
</div>`;
}

// ── main ─────────────────────────────────────────────────────────────────────
async function main() {
  if (!fs.existsSync(DIST)) {
    console.error('❌  dist/ not found — run `npm run build` first');
    process.exit(1);
  }

  const base = readBase();
  const TODAY = process.env.TODAY || new Date(Date.now() + 6 * 3600 * 1000).toISOString().split('T')[0]; // YYYY-MM-DD in Asia/Dhaka

  function buildInstitutionalSchema(pageUrl, lang, breadcrumbItems) {
    const legalSvc = buildLegalServiceEntity();
    const graph = [
      buildWebSiteEntity(lang),
      buildPersonEntity(),
      legalSvc,
      {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbItems.map((b, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: b.name,
          item: b.item,
        })),
      },
    ];
    return `<script type="application/ld+json">${jsonLd({ '@context': 'https://schema.org', '@graph': graph })}</script>`;
  }

  function buildServiceSchema(pageUrl, data, lang) {
    const isBn = lang === 'bn';
    const homeName = isBn ? 'হোম' : 'Home';
    const homeUrl = isBn ? `${BASE}/` : `${BASE}/en`;
    const servicesName = isBn ? 'আইনি সেবাসমূহ' : 'Legal Services';
    const servicesUrl = isBn ? `${BASE}/#services` : `${BASE}/en#services`;
    const graph = [
      {
        '@type': 'LegalService',
        '@id': `${pageUrl}#service`,
        name: data.h1,
        serviceType: data.h1,
        description: data.metaDesc,
        url: pageUrl,
        inLanguage: isBn ? 'bn-BD' : 'en',
        telephone: '+8801712655546',
        email: 'contact@advmdshahalam.me',
        employee: { '@id': `${BASE}/#attorney` },
        parentOrganization: { '@id': `${BASE}/#legalservice` },
        areaServed: getServiceAreaServed(pageUrl),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: homeName, item: homeUrl },
          { '@type': 'ListItem', position: 2, name: servicesName, item: servicesUrl },
          { '@type': 'ListItem', position: 3, name: data.h1, item: pageUrl },
        ],
      },
      ...(data.faqItems?.length
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: data.faqItems.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            },
          ]
        : []),
    ];
    return `<script type="application/ld+json">${jsonLd({ '@context': 'https://schema.org', '@graph': graph })}</script>`;
  }

  console.log('\n🏠 Pre-rendering core pages...');

  // ── Home page (/index.html — Bengali-first) ────────────────────────────────
  {
    const extraHead = `<link rel="alternate" hreflang="bn" href="${BASE}/" />
<link rel="alternate" hreflang="en" href="${BASE}/en" />
<link rel="alternate" hreflang="x-default" href="${BASE}/en" />
${buildInstitutionalSchema(`${BASE}/`, 'bn', [{ name: 'হোম', item: `${BASE}/` }])}`;
    const html = buildPage(base, {
      title: 'সুপ্রিম কোর্ট আইনজীবী ঢাকা | এডভোকেট মোঃ শাহ আলম',
      description: 'বাংলাদেশ সুপ্রিম কোর্টের অভিজ্ঞ আইনজীবী এডভোকেট মোঃ শাহ আলম। ফৌজদারি, জামিন, তালাক, জমি ও কর্পোরেট মামলায় উত্তরা চেম্বারে সরাসরি আইনি পরামর্শ নিন।',
      canonical: `${BASE}/`,
      body: homeBodyBn(),
      lang: 'bn',
      extraHead,
    });
    write(path.join(DIST, 'index.html'), html);
    console.log('  ✓ / (home - Bengali)');
  }

  // ── English Home page (/en/index.html) ─────────────────────────────────────
  {
    const extraHead = `<link rel="alternate" hreflang="en" href="${BASE}/en" />
<link rel="alternate" hreflang="bn" href="${BASE}/" />
<link rel="alternate" hreflang="x-default" href="${BASE}/en" />
${buildInstitutionalSchema(`${BASE}/en`, 'en', [{ name: 'Home', item: `${BASE}/en` }])}`;
    const html = buildPage(base, {
      title: 'Supreme Court Lawyer Dhaka | Advocate Md. Shah Alam',
      description: 'Advocate Md. Shah Alam is a Supreme Court lawyer in Uttara, Dhaka handling criminal defense, bail, divorce, land disputes, and corporate legal matters.',
      canonical: `${BASE}/en`,
      body: homeBody(),
      lang: 'en',
      extraHead,
    });
    write(path.join(DIST, 'en', 'index.html'), html);
    console.log('  ✓ /en (home - English)');
  }

  // ── Advocate/About page ────────────────────────────────────────────────────
  {
    const extraHead = `<link rel="alternate" hreflang="en" href="${BASE}/advocate-md-shah-alam" />
<link rel="alternate" hreflang="x-default" href="${BASE}/advocate-md-shah-alam" />
${buildInstitutionalSchema(`${BASE}/advocate-md-shah-alam`, 'en', [{ name: 'Home', item: `${BASE}/en` }, { name: 'Advocate Md. Shah Alam', item: `${BASE}/advocate-md-shah-alam` }])}`;
    const html = buildPage(base, {
      title: 'About Advocate Md. Shah Alam | Supreme Court BD',
      description: 'Learn about Advocate Md. Shah Alam, LL.M Supreme Court lawyer in Uttara, Dhaka with 10+ years experience in criminal, bail, family, and property law.',
      canonical: `${BASE}/advocate-md-shah-alam`,
      body: advocateBody(),
      lang: 'en',
      extraHead,
    });
    write(path.join(DIST, 'advocate-md-shah-alam', 'index.html'), html);
    console.log('  ✓ /advocate-md-shah-alam');
  }

  // ── Education page ─────────────────────────────────────────────────────────
  {
    const extraHead = `<link rel="alternate" hreflang="en" href="${BASE}/education" />
<link rel="alternate" hreflang="x-default" href="${BASE}/education" />
${buildInstitutionalSchema(`${BASE}/education`, 'en', [{ name: 'Home', item: `${BASE}/en` }, { name: 'Education & Bar Enrollment', item: `${BASE}/education` }])}`;
    const html = buildPage(base, {
      title: 'Education & Bar Enrollment | Advocate Md. Shah Alam',
      description: 'Explore the education and career timeline of Advocate Shah Alam — LL.M lawyer with 10+ years of legal excellence at the Supreme Court of Bangladesh.',
      canonical: `${BASE}/education`,
      body: educationBody(),
      lang: 'en',
      extraHead,
    });
    write(path.join(DIST, 'education', 'index.html'), html);
    console.log('  ✓ /education');
  }

  // ── Contact page (/contact) ────────────────────────────────────────────────
  {
    const contactFaqSchemaEn = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: CONTACT_FAQS_EN.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    };
    const extraHead = `<link rel="alternate" hreflang="en" href="${BASE}/contact" />
<link rel="alternate" hreflang="bn" href="${BASE}/bn/contact" />
<link rel="alternate" hreflang="x-default" href="${BASE}/contact" />
${buildInstitutionalSchema(`${BASE}/contact`, 'en', [{ name: 'Home', item: `${BASE}/en` }, { name: 'Contact', item: `${BASE}/contact` }])}
<script type="application/ld+json">${jsonLd(contactFaqSchemaEn)}</script>`;
    const html = buildPage(base, {
      title: 'Contact Advocate Md. Shah Alam | Dhaka Chamber',
      description: 'Contact Advocate Md. Shah Alam for legal consultation in Dhaka & Uttara. Call +880 1712-655546 or WhatsApp for criminal, divorce, bail & property cases.',
      canonical: `${BASE}/contact`,
      body: contactBody(),
      lang: 'en',
      extraHead,
    });
    write(path.join(DIST, 'contact', 'index.html'), html);
    console.log('  ✓ /contact');
  }

  // ── Bengali Contact page (/bn/contact) ─────────────────────────────────────
  {
    const contactFaqSchemaBn = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: CONTACT_FAQS_BN.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    };
    const extraHead = `<link rel="alternate" hreflang="bn" href="${BASE}/bn/contact" />
<link rel="alternate" hreflang="en" href="${BASE}/contact" />
<link rel="alternate" hreflang="x-default" href="${BASE}/contact" />
${buildInstitutionalSchema(`${BASE}/bn/contact`, 'bn', [{ name: 'হোম', item: `${BASE}/` }, { name: 'যোগাযোগ', item: `${BASE}/bn/contact` }])}
<script type="application/ld+json">${jsonLd(contactFaqSchemaBn)}</script>`;
    const html = buildPage(base, {
      title: 'যোগাযোগ ও চেম্বার | এডভোকেট মোঃ শাহ আলম ঢাকা',
      description: 'এডভোকেট মোঃ শাহ আলমের উত্তরা ও ঢাকা জজ কোর্ট চেম্বারে সরাসরি আইনি পরামর্শ ও মামলা মূল্যায়নের জন্য যোগাযোগ করুন। ফোন: +8801712655546।',
      canonical: `${BASE}/bn/contact`,
      body: contactBodyBn(),
      lang: 'bn',
      extraHead,
    });
    write(path.join(DIST, 'bn', 'contact', 'index.html'), html);
    console.log('  ✓ /bn/contact');
  }

  // ── Privacy Policy ─────────────────────────────────────────────────────────
  {
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${BASE}/privacy-policy#webpage`,
          url: `${BASE}/privacy-policy`,
          name: 'Privacy Policy | Advocate Md. Shah Alam Chambers',
          inLanguage: 'en',
          isPartOf: { '@id': `${BASE}/#website` },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/en` },
            { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: `${BASE}/privacy-policy` },
          ],
        },
      ],
    };
    const extraHead = `<link rel="alternate" hreflang="en" href="${BASE}/privacy-policy" />
<link rel="alternate" hreflang="x-default" href="${BASE}/privacy-policy" />
<script type="application/ld+json">${jsonLd(schema)}</script>`;
    const html = buildPage(base, {
      title: 'Privacy Policy | Advocate Md. Shah Alam Chambers',
      description: 'Read the official Privacy Policy for advmdshahalam.me detailing client confidentiality, consultation data handling, Google Analytics, and AdSense cookies.',
      canonical: `${BASE}/privacy-policy`,
      body: privacyBody(),
      lang: 'en',
      extraHead,
    });
    write(path.join(DIST, 'privacy-policy', 'index.html'), html);
    console.log('  ✓ /privacy-policy');
  }

  // ── Terms of Service ───────────────────────────────────────────────────────
  {
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${BASE}/terms-of-service#webpage`,
          url: `${BASE}/terms-of-service`,
          name: 'Terms of Service | Advocate Md. Shah Alam Dhaka',
          inLanguage: 'en',
          isPartOf: { '@id': `${BASE}/#website` },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/en` },
            { '@type': 'ListItem', position: 2, name: 'Terms of Service', item: `${BASE}/terms-of-service` },
          ],
        },
      ],
    };
    const extraHead = `<link rel="alternate" hreflang="en" href="${BASE}/terms-of-service" />
<link rel="alternate" hreflang="x-default" href="${BASE}/terms-of-service" />
<script type="application/ld+json">${jsonLd(schema)}</script>`;
    const html = buildPage(base, {
      title: 'Terms of Service | Advocate Md. Shah Alam Dhaka',
      description: 'Terms of Service & Engagement for advmdshahalam.me — consultation boundaries, retainer conditions, payment policies, and Dhaka court jurisdiction.',
      canonical: `${BASE}/terms-of-service`,
      body: termsBody(),
      lang: 'en',
      extraHead,
    });
    write(path.join(DIST, 'terms-of-service', 'index.html'), html);
    console.log('  ✓ /terms-of-service');
  }

  // ── Review page ────────────────────────────────────────────────────────────
  {
    const reviewBreadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'হোম', item: `${BASE}/` },
        { '@type': 'ListItem', position: 2, name: 'ক্লায়েন্ট রিভিউ ও মতামত', item: `${BASE}/review` },
      ],
    };
    const reviewFaqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: REVIEW_CONTENT.faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    };
    const sectionsHtml = REVIEW_CONTENT.sections.map(sec => `
      <article style="margin:24px 0;padding:24px;background:#fff;border:1px solid #E2E8F0;border-radius:14px">
        <h2 style="font-size:20px;font-weight:700;margin-bottom:12px;color:#0B1220">${escHtml(sec.heading)}</h2>
        ${(sec.paragraphs || []).map(p => `<p style="color:#334155;line-height:1.8;margin-bottom:10px">${escHtml(p)}</p>`).join('')}
        ${sec.steps ? `<ol style="padding-left:22px;color:#334155;line-height:1.9">${sec.steps.map(st => `<li>${escHtml(st)}</li>`).join('')}</ol>` : ''}
        ${sec.bullets ? `<ul style="padding-left:22px;color:#334155;line-height:1.9">${sec.bullets.map(b => `<li>${escHtml(b)}</li>`).join('')}</ul>` : ''}
      </article>`).join('');
    const servicesNavHtml = REVIEW_CONTENT.serviceLinks.map(l => `<a href="${l.to}" style="display:inline-block;margin:4px 8px 4px 0;padding:8px 14px;border:1px solid #CBD5E1;border-radius:8px;color:#132A4A;font-weight:600;text-decoration:none">${escHtml(l.label)}</a>`).join('');
    const faqsHtml = REVIEW_CONTENT.faqs.map(f => `
      <div style="margin:12px 0;padding:16px;background:#F7F8FA;border-radius:10px;border:1px solid #E2E8F0">
        <h3 style="font-size:16px;font-weight:700;color:#0B1220;margin-bottom:6px">${escHtml(f.q)}</h3>
        <p style="color:#334155;line-height:1.75;margin:0">${escHtml(f.a)}</p>
      </div>`).join('');

    const extraHead = `<link rel="alternate" hreflang="bn" href="${BASE}/review" />
<link rel="alternate" hreflang="x-default" href="${BASE}/review" />
<script type="application/ld+json">${jsonLd(reviewBreadcrumbSchema)}</script>
<script type="application/ld+json">${jsonLd(reviewFaqSchema)}</script>`;
    const html = buildPage(base, {
      title: REVIEW_CONTENT.metaTitle,
      description: REVIEW_CONTENT.metaDesc,
      canonical: `${BASE}/review`,
      lang: 'bn',
      extraHead,
      body: `<nav aria-label="Breadcrumb" style="font-size:13px;color:#475569;margin-bottom:14px"><a href="/" style="color:#132A4A">হোম</a> &rsaquo; <span>ক্লায়েন্ট রিভিউ ও মতামত</span></nav>
<div style="max-width:780px;margin:20px auto;text-align:center;padding:30px;background:#F7F8FA;border:1px solid #E2E8F0;border-radius:16px">
  <h1 style="font-size:28px;font-weight:700;margin-bottom:12px;color:#0B1220">${escHtml(pageHeadings.review)}</h1>
  <p style="color:#334155;line-height:1.8;margin-bottom:18px">${escHtml(REVIEW_CONTENT.intro)}</p>
  <div style="font-size:28px;color:#C9A227;margin-bottom:18px">★★★★★</div>
  <a href="${GOOGLE_REVIEW_URL}" data-cta="review-google" style="display:inline-block;padding:14px 28px;background:#132A4A;color:#fff;text-decoration:none;border-radius:12px;font-weight:700">${escHtml(REVIEW_CONTENT.ctaPrimary)}</a>
  <p style="font-size:12px;color:#475569;margin-top:10px">${escHtml(REVIEW_CONTENT.ctaHelper)}</p>
</div>
${sectionsHtml}
<section style="margin:28px 0"><h2 style="font-size:20px;font-weight:700;color:#0B1220;margin-bottom:10px">আমাদের প্রধান আইনি সেবাসমূহ</h2><div>${servicesNavHtml}</div></section>
<section style="margin:28px 0"><h2 style="font-size:20px;font-weight:700;color:#0B1220;margin-bottom:12px">রিভিউ ও পরামর্শ সম্পর্কিত সাধারণ প্রশ্নোত্তর</h2>${faqsHtml}</section>
${BN_CTA}`,
    });
    write(path.join(DIST, 'review', 'index.html'), html);
    console.log('  ✓ /review');
  }

  // ── NRB Legal Help page ────────────────────────────────────────────────────
  {
    const nrbFaqs = [
      {
        q: 'Is the first legal consultation really free for NRBs?',
        a: 'Yes. Your initial WhatsApp or phone consultation with Advocate Md. Shah Alam is completely free. You can explain your property, family, or court matter and receive an initial legal opinion on eligibility and jurisdiction before any paid work begins.',
      },
      {
        q: 'Can I sell, mutate, or protect my land in Bangladesh without flying to Dhaka?',
        a: 'Yes. Under the Power of Attorneys Act 2012 and the Registration Act 1908, an NRB can execute a Special or General Power of Attorney abroad, have it attested by the Bangladesh Embassy or High Commission, and complete MOFA verification in Dhaka so an authorized representative can act before the Sub-Registry or AC (Land) office.',
      },
      {
        q: 'How long does land deed and khatian vetting take for NRBs?',
        a: 'Preliminary case screening takes 24 to 48 hours. A full written chain-of-title opinion (verifying CS, SA, RS, and BS khatians, Bia deeds, and Sub-Registry Talashi index records) typically takes 3 to 7 working days depending on the district registry office.',
      },
      {
        q: 'How are fees paid if I live in the UK, USA, UAE, or Canada?',
        a: 'There is no advance online checkout. After your free initial consultation, if you choose to proceed with formal drafting, deed vetting, or court representation, the indicative fee is confirmed in writing and can be settled via bKash (01712655546), bank transfer, or by a family member at the Dhaka chamber.',
      },
      {
        q: 'Is a foreign divorce decree valid in Bangladesh for NRBs?',
        a: 'A foreign divorce decree is evaluated under Section 13 of the Code of Civil Procedure 1908 (CPC) and the Muslim Family Laws Ordinance 1961 (where applicable). Proper notice to the Union Parishad or City Corporation Mayor and statutory 90-day waiting compliance should be verified to prevent future marriage or inheritance disputes in Bangladesh.',
      },
    ];
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${BASE}/nrb-legal-help#webpage`,
          url: `${BASE}/nrb-legal-help`,
          name: 'NRB Legal Help Bangladesh | Property & Family Law',
          inLanguage: 'en',
          isPartOf: { '@id': `${BASE}/#website` },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/en` },
            { '@type': 'ListItem', position: 2, name: 'NRB Legal Help', item: `${BASE}/nrb-legal-help` },
          ],
        },
        {
          '@type': 'FAQPage',
          mainEntity: nrbFaqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
      ],
    };
    const extraHead = `<link rel="alternate" hreflang="en" href="${BASE}/nrb-legal-help" />
<link rel="alternate" hreflang="x-default" href="${BASE}/nrb-legal-help" />
<script type="application/ld+json">${jsonLd(schema)}</script>`;
    const html = buildPage(base, {
      title: 'NRB Legal Help Bangladesh | Property & Family Law',
      description: 'Legal guides and remote legal services for Non-Resident Bangladeshis in the UK, USA, UAE and Canada: free initial consultation, deed vetting, MOFA attestation, retainer, divorce and court cases.',
      canonical: `${BASE}/nrb-legal-help`,
      lang: 'en',
      extraHead,
      body: `<nav aria-label="Breadcrumb" style="font-size:13px;color:#475569;margin-bottom:14px"><a href="/en" style="color:#132A4A">Home</a> &rsaquo; <span>NRB Legal Help</span></nav>
<h1 style="font-size:30px;font-weight:700;margin-bottom:8px;color:#0B1220">${escHtml(pageHeadings.nrb)}</h1>
<p class="direct-answer"><strong>Quick Summary:</strong> Non-Resident Bangladeshis (NRBs) in the UK, USA, Canada, UAE, and Europe can resolve land disputes, execute Embassy-attested Power of Attorney (PoA), vet khatian and Bia deeds, handle divorce/custody suits, and defend criminal/cheque matters in Bangladesh remotely through Advocate Md. Shah Alam without flying to Dhaka.</p>

<section style="margin:24px 0;padding:20px;background:#F8FAFC;border:1px solid #C9A227;border-radius:10px">
  <h2 style="font-size:22px;font-weight:700;color:#0B1220;margin-bottom:10px">First Consultation is Free — Clear 3-Step Process</h2>
  <p style="font-size:14px;color:#334155;margin-bottom:14px;line-height:1.7"><strong>First consultation is free.</strong> Share your case details on WhatsApp or phone — you will receive an initial legal opinion at no charge. Fees apply only if you decide to proceed with formal drafting, vetting, or court representation.</p>
  <ol style="padding-left:20px;line-height:1.85;color:#1E293B;font-size:14px">
    <li><strong>Step 1 (Free): WhatsApp / Phone Case Brief</strong> — Message +880 1955-802007 or call +880 1712-655546 to explain your property, family, or court issue and get an initial opinion free of charge.</li>
    <li><strong>Step 2 (Scope &amp; Documents): Written Scope &amp; Indicative Fee</strong> — If formal work is needed, you receive a written document checklist, expected court/registry timeline, and confirmed indicative fee before starting.</li>
    <li><strong>Step 3 (Execution): Remote Filing &amp; Updates</strong> — Your chamber desk handles Sub-Registry searches, Embassy PoA drafts, or Dhaka court appearances with regular WhatsApp/video updates.</li>
  </ol>
</section>

<section style="margin:24px 0;padding:20px;background:#F7F8FA;border:1px solid #CBD5E1;border-radius:10px">
  <h2 style="font-size:22px;font-weight:700;color:#0B1220;margin-bottom:12px">Paid Case Review &amp; Written Opinion</h2>
  <p style="font-size:14px;color:#334155;margin-bottom:12px">All listed fees are indicative estimates confirmed in writing once document scope is reviewed.</p>
  <table style="width:100%;border-collapse:collapse;font-size:14px;background:#fff">
    <thead><tr style="background:#132A4A;color:#fff"><th style="padding:10px;text-align:left">Service Package</th><th style="padding:10px;text-align:left">Deliverables</th><th style="padding:10px;text-align:left">Indicative Fee (BDT / USD)</th></tr></thead>
    <tbody>
      <tr style="border-bottom:1px solid #E2E8F0"><td style="padding:10px"><strong>Preliminary Case Screening</strong></td><td style="padding:10px">24–48h legal triage, conflict check &amp; statutory filing eligibility assessment</td><td style="padding:10px">৳500–৳1,500 / \$5–\$15</td></tr>
      <tr style="border-bottom:1px solid #E2E8F0"><td style="padding:10px"><strong>45-Min Video Case Review</strong></td><td style="padding:10px">Full legal strategy &amp; statute roadmap session with Adv. Md. Shah Alam</td><td style="padding:10px">৳3,000 / \$30</td></tr>
      <tr style="border-bottom:1px solid #E2E8F0"><td style="padding:10px"><strong>Land Deed &amp; Khatian Chain Vetting</strong></td><td style="padding:10px">Written legal opinion on chain of title, Bia deeds, Sub-Registry records &amp; e-Mutation</td><td style="padding:10px">৳8,000 / \$75</td></tr>
      <tr><td style="padding:10px"><strong>PoA / Legal Notice / Agreement Drafting</strong></td><td style="padding:10px">Court-ready bilingual or English legal draft formatted for Embassy attestation</td><td style="padding:10px">৳5,000 / \$50</td></tr>
    </tbody>
  </table>
  <p style="margin-top:14px;font-size:14px"><a href="/contact?service=case-review" data-cta="consult" data-placement="nrb-paid-review" style="display:inline-block;padding:12px 22px;background:#132A4A;color:#fff;border-radius:8px;text-decoration:none;font-weight:700">Book Paid Case Review</a> &nbsp; <a href="/contact?service=case-review" data-cta="nrb-free-consult" data-placement="nrb-paid-review" style="color:#132A4A;font-weight:700;text-decoration:underline">Start with a free consultation &rarr;</a></p>
</section>
<section style="margin:24px 0">
  <h2 style="font-size:22px;font-weight:700;color:#0B1220;margin-bottom:10px">NRB Document &amp; Attestation Services</h2>
  <ul style="padding-left:20px;line-height:1.9;color:#1E293B">
    <li><strong>MOFA &amp; Bangladesh Embassy Attestation:</strong> Verification formatting for UK, USA, UAE, and Canada submissions.</li>
    <li><strong>Hague Apostille Coordination:</strong> Apostille authentication guidance for foreign birth, marriage, and PoA records.</li>
    <li><strong>NID, Birth &amp; Marriage Corrections:</strong> Affidavit drafting and magistrate/gazette correction steps.</li>
    <li><strong>Certified Court Copies &amp; Talashi Search:</strong> Direct Dhaka Sub-Registry index searches and certified deed extraction (indicative fee starting ৳4,000 / \$40).</li>
  </ul>
  <p style="margin-top:10px;font-size:14px"><a href="/contact?service=documents" data-cta="nrb-documents" data-placement="nrb-documents" style="color:#132A4A;font-weight:700;text-decoration:underline">Request Document Service</a> &middot; <a href="/contact?service=documents" data-cta="nrb-free-consult" data-placement="nrb-documents" style="color:#132A4A;font-weight:700;text-decoration:underline">Start with a free consultation &rarr;</a></p>
</section>
<section style="margin:24px 0">
  <h2 style="font-size:22px;font-weight:700;color:#0B1220;margin-bottom:10px">NRB Monthly Legal Advisory Retainer</h2>
  <ul style="padding-left:20px;line-height:1.9;color:#1E293B">
    <li><strong>Family Property &amp; Land Monitoring:</strong> Periodic khatian, land tax (Khajna), and encroachment checks across Dhaka and districts.</li>
    <li><strong>Tenant &amp; Mutation Compliance:</strong> Lease vetting, eviction notice compliance, and e-Mutation status tracking.</li>
    <li><strong>Annual NBR Tax Return Coordination:</strong> Non-resident remittance exemption and annual tax return compliance (indicative monthly retainer ৳12,000–৳25,000 / \$110–\$225).</li>
  </ul>
  <p style="margin-top:10px;font-size:14px"><a href="/contact?service=retainer" data-cta="nrb-retainer" data-placement="nrb-retainer" style="color:#132A4A;font-weight:700;text-decoration:underline">Inquire About Retainer</a> &middot; <a href="/contact?service=retainer" data-cta="nrb-free-consult" data-placement="nrb-retainer" style="color:#132A4A;font-weight:700;text-decoration:underline">Start with a free consultation &rarr;</a></p>
</section>
<section style="margin:24px 0">
  <h2 style="font-size:22px;font-weight:700;color:#0B1220;margin-bottom:10px">Countries Served, Statutory Framework &amp; Document Checklist</h2>
  <p style="font-size:14px;color:#334155;line-height:1.8;margin-bottom:12px">Advocate Md. Shah Alam (Enrolled with the Bangladesh Bar Council since 2015, practicing at the Supreme Court of Bangladesh and Dhaka Judge Court) coordinates remote legal representation for Non-Resident Bangladeshis residing in the <strong>United Kingdom (London, Birmingham, Manchester), United States (New York, New Jersey, Michigan, California, Texas), Canada (Toronto, Montreal, Ottawa), United Arab Emirates (Dubai, Abu Dhabi, Sharjah), Saudi Arabia, Qatar, Singapore, Australia, and EU countries</strong>. Consultations are scheduled across GMT, EST/PST, GST, and BST time zones so you never have to travel to Dhaka just for preliminary verification or document filing.</p>
  <h3 style="font-size:17px;font-weight:700;color:#0B1220;margin:12px 0 8px">Essential Documents to Keep Ready</h3>
  <ul style="padding-left:20px;line-height:1.9;color:#1E293B;font-size:14px">
    <li><strong>Property &amp; Inheritance:</strong> Scanned copies of Saf Kabala (sale deed), Bia deeds, CS/SA/RS/BS Khatian (Porcha), mutation DCR, Khajna (land development tax) receipts, and NID/passport copy.</li>
    <li><strong>Power of Attorney (PoA):</strong> Drafted under the Power of Attorneys Act 2012 and Registration Act 1908, signed before the Bangladesh Embassy/High Commission abroad and verified by MOFA in Dhaka.</li>
    <li><strong>Family &amp; Foreign Divorce:</strong> Registered Kabinnama, foreign divorce decree (evaluated under Section 13 of the Code of Civil Procedure 1908), and union/city corporation notice copies under the Muslim Family Laws Ordinance 1961.</li>
    <li><strong>Cheque Dishonour &amp; Criminal Matters:</strong> Dishonoured cheque copy, bank return memo, statutory 30-day legal notice under Section 138 of the Negotiable Instruments Act 1881, or FIR/GD copy.</li>
  </ul>
  <h3 style="font-size:17px;font-weight:700;color:#0B1220;margin:12px 0 8px">Typical Turnaround &amp; Fee Transparency</h3>
  <ul style="padding-left:20px;line-height:1.9;color:#1E293B;font-size:14px">
    <li><strong>Free Initial Consultation:</strong> Same-day or within 24 hours via WhatsApp or phone for initial legal triage.</li>
    <li><strong>Deed &amp; Khatian Vetting:</strong> 3 to 7 working days for Sub-Registry Talashi search and written chain-of-title opinion.</li>
    <li><strong>PoA &amp; Legal Notice Drafting:</strong> 24 to 72 hours for court-ready English or bilingual drafts formatted for Embassy attestation.</li>
    <li><strong>Transparent Settlement:</strong> No advance online payment gateway is used. Fees are confirmed in writing after initial review and exclude government stamp duties, Sub-Registry fees, and Embassy consular charges.</li>
  </ul>
</section>
<section style="margin:24px 0">
  <h2 style="font-size:22px;font-weight:700;color:#0B1220;margin-bottom:12px">Core NRB Legal Guides</h2>
  <ul style="padding-left:20px;line-height:1.9;color:#1E293B">
    <li><strong>Property &amp; Land:</strong> CS/SA/RS/BS Khatian verification, Sub-Registry search, and e-Mutation (Namjari) without in-person travel.</li>
    <li><strong>Family Law &amp; Divorce:</strong> Overseas Talaq notice registration, Section 13 CPC foreign decree recognition, Dower (Denmohar), and child custody.</li>
    <li><strong>Documents, Citizenship &amp; Money:</strong> Dual citizenship NVR, police clearance certificates, NBR remittance rules, and Section 138 cheque cases.</li>
  </ul>
</section>
<section style="margin:24px 0">
  <h2 style="font-size:22px;font-weight:700;color:#0B1220;margin-bottom:12px">Frequently Asked Questions for NRBs</h2>
  ${nrbFaqs.map((f) => `<div style="margin:10px 0;padding:12px 16px;background:#F7F8FA;border-radius:8px">
    <h3 style="font-size:16px;font-weight:700;margin:0 0 6px;color:#0B1220">${escHtml(f.q)}</h3>
    <p style="margin:0;color:#334155;font-size:14px;line-height:1.7">${escHtml(f.a)}</p>
  </div>`).join('')}
</section>
${CTA}`,
    });
    write(path.join(DIST, 'nrb-legal-help', 'index.html'), html);
    console.log('  ✓ /nrb-legal-help');
  }

  // ── /uttara-lawyer (EN) & /bn/uttara-lawyer (BN) ─────────────────────────
  for (const uLang of ['en', 'bn']) {
    const isBn = uLang === 'bn';
    const uPath = isBn ? '/bn/uttara-lawyer' : '/uttara-lawyer';
    const uUrl = `${BASE}${uPath}`;
    const uTitle = isBn
      ? 'উত্তরা আইনজীবী ঢাকা — ফৌজদারি, জমি, জামিন ও পারিবারিক'
      : 'Uttara Lawyer in Dhaka — Criminal, Land, Bail & Family Law';
    const uDesc = isBn
      ? 'উত্তরা সেক্টর ১২ চেম্বার থেকে উত্তরা, গুলশান, বনানী ও বসুন্ধরার জমি, জামিন, ফৌজদারি, পারিবারিক ও ভাড়াটিয়া উচ্ছেদ মামলার আইনি সহায়তা। প্রথম পরামর্শ ফ্রি।'
      : 'Experienced Uttara lawyer at Sector 12 chamber serving Uttara, Gulshan, Banani, Bashundhara, Turag & Dakshinkhan in criminal, bail, land & family law. First consultation free.';
    const uSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        buildWebSiteEntity(uLang),
        buildPersonEntity(),
        {
          ...buildServicePageSchema({
            url: uUrl,
            lang: uLang,
            serviceType: isBn ? 'উত্তরা আইনজীবী — ফৌজদারি, জমি, পারিবারিক ও কর্পোরেট আইনি সেবা' : 'Uttara Legal Services',
            name: uTitle,
            description: uDesc,
            slug: 'uttara-lawyer',
          }),
          areaServed: AREA_SERVED,
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: isBn ? 'হোম' : 'Home', item: isBn ? `${BASE}/` : `${BASE}/en` },
            { '@type': 'ListItem', position: 2, name: uTitle, item: uUrl },
          ],
        },
      ],
    };
    const uHreflang = `<link rel="alternate" hreflang="en" href="${BASE}/uttara-lawyer" />
<link rel="alternate" hreflang="bn" href="${BASE}/bn/uttara-lawyer" />
<link rel="alternate" hreflang="x-default" href="${BASE}/uttara-lawyer" />`;
    const uBody = isBn ? `<article>
<h1>উত্তরা আইনজীবী ঢাকা — ফৌজদারি, জমি, জামিন ও পারিবারিক আইনি সেবা</h1>
<p>অ্যাডভোকেট মো. শাহ আলম বাংলাদেশের সুপ্রিম কোর্ট ও ঢাকা জজ কোর্টের একজন তালিকাভুক্ত আইনজীবী। উত্তরার সেক্টর ১২-তে (বাড়ি ৪৬, রোড ৬/বি, উত্তরা পশ্চিম, ঢাকা ১২৩০) অবস্থিত চেম্বার থেকে তিনি উত্তরা মডেল টাউনের ১ থেকে ১৭ নম্বর সেক্টর, উত্তরা পশ্চিম, উত্তরা পূর্ব, তুরাগ, দক্ষিণখান, বিমানবন্দর, গুলশান, বনানী এবং বসুন্ধরা আবাসিক এলাকার ক্লায়েন্টদের নিয়মিত আইনি সহায়তা প্রদান করেন। প্রথম পরামর্শ ফ্রি — কাজের পরিধি বুঝিয়ে ও ঠিক করার পরেই কেবল ফি নির্ধারণ করা হয়, কোনো অগ্রিম ফি নেওয়া হয় না।</p>
<h2>একনজরে উত্তরা চেম্বারের আইনি সহায়তা ও পরামর্শ তথ্য</h2>
<table><thead><tr><th>বিষয়</th><th>বিস্তারিত তথ্য</th></tr></thead><tbody>
<tr><td>উত্তরা চেম্বার ঠিকানা</td><td>বাড়ি ৪৬, রোড ৬/বি, সেক্টর ১২, উত্তরা পশ্চিম, ঢাকা ১২৩০ (রবি–বৃহস্পতি সকাল ৮টা–রাত ১০টা, শুক্র–শনি সকাল ১০টা–রাত ১০টা (উত্তরা))</td></tr>
<tr><td>আওতাভুক্ত থানা</td><td>উত্তরা পশ্চিম থানা, উত্তরা পূর্ব থানা, তুরাগ থানা, দক্ষিণখান থানা, বিমানবন্দর থানা, গুলশান, বনানী ও ভাটারা থানা</td></tr>
<tr><td>সংশ্লিষ্ট আদালত</td><td>ঢাকা মেট্রোপলিটন ম্যাজিস্ট্রেট (সিএমএম) আদালত, ঢাকা জেলা ও দায়রা জজ আদালত (কোর্ট হাউস স্ট্রিট, কোতোয়ালি), পারিবারিক আদালত এবং বাংলাদেশ সুপ্রিম কোর্ট (হাইকোর্ট বিভাগ)</td></tr>
<tr><td>পরামর্শ নীতি</td><td>প্রথম পরামর্শ ফ্রি — কোনো অগ্রিম ফি ছাড়াই আইনি অবস্থান ও করণীয় জেনে নিন। কাজের পরিধি নির্ধারণের পরেই কেবল ফি আলোচনা করা হয়।</td></tr>
</tbody></table>
<h2>এলাকা অনুযায়ী আমরা কোথায় সাহায্য করি (উত্তরা, গুলশান, বনানী ও বসুন্ধরা)</h2>
<p>উত্তরা ও উত্তর ঢাকার প্রতিটি এলাকা ও থানার অধিক্ষেত্র অনুযায়ী সঠিক আইনি পদক্ষেপ নেওয়া জরুরি। নিচের সারণিতে উত্তরা পশ্চিম, উত্তরা পূর্ব ও পার্শ্ববর্তী থানাগুলোর তথ্য (ঢাকা মেট্রোপলিটন পুলিশ ডিরেক্টরি অনুসারে) উল্লেখ করা হলো:</p>
<table><thead><tr><th>এলাকা</th><th>সংশ্লিষ্ট থানা (DMP যাচাইকৃত)</th><th>ডিএনসিসি ওয়ার্ড</th><th>প্রধান আইনি বিষয়</th></tr></thead><tbody>
<tr><td>উত্তরা সেক্টর ১১–১৪ (চেম্বার: সেক্টর ১২)</td><td>উত্তরা পশ্চিম থানা — বাড়ি ৪৮, রোড ১৮, সেক্টর ১১</td><td>DNCC Ward 51</td><td>জমি রেজিস্ট্রি, নামজারি, চেক মামলা, ভাড়াটিয়া উচ্ছেদ, পারিবারিক বিরোধ</td></tr>
<tr><td>উত্তরা সেক্টর ৩, ৫, ৭, ৯, ১০</td><td>উত্তরা পশ্চিম থানা — বাড়ি ৪৮, রোড ১৮, সেক্টর ১১</td><td>DNCC Ward 1 / 51</td><td>জমি হস্তান্তর, জামিন ও জিডি/এফআইআর, উত্তরাধিকার সনদ</td></tr>
<tr><td>উত্তরা সেক্টর ১, ২, ৪, ৬, ৮</td><td>উত্তরা পূর্ব থানা — রোড ১৪/ডি, সেক্টর ৪, বাড়ি ১২</td><td>DNCC Ward 1</td><td>১৩৮ ধারা চেক মামলা, জামিন, বাণিজ্যিক ও ভাড়া সংক্রান্ত বিরোধ</td></tr>
<tr><td>বাউনিয়া, দলিপাড়া, দিয়াবাড়ি, কামারপাড়া, ভাটুলিয়া</td><td>উত্তরা পশ্চিম / তুরাগ / দক্ষিণখান থানা</td><td>DNCC Ward 52–54</td><td>খতিয়ান সংশোধন, সীমানা ও বাটোয়ারা মামলা, দেওয়ানি নিষেধাজ্ঞা</td></tr>
<tr><td>তুরাগ</td><td>তুরাগ থানা (ডিএমপি ডিরেক্টরি)</td><td>DNCC Ward 1 / 52</td><td>জমি দখল ও মালিকানা বিরোধ, ভাড়াটিয়া বিরোধ, ফৌজদারি জামিন</td></tr>
<tr><td>দক্ষিণখান</td><td>দক্ষিণখান থানা — বিদুরবাড়ি রোড, থানা মোড়</td><td>DNCC Ward 48–50</td><td>পারিবারিক আদালত, দেনমোহর ও খোরপোশ, সন্তানের হেফাজত, নামজারি</td></tr>
<tr><td>বিমানবন্দর (এয়ারপোর্ট)</td><td>বিমানবন্দর থানা — ১ম তলা র‍্যাব সদর দপ্তর, উত্তরা</td><td>—</td><td>জরুরি গ্রেফতার ও জামিন সহায়তা, প্রবাসীদের ভ্রমণ-নিষেধাজ্ঞা রিট</td></tr>
<tr><td>গুলশান</td><td>গুলশান থানা — বাড়ি ৩২, ১১৫ গুলশান অ্যাভিনিউ, গুলশান-২</td><td>DNCC Ward 19 / 35–36</td><td>বাড়ি ভাড়া নিয়ন্ত্রণ আইন ১৯৯১-এ উচ্ছেদ, কর্পোরেট ও দূতাবাস সত্যায়ন</td></tr>
<tr><td>বনানী</td><td>বনানী থানা — রোড ৭, বাড়ি ৩৭, বনানী</td><td>DNCC Ward 19</td><td>আরজেএসসি কোম্পানি রেজিস্ট্রেশন, বাণিজ্যিক চুক্তি ও প্রবাসী পাওয়ার অব অ্যাটর্নি</td></tr>
<tr><td>বসুন্ধরা আবাসিক এলাকা</td><td>ভাটারা থানা — প্রগতি সরণি, গুলশান নতুন বাজার</td><td>DNCC / প্রস্তাবিত থানা</td><td>প্লট ও ফ্ল্যাট দলিল যাচাই, হস্তান্তর অনুমোদন ও অ্যাপার্টমেন্ট বিরোধ</td></tr>
</tbody></table>
<h2>উত্তরা এলাকায় জমি, ফ্ল্যাট নিবন্ধন ও নামজারি সংক্রান্ত আইনি সহায়তা</h2>
<p>উত্তরা মডেল টাউন, দিয়াবাড়ি, বাউনিয়া এবং পার্শ্ববর্তী বসুন্ধরা আবাসিক এলাকায় জমি বা ফ্ল্যাট ক্রয়-বিক্রয়ের আগে দলিল যাচাই অত্যন্ত গুরুত্বপূর্ণ। উত্তরার সেক্টর ১১, ১২, ১৩ ও ১৪-তে রাজউক প্লট হস্তান্তর, লিজে থাকা জমির অনুমোদন, বায়া দলিল (Chain of Deeds), সিএস-এসএ-আরএস ও মহানগর জরিপের খতিয়ান যাচাই এবং নামজারি (ই-নামজারি) সংক্রান্ত জটিলতা প্রায়ই দেখা যায়। উত্তরা সাব-রেজিস্ট্রি অফিস ও এসি (ল্যান্ড) অফিসের প্রক্রিয়া সম্পর্কে স্পষ্ট ধারণা না থাকলে ক্রেতা বড় ধরনের আর্থিক ঝুঁকিতে পড়তে পারেন।</p>
<p>আমাদের উত্তরা চেম্বার থেকে জমি ও ফ্ল্যাট রেজিস্ট্রির আগে লিগ্যাল ভেটিং (Title Due Diligence), লিস পেন্ডেন্স (Lis Pendens) বা মামলা চলমান আছে কি না তা যাচাই, বাটোয়ারা মামলা, হেবা বা দানপত্র দলিল, এবং প্রবাসী বাংলাদেশিদের (NRB) পাঠানো পাওয়ার অব অ্যাটর্নি যাচাই ও ব্যবহারের পূর্ণাঙ্গ আইনি সেবা দেওয়া হয়। উত্তরা এবং ঢাকার দেওয়ানি আদালতে জমির স্বত্ব ঘোষণা, দখল পুনরুদ্ধার ও নিষেধাজ্ঞার মোকদ্দমায় আমরা নিয়মিত মামলা পরিচালনা করি।</p>
<h2>উত্তরা পশ্চিম ও উত্তরা পূর্ব থানায় ফৌজদারি মামলা, জিডি ও জামিন সহায়তা</h2>
<p>উত্তরা পশ্চিম থানা, উত্তরা পূর্ব থানা, তুরাগ, দক্ষিণখান বা বিমানবন্দর থানায় কোনো ফৌজদারি অভিযোগ বা এফআইআর (FIR) দায়ের হলে প্রথম ২৪ ঘণ্টার সিদ্ধান্ত সবচেয়ে গুরুত্বপূর্ণ। অনেক সময় পারিবারিক বিরোধ, ব্যবসায়িক পাওনা, বা জমি সংক্রান্ত দ্বন্দ্ব থেকে মিথ্যা মামলা বা হয়রানিমূলক অভিযোগ দায়ের করা হয়। গ্রেফতারের আশঙ্কা থাকলে ফৌজদারি কার্যবিধির ৪৯৮ ধারায় হাইকোর্ট বিভাগ থেকে আগাম জামিন (Anticipatory Bail) নেওয়া কিংবা নিম্ন আদালতে আত্মসমর্পণ করে জামিনের আবেদন করার সঠিক কৌশল নির্ধারণ করতে হয়।</p>
<p>উত্তরার ব্যবসায়িক ও ব্যক্তিগত লেনদেনে এনআই অ্যাক্টের ১৩৮ ধারায় চেক ডিজঅনার মামলাও খুব সাধারণ বিষয়। লিগ্যাল নোটিশ পাঠানো থেকে শুরু করে সিএমএম আদালতে মামলা দায়ের, সমন ও ওয়ারেন্ট জারি এবং আসামি পক্ষের জামিন ও আপস-মীমাংসা—প্রতিটি ধাপে উত্তরা চেম্বার থেকে দ্রুত পরামর্শ পাওয়া যায়। চেম্বার উত্তরা সেক্টর ১২-তে হওয়ায় উত্তরার বাসিন্দা ও পরিবারের সদস্যদের জন্য জরুরি কাগজপত্র নিয়ে সরাসরি দেখা করা সহজ হয়।</p>
<h2>উত্তরা, গুলশান ও বনানীতে ভাড়াটিয়া উচ্ছেদ ও পারিবারিক মামলা</h2>
<p>উত্তরা, গুলশান এবং বনানীতে আবাসিক ফ্ল্যাট ও বাণিজ্যিক স্পেস ভাড়া নিয়ে বাড়িওয়ালা ও ভাড়াটিয়ার মধ্যে প্রায়ই বিরোধ তৈরি হয়। চুক্তির মেয়াদ শেষ হওয়ার পরও দোকান বা ফ্ল্যাট না ছাড়া, ভাড়া বকেয়া রাখা, কিংবা জামানত (Security Deposit) ফেরত না দেওয়া—এসব ক্ষেত্রে বাড়ি ভাড়া নিয়ন্ত্রণ আইন, ১৯৯১ এবং সম্পত্তি হস্তান্তর আইন, ১৮৮২-এর ১০৬ ধারা অনুযায়ী আইনানুগ নোটিশ ও দেওয়ানি আদালতে উচ্ছেদ মোকদ্দমা দায়ের করতে হয়। গায়ের জোরে তালা লাগানো বা বিদ্যুৎ-গ্যাস সংযোগ কাটা বেআইনি এবং তা বাড়ির মালিকের বিরুদ্ধেই ফৌজদারি মামলার ঝুঁকি তৈরি করে।</p>
<p>এছাড়া উত্তরা ও উত্তর ঢাকায় বসবাসরত পরিবারগুলোর তালাক, দেনমোহর ও খোরপোশ, সন্তানের হেফাজত (Child Custody), কোর্ট ম্যারেজ এবং প্রবাসীদের বিদেশি তালাক স্বীকৃতির বিষয়েও পারিবারিক আদালতে মামলা পরিচালনা ও মধ্যস্থতা করা হয়। উত্তরার সেক্টর ১২ চেম্বারে প্রথম পরামর্শ সম্পূর্ণ ফ্রি, যাতে আপনি মামলা করার আগে নিজের আইনগত অবস্থান ও বিকল্পগুলো পরিষ্কারভাবে বুঝতে পারেন।</p>
<h2>বসুন্ধরা আবাসিক এলাকা ও প্রবাসী বাংলাদেশিদের (NRB) জন্য বিশেষ আইনি সেবা</h2>
<p>বসুন্ধরা আবাসিক এলাকার প্লট ও ফ্ল্যাট লেনদেনের আইনি কাঠামো সাধারণ এলাকার চেয়ে কিছুটা ভিন্ন—এখানে রাজউক অনুমোদন ও নামজারির পাশাপাশি হাউজিং কোম্পানির অভ্যন্তরীণ হস্তান্তর প্রক্রিয়া, অ্যাপার্টমেন্ট কমিটির নিয়ম এবং মালিকানা যাচাইয়ের প্রশ্ন জড়িত থাকে। উত্তরার কাছাকাছি অবস্থান হওয়ায় বসুন্ধরা আবাসিক এলাকা, গুলশান ও বনানীর ক্লায়েন্টরাও উত্তরার সেক্টর ১২ চেম্বারে এসে দলিল ও চুক্তিপত্র যাচাই করাতে পারেন। পাশাপাশি যুক্তরাজ্য, যুক্তরাষ্ট্র, কানাডা, অস্ট্রেলিয়া ও মধ্যপ্রাচ্যে থাকা প্রবাসী বাংলাদেশিরা উত্তরা এবং উত্তর ঢাকায় থাকা তাদের জমি, ফ্ল্যাট ও পারিবারিক মামলার জন্য পাওয়ার অব অ্যাটর্নি, দূতাবাস ও পররাষ্ট্র মন্ত্রণালয় (MOFA) সত্যায়ন এবং আদালতে প্রতিনিধিত্বের সুবিধা পান।</p>
<h2>উত্তরা চেম্বার ও আইনি সেবা সম্পর্কে সাধারণ প্রশ্নোত্তর (FAQ)</h2>
<h3>১. উত্তরা সেক্টর ১২ চেম্বারে প্রথম পরামর্শের জন্য কি কোনো ফি লাগে?</h3>
<p>না। উত্তরা চেম্বারে প্রথম পরামর্শ সম্পূর্ণ ফ্রি — কোনো অগ্রিম ফি দিতে হয় না। আপনার কাগজপত্র ও মামলার ধরন পর্যালোচনা করে কাজের পরিধি বুঝিয়ে দেওয়ার পরেই কেবল পারস্পরিক সম্মতিতে ফি নির্ধারণ করা হয়।</p>
<h3>২. উত্তরা পশ্চিম বা উত্তরা পূর্ব থানায় জিডি বা এফআইআর হলে কীভাবে দ্রুত জামিনের ব্যবস্থা করা যায়?</h3>
<p>উত্তরা পশ্চিম বা উত্তরা পূর্ব থানায় মামলা দায়ের হলে দ্রুত এজাহারের কপি সংগ্রহ করে একজন ফৌজদারি আইনজীবীর পরামর্শ নেওয়া উচিত। গ্রেফতারের আশঙ্কা থাকলে হাইকোর্ট বিভাগে ফৌজদারি কার্যবিধির ৪৯৮ ধারায় আগাম জামিনের আবেদন করা যায় অথবা সিএমএম আদালতে নিয়মিত জামিন চাওয়া যায়। উত্তরা চেম্বার থেকে জরুরি ভিত্তিতে কাগজপত্র যাচাই ও পিটিশন প্রস্তুতের সহায়তা দেওয়া হয়।</p>
<h3>৩. উত্তরা, বসুন্ধরা আবাসিক এলাকা বা গুলশানের জমি-ফ্ল্যাট কেনার আগে কী কী যাচাই করতে হয়?</h3>
<p>উত্তরা বা বসুন্ধরা আবাসিক এলাকায় জমি ও ফ্ল্যাট কেনার আগে বায়া দলিলের ধারাবাহিকতা, সিএস-এসএ-আরএস ও মহানগর জরিপের খতিয়ান, সর্বশেষ নামজারি (ই-নামজারি) ও ভূমি উন্নয়ন করের রসিদ, রাজউক অনুমোদন এবং সাব-রেজিস্ট্রি অফিসে কোনো লিস পেন্ডেন্স বা মামলা চলমান আছে কি না তা যাচাই করা আবশ্যক।</p>
<h3>৪. প্রবাসী বাংলাদেশিরা (NRB) কি দেশে না এসে উত্তরা বা ঢাকার জমি সংক্রান্ত আইনি কাজ করতে পারেন?</h3>
<p>হ্যাঁ। যুক্তরাজ্য, যুক্তরাষ্ট্র, কানাডা, ইউরোপ বা মধ্যপ্রাচ্যে বসবাসরত প্রবাসীরা সংশ্লিষ্ট বাংলাদেশ দূতাবাসে পাওয়ার অব অ্যাটর্নি সম্পাদন এবং বাংলাদেশে পররাষ্ট্র মন্ত্রণালয়ে (MOFA) সত্যায়নের মাধ্যমে উত্তরা ও ঢাকার জমি বিক্রয়, নামজারি বা দেওয়ানি ও পারিবারিক মামলা পরিচালনা করতে পারেন।</p>
<h2>উত্তরা চেম্বারের বিশেষায়িত আইনি সেবাসমূহ</h2>
<p>The first consultation is free — you pay nothing in advance. প্রথম পরামর্শ ফ্রি — কোনো অগ্রিম ফি ছাড়াই আপনার সমস্যার আইনি অবস্থান ও করণীয় জেনে নিন।</p>
<p><a href="/bn/services/criminal-lawyer">ফৌজদারি আইনজীবী</a> &middot; <a href="/bn/services/bail-lawyer">জামিন আইনজীবী</a> &middot; <a href="/bn/services/land-lawyer">জমি ও সম্পত্তি আইনজীবী</a> &middot; <a href="/bn/services/divorce-lawyer">তালাক ও পারিবারিক আইনজীবী</a> &middot; <a href="/bn/services/supreme-court-lawyer">সুপ্রিম কোর্ট আইনজীবী</a> &middot; <a href="/bn/services/company-corporate-lawyer">কোম্পানি আইনজীবী</a> &middot; <a href="/bn/services/tax-lawyer">আয়কর ও ভ্যাট</a> &middot; <a href="/advocate-md-shah-alam">অ্যাডভোকেট মো. শাহ আলম</a> &middot; <a href="/nrb-legal-help">প্রবাসী (NRB) আইনি সহায়তা</a> &middot; <a href="/bn/contact">চেম্বারে যোগাযোগ</a> &middot; <a href="/blog/uttara-dhaka-lawyer-legal-services-2026">Uttara Legal Services Guide</a> &middot; <a href="/uttara-lawyer">English Version</a></p>
</article>` : `<article>
<h1>Uttara Lawyer in Dhaka — Criminal, Land, Bail &amp; Family Legal Services</h1>
<p>Advocate Md. Shah Alam is a Bangladesh Bar Council enrolled advocate practising before the Supreme Court of Bangladesh and Dhaka Judge Court. From his chamber in Sector 12, Uttara West (House 46, Road 6/B, Sector 12, Uttara West, Dhaka 1230), he represents local residents, businesses, and Non-Resident Bangladeshis (NRBs) with property or family matters across Uttara Sectors 1–17, Turag, Dakshinkhan, Airport, Gulshan, Banani, and Bashundhara Residential Area. The first consultation is free with no advance fee — legal fees are agreed only after explaining the scope of your matter.</p>
<h2>Quick Answer: Chamber Jurisdiction, Courts &amp; Free First Consultation</h2>
<table><thead><tr><th>Item</th><th>Details</th></tr></thead><tbody>
<tr><td>Uttara Chamber Address</td><td>House 46, Road 6/B, Sector 12, Uttara West, Dhaka 1230 (Sun–Thu 08:00–22:00, Fri–Sat 10:00–22:00 (Uttara))</td></tr>
<tr><td>Primary Police Stations</td><td>Uttara West PS, Uttara East PS, Turag PS, Dakshinkhan PS, Bimanbandar (Airport) PS, Gulshan PS, Banani PS, Vatara PS</td></tr>
<tr><td>Courts Covered</td><td>Dhaka Chief Metropolitan Magistrate (CMM) Court, Dhaka Judge &amp; Sessions Court (Kotwali), Family Court, and Supreme Court of Bangladesh (High Court Division)</td></tr>
<tr><td>Consultation Policy</td><td>First consultation is free — no advance fee. Legal fees are discussed and agreed only after reviewing your documents and scope.</td></tr>
</tbody></table>
<h2>Areas We Serve Around Uttara, Gulshan, Banani &amp; Bashundhara</h2>
<p>Knowing the exact police station (thana) and DNCC ward jurisdiction avoids delays in filing a General Diary (GD), FIR, mutation, or eviction notice. The station names and addresses below are verified against the Dhaka Metropolitan Police (DMP) directory:</p>
<table><thead><tr><th>Area</th><th>Police Station (DMP Verified)</th><th>DNCC Ward</th><th>Common Legal Matters</th></tr></thead><tbody>
<tr><td>Uttara Sectors 11–14 (Chamber: Sector 12)</td><td>Uttara West PS — H-48, Road 18, Sector 11</td><td>DNCC Ward 51</td><td>Land registration, mutation, cheque recovery, rent eviction, family disputes</td></tr>
<tr><td>Uttara Sectors 3, 5, 7, 9, 10</td><td>Uttara West PS — H-48, Road 18, Sector 11</td><td>DNCC Ward 1 / 51</td><td>Property transfer, bail &amp; FIR matters, inheritance &amp; succession</td></tr>
<tr><td>Uttara Sectors 1, 2, 4, 6, 8</td><td>Uttara East PS — R-14/D, Sector 4, H-12</td><td>DNCC Ward 1</td><td>Section 138 cheque dishonour, bail petitions, commercial &amp; tenancy matters</td></tr>
<tr><td>Baunia, Dolipara, Diabari, Kamarpara, Bhatulia</td><td>Uttara West PS / Turag PS / Dakshinkhan PS</td><td>DNCC Ward 52–54</td><td>Khatian/CS-RS-BS record correction, boundary &amp; partition suits, civil injunction</td></tr>
<tr><td>Turag</td><td>Turag PS (DMP Directory)</td><td>DNCC Ward 1 / 52</td><td>Land possession, tenancy disputes, criminal defence &amp; bail</td></tr>
<tr><td>Dakshinkhan</td><td>Dakshinkhan PS — Bidurbari Road, Thana More</td><td>DNCC Ward 48–50</td><td>Family court cases, maintenance, custody, land mutation</td></tr>
<tr><td>Airport (Bimanbandar)</td><td>Bimanbandar PS — 1st Floor RAB (HQ), Uttara</td><td>—</td><td>Urgent arrest/bail support, NRB arrival &amp; travel-ban writ matters</td></tr>
<tr><td>Gulshan</td><td>Gulshan PS — H-32, 115 Gulshan Avenue, Gulshan-2</td><td>DNCC Ward 19 / 35–36</td><td>Rent Control Act 1991 eviction, corporate advisory, embassy/MOFA attestation</td></tr>
<tr><td>Banani</td><td>Banani PS — R-7, H-37, Banani</td><td>DNCC Ward 19</td><td>RJSC company filings, commercial lease disputes, NRB Power of Attorney</td></tr>
<tr><td>Bashundhara Residential Area</td><td>Vatara PS — Progoti Soroni, Gulshan Notun Bazar</td><td>DNCC / Proposed PS</td><td>Plot/flat title verification, transfer approval, apartment committee &amp; eviction</td></tr>
</tbody></table>
<h2>Land Registration, Mutation &amp; Property Litigation in Uttara and Bashundhara</h2>
<p>Property transactions across Uttara Sectors 1–17, Diabari, Baunia, Turag, and nearby Bashundhara Residential Area carry significant title risks if deeds are not vetted before signing a Bayna (agreement for sale). Common issues include incomplete chain deeds (Baya Dalil), unverified RAJUK transfer permissions, mismatched CS/SA/RS/City Jarip Khatian records, pending civil suits (Lis Pendens), and delayed e-Namjari (mutation) before the local AC Land office.</p>
<p>From our Uttara Sector 12 chamber, we conduct pre-purchase title due diligence, draft sale deeds, Heba declarations, and partition deeds, verify Non-Resident Bangladeshi (NRB) Powers of Attorney executed abroad, and represent clients in civil suits for declaration of title, permanent injunction, cancellation of forged deeds, and recovery of possession before Dhaka civil courts.</p>
<h2>Criminal Defence, Bail &amp; Section 138 Cheque Cases in Uttara Police Stations</h2>
<p>When a General Diary (GD), FIR, or warrant involves Uttara West Police Station, Uttara East Police Station, Turag PS, Dakshinkhan PS, or Bimanbandar (Airport) PS, early legal intervention protects your liberty and record. We assist with High Court anticipatory bail applications under Section 498 of the CrPC, regular bail hearings before the Dhaka CMM and Sessions Courts, police remand protection, and Section 561A quashment petitions for fabricated complaints.</p>
<p>For commercial and personal cheque dishonour disputes under Section 138 of the Negotiable Instruments Act, we handle statutory 30-day legal notices, filing complaints before the CMM Court, defending false cheque claims, and negotiating structured settlements. Having a local chamber inside Uttara Sector 12 allows families and business owners to bring certified copies and evidence without crossing the entire city during urgent deadlines.</p>
<h2>Rent Control, Tenant Eviction &amp; Family Law Across Uttara, Gulshan &amp; Banani</h2>
<p>Landlords and commercial tenants in Uttara, Gulshan, Banani, and Bashundhara frequently face disputes over unpaid rent, expired lease agreements, security deposit refunds, and refusal to vacate premises. Under the Premises Rent Control Act 1991 and Section 106 of the Transfer of Property Act 1882, landlords must serve a legally compliant notice to quit before filing an eviction suit in the Assistant Judge Court—cutting utility lines or locking premises forcefully exposes the landlord to criminal liability.</p>
<p>Our family law practice covers divorce (Talaq, Khula, and Mubaraat), dower (Denmohor) and maintenance claims, child custody and guardianship petitions, court marriage under Muslim and Special Marriage Acts, and recognition of foreign divorce decrees for NRBs. Every matter begins with a free first consultation so you understand your legal position and options before committing to litigation.</p>
<h2>Frequently Asked Questions — Uttara Legal Chamber</h2>
<h3>1. Is the first consultation at the Uttara Sector 12 chamber really free?</h3>
<p>Yes. The first consultation is free with no advance fee. We review your documents, explain the applicable legal procedure and court jurisdiction, and agree on legal fees only after the scope of work is clear.</p>
<h3>2. Which courts handle cases from Uttara West PS, Uttara East PS, Turag, and Dakshinkhan?</h3>
<p>Criminal and Section 138 cheque matters from Uttara West, Uttara East, Turag, Dakshinkhan, and Bimanbandar police stations are heard at the Dhaka Chief Metropolitan Magistrate (CMM) Court and Dhaka Sessions Judge Court at Kotwali. Civil land, partition, and rent eviction suits are filed in the Dhaka Civil / Assistant Judge Courts, while anticipatory bail and Article 102 writ petitions are filed before the High Court Division of the Supreme Court of Bangladesh.</p>
<h3>3. What should be checked before buying a plot or apartment in Uttara or Bashundhara R/A?</h3>
<p>Before signing a Bayna or paying an advance, verify the complete chain of title deeds (Baya Dalil), CS/SA/RS/City Jarip Khatian records, current e-Namjari mutation and land tax receipts, RAJUK plan/transfer clearance, housing society transfer requirements in Bashundhara Residential Area, and whether any civil suit (Lis Pendens) or mortgage encumbrance affects the property.</p>
<h3>4. Can Non-Resident Bangladeshis (NRBs) handle Uttara or Dhaka property matters remotely?</h3>
<p>Yes. NRBs in the UK, USA, Canada, UAE, and Europe can execute a Power of Attorney at the nearest Bangladesh Embassy or Consulate, complete MOFA attestation in Dhaka, and authorise legal representation for property verification, mutation, sale, or family court proceedings without travelling immediately to Bangladesh.</p>
<h2>Practice Areas &amp; Legal Services</h2>
<p>The first consultation is free — you pay nothing in advance. প্রথম পরামর্শ ফ্রি — কোনো অগ্রিম ফি ছাড়াই আপনার সমস্যার আইনি অবস্থান ও করণীয় জেনে নিন।</p>
<p><a href="/services/criminal-lawyer">Criminal Lawyer</a> &middot; <a href="/services/bail-lawyer">Bail Lawyer</a> &middot; <a href="/services/land-lawyer">Land Lawyer</a> &middot; <a href="/services/divorce-lawyer">Divorce &amp; Family Lawyer</a> &middot; <a href="/services/supreme-court-lawyer">Supreme Court Lawyer</a> &middot; <a href="/services/company-corporate-lawyer">Corporate Lawyer</a> &middot; <a href="/services/tax-lawyer">Tax Advisory</a> &middot; <a href="/advocate-md-shah-alam">Advocate Md. Shah Alam</a> &middot; <a href="/nrb-legal-help">NRB Legal Help</a> &middot; <a href="/contact">Contact Chamber</a> &middot; <a href="/blog/uttara-dhaka-lawyer-legal-services-2026">Uttara Legal Services Guide</a> &middot; <a href="/bn/uttara-lawyer">বাংলা সংস্করণ</a></p>
</article>`;
    const html = buildPage(base, {
      title: uTitle,
      description: uDesc,
      canonical: uUrl,
      lang: uLang,
      extraHead: `${uHreflang}
<script type="application/ld+json">${jsonLd(uSchema)}</script>`,
      body: uBody,
    });
    const outDir = isBn ? path.join(DIST, 'bn', 'uttara-lawyer') : path.join(DIST, 'uttara-lawyer');
    write(path.join(outDir, 'index.html'), html);
    console.log(`  ✓ ${uPath}`);
  }

  // ── Localized 404 pages (dist/404.html, /404, /bn/404) ──────────────────────
  {
    const notFoundBodyEn = `<h1 style="font-size:30px;font-weight:700;margin-bottom:8px;color:#0a0a0a">Page Not Found (404)</h1>
<p style="font-size:16px;color:#444;margin-bottom:20px">The page you are looking for does not exist or has been moved.</p>
<p><a href="/en" style="color:#1a56db;font-weight:600">Return to English Home</a> &middot; <a href="/blog" style="color:#1a56db;font-weight:600">Browse Legal Guides</a> &middot; <a href="/contact" style="color:#1a56db;font-weight:600">Contact Chamber</a></p>`;

    const notFoundBodyBn = `<h1 style="font-size:30px;font-weight:700;margin-bottom:8px;color:#0a0a0a">পেজ পাওয়া যায়নি (৪০৪)</h1>
<p style="font-size:16px;color:#444;margin-bottom:20px">আপনি যে পেজটি খুঁজছেন সেটি নেই বা সরানো হয়েছে।</p>
<p><a href="/" style="color:#1a56db;font-weight:600">হোমপেজে ফিরে যান</a> &middot; <a href="/bn/blog" style="color:#1a56db;font-weight:600">আইনি নিবন্ধ পড়ুন</a> &middot; <a href="/bn/contact" style="color:#1a56db;font-weight:600">যোগাযোগ করুন</a></p>`;

    const html404En = buildPage(base, {
      title: 'Page Not Found – 404 | Advocate Md. Shah Alam',
      description: 'The page you are looking for does not exist. Return to the homepage of Advocate Md. Shah Alam – Supreme Court Lawyer in Dhaka.',
      canonical: null,
      robots: 'noindex, follow',
      lang: 'en',
      body: notFoundBodyEn,
    });
    write(path.join(DIST, '404.html'), html404En);
    write(path.join(DIST, '404', 'index.html'), html404En);
    console.log('  ✓ /404 & 404.html (en, noindex)');

    const html404Bn = buildPage(base, {
      title: 'পেজ পাওয়া যায়নি – ৪০৪ | এডভোকেট মোঃ শাহ আলম',
      description: 'আপনি যে পেজটি খুঁজছেন তা পাওয়া যায়নি। এডভোকেট মোঃ শাহ আলম-এর হোমপেজে ফিরে যান।',
      canonical: null,
      robots: 'noindex, follow',
      lang: 'bn',
      body: notFoundBodyBn,
    });
    write(path.join(DIST, 'bn', '404', 'index.html'), html404Bn);
    console.log('  ✓ /bn/404 (bn, noindex)');
  }

  // ── Service pages ──────────────────────────────────────────────────────────
  console.log('\n⚖️  Pre-rendering service pages (EN & BN)...');
  const serviceSlugs = ['criminal-lawyer','bail-lawyer','divorce-lawyer','land-lawyer','supreme-court-lawyer','company-corporate-lawyer','tax-lawyer'];
  for (const slug of serviceSlugs) {
    const enData = SERVICE_PAGES_EN[slug];
    if (enData) {
      const extraHead = `<link rel="alternate" hreflang="en" href="${BASE}/services/${slug}" />
<link rel="alternate" hreflang="bn" href="${BASE}/bn/services/${slug}" />
<link rel="alternate" hreflang="x-default" href="${BASE}/services/${slug}" />
${buildServiceSchema(`${BASE}/services/${slug}`, enData, 'en')}`;
      const html = buildPage(base, {
        title: enData.metaTitle,
        description: enData.metaDesc,
        canonical: `${BASE}/services/${slug}`,
        body: buildServiceStaticBody(enData, false),
        lang: 'en',
        extraHead,
      });
      write(path.join(DIST, 'services', slug, 'index.html'), html);
      console.log(`  ✓ /services/${slug}`);
    }

    const bnData = SERVICE_PAGES_BN[slug];
    if (bnData) {
      const extraHead = `<link rel="alternate" hreflang="bn" href="${BASE}/bn/services/${slug}" />
<link rel="alternate" hreflang="en" href="${BASE}/services/${slug}" />
<link rel="alternate" hreflang="x-default" href="${BASE}/services/${slug}" />
${buildServiceSchema(`${BASE}/bn/services/${slug}`, bnData, 'bn')}`;
      const bnHtml = buildPage(base, {
        title: bnData.metaTitle,
        description: bnData.metaDesc,
        canonical: `${BASE}/bn/services/${slug}`,
        body: buildServiceStaticBody(bnData, true),
        lang: 'bn',
        extraHead,
      });
      write(path.join(DIST, 'bn', 'services', slug, 'index.html'), bnHtml);
      console.log(`  ✓ /bn/services/${slug}`);
    }
  }

  // ── Vite manifest (for per-post chunk modulepreload) ───────────────────────
  const manifestPath = path.join(DIST, '.vite', 'manifest.json');
  const viteManifest = fs.existsSync(manifestPath) ? (jsonLoad(manifestPath) || {}) : {};
  function postChunkFor(langKey, slug) {
    const key = `src/content/posts/${langKey}/${slug}.json`;
    return viteManifest[key]?.file || null;
  }

  // ── Blog indexes ───────────────────────────────────────────────────────────
  console.log('\n📋 Pre-rendering blog indexes...');
  const enFiles = fs.readdirSync(EN_DIR).filter(f => f.endsWith('.json'));
  const enPosts = enFiles
    .map(f => jsonLoad(path.join(EN_DIR, f)))
    .filter(p => p && p.slug && !p.isDraft && !p._draft && !redirectSources.has('/blog/' + p.slug))
    .map(p => ({ ...p, title: evergreenYear(p.title) }))
    .sort((a, b) => freshnessTs(b) - freshnessTs(a) || a.slug.localeCompare(b.slug));
  const enPostBySlug = new Map(enPosts.map(p => [p.slug, p]));

  const bnFiles = fs.readdirSync(BN_DIR).filter(f => f.endsWith('.json'));
  const bnPosts = bnFiles
    .map(f => jsonLoad(path.join(BN_DIR, f)))
    .filter(p => p && p.slug && !p.isDraft && !p._draft && !redirectSources.has('/bn/blog/' + p.slug))
    .map(p => ({ ...p, title: evergreenYear(p.title) }))
    .sort((a, b) => freshnessTs(b) - freshnessTs(a) || a.slug.localeCompare(b.slug));
  const bnPostBySlug = new Map(bnPosts.map(p => [p.slug, p]));

  {
    const hasPage2 = enPosts.length > 24;
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': `${BASE}/blog#webpage`,
          url: `${BASE}/blog`,
          name: 'Bangladesh Legal Guides & Law Blog | Adv. Shah Alam',
          inLanguage: 'en',
          isPartOf: { '@id': `${BASE}/#website` },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/en` },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE}/blog` },
          ],
        },
      ],
    };
    const extraHead = `<link rel="alternate" hreflang="en" href="${BASE}/blog" />
<link rel="alternate" hreflang="bn" href="${BASE}/bn/blog" />
<link rel="alternate" hreflang="x-default" href="${BASE}/blog" />
<script type="application/ld+json">${jsonLd(schema)}</script>` + (hasPage2 ? `\n<link rel="next" href="${BASE}/blog/page/2" />` : '');
    const html = buildPage(base, {
      title: 'Bangladesh Legal Guides & Law Blog | Adv. Shah Alam',
      description: 'Read expert legal guides on Bangladesh criminal law, High Court bail, divorce, land registration, mutation, and corporate law by Advocate Md. Shah Alam.',
      canonical: `${BASE}/blog`,
      body: blogIndexBody(enPosts, 'en'),
      lang: 'en',
      extraHead,
    });
    write(path.join(DIST, 'blog', 'index.html'), html);
    console.log('  ✓ /blog');
  }
  {
    const hasPage2 = bnPosts.length > 24;
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': `${BASE}/bn/blog#webpage`,
          url: `${BASE}/bn/blog`,
          name: 'বাংলাদেশ আইনি গাইড ও ব্লগ | এডভোকেট মোঃ শাহ আলম',
          inLanguage: 'bn',
          isPartOf: { '@id': `${BASE}/#website` },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'হোম', item: `${BASE}/` },
            { '@type': 'ListItem', position: 2, name: 'ব্লগ', item: `${BASE}/bn/blog` },
          ],
        },
      ],
    };
    const extraHead = `<link rel="alternate" hreflang="bn" href="${BASE}/bn/blog" />
<link rel="alternate" hreflang="en" href="${BASE}/blog" />
<link rel="alternate" hreflang="x-default" href="${BASE}/blog" />
<script type="application/ld+json">${jsonLd(schema)}</script>` + (hasPage2 ? `\n<link rel="next" href="${BASE}/bn/blog/page/2" />` : '');
    const html = buildPage(base, {
      title: 'বাংলাদেশ আইনি গাইড ও ব্লগ | এডভোকেট মোঃ শাহ আলম',
      description: 'বাংলাদেশের ফৌজদারি, জামিন, তালাক, জমি রেজিস্ট্রি, নামজারি, বাটোয়ারা ও সুপ্রিম কোর্ট আইন বিষয়ক বিস্তারিত বাংলা আইনি গাইড পড়ুন।',
      canonical: `${BASE}/bn/blog`,
      body: blogIndexBody(bnPosts, 'bn'),
      lang: 'bn',
      extraHead,
    });
    write(path.join(DIST, 'bn', 'blog', 'index.html'), html);
    console.log('  ✓ /bn/blog');
  }

  // ── Crawlable Blog Pagination (/blog/page/2..N & /bn/blog/page/2..N) ───────
  const PER_PAGE = 24;
  for (const [langKey, list, prefix, label] of [
    ['en', enPosts, '/blog', pageHeadings.blogPagePrefixEn],
    ['bn', bnPosts, '/bn/blog', pageHeadings.blogPagePrefixBn],
  ]) {
    const totalPages = Math.max(1, Math.ceil(list.length / PER_PAGE));
    for (let p = 2; p <= totalPages; p++) {
      const slice = list.slice((p - 1) * PER_PAGE, p * PER_PAGE);
      const prevHref = p === 2 ? `${BASE}${prefix}` : `${BASE}${prefix}/page/${p - 1}`;
      const nextHref = p < totalPages ? `${BASE}${prefix}/page/${p + 1}` : null;
      const relLinks = `<link rel="prev" href="${prevHref}" />` + (nextHref ? `\n<link rel="next" href="${nextHref}" />` : '');
      const navLinks = Array.from({ length: totalPages }, (_, i) => {
        const n = i + 1;
        const href = n === 1 ? prefix : `${prefix}/page/${n}`;
        return `<a href="${href}" style="padding:6px 12px;border:1px solid #CBD5E1;border-radius:6px;margin:2px;display:inline-block;${n === p ? 'background:#132A4A;color:#fff;font-weight:700' : 'color:#132A4A'}">${n}</a>`;
      }).join(' ');
      const itemsHtml = slice.map(post => `<li style="margin:10px 0"><a href="${prefix}/${post.slug}" style="font-weight:600;color:#132A4A">${escHtml(evergreenYear(post.title))}</a></li>`).join('');
      const pageHtml = buildPage(base, {
        title: `${label} — Page ${p} | Adv. Shah Alam`,
        description: `${label} archive page ${p} of ${totalPages} by Advocate Md. Shah Alam, Supreme Court of Bangladesh.`,
        canonical: `${BASE}${prefix}/page/${p}`,
        lang: langKey,
        extraHead: relLinks,
        body: `<h1 style="font-size:28px;font-weight:700;color:#0B1220">${escHtml(label)} (Page ${p})</h1><ul>${itemsHtml}</ul><nav aria-label="Pagination" style="margin-top:24px">${navLinks}</nav>`,
      });
      write(path.join(DIST, prefix.replace(/^\/+/, ''), 'page', String(p), 'index.html'), pageHtml);
    }
    console.log(`  ✓ ${prefix}/page/2..${totalPages} (${langKey})`);
  }

  // ── Topic Cluster Hub Pages (/blog/topic/* & /bn/blog/topic/*) ─────────────
  for (const hub of topics) {
    const rx = new RegExp(hub.regex, 'i');
    const enUrl = `${BASE}/blog/topic/${hub.slug}`;
    const bnUrl = `${BASE}/bn/blog/topic/${hub.slug}`;
    const hubHreflang = `<link rel="alternate" hreflang="en" href="${enUrl}" />
<link rel="alternate" hreflang="bn" href="${bnUrl}" />
<link rel="alternate" hreflang="x-default" href="${enUrl}" />`;
    for (const [langKey, list, prefix, svcPrefix] of [
      ['en', enPosts, '/blog', '/services'],
      ['bn', bnPosts, '/bn/blog', '/bn/services'],
    ]) {
      const matched = list.filter(p => rx.test(`${p.slug} ${p.title} ${p.category || ''}`));
      const title = langKey === 'en' ? `${hub.en} | Adv. Shah Alam` : `${hub.bn} | এডভোকেট শাহ আলম`;
      const h1 = langKey === 'en' ? hub.en : hub.bn;
      const itemsHtml = matched.map(p => `<li style="margin:8px 0"><a href="${prefix}/${p.slug}" style="color:#132A4A;font-weight:600">${escHtml(p.title)}</a></li>`).join('');
      const hubSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: h1,
        url: `${BASE}${prefix}/topic/${hub.slug}`,
        inLanguage: langKey,
      };
      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: langKey === 'en' ? 'Home' : 'হোম', item: langKey === 'en' ? `${BASE}/en` : `${BASE}/` },
          { '@type': 'ListItem', position: 2, name: langKey === 'en' ? 'Blog' : 'ব্লগ', item: `${BASE}${prefix}` },
          { '@type': 'ListItem', position: 3, name: h1, item: `${BASE}${prefix}/topic/${hub.slug}` },
        ],
      };
      const hubHtml = buildPage(base, {
        title: title.slice(0, 58),
        description: `${h1} — ${matched.length} expert legal articles and statute guides by Advocate Md. Shah Alam.`,
        canonical: `${BASE}${prefix}/topic/${hub.slug}`,
        lang: langKey,
        extraHead: `${hubHreflang}\n<script type="application/ld+json">${jsonLd(hubSchema)}</script>\n<script type="application/ld+json">${jsonLd(breadcrumbSchema)}</script>`,
        body: `<nav aria-label="Breadcrumb" style="font-size:13px;color:#475569;margin-bottom:14px"><a href="${langKey === 'en' ? '/en' : '/'}">${langKey === 'en' ? 'Home' : 'হোম'}</a> &rsaquo; <a href="${prefix}">${langKey === 'en' ? 'Blog' : 'ব্লগ'}</a> &rsaquo; <span>${escHtml(h1)}</span></nav>
<h1 style="font-size:28px;font-weight:700;color:#0B1220">${escHtml(h1)}</h1>
<p style="margin:12px 0 16px;color:#334155;line-height:1.8">${langKey === 'en'
  ? `This curated legal resource hub brings together ${matched.length} statute-grounded guides on ${escHtml(hub.en)} under the laws of Bangladesh, authored and reviewed by Advocate Md. Shah Alam (Supreme Court of Bangladesh &amp; Metro Sessions Judge Court, Dhaka). Whether you are seeking urgent High Court intervention, Magistrate Court procedural remedies, document verification, or Non-Resident Bangladeshi (NRB) representation, each guide below cites the governing statutory sections, filing deadlines, court forums, and required evidentiary documents.`
  : `${escHtml(hub.bn)} বিষয়ে বাংলাদেশের প্রচলিত আইন, আদালতের এখতিয়ার এবং ধাপে ধাপে আইনি প্রতিকার নিয়ে অ্যাডভোকেট মো. শাহ আলম (সুপ্রিম কোর্ট অব বাংলাদেশ ও ঢাকা জজ কোর্ট)-এর তত্ত্বাবধানে রচিত ${matched.length}টি পূর্ণাঙ্গ আইনি গাইড এখানে সংকলিত হয়েছে। প্রতিটি নিবন্ধে সংশ্লিষ্ট আইনের ধারা, মামলা বা আবেদনের সময়সীমা, প্রয়োজনীয় কাগজপত্রের তালিকা এবং আদালতের প্রক্রিয়া স্পষ্টভাবে তুলে ধরা হয়েছে।`}</p>
<div style="margin:0 0 20px;padding:14px 18px;background:#F8FAFC;border-left:4px solid #C9A227;border-radius:8px;color:#0B1220;font-size:14px;line-height:1.7">${langKey === 'en'
  ? '<strong>First Consultation is Free.</strong> Share a brief summary of your case on WhatsApp (+880 1955-802007) or phone (+880 1712-655546) with zero advance payment. Formal chamber fees apply only if you visit the Uttara Sector 12 or Dhaka Judge Court chamber with documents for drafting or court representation.'
  : '<strong>প্রথম পরামর্শ ফ্রি।</strong> কোনো অগ্রিম ফি ছাড়াই WhatsApp (+880 1955-802007) বা ফোনে (+880 1712-655546) আপনার মামলার প্রাথমিক তথ্য জানিয়ে মতামত নিন। কাগজপত্র নিয়ে উত্তরা বা ঢাকা জজ কোর্ট চেম্বারে সাক্ষাৎ করলে তখন চেম্বার ফি প্রযোজ্য হবে।'}</div>
<p style="margin:12px 0 20px"><a href="${svcPrefix}/${hub.service}" style="color:#132A4A;font-weight:700">${langKey === 'en' ? 'View Practice Area & Consult Advocate →' : 'মূল আইনি সেবা ও পরামর্শ দেখুন →'}</a></p>
<ul>${itemsHtml}</ul>
<section style="margin-top:28px;padding-top:20px;border-top:1px solid #E2E8F0;color:#334155;font-size:14px;line-height:1.8">
  <h2 style="font-size:19px;font-weight:700;color:#0B1220;margin-bottom:10px">${langKey === 'en' ? `How We Handle ${escHtml(hub.en)} Cases in Bangladesh` : `${escHtml(hub.bn)} সংক্রান্ত মামলায় আমাদের আইনি সহায়তা`}</h2>
  <p style="margin-bottom:10px">${langKey === 'en'
    ? `Every case in ${escHtml(hub.en)} turns on exact statutory compliance, verified documentary records, and timely filing before the competent forum—whether the High Court Division of the Supreme Court of Bangladesh, District &amp; Sessions Judge Courts, Metropolitan Magistrate Courts, Family Courts, or Special Tribunals. Our Dhaka chamber assists both resident citizens and NRBs abroad through Embassy-attested Power of Attorney coordination, certified court copy collection, and end-to-end courtroom representation.`
    : `${escHtml(hub.bn)} সংক্রান্ত প্রতিটি মামলায় সঠিক আইনের ধারা নির্বাচন, নির্ভুল নথিপত্র যাচাই এবং নির্ধারিত সময়সীমার মধ্যে উপযুক্ত আদালতে (হাইকোর্ট বিভাগ, জেলা ও দায়রা জজ আদালত, চিফ মেট্রোপলিটন ম্যাজিস্ট্রেট আদালত বা বিশেষ ট্রাইব্যুনাল) আবেদন দাখিল অত্যন্ত গুরুত্বপূর্ণ। দেশীয় মক্কেল ও প্রবাসী বাংলাদেশিরা (NRB) প্রয়োজনে আমাদের <a href="/contact" style="color:#132A4A;font-weight:600">যোগাযোগ পেজ</a> বা <a href="/advocate-md-shah-alam" style="color:#132A4A;font-weight:600">আইনজীবী প্রোফাইল</a> দেখে সরাসরি পরামর্শ নিতে পারেন।`}</p>
</section>`,
      });
      write(path.join(DIST, prefix.replace(/^\/+/, ''), 'topic', hub.slug, 'index.html'), hubHtml);
    }
  }
  console.log(`  ✓ ${topics.length * 2} topic cluster hub pages (/blog/topic/* & /bn/blog/topic/*)`);

  // ── EN blog posts ──────────────────────────────────────────────────────────
  console.log('\n📚 Pre-rendering EN blog posts...');
  let enCount = 0;
  for (const post of enPosts) {
    const postCanonical = post.canonicalUrl || `${BASE}/blog/${post.slug}`;
    const enMetaDesc = evergreenYear(post.metaDescription || (post.heroIntro || '').replace(/<[^>]*>/g, '').trim()).slice(0, 160);
    const chunkFile = postChunkFor('en', post.slug);
    const preloadTags = (chunkFile ? `<link rel="modulepreload" href="/${chunkFile}" as="script" crossorigin />\n` : '')
      + `<link rel="preload" as="image" href="${coverFor(post.category)}" fetchpriority="high" />`;

    // Explicit, reciprocal pairs only (scripts/audit-hreflang.mjs keeps the data clean) - same tags as the React page
    const hreflangTags = buildHreflang({ lang: 'en', slug: post.slug, pairedSlug: post.bnSlug })
      .map((h) => `<link rel="alternate" hreflang="${h.hrefLang}" href="${h.href}" />`).join('\n');

    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: evergreenYear(post.title),
      description: enMetaDesc,
      datePublished: post.publishedDate || TODAY,
      dateModified: post.lastModified || post.publishedDate || TODAY,
      inLanguage: 'en',
      mainEntityOfPage: { '@type': 'WebPage', '@id': postCanonical },
      author: {
        '@type': 'Person',
        '@id': `${BASE}/#attorney`,
        name: 'Advocate Md. Shah Alam',
        url: `${BASE}/advocate-md-shah-alam`,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Advocate Md. Shah Alam Law Chambers',
        url: BASE,
        logo: { '@type': 'ImageObject', url: `${BASE}/adv-md-shah-alam.png` },
      },
      image: post.featuredImage || `${BASE}/images/hero/hero-md-shah-alam.png`,
    };

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/en` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE}/blog` },
        { '@type': 'ListItem', position: 3, name: evergreenYear(post.title), item: postCanonical },
      ],
    };

    const faqItemsEn = (Array.isArray(post.faqs) ? post.faqs : [])
      .map(f => ({ q: f.question || f.q, a: f.answer || f.a }))
      .filter(f => f.q && f.a);
    const faqSchemaEn = faqItemsEn.length > 0 ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItemsEn.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    } : null;

    const extraHead = `${preloadTags}
${hreflangTags}
<script type="application/ld+json">${jsonLd(articleSchema)}</script>
<script type="application/ld+json">${jsonLd(breadcrumbSchema)}</script>${faqSchemaEn ? `\n<script type="application/ld+json">${jsonLd(faqSchemaEn)}</script>` : ''}`;

    const html = buildPage(base, {
      title: evergreenYear(post.metaTitle || post.title),
      description: enMetaDesc,
      canonical: postCanonical,
      body: buildPostBody(post, enPostBySlug),
      lang: 'en',
      extraHead,
      ogImage: post.featuredImage || `${BASE}/images/hero/hero-md-shah-alam.png`,
    });
    write(path.join(DIST, 'blog', post.slug, 'index.html'), html);
    enCount++;
  }
  console.log(`  ✓ ${enCount} EN posts`);

  // ── BN blog posts ──────────────────────────────────────────────────────────
  console.log('\n📚 Pre-rendering BN blog posts...');
  let bnCount = 0;
  for (const post of bnPosts) {
    const postCanonical = post.canonicalUrl || `${BASE}/bn/blog/${post.slug}`;
    const bnMetaDesc = evergreenYear(post.metaDescription || (post.heroIntro || '').replace(/<[^>]*>/g, '').trim()).slice(0, 160);
    const chunkFile = postChunkFor('bn', post.slug);
    const preloadTags = (chunkFile ? `<link rel="modulepreload" href="/${chunkFile}" as="script" crossorigin />\n` : '')
      + `<link rel="preload" as="image" href="${coverFor(post.category)}" fetchpriority="high" />`;

    const hreflangTags = buildHreflang({ lang: 'bn', slug: post.slug, pairedSlug: post.enSlug })
      .map((h) => `<link rel="alternate" hreflang="${h.hrefLang}" href="${h.href}" />`).join('\n');

    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: evergreenYear(post.title),
      description: bnMetaDesc,
      datePublished: post.publishedDate || TODAY,
      dateModified: post.lastModified || post.publishedDate || TODAY,
      inLanguage: 'bn',
      mainEntityOfPage: { '@type': 'WebPage', '@id': postCanonical },
      author: {
        '@type': 'Person',
        '@id': `${BASE}/#attorney`,
        name: 'Advocate Md. Shah Alam',
        alternateName: 'এডভোকেট মোঃ শাহ আলম',
        url: `${BASE}/advocate-md-shah-alam`,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Advocate Md. Shah Alam Law Chambers',
        url: BASE,
        logo: { '@type': 'ImageObject', url: `${BASE}/adv-md-shah-alam.png` },
      },
      image: post.featuredImage || `${BASE}/images/hero/hero-md-shah-alam.png`,
    };

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'হোম', item: `${BASE}/` },
        { '@type': 'ListItem', position: 2, name: 'বাংলা ব্লগ', item: `${BASE}/bn/blog` },
        { '@type': 'ListItem', position: 3, name: evergreenYear(post.title), item: postCanonical },
      ],
    };

    const faqItemsBn = (Array.isArray(post.faqs) ? post.faqs : [])
      .map(f => ({ q: f.question || f.q, a: f.answer || f.a }))
      .filter(f => f.q && f.a);
    const faqSchemaBn = faqItemsBn.length > 0 ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItemsBn.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    } : null;

    const extraHead = `${preloadTags}
${hreflangTags}
<script type="application/ld+json">${jsonLd(articleSchema)}</script>
<script type="application/ld+json">${jsonLd(breadcrumbSchema)}</script>${faqSchemaBn ? `\n<script type="application/ld+json">${jsonLd(faqSchemaBn)}</script>` : ''}`;

    const html = buildPage(base, {
      title: evergreenYear(post.metaTitle || post.title || 'বাংলাদেশ আইনি গাইড'),
      description: bnMetaDesc,
      canonical: postCanonical,
      body: buildBnPostBody(post, bnPostBySlug),
      lang: 'bn',
      extraHead,
      ogImage: post.featuredImage || `${BASE}/images/hero/hero-md-shah-alam.png`,
    });
    write(path.join(DIST, 'bn', 'blog', post.slug, 'index.html'), html);
    bnCount++;
  }
  console.log(`  ✓ ${bnCount} BN posts`);

  const total = enCount + bnCount + serviceSlugs.length + 9; // +9 core pages (including /bn/contact)
  console.log(`\n✅ Pre-rendering complete: ${total} pages total\n`);
}

main().catch(err => { console.error('Pre-render failed:', err); process.exit(1); });
