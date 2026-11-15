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
<h1 style="font-size:30px;font-weight:700;margin-bottom:8px;color:#0B1220">${escHtml(post.title)}</h1>
<p style="color:#475569;font-size:14px;margin-bottom:20px">By <a href="/advocate-md-shah-alam" style="color:#132A4A;font-weight:700">Advocate Md. Shah Alam</a> &middot; ${escHtml(post.publishedDate||'')} &middot; ${escHtml(post.readTime||'')}</p>
${directAnswer}
${DISCLAIMER}
<p style="font-size:16px;color:#333;margin-bottom:24px">${escHtml(post.heroIntro||'')}</p>
<article>
${buildPillarAndTableHtml(post, 'en')}${toc}${sections}${faqs}${relatedArticlesHtml}${CONCLUSION_DISCLAIMER_EN}
</article>
<section style="margin-top:32px;padding:18px;background:#F7F8FA;border-radius:8px;border:1px solid #E2E8F0">
  <h2 style="font-size:18px;font-weight:700;margin-bottom:10px;color:#0B1220">Related Legal Resources &amp; Services</h2>
  <p style="font-size:14px;line-height:1.8"><a href="/services/criminal-lawyer">Criminal Defense</a> &middot; <a href="/services/bail-lawyer">Bail &amp; Anticipatory Bail</a> &middot; <a href="/services/divorce-lawyer">Divorce &amp; Family Law</a> &middot; <a href="/services/land-lawyer">Land &amp; Property Law</a> &middot; <a href="/nrb-legal-help">NRB Legal Help</a> &middot; <a href="/contact">Book Consultation</a></p>
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
<h1 style="font-size:30px;font-weight:700;margin-bottom:8px;color:#0B1220">${escHtml(post.title || '')}</h1>
<p style="color:#475569;font-size:14px;margin-bottom:20px">লেখক: <a href="/advocate-md-shah-alam" style="color:#132A4A;font-weight:700">অ্যাডভোকেট মো. শাহ আলম</a> &middot; ${escHtml(post.publishedDate || '')} &middot; ${escHtml(post.readTime || '')}</p>
${directAnswerBn}
${BN_DISCLAIMER}
<p style="font-size:16px;color:#333;margin-bottom:24px;line-height:1.8">${escHtml(post.heroIntro || '')}</p>
<article>
${buildPillarAndTableHtml(post, 'bn')}${quickAns}${toc}${sections}${faqs}${relatedArticlesHtmlBn}${CONCLUSION_DISCLAIMER_BN}
</article>
<section style="margin-top:32px;padding:18px;background:#F7F8FA;border-radius:8px;border:1px solid #E2E8F0">
  <h2 style="font-size:18px;font-weight:700;margin-bottom:10px;color:#0B1220">সংশ্লিষ্ট আইনি সেবা ও পরামর্শ</h2>
  <p style="font-size:14px;line-height:1.8"><a href="/bn/services/criminal-lawyer">ফৌজদারি আইনজীবী</a> &middot; <a href="/bn/services/bail-lawyer">জামিন আইনজীবী</a> &middot; <a href="/bn/services/divorce-lawyer">তালাক ও পারিবারিক আইন</a> &middot; <a href="/bn/services/land-lawyer">জমি ও সম্পত্তি আইন</a> &middot; <a href="/nrb-legal-help">প্রবাসী (NRB) আইনি সহায়তা</a> &middot; <a href="/bn/contact">চেম্বারে যোগাযোগ</a></p>
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
${feeTableHtml}
${procedureHtml}
${docsHtml}
${caseNoteHtml}
${coverageHtml}
${faqHtml}
${linksHtml}
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
<p style="font-size:16px;color:#444;margin-bottom:24px">ফৌজদারি, পারিবারিক, জামিন ও জমি সংক্রান্ত মামলার অভিজ্ঞ আইনজীবী। চেম্বার: উত্তরা, ঢাকা।</p>

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
    <li><strong>অফিস সময়:</strong> শনিবার – বৃহস্পতিবার, সকাল ৯:০০ – রাত ৯:০০</li>
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
    <li><strong>Office Hours:</strong> Saturday – Thursday, 9:00 AM – 9:00 PM</li>
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
    ${services.items.map(s=>`<li><a href="${s.link}" style="color:#1a56db">${escHtml(s.title)}</a></li>`).join('')}
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
    ${services.items.map(s=>`<li>${escHtml(s.title)}</li>`).join('')}
  </ul>
</section>
${CTA}`;
}

const CONTACT_FAQS_EN = [
  {
    q: 'How do I book a chamber consultation appointment?',
    a: 'You can call +880 1712-655546 directly or send your case summary through our WhatsApp intake form to schedule an in-person session at our Uttara Sector 12 or Dhaka Judge Court chamber, or an online video review.',
  },
  {
    q: 'What are the consultation fee payment methods?',
    a: 'For telephone consultations or remote NRB document and case reviews, fees can be remitted via bKash (01712655546) after confirming your time slot with the chamber desk.',
  },
  {
    q: 'Can I contact urgently for bail or arrest matters?',
    a: 'Yes, urgent criminal defence inquiries involving FIR registration, police custody remand protection, Section 497 surrender petitions, or High Court anticipatory bail are prioritized by phone and WhatsApp.',
  },
];

const CONTACT_FAQS_BN = [
  {
    q: 'আইনি পরামর্শের জন্য কীভাবে অ্যাপয়েন্টমেন্ট নেব?',
    a: 'আপনি সরাসরি 01712655546 নম্বরে কল করে অথবা ওয়েবসাইটের হোয়াটসঅ্যাপ ফর্মে বার্তা পাঠিয়ে উত্তরা সন্ধ্যা চেম্বার বা ঢাকা জজ কোর্ট চেম্বারে অ্যাপয়েন্টমেন্ট অথবা অনলাইন আইনি পরামর্শ বুক করতে পারেন।',
  },
  {
    q: 'পেইড কনসালটেশন ও কেস রিভিউ ফি কীভাবে পরিশোধ করতে হবে?',
    a: 'অনলাইন ভিডিও পরামর্শ বা ফোনালাপের মাধ্যমে বিস্তারিত নথিপত্র পর্যালোচনার জন্য বিকাশ নম্বর 01712655546-এ কনসালটেশন ফি পরিশোধ করে ট্রানজেকশন আইডি হোয়াটসঅ্যাপে পাঠিয়ে স্লট কনফার্ম করা যায়।',
  },
  {
    q: 'জরুরি গ্রেপ্তার, থানা জিডি বা জামিনের ক্ষেত্রে কি দ্রুত যোগাযোগ করা যাবে?',
    a: 'হ্যাঁ, জরুরি ফৌজদারি মামলা, থানা জিডি, পুলিশ রিমান্ড প্রতিরোধ এবং হাইকোর্ট বিভাগে ৪৯৮ ধারায় আগাম জামিনের বিষয়ে হোয়াটসঅ্যাপে বার্তা দিলে বা সরাসরি ফোনে দ্রুত পরামর্শ প্রদান করা হয়।',
  },
];

function contactBody() {
  return `<nav aria-label="Breadcrumb" style="font-size:13px;color:#475569;margin-bottom:14px"><a href="/en" style="color:#132A4A">Home</a> &rsaquo; <span>Contact</span></nav>
<h1 style="font-size:28px;font-weight:700;margin-bottom:8px;color:#0a0a0a">${escHtml(pageHeadings.contactEn)}</h1>
<p style="color:#555;margin-bottom:20px;line-height:1.7">Trusted criminal defence, divorce, High Court bail, land property, tax tribunal, and corporate lawyer in Uttara &amp; Dhaka Judge Court — available 6 days a week for confidential in-chamber and remote consultations.</p>

<section style="margin:20px 0">
  <h2 style="font-size:20px;font-weight:700;margin:20px 0 10px">Chamber Locations &amp; Direct Contact Details</h2>
  <ul style="padding-left:20px;color:#333;line-height:2.1">
    <li><strong>Uttara Chamber (Primary Evening Office):</strong> House 46, Road 6/B, Sector 12, Uttara West, Dhaka-1230 — private evening client consultations and case review meetings.</li>
    <li><strong>Court Chamber (Dhaka Judge Court):</strong> Ainjeebi Samity Bhaban, 4th Floor, 6/7 Court House Street, Kotwali, Dhaka-1100 — adjacent to Chief Metropolitan Magistrate and Sessions Courts.</li>
    <li><strong>Direct Phone Hotline:</strong> <a href="tel:+8801712655546" style="color:#1a56db">+880 1712-655546</a> (Saturday – Thursday, 9:00 AM – 9:00 PM)</li>
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
<p style="color:#555;margin-bottom:20px;line-height:1.7">বাংলাদেশ সুপ্রিম কোর্ট ও ঢাকা জজ কোর্টের অভিজ্ঞ আইনজীবীর সাথে ফোন, হোয়াটসঅ্যাপ বা উত্তরা ও কোর্ট চেম্বারে সরাসরি সাক্ষাতের মাধ্যমে ফৌজদারি, জামিন, তালাক, জমি-জমা, কর ও কোম্পানি মামলার পূর্ণাঙ্গ আইনি সমাধান নিশ্চিত করুন।</p>

<section style="margin:20px 0">
  <h2 style="font-size:20px;font-weight:700;margin:20px 0 10px">চেম্বার ঠিকানা ও সরাসরি যোগাযোগের মাধ্যম</h2>
  <ul style="padding-left:20px;color:#333;line-height:2.1">
    <li><strong>উত্তরা চেম্বার (প্রধান কার্যালয়):</strong> বাড়ি ৪৬, সড়ক ৬/বি, সেক্টর ১২, উত্তরা পশ্চিম, ঢাকা-১২৩০ — সরাসরি আইনি পরামর্শ ও গোপনীয় ক্লায়েন্ট মিটিং চেম্বার।</li>
    <li><strong>কোর্ট চেম্বার (ঢাকা বিচার আদালত):</strong> আইনজীবী সমিতি ভবন, ৪র্থ তলা, ৬/৭ কোর্ট হাউস স্ট্রিট, কোতোয়ালি, ঢাকা-১১০০ — ঢাকা জজ কোর্ট ও মহানগর দায়রা আদালত সংলগ্ন।</li>
    <li><strong>সরাসরি হটলাইন কল:</strong> <a href="tel:+8801712655546" style="color:#1a56db">+880 1712-655546</a> (শনিবার – বৃহস্পতিবার, সকাল ৯:০০ – রাত ৯:০০)</li>
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

  <h2 style="font-size:20px;font-weight:700;margin:24px 0 10px;color:#0f172a">6. Data Protection, Security &amp; User Rights</h2>
  <p>We implement administrative and technical security measures to protect your personal data from unauthorized access or disclosure. Under applicable data privacy frameworks (including GDPR principles), you have the right to request access to, correction of, or deletion of your personal data submitted to us.</p>

  <h2 style="font-size:20px;font-weight:700;margin:24px 0 10px;color:#0f172a">7. Contact Information</h2>
  <p>For any privacy inquiries, requests, or questions regarding this Privacy Policy, please contact:<br>
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
  <p>By browsing, accessing, or using <strong>advmdshahalam.me</strong> ("Website"), you agree to be bound by these Terms and Conditions. If you do not accept these terms, you must refrain from using the Website.</p>

  <h2 style="font-size:20px;font-weight:700;margin:24px 0 10px;color:#0f172a">2. Legal Disclaimer &amp; No Attorney-Client Relationship</h2>
  <p>The information, articles, guides, and legal calculators published on this website are provided solely for <strong>general informational and educational purposes</strong>. Nothing on this website constitutes formal legal counsel or legal advice under the laws of Bangladesh.</p>
  <p>Accessing this website, sending messages via contact forms, or initiating WhatsApp communications does not establish an attorney-client relationship. You must consult directly with a qualified advocate licensed by the Bangladesh Bar Council for advice specific to your case.</p>

  <h2 style="font-size:20px;font-weight:700;margin:24px 0 10px;color:#0f172a">3. Intellectual Property Rights</h2>
  <p>All original content, legal guides, articles, logos, graphics, and code on this Website are the exclusive intellectual property of Advocate Md. Shah Alam and are protected by applicable copyright and trademark laws of Bangladesh.</p>

  <h2 style="font-size:20px;font-weight:700;margin:24px 0 10px;color:#0f172a">4. Third-Party Advertisements (Google AdSense)</h2>
  <p>This Website displays third-party advertisements served through Google AdSense. We do not endorse, guarantee, or assume liability for products, claims, or services advertised by third parties. Please refer to our <a href="/privacy-policy" style="color:#1a56db;text-decoration:underline">Privacy Policy</a> for details on advertising cookies.</p>

  <h2 style="font-size:20px;font-weight:700;margin:24px 0 10px;color:#0f172a">5. Limitation of Liability &amp; Governing Law</h2>
  <p>To the maximum extent permitted by law, Advocate Md. Shah Alam and associated chambers shall not be held liable for any loss or damages arising from reliance on general information provided on this Website.</p>
  <p>These terms are governed by and construed under the laws of the People's Republic of Bangladesh. Any dispute arising in connection with the Website shall fall under the exclusive jurisdiction of the competent courts in Dhaka, Bangladesh.</p>

  <h2 style="font-size:20px;font-weight:700;margin:24px 0 10px;color:#0f172a">6. Contact Us</h2>
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
    const graph = [
      {
        '@type': 'WebSite',
        '@id': `${BASE}/#website`,
        name: lang === 'bn' ? 'এডভোকেট মোঃ শাহ আলম' : 'Advocate Md. Shah Alam',
        url: `${BASE}/`,
        inLanguage: lang,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${BASE}/blog?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Person',
        '@id': `${BASE}/#attorney`,
        name: 'Advocate Md. Shah Alam',
        alternateName: 'এডভোকেট মোঃ শাহ আলম',
        jobTitle: 'Advocate, Supreme Court of Bangladesh',
        url: `${BASE}/advocate-md-shah-alam`,
        image: `${BASE}/images/hero/hero-md-shah-alam.png`,
        telephone: '+8801712655546',
        email: 'contact@advmdshahalam.me',
        worksFor: { '@id': `${BASE}/#legalservice` },
        memberOf: [
          { '@type': 'Organization', name: 'Bangladesh Bar Council' },
          { '@type': 'Organization', name: 'Supreme Court Bar Association' },
          { '@type': 'Organization', name: 'Dhaka Bar Association' },
        ],
        sameAs: [
          'https://www.facebook.com/advmd.shahalamfb',
          'https://www.linkedin.com/in/advmdshahalam/',
          'https://maps.app.goo.gl/M3NXMwW3xkp2TE3h8',
        ],
      },
      {
        '@type': 'LegalService',
        '@id': `${BASE}/#legalservice`,
        name: 'Advocate Md. Shah Alam Law Chamber',
        alternateName: 'এডভোকেট মোঃ শাহ আলম ল চেম্বার',
        url: BASE,
        logo: `${BASE}/adv-md-shah-alam.png`,
        image: `${BASE}/images/advocate-shah-alam.jpg`,
        telephone: '+8801712655546',
        email: 'contact@advmdshahalam.me',
        priceRange: '৳৳',
        address: [
          {
            '@type': 'PostalAddress',
            streetAddress: 'House 46, Road 6/B, Sector 12, Uttara',
            addressLocality: 'Uttara, Dhaka',
            addressRegion: 'Dhaka',
            postalCode: '1230',
            addressCountry: 'BD',
          },
          {
            '@type': 'PostalAddress',
            streetAddress: 'Lawyers Association Building, 4th Floor, 6/7 Court House Street, Kotwali',
            addressLocality: 'Judge Court, Dhaka',
            addressRegion: 'Dhaka',
            postalCode: '1100',
            addressCountry: 'BD',
          },
        ],
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 23.8745,
          longitude: 90.3987,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
            opens: '09:00',
            closes: '21:00',
          },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Legal Practice Areas',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Criminal Defense', url: `${BASE}/services/criminal-lawyer` } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bail & Anticipatory Bail', url: `${BASE}/services/bail-lawyer` } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Divorce & Family Law', url: `${BASE}/services/divorce-lawyer` } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Land & Property Law', url: `${BASE}/services/land-lawyer` } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Supreme Court Writ & Appeals', url: `${BASE}/services/supreme-court-lawyer` } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Company & Corporate Law', url: `${BASE}/services/company-corporate-lawyer` } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Income Tax & VAT Law', url: `${BASE}/services/tax-lawyer` } },
          ],
        },
      },
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
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: data.h1,
        description: data.metaDesc,
        url: pageUrl,
        inLanguage: isBn ? 'bn-BD' : 'en',
        provider: {
          '@type': 'LegalService',
          '@id': `${BASE}/#legalservice`,
          name: 'Advocate Md. Shah Alam Law Chamber',
          url: BASE,
          priceRange: '৳৳',
        },
        areaServed: { '@type': 'Country', name: 'Bangladesh' },
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
    const extraHead = `<link rel="alternate" hreflang="en" href="${BASE}/privacy-policy" />
<link rel="alternate" hreflang="x-default" href="${BASE}/privacy-policy" />`;
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
    const extraHead = `<link rel="alternate" hreflang="en" href="${BASE}/terms-of-service" />
<link rel="alternate" hreflang="x-default" href="${BASE}/terms-of-service" />`;
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
    const extraHead = `<link rel="alternate" hreflang="en" href="${BASE}/nrb-legal-help" />
<link rel="alternate" hreflang="x-default" href="${BASE}/nrb-legal-help" />`;
    const html = buildPage(base, {
      title: 'NRB Legal Help Bangladesh | Property & Family Law',
      description: 'Legal help for Non-Resident Bangladeshis in UK, USA, UAE & Canada: land purchase, Power of Attorney, divorce, inheritance & court cases.',
      canonical: `${BASE}/nrb-legal-help`,
      lang: 'en',
      extraHead,
      body: `<nav aria-label="Breadcrumb" style="font-size:13px;color:#475569;margin-bottom:14px"><a href="/en" style="color:#132A4A">Home</a> &rsaquo; <span>NRB Legal Help</span></nav>
<h1 style="font-size:30px;font-weight:700;margin-bottom:8px;color:#0B1220">${escHtml(pageHeadings.nrb)}</h1>
<p class="direct-answer"><strong>Quick Summary:</strong> Non-Resident Bangladeshis (NRBs) in the UK, USA, Canada, UAE, and Europe can resolve land disputes, execute Embassy-attested Power of Attorney (PoA), verify khatian/deeds, file divorce/custody suits, and defend criminal/cheque cases in Bangladesh remotely through Advocate Md. Shah Alam without flying to Dhaka.</p>
<section style="margin:24px 0">
  <h2 style="font-size:22px;font-weight:700;color:#0B1220;margin-bottom:12px">Core NRB Legal Services</h2>
  <ul style="padding-left:20px;line-height:1.9;color:#1E293B">
    <li><strong>Land Title Vetting &amp; Mutation:</strong> CS/SA/RS/BS Khatian verification, Sub-Registry search, and e-Mutation (Namjari) without in-person travel.</li>
    <li><strong>Power of Attorney (PoA) Drafting:</strong> Drafting &amp; Bangladesh High Commission/Embassy attestation guidance under the Power of Attorney Act 2012.</li>
    <li><strong>NRB Divorce &amp; Family Matters:</strong> Overseas Talaq notice registration, Section 13 CPC foreign decree recognition, Dower (Denmohar), and child custody.</li>
    <li><strong>Partition &amp; Inheritance Suits:</strong> Batwara Mamla, Succession Certificate (Succession Act 1925), and stopping illegal land grabbing.</li>
  </ul>
</section>
<section style="margin:28px 0;padding:20px;background:#F7F8FA;border:1px solid #CBD5E1;border-radius:10px">
  <h2 style="font-size:22px;font-weight:700;color:#0B1220;margin-bottom:12px">Paid Case Review &amp; Document Vetting Packages</h2>
  <table style="width:100%;border-collapse:collapse;font-size:14px;background:#fff">
    <thead><tr style="background:#132A4A;color:#fff"><th style="padding:10px;text-align:left">Service Package</th><th style="padding:10px;text-align:left">Deliverables</th><th style="padding:10px;text-align:left">Fee (BDT / USD)</th></tr></thead>
    <tbody>
      <tr style="border-bottom:1px solid #E2E8F0"><td style="padding:10px"><strong>45-Min Video Case Review</strong></td><td style="padding:10px">Full legal strategy + statute roadmap with Adv. Md. Shah Alam</td><td style="padding:10px">৳3,000 / \$30</td></tr>
      <tr style="border-bottom:1px solid #E2E8F0"><td style="padding:10px"><strong>Land Deed &amp; Khatian Vetting</strong></td><td style="padding:10px">Written legal opinion on chain of title, Bia deeds &amp; mutation status</td><td style="padding:10px">৳8,000 / \$75</td></tr>
      <tr><td style="padding:10px"><strong>PoA / Legal Notice / Agreement Drafting</strong></td><td style="padding:10px">Court-ready bilingual or English legal draft ready for Embassy attestation</td><td style="padding:10px">৳5,000 / \$50</td></tr>
    </tbody>
  </table>
  <p style="margin-top:14px;font-size:14px"><a href="/contact?service=case-review" data-cta="consult" style="display:inline-block;padding:12px 22px;background:#132A4A;color:#fff;border-radius:8px;text-decoration:none;font-weight:700">Book Paid Case Review</a></p>
</section>
${CTA}`,
    });
    write(path.join(DIST, 'nrb-legal-help', 'index.html'), html);
    console.log('  ✓ /nrb-legal-help');
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
    .sort((a, b) => freshnessTs(b) - freshnessTs(a) || a.slug.localeCompare(b.slug));
  const enPostBySlug = new Map(enPosts.map(p => [p.slug, p]));

  const bnFiles = fs.readdirSync(BN_DIR).filter(f => f.endsWith('.json'));
  const bnPosts = bnFiles
    .map(f => jsonLoad(path.join(BN_DIR, f)))
    .filter(p => p && p.slug && !p.isDraft && !p._draft && !redirectSources.has('/bn/blog/' + p.slug))
    .sort((a, b) => freshnessTs(b) - freshnessTs(a) || a.slug.localeCompare(b.slug));
  const bnPostBySlug = new Map(bnPosts.map(p => [p.slug, p]));

  {
    const hasPage2 = enPosts.length > 24;
    const extraHead = `<link rel="alternate" hreflang="en" href="${BASE}/blog" />
<link rel="alternate" hreflang="bn" href="${BASE}/bn/blog" />
<link rel="alternate" hreflang="x-default" href="${BASE}/blog" />` + (hasPage2 ? `\n<link rel="next" href="${BASE}/blog/page/2" />` : '');
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
    const extraHead = `<link rel="alternate" hreflang="bn" href="${BASE}/bn/blog" />
<link rel="alternate" hreflang="en" href="${BASE}/blog" />
<link rel="alternate" hreflang="x-default" href="${BASE}/blog" />` + (hasPage2 ? `\n<link rel="next" href="${BASE}/bn/blog/page/2" />` : '');
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
      const itemsHtml = slice.map(post => `<li style="margin:10px 0"><a href="${prefix}/${post.slug}" style="font-weight:600;color:#132A4A">${escHtml(post.title)}</a></li>`).join('');
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
<p style="margin:12px 0 20px"><a href="${svcPrefix}/${hub.service}" style="color:#132A4A;font-weight:700">${langKey === 'en' ? 'View Practice Area & Consult Advocate →' : 'মূল আইনি সেবা ও পরামর্শ দেখুন →'}</a></p>
<ul>${itemsHtml}</ul>`,
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
      headline: post.title,
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
        { '@type': 'ListItem', position: 3, name: post.title, item: postCanonical },
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
      headline: post.title,
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
        { '@type': 'ListItem', position: 3, name: post.title, item: postCanonical },
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
