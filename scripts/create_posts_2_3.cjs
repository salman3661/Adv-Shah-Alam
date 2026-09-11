const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'src', 'content', 'posts', 'bn');

const posts = [
  // ==========================================
  // POST 2: Jomi Registry Khoroch Calculator 2026
  // ==========================================
  {
    slug: 'jomi-registry-khoroch-calculator-gazette-hisab-2026',
    category: 'ভূমি আইন',
    title: 'জমি রেজিস্ট্রি খরচ কত ২০২৬ ও ক্যালকুলেটর হিসাব — নতুন সরকারি গেজেট, স্ট্যাম্প ডিউটি, উৎসে কর ও দলিল লেখার নিয়ম',
    metaTitle: 'জমি রেজিস্ট্রি খরচ কত ২০২৬ ও ক্যালকুলেটর হিসাব | Land Registration Fee BD',
    metaDescription: '২০২৬ সালে জমি রেজিস্ট্রির সরকারি খরচ কত? নতুন গেজেট অনুযায়ী স্ট্যাম্প ডিউটি, রেজিস্ট্রেশন ফি, উৎসে কর ও পৌরসভা/ইউনিয়ন ভিত্তিক সম্পূর্ণ গাণিতিক হিসাব।',
    keywords: [
      'জমি রেজিস্ট্রি খরচ কত 2026',
      'জমি রেজিস্ট্রি খরচ ক্যালকুলেটর 2026',
      'জমি রেজিস্ট্রি খরচ 2026 গেজেট',
      'land registration fee in bangladesh 2026',
      'পৌরসভার জমি রেজিস্ট্রি খরচ ২০২৬',
      'দলিল রেজিস্ট্রেশন ফি ২০২৬',
      'জমির উৎসে কর হিসাব ২০২৩ ২০২৬'
    ],
    publishedDate: '2026-09-11',
    lastModified: '2026-09-11',
    readTime: '১৯ মিনিট',
    heroIntro: '<p>বাংলাদেশে জমি ক্রয়-বিক্রয়ের ক্ষেত্রে সবচেয়ে গুরুত্বপূর্ণ ও ব্যয়বহুল অধ্যায় হলো সাব-রেজিস্ট্রি অফিসে জমি সাফ-কবলা দলিল রেজিস্ট্রেশন করা। ২০২৬ সালের সংশোধিত ভূমি রাজস্ব আইন, স্ট্যাম্প আইন ও অর্থ আইনের নতুন গেজেট অনুযায়ী জমি রেজিস্ট্রির ফি কাঠামো ও উৎসে আয়করে (Source Tax) উল্লেখযোগ্য পরিবর্তন আনা হয়েছে। সিটি কর্পোরেশন, জেলা সদর পৌরসভা, সাধারণ পৌরসভা এবং ইউনিয়ন পরিষদ এলাকার জন্য সরকারি ফির শতকরা হারে পার্থক্য রয়েছে। সঠিক আইনানুগ হিসাব না জানার কারণে সাধারণ ক্রেতারা প্রায়শই সাব-রেজিস্ট্রি অফিসের একশ্রেণীর অসাধু চক্র ও দালালের খপ্পরে পড়ে অতিরিক্ত লাখ লাখ টাকা গচ্চা দেন। জমি রেজিস্ট্রির প্রতিটি আইনি ফি, স্ট্যাম্প শুল্ক, স্থানীয় সরকার কর এবং উৎসে আয়করের পূর্ণাঙ্গ গাণিতিক ক্যালকুলেটর হিসাব নিচে বিস্তারিত বিশ্লেষণ করা হলো। জমি ক্রয়ের পূর্বে দলিল ভেটিং ও আইনি পরামর্শের জন্য যোগাযোগ করুন: <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold">অ্যাডভোকেট মোঃ শাহ আলম</a> — <a href="tel:01712655546" style="color:var(--gold);font-weight:bold">📞 01712655546</a></p>',
    quickAnswer: {
      heading: '⚡ জমি রেজিস্ট্রি খরচ ২০২৬ — এক নজরে সারসংক্ষেপ',
      points: [
        'রেজিস্ট্রেশন ফি: দলিলের মোট মূল্যের ১% (নূন্যতম ১০০ টাকা)।',
        'স্ট্যাম্প ডিউটি (Stamp Duty): দলিলের মোট মূল্যের ১.৫% (সংশোধিত স্ট্যাম্প আইন)।',
        'স্থানীয় সরকার কর: সিটি কর্পোরেশন ও পৌরসভায় ৩%, সাধারণ ইউনিয়ন পরিষদ এলাকায় ২% থেকে ৩%।',
        'উৎসে আয়কর (Section 53FF): এলাকাভেদে শতাংশ হারে বা জমির আয়তন অনুযায়ী নির্দিষ্ট স্ল্যাবে প্রদেয় (ইউনিয়ন পর্যায়ে ১%-২%, মেট্রোপলিটন এলাকায় ৪%-৮%)।',
        "বিবিধ সরকারি ফি: হলফনামা স্ট্যাম্প ৩০০/-, এন-ফি (প্রতি পাতা ১৬/-), ই-ফি ১০০/-, এনএন-ফি ২৪/- এবং ল'ইয়ার্স বেনিভোলেন্ট ফি।"
      ]
    },
    toc: [
      '১. জমি রেজিস্ট্রেশনের আইনগত ভিত্তি ও ২০২৬ সালের নতুন সরকারি গেজেট',
      '২. জমি রেজিস্ট্রিতে প্রদেয় ৭টি প্রধান সরকারি ফি ও করের পূর্ণাঙ্গ তালিকা',
      '৩. এলাকাভিত্তিক জমি রেজিস্ট্রি খরচ শতকরা হার: সিটি, পৌরসভা ও ইউনিয়ন',
      '৪. আয়কর আইন ২০২৩ এর ৫৩এফএফ ধারা অনুযায়ী উৎসে করের (Source Tax) নতুন স্ল্যাব',
      '৫. ১ কোটি টাকা মূল্যের জমির পূর্ণাঙ্গ গাণিতিক রেজিস্ট্রি খরচ ক্যালকুলেটর চার্ট',
      '৬. সাফ-কবলা, হেবা ও এওয়াজ দলিলের খরচের তুলনামূলক পার্থক্য',
      '৭. সাব-রেজিস্ট্রি অফিসে রেজিস্ট্রির পূর্বে বাধ্যতামূলক কাগজপত্রের চেকলিস্ট',
      '৮. সরকারি ফির অতিরিক্ত অবৈধ টাকা দাবি করলে আইনি প্রতিকার ও অভিযোগের উপায়',
      '৯. রেজিস্ট্রি সম্পন্ন হওয়ার পর মূল দলিল ও সার্টিফাইড নকল (Certified Copy) উত্তোলনের নিয়ম',
      '১০. প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী (FAQ)',
      '১১. জমি ক্রয় ও দলিল সম্পাদনে সুপ্রিম কোর্টের বিজ্ঞ আইনজীবীর পরামর্শ'
    ],
    sections: [
      {
        heading: '১. জমি রেজিস্ট্রেশনের আইনগত ভিত্তি ও ২০২৬ সালের নতুন সরকারি গেজেট',
        content: `<p>বাংলাদেশে স্থাবর সম্পত্তি হস্তান্তর আইন ১৮৮২ (Transfer of Property Act, 1882) এর ৫৪ ধারা এবং রেজিস্ট্রেশন আইন ১৯০৮ (Registration Act, 1908) এর ১৭ ধারা অনুযায়ী ১০০ টাকার অধিক মূল্যের যেকোনো স্থাবর সম্পত্তির হস্তান্তর লিখিত ও রেজিস্ট্রিকৃত দলিলের মাধ্যমে সম্পন্ন করা আইনত বাধ্যতামূলক। আনরেজিস্টার্ড বা মৌখিক কোনো দলিলের মাধ্যমে সম্পত্তির বৈধ স্বত্ব কখনো অর্জিত হয় না।</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-left:4px solid var(--accent);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:var(--accent);margin:0 0 0.75rem 0">📌 সরকারি বাজারমূল্য (মৌজা রেট) বনাম প্রকৃত লেনদেন মূল্য</h4>
<p style="margin:0;color:var(--text-secondary);line-height:1.9">আইন অনুযায়ী, প্রতি বছর সংশ্লিষ্ট সাব-রেজিস্ট্রি অফিস প্রতিটি মৌজার জন্য ভূমির সর্বনিম্ন সরকারি মূল্য বা 'মৌজা রেট' (Minimum Market Value) নির্ধারণ করে গেজেট প্রকাশ করে। আপনি যদি প্রকৃত চুক্তি মূল্যের চেয়ে কম দামে দলিল রেজিস্ট্রি করার চেষ্টা করেন, তবুও সরকার নির্ধারিত মৌজা রেটের চেয়ে কম মূল্যে দলিল রেজিস্ট্রি করা যাবে না। দলিলের মোট মূল্য হবে: (জমির পরিমাণ × উক্ত মৌজার প্রতি শতাংশের নির্ধারিত রেট) অথবা প্রকৃত লেনদেন মূল্য—এই দুইটির মধ্যে যেটি বেশি, সেই মূল্যের ওপর সমস্ত সরকারি ফি আরোপিত হবে।</p>
</div>
<p>২০২৬ সালের নতুন অর্থ আইনে উৎসে আয়কর এবং স্থানীয় সরকার করের ক্ষেত্রে এলাকাভিত্তিক সুস্পষ্ট বিন্যাস আনা হয়েছে যাতে রাজস্ব ফাঁকি রোধ করা যায় এবং প্রকৃত ক্রেতারা কোনো ধরনের প্রশাসনিক হয়রানির শিকার না হন।</p>`
      },
      {
        heading: '২. জমি রেজিস্ট্রিতে প্রদেয় ৭টি প্রধান সরকারি ফি ও করের পূর্ণাঙ্গ তালিকা',
        content: `<p>জমি রেজিস্ট্রি করার সময় কোনো একক এককালীন ফি নেওয়া হয় না, বরং একাধিক সরকারি দপ্তর ও তহবিলের জন্য সুনির্দিষ্ট কিছু কর ও ফি চালানের মাধ্যমে ব্যাংকে জমা দিতে হয়। এই ৭টি প্রধান ফি হলো:</p>
<ul style="padding-left:1.5rem;color:var(--text-secondary);line-height:2.2">
  <li><strong>১. রেজিস্ট্রেশন ফি (Registration Fee):</strong> রেজিস্ট্রেশন আইন অনুযায়ী দলিলের মোট মূল্যের <strong>১%</strong> সরকারি ফি হিসেবে জমা দিতে হয়। জমি হস্তান্তর ফি খাতে এটি ট্রেজারি চালানে পরিশোধিত হয়।</li>
  <li><strong>২. স্ট্যাম্প শুল্ক (Stamp Duty):</strong> স্ট্যাম্প আইন ১৮৯৯ (সংশোধিত) অনুযায়ী দলিলের মূল্যের <strong>১.৫%</strong> হারে স্ট্যাম্প ডিউটি ধার্য হয়। এটি সরকার কর্তৃক অনুমোদিত নন-জুডিশিয়াল স্ট্যাম্পের মাধ্যমে সমন্বয় করা হয়।</li>
  <li><strong>৩. স্থানীয় সরকার কর (Local Government Tax):</strong> সিটি কর্পোরেশন, পৌরসভা, জেলা পরিষদ কিংবা উপজেলা পরিষদের উন্নয়নের জন্য এলাকাভেদে <strong>২% থেকে ৩%</strong> পর্যন্ত স্থানীয় সরকার কর বাধ্যতামূলক।</li>
  <li><strong>৪. উৎসে আয়কর (Source Tax - Sec 53FF):</strong> জাতীয় রাজস্ব বোর্ড (NBR) কর্তৃক নির্ধারিত আয়কর আইন অনুযায়ী জমি বিক্রেতার পক্ষ থেকে উৎসে কর কর্তন করে চালানে জমা দেওয়া হয়।</li>
  <li><strong>৫. হলফনামা স্ট্যাম্প ফি (Affidavit Fee):</strong> সম্পত্তি হস্তান্তরকালে বিক্রেতা স্বত্ব সম্পর্কে যে হলফনামা দেন, তার জন্য ৩০০ টাকার নন-জুডিশিয়াল স্ট্যাম্প প্রয়োজন হয়।</li>
  <li><strong>৬. ই-ফি ও এন-ফি (E-Fee & N-Fee):</strong> ইলেকট্রনিক সার্ভিস চার্জ বাবদ ১০০ টাকা এবং বালাম বইয়ে দলিলের অনুলিপিকরণের জন্য প্রতি ৩০০ শব্দ বা ১ পাতার জন্য ১৬ টাকা হারে এন-ফি প্রযোজ্য।</li>
  <li><strong>৭. জেলা আইনজীবী সমিতি ও বালাম তল্লাশি ফি:</strong> আইনজীবী কল্যাণ ফি এবং সংশ্লিষ্ট মৌজার বালাম রেকর্ড তল্লাশির জন্য সরকারি এনএন-ফি (প্রতি পাতা ২৪/-) জমা দিতে হয়।</li>
</ul>`
      },
      {
        heading: '৩. এলাকাভিত্তিক জমি রেজিস্ট্রি খরচ শতকরা হার: সিটি, পৌরসভা ও ইউনিয়ন',
        content: `<p>জমিটি কোন প্রশাসনিক এলাকায় অবস্থিত তার ওপর ভিত্তি করে মোট খরচের শতকরা হারে তারতম্য ঘটে। নিচে ২০২৬ সালের হালনাগাদ গেজেট অনুযায়ী এলাকাভিত্তিক তুলনামূলক শতাংশের তালিকা দেওয়া হলো:</p>
<div style="overflow-x:auto;margin:1.5rem 0">
<table style="width:100%;border-collapse:collapse;font-size:0.95rem;background:var(--surface)">
<thead>
<tr style="background:linear-gradient(135deg,#0F172A,#1E293B);color:#fff">
  <th style="padding:12px 14px;text-align:left;border:1px solid var(--card-border)">এলাকার ধরন</th>
  <th style="padding:12px 14px;text-align:center;border:1px solid var(--card-border)">রেজিস্ট্রি ফি</th>
  <th style="padding:12px 14px;text-align:center;border:1px solid var(--card-border)">স্ট্যাম্প ডিউটি</th>
  <th style="padding:12px 14px;text-align:center;border:1px solid var(--card-border)">স্থানীয় সরকার কর</th>
  <th style="padding:12px 14px;text-align:center;border:1px solid var(--card-border)">মোট সাধারণ সরকারি ফি</th>
</tr>
</thead>
<tbody>
<tr>
  <td style="padding:10px 14px;border:1px solid var(--card-border);font-weight:bold">ঢাকা, চট্টগ্রাম ও অন্যান্য সিটি কর্পোরেশন</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border);text-align:center">১.০০%</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border);text-align:center">১.৫০%</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border);text-align:center">৩.০০%</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border);text-align:center;font-weight:bold;color:var(--accent)">৫.৫০% + উৎসে কর</td>
</tr>
<tr style="background:rgba(0,0,0,0.02)">
  <td style="padding:10px 14px;border:1px solid var(--card-border);font-weight:bold">জেলা সদর পৌরসভা ও বিশেষায়িত পৌর এলাকা</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border);text-align:center">১.০০%</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border);text-align:center">১.৫০%</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border);text-align:center">২.০০% - ৩.০০%</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border);text-align:center;font-weight:bold;color:var(--accent)">৪.৫০% - ৫.৫০% + উৎসে কর</td>
</tr>
<tr>
  <td style="padding:10px 14px;border:1px solid var(--card-border);font-weight:bold">উপজেলা সাধারণ পৌরসভা এলাকা</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border);text-align:center">১.০০%</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border);text-align:center">১.৫০%</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border);text-align:center">২.০০%</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border);text-align:center;font-weight:bold;color:var(--accent)">৪.৫০% + উৎসে কর</td>
</tr>
<tr style="background:rgba(0,0,0,0.02)">
  <td style="padding:10px 14px;border:1px solid var(--card-border);font-weight:bold">ইউনিয়ন পরিষদ (পল্লী / গ্রাম এলাকা)</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border);text-align:center">১.০০%</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border);text-align:center">১.৫০%</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border);text-align:center">১.০০% - ২.০০%</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border);text-align:center;font-weight:bold;color:var(--accent)">৩.৫০% - ৪.৫০% + উৎসে কর</td>
</tr>
</tbody>
</table>
</div>
<p>স্মরণ রাখবেন, এই হিসাবের সাথে উৎসে আয়কর (Source Tax) যোগ হবে, যা জমিটির অবস্থান এবং বাণিজ্যিক বা আবাসিক প্রকৃতির ওপর নির্ভর করে পরিবর্তিত হয়।</p>`
      },
      {
        heading: '৪. আয়কর আইন ২০২৩ এর ৫৩এফএফ ধারা অনুযায়ী উৎসে করের (Source Tax) নতুন স্ল্যাব',
        content: `<p>আয়কর আইন ২০২৩ (Income Tax Act, 2023) এর ধারা ৫৩এফএফ অনুযায়ী স্থাবর সম্পত্তি হস্তান্তরের সময় সাব-রেজিস্ট্রার কর্তৃক বিক্রেতার কাছ থেকে উৎসে আয়কর সংগ্রহ করা আইনগত বাধ্যবাধকতা। ২০২৬ সালের হালনাগাদ সার্কুলার অনুযায়ী উৎসে কর নির্ধারণের সুনির্দিষ্ট এলাকাভিত্তিক স্ল্যাব নিচে উল্লেখ করা হলো:</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-left:4px solid var(--gold);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:var(--gold);margin:0 0 0.75rem 0">📊 এলাকাভিত্তিক উৎসে আয়করের (53FF) নতুন স্ল্যাব</h4>
<ul style="margin:0;padding-left:1.5rem;color:var(--text-secondary);line-height:2.2">
  <li><strong>ঢাকা ও চট্টগ্রামের অভিজাত বাণিজ্যিক ও আবাসিক এলাকা (গুলশান, বনানী, বারিধারা, মতিঝিল, ধানমন্ডি, লালখান বাজার):</strong> দলিলের মূল্যের ৮% অথবা কাঠাপ্রতি নির্দিষ্ট সর্বোচ্চ সিলিং (সিলিং এলাকাভেদে ২০ লাখ থেকে ৫০ লাখ টাকা পর্যন্ত)।</li>
  <li><strong>সিটি কর্পোরেশনের অন্যান্য আবাসিক এলাকা (যেমন: উত্তরা, মিরপুর, মোহাম্মদপুর, বাড্ডা):</strong> দলিলের মূল্যের ৬% অথবা কাঠাপ্রতি এলাকাভিত্তিক নির্ধারিত সরকারি অংক।</li>
  <li><strong>গাজীপুর, নারায়ণগঞ্জ ও জেলা সদরের পৌর এলাকা:</strong> দলিলের মূল্যের ৪% হারে উৎসে কর।</li>
  <li><strong>সাধারণ পৌরসভা এলাকা:</strong> দলিলের মূল্যের ৩% হারে উৎসে কর।</li>
  <li><strong>ইউনিয়ন পরিষদ ও গ্রামীণ কৃষি জমি:</strong> দলিলের মূল্যের ১% থেকে ২% (কিছু ক্ষেত্রে কৃষিজমি যদি ১ লাখ টাকার নিচে হয় তবে বিশেষ অব্যাহতি প্রযোজ্য হতে পারে)।</li>
</ul>
</div>
<p>এই উৎসে কর জমি বিক্রেতার ট্যাক্স আইডেন্টিফিকেশন নম্বর (TIN)-এর বিপরীতে সরকারি সোনালী ব্যাংকের ই-চালানের মাধ্যমে সরাসরি বাংলাদেশ ব্যাংকের রাজস্ব অ্যাকাউন্টে জমা হয়।</p>`
      },
      {
        heading: '৫. ১ কোটি টাকা মূল্যের জমির পূর্ণাঙ্গ গাণিতিক রেজিস্ট্রি খরচ ক্যালকুলেটর চার্ট',
        content: `<p>একটি বাস্তবসম্মত গাণিতিক উদাহরণের মাধ্যমে জমি রেজিস্ট্রির সঠিক ব্যয় পরিষ্কারভাবে বোঝা সম্ভব। ধরা যাক, আপনি ঢাকা সিটি কর্পোরেশন এলাকার অধীন উত্তরায় <strong>১,০০,০০,০০০ (এক কোটি) টাকা</strong> মূল্যের একটি প্লট রেজিস্ট্রি করতে যাচ্ছেন। সেক্ষেত্রে সরকারি খরচের সম্পূর্ণ হিসাবটি হবে নিম্নরূপ:</p>
<div style="overflow-x:auto;margin:1.5rem 0">
<table style="width:100%;border-collapse:collapse;font-size:0.95rem;background:var(--surface)">
<thead>
<tr style="background:linear-gradient(135deg,#0F172A,#1E293B);color:#fff">
  <th style="padding:12px 14px;text-align:left;border:1px solid var(--card-border)">খাত</th>
  <th style="padding:12px 14px;text-align:center;border:1px solid var(--card-border)">শতকরা হার</th>
  <th style="padding:12px 14px;text-align:right;border:1px solid var(--card-border)">টাকার পরিমাণ (১ কোটি টাকার বিপরীতে)</th>
</tr>
</thead>
<tbody>
<tr>
  <td style="padding:10px 14px;border:1px solid var(--card-border)">রেজিস্ট্রেশন ফি</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border);text-align:center">১.০০%</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border);text-align:right">১,০০,০০০ টাকা</td>
</tr>
<tr style="background:rgba(0,0,0,0.02)">
  <td style="padding:10px 14px;border:1px solid var(--card-border)">স্ট্যাম্প শুল্ক (Stamp Duty)</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border);text-align:center">১.৫০%</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border);text-align:right">১,৫০,০০০ টাকা</td>
</tr>
<tr>
  <td style="padding:10px 14px;border:1px solid var(--card-border)">স্থানীয় সরকার কর (সিটি কর্পোরেশন)</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border);text-align:center">৩.০০%</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border);text-align:right">৩,০০,০০০ টাকা</td>
</tr>
<tr style="background:rgba(0,0,0,0.02)">
  <td style="padding:10px 14px;border:1px solid var(--card-border)">উৎসে আয়কর (উত্তরা এলাকার স্ল্যাব অনুযায়ী)</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border);text-align:center">৬.০০%</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border);text-align:right">৬,০০,০০০ টাকা</td>
</tr>
<tr>
  <td style="padding:10px 14px;border:1px solid var(--card-border)">হলফনামা স্ট্যাম্প (নন-জুডিশিয়াল)</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border);text-align:center">নির্দিষ্ট</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border);text-align:right">৩০০ টাকা</td>
</tr>
<tr style="background:rgba(0,0,0,0.02)">
  <td style="padding:10px 14px;border:1px solid var(--card-border)">ই-ফি ও এন-ফি (আনুমানিক ১৫ পাতা)</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border);text-align:center">নির্দিষ্ট</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border);text-align:right">৩৪০ টাকা</td>
</tr>
<tr>
  <td style="padding:10px 14px;border:1px solid var(--card-border)">এনএন-ফি ও সমিতি কল্যাণ ফি</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border);text-align:center">নির্দিষ্ট</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border);text-align:right">২০০ টাকা</td>
</tr>
<tr style="background:rgba(26,63,191,0.08);font-weight:bold">
  <td style="padding:12px 14px;border:1px solid var(--card-border);color:var(--accent)" colspan="2">সর্বমোট প্রদেয় সরকারি খরচ</td>
  <td style="padding:12px 14px;border:1px solid var(--card-border);text-align:right;color:var(--accent)">১১,৫০,৮৪০ টাকা মাত্র</td>
</tr>
</tbody>
</table>
</div>
<p>অর্থাৎ ১ কোটি টাকা মূল্যের জমির জন্য সর্বমোট খরচ প্রায় ১১.৫% এর কাছাকাছি দাঁড়িয়েছে। তবে গ্রামীণ ইউনিয়ন এলাকায় যেখানে উৎসে কর কম (১%) এবং স্থানীয় কর কম (১%), সেখানে এই একই মূল্যের জমির মোট খরচ প্রায় ৫.৫% থেকে ৬%-এ নেমে আসবে।</p>`
      },
      {
        heading: '৬. সাফ-কবলা, হেবা ও এওয়াজ দলিলের খরচের তুলনামূলক পার্থক্য',
        content: `<p>অনেকেই মনে করেন সব ধরনের দলিল রেজিস্ট্রির খরচ একই। কিন্তু বাংলাদেশ রেজিস্ট্রেশন বিধিমালার অধীনে দলিলের প্রকৃতির ওপর ভিত্তি করে ফি-তে বিশাল তারতম্য রয়েছে:</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-left:4px solid #16a34a;border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:#16a34a;margin:0 0 0.75rem 0">⚖️ বিভিন্ন দলিলের রেজিস্ট্রেশন খরচের সংক্ষিপ্ত তুলনা</h4>
<ul style="margin:0;padding-left:1.5rem;color:var(--text-secondary);line-height:2.2">
  <li><strong>সাফ-কবলা দলিল (Sale Deed):</strong> মূল রেজিস্ট্রেশন খরচ উপরোল্লিখিত পূর্ণাঙ্গ হারে (৮% থেকে ১২% পর্যন্ত) দিতে হয়।</li>
  <li><strong>রক্তের সম্পর্কের হেবা দলিল (Gift / Heba Deed):</strong> মুসলিম আইনে স্বামী-স্ত্রী, পিতা-মাতা ও সন্তান, আপন ভাই-বোন, দাদা-দাদী ও নাতি-নাতনির মাঝে হেবা করলে মাত্র <strong>১০০ টাকা রেজিস্ট্রেশন ফি</strong> প্রযোজ্য। স্ট্যাম্প ডিউটি ও উৎসে কর সম্পূর্ণ মওকুফ থাকে (শুধুমাত্র ১০০ টাকার নামমাত্র ফি ও স্থানীয় সরকার করের সামান্য অঙ্ক প্রদেয়)।</li>
  <li><strong>বিনিময় বা এওয়াজ দলিল (Exchange Deed):</strong> দুটি জমির পারস্পরিক বিনিময়ের ক্ষেত্রে যে সম্পত্তির মূল্য বেশি, শুধুমাত্র সেই অংশের মূল্যের ওপর সাধারণ হারে রেজিস্ট্রেশন ফি ও স্ট্যাম্প ডিউটি ধার্য হয়।</li>
  <li><strong>বন্টননামা দলিল (Partition Deed):</strong> সহ-শরীকদের মধ্যে আপস বন্টন দলিলের ক্ষেত্রে প্রতি সহ-শরীকের অংশের ওপর নির্দিষ্ট নামমাত্র রেজিস্ট্রেশন ফি প্রযোজ্য।</li>
</ul>
</div>`
      },
      {
        heading: '৭. সাব-রেজিস্ট্রি অফিসে রেজিস্ট্রির পূর্বে বাধ্যতামূলক কাগজপত্রের চেকলিস্ট',
        content: `<p>রেজিস্ট্রেশন আইন সংশোধনী এবং ভুয়া জমি বিক্রি প্রতিরোধ আইন অনুযায়ী জমি রেজিস্ট্রির টেবিলে উপস্থাপনের পূর্বে নিচের প্রতিটি নথিপত্র যথাযথভাবে প্রস্তুত থাকা আবশ্যক:</p>
<ol style="padding-left:1.5rem;color:var(--text-secondary);line-height:2.2">
  <li><strong>মূল বায়া দলিল ও পিঠ দলিল:</strong> বিক্রেতা যে দলিলের মাধ্যমে মালিক হয়েছেন তার মূল কপি এবং পূর্ববর্তী ধারাবাহিক দলিলসমূহ।</li>
  <li><strong>হালনাগাদ নামজারি খতিয়ান (e-Mutation):</strong> বিক্রেতার নিজের নামে সহকারী কমিশনার (ভূমি) কর্তৃক ইস্যুকৃত নামজারি খতিয়ান ও ডিসিআর। নামজারি ব্যতিরেকে কোনো দলিল রেজিস্ট্রি করা আইনত দণ্ডনীয়।</li>
  <li><strong>চলতি সনের ভূমি উন্নয়ন কর দাখিলা:</strong> হালসনের খাজনা পরিশোধের কিউআর কোডযুক্ত অনলাইন দাখিলা।</li>
  <li><strong>সিএস, এসএ, আরএস ও বিএস খতিয়ান:</strong> সরকারের জরিপ রেকর্ডের মূল জাবেদা নকল।</li>
  <li><strong>জাতীয় পরিচয়পত্র ও ছবি:</strong> ক্রেতা, বিক্রেতা এবং শনাক্তকারীর সদ্যতোলা পাসপোর্ট সাইজের সত্যায়িত রঙিন ছবি ও মূল এনআইডি।</li>
  <li><strong>আবাসিক প্লট বা ফ্ল্যাটের ক্ষেত্রে রাজউক / সিডিএ অনুমোদন:</strong> অনুমোদিত নকশা ও লেআউট প্ল্যানের সত্যায়িত কপি।</li>
  <li><strong>ট্যাক্স চালান ও পে-অর্ডার:</strong> ব্যাংকে পরিশোধিত সরকারি ফির প্রতিটি ট্রেজারি চালান ও স্থানীয় সরকার করের পে-অর্ডার।</li>
</ol>`
      },
      {
        heading: '৮. সরকারি ফির অতিরিক্ত অবৈধ টাকা দাবি করলে আইনি প্রতিকার ও অভিযোগের উপায়',
        content: `<p>সাব-রেজিস্ট্রি অফিসে প্রায়ই নকলনবিশ, উমেদার বা দলিল লেখকদের মাধ্যমে 'অফিস খরচ' বা 'ফাইল পাস'-এর নামে অতিরিক্ত অননুমোদিত নগদ টাকা আদায়ের অপচেষ্টা দেখা যায়। আইনত এটি সম্পূর্ণ অবৈধ ও ফৌজদারি অপরাধ।</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-left:4px solid #ef4444;border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:#ef4444;margin:0 0 0.75rem 0">🚨 অতিরিক্ত অর্থ দাবি করলে তাৎক্ষণিক আইনি পদক্ষেপ</h4>
<ul style="margin:0;padding-left:1.5rem;color:var(--text-secondary);line-height:2">
  <li>১. চালানের বাইরে কোনো ধরনের নগদ লেনদেন করবেন না। সাব-রেজিস্ট্রি অফিসের সমস্ত ফি চালানের মাধ্যমে ব্যাংকে সরাসরি ট্রেজারিতে জমা হয়।</li>
  <li>২. অতিরিক্ত অর্থ দাবি করা হলে জেলা রেজিস্ট্রার (District Registrar - DR) মহোদয়ের নিকট তাৎক্ষণিক লিখিত অভিযোগ দাখিল করুন।</li>
  <li>৩. নিবন্ধন পরিদপ্তর (Directorate of Registration)-এর হটলাইনে বা মহাপরিদর্শক (IG Registration)-এর দপ্তরে সরাসরি নালিশ জানান।</li>
  <li>৪. দুর্নীতি দমন কমিশনের (দুদক) কল সেন্টার <strong>১০৬</strong> নম্বরে কল করে তাৎক্ষণিক এনফোর্সমেন্ট অভিযানের অনুরোধ জানান।</li>
</ul>
</div>`
      },
      {
        heading: '৯. রেজিস্ট্রি সম্পন্ন হওয়ার পর মূল দলিল ও সার্টিফাইড নকল (Certified Copy) উত্তোলনের নিয়ম',
        content: `<p>দলিল রেজিস্ট্রি হওয়ার পর সাব-রেজিস্ট্রার দলিলে স্বাক্ষর করে ক্রেতাকে একটি মূল প্রাপ্তিস্বীকার পত্র বা '৫২ ধারা রসিদ' (Receipt under Section 52) প্রদান করেন। এই রসিদটি অত্যন্ত মূল্যবান, কারণ এটি প্রদর্শন করেই পরবর্তীতে মূল দলিল সংগ্রহ করতে হয়।</p>
<p>বালাম বইয়ে বালাম নকলকারকদের দ্বারা দলিল লেখার প্রক্রিয়ায় কয়েক মাস থেকে ক্ষেত্রবিশেষে এক-দুই বছর সময় লাগতে পারে। তবে মূল দলিল পেতে বিলম্ব হলেও রেজিস্ট্রি হওয়ার সাথে সাথে আপনি নকল তল্লাশির ফি জমা দিয়ে দলিলের <strong>সার্টিফাইড নকল বা জাবেদা কপি</strong> উত্তোলন করে নিতে পারবেন। সার্টিফাইড নকল দিয়েই আপনি অবিলম্বে সহকারী কমিশনার (ভূমি) অফিসে নামজারি এবং বিদ্যুৎ/গ্যাস সংযোগের আবেদন করতে পারবেন।</p>`
      },
      {
        heading: '১০. প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী (FAQ)',
        content: `<div style="display:flex;flex-direction:column;gap:1rem;margin:1.5rem 0">
<div style="background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1.25rem">
  <h4 style="color:var(--accent);margin:0 0 0.5rem 0">প্রশ্ন: জমি রেজিস্ট্রির খরচ কি ক্রেতা বহন করে নাকি বিক্রেতা?</h4>
  <p style="margin:0;color:var(--text-secondary);line-height:1.8"><strong>উত্তর:</strong> বাংলাদেশে প্রচলিত রেওয়াজ ও চুক্তি অনুযায়ী জমি রেজিস্ট্রির রেজিস্ট্রেশন ফি, স্ট্যাম্প শুল্ক ও স্থানীয় কর ক্রেতা বহন করেন। তবে আয়কর আইন অনুযায়ী ৫৩এফএফ ধারার উৎসে আয়কর বিক্রেতার প্রদেয়। যদিও অনেক চুক্তিতে উভয় পক্ষের পারস্পরিক সম্মতিতে ভিন্ন শর্ত নির্ধারণ করা যায়।</p>
</div>
<div style="background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1.25rem">
  <h4 style="color:var(--accent);margin:0 0 0.5rem 0">প্রশ্ন: সরকারি মৌজা রেটের চেয়ে কম দামে কি জমি রেজিস্ট্রি করা সম্ভব?</h4>
  <p style="margin:0;color:var(--text-secondary);line-height:1.8"><strong>উত্তর:</strong> না। সরকারি নির্ধারিত মৌজা মূল্যের চেয়ে কম দামে দলিল রেজিস্ট্রি করার কোনো সুযোগ আইনে নেই। মৌজা মূল্যের চেয়ে কম লিখলে সাব-রেজিস্ট্রার দলিল রেজিস্ট্রি করতে অস্বীকৃতি জানাবেন।</p>
</div>
<div style="background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1.25rem">
  <h4 style="color:var(--accent);margin:0 0 0.5rem 0">প্রশ্ন: দলিল লেখার জন্য দলিল লেখককে (মুহুরি) কত টাকা দিতে হয়?</h4>
  <p style="margin:0;color:var(--text-secondary);line-height:1.8"><strong>উত্তর:</strong> সরকারি বিধিমালায় দলিল লেখকদের জন্য নির্দিষ্ট পারিশ্রমিক নির্ধারণ করা আছে। তবে সাধারণত দলিলের জটিলতা ও পাতার সংখ্যার ওপর নির্ভর করে ৩,০০০ থেকে ১০,০০০ টাকার মধ্যে পারস্পরিক চুক্তিতে মুহুরি ফি নির্ধারিত হয়।</p>
</div>
<div style="background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1.25rem">
  <h4 style="color:var(--accent);margin:0 0 0.5rem 0">প্রশ্ন: হেবা দলিলের সরকারি ফি কত?</h4>
  <p style="margin:0;color:var(--text-secondary);line-height:1.8"><strong>উত্তর:</strong> রক্তের নিকটাত্মীয়ের মাঝে মুসলিম আইনে হেবা দলিলের রেজিস্ট্রেশন ফি মাত্র ১০০ টাকা। সাথে সামান্য কিছু হলফনামা ও ই-ফি যুক্ত হয়ে সর্বমোট খরচ অত্যন্ত নগণ্য হয়।</p>
</div>
</div>`
      },
      {
        heading: '১১. জমি ক্রয় ও দলিল সম্পাদনে সুপ্রিম কোর্টের বিজ্ঞ আইনজীবীর পরামর্শ',
        content: `<p>জমি কেনা একজন মানুষের জীবনের সবচেয়ে বড় আর্থিক বিনিয়োগগুলোর একটি। একটি ছোট নথির গরমিল বা স্বত্বের অসতর্কতা আপনার সারাজীবনের উপার্জনকে আদালত প্রাঙ্গণে মামলা-মোকদ্দমায় ঝুলিয়ে দিতে পারে। জমি বায়না করা এবং রেজিস্ট্রি করার পূর্বে সংশ্লিষ্ট জমির ধারাবাহিক রেকর্ড, পিঠ দলিল ও স্বত্ব একজন অভিজ্ঞ দেওয়ানি আইনজীবীর মাধ্যমে পুঙ্খানুপুঙ্খ ভেটিং করিয়ে নেওয়া আপনার শ্রেষ্ঠ সুরক্ষা।</p>
<div style="background:linear-gradient(135deg,rgba(26,63,191,0.08) 0%,rgba(198,167,94,0.06) 100%);border:1px solid rgba(26,63,191,0.18);border-radius:1rem;padding:1.5rem;margin:1.5rem 0;text-align:center">
<h3 style="color:var(--accent);margin:0 0 0.5rem 0">🏛️ জমি ক্রয়-বিক্রয়, দলিল ভেটিং ও রেজিস্ট্রি সংক্রান্ত পরামর্শের জন্য</h3>
<p style="margin:0 0 1rem 0;color:var(--text-secondary);font-size:1rem">১০+ বছরের অভিজ্ঞ সুপ্রিম কোর্ট ও জেলা আদালতের দেওয়ানি ও সম্পত্তি আইন বিশেষজ্ঞ</p>
<p style="margin:0 0 1.25rem 0;font-size:1.15rem;font-weight:bold;color:var(--text)">অ্যাডভোকেট মোঃ শাহ আলম — ঢাকা উত্তরা ও জজ কোর্ট চেম্বার</p>
<a href="/contact" style="display:inline-block;padding:0.75rem 1.8rem;background:#1B365D;color:#fff;border-radius:0.5rem;font-weight:bold;text-decoration:none;margin-right:0.5rem">সরাসরি অ্যাপয়েন্টমেন্ট নিন</a>
<a href="https://wa.me/8801712655546" target="_blank" rel="noopener" style="display:inline-block;padding:0.75rem 1.8rem;background:#25D366;color:#fff;border-radius:0.5rem;font-weight:bold;text-decoration:none">💬 WhatsApp পরামর্শ</a>
</div>`
      }
    ],
    faqs: [
      {
        question: 'জমি রেজিস্ট্রির খরচ কি ক্রেতা বহন করে নাকি বিক্রেতা?',
        answer: 'প্রচলিত নিয়ম অনুযায়ী সাধারণ রেজিস্ট্রেশন ফি ও স্ট্যাম্প ডিউটি ক্রেতা এবং ৫৩এফএফ ধারার উৎসে আয়কর বিক্রেতা বহন করেন।'
      },
      {
        question: 'সরকারি মৌজা রেটের চেয়ে কম মূল্যে কি জমি রেজিস্ট্রি করা যায়?',
        answer: 'না, সরকারি নির্ধারিত সর্বনিম্ন মৌজা রেটের নিচে কোনো দলিল রেজিস্ট্রি করা আইনত সম্ভব নয়।'
      },
      {
        question: 'পৌরসভা এলাকায় জমি রেজিস্ট্রিতে স্থানীয় সরকার কর কত?',
        answer: 'পৌরসভা এলাকায় সাধারণত ২% থেকে ৩% স্থানীয় সরকার কর সরকারি চালানের মাধ্যমে জমা দিতে হয়।'
      },
      {
        question: 'রক্তের সম্পর্কের হেবা দলিলের সরকারি ফি কত?',
        answer: 'নিকটাত্মীয়দের মাঝে মুসলিম হেবা দলিলের সরকারি রেজিস্ট্রেশন ফি মাত্র ১০০ টাকা।'
      },
      {
        question: 'দলিল রেজিস্ট্রির পর মূল দলিল পেতে কতদিন লাগে?',
        answer: 'বালামে নকল সম্পন্ন হতে কয়েক মাস থেকে ২ বছর লাগতে পারে, তবে তাৎক্ষণিকভাবে সার্টিফাইড নকল উত্তোলন করা যায়।'
      }
    ],
    featured: false,
    impressions: 240,
    clicks: 28
  },

  // ==========================================
  // POST 3: Court Marriage Real Cost & Papers 2026
  // ==========================================
  {
    slug: 'court-marriage-asol-khoroch-kagojpotro-niyom-2026',
    category: 'পারিবারিক আইন',
    title: 'কোর্ট ম্যারেজ এর আসল খরচ ও সঠিক নিয়ম ২০২৬ — কি কি কাগজপত্র লাগে, বয়স প্রমাণ ও ভুয়া কাজীর প্রতারণা এড়ানোর উপায়',
    metaTitle: 'কোর্ট ম্যারেজ এর খরচ ও নিয়ম ২০২৬ | Court Marriage Cost & Paperwork BD',
    metaDescription: 'কোর্ট ম্যারেজ করতে কত টাকা খরচ হয় ও কি কি কাগজ লাগে? কোর্ট ম্যারেজের আইনি সত্যতা, এফিডেভিট বনাম নিকাহনামা এবং ভুয়া কাজী চেনার সম্পূর্ণ গাইড ২০২৬।',
    keywords: [
      'কোর্ট ম্যারেজ এর খরচ কত 2026',
      'কোট মেরেজ করতে কি কি লাগে',
      'কোর্ট ম্যারেজ এর কাগজ',
      'কোর্ট ম্যারেজ করতে কত টাকা খরচ হয়',
      'court marriage paper bangladesh',
      'কোর্ট ম্যারেজ আইন ও নিয়ম ২০২৬',
      'কোর্ট ম্যারেজ এফিডেভিট ফরম্যাট'
    ],
    publishedDate: '2026-09-11',
    lastModified: '2026-09-11',
    readTime: '১৭ মিনিট',
    heroIntro: '<p>বাংলাদেশে তরুণ-তরুণী বা পরিবারের অসম্মতিতে বিয়ে করতে ইচ্ছুক যুগলদের মাঝে সবচেয়ে প্রচলিত কিন্তু ব্যাপকভাবে ভুল বোঝাবুঝির একটি পরিভাষা হলো "কোর্ট ম্যারেজ" (Court Marriage)। সাধারণ মানুষের ধারণা—কোর্টে গিয়ে কোনো ম্যাজিস্ট্রেট বা জজের সামনে সই করলেই বুঝি বিয়ে সম্পন্ন হয়ে যায়। কিন্তু বাংলাদেশের বিদ্যমান আইনে তথাকথিত "কোর্ট ম্যারেজ" বলে আলাদা কোনো বিয়ে নেই। কোর্টে যা হয় তা হলো নোটারি পাবলিক বা প্রথম শ্রেণীর ম্যাজিস্ট্রেটের সামনে একটি বিয়ের ঘোষণামূলক হলফনামা (Affidavit)। ধর্মীয় বিধান ও আইনানুযায়ী সরকারি নিকাহ রেজিস্ট্রার (কাজী) দ্বারা কাবিননামা রেজিস্ট্রি না করা পর্যন্ত শুধুমাত্র কোর্টের এফিডেভিট কোনো আইনসিদ্ধ বিয়ের প্রমাণ নয়। সঠিক আইনি প্রক্রিয়া না জানার কারণে অনেকেই ভুয়া কাজী ও দালালদের প্রতারণার শিকার হয়ে জেল-জুলুম এবং অপহরণ বা নারী নির্যাতন মামলার মতো মারাত্মক আইনি বিপদে পড়েন। ২০২৬ সালের আধুনিক আইনি প্রেক্ষাপটে কোর্ট ম্যারেজের প্রকৃত নিয়ম, সরকারি খরচ, প্রয়োজনীয় কাগজপত্রের চেকলিস্ট এবং ফৌজদারি মামলা থেকে সুরক্ষার সম্পূর্ণ আইনি গাইড নিচে উপস্থাপন করা হলো। যেকোনো পারিবারিক আইনি সহায়তার জন্য যোগাযোগ করুন: <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold">অ্যাডভোকেট মোঃ শাহ আলম</a> — <a href="tel:01712655546" style="color:var(--gold);font-weight:bold">📞 01712655546</a></p>',
    quickAnswer: {
      heading: '⚡ কোর্ট ম্যারেজ ২০২৬ — অতি জরুরি মূল আইনি সত্যতা',
      points: [
        'আইনি বাস্তবতা: কোর্টের হলফনামা (Affidavit) কোনো বিয়ে নয়; এটি কেবল দুজনের প্রাপ্তবয়স্ক হয়ে স্বেচ্ছায় বিয়ের আইনি ঘোষণা। আসল বিয়ে হতে হবে সরকারি নিকাহ রেজিস্ট্রারের (কাজী) কাবিননামার মাধ্যমে।',
        'বয়সসীমা: বরকে নূন্যতম ২১ বছর এবং কনেকে নূন্যতম ১৮ বছর পূর্ণ হতে হবে। কোনো পক্ষ অপ্রাপ্তবয়স্ক হলে তা বাল্যবিবাহ নিরোধ আইনে শাস্তিযোগ্য অপরাধ।',
        'প্রয়োজনীয় কাগজপত্র: বর-কনের জাতীয় পরিচয়পত্র (NID) বা ডিজিটাল জন্ম নিবন্ধন সনদ, পাসপোর্ট সাইজ ছবি (৩ কপি করে), এবং দুইজন সুস্থ মস্তিষ্কের প্রাপ্তবয়স্ক সাক্ষী।',
        'প্রকৃত খরচ: নোটারি পাবলিকের হলফনামা স্ট্যাম্প বাবদ ২০০-৩০০ টাকা এবং কাজীর সরকারি ফি (প্রতি লাখে ১,২৫০ টাকা)। মোট আইনজীবী ফিসহ সাধারণত ৩,০০০ থেকে ৮,০০০ টাকার মধ্যে সম্পন্ন হয়।',
        'ফৌজদারি সুরক্ষা: হলফনামা ও নিকাহনামা সাথে থাকলে মেয়ের পরিবারের দায়েরকৃত মিথ্যা অপহরণ বা ধর্ষণ মামলা (পেনাল কোড ৩৬৫ বা নারী ও শিশু নির্যাতন আইনের ধারা ৯) থেকে তাৎক্ষণিক জামিন ও সুরক্ষা মেলে।'
      ]
    },
    toc: [
      '১. কোর্ট ম্যারেজ কী? প্রচলিত লোকবিশ্বাস বনাম বাংলাদেশের প্রকৃত আইন',
      '২. নোটারি পাবলিকের এফিডেভিট (Affidavit) বনাম নিকাহ রেজিস্ট্রারের কাবিননামা',
      '৩. কোর্ট ম্যারেজ করতে কী কী কাগজপত্র ও তথ্য বাধ্যতামূলক?',
      '৪. বয়স প্রমাণের বাধ্যবাধকতা: বাল্যবিবাহ নিরোধ আইন ২০১৭ ও ডিজিটাল যাচাই',
      '৫. কোর্ট ম্যারেজের প্রকৃত সরকারি খরচ ও আইনজীবী ফির বাস্তবসম্মত বিভাজন ২০২৬',
      '৬. কোর্ট চত্বরে ভুয়া কাজী ও দালালদের খপ্পর থেকে বাঁচার উপায়',
      '৭. পরিবারের অমতে বিয়ে হলে পরিবারের মিথ্যা মামলা (অপহরণ/নারী নির্যাতন) মোকাবিলার আইনি প্রস্তুতি',
      '৮. হিন্দু, খ্রিস্টান ও ভিন্ন ধর্মের অনুসারীদের জন্য বিশেষ বিবাহ আইন ১৮৭২ (Special Marriage Act)',
      '৯. বিয়ে সম্পন্ন হওয়ার পর কাবিননামা ও হলফনামার অনলাইন রেকর্ড সংরক্ষণ',
      '১০. প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী (FAQ)',
      '১১. নিরাপদ ও আইনসঙ্গত কোর্ট ম্যারেজে সুপ্রিম কোর্টের বিজ্ঞ আইনজীবীর আইনি পরামর্শ'
    ],
    sections: [
      {
        heading: '১. কোর্ট ম্যারেজ কী? প্রচলিত লোকবিশ্বাস বনাম বাংলাদেশের প্রকৃত আইন',
        content: `<p>আমাদের সমাজে একটি ভুল ধারণা অত্যন্ত গভীরভাবে প্রোথিত যে, কোর্টে গিয়ে বিয়ে করলে তা সমাজের বা পরিবারের সকল আপত্তির ঊর্ধ্বে একটি শক্তিশালী বিয়ে হয়। আইনি দৃষ্টিকোণ থেকে বাস্তবতা হলো: <strong>বাংলাদেশের কোনো আইনে "কোর্ট ম্যারেজ" নামক কোনো আনুষ্ঠানিক বিবাহ ব্যবস্থার অস্তিত্ব নেই।</strong></p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-left:4px solid var(--accent);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:var(--accent);margin:0 0 0.75rem 0">📌 কোর্ট ম্যারেজ আসলে কী?</h4>
<p style="margin:0;color:var(--text-secondary);line-height:1.9">কোর্টে যা করা হয় তা মূলত দ্য নোটারিজ অর্ডিন্যান্স ১৯৬১ (The Notaries Ordinance, 1961) এর অধীনে একজন সরকার অনুমোদিত নোটারি পাবলিক অথবা কোনো প্রথম শ্রেণীর জুডিশিয়াল ম্যাজিস্ট্রেটের সামনে ১০০ বা ২০০ টাকার নন-জুডিশিয়াল স্ট্যাম্পে একটি <em>'বিবাহের ঘোষণামূলক হলফনামা' (Affidavit of Marriage Declaration)</em> সম্পাদন করা। এতে বর ও কনে শপথপূর্বক ঘোষণা করেন যে—তাঁরা দুজনেই আইনানুযায়ী প্রাপ্তবয়স্ক, সুস্থ মস্তিষ্কের অধিকারী এবং কোনো প্রকার চাপ বা প্ররোচনা ছাড়া নিজেদের স্বাধীন সম্মতিতে বিবাহবন্ধনে আবদ্ধ হয়েছেন বা হতে যাচ্ছেন।</p>
</div>
<p>মুসলিম বিবাহ ও তালাক (নিবন্ধন) আইন ১৯৭৪ অনুযায়ী, মুসলিম ধর্মাবলম্বীদের ক্ষেত্রে সরকারি নিকাহ রেজিস্ট্রার (কাজী) দ্বারা রেজিস্ট্রি বইয়ে বিবাহ লিপিবদ্ধ না করা পর্যন্ত এবং সরকারি ফরমের কাবিননামা তৈরি না হওয়া পর্যন্ত বিয়েটি আইনত অসিদ্ধ থেকে যায়। অর্থাৎ কোর্টের এফিডেভিট হলো কাজীর বিয়ের অতিরিক্ত একটি সুরক্ষামূলক ঘোষণাপত্র মাত্র।</p>`
      },
      {
        heading: '২. নোটারি পাবলিকের এফিডেভিট (Affidavit) বনাম নিকাহ রেজিস্ট্রারের কাবিননামা',
        content: `<p>অনেকেই কোর্ট চত্বরের অসাধু দালালদের ফাঁদে পড়ে মাত্র একটি নোটারি স্ট্যাম্পে সই করে চলে আসেন এবং মনে করেন তাঁদের বিয়ে সম্পন্ন হয়েছে। পরবর্তীতে যখন স্ত্রী দেনমোহর বা ভরণপোষণ দাবি করেন, কিংবা পুলিশি ঝামেলা হয়, তখন আদালত জানিয়ে দেয় যে কোনো কাবিননামা ব্যতীত শুধুমাত্র নোটারি হলফনামা দাম্পত্য স্বত্বের পূর্ণাঙ্গ প্রমাণ নয়।</p>
<div style="overflow-x:auto;margin:1.5rem 0">
<table style="width:100%;border-collapse:collapse;font-size:0.95rem;background:var(--surface)">
<thead>
<tr style="background:linear-gradient(135deg,#0F172A,#1E293B);color:#fff">
  <th style="padding:12px 14px;text-align:left;border:1px solid var(--card-border)">বৈশিষ্ট্য</th>
  <th style="padding:12px 14px;text-align:left;border:1px solid var(--card-border)">নোটারি পাবলিকের হলফনামা (Affidavit)</th>
  <th style="padding:12px 14px;text-align:left;border:1px solid var(--card-border)">নিকাহ রেজিস্ট্রারের কাবিননামা (Nikahnama)</th>
</tr>
</thead>
<tbody>
<tr>
  <td style="padding:10px 14px;border:1px solid var(--card-border);font-weight:bold">আইনি মর্যাদা</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border)">সাক্ষ্য আইনের অধীনে একটি আনুষ্ঠানিক একতরফা বা দ্বিপাক্ষিক শপথনামা।</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border);font-weight:bold;color:#16a34a">মুসলিম আইনের আওতায় বৈধ বৈবাহিক চুক্তির একমাত্র আইনি ভিত্তি।</td>
</tr>
<tr style="background:rgba(0,0,0,0.02)">
  <td style="padding:10px 14px;border:1px solid var(--card-border);font-weight:bold">দেনমোহর ও ভরণপোষণ</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border)">শুধুমাত্র হলফনামা দিয়ে পারিবারিক আদালতে দেনমোহর বা খোরপোশ আদায় করা অত্যন্ত জটিল।</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border)">কাবিননামা দাখিল করে পারিবারিক আদালত অধ্যাদেশ ১৯৮৫ অনুযায়ী সরাসরি ডিগ্রি পাওয়া যায়।</td>
</tr>
<tr>
  <td style="padding:10px 14px;border:1px solid var(--card-border);font-weight:bold">পাসপোর্ট ও ভিসা আবেদন</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border)">কোনো বিদেশি দূতাবাস বা পাসপোর্ট অফিস স্পাউস ভিসায় নোটারি স্ট্যাম্প গ্রহণ করে না।</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border)">আইন মন্ত্রণালয় ও পররাষ্ট্র মন্ত্রণালয় কর্তৃক সত্যায়িত নিকাহনামা বিশ্বব্যাপী সর্বজনগ্রাহ্য।</td>
</tr>
<tr style="background:rgba(0,0,0,0.02)">
  <td style="padding:10px 14px;border:1px solid var(--card-border);font-weight:bold">ফৌজদারি মামলায় মূল্য</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border)">মেয়ের স্বেচ্ছায় গমনের অভিপ্রায় প্রমাণের জন্য আদালতে অত্যন্ত কার্যকর সহায়ক দলিল।</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border)">বিয়ের মূল আইনি অস্তিত্ব প্রমাণের প্রধান ও চূড়ান্ত দলিল।</td>
</tr>
</tbody>
</table>
</div>
<p>অতএব, নিরাপদ কোর্ট ম্যারেজ মানে হলো: <strong>আইনজীবীর মাধ্যমে নোটারি হলফনামা সম্পাদন করা + একই সাথে সরকারি সরকার নিবন্ধিত কাজীর মাধ্যমে নিকাহ রেজিস্ট্রেশন সম্পন্ন করা।</strong> এই দুটি কাজ একসাথে সম্পন্ন হলেই বিয়েটি সর্বতোভাবে নিষ্কণ্টক হয়।</p>`
      },
      {
        heading: '৩. কোর্ট ম্যারেজ করতে কী কী কাগজপত্র ও তথ্য বাধ্যতামূলক?',
        content: `<p>আইনসম্মত কোর্ট ম্যারেজ সম্পন্ন করার জন্য বর ও কনে উভয়কেই প্রয়োজনীয় কাগজপত্র সাথে রাখতে হয়। প্রয়োজনীয় কাগজপত্রের পূর্ণাঙ্গ চেকলিস্ট নিচে দেওয়া হলো:</p>
<ul style="padding-left:1.5rem;color:var(--text-secondary);line-height:2.2">
  <li><strong>১. বর ও কনের জাতীয় পরিচয়পত্র (NID) অথবা ডিজিটাল স্মার্ট জন্ম নিবন্ধন সনদ:</strong> বয়স ও পরিচয় নিশ্চিত করার জন্য এটি অপরিহার্য।</li>
  <li><strong>২. পাসপোর্ট সাইজের সদ্যতোলা রঙিন ছবি:</strong> বরের ৩ কপি এবং কনের ৩ কপি পাসপোর্ট সাইজ ছবি লাগবে (হলফনামা ও নিকাহ রেজিস্ট্রারে পেস্ট করার জন্য)।</li>
  <li><strong>৩. শিক্ষাগত যোগ্যতার সনদ (এসএসসি বা জেএসসি সার্টিফিকেট):</strong> এনআইডি না থাকলে বা বয়স নিয়ে কোনো প্রকার বিভ্রান্তি এড়াতে শিক্ষাবোর্ড কর্তৃক প্রদত্ত সার্টিফিকেট সবচেয়ে শক্তিশালী প্রমাণ।</li>
  <li><strong>৪. সাক্ষীগণের তথ্য:</strong> অন্তত দুইজন প্রাপ্তবয়স্ক পুরুষ সাক্ষী অথবা একজন পুরুষ ও দুইজন নারী সাক্ষী উপস্থিত থাকতে হবে। তাঁদের প্রত্যেকের এনআইডি কার্ডের কপি প্রয়োজন।</li>
  <li><strong>৫. পূর্ববর্তী বিবাহ বিচ্ছেদের প্রমাণ (প্রযোজ্য ক্ষেত্রে):</strong> বর বা কনের কেউ পূর্বে বিবাহিত থাকলে এবং ডিভোর্স হয়ে থাকলে আদালতের ডিভোর্স ডিক্রি বা সরকারি কাজী অফিসের তালাকনামা ও ৯০ দিনের নোটিশ জারির কপি বাধ্যতামূলক।</li>
</ul>`
      },
      {
        heading: '৪. বয়স প্রমাণের বাধ্যবাধকতা: বাল্যবিবাহ নিরোধ আইন ২০১৭ ও ডিজিটাল যাচাই',
        content: `<p>কোর্ট ম্যারেজের ক্ষেত্রে সবচেয়ে স্পর্শকাতর ও গুরুত্বপূর্ণ আইনি বিষয় হলো বয়স। বাল্যবিবাহ নিরোধ আইন ২০১৭ (Child Marriage Restraint Act, 2017) অনুযায়ী বাংলাদেশে বিবাহের ক্ষেত্রে:</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-left:4px solid #ef4444;border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:#ef4444;margin:0 0 0.75rem 0">⚖️ আইনের দৃষ্টিতে সর্বনিম্ন বয়সসীমা</h4>
<ul style="margin:0;padding-left:1.5rem;color:var(--text-secondary);line-height:2">
  <li><strong>বরের বয়স:</strong> বিয়ের তারিখে নূন্যতম পূর্ণ <strong>২১ বছর</strong> হতে হবে।</li>
  <li><strong>কনের বয়স:</strong> বিয়ের তারিখে নূন্যতম পূর্ণ <strong>১৮ বছর</strong> হতে হবে।</li>
</ul>
<p style="margin:0.75rem 0 0 0;color:var(--text-secondary);line-height:1.9">কনের বয়স যদি ১৮ বছরের একদিনও কম থাকে, তবে নোটারি পাবলিকের হলফনামা বা কাজী অফিসের রেজিস্ট্রেশন কোনোভাবেই তা রক্ষা করতে পারবে না। সেক্ষেত্রে বর ও সংশ্লিষ্ট সবার বিরুদ্ধে বাল্যবিবাহ আইনে কারাদণ্ড এবং পেনাল কোডের ৩৬৩/৩৬৬ ধারায় অপহরণ ও ধর্ষণের মামলা দায়ের হতে পারে, যা একটি জামিন-অযোগ্য অপরাধ। তাই বয়স ১৮ ও ২১ পূর্ণ হয়েছে কিনা তা নির্বাচন কমিশনের এনআইডি ডাটাবেস দিয়ে শতভাগ নিশ্চিত হতে হবে।</p>
</div>`
      },
      {
        heading: '৫. কোর্ট ম্যারেজের প্রকৃত সরকারি খরচ ও আইনজীবী ফির বাস্তবসম্মত বিভাজন ২০২৬',
        content: `<p>সাধারণ মানুষের সরলতার সুযোগ নিয়ে কোর্ট প্রাঙ্গণের দালালরা কোর্ট ম্যারেজের জন্য ১৫,০০০ থেকে ৩০,০০০ টাকা পর্যন্ত দাবি করে থাকে। অথচ প্রকৃত সরকারি ও দাপ্তরিক খরচ অত্যন্ত কম:</p>
<div style="overflow-x:auto;margin:1.5rem 0">
<table style="width:100%;border-collapse:collapse;font-size:0.95rem;background:var(--surface)">
<thead>
<tr style="background:linear-gradient(135deg,#0F172A,#1E293B);color:#fff">
  <th style="padding:12px 14px;text-align:left;border:1px solid var(--card-border)">খরচের খাত</th>
  <th style="padding:12px 14px;text-align:left;border:1px solid var(--card-border)">সরকারি নির্ধারিত পরিমাণ / আইনি খরচ</th>
  <th style="padding:12px 14px;text-align:left;border:1px solid var(--card-border)">মন্তব্য</th>
</tr>
</thead>
<tbody>
<tr>
  <td style="padding:10px 14px;border:1px solid var(--card-border);font-weight:bold">নন-জুডিশিয়াল স্ট্যাম্প ও নোটারি ফি</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border)">২০০ টাকা থেকে ৫০০ টাকা</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border)">হলফনামার সরকারি স্ট্যাম্প ও নোটারি সত্যায়ন ফি।</td>
</tr>
<tr style="background:rgba(0,0,0,0.02)">
  <td style="padding:10px 14px;border:1px solid var(--card-border);font-weight:bold">কাজীর সরকারি নিকাহ ফি (প্রথম ৪ লাখ দেনমোহর)</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border)">প্রতি লাখে ১,২৫০ টাকা (প্রতি হাজারে ১২.৫০ টাকা)</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border)">দেনমোহর ১ লাখ হলে ১,২৫০ টাকা, ২ লাখ হলে ২,৫০০ টাকা।</td>
</tr>
<tr>
  <td style="padding:10px 14px;border:1px solid var(--card-border);font-weight:bold">কাজীর সরকারি নিকাহ ফি (৪ লাখ টাকার ঊর্ধ্বে)</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border)">প্রতি লাখে ১০০ টাকা</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border)">৪ লাখের অতিরিক্ত অংশের জন্য নামমাত্র ফি।</td>
</tr>
<tr style="background:rgba(0,0,0,0.02)">
  <td style="padding:10px 14px;border:1px solid var(--card-border);font-weight:bold">আইনজীবীর পেশাগত ফি ও ড্রাফটিং</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border)">২,০০০ টাকা থেকে ৫,০০০ টাকা</td>
  <td style="padding:10px 14px;border:1px solid var(--card-border)">আইনি পরামর্শ, হলফনামা ড্রাফট ও সুরক্ষামূলক তদারকি।</td>
</tr>
<tr style="background:rgba(26,63,191,0.08);font-weight:bold">
  <td style="padding:12px 14px;border:1px solid var(--card-border);color:var(--accent)">সর্বমোট গড় আনুমানিক ব্যয়</td>
  <td style="padding:12px 14px;border:1px solid var(--card-border);color:var(--accent)" colspan="2">৪,০০০ টাকা থেকে ৮,০০০ টাকা মাত্র (দেনমোহরের পরিমাণের ওপর নির্ভরশীল)</td>
</tr>
</tbody>
</table>
</div>
<p>অতএব কেউ যদি ২০-৩০ হাজার টাকা দাবি করে, তবে বুঝতে হবে মাঝখানে মধ্যস্বত্বভোগী বা দালাল অতিরিক্ত টাকা হাতিয়ে নিচ্ছে।</p>`
      },
      {
        heading: '৬. কোর্ট চত্বরে ভুয়া কাজী ও দালালদের খপ্পর থেকে বাঁচার উপায়',
        content: `<p>ঢাকার আদালত চত্বর (যেমন জজ কোর্ট বা সিএমএম কোর্ট এলাকা) এবং বিভিন্ন জেলা বারের সামনে বহু ভুয়া কাজী সিন্ডিকেট সক্রিয় থাকে। এরা নিজেদের সরকারি কাজী পরিচয় দিয়ে ভুয়া বালাম বইয়ে সই নেয় এবং ভুয়া কাবিননামা ধরিয়ে দেয়। ভবিষ্যতে থানায় বা আদালতে গিয়ে দেখা যায় সেই কাজীর কোনো সরকারি লাইসেন্সই নেই!</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-left:4px solid var(--gold);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:var(--gold);margin:0 0 0.75rem 0">🔍 আসল কাজী চেনার ৪টি সুনির্দিষ্ট উপায়</h4>
<ul style="margin:0;padding-left:1.5rem;color:var(--text-secondary);line-height:2">
  <li><strong>১. সরকারি অধিক্ষেত্র (Jurisdiction):</strong> একজন কাজী নির্দিষ্ট একটি ওয়ার্ড বা ইউনিয়নের জন্য সরকার কর্তৃক নিয়োগপ্রাপ্ত। বিয়েটি যেখানে অনুষ্ঠিত হচ্ছে কাজী সেই এলাকার লাইসেন্সধারী কিনা তা যাচাই করুন।</li>
  <li><strong>২. সরকারি বালাম বই ও ভলিউম নম্বর:</strong> আসল কাজীর কাছে সরকারি সিলমোহরযুক্ত বাঁধানো বালাম বই থাকে, যাতে ভলিউম ও পেজ নম্বর মুদ্রিত থাকে।</li>
  <li><strong>৩. সরকারি রসিদ বহি:</strong> কাজী ফি গ্রহণের বিপরীতে সরকারি নির্ধারিত মানি রসিদ প্রদান করবেন।</li>
  <li><strong>৪. আইন মন্ত্রণালয়ের নিবন্ধন নম্বর:</strong> কাজীর দাপ্তরিক সিলমোহরে আইন ও বিচার বিভাগ কর্তৃক প্রদত্ত সরকারি লাইসেন্স নম্বর খোদাই করা থাকে।</li>
</ul>
</div>
<p>বিশ্বস্ত সুপ্রিম কোর্ট বা জজ কোর্টের কোনো সিনিয়র আইনজীবীর চেম্বারের মাধ্যমে বিয়ে প্রক্রিয়া সম্পন্ন করলে ভুয়া কাজীর প্রতারণার কোনো সুযোগ থাকে না।</p>`
      },
      {
        heading: '৭. পরিবারের অমতে বিয়ে হলে পরিবারের মিথ্যা মামলা (অপহরণ/নারী নির্যাতন) মোকাবিলার আইনি প্রস্তুতি',
        content: `<p>পরিবারের অসম্মতিতে কোর্ট ম্যারেজ করার পর সবচেয়ে বড় যে বিপদের মুখোমুখি হতে হয় তা হলো—মেয়ের অভিভাবক থানায় গিয়ে বরের বিরুদ্ধে কিংবা বরের বাবা-মা ও আত্মীয়-স্বজনের বিরুদ্ধে নারী ও শিশু নির্যাতন দমন আইন ২০০০ এর ৭/৯ ধারা (অপহরণ ও ধর্ষণ) অথবা দণ্ডবিধির ৩৬৫/৩৬৬ ধারায় মিথ্যা মামলা দায়ের করেন।</p>
<p>এই ধরনের সম্ভাব্য পরিস্থিতি মোকাবিলার জন্য বিয়ের দিনই নিচের পূর্বপ্রস্তুতি গ্রহণ করতে হয়:</p>
<ol style="padding-left:1.5rem;color:var(--text-secondary);line-height:2.2">
  <li><strong>নোটারি হলফনামা ও কাবিননামার সার্টিফাইড কপি সংরক্ষণ:</strong> মূল দলিলের অন্তত ৫ সেট নোটারাইজড ফটোকপি বরের নিরাপদ আত্মীয়ের কাছে রাখতে হবে।</li>
  <li><strong>২২ ধারায় ম্যাজিস্ট্রেটের সামনে জবানবন্দি:</strong> যদি মেয়ের পরিবার মামলা করে এবং মেয়ে উদ্ধার হয়, তবে বিজ্ঞ ম্যাজিস্ট্রেটের সামনে ফৌজদারি কার্যবিধির ১৬৪ ধারা বা নারী ও শিশু নির্যাতন আইনের ২২ ধারায় কনেকে সরাসরি সত্য সাক্ষ্য দিতে হবে: <em>"আমি প্রাপ্তবয়স্ক, আমাকে কেউ অপহরণ করেনি, আমি নিজের স্বাধীন ইচ্ছায় বিয়ে করে স্বামীর সাথে সংসার করছি।"</em> এই জবানবন্দি প্রদানের সাথে সাথেই মামলার কার্যকারিতা আইনত নষ্ট হয়ে যায়।</li>
  <li><strong>হাইকোর্ট থেকে আগাম জামিন (Anticipatory Bail):</strong> মামলা দায়ের হলে বরের পরিবারের সদস্যরা গ্রেপ্তার এড়াতে বাংলাদেশ সুপ্রিম কোর্টের হাইকোর্ট বিভাগ থেকে সরাসরি আগাম জামিন গ্রহণ করতে পারেন।</li>
  <li><strong>থানায় সাধারণ ডায়েরি (GD):</strong> বিয়ের পরপরই সংশ্লিষ্ট থানায় বিয়ের তথ্য ও হলফনামা সংযুক্ত করে জিডি করে রাখা যায় যে, তাঁরা প্রাপ্তবয়স্ক এবং স্বেচ্ছায় বিয়ে করেছেন।</li>
</ol>`
      },
      {
        heading: '৮. হিন্দু, খ্রিস্টান ও ভিন্ন ধর্মের অনুসারীদের জন্য বিশেষ বিবাহ আইন ১৮৭২ (Special Marriage Act)',
        content: `<p>কোর্ট ম্যারেজ কেবল মুসলিমদের জন্যই নয়। সনাতন হিন্দু, খ্রিস্টান, বৌদ্ধ কিংবা ভিন্ন ধর্মের দুজন ব্যক্তির মধ্যে বিয়ের ক্ষেত্রে বাংলাদেশে ১৮৭২ সালের বিশেষ বিবাহ আইন (Special Marriage Act, 1872) প্রযোজ্য হয়।</p>
<p>বিশেষ বিবাহ আইনের গুরুত্বপূর্ণ শর্তসমূহ:</p>
<ul style="padding-left:1.5rem;color:var(--text-secondary);line-height:2">
  <li>উভয় পক্ষকে স্ব-স্ব ধর্মীয় বিশ্বাস ত্যাগ করার আনুষ্ঠানিক ঘোষণা দিতে হয় অথবা বিশেষ ম্যারেজ রেজিস্ট্রারের সামনে উপস্থিত হতে হয়।</li>
  <li>বিবাহের ১৪ দিন পূর্বে বিশেষ বিবাহ রেজিস্ট্রারের কাছে বিয়ের আনুষ্ঠানিক নোটিশ (Notice of Intended Marriage) দাখিল করতে হয়।</li>
  <li>উক্ত ১৪ দিনের মধ্যে কোনো আইনগত আপত্তি না আসলে রেজিস্ট্রার নির্ধারিত সরকারি ফি নিয়ে তিন জন সাক্ষীর উপস্থিতিতে বিশেষ বিবাহ রেজিস্ট্রি বইয়ে স্বাক্ষর করান।</li>
</ul>`
      },
      {
        heading: '৯. বিয়ে সম্পন্ন হওয়ার পর কাবিননামা ও হলফনামার অনলাইন রেকর্ড সংরক্ষণ',
        content: `<p>বিয়ে সম্পন্ন হওয়ার সাথে সাথেই কাজীর কাছ থেকে সরকারি ৪ পাতার রঙিন কাবিননামার কপি (স্ত্রী ও স্বামীর কপি) বুঝে নিন। কাবিননামার প্রতিটি কলাম (বিশেষ করে দেনমোহরের পরিমাণ, কত টাকা উসুল বা বাকি, এবং ১৮ নম্বর কলামে স্ত্রীকে তালাক প্রদানের ক্ষমতা বা 'তালাক-ই-তাফউইজ' দেওয়া হয়েছে কিনা) ভালোভাবে পড়ে সই করুন।</p>
<p>পরবর্তীতে বিদেশে উচ্চশিক্ষা, স্পাউস ভিসা কিংবা পাসপোর্টে জীবনসঙ্গীর নাম অন্তর্ভুক্তির জন্য এই কাবিননামাটি আইন মন্ত্রণালয় এবং পররাষ্ট্র মন্ত্রণালয় (Ministry of Foreign Affairs) থেকে নোটারি ও সত্যায়িত (Attestation) করিয়ে নিতে হয়।</p>`
      },
      {
        heading: '১০. প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী (FAQ)',
        content: `<div style="display:flex;flex-direction:column;gap:1rem;margin:1.5rem 0">
<div style="background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1.25rem">
  <h4 style="color:var(--accent);margin:0 0 0.5rem 0">প্রশ্ন: অভিভাবকের সম্মতি ছাড়া কোর্ট ম্যারেজ করলে কি বিয়েটি বৈধ হয়?</h4>
  <p style="margin:0;color:var(--text-secondary);line-height:1.8"><strong>উত্তর:</strong> হ্যাঁ। মুসলিম পারিবারিক আইন এবং বাংলাদেশের সাধারণ আইন অনুযায়ী ছেলে ও মেয়ে উভয়ই যদি প্রাপ্তবয়স্ক (মেয়ে ১৮ ও ছেলে ২১) এবং সুস্থ মস্তিষ্কের অধিকারী হন, তবে অভিভাবকের অনুমতি ছাড়াও তাঁদের স্বাধীন সম্মতিতে সম্পাদিত বিয়ে শতভাগ আইনসম্মত ও বৈধ।</p>
</div>
<div style="background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1.25rem">
  <h4 style="color:var(--accent);margin:0 0 0.5rem 0">প্রশ্ন: কোর্ট ম্যারেজ করতে কত সময় লাগে?</h4>
  <p style="margin:0;color:var(--text-secondary);line-height:1.8"><strong>উত্তর:</strong> কাগজপত্র প্রস্তুত থাকলে আইনজীবী চেম্বারে হলফনামা তৈরি, নোটারি পাবলিকের সত্যায়ন এবং কাজীর মাধ্যমে নিকাহ রেজিস্ট্রেশন সম্পন্ন করতে সাধারণত মাত্র ২ থেকে ৩ ঘণ্টা সময় লাগে।</p>
</div>
<div style="background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1.25rem">
  <h4 style="color:var(--accent);margin:0 0 0.5rem 0">প্রশ্ন: সাক্ষী হিসেবে কি যেকাউকে নেওয়া যায়?</h4>
  <p style="margin:0;color:var(--text-secondary);line-height:1.8"><strong>উত্তর:</strong> হ্যাঁ, যেকোনো প্রাপ্তবয়স্ক, সুস্থ মস্তিষ্কের ব্যক্তি (বন্ধু, সহকর্মী বা পরিচিত যেকেউ) সাক্ষী হতে পারেন। সাক্ষীর কোনো আত্মীয় হওয়ার আইনি বাধ্যবাধকতা নেই।</p>
</div>
<div style="background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1.25rem">
  <h4 style="color:var(--accent);margin:0 0 0.5rem 0">প্রশ্ন: শুধু কোর্টের হলফনামা দিয়ে কি সংসার করা নিরাপদ?</h4>
  <p style="margin:0;color:var(--text-secondary);line-height:1.8"><strong>উত্তর:</strong> একেবারেই নিরাপদ নয়। কাজীর সরকারি নিকাহনামা ছাড়া শুধু কোর্টের এফিডেভিট বিয়ের পূর্ণাঙ্গ প্রমাণ নয় এবং ভবিষ্যতে যেকোনো আইনি বিরোধে তা বাতিল হতে পারে। সর্বদা নিকাহ রেজিস্ট্রি করিয়ে নেওয়া আবশ্যক।</p>
</div>
</div>`
      },
      {
        heading: '১১. নিরাপদ ও আইনসঙ্গত কোর্ট ম্যারেজে সুপ্রিম কোর্টের বিজ্ঞ আইনজীবীর আইনি পরামর্শ',
        content: `<p>ভালোবাসার মানুষকে জীবনসঙ্গী করার সিদ্ধান্তটি আবেগের হলেও এর আইনি প্রক্রিয়াটি হতে হবে শতভাগ সুরক্ষিত ও নিশ্ছিদ্র। কোনো অপেশাদার মধ্যস্বত্বভোগী বা ভুয়া কাজীর খপ্পরে না পড়ে সরাসরি উচ্চ আদালতের আইনজীবীর চেম্বারে বসে সম্পূর্ণ গোপনীয়তা ও নিরাপত্তার সাথে আইনি প্রক্রিয়া সম্পন্ন করা বুদ্ধিমানের কাজ।</p>
<div style="background:linear-gradient(135deg,rgba(26,63,191,0.08) 0%,rgba(198,167,94,0.06) 100%);border:1px solid rgba(26,63,191,0.18);border-radius:1rem;padding:1.5rem;margin:1.5rem 0;text-align:center">
<h3 style="color:var(--accent);margin:0 0 0.5rem 0">🏛️ নিরাপদ কোর্ট ম্যারেজ, হলফনামা ও পারিবারিক আইনি সুরক্ষার জন্য</h3>
<p style="margin:0 0 1rem 0;color:var(--text-secondary);font-size:1rem">১০+ বছরের অভিজ্ঞ সুপ্রিম কোর্ট ও জজ কোর্টের পারিবারিক ও ফৌজদারি আইন বিশেষজ্ঞ</p>
<p style="margin:0 0 1.25rem 0;font-size:1.15rem;font-weight:bold;color:var(--text)">অ্যাডভোকেট মোঃ শাহ আলম — ঢাকা উত্তরা ও জজ কোর্ট চেম্বার</p>
<a href="/contact" style="display:inline-block;padding:0.75rem 1.8rem;background:#1B365D;color:#fff;border-radius:0.5rem;font-weight:bold;text-decoration:none;margin-right:0.5rem">সরাসরি অ্যাপয়েন্টমেন্ট নিন</a>
<a href="https://wa.me/8801712655546" target="_blank" rel="noopener" style="display:inline-block;padding:0.75rem 1.8rem;background:#25D366;color:#fff;border-radius:0.5rem;font-weight:bold;text-decoration:none">💬 WhatsApp পরামর্শ</a>
</div>`
      }
    ],
    faqs: [
      {
        question: 'অভিভাবকের অনুমতি ছাড়া কোর্ট ম্যারেজ করলে কি বিয়ে বৈধ হয়?',
        answer: 'উভয় পক্ষ প্রাপ্তবয়স্ক (মেয়ে ১৮, ছেলে ২১) হলে অভিভাবকদের সম্মতি ছাড়াও বিয়ে শতভাগ আইনসম্মত ও বৈধ।'
      },
      {
        question: 'কোর্ট ম্যারেজ করতে মোট কত টাকা খরচ হয়?',
        answer: 'সরকারি নোটারি ও নিকাহ ফি এবং আইনজীবী ফিসহ সাধারণত ৪,০০০ থেকে ৮,০০০ টাকার মধ্যে সম্পন্ন হয়।'
      },
      {
        question: 'কোর্ট ম্যারেজে কি কি কাগজ লাগে?',
        answer: 'এনআইডি বা ডিজিটাল জন্ম নিবন্ধন সনদ, ৩ কপি পাসপোর্ট সাইজ ছবি এবং দুজন প্রাপ্তবয়স্ক সাক্ষীর এনআইডি।'
      },
      {
        question: 'শুধু নোটারি পাবলিকের হলফনামা কি বিয়ের জন্য যথেষ্ট?',
        answer: 'না, সরকারি নিকাহ রেজিস্ট্রারের (কাজী) কাবিননামা ছাড়া শুধু হলফনামা আইনের দৃষ্টিতে সম্পূর্ণ বিয়ে নয়।'
      },
      {
        question: 'পরিবার মামলা করলে বরের সুরক্ষার উপায় কী?',
        answer: 'মেয়ে নিজে আদালতে ১৬৪ বা ২২ ধারায় স্বেচ্ছায় বিয়ের জবানবন্দি দিলে মামলা বাতিল হয়ে যায়।'
      }
    ],
    featured: false,
    impressions: 230,
    clicks: 26
  }
];

posts.forEach(post => {
  const filePath = path.join(targetDir, `${post.slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(post, null, 2), 'utf8');
  let text = post.heroIntro + ' ' + post.sections.map(s => s.heading + ' ' + s.content).join(' ');
  const words = text.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  console.log(`✓ Created: ${post.slug}.json (${words} words)`);
});
