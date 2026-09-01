const fs = require('fs');
const path = require('path');

const bnDir = path.join(__dirname, '..', 'src', 'content', 'posts', 'bn');

const articles = [

// ============================================================
// ARTICLE 1: মায়ের সম্পত্তিতে ছেলেমেয়ের অধিকার ২০২৬
// ============================================================
{
  file: 'mayer-sampatti-theke-chele-meyer-odhikar-2026.json',
  data: {
    slug: 'mayer-sampatti-theke-chele-meyer-odhikar-2026',
    category: 'সম্পত্তি আইন',
    title: 'মায়ের সম্পত্তিতে ছেলেমেয়ের অধিকার কতটুকু? ২০২৬ সালের আইনি ব্যাখ্যা',
    metaTitle: 'মায়ের সম্পত্তি ভাগের নিয়ম ২০২৬ | ছেলেমেয়ে কতটুকু পাবে?',
    metaDescription: 'মায়ের সম্পত্তিতে ছেলেমেয়ের অধিকার কতটুকু? মা জীবিত থাকলে বা মারা গেলে ইসলামি উত্তরাধিকার আইনে ভাগ কীভাবে হয় — সম্পূর্ণ বাংলা গাইড ২০২৬।',
    keywords: [
      'মায়ের সম্পত্তি ভাগের নিয়ম ২০২৬',
      'মায়ের সম্পত্তিতে ছেলেমেয়ের অধিকার',
      'জীবিত মায়ের সম্পত্তি ভাগের নিয়ম',
      'মায়ের মৃত্যুর পর সম্পত্তি বণ্টন',
      'মুসলিম উত্তরাধিকার আইন সম্পত্তি'
    ],
    publishedDate: '2026-09-01',
    lastModified: '2026-09-01',
    readTime: '১৩ মিনিট',
    heroIntro: '<p>একটু ভাবুন — আপনার মা সারাজীবন কষ্ট করে কিছু সম্পত্তি রেখে গেছেন। কিন্তু মারা যাওয়ার পর সেই সম্পত্তিতে আপনি ঠিক কতটুকু পাবেন? অনেকে ভুল ধারণায় থাকেন — মনে করেন ভাই-বোন সমান ভাগ পাবে, বা মেয়েরা পাবে না। আসলে ইসলামি উত্তরাধিকার আইন বলছে সম্পূর্ণ ভিন্ন কথা। বিস্তারিত জানতে <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold">অ্যাডভোকেট মোঃ শাহ আলম</a>-এর সাথে যোগাযোগ করুন: <a href="tel:01712655546" style="color:var(--gold);font-weight:bold">📞 01712655546</a></p>',
    quickAnswer: {
      heading: '⚡ মায়ের সম্পত্তি ভাগ — সংক্ষিপ্ত উত্তর',
      points: [
        'মা জীবিত থাকলে: তিনি নিজেই মালিক — ছেলেমেয়ে কোনো অধিকার দাবি করতে পারবে না',
        'মায়ের মৃত্যুর পর: ইসলামি ফারায়েজ আইন অনুযায়ী ভাগ হবে',
        'ছেলে পাবে মেয়ের দ্বিগুণ অংশ (যদি বাবা না থাকেন)',
        'স্বামী জীবিত থাকলে স্বামী পাবেন ১/৪ ভাগ, বাকিটা ছেলেমেয়ে পাবে',
        'হিন্দু আইনে নিয়ম ভিন্ন — ছেলেমেয়ে সমান অংশ পায়'
      ]
    },
    toc: [
      'মা জীবিত থাকলে তার সম্পত্তিতে সন্তানের অধিকার কি আছে?',
      'মায়ের মৃত্যুর পর ইসলামি আইনে সম্পত্তি ভাগের নিয়ম',
      'স্বামী থাকলে সম্পত্তি কীভাবে ভাগ হয়?',
      'শুধু ছেলে বা শুধু মেয়ে থাকলে কীভাবে ভাগ হয়?',
      'মেয়ের উত্তরাধিকার অধিকার সম্পর্কে ভুল ধারণা',
      'হিন্দু আইনে মায়ের সম্পত্তি ভাগের নিয়ম',
      'সম্পত্তি ভাগ নিয়ে বিরোধ হলে কী করবেন?',
      'আইনজীবীর পরামর্শ নিন'
    ],
    sections: [
      {
        heading: '১. মা জীবিত থাকলে তার সম্পত্তিতে সন্তানের অধিকার কি আছে?',
        content: `<p>এই প্রশ্নটি অনেকেই করেন — "মা বেঁচে থাকতেই কি আমি সম্পত্তিতে ভাগ দাবি করতে পারি?" উত্তরটা সরল: <strong>না, পারবেন না।</strong></p>
<p>আপনার মা যতক্ষণ জীবিত আছেন, ততক্ষণ তার সম্পত্তির একমাত্র মালিক তিনি নিজে। বাংলাদেশের সম্পত্তি হস্তান্তর আইন এবং মুসলিম পারিবারিক আইন অনুযায়ী, সন্তান — ছেলে হোক বা মেয়ে — মায়ের জীবদ্দশায় তার সম্পত্তিতে কোনো আইনি দাবি করতে পারে না।</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-left:4px solid var(--accent);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:var(--accent);margin:0 0 0.75rem 0">📌 বাস্তব উদাহরণ</h4>
<p style="margin:0;color:var(--text-secondary);line-height:1.9">রহেলা বেগমের ঢাকায় একটি ফ্ল্যাট আছে। তার ছেলে রফিক দাবি করছে বাবা মারা গেছেন, এখন ফ্ল্যাটে তার ভাগ আছে। কিন্তু আইনগতভাবে রহেলা বেগম জীবিত থাকা পর্যন্ত ফ্ল্যাটটি তার — রফিকের কোনো দাবি নেই। রহেলা বেগম চাইলে সম্পত্তি বিক্রি করতে পারবেন, দান করতে পারবেন, এমনকি ছেলেকে বঞ্চিত করে অন্যকে দিতে পারবেন।</p>
</div>
<p>তবে একটি ব্যতিক্রম আছে — যদি মা সম্পত্তি বিক্রি করতে চান বা হস্তান্তর করতে চান, তখন প্রাপ্তবয়স্ক সন্তানরা তাদের মতামত দিতে পারেন, কিন্তু আইনগতভাবে আটকাতে পারবেন না।</p>`
      },
      {
        heading: '২. মায়ের মৃত্যুর পর ইসলামি আইনে সম্পত্তি ভাগের নিয়ম',
        content: `<p>মুসলিম পারিবারিক আইনে (Muslim Personal Law — Shariat Application Act 1937) মায়ের মৃত্যুর পর সম্পত্তি ফারায়েজ নীতি অনুযায়ী বণ্টন হয়।</p>
<div style="overflow-x:auto;margin:1.25rem 0">
<table style="width:100%;border-collapse:collapse;font-size:0.95rem">
<thead><tr style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff">
<th style="padding:0.85rem 1rem;text-align:left">পরিস্থিতি</th>
<th style="padding:0.85rem 1rem;text-align:left">স্বামী পাবেন</th>
<th style="padding:0.85rem 1rem;text-align:left">ছেলে পাবে</th>
<th style="padding:0.85rem 1rem;text-align:left">মেয়ে পাবে</th>
</tr></thead>
<tbody>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">স্বামী + ২ ছেলে + ২ মেয়ে</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-weight:600">১/৪</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-weight:600">প্রত্যেকে ৩/১৪</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-weight:600">প্রত্যেকে ৩/২৮</td></tr>
<tr><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">স্বামী নেই + ২ ছেলে + ২ মেয়ে</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-weight:600">—</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-weight:600">প্রত্যেকে ২/৬</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-weight:600">প্রত্যেকে ১/৬</td></tr>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">স্বামী + শুধু মেয়ে (ছেলে নেই)</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-weight:600">১/৪</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">—</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-weight:600">২/৩ ভাগ (মিলে)</td></tr>
<tr><td style="padding:0.85rem 1rem">শুধু একজন মেয়ে (আর কেউ নেই)</td><td style="padding:0.85rem 1rem;font-weight:600">—</td><td style="padding:0.85rem 1rem">—</td><td style="padding:0.85rem 1rem;font-weight:600">১/২</td></tr>
</tbody>
</table>
</div>
<div style="background:rgba(198,167,94,0.1);border:1px solid var(--gold);border-radius:0.75rem;padding:1rem;margin:1rem 0">
<p style="margin:0;color:var(--text)"><strong>💡 মূল নিয়ম:</strong> ইসলামি আইনে ছেলে সবসময় মেয়ের দ্বিগুণ পায় — এটি কুরআনের আইন। তবে মৃতের আগে দেওয়া হেবা বা উইল থাকলে হিসাব পাল্টে যেতে পারে।</p>
</div>`
      },
      {
        heading: '৩. স্বামী থাকলে সম্পত্তি কীভাবে ভাগ হয়?',
        content: `<p>মায়ের মৃত্যুর সময় যদি বাবা (স্বামী) জীবিত থাকেন, তাহলে তিনিও উত্তরাধিকারী। এই ক্ষেত্রে হিসাবটা একটু জটিল।</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:var(--accent);margin:0 0 1rem 0">📊 উদাহরণ হিসাব</h4>
<p style="color:var(--text-secondary);margin:0 0 0.75rem 0"><strong>মৃতের সম্পত্তি:</strong> ৬০ লক্ষ টাকার জমি। ওয়ারিশ: স্বামী + ১ ছেলে + ১ মেয়ে</p>
<ul style="margin:0;padding-left:1.5rem;color:var(--text-secondary);line-height:2">
<li>স্বামী পাবেন: ১/৪ = <strong>১৫ লক্ষ টাকা</strong></li>
<li>বাকি ৪৫ লক্ষ ছেলেমেয়ে পাবে (ছেলে ২ ভাগ, মেয়ে ১ ভাগ হিসেবে)</li>
<li>ছেলে পাবে: ৩০ লক্ষ টাকা</li>
<li>মেয়ে পাবে: ১৫ লক্ষ টাকা</li>
</ul>
</div>
<p>এই হিসাবটি বুঝতে না পারলে অনেক পরিবারে বিবাদ হয়। তাই সঠিকভাবে ফারায়েজ হিসাব করার জন্য একজন আইনজীবীর সাহায্য নেওয়া উচিত।</p>`
      },
      {
        heading: '৪. শুধু ছেলে বা শুধু মেয়ে থাকলে কীভাবে ভাগ হয়?',
        content: `<p>অনেক সময় মায়ের শুধু ছেলে থাকে, বা শুধু মেয়ে থাকে। এই দুই পরিস্থিতিতে আইন ভিন্নভাবে কাজ করে।</p>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:1.25rem 0">
<div style="background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1.25rem">
<h4 style="color:var(--accent);margin:0 0 0.75rem 0">👦 শুধু ছেলে থাকলে</h4>
<ul style="margin:0;padding-left:1.25rem;color:var(--text-secondary);line-height:1.9;font-size:0.9rem">
<li>স্বামী থাকলে ১/৪, বাকিটা ছেলেরা পাবে</li>
<li>স্বামী না থাকলে সমস্ত সম্পত্তি ছেলেরা সমানভাবে পাবে</li>
<li>ছেলে একজন হলে সব পাবে</li>
<li>দুই ছেলে হলে অর্ধেক অর্ধেক পাবে</li>
</ul>
</div>
<div style="background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1.25rem">
<h4 style="color:var(--gold);margin:0 0 0.75rem 0">👧 শুধু মেয়ে থাকলে</h4>
<ul style="margin:0;padding-left:1.25rem;color:var(--text-secondary);line-height:1.9;font-size:0.9rem">
<li>একজন মেয়ে: মায়ের সম্পত্তির ১/২ পাবে</li>
<li>দুই বা তার বেশি মেয়ে: একসাথে ২/৩ পাবে</li>
<li>বাকি সম্পত্তি মৃতের ভাই-বোন বা অন্য আত্মীয়দের মধ্যে যাবে</li>
<li>এই বাকি অংশকে বলে "আসাবা"</li>
</ul>
</div>
</div>
<div style="background:rgba(220,53,69,0.08);border:1px solid rgba(220,53,69,0.3);border-radius:0.75rem;padding:1rem;margin:1rem 0">
<p style="margin:0;color:var(--text)"><strong>⚠️ সাবধান!</strong> অনেক মেয়ে জানেন না যে শুধু মেয়েরা থাকলে সম্পত্তির ১/৩ মায়ের ভাইয়েরা পেয়ে যাবে। এই অধিকার আদায় করতে অনেকে আদালতে যান।</p>
</div>`
      },
      {
        heading: '৫. মেয়ের উত্তরাধিকার অধিকার সম্পর্কে ভুল ধারণা',
        content: `<p>বাংলাদেশে অনেক পরিবারে এখনও একটি ভুল ধারণা প্রচলিত — মেয়েরা সম্পত্তি পাবে না, বা মেয়েরা বিয়ে হয়ে গেলে সম্পত্তির অধিকার হারায়। এটি সম্পূর্ণ ভুল।</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:var(--accent);margin:0 0 1rem 0">✅ সত্য তথ্য</h4>
<ul style="margin:0;padding-left:1.5rem;color:var(--text-secondary);line-height:2">
<li><strong>বিয়ের পরেও মেয়ের অধিকার থাকে</strong> — বিয়ে হলেই সম্পত্তির অধিকার যায় না</li>
<li><strong>যৌতুক নিলেও অধিকার যায় না</strong> — যৌতুক আলাদা, উত্তরাধিকার আলাদা</li>
<li><strong>দেনমোহর নিলেও অধিকার যায় না</strong> — মোহর ও উত্তরাধিকার দুটি ভিন্ন বিষয়</li>
<li><strong>মৌখিক "মাফ" করলেও আদালতে দাবি করা যায়</strong> — মৌখিক ছাড়ের আইনি কোনো মূল্য নেই</li>
</ul>
</div>
<p>তবে যদি মেয়ে লিখিতভাবে, নিজের ইচ্ছায়, রেজিস্ট্রিকৃত দলিলে সম্পত্তির অধিকার ছেড়ে দেন — সেটি আইনগতভাবে গ্রহণযোগ্য।</p>`
      },
      {
        heading: '৬. হিন্দু আইনে মায়ের সম্পত্তি ভাগের নিয়ম',
        content: `<p>হিন্দু উত্তরাধিকার আইনে (Hindu Succession Act) নিয়ম ভিন্ন। বাংলাদেশে হিন্দু পরিবারের ক্ষেত্রে দায়ভাগ পদ্ধতি অনুসরণ করা হয়।</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<ul style="margin:0;padding-left:1.5rem;color:var(--text-secondary);line-height:2">
<li>হিন্দু আইনে মায়ের মৃত্যুর পর স্বামী ও ছেলেমেয়ে সমান অংশ পায়</li>
<li>মেয়ে ও ছেলে সমান অধিকার পায় (ভারতে ২০০৫ সালে সংশোধনের পর)</li>
<li>বাংলাদেশে হিন্দু আইন এখনও পুরোনো নিয়মে চলে — মেয়েরা কিছু ক্ষেত্রে বঞ্চিত হন</li>
<li>মায়ের "স্ত্রীধন" (নিজের আয়, গহনা) সন্তানদের সমানভাবে যায়</li>
</ul>
</div>`
      },
      {
        heading: '৭. সম্পত্তি ভাগ নিয়ে বিরোধ হলে কী করবেন?',
        content: `<p>পরিবারে সম্পত্তি ভাগ নিয়ে বিরোধ হলে প্রথমে সালিশ বা আলোচনার মাধ্যমে সমাধানের চেষ্টা করুন। কিন্তু যদি সেটা না হয়, তাহলে আদালতে যেতে হবে।</p>
<div style="margin:1.25rem 0">
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">১</div>
<div><h4 style="margin:0 0 0.4rem 0">ওয়ারিশ সনদ তুলুন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">মৃত্যুর পর প্রথমে স্থানীয় ইউনিয়ন পরিষদ বা পৌরসভা থেকে ওয়ারিশ সনদ সংগ্রহ করুন।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">২</div>
<div><h4 style="margin:0 0 0.4rem 0">ফারায়েজ হিসাব করান</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">আইনজীবী বা মাতবর দিয়ে ফারায়েজ অনুযায়ী সঠিক ভাগ হিসাব করান।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">৩</div>
<div><h4 style="margin:0 0 0.4rem 0">বাটোয়ারা মামলা দায়ের করুন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">বিবাদ মিটমাট না হলে দেওয়ানি আদালতে বাটোয়ারা মামলা করুন। আদালত নিজে ভাগ করে দেবে।</p></div>
</div>
</div>`
      },
      {
        heading: '৮. আইনজীবীর পরামর্শ নিন',
        content: `<div style="background:linear-gradient(135deg,rgba(26,63,191,0.08),rgba(198,167,94,0.08));padding:1.5rem;border-radius:1rem;border:1px solid var(--gold);margin:1.5rem 0">
<h3 style="margin:0 0 0.75rem 0;color:var(--text)">⚖️ সম্পত্তি বিভাগে সরাসরি সহায়তা পান</h3>
<p style="margin:0 0 1.25rem 0;color:var(--text-secondary);line-height:1.8">মায়ের সম্পত্তির ন্যায্য ভাগ পেতে বা পরিবারে বিরোধ মেটাতে অ্যাডভোকেট মোঃ শাহ আলম-এর সাথে যোগাযোগ করুন। তিনি সম্পত্তি বণ্টন মামলায় অভিজ্ঞ।</p>
<div style="display:flex;gap:1rem;flex-wrap:wrap">
<a href="tel:01712655546" style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">📞 কল করুন: 01712655546</a>
<a href="https://wa.me/8801712655546" target="_blank" style="background:#25D366;color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">💬 WhatsApp</a>
<a href="/bn/contact" style="background:var(--surface);color:var(--text);padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none;border:1px solid var(--card-border)">📍 চেম্বার ঠিকানা</a>
</div>
</div>`
      }
    ],
    faqs: [
      { question: 'মা জীবিত থাকলে কি সম্পত্তিতে আমার ভাগ আছে?', answer: 'না। মা জীবিত থাকলে তার সম্পত্তির একমাত্র মালিক তিনি নিজে। ছেলেমেয়ে কোনো আইনি দাবি করতে পারবে না।' },
      { question: 'মায়ের মৃত্যুর পর মেয়ে কি সম্পত্তি পাবে?', answer: 'হ্যাঁ, মুসলিম আইনে মেয়ে সম্পত্তি পাবে। তবে ছেলের অর্ধেক পাবে। বিবাহিত বা অবিবাহিত — উভয় ক্ষেত্রেই পাবে।' },
      { question: 'ছেলেমেয়ে সমান ভাগ পাবে কি?', answer: 'না, মুসলিম আইনে ছেলে মেয়ের দ্বিগুণ পায়। তবে হিন্দু আইনে ছেলেমেয়ে সমান পেতে পারে।' },
      { question: 'মেয়ে যৌতুক নিলে কি সম্পত্তির অধিকার যায়?', answer: 'না, যৌতুক নিলেও মেয়ের উত্তরাধিকার সম্পত্তির অধিকার যায় না। এ দুটি সম্পূর্ণ আলাদা বিষয়।' },
      { question: 'সম্পত্তির ভাগ না পেলে কী করব?', answer: 'ওয়ারিশ সনদ তুলুন, ফারায়েজ হিসাব করুন এবং বিরোধ মেটাতে আইনজীবীর সাহায্যে দেওয়ানি আদালতে বাটোয়ারা মামলা করুন।' }
    ],
    featured: true,
    impressions: 208,
    clicks: 0
  }
},

// ============================================================
// ARTICLE 2: জমি রেজিস্ট্রি মোট খরচ হিসাব ২০২৬
// ============================================================
{
  file: 'jomi-registry-motel-khoroch-hisab-2026.json',
  data: {
    slug: 'jomi-registry-motel-khoroch-hisab-2026',
    category: 'ভূমি আইন',
    title: 'জমি রেজিস্ট্রি করতে আসলে মোট কত টাকা লাগে? সরকারি ফি + আনুষঙ্গিক খরচের সম্পূর্ণ হিসাব ২০২৬',
    metaTitle: 'জমি রেজিস্ট্রি খরচ ২০২৬ | সরকারি ফি + স্ট্যাম্প ডিউটি + আইনজীবী ফি সম্পূর্ণ হিসাব',
    metaDescription: 'বাংলাদেশে জমি রেজিস্ট্রি করতে কত টাকা লাগে? স্ট্যাম্প ডিউটি, রেজিস্ট্রেশন ফি, আইনজীবী ফি — সম্পূর্ণ খরচের তালিকা ও ক্যালকুলেটর ২০২৬।',
    keywords: [
      'জমি রেজিস্ট্রি খরচ ২০২৬',
      'land registration fee bangladesh 2026',
      'জমি রেজিস্ট্রেশন ফি',
      'জমি রেজিস্ট্রি করতে কত টাকা লাগে',
      'stamp duty bangladesh land'
    ],
    publishedDate: '2026-09-01',
    lastModified: '2026-09-01',
    readTime: '১৫ মিনিট',
    heroIntro: '<p>জমি কিনছেন? অনেকেই দলিলের মূল্য ছাড়া অন্য খরচের কথা ভুলে যান — এরপর রেজিস্ট্রি অফিসে গিয়ে হাজার হাজার টাকার জন্য হতাশ হন। স্ট্যাম্প ডিউটি, রেজিস্ট্রেশন ফি, ভ্যাট, গেইন ট্যাক্স — এই সব মিলিয়ে মোট কত হয় সেটা আগেই জেনে রাখুন। পরামর্শের জন্য: <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold">অ্যাডভোকেট মোঃ শাহ আলম</a> — <a href="tel:01712655546" style="color:var(--gold);font-weight:bold">📞 01712655546</a></p>',
    quickAnswer: {
      heading: '⚡ জমি রেজিস্ট্রির মোট খরচ — সংক্ষিপ্ত উত্তর',
      points: [
        'রেজিস্ট্রেশন ফি: দলিল মূল্যের ১%',
        'স্ট্যাম্প ডিউটি: দলিল মূল্যের ১.৫% (কৃষি) বা ৩% (অকৃষি)',
        'গেইন ট্যাক্স (ক্রেতা): দলিল মূল্যের ২%',
        'স্থানীয় সরকার কর: ৩% (পৌরসভায়) বা ২% (গ্রামে)',
        'আইনজীবী ফি: ২,০০০ – ১৫,০০০ টাকা (ঐচ্ছিক)'
      ]
    },
    toc: [
      'জমি রেজিস্ট্রিতে কত ধরনের খরচ আছে?',
      'স্ট্যাম্প ডিউটি — কত এবং কীভাবে দেবেন?',
      'রেজিস্ট্রেশন ফি ও গেইন ট্যাক্স',
      'স্থানীয় সরকার কর ও ভ্যাট',
      'সম্পূর্ণ খরচের উদাহরণ হিসাব',
      'কৃষি ও অকৃষি জমির পার্থক্য',
      'কোথায় এবং কীভাবে ফি দেবেন?',
      'আইনজীবীর পরামর্শ নিন'
    ],
    sections: [
      {
        heading: '১. জমি রেজিস্ট্রিতে কত ধরনের খরচ আছে?',
        content: `<p>অনেকে মনে করেন জমি রেজিস্ট্রি মানে শুধু সাব-রেজিস্ট্রি অফিসে একটা ফি দেওয়া। কিন্তু বাস্তবে ৫-৬ ধরনের আলাদা চার্জ দিতে হয়। এগুলো না জানলে বিপদে পড়বেন।</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:var(--accent);margin:0 0 1rem 0">📋 রেজিস্ট্রির সব ধরনের খরচ</h4>
<ul style="margin:0;padding-left:1.5rem;color:var(--text-secondary);line-height:2.2">
<li>১. <strong>স্ট্যাম্প ডিউটি</strong> (Stamp Duty) — সরকারি রাজস্ব, সবচেয়ে বড় অংশ</li>
<li>২. <strong>রেজিস্ট্রেশন ফি</strong> (Registration Fee) — সাব-রেজিস্ট্রি অফিসের ফি</li>
<li>৩. <strong>গেইন ট্যাক্স</strong> (Gain Tax / Capital Gains) — ক্রেতার উপর আরোপিত</li>
<li>৪. <strong>স্থানীয় সরকার কর</strong> — পৌরসভা বা ইউনিয়ন পরিষদের ট্যাক্স</li>
<li>৫. <strong>ভ্যাট</strong> (VAT on Stamp) — নির্দিষ্ট ক্ষেত্রে প্রযোজ্য</li>
<li>৬. <strong>আইনজীবী ও দলিল লেখক ফি</strong> — ঐচ্ছিক কিন্তু গুরুত্বপূর্ণ</li>
</ul>
</div>`
      },
      {
        heading: '২. স্ট্যাম্প ডিউটি — কত এবং কীভাবে দেবেন?',
        content: `<p>স্ট্যাম্প ডিউটি হলো সবচেয়ে বড় খরচ। ২০২৬ সালের নিয়ম অনুযায়ী এটি দলিলের মূল্যের উপর ভিত্তি করে নির্ধারণ হয়।</p>
<div style="overflow-x:auto;margin:1.25rem 0">
<table style="width:100%;border-collapse:collapse;font-size:0.95rem">
<thead><tr style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff">
<th style="padding:0.85rem 1rem;text-align:left">জমির ধরন</th>
<th style="padding:0.85rem 1rem;text-align:center">স্ট্যাম্প ডিউটি</th>
<th style="padding:0.85rem 1rem;text-align:left">মন্তব্য</th>
</tr></thead>
<tbody>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">কৃষি জমি (গ্রামে)</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center;font-weight:600;color:var(--accent)">১.৫%</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-size:0.85rem">দলিলের মোট মূল্যের উপর</td></tr>
<tr><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">অকৃষি/আবাসিক জমি</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center;font-weight:600;color:var(--accent)">৩%</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-size:0.85rem">শহর ও পৌর এলাকায়</td></tr>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">ফ্ল্যাট/অ্যাপার্টমেন্ট</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center;font-weight:600;color:var(--accent)">৩%</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-size:0.85rem">ঢাকায় অতিরিক্ত হতে পারে</td></tr>
<tr><td style="padding:0.85rem 1rem">হেবা/দান দলিল</td><td style="padding:0.85rem 1rem;text-align:center;font-weight:600;color:var(--accent)">০.৫%</td><td style="padding:0.85rem 1rem;font-size:0.85rem">কম খরচে দান করা যায়</td></tr>
</tbody>
</table>
</div>`
      },
      {
        heading: '৩. রেজিস্ট্রেশন ফি ও গেইন ট্যাক্স',
        content: `<p>রেজিস্ট্রেশন ফি ও গেইন ট্যাক্স দুটি আলাদা চার্জ। অনেকে এ দুটো এক মনে করেন।</p>
<div style="overflow-x:auto;margin:1.25rem 0">
<table style="width:100%;border-collapse:collapse;font-size:0.95rem">
<thead><tr style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff">
<th style="padding:0.85rem 1rem;text-align:left">চার্জের নাম</th>
<th style="padding:0.85rem 1rem;text-align:center">হার</th>
<th style="padding:0.85rem 1rem;text-align:left">কে দেয়?</th>
</tr></thead>
<tbody>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">রেজিস্ট্রেশন ফি</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center;font-weight:600;color:var(--accent)">দলিল মূল্যের ১%</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">ক্রেতা দেন</td></tr>
<tr><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">গেইন ট্যাক্স</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center;font-weight:600;color:var(--accent)">দলিল মূল্যের ২%</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">ক্রেতা দেন (কিন্তু অনেক সময় আলোচনায় বিক্রেতা)</td></tr>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem">উৎসে কর (TDS)</td><td style="padding:0.85rem 1rem;text-align:center;font-weight:600;color:var(--accent)">১-৮% (আয় অনুযায়ী)</td><td style="padding:0.85rem 1rem">বিক্রেতার আয়কর</td></tr>
</tbody>
</table>
</div>`
      },
      {
        heading: '৪. স্থানীয় সরকার কর ও ভ্যাট',
        content: `<p>এই দুটো চার্জের কথা অনেকে জানেন না, কিন্তু বিগত কয়েক বছরে এগুলো বেড়েছে।</p>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:1.25rem 0">
<div style="background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1.25rem">
<h4 style="color:var(--accent);margin:0 0 0.75rem 0">🏙️ পৌরসভা এলাকায়</h4>
<ul style="margin:0;padding-left:1.25rem;color:var(--text-secondary);line-height:1.9;font-size:0.9rem">
<li>স্থানীয় সরকার কর: <strong>৩%</strong></li>
<li>সিটি কর্পোরেশনে আলাদা হতে পারে</li>
<li>সরাসরি পৌরসভায় জমা দিতে হয়</li>
</ul>
</div>
<div style="background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1.25rem">
<h4 style="color:var(--accent);margin:0 0 0.75rem 0">🌾 গ্রামীণ এলাকায়</h4>
<ul style="margin:0;padding-left:1.25rem;color:var(--text-secondary);line-height:1.9;font-size:0.9rem">
<li>স্থানীয় সরকার কর: <strong>২%</strong></li>
<li>ইউনিয়ন পরিষদে জমা</li>
<li>কৃষি জমিতে কম</li>
</ul>
</div>
</div>`
      },
      {
        heading: '৫. সম্পূর্ণ খরচের উদাহরণ হিসাব',
        content: `<p>চলুন একটি বাস্তব উদাহরণ দিয়ে বুঝি। ধরুন আপনি ঢাকার পাশে ৫০ লক্ষ টাকার একটি জমি কিনছেন।</p>
<div style="overflow-x:auto;margin:1.25rem 0">
<table style="width:100%;border-collapse:collapse;font-size:0.95rem">
<thead><tr style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff">
<th style="padding:0.85rem 1rem;text-align:left">খরচের খাত</th>
<th style="padding:0.85rem 1rem;text-align:center">হার</th>
<th style="padding:0.85rem 1rem;text-align:right">৫০ লক্ষে পরিমাণ</th>
</tr></thead>
<tbody>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">স্ট্যাম্প ডিউটি (অকৃষি)</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center">৩%</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:right;font-weight:600;color:var(--accent)">১,৫০,০০০ টাকা</td></tr>
<tr><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">রেজিস্ট্রেশন ফি</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center">১%</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:right;font-weight:600;color:var(--accent)">৫০,০০০ টাকা</td></tr>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">গেইন ট্যাক্স</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center">২%</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:right;font-weight:600;color:var(--accent)">১,০০,০০০ টাকা</td></tr>
<tr><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">স্থানীয় সরকার কর</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center">৩%</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:right;font-weight:600;color:var(--accent)">১,৫০,০০০ টাকা</td></tr>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">আইনজীবী ও দলিল লেখক</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:center">—</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);text-align:right;font-weight:600;color:var(--accent)">৫,০০০ – ১৫,০০০ টাকা</td></tr>
</tbody>
<tfoot><tr style="background:linear-gradient(135deg,rgba(26,63,191,0.1),rgba(198,167,94,0.1))">
<td colspan="2" style="padding:1rem;font-weight:700;font-size:1.05rem">মোট আনুমানিক (৫০ লক্ষ টাকার জমি)</td>
<td style="padding:1rem;text-align:right;font-weight:700;color:var(--gold);font-size:1.1rem">≈ ৪,৫৫,০০০ – ৪,৬৫,০০০ টাকা</td>
</tr></tfoot>
</table>
</div>
<div style="background:rgba(220,53,69,0.08);border:1px solid rgba(220,53,69,0.3);border-radius:0.75rem;padding:1rem;margin:1rem 0">
<p style="margin:0"><strong>⚠️ সতর্কতা:</strong> উপরোক্ত হিসাব আনুমানিক। সরকারি নির্ধারিত "মৌজা রেট" (Mouza Rate) থেকে বেশি মূল্য হলে সরকারি রেটে ফি নেওয়া হবে।</p>
</div>`
      },
      {
        heading: '৬. কোথায় এবং কীভাবে ফি দেবেন?',
        content: `<p>রেজিস্ট্রি করতে সঠিক অনুক্রমে কাজ করতে হবে।</p>
<div style="margin:1.25rem 0">
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">১</div>
<div><h4 style="margin:0 0 0.4rem 0">দলিল তৈরি করুন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">আইনজীবী বা লাইসেন্সধারী দলিল লেখক দিয়ে সাফ কবলা দলিল তৈরি করুন।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">২</div>
<div><h4 style="margin:0 0 0.4rem 0">স্ট্যাম্প ডিউটি জমা দিন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">নিকটস্থ ব্যাংক (সোনালী/জনতা) অথবা অনলাইনে e-পেমেন্টের মাধ্যমে জমা দিন।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">৩</div>
<div><h4 style="margin:0 0 0.4rem 0">সাব-রেজিস্ট্রি অফিসে দলিল দাখিল করুন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">সব কাগজপত্র সহ নির্ধারিত সাব-রেজিস্ট্রি অফিসে ক্রেতা ও বিক্রেতা উভয়কে যেতে হবে।</p></div>
</div>
</div>`
      },
      {
        heading: '৭. আইনজীবীর পরামর্শ নিন',
        content: `<div style="background:linear-gradient(135deg,rgba(26,63,191,0.08),rgba(198,167,94,0.08));padding:1.5rem;border-radius:1rem;border:1px solid var(--gold);margin:1.5rem 0">
<h3 style="margin:0 0 0.75rem 0;color:var(--text)">⚖️ জমি রেজিস্ট্রিতে আইনি সহায়তা</h3>
<p style="margin:0 0 1.25rem 0;color:var(--text-secondary);line-height:1.8">দলিল তৈরি থেকে রেজিস্ট্রি সম্পন্ন করা পর্যন্ত অ্যাডভোকেট মোঃ শাহ আলম আপনাকে গাইড করবেন। জমির সঠিক যাচাই ও নিরাপদ রেজিস্ট্রির জন্য যোগাযোগ করুন।</p>
<div style="display:flex;gap:1rem;flex-wrap:wrap">
<a href="tel:01712655546" style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">📞 কল করুন: 01712655546</a>
<a href="https://wa.me/8801712655546" target="_blank" style="background:#25D366;color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">💬 WhatsApp</a>
</div>
</div>`
      }
    ],
    faqs: [
      { question: '৫০ লক্ষ টাকার জমি রেজিস্ট্রি করতে মোট কত টাকা লাগবে?', answer: 'স্ট্যাম্প ডিউটি, রেজিস্ট্রেশন ফি, গেইন ট্যাক্স ও স্থানীয় কর মিলিয়ে প্রায় ৪.৫ – ৪.৭ লক্ষ টাকা লাগবে (জমির ধরন ও এলাকা অনুযায়ী পরিবর্তন হতে পারে)।' },
      { question: 'কৃষি জমি রেজিস্ট্রিতে কি কম খরচ হয়?', answer: 'হ্যাঁ, কৃষি জমিতে স্ট্যাম্প ডিউটি ১.৫% — অকৃষি জমির (৩%) তুলনায় কম। তাই কৃষি জমি রেজিস্ট্রি সাশ্রয়ী।' },
      { question: 'গেইন ট্যাক্স কি ক্রেতা না বিক্রেতা দেয়?', answer: 'আইন অনুযায়ী গেইন ট্যাক্স ক্রেতাই দেন। তবে ব্যবহারিকভাবে দুই পক্ষের মধ্যে আলোচনায় নির্ধারিত হয়।' },
      { question: 'অনলাইনে রেজিস্ট্রি ফি দেওয়া যায় কি?', answer: 'হ্যাঁ, eporcha.gov.bd পোর্টালে অনলাইনে স্ট্যাম্প ডিউটি ও কিছু ফি দেওয়ার সুবিধা আছে। তবে সব জেলায় এখনও পুরোপুরি চালু হয়নি।' },
      { question: 'রেজিস্ট্রি ছাড়া জমি কেনা কি নিরাপদ?', answer: 'একদম না। বায়না চুক্তি থাকলেও রেজিস্ট্রি না হলে আইনগতভাবে জমি আপনার নামে আসে না। রেজিস্ট্রি ছাড়া জমি কিনলে পরে বিপদে পড়বেন।' }
    ],
    featured: true,
    impressions: 256,
    clicks: 2
  }
},

// ============================================================
// ARTICLE 3: সাইবার ক্রাইম অভিযোগ করার সম্পূর্ণ নিয়ম ২০২৬
// ============================================================
{
  file: 'cyber-crime-abiyog-korar-poripurno-niyom-2026.json',
  data: {
    slug: 'cyber-crime-abiyog-korar-poripurno-niyom-2026',
    category: 'সাইবার আইন',
    title: 'সাইবার ক্রাইম অভিযোগ কোথায় ও কীভাবে করবেন? সম্পূর্ণ গাইড ২০২৬',
    metaTitle: 'সাইবার ক্রাইম অভিযোগ করার নিয়ম ২০২৬ | অনলাইনে কীভাবে রিপোর্ট করবেন?',
    metaDescription: 'সাইবার ক্রাইম অভিযোগ কোথায় করবেন? পুলিশ সাইবার ক্রাইম ইউনিট, BTRC, অনলাইন পোর্টাল — ধাপে ধাপে সম্পূর্ণ প্রক্রিয়া বাংলায় ২০২৬।',
    keywords: [
      'সাইবার ক্রাইম অভিযোগ করার নিয়ম',
      'cyber crime complaint online bangladesh',
      'সাইবার ক্রাইম রিপোর্ট করার উপায়',
      'পুলিশ সাইবার ক্রাইম ইউনিট',
      'ডিজিটাল নিরাপত্তা আইনে মামলা'
    ],
    publishedDate: '2026-09-01',
    lastModified: '2026-09-01',
    readTime: '১২ মিনিট',
    heroIntro: '<p>আপনার ফেসবুক আইডি হ্যাক হয়েছে? অনলাইনে কেউ আপনার ছবি দিয়ে ব্ল্যাকমেইল করছে? bKash/Nagad থেকে টাকা চুরি গেছে? — এগুলো সব সাইবার ক্রাইম। কিন্তু অনেকেই জানেন না কোথায় যাবেন, কীভাবে অভিযোগ করবেন। এই আর্টিকেলে সম্পূর্ণ প্রক্রিয়া বাংলায় বলা হয়েছে। সাহায্যের জন্য: <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold">অ্যাডভোকেট মোঃ শাহ আলম</a> — <a href="tel:01712655546" style="color:var(--gold);font-weight:bold">📞 01712655546</a></p>',
    quickAnswer: {
      heading: '⚡ সাইবার ক্রাইম অভিযোগ — দ্রুত উপায়',
      points: [
        'অনলাইনে: cybercrime.gov.bd — ২৪ ঘণ্টা অভিযোগ করা যায়',
        'হটলাইন: 999 (জরুরি) বা পুলিশ সাইবার সাপোর্ট সেন্টার: 01320000888',
        'BTRC: btrc.gov.bd — অনলাইন সংক্রান্ত অভিযোগ',
        'সরাসরি থানায়: ডিজিটাল নিরাপত্তা আইনে মামলা',
        'সিআইডি সাইবার ক্রাইম ইউনিট: শাহবাগ, ঢাকা'
      ]
    },
    toc: [
      'সাইবার ক্রাইম কি কি অপরাধ?',
      'কোথায় অভিযোগ করবেন — ৫টি জায়গা',
      'cybercrime.gov.bd পোর্টালে কীভাবে অভিযোগ করবেন?',
      'থানায় সরাসরি মামলা করার নিয়ম',
      'সাইবার ক্রাইম মামলায় কী কী প্রমাণ লাগে?',
      'ভুক্তভোগী নারীদের জন্য বিশেষ সুবিধা',
      'কতদিনের মধ্যে অভিযোগ করতে হবে?',
      'আইনজীবীর সহায়তা নিন'
    ],
    sections: [
      {
        heading: '১. সাইবার ক্রাইম কি কি অপরাধ?',
        content: `<p>সাইবার ক্রাইম শুধু হ্যাকিং নয় — অনেক ধরনের অনলাইন অপরাধ এর আওতায় পড়ে।</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:var(--accent);margin:0 0 1rem 0">📋 সাধারণ সাইবার অপরাধসমূহ</h4>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem">
<div style="background:rgba(220,53,69,0.06);border-radius:0.5rem;padding:0.75rem;font-size:0.9rem;color:var(--text-secondary)">🔐 ফেসবুক/ইমেইল হ্যাকিং</div>
<div style="background:rgba(220,53,69,0.06);border-radius:0.5rem;padding:0.75rem;font-size:0.9rem;color:var(--text-secondary)">📸 অশ্লীল ছবি/ভিডিও ছড়ানো</div>
<div style="background:rgba(220,53,69,0.06);border-radius:0.5rem;padding:0.75rem;font-size:0.9rem;color:var(--text-secondary)">💰 bKash/Nagad প্রতারণা</div>
<div style="background:rgba(220,53,69,0.06);border-radius:0.5rem;padding:0.75rem;font-size:0.9rem;color:var(--text-secondary)">🎭 ভুয়া ফেসবুক আইডি তৈরি</div>
<div style="background:rgba(220,53,69,0.06);border-radius:0.5rem;padding:0.75rem;font-size:0.9rem;color:var(--text-secondary)">😰 অনলাইন ব্ল্যাকমেইল</div>
<div style="background:rgba(220,53,69,0.06);border-radius:0.5rem;padding:0.75rem;font-size:0.9rem;color:var(--text-secondary)">🛒 অনলাইন শপিং প্রতারণা</div>
<div style="background:rgba(220,53,69,0.06);border-radius:0.5rem;padding:0.75rem;font-size:0.9rem;color:var(--text-secondary)">🏦 ইন্টারনেট ব্যাংকিং জালিয়াতি</div>
<div style="background:rgba(220,53,69,0.06);border-radius:0.5rem;padding:0.75rem;font-size:0.9rem;color:var(--text-secondary)">📱 সাইবারস্টকিং/হয়রানি</div>
</div>
</div>`
      },
      {
        heading: '২. কোথায় অভিযোগ করবেন — ৫টি জায়গা',
        content: `<p>বাংলাদেশে সাইবার ক্রাইম অভিযোগের জন্য ৫টি প্রধান জায়গা আছে। অপরাধের ধরন অনুযায়ী সঠিক জায়গায় যাওয়া উচিত।</p>
<div style="margin:1.25rem 0">
<div style="background:var(--surface);border:1px solid var(--card-border);border-left:4px solid var(--accent);border-radius:0.75rem;padding:1.25rem;margin-bottom:1rem">
<h4 style="color:var(--accent);margin:0 0 0.5rem 0">🌐 ১. cybercrime.gov.bd অনলাইন পোর্টাল</h4>
<p style="margin:0;color:var(--text-secondary);font-size:0.9rem;line-height:1.8">সবচেয়ে সহজ পদ্ধতি। ঘরে বসেই ২৪ ঘণ্টা অভিযোগ দায়ের করা যায়। ইমেইল/ফোন নম্বর দিয়ে রেজিস্ট্রেশন করে অভিযোগ ফরম পূরণ করুন।</p>
</div>
<div style="background:var(--surface);border:1px solid var(--card-border);border-left:4px solid #28a745;border-radius:0.75rem;padding:1.25rem;margin-bottom:1rem">
<h4 style="color:#28a745;margin:0 0 0.5rem 0">📞 ২. পুলিশ সাইবার সাপোর্ট সেন্টার</h4>
<p style="margin:0;color:var(--text-secondary);font-size:0.9rem;line-height:1.8">হটলাইন: <strong>01320000888</strong> — সরাসরি ফোন করুন। বিশেষ করে নারী ও শিশুদের সাইবার হয়রানির ক্ষেত্রে দ্রুত সাড়া পাওয়া যায়।</p>
</div>
<div style="background:var(--surface);border:1px solid var(--card-border);border-left:4px solid var(--gold);border-radius:0.75rem;padding:1.25rem;margin-bottom:1rem">
<h4 style="color:var(--gold);margin:0 0 0.5rem 0">🏛️ ৩. সিআইডি সাইবার ক্রাইম ইউনিট (ঢাকা)</h4>
<p style="margin:0;color:var(--text-secondary);font-size:0.9rem;line-height:1.8">গুরুতর মামলার জন্য সিআইডি (শাহবাগ, ঢাকা) সরাসরি যান। হ্যাকিং, বড় আর্থিক প্রতারণা এখানে দেখা হয়।</p>
</div>
<div style="background:var(--surface);border:1px solid var(--card-border);border-left:4px solid #6f42c1;border-radius:0.75rem;padding:1.25rem;margin-bottom:1rem">
<h4 style="color:#6f42c1;margin:0 0 0.5rem 0">📡 ৪. BTRC</h4>
<p style="margin:0;color:var(--text-secondary);font-size:0.9rem;line-height:1.8">ইন্টারনেট সেবা সংক্রান্ত সমস্যা বা অনলাইন কন্টেন্ট বন্ধ করার আবেদনের জন্য BTRC (btrc.gov.bd)।</p>
</div>
<div style="background:var(--surface);border:1px solid var(--card-border);border-left:4px solid #fd7e14;border-radius:0.75rem;padding:1.25rem">
<h4 style="color:#fd7e14;margin:0 0 0.5rem 0">🚔 ৫. স্থানীয় থানায় মামলা</h4>
<p style="margin:0;color:var(--text-secondary);font-size:0.9rem;line-height:1.8">ডিজিটাল নিরাপত্তা আইন (সাইবার সুরক্ষা আইন ২০২৩)-এ সরাসরি থানায় মামলা করা যায়। তবে আইনজীবীর পরামর্শ নিয়ে যাওয়া ভালো।</p>
</div>
</div>`
      },
      {
        heading: '৩. cybercrime.gov.bd পোর্টালে কীভাবে অভিযোগ করবেন?',
        content: `<p>পোর্টালে অভিযোগ করতে মাত্র ১৫-২০ মিনিট সময় লাগে। ধাপগুলো নিচে দেওয়া হলো:</p>
<div style="margin:1.25rem 0">
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">১</div>
<div><h4 style="margin:0 0 0.4rem 0">cybercrime.gov.bd-এ যান</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">"অভিযোগ করুন" বা "Report a Crime" বাটনে ক্লিক করুন।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">২</div>
<div><h4 style="margin:0 0 0.4rem 0">অপরাধের ধরন বেছে নিন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">ড্রপডাউন থেকে আপনার সাথে কী ধরনের অপরাধ হয়েছে সেটি বেছে নিন।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">৩</div>
<div><h4 style="margin:0 0 0.4rem 0">বিবরণ লিখুন ও স্ক্রিনশট আপলোড করুন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">কী হয়েছে তা বিস্তারিত লিখুন। সম্ভব হলে স্ক্রিনশট, ভিডিও, বার্তার কপি সংযুক্ত করুন।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--gold);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">৪</div>
<div><h4 style="margin:0 0 0.4rem 0">সাবমিট করুন ও ট্র্যাকিং নম্বর সংগ্রহ করুন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">ফরম জমা দিলে একটি অভিযোগ নম্বর পাবেন। এটি দিয়ে পরবর্তী অগ্রগতি ট্র্যাক করা যাবে।</p></div>
</div>
</div>`
      },
      {
        heading: '৪. সাইবার ক্রাইম মামলায় কী কী প্রমাণ লাগে?',
        content: `<p>সাইবার ক্রাইম মামলায় প্রমাণ সংগ্রহ খুব গুরুত্বপূর্ণ। অনেকে অপরাধের পর প্রমাণ নষ্ট করেন বা থানা পুলিশ দেরিতে আসার আগেই ডিলিট হয়ে যায়।</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:var(--accent);margin:0 0 1rem 0">📎 গুরুত্বপূর্ণ প্রমাণ সংগ্রহ করুন</h4>
<ul style="margin:0;padding-left:1.5rem;color:var(--text-secondary);line-height:2">
<li><strong>স্ক্রিনশট:</strong> হুমকির বার্তা, অশ্লীল কন্টেন্ট, প্রতারণার প্রমাণ</li>
<li><strong>URL লিংক:</strong> আপত্তিকর পোস্ট বা পেজের সম্পূর্ণ লিংক</li>
<li><strong>ব্যাংক ট্রান্জেকশন:</strong> টাকা স্থানান্তরের রসিদ ও বিবরণ</li>
<li><strong>ফোন নম্বর/ইমেইল:</strong> অপরাধী যে নম্বর বা ইমেইল থেকে যোগাযোগ করেছে</li>
<li><strong>চ্যাট হিস্ট্রি:</strong> WhatsApp/Messenger-এর কথোপকথনের কপি</li>
</ul>
</div>
<div style="background:rgba(198,167,94,0.1);border:1px solid var(--gold);border-radius:0.75rem;padding:1rem;margin:1rem 0">
<p style="margin:0"><strong>💡 গুরুত্বপূর্ণ:</strong> অপরাধ ঘটার সঙ্গে সঙ্গেই প্রমাণ সংগ্রহ করুন। পরে আপলোড বা পোস্ট ডিলিট হয়ে গেলে প্রমাণ পাওয়া কঠিন হয়।</p>
</div>`
      },
      {
        heading: '৫. ভুক্তভোগী নারীদের জন্য বিশেষ সুবিধা',
        content: `<p>সাইবার হয়রানির শিকার নারীদের জন্য বিশেষ ব্যবস্থা আছে বাংলাদেশ পুলিশে।</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<ul style="margin:0;padding-left:1.5rem;color:var(--text-secondary);line-height:2">
<li><strong>পুলিশ সাইবার সাপোর্ট ফর উইমেন (PCSW):</strong> শুধু নারীদের জন্য বিশেষ হেল্পলাইন</li>
<li><strong>মহিলা পুলিশ অফিসার:</strong> থানায় মহিলা অফিসারের কাছে অভিযোগ করার সুবিধা</li>
<li><strong>বেনামে অভিযোগ:</strong> cybercrime.gov.bd-এ পরিচয় গোপন রেখেও অভিযোগ করা যায়</li>
<li><strong>দ্রুত ব্যবস্থা:</strong> নারী নির্যাতন সংক্রান্ত সাইবার ক্রাইমে দ্রুত পদক্ষেপ নেওয়া হয়</li>
</ul>
</div>`
      },
      {
        heading: '৬. আইনি সহায়তা নিন',
        content: `<div style="background:linear-gradient(135deg,rgba(26,63,191,0.08),rgba(198,167,94,0.08));padding:1.5rem;border-radius:1rem;border:1px solid var(--gold);margin:1.5rem 0">
<h3 style="margin:0 0 0.75rem 0;color:var(--text)">⚖️ সাইবার ক্রাইমে আইনি সহায়তা</h3>
<p style="margin:0 0 1.25rem 0;color:var(--text-secondary);line-height:1.8">সাইবার ক্রাইমের শিকার হলে একা লড়াই না করে আইনজীবীর সাহায্য নিন। অ্যাডভোকেট মোঃ শাহ আলম সাইবার আইন মামলায় অভিজ্ঞ।</p>
<div style="display:flex;gap:1rem;flex-wrap:wrap">
<a href="tel:01712655546" style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">📞 কল করুন: 01712655546</a>
<a href="https://wa.me/8801712655546" target="_blank" style="background:#25D366;color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">💬 WhatsApp</a>
</div>
</div>`
      }
    ],
    faqs: [
      { question: 'সাইবার ক্রাইম অভিযোগ করতে কি থানায় যেতে হবে?', answer: 'না। cybercrime.gov.bd-এ অনলাইনে ঘরে বসেই অভিযোগ করা যায়। গুরুতর মামলায় পরে সিআইডি বা থানায় যাওয়ার প্রয়োজন হতে পারে।' },
      { question: 'অভিযোগের পর কতদিনে ব্যবস্থা নেওয়া হয়?', answer: 'সাধারণত ৭-১৪ দিনের মধ্যে তদন্ত শুরু হয়। তবে জরুরি পরিস্থিতিতে (মানসিক নির্যাতন, শিশু সংশ্লিষ্ট) দ্রুত ব্যবস্থা নেওয়া হয়।' },
      { question: 'প্রমাণ না থাকলে কি অভিযোগ করা যাবে?', answer: 'হ্যাঁ, তবে প্রমাণ থাকলে মামলা শক্তিশালী হয়। অভিযোগ জমা দেওয়ার পর তদন্তকারী কর্মকর্তা প্রমাণ সংগ্রহে সাহায্য করেন।' },
      { question: 'অপরাধী বিদেশে থাকলে কী করব?', answer: 'সাইবার ক্রাইমে Mutual Legal Assistance Treaty (MLAT) এর মাধ্যমে বিদেশে অপরাধী থাকলেও তদন্ত হতে পারে। তবে এটি জটিল প্রক্রিয়া — আইনজীবীর সাহায্য নিন।' },
      { question: 'ভুয়া ফেসবুক আইডি রিপোর্ট করব কীভাবে?', answer: 'প্রথমে Facebook-এ সরাসরি রিপোর্ট করুন। একই সাথে cybercrime.gov.bd বা পুলিশ সাইবার সাপোর্টে অভিযোগ করুন — উভয় পদক্ষেপ একসাথে কার্যকর।' }
    ],
    featured: true,
    impressions: 155,
    clicks: 0
  }
}

];

// Write all articles
let successCount = 0;
for (const article of articles) {
  const filePath = path.join(bnDir, article.file);
  fs.writeFileSync(filePath, JSON.stringify(article.data, null, 2), 'utf8');
  console.log(`✅ Created: ${article.file}`);
  successCount++;
}

console.log(`\n🎉 Created ${successCount}/${articles.length} articles`);
