const fs = require('fs');
const path = require('path');

const bnDir = path.join(__dirname, '..', 'src', 'content', 'posts', 'bn');

const articles = [

// ============================================================
// ARTICLE 4: স্ত্রী কি স্বামীকে তালাক দিতে পারেন?
// ============================================================
{
  file: 'stree-swami-talak-dite-parbe-bangladesh-ain-2026.json',
  data: {
    slug: 'stree-swami-talak-dite-parbe-bangladesh-ain-2026',
    category: 'পারিবারিক আইন',
    title: 'স্ত্রী কি স্বামীকে তালাক দিতে পারেন? বাংলাদেশে নারীর তালাকের সম্পূর্ণ আইন ২০২৬',
    metaTitle: 'স্বামীকে ডিভোর্স দেওয়ার নিয়ম ২০২৬ | স্ত্রীর তালাকের আইনি অধিকার বাংলাদেশ',
    metaDescription: 'স্ত্রী কি স্বামীকে তালাক দিতে পারেন? খুলা তালাক, তালাক-ই-তাফউইজ, ফামিলি কোর্টে ডিভোর্স — নারীর তালাকের সম্পূর্ণ আইনি গাইড ২০২৬।',
    keywords: [
      'স্বামীকে ডিভোর্স দেওয়ার নিয়ম ২০২৬',
      'স্ত্রী কি তালাক দিতে পারে',
      'খুলা তালাক বাংলাদেশ',
      'নারীর তালাকের অধিকার',
      'মুসলিম ডিভোর্স আইন বাংলাদেশ'
    ],
    publishedDate: '2026-09-01',
    lastModified: '2026-09-01',
    readTime: '১৪ মিনিট',
    heroIntro: '<p>অনেক নারী মনে করেন শুধু স্বামীই তালাক দিতে পারেন। কিন্তু বাংলাদেশের আইনে নারীরও তালাকের অধিকার আছে — তবে পদ্ধতিটা ভিন্ন। আপনি যদি কঠিন বিবাহিত জীবন থেকে বের হতে চান এবং কীভাবে এগোবেন বুঝতে না পারেন, এই আর্টিকেলটি আপনার জন্য। পরামর্শের জন্য: <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold">অ্যাডভোকেট মোঃ শাহ আলম</a> — <a href="tel:01712655546" style="color:var(--gold);font-weight:bold">📞 01712655546</a></p>',
    quickAnswer: {
      heading: '⚡ স্ত্রীর তালাকের উপায় — সংক্ষিপ্ত উত্তর',
      points: [
        'কাবিননামায় তালাকের অধিকার থাকলে: সরাসরি নোটিশ দিয়ে তালাক দিতে পারবেন',
        'তালাকের অধিকার না থাকলে: ফামিলি কোর্টে "খুলা তালাক"-এর আবেদন করতে হবে',
        'স্বামীর সম্মতি নিয়ে: "মোবারত" বা পারস্পরিক সম্মতিতে তালাক হতে পারে',
        'ফামিলি কোর্টে তালাক: ২-৬ মাস সময় লাগে',
        'দেনমোহর ও খোরপোশ আদায়ের অধিকার থাকবে'
      ]
    },
    toc: [
      'বাংলাদেশে স্ত্রীর তালাকের ৩টি পদ্ধতি',
      'তালাক-ই-তাফউইজ: কাবিননামায় যদি অধিকার থাকে',
      'খুলা তালাক: ফামিলি কোর্টে আবেদন',
      'পারস্পরিক সম্মতিতে তালাক (মোবারত)',
      'তালাকের পর দেনমোহর ও খোরপোশের অধিকার',
      'তালাকের পর সন্তানের হেফাজত কে পাবেন?',
      'ইদ্দত পালন — কতদিন এবং কেন?',
      'আইনি সহায়তা'
    ],
    sections: [
      {
        heading: '১. বাংলাদেশে স্ত্রীর তালাকের ৩টি পদ্ধতি',
        content: `<p>মুসলিম পারিবারিক আইন অধ্যাদেশ ১৯৬১ অনুযায়ী স্ত্রী তিনটি উপায়ে তালাক দিতে পারেন। কোনটি আপনার ক্ষেত্রে প্রযোজ্য তা নির্ভর করে আপনার কাবিননামা ও পরিস্থিতির উপর।</p>
<div style="overflow-x:auto;margin:1.25rem 0">
<table style="width:100%;border-collapse:collapse;font-size:0.95rem">
<thead><tr style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff">
<th style="padding:0.85rem 1rem;text-align:left">পদ্ধতি</th>
<th style="padding:0.85rem 1rem;text-align:left">শর্ত</th>
<th style="padding:0.85rem 1rem;text-align:center">সময়</th>
<th style="padding:0.85rem 1rem;text-align:left">দেনমোহর</th>
</tr></thead>
<tbody>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-weight:600">তালাক-ই-তাফউইজ</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-size:0.9rem">কাবিননামায় অধিকার থাকলে</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center">১-৩ মাস</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-size:0.9rem">সম্পূর্ণ পাওয়ার অধিকার</td></tr>
<tr><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-weight:600">খুলা তালাক</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-size:0.9rem">ফামিলি কোর্টে আবেদন</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center">৩-৬ মাস</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-size:0.9rem">আদালত নির্ধারণ করবে</td></tr>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;font-weight:600">মোবারত (পারস্পরিক)</td><td style="padding:0.85rem 1rem;font-size:0.9rem">স্বামীর সম্মতি আছে</td><td style="padding:0.85rem 1rem;text-align:center">১-২ মাস</td><td style="padding:0.85rem 1rem;font-size:0.9rem">আলোচনায় নির্ধারিত</td></tr>
</tbody>
</table>
</div>`
      },
      {
        heading: '২. তালাক-ই-তাফউইজ: কাবিননামায় যদি অধিকার থাকে',
        content: `<p>কাবিননামার ১৮ নম্বর কলামে যদি স্ত্রীকে তালাকের অধিকার দেওয়া থাকে, তাহলে স্ত্রী সরাসরি তালাক দিতে পারেন — ঠিক যেমন স্বামী দেন।</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-left:4px solid var(--accent);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:var(--accent);margin:0 0 0.75rem 0">📋 তালাক-ই-তাফউইজ প্রক্রিয়া</h4>
<ol style="margin:0;padding-left:1.5rem;color:var(--text-secondary);line-height:2.2">
<li>কাবিননামার কপি দেখুন — ১৮ নং কলামে চেক করুন</li>
<li>লিখিত তালাকনামা প্রস্তুত করুন</li>
<li>স্থানীয় চেয়ারম্যান/মেয়রকে নোটিশ পাঠান (MFLO 1961)</li>
<li>স্বামীকেও নোটিশ পাঠান</li>
<li>৯০ দিন পর তালাক কার্যকর হবে</li>
</ol>
</div>
<div style="background:rgba(198,167,94,0.1);border:1px solid var(--gold);border-radius:0.75rem;padding:1rem;margin:1rem 0">
<p style="margin:0"><strong>💡 টিপস:</strong> আপনার কাবিননামার কপি না থাকলে বিয়ের রেজিস্ট্রি অফিস থেকে সংগ্রহ করতে পারবেন।</p>
</div>`
      },
      {
        heading: '৩. খুলা তালাক: ফামিলি কোর্টে আবেদন',
        content: `<p>কাবিননামায় তালাকের অধিকার না থাকলে বা স্বামী সম্মতি না দিলে ফামিলি কোর্টে খুলা তালাকের আবেদন করতে হয়।</p>
<div style="margin:1.25rem 0">
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">১</div>
<div><h4 style="margin:0 0 0.4rem 0">ফামিলি আদালতে মামলা দায়ের</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">আইনজীবীর মাধ্যমে ফামিলি কোর্টে বিবাহ-বিচ্ছেদের মামলা দায়ের করুন।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">২</div>
<div><h4 style="margin:0 0 0.4rem 0">সালিশ ও আপোস চেষ্টা</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">আদালত প্রথমে সালিশ পরিষদের মাধ্যমে মিলমিশের চেষ্টা করবে।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--gold);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">৩</div>
<div><h4 style="margin:0 0 0.4rem 0">ডিক্রি লাভ ও তালাক কার্যকর</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">সালিশ ব্যর্থ হলে আদালত খুলা তালাকের ডিক্রি দেবেন। তালাক কার্যকর হবে।</p></div>
</div>
</div>
<div style="background:rgba(220,53,69,0.08);border:1px solid rgba(220,53,69,0.3);border-radius:0.75rem;padding:1rem;margin:1rem 0">
<p style="margin:0"><strong>⚠️ খুলা তালাকে দেনমোহর:</strong> সাধারণত খুলা তালাকে স্ত্রীকে দেনমোহরের অংশ বা পুরোটা ফেরত দিতে হয়। তবে আদালত পরিস্থিতি বিবেচনা করে রায় দেন।</p>
</div>`
      },
      {
        heading: '৪. তালাকের পর দেনমোহর ও খোরপোশের অধিকার',
        content: `<p>তালাকের পরও স্ত্রীর কিছু অধিকার থাকে যা অনেকে জানেন না।</p>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:1.25rem 0">
<div style="background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1.25rem">
<h4 style="color:var(--accent);margin:0 0 0.75rem 0">💰 দেনমোহর</h4>
<ul style="margin:0;padding-left:1.25rem;color:var(--text-secondary);line-height:1.9;font-size:0.9rem">
<li>স্বামী তালাক দিলে: সম্পূর্ণ দেনমোহর পাবেন</li>
<li>স্ত্রী খুলা তালাক নিলে: আংশিক ফেরত দিতে পারে</li>
<li>তালাক-ই-তাফউইজে: সম্পূর্ণ দেনমোহর পাবেন</li>
<li>যদি স্বামী না দেন: পারিবারিক আদালতে মামলা করুন</li>
</ul>
</div>
<div style="background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1.25rem">
<h4 style="color:var(--gold);margin:0 0 0.75rem 0">🍽️ ইদ্দতকালীন খোরপোশ</h4>
<ul style="margin:0;padding-left:1.25rem;color:var(--text-secondary);line-height:1.9;font-size:0.9rem">
<li>ইদ্দতকাল (৩ মাস) পর্যন্ত খোরপোশ পাবেন</li>
<li>সন্তান থাকলে সন্তানের ভরণপোষণ আলাদা</li>
<li>গর্ভাবস্থায় প্রসব পর্যন্ত খোরপোশ</li>
<li>পারিবারিক আদালতে দাবি করতে পারবেন</li>
</ul>
</div>
</div>`
      },
      {
        heading: '৫. আইনি সহায়তা',
        content: `<div style="background:linear-gradient(135deg,rgba(26,63,191,0.08),rgba(198,167,94,0.08));padding:1.5rem;border-radius:1rem;border:1px solid var(--gold);margin:1.5rem 0">
<h3 style="margin:0 0 0.75rem 0;color:var(--text)">⚖️ তালাক বিষয়ক আইনি সহায়তা</h3>
<p style="margin:0 0 1.25rem 0;color:var(--text-secondary);line-height:1.8">তালাক প্রক্রিয়া জটিল হতে পারে। অ্যাডভোকেট মোঃ শাহ আলম পারিবারিক আইনে অভিজ্ঞ — তিনি আপনার পাশে থেকে সঠিক পথ দেখাবেন।</p>
<div style="display:flex;gap:1rem;flex-wrap:wrap">
<a href="tel:01712655546" style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">📞 কল করুন: 01712655546</a>
<a href="https://wa.me/8801712655546" target="_blank" style="background:#25D366;color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">💬 WhatsApp</a>
</div>
</div>`
      }
    ],
    faqs: [
      { question: 'স্ত্রী কি এককভাবে স্বামীকে তালাক দিতে পারেন?', answer: 'হ্যাঁ পারেন, যদি কাবিননামায় তালাকের অধিকার দেওয়া থাকে (তালাক-ই-তাফউইজ)। অধিকার না থাকলে ফামিলি কোর্টে খুলা তালাকের মামলা করতে হবে।' },
      { question: 'খুলা তালাক নিলে কি দেনমোহর ফেরত দিতে হবে?', answer: 'সাধারণত আদালত দেনমোহর ফেরত দিতে বলতে পারেন। তবে নির্যাতন বা বিশেষ পরিস্থিতিতে আদালত ভিন্ন রায় দিতে পারেন।' },
      { question: 'তালাকের মামলায় কতদিন সময় লাগে?', answer: 'তালাক-ই-তাফউইজে ৯০ দিন, ফামিলি কোর্টে খুলা তালাকে ৩-৬ মাস, এবং পারস্পরিক সম্মতিতে ১-২ মাস সময় লাগে।' },
      { question: 'স্বামী বিদেশে থাকলে কীভাবে তালাক দেব?', answer: 'বিদেশে থাকা স্বামীকে নোটিশ পাঠানো যায় ডাক বা WhatsApp-এ (সংশ্লিষ্ট প্রমাণসহ)। ফামিলি কোর্টে মামলা করলে আদালত প্রক্রিয়া পরিচালনা করবে।' },
      { question: 'তালাকের পর কতদিন অপেক্ষা করতে হবে পুনরায় বিবাহের জন্য?', answer: 'ইদ্দতকাল (সাধারণত ৩ মাস) পার হওয়ার পর পুনরায় বিবাহ করা যাবে। গর্ভাবস্থায় থাকলে সন্তান প্রসবের পরে।' }
    ],
    featured: true,
    impressions: 152,
    clicks: 2
  }
},

// ============================================================
// ARTICLE 5: কোর্ট ম্যারেজ মোট খরচ ও প্রক্রিয়া ২০২৬
// ============================================================
{
  file: 'court-marriage-total-khoroch-prokriya-bangladesh-2026.json',
  data: {
    slug: 'court-marriage-total-khoroch-prokriya-bangladesh-2026',
    category: 'পারিবারিক আইন',
    title: 'কোর্ট ম্যারেজ করতে আসলে কত টাকা লাগে? সম্পূর্ণ খরচ ও প্রক্রিয়া ২০২৬',
    metaTitle: 'কোর্ট ম্যারেজ খরচ ২০২৬ | বাংলাদেশে কোর্ট ম্যারেজের নিয়ম ও কাগজপত্র',
    metaDescription: 'বাংলাদেশে কোর্ট ম্যারেজ করতে কত টাকা লাগে? কাজী ফি, অ্যাফিডেভিট, আইনজীবী ফি সহ সম্পূর্ণ খরচের তালিকা ও কাগজপত্র ২০২৬।',
    keywords: [
      'কোর্ট ম্যারেজ খরচ ২০২৬',
      'court marriage bangladesh 2026',
      'কোর্ট ম্যারেজ করতে কত টাকা লাগে',
      'court marriage paper bangladesh',
      'কোর্ট ম্যারেজের কাগজপত্র'
    ],
    publishedDate: '2026-09-01',
    lastModified: '2026-09-01',
    readTime: '১১ মিনিট',
    heroIntro: '<p>"কোর্ট ম্যারেজ করলে তো সব ঠিক হয়ে যাবে" — এই ভুল ধারণায় অনেকে পরে বিপদে পড়েন। কোর্ট ম্যারেজ আসলে কী, কোথায় করবেন, কত খরচ হবে, কী কী কাগজপত্র লাগবে — সব জানুন এখানে। পরামর্শের জন্য: <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold">অ্যাডভোকেট মোঃ শাহ আলম</a> — <a href="tel:01712655546" style="color:var(--gold);font-weight:bold">📞 01712655546</a></p>',
    quickAnswer: {
      heading: '⚡ কোর্ট ম্যারেজের খরচ — দ্রুত উত্তর',
      points: [
        'অ্যাফিডেভিট খরচ: ৫০০ – ১,০০০ টাকা (নোটারি সহ)',
        'কাজী/নিকাহ রেজিস্ট্রার ফি: ৫০০ – ২,০০০ টাকা',
        'আইনজীবী ফি: ৩,০০০ – ১০,০০০ টাকা (ঐচ্ছিক)',
        'কোর্ট স্ট্যাম্প ও মিসেলেনিয়াস: ৫০০ – ১,৫০০ টাকা',
        'মোট: ৪,৫০০ – ১৫,০০০ টাকা (পরিস্থিতি অনুযায়ী)'
      ]
    },
    toc: [
      'কোর্ট ম্যারেজ আসলে কী?',
      'কোর্ট ম্যারেজের জন্য কী কী কাগজ লাগে?',
      'কোর্ট ম্যারেজের সম্পূর্ণ খরচের তালিকা',
      'কোথায় কোর্ট ম্যারেজ করবেন?',
      'কোর্ট ম্যারেজের ধাপসমূহ',
      'কোর্ট ম্যারেজের পর কি পরিবারকে জানাতে হবে?',
      'ভুয়া কাজীর ফাঁদ থেকে সাবধান!',
      'আইনজীবীর পরামর্শ'
    ],
    sections: [
      {
        heading: '১. কোর্ট ম্যারেজ আসলে কী?',
        content: `<p>"কোর্ট ম্যারেজ" শব্দটি শুনলে মনে হয় আদালতে বিয়ে হয়। কিন্তু বাংলাদেশে এটি ঠিক এরকম নয়।</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-left:4px solid var(--accent);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:var(--accent);margin:0 0 0.75rem 0">📌 বাংলাদেশে "কোর্ট ম্যারেজ" মানে</h4>
<ul style="margin:0;padding-left:1.5rem;color:var(--text-secondary);line-height:2">
<li>মুসলিম বিবাহ নিবন্ধন আইন ১৯৭৪ অনুযায়ী বিয়ে নিবন্ধন করা</li>
<li>অ্যাফিডেভিট (হলফনামা) দিয়ে বিয়ের ঘোষণা করা</li>
<li>পরিবারের বাইরে আইনি উপায়ে বিবাহ সম্পাদন করা</li>
<li>একজন নিবন্ধিত কাজী/নিকাহ রেজিস্ট্রারের মাধ্যমে বিয়ে</li>
</ul>
</div>
<div style="background:rgba(220,53,69,0.08);border:1px solid rgba(220,53,69,0.3);border-radius:0.75rem;padding:1rem;margin:1rem 0">
<p style="margin:0"><strong>⚠️ সতর্কতা:</strong> শুধু অ্যাফিডেভিট দিয়ে "কোর্ট ম্যারেজ" হয় না — কাজীর মাধ্যমে নিকাহ হতে হবে এবং নিবন্ধন করতে হবে। শুধু অ্যাফিডেভিট আইনগতভাবে বিবাহের প্রমাণ নয়।</p>
</div>`
      },
      {
        heading: '২. কোর্ট ম্যারেজের জন্য কী কী কাগজ লাগে?',
        content: `<p>কোর্ট ম্যারেজের জন্য উভয় পক্ষকে কিছু নির্দিষ্ট কাগজপত্র প্রস্তুত রাখতে হবে।</p>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:1.25rem 0">
<div style="background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1.25rem">
<h4 style="color:var(--accent);margin:0 0 0.75rem 0">👰 বর-কনে উভয়ের জন্য</h4>
<ul style="margin:0;padding-left:1.25rem;color:var(--text-secondary);line-height:2;font-size:0.9rem">
<li>জাতীয় পরিচয়পত্র (NID) — মূল ও ফটোকপি</li>
<li>পাসপোর্ট সাইজ ছবি (৪ কপি করে)</li>
<li>জন্ম সনদের কপি</li>
<li>অ্যাফিডেভিট (হলফনামা)</li>
<li>পূর্ব বিবাহ না থাকার ঘোষণাপত্র</li>
</ul>
</div>
<div style="background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1.25rem">
<h4 style="color:var(--gold);margin:0 0 0.75rem 0">👥 সাক্ষীদের জন্য</h4>
<ul style="margin:0;padding-left:1.25rem;color:var(--text-secondary);line-height:2;font-size:0.9rem">
<li>দুজন সাক্ষী (পুরুষ মুসলিম) প্রয়োজন</li>
<li>প্রত্যেকের NID কার্ড</li>
<li>পাসপোর্ট সাইজ ছবি</li>
<li>স্বাক্ষর করতে হবে কাবিননামায়</li>
</ul>
</div>
</div>
<div style="background:rgba(198,167,94,0.1);border:1px solid var(--gold);border-radius:0.75rem;padding:1rem;margin:1rem 0">
<p style="margin:0"><strong>💡 বিশেষ ক্ষেত্রে:</strong> আগে বিয়ে হয়ে থাকলে তালাকনামা বা মৃত্যু সনদ লাগবে। বিধবা/তালাকপ্রাপ্তার ক্ষেত্রে সংশ্লিষ্ট কাগজ।</p>
</div>`
      },
      {
        heading: '৩. কোর্ট ম্যারেজের সম্পূর্ণ খরচের তালিকা',
        content: `<p>কোর্ট ম্যারেজের খরচ অনেকেই অতিরিক্ত বলে শুনেছেন — কিন্তু সরকারি হার মেনে করলে এটি খুব সাশ্রয়ী।</p>
<div style="overflow-x:auto;margin:1.25rem 0">
<table style="width:100%;border-collapse:collapse;font-size:0.95rem">
<thead><tr style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff">
<th style="padding:0.85rem 1rem;text-align:left">খরচের খাত</th>
<th style="padding:0.85rem 1rem;text-align:center">সরকারি হার</th>
<th style="padding:0.85rem 1rem;text-align:left">মন্তব্য</th>
</tr></thead>
<tbody>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">অ্যাফিডেভিট (নোটারি)</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center;font-weight:600;color:var(--accent)">৫০০ – ১,০০০ টাকা</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-size:0.85rem">নোটারি পাবলিকের কাছে</td></tr>
<tr><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">কাজী রেজিস্ট্রেশন ফি</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center;font-weight:600;color:var(--accent)">৫০০ – ২,০০০ টাকা</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-size:0.85rem">দেনমোহরের উপর নির্ভর</td></tr>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">কাবিননামার কপি</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center;font-weight:600;color:var(--accent)">১০০ – ৩০০ টাকা</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-size:0.85rem">সার্টিফাইড কপি</td></tr>
<tr><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">আইনজীবী ফি (যদি নেন)</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center;font-weight:600;color:var(--accent)">৩,০০০ – ১০,০০০ টাকা</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-size:0.85rem">ঐচ্ছিক কিন্তু নিরাপদ</td></tr>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">যাতায়াত ও আনুষঙ্গিক</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center;font-weight:600;color:var(--accent)">৫০০ – ১,৫০০ টাকা</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-size:0.85rem">ফটোকপি, যাতায়াত ইত্যাদি</td></tr>
</tbody>
<tfoot><tr style="background:linear-gradient(135deg,rgba(26,63,191,0.1),rgba(198,167,94,0.1))">
<td style="padding:1rem;font-weight:700">মোট আনুমানিক</td>
<td style="padding:1rem;text-align:center;font-weight:700;color:var(--gold)">৪,৫০০ – ১৫,০০০ টাকা</td>
<td style="padding:1rem;font-size:0.85rem">পরিস্থিতি অনুযায়ী</td>
</tr></tfoot>
</table>
</div>`
      },
      {
        heading: '৪. ভুয়া কাজীর ফাঁদ থেকে সাবধান!',
        content: `<p>কোর্ট ম্যারেজের নামে অনেক প্রতারক অতিরিক্ত অর্থ নেয় এবং ভুয়া বিয়ে করিয়ে দেয়।</p>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:1.25rem 0">
<div style="background:rgba(220,53,69,0.08);border:1px solid rgba(220,53,69,0.25);border-radius:0.75rem;padding:1rem">
<h4 style="color:#dc3545;margin:0 0 0.75rem 0">❌ প্রতারণার লক্ষণ</h4>
<ul style="margin:0;padding-left:1.25rem;color:var(--text-secondary);font-size:0.9rem;line-height:1.9">
<li>৫০,০০০+ টাকা চাওয়া</li>
<li>লাইসেন্স দেখাতে না পারা</li>
<li>ঘরে এসে বিয়ে করানোর প্রস্তাব</li>
<li>কোনো রেজিস্ট্রেশন না করা</li>
</ul>
</div>
<div style="background:rgba(40,167,69,0.08);border:1px solid rgba(40,167,69,0.25);border-radius:0.75rem;padding:1rem">
<h4 style="color:#28a745;margin:0 0 0.75rem 0">✅ আসল কাজী চিনবেন</h4>
<ul style="margin:0;padding-left:1.25rem;color:var(--text-secondary);font-size:0.9rem;line-height:1.9">
<li>লাইসেন্সপ্রাপ্ত নিকাহ রেজিস্ট্রার</li>
<li>সরকারি নির্ধারিত ফি নেবেন</li>
<li>কাবিননামা রেজিস্ট্রি করবেন</li>
<li>রসিদ দেবেন</li>
</ul>
</div>
</div>`
      },
      {
        heading: '৫. আইনজীবীর পরামর্শ',
        content: `<div style="background:linear-gradient(135deg,rgba(26,63,191,0.08),rgba(198,167,94,0.08));padding:1.5rem;border-radius:1rem;border:1px solid var(--gold);margin:1.5rem 0">
<h3 style="margin:0 0 0.75rem 0;color:var(--text)">⚖️ কোর্ট ম্যারেজে আইনি সহায়তা</h3>
<p style="margin:0 0 1.25rem 0;color:var(--text-secondary);line-height:1.8">নিরাপদ ও আইনসম্মত কোর্ট ম্যারেজের জন্য অ্যাডভোকেট মোঃ শাহ আলমের সাথে যোগাযোগ করুন।</p>
<div style="display:flex;gap:1rem;flex-wrap:wrap">
<a href="tel:01712655546" style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">📞 কল করুন: 01712655546</a>
<a href="https://wa.me/8801712655546" target="_blank" style="background:#25D366;color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">💬 WhatsApp</a>
</div>
</div>`
      }
    ],
    faqs: [
      { question: 'কোর্ট ম্যারেজ কি ধর্মীয়ভাবে বৈধ?', answer: 'হ্যাঁ, কাজীর মাধ্যমে ইসলামি রীতিতে (ইজাব-কবুল, সাক্ষী সহ) বিয়ে হলে এটি ধর্মীয়ভাবেও বৈধ। শুধু অ্যাফিডেভিট দিলে ধর্মীয় বিয়ে হয় না।' },
      { question: 'বাবা-মার সম্মতি ছাড়া কি কোর্ট ম্যারেজ করা যাবে?', answer: 'মুসলিম আইনে প্রাপ্তবয়স্ক নারী (১৮+) ও পুরুষ (২১+) সম্মতিতে বিয়ে করতে পারেন। তবে নারীর ওয়ালি (অভিভাবক) সংশ্লিষ্ট থাকা বাঞ্ছনীয়।' },
      { question: 'কোর্ট ম্যারেজের পর কি সনদ পাওয়া যায়?', answer: 'হ্যাঁ, কাজী একটি কাবিননামা দেন যা বিয়ের সরকারি প্রমাণপত্র। এই কাবিননামা দিয়ে পাসপোর্ট, ব্যাংক অ্যাকাউন্ট সব কিছু করা যায়।' },
      { question: 'মিথ্যা কোর্ট ম্যারেজের শিকার হলে কী করব?', answer: 'ভুয়া কাজী বা প্রতারণামূলক বিয়ের শিকার হলে সরাসরি থানায় এবং সাইবার ক্রাইম ইউনিটে অভিযোগ করুন। একই সাথে ফামিলি কোর্টে মামলা করুন।' },
      { question: 'কোর্ট ম্যারেজের জন্য বয়সের সীমা কত?', answer: 'বাল্যবিবাহ নিরোধ আইন অনুযায়ী বর কমপক্ষে ২১ বছর ও কনে কমপক্ষে ১৮ বছর হতে হবে।' }
    ],
    featured: true,
    impressions: 50,
    clicks: 0
  }
},

// ============================================================
// ARTICLE 6: চেক বাউন্স মামলার নতুন নিয়ম ২০২৬
// ============================================================
{
  file: 'check-bounce-niyom-jamin-2026-notun.json',
  data: {
    slug: 'check-bounce-niyom-jamin-2026-notun',
    category: 'ব্যবসায়িক আইন',
    title: 'চেক বাউন্স মামলার নতুন নিয়ম ২০২৬: ১৩৮ ধারায় জামিন, সাজা ও আদায়ের প্রক্রিয়া',
    metaTitle: 'চেক ডিজঅনার মামলার নতুন নিয়ম ২০২৬ | ১৩৮ ধারায় জামিন ও শাস্তি',
    metaDescription: 'চেক বাউন্স হলে করণীয় কী? NI Act ১৩৮ ধারায় মামলা করার নিয়ম, জামিন, সাজা ও টাকা আদায়ের সম্পূর্ণ প্রক্রিয়া ২০২৬।',
    keywords: [
      'চেক ডিজঅনার মামলার নতুন নিয়ম ২০২৬',
      '১৩৮ ধারা চেক বাউন্স',
      'cheque bounce case bangladesh',
      'চেক বাউন্স জামিন',
      'NI Act 138 bangladesh'
    ],
    publishedDate: '2026-09-01',
    lastModified: '2026-09-01',
    readTime: '১৩ মিনিট',
    heroIntro: '<p>কেউ আপনাকে চেক দিয়েছিল, কিন্তু ব্যাংকে দিলে বাউন্স হয়ে গেছে? এখন কী করবেন? অনেকে ভাবেন শুধু ব্যাংক ম্যাটার — কিন্তু আসলে এটি ফৌজদারি অপরাধ। সঠিক পদক্ষেপ না নিলে আপনার টাকা ফেরত পাওয়া কঠিন হবে। বিস্তারিত জানতে: <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold">অ্যাডভোকেট মোঃ শাহ আলম</a> — <a href="tel:01712655546" style="color:var(--gold);font-weight:bold">📞 01712655546</a></p>',
    quickAnswer: {
      heading: '⚡ চেক বাউন্স — দ্রুত করণীয়',
        points: [
        'চেক বাউন্স হওয়ার ৩০ দিনের মধ্যে লিগ্যাল নোটিশ পাঠান',
        'নোটিশের ১৫ দিনের মধ্যে টাকা না দিলে: ম্যাজিস্ট্রেট আদালতে মামলা',
        'চেক বাউন্স থেকে মামলার সময়সীমা: নোটিশের পর ৩০ দিন',
        'সাজা: ১ বছর পর্যন্ত কারাদণ্ড ও/অথবা জরিমানা',
        'একই সাথে দেওয়ানি আদালতে অর্থ আদায়ের মামলা করতে পারবেন'
      ]
    },
    toc: [
      'চেক বাউন্স কি আইনত অপরাধ?',
      'চেক বাউন্স হলে প্রথম ৩০ দিনে কী করবেন?',
      'লিগ্যাল নোটিশ কীভাবে পাঠাবেন?',
      '১৩৮ ধারায় মামলা করার নিয়ম',
      'চেক বাউন্স মামলায় জামিন ও সাজা',
      'টাকা দ্রুত আদায়ের উপায়',
      'আসামির কী করণীয়?',
      'আইনজীবীর পরামর্শ'
    ],
    sections: [
      {
        heading: '১. চেক বাউন্স কি আইনত অপরাধ?',
        content: `<p>হ্যাঁ, চেক বাউন্স বাংলাদেশে একটি ফৌজদারি অপরাধ। Negotiable Instruments Act (NI Act) ১৮৮১-এর ১৩৮ ধারায় এটি সুস্পষ্টভাবে বলা আছে।</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-left:4px solid var(--accent);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:var(--accent);margin:0 0 0.75rem 0">📌 কোন কোন কারণে চেক বাউন্স হয়?</h4>
<ul style="margin:0;padding-left:1.5rem;color:var(--text-secondary);line-height:2">
<li><strong>অপর্যাপ্ত ব্যালেন্স:</strong> অ্যাকাউন্টে পর্যাপ্ত টাকা নেই</li>
<li><strong>স্বাক্ষর মিলছে না:</strong> চেকের স্বাক্ষর ও ব্যাংকের রেকর্ডের পার্থক্য</li>
<li><strong>অ্যাকাউন্ট বন্ধ:</strong> অ্যাকাউন্ট আগেই বন্ধ করা হয়েছে</li>
<li><strong>পেমেন্ট স্টপ:</strong> ইচ্ছাকৃতভাবে পেমেন্ট বন্ধ করা হয়েছে</li>
</ul>
</div>
<div style="background:rgba(198,167,94,0.1);border:1px solid var(--gold);border-radius:0.75rem;padding:1rem;margin:1rem 0">
<p style="margin:0"><strong>💡 গুরুত্বপূর্ণ:</strong> ১৩৮ ধারায় মামলা করতে হলে চেকটি ঋণ বা দায় পরিশোধের জন্য দেওয়া হতে হবে — উপহার বা আমানত হিসেবে দেওয়া চেকে এই আইন প্রযোজ্য নয়।</p>
</div>`
      },
      {
        heading: '২. চেক বাউন্স হলে প্রথম ৩০ দিনে কী করবেন?',
        content: `<p>চেক বাউন্স হওয়ার পর সময় নষ্ট করা ঠিক নয়। সঠিক সময়ে পদক্ষেপ না নিলে মামলার অধিকার হারাতে পারেন।</p>
<div style="margin:1.25rem 0">
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">১</div>
<div><h4 style="margin:0 0 0.4rem 0">ব্যাংক থেকে "Dishonour Memo" সংগ্রহ করুন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">চেক বাউন্স হলে ব্যাংক একটি মেমো দেয়। এটি সংগ্রহ করুন — এটিই প্রধান প্রমাণ।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">২</div>
<div><h4 style="margin:0 0 0.4rem 0">৩০ দিনের মধ্যে লিগ্যাল নোটিশ পাঠান</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">চেক বাউন্সের তারিখ থেকে ৩০ দিনের মধ্যে চেকদাতাকে রেজিস্টার্ড ডাকে নোটিশ পাঠান।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--gold);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">৩</div>
<div><h4 style="margin:0 0 0.4rem 0">১৫ দিনে সাড়া না দিলে মামলা করুন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">নোটিশ পাওয়ার ১৫ দিনের মধ্যে টাকা না দিলে ম্যাজিস্ট্রেট আদালতে মামলা করুন।</p></div>
</div>
</div>`
      },
      {
        heading: '৩. চেক বাউন্স মামলায় জামিন ও সাজা',
        content: `<p>১৩৮ ধারার মামলায় আসামির জামিন পাওয়া তুলনামূলক সহজ। তবে সাজা অনেক কঠিন হতে পারে।</p>
<div style="overflow-x:auto;margin:1.25rem 0">
<table style="width:100%;border-collapse:collapse;font-size:0.95rem">
<thead><tr style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff">
<th style="padding:0.85rem 1rem;text-align:left">বিষয়</th>
<th style="padding:0.85rem 1rem;text-align:left">বিবরণ</th>
</tr></thead>
<tbody>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-weight:600">সাজা (কারাদণ্ড)</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">সর্বোচ্চ ১ বছর কারাদণ্ড</td></tr>
<tr><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-weight:600">জরিমানা</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">চেকের পরিমাণের দ্বিগুণ পর্যন্ত জরিমানা</td></tr>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-weight:600">উভয় শাস্তি</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">কারাদণ্ড ও জরিমানা উভয় দেওয়া হতে পারে</td></tr>
<tr><td style="padding:0.85rem 1rem;font-weight:600">জামিনের ধরন</td><td style="padding:0.85rem 1rem">জামিনযোগ্য অপরাধ — সহজে জামিন পাওয়া যায়</td></tr>
</tbody>
</table>
</div>`
      },
      {
        heading: '৪. আইনজীবীর পরামর্শ',
        content: `<div style="background:linear-gradient(135deg,rgba(26,63,191,0.08),rgba(198,167,94,0.08));padding:1.5rem;border-radius:1rem;border:1px solid var(--gold);margin:1.5rem 0">
<h3 style="margin:0 0 0.75rem 0;color:var(--text)">⚖️ চেক বাউন্স মামলায় সহায়তা</h3>
<p style="margin:0 0 1.25rem 0;color:var(--text-secondary);line-height:1.8">চেক বাউন্সের ক্ষেত্রে দ্রুত পদক্ষেপ নিন। অ্যাডভোকেট মোঃ শাহ আলম ব্যবসায়িক আইন ও চেক বাউন্স মামলায় অভিজ্ঞ।</p>
<div style="display:flex;gap:1rem;flex-wrap:wrap">
<a href="tel:01712655546" style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">📞 কল করুন: 01712655546</a>
<a href="https://wa.me/8801712655546" target="_blank" style="background:#25D366;color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">💬 WhatsApp</a>
</div>
</div>`
      }
    ],
    faqs: [
      { question: 'চেক বাউন্সের মামলা করতে কত সময় লাগে?', answer: 'নোটিশ পাঠানো থেকে মামলা দায়ের পর্যন্ত মোট ৪৫-৬০ দিন। মামলার রায় পেতে সাধারণত ১-৩ বছর লাগে।' },
      { question: '১৩৮ ধারায় মামলায় টাকা ফেরত পাবো?', answer: 'হ্যাঁ, আদালত সাজার পাশাপাশি চেকের পরিমাণের অর্থ আদায়ের নির্দেশ দেন। দেরি না করে দ্রুত মামলা করুন।' },
      { question: 'টাকা ফেরত দিলে মামলা তুলে নেওয়া যাবে?', answer: 'আদালতের বাইরে আপোসমূলক সমঝোতা সম্ভব। তবে মামলা আনুষ্ঠানিকভাবে তুলে নিতে আদালতের অনুমতি লাগে।' },
      { question: 'চেক বাউন্স মামলায় কি দুইবার মামলা করা যায়?', answer: 'হ্যাঁ — একটি ফৌজদারি মামলা (১৩৮ ধারায়) এবং একটি দেওয়ানি মামলা (অর্থ আদায়ের জন্য) একই সাথে করা যায়।' },
      { question: 'আসামির পক্ষে কী করা উচিত?', answer: 'যদি আপনার দেওয়া চেক বাউন্স হয় এবং মামলা হয়, দ্রুত জামিন নিন এবং আইনজীবীর মাধ্যমে আপোস করার চেষ্টা করুন অথবা প্রতিরক্ষা তৈরি করুন।' }
    ],
    featured: false,
    impressions: 47,
    clicks: 2
  }
},

// ============================================================
// ARTICLE 7: তালাকনামা কীভাবে লিখবেন ফরম ও নিয়ম ২০২৬
// ============================================================
{
  file: 'talaknama-kivabe-likhben-form-niyom-2026.json',
  data: {
    slug: 'talaknama-kivabe-likhben-form-niyom-2026',
    category: 'পারিবারিক আইন',
    title: 'তালাকনামা কীভাবে লিখবেন? সঠিক ফরম, নোটিশের নিয়ম ও পুরো প্রক্রিয়া ২০২৬',
    metaTitle: 'তালাকনামা লেখার নিয়ম ২০২৬ | তালাকনামা ফরম ও নোটিশ বাংলাদেশ',
    metaDescription: 'তালাকনামা কীভাবে লিখতে হয়? সঠিক ফরম্যাট, চেয়ারম্যানকে নোটিশ দেওয়ার নিয়ম, ৯০ দিনের প্রক্রিয়া — সম্পূর্ণ গাইড বাংলায় ২০২৬।',
    keywords: [
      'তালাকনামা লেখার নিয়ম',
      'তালাকনামা ফরম',
      'talaknama bangladesh',
      'তালাক নোটিশ চেয়ারম্যান',
      'তালাকনামা লেখার সঠিক নিয়ম ২০২৬'
    ],
    publishedDate: '2026-09-01',
    lastModified: '2026-09-01',
    readTime: '১১ মিনিট',
    heroIntro: '<p>তালাক দেওয়ার সিদ্ধান্ত নিয়েছেন, কিন্তু কীভাবে তালাকনামা লিখবেন জানেন না? সঠিকভাবে না লিখলে তালাক আইনগতভাবে কার্যকর হবে না — এবং পরে বিভিন্ন জটিলতায় পড়বেন। এই আর্টিকেলে সঠিক নিয়ম বলা হয়েছে। পরামর্শের জন্য: <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold">অ্যাডভোকেট মোঃ শাহ আলম</a> — <a href="tel:01712655546" style="color:var(--gold);font-weight:bold">📞 01712655546</a></p>',
    quickAnswer: {
      heading: '⚡ তালাকনামার মূল তথ্য',
      points: [
        'তালাকনামা লিখিতভাবে হতে হবে (মৌখিক তালাকও আইনি প্রক্রিয়ায় জানাতে হবে)',
        'চেয়ারম্যান/মেয়রকে রেজিস্টার্ড ডাকে নোটিশ পাঠাতে হবে',
        'স্ত্রীকেও একই সময়ে নোটিশ পাঠাতে হবে',
        'নোটিশের ৯০ দিন পর তালাক কার্যকর হবে',
        '৯০ দিনের মধ্যে উভয়পক্ষ মিলমিশ করলে তালাক বাতিল হবে'
      ]
    },
    toc: [
      'তালাকনামা কী এবং কেন লিখতে হয়?',
      'তালাকনামায় কী কী তথ্য থাকতে হবে?',
      'তালাকনামা লেখার নমুনা ফরম্যাট',
      'চেয়ারম্যানকে নোটিশ দেওয়ার নিয়ম',
      '৯০ দিনের সালিশ প্রক্রিয়া কীভাবে কাজ করে?',
      'তালাক কার্যকর হওয়ার পর কী করবেন?',
      'তালাকনামায় সাধারণ ভুলগুলো',
      'আইনি সহায়তা'
    ],
    sections: [
      {
        heading: '১. তালাকনামা কী এবং কেন লিখতে হয়?',
        content: `<p>তালাকনামা হলো তালাকের লিখিত নোটিশ — এটি ছাড়া বাংলাদেশে তালাক আইনগতভাবে কার্যকর হয় না।</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-left:4px solid var(--accent);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:var(--accent);margin:0 0 0.75rem 0">📌 মুসলিম পারিবারিক আইন অধ্যাদেশ ১৯৬১ অনুযায়ী</h4>
<p style="margin:0;color:var(--text-secondary);line-height:1.9">যে স্বামী তালাক দিতে চান তাকে অবশ্যই স্থানীয় ইউনিয়ন পরিষদের চেয়ারম্যান বা পৌরসভার মেয়রকে লিখিত নোটিশ দিতে হবে। এবং স্ত্রীকেও একই সাথে কপি পাঠাতে হবে। শুধু মুখে বললে বা শুধু তালাকনামা লিখলে আইনগতভাবে তালাক কার্যকর হয় না।</p>
</div>`
      },
      {
        heading: '২. তালাকনামায় কী কী তথ্য থাকতে হবে?',
        content: `<p>একটি সঠিক তালাকনামায় নির্দিষ্ট কিছু তথ্য অবশ্যই থাকতে হবে। নিচে সম্পূর্ণ তালিকা দেওয়া হলো:</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:var(--accent);margin:0 0 1rem 0">📋 তালাকনামার বাধ্যতামূলক তথ্য</h4>
<ul style="margin:0;padding-left:1.5rem;color:var(--text-secondary);line-height:2.2">
<li>স্বামীর পূর্ণ নাম, পিতার নাম, বর্তমান ঠিকানা ও NID নম্বর</li>
<li>স্ত্রীর পূর্ণ নাম, পিতার নাম (পিতা ও স্বামী উভয়), বর্তমান ঠিকানা</li>
<li>বিয়ের তারিখ ও কাবিননামা নম্বর</li>
<li>দেনমোহরের পরিমাণ ও পরিশোধের অবস্থা</li>
<li>তালাকের কারণ (সংক্ষেপে)</li>
<li>তালাকের ধরন (তালাক-ই-রজঈ, বাইন বা মুগাল্লাজা)</li>
<li>তারিখ ও স্বাক্ষর</li>
<li>সাক্ষীদের নাম ও স্বাক্ষর</li>
</ul>
</div>`
      },
      {
        heading: '৩. তালাকনামা লেখার নমুনা ফরম্যাট',
        content: `<p>নিচে একটি সাধারণ তালাকনামার নমুনা দেওয়া হলো (বাংলায়):</p>
<div style="background:var(--surface);border:2px solid var(--card-border);border-radius:0.75rem;padding:1.5rem;margin:1.25rem 0;font-family:serif;line-height:2">
<p style="text-align:center;font-size:1.1rem;font-weight:bold;color:var(--accent)">তালাকনামা</p>
<p>আমি, <strong>[স্বামীর নাম]</strong>, পিতা: [পিতার নাম], সাকিন: [ঠিকানা], NID নং: [NID নম্বর], এতদ্বারা ঘোষণা করছি যে,</p>
<p>আমার স্ত্রী <strong>[স্ত্রীর নাম]</strong>, পিতা: [স্ত্রীর পিতার নাম], সাকিন: [স্ত্রীর ঠিকানা]-এর সাথে আমার বিবাহ [তারিখ] তারিখে কাবিননামা নং [নম্বর] এর মাধ্যমে সম্পন্ন হয়েছিল।</p>
<p>বিভিন্ন কারণে দাম্পত্য জীবন পরিচালনা অসম্ভব হওয়ায় আমি আমার স্ত্রীকে <strong>তালাক-ই-রজঈ</strong> প্রদান করছি।</p>
<p>দেনমোহরের পরিমাণ: [পরিমাণ] টাকা। [পরিশোধিত/অপরিশোধিত]</p>
<p style="margin-top:1.5rem">তারিখ: [তারিখ] &nbsp;&nbsp;&nbsp;&nbsp; স্বাক্ষর: ____________________</p>
<p>সাক্ষী ১: [নাম] &nbsp;&nbsp;&nbsp;&nbsp; সাক্ষী ২: [নাম]</p>
</div>
<div style="background:rgba(220,53,69,0.08);border:1px solid rgba(220,53,69,0.3);border-radius:0.75rem;padding:1rem;margin:1rem 0">
<p style="margin:0"><strong>⚠️ সতর্কতা:</strong> উপরের ফরম্যাট শুধু উদাহরণ। আপনার আইনজীবীর সাহায্যে সঠিকভাবে তালাকনামা তৈরি করুন।</p>
</div>`
      },
      {
        heading: '৪. চেয়ারম্যানকে নোটিশ দেওয়ার নিয়ম',
        content: `<p>তালাকনামা লেখার পরেই সবচেয়ে গুরুত্বপূর্ণ কাজ হলো চেয়ারম্যানকে নোটিশ পাঠানো।</p>
<div style="margin:1.25rem 0">
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">১</div>
<div><h4 style="margin:0 0 0.4rem 0">রেজিস্টার্ড ডাকে নোটিশ পাঠান</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">স্ত্রীর বর্তমান বাসস্থানের ইউনিয়ন পরিষদের চেয়ারম্যান বা পৌর মেয়রকে রেজিস্টার্ড ডাকে নোটিশ পাঠান। স্ত্রীকেও কপি পাঠান।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">২</div>
<div><h4 style="margin:0 0 0.4rem 0">সালিশ পরিষদ গঠন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">চেয়ারম্যান ৩০ দিনের মধ্যে উভয় পক্ষের প্রতিনিধি নিয়ে সালিশ পরিষদ গঠন করবেন।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--gold);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">৩</div>
<div><h4 style="margin:0 0 0.4rem 0">৯০ দিন পর তালাক কার্যকর</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">সালিশ ব্যর্থ হলে নোটিশের ৯০ দিন পর তালাক স্বয়ংক্রিয়ভাবে কার্যকর হবে।</p></div>
</div>
</div>`
      },
      {
        heading: '৫. আইনি সহায়তা',
        content: `<div style="background:linear-gradient(135deg,rgba(26,63,191,0.08),rgba(198,167,94,0.08));padding:1.5rem;border-radius:1rem;border:1px solid var(--gold);margin:1.5rem 0">
<h3 style="margin:0 0 0.75rem 0;color:var(--text)">⚖️ তালাক বিষয়ক আইনি সহায়তা</h3>
<p style="margin:0 0 1.25rem 0;color:var(--text-secondary);line-height:1.8">তালাকনামা সঠিকভাবে লেখা ও নোটিশ পাঠানোর জন্য আইনজীবীর সাহায্য নেওয়া নিরাপদ।</p>
<div style="display:flex;gap:1rem;flex-wrap:wrap">
<a href="tel:01712655546" style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">📞 কল করুন: 01712655546</a>
<a href="https://wa.me/8801712655546" target="_blank" style="background:#25D366;color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">💬 WhatsApp</a>
</div>
</div>`
      }
    ],
    faqs: [
      { question: 'শুধু মুখে তালাক দিলে কি আইনগতভাবে তালাক হবে?', answer: 'না, বাংলাদেশে মুসলিম পারিবারিক আইনে মুখে তালাক দিলে সঙ্গে সঙ্গে কার্যকর হয় না। লিখিত নোটিশ দিয়ে চেয়ারম্যানকে জানাতে হবে।' },
      { question: '৯০ দিনের মধ্যে স্বামী মিলমিশ করতে চাইলে কী হবে?', answer: '৯০ দিনের মধ্যে উভয় পক্ষ রাজি হলে তালাক বাতিল করা যাবে এবং দাম্পত্য সম্পর্ক পুনরায় শুরু হবে।' },
      { question: 'তালাকনামা রেজিস্ট্রি করতে হবে কি?', answer: 'তালাকনামা রেজিস্ট্রি বাধ্যতামূলক নয়। তবে চেয়ারম্যানকে রেজিস্টার্ড ডাকে নোটিশ পাঠানো বাধ্যতামূলক।' },
      { question: 'তালাকের পর কাবিননামা বাতিল করতে হবে?', answer: 'তালাক কার্যকর হলে বিবাহ নিবন্ধন স্বাভাবিকভাবেই বাতিল হয়ে যায়। তবে পরবর্তী বিয়ের সময় তালাকের সার্টিফিকেট দেখাতে হতে পারে।' },
      { question: 'তালাক পাওয়ার পর স্ত্রী কি বাড়ি থেকে বের করে দেওয়া যাবে?', answer: 'না। ইদ্দতকাল (৯০ দিন) পর্যন্ত স্ত্রীকে বাড়ি থেকে বের করে দেওয়া যাবে না। এটি আইনি অধিকার।' }
    ],
    featured: false,
    impressions: 37,
    clicks: 1
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
