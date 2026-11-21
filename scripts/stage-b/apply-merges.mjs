#!/usr/bin/env node
/**
 * scripts/stage-b/apply-merges.mjs — Stage B content merges (idempotent)
 *
 * Adds the unique sections of the duplicate "merge → 301" posts into their KEEP post
 * BEFORE the 301s are enabled (vercel.json), so no user-facing information is lost.
 * Every factual statement is taken from the merged-away source page (or the KEEP page);
 * nothing is invented. Items known to be wrong in a source are corrected, not copied
 * (see MERGE-NOTES in RELEASE-NOTES.md).
 *
 * Does NOT touch lastModified (sitemap lastmod must not move during the freeze).
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const P = (lang, slug) => path.join(ROOT, 'src/content/posts', lang, `${slug}.json`);
const load = (f) => JSON.parse(fs.readFileSync(f, 'utf8').replace(/^\uFEFF/, ''));
const save = (f, d) => fs.writeFileSync(f, JSON.stringify(d, null, 2) + '\n', 'utf8');
const key = (s) => s.h2 || s.heading;
const T = 'style="width:100%;border-collapse:collapse;margin:16px 0"';
const TH = 'style="padding:10px;border:1px solid #d6dbe3;background:#f0f4f8;text-align:left"';
const TD = 'style="padding:10px;border:1px solid #d6dbe3"';

function insertAfter(d, afterHeading, sections) {
  const have = new Set(d.sections.map(key));
  const fresh = sections.filter((s) => !have.has(s.heading));
  if (!fresh.length) return 0;
  const match = (h) => h === afterHeading || (afterHeading.length <= 3 && h.startsWith(afterHeading));
  const i = d.sections.findIndex((s) => match(key(s)));
  if (i < 0) throw new Error(`anchor not found: ${afterHeading}`);
  d.sections.splice(i + 1, 0, ...fresh);
  // keep TOC in step with sections
  const toc = Array.isArray(d.toc) ? d.toc : [];
  const ti = toc.findIndex(match);
  const add = fresh.map((s) => s.heading).filter((h) => !toc.includes(h));
  if (Array.isArray(d.toc)) d.toc.splice(ti >= 0 ? ti + 1 : toc.length, 0, ...add);
  return fresh.length;
}
function addFaqs(d, faqs) {
  d.faqs = d.faqs || [];
  const q = new Set(d.faqs.map((f) => f.question));
  let n = 0;
  for (const f of faqs) if (!q.has(f.question)) { d.faqs.push(f); n++; }
  return n;
}

const report = [];

/* ───────────── CLUSTER B — BN: মিথ্যা নারী নির্যাতন মামলা (KEEP: atmoraksha-bd) ───────────── */
{
  const f = P('bn', 'mithya-nari-nirjaton-mamla-atmoraksha-bd');
  const d = load(f);
  let n = 0;

  n += insertAfter(d, 'হাইকোর্ট থেকে আগাম জামিন (Anticipatory Bail) নেওয়ার নিয়ম', [
    {
      heading: 'গ্রেফতার হলে প্রথম ২৪ ঘণ্টায় কী করবেন?',
      content:
        '<p>আগাম জামিন নেওয়ার সুযোগ পাওয়ার আগেই যদি গ্রেফতার হয়ে যান, তবে প্রথম ২৪ ঘণ্টাই সবচেয়ে গুরুত্বপূর্ণ। এই সময়ের একটি ভুল সিদ্ধান্ত পুরো মামলার গতিপথে প্রভাব ফেলতে পারে।</p>' +
        '<h3>যা করবেন</h3><ul>' +
        '<li>পরিবারকে অবিলম্বে জানান।</li>' +
        '<li>দ্রুত একজন ফৌজদারি আইনজীবীর সঙ্গে যোগাযোগ করুন এবং তিনি না আসা পর্যন্ত নীরব থাকুন।</li>' +
        '<li>গ্রেফতারের ২৪ ঘণ্টার মধ্যে আপনাকে ম্যাজিস্ট্রেটের সামনে হাজির করার সাংবিধানিক অধিকার (সংবিধানের ৩৩(২) অনুচ্ছেদ) দাবি করুন।</li>' +
        '</ul>' +
        '<h3>যা করবেন না</h3><ul>' +
        '<li>আইনজীবীর পরামর্শ ছাড়া পুলিশের কাছে কোনো বক্তব্য দেবেন না।</li>' +
        '<li>না পড়ে বা না বুঝে কোনো কাগজে স্বাক্ষর করবেন না।</li>' +
        '<li>অভিযোগকারীর সঙ্গে সরাসরি যোগাযোগের চেষ্টা করবেন না।</li>' +
        '<li>মামলা নিয়ে সোশ্যাল মিডিয়ায় কিছু পোস্ট করবেন না।</li>' +
        '</ul>',
    },
    {
      heading: 'থানা ও আদালতে জামিনের সঠিক প্রক্রিয়া',
      content:
        '<p>যদি ইতোমধ্যে গ্রেফতার হয়ে থাকেন, তবে আগাম জামিনের সুযোগ আর থাকে না; তখন দ্রুত নিয়মিত জামিনের (Regular Bail) আবেদন করতে হয়। নারী ও শিশু নির্যাতন দমন আইনের মামলাগুলো অ-জামিনযোগ্য হওয়ায় থানা থেকে জামিন দেওয়া হয় না—জামিনের আবেদন কেবল আদালতেই করা যায়।</p>' +
        '<p><strong>জামিন প্রার্থনায় সাধারণত যেসব যুক্তি তুলে ধরা হয়:</strong></p><ul>' +
        '<li>অভিযোগের সঙ্গে ডিজিটাল প্রমাণ (মেসেজ, কল রেকর্ড, অডিও-ভিডিও) মিলছে না।</li>' +
        '<li>মেডিকেল সার্টিফিকেট নেই, কিংবা আঘাতের কোনো প্রমাণ নেই।</li>' +
        '<li>আসামির বয়স, সামাজিক অবস্থান ও পূর্ববর্তী নির্দোষ রেকর্ড।</li>' +
        '<li>পারিবারিক বিরোধ বা দেনমোহর/খোরপোশ আদায়ে চাপ সৃষ্টির উদ্দেশ্যে মামলা করা হয়েছে—এমন পরিস্থিতির সমর্থনে নথি।</li>' +
        '</ul>' +
        '<p>কোন আদালতে (দায়রা জজ বা হাইকোর্ট বিভাগ) এবং কোন ধারায় আবেদন করবেন, তা মামলার ধারা ও অবস্থার ওপর নির্ভর করে—এই সিদ্ধান্ত আইনজীবীর সঙ্গে আলোচনা করেই নিন। বিস্তারিত জানতে <a href="/bn/services/bail-lawyer">জামিন আইনজীবী সেবা</a> পাতাটি দেখতে পারেন।</p>',
    },
    {
      heading: 'প্রথম ১–৭ দিনের কর্মপরিকল্পনা (একনজরে)',
      content:
        '<p>মামলা হওয়ার খবর পাওয়ার পর সাধারণত নিচের ক্রমে এগোনো হয়। এটি একটি সাধারণ কাঠামো; আপনার মামলার ধারা ও পরিস্থিতিভেদে সময়সূচি বদলাতে পারে।</p>' +
        `<table ${T}><thead><tr><th ${TH}>সময়কাল</th><th ${TH}>করণীয়</th><th ${TH}>উদ্দেশ্য</th></tr></thead><tbody>` +
        `<tr><td ${TD}>১ম–২য় দিন</td><td ${TD}>এজাহার বা পিটিশনের সার্টিফাইড কপি সংগ্রহ</td><td ${TD}>অভিযোগের ভিত্তি জানা</td></tr>` +
        `<tr><td ${TD}>৩য়–৪র্থ দিন</td><td ${TD}>হাইকোর্ট বিভাগে অভিজ্ঞ আইনজীবীর সঙ্গে পরামর্শ ও পিটিশন প্রস্তুত</td><td ${TD}>আগাম জামিনের আবেদন তৈরি</td></tr>` +
        `<tr><td ${TD}>৫ম–৭ম দিন</td><td ${TD}>আগাম জামিনের শুনানি</td><td ${TD}>গ্রেফতার এড়ানো</td></tr>` +
        '</tbody></table>',
    },
  ]);

  n += insertAfter(d, 'অ্যালিবাই (Alibi) এবং প্রামাণ্য দলিল সংগ্রহ', [
    {
      heading: 'আইনি প্রতিরক্ষায় প্রমাণের গুরুত্ব ও নথিপত্র প্রস্তুতকরণ',
      content:
        '<p>অ্যালিবাইয়ের পাশাপাশি মিথ্যা মামলায় টিকে থাকার মূল চাবিকাঠি হলো প্রমাণপত্র সংরক্ষণ। অভিযোগ ওঠার আগের ও পরের সব ধরনের নথি যত্ন করে রাখুন:</p><ul>' +
        '<li>মোবাইল কল রেকর্ড (CDR), হোয়াটসঅ্যাপ ও ফেসবুক চ্যাট, এসএমএস এবং ইমেইল—ডিজিটাল কপির পাশাপাশি প্রিন্ট করে রাখুন।</li>' +
        '<li>অডিও ও ভিডিও কল রেকর্ড পেনড্রাইভ বা নিরাপদ স্টোরেজে সংরক্ষণ করুন।</li>' +
        '<li>আগে ভয়ভীতি বা হুমকি দেওয়া হয়ে থাকলে থানায় করা জিডির কপি।</li>' +
        '<li>আর্থিক লেনদেনের রসিদ বা ব্যাংক স্টেটমেন্ট—যেগুলো দেখায় সংসারের খরচ বহন করা হচ্ছিল, যৌতুক দেওয়া-নেওয়া হয়নি।</li>' +
        '<li>অফিস ডিউটি রোস্টার, পাসপোর্টের সিল বা হাসপাতালের রিলিজ পেপার—যা ঘটনার সময় আপনার অন্যত্র থাকার প্রমাণ।</li>' +
        '<li>স্থানীয় ইউপি চেয়ারম্যান বা গণ্যমান্য ব্যক্তিদের মাধ্যমে মীমাংসার চেষ্টা ও বৈঠকের কার্যবিবরণী।</li>' +
        '</ul>' +
        '<p>এসব নথি কীভাবে সাজিয়ে আদালতে উপস্থাপন করবেন, সেটি আইনজীবীর সহায়তায় ঠিক করা ভালো। প্রমাণের মান ও উপস্থাপনার ধরনের ওপর জামিন, অব্যাহতি ও মামলা খারিজের সম্ভাবনা অনেকাংশে নির্ভর করে।</p>',
    },
  ]);

  n += insertAfter(d, 'ট্রাইবুনালে অব্যাহতির আবেদন (Discharge Petition)', [
    {
      heading: 'মামলা খারিজ (Quashing): ফৌজদারি কার্যবিধির ৫৬১-এ ধারা ও FIR Quash',
      content:
        '<p>যদি মামলার কোনো আইনগত ভিত্তি না থাকে, তবে ফৌজদারি কার্যবিধির (CrPC) ৫৬১-এ ধারার অধীনে হাইকোর্ট বিভাগে মামলা বাতিল বা ক্বোয়াশমেন্টের (Quashment) আবেদন করা যায়। হাইকোর্ট প্রয়োজনে মামলার কার্যক্রম স্থগিত করতে বা রুল জারি করতে পারেন। এই পথে যেতে হাইকোর্টে যেতে হয়, তাই অভিজ্ঞ আইনজীবীর সহায়তা প্রয়োজন।</p>' +
        '<p><strong>সাধারণত যেসব ক্ষেত্রে ক্বোয়াশমেন্টের আবেদন বিবেচিত হয়:</strong></p><ul>' +
        '<li>এজাহার বা অভিযোগপত্র পড়েই যদি স্পষ্ট হয় যে কোনো অপরাধ সংঘটিত হয়নি।</li>' +
        '<li>মামলাটি আইনত অপরাধ নয় এমন বিষয়ে দায়ের করা হয়েছে।</li>' +
        '<li>মামলাটি আদালতকে ব্যবহার করে হয়রানি করার উদ্দেশ্যে করা হয়েছে।</li>' +
        '<li>অভিযোগ করার এখতিয়ার নেই।</li>' +
        '<li>উভয়পক্ষ আপস করেছে (তবে রাষ্ট্র বনাম আসামির মামলায় শুধু অভিযোগকারীর আপসই যথেষ্ট নয়)।</li>' +
        '</ul>' +
        '<p>অব্যাহতির আবেদন (ট্রাইবুনালে, চার্জ গঠনের সময়) এবং ক্বোয়াশমেন্ট (হাইকোর্টে) এক নয়: প্রথমটি বিচারিক আদালতে চার্জ গঠনের আগে মুক্তির পথ, দ্বিতীয়টি হাইকোর্টে মামলার কার্যক্রমই বাতিলের আবেদন। কোনটি আপনার জন্য উপযুক্ত, তা মামলার অবস্থা দেখে আইনজীবী নির্ধারণ করবেন।</p>',
    },
  ]);

  n += insertAfter(d, 'মিথ্যা মামলাকারীর বিরুদ্ধে ১৭ ধারায় ব্যবস্থা', [
    {
      heading: 'মিথ্যা মামলার বিরুদ্ধে অন্যান্য পাল্টা আইনি ব্যবস্থা',
      content:
        '<p>নারী ও শিশু নির্যাতন দমন আইনের ১৭ ধারা ছাড়াও, আপনি নিশ্চিত হলে যে মামলাটি সম্পূর্ণ মিথ্যা ও হয়রানির উদ্দেশ্যে করা, নিচের পথগুলোও বিবেচনা করা যায়:</p>' +
        `<table ${T}><thead><tr><th ${TH}>পাল্টা ব্যবস্থার ধরন</th><th ${TH}>আইনি ভিত্তি</th><th ${TH}>মন্তব্য</th></tr></thead><tbody>` +
        `<tr><td ${TD}>মিথ্যা অভিযোগের মামলা</td><td ${TD}>দণ্ডবিধি ২১১ ধারা</td><td ${TD}>সাধারণ ক্ষেত্রে সর্বোচ্চ ২ বছর কারাদণ্ড; গুরুতর অপরাধের মিথ্যা অভিযোগে শাস্তি বেশি হতে পারে</td></tr>` +
        `<tr><td ${TD}>মানহানির মামলা</td><td ${TD}>দণ্ডবিধি ৪৯৯–৫০০ ধারা</td><td ${TD}>সর্বোচ্চ ২ বছর কারাদণ্ড</td></tr>` +
        `<tr><td ${TD}>ক্ষতিপূরণের মামলা</td><td ${TD}>দেওয়ানি আদালত</td><td ${TD}>ক্ষতিপূরণ আদায়</td></tr>` +
        '</tbody></table>' +
        '<p>পাল্টা মামলা কখন করা উচিত—মূল মামলা চলাকালীন নাকি খালাসের পর—এই সময়-নির্বাচন কৌশলগত বিষয়। অনেক ক্ষেত্রে মূল মামলা নিষ্পত্তির পর (বা তদন্তে মিথ্যা প্রমাণিত হলে) এই ব্যবস্থা নেওয়া হয়। ভুল সময়ে পাল্টা মামলা করলে নিজের অবস্থান দুর্বল হতে পারে, তাই আগে আইনজীবীর সঙ্গে আলোচনা করুন।</p>',
    },
    {
      heading: 'সময়, খরচ ও ফলাফল সম্পর্কে বাস্তব ধারণা',
      content:
        '<p>অনেকেই জানতে চান মিথ্যা মামলা থেকে কত দিনে মুক্তি মিলবে এবং খরচ কত হবে। সৎ উত্তর হলো—এটি মামলার ধারা, আদালত, প্রমাণের মান ও তদন্তের অবস্থার ওপর নির্ভর করে, এবং কেউই নির্দিষ্ট সময় বা ফলাফলের নিশ্চয়তা দিতে পারেন না। সাধারণ ধারণা হিসেবে:</p><ul>' +
        '<li>চার্জ গঠনের শুনানিতে অব্যাহতি মিললে মামলা তুলনামূলক দ্রুত শেষ হয়; হাইকোর্টে ক্বোয়াশমেন্টের ক্ষেত্রেও সময় লাগে, তবে কার্যক্রম স্থগিত থাকতে পারে।</li>' +
        '<li>যে মামলায় প্রমাণ গুছিয়ে আনা যায়—অ্যালিবাই, চ্যাট/কল রেকর্ড, আর্থিক লেনদেনের নথি—সেখানে প্রতিরক্ষা শক্ত হয়।</li>' +
        '<li>খরচ নির্ভর করে কোন আদালতে কত ধাপ পার হতে হবে তার ওপর; নির্দিষ্ট অঙ্ক জানতে চেম্বারে মামলার কাগজপত্র দেখিয়ে আলোচনা করুন।</li>' +
        '</ul>',
    },
  ]);

  d.quickAnswer = d.quickAnswer || {};
  if (Array.isArray(d.quickAnswer.points)) {
    const extra = 'গ্রেফতার হলে ২৪ ঘণ্টার মধ্যে ম্যাজিস্ট্রেটের সামনে হাজির করার অধিকার দাবি করুন এবং আইনজীবী ছাড়া কিছু স্বাক্ষর বা বক্তব্য দেবেন না।';
    if (!d.quickAnswer.points.includes(extra)) { d.quickAnswer.points.splice(2, 0, extra); n++; }
  }

  n += addFaqs(d, [
    {
      question: 'নারী ও শিশু নির্যাতন মামলায় কি থানা থেকে জামিন পাওয়া যায়?',
      answer: 'না। এই আইনের মামলাগুলো অ-জামিনযোগ্য হওয়ায় থানা থেকে জামিন দেওয়া হয় না; জামিনের আবেদন কেবল আদালতে করা যায়। গ্রেফতারের আশঙ্কা থাকলে আগে থেকেই হাইকোর্ট বিভাগে আগাম জামিনের আবেদন করা যায়।',
    },
    {
      question: 'আপস হলে কি মামলা বন্ধ হয়ে যায়?',
      answer: 'কিছু ক্ষেত্রে আপসে মামলা নিষ্পত্তি হয়, কিছু ক্ষেত্রে হয় না। রাষ্ট্র বনাম আসামির মামলায় শুধু অভিযোগকারীর আপসই যথেষ্ট নয়; আপসনামা ট্রাইবুনালে দাখিল করে আদালতের অনুমোদন নিতে হয়।',
    },
    {
      question: 'অব্যাহতি (Discharge) আর মামলা খারিজ (Quashing)—কোনটি আমার জন্য প্রযোজ্য?',
      answer: 'অব্যাহতির আবেদন করা হয় বিচারিক আদালত বা ট্রাইবুনালে, চার্জ গঠনের সময়। মামলা খারিজ বা ক্বোয়াশমেন্টের আবেদন করা হয় হাইকোর্ট বিভাগে ফৌজদারি কার্যবিধির ৫৬১-এ ধারায়। কোনটি উপযুক্ত তা মামলার অবস্থা দেখে আইনজীবী ঠিক করেন।',
    },
  ]);

  save(f, d);
  report.push(`B  atmoraksha-bd: +${n} items (sections/faqs/qa)`);
}

/* ───────────── CLUSTER C — EN cyber-crime (KEEP: complaint-portal-guide-2026) ───────────── */
{
  const f = P('en', 'bangladesh-cyber-crime-complaint-portal-guide-2026');
  const d = load(f);
  const cell = 'style="border:1px solid #ddd;padding:8px"';
  const head = 'style="border:1px solid #ddd;padding:8px;text-align:left;background:#f4f6fb"';
  const n = insertAfter(d, 'Overview of Cyber Crime Reporting Channels in Bangladesh (2026)', [
    {
      heading: 'All Cyber Crime Helpline & Contact Numbers in Bangladesh (2026)',
      content:
        '<p>If you need a number rather than a form, use this quick-reference table. Pick the line that matches your situation; for anything involving an ongoing threat to your safety, call <strong>999</strong> first.</p>' +
        `<table style="width:100%;border-collapse:collapse;font-size:14px;margin:12px 0"><thead><tr><th ${head}>Agency / line</th><th ${head}>Number or channel</th><th ${head}>Best for</th></tr></thead><tbody>` +
        `<tr><td ${cell}><strong>Police Cyber Support for Women (PCSW)</strong></td><td ${cell}><strong>01320-000888</strong> (24/7)</td><td ${cell}>Online harassment, blackmail, sextortion, fake accounts and threats targeting women and children</td></tr>` +
        `<tr><td ${cell}><strong>National Emergency Service</strong></td><td ${cell}><strong>999</strong></td><td ${cell}>Any emergency, including a cyber crime that has escalated to an immediate threat or physical harassment</td></tr>` +
        `<tr><td ${cell}><strong>BTRC helpline</strong></td><td ${cell}><strong>100</strong></td><td ${cell}>SIM-swap and SIM-card fraud, spam calls and fraudulent SMS, telecom-related cyber crime</td></tr>` +
        `<tr><td ${cell}><strong>Cyber Crime Investigation Centre (CCIC), CID</strong></td><td ${cell}>No public telephone helpline — online at <strong>cybercrime.gov.bd</strong>, or in person at CID HQ, Malibagh, Dhaka</td><td ${cell}>Formal investigation of all types of cyber crime; complex hacking and large-scale fraud</td></tr>` +
        `<tr><td ${cell}><strong>bKash customer care</strong></td><td ${cell}><strong>16247</strong></td><td ${cell}>Freezing a fraudulent bKash transaction (call within hours)</td></tr>` +
        `<tr><td ${cell}><strong>Nagad customer care</strong></td><td ${cell}><strong>16167</strong></td><td ${cell}>Freezing a fraudulent Nagad transaction (call within hours)</td></tr>` +
        '</tbody></table>' +
        '<p><strong>Which number first?</strong> Immediate danger: 999. Harassment or blackmail against a woman: PCSW 01320-000888. Mobile-banking or SIM fraud: your provider’s customer care and the BTRC helpline right away, then file at cybercrime.gov.bd and at your nearest police station. Everything else: file online at cybercrime.gov.bd, as described in the step-by-step section below.</p>' +
        '<p>⚠️ <strong>Beware of fake helplines.</strong> Unofficial Facebook pages and websites sometimes pose as cyber crime helplines to scam victims. Use only the numbers above or official <em>.gov.bd</em> websites, and never pay anyone to “register” your complaint — filing is free of charge.</p>',
    },
  ]);
  const nf = addFaqs(d, [
    {
      question: 'What is the main cyber crime helpline number in Bangladesh?',
      answer: 'For women and children, the Police Cyber Support for Women (PCSW) helpline is 01320-000888, available 24/7. For emergencies, call 999. For other cyber crimes, file online at cybercrime.gov.bd. CCIC does not run a public telephone helpline.',
    },
    {
      question: 'I lost money through bKash or Nagad fraud. Who do I call first?',
      answer: 'Call the provider immediately to try to freeze the transaction — bKash 16247 or Nagad 16167 — and the BTRC helpline 100 for SIM or telecom fraud. Then file a complaint at cybercrime.gov.bd and at your nearest police station. Recovery is possible but not guaranteed, and speed matters.',
    },
  ]);
  save(f, d);
  report.push(`C  cyber-complaint-portal: +${n} section, +${nf} faqs`);
}

/* ───────────── CLUSTER D — BN ভাড়াটিয়া উচ্ছেদ (KEEP: varatia-ucched-ainee-notice-bari-bhara-ain) ───────────── */
{
  const f = P('bn', 'varatia-ucched-ainee-notice-bari-bhara-ain');
  const d = load(f);
  let n = 0;

  // strengthen the existing landlord-mistakes section with the risk it carries (no new facts)
  const s3 = d.sections.find((s) => (key(s) || '').startsWith('৩. বাড়িওয়ালা কী কী বেআইনি'));
  const riskNote = '<p><strong>ঝুঁকির দিক:</strong> গায়ের জোরে তালা দেওয়া বা গ্যাস-বিদ্যুৎ কাটার মতো কাজ করলে ভাড়াটিয়া উল্টো আপনার বিরুদ্ধে ফৌজদারি অভিযোগ আনতে পারেন, আর আদালতে আপনার ন্যায্য উচ্ছেদ দাবির অবস্থানও দুর্বল হয়ে যায়।</p>';
  if (s3 && !s3.content.includes('ঝুঁকির দিক')) { s3.content += riskNote; n++; }

  n += insertAfter(d, '৫.', [
    {
      heading: 'সহকারী জজ আদালতে উচ্ছেদ মোকদ্দমা দায়ের ও ডিক্রির পর দখল গ্রহণ',
      content:
        '<p>নোটিশের নির্ধারিত মেয়াদ শেষ হওয়ার পর স্থানীয় সহকারী জজ বা সিনিয়র সহকারী জজ আদালতে উচ্ছেদ মোকদ্দমা (Eviction Suit) দায়ের করতে হয়। আর্জিতে স্পষ্ট উল্লেখ থাকতে হবে যে ভাড়া চুক্তির অবসান ঘটেছে এবং নোটিশ সত্ত্বেও ভাড়াটিয়া জায়গা ছাড়েননি।</p>' +
        '<p><strong>নোটিশের ভুল কেন বিপজ্জনক:</strong> ১০৬ ধারার নোটিশের ভাষা, মেয়াদ ও প্রেরণের তারিখ নির্ভুল না হলে পরবর্তীতে আদালত মামলা খারিজ করে দিতে পারেন। তাই নোটিশ আইনজীবীর মাধ্যমে পাঠানো এবং রেজিস্টার্ড ডাকের (এডি) রসিদ সংরক্ষণ করা জরুরি।</p>' +
        '<p><strong>ডিক্রির পর দখল:</strong> মামলায় ডিক্রি হওয়ার পরও ভাড়াটিয়া স্বেচ্ছায় চাবি হস্তান্তর না করলে জারি মামলার মাধ্যমে আদালত দখল বুঝিয়ে দেওয়ার ব্যবস্থা করেন। এ ক্ষেত্রে আদালতের নির্দেশে নাজির বা বেলিফ এবং প্রয়োজনীয় পুলিশ সহায়তায় দখল পুনরুদ্ধার করা হয়; মালামালের তালিকা (ইনভেন্টরি) করে জায়গাটি মালিককে বুঝিয়ে দেওয়া হয়।</p>',
    },
  ]);

  n += insertAfter(d, '৬.', [
    {
      heading: 'বাড়ি ভাড়া নিয়ন্ত্রণ আইন ১৯৯১ বনাম সম্পত্তি হস্তান্তর আইন ১৮৮২: তুলনা',
      content:
        '<p>উচ্ছেদের ক্ষেত্রে দুটি আইনই সামনে আসে, এবং দুটির দৃষ্টিভঙ্গি আলাদা। নিচের তুলনাটি বাড়িওয়ালা ও ভাড়াটিয়া—উভয়ের বোঝার সুবিধার জন্য:</p>' +
        `<table ${T}><thead><tr><th ${TH}>বিষয়</th><th ${TH}>বাড়ি ভাড়া নিয়ন্ত্রণ আইন ১৯৯১</th><th ${TH}>সম্পত্তি হস্তান্তর আইন ১৮৮২ (১০৬ ধারা)</th></tr></thead><tbody>` +
        `<tr><td ${TD}>মূল দৃষ্টিভঙ্গি</td><td ${TD}>ভাড়াটিয়া নিয়মিত ভাড়া দিলে তাকে সহজে উচ্ছেদ করা যায় না</td><td ${TD}>চুক্তির মেয়াদ শেষ হলে বা যুক্তিসঙ্গত প্রয়োজন দেখা দিলে আইনানুগ নোটিশ দিয়ে উচ্ছেদের সুযোগ</td></tr>` +
        `<tr><td ${TD}>বাড়িওয়ালার জন্য</td><td ${TD}>উচ্ছেদ কেবল আইনে নির্দিষ্ট কারণে (যেমন ভাড়া বকেয়া, ব্যক্তিগত প্রয়োজন, অনুমতি ছাড়া সাবলেট)</td><td ${TD}>মেয়াদ উত্তীর্ণ বা নিজের ব্যবসা/বসবাসের যুক্তিসঙ্গত প্রয়োজন (Bona Fide Requirement) ও আইনানুগ নোটিশ</td></tr>` +
        `<tr><td ${TD}>ভাড়াটিয়ার জন্য</td><td ${TD}>নিয়মিত ভাড়া পরিশোধ সুরক্ষা দেয়</td><td ${TD}>ভাড়া চুক্তি শেষ বা নোটিশ বৈধ হলে ভাড়া দিলেও উচ্ছেদ ডিক্রি হতে পারে</td></tr>` +
        '</tbody></table>' +
        '<p>বাস্তবে কোন আইনের আওতায় মামলা এগোবে, তা সম্পত্তির ধরন, চুক্তির মেয়াদ, ভাড়ার ইতিহাস ও কারণের ওপর নির্ভর করে। ভুল আইন ধরে এগোলে মামলা সময়সাপেক্ষ বা খারিজ হয়ে যেতে পারে, তাই নোটিশ পাঠানোর আগেই আইনজীবীর পরামর্শ নেওয়া উচিত।</p>',
    },
    {
      heading: 'ভবিষ্যতে ঝামেলা এড়াতে ভাড়া চুক্তিতে যে শর্তগুলো রাখা জরুরি',
      content:
        '<p>ভাড়াটিয়া বসানোর আগেই একটি স্পষ্ট লিখিত চুক্তি (উপযুক্ত মূল্যের স্ট্যাম্পে) পরে বড় বিরোধ এড়াতে সাহায্য করে। চুক্তিতে সাধারণত রাখা হয়:</p><ol>' +
        '<li>নির্দিষ্ট মেয়াদ (যেমন ২ বা ৩ বছর) এবং মেয়াদ শেষে চুক্তি অবসানের স্পষ্ট শর্ত।</li>' +
        '<li>প্রতি মাসের নির্দিষ্ট তারিখের মধ্যে (যেমন ৭ থেকে ১০ তারিখ) ভাড়া পরিশোধের নিয়ম, সম্ভব হলে ব্যাংকের মাধ্যমে।</li>' +
        '<li>ভাড়া বকেয়া পড়লে চুক্তি অবসানের স্পষ্ট ধারা। তবে কোনো ধারা আদালতে কতটা প্রয়োগযোগ্য হবে তা আইনজীবীকে দিয়ে যাচাই করিয়ে নিন।</li>' +
        '<li>সাবলেট বা উপ-ভাড়া দেওয়ার ক্ষেত্রে বাড়িওয়ালার লিখিত অনুমতির শর্ত।</li>' +
        '</ol>',
    },
  ]);

  n += addFaqs(d, [
    {
      question: 'ভাড়াটিয়া কোর্টে ভাড়া জমা দিলে কি তাকে উচ্ছেদ করা যায় না?',
      answer: 'বাড়িওয়ালার যদি যুক্তিসঙ্গত ব্যক্তিগত প্রয়োজন (Bona Fide Requirement) থাকে এবং চুক্তির মেয়াদ শেষ হয়ে যায়, তবে ভাড়া জমা দিলেও উচ্ছেদ ডিক্রি পাওয়া সম্ভব। প্রতিটি মামলার ঘটনা আলাদা, তাই আইনজীবীর পরামর্শ নিন।',
    },
    {
      question: 'আদালতের ডিক্রির পরও ভাড়াটিয়া না ছাড়লে বাড়িওয়ালা কী করবেন?',
      answer: 'ডিক্রির পর জারি মামলা করতে হয়। আদালতের নির্দেশে নাজির বা বেলিফ এবং পুলিশ সহায়তায় দখল পুনরুদ্ধার করা হয়। বাড়িওয়ালার নিজে তালা ভাঙা বা মালপত্র ফেলে দেওয়া উচিত নয়।',
    },
  ]);

  save(f, d);
  report.push(`D  varatia-ucched-ainee-notice: +${n} items`);
}

console.log(report.join('\n'));
