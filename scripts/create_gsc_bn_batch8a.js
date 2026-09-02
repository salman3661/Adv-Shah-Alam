const fs = require('fs');
const path = require('path');

const bnDir = path.join(__dirname, '..', 'src', 'content', 'posts', 'bn');

const articles = [

// ============================================================
// ARTICLE 1: নামজারি অনলাইনে চেক করার সম্পূর্ণ নিয়ম ২০২৬
// ============================================================
{
  file: 'namjari-online-check-korar-niyom-2026-complete.json',
  data: {
    slug: 'namjari-online-check-korar-niyom-2026-complete',
    category: 'ভূমি আইন',
    title: 'নামজারি অনলাইনে চেক করার সম্পূর্ণ নিয়ম ২০২৬ — ঘরে বসেই জানুন আবেদনের অবস্থা',
    metaTitle: 'নামজারি অনলাইন চেক ২০২৬ | namjari online check bangladesh',
    metaDescription: 'নামজারি বা খারিজ আবেদনের অবস্থা অনলাইনে কীভাবে দেখবেন? land.gov.bd ও eporcha পোর্টালে নামজারি চেক করার সম্পূর্ণ গাইড ২০২৬।',
    keywords: [
      'নামজারি অনলাইন চেক ২০২৬',
      'namjari online check bangladesh',
      'নামজারি আবেদনের অবস্থা',
      'খারিজ আবেদন চেক',
      'land.gov.bd namjari'
    ],
    publishedDate: '2026-09-02',
    lastModified: '2026-09-02',
    readTime: '১০ মিনিট',
    heroIntro: '<p>জমি কিনেছেন বা উত্তরাধিকারসূত্রে পেয়েছেন — নামজারি (খারিজ) আবেদন করেছেন কিন্তু জানেন না কোথায় আছে? এখন আর ভূমি অফিসে বারবার যেতে হবে না। ঘরে বসে মোবাইল বা কম্পিউটার থেকেই নামজারির অবস্থা জানুন। পরামর্শের জন্য: <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold">অ্যাডভোকেট মোঃ শাহ আলম</a> — <a href="tel:01712655546" style="color:var(--gold);font-weight:bold">📞 01712655546</a></p>',
    quickAnswer: {
      heading: '⚡ নামজারি অনলাইনে চেক — দ্রুত উপায়',
      points: [
        'land.gov.bd → ই-নামজারি সেকশনে যান',
        'জেলা, উপজেলা ও আবেদন নম্বর দিয়ে সার্চ করুন',
        'eporcha.gov.bd-এও নামজারির তথ্য পাওয়া যায়',
        'আবেদন নম্বর না থাকলে মালিকের নাম বা দাগ নম্বর দিয়েও খোঁজা যায়',
        'স্থিতি: "বিচারাধীন", "অনুমোদিত" বা "নামঞ্জুর"'
      ]
    },
    toc: [
      'নামজারি (খারিজ) কী এবং কেন জরুরি?',
      'অনলাইনে নামজারি চেক করার ৩টি উপায়',
      'land.gov.bd-এ নামজারি স্ট্যাটাস চেক করার ধাপ',
      'আবেদন নম্বর না থাকলে কীভাবে খুঁজবেন?',
      'নামজারি কতদিনে হয়?',
      'নামজারি না হলে বা আটকে থাকলে কী করবেন?',
      'নামজারির পর কী করতে হবে?',
      'আইনজীবীর পরামর্শ'
    ],
    sections: [
      {
        heading: '১. নামজারি (খারিজ) কী এবং কেন জরুরি?',
        content: `<p>নামজারি (বা খারিজ) হলো জমির সরকারি রেকর্ডে মালিকের নাম পরিবর্তন করার প্রক্রিয়া। জমি কেনার পর বা উত্তরাধিকারসূত্রে পাওয়ার পর নামজারি না করলে সরকারি রেকর্ডে আগের মালিকের নামই থাকে।</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-left:4px solid #dc3545;border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:#dc3545;margin:0 0 0.75rem 0">⚠️ নামজারি না করলে যা হতে পারে</h4>
<ul style="margin:0;padding-left:1.5rem;color:var(--text-secondary);line-height:2">
<li>ভূমি উন্নয়ন কর (খাজনা) দিতে পারবেন না</li>
<li>ব্যাংক লোন নিতে পারবেন না</li>
<li>জমি বিক্রি বা দান করতে সমস্যা হবে</li>
<li>ভবিষ্যতে মালিকানা নিয়ে বিবাদ হতে পারে</li>
<li>সরকারি সুবিধা পেতে সমস্যা হবে</li>
</ul>
</div>`
      },
      {
        heading: '২. অনলাইনে নামজারি চেক করার ৩টি উপায়',
        content: `<p>বর্তমানে ৩টি প্রধান উপায়ে অনলাইনে নামজারি চেক করা যায়।</p>
<div style="margin:1.25rem 0">
<div style="background:var(--surface);border:1px solid var(--card-border);border-left:4px solid var(--accent);border-radius:0.75rem;padding:1.25rem;margin-bottom:1rem">
<h4 style="color:var(--accent);margin:0 0 0.5rem 0">🌐 ১. land.gov.bd (ভূমি মন্ত্রণালয় পোর্টাল)</h4>
<p style="margin:0;color:var(--text-secondary);font-size:0.9rem;line-height:1.8">সবচেয়ে সরাসরি পদ্ধতি। এখানে ই-নামজারি সেকশনে আবেদনের স্ট্যাটাস দেখা যায়।</p>
</div>
<div style="background:var(--surface);border:1px solid var(--card-border);border-left:4px solid var(--gold);border-radius:0.75rem;padding:1.25rem;margin-bottom:1rem">
<h4 style="color:var(--gold);margin:0 0 0.5rem 0">📱 ২. eporcha.gov.bd</h4>
<p style="margin:0;color:var(--text-secondary);font-size:0.9rem;line-height:1.8">ই-পর্চা পোর্টালেও নামজারি আবেদনের তথ্য এবং খতিয়ান দেখা যায়।</p>
</div>
<div style="background:var(--surface);border:1px solid var(--card-border);border-left:4px solid #28a745;border-radius:0.75rem;padding:1.25rem">
<h4 style="color:#28a745;margin:0 0 0.5rem 0">📲 ৩. ভূমি সেবা অ্যাপ</h4>
<p style="margin:0;color:var(--text-secondary);font-size:0.9rem;line-height:1.8">Google Play Store থেকে "ভূমি সেবা" অ্যাপ ডাউনলোড করে মোবাইল থেকেই দেখুন।</p>
</div>
</div>`
      },
      {
        heading: '৩. land.gov.bd-এ নামজারি স্ট্যাটাস চেক করার ধাপ',
        content: `<p>এটিই সবচেয়ে সহজ ও নির্ভরযোগ্য পদ্ধতি।</p>
<div style="margin:1.25rem 0">
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">১</div>
<div><h4 style="margin:0 0 0.4rem 0">land.gov.bd-এ প্রবেশ করুন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">ব্রাউজারে land.gov.bd লিখুন। হোমপেজে "ই-নামজারি" অপশন খুঁজুন।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">২</div>
<div><h4 style="margin:0 0 0.4rem 0">"নামজারি আবেদনের অবস্থা" বা "Application Status" ক্লিক করুন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">অনেক সময় এটি সরাসরি namjari.land.gov.bd লিংকে পাওয়া যায়।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">৩</div>
<div><h4 style="margin:0 0 0.4rem 0">জেলা ও উপজেলা বেছে আবেদন নম্বর দিন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">আবেদন করার সময় যে নম্বর পেয়েছিলেন সেটি দিন। তারপর "খুঁজুন" চাপুন।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--gold);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">৪</div>
<div><h4 style="margin:0 0 0.4rem 0">আবেদনের বর্তমান অবস্থা দেখুন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">স্ক্রিনে দেখাবে আপনার আবেদন কোন ধাপে আছে — সহকারী কমিশনারের কাছে নাকি ইউএনও অফিসে।</p></div>
</div>
</div>`
      },
      {
        heading: '৪. নামজারি কতদিনে হয়?',
        content: `<p>আইন অনুযায়ী নামজারি আবেদনের ৪৫ কার্যদিবসের মধ্যে নিষ্পত্তি হওয়ার কথা। কিন্তু বাস্তবে বিভিন্ন সময় লাগে।</p>
<div style="overflow-x:auto;margin:1.25rem 0">
<table style="width:100%;border-collapse:collapse;font-size:0.95rem">
<thead><tr style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff">
<th style="padding:0.85rem 1rem;text-align:left">পরিস্থিতি</th>
<th style="padding:0.85rem 1rem;text-align:center">আনুমানিক সময়</th>
</tr></thead>
<tbody>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">সাধারণ ক্রয় দলিলে নামজারি</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center;font-weight:600">১-৩ মাস</td></tr>
<tr><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">উত্তরাধিকারসূত্রে (ওয়ারিশসনদ সহ)</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center;font-weight:600">২-৪ মাস</td></tr>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">আদালতের ডিক্রি অনুযায়ী</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center;font-weight:600">৩-৬ মাস</td></tr>
<tr><td style="padding:0.85rem 1rem">বিতর্কিত বা আপত্তি থাকলে</td><td style="padding:0.85rem 1rem;text-align:center;font-weight:600">৬-১২+ মাস</td></tr>
</tbody>
</table>
</div>`
      },
      {
        heading: '৫. নামজারি না হলে বা আটকে থাকলে কী করবেন?',
        content: `<p>অনেক সময় নামজারি দীর্ঘদিন "বিচারাধীন" থাকে বা "নামঞ্জুর" হয়। এই পরিস্থিতিতে কী করবেন?</p>
<div style="margin:1.25rem 0">
<div style="background:var(--surface);border:1px solid var(--card-border);border-left:4px solid var(--gold);border-radius:0.75rem;padding:1.25rem;margin-bottom:1rem">
<h4 style="color:var(--gold);margin:0 0 0.5rem 0">📍 নামজারি আটকে থাকলে</h4>
<ul style="margin:0;padding-left:1.25rem;color:var(--text-secondary);font-size:0.9rem;line-height:1.9">
<li>সরাসরি উপজেলা ভূমি অফিসে যান</li>
<li>সহকারী কমিশনার (ভূমি)-এর সাথে কথা বলুন</li>
<li>৪৫ দিনের বেশি হলে জেলা প্রশাসক বরাবর আবেদন করুন</li>
<li>প্রয়োজনে আইনজীবীর মাধ্যমে প্রশাসনিক ট্রাইব্যুনালে যান</li>
</ul>
</div>
<div style="background:var(--surface);border:1px solid var(--card-border);border-left:4px solid #dc3545;border-radius:0.75rem;padding:1.25rem">
<h4 style="color:#dc3545;margin:0 0 0.5rem 0">❌ নামজারি "নামঞ্জুর" হলে</h4>
<ul style="margin:0;padding-left:1.25rem;color:var(--text-secondary);font-size:0.9rem;line-height:1.9">
<li>কারণ জেনে প্রয়োজনীয় কাগজ যোগ করুন</li>
<li>৪৫ দিনের মধ্যে আপিল করুন</li>
<li>আপিল না মানলে ভূমি ট্রাইব্যুনালে মামলা করুন</li>
</ul>
</div>
</div>`
      },
      {
        heading: '৬. আইনজীবীর পরামর্শ',
        content: `<div style="background:linear-gradient(135deg,rgba(26,63,191,0.08),rgba(198,167,94,0.08));padding:1.5rem;border-radius:1rem;border:1px solid var(--gold);margin:1.5rem 0">
<h3 style="margin:0 0 0.75rem 0;color:var(--text)">⚖️ নামজারি জটিলতায় সহায়তা</h3>
<p style="margin:0 0 1.25rem 0;color:var(--text-secondary);line-height:1.8">নামজারি আটকে থাকলে বা নামঞ্জুর হলে অ্যাডভোকেট মোঃ শাহ আলম আপনাকে সঠিক পথ দেখাবেন।</p>
<div style="display:flex;gap:1rem;flex-wrap:wrap">
<a href="tel:01712655546" style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">📞 কল করুন: 01712655546</a>
<a href="https://wa.me/8801712655546" target="_blank" style="background:#25D366;color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">💬 WhatsApp</a>
<a href="/bn/contact" style="background:var(--surface);color:var(--text);padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none;border:1px solid var(--card-border)">📍 চেম্বার ঠিকানা</a>
</div>
</div>`
      }
    ],
    faqs: [
      { question: 'নামজারি আবেদন নম্বর না থাকলে কীভাবে চেক করব?', answer: 'eporcha.gov.bd বা land.gov.bd-এ মালিকের নাম, দাগ নম্বর বা মৌজার নাম দিয়ে খোঁজা যায়। ভূমি অফিস থেকে আবেদন নম্বরও জানতে পারবেন।' },
      { question: 'নামজারি কতদিনে শেষ হয়?', answer: 'আইনগতভাবে ৪৫ কার্যদিবসের মধ্যে। কিন্তু বাস্তবে ১-৬ মাস পর্যন্ত সময় লাগতে পারে।' },
      { question: 'নামজারি না করলে কি জমির মালিক হওয়া যাবে না?', answer: 'দলিল থাকলে আইনগতভাবে মালিক — কিন্তু সরকারি রেকর্ডে নাম না আসলে খাজনা দেওয়া, ব্যাংক লোন বা ভবিষ্যতে বিক্রিতে সমস্যা হবে।' },
      { question: 'নামজারির সরকারি ফি কত?', answer: 'নামজারির আবেদন ফি মাত্র ১০০ টাকা (আনুষঙ্গিক খরচসহ ৫০০-২০০০ টাকা হতে পারে)।' },
      { question: 'মোবাইলে নামজারি চেক করা যাবে কি?', answer: 'হ্যাঁ। Google Play থেকে "ভূমি সেবা" অ্যাপ ডাউনলোড করুন বা মোবাইল ব্রাউজারে land.gov.bd-এ যান।' }
    ],
    featured: false,
    impressions: 214,
    clicks: 15
  }
},

// ============================================================
// ARTICLE 2: মিউটেশন আবেদনের অবস্থা চেক ২০২৬
// ============================================================
{
  file: 'mutation-obostha-check-2026-complete.json',
  data: {
    slug: 'mutation-obostha-check-2026-complete',
    category: 'ভূমি আইন',
    title: 'মিউটেশন আবেদনের সর্বশেষ অবস্থা কীভাবে চেক করবেন? সম্পূর্ণ গাইড ২০২৬',
    metaTitle: 'মিউটেশন আবেদনের সর্বশেষ অবস্থা ২০২৬ | অনলাইনে মিউটেশন চেক',
    metaDescription: 'মিউটেশন আবেদনের বর্তমান অবস্থা কীভাবে জানবেন? অনলাইন পোর্টালে ট্র্যাকিং, মিউটেশন আটকে গেলে করণীয় — সম্পূর্ণ গাইড বাংলায় ২০২৬।',
    keywords: [
      'মিউটেশন আবেদনের সর্বশেষ অবস্থা',
      'mutation check online bangladesh',
      'মিউটেশন ট্র্যাকিং',
      'নামজারি মিউটেশন পার্থক্য',
      'online mutation status bangladesh'
    ],
    publishedDate: '2026-09-02',
    lastModified: '2026-09-02',
    readTime: '১১ মিনিট',
    heroIntro: '<p>মিউটেশন আবেদন জমা দিয়েছেন মাসের পর মাস — কিন্তু কোনো আপডেট নেই? অনেকেই বুঝতে পারেন না মিউটেশন আর নামজারি কি একই জিনিস। আবার কোথায় গেলে অবস্থা জানা যাবে সেটাও অজানা। এই আর্টিকেলে সব জানুন। পরামর্শের জন্য: <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold">অ্যাডভোকেট মোঃ শাহ আলম</a> — <a href="tel:01712655546" style="color:var(--gold);font-weight:bold">📞 01712655546</a></p>',
    quickAnswer: {
      heading: '⚡ মিউটেশন স্ট্যাটাস চেক — সংক্ষিপ্ত উত্তর',
      points: [
        'বাংলাদেশে "মিউটেশন" ও "নামজারি" একই জিনিস',
        'অনলাইনে চেক: land.gov.bd → ই-নামজারি',
        'আবেদন নম্বর বা NID দিয়ে ট্র্যাক করুন',
        'সমস্যা হলে: উপজেলা ভূমি অফিসে সরাসরি যান',
        'ডিজিটাল পর্চা পেতে: eporcha.gov.bd'
      ]
    },
    toc: [
      'মিউটেশন ও নামজারি কি একই?',
      'মিউটেশন আবেদনের অবস্থা অনলাইনে কীভাবে দেখবেন?',
      'মিউটেশনের জন্য কী কী কাগজ লাগে?',
      'মিউটেশন ফি কত?',
      'মিউটেশন আটকে গেলে কী করবেন?',
      'মিউটেশনের পর কী করতে হবে?',
      'আইনি সহায়তা'
    ],
    sections: [
      {
        heading: '১. মিউটেশন ও নামজারি কি একই?',
        content: `<p>অনেকে "মিউটেশন" আর "নামজারি" আলাদা মনে করেন। কিন্তু বাংলাদেশে এই দুটো শব্দ একই জিনিস বোঝায়।</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-left:4px solid var(--accent);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:var(--accent);margin:0 0 0.75rem 0">📌 বিভিন্ন নাম, একই কাজ</h4>
<ul style="margin:0;padding-left:1.5rem;color:var(--text-secondary);line-height:2">
<li><strong>নামজারি</strong> — সাধারণ বাংলা পরিভাষা</li>
<li><strong>খারিজ</strong> — গ্রামাঞ্চলে বহুল ব্যবহৃত</li>
<li><strong>মিউটেশন</strong> — ইংরেজি শব্দ, সরকারি কাগজেও ব্যবহার হয়</li>
<li><strong>রেকর্ড সংশোধন</strong> — প্রশাসনিক ভাষায়</li>
</ul>
<p style="margin:0.75rem 0 0 0;color:var(--text-secondary)">সবগুলোর অর্থ একটাই — জমির সরকারি রেকর্ডে নতুন মালিকের নাম লেখানো।</p>
</div>`
      },
      {
        heading: '২. মিউটেশন আবেদনের অবস্থা অনলাইনে কীভাবে দেখবেন?',
        content: `<p>দুটি প্রধান পোর্টালে মিউটেশনের অবস্থা দেখা যায়।</p>
<div style="margin:1.25rem 0">
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">১</div>
<div><h4 style="margin:0 0 0.4rem 0">land.gov.bd-এ যান</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">মেনু থেকে "ই-নামজারি" বা "Mutation Status" খুঁজুন।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">২</div>
<div><h4 style="margin:0 0 0.4rem 0">জেলা, উপজেলা ও আবেদন নম্বর দিন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">আবেদনের সময় পাওয়া রসিদে আবেদন নম্বর থাকে।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--gold);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">৩</div>
<div><h4 style="margin:0 0 0.4rem 0">স্ট্যাটাস দেখুন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">আপনার আবেদন কোন কর্মকর্তার কাছে আছে এবং কী সিদ্ধান্ত হয়েছে দেখতে পাবেন।</p></div>
</div>
</div>`
      },
      {
        heading: '৩. মিউটেশনের জন্য কী কী কাগজ লাগে?',
        content: `<div style="background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:var(--accent);margin:0 0 1rem 0">📋 প্রয়োজনীয় কাগজপত্র</h4>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
<div>
<h5 style="color:var(--text);margin:0 0 0.5rem 0">ক্রয়ের ক্ষেত্রে</h5>
<ul style="margin:0;padding-left:1.25rem;color:var(--text-secondary);font-size:0.9rem;line-height:1.9">
<li>সাফ কবলা দলিল (রেজিস্ট্রিকৃত)</li>
<li>NID কার্ড</li>
<li>পাসপোর্ট সাইজ ছবি</li>
<li>আবেদন ফরম</li>
<li>খাজনার রসিদ</li>
</ul>
</div>
<div>
<h5 style="color:var(--text);margin:0 0 0.5rem 0">উত্তরাধিকারের ক্ষেত্রে</h5>
<ul style="margin:0;padding-left:1.25rem;color:var(--text-secondary);font-size:0.9rem;line-height:1.9">
<li>ওয়ারিশ সনদ</li>
<li>মৃত্যু সনদ</li>
<li>সকল ওয়ারিশের NID</li>
<li>পূর্ববর্তী খতিয়ান</li>
<li>আবেদন ফরম</li>
</ul>
</div>
</div>
</div>`
      },
      {
        heading: '৪. আইনি সহায়তা',
        content: `<div style="background:linear-gradient(135deg,rgba(26,63,191,0.08),rgba(198,167,94,0.08));padding:1.5rem;border-radius:1rem;border:1px solid var(--gold);margin:1.5rem 0">
<h3 style="margin:0 0 0.75rem 0;color:var(--text)">⚖️ মিউটেশন সমস্যায় সহায়তা</h3>
<p style="margin:0 0 1.25rem 0;color:var(--text-secondary);line-height:1.8">মিউটেশন জটিলতায় অ্যাডভোকেট মোঃ শাহ আলমের সাথে যোগাযোগ করুন।</p>
<div style="display:flex;gap:1rem;flex-wrap:wrap">
<a href="tel:01712655546" style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">📞 কল করুন: 01712655546</a>
<a href="https://wa.me/8801712655546" target="_blank" style="background:#25D366;color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">💬 WhatsApp</a>
</div>
</div>`
      }
    ],
    faqs: [
      { question: 'মিউটেশন ও নামজারি কি আলাদা?', answer: 'না, বাংলাদেশে মিউটেশন ও নামজারি একই জিনিস — জমির রেকর্ডে নতুন মালিকের নাম লেখানো।' },
      { question: 'মিউটেশন কতদিনে হয়?', answer: 'আইন অনুযায়ী ৪৫ কার্যদিবস। বাস্তবে ১-৬ মাস সময় লাগতে পারে।' },
      { question: 'মিউটেশন ফি কত?', answer: 'সরকারি আবেদন ফি মাত্র ১০০ টাকা। তবে আনুষঙ্গিক খরচ মিলিয়ে ৫০০-২০০০ টাকা হতে পারে।' },
      { question: 'মিউটেশন না করলে কি খাজনা দেওয়া যাবে?', answer: 'না, নামজারি না হলে নতুন মালিকের নামে খাজনা দেওয়া সম্ভব হয় না।' },
      { question: 'অনলাইনে মিউটেশনের জন্য আবেদন করা যায় কি?', answer: 'হ্যাঁ, land.gov.bd পোর্টালে অনলাইনে মিউটেশনের আবেদন করা যায়।' }
    ],
    featured: false,
    impressions: 109,
    clicks: 2
  }
},

// ============================================================
// ARTICLE 3: হাইকোর্ট থেকে আগাম জামিন নিতে কত টাকা লাগে ২০২৬
// ============================================================
{
  file: 'haikort-agam-jamin-khoroch-niyom-2026.json',
  data: {
    slug: 'haikort-agam-jamin-khoroch-niyom-2026',
    category: 'ফৌজদারি আইন',
    title: 'হাইকোর্ট থেকে আগাম জামিন নিতে কত টাকা লাগে? সম্পূর্ণ খরচ ও প্রক্রিয়া ২০২৬',
    metaTitle: 'হাইকোর্ট থেকে আগাম জামিন নিতে কত টাকা লাগে ২০২৬ | আগাম জামিনের নিয়ম',
    metaDescription: 'হাইকোর্ট থেকে আগাম জামিন নিতে কত টাকা লাগে? আইনজীবী ফি, কোর্ট ফি ও প্রক্রিয়া সহ সম্পূর্ণ গাইড বাংলায় ২০২৬।',
    keywords: [
      'হাইকোর্ট থেকে আগাম জামিন নিতে কত টাকা লাগে',
      'anticipatory bail high court bangladesh',
      'আগাম জামিনের নিয়ম ২০২৬',
      'pre-arrest bail bangladesh',
      'হাইকোর্ট জামিন খরচ'
    ],
    publishedDate: '2026-09-02',
    lastModified: '2026-09-02',
    readTime: '১৩ মিনিট',
    heroIntro: '<p>মামলায় গ্রেফতারের আশঙ্কায় আছেন? হাইকোর্ট থেকে আগাম জামিন নেওয়াই সবচেয়ে নিরাপদ পথ। কিন্তু খরচ কত? কতদিন লাগে? প্রক্রিয়া কী? — এই আর্টিকেলে সব বিস্তারিত বলা হয়েছে। পরামর্শের জন্য: <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold">অ্যাডভোকেট মোঃ শাহ আলম</a> — <a href="tel:01712655546" style="color:var(--gold);font-weight:bold">📞 01712655546</a></p>',
    quickAnswer: {
      heading: '⚡ হাইকোর্টে আগাম জামিন — মূল তথ্য',
      points: [
        'আইনজীবী ফি: ১৫,০০০ – ১,০০,০০০+ টাকা (মামলার ধরন অনুযায়ী)',
        'কোর্ট ফি: ৫০০ – ৫,০০০ টাকা',
        'শুনানি পেতে সময়: ২-৭ কার্যদিবস',
        'আগাম জামিনের মেয়াদ: সাধারণত ৬ মাস (বাড়ানো যায়)',
        'জামিন বাতিল হলে: বিচারিক হেফাজতে নিতে পারে'
      ]
    },
    toc: [
      'আগাম জামিন কী এবং কখন দরকার?',
      'হাইকোর্টে আগাম জামিনের খরচ — সম্পূর্ণ তালিকা',
      'আগাম জামিনের আবেদন প্রক্রিয়া',
      'আগাম জামিনে শর্তাবলী কী থাকে?',
      'আগাম জামিন না পেলে কী করবেন?',
      'জেলা সেশন কোর্টে আগাম জামিন',
      'আইনজীবীর সহায়তা'
    ],
    sections: [
      {
        heading: '১. আগাম জামিন কী এবং কখন দরকার?',
        content: `<p>আগাম জামিন (Anticipatory Bail বা Pre-Arrest Bail) হলো গ্রেফতারের আগেই জামিন নিয়ে রাখার আইনি ব্যবস্থা। Code of Criminal Procedure (CrPC) ধারা ৪৯৮ অনুযায়ী হাইকোর্ট ও সেশন কোর্ট এই জামিন দিতে পারে।</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-left:4px solid var(--accent);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:var(--accent);margin:0 0 0.75rem 0">📌 কখন আগাম জামিন দরকার?</h4>
<ul style="margin:0;padding-left:1.5rem;color:var(--text-secondary);line-height:2">
<li>মিথ্যা মামলায় ফাঁসানোর আশঙ্কা থাকলে</li>
<li>FIR হয়েছে কিন্তু এখনো গ্রেফতার হননি</li>
<li>পরিবারের কেউ মামলা করার হুমকি দিচ্ছে</li>
<li>রাজনৈতিক বা ব্যবসায়িক প্রতিপক্ষ মামলার পায়তারা করছে</li>
<li>জামিন-অযোগ্য মামলায় গ্রেফতারের ভয় আছে</li>
</ul>
</div>`
      },
      {
        heading: '২. হাইকোর্টে আগাম জামিনের খরচ — সম্পূর্ণ তালিকা',
        content: `<p>হাইকোর্টে আগাম জামিনের খরচ কয়েকটি অংশে ভাগ করা যায়।</p>
<div style="overflow-x:auto;margin:1.25rem 0">
<table style="width:100%;border-collapse:collapse;font-size:0.95rem">
<thead><tr style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff">
<th style="padding:0.85rem 1rem;text-align:left">খরচের খাত</th>
<th style="padding:0.85rem 1rem;text-align:center">পরিমাণ</th>
<th style="padding:0.85rem 1rem;text-align:left">মন্তব্য</th>
</tr></thead>
<tbody>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">আইনজীবী ফি (হাইকোর্ট)</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center;font-weight:600;color:var(--accent)">১৫,০০০ – ১,০০,০০০+ টাকা</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-size:0.85rem">মামলার জটিলতা অনুযায়ী</td></tr>
<tr><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">কোর্ট ফি ও স্ট্যাম্প</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center;font-weight:600;color:var(--accent)">৫০০ – ৫,০০০ টাকা</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-size:0.85rem">আবেদনের ধরন অনুযায়ী</td></tr>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">প্রসেস ফি ও নোটিশ</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center;font-weight:600;color:var(--accent)">১,০০০ – ৩,০০০ টাকা</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-size:0.85rem">বিরুদ্ধ পক্ষকে নোটিশ</td></tr>
<tr><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">জামিনদার (সুরেটি) ব্যবস্থা</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center;font-weight:600;color:var(--accent)">পরিস্থিতি অনুযায়ী</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-size:0.85rem">জামিনদারের সম্পত্তির কাগজ লাগে</td></tr>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem">যাতায়াত ও আনুষঙ্গিক</td><td style="padding:0.85rem 1rem;text-align:center;font-weight:600;color:var(--accent)">৫,০০০ – ১৫,০০০ টাকা</td><td style="padding:0.85rem 1rem;font-size:0.85rem">ঢাকায় যাওয়া-আসা ইত্যাদি</td></tr>
</tbody>
<tfoot><tr style="background:linear-gradient(135deg,rgba(26,63,191,0.1),rgba(198,167,94,0.1))">
<td style="padding:1rem;font-weight:700">মোট আনুমানিক</td>
<td style="padding:1rem;text-align:center;font-weight:700;color:var(--gold)">২০,০০০ – ১,২০,০০০+ টাকা</td>
<td style="padding:1rem;font-size:0.85rem">মামলার ধরন অনুযায়ী</td>
</tr></tfoot>
</table>
</div>
<div style="background:rgba(198,167,94,0.1);border:1px solid var(--gold);border-radius:0.75rem;padding:1rem;margin:1rem 0">
<p style="margin:0"><strong>💡 টিপস:</strong> সেশন কোর্টে আগাম জামিন আবেদন করলে খরচ কম হয় (৮,০০০ – ৩০,০০০ টাকা)। তবে হাইকোর্টের জামিন আরও শক্তিশালী।</p>
</div>`
      },
      {
        heading: '৩. আগাম জামিনের আবেদন প্রক্রিয়া',
        content: `<p>হাইকোর্টে আগাম জামিনের আবেদন করতে নির্দিষ্ট পদ্ধতি অনুসরণ করতে হয়।</p>
<div style="margin:1.25rem 0">
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">১</div>
<div><h4 style="margin:0 0 0.4rem 0">আইনজীবী নিয়োগ করুন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">হাইকোর্টে অনুমোদিত আইনজীবী প্রয়োজন। মামলার বিস্তারিত জানান।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">২</div>
<div><h4 style="margin:0 0 0.4rem 0">আবেদনপত্র ও কারণ তৈরি</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">আইনজীবী আবেদনপত্র তৈরি করবেন — কেন গ্রেফতারের আশঙ্কা আছে তা স্পষ্টভাবে লিখতে হবে।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">৩</div>
<div><h4 style="margin:0 0 0.4rem 0">হাইকোর্টে দাখিল ও শুনানি</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">সাধারণত ২-৭ কার্যদিবসের মধ্যে শুনানির তারিখ পাওয়া যায়।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--gold);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">৪</div>
<div><h4 style="margin:0 0 0.4rem 0">জামিন আদেশ ও শর্ত পালন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">আদালত জামিন মঞ্জুর করলে শর্ত দেবেন — থানায় হাজিরা, পাসপোর্ট জমা, দেশ ছেড়ে না যাওয়া ইত্যাদি।</p></div>
</div>
</div>`
      },
      {
        heading: '৪. আইনজীবীর সহায়তা',
        content: `<div style="background:linear-gradient(135deg,rgba(26,63,191,0.08),rgba(198,167,94,0.08));padding:1.5rem;border-radius:1rem;border:1px solid var(--gold);margin:1.5rem 0">
<h3 style="margin:0 0 0.75rem 0;color:var(--text)">⚖️ আগাম জামিনে তাৎক্ষণিক সহায়তা</h3>
<p style="margin:0 0 1.25rem 0;color:var(--text-secondary);line-height:1.8">গ্রেফতারের আশঙ্কায় থাকলে দেরি না করে অ্যাডভোকেট মোঃ শাহ আলমকে এখনই ফোন করুন।</p>
<div style="display:flex;gap:1rem;flex-wrap:wrap">
<a href="tel:01712655546" style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">📞 এখনই কল করুন: 01712655546</a>
<a href="https://wa.me/8801712655546" target="_blank" style="background:#25D366;color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">💬 WhatsApp</a>
</div>
</div>`
      }
    ],
    faqs: [
      { question: 'হাইকোর্ট থেকে আগাম জামিন নিতে কত দিন লাগে?', answer: 'সাধারণত ২-৭ কার্যদিবসে শুনানি হয়। জরুরি আবেদনে একই দিনেও শুনানি হতে পারে।' },
      { question: 'আগাম জামিনের মেয়াদ কত?', answer: 'সাধারণত ৬ মাস। মেয়াদ শেষে আবার বাড়ানোর আবেদন করতে হয় বা বিচারিক আদালতে নিয়মিত জামিন নিতে হয়।' },
      { question: 'সেশন কোর্ট ও হাইকোর্টের আগাম জামিনে পার্থক্য কী?', answer: 'হাইকোর্টের জামিন আরও শক্তিশালী ও দীর্ঘস্থায়ী। সেশন কোর্টে প্রথমে চেষ্টা করে ব্যর্থ হলে হাইকোর্টে যাওয়া হয়।' },
      { question: 'আগাম জামিনে কি পাসপোর্ট জমা দিতে হয়?', answer: 'অনেক সময় আদালত শর্ত হিসেবে পাসপোর্ট জমা দেওয়ার নির্দেশ দেন। তবে এটি বাধ্যতামূলক নয়।' },
      { question: 'আগাম জামিন বাতিল হলে কী হবে?', answer: 'রাষ্ট্রপক্ষ বা বিরুদ্ধ পক্ষ আগাম জামিন বাতিলের আবেদন করতে পারে। বাতিল হলে গ্রেফতার হতে পারেন।' }
    ],
    featured: false,
    impressions: 49,
    clicks: 6
  }
},

// ============================================================
// ARTICLE 4: বাড়ি ভাড়া আইন ২০২৬
// ============================================================
{
  file: 'bari-vara-ain-varatia-malikar-odhikar-2026.json',
  data: {
    slug: 'bari-vara-ain-varatia-malikar-odhikar-2026',
    category: 'পারিবারিক আইন',
    title: 'বাড়ি ভাড়া আইন ২০২৬: ভাড়াটিয়া ও বাড়িওয়ালার অধিকার ও দায়িত্ব সম্পূর্ণ গাইড',
    metaTitle: 'বাড়ি ভাড়া আইন ২০২৬ | ভাড়াটিয়ার অধিকার ও বাড়িওয়ালার দায়িত্ব বাংলাদেশ',
    metaDescription: 'বাড়ি ভাড়া আইনে ভাড়াটিয়া কি বাড়ি থেকে বের করা যায়? বাড়িওয়ালা হঠাৎ ভাড়া বাড়াতে পারবেন? ভাড়া বৃদ্ধি নোটিশ — সম্পূর্ণ আইনি গাইড ২০২৬।',
    keywords: [
      'বাড়ি ভাড়া আইন ২০২৬',
      'ভাড়াটিয়ার অধিকার বাংলাদেশ',
      'house rent law bangladesh 2026',
      'বাড়িওয়ালা ভাড়া বাড়াতে পারবেন',
      'ভাড়াটিয়া উচ্ছেদ নিয়ম'
    ],
    publishedDate: '2026-09-02',
    lastModified: '2026-09-02',
    readTime: '১৩ মিনিট',
    heroIntro: '<p>বাড়িওয়ালা হঠাৎ বলছেন "আগামী মাসে বাড়ি ছেড়ে দিন" বা মাসের মাঝখানে ভাড়া ৫০% বাড়িয়ে দিলেন? ভাড়াটিয়া হিসেবে আপনার আইনি অধিকার আছে — জানুন কীভাবে নিজেকে রক্ষা করবেন। পরামর্শের জন্য: <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold">অ্যাডভোকেট মোঃ শাহ আলম</a> — <a href="tel:01712655546" style="color:var(--gold);font-weight:bold">📞 01712655546</a></p>',
    quickAnswer: {
      heading: '⚡ বাড়ি ভাড়া আইন — মূল তথ্য',
      points: [
        'বাড়ি ভাড়া নিয়ন্ত্রণ আইন ১৯৯১ অনুযায়ী হঠাৎ উচ্ছেদ অবৈধ',
        'উচ্ছেদের জন্য কমপক্ষে ১ মাসের লিখিত নোটিশ দিতে হবে',
        'ভাড়া অতিরিক্ত বাড়ালে ভাড়া নিয়ন্ত্রণ আদালতে অভিযোগ করুন',
        'ভাড়াটিয়ার অনুমতি ছাড়া ঘরে প্রবেশ বেআইনি',
        'বকেয়া ভাড়া না থাকলে উচ্ছেদ সহজ নয়'
      ]
    },
    toc: [
      'বাংলাদেশের বাড়ি ভাড়া আইন কী?',
      'ভাড়াটিয়ার আইনি অধিকার',
      'বাড়িওয়ালার আইনি অধিকার ও দায়িত্ব',
      'ভাড়া বৃদ্ধির নিয়ম — বাড়িওয়ালা কতটুকু বাড়াতে পারবেন?',
      'ভাড়াটিয়াকে উচ্ছেদ করতে হলে কী করতে হবে?',
      'ভাড়া চুক্তি না থাকলে কী হবে?',
      'ভাড়া সংক্রান্ত বিরোধে কোথায় যাবেন?',
      'আইনজীবীর পরামর্শ'
    ],
    sections: [
      {
        heading: '১. বাংলাদেশের বাড়ি ভাড়া আইন কী?',
        content: `<p>বাংলাদেশে বাড়ি ভাড়া সংক্রান্ত প্রধান আইন হলো <strong>বাড়ি ভাড়া নিয়ন্ত্রণ আইন ১৯৯১</strong> এবং এর অধীনে ভাড়া নিয়ন্ত্রণ আদালত রয়েছে।</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-left:4px solid var(--accent);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:var(--accent);margin:0 0 0.75rem 0">📌 এই আইন কোথায় প্রযোজ্য?</h4>
<ul style="margin:0;padding-left:1.5rem;color:var(--text-secondary);line-height:2">
<li>ঢাকা, চট্টগ্রাম, খুলনা, রাজশাহী সিটি কর্পোরেশন এলাকায়</li>
<li>সব পৌরসভা এলাকায়</li>
<li>সরকার ঘোষিত বিশেষ এলাকায়</li>
<li>গ্রামীণ এলাকায় এই আইন সাধারণত প্রযোজ্য নয়</li>
</ul>
</div>`
      },
      {
        heading: '২. ভাড়াটিয়ার আইনি অধিকার',
        content: `<p>ভাড়াটিয়া হিসেবে আপনার অনেক আইনি সুরক্ষা আছে যা অনেকেই জানেন না।</p>
<div style="display:grid;grid-template-columns:1fr;gap:0.75rem;margin:1.25rem 0">
<div style="background:rgba(40,167,69,0.08);border:1px solid rgba(40,167,69,0.25);border-radius:0.75rem;padding:1rem">
<h4 style="color:#28a745;margin:0 0 0.5rem 0">✅ ভাড়াটিয়ার অধিকার</h4>
<ul style="margin:0;padding-left:1.25rem;color:var(--text-secondary);font-size:0.9rem;line-height:2">
<li><strong>হঠাৎ উচ্ছেদ থেকে সুরক্ষা</strong> — কমপক্ষে ১ মাসের নোটিশ পাওয়ার অধিকার</li>
<li><strong>অনুচিত ভাড়া বৃদ্ধির বিরুদ্ধে আপত্তি</strong> — ভাড়া নিয়ন্ত্রণ আদালতে যাওয়ার অধিকার</li>
<li><strong>প্রয়োজনীয় সুবিধার অধিকার</strong> — পানি, বিদ্যুৎ, গ্যাস বন্ধ করলে মামলা করতে পারবেন</li>
<li><strong>জামানত ফেরত পাওয়ার অধিকার</strong> — বাড়ি ছাড়ার পর সিকিউরিটি ডিপোজিট ফেরত</li>
<li><strong>ঘরে শান্তিপূর্ণ বসবাসের অধিকার</strong> — বাড়িওয়ালা অনুমতি ছাড়া প্রবেশ করতে পারবেন না</li>
</ul>
</div>
</div>`
      },
      {
        heading: '৩. ভাড়া বৃদ্ধির নিয়ম',
        content: `<p>অনেক বাড়িওয়ালা মনে করেন যেকোনো সময় যত খুশি ভাড়া বাড়ানো যায়। কিন্তু আইনে সীমা আছে।</p>
<div style="overflow-x:auto;margin:1.25rem 0">
<table style="width:100%;border-collapse:collapse;font-size:0.95rem">
<thead><tr style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff">
<th style="padding:0.85rem 1rem;text-align:left">বিষয়</th>
<th style="padding:0.85rem 1rem;text-align:left">নিয়ম</th>
</tr></thead>
<tbody>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-weight:600">ভাড়া বাড়ানোর নোটিশ</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">কমপক্ষে ২ মাস আগে লিখিত নোটিশ দিতে হবে</td></tr>
<tr><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-weight:600">একবারে কতটুকু বাড়াতে পারবেন</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">বার্ষিক সর্বোচ্চ ১৫% পর্যন্ত (আইনে নির্ধারিত)</td></tr>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-weight:600">চুক্তিতে ভিন্ন কিছু থাকলে</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">চুক্তি অনুযায়ী চলবে, তবে অতিরিক্ত হলে আপত্তি করা যাবে</td></tr>
<tr><td style="padding:0.85rem 1rem;font-weight:600">অতিরিক্ত ভাড়ার বিরুদ্ধে</td><td style="padding:0.85rem 1rem">ভাড়া নিয়ন্ত্রণ আদালতে অভিযোগ করুন</td></tr>
</tbody>
</table>
</div>`
      },
      {
        heading: '৪. ভাড়াটিয়াকে উচ্ছেদ করতে হলে কী করতে হবে?',
        content: `<p>বাড়িওয়ালা চাইলেই ভাড়াটিয়াকে বের করে দিতে পারবেন না। নির্দিষ্ট আইনি প্রক্রিয়া আছে।</p>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:1.25rem 0">
<div style="background:rgba(220,53,69,0.08);border:1px solid rgba(220,53,69,0.25);border-radius:0.75rem;padding:1rem">
<h4 style="color:#dc3545;margin:0 0 0.75rem 0">❌ এগুলো করা যাবে না</h4>
<ul style="margin:0;padding-left:1.25rem;color:var(--text-secondary);font-size:0.9rem;line-height:1.9">
<li>নোটিশ ছাড়া উচ্ছেদ</li>
<li>পানি-বিদ্যুৎ বন্ধ করা</li>
<li>জিনিসপত্র ঘরে ঢুকে সরিয়ে দেওয়া</li>
<li>শারীরিক হুমকি বা নির্যাতন</li>
</ul>
</div>
<div style="background:rgba(40,167,69,0.08);border:1px solid rgba(40,167,69,0.25);border-radius:0.75rem;padding:1rem">
<h4 style="color:#28a745;margin:0 0 0.75rem 0">✅ সঠিক উপায়</h4>
<ul style="margin:0;padding-left:1.25rem;color:var(--text-secondary);font-size:0.9rem;line-height:1.9">
<li>১ মাসের লিখিত নোটিশ</li>
<li>আলোচনায় সমাধানের চেষ্টা</li>
<li>ভাড়া নিয়ন্ত্রণ আদালতে উচ্ছেদের মামলা</li>
<li>আদালতের আদেশে উচ্ছেদ</li>
</ul>
</div>
</div>`
      },
      {
        heading: '৫. আইনজীবীর পরামর্শ',
        content: `<div style="background:linear-gradient(135deg,rgba(26,63,191,0.08),rgba(198,167,94,0.08));padding:1.5rem;border-radius:1rem;border:1px solid var(--gold);margin:1.5rem 0">
<h3 style="margin:0 0 0.75rem 0;color:var(--text)">⚖️ বাড়ি ভাড়া বিরোধে সহায়তা</h3>
<p style="margin:0 0 1.25rem 0;color:var(--text-secondary);line-height:1.8">বাড়িওয়ালার অন্যায় থেকে নিজেকে রক্ষা করুন। অ্যাডভোকেট মোঃ শাহ আলম আপনার পাশে আছেন।</p>
<div style="display:flex;gap:1rem;flex-wrap:wrap">
<a href="tel:01712655546" style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">📞 কল করুন: 01712655546</a>
<a href="https://wa.me/8801712655546" target="_blank" style="background:#25D366;color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">💬 WhatsApp</a>
</div>
</div>`
      }
    ],
    faqs: [
      { question: 'বাড়িওয়ালা কি মৌখিকভাবে ভাড়া বাড়াতে পারবেন?', answer: 'আইন অনুযায়ী ভাড়া বৃদ্ধি লিখিত নোটিশের মাধ্যমে হতে হবে। শুধু মৌখিক বললে ভাড়াটিয়া মানতে বাধ্য নন।' },
      { question: 'চুক্তি ছাড়া ভাড়া থাকলে কি আইনি সুরক্ষা পাবো?', answer: 'হ্যাঁ, লিখিত চুক্তি না থাকলেও বাড়ি ভাড়া নিয়ন্ত্রণ আইন প্রযোজ্য। তবে লিখিত চুক্তি থাকা সবসময় ভালো।' },
      { question: 'বাড়িওয়ালা পানি-বিদ্যুৎ বন্ধ করলে কী করব?', answer: 'এটি আইন লঙ্ঘন। সরাসরি থানায় সাধারণ ডায়েরি (GD) করুন এবং ভাড়া নিয়ন্ত্রণ আদালতে অভিযোগ করুন।' },
      { question: 'সিকিউরিটি ডিপোজিট না ফেরালে কী করব?', answer: 'বাড়ি ছাড়ার সময় লিখিত নোটিশ দিন। না ফেরালে দেওয়ানি আদালতে অর্থ আদায়ের মামলা করুন।' },
      { question: 'ভাড়া নিয়ন্ত্রণ আদালত কোথায়?', answer: 'ঢাকা, চট্টগ্রাম, খুলনা, রাজশাহীসহ প্রধান শহরে ভাড়া নিয়ন্ত্রণ আদালত আছে। জেলা আদালতেও এই মামলা করা যায়।' }
    ],
    featured: false,
    impressions: 18,
    clicks: 3
  }
},

// ============================================================
// ARTICLE 5: ওয়ারিশ সনদ কীভাবে পাবেন ২০২৬
// ============================================================
{
  file: 'warish-sanad-kibhabe-paben-2026-complete.json',
  data: {
    slug: 'warish-sanad-kibhabe-paben-2026-complete',
    category: 'সম্পত্তি আইন',
    title: 'ওয়ারিশ সনদ কীভাবে পাবেন? কোথায় আবেদন করবেন ও কী কাগজ লাগবে — সম্পূর্ণ গাইড ২০২৬',
    metaTitle: 'ওয়ারিশ সনদ পাওয়ার নিয়ম ২০২৬ | ওয়ারিশ সনদ আবেদন প্রক্রিয়া বাংলাদেশ',
    metaDescription: 'ওয়ারিশ সনদ কোথায় পাবেন? কী কাগজ লাগে? কতদিনে পাবেন? ইউনিয়ন পরিষদ ও পৌরসভায় আবেদনের সম্পূর্ণ প্রক্রিয়া বাংলায় ২০২৬।',
    keywords: [
      'ওয়ারিশ সনদ পাওয়ার নিয়ম',
      'warish sanad bangladesh 2026',
      'উত্তরাধিকার সনদ',
      'ওয়ারিশ সনদ আবেদন',
      'waris certificate bangladesh'
    ],
    publishedDate: '2026-09-02',
    lastModified: '2026-09-02',
    readTime: '১০ মিনিট',
    heroIntro: '<p>বাবা বা মায়ের মৃত্যুর পর সম্পত্তির নামজারি, ব্যাংক একাউন্ট পরিচালনা বা পেনশন পেতে ওয়ারিশ সনদ অপরিহার্য। কোথায় যাবেন, কী কাগজ লাগবে, কতদিনে পাবেন — সব জানুন এই আর্টিকেলে। পরামর্শের জন্য: <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold">অ্যাডভোকেট মোঃ শাহ আলম</a> — <a href="tel:01712655546" style="color:var(--gold);font-weight:bold">📞 01712655546</a></p>',
    quickAnswer: {
      heading: '⚡ ওয়ারিশ সনদ — মূল তথ্য',
      points: [
        'গ্রামে: ইউনিয়ন পরিষদের চেয়ারম্যানের কাছে আবেদন',
        'শহরে: পৌরসভা বা সিটি কর্পোরেশনে আবেদন',
        'সময়: ৭-১৫ দিনের মধ্যে পাওয়া যায়',
        'ফি: বিনামূল্যে বা সামান্য ফি (সর্বোচ্চ ৩০০ টাকা)',
        'অনলাইনেও আবেদন করা যায় কিছু এলাকায়'
      ]
    },
    toc: [
      'ওয়ারিশ সনদ কেন দরকার?',
      'কোথায় আবেদন করবেন?',
      'কী কী কাগজপত্র লাগবে?',
      'আবেদনের ধাপসমূহ',
      'কতদিনে ওয়ারিশ সনদ পাবেন?',
      'ওয়ারিশ সনদে কোনো ওয়ারিশের নাম বাদ দিলে কী করবেন?',
      'আইনজীবীর সহায়তা'
    ],
    sections: [
      {
        heading: '১. ওয়ারিশ সনদ কেন দরকার?',
        content: `<p>ওয়ারিশ সনদ (বা উত্তরাধিকার সনদ) হলো মৃত ব্যক্তির সকল ওয়ারিশের (উত্তরাধিকারীর) তালিকা সংবলিত সরকারি প্রমাণপত্র।</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:var(--accent);margin:0 0 0.75rem 0">📋 যেসব কাজে ওয়ারিশ সনদ লাগে</h4>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem">
<div style="background:rgba(26,63,191,0.06);border-radius:0.5rem;padding:0.75rem;font-size:0.9rem;color:var(--text-secondary)">🏠 জমির নামজারি (মিউটেশন)</div>
<div style="background:rgba(26,63,191,0.06);border-radius:0.5rem;padding:0.75rem;font-size:0.9rem;color:var(--text-secondary)">🏦 ব্যাংক একাউন্ট পরিচালনা</div>
<div style="background:rgba(26,63,191,0.06);border-radius:0.5rem;padding:0.75rem;font-size:0.9rem;color:var(--text-secondary)">💰 পেনশন বা ভাতা পাওয়া</div>
<div style="background:rgba(26,63,191,0.06);border-radius:0.5rem;padding:0.75rem;font-size:0.9rem;color:var(--text-secondary)">📑 বীমার দাবি করা</div>
<div style="background:rgba(26,63,191,0.06);border-radius:0.5rem;padding:0.75rem;font-size:0.9rem;color:var(--text-secondary)">🏢 সম্পত্তি বিক্রি বা হস্তান্তর</div>
<div style="background:rgba(26,63,191,0.06);border-radius:0.5rem;padding:0.75rem;font-size:0.9rem;color:var(--text-secondary)">⚖️ উত্তরাধিকার মামলায় প্রমাণ</div>
</div>
</div>`
      },
      {
        heading: '২. কোথায় আবেদন করবেন?',
        content: `<p>আবেদনের জায়গা নির্ভর করে মৃত ব্যক্তির বাসস্থান কোথায় ছিল তার উপর।</p>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:1.25rem 0">
<div style="background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1.25rem">
<h4 style="color:var(--accent);margin:0 0 0.75rem 0">🌾 গ্রামীণ এলাকায়</h4>
<ul style="margin:0;padding-left:1.25rem;color:var(--text-secondary);font-size:0.9rem;line-height:1.9">
<li>ইউনিয়ন পরিষদ চেয়ারম্যান বরাবর আবেদন</li>
<li>স্থানীয় সদস্যের সুপারিশ লাগে</li>
</ul>
</div>
<div style="background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1.25rem">
<h4 style="color:var(--gold);margin:0 0 0.75rem 0">🏙️ শহরে</h4>
<ul style="margin:0;padding-left:1.25rem;color:var(--text-secondary);font-size:0.9rem;line-height:1.9">
<li>পৌরসভা বা সিটি কর্পোরেশনে আবেদন</li>
<li>সংশ্লিষ্ট ওয়ার্ড কাউন্সিলরের সুপারিশ</li>
</ul>
</div>
</div>`
      },
      {
        heading: '৩. কী কী কাগজপত্র লাগবে?',
        content: `<div style="background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:var(--accent);margin:0 0 1rem 0">📎 প্রয়োজনীয় কাগজ</h4>
<ul style="margin:0;padding-left:1.5rem;color:var(--text-secondary);line-height:2.2">
<li>আবেদনকারীর NID কার্ড (মূল ও কপি)</li>
<li>মৃত ব্যক্তির মৃত্যু সনদ (Death Certificate)</li>
<li>সকল ওয়ারিশের নাম, সম্পর্ক ও NID নম্বর</li>
<li>মৃত ব্যক্তির জন্ম সনদ বা কাবিননামা (বিবাহিত হলে)</li>
<li>সরকারি নির্ধারিত আবেদন ফরম</li>
<li>পাসপোর্ট সাইজ ছবি (আবেদনকারীর)</li>
</ul>
</div>
<div style="background:rgba(198,167,94,0.1);border:1px solid var(--gold);border-radius:0.75rem;padding:1rem;margin:1rem 0">
<p style="margin:0"><strong>💡 টিপস:</strong> মৃত্যু সনদ না থাকলে প্রথমে সিটি কর্পোরেশন বা ইউনিয়ন পরিষদ থেকে মৃত্যু সনদ সংগ্রহ করুন।</p>
</div>`
      },
      {
        heading: '৪. আইনজীবীর সহায়তা',
        content: `<div style="background:linear-gradient(135deg,rgba(26,63,191,0.08),rgba(198,167,94,0.08));padding:1.5rem;border-radius:1rem;border:1px solid var(--gold);margin:1.5rem 0">
<h3 style="margin:0 0 0.75rem 0;color:var(--text)">⚖️ উত্তরাধিকার বিষয়ে সহায়তা</h3>
<p style="margin:0 0 1.25rem 0;color:var(--text-secondary);line-height:1.8">ওয়ারিশ সনদে সমস্যা বা সম্পত্তি বণ্টনে বিরোধ হলে যোগাযোগ করুন।</p>
<div style="display:flex;gap:1rem;flex-wrap:wrap">
<a href="tel:01712655546" style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">📞 কল করুন: 01712655546</a>
<a href="https://wa.me/8801712655546" target="_blank" style="background:#25D366;color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">💬 WhatsApp</a>
</div>
</div>`
      }
    ],
    faqs: [
      { question: 'ওয়ারিশ সনদ পেতে কতদিন লাগে?', answer: 'সাধারণত ৭-১৫ কার্যদিবস। তবে কিছু ক্ষেত্রে ১ মাসও লাগতে পারে।' },
      { question: 'ওয়ারিশ সনদের ফি কত?', answer: 'সরকারিভাবে বিনামূল্যে বা সামান্য ফি (সর্বোচ্চ ৩০০ টাকা)। তবে কিছু জায়গায় অনানুষ্ঠানিক ফি নেওয়া হয়।' },
      { question: 'ওয়ারিশ সনদে কারো নাম বাদ দিলে কী করব?', answer: 'চেয়ারম্যান বা পৌরসভায় আপত্তি দাখিল করুন। সমাধান না হলে ওয়ারিশ সনদ সংশোধনের জন্য দেওয়ানি আদালতে মামলা করুন।' },
      { question: 'বিদেশে থাকা ওয়ারিশ কি সনদে নাম রাখতে হবে?', answer: 'হ্যাঁ, সব জীবিত ওয়ারিশের নাম থাকতে হবে — তারা দেশে থাকুন বা বিদেশে।' },
      { question: 'অনলাইনে ওয়ারিশ সনদের আবেদন করা যায়?', answer: 'কিছু এলাকায় janmo-nibondhon.gov.bd বা সিটি কর্পোরেশনের পোর্টালে অনলাইন আবেদন করা যায়।' }
    ],
    featured: false,
    impressions: 89,
    clicks: 4
  }
}

];

let successCount = 0;
for (const article of articles) {
  const filePath = path.join(bnDir, article.file);
  fs.writeFileSync(filePath, JSON.stringify(article.data, null, 2), 'utf8');
  console.log(`✅ Created: ${article.file}`);
  successCount++;
}
console.log(`\n🎉 Batch 8A: Created ${successCount}/${articles.length} articles`);
