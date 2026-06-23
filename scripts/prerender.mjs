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

// ── helpers ─────────────────────────────────────────────────────────────────
function readBase() { return fs.readFileSync(path.join(DIST,'index.html'),'utf8'); }
function ensureDir(d) { fs.mkdirSync(d, { recursive: true }); }
function write(filePath, html) { ensureDir(path.dirname(filePath)); fs.writeFileSync(filePath, html, 'utf8'); }
function escHtml(s='') { return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function jsonLoad(p) { try { return JSON.parse(fs.readFileSync(p,'utf8')); } catch { return null; } }

/**
 * Inject page-specific title, description, canonical, and a hidden pre-rendered
 * content block into the base index.html so search crawlers see real content.
 *
 * The #prerendered-content div is:
 *   - INVISIBLE to users  (position:absolute; visibility:hidden; height:0; overflow:hidden)
 *   - FULLY READABLE by crawlers (it's real HTML in the DOM, not inside <noscript>)
 *   - ADOPTED by React   (hydrateRoot in main.jsx detects it and hydrates cleanly)
 *
 * This eliminates the millisecond flash: React never destroys + repaints the root,
 * it simply hydrates over the existing (already hidden) pre-rendered node.
 */
function buildPage(base, { title, description, canonical, body, lang='en' }) {
  let h = base;
  h = h.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`);
  h = h.replace(/<title>[^<]*<\/title>/, `<title>${escHtml(title)}</title>`);
  h = h.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escHtml(description)}">`);
  // Fix canonical — replace ALL canonical tags with the correct one
  h = h.replace(/<link rel="canonical"[^>]*>/g, '');
  h = h.replace('</head>', `<link rel="canonical" href="${canonical}">\n</head>`);

  // Hidden from users, visible to crawlers — no flash, no cloaking
  const prerendered = `\n<div id="prerendered-content" aria-hidden="true" style="position:absolute;width:1px;height:1px;overflow:hidden;visibility:hidden;clip:rect(0,0,0,0);white-space:nowrap">\n${body}\n</div>`;
  h = h.replace('<div id="root"></div>', `<div id="root">${prerendered}</div>`);
  return h;
}

// ── shared disclaimer ────────────────────────────────────────────────────────
const DISCLAIMER = `<div style="background:#fff8e1;border-left:4px solid #f5a623;padding:12px 16px;margin-bottom:24px;border-radius:4px;font-size:14px">
  <strong>⚠️ Legal Disclaimer:</strong> This article provides general legal information only and does not constitute legal advice.
  For advice specific to your situation, consult <strong>Advocate Md. Shah Alam</strong> directly at <a href="tel:+8801712655546" style="color:#1a56db">+880 1712-655546</a>.
</div>`;

const BN_DISCLAIMER = `<div style="background:#fff8e1;border-left:4px solid #f5a623;padding:12px 16px;margin-bottom:24px;border-radius:4px;font-size:14px">
  <strong>⚠️ দাবিত্যাগ:</strong> এই নিবন্ধটি শুধুমাত্র সাধারণ আইনি তথ্যের জন্য। এটি আইনি পরামর্শ নয়।
  সরাসরি পরামর্শের জন্য <a href="tel:+8801712655546" style="color:#1a56db">+880 1712-655546</a>-এ যোগাযোগ করুন।
</div>`;

const CTA = `<div style="margin-top:40px;padding:20px;background:#e8f0fe;border-radius:8px;text-align:center">
  <strong>Need Legal Help in Bangladesh?</strong><br>
  Contact <strong>Advocate Md. Shah Alam</strong>: <a href="tel:+8801712655546" style="color:#1a56db">+880 1712-655546</a> &nbsp;|&nbsp;
  <a href="https://wa.me/8801955802007" style="color:#25D366">WhatsApp</a><br>
  <small style="color:#555">Uttara Chamber: House 46, Road 6/B, Sector 12, Uttara, Dhaka-1230<br>
  Court Chamber: Ainjeebi Samity Bhaban, 4th Floor, 6/7 Court House Street, Kotwali, Dhaka-1100</small>
</div>`;

// ── blog post body builder ───────────────────────────────────────────────────
function buildPostBody(post) {
  const toc = (post.toc||[]).length ? `<nav style="background:#f4f6fb;padding:16px 20px;border-radius:8px;margin-bottom:28px">
    <strong>📋 In This Article</strong>
    <ol style="margin-top:8px;padding-left:20px">
      ${post.toc.map((h,i)=>`<li style="margin:4px 0"><a href="#s${i}" style="color:#1a56db">${escHtml(h)}</a></li>`).join('')}
    </ol></nav>` : '';

  const sections = (post.sections||[]).map((s,i)=>`
    <section id="s${i}" style="margin-bottom:32px">
      <h2 style="font-size:22px;font-weight:700;margin-bottom:12px;color:#111">${escHtml(s.h2)}</h2>
      <div style="font-size:15px;color:#333">${s.content||''}</div>
    </section>`).join('');

  const faqs = (post.faqs||[]).length ? `<section style="margin-top:32px">
    <h2 style="font-size:22px;font-weight:700;margin-bottom:16px">Frequently Asked Questions</h2>
    ${post.faqs.map(f=>`<div style="margin-bottom:16px;padding:12px 16px;background:#f9f9f9;border-radius:8px">
      <strong style="color:#111">${escHtml(f.question)}</strong>
      <p style="margin:6px 0 0;color:#444;font-size:14px">${escHtml(f.answer)}</p></div>`).join('')}
    </section>` : '';

  return `<h1 style="font-size:30px;font-weight:700;margin-bottom:8px;color:#0a0a0a">${escHtml(post.title)}</h1>
<p style="color:#555;font-size:14px;margin-bottom:20px">By <strong>Advocate Md. Shah Alam</strong> &middot; ${escHtml(post.publishedDate||'')} &middot; ${escHtml(post.readTime||'')}</p>
${DISCLAIMER}
<p style="font-size:16px;color:#333;margin-bottom:24px">${escHtml(post.heroIntro||'')}</p>
${toc}${sections}${faqs}${CTA}`;
}

// ── service page lookup ──────────────────────────────────────────────────────
// Load all service page JSON/JS configs to get real content for pre-rendering
function getServiceMeta(slug) {
  const map = {
    'criminal-lawyer': {
      title: 'Criminal Lawyer in Bangladesh | Advocate Md. Shah Alam – Dhaka',
      desc: 'Expert criminal defense lawyer in Bangladesh. FIR cases, bail, trial representation at Sessions & High Court. Chamber in Uttara, Dhaka. Call +880 1712-655546.',
      h1: 'Criminal Lawyer in Bangladesh',
      body: `<p>Advocate Md. Shah Alam is an experienced criminal lawyer practising at all levels of courts in Bangladesh including the Supreme Court. He handles FIR-related cases, bail applications, criminal trials, and appeals.</p>
<h2 style="font-size:20px;font-weight:700;margin:20px 0 10px">Services Offered</h2>
<ul style="padding-left:20px;color:#333;line-height:2">
  <li>FIR cases and police station matters</li>
  <li>Bail applications (regular, anticipatory, High Court)</li>
  <li>Sessions Court and Magistrate Court trials</li>
  <li>Criminal appeals and revision petitions</li>
  <li>Defence against false criminal cases</li>
  <li>Cases under Digital Security Act and Cyber Crime laws</li>
  <li>Narcotics, arms, and special tribunal matters</li>
</ul>
<h2 style="font-size:20px;font-weight:700;margin:20px 0 10px">Why Choose Advocate Shah Alam?</h2>
<p>With 20+ years of experience at the criminal bar, Advocate Shah Alam has successfully handled hundreds of criminal cases across Bangladesh. He is known for strategic defence preparation and effective court representation.</p>`,
    },
    'bail-lawyer': {
      title: 'Bail Lawyer in Bangladesh | Fast Bail Application – Advocate Shah Alam',
      desc: 'Urgent bail lawyer in Bangladesh. Regular bail, anticipatory bail, and High Court bail applications. Available in Uttara Dhaka. Call +880 1712-655546.',
      h1: 'Bail Lawyer in Bangladesh',
      body: `<p>Getting bail in Bangladesh requires expert legal representation. Advocate Md. Shah Alam specialises in bail applications at all court levels — from Magistrate Court to the Supreme Court of Bangladesh.</p>
<h2 style="font-size:20px;font-weight:700;margin:20px 0 10px">Types of Bail We Handle</h2>
<ul style="padding-left:20px;color:#333;line-height:2">
  <li><strong>Regular Bail:</strong> Filed in Magistrate or Sessions Court for bailable and non-bailable offences</li>
  <li><strong>Anticipatory Bail:</strong> Filed in High Court before arrest — protects you from being taken into custody</li>
  <li><strong>High Court Bail:</strong> For cases rejected at lower courts or involving serious offences</li>
  <li><strong>Temporary/Interim Bail:</strong> Emergency bail for urgent situations</li>
</ul>
<h2 style="font-size:20px;font-weight:700;margin:20px 0 10px">Bail Process in Bangladesh</h2>
<p>A bail application is filed with supporting documents (FIR copy, charge sheet if available, personal particulars). The lawyer presents grounds such as clean record, family ties, and no flight risk. For serious offences, the application goes to High Court.</p>`,
    },
    'divorce-lawyer': {
      title: 'Divorce Lawyer in Bangladesh | Family Court Expert – Advocate Shah Alam',
      desc: 'Expert divorce and family lawyer in Bangladesh. Talaq, khula, child custody, maintenance. Chamber in Uttara Dhaka. Call +880 1712-655546.',
      h1: 'Divorce & Family Lawyer in Bangladesh',
      body: `<p>Advocate Md. Shah Alam is a leading family law practitioner in Bangladesh with 20+ years of experience in divorce cases, child custody, maintenance, and family court matters.</p>
<h2 style="font-size:20px;font-weight:700;margin:20px 0 10px">Family Law Services</h2>
<ul style="padding-left:20px;color:#333;line-height:2">
  <li>Muslim divorce (talaq, khula, mubarat)</li>
  <li>Family Court divorce petitions</li>
  <li>Child custody cases (hizanat)</li>
  <li>Maintenance and dower (mahr) claims</li>
  <li>Hindu and Christian divorce matters</li>
  <li>NRB/overseas divorce proceedings via Power of Attorney</li>
  <li>Domestic violence protection orders</li>
</ul>
<h2 style="font-size:20px;font-weight:700;margin:20px 0 10px">The Divorce Process in Bangladesh</h2>
<p>For Muslims, divorce is governed by the Muslim Family Laws Ordinance 1961. The minimum timeframe for a mutual divorce is 90 days from notice to the Union Parishad Chairman. Contested cases go through Family Court and may take 6 months to 2 years.</p>`,
    },
    'land-lawyer': {
      title: 'Land & Property Lawyer in Bangladesh | Advocate Md. Shah Alam',
      desc: 'Expert land and property lawyer in Bangladesh. Land disputes, mutation, registration, title suits. Chamber in Uttara Dhaka. Call +880 1712-655546.',
      h1: 'Land & Property Lawyer in Bangladesh',
      body: `<p>Land disputes are among the most common legal issues in Bangladesh. Advocate Md. Shah Alam provides expert legal services for all land and property matters, from title verification to full court litigation.</p>
<h2 style="font-size:20px;font-weight:700;margin:20px 0 10px">Land Law Services</h2>
<ul style="padding-left:20px;color:#333;line-height:2">
  <li>Land dispute resolution — title suits, declaration suits, partition suits</li>
  <li>Property registration and deed preparation</li>
  <li>Land mutation (namjari) at local revenue office</li>
  <li>Land fraud cases and recovery of possession</li>
  <li>Khatian verification and boundary disputes</li>
  <li>Injunctions to prevent illegal sale or transfer</li>
  <li>Property inheritance and succession matters</li>
</ul>
<h2 style="font-size:20px;font-weight:700;margin:20px 0 10px">Why Land Cases Need Expert Lawyers</h2>
<p>Land law in Bangladesh involves multiple agencies — Sub-Registrar offices, DC offices, Revenue offices, and Civil Courts. An experienced land lawyer ensures your documents are correct, your rights are protected, and your case is filed in the right forum.</p>`,
    },
    'supreme-court-lawyer': {
      title: 'Supreme Court Lawyer Bangladesh | High Court Writ Petition – Advocate Shah Alam',
      desc: 'Experienced Supreme Court lawyer in Bangladesh. Writ petitions, High Court appeals, appellate division cases. Call +880 1712-655546.',
      h1: 'Supreme Court Lawyer in Bangladesh',
      body: `<p>Advocate Md. Shah Alam is enrolled with the Bangladesh Bar Council and is authorised to practise at the Supreme Court of Bangladesh, including both the High Court Division and the Appellate Division.</p>
<h2 style="font-size:20px;font-weight:700;margin:20px 0 10px">Supreme Court Services</h2>
<ul style="padding-left:20px;color:#333;line-height:2">
  <li>Writ petitions under Article 102 of the Bangladesh Constitution</li>
  <li>Anticipatory bail in the High Court Division</li>
  <li>Criminal revision and rule petitions</li>
  <li>Civil appeals to the Appellate Division</li>
  <li>Contempt of court proceedings</li>
  <li>Constitutional litigation and public interest matters</li>
</ul>
<h2 style="font-size:20px;font-weight:700;margin:20px 0 10px">High Court Writ Petition</h2>
<p>A writ petition is a powerful legal tool to enforce fundamental rights or challenge illegal government actions. Advocate Shah Alam has filed multiple writ petitions securing relief for clients from arbitrary arrest, wrongful dismissal, and unlawful government orders.</p>`,
    },
    'company-corporate-lawyer': {
      title: 'Company & Corporate Lawyer in Bangladesh | Advocate Md. Shah Alam',
      desc: 'Expert company and corporate lawyer in Bangladesh. Company registration, director disputes, corporate compliance. Chamber in Uttara Dhaka. Call +880 1712-655546.',
      h1: 'Company & Corporate Lawyer in Bangladesh',
      body: `<p>Advocate Md. Shah Alam provides comprehensive company and corporate legal services for businesses of all sizes in Bangladesh — from startups to established corporations.</p>
<h2 style="font-size:20px;font-weight:700;margin:20px 0 10px">Corporate Law Services</h2>
<ul style="padding-left:20px;color:#333;line-height:2">
  <li>Company formation and registration under the Companies Act 1994</li>
  <li>Partnership deed preparation and disputes</li>
  <li>Shareholder and director disputes</li>
  <li>Corporate compliance and annual filing</li>
  <li>Commercial contract drafting and review</li>
  <li>Business dissolution and winding up</li>
  <li>Trade license and regulatory compliance</li>
</ul>`,
    },
    'tax-lawyer': {
      title: 'Tax Lawyer in Bangladesh | Income Tax & VAT Legal Services – Advocate Shah Alam',
      desc: 'Expert tax lawyer in Bangladesh. Income tax disputes, VAT matters, TIN registration, tax appeals. Chamber in Uttara Dhaka. Call +880 1712-655546.',
      h1: 'Tax Lawyer in Bangladesh',
      body: `<p>Advocate Md. Shah Alam provides legal services for tax-related matters in Bangladesh, including income tax disputes, VAT cases, and appeals before tax tribunals.</p>
<h2 style="font-size:20px;font-weight:700;margin:20px 0 10px">Tax Law Services</h2>
<ul style="padding-left:20px;color:#333;line-height:2">
  <li>Income tax dispute resolution and appeal</li>
  <li>Tax Appellate Tribunal matters</li>
  <li>TIN registration and related compliance</li>
  <li>VAT registration and compliance</li>
  <li>Tax assessment challenges</li>
  <li>Corporate tax planning and legal advice</li>
</ul>`,
    },
  };
  return map[slug] || null;
}

// ── page-specific content builders ────────────────────────────────────────────

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
<h1 style="font-size:30px;font-weight:700;margin-bottom:8px;color:#0a0a0a">Trusted Lawyer in Bangladesh – Advocate Md. Shah Alam</h1>
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
<h1 style="font-size:30px;font-weight:700;margin-bottom:8px;color:#0a0a0a">About Advocate Md. Shah Alam — Lawyer in Bangladesh</h1>
<p style="font-size:16px;color:#555;margin-bottom:24px">LL.M (Dhaka International University) | Enrolled: Bangladesh Bar Council | Supreme Court of Bangladesh</p>

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
  const recentPosts = posts.slice(0, 30);
  const listItems = recentPosts.map(p => {
    const path = lang === 'bn' ? `/bn/blog/${p.slug}` : `/blog/${p.slug}`;
    return `<li style="margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid #eee">
      <a href="${path}" style="color:#1a56db;font-weight:600;font-size:15px">${escHtml(p.title||p.metaTitle||p.slug)}</a>
      ${p.publishedDate ? `<span style="color:#888;font-size:13px;margin-left:8px">${p.publishedDate}</span>` : ''}
      ${p.heroIntro ? `<p style="color:#555;font-size:14px;margin:4px 0 0">${escHtml(p.heroIntro.slice(0,120))}…</p>` : ''}
    </li>`;
  }).join('');

  if (lang === 'bn') return `
<h1 style="font-size:28px;font-weight:700;margin-bottom:8px;color:#0a0a0a">বাংলাদেশের আইনি গাইড — অ্যাডভোকেট মো. শাহ আলম</h1>
<p style="color:#555;margin-bottom:20px">বাংলাদেশের আইন বিষয়ক বিস্তারিত নিবন্ধ। ফৌজদারি, তালাক, জামিন, জমি-জমা, কোম্পানি ও সুপ্রিম কোর্ট আইন।</p>
<ul style="padding-left:0;list-style:none">${listItems}</ul>`;

  return `
<h1 style="font-size:28px;font-weight:700;margin-bottom:8px;color:#0a0a0a">Bangladesh Legal Guide — By Advocate Md. Shah Alam</h1>
<p style="color:#555;margin-bottom:20px">Detailed legal articles on Bangladesh criminal law, divorce, bail, property, company law, and Supreme Court procedures — written by an experienced Dhaka lawyer.</p>
<ul style="padding-left:0;list-style:none">${listItems}</ul>`;
}

function educationBody() {
  return `
<h1 style="font-size:28px;font-weight:700;margin-bottom:8px;color:#0a0a0a">Career &amp; Education — Advocate Md. Shah Alam</h1>
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
    <li>20+ years of continuous legal practice across Bangladesh</li>
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

function contactBody() {
  return `
<h1 style="font-size:28px;font-weight:700;margin-bottom:8px;color:#0a0a0a">Contact Advocate Md. Shah Alam — Lawyer in Bangladesh</h1>
<p style="color:#555;margin-bottom:20px">Trusted lawyer in Uttara, Dhaka — available for criminal, divorce, bail, property &amp; corporate cases.</p>
<h2 style="font-size:20px;font-weight:700;margin:20px 0 10px">Chamber Locations</h2>
<ul style="padding-left:20px;color:#333;line-height:2.2">
  <li><strong>Uttara Chamber:</strong> House 46, Road 6/B, Sector 12, Uttara West, Dhaka-1230</li>
  <li><strong>Court Chamber:</strong> Ainjeebi Samity Bhaban, 4th Floor, 6/7 Court House Street, Kotwali, Dhaka-1100</li>
</ul>
<h2 style="font-size:20px;font-weight:700;margin:20px 0 10px">Contact Details</h2>
<ul style="padding-left:20px;color:#333;line-height:2.2">
  <li><strong>Phone:</strong> <a href="tel:+8801712655546" style="color:#1a56db">+880 1712-655546</a></li>
  <li><strong>WhatsApp:</strong> <a href="https://wa.me/8801955802007" style="color:#25D366">+880 1955-802007</a></li>
  <li><strong>Email:</strong> <a href="mailto:contact@advmdshahalam.me" style="color:#1a56db">contact@advmdshahalam.me</a></li>
  <li><strong>Office Hours:</strong> Saturday – Thursday, 9:00 AM – 9:00 PM</li>
</ul>
<h2 style="font-size:20px;font-weight:700;margin:20px 0 10px">Practice Areas</h2>
<ul style="padding-left:20px;color:#333;line-height:2">
  ${services.items.map(s=>`<li><a href="${s.link}" style="color:#1a56db">${escHtml(s.title)}</a></li>`).join('')}
</ul>
<p style="margin-top:16px;color:#555;font-size:13px">Advocate Md. Shah Alam is enrolled with the Bangladesh Bar Council and authorised to practise at all courts in Bangladesh including the Supreme Court.</p>`;
}

function privacyBody() {
  return `<h1 style="font-size:26px;font-weight:700;margin-bottom:12px">Privacy Policy — advmdshahalam.me</h1>
<p style="color:#555;font-size:13px;margin-bottom:20px">This Privacy Policy describes how advmdshahalam.me collects and uses information.</p>
<h2 style="font-size:18px;font-weight:700;margin:16px 0 8px">Information We Collect</h2>
<p style="color:#333">We collect contact information you voluntarily provide through our contact form (name, phone number, case details) which is sent via WhatsApp. We use Google Analytics to understand site traffic. We do not sell or share your personal data.</p>
<h2 style="font-size:18px;font-weight:700;margin:16px 0 8px">Cookies</h2>
<p style="color:#333">We use cookies for Google Analytics and AdSense. You may disable cookies in your browser settings.</p>
<h2 style="font-size:18px;font-weight:700;margin:16px 0 8px">Contact</h2>
<p style="color:#333">For privacy enquiries: <a href="mailto:contact@advmdshahalam.me" style="color:#1a56db">contact@advmdshahalam.me</a></p>`;
}

// ── main ─────────────────────────────────────────────────────────────────────
async function main() {
  if (!fs.existsSync(DIST)) {
    console.error('❌  dist/ not found — run `npm run build` first');
    process.exit(1);
  }

  const base = readBase();
  const TODAY = new Date().toISOString().split('T')[0];

  console.log('\n🏠 Pre-rendering core pages...');

  // ── Home page (/index.html) ────────────────────────────────────────────────
  {
    const html = buildPage(base, {
      title: 'Trusted Lawyer in Bangladesh | Advocate Md. Shah Alam — Uttara, Dhaka',
      description: 'Official website of Advocate Md. Shah Alam, experienced lawyer in Uttara, Dhaka, practising at the Supreme Court of Bangladesh. Criminal, divorce, bail & property law.',
      canonical: `${BASE}/`,
      body: homeBody(),
    });
    write(path.join(DIST, 'index.html'), html);
    console.log('  ✓ / (home)');
  }

  // ── Advocate/About page ────────────────────────────────────────────────────
  {
    const html = buildPage(base, {
      title: 'About Advocate Md. Shah Alam | Supreme Court Lawyer — Bangladesh',
      description: 'Learn about Advocate Md. Shah Alam — LL.M lawyer with 20+ years experience practising at the Supreme Court of Bangladesh. Chamber in Uttara, Dhaka.',
      canonical: `${BASE}/advocate-md-shah-alam`,
      body: advocateBody(),
    });
    write(path.join(DIST, 'advocate-md-shah-alam', 'index.html'), html);
    console.log('  ✓ /advocate-md-shah-alam');
  }

  // ── Education page ─────────────────────────────────────────────────────────
  {
    const html = buildPage(base, {
      title: 'Career & Education | Advocate Md. Shah Alam — Bangladesh',
      description: 'Explore the education and career timeline of Advocate Shah Alam — LL.M lawyer with 20+ years at the Supreme Court of Bangladesh.',
      canonical: `${BASE}/education`,
      body: educationBody(),
    });
    write(path.join(DIST, 'education', 'index.html'), html);
    console.log('  ✓ /education');
  }

  // ── Contact page ───────────────────────────────────────────────────────────
  {
    const html = buildPage(base, {
      title: 'Contact Advocate Md. Shah Alam | Criminal, Divorce & Bail Lawyer — Dhaka',
      description: 'Contact Advocate Md. Shah Alam for legal consultation in Dhaka & Uttara. Call +880 1712-655546 or WhatsApp for criminal, divorce, bail & property cases.',
      canonical: `${BASE}/contact`,
      body: contactBody(),
    });
    write(path.join(DIST, 'contact', 'index.html'), html);
    console.log('  ✓ /contact');
  }

  // ── Privacy Policy ─────────────────────────────────────────────────────────
  {
    const html = buildPage(base, {
      title: 'Privacy Policy | advmdshahalam.me',
      description: 'Privacy Policy for advmdshahalam.me — legal website of Advocate Md. Shah Alam.',
      canonical: `${BASE}/privacy-policy`,
      body: privacyBody(),
    });
    write(path.join(DIST, 'privacy-policy', 'index.html'), html);
    console.log('  ✓ /privacy-policy');
  }

  // ── Service pages ──────────────────────────────────────────────────────────
  console.log('\n⚖️  Pre-rendering service pages...');
  const serviceSlugs = ['criminal-lawyer','bail-lawyer','divorce-lawyer','land-lawyer','supreme-court-lawyer','company-corporate-lawyer','tax-lawyer'];
  for (const slug of serviceSlugs) {
    const meta = getServiceMeta(slug);
    if (!meta) continue;
    const html = buildPage(base, {
      title: meta.title,
      description: meta.desc,
      canonical: `${BASE}/services/${slug}`,
      body: `<h1 style="font-size:28px;font-weight:700;margin-bottom:16px;color:#0a0a0a">${meta.h1}</h1>
${DISCLAIMER}${meta.body}${CTA}`,
    });
    write(path.join(DIST, 'services', slug, 'index.html'), html);
    console.log(`  ✓ /services/${slug}`);
  }

  // ── Blog indexes ───────────────────────────────────────────────────────────
  console.log('\n📋 Pre-rendering blog indexes...');
  const enFiles = fs.readdirSync(EN_DIR).filter(f => f.endsWith('.json'));
  const enPosts = enFiles.map(f => jsonLoad(path.join(EN_DIR,f))).filter(p => p && p.slug && !p.isDraft);
  const bnFiles = fs.readdirSync(BN_DIR).filter(f => f.endsWith('.json'));
  const bnPosts = bnFiles.map(f => jsonLoad(path.join(BN_DIR,f))).filter(p => p && p.slug && !p.isDraft);

  {
    const html = buildPage(base, {
      title: 'Bangladesh Legal Blog | Criminal, Divorce & Property Law — Advocate Shah Alam',
      description: 'Expert legal articles on Bangladesh criminal law, divorce procedure, bail process, land disputes, Supreme Court matters and more. Written by Advocate Md. Shah Alam.',
      canonical: `${BASE}/blog`,
      body: blogIndexBody(enPosts, 'en'),
    });
    write(path.join(DIST, 'blog', 'index.html'), html);
    console.log('  ✓ /blog');
  }
  {
    const html = buildPage(base, {
      title: 'বাংলাদেশ আইনি ব্লগ | অ্যাডভোকেট মো. শাহ আলম',
      description: 'বাংলাদেশের আইন বিষয়ক বিস্তারিত নিবন্ধ। ফৌজদারি, তালাক, জামিন, জমি-জমা ও সুপ্রিম কোর্ট আইন।',
      canonical: `${BASE}/bn/blog`,
      body: blogIndexBody(bnPosts, 'bn'),
      lang: 'bn',
    });
    write(path.join(DIST, 'bn', 'blog', 'index.html'), html);
    console.log('  ✓ /bn/blog');
  }

  // ── EN blog posts ──────────────────────────────────────────────────────────
  console.log('\n📚 Pre-rendering EN blog posts...');
  let enCount = 0;
  for (const post of enPosts) {
    const html = buildPage(base, {
      title: post.metaTitle || post.title,
      description: post.metaDescription || (post.heroIntro||'').slice(0,160),
      canonical: `${BASE}/blog/${post.slug}`,
      body: buildPostBody(post),
      lang: 'en',
    });
    write(path.join(DIST,'blog',post.slug,'index.html'), html);
    enCount++;
  }
  console.log(`  ✓ ${enCount} EN posts`);

  // ── BN blog posts ──────────────────────────────────────────────────────────
  console.log('\n📚 Pre-rendering BN blog posts...');
  let bnCount = 0;
  for (const post of bnPosts) {
    const bnSections = (post.sections||[]).map((s,i)=>
      `<section id="s${i}" style="margin-bottom:24px"><h2 style="font-size:20px;font-weight:700;margin-bottom:8px">${escHtml(s.h2||'')}</h2><div>${s.content||''}</div></section>`
    ).join('');

    const html = buildPage(base, {
      title: post.metaTitle || post.title || 'বাংলাদেশ আইনি গাইড',
      description: post.metaDescription || (post.heroIntro||'').slice(0,160),
      canonical: `${BASE}/bn/blog/${post.slug}`,
      body: `<h1 style="font-size:28px;font-weight:700;margin-bottom:8px">${escHtml(post.title||'')}</h1>
<p style="color:#555;font-size:14px;margin-bottom:20px">লেখক: <strong>অ্যাডভোকেট মো. শাহ আলম</strong> &middot; ${escHtml(post.publishedDate||'')}</p>
${BN_DISCLAIMER}
<p style="margin-bottom:20px">${escHtml(post.heroIntro||'')}</p>
${bnSections}`,
      lang: 'bn',
    });
    write(path.join(DIST,'bn','blog',post.slug,'index.html'), html);
    bnCount++;
  }
  console.log(`  ✓ ${bnCount} BN posts`);

  const total = enCount + bnCount + serviceSlugs.length + 7; // +7 core pages
  console.log(`\n✅ Pre-rendering complete: ${total} pages total\n`);
}

main().catch(err => { console.error('Pre-render failed:', err); process.exit(1); });
