const fs = require('fs');
const path = require('path');

const bnDir = path.join(__dirname, '..', 'src', 'content', 'posts', 'bn');

const articles = [

// ============================================================
// ARTICLE 6: স্বামীর দ্বিতীয় বিয়েতে প্রথম স্ত্রীর অধিকার ২০২৬
// ============================================================
{
  file: 'swami-dwitio-biye-prothom-stree-odhikar-2026.json',
  data: {
    slug: 'swami-dwitio-biye-prothom-stree-odhikar-2026',
    category: 'পারিবারিক আইন',
    title: 'স্বামীর দ্বিতীয় বিয়েতে প্রথম স্ত্রীর আইনি অধিকার কী? ২০২৬ সালের সম্পূর্ণ গাইড',
    metaTitle: 'স্বামীর দ্বিতীয় বিয়েতে প্রথম স্ত্রীর অধিকার ২০২৬ | বাংলাদেশ পারিবারিক আইন',
    metaDescription: 'স্বামী দ্বিতীয় বিয়ে করলে প্রথম স্ত্রী কী করতে পারেন? অনুমতি ছাড়া দ্বিতীয় বিয়ে কি অবৈধ? ভরণপোষণ, ডিভোর্স ও ক্ষতিপূরণের অধিকার জানুন।',
    keywords: [
      'স্বামীর দ্বিতীয় বিয়েতে প্রথম স্ত্রীর অধিকার',
      'second marriage without permission bangladesh',
      'দ্বিতীয় বিয়ে অনুমতি বাংলাদেশ',
      'second wife rights bangladesh',
      'polygamy law bangladesh'
    ],
    publishedDate: '2026-09-02',
    lastModified: '2026-09-02',
    readTime: '১৩ মিনিট',
    heroIntro: '<p>স্বামী জানান না দিয়ে বা অনুমতি না নিয়ে দ্বিতীয় বিয়ে করেছেন? এটি বাংলাদেশের আইনে গুরুতর অপরাধ। প্রথম স্ত্রী হিসেবে আপনার আইনি অধিকার আছে — জানুন কীভাবে নিজেকে রক্ষা করবেন এবং ন্যায়বিচার পাবেন। পরামর্শের জন্য: <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold">অ্যাডভোকেট মোঃ শাহ আলম</a> — <a href="tel:01712655546" style="color:var(--gold);font-weight:bold">📞 01712655546</a></p>',
    quickAnswer: {
      heading: '⚡ দ্বিতীয় বিয়েতে প্রথম স্ত্রীর অধিকার',
      points: [
        'অনুমতি ছাড়া দ্বিতীয় বিয়ে: মুসলিম পারিবারিক আইন অধ্যাদেশ ১৯৬১-এ অপরাধ',
        'শাস্তি: সর্বোচ্চ ১ বছর কারাদণ্ড বা ১০,০০০ টাকা জরিমানা',
        'প্রথম স্ত্রীর অধিকার: ডিভোর্স, ভরণপোষণ, দেনমোহর আদায়',
        'আবেদন: ইউনিয়ন পরিষদ চেয়ারম্যানের মাধ্যমে বা পারিবারিক আদালতে',
        'কাবিননামায় তালাক ক্ষমতা থাকলে সরাসরি তালাক দেওয়া যাবে'
      ]
    },
    toc: [
      'বাংলাদেশে দ্বিতীয় বিয়ের আইন কী?',
      'অনুমতি ছাড়া দ্বিতীয় বিয়ে কি অবৈধ?',
      'প্রথম স্ত্রীর আইনি অধিকার সমূহ',
      'দ্বিতীয় বিয়েতে অনুমতি না নিলে কী শাস্তি?',
      'প্রথম স্ত্রী কী পদক্ষেপ নিতে পারেন?',
      'দেনমোহর ও ভরণপোষণ কীভাবে আদায় করবেন?',
      'দ্বিতীয় স্ত্রী ও সন্তানের অধিকার',
      'আইনজীবীর পরামর্শ'
    ],
    sections: [
      {
        heading: '১. বাংলাদেশে দ্বিতীয় বিয়ের আইন কী?',
        content: `<p>মুসলিম পারিবারিক আইন অধ্যাদেশ ১৯৬১ (Muslim Family Laws Ordinance 1961) অনুযায়ী বাংলাদেশে মুসলিম পুরুষ একাধিক বিয়ে করতে পারেন, তবে নির্দিষ্ট শর্তে।</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-left:4px solid var(--accent);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:var(--accent);margin:0 0 0.75rem 0">📌 দ্বিতীয় বিয়ের আইনি শর্ত</h4>
<ul style="margin:0;padding-left:1.5rem;color:var(--text-secondary);line-height:2">
<li>সালিশি পরিষদ (Arbitration Council)-এর অনুমতি নিতে হবে</li>
<li>সালিশি পরিষদ = ইউনিয়ন পরিষদ/পৌরসভার চেয়ারম্যানের নেতৃত্বে গঠিত কমিটি</li>
<li>প্রথম স্ত্রীকে নোটিশ দিতে হবে</li>
<li>প্রথম স্ত্রীর মতামত শুনতে হবে</li>
<li>পরিষদ সন্তুষ্ট হলে অনুমতি দেবে</li>
</ul>
</div>
<div style="background:rgba(220,53,69,0.08);border:1px solid rgba(220,53,69,0.25);border-radius:0.75rem;padding:1rem;margin:1rem 0">
<p style="margin:0"><strong>⚠️ গুরুত্বপূর্ণ:</strong> অনুমতি ছাড়া দ্বিতীয় বিয়ে আইনত বৈধ — কিন্তু অপরাধমূলক। অর্থাৎ দ্বিতীয় বিয়েটি বাতিল নয়, তবে আইন লঙ্ঘনের জন্য শাস্তি হবে।</p>
</div>`
      },
      {
        heading: '২. অনুমতি ছাড়া দ্বিতীয় বিয়ে কি অবৈধ?',
        content: `<p>অনেকের মনে প্রশ্ন — অনুমতি ছাড়া দ্বিতীয় বিয়ে কি আদৌ বৈধ? উত্তর একটু জটিল।</p>
<div style="overflow-x:auto;margin:1.25rem 0">
<table style="width:100%;border-collapse:collapse;font-size:0.95rem">
<thead><tr style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff">
<th style="padding:0.85rem 1rem;text-align:left">বিষয়</th>
<th style="padding:0.85rem 1rem;text-align:left">উত্তর</th>
</tr></thead>
<tbody>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">দ্বিতীয় বিয়ে কি বাতিল হবে?</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)"><strong>না</strong> — বিয়ে বৈধ থাকবে</td></tr>
<tr><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">কি শাস্তি হবে?</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">১ বছর কারাদণ্ড বা ১০,০০০ টাকা জরিমানা বা উভয়</td></tr>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">কে মামলা করতে পারবেন?</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">প্রথম স্ত্রী</td></tr>
<tr><td style="padding:0.85rem 1rem">প্রথম স্ত্রী কি ডিভোর্স নিতে পারবেন?</td><td style="padding:0.85rem 1rem"><strong>হ্যাঁ</strong> — এটিকে কারণ হিসেবে দেখিয়ে</td></tr>
</tbody>
</table>
</div>`
      },
      {
        heading: '৩. প্রথম স্ত্রীর আইনি অধিকার সমূহ',
        content: `<p>দ্বিতীয় বিয়ের ক্ষেত্রে প্রথম স্ত্রী বেশ কিছু গুরুত্বপূর্ণ আইনি অধিকার রাখেন।</p>
<div style="display:grid;grid-template-columns:1fr;gap:0.75rem;margin:1.25rem 0">
<div style="background:rgba(26,63,191,0.06);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<h4 style="color:var(--accent);margin:0 0 0.5rem 0">⚖️ ফৌজদারি মামলার অধিকার</h4>
<p style="margin:0;color:var(--text-secondary);font-size:0.9rem;line-height:1.8">MFLO 1961-এর ধারা ৬ অনুযায়ী অনুমতি ছাড়া দ্বিতীয় বিয়ের জন্য ফৌজদারি মামলা করতে পারবেন।</p>
</div>
<div style="background:rgba(26,63,191,0.06);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<h4 style="color:var(--accent);margin:0 0 0.5rem 0">💰 দেনমোহর আদায়ের অধিকার</h4>
<p style="margin:0;color:var(--text-secondary);font-size:0.9rem;line-height:1.8">কাবিননামায় উল্লিখিত সম্পূর্ণ দেনমোহর একসাথে পরিশোধের দাবি করতে পারবেন।</p>
</div>
<div style="background:rgba(26,63,191,0.06);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<h4 style="color:var(--accent);margin:0 0 0.5rem 0">🏠 ভরণপোষণের অধিকার</h4>
<p style="margin:0;color:var(--text-secondary);font-size:0.9rem;line-height:1.8">স্বামী দ্বিতীয় বিয়ে করলেও প্রথম স্ত্রীর ভরণপোষণের দায় স্বামীর উপর থাকে।</p>
</div>
<div style="background:rgba(26,63,191,0.06);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<h4 style="color:var(--accent);margin:0 0 0.5rem 0">📝 ডিভোর্সের অধিকার</h4>
<p style="margin:0;color:var(--text-secondary);font-size:0.9rem;line-height:1.8">দ্বিতীয় বিয়েকে কারণ হিসেবে দেখিয়ে পারিবারিক আদালতে বিবাহ বিচ্ছেদের মামলা করতে পারবেন।</p>
</div>
</div>`
      },
      {
        heading: '৪. প্রথম স্ত্রী কী পদক্ষেপ নিতে পারেন?',
        content: `<p>দ্বিতীয় বিয়ের ঘটনায় প্রথম স্ত্রী একাধিক পদক্ষেপ নিতে পারেন।</p>
<div style="margin:1.25rem 0">
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">১</div>
<div><h4 style="margin:0 0 0.4rem 0">আইনজীবীর সাথে পরামর্শ করুন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">কোন পদক্ষেপ আপনার জন্য সবচেয়ে উপযুক্ত তা আইনজীবীর কাছে জানুন।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">২</div>
<div><h4 style="margin:0 0 0.4rem 0">ফৌজদারি মামলা করুন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">ম্যাজিস্ট্রেট আদালতে MFLO ৬ ধারায় মামলা দায়ের করুন।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">৩</div>
<div><h4 style="margin:0 0 0.4rem 0">পারিবারিক আদালতে যান</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">দেনমোহর, ভরণপোষণ ও ডিভোর্সের জন্য পারিবারিক আদালতে মামলা।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--gold);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">৪</div>
<div><h4 style="margin:0 0 0.4rem 0">কাবিননামার তালাক ক্ষমতা ব্যবহার করুন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">কাবিননামার ১৮ নং কলামে তালাক ক্ষমতা থাকলে সরাসরি তালাক দিতে পারবেন।</p></div>
</div>
</div>`
      },
      {
        heading: '৫. আইনজীবীর পরামর্শ',
        content: `<div style="background:linear-gradient(135deg,rgba(26,63,191,0.08),rgba(198,167,94,0.08));padding:1.5rem;border-radius:1rem;border:1px solid var(--gold);margin:1.5rem 0">
<h3 style="margin:0 0 0.75rem 0;color:var(--text)">⚖️ পারিবারিক আইনি সহায়তা</h3>
<p style="margin:0 0 1.25rem 0;color:var(--text-secondary);line-height:1.8">স্বামীর দ্বিতীয় বিয়ের ঘটনায় দিশেহারা হবেন না। অ্যাডভোকেট মোঃ শাহ আলম আপনার আইনি অধিকার রক্ষায় সহায়তা করবেন।</p>
<div style="display:flex;gap:1rem;flex-wrap:wrap">
<a href="tel:01712655546" style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">📞 কল করুন: 01712655546</a>
<a href="https://wa.me/8801712655546" target="_blank" style="background:#25D366;color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">💬 WhatsApp</a>
</div>
</div>`
      }
    ],
    faqs: [
      { question: 'স্বামী অনুমতি ছাড়া দ্বিতীয় বিয়ে করলে প্রথম স্ত্রী কী করতে পারেন?', answer: 'MFLO 1961-এর ধারা ৬ অনুযায়ী ফৌজদারি মামলা করতে পারেন। সেইসাথে দেনমোহর, ভরণপোষণ আদায় ও বিবাহ বিচ্ছেদের মামলাও করতে পারেন।' },
      { question: 'অনুমতি ছাড়া দ্বিতীয় বিয়েতে কী শাস্তি?', answer: 'সর্বোচ্চ ১ বছর কারাদণ্ড এবং/অথবা ১০,০০০ টাকা জরিমানা (MFLO ১৯৬১, ধারা ৬)।' },
      { question: 'দ্বিতীয় বিয়ের পরেও কি স্বামী প্রথম স্ত্রীর ভরণপোষণ দিতে বাধ্য?', answer: 'হ্যাঁ। দ্বিতীয় বিয়ে করলেও প্রথম স্ত্রী বৈধভাবে বিবাহিত থাকলে ভরণপোষণ পাওয়ার অধিকার আছে।' },
      { question: 'কাবিননামায় তালাক ক্ষমতা কী?', answer: 'কাবিননামার ১৮ নং কলামে স্ত্রীকে তালাক প্রদানের ক্ষমতা দেওয়া থাকলে স্ত্রী নিজে তালাক দিতে পারেন। এই ক্ষমতা স্ত্রীর পক্ষে অত্যন্ত গুরুত্বপূর্ণ।' },
      { question: 'দ্বিতীয় বিয়ে হলে কি প্রথম স্ত্রীর সন্তান সম্পত্তির ভাগ পাবে?', answer: 'হ্যাঁ, প্রথম বিয়ের সন্তান সম্পূর্ণ আইনি উত্তরাধিকারী। দ্বিতীয় বিয়ের কারণে তাদের অধিকার কমে না।' }
    ],
    featured: false,
    impressions: 75,
    clicks: 3
  }
},

// ============================================================
// ARTICLE 7: জমির দলিল হারিয়ে গেলে কী করবেন ২০২৬
// ============================================================
{
  file: 'jomi-dalil-hariye-gele-koronio-2026.json',
  data: {
    slug: 'jomi-dalil-hariye-gele-koronio-2026',
    category: 'ভূমি আইন',
    title: 'জমির দলিল হারিয়ে গেলে কী করবেন? সার্টিফাইড কপি পাওয়ার সম্পূর্ণ উপায় ২০২৬',
    metaTitle: 'জমির দলিল হারিয়ে গেলে করণীয় ২০২৬ | সার্টিফাইড কপি পাওয়ার নিয়ম বাংলাদেশ',
    metaDescription: 'জমির দলিল হারিয়ে গেলে কি মালিকানা যাবে? সার্টিফাইড কপি কোথায় পাবেন? সাব-রেজিস্ট্রি অফিস থেকে দলিলের নকল পাওয়ার সম্পূর্ণ প্রক্রিয়া ২০২৬।',
    keywords: [
      'জমির দলিল হারিয়ে গেলে করণীয়',
      'দলিলের সার্টিফাইড কপি পাওয়ার নিয়ম',
      'land document lost bangladesh',
      'certified copy of deed bangladesh',
      'দলিলের নকল সাব-রেজিস্ট্রি'
    ],
    publishedDate: '2026-09-02',
    lastModified: '2026-09-02',
    readTime: '১১ মিনিট',
    heroIntro: '<p>ঘরের দলিলপত্র খুঁজে পাচ্ছেন না? বন্যায়, আগুনে বা চুরিতে হারিয়ে গেছে? ঘাবড়াবেন না — জমির দলিল হারালে মালিকানা যায় না। সার্টিফাইড কপি পেতে কোথায় যাবেন এবং কীভাবে আবেদন করবেন সব জানুন। পরামর্শের জন্য: <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold">অ্যাডভোকেট মোঃ শাহ আলম</a> — <a href="tel:01712655546" style="color:var(--gold);font-weight:bold">📞 01712655546</a></p>',
    quickAnswer: {
      heading: '⚡ দলিল হারিয়ে গেলে — তাৎক্ষণিক করণীয়',
      points: [
        'প্রথমে: থানায় সাধারণ ডায়েরি (GD) করুন',
        'দলিলের নকল/সার্টিফাইড কপি: সাব-রেজিস্ট্রি অফিস থেকে',
        'প্রয়োজনীয়: দলিলের নম্বর, বছর, মৌজা জানলে সহজ',
        'অনলাইনেও: eregistry.gov.bd-এ দলিলের তথ্য পাওয়া যায়',
        'দলিল হারালে মালিকানা যায় না — রেকর্ড সরকারের কাছে থাকে'
      ]
    },
    toc: [
      'দলিল হারিয়ে গেলে কি জমির মালিকানা যায়?',
      'প্রথমে কী করবেন — থানায় GD',
      'সাব-রেজিস্ট্রি অফিস থেকে সার্টিফাইড কপি পাওয়ার নিয়ম',
      'অনলাইনে দলিলের তথ্য খোঁজার উপায়',
      'দলিল নম্বর না জানলে কী করবেন?',
      'কেউ আপনার দলিল ব্যবহার করে জমি বিক্রি করলে কী করবেন?',
      'আইনজীবীর সহায়তা'
    ],
    sections: [
      {
        heading: '১. দলিল হারিয়ে গেলে কি জমির মালিকানা যায়?',
        content: `<p>না। দলিল শুধু একটি প্রমাণপত্র — জমির মালিকানার প্রমাণ সরকারি রেকর্ডে থাকে। মূল দলিল হারালে সার্টিফাইড কপি দিয়েও সব কাজ করা যায়।</p>
<div style="background:rgba(40,167,69,0.08);border:1px solid rgba(40,167,69,0.25);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:#28a745;margin:0 0 0.75rem 0">✅ যে কারণে চিন্তা নেই</h4>
<ul style="margin:0;padding-left:1.5rem;color:var(--text-secondary);line-height:2">
<li>সাব-রেজিস্ট্রি অফিসে সব রেজিস্টার্ড দলিলের কপি সংরক্ষিত থাকে</li>
<li>সার্টিফাইড কপি মূল দলিলের সমান আইনি মূল্য রাখে</li>
<li>খতিয়ান, নামজারি ও ট্যাক্স রসিদ দিয়েও মালিকানা প্রমাণ করা যায়</li>
</ul>
</div>`
      },
      {
        heading: '২. প্রথমে কী করবেন — থানায় GD',
        content: `<p>দলিল হারানোর সাথে সাথে থানায় সাধারণ ডায়েরি (General Diary) করুন। এটি অত্যন্ত গুরুত্বপূর্ণ।</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-left:4px solid var(--gold);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:var(--gold);margin:0 0 0.75rem 0">📌 GD করা জরুরি কেন?</h4>
<ul style="margin:0;padding-left:1.5rem;color:var(--text-secondary);line-height:2">
<li>কেউ আপনার দলিল ব্যবহার করে প্রতারণা করলে আপনাকে রক্ষা করবে</li>
<li>সার্টিফাইড কপি নেওয়ার সময় GD নম্বর কাজে আসতে পারে</li>
<li>সরকারি ও আইনি প্রক্রিয়ায় প্রমাণ হিসেবে ব্যবহার করা যায়</li>
</ul>
</div>`
      },
      {
        heading: '৩. সাব-রেজিস্ট্রি অফিস থেকে সার্টিফাইড কপি পাওয়ার নিয়ম',
        content: `<p>হারানো দলিলের সার্টিফাইড কপি পাওয়ার মূল জায়গা হলো সাব-রেজিস্ট্রি অফিস।</p>
<div style="margin:1.25rem 0">
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">১</div>
<div><h4 style="margin:0 0 0.4rem 0">সংশ্লিষ্ট সাব-রেজিস্ট্রি অফিসে যান</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">যেখানে মূল দলিল রেজিস্ট্রি হয়েছিল সেই অফিসে যান।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">২</div>
<div><h4 style="margin:0 0 0.4rem 0">আবেদন ফরম পূরণ করুন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">দলিলের নম্বর, বছর, মৌজার নাম, পক্ষের নাম উল্লেখ করুন।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">৩</div>
<div><h4 style="margin:0 0 0.4rem 0">ফি দিন ও আবেদন জমা করুন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">নির্ধারিত ফি পরিশোধ করুন (পৃষ্ঠাপ্রতি চার্জ থাকতে পারে)।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--gold);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">৪</div>
<div><h4 style="margin:0 0 0.4rem 0">৭-১৫ দিনের মধ্যে সার্টিফাইড কপি সংগ্রহ করুন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">অফিস থেকে জানাবে কবে আসতে হবে।</p></div>
</div>
</div>`
      },
      {
        heading: '৪. আইনজীবীর সহায়তা',
        content: `<div style="background:linear-gradient(135deg,rgba(26,63,191,0.08),rgba(198,167,94,0.08));padding:1.5rem;border-radius:1rem;border:1px solid var(--gold);margin:1.5rem 0">
<h3 style="margin:0 0 0.75rem 0;color:var(--text)">⚖️ দলিল সংক্রান্ত সহায়তা</h3>
<p style="margin:0 0 1.25rem 0;color:var(--text-secondary);line-height:1.8">দলিল হারানো বা দলিল সংক্রান্ত যেকোনো সমস্যায় অ্যাডভোকেট মোঃ শাহ আলমের সাথে যোগাযোগ করুন।</p>
<div style="display:flex;gap:1rem;flex-wrap:wrap">
<a href="tel:01712655546" style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">📞 কল করুন: 01712655546</a>
<a href="https://wa.me/8801712655546" target="_blank" style="background:#25D366;color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">💬 WhatsApp</a>
</div>
</div>`
      }
    ],
    faqs: [
      { question: 'দলিল হারিয়ে গেলে কি জমি অন্যে নিয়ে যেতে পারবে?', answer: 'শুধু দলিল থাকলেই জমি নেওয়া যায় না — নামজারি, খতিয়ান ও রেকর্ড দেখা যায়। তবে যদি কেউ জাল দলিল তৈরি করে প্রতারণা করে, তাহলে আইনি সহায়তা নিন।' },
      { question: 'সার্টিফাইড কপি পেতে কত টাকা লাগে?', answer: 'সাধারণত পৃষ্ঠাপ্রতি ২০-৫০ টাকা। মোট খরচ ২০০-১০০০ টাকার মধ্যে হয়।' },
      { question: 'দলিলের নম্বর না জানলে কি কপি পাওয়া যাবে?', answer: 'হ্যাঁ, মৌজার নাম, বছর, দলিলের পক্ষের নাম দিয়েও খোঁজা যায়। eregistry.gov.bd-এও সার্চ করতে পারবেন।' },
      { question: 'সার্টিফাইড কপি কি মূল দলিলের মতো ব্যবহার করা যায়?', answer: 'হ্যাঁ। আদালতে বা যেকোনো সরকারি কাজে সার্টিফাইড কপি মূল দলিলের সমান গ্রহণযোগ্য।' },
      { question: 'অনলাইনে কি দলিলের কপি পাওয়া যায়?', answer: 'eregistry.gov.bd পোর্টালে নিবন্ধিত দলিলের তথ্য অনলাইনে দেখা যায়। তবে সার্টিফাইড কপি সাব-রেজিস্ট্রি অফিস থেকেই নিতে হবে।' }
    ],
    featured: false,
    impressions: 62,
    clicks: 2
  }
},

// ============================================================
// ARTICLE 8: যৌতুক মামলা থেকে বাঁচার উপায় ২০২৬
// ============================================================
{
  file: 'yautuk-mamla-theke-bachar-ain-prokriya-2026.json',
  data: {
    slug: 'yautuk-mamla-theke-bachar-ain-prokriya-2026',
    category: 'ফৌজদারি আইন',
    title: 'যৌতুক মামলা থেকে বাঁচার আইনি উপায় ২০২৬ — মিথ্যা যৌতুক অভিযোগে প্রতিরক্ষা',
    metaTitle: 'যৌতুক মামলা থেকে বাঁচার উপায় ২০২৬ | মিথ্যা যৌতুক অভিযোগ প্রতিরোধ',
    metaDescription: 'যৌতুক মামলায় গ্রেফতার হলে কী করবেন? জামিন, মামলা খারিজ ও মিথ্যা যৌতুক অভিযোগের বিরুদ্ধে আইনি প্রতিরক্ষার সম্পূর্ণ গাইড ২০২৬।',
    keywords: [
      'যৌতুক মামলা থেকে বাঁচার উপায়',
      'মিথ্যা যৌতুক মামলা প্রতিরক্ষা',
      'dowry case defense bangladesh',
      'যৌতুক মামলায় জামিন',
      'false dowry case bangladesh'
    ],
    publishedDate: '2026-09-02',
    lastModified: '2026-09-02',
    readTime: '১৪ মিনিট',
    heroIntro: '<p>যৌতুক মামলায় ফেঁসে গেছেন? বিবাহ বিচ্ছেদের পর স্ত্রী বা তার পরিবার যৌতুকের মিথ্যা অভিযোগ দিয়েছে? এই মামলায় সঠিক আইনি পদক্ষেপ না নিলে বড় বিপদে পড়তে পারেন। এখনই আইনজীবীর সাহায্য নিন। পরামর্শের জন্য: <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold">অ্যাডভোকেট মোঃ শাহ আলম</a> — <a href="tel:01712655546" style="color:var(--gold);font-weight:bold">📞 01712655546</a></p>',
    quickAnswer: {
      heading: '⚡ যৌতুক মামলায় তাৎক্ষণিক করণীয়',
      points: [
        'গ্রেফতার হলে: চুপ থাকুন, আইনজীবীর আগে কিছু বলবেন না',
        'দ্রুত জামিন নিন: যৌতুক মামলায় আগাম জামিনও নেওয়া যায়',
        'প্রমাণ সংগ্রহ: বিয়ের খরচের রসিদ, SMS, সাক্ষী',
        'মিথ্যা প্রমাণ হলে পাল্টা মামলা করুন',
        'হাইকোর্টে FIR Quash আবেদন করুন'
      ]
    },
    toc: [
      'যৌতুক আইনে কী বলা আছে?',
      'গ্রেফতার হলে প্রথম ২৪ ঘণ্টায় কী করবেন?',
      'যৌতুক মামলায় জামিন নেওয়ার নিয়ম',
      'মামলায় প্রতিরক্ষার জন্য যা প্রমাণ লাগবে',
      'মিথ্যা যৌতুক মামলা খারিজ করার উপায়',
      'পাল্টা মামলা করতে পারবেন?',
      'আইনি সহায়তা'
    ],
    sections: [
      {
        heading: '১. যৌতুক আইনে কী বলা আছে?',
        content: `<p>বাংলাদেশে যৌতুক সংক্রান্ত দুটি প্রধান আইন আছে।</p>
<div style="overflow-x:auto;margin:1.25rem 0">
<table style="width:100%;border-collapse:collapse;font-size:0.95rem">
<thead><tr style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff">
<th style="padding:0.85rem 1rem;text-align:left">আইন</th>
<th style="padding:0.85rem 1rem;text-align:left">অভিযোগ</th>
<th style="padding:0.85rem 1rem;text-align:left">সর্বোচ্চ শাস্তি</th>
</tr></thead>
<tbody>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">যৌতুক নিরোধ আইন ১৯৮০</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">যৌতুক দাবি করা বা নেওয়া</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">৫ বছর কারাদণ্ড</td></tr>
<tr><td style="padding:0.85rem 1rem">নারী ও শিশু নির্যাতন দমন আইন ২০০০</td><td style="padding:0.85rem 1rem">যৌতুকের জন্য নির্যাতন বা হত্যা</td><td style="padding:0.85rem 1rem">যাবজ্জীবন বা মৃত্যুদণ্ড</td></tr>
</tbody>
</table>
</div>
<div style="background:rgba(198,167,94,0.1);border:1px solid var(--gold);border-radius:0.75rem;padding:1rem;margin:1rem 0">
<p style="margin:0"><strong>💡 গুরুত্বপূর্ণ:</strong> যৌতুক মামলায় অভিযুক্ত হওয়া মানেই দোষী নয়। রাষ্ট্রপক্ষকে প্রমাণ করতে হবে।</p>
</div>`
      },
      {
        heading: '২. গ্রেফতার হলে প্রথম ২৪ ঘণ্টায় কী করবেন?',
        content: `<p>গ্রেফতারের প্রথম ২৪ ঘণ্টা মামলার ফলাফলে বড় প্রভাব রাখতে পারে।</p>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:1.25rem 0">
<div style="background:rgba(40,167,69,0.08);border:1px solid rgba(40,167,69,0.25);border-radius:0.75rem;padding:1rem">
<h4 style="color:#28a745;margin:0 0 0.75rem 0">✅ করণীয়</h4>
<ul style="margin:0;padding-left:1.25rem;color:var(--text-secondary);font-size:0.9rem;line-height:1.9">
<li>পরিবারকে অবিলম্বে জানান</li>
<li>আইনজীবী ডাকুন</li>
<li>নীরব থাকুন</li>
<li>৩৬ ঘণ্টার মধ্যে ম্যাজিস্ট্রেটের সামনে উপস্থাপনের অধিকার দাবি করুন</li>
<li>জামিনের আবেদন করুন</li>
</ul>
</div>
<div style="background:rgba(220,53,69,0.08);border:1px solid rgba(220,53,69,0.25);border-radius:0.75rem;padding:1rem">
<h4 style="color:#dc3545;margin:0 0 0.75rem 0">❌ করবেন না</h4>
<ul style="margin:0;padding-left:1.25rem;color:var(--text-secondary);font-size:0.9rem;line-height:1.9">
<li>পুলিশের কাছে বক্তব্য দেবেন না</li>
<li>কাগজে স্বাক্ষর করবেন না</li>
<li>অভিযোগকারীর সাথে যোগাযোগ করবেন না</li>
<li>সোশ্যাল মিডিয়ায় পোস্ট দেবেন না</li>
</ul>
</div>
</div>`
      },
      {
        heading: '৩. মামলায় প্রতিরক্ষার জন্য যা প্রমাণ লাগবে',
        content: `<p>যৌতুক মামলায় প্রতিরক্ষার জন্য শক্তিশালী প্রমাণ সংগ্রহ করুন।</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:var(--accent);margin:0 0 0.75rem 0">📋 কী কী প্রমাণ সংগ্রহ করবেন</h4>
<ul style="margin:0;padding-left:1.5rem;color:var(--text-secondary);line-height:2.2">
<li>বিয়ের খরচের রসিদ ও ছবি (যৌতুক নেওয়া হয়নি প্রমাণ)</li>
<li>স্ত্রীর সাথে মোবাইল বার্তা, WhatsApp চ্যাট</li>
<li>সাক্ষীদের নাম ও যোগাযোগ (বিয়ের অনুষ্ঠানে যারা ছিলেন)</li>
<li>স্ত্রীর বাড়িতে গিফট দেওয়ার প্রমাণ (যদি থাকে)</li>
<li>বিবাহিত জীবনে ব্যাংক লেনদেনের রেকর্ড</li>
<li>মিথ্যা মামলার প্রেরণা যা প্রমাণ করে (ডিভোর্সের রাগ, সম্পত্তি বিরোধ ইত্যাদি)</li>
</ul>
</div>`
      },
      {
        heading: '৪. আইনি সহায়তা',
        content: `<div style="background:linear-gradient(135deg,rgba(26,63,191,0.08),rgba(198,167,94,0.08));padding:1.5rem;border-radius:1rem;border:1px solid var(--gold);margin:1.5rem 0">
<h3 style="margin:0 0 0.75rem 0;color:var(--text)">⚖️ যৌতুক মামলায় তাৎক্ষণিক সহায়তা</h3>
<p style="margin:0 0 1.25rem 0;color:var(--text-secondary);line-height:1.8">মিথ্যা যৌতুক মামলায় একা লড়বেন না। অ্যাডভোকেট মোঃ শাহ আলম এখনই সাহায্য করবেন।</p>
<div style="display:flex;gap:1rem;flex-wrap:wrap">
<a href="tel:01712655546" style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">📞 এখনই কল করুন: 01712655546</a>
<a href="https://wa.me/8801712655546" target="_blank" style="background:#25D366;color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">💬 WhatsApp</a>
</div>
</div>`
      }
    ],
    faqs: [
      { question: 'যৌতুক মামলায় কি জামিন পাওয়া যায়?', answer: 'কিছু ধারায় জামিনযোগ্য। তবে মারাত্মক ধারায় (মৃত্যু বা গুরুতর নির্যাতন) জামিন কঠিন। হাইকোর্টে আগাম জামিনের আবেদন করুন।' },
      { question: 'যৌতুক মামলা খারিজ করা কি সম্ভব?', answer: 'হ্যাঁ। মামলাটি মিথ্যা ও হয়রানিমূলক প্রমাণ করতে পারলে হাইকোর্টে FIR Quash করতে পারবেন।' },
      { question: 'উভয়পক্ষ আপোস করলে কি মামলা বন্ধ হয়?', answer: 'যৌতুক মামলা সাধারণত রাষ্ট্রপক্ষের মামলা — শুধু আপোসে বন্ধ নাও হতে পারে। তবে আপোস মামলার শুনানিতে প্রভাব ফেলতে পারে।' },
      { question: 'যৌতুক মামলায় সর্বোচ্চ সাজা কত?', answer: 'যৌতুক নিরোধ আইনে ৫ বছর। নারী ও শিশু নির্যাতন আইনে নির্যাতনের মাত্রা অনুযায়ী যাবজ্জীবন বা মৃত্যুদণ্ড পর্যন্ত।' },
      { question: 'মিথ্যা যৌতুক মামলা করলে অভিযোগকারীর কি শাস্তি হবে?', answer: 'হ্যাঁ। পেনাল কোডের ২১১ ধারায় মিথ্যা মামলাকারীর বিরুদ্ধে মামলা করা যায়।' }
    ],
    featured: false,
    impressions: 44,
    clicks: 1
  }
},

// ============================================================
// ARTICLE 9: জমি জরিপ ও দাগ নম্বর চেক ২০২৬
// ============================================================
{
  file: 'jomi-jorip-dag-nombor-check-online-2026.json',
  data: {
    slug: 'jomi-jorip-dag-nombor-check-online-2026',
    category: 'ভূমি আইন',
    title: 'জমির দাগ নম্বর দিয়ে অনলাইনে জমি চেক করার সম্পূর্ণ নিয়ম ২০২৬',
    metaTitle: 'দাগ নম্বর দিয়ে জমি চেক ২০২৬ | অনলাইনে জমির তথ্য জানার উপায় বাংলাদেশ',
    metaDescription: 'দাগ নম্বর দিয়ে জমির মালিক কে? কতটুকু জমি আছে? অনলাইনে eporcha.gov.bd থেকে জমির তথ্য চেক করার সম্পূর্ণ গাইড ২০২৬।',
    keywords: [
      'দাগ নম্বর দিয়ে জমি চেক',
      'dag number check bangladesh',
      'jomi check online bangladesh 2026',
      'eporcha dag check',
      'জমির তথ্য অনলাইনে'
    ],
    publishedDate: '2026-09-02',
    lastModified: '2026-09-02',
    readTime: '১০ মিনিট',
    heroIntro: '<p>জমি কেনার আগে যাচাই করতে চান? বা কারো বলা দাগ নম্বরে আসলেই তার নামে জমি আছে কিনা জানতে চান? এখন ঘরে বসেই অনলাইনে দাগ নম্বর দিয়ে যেকোনো জমির তথ্য চেক করা যায়। পরামর্শের জন্য: <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold">অ্যাডভোকেট মোঃ শাহ আলম</a> — <a href="tel:01712655546" style="color:var(--gold);font-weight:bold">📞 01712655546</a></p>',
    quickAnswer: {
      heading: '⚡ দাগ নম্বরে জমি চেক — দ্রুত উপায়',
      points: [
        'eporcha.gov.bd → মৌজা + দাগ নম্বর দিন',
        'land.gov.bd-এও দাগ নম্বর দিয়ে চেক করা যায়',
        'মালিকের নাম, পরিমাণ ও খতিয়ান নম্বর জানা যাবে',
        'ডিজিটাল পর্চা (সার্টিফাইড) ডাউনলোড করতে পারবেন',
        'জমি কেনার আগে অবশ্যই এই যাচাই করুন'
      ]
    },
    toc: [
      'দাগ নম্বর কী?',
      'অনলাইনে দাগ নম্বর দিয়ে জমি চেক করার ধাপ',
      'মৌজার নাম না জানলে কীভাবে খুঁজবেন?',
      'দাগ নম্বর চেক করে কী কী তথ্য পাবেন?',
      'ডিজিটাল পর্চা কী এবং কীভাবে ডাউনলোড করবেন?',
      'জমি কেনার আগে অবশ্যই কী যাচাই করবেন?',
      'আইনজীবীর সহায়তা'
    ],
    sections: [
      {
        heading: '১. দাগ নম্বর কী?',
        content: `<p>দাগ নম্বর হলো একটি নির্দিষ্ট জমির প্লটের আইডি নম্বর — যা দিয়ে সেই জমিকে সরকারি রেকর্ডে সনাক্ত করা যায়।</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-left:4px solid var(--accent);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:var(--accent);margin:0 0 0.75rem 0">📌 দাগ নম্বর ও খতিয়ান নম্বরের পার্থক্য</h4>
<ul style="margin:0;padding-left:1.5rem;color:var(--text-secondary);line-height:2">
<li><strong>দাগ নম্বর:</strong> একটি নির্দিষ্ট জমির প্লটের নম্বর (Plot Number)</li>
<li><strong>খতিয়ান নম্বর:</strong> একজন মালিকের সব জমির রেকর্ডের নম্বর (Owner's Record Number)</li>
<li><strong>মৌজা:</strong> একটি নির্দিষ্ট ভৌগোলিক এলাকা যার মধ্যে দাগ নম্বর থাকে</li>
</ul>
</div>`
      },
      {
        heading: '২. অনলাইনে দাগ নম্বর দিয়ে জমি চেক করার ধাপ',
        content: `<p>eporcha.gov.bd-এ খুব সহজেই দাগ নম্বর দিয়ে জমির তথ্য পাওয়া যায়।</p>
<div style="margin:1.25rem 0">
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">১</div>
<div><h4 style="margin:0 0 0.4rem 0">eporcha.gov.bd-এ যান</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">বাংলাদেশ ই-পর্চা সরকারি পোর্টালে প্রবেশ করুন।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">২</div>
<div><h4 style="margin:0 0 0.4rem 0">জেলা, উপজেলা ও মৌজা বেছে নিন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">ড্রপডাউন থেকে সঠিক জেলা, উপজেলা এবং মৌজা বেছে নিন।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">৩</div>
<div><h4 style="margin:0 0 0.4rem 0">দাগ নম্বর দিন ও সার্চ করুন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">"দাগ নম্বর" অপশনে দাগ নম্বর দিয়ে "খুঁজুন" চাপুন।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--gold);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">৪</div>
<div><h4 style="margin:0 0 0.4rem 0">ফলাফল দেখুন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">মালিকের নাম, জমির পরিমাণ ও খতিয়ান নম্বর দেখতে পাবেন।</p></div>
</div>
</div>`
      },
      {
        heading: '৩. জমি কেনার আগে অবশ্যই কী যাচাই করবেন?',
        content: `<p>দাগ নম্বর চেক করার পাশাপাশি জমি কেনার আগে আরও কিছু যাচাই করুন।</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:var(--accent);margin:0 0 0.75rem 0">✅ জমি কেনার আগে চেকলিস্ট</h4>
<ul style="margin:0;padding-left:1.5rem;color:var(--text-secondary);line-height:2.2">
<li>✅ দাগ নম্বর অনলাইনে যাচাই করুন</li>
<li>✅ মালিকের খতিয়ান দেখুন</li>
<li>✅ নামজারি (মিউটেশন) করা আছে কিনা দেখুন</li>
<li>✅ জমিতে কোনো মামলা বা বন্ধক আছে কিনা জানুন</li>
<li>✅ সীমানা সরেজমিনে দেখুন</li>
<li>✅ আইনজীবীর মাধ্যমে দলিল যাচাই করান</li>
</ul>
</div>`
      },
      {
        heading: '৪. আইনজীবীর সহায়তা',
        content: `<div style="background:linear-gradient(135deg,rgba(26,63,191,0.08),rgba(198,167,94,0.08));padding:1.5rem;border-radius:1rem;border:1px solid var(--gold);margin:1.5rem 0">
<h3 style="margin:0 0 0.75rem 0;color:var(--text)">⚖️ জমি কেনার আগে আইনি পরামর্শ নিন</h3>
<p style="margin:0 0 1.25rem 0;color:var(--text-secondary);line-height:1.8">অ্যাডভোকেট মোঃ শাহ আলম জমির সম্পূর্ণ আইনি যাচাই করে নিরাপদ কেনাকাটায় সহায়তা করবেন।</p>
<div style="display:flex;gap:1rem;flex-wrap:wrap">
<a href="tel:01712655546" style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">📞 কল করুন: 01712655546</a>
<a href="https://wa.me/8801712655546" target="_blank" style="background:#25D366;color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">💬 WhatsApp</a>
</div>
</div>`
      }
    ],
    faqs: [
      { question: 'দাগ নম্বর কোথায় পাবো?', answer: 'বিক্রেতার কাছ থেকে, খতিয়ান থেকে, বা সাব-রেজিস্ট্রি অফিস থেকে পাওয়া যায়। জমির সীমানা পোস্টেও লেখা থাকতে পারে।' },
      { question: 'eporcha.gov.bd বিনামূল্যে?', answer: 'তথ্য দেখা বিনামূল্যে। তবে সার্টিফাইড ডিজিটাল পর্চা ডাউনলোড করতে সামান্য ফি (সাধারণত ৫০-১০০ টাকা) লাগে।' },
      { question: 'দাগ নম্বর দিয়ে কি মামলা আছে কিনা জানা যায়?', answer: 'না, eporcha-তে শুধু খতিয়ান ও মালিকানার তথ্য পাওয়া যায়। মামলার তথ্যের জন্য আদালতে যেতে হবে বা আইনজীবীর সাহায্য নিতে হবে।' },
      { question: 'পুরনো দাগ নম্বর কি নতুন জরিপে বদলে যায়?', answer: 'হ্যাঁ, নতুন জরিপ (BS) হলে দাগ নম্বর বদলে যেতে পারে। পুরনো ও নতুন দাগ নম্বরের সম্পর্ক ভূমি অফিস বা আইনজীবীর কাছ থেকে জানুন।' },
      { question: 'ডিজিটাল পর্চা কি আদালতে গ্রহণযোগ্য?', answer: 'হ্যাঁ, eporcha থেকে ডাউনলোড করা সার্টিফাইড ডিজিটাল পর্চা আদালতে এবং সরকারি কাজে গ্রহণযোগ্য।' }
    ],
    featured: false,
    impressions: 95,
    clicks: 5
  }
},

// ============================================================
// ARTICLE 10: সম্পত্তি উপহার দলিল (Gift Deed) ২০২৬
// ============================================================
{
  file: 'sampatti-uphar-danapatra-dalil-niyom-2026.json',
  data: {
    slug: 'sampatti-uphar-danapatra-dalil-niyom-2026',
    category: 'ভূমি আইন',
    title: 'দানপত্র বা গিফট ডিড কীভাবে করবেন? সম্পত্তি উপহার দেওয়ার সম্পূর্ণ আইনি নিয়ম ২০২৬',
    metaTitle: 'দানপত্র দলিল ২০২৬ | Gift Deed বাংলাদেশ | সম্পত্তি উপহার দেওয়ার নিয়ম',
    metaDescription: 'বাংলাদেশে দানপত্র বা গিফট ডিড কীভাবে করবেন? কাকে দান করা যায়? খরচ কত? মুসলিম হেবা ও হিন্দু দানপত্রের পার্থক্য — সম্পূর্ণ গাইড ২০২৬।',
    keywords: [
      'দানপত্র দলিল বাংলাদেশ',
      'gift deed bangladesh 2026',
      'সম্পত্তি উপহার দেওয়ার নিয়ম',
      'danapatra dalil',
      'হেবা দলিল বনাম দানপত্র'
    ],
    publishedDate: '2026-09-02',
    lastModified: '2026-09-02',
    readTime: '১২ মিনিট',
    heroIntro: '<p>আপনি কি সন্তান, নাতি-নাতনি বা কাছের কাউকে সম্পত্তি দিয়ে যেতে চান? দানপত্র (Gift Deed) হলো সম্পত্তি উপহার দেওয়ার সবচেয়ে পরিষ্কার ও আইনি পদ্ধতি। মুসলিম ও হিন্দুদের জন্য আলাদা নিয়ম আছে। বিস্তারিত জানুন: <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold">অ্যাডভোকেট মোঃ শাহ আলম</a> — <a href="tel:01712655546" style="color:var(--gold);font-weight:bold">📞 01712655546</a></p>',
    quickAnswer: {
      heading: '⚡ দানপত্র — সংক্ষিপ্ত তথ্য',
      points: [
        'মুসলিমদের জন্য: হেবা দলিল বা হেবা বিল এওয়াজ',
        'হিন্দুদের জন্য: দানপত্র (Gift Deed)',
        'খরচ: সাফ কবলার চেয়ে অনেক কম (স্ট্যাম্প ডিউটি ০.৫%)',
        'রেজিস্ট্রি: বাধ্যতামূলক (১ লাখ টাকার বেশি মূল্যে)',
        'দান বাতিল করা কঠিন — করার আগে ভালো ভাবুন'
      ]
    },
    toc: [
      'দানপত্র কী এবং কেন করবেন?',
      'মুসলিম ও হিন্দুদের জন্য আলাদা নিয়ম',
      'দানপত্র করতে কত খরচ?',
      'দানপত্রে কী কী শর্ত দেওয়া যায়?',
      'দানপত্র বাতিল করা কি সম্ভব?',
      'দানপত্র করার ধাপ',
      'আইনজীবীর পরামর্শ'
    ],
    sections: [
      {
        heading: '১. দানপত্র কী এবং কেন করবেন?',
        content: `<p>দানপত্র (Gift Deed) হলো এমন একটি আইনি দলিল যার মাধ্যমে একজন ব্যক্তি তার সম্পত্তি বিনামূল্যে অন্যকে দিয়ে দেন।</p>
<div style="background:var(--surface);border:1px solid var(--card-border);border-left:4px solid var(--accent);border-radius:0.75rem;padding:1.25rem;margin:1.25rem 0">
<h4 style="color:var(--accent);margin:0 0 0.75rem 0">📌 কখন দানপত্র করবেন?</h4>
<ul style="margin:0;padding-left:1.5rem;color:var(--text-secondary);line-height:2">
<li>জীবিত অবস্থায় সন্তানদের সম্পত্তি দিয়ে যেতে চাইলে</li>
<li>কোনো প্রিয়জনকে সম্পত্তি উপহার দিতে চাইলে</li>
<li>ভবিষ্যতে পরিবারে বিরোধ এড়াতে আগেই বণ্টন করতে চাইলে</li>
<li>কম খরচে সম্পত্তি হস্তান্তর করতে চাইলে (সাফ কবলার বিকল্প)</li>
</ul>
</div>`
      },
      {
        heading: '২. মুসলিম ও হিন্দুদের জন্য আলাদা নিয়ম',
        content: `<p>ধর্মীয় ব্যক্তিগত আইন অনুযায়ী মুসলিম ও হিন্দু সম্প্রদায়ে দান করার পদ্ধতি ভিন্ন।</p>
<div style="overflow-x:auto;margin:1.25rem 0">
<table style="width:100%;border-collapse:collapse;font-size:0.95rem">
<thead><tr style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff">
<th style="padding:0.85rem 1rem;text-align:left">বিষয়</th>
<th style="padding:0.85rem 1rem;text-align:left">মুসলিম</th>
<th style="padding:0.85rem 1rem;text-align:left">হিন্দু</th>
</tr></thead>
<tbody>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-weight:600">দলিলের নাম</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">হেবা / হেবা বিল এওয়াজ</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">দানপত্র (Gift Deed)</td></tr>
<tr><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-weight:600">আইনি ভিত্তি</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">মুসলিম ব্যক্তিগত আইন</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">Transfer of Property Act 1882</td></tr>
<tr style="background:var(--surface)"><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border);font-weight:600">স্ট্যাম্প ডিউটি</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">০.৫%</td><td style="padding:0.85rem 1rem;border-bottom:1px solid var(--card-border)">১-২% (আত্মীয়দের মধ্যে কম)</td></tr>
<tr><td style="padding:0.85rem 1rem;font-weight:600">বাতিলযোগ্য?</td><td style="padding:0.85rem 1rem">সীমিত ক্ষেত্রে</td><td style="padding:0.85rem 1rem">সীমিত ক্ষেত্রে</td></tr>
</tbody>
</table>
</div>`
      },
      {
        heading: '৩. দানপত্র করার ধাপ',
        content: `<p>সঠিকভাবে দানপত্র করতে নিচের ধাপগুলো অনুসরণ করুন।</p>
<div style="margin:1.25rem 0">
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">১</div>
<div><h4 style="margin:0 0 0.4rem 0">আইনজীবীর কাছে যান</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">কী দান করবেন, কাকে দেবেন, কোনো শর্ত থাকবে কিনা আলোচনা করুন।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">২</div>
<div><h4 style="margin:0 0 0.4rem 0">দলিল প্রস্তুত করুন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">আইনজীবী দানপত্রের ড্রাফট তৈরি করবেন। সম্পত্তির সম্পূর্ণ বিবরণ থাকবে।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--accent);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">৩</div>
<div><h4 style="margin:0 0 0.4rem 0">স্ট্যাম্প কিনুন ও দলিল রেজিস্ট্রি করুন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">সাব-রেজিস্ট্রি অফিসে উভয়পক্ষের উপস্থিতিতে রেজিস্ট্রি সম্পন্ন করুন।</p></div>
</div>
<div style="display:flex;align-items:flex-start;gap:1rem;background:var(--surface);border:1px solid var(--card-border);border-radius:0.75rem;padding:1rem">
<div style="background:var(--gold);color:#fff;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">৪</div>
<div><h4 style="margin:0 0 0.4rem 0">নামজারি করুন</h4><p style="margin:0;color:var(--text-secondary);font-size:0.9rem">দানপত্র রেজিস্ট্রির পর গ্রহীতার নামে নামজারি (খারিজ) করুন।</p></div>
</div>
</div>`
      },
      {
        heading: '৪. আইনজীবীর পরামর্শ',
        content: `<div style="background:linear-gradient(135deg,rgba(26,63,191,0.08),rgba(198,167,94,0.08));padding:1.5rem;border-radius:1rem;border:1px solid var(--gold);margin:1.5rem 0">
<h3 style="margin:0 0 0.75rem 0;color:var(--text)">⚖️ দানপত্র তৈরিতে সহায়তা</h3>
<p style="margin:0 0 1.25rem 0;color:var(--text-secondary);line-height:1.8">দানপত্র একবার করলে পরিবর্তন কঠিন। তাই সঠিকভাবে করুন। অ্যাডভোকেট মোঃ শাহ আলমের সাথে যোগাযোগ করুন।</p>
<div style="display:flex;gap:1rem;flex-wrap:wrap">
<a href="tel:01712655546" style="background:linear-gradient(135deg,var(--accent),#1A3FBF);color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">📞 কল করুন: 01712655546</a>
<a href="https://wa.me/8801712655546" target="_blank" style="background:#25D366;color:#fff;padding:0.75rem 1.5rem;border-radius:0.75rem;font-weight:bold;text-decoration:none">💬 WhatsApp</a>
</div>
</div>`
      }
    ],
    faqs: [
      { question: 'দানপত্র কি মুখে করা যায়?', answer: 'মুসলিম হেবার ক্ষেত্রে সম্পত্তির দখল হস্তান্তর হলে মৌখিক হেবা বৈধ। তবে ১ লাখ টাকার বেশি মূল্যের সম্পত্তির জন্য লিখিত ও রেজিস্টার্ড দলিল আবশ্যক।' },
      { question: 'দানপত্রে কি শর্ত রাখা যায়?', answer: 'হ্যাঁ। যেমন: "যতদিন বেঁচে থাকব, এই সম্পত্তিতে আমার থাকার অধিকার থাকবে।" তবে শর্ত অবশ্যই আইনসম্মত হতে হবে।' },
      { question: 'দানপত্র বাতিল করা যাবে কি?', answer: 'কঠিন। তবে প্রতারণায় বা জোর করে করানো হলে, বা দাতা অক্ষম থাকলে আদালতে বাতিলের মামলা করা যায়।' },
      { question: 'দান করলে কি ট্যাক্স দিতে হবে?', answer: 'নিকট আত্মীয়দের (স্বামী-স্ত্রী, সন্তান, পিতামাতা) মধ্যে সম্পত্তি দানে সাধারণত গেইন ট্যাক্স প্রযোজ্য হয় না।' },
      { question: 'দানপত্র করার পর কি বিক্রি করা যাবে?', answer: 'হ্যাঁ, দানপত্রের পর সম্পত্তি গ্রহীতার হয়ে যায় এবং সে চাইলে বিক্রি করতে পারবেন — যদি দলিলে বিক্রির বিরুদ্ধে শর্ত না থাকে।' }
    ],
    featured: false,
    impressions: 38,
    clicks: 2
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
console.log(`\n🎉 Batch 8B: Created ${successCount}/${articles.length} articles`);
