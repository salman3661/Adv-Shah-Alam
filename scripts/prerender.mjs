/**
 * prerender.mjs
 * ─────────────────────────────────────────────────────────────
 * Reads every EN + BN blog post JSON/MD, plus key static routes,
 * and writes real HTML pages into dist/ so crawlers (AdSense,
 * Googlebot) see full content without executing JavaScript.
 *
 * Run AFTER vite build:  node scripts/prerender.mjs
 * Integrated via:        "postbuild": "node scripts/prerender.mjs"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT      = path.resolve(__dirname, '..');
const DIST      = path.join(ROOT, 'dist');
const EN_DIR    = path.join(ROOT, 'src', 'content', 'posts', 'en');
const BN_DIR    = path.join(ROOT, 'src', 'content', 'posts', 'bn');

// ── helpers ──────────────────────────────────────────────────

function readIndexHtml() {
  return fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeHtml(filePath, html) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, html, 'utf8');
}

/** Strip HTML tags for a plain-text summary */
function stripHtml(html = '') {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

/** Inject <title>, <meta description>, canonical, and a rich
 *  <noscript> content block into the base index.html */
function buildHtml(base, { title, description, canonical, bodyContent, lang = 'en' }) {
  let html = base;

  // replace <html lang="en"> if needed
  html = html.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`);

  // inject title
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escHtml(title)}</title>`);

  // inject / replace meta description
  if (html.includes('name="description"')) {
    html = html.replace(
      /<meta name="description"[^>]*>/,
      `<meta name="description" content="${escHtml(description)}">`
    );
  } else {
    html = html.replace('</head>', `<meta name="description" content="${escHtml(description)}">\n</head>`);
  }

  // inject canonical
  html = html.replace(
    /<link rel="canonical"[^>]*>/g,
    `<link rel="canonical" href="${canonical}">`
  );

  // inject noscript content — this is what crawlers read
  const noscriptBlock = `
<noscript>
<div id="prerendered-content" style="font-family:Georgia,serif;max-width:900px;margin:0 auto;padding:20px 16px;color:#1a1a1a;line-height:1.7">
${bodyContent}
</div>
</noscript>`;

  html = html.replace('<div id="root"></div>', `<div id="root"></div>${noscriptBlock}`);

  return html;
}

function escHtml(str = '') {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ── post loaders ──────────────────────────────────────────────

function loadJsonPost(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

/** Build a rich HTML body from a blog post JSON */
function buildPostBody(post) {
  const disclaimer = `
<div style="background:#fff8e1;border-left:4px solid #f5a623;padding:12px 16px;margin-bottom:24px;border-radius:4px;font-size:14px">
  <strong>⚠️ Legal Disclaimer:</strong> This article provides general legal information only and does not constitute legal advice. 
  For advice specific to your situation, consult <strong>Advocate Md. Shah Alam</strong> directly at +880 1712-655546.
</div>`;

  const toc = post.toc && post.toc.length
    ? `<nav style="background:#f4f6fb;padding:16px 20px;border-radius:8px;margin-bottom:28px">
        <strong>📋 In This Article</strong>
        <ol style="margin-top:8px;padding-left:20px">
          ${post.toc.map((h, i) => `<li style="margin:4px 0"><a href="#section-${i}" style="color:#1a56db">${escHtml(h)}</a></li>`).join('')}
        </ol>
       </nav>`
    : '';

  const sections = (post.sections || []).map((s, i) => `
    <section id="section-${i}" style="margin-bottom:32px">
      <h2 style="font-size:22px;font-weight:700;margin-bottom:12px;color:#111">${escHtml(s.h2)}</h2>
      <div style="font-size:15px;color:#333">${s.content || ''}</div>
    </section>`).join('');

  const faqs = (post.faqs || []).length
    ? `<section style="margin-top:32px">
        <h2 style="font-size:22px;font-weight:700;margin-bottom:16px">Frequently Asked Questions</h2>
        ${post.faqs.map(f => `
          <div style="margin-bottom:16px;padding:12px 16px;background:#f9f9f9;border-radius:8px">
            <strong style="color:#111">${escHtml(f.question)}</strong>
            <p style="margin:6px 0 0;color:#444;font-size:14px">${escHtml(f.answer)}</p>
          </div>`).join('')}
       </section>`
    : '';

  return `
<h1 style="font-size:30px;font-weight:700;margin-bottom:8px;color:#0a0a0a">${escHtml(post.title)}</h1>
<p style="color:#555;font-size:14px;margin-bottom:20px">By <strong>Advocate Md. Shah Alam</strong> &middot; ${escHtml(post.publishedDate || '')} &middot; ${escHtml(post.readTime || '')}</p>
${disclaimer}
<p style="font-size:16px;color:#333;margin-bottom:24px">${escHtml(post.heroIntro || '')}</p>
${toc}
${sections}
${faqs}
<div style="margin-top:40px;padding:20px;background:#e8f0fe;border-radius:8px;text-align:center">
  <strong>Need Legal Help?</strong><br>
  Contact Advocate Md. Shah Alam: <a href="tel:+8801712655546" style="color:#1a56db">+880 1712-655546</a> &nbsp;|&nbsp;
  <a href="https://wa.me/8801955802007" style="color:#25D366">WhatsApp Consultation</a><br>
  <small style="color:#555">House 46, Road 6/B, Sector 12, Uttara, Dhaka-1230</small>
</div>`;
}

// ── static pages ──────────────────────────────────────────────

function prerenderStaticPages(base) {
  const pages = [
    {
      route: '/contact',
      title: 'Contact Advocate Md. Shah Alam | Criminal, Divorce & Bail Lawyer – Uttara, Dhaka',
      description: 'Contact Advocate Md. Shah Alam for legal consultation in Dhaka & Uttara. Call +880 1712-655546 or WhatsApp for criminal, divorce, bail & property cases.',
      canonical: 'https://www.advmdshahalam.me/contact',
      body: `
<h1 style="font-size:30px;font-weight:700;margin-bottom:8px">Contact Advocate Md. Shah Alam</h1>
<p style="color:#555;margin-bottom:24px">Trusted Lawyer in Uttara, Dhaka – Bangladesh</p>
<h2 style="font-size:20px;font-weight:700;margin:20px 0 8px">Chamber Locations</h2>
<ul style="padding-left:20px;color:#333;line-height:2">
  <li><strong>Uttara Chamber:</strong> House 46, Road 6/B, Sector 12, Uttara West, Dhaka-1230</li>
  <li><strong>Court Chamber:</strong> Ainjeebi Samity Bhaban, 4th Floor, 6/7 Court House Street, Kotwali, Dhaka-1100</li>
</ul>
<h2 style="font-size:20px;font-weight:700;margin:20px 0 8px">Contact Details</h2>
<ul style="padding-left:20px;color:#333;line-height:2">
  <li><strong>Phone:</strong> <a href="tel:+8801712655546" style="color:#1a56db">+880 1712-655546</a></li>
  <li><strong>WhatsApp:</strong> <a href="https://wa.me/8801955802007" style="color:#25D366">+880 1955-802007</a></li>
  <li><strong>Email:</strong> <a href="mailto:contact@advmdshahalam.me" style="color:#1a56db">contact@advmdshahalam.me</a></li>
  <li><strong>Office Hours:</strong> Saturday – Thursday: 9:00 AM – 9:00 PM</li>
</ul>
<h2 style="font-size:20px;font-weight:700;margin:20px 0 8px">Practice Areas</h2>
<ul style="padding-left:20px;color:#333;line-height:2">
  <li>Criminal Law — FIR defence, bail, trial & appeals</li>
  <li>Family Law — Divorce, child custody, maintenance</li>
  <li>Land & Property Law — Disputes, registration, partition</li>
  <li>Bail — Regular, anticipatory & High Court bail</li>
  <li>Supreme Court — Writ petitions & appellate matters</li>
  <li>Company & Corporate Law — Registration, disputes, dissolution</li>
</ul>
<p style="margin-top:20px;color:#333">Advocate Md. Shah Alam is enrolled with the <strong>Bangladesh Bar Council</strong> and practises at all court levels in Bangladesh including the <strong>Supreme Court of Bangladesh</strong>.</p>`,
    },
    {
      route: '/about',
      title: 'About Advocate Md. Shah Alam | Lawyer in Bangladesh',
      description: 'Learn about Advocate Md. Shah Alam, an experienced criminal, family and property lawyer practising at the Supreme Court of Bangladesh. 20+ years of legal excellence.',
      canonical: 'https://www.advmdshahalam.me/advocate-md-shah-alam',
      body: `
<h1>About Advocate Md. Shah Alam</h1>
<p>Advocate Md. Shah Alam is an experienced lawyer registered with the Bangladesh Bar Council, practising at the Supreme Court of Bangladesh. His primary chambers are located in Uttara, Dhaka.</p>`,
    },
  ];

  for (const page of pages) {
    const html = buildHtml(base, {
      title: page.title,
      description: page.description,
      canonical: page.canonical,
      bodyContent: page.body,
    });
    const outDir = path.join(DIST, ...page.route.split('/').filter(Boolean));
    writeHtml(path.join(outDir, 'index.html'), html);
    console.log(`  ✓ Static: ${page.route}`);
  }
}

// ── main ──────────────────────────────────────────────────────

async function main() {
  if (!fs.existsSync(DIST)) {
    console.error('❌  dist/ not found — run `npm run build` first');
    process.exit(1);
  }

  const base = readIndexHtml();
  let count = 0;

  console.log('\n📄 Pre-rendering static pages...');
  prerenderStaticPages(base);

  // ── English blog posts ─────────────────────────────────────
  console.log('\n📚 Pre-rendering EN blog posts...');
  const enFiles = fs.readdirSync(EN_DIR).filter(f => f.endsWith('.json') && f !== 'README.json');

  for (const file of enFiles) {
    const post = loadJsonPost(path.join(EN_DIR, file));
    if (!post || !post.slug || post.isDraft) continue;

    const html = buildHtml(base, {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.heroIntro?.slice(0, 160) || '',
      canonical: `https://www.advmdshahalam.me/blog/${post.slug}`,
      bodyContent: buildPostBody(post),
      lang: 'en',
    });

    writeHtml(path.join(DIST, 'blog', post.slug, 'index.html'), html);
    count++;
  }
  console.log(`  ✓ ${count} EN posts pre-rendered`);

  // ── Bengali blog posts ─────────────────────────────────────
  console.log('\n📚 Pre-rendering BN blog posts...');
  const bnFiles = fs.readdirSync(BN_DIR).filter(f => f.endsWith('.json') && f !== 'README.json');
  let bnCount = 0;

  for (const file of bnFiles) {
    const post = loadJsonPost(path.join(BN_DIR, file));
    if (!post || !post.slug || post.isDraft) continue;

    const html = buildHtml(base, {
      title: post.metaTitle || post.title || 'বাংলাদেশ আইনি গাইড | অ্যাডভোকেট মো. শাহ আলম',
      description: post.metaDescription || post.heroIntro?.slice(0, 160) || '',
      canonical: `https://www.advmdshahalam.me/bn/blog/${post.slug}`,
      bodyContent: `<h1 style="font-size:28px;font-weight:700;margin-bottom:16px">${escHtml(post.title || '')}</h1>
<p style="margin-bottom:20px">${escHtml(post.heroIntro || '')}</p>
<div style="background:#fff8e1;border-left:4px solid #f5a623;padding:12px 16px;margin-bottom:24px;border-radius:4px;font-size:14px">
  <strong>⚠️ দাবিত্যাগ:</strong> এই নিবন্ধটি শুধুমাত্র সাধারণ আইনি তথ্যের জন্য এবং এটি আইনি পরামর্শ নয়। আপনার নির্দিষ্ট পরিস্থিতির জন্য অ্যাডভোকেট মো. শাহ আলমের সাথে যোগাযোগ করুন: +880 1712-655546।
</div>
${(post.sections || []).map((s, i) => `<section id="section-${i}" style="margin-bottom:24px"><h2 style="font-size:20px;font-weight:700;margin-bottom:8px">${escHtml(s.h2 || '')}</h2><div>${s.content || ''}</div></section>`).join('')}`,
      lang: 'bn',
    });

    writeHtml(path.join(DIST, 'bn', 'blog', post.slug, 'index.html'), html);
    bnCount++;
  }
  console.log(`  ✓ ${bnCount} BN posts pre-rendered`);

  console.log(`\n✅ Pre-rendering complete: ${count + bnCount} blog posts + static pages\n`);
}

main().catch(err => {
  console.error('Pre-render failed:', err);
  process.exit(1);
});
