const fs = require('fs');
const path = require('path');

const bnDir = path.join(__dirname, '..', 'src', 'content', 'posts', 'bn');

const articles = [

// ============================================================
// ARTICLE 8: বাটোয়ারা মামলা কত দিনে শেষ হয় ও খরচ ২০২৬
// ============================================================
{
  file: 'batwara-mamla-din-khoroch-prokriya-2026.json',
  data: {
    slug: 'batwara-mamla-din-khoroch-prokriya-2026',
    category: 'ভূমি আইন',
    title: 'বাটোয়ারা মামলা কত দিনে শেষ হয়? খরচ ও সম্পূর্ণ প্রক্রিয়া ২০২৬',
    metaTitle: 'বাটোয়ারা মামলার খরচ ও সময় ২০২৬ | জমি ভাগের মামলার সম্পূর্ণ গাইড',
    metaDescription: 'বাটোয়ারা মামলা কতদিন চলে? কোর্ট ফি কত? আইনজীবী ফি? কীভাবে মামলা করবেন? সম্পূর্ণ গাইড ও বাস্তব খরচের তালিকা ২০২৬।',
    keywords: [
      'বাটোয়ারা মামলা কতদিন চলে',
      'বাটোয়ারা মামলার খরচ',
      'batwara mamla bangladesh',
      'বাটোয়ারা মামলা কোর্ট ফি',
      'জমি ভাগের মামলা'
    ],
    publishedDate: '2026-09-01',
    lastModified: '2026-09-01',
    readTime: '১৩ মিনিট',
    heroIntro: '<p>বাবার মৃত্যুর পর সম্পত্তি নিয়ে ভাই-ভাইতে বিরোধ? বোন ভাগ পাচ্ছে না? অথবা যৌথ সম্পত্তি আলাদা করতে চাইছেন? এই পরিস্থিতিতে বাটোয়ারা মামলাই একমাত্র আইনি পথ। কিন্তু কতদিন লাগবে আর কত খরচ হবে সেটা আগে জানুন। পরামর্শের জন্য: <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold">অ্যাডভোকেট মোঃ শাহ আলম</a> — <a href="tel:01712655546" style="color:var(--gold);font-weight:bold">📞 01712655546</a></p>',
    quickAnswer: {
      heading: '⚡ বাটোয়ারা মামলা — মূল তথ্য',
      points: [
        'মামলার সময়: সাধারণত ২-৫ বছর (মামলার জটিলতা অনুযায়ী)',
        'কোর্ট ফি: সম্পত্তির মূল্যের ১.৫-৩% (ad valorem)',
        'আইনজীবী ফি: ১৫,০০০ – ১,০০,০০০+ টাকা',
        'মামলা করার জায়গা: দেওয়ানি আদালত (সাব-জজ কোর্ট)',
        'বিকল্প: পরিবারের মধ্যে দলিল করে আলোচনায় ভাগ করুন'
      ]
    },
    toc: [
      'বাটোয়ারা মামলা কী এবং কখন দরকার?',
      'বাটোয়ারা মামলার খরচের সম্পূর্ণ তালিকা',
      'কোর্ট ফি কীভাবে হিসাব করবেন?',
      'বাটোয়ারা মামলা কতদিনে শেষ হয়?',
      'বাটোয়ারা মামলার ধাপসমূহ',
      'মামলা না করে কীভাবে জমি ভাগ করবেন?',
      'বাটোয়ারা মামলায় সতর্কতা',
      'আইনজীবীর পরামর্শ'
    ],
    sections: [
      {
        heading: '১. বাটোয়ারা মামলা কী এবং কখন দরকার?',
        content: `<p>বাটোয়ারা মামলা (Partition Suit) হলো যৌথ সম্পত্তি আলাদাভাবে ভাগ করার জন্য দেওয়ানি আদালতে দায়ের করা মামলা।</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-left:4px solid var(--accent);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:var(--accent);margin:0 0 0.75rem 0">📌 কখন বাটোয়ারা মামলা করতে হয়?</h4>
<ul style="margin:0;padding-left:1.5rem;color:var(--text-secondary);line-height:2">
<li>বাবা/মায়ের মৃত্যুর পর ভাই-বোনের মধ্যে সম্পত্তি ভাগে বিরোধ</li>
<li>যৌথ পরিবারে সম্পত্তি আলাদা করতে চাইলে</li>
<li>কেউ অন্যের ভাগের সম্পত্তিতে দখল করলে</li>
<li>কোনো ওয়ারিশ বঞ্চিত হলে</li>
<li>একাধিক ওয়ারিশের মধ্যে সম্পত্তি বণ্টনে সম্মতি না হলে</li>
</ul>
</div>`
      },
      {
        heading: '২. বাটোয়ারা মামলার খরচের সম্পূর্ণ তালিকা',
        content: `<p>বাটোয়ারা মামলায় সবচেয়ে বড় খরচ হলো কোর্ট ফি — এটি সম্পত্তির মূল্যের উপর নির্ভর করে।</p>
<div style="overflow-x:auto;margin:1.25rem 0">
<table style="width:100%;border-collapse:collapse;font-size:0.95rem">
<thead><tr style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff">
<th style="padding:0.85rem 1rem;text-align:left">খরচের খাত</th>
<th style="padding:0.85rem 1rem;text-align:center">পরিমাণ</th>
<th style="padding:0.85rem 1rem;text-align:left">মন্তব্য</th>
</tr></thead>
<tbody>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">কোর্ট ফি (আদ ভ্যালোরেম)</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center;font-weight:600;color:var(--accent)">সম্পত্তির ১.৫-৩%</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-size:0.85rem">দাবিকৃত অংশের মূল্যের উপর</td></tr>
<tr><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">আইনজীবী ফি</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center;font-weight:600;color:var(--accent)">১৫,০০০ – ১,০০,০০০+ টাকা</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-size:0.85rem">মামলার জটিলতা ও সময় অনুযায়ী</td></tr>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">সার্ভেয়ার ফি</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center;font-weight:600;color:var(--accent)">৫,০০০ – ২০,০০০ টাকা</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-size:0.85rem">আদালত নিযুক্ত সার্ভেয়ার</td></tr>
<tr><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">প্রসেস ফি</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center;font-weight:600;color:var(--accent)">৫০০ – ৩,০০০ টাকা</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-size:0.85rem">আসামিদের নোটিশ পাঠানোর খরচ</td></tr>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">নকল-নবিশ ফি</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center;font-weight:600;color:var(--accent)">৫০০ – ২,০০০ টাকা</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-size:0.85rem">আদালতের কাগজপত্রের কপি</td></tr>
<tr><td style="padding:0.85rem 1rem">যাতায়াত ও আনুষঙ্গিক</td><td style="padding:0.85rem 1rem;text-align:center;font-weight:600;color:var(--accent)">৫,০০০ – ২০,০০০ টাকা</td><td style="padding:0.85rem 1rem;font-size:0.85rem">তারিখ অনুযায়ী পরিবর্তনশীল</td></tr>
</tbody>
</table>
</div>`
      },
      {
        heading: '৩. কোর্ট ফি কীভাবে হিসাব করবেন?',
        content: `<p>বাটোয়ারা মামলায় কোর্ট ফি সবচেয়ে বেশি হয়। চলুন একটি উদাহরণ দিয়ে বুঝি।</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:var(--accent);margin:0 0 1rem 0">📊 উদাহরণ হিসাব</h4>
<p style="color:var(--text-secondary)"><strong>পরিস্থিতি:</strong> ৩ ভাই ও ১ বোন — বাবার ১ কোটি টাকার জমি ভাগ করতে চান। আপনি ১/৪ অংশ (২৫ লক্ষ) দাবি করছেন।</p>
<ul style="margin:0.75rem 0;padding-left:1.5rem;color:var(--text-secondary);line-height:2">
<li>দাবিকৃত সম্পত্তির মূল্য: ২৫ লক্ষ টাকা</li>
<li>কোর্ট ফি (২%): <strong>৫০,০০০ টাকা</strong></li>
<li>আইনজীবী ফি: ২০,০০০ – ৫০,০০০ টাকা</li>
<li>অন্যান্য: প্রায় ১০,০০০ – ২৫,০০০ টাকা</li>
<li><strong>মোট আনুমানিক: ৮০,০০০ – ১,২৫,০০০ টাকা</strong></li>
</ul>
</div>
<div style="background:rgba(198,167,94,0.1);border:1px solid var(--gold);border-radius:0.75rem;padding:1rem;margin:1rem 0">
<p style="margin:0"><strong>💡 টিপস:</strong> সম্পত্তির মূল্য বেশি হলে কোর্ট ফি অনেক বেড়ে যায়। তাই মামলার আগে পারিবারিক সমঝোতার চেষ্টা করুন।</p>
</div>`
      },
      {
        heading: '৪. বাটোয়ারা মামলা কতদিনে শেষ হয়?',
        content: `<p>এটি সবচেয়ে জিজ্ঞাসিত প্রশ্ন। সত্যি কথা হলো — বাটোয়ারা মামলা কতদিন চলবে তা নির্ভর করে মামলার জটিলতা ও সম্পত্তির পরিস্থিতির উপর।</p>
<div style="overflow-x:auto;margin:1.25rem 0">
<table style="width:100%;border-collapse:collapse;font-size:0.95rem">
<thead><tr style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff">
<th style="padding:0.85rem 1rem;text-align:left">পরিস্থিতি</th>
<th style="padding:0.85rem 1rem;text-align:center">আনুমানিক সময়</th>
</tr></thead>
<tbody>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">সহজ মামলা (সবাই রাজি, শুধু ভাগ করা)</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center;font-weight:600">১-২ বছর</td></tr>
<tr><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">মাঝারি জটিলতা (কিছু বিবাদ আছে)</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center;font-weight:600">২-৪ বছর</td></tr>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">জটিল মামলা (মিথ্যা দলিল, একাধিক পক্ষ)</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center;font-weight:600">৫-১০ বছর</td></tr>
<tr><td style="padding:0.85rem 1rem">আপিল হলে</td><td style="padding:0.85rem 1rem;text-align:center;font-weight:600">আরও ৩-৫ বছর</td></tr>
</tbody>
</table>
</div>`
      },
      {
        heading: '৫. মামলা না করে কীভাবে জমি ভাগ করবেন?',
        content: `<p>যদি সম্ভব হয়, মামলার বাইরে পারিবারিক সমঝোতায় জমি ভাগ করুন। এটি সময় ও অর্থ উভয়ই সাশ্রয়ী।</p>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:1.25rem 0">
<div style="background:rgba(40,167,69,0.08);border:1px solid rgba(40,167,69,0.25);border-radius:0.75rem;padding:1rem">
<h4 style="color:#28a745;margin:0 0 0.75rem 0">✅ মামলার বাইরে ভাগ</h4>
<ul style="margin:0;padding-left:1.25rem;color:var(--text-secondary);font-size:0.9rem;line-height:1.9">
<li>সমস্ত ওয়ারিশ একমত হন</li>
<li>আইনজীবীর মাধ্যমে বাটোয়ারা দলিল তৈরি করুন</li>
<li>সাব-রেজিস্ট্রি অফিসে রেজিস্ট্রি করুন</li>
<li>নামজারি করান</li>
</ul>
</div>
<div style="background:rgba(220,53,69,0.08);border:1px solid rgba(220,53,69,0.25);border-radius:0.75rem;padding:1rem">
<h4 style="color:#dc3545;margin:0 0 0.75rem 0">❌ মামলার সমস্যা</h4>
<ul style="margin:0;padding-left:1.25rem;color:var(--text-secondary);font-size:0.9rem;line-height:1.9">
<li>দীর্ঘ সময় ও বেশি খরচ</li>
<li>পারিবারিক সম্পর্ক নষ্ট হওয়ার ঝুঁকি</li>
<li>মামলা চলাকালীন সম্পত্তি ব্যবহারে সমস্যা</li>
<li>আপিলে আরও বেশি সময় লাগে</li>
</ul>
</div>
</div>`
      },
      {
        heading: '৬. আইনজীবীর পরামর্শ',
        content: `<div style="background:linear-gradient(135deg,rgba(26,63,191,0.08),rgba(198,167,94,0.08));padding:1.5rem;border-radius:1rem;border:1px solid var(--gold);margin:1.5rem 0">
<h3 style="margin:0 0 0.75rem 0;color:var(--text)">⚖️ সম্পত্তি বিরোধে সহায়তা</h3>
<p style="margin:0 0 1.25rem 0;color:var(--text-secondary);line-height:1.8">বাটোয়ারা মামলায় অভিজ্ঞ আইনজীবীর সাহায্য ছাড়া এগোনো কঠিন। অ্যাডভোকেট মোঃ শাহ আলমের সাথে যোগাযোগ করুন।</p>
<div style="display:flex;gap:1rem;flex-wrap:wrap">
<a href="tel:01712655546" style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">📞 কল করুন: 01712655546</a>
<a href="https://wa.me/8801712655546" target="_blank" style="background:#25D366;color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">💬 WhatsApp</a>
</div>
</div>`
      }
    ],
    faqs: [
      { question: 'বাটোয়ারা মামলায় কোর্ট ফি কত?', answer: 'দাবিকৃত সম্পত্তির মূল্যের উপর আদ ভ্যালোরেম হারে কোর্ট ফি দিতে হয়, সাধারণত ১.৫-৩%। উদাহরণ: ২৫ লক্ষ টাকার দাবিতে প্রায় ৫০,০০০ টাকা কোর্ট ফি।' },
      { question: 'বাটোয়ারা মামলা কতদিন চলে?', answer: 'সাধারণত ২-৫ বছর। তবে জটিল মামলায় আরও বেশি সময় লাগতে পারে।' },
      { question: 'বাটোয়ারা মামলায় কি সব ওয়ারিশকে মামলার পক্ষ করতে হবে?', answer: 'হ্যাঁ, সব ওয়ারিশকে মামলার বাদী বা বিবাদী হিসেবে অন্তর্ভুক্ত করতে হবে। কাউকে বাদ দিলে মামলা খারিজ হতে পারে।' },
      { question: 'বাটোয়ারা দলিল ছাড়া কি জমি ভাগ করা যায়?', answer: 'না, আইনগতভাবে বাটোয়ারা দলিল বা আদালতের আদেশ ছাড়া জমি ভাগ করলে পরে সমস্যা হবে। রেজিস্টার্ড বাটোয়ারা দলিল আবশ্যক।' },
      { question: 'মামলা না করেও কি জমি ভাগ করা যায়?', answer: 'হ্যাঁ। সব ওয়ারিশ একমত হলে আইনজীবীর মাধ্যমে রেজিস্টার্ড বাটোয়ারা দলিল করে জমি ভাগ করা যায় — এটি সময় ও অর্থ সাশ্রয়ী।' }
    ],
    featured: false,
    impressions: 68,
    clicks: 2
  }
},

// ============================================================
// ARTICLE 9: হেবা বিল এওয়াজ দলিল কি ও বাতিল নিয়ম ২০২৬
// ============================================================
{
  file: 'heba-bil-ewaz-dalil-ki-batil-niyom-2026.json',
  data: {
    slug: 'heba-bil-ewaz-dalil-ki-batil-niyom-2026',
    category: 'ভূমি আইন',
    title: 'হেবা বিল এওয়াজ দলিল কি? কম খরচে জমি দান করার আইনি উপায় ২০২৬',
    metaTitle: 'হেবা বিল এওয়াজ দলিল কি ২০২৬ | কম খরচে সম্পত্তি হস্তান্তরের নিয়ম',
    metaDescription: 'হেবা বিল এওয়াজ দলিল কি? সাধারণ হেবার সাথে পার্থক্য কি? কম খরচে জমি দান করার এই আইনি পদ্ধতি সম্পর্কে বিস্তারিত জানুন ২০২৬।',
    keywords: [
      'হেবা বিল এওয়াজ দলিল কি',
      'heba bil ewaz bangladesh',
      'হেবা দলিল বাংলাদেশ',
      'হেবা বিল এওয়াজ কম খরচ',
      'সম্পত্তি দান দলিল বাংলাদেশ'
    ],
    publishedDate: '2026-09-01',
    lastModified: '2026-09-01',
    readTime: '১২ মিনিট',
    heroIntro: '<p>আপনি কি সন্তানকে জমি দিতে চান, কিন্তু রেজিস্ট্রি খরচ শুনে মাথা ঘুরছে? হেবা বিল এওয়াজ দলিল হলো এই সমস্যার সমাধান — এটি সাধারণ বিক্রয় দলিলের চেয়ে অনেক কম খরচে জমি হস্তান্তরের আইনি পদ্ধতি। কিন্তু সব ক্ষেত্রে সমান প্রযোজ্য নয়। বিস্তারিত জানতে: <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold">অ্যাডভোকেট মোঃ শাহ আলম</a> — <a href="tel:01712655546" style="color:var(--gold);font-weight:bold">📞 01712655546</a></p>',
    quickAnswer: {
      heading: '⚡ হেবা বিল এওয়াজ — সংক্ষিপ্ত উত্তর',
      points: [
        'হেবা = বিনামূল্যে দান (Gift)',
        'হেবা বিল এওয়াজ = প্রতীকী বিনিময়ে দান (Gift with Consideration)',
        'স্ট্যাম্প ডিউটি: মাত্র ০.৫% (সাফ কবলায় ১.৫-৩%)',
        'শুধু নিকট আত্মীয়দের মধ্যে করা যায়',
        'রক্তের সম্পর্ক নেই এমন কাউকে হেবা বিল এওয়াজে দেওয়া ঝুঁকিপূর্ণ'
      ]
    },
    toc: [
      'হেবা দলিল কি?',
      'হেবা বিল এওয়াজ কি এবং এটি কীভাবে আলাদা?',
      'হেবা বিল এওয়াজের সুবিধা',
      'কতটুকু খরচ কম হয়? তুলনামূলক হিসাব',
      'হেবা বিল এওয়াজ কে করতে পারবেন?',
      'হেবা দলিল বাতিল করা কি সম্ভব?',
      'কোন পরিস্থিতিতে হেবা না করে সাফ কবলা করা উচিত?',
      'আইনজীবীর পরামর্শ'
    ],
    sections: [
      {
        heading: '১. হেবা দলিল কি?',
        content: `<p>হেবা (Heba) শব্দটি আরবি — অর্থ "দান"। মুসলিম আইনে হেবা হলো কোনো সম্পত্তি বিনামূল্যে কাউকে দান করার আইনি পদ্ধতি।</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-left:4px solid var(--accent);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:var(--accent);margin:0 0 0.75rem 0">📌 হেবার ৩টি শর্ত (মুসলিম আইন অনুযায়ী)</h4>
<ul style="margin:0;padding-left:1.5rem;color:var(--text-secondary);line-height:2">
<li><strong>ইজাব:</strong> দাতা স্পষ্টভাবে দানের ঘোষণা দেবেন</li>
<li><strong>কবুল:</strong> গ্রহীতা সম্মতি দেবেন</li>
<li><strong>দখল হস্তান্তর:</strong> সম্পত্তির দখল বুঝিয়ে দিতে হবে</li>
</ul>
</div>`
      },
      {
        heading: '২. হেবা বিল এওয়াজ কি এবং এটি কীভাবে আলাদা?',
        content: `<p>হেবা বিল এওয়াজ (Heba Bil Ewaz) মানে "বিনিময়ে দান" — অর্থাৎ প্রতীকীভাবে কিছু একটার বিনিময়ে সম্পত্তি দান করা।</p>
<div style="overflow-x:auto;margin:1.25rem 0">
<table style="width:100%;border-collapse:collapse;font-size:0.95rem">
<thead><tr style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff">
<th style="padding:0.85rem 1rem;text-align:left">বিষয়</th>
<th style="padding:0.85rem 1rem;text-align:left">সাধারণ হেবা</th>
<th style="padding:0.85rem 1rem;text-align:left">হেবা বিল এওয়াজ</th>
</tr></thead>
<tbody>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-weight:600">মূল পার্থক্য</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">বিনামূল্যে দান</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">প্রতীকী বিনিময়ে দান</td></tr>
<tr><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-weight:600">বাতিল করা যায়?</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">হ্যাঁ, কিছু ক্ষেত্রে</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">না, সাধারণত বাতিল করা যায় না</td></tr>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-weight:600">স্ট্যাম্প ডিউটি</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">০.৫%</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">০.৫%</td></tr>
<tr><td style="padding:0.85rem 1rem;font-weight:600">আইনি সুরক্ষা</td><td style="padding:0.85rem 1rem">কম</td><td style="padding:0.85rem 1rem">বেশি শক্তিশালী</td></tr>
</tbody>
</table>
</div>
<div style="background:rgba(198,167,94,0.1);border:1px solid var(--gold);border-radius:0.75rem;padding:1rem;margin:1rem 0">
<p style="margin:0"><strong>💡 উদাহরণ:</strong> বাবা ছেলেকে জমি দিচ্ছেন "১০ টাকা এওয়াজে" (বিনিময়ে)। এই প্রতীকী ১০ টাকাই হেবা বিল এওয়াজকে সাধারণ হেবার চেয়ে আইনগতভাবে শক্তিশালী করে।</p>
</div>`
      },
      {
        heading: '৩. কতটুকু খরচ কম হয়? তুলনামূলক হিসাব',
        content: `<p>এটিই সবচেয়ে গুরুত্বপূর্ণ প্রশ্ন। চলুন ৩০ লক্ষ টাকার জমির জন্য তুলনা করি।</p>
<div style="overflow-x:auto;margin:1.25rem 0">
<table style="width:100%;border-collapse:collapse;font-size:0.95rem">
<thead><tr style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff">
<th style="padding:0.85rem 1rem;text-align:left">খরচের খাত</th>
<th style="padding:0.85rem 1rem;text-align:center">সাফ কবলায়</th>
<th style="padding:0.85rem 1rem;text-align:center">হেবা বিল এওয়াজে</th>
</tr></thead>
<tbody>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">স্ট্যাম্প ডিউটি</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center;font-weight:600;color:#dc3545">৯০,০০০ (৩%)</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center;font-weight:600;color:#28a745">১৫,০০০ (০.৫%)</td></tr>
<tr><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">রেজিস্ট্রেশন ফি</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center">৩০,০০০ (১%)</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center">৩,০০০ (০.১%)</td></tr>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">গেইন ট্যাক্স</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center">৬০,০০০ (২%)</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center">প্রযোজ্য নয়</td></tr>
<tr><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">স্থানীয় কর</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center">৯০,০০০ (৩%)</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center">প্রযোজ্য নয় বা কম</td></tr>
</tbody>
<tfoot><tr style="background:linear-gradient(135deg,rgba(26,63,191,0.1),rgba(198,167,94,0.1))">
<td style="padding:1rem;font-weight:700">মোট আনুমানিক</td>
<td style="padding:1rem;text-align:center;font-weight:700;color:#dc3545">২,৭০,০০০ টাকা</td>
<td style="padding:1rem;text-align:center;font-weight:700;color:#28a745">১৮,০০০ টাকা</td>
</tr></tfoot>
</table>
</div>
<p><strong>সাশ্রয়: প্রায় ২,৫২,০০০ টাকা!</strong> এই বিশাল পার্থক্যের জন্যই পরিবারের মধ্যে সম্পত্তি দানে হেবা বিল এওয়াজ জনপ্রিয়।</p>`
      },
      {
        heading: '৪. হেবা দলিল বাতিল করা কি সম্ভব?',
        content: `<p>এটি একটি গুরুত্বপূর্ণ প্রশ্ন। অনেকে পরে হেবা দলিল বাতিল করতে চান — কিন্তু এটি সহজ নয়।</p>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:1.25rem 0">
<div style="background:rgba(40,167,69,0.08);border:1px solid rgba(40,167,69,0.25);border-radius:0.75rem;padding:1rem">
<h4 style="color:#28a745;margin:0 0 0.75rem 0">✅ বাতিল করা যায় যখন</h4>
<ul style="margin:0;padding-left:1.25rem;color:var(--text-secondary);font-size:0.9rem;line-height:1.9">
<li>সাধারণ হেবায়: কিছু ক্ষেত্রে বাতিলযোগ্য</li>
<li>প্রতারণায় করা হলে</li>
<li>জোরপূর্বক স্বাক্ষর নেওয়া হলে</li>
<li>দাতা মানসিকভাবে অক্ষম থাকলে</li>
</ul>
</div>
<div style="background:rgba(220,53,69,0.08);border:1px solid rgba(220,53,69,0.25);border-radius:0.75rem;padding:1rem">
<h4 style="color:#dc3545;margin:0 0 0.75rem 0">❌ বাতিল করা কঠিন যখন</h4>
<ul style="margin:0;padding-left:1.25rem;color:var(--text-secondary);font-size:0.9rem;line-height:1.9">
<li>হেবা বিল এওয়াজ হলে (বিনিময়ে)</li>
<li>গ্রহীতা সম্পত্তি বিক্রি করে দিলে</li>
<li>স্বামী থেকে স্ত্রীর দিকে বা বিপরীত</li>
<li>দলিল রেজিস্ট্রি হয়ে গেলে</li>
</ul>
</div>
</div>`
      },
      {
        heading: '৫. আইনজীবীর পরামর্শ',
        content: `<div style="background:linear-gradient(135deg,rgba(26,63,191,0.08),rgba(198,167,94,0.08));padding:1.5rem;border-radius:1rem;border:1px solid var(--gold);margin:1.5rem 0">
<h3 style="margin:0 0 0.75rem 0;color:var(--text)">⚖️ হেবা দলিল তৈরিতে সহায়তা</h3>
<p style="margin:0 0 1.25rem 0;color:var(--text-secondary);line-height:1.8">হেবা বিল এওয়াজ দলিল সঠিকভাবে তৈরি না করলে পরে বিপদ হতে পারে। অ্যাডভোকেট মোঃ শাহ আলমের সাথে যোগাযোগ করুন।</p>
<div style="display:flex;gap:1rem;flex-wrap:wrap">
<a href="tel:01712655546" style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">📞 কল করুন: 01712655546</a>
<a href="https://wa.me/8801712655546" target="_blank" style="background:#25D366;color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">💬 WhatsApp</a>
</div>
</div>`
      }
    ],
    faqs: [
      { question: 'হেবা বিল এওয়াজ দলিল কি শুধু মুসলিমদের জন্য?', answer: 'মূলত হ্যাঁ। হেবা ইসলামি আইনের অংশ। হিন্দু পরিবারে সম্পত্তি দানের জন্য "দানপত্র" দলিল করা হয়।' },
      { question: 'হেবা বিল এওয়াজ কি যেকোনো সম্পর্কে করা যায়?', answer: 'না, মুসলিম আইনে হেবা বিল এওয়াজ সাধারণত স্বামী-স্ত্রী, পিতা-মাতা-সন্তান বা নিকট রক্তসম্পর্কের মধ্যে করা হয়।' },
      { question: 'হেবা দলিল কি রেজিস্ট্রি করতে হবে?', answer: 'হ্যাঁ, ১ লাখ টাকার বেশি মূল্যের সম্পত্তির হেবা দলিল রেজিস্ট্রি বাধ্যতামূলক। নইলে আইনগতভাবে গ্রহণযোগ্য নয়।' },
      { question: 'হেবা বিল এওয়াজের পর কি মালিক সম্পত্তি ফেরত নিতে পারবেন?', answer: 'সাধারণত না। হেবা বিল এওয়াজ একবার রেজিস্ট্রি হলে বাতিল করা খুব কঠিন। তাই করার আগে ভালোভাবে চিন্তা করুন।' },
      { question: 'হেবার পর কি নামজারি করতে হবে?', answer: 'হ্যাঁ, হেবা দলিল রেজিস্ট্রির পর গ্রহীতার নামে নামজারি (খারিজ) করতে হবে।' }
    ],
    featured: false,
    impressions: 44,
    clicks: 0
  }
},

// ============================================================
// ARTICLE 10: মিথ্যা নারী নির্যাতন মামলা থেকে বাঁচার উপায়
// ============================================================
{
  file: 'mithya-nari-nirjaton-mamla-theke-bachar-ain-2026.json',
  data: {
    slug: 'mithya-nari-nirjaton-mamla-theke-bachar-ain-2026',
    category: 'ফৌজদারি আইন',
    title: 'মিথ্যা নারী নির্যাতন মামলায় ফাঁসলে কী করবেন? আইনি প্রতিরক্ষা ও মুক্তির উপায় ২০২৬',
    metaTitle: 'মিথ্যা নারী নির্যাতন মামলা থেকে বাঁচার উপায় ২০২৬ | আইনি প্রতিরক্ষা',
    metaDescription: 'মিথ্যা নারী নির্যাতন মামলায় পড়েছেন? জামিন নেওয়া, মামলা খারিজ করা, প্রতিরোধ ও মিথ্যা মামলার বিরুদ্ধে পাল্টা মামলার সম্পূর্ণ গাইড ২০২৬।',
    keywords: [
      'মিথ্যা নারী নির্যাতন মামলা থেকে বাচার উপায়',
      'মিথ্যা মামলা প্রতিরক্ষা',
      'নারী নির্যাতন মামলা জামিন',
      'false domestic violence case bangladesh',
      'মিথ্যা যৌতুক মামলা'
    ],
    publishedDate: '2026-09-01',
    lastModified: '2026-09-01',
    readTime: '১৪ মিনিট',
    heroIntro: '<p>আপনি বা আপনার পরিচিত কেউ কি মিথ্যা নারী নির্যাতন মামলায় ফেঁসেছেন? এই মামলায় গ্রেফতার হলে জামিন পেতে কষ্ট হয়, চাকরি যায়, সামাজিক সম্মান নষ্ট হয়। কিন্তু সঠিক আইনি পদক্ষেপ নিলে মিথ্যা মামলা থেকে বের হওয়া সম্ভব। পরামর্শের জন্য: <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold">অ্যাডভোকেট মোঃ শাহ আলম</a> — <a href="tel:01712655546" style="color:var(--gold);font-weight:bold">📞 01712655546</a></p>',
    quickAnswer: {
      heading: '⚡ মিথ্যা মামলায় তাৎক্ষণিক করণীয়',
      points: [
        'গ্রেফতার হলে: আইনজীবী না আসা পর্যন্ত কোনো বক্তব্য দেবেন না',
        'দ্রুত জামিন নিন: নারী নির্যাতন মামলায় সেশন কোর্ট বা হাইকোর্টে জামিন',
        'প্রমাণ সংগ্রহ: SMS, WhatsApp, সাক্ষী, CCTV ফুটেজ',
        'মিথ্যা মামলার বিরুদ্ধে পাল্টা মামলা করুন',
        'হাইকোর্টে মামলা খারিজের আবেদন (FIR Quash)'
      ]
    },
    toc: [
      'মিথ্যা নারী নির্যাতন মামলা কীভাবে দেওয়া হয়?',
      'গ্রেফতার হলে প্রথম ২৪ ঘণ্টায় কী করবেন?',
      'জামিন নেওয়ার নিয়ম',
      'মামলা খারিজ করার উপায় (FIR Quash)',
      'প্রমাণ সংগ্রহ — কী কী সংগ্রহ করবেন?',
      'মিথ্যা মামলার বিরুদ্ধে পাল্টা মামলা',
      'সামাজিক সম্মান রক্ষা',
      'আইনজীবীর সহায়তা'
    ],
    sections: [
      {
        heading: '১. মিথ্যা নারী নির্যাতন মামলা কীভাবে দেওয়া হয়?',
        content: `<p>নারী ও শিশু নির্যাতন দমন আইন ২০০০ (সংশোধিত ২০০৩) এবং পারিবারিক সহিংসতা প্রতিরোধ ও সুরক্ষা আইন ২০১০ — এই আইনগুলো নারীর সুরক্ষার জন্য তৈরি। কিন্তু অনেক সময় এগুলোর অপব্যবহার হয়।</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-left:4px solid #dc3545;border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:#dc3545;margin:0 0 0.75rem 0">⚠️ সাধারণ মিথ্যা মামলার ধরন</h4>
<ul style="margin:0;padding-left:1.5rem;color:var(--text-secondary);line-height:2">
<li>মিথ্যা যৌতুক দাবির অভিযোগ</li>
<li>না-ঘটা শারীরিক নির্যাতনের অভিযোগ</li>
<li>বিবাহ বিচ্ছেদের পর হয়রানির উদ্দেশ্যে মামলা</li>
<li>সম্পত্তি দখলের জন্য মিথ্যা অভিযোগ</li>
<li>প্রতিহিংসা থেকে মিথ্যা FIR</li>
</ul>
</div>`
      },
      {
        heading: '২. গ্রেফতার হলে প্রথম ২৪ ঘণ্টায় কী করবেন?',
        content: `<p>গ্রেফতারের প্রথম ২৪ ঘণ্টা সবচেয়ে গুরুত্বপূর্ণ। এই সময়ের ভুল সিদ্ধান্ত পুরো মামলায় প্রভাব ফেলতে পারে।</p>
<div style="margin:1.25rem 0">
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:rgba(40,167,69,0.08);border:1px solid rgba(40,167,69,0.25);border-radius:0.75rem;padding:1rem">
<div style="font-size:1.5rem;flex-shrink:0">✅</div>
<div><h4 style="margin:0 0 0.4rem 0;color:#28a745">করণীয়</h4>
<ul style="margin:0;padding-left:1.25rem;color:var(--text-secondary);font-size:0.9rem;line-height:1.9">
<li>পরিবারকে অবিলম্বে জানান</li>
<li>আইনজীবীর সাথে যোগাযোগ করুন</li>
<li>আইনজীবী আসার আগে নীরব থাকুন</li>
<li>৩৬ ঘণ্টার মধ্যে ম্যাজিস্ট্রেটের সামনে উপস্থাপনের অধিকার দাবি করুন</li>
</ul></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;background:rgba(220,53,69,0.08);border:1px solid rgba(220,53,69,0.25);border-radius:0.75rem;padding:1rem">
<div style="font-size:1.5rem;flex-shrink:0">❌</div>
<div><h4 style="margin:0 0 0.4rem 0;color:#dc3545">যা করবেন না</h4>
<ul style="margin:0;padding-left:1.25rem;color:var(--text-secondary);font-size:0.9rem;line-height:1.9">
<li>পুলিশের কাছে কোনো বক্তব্য দেবেন না</li>
<li>কাগজপত্রে স্বাক্ষর করবেন না</li>
<li>অভিযোগকারীর সাথে যোগাযোগ করবেন না</li>
<li>সোশ্যাল মিডিয়ায় কিছু পোস্ট করবেন না</li>
</ul></div>
</div>
</div>`
      },
      {
        heading: '৩. মামলা খারিজ করার উপায় (FIR Quash)',
        content: `<p>মিথ্যা FIR বা মামলা খারিজ করার সবচেয়ে কার্যকর উপায় হলো হাইকোর্টে রিট পিটিশন (FIR Quash)।</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:var(--accent);margin:0 0 1rem 0">📋 FIR Quash কখন করতে পারবেন?</h4>
<ul style="margin:0;padding-left:1.5rem;color:var(--text-secondary);line-height:2">
<li>মামলাটি মিথ্যা ও বানোয়াট প্রমাণ করতে পারলে</li>
<li>আইনগতভাবে সংঘটিত অপরাধ নয় এমন বিষয়ে মামলা হলে</li>
<li>উভয়পক্ষ আপোস করলে</li>
<li>অভিযোগ করতে এখতিয়ার না থাকলে</li>
</ul>
</div>
<div style="background:rgba(198,167,94,0.1);border:1px solid var(--gold);border-radius:0.75rem;padding:1rem;margin:1rem 0">
<p style="margin:0"><strong>💡 গুরুত্বপূর্ণ:</strong> FIR Quash করতে হাইকোর্টে যেতে হয় এবং অভিজ্ঞ আইনজীবীর সাহায্য নিতে হয়।</p>
</div>`
      },
      {
        heading: '৪. মিথ্যা মামলার বিরুদ্ধে পাল্টা মামলা',
        content: `<p>আপনি যদি নিশ্চিত হন যে মামলাটি সম্পূর্ণ মিথ্যা ও হয়রানির উদ্দেশ্যে করা হয়েছে, তাহলে পাল্টা মামলা করতে পারেন।</p>
<div style="overflow-x:auto;margin:1.25rem 0">
<table style="width:100%;border-collapse:collapse;font-size:0.95rem">
<thead><tr style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff">
<th style="padding:0.85rem 1rem;text-align:left">পাল্টা মামলার ধরন</th>
<th style="padding:0.85rem 1rem;text-align:left">আইনি ধারা</th>
<th style="padding:0.85rem 1rem;text-align:left">শাস্তি</th>
</tr></thead>
<tbody>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">মিথ্যা অভিযোগের মামলা</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">পেনাল কোড ২১১</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">২ বছর কারাদণ্ড</td></tr>
<tr><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">মানহানির মামলা</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">পেনাল কোড ৪৯৯-৫০০</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">২ বছর কারাদণ্ড</td></tr>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem">ক্ষতিপূরণের মামলা</td><td style="padding:0.85rem 1rem">দেওয়ানি আদালতে</td><td style="padding:0.85rem 1rem">ক্ষতিপূরণ আদায়</td></tr>
</tbody>
</table>
</div>`
      },
      {
        heading: '৫. আইনি সহায়তা',
        content: `<div style="background:linear-gradient(135deg,rgba(26,63,191,0.08),rgba(198,167,94,0.08));padding:1.5rem;border-radius:1rem;border:1px solid var(--gold);margin:1.5rem 0">
<h3 style="margin:0 0 0.75rem 0;color:var(--text)">⚖️ মিথ্যা মামলায় তাৎক্ষণিক সহায়তা</h3>
<p style="margin:0 0 1.25rem 0;color:var(--text-secondary);line-height:1.8">মিথ্যা মামলায় একা লড়বেন না। অ্যাডভোকেট মোঃ শাহ আলম ফৌজদারি প্রতিরক্ষায় অভিজ্ঞ — এখনই যোগাযোগ করুন।</p>
<div style="display:flex;gap:1rem;flex-wrap:wrap">
<a href="tel:01712655546" style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">📞 কল করুন: 01712655546</a>
<a href="https://wa.me/8801712655546" target="_blank" style="background:#25D366;color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">💬 WhatsApp</a>
</div>
</div>`
      }
    ],
    faqs: [
      { question: 'নারী নির্যাতন মামলায় কি জামিন পাওয়া যায়?', answer: 'কিছু ধারায় জামিনযোগ্য, কিছুতে জামিন-অযোগ্য। তবে হাইকোর্টে আগাম জামিনের আবেদন করা যায়। আইনজীবীর সাহায্যে দ্রুত জামিন নিন।' },
      { question: 'প্রমাণ না থাকলে কি মিথ্যা মামলায় দোষী হতে হবে?', answer: 'না। বাংলাদেশের আইনে "নির্দোষ যতক্ষণ না দোষী প্রমাণিত" — রাষ্ট্রপক্ষকে প্রমাণ করতে হবে। তবে প্রতিরক্ষার জন্য আইনজীবী অপরিহার্য।' },
      { question: 'FIR Quash করতে কতদিন লাগে?', answer: 'সাধারণত ১-৩ মাস। তবে জরুরি পরিস্থিতিতে দ্রুত শুনানির আবেদন করা যায়।' },
      { question: 'আপোস হলে কি মামলা বন্ধ হয়?', answer: 'কিছু ক্ষেত্রে আপোসে মামলা বন্ধ হয়, কিছুতে হয় না। রাষ্ট্র বনাম আসামির মামলায় শুধু অভিযোগকারীর আপোস যথেষ্ট নয়।' },
      { question: 'মিথ্যা মামলা করলে অভিযোগকারী কি শাস্তি পাবেন?', answer: 'হ্যাঁ, পেনাল কোডের ২১১ ধারায় মিথ্যা মামলাকারীর বিরুদ্ধে মামলা করা যায়। আদালতে মিথ্যা প্রমাণিত হলে অভিযোগকারী শাস্তি পাবেন।' }
    ],
    featured: true,
    impressions: 14,
    clicks: 2
  }
},

// ============================================================
// ARTICLE 11: পুলিশ ক্লিয়ারেন্স সার্টিফিকেট পাওয়ার নিয়ম ২০২৬
// ============================================================
{
  file: 'police-clearance-certificate-kivabe-paben-2026.json',
  data: {
    slug: 'police-clearance-certificate-kivabe-paben-2026',
    category: 'সরকারি সেবা',
    title: 'পুলিশ ক্লিয়ারেন্স সার্টিফিকেট কীভাবে পাবেন? অনলাইন আবেদনের সম্পূর্ণ নিয়ম ২০২৬',
    metaTitle: 'পুলিশ ক্লিয়ারেন্স সার্টিফিকেট ২০২৬ | অনলাইনে আবেদনের নিয়ম বাংলাদেশ',
    metaDescription: 'পুলিশ ক্লিয়ারেন্স সার্টিফিকেট কীভাবে পাবেন? অনলাইন আবেদন প্রক্রিয়া, প্রয়োজনীয় কাগজপত্র ও ফি — সম্পূর্ণ গাইড বাংলায় ২০২৬।',
    keywords: [
      'পুলিশ ক্লিয়ারেন্স সার্টিফিকেট',
      'police clearance certificate bangladesh',
      'police verification bangladesh',
      'পুলিশ ভেরিফিকেশন',
      'পুলিশ ক্লিয়ারেন্স অনলাইন আবেদন'
    ],
    publishedDate: '2026-09-01',
    lastModified: '2026-09-01',
    readTime: '১০ মিনিট',
    heroIntro: '<p>বিদেশ যাওয়ার জন্য ভিসা করছেন? চাকরির আবেদন করছেন? নাগরিকত্বের আবেদন করতে চান? — প্রায় সব ক্ষেত্রেই পুলিশ ক্লিয়ারেন্স সার্টিফিকেট লাগে। অনেকেই জানেন না কোথায় যাবেন, কী কাগজ লাগবে। এই আর্টিকেলে সব জানতে পারবেন। পরামর্শের জন্য: <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold">অ্যাডভোকেট মোঃ শাহ আলম</a> — <a href="tel:01712655546" style="color:var(--gold);font-weight:bold">📞 01712655546</a></p>',
    quickAnswer: {
      heading: '⚡ পুলিশ ক্লিয়ারেন্স — মূল তথ্য',
      points: [
        'অনলাইনে আবেদন: pcc.police.gov.bd',
        'ফি: ৫০০ টাকা (অনলাইন পেমেন্ট)',
        'সময়: ৭-১৫ কার্যদিবস',
        'প্রয়োজনীয় কাগজ: NID, পাসপোর্ট, ছবি, আবেদন ফরম',
        'স্ট্যাটাস চেক: একই পোর্টালে'
      ]
    },
    toc: [
      'পুলিশ ক্লিয়ারেন্স কী এবং কেন দরকার?',
      'অনলাইনে আবেদনের ধাপ',
      'প্রয়োজনীয় কাগজপত্রের তালিকা',
      'ফি এবং পেমেন্ট পদ্ধতি',
      'ক্লিয়ারেন্স পেতে কতদিন লাগে?',
      'পুলিশ ভেরিফিকেশন কীভাবে হয়?',
      'কোনো সমস্যা হলে কী করবেন?',
      'আইনজীবীর সহায়তা'
    ],
    sections: [
      {
        heading: '১. পুলিশ ক্লিয়ারেন্স কী এবং কেন দরকার?',
        content: `<p>পুলিশ ক্লিয়ারেন্স সার্টিফিকেট (PCC) হলো একটি সরকারি দলিল যা প্রমাণ করে আপনার বিরুদ্ধে কোনো ফৌজদারি মামলা নেই।</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:var(--accent);margin:0 0 0.75rem 0">📋 যেসব ক্ষেত্রে পুলিশ ক্লিয়ারেন্স লাগে</h4>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem">
<div style="background:rgba(26,63,191,0.06);border-radius:0.5rem;padding:0.75rem;font-size:0.9rem;color:var(--text-secondary)">✈️ বিদেশে চাকরির ভিসা</div>
<div style="background:rgba(26,63,191,0.06);border-radius:0.5rem;padding:0.75rem;font-size:0.9rem;color:var(--text-secondary)">🎓 বিদেশে পড়াশোনার ভিসা</div>
<div style="background:rgba(26,63,191,0.06);border-radius:0.5rem;padding:0.75rem;font-size:0.9rem;color:var(--text-secondary)">🏛️ সরকারি চাকরির আবেদন</div>
<div style="background:rgba(26,63,191,0.06);border-radius:0.5rem;padding:0.75rem;font-size:0.9rem;color:var(--text-secondary)">🇦🇺 নাগরিকত্বের আবেদন</div>
<div style="background:rgba(26,63,191,0.06);border-radius:0.5rem;padding:0.75rem;font-size:0.9rem;color:var(--text-secondary)">🏦 ব্যাংক লোনের আবেদন</div>
<div style="background:rgba(26,63,191,0.06);border-radius:0.5rem;padding:0.75rem;font-size:0.9rem;color:var(--text-secondary)">🔑 লাইসেন্স নবায়ন</div>
</div>
</div>`
      },
      {
        heading: '২. অনলাইনে আবেদনের ধাপ',
        content: `<p>বর্তমানে বাংলাদেশে পুলিশ ক্লিয়ারেন্স সার্টিফিকেটের জন্য অনলাইনে আবেদন করা বাধ্যতামূলক।</p>
<div style="margin:1.25rem 0">
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">১</div>
<div><h4 style="margin:0 0 0.4rem 0">pcc.police.gov.bd-এ প্রবেশ করুন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">অফিসিয়াল পোর্টালে যান। নতুন হলে "রেজিস্ট্রেশন" করুন।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">২</div>
<div><h4 style="margin:0 0 0.4rem 0">আবেদন ফরম পূরণ করুন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">ব্যক্তিগত তথ্য, বর্তমান ও স্থায়ী ঠিকানা, পাসপোর্ট নম্বর দিন।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">৩</div>
<div><h4 style="margin:0 0 0.4rem 0">ফি পেমেন্ট করুন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">৫০০ টাকা অনলাইনে পেমেন্ট করুন (ব্যাংক/মোবাইল ব্যাংকিং)।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--gold);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">৪</div>
<div><h4 style="margin:0 0 0.4rem 0">কাগজপত্র জমা ও ক্লিয়ারেন্স সংগ্রহ</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">আবেদন জমা দিন, পুলিশ ভেরিফিকেশনের পর অনলাইনে ডাউনলোড করুন।</p></div>
</div>
</div>`
      },
      {
        heading: '৩. প্রয়োজনীয় কাগজপত্রের তালিকা',
        content: `<div style="background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:var(--accent);margin:0 0 1rem 0">📎 আবেদনের জন্য প্রয়োজনীয় কাগজ</h4>
<ul style="margin:0;padding-left:1.5rem;color:var(--text-secondary);line-height:2.2">
<li>জাতীয় পরিচয়পত্র (NID) — মূল ও ফটোকপি</li>
<li>পাসপোর্টের প্রথম ও শেষ পাতার কপি</li>
<li>পাসপোর্ট সাইজ ছবি — ৩ কপি</li>
<li>বর্তমান ঠিকানার প্রমাণ (ইউটিলিটি বিল বা চেয়ারম্যান সনদ)</li>
<li>আবেদন ফরম (পোর্টাল থেকে পূরণ করে প্রিন্ট)</li>
<li>পেমেন্টের রসিদ</li>
</ul>
</div>`
      },
      {
        heading: '৪. আইনি সহায়তা',
        content: `<div style="background:linear-gradient(135deg,rgba(26,63,191,0.08),rgba(198,167,94,0.08));padding:1.5rem;border-radius:1rem;border:1px solid var(--gold);margin:1.5rem 0">
<h3 style="margin:0 0 0.75rem 0;color:var(--text)">⚖️ সরকারি সেবায় আইনি সহায়তা</h3>
<p style="margin:0 0 1.25rem 0;color:var(--text-secondary);line-height:1.8">পুলিশ ক্লিয়ারেন্স পেতে বাধা বা কোনো সমস্যা হলে অ্যাডভোকেট মোঃ শাহ আলমের সাথে যোগাযোগ করুন।</p>
<div style="display:flex;gap:1rem;flex-wrap:wrap">
<a href="tel:01712655546" style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">📞 কল করুন: 01712655546</a>
<a href="https://wa.me/8801712655546" target="_blank" style="background:#25D366;color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">💬 WhatsApp</a>
</div>
</div>`
      }
    ],
    faqs: [
      { question: 'পুলিশ ক্লিয়ারেন্স কতদিনে পাওয়া যায়?', answer: 'সাধারণত ৭-১৫ কার্যদিবসের মধ্যে পাওয়া যায়। তবে ভেরিফিকেশনে দেরি হলে ১ মাসও লাগতে পারে।' },
      { question: 'ফি কত এবং কীভাবে দেব?', answer: 'সরকারি ফি ৫০০ টাকা। অনলাইনে ব্যাংক ট্রান্সফার, ডেবিট/ক্রেডিট কার্ড বা মোবাইল ব্যাংকিং (bKash, Rocket) দিয়ে দেওয়া যায়।' },
      { question: 'পুলিশ ক্লিয়ারেন্সে মামলা থাকলে কি পাওয়া যাবে?', answer: 'মামলা থাকলে সাধারণত ক্লিয়ারেন্স দেওয়া হয় না বা মামলার তথ্য সহ দেওয়া হয়। মামলা খারিজ হলে আবেদন করুন।' },
      { question: 'পুলিশ ক্লিয়ারেন্সের মেয়াদ কতদিন?', answer: 'সাধারণত ৬ মাস থেকে ১ বছর পর্যন্ত বৈধ থাকে। ব্যবহারের উদ্দেশ্য অনুযায়ী ভিন্ন হতে পারে।' },
      { question: 'বিদেশে থাকলে কি পুলিশ ক্লিয়ারেন্সের আবেদন করা যাবে?', answer: 'হ্যাঁ, বাংলাদেশি দূতাবাস বা কনস্যুলেটের মাধ্যমে আবেদন করা যায়।' }
    ],
    featured: false,
    impressions: 37,
    clicks: 1
  }
},

// ============================================================
// ARTICLE 12: ভুয়া খতিয়ান চেনার উপায় ও অনলাইনে RS/BS যাচাই
// ============================================================
{
  file: 'vuya-rs-khatian-chenar-upay-jomi-record-2026.json',
  data: {
    slug: 'vuya-rs-khatian-chenar-upay-jomi-record-2026',
    category: 'ভূমি আইন',
    title: 'ভুয়া খতিয়ান চেনার উপায় এবং অনলাইনে RS/BS খতিয়ান যাচাই করার সম্পূর্ণ নিয়ম ২০২৬',
    metaTitle: 'RS Khatian Online Check ২০২৬ | ভুয়া খতিয়ান চেনার উপায় বাংলাদেশ',
    metaDescription: 'RS বা BS খতিয়ান অনলাইনে কীভাবে যাচাই করবেন? ভুয়া খতিয়ান চেনার উপায়, eporcha.gov.bd-এ নাম দিয়ে খতিয়ান দেখার সম্পূর্ণ গাইড ২০২৬।',
    keywords: [
      'rs khatian online check',
      'khatian check bangladesh',
      'ভুয়া খতিয়ান চেনার উপায়',
      'eporcha gov bd',
      'খতিয়ান যাচাই অনলাইন'
    ],
    publishedDate: '2026-09-01',
    lastModified: '2026-09-01',
    readTime: '১২ মিনিট',
    heroIntro: '<p>জমি কেনার আগে খতিয়ান যাচাই না করলে বিপদে পড়বেন — এটা কোনো অতিরঞ্জন নয়। প্রতি বছর হাজার হাজার মানুষ ভুয়া খতিয়ান দিয়ে জমি বিক্রির প্রতারণায় পড়েন। এখন অনলাইনেই ঘরে বসে RS, BS খতিয়ান যাচাই করা যায়। সাহায্যের জন্য: <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold">অ্যাডভোকেট মোঃ শাহ আলম</a> — <a href="tel:01712655546" style="color:var(--gold);font-weight:bold">📞 01712655546</a></p>',
    quickAnswer: {
      heading: '⚡ খতিয়ান যাচাই — দ্রুত উপায়',
      points: [
        'eporcha.gov.bd — সরকারি অনলাইন পোর্টাল',
        'land.gov.bd — ভূমি মন্ত্রণালয়ের পোর্টাল',
        'জেলা, উপজেলা, মৌজা ও খতিয়ান নম্বর দিয়ে খোঁজা যায়',
        'মালিকের নাম দিয়েও খোঁজা যায়',
        'সরকারি তথ্যের সাথে বিক্রেতার দাবির মিল না থাকলে সন্দেহ করুন'
      ]
    },
    toc: [
      'RS, BS, CS খতিয়ান কি — পার্থক্য কী?',
      'অনলাইনে খতিয়ান যাচাইয়ের ধাপ',
      'ভুয়া খতিয়ান চেনার উপায়',
      'জমি কেনার আগে কী কী চেক করবেন?',
      'ভুয়া খতিয়ান দিয়ে প্রতারণা হলে কী করবেন?',
      'নামজারি ও মিউটেশন যাচাই',
      'আইনজীবীর সহায়তা'
    ],
    sections: [
      {
        heading: '১. RS, BS, CS খতিয়ান কি — পার্থক্য কী?',
        content: `<p>খতিয়ান হলো জমির সরকারি রেকর্ড — কার নামে কতটুকু জমি আছে তার তালিকা। বাংলাদেশে বিভিন্ন সময়ে জরিপ হয়েছে, তাই বিভিন্ন ধরনের খতিয়ান আছে।</p>
<div style="overflow-x:auto;margin:1.25rem 0">
<table style="width:100%;border-collapse:collapse;font-size:0.95rem">
<thead><tr style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff">
<th style="padding:0.85rem 1rem;text-align:left">খতিয়ানের ধরন</th>
<th style="padding:0.85rem 1rem;text-align:left">পূর্ণ নাম</th>
<th style="padding:0.85rem 1rem;text-align:left">সময়কাল</th>
<th style="padding:0.85rem 1rem;text-align:left">গুরুত্ব</th>
</tr></thead>
<tbody>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-weight:600">CS</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">Cadastral Survey</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">১৮৮৮-১৯৪০</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">সবচেয়ে পুরনো রেকর্ড</td></tr>
<tr><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-weight:600">RS</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">Revisional Survey</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">১৯৫৬-১৯৬২</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">আইনগতভাবে সবচেয়ে গুরুত্বপূর্ণ</td></tr>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-weight:600">BS/SA</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">Bangladesh/State Acquisition Survey</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">১৯৬০-বর্তমান</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">সর্বশেষ আপডেট রেকর্ড</td></tr>
</tbody>
</table>
</div>`
      },
      {
        heading: '২. অনলাইনে খতিয়ান যাচাইয়ের ধাপ',
        content: `<p>এখন ঘরে বসেই eporcha.gov.bd পোর্টালে খতিয়ান দেখতে পারবেন।</p>
<div style="margin:1.25rem 0">
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">১</div>
<div><h4 style="margin:0 0 0.4rem 0">eporcha.gov.bd-এ যান</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">বাংলাদেশ ই-পর্চা পোর্টালে প্রবেশ করুন।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">২</div>
<div><h4 style="margin:0 0 0.4rem 0">জেলা, উপজেলা ও মৌজা বেছে নিন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">ড্রপডাউন মেনু থেকে সঠিক তথ্য বেছে নিন।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">৩</div>
<div><h4 style="margin:0 0 0.4rem 0">খতিয়ান নম্বর বা মালিকের নাম দিন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">খতিয়ান নম্বর বা দাগ নম্বর বা মালিকের নাম দিয়ে সার্চ করুন।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--gold);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">৪</div>
<div><h4 style="margin:0 0 0.4rem 0">ফলাফল দেখুন ও প্রিন্ট করুন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">খতিয়ানের তথ্য দেখুন। সার্টিফাইড কপি ডাউনলোড করতে সামান্য ফি দিতে হবে।</p></div>
</div>
</div>`
      },
      {
        heading: '৩. ভুয়া খতিয়ান চেনার উপায়',
        content: `<p>জমি কেনার সময় বিক্রেতা যে খতিয়ান দেখাচ্ছেন তা আসল কিনা যাচাই করুন।</p>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:1.25rem 0">
<div style="background:rgba(220,53,69,0.08);border:1px solid rgba(220,53,69,0.25);border-radius:0.75rem;padding:1rem">
<h4 style="color:#dc3545;margin:0 0 0.75rem 0">🚨 ভুয়া খতিয়ানের লক্ষণ</h4>
<ul style="margin:0;padding-left:1.25rem;color:var(--text-secondary);font-size:0.9rem;line-height:1.9">
<li>অনলাইনে মিলছে না</li>
<li>কাটাকাটি বা সংশোধন আছে</li>
<li>সিল বা স্বাক্ষর অস্পষ্ট</li>
<li>মালিকের নামের বানান ভুল</li>
<li>দাগ নম্বর মিলছে না</li>
</ul>
</div>
<div style="background:rgba(40,167,69,0.08);border:1px solid rgba(40,167,69,0.25);border-radius:0.75rem;padding:1rem">
<h4 style="color:#28a745;margin:0 0 0.75rem 0">✅ আসল খতিয়ান যাচাই</h4>
<ul style="margin:0;padding-left:1.25rem;color:var(--text-secondary);font-size:0.9rem;line-height:1.9">
<li>eporcha.gov.bd-এ মেলে</li>
<li>ভূমি অফিসের সিল স্পষ্ট</li>
<li>মালিকের নাম ও দাগ নম্বর সঠিক</li>
<li>সার্টিফাইড কপি পাওয়া যায়</li>
</ul>
</div>
</div>`
      },
      {
        heading: '৪. আইনজীবীর সহায়তা',
        content: `<div style="background:linear-gradient(135deg,rgba(26,63,191,0.08),rgba(198,167,94,0.08));padding:1.5rem;border-radius:1rem;border:1px solid var(--gold);margin:1.5rem 0">
<h3 style="margin:0 0 0.75rem 0;color:var(--text)">⚖️ জমির রেকর্ড যাচাইয়ে সহায়তা</h3>
<p style="margin:0 0 1.25rem 0;color:var(--text-secondary);line-height:1.8">জমি কেনার আগে আইনজীবীর মাধ্যমে পূর্ণ যাচাই করুন। অ্যাডভোকেট মোঃ শাহ আলম ভূমি আইনে অভিজ্ঞ।</p>
<div style="display:flex;gap:1rem;flex-wrap:wrap">
<a href="tel:01712655546" style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">📞 কল করুন: 01712655546</a>
<a href="https://wa.me/8801712655546" target="_blank" style="background:#25D366;color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">💬 WhatsApp</a>
</div>
</div>`
      }
    ],
    faqs: [
      { question: 'অনলাইনে কি RS খতিয়ান বিনামূল্যে দেখা যায়?', answer: 'হ্যাঁ, eporcha.gov.bd-এ খতিয়ানের তথ্য বিনামূল্যে দেখা যায়। তবে সার্টিফাইড কপি ডাউনলোড করতে সামান্য ফি দিতে হয়।' },
      { question: 'খতিয়ানে নাম না থাকলে কি জমির মালিক না?', answer: 'সরাসরি এটা বলা যাবে না। নামজারি না হলে নতুন মালিকের নাম খতিয়ানে আসে না। তাই দলিল ও খতিয়ান দুটোই যাচাই করতে হবে।' },
      { question: 'ভুয়া খতিয়ানে জমি কেনা হলে কী করব?', answer: 'থানায় মামলা করুন এবং দেওয়ানি আদালতে জমি উদ্ধারের মামলা করুন। বিক্রেতার বিরুদ্ধে প্রতারণার মামলাও করা যাবে।' },
      { question: 'RS খতিয়ান ও BS খতিয়ানে মালিক ভিন্ন হলে কোনটি মানব?', answer: 'সাধারণত সর্বশেষ জরিপের (BS/SA) খতিয়ানই বর্তমানে প্রযোজ্য। তবে ক্রয়ের ইতিহাস ও দলিল দেখে নিশ্চিত হতে হবে।' },
      { question: 'মৌজা ম্যাপ কোথায় পাওয়া যায়?', answer: 'eporcha.gov.bd এবং land.gov.bd-এ মৌজা ম্যাপ ও নকশা পাওয়া যায়। জেলা ভূমি অফিস থেকেও সংগ্রহ করা যাবে।' }
    ],
    featured: false,
    impressions: 95,
    clicks: 3
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

console.log(`\n🎉 Created ${successCount}/${articles.length} articles`);
