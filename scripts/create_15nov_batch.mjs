import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const EN_DIR = path.join(ROOT, 'src', 'content', 'posts', 'en');
const BN_DIR = path.join(ROOT, 'src', 'content', 'posts', 'bn');
const TODAY = '2026-11-15';

const pairs = [
  // 1. Commercial Arbitration & Arbitration Act 2001
  {
    en: {
      slug: 'commercial-arbitration-bangladesh-arbitration-act-2001',
      bnSlug: 'commercial-arbitration-madhyasthata-ain-2001-bangladesh',
      title: 'Commercial Arbitration in Bangladesh: Arbitration Act 2001 & Enforcement Guide',
      metaTitle: 'Commercial Arbitration BD: Arbitration Act 2001',
      metaDescription: 'Complete guide to domestic & international commercial arbitration in Bangladesh under the Arbitration Act 2001: Section 7A interim relief, awards & court review.',
      category: 'Corporate Law',
      readTime: '8 min read',
      publishedDate: TODAY,
      lastModified: TODAY,
      isDraft: false,
      keywords: [
        'arbitration act 2001 bangladesh',
        'commercial arbitration dhaka bangladesh',
        'section 7a interim relief arbitration act',
        'setting aside arbitral award bangladesh',
        'biac arbitration rules bangladesh'
      ],
      heroIntro: 'Under the Arbitration Act 2001 (Act I of 2001), commercial, construction, joint venture, and supply-chain contracts in Bangladesh containing a valid arbitration clause must be resolved outside protracted civil litigation. Modeled largely on the UNCITRAL Model Law, the Act empowers tribunals and the District Judge Court or High Court Division (for international commercial arbitrations) to grant urgent interim injunctions under Section 7A, stay parallel civil suits under Section 10, and enforce arbitral awards as civil court decrees under Section 44.',
      quickAnswer: {
        heading: 'At a Glance: Arbitration Act 2001 in Bangladesh',
        text: 'Binding commercial arbitration follows the Arbitration Act 2001, with High Court jurisdiction over international commercial disputes.',
        points: [
          'Governing Statute: The Arbitration Act 2001 (Act I of 2001), replacing the Arbitration Act 1940',
          'Urgent Interim Relief (Section 7A): District Judge Court (domestic) or High Court Division (international commercial arbitration) can freeze assets or issue status quo orders',
          'Mandatory Stay of Civil Suits (Section 10): Civil courts must refer parties to arbitration if a valid arbitration agreement is pleaded before filing written statement',
          'Challenging an Award (Sections 42–43): Application to set aside must be filed strictly within 60 days from receipt of the award'
        ]
      },
      toc: [
        'Domestic vs. International Commercial Arbitration Under Section 2(c)',
        'Arbitration Agreement Requirements & Section 10 Stay of Suits',
        'Obtaining Urgent Interim Orders Under Section 7A & Section 21',
        'Appointment of Arbitrators & BIAC Institutional Proceedings',
        'Enforcing or Setting Aside an Arbitral Award (Sections 42–45)'
      ],
      sections: [
        {
          h2: 'Domestic vs. International Commercial Arbitration Under Section 2(c)',
          content: '<p>The <strong>Arbitration Act 2001</strong> draws a sharp jurisdictional line between domestic and international commercial arbitrations seated in Bangladesh:</p><ul><li><strong>Domestic Arbitration:</strong> Both parties are Bangladeshi entities or residents. Supervisory jurisdiction—including appointment failure petitions under Section 12 and setting-aside applications under Section 42—lies before the <strong>District Judge Court</strong>.</li><li><strong>International Commercial Arbitration (Section 2(c)):</strong> At least one party is a foreign national, foreign body corporate, or company whose central management and control is exercised outside Bangladesh. Here, statutory petitions under Sections 7A and 12 and setting-aside challenges go directly to the <strong>High Court Division</strong> of the Supreme Court of Bangladesh.</li></ul>'
        },
        {
          h2: 'Arbitration Agreement Requirements & Section 10 Stay of Suits',
          content: '<p>Under <strong>Section 9 of the Arbitration Act 2001</strong>, an arbitration agreement must be in writing—whether as a clause inside a main commercial contract, a separate submission deed, or an exchange of signed letters, emails, or pleadings. If one party ignores the clause and files a civil suit in a Sub-Judge or Assistant Judge Court, the defendant must file an application under <strong>Section 10</strong> <em>before</em> submitting its written statement. Once verified, the civil court has no discretion to hear the merits and must stay the suit and refer the dispute to arbitration.</p>'
        },
        {
          h2: 'Obtaining Urgent Interim Orders Under Section 7A & Section 21',
          content: '<p>Contracting parties often need immediate protection—such as stopping bank guarantee encashment, preserving perishable cargo, or restraining transfer of disputed shares—before an arbitral tribunal is even constituted.</p><ul><li><strong>Court Interim Measures (Section 7A):</strong> Inserted by the 2004 Amendment, Section 7A empowers the High Court Division (in international commercial arbitration) or District Judge (in domestic arbitration) to issue interim injunctions, attach disputed funds, or appoint receivers before or during arbitration proceedings—provided the party demonstrates an arbitration notice has been or is being served.</li><li><strong>Tribunal Interim Orders (Section 21):</strong> Once formed, the arbitral tribunal itself may order interim preservation of goods or security deposits, enforceable through court order upon leave.</li></ul>'
        },
        {
          h2: 'Appointment of Arbitrators & BIAC Institutional Proceedings',
          content: '<p>Parties are free to agree on an odd number of arbitrators (typically a sole arbitrator or a three-member panel) under <strong>Sections 11 and 12</strong>. If the opposing side refuses to nominate its arbitrator within <strong>30 days</strong> of receiving a written arbitration notice under Section 27, the aggrieved party may petition the Chief Justice (or designated High Court Judge) in an international arbitration, or the District Judge in a domestic arbitration, to appoint the defaulting arbitrator.</p><p>Businesses may either conduct <em>ad hoc</em> arbitration or administer proceedings through the <strong>Bangladesh International Arbitration Centre (BIAC)</strong> in Dhaka under structured procedural timetables, fee schedules, and hearing rooms.</p>'
        },
        {
          h2: 'Enforcing or Setting Aside an Arbitral Award (Sections 42–45)',
          content: '<p>A final arbitral award is binding and enforceable under <strong>Section 44</strong> in the exact same manner as a decree of a civil court, provided no setting-aside petition is pending or allowed:</p><ol><li><strong>60-Day Limitation Window:</strong> Under Section 42, any application to set aside an award must be filed within <strong>60 days</strong> from receipt of the signed award. Courts strictly enforce this statutory limit.</li><li><strong>Narrow Grounds for Challenge (Section 43):</strong> Courts do not re-hear factual merits like an appellate court. An award may only be vacated for incapacity, invalid arbitration clause, denial of natural justice (lack of proper notice), excess of tribunal jurisdiction, fraud/corruption, or violation of Bangladesh public policy.</li><li><strong>Execution (Money Decree):</strong> Once the 60-day window expires without stay, the award-holder files an Execution Case in the District Court to attach bank accounts or auction movable/immovable assets of the debtor.</li></ol>'
        }
      ],
      faqs: [
        {
          q: 'Does Section 7A apply if the arbitration seat is outside Bangladesh (such as SIAC or ICC)?',
          a: 'In a landmark Appellate Division / High Court jurisprudence shift (including recent High Court benches clarifying Section 3), courts examine whether the seat is within Bangladesh; parties using foreign seats like SIAC or ICC must verify current Supreme Court precedent on Section 3(1) applicability before seeking Section 7A interim relief in Dhaka.'
        },
        {
          q: 'How long does domestic commercial arbitration take in Bangladesh?',
          a: 'Ad hoc or BIAC-administered arbitrations typically conclude within 6 to 14 months—substantially faster than 5 to 10 years of contested civil litigation across trial and appellate courts.'
        },
        {
          q: 'Can an arbitrator award interest and legal costs?',
          a: 'Yes. Under Section 38(6), unless the arbitration agreement provides otherwise, the tribunal can award commercial interest from the date of cause of action until payment along with arbitration fees and advocate costs.'
        },
        {
          q: 'What happens if the defendant ignores the arbitration notice?',
          a: 'Under Section 12, you can petition the District Judge or Chief Justice to appoint the arbitrator on the defaulting party’s behalf, after which the tribunal may proceed ex parte under Section 35 and pass a binding award.'
        }
      ]
    },
    bn: {
      slug: 'commercial-arbitration-madhyasthata-ain-2001-bangladesh',
      enSlug: 'commercial-arbitration-bangladesh-arbitration-act-2001',
      title: 'বাণিজ্যিক সালিশ ও মধ্যস্থতা — আরবিট্রেশন আইন ২০০১ গাইড',
      metaTitle: 'বাণিজ্যিক সালিশ ও আরবিট্রেশন আইন ২০০১ (BD গাইড)',
      metaDescription: 'বাংলাদেশে আরবিট্রেশন আইন ২০০১ অনুযায়ী বাণিজ্যিক সালিশ, ধারা ৭ক-এর অস্থায়ী নিষেধাজ্ঞা, সালিশকারী নিয়োগ ও অ্যাওয়ার্ড জারির সম্পূর্ণ আইনি প্রক্রিয়া।',
      category: 'করপোরেট ও বাণিজ্যিক আইন',
      readTime: '৮ মিনিট',
      publishedDate: TODAY,
      lastModified: TODAY,
      isDraft: false,
      keywords: [
        'আরবিট্রেশন আইন ২০০১ বাংলাদেশ',
        'বাণিজ্যিক সালিশ মামলা নিয়ম',
        'ধারা ৭ক অন্তর্বর্তীকালীন আদেশ সালিশ',
        'সালিশ রোয়েদাদ বাতিল ৬০ দিন',
        'বিয়াক সালিশ কেন্দ্র ঢাকা'
      ],
      heroIntro: 'ব্যবসায়িক চুক্তি, নির্মাণ প্রকল্প, জয়েন্ট ভেঞ্চার বা সাপ্লাই চেইন বিরোধে দীর্ঘসূত্রতার দেওয়ানি মামলার পরিবর্তে দ্রুত নিষ্পত্তির কার্যকর আইনি মাধ্যম হলো সালিশ বা আর্বিট্রেশন। বাংলাদেশের সালিশ আইন, ২০০১ (Arbitration Act, 2001)-এর অধীনে লিখিত সালিশ শর্ত থাকলে পক্ষগণ ট্রাইব্যুনালে বিরোধ নিষ্পত্তি করতে বাধ্য এবং ধারা ৭ক অনুযায়ী জরুরি অন্তর্বর্তীকালীন নিষেধাজ্ঞা ও ধারা ৪৪ অনুযায়ী আদালতের ডিক্রির মতো রোয়েদাদ (Award) কার্যকর করা যায়।',
      quickAnswer: {
        heading: '⚡ আরবিট্রেশন আইন ২০০১ — একনজরে মূল বিধান',
        points: [
          'মূল আইন: সালিশ আইন, ২০০১ (২০০১ সনের ১ নং আইন)',
          'জরুরি অন্তর্বর্তীকালীন সুরক্ষা (ধারা ৭ক): সম্পদ ক্রোক বা ব্যাংক গ্যারান্টি নগদায়ন রোধে জেলা জজ বা হাইকোর্টে আবেদন',
          'দেওয়ানি মামলা স্থগিত (ধারা ১০): জবাব দাখিলের আগেই সালিশ চুক্তির ভিত্তিতে দেওয়ানি আদালতের মামলা স্থগিত করার অধিকার',
          'রোয়েদাদ বাতিলের সময়সীমা (ধারা ৪২): অ্যাওয়ার্ড হাতে পাওয়ার মাত্র ৬০ দিনের মধ্যে বাতিলের আবেদন করতে হয়'
        ]
      },
      toc: [
        'দেশীয় বনাম আন্তর্জাতিক বাণিজ্যিক সালিশ: আদালতের এখতিয়ার',
        'সালিশ চুক্তির শর্ত ও দেওয়ানি মামলা স্থগিত (ধারা ৯ ও ১০)',
        'ধারা ৭ক ও ধারা ২১: বিরোধের মাঝপথে জরুরি নিষেধাজ্ঞা আদায়',
        'সালিশকারী নিয়োগ ও বিয়াক (BIAC) প্রাতিষ্ঠানিক সালিশ প্রক্রিয়া',
        'সালিশ রোয়েদাদ (Award) কার্যকর ও বাতিলের আইনি নিয়ম (ধারা ৪২–৪৫)'
      ],
      sections: [
        {
          h2: 'দেশীয় বনাম আন্তর্জাতিক বাণিজ্যিক সালিশ: আদালতের এখতিয়ার',
          content: '<p>সালিশ আইন ২০০১-এর <strong>ধারা ২(গ)</strong> অনুযায়ী আদালতের তদারকি এখতিয়ার দুই ভাগে বিভক্ত:</p><ul><li><strong>দেশীয় সালিশ (Domestic Arbitration):</strong> বিরোধের উভয় পক্ষ বাংলাদেশের নাগরিক বা নিবন্ধিত প্রতিষ্ঠান হলে ধারা ৭ক (অন্তর্বর্তীকালীন আদেশ), ধারা ১২ (সালিশকারী নিয়োগ) এবং ধারা ৪২ (রোয়েদাদ বাতিল)-এর আবেদন সংশ্লিষ্ট <strong>জেলা জজ আদালতে</strong> দায়ের করতে হয়।</li><li><strong>আন্তর্জাতিক বাণিজ্যিক সালিশ:</strong> যেকোনো এক পক্ষ বিদেশি নাগরিক, বিদেশি কোম্পানি বা বিদেশে নিয়ন্ত্রিত প্রতিষ্ঠান হলে এসব সংবিধিবদ্ধ আবেদন সরাসরি <strong>বাংলাদেশ সুপ্রিম কোর্টের হাইকোর্ট বিভাগে</strong> দায়ের করতে হয়।</li></ul>'
        },
        {
          h2: 'সালিশ চুক্তির শর্ত ও দেওয়ানি মামলা স্থগিত (ধারা ৯ ও ১০)',
          content: '<p><strong>ধারা ৯</strong> অনুসারে সালিশ চুক্তি অবশ্যই লিখিত হতে হবে—তা মূল চুক্তিপত্রের একটি ক্লজ, পৃথক সমঝোতা দলিল কিংবা স্বাক্ষরিত ইমেইল বা চিঠির বিনিময়ও হতে পারে। কোনো পক্ষ সালিশের শর্ত অমান্য করে সরাসরি দেওয়ানি আদালতে মামলা করলে, বিবাদীকে অবশ্যই লিখিত জবাব (Written Statement) দাখিলের পূর্বেই <strong>ধারা ১০</strong> মোতাবেক সালিশে প্রেরণের আবেদন করতে হবে। চুক্তি বৈধ হলে আদালত মামলা স্থগিত করে বিরোধটি সালিশ ট্রাইব্যুনালে পাঠাতে বাধ্য।</p>'
        },
        {
          h2: 'ধারা ৭ক ও ধারা ২১: বিরোধের মাঝপথে জরুরি নিষেধাজ্ঞা আদায়',
          content: '<p>সালিশ ট্রাইব্যুনাল গঠিত হওয়ার আগেই অনেক সময় প্রতিপক্ষ ব্যাংক গ্যারান্টি তুলে নিতে বা বিরোধীয় মালামাল সরিয়ে ফেলতে চায়। এক্ষেত্রে আইনে দুটি শক্তিশালী প্রতিকার রয়েছে:</p><ul><li><strong>আদালতের অন্তর্বর্তীকালীন আদেশ (ধারা ৭ক):</strong> ২০০৪ সালের সংশোধনীর মাধ্যমে যুক্ত ধারা ৭ক অনুযায়ী হাইকোর্ট বিভাগ (আন্তর্জাতিক সালিশে) বা জেলা জজ আদালত (দেশীয় সালিশে) সালিশ চলাকালীন বা শুরু হওয়ার আগেই স্থাবর-অস্থাবর সম্পত্তি ক্রোক, স্থিতাবস্থা বা নিষেধাজ্ঞা জারি করতে পারেন।</li><li><strong>ট্রাইব্যুনালের নিজস্ব আদেশ (ধারা ২১):</strong> ট্রাইব্যুনাল গঠিত হয়ে গেলে পক্ষগণের আবেদনে মালামাল সংরক্ষণ বা জামানত প্রদানের অন্তর্বর্তীকালীন নির্দেশ দিতে পারে।</li></ul>'
        },
        {
          h2: 'সালিশকারী নিয়োগ ও বিয়াক (BIAC) প্রাতিষ্ঠানিক সালিশ প্রক্রিয়া',
          content: '<p><strong>ধারা ১১ ও ১২</strong> অনুযায়ী পক্ষগণ নিজেদের সম্মতিতে বিজোড় সংখ্যক (সাধারণত ১ বা ৩ জন) সালিশকারী নিয়োগ করতে পারেন। লিখিত সালিশ নোটিশ পাওয়ার <strong>৩০ দিনের মধ্যে</strong> প্রতিপক্ষ নিজের সালিশকারী মনোনয়ন দিতে ব্যর্থ হলে, সংক্ষুব্ধ পক্ষ আন্তর্জাতিক সালিশের ক্ষেত্রে প্রধান বিচারপতি (বা মনোনীত হাইকোর্ট বিচারপতি) এবং দেশীয় সালিশের ক্ষেত্রে জেলা জজের নিকট সালিশকারী নিয়োগের আবেদন করতে পারেন।</p><p>এছাড়া ঢাকায় অবস্থিত <strong>বাংলাদেশ ইন্টারন্যাশনাল আরবিট্রেশন সেন্টার (BIAC)</strong>-এর মাধ্যমে সুনির্দিষ্ট বিধিমালা, সময়সূচি ও নিরপেক্ষ প্যানেলের অধীনে প্রাতিষ্ঠানিক সালিশ পরিচালনা করা যায়।</p>'
        },
        {
          h2: 'সালিশ রোয়েদাদ (Award) কার্যকর ও বাতিলের আইনি নিয়ম (ধারা ৪২–৪৫)',
          content: '<p>সালিশ ট্রাইব্যুনাল কর্তৃক প্রদত্ত চূড়ান্ত রোয়েদাদ বা অ্যাওয়ার্ড <strong>ধারা ৪৪</strong> অনুসারে দেওয়ানি আদালতের চূড়ান্ত ডিক্রির ন্যায় বলবৎযোগ্য:</p><ol><li><strong>৬০ দিনের কঠোর সময়সীমা (ধারা ৪২):</strong> রোয়েদাদের স্বাক্ষরিত কপি পাওয়ার ঠিক <strong>৬০ দিনের মধ্যে</strong> জেলা জজ আদালত (দেশীয়) বা হাইকোর্ট বিভাগে (আন্তর্জাতিক) বাতিলের আবেদন করতে হয়।</li><li><strong>রোয়েদাদ বাতিলের সীমিত কারণ (ধারা ৪৩):</strong> আদালত সাধারণ আপিলের মতো মামলার গুণাগুণ পুনর্বিচার করে না; কেবল চুক্তির অকার্যকরতা, প্রাকৃতিক ন্যায়বিচার লঙ্ঘন (শুনানির সুযোগ না দেওয়া), এখতিয়ার বহির্ভূত সিদ্ধান্ত, জালিয়াতি বা বাংলাদেশের জননীতির (Public Policy) পরিপন্থী হলেই অ্যাওয়ার্ড বাতিল হয়।</li><li><strong>অর্থ বা ডিক্রি জারি:</strong> ৬০ দিনের মধ্যে বাতিল বা স্থগিত না হলে জেলা আদালতে অর্থ জারি মামলা করে প্রতিপক্ষের ব্যাংক হিসাব বা সম্পত্তি ক্রোক করা যায়।</li></ol>'
        }
      ],
      faqs: [
        {
          q: 'সালিশের স্থান (Seat) বিদেশে হলে কি বাংলাদেশে ধারা ৭ক নিষেধাজ্ঞা পাওয়া যায়?',
          a: 'সালিশ আইনের ৩(১) ধারার ব্যাখ্যা অনুযায়ী সিঙ্গাপুর (SIAC) বা লন্ডন (ICC)-এর মতো বিদেশি আসনের সালিশে ধারা ৭ক প্রয়োগের ক্ষেত্রে সুপ্রিম কোর্টের নজির সতর্কতার সাথে যাচাই করতে হয়; তাই চুক্তির খসড়াতেই সালিশের আসন ও আইন স্পষ্ট রাখা জরুরি।'
        },
        {
          q: 'বাংলাদেশে একটি বাণিজ্যিক সালিশ নিষ্পত্তি হতে কত সময় লাগে?',
          a: 'সাধারণত ৬ থেকে ১৪ মাসের মধ্যে সম্পূর্ণ সালিশ ও অ্যাওয়ার্ড প্রদান সম্পন্ন হয়, যা প্রচলিত দেওয়ানি আদালতের ৫-১০ বছরের দীর্ঘসূত্রতার তুলনায় বহুগুণ দ্রুত।'
        },
        {
          q: 'প্রতিপক্ষ সালিশ নোটিশের কোনো জবাব না দিলে কী হবে?',
          a: 'ধারা ১২ মোতাবেক জেলা জজ বা হাইকোর্ট থেকে প্রতিপক্ষের পক্ষেও সালিশকারী নিয়োগ করে নেওয়া যায় এবং ধারা ৩৫ অনুযায়ী প্রতিপক্ষের অনুপস্থিতিতেই একতরফা (Ex Parte) শুনানি করে বৈধ অ্যাওয়ার্ড পাওয়া যায়।'
        },
        {
          q: 'সালিশ অ্যাওয়ার্ডে কি সুদ ও আইনজীবীর খরচ আদায় করা যায়?',
          a: 'হ্যাঁ, ধারা ৩৮(৬) অনুযায়ী চুক্তিতে ভিন্ন কিছু না থাকলে ট্রাইব্যুনাল মূল পাওনার ওপর সুদ এবং সালিশ ও আইনজীবীর যুক্তিসঙ্গত খরচ আদায়ের নির্দেশ দিতে পারে।'
        }
      ]
    }
  },

  // 2. Admiralty, Ship Arrest & Maritime Claims (Admiralty Court Act 2000)
  {
    en: {
      slug: 'admiralty-ship-arrest-maritime-claims-bangladesh-act-2000',
      bnSlug: 'admiralty-jahaj-atke-mamla-high-court-ain-2000-bangladesh',
      title: 'Admiralty & Ship Arrest in Bangladesh: High Court Act 2000 Legal Guide',
      metaTitle: 'Admiralty & Ship Arrest BD: Act 2000 High Court Guide',
      metaDescription: 'How to arrest a vessel or defend maritime claims in Bangladesh under the Admiralty Court Act 2000 at Chattogram & Mongla ports before the High Court Division.',
      category: 'Supreme Court Litigation',
      readTime: '8 min read',
      publishedDate: TODAY,
      lastModified: TODAY,
      isDraft: false,
      keywords: [
        'admiralty court act 2000 bangladesh',
        'ship arrest chattogram port high court',
        'maritime claim lawyer dhaka bangladesh',
        'cargo damage bill of lading admiralty suit',
        'p&i club letter of undertaking bangladesh'
      ],
      heroIntro: 'Sea-borne trade through Chattogram, Mongla, and Payra ports frequently sparks urgent disputes over short-landed or damaged cargo, unpaid charter hire, bunker fuel supply, crew wages, or vessel collisions. Under the Admiralty Court Act 2000, the High Court Division of the Supreme Court of Bangladesh exercises exclusive original admiralty jurisdiction—empowering claimants to obtain an immediate warrant of ship arrest in rem within hours before a vessel sails out of territorial waters.',
      quickAnswer: {
        heading: 'At a Glance: Maritime & Ship Arrest Law in Bangladesh',
        text: 'Only the High Court Division has original admiralty jurisdiction to arrest ships in Bangladeshi ports.',
        points: [
          'Governing Statute: The Admiralty Court Act 2000 (Act XLIII of 2000)',
          'Exclusive Forum (Section 3): High Court Division of the Supreme Court of Bangladesh (Company/Admiralty Bench)',
          '18 Statutory Claims: Covers title/mortgage, salvage, collision damage, bill of lading cargo claims, bunker supply, crew wages & towage',
          'Immediate Arrest & Bail/LOU: Vessel arrested through Marshal/Port Authority and released against bank guarantee or acceptable security'
        ]
      },
      toc: [
        'Exclusive Admiralty Jurisdiction of the High Court Division',
        'Grounds for Arresting a Vessel Under Section 3(2) of the 2000 Act',
        'Step-by-Step Procedure to File an Admiralty Suit & Arrest a Ship',
        'Releasing an Arrested Vessel: Bank Guarantee vs. P&I Club LOU',
        'Time Bar, Cargo Short-Landing Proofs & Sister-Ship Arrest Rules'
      ],
      sections: [
        {
          h2: 'Exclusive Admiralty Jurisdiction of the High Court Division',
          content: '<p>Unlike ordinary money suits filed in District Courts, maritime claims fall exclusively before the designated <strong>Admiralty Bench of the High Court Division</strong> under <strong>Section 3(1) of the Admiralty Court Act 2000</strong>. Subordinate civil courts lack jurisdiction to entertain an <em>action in rem</em> against a ship or order port detention of sea-going vessels at Chattogram, Mongla, Payra, or Matarbari.</p>'
        },
        {
          h2: 'Grounds for Arresting a Vessel Under Section 3(2) of the 2000 Act',
          content: '<p>Under <strong>Section 3(2)</strong>, a claimant can invoke admiralty jurisdiction against a vessel if the claim falls within the 18 enumerated maritime heads—whether the claim arose inside Bangladesh or on the high seas:</p><ul><li><strong>Cargo Damage & Bill of Lading Claims:</strong> Short delivery, contamination, or damage to goods carried into or out of Bangladeshi ports under a Bill of Lading or charterparty.</li><li><strong>Supply of Necessaries & Bunkers:</strong> Unpaid marine fuel, provisions, spares, or ship repairs furnished to the vessel.</li><li><strong>Charterparty, Demurrage & Collision:</strong> Disputes arising out of time/voyage charter agreements, vessel collision, towage, pilotage, or salvage.</li><li><strong>Crew Wages & Ship Mortgages:</strong> Master and crew claims for unpaid wages or enforcement of registered maritime mortgages.</li></ul>'
        },
        {
          h2: 'Step-by-Step Procedure to File an Admiralty Suit & Arrest a Ship',
          content: '<p>Because a commercial vessel typically stays at outer anchorage or jetty for only 24 to 72 hours, admiralty filings are moved on an urgent basis:</p><ol><li><strong>Ad Valorem Court Fee & Verified Plaint:</strong> Prepare the Admiralty Plaint supported by affidavit, original Bills of Lading, Lloyd’s/port survey reports, commercial invoices, and customs short-landing certificates, paying court fees under Schedule Rules.</li><li><strong>Ex Parte Motion for Warrant of Arrest (Section 4):</strong> Move an urgent application before the Admiralty Judge seeking a Warrant of Arrest against the defendant vessel <em>in rem</em>.</li><li><strong>Marshal & Port Authority Execution:</strong> Once granted, the High Court Marshal immediately transmits the arrest warrant via urgent notice to the <strong>Chattogram or Mongla Port Authority</strong>, Mercantile Marine Department, and Customs to withhold Port Clearance until further order.</li></ol>'
        },
        {
          h2: 'Releasing an Arrested Vessel: Bank Guarantee vs. P&I Club LOU',
          content: '<p>Vessel owners losing tens of thousands of dollars per day in detention charges seek immediate release once an arrest warrant is served:</p><ul><li><strong>Security Deposit / Bank Guarantee:</strong> Under High Court Admiralty Practice, a ship is released immediately once the owner furnishes a <strong>cash deposit or unconditional Bangladeshi Scheduled Bank Guarantee</strong> covering the suit claim plus estimated interest and costs.</li><li><strong>P&I Club Letter of Undertaking (LOU):</strong> Protection & Indemnity (P&I) Clubs frequently propose an LOU; however, unless the plaintiff expressly consents in writing to accept an LOU from a recognized International Group P&I Club, Bangladeshi Admiralty Courts normally insist on local bank guarantee or cash security.</li></ul>'
        },
        {
          h2: 'Time Bar, Cargo Short-Landing Proofs & Sister-Ship Arrest Rules',
          content: '<p>Maritime litigants must guard against strict statutory limitation periods and evidentiary traps:</p><ul><li><strong>One-Year Hague/Carriage Rule vs. Limitation Act:</strong> Cargo claims under bills of lading incorporating Hague/Hague-Visby Rules often carry a <strong>1-year time bar</strong> unless extended by agreement, whereas general maritime contracts follow the Limitation Act 1908.</li><li><strong>Sister-Ship Arrest (Section 4(4)):</strong> Under Section 4(4), if the offending vessel has already sailed, a claimant may arrest a <strong>sister ship</strong> beneficially owned by the exact same shipowner at the time the action is brought.</li><li><strong>Joint Survey Documentation:</strong> Before unloading clears port premises, consignees must secure joint stevedore/surveyor reports and Customs Outturn Reports; without contemporaneous tally proofs, carrier defenses under inherent vice or perils of the sea prevail.</li></ul>'
        }
      ],
      faqs: [
        {
          q: 'How fast can a ship be arrested at Chattogram Port through the High Court?',
          a: 'When all supporting bills of lading, survey reports, and court-fee chalans are ready, an urgent admiralty motion can be moved and the arrest order communicated to Chattogram Port Authority within the same working day.'
        },
        {
          q: 'Can I arrest a vessel if the Charterparty has a London or Singapore arbitration clause?',
          a: 'Yes, claimants often file an action in rem in Bangladesh to obtain security for a maritime claim; however, defendants may apply to stay merits proceedings in favor of contractual foreign arbitration while keeping furnished security intact or contested depending on High Court orders.'
        },
        {
          q: 'Who bears port charges while a ship remains under High Court arrest?',
          a: 'Ordinarily the shipowner remains responsible for port dues, crew maintenance, and anchorage expenses; if the owner abandons the vessel, the court may order judicial auction under Section 6 and distribute sale proceeds by maritime priority.'
        }
      ]
    },
    bn: {
      slug: 'admiralty-jahaj-atke-mamla-high-court-ain-2000-bangladesh',
      enSlug: 'admiralty-ship-arrest-maritime-claims-bangladesh-act-2000',
      title: 'জাহাজ আটক ও সমুদ্র পরিবহন মামলা — অ্যাডমিরালটি আইন ২০০০',
      metaTitle: 'জাহাজ আটক ও অ্যাডমিরালটি মামলা আইন ২০০০ (BD গাইড)',
      metaDescription: 'চট্টগ্রাম বা মোংলা বন্দরে কার্গো ক্ষতি, চার্টারপার্টি বা পাওনা আদায়ে অ্যাডমিরালটি আইন ২০০০ অনুযায়ী হাইকোর্টে জাহাজ আটক ও জামানতে মুক্তির সম্পূর্ণ নিয়ম।',
      category: 'হাইকোর্ট ও রিট পিটিশন',
      readTime: '৮ মিনিট',
      publishedDate: TODAY,
      lastModified: TODAY,
      isDraft: false,
      keywords: [
        'অ্যাডমিরালটি আদালত আইন ২০০০',
        'চট্টগ্রাম বন্দরে জাহাজ আটক মামলা',
        'সমুদ্র আইন হাইকোর্ট বাংলাদেশ',
        'কার্গো ক্ষতিপূরণ বিল অব লেডিং মামলা',
        'হাইকোর্ট অ্যাডমিরালটি বেঞ্চ ঢাকা'
      ],
      heroIntro: 'চট্টগ্রাম, মোংলা ও পায়রা সমুদ্রবন্দরে আমদানি-রপ্তানি পণ্য খালাসে ঘাটতি বা ক্ষতি, জাহাজ ভাড়া (Charter Hire), বাঙ্কার তেল সরবরাহের বকেয়া কিংবা নাবিকদের বেতন সংক্রান্ত বিরোধ নিষ্পত্তির একমাত্র উচ্চ আদালত হলো সুপ্রিম কোর্টের হাইকোর্ট বিভাগের অ্যাডমিরালটি বেঞ্চ। অ্যাডমিরালটি কোর্ট আইন, ২০০০-এর আওতায় পাওনাদার বন্দর ছাড়ার আগেই তাৎক্ষণিক পরোয়ানার মাধ্যমে বিদেশি বা দেশি জাহাজ আটক (Arrest of Ship) করতে পারেন।',
      quickAnswer: {
        heading: '⚡ অ্যাডমিরালটি আইন ২০০০ ও জাহাজ আটক — একনজরে',
        points: [
          'মূল আইন: অ্যাডমিরালটি আদালত আইন, ২০০০ (২০০০ সনের ৪৩ নং আইন)',
          'একমাত্র আদালত (ধারা ৩): বাংলাদেশ সুপ্রিম কোর্টের হাইকোর্ট বিভাগের অ্যাডমিরালটি বেঞ্চ (নিম্ন আদালতে এই মামলা চলে না)',
          'জাহাজ আটকের ১৮টি কারণ: পণ্যের ক্ষতি/ঘাটতি, বাঙ্কার ও রসদ সরবরাহ, চার্টারপার্টি বিরোধ, সংঘর্ষ, স্যালভেজ ও মর্টগেজ',
          'জাহাজ মুক্তির উপায়: দাবি করা সমুদয় অর্থ বা তফসিলি ব্যাংকের গ্যারান্টি (Bank Guarantee) আদালতের মার্শালের নিকট জমা দেওয়া'
        ]
      },
      toc: [
        'হাইকোর্ট বিভাগের একচেটিয়া অ্যাডমিরালটি এখতিয়ার',
        'ধারা ৩(২) অনুযায়ী কোন কোন দাবিতে জাহাজ আটক করা যায়?',
        'হাইকোর্টে অ্যাডমিরালটি মামলা ও জাহাজ আটকের জরুরি ধাপসমূহ',
        'আটক জাহাজ মুক্তি: ব্যাংক গ্যারান্টি বনাম পি অ্যান্ড আই ক্লাব (LOU)',
        'সিস্টার-শিপ আটক, তামাদি সময়সীমা ও সার্ভে প্রমাণের গুরুত্ব'
      ],
      sections: [
        {
          h2: 'হাইকোর্ট বিভাগের একচেটিয়া অ্যাডমিরালটি এখতিয়ার',
          content: '<p>সাধারণ আর্থিক মামলার মতো জেলা বা জজ আদালতে সমুদ্রগামী জাহাজের বিরুদ্ধে কোনো মামলা দায়ের করা যায় না। <strong>অ্যাডমিরালটি আদালত আইন, ২০০০-এর ৩(১) ধারা</strong> অনুযায়ী একমাত্র <strong>বাংলাদেশ সুপ্রিম কোর্টের হাইকোর্ট বিভাগ</strong>-ই অ্যাডমিরালটি এখতিয়ার প্রয়োগ করে কোনো জাহাজের বিরুদ্ধে সরাসরি মামলা (<em>Action in Rem</em>) গ্রহণ এবং চট্টগ্রাম, মোংলা, পায়রা বা মাতারবাড়ী বন্দরে জাহাজ আটকের নির্দেশ দিতে পারেন।</p>'
        },
        {
          h2: 'ধারা ৩(২) অনুযায়ী কোন কোন দাবিতে জাহাজ আটক করা যায়?',
          content: '<p>আইনের <strong>ধারা ৩(২)</strong>-এ ১৮টি সুনির্দিষ্ট সামুদ্রিক দাবির কথা উল্লেখ আছে, যার যেকোনোটি বাংলাদেশে বা গভীর সমুদ্রে উদ্ভূত হলেও হাইকোর্টে মামলা করা যায়:</p><ul><li><strong>পণ্য ঘাটতি ও ক্ষতিপূরণ:</strong> বিল অব লেডিং (Bill of Lading) অনুযায়ী বহনকৃত পণ্য নষ্ট হওয়া, ভিজে যাওয়া বা কম খালাস হওয়া।</li><li><strong>জ্বালানি (Bunker) ও সরঞ্জাম সরবরাহ:</strong> জাহাজে জ্বালানি তেল, খাদ্য, মেরামত বা প্রয়োজনীয় সামগ্রী সরবরাহের বকেয়া বিল।</li><li><strong>চার্টারপার্টি, ডেমারেজ ও সংঘর্ষ:</strong> জাহাজ ভাড়ার চুক্তি ভঙ্গ, বন্দরে বিলম্ব বা অন্য জাহাজ ও জেটির সাথে ধাক্কা লাগার ক্ষতিপূরণ।</li><li><strong>নাবিকের বেতন ও জাহাজ বন্ধক:</strong> ক্যাপ্টেন ও ক্রুদের বকেয়া বেতন এবং নিবন্ধিত শিপিং মর্টগেজ আদায়ের দাবি।</li></ul>'
        },
        {
          h2: 'হাইকোর্টে অ্যাডমিরালটি মামলা ও জাহাজ আটকের জরুরি ধাপসমূহ',
          content: '<p>সমুদ্রগামী জাহাজ সাধারণত মাত্র ২৪ থেকে ৭২ ঘণ্টা বন্দরে অবস্থান করে, তাই অ্যাডমিরালটি মামলা অত্যন্ত দ্রুতগতিতে করতে হয়:</p><ol><li><strong>আরজি ও প্রমাণপত্র প্রস্তুত:</strong> মূল বিল অব লেডিং, কাস্টমস শর্ট-ল্যান্ডিং সার্টিফিকেট, জয়েন্ট সার্ভে রিপোর্ট ও বাণিজ্যিক ইনভয়েসসহ অ্যাড-ভ্যালোরেম কোর্ট ফি দিয়ে হাইকোর্টে আরজি প্রস্তুত।</li><li><strong>গ্রেপ্তারি পরোয়ানার আবেদন (ধারা ৪):</strong> অ্যাডমিরালটি বেঞ্চে জরুরি শুনানির মাধ্যমে জাহাজের বিরুদ্ধে ওয়ারেন্ট অব অ্যারেস্ট প্রার্থনা।</li><li><strong>বন্দর কর্তৃপক্ষকে তাৎক্ষণিক নির্দেশ:</strong> আদালত পরোয়ানা মঞ্জুর করলে হাইকোর্টের মার্শাল সাথে সাথে চট্টগ্রাম বা মোংলা বন্দর কর্তৃপক্ষ ও কাস্টমসকে পোর্ট ক্লিয়ারেন্স (Port Clearance) স্থগিত করে জাহাজ আটক রাখার নির্দেশ পাঠান।</li></ol>'
        },
        {
          h2: 'আটক জাহাজ মুক্তি: ব্যাংক গ্যারান্টি বনাম পি অ্যান্ড আই ক্লাব (LOU)',
          content: '<p>জাহাজ আটকের কারণে মালিকপক্ষের প্রতিদিন বিপুল ডেমারেজ খরচ হয়, তাই মালিকপক্ষ দ্রুত মুক্তির আবেদন করে:</p><ul><li><strong>ব্যাংক গ্যারান্টি বা নগদ জমা:</strong> মামলাকৃত দাবি, আনুমানিক সুদ ও মামলার খরচ কাভার করে এমন বাংলাদেশের কোনো তফসিলি ব্যাংকের নিঃশর্ত <strong>ব্যাংক গ্যারান্টি বা নগদ জামানত</strong> দাখিল করলে আদালত তাৎক্ষণিক জাহাজ মুক্তির আদেশ দেন।</li><li><strong>পি অ্যান্ড আই ক্লাব এলওইউ (LOU):</strong> আন্তর্জাতিক ইন্স্যুরেন্স ক্লাবগুলো অনেক সময় LOU দিতে চায়, তবে বাদীর লিখিত সম্মতি ছাড়া বাংলাদেশের অ্যাডমিরালটি আদালত সাধারণত স্থানীয় ব্যাংক গ্যারান্টিই দাবি করেন।</li></ul>'
        },
        {
          h2: 'সিস্টার-শিপ আটক, তামাদি সময়সীমা ও সার্ভে প্রমাণের গুরুত্ব',
          content: '<p>অ্যাডমিরালটি মামলায় দুটি বিষয়ে সর্বোচ্চ সতর্কতা প্রয়োজন:</p><ul><li><strong>সিস্টার-শিপ (Sister-Ship) আটক (ধারা ৪(৪)):</strong> দায়ী জাহাজটি ইতোমধ্যে বাংলাদেশ ছেড়ে চলে গেলেও, মামলা দায়েরের সময় যদি একই মালিকের মালিকানাধীন অন্য কোনো জাহাজ দেশের বন্দরে থাকে, তবে সেই সিস্টার-শিপকে আটক করা যায়।</li><li><strong>১ বছরের তামাদি সময়সীমা:</strong> হেগ/হেগ-ভিসবি রুলস প্রযোজ্য বিল অব লেডিং-এর পণ্য ঘাটতি দাবির ক্ষেত্রে পণ্য খালাসের তারিখ থেকে সাধারণত <strong>১ বছরের মধ্যে</strong> মামলা দায়ের করতে হয়; অন্যথায় দাবি তামাদিতে অচল হয়ে যেতে পারে।</li></ul>'
        }
      ],
      faqs: [
        {
          q: 'হাইকোর্ট থেকে কত দ্রুত চট্টগ্রাম বন্দরে জাহাজ আটক করা যায়?',
          a: 'বিল অব লেডিং, সার্ভে রিপোর্ট ও কোর্ট ফি চালান প্রস্তুত থাকলে একই কর্মদিবসে জরুরি অ্যাডমিরালটি বেঞ্চে আবেদন শুনে চট্টগ্রাম বন্দর কর্তৃপক্ষ বরাবর জাহাজ আটকের আদেশ পাঠানো সম্ভব।'
        },
        {
          q: 'চুক্তিতে বিদেশি সালিশ (London/SIAC) ক্লজ থাকলেও কি বাংলাদেশে জাহাজ আটক করা যায়?',
          a: 'অনেক ক্ষেত্রে জামানত (Security) সুরক্ষার জন্য বাংলাদেশে মামলা করে জাহাজ আটক করা হয়; পরবর্তীতে মূল বিরোধ বিদেশি সালিশে নিষ্পত্তি হবে কি না তা হাইকোর্ট উভয় পক্ষের চুক্তি পর্যালোচনা করে আদেশ দেন।'
        },
        {
          q: 'মালিক জাহাজ পরিত্যাগ করে চলে গেলে পাওনাদার কীভাবে টাকা পাবেন?',
          a: 'অ্যাডমিরালটি আইনের ৬ ধারা অনুযায়ী হাইকোর্ট নিলাম (Judicial Auction) দিয়ে জাহাজটি বিক্রি করতে পারেন এবং বিক্রয়লব্ধ অর্থ আইনি অগ্রাধিকার অনুযায়ী পাওনাদারদের মাঝে বণ্টন করেন।'
        }
      ]
    }
  },

  // 3. Joint Venture & Franchise Agreement Law in Bangladesh
  {
    en: {
      slug: 'joint-venture-franchise-agreement-law-bangladesh',
      bnSlug: 'joint-venture-franchise-chukti-ain-bangladesh',
      title: 'Joint Venture & Franchise Agreements in Bangladesh: Corporate Legal Guide',
      metaTitle: 'Joint Venture & Franchise Law Bangladesh (2026 Guide)',
      metaDescription: 'Structuring Joint Venture & Franchise agreements in Bangladesh: Contract Act 1872, Companies Act 1994, BIDA royalty remittance caps, IP licensing & exit terms.',
      category: 'Corporate Law',
      readTime: '8 min read',
      publishedDate: TODAY,
      lastModified: TODAY,
      isDraft: false,
      keywords: [
        'joint venture agreement bangladesh law',
        'franchise agreement bangladesh bida royalty',
        'shareholders agreement companies act 1994',
        'bangladesh bank royalty remittance limit',
        'commercial contract lawyer dhaka'
      ],
      heroIntro: 'Bangladesh currently has no single standalone Franchise Act; instead, international and local Joint Ventures (JVs) and Franchises operate under an interlocking framework of the Contract Act 1872, Companies Act 1994, Trademarks Act 2009, BIDA regulatory ceilings, and Bangladesh Bank Foreign Exchange Guidelines. Proper structuring protects minority/foreign equity, preserves brand IP, and ensures lawful cross-border remittance of royalties and technical fees.',
      quickAnswer: {
        heading: 'At a Glance: JV & Franchise Law in Bangladesh',
        text: 'Governed by the Contract Act 1872, Companies Act 1994, Trademarks Act 2009 & BIDA royalty guidelines.',
        points: [
          'Corporate Structuring: Equity JV incorporates a Private Limited Company (RJSC) mirroring the Shareholders’ Agreement inside its Articles of Association (AoA)',
          'BIDA & Bangladesh Bank Caps: Royalty, franchise, and technical know-how remittances typically require BIDA vetting/approval above prescribed turnover percentages (often 6% net sales benchmarks)',
          'Post-Termination Non-Compete Warning: Section 27 of the Contract Act 1872 voids overly broad post-termination restraints of trade',
          'Trademark Protection: Register brand marks at DPDT and record Franchisee as a Registered User under the Trademarks Act 2009'
        ]
      },
      toc: [
        'Equity Joint Venture (SPV) vs. Contractual Joint Venture in Bangladesh',
        'Incorporating JV Deadlock & Exit Clauses Into the Articles of Association',
        'Franchise Royalty, Technical Fees & BIDA / Bangladesh Bank Approval',
        'Enforceability of Non-Compete Clauses Under Section 27 of the Contract Act',
        'Mandatory Intellectual Property & Dispute Resolution Checklist'
      ],
      sections: [
        {
          h2: 'Equity Joint Venture (SPV) vs. Contractual Joint Venture in Bangladesh',
          content: '<p>Foreign investors and local conglomerates choose between two core JV structures:</p><ul><li><strong>Incorporated Equity JV (Private Limited Company):</strong> Registered at the Registrar of Joint Stock Companies and Firms (<strong>RJSC</strong>) under the <strong>Companies Act 1994</strong>. Ideal for long-term manufacturing, SaaS, healthcare, and hospitality ventures with limited liability, clean share splits, and bank financing access.</li><li><strong>Unincorporated / Consortium JV:</strong> Formed solely by a Joint Venture Agreement for fixed-duration infrastructure, EPC tenders, or consortium bidding. Each co-venturer bears joint and several project liability unless clearly ring-fenced against third parties, and obtains separate project TIN/BIN registrations as an Association of Persons (AOP).</li></ul>'
        },
        {
          h2: 'Incorporating JV Deadlock & Exit Clauses Into the Articles of Association',
          content: '<p>A critical pitfall in Bangladesh corporate practice is leaving protective investor rights solely inside an external Shareholders’ Agreement (SHA). Under Bangladeshi company law precedents, if a provision in the SHA conflicts with the registered <strong>Articles of Association (AoA)</strong>, the AoA prevails on internal corporate governance.</p><ul><li><strong>Mirror Essential Protections in AoA:</strong> Reserved board veto matters, quorum requirements, pre-emption rights, Right of First Refusal (ROFR), and Drag-Along/Tag-Along exits should be transcribed directly into the AoA filed with RJSC.</li><li><strong>50/50 Deadlock Mechanics:</strong> Include a defined escalation timeline (CEO negotiation → mediation → Russian Roulette / Texas Shootout buy-sell or fair-market valuation buyout) to prevent operational paralysis or Section 241 winding-up petitions.</li></ul>'
        },
        {
          h2: 'Franchise Royalty, Technical Fees & BIDA / Bangladesh Bank Approval',
          content: '<p>Foreign franchisors (F&B chains, retail brands, fitness studios, edtech) must comply with the <strong>Bangladesh Investment Development Authority (BIDA)</strong> and Bangladesh Bank foreign exchange rules to legally repatriate royalties abroad:</p><ul><li><strong>Standard Authorized Dealer Bank vs. BIDA Gate:</strong> Banks may remit initial technical know-how or ongoing royalties up to BIDA’s prescribed thresholds without prior case-by-case BIDA clearance if the agreement complies with <em>Guidelines for Foreign Exchange Transactions</em>. Agreements exceeding ceilings (commonly benchmarked against 6% of net ex-factory sales or project investment caps) require prior <strong>BIDA Inter-Ministerial Committee approval</strong>.</li><li><strong>Withholding Tax & VAT:</strong> Royalty and technical service fee remittances attract Bangladesh withholding income tax (TDS under the Income Tax Act 2023, subject to applicable Double Taxation Avoidance Treaties) plus 15% VAT on imported services.</li></ul>'
        },
        {
          h2: 'Enforceability of Non-Compete Clauses Under Section 27 of the Contract Act',
          content: '<p>Foreign franchise templates often import 2-to-5-year post-termination non-compete bans wholesale from US or UK law—which fail inside Bangladeshi courts:</p><p>Under <strong>Section 27 of the Contract Act 1872</strong>, every agreement by which anyone is restrained from exercising a lawful profession, trade, or business is <strong>to that extent void</strong> (save only the narrow goodwill-sale exception). While non-compete restrictions are enforceable <em>during the active term</em> of a JV or franchise agreement, post-termination restraints must instead rely on <strong>confidentiality, trade secret protection, strict IP de-branding covenants, and territorial exclusivity forfeiture</strong> rather than blanket business bans.</p>'
        },
        {
          h2: 'Mandatory Intellectual Property & Dispute Resolution Checklist',
          content: '<ol><li><strong>DPDT Trademark Registration:</strong> File marks across all relevant Nice Classes at the Department of Patents, Designs and Trademarks (DPDT) before signing local franchise disclosures.</li><li><strong>Quality Control & Termination Triggers:</strong> Maintain strict audit, supply-chain, and hygiene inspection rights so brand dilution entitles immediate termination and liquidated damages (Sections 73–74 Contract Act).</li><li><strong>Neutral Arbitration Clause:</strong> Specify arbitration seated in Dhaka (BIAC) or Singapore (SIAC) with express governing law clarity and court interim protection.</li></ol>'
        }
      ],
      faqs: [
        {
          q: 'Can a foreign franchisor own 100% of a franchise master entity in Bangladesh?',
          a: 'Yes. Bangladesh permits 100% foreign equity ownership in most non-restricted commercial, IT, hospitality, and manufacturing sectors under the Foreign Private Investment (Promotion and Protection) Act 1980.'
        },
        {
          q: 'Are franchise agreements mandatory to register with any government ministry?',
          a: 'There is no mandatory franchise registry; however, filing the agreement with your Authorized Dealer Bank and obtaining BIDA approval (when exceeding standard royalty caps) is essential for outward FX remittance.'
        },
        {
          q: 'How do I stop an ex-franchisee who refuses to remove my brand signage after termination?',
          a: 'Immediately serve a cease-and-desist legal notice, then file a trademark infringement and passing-off suit for permanent & temporary injunction in the District Judge Court under the Trademarks Act 2009 (or invoke Section 7A under the Arbitration Act 2001).'
        }
      ]
    },
    bn: {
      slug: 'joint-venture-franchise-chukti-ain-bangladesh',
      enSlug: 'joint-venture-franchise-agreement-law-bangladesh',
      title: 'জয়েন্ট ভেঞ্চার ও ফ্র্যাঞ্চাইজি চুক্তি — বাংলাদেশের কর্পোরেট আইন',
      metaTitle: 'জয়েন্ট ভেঞ্চার ও ফ্র্যাঞ্চাইজি চুক্তি আইন (BD ২০২৬)',
      metaDescription: 'বাংলাদেশে জয়েন্ট ভেঞ্চার (JV) ও ফ্র্যাঞ্চাইজি চুক্তির আইনি কাঠামো, কোম্পানি আইন ১৯৯৪, বিডা রয়্যালটি অনুমোদন, নন-কম্পিট ক্লজ ও ব্র্যান্ড সুরক্ষা জানুন।',
      category: 'করপোরেট ও বাণিজ্যিক আইন',
      readTime: '৮ মিনিট',
      publishedDate: TODAY,
      lastModified: TODAY,
      isDraft: false,
      keywords: [
        'জয়েন্ট ভেঞ্চার চুক্তি আইন বাংলাদেশ',
        'ফ্র্যাঞ্চাইজি ব্যবসা আইনি নিয়ম বিডা',
        'শেয়ারহোল্ডার্স এগ্রিমেন্ট আর্টিকেলস',
        'রয়্যালটি বিদেশে পাঠানো বাংলাদেশ ব্যাংক',
        'কর্পোরেট ও বাণিজ্যিক আইনজীবী ঢাকা'
      ],
      heroIntro: 'বাংলাদেশে পৃথক কোনো ‘ফ্র্যাঞ্চাইজি আইন’ না থাকলেও দেশি-বিদেশি জয়েন্ট ভেঞ্চার (Joint Venture) ও ফ্র্যাঞ্চাইজি ব্যবসা পরিচালিত হয় চুক্তি আইন ১৮৭২, কোম্পানি আইন ১৯৯৪, ট্রেডমার্ক আইন ২০০৯ এবং বিডা (BIDA) ও বাংলাদেশ ব্যাংকের বৈদেশিক মুদ্রা নীতিমালার সমন্বয়ে। সঠিক আইনি কাঠামো ছাড়া যৌথ ব্যবসায় অংশীদারদের বিরোধ, লভ্যাংশ বা রয়্যালটি প্রেরণে জটিলতা এবং ব্র্যান্ড অপব্যবহারের ঝুঁকি থাকে।',
      quickAnswer: {
        heading: '⚡ জয়েন্ট ভেঞ্চার ও ফ্র্যাঞ্চাইজি চুক্তি — মূল আইনি সারসংক্ষেপ',
        points: [
          'কোম্পানি কাঠামো: দীর্ঘমেয়াদি যৌথ ব্যবসার জন্য RJSC-তে প্রাইভেট লিমিটেড কোম্পানি নিবন্ধন ও আর্টিকেলসে শেয়ারহোল্ডারদের অধিকার যুক্ত করা',
          'রয়্যালটি ও কারিগরি ফি (BIDA): নির্ধারিত সীমার বেশি ফ্র্যাঞ্চাইজি ফি বা রয়্যালটি বিদেশে পাঠাতে বিডা (BIDA)-এর পূর্বানুমোদন আবশ্যক',
          'চুক্তি পরবর্তী নন-কম্পিট সতর্কতা: চুক্তি আইন ১৮৭২-এর ২৭ ধারা অনুযায়ী ব্যবসা-বাণিজ্য বন্ধের একতরফা শর্ত (Restraint of Trade) আদালতে বাতিল বলে গণ্য হয়',
          'ব্র্যান্ড সুরক্ষা: চুক্তি স্বাক্ষরের আগেই DPDT-তে ট্রেডমার্ক নিবন্ধন ও লাইসেন্সিং শর্ত নির্ধারণ'
        ]
      },
      toc: [
        'ইক্যুইটি জয়েন্ট ভেঞ্চার (SPV) বনাম কনসোর্টিয়াম চুক্তি',
        'শেয়ারহোল্ডার্স এগ্রিমেন্টের শর্ত কেন আর্টিকেলস (AoA)-তে রাখা জরুরি?',
        'ফ্র্যাঞ্চাইজি রয়্যালটি, বিডা অনুমোদন ও বাংলাদেশ ব্যাংকের নিয়ম',
        'নন-কম্পিট ক্লজ ও চুক্তি আইনের ২৭ ধারার আইনি সীমাবদ্ধতা',
        'ট্রেডমার্ক সুরক্ষা ও বিরোধ নিষ্পত্তির জরুরি চেকলিস্ট'
      ],
      sections: [
        {
          h2: 'ইক্যুইটি জয়েন্ট ভেঞ্চার (SPV) বনাম কনসোর্টিয়াম চুক্তি',
          content: '<p>যৌথ ব্যবসা শুরুর আগে অংশীদাররা সাধারণত দুটি মডেলের একটি বেছে নেন:</p><ul><li><strong>ইক্যুইটি জয়েন্ট ভেঞ্চার (প্রাইভেট লিমিটেড কোম্পানি):</strong> কোম্পানি আইন ১৯৯৪ অনুযায়ী <strong>RJSC</strong>-তে একটি নতুন যৌথ কোম্পানি নিবন্ধিত হয়। এতে অংশীদারদের দায় সীমিত (Limited Liability) থাকে, শেয়ার স্থানান্তর সহজ হয় এবং ব্যাংক ঋণ গ্রহণ নির্বিঘ্ন হয়।</li><li><strong>চুক্তিভিত্তিক বা কনসোর্টিয়াম জয়েন্ট ভেঞ্চার:</strong> নির্দিষ্ট নির্মাণ প্রকল্প, সরকারি টেন্ডার বা স্বল্পমেয়াদি কাজের জন্য কেবল একটি JV চুক্তির মাধ্যমে পরিচালিত হয়। এতে অংশীদাররা পৃথক সত্তার বদলে যৌথভাবে দায়বদ্ধ থাকতে পারেন।</li></ul>'
        },
        {
          h2: 'শেয়ারহোল্ডার্স এগ্রিমেন্টের শর্ত কেন আর্টিকেলস (AoA)-তে রাখা জরুরি?',
          content: '<p>বাংলাদেশের কোম্পানি আইনের অন্যতম গুরুত্বপূর্ণ নজির হলো—শেয়ারহোল্ডার্স এগ্রিমেন্ট (SHA)-এর কোনো শর্ত যদি কোম্পানির নিবন্ধিত <strong>আর্টিকেলস অব অ্যাসোসিয়েশন (AoA)</strong>-এর সাথে সাংঘর্ষিক হয় বা তাতে অন্তর্ভুক্ত না থাকে, তবে কোম্পানি পরিচালনায় আর্টিকেলসই প্রাধান্য পায়।</p><ul><li><strong>বোর্ড ভেটো ও কোরাম সুরক্ষা:</strong> সংখ্যালঘু বা বিদেশি অংশীদারের ভেটো ক্ষমতা, বোর্ড মিটিংয়ের কোরাম ও লভ্যাংশ বণ্টনের নিয়ম সরাসরি AoA-তে যুক্ত করুন।</li><li><strong>অচলাবস্থা (Deadlock) নিরসন ও প্রস্থান শর্ত:</strong> ৫০/৫০ শেয়ারহোল্ডিংয়ে মতবিরোধ দেখা দিলে শেয়ার ক্রয়-বিক্রয় (Buy-Out), Right of First Refusal ও Drag-Along শর্ত সুস্পষ্টভাবে লিখুন।</li></ul>'
        },
        {
          h2: 'ফ্র্যাঞ্চাইজি রয়্যালটি, বিডা অনুমোদন ও বাংলাদেশ ব্যাংকের নিয়ম',
          content: '<p>আন্তর্জাতিক ব্র্যান্ডের ফ্র্যাঞ্চাইজি বা কারিগরি সহযোগিতা চুক্তিতে বিদেশে অর্থ প্রেরণের ক্ষেত্রে দুটি নিয়ন্ত্রক ধাপ মানতে হয়:</p><ul><li><strong>বিডা (BIDA) ও অনুমোদিত ডিলার ব্যাংক:</strong> বাংলাদেশ ব্যাংকের বৈদেশিক মুদ্রা নির্দেশিকা অনুযায়ী নির্ধারিত সীমার (সাধারণত নিট বিক্রয়ের নির্ধারিত শতাংশ) ভেতরে রয়্যালটি ও টেকনিক্যাল ফি অনুমোদিত ডিলার ব্যাংকের মাধ্যমে পাঠানো যায়; সীমা অতিক্রম করলে <strong>বিডা’র (BIDA)</strong> পূর্বানুমোদন নিতে হয়।</li><li><strong>আয়কর (TDS) ও ভ্যাট কর্তন:</strong> বিদেশে প্রেরিত রয়্যালটি ও ফ্র্যাঞ্চাইজি ফির ওপর আয়কর আইন ২০২৩ মোতাবেক উৎসে কর (প্রযোজ্য দ্বৈত কর পরিহার চুক্তি সাপেক্ষে) এবং ১৫% ভ্যাট পরিশোধ বাধ্যতামূলক।</li></ul>'
        },
        {
          h2: 'নন-কম্পিট ক্লজ ও চুক্তি আইনের ২৭ ধারার আইনি সীমাবদ্ধতা',
          content: '<p>বিদেশি খসড়া চুক্তিতে প্রায়ই চুক্তি শেষ হওয়ার পর ২ থেকে ৫ বছর একই ব্যবসা না করার শর্ত (Post-Termination Non-Compete) রাখা হয়, যা বাংলাদেশের আদালতে সাধারণত টেকে না।</p><p><strong>চুক্তি আইন, ১৮৭২-এর ২৭ ধারা</strong> অনুযায়ী, কোনো ব্যক্তিকে বৈধ ব্যবসা বা পেশা পরিচালনা থেকে বিরত রাখার যেকোনো চুক্তি <strong>বাতিল (Void)</strong> বলে গণ্য হয়। তবে চুক্তি <em>চলমান থাকা অবস্থায়</em> এক্সক্লুসিভিটি বা প্রতিযোগিতা না করার শর্ত কার্যকর থাকে। তাই চুক্তি-পরবর্তী ঝুঁকি এড়াতে নন-কম্পিটের বদলে কঠোর <strong>ট্রেড সিক্রেট গোপনীয়তা (NDA), ব্র্যান্ড ডিকমিশনিং ও ট্রেডমার্ক লঙ্ঘন-বিরোধী</strong> ধারা যুক্ত করতে হয়।</p>'
        },
        {
          h2: 'ট্রেডমার্ক সুরক্ষা ও বিরোধ নিষ্পত্তির জরুরি চেকলিস্ট',
          content: '<ol><li><strong>ট্রেডমার্ক নিবন্ধন (DPDT):</strong> ফ্র্যাঞ্চাইজি দেওয়ার আগে বাংলাদেশের পেটেন্ট, ডিজাইন ও ট্রেডমার্কস অধিদপ্তরে ব্র্যান্ড নাম ও লোগো নিবন্ধন সম্পন্ন করুন।</li><li><strong>মান নিয়ন্ত্রণ ও চুক্তি বাতিল:</strong> পণ্যের মান বা নিয়ম ভঙ্গ করলে চুক্তি বাতিলের অধিকার এবং চুক্তি আইন ৭৩–৭৪ ধারায় ক্ষতিপূরণ আদায়ের শর্ত রাখুন।</li><li><strong>সালিশ ক্লজ (Arbitration):</strong> ব্যয়বহুল আদালতের বদলে ঢাকা (BIAC) বা আন্তর্জাতিক সালিশ কেন্দ্রের মাধ্যমে দ্রুত বিরোধ নিষ্পত্তির শর্ত সংযোজন করুন।</li></ol>'
        }
      ],
      faqs: [
        {
          q: 'বিদেশি ফ্র্যাঞ্চাইজর কি বাংলাদেশে ১০০% মালিকানায় প্রতিষ্ঠান খুলতে পারে?',
          a: 'হ্যাঁ, ১৯৮০ সালের ফরেন প্রাইভেট ইনভেস্টমেন্ট আইনের অধীনে বেশিরভাগ বাণিজ্যিক, আইটি, হসপিটালিটি ও উৎপাদন খাতে ১০০% বিদেশি মালিকানা অনুমোদিত।'
        },
        {
          q: 'ফ্র্যাঞ্চাইজি চুক্তি কি কোনো সরকারি অফিসে রেজিস্ট্রেশন বাধ্যতামূলক?',
          a: 'ফ্র্যাঞ্চাইজির জন্য আলাদা কোনো নিবন্ধন কর্তৃপক্ষ নেই; তবে বিদেশে রয়্যালটি পাঠাতে হলে চুক্তিটি ব্যাংকে দাখিল এবং প্রয়োজনবোধে বিডা (BIDA)-তে অনুমোদন নিতে হয়।'
        },
        {
          q: 'চুক্তি বাতিলের পর ফ্র্যাঞ্চাইজি ব্র্যান্ডের সাইনবোর্ড বা লোগো না সরালে কী করণীয়?',
          a: 'আইনজীবীর মাধ্যমে লিগ্যাল নোটিশ দিয়ে ট্রেডমার্ক আইন ২০০৯-এর অধীনে জেলা জজ আদালতে ট্রেডমার্ক লঙ্ঘন ও পাসিং-অফ মামলা করে তাৎক্ষণিক নিষেধাজ্ঞা (Injunction) আদায় করা যায়।'
        }
      ]
    }
  },

  // 4. NGO & Society Registration (Societies Act 1860, DSS & NGOAB)
  {
    en: {
      slug: 'ngo-society-registration-ngoab-societies-act-1860-bangladesh',
      bnSlug: 'ngo-society-nibondhon-ngoab-societies-act-1860-bangladesh',
      title: 'NGO & Society Registration in Bangladesh: 1860 Act & NGOAB Guide',
      metaTitle: 'NGO & Society Registration BD: 1860 Act & NGOAB',
      metaDescription: 'How to register an NGO, foundation, or society in Bangladesh: Societies Act 1860 (RJSC), Section 28 non-profit company, Social Services (DSS) & NGOAB FD-1.',
      category: 'Corporate Law',
      readTime: '7 min read',
      publishedDate: TODAY,
      lastModified: TODAY,
      isDraft: false,
      keywords: [
        'ngo registration in bangladesh ngoab',
        'societies registration act 1860 rjsc',
        'section 28 non profit company bangladesh',
        'social welfare registration dss bangladesh',
        'foreign donations act 2016 bangladesh'
      ],
      heroIntro: 'Non-profit foundations, professional associations, and development NGOs in Bangladesh can incorporate under multiple legal vehicles—most commonly a Society under the Societies Registration Act 1860 (at RJSC), a Voluntary Social Welfare Organization (at DSS), a Section 28 Non-Profit Company, or a Registered Trust. However, receiving any foreign grant or donation triggers mandatory NGO Affairs Bureau (NGOAB) registration under the Foreign Donations (Voluntary Activities) Regulation Act 2016.',
      quickAnswer: {
        heading: 'At a Glance: Non-Profit & NGO Registration in Bangladesh',
        text: 'Choose between RJSC Society, DSS Social Welfare, Section 28 Company, or Trust—then seek NGOAB approval for foreign funds.',
        points: [
          'RJSC Society (1860 Act): Requires minimum 7 founding members; ideal for associations, chambers, cultural & charitable societies',
          'Section 28 Non-Profit Company: Licensed by Commerce Ministry / RJSC; zero dividend distribution, strong corporate governance',
          'Department of Social Services (DSS): Local community welfare registration under the 1961 Ordinance',
          'Foreign Funds Gatekeeper (NGOAB): Mandatory FD-1 registration & FD-6 project approval under the 2016 Act before spending foreign grants'
        ]
      },
      toc: [
        'Comparing the Four Legal Entities: Society vs. Section 28 vs. DSS vs. Trust',
        'Step-by-Step Society Registration at RJSC Under the 1860 Act',
        'NGOAB Registration (Form FD-1) Under the Foreign Donations Act 2016',
        'Microcredit (MRA) Licensing & Tax Exemption Compliance',
        'Essential Documents Checklist for Founding Members'
      ],
      sections: [
        {
          h2: 'Comparing the Four Legal Entities: Society vs. Section 28 vs. DSS vs. Trust',
          content: '<p>Before drafting founding documents, founders must match the entity type to their operational scope and donor expectations:</p><table><thead><tr><th>Legal Structure</th><th>Governing Statute &amp; Authority</th><th>Minimum Founders</th><th>Best Used For</th></tr></thead><tbody><tr><td><strong>Registered Society</strong></td><td>Societies Registration Act 1860 (RJSC)</td><td>7 persons</td><td>Professional associations, alumni clubs, education/charity foundations</td></tr><tr><td><strong>Non-Profit Company</strong></td><td>Section 28, Companies Act 1994 (RJSC &amp; Commerce Ministry)</td><td>2 directors / members</td><td>Large foundations, policy institutes, hospitals &amp; chambers</td></tr><tr><td><strong>Social Welfare Org</strong></td><td>Voluntary Social Welfare Agencies Ordinance 1961 (DSS)</td><td>7–11 members</td><td>Grassroots community charity, youth/women welfare</td></tr><tr><td><strong>Charitable Trust</strong></td><td>Trusts Act 1882 &amp; Registration Act 1908 (Sub-Registry)</td><td>Settlor + 3–5 trustees</td><td>Family endowments, scholarship &amp; mosque/school trusts</td></tr></tbody></table>'
        },
        {
          h2: 'Step-by-Step Society Registration at RJSC Under the 1860 Act',
          content: '<ol><li><strong>Name Clearance at RJSC:</strong> Apply online for name clearance ensuring the proposed Society name does not duplicate existing organizations or use restricted words improperly.</li><li><strong>Memorandum of Association &amp; Constitution:</strong> Draft the Memorandum specifying objectives limited to Section 20 charitable, literary, scientific, or educational purposes, plus Bye-Laws governing General Body meetings, Executive Committee (EC) elections, and asset dissolution clauses (requiring remaining assets to pass to a similar society).</li><li><strong>Security Clearance &amp; Filing:</strong> RJSC forwards founding details for Special Branch / Home Ministry verification as required; upon clearance and statutory fee payment, the Certificate of Registration is issued.</li></ol>'
        },
        {
          h2: 'NGOAB Registration (Form FD-1) Under the Foreign Donations Act 2016',
          content: '<p>A common compliance mistake is assuming an RJSC or DSS certificate authorizes receiving foreign donor money. Under the <strong>Foreign Donations (Voluntary Activities) Regulation Act 2016</strong>:</p><ul><li><strong>Strict Prohibition Without FD-1:</strong> No NGO or society may receive or utilize foreign donations, grants, or crowdfunding transfers from abroad without prior <strong>NGO Affairs Bureau (NGOAB)</strong> registration (Form FD-1), valid for 10 years.</li><li><strong>Project-by-Project Clearance (FD-6):</strong> Even after NGOAB registration, each funded project requires specific project approval via <strong>Form FD-6</strong> before withdrawing grant funds from the designated Mother Bank Account.</li><li><strong>Local-Fund Eligibility:</strong> Organizations relying purely on domestic Zakat, member subscriptions, or local corporate CSR do not require NGOAB clearance unless foreign funds enter their account.</li></ul>'
        },
        {
          h2: 'Microcredit (MRA) Licensing & Tax Exemption Compliance',
          content: '<p>Non-profits operating savings/loan programs must additionally obtain a license from the <strong>Microcredit Regulatory Authority (MRA)</strong> under the MRA Act 2006; unlicensed lending carries criminal penalties. Simultaneously, every registered society must obtain an <strong>e-TIN</strong>, submit audited annual financial statements to RJSC (Section 4), file annual NBR income tax returns under the Income Tax Act 2023, and apply separately for charitable tax exemption where eligible.</p>'
        },
        {
          h2: 'Essential Documents Checklist for Founding Members',
          content: '<ul><li>Certified <strong>Name Clearance</strong> printout from RJSC portal.</li><li>Signed <strong>Memorandum of Association</strong> and Rules &amp; Regulations adopted by all 7+ founding members.</li><li>National ID (NID) / Passport copies, TIN certificates, and photographs of all Executive Committee members.</li><li>Proof of registered head office (tenancy agreement or ownership deed + utility bill).</li><li>Minutes of the first General Meeting approving the Constitution and electing the first Executive Committee.</li></ul>'
        }
      ],
      faqs: [
        {
          q: 'How long does it take to register a Society with RJSC in Bangladesh?',
          a: 'Drafting and filing take 1 to 2 weeks, while overall issuance usually takes 2 to 4 months depending on Home Ministry / Special Branch verification timelines.'
        },
        {
          q: 'Can foreign citizens sit on the Executive Committee of a Bangladeshi Society or NGO?',
          a: 'Foreign nationals may serve as trustees, advisors, or members subject to security clearance; however, for NGOAB registration and smooth bank compliance, a majority Bangladeshi Executive Committee is strongly recommended.'
        },
        {
          q: 'What is the difference between a Society and a Section 28 Non-Profit Company?',
          a: 'A Section 28 company has corporate perpetual succession under the Companies Act 1994 and requires Ministry of Commerce licensing before RJSC incorporation, whereas an 1860 Act Society is simpler to form with 7 members directly at RJSC.'
        }
      ]
    },
    bn: {
      slug: 'ngo-society-nibondhon-ngoab-societies-act-1860-bangladesh',
      enSlug: 'ngo-society-registration-ngoab-societies-act-1860-bangladesh',
      title: 'এনজিও ও সোসাইটি নিবন্ধন — ১৮৬০ আইন ও এনজিও ব্যুরো অনুমোদন',
      metaTitle: 'এনজিও ও সোসাইটি নিবন্ধন: ১৮৬০ আইন ও NGOAB গাইড',
      metaDescription: 'বাংলাদেশে এনজিও, ফাউন্ডেশন বা সোসাইটি নিবন্ধনের নিয়ম: ১৮৬০ সালের আইন (RJSC), সমাজসেবা অধিদপ্তর ও বিদেশি অনুদানের জন্য NGOAB FD-1 অনুমোদন প্রক্রিয়া।',
      category: 'করপোরেট ও বাণিজ্যিক আইন',
      readTime: '৭ মিনিট',
      publishedDate: TODAY,
      lastModified: TODAY,
      isDraft: false,
      keywords: [
        'এনজিও নিবন্ধন নিয়ম বাংলাদেশ',
        'সোসাইটি নিবন্ধন আইন ১৮৬০',
        'এনজিও বিষয়ক ব্যুরো FD-1 আবেদন',
        'সেকশন ২৮ অলাভজনক কোম্পানি',
        'ফাউন্ডেশন রেজিস্ট্রেশন প্রক্রিয়া'
      ],
      heroIntro: 'বাংলাদেশে অলাভজনক ফাউন্ডেশন, পেশাজীবী সংগঠন বা উন্নয়নমূলক এনজিও পরিচালনার জন্য প্রধানত ১৮৬০ সালের সোসাইটিজ রেজিস্ট্রেশন অ্যাক্ট (RJSC), সমাজসেবা অধিদপ্তর (DSS) বা কোম্পানি আইনের ২৮ ধারায় নিবন্ধন করতে হয়। তবে বিদেশি অনুদান বা ফান্ড গ্রহণ করতে চাইলে অবশ্যই বৈদেশিক অনুদান আইন ২০১৬ অনুযায়ী এনজিও বিষয়ক ব্যুরো (NGOAB)-এর নিবন্ধন ও প্রকল্প অনুমোদন নিতে হয়।',
      quickAnswer: {
        heading: '⚡ এনজিও ও সোসাইটি নিবন্ধন — সংক্ষেপে মূল ধাপ',
        points: [
          'RJSC সোসাইটি (১৮৬০ আইন): ন্যূনতম ৭ জন প্রতিষ্ঠাতা সদস্য প্রয়োজন; পেশাজীবী সমিতি, ক্লাব ও ফাউন্ডেশনের জন্য উপযোগী',
          'সেকশন ২৮ কোম্পানি: বাণিজ্য মন্ত্রণালয়ের অনুমোদনক্রমে অলাভজনক লিমিটেড কোম্পানি গঠন',
          'সমাজসেবা অধিদপ্তর (DSS): স্থানীয় পর্যায়ে স্বেচ্ছাসেবী সমাজকল্যাণ সংস্থার নিবন্ধন',
          'NGOAB অনুমোদন (FD-1): বিদেশি দাতা সংস্থা থেকে টাকা আনতে হলে অবশ্যই ১০ বছর মেয়াদি FD-1 নিবন্ধন ও FD-6 প্রকল্প অনুমোদন লাগবে'
        ]
      },
      toc: [
        'সোসাইটি বনাম সেকশন ২৮ কোম্পানি বনাম সমাজসেবা বনাম ট্রাস্ট',
        '১৮৬০ সালের আইনে RJSC-তে সোসাইটি নিবন্ধনের ধাপসমূহ',
        'বিদেশি অনুদানের জন্য এনজিও ব্যুরো (NGOAB) ও ফর্ম FD-1 নিয়ম',
        'ক্ষুদ্রঋণ (MRA) লাইসেন্স ও এনবিআর কর অব্যাহতি কমপ্লায়েন্স',
        'নিবন্ধনের জন্য প্রয়োজনীয় মূল কাগজপত্র'
      ],
      sections: [
        {
          h2: 'সোসাইটি বনাম সেকশন ২৮ কোম্পানি বনাম সমাজসেবা বনাম ট্রাস্ট',
          content: '<p>সংস্থা গঠনের আগে কাজের পরিধি ও তহবিলের উৎস অনুযায়ী সঠিক আইনি কাঠামো নির্বাচন করা জরুরি:</p><table><thead><tr><th>আইনি কাঠামো</th><th>আইন ও নিবন্ধন কর্তৃপক্ষ</th><th>ন্যূনতম সদস্য</th><th>কোন কাজের জন্য উপযুক্ত</th></tr></thead><tbody><tr><td><strong>সোসাইটি (Society)</strong></td><td>সোসাইটিজ রেজিস্ট্রেশন অ্যাক্ট ১৮৬০ (RJSC)</td><td>৭ জন</td><td>সমিতি, চেম্বার, অ্যালামনাই ও শিক্ষা/দাতব্য ফাউন্ডেশন</td></tr><tr><td><strong>সেকশন ২৮ কোম্পানি</strong></td><td>কোম্পানি আইন ১৯৯৪ (বাণিজ্য মন্ত্রণালয় ও RJSC)</td><td>২ জন পরিচালক</td><td>বড় দাতব্য হাসপাতাল, রিসার্চ ইনস্টিটিউট ও চেম্বার</td></tr><tr><td><strong>সমাজকল্যাণ সংস্থা</strong></td><td>১৯৬১ সালের অধ্যাদেশ (সমাজসেবা অধিদপ্তর)</td><td>৭–১১ জন</td><td>তৃণমূল পর্যায়ের সমাজকল্যাণ ও সেবামূলক সংগঠন</td></tr><tr><td><strong>দাতব্য ট্রাস্ট</strong></td><td>ট্রাস্ট আইন ১৮৮২ (সাব-রেজিস্ট্রি অফিস)</td><td>দাতা + ৩–৫ জন ট্রাস্টি</td><td>পারিবারিক ওয়াকফ/বৃত্তি তহবিল ও স্কুল/হাসপাতাল ট্রাস্ট</td></tr></tbody></table>'
        },
        {
          h2: '১৮৬০ সালের আইনে RJSC-তে সোসাইটি নিবন্ধনের ধাপসমূহ',
          content: '<ol><li><strong>নাম ছাড়পত্র (Name Clearance):</strong> RJSC পোর্টালে অনলাইনে কাঙ্ক্ষিত সোসাইটির নামের অনুমোদন নিতে হবে।</li><li><strong>স্মারকলিপি ও গঠনতন্ত্র খসড়া:</strong> ১৮৬০ সালের আইনের ২০ ধারার সাথে সামঞ্জস্যপূর্ণ অলাভজনক উদ্দেশ্য, সাধারণ পরিষদ, কার্যনির্বাহী কমিটি নির্বাচন এবং বিলুপ্তি হলে সম্পদ সমধর্মী অন্য সংস্থায় হস্তান্তরের শর্তাবলি যুক্ত গঠনতন্ত্র তৈরি করতে হবে।</li><li><strong>নিরাপত্তা যাচাই ও সনদ:</strong> আবেদন ও ফি জমার পর স্বরাষ্ট্র মন্ত্রণালয়/বিশেষ শাখার নিরাপত্তা যাচাই শেষে RJSC নিবন্ধন সনদ ইস্যু করে।</li></ol>'
        },
        {
          h2: 'বিদেশি অনুদানের জন্য এনজিও ব্যুরো (NGOAB) ও ফর্ম FD-1 নিয়ম',
          content: '<p>অনেকে মনে করেন RJSC বা সমাজসেবার সনদ পেলেই বিদেশ থেকে অনুদান আনা যাবে—যা সম্পূর্ণ ভুল ও দণ্ডনীয়। <strong>বৈদেশিক অনুদান (স্বেচ্ছাসেবামূলক কার্যক্রম) রেগুলেশন আইন, ২০১৬</strong> অনুযায়ী:</p><ul><li><strong>FD-1 নিবন্ধন বাধ্যতামূলক:</strong> বিদেশ থেকে যেকোনো অনুদান গ্রহণ করতে হলে প্রধান উপদেষ্টার কার্যালয়ের অধীন <strong>এনজিও বিষয়ক ব্যুরো (NGOAB)</strong> থেকে ফর্ম FD-1-এ ১০ বছরের জন্য নিবন্ধন নিতে হবে।</li><li><strong>প্রকল্পভিত্তিক অনুমোদন (FD-6):</strong> নিবন্ধন পাওয়ার পর প্রতিটি নতুন বিদেশি প্রকল্পের টাকা ব্যাংক থেকে উত্তোলনের আগে <strong>ফর্ম FD-6</strong> দাখিল করে বাজেট ও কর্মপরিকল্পনার অনুমোদন নিতে হয়।</li><li><strong>দেশীয় তহবিল:</strong> কেবল দেশের ভেতর থেকে সদস্য চাঁদা, যাকাত বা দেশীয় CSR অনুদান নিয়ে কাজ করলে NGOAB নিবন্ধন প্রয়োজন হয় না।</li></ul>'
        },
        {
          h2: 'ক্ষুদ্রঋণ (MRA) লাইসেন্স ও এনবিআর কর অব্যাহতি কমপ্লায়েন্স',
          content: '<p>কোনো এনজিও বা সোসাইটি যদি সঞ্চয় ও ক্ষুদ্রঋণ কার্যক্রম পরিচালনা করতে চায়, তবে ২০০৬ সালের আইন অনুযায়ী অবশ্যই <strong>মাইক্রোক্রেডিট রেগুলেটরি অথরিটি (MRA)</strong>-এর লাইসেন্স নিতে হবে। পাশাপাশি প্রতিটি সংস্থাকে <strong>e-TIN</strong> গ্রহণ, প্রতি বছর RJSC-তে বার্ষিক অডিট রিপোর্ট জমা (ধারা ৪) এবং আয়কর আইন ২০২৩ অনুযায়ী এনবিআর-এ বার্ষিক রিটার্ন দাখিল করতে হয়।</p>'
        },
        {
          h2: 'নিবন্ধনের জন্য প্রয়োজনীয় মূল কাগজপত্র',
          content: '<ul><li>RJSC থেকে প্রাপ্ত বৈধ <strong>নাম ছাড়পত্র</strong>।</li><li>সকল প্রতিষ্ঠাতা সদস্য (৭ বা ততোধিক)-এর স্বাক্ষরিত <strong>স্মারকলিপি ও গঠনতন্ত্র</strong>।</li><li>কার্যনির্বাহী কমিটির সকল সদস্যের <strong>জাতীয় পরিচয়পত্র (NID)</strong>, টিআইএন সনদ ও পাসপোর্ট সাইজের ছবি।</li><li>কার্যালয়ের ঠিকানার প্রমাণ (ভাড়ার চুক্তিপত্র বা মালিকানা দলিল ও ইউটিলিটি বিল)।</li><li>গঠনতন্ত্র অনুমোদন ও প্রথম কার্যনির্বাহী কমিটি গঠনের সভার কার্যবিবরণী।</li></ul>'
        }
      ],
      faqs: [
        {
          q: 'RJSC থেকে সোসাইটি নিবন্ধন পেতে মোট কত সময় লাগে?',
          a: 'কাগজপত্র প্রস্তুত ও দাখিলে ১-২ সপ্তাহ সময় লাগলেও স্বরাষ্ট্র মন্ত্রণালয় ও নিরাপত্তা যাচাই প্রক্রিয়া সম্পন্ন হয়ে চূড়ান্ত সনদ পেতে সাধারণত ২ থেকে ৪ মাস সময় লাগে।'
        },
        {
          q: 'বিদেশি নাগরিক কি বাংলাদেশের কোনো এনজিও বা সোসাইটির কমিটিতে থাকতে পারেন?',
          a: 'হ্যাঁ, নিরাপত্তা ছাড়পত্র সাপেক্ষে উপদেষ্টা বা সদস্য হতে পারেন; তবে NGOAB অনুমোদন ও ব্যাংক পরিচালনার সুবিধার্থে কার্যনির্বাহী কমিটিতে সংখ্যাগরিষ্ঠ বাংলাদেশি নাগরিক থাকা বাঞ্ছনীয়।'
        },
        {
          q: 'সোসাইটি এবং সেকশন ২৮ অলাভজনক কোম্পানির মধ্যে মূল পার্থক্য কী?',
          a: 'সেকশন ২৮ কোম্পানি গঠনের আগে বাণিজ্য মন্ত্রণালয়ের লাইসেন্স নিতে হয় এবং এটি কর্পোরেট বোর্ডের মাধ্যমে চলে; অপরদিকে ১৮৬০ সালের সোসাইটি সরাসরি ৭ জন সদস্য নিয়ে RJSC-তে সাধারণ পরিষদের অধীনে নিবন্ধিত হয়।'
        }
      ]
    }
  },

  // 5. Property Mortgage, Loan Foreclosure & Title Deed Redemption (Transfer of Property Act 1882)
  {
    en: {
      slug: 'equitable-mortgage-title-deed-redemption-bangladesh-guide',
      bnSlug: 'jomi-bandhok-mortgage-mukti-ain-1882-bangladesh',
      title: 'Equitable Mortgage & Property Redemption Rights in Bangladesh (1882 Act)',
      metaTitle: 'Property Mortgage & Deed Redemption BD: 1882 Act',
      metaDescription: 'Property mortgage rules under the Transfer of Property Act 1882 in Bangladesh: equitable vs registered mortgage, Section 60 deed redemption & bank refusal.',
      category: 'Land & Property Law',
      readTime: '8 min read',
      publishedDate: TODAY,
      lastModified: TODAY,
      isDraft: false,
      keywords: [
        'equitable mortgage bangladesh transfer of property act',
        'section 60 right of redemption bangladesh',
        'bank refusing to return original land deed',
        'redemption deed registration fee sub registry',
        'property lawyer dhaka bangladesh'
      ],
      heroIntro: 'When borrowing against urban flats or ancestral land in Bangladesh, banks routinely create either an Equitable Mortgage by deposit of title deeds (Section 58(f)) or a Registered Mortgage with Irrevocable Power of Attorney (Section 59). Under Section 60 of the Transfer of Property Act 1882, every mortgagor holds an inviolable statutory Right of Redemption upon clearing principal and lawful interest—meaning a lender cannot permanently forfeit your land or withhold original title deeds after repayment.',
      quickAnswer: {
        heading: 'At a Glance: Property Mortgage & Redemption in Bangladesh',
        text: 'Section 60 of the Transfer of Property Act 1882 guarantees return of original deeds and cancellation of mortgage upon full payment.',
        points: [
          'Governing Laws: Transfer of Property Act 1882 (Sections 58–104), Registration Act 1908 (Section 17) & Artha Rin Adalat Ain 2003',
          'Registered vs. Equitable Mortgage: Deposit of title deeds in notified towns requires a registered Memorandum if creating a formal charge before banks',
          'Right of Redemption (Section 60): "Once a mortgage, always a mortgage"—any "clog on redemption" clause transferring ownership automatically on default is void',
          'Deed Release After Payment: Execute & register a Deed of Redemption (Re-conveyance) at the Sub-Registry and revoke any IGPA'
        ]
      },
      toc: [
        'Types of Property Mortgages Recognized Under Section 58 (1882 Act)',
        'Equitable Mortgage vs. Registered Mortgage + Irrevocable Power of Attorney',
        'Section 60 Right of Redemption & Unlawful "Clogs on Redemption"',
        'How to Reclaim Original Title Deeds & Register a Redemption Deed After Repayment',
        'Challenging Illegal Bank Auction Notices Under the Artha Rin Adalat Ain 2003'
      ],
      sections: [
        {
          h2: 'Types of Property Mortgages Recognized Under Section 58 (1882 Act)',
          content: '<p>Under <strong>Section 58 of the Transfer of Property Act 1882</strong>, property security falls into distinct legal forms with very different enforcement consequences:</p><ul><li><strong>Simple Mortgage (Section 58(b)):</strong> The borrower binds themselves personally to repay and agrees the lender may apply to court for decree and judicial sale of the mortgaged land upon default—possession stays with the owner.</li><li><strong>Mortgage by Conditional Sale (Section 58(c)):</strong> Property is ostensibly sold subject to a condition that the sale becomes void upon repayment (frequently abused in private village lending—note the Amendment requiring the condition to be inside the <em>same</em> document).</li><li><strong>Usufructuary Mortgage (Section 58(d) / Khaikhalashi):</strong> Possession is handed to the lender to recover principal/interest from rent or agricultural yield.</li><li><strong>Mortgage by Deposit of Title Deeds (Section 58(f) / Equitable Mortgage):</strong> Delivery of original title deeds in specified cities (including Dhaka, Chattogram, Khulna) with intent to create security.</li></ul>'
        },
        {
          h2: 'Equitable Mortgage vs. Registered Mortgage + Irrevocable Power of Attorney',
          content: '<p>Commercial banks in Bangladesh rarely rely solely on an unregistered deposit of deeds. Under Section 59 of the 1882 Act and Section 17 of the Registration Act 1908, loans over BDT 100 typically involve two simultaneously registered instruments at the Sub-Registry:</p><ol><li><strong>Registered Mortgage Deed:</strong> Creating a recorded encumbrance searchable by subsequent buyers in Sub-Registry Index-II; and</li><li><strong>Irrevocable General Power of Attorney (IGPA):</strong> Granting the bank statutory authority under <strong>Section 12 of the Artha Rin Adalat Ain 2003</strong> to sell the mortgaged property out of court after default notice without awaiting a full suit decree.</li></ol>'
        },
        {
          h2: 'Section 60 Right of Redemption & Unlawful "Clogs on Redemption"',
          content: '<p>One of the strongest protections for property owners under <strong>Section 60 of the Transfer of Property Act 1882</strong> is the equitable maxim: <em>"Once a mortgage, always a mortgage."</em></p><p>Any private loan agreement or supplemental undertaking stating that if the borrower misses an installment date, the property automatically transfers to the lender permanently—known legally as a <strong>Clog on Redemption</strong>—is <strong>null and void</strong>. Until a competent court passes a final foreclosure decree or concludes a lawful auction under the Artha Rin Adalat Ain 2003, the borrower retains an absolute right to tender principal plus lawful interest and redeem the land.</p>'
        },
        {
          h2: 'How to Reclaim Original Title Deeds & Register a Redemption Deed After Repayment',
          content: '<p>Many borrowers pay off their home loan or business facility yet neglect formal release—discovering years later that they cannot sell or mutate the land cleanly. Follow these mandatory steps:</p><ul><li><strong>Obtain No Objection Certificate (NOC) &amp; Clearance:</strong> Collect a formal bank Loan Closure Certificate confirming zero outstanding liability across all linked facilities.</li><li><strong>Collect Full Chain of Title Deeds:</strong> Retrieve your original Saf Kabala deed, Bia deeds, CS/SA/RS/BS khatian copies, and mutation DCR held in bank custody.</li><li><strong>Register Redemption Deed (Re-conveyance) &amp; Cancel IGPA:</strong> Where the mortgage and IGPA were registered at the Sub-Registry, execute and register a <strong>Deed of Redemption / Release</strong> (plus formal revocation of the IGPA) so the encumbrance is erased from public land records.</li><li><strong>If a Bank Unfairly Withholds Deeds:</strong> Under Section 60, lenders cannot retain title deeds for unrelated unmortgaged third-party loans without express cross-collateral agreement. Serve an advocate legal notice and file a Redemption Suit in Civil Court (or Bangladesh Bank / writ complaint if statutory abuse occurs).</li></ul>'
        },
        {
          h2: 'Challenging Illegal Bank Auction Notices Under the Artha Rin Adalat Ain 2003',
          content: '<p>If a bank publishes a Section 12 auction tender notice despite full/substantial repayment, disputed interest calculations, or failure to serve mandatory 15-day redemption notices, owners can seek immediate legal protection—including objections before the Artha Rin Adalat, civil declarations challenging forged/unconsented mortgages, or High Court Writ Petitions where banks breach mandatory statutory steps.</p>'
        }
      ],
      faqs: [
        {
          q: 'Can a bank keep my land deed after I fully repay my home loan because another business loan is pending?',
          a: 'Only if your original Mortgage Deed or facility sanction letter explicitly included a valid cross-collateralization clause covering that specific loan. Otherwise, withholding your original deeds after full payment violates your Section 60 Right of Redemption.'
        },
        {
          q: 'Is a private loan against an original land deed valid without Sub-Registry registration?',
          a: 'Handing over deeds privately outside notified towns or without proper documentation often sparks fraud disputes; moreover, under Section 59, mortgages (other than valid Section 58(f) equitable deposits in notified towns) require registered instruments attested by two witnesses.'
        },
        {
          q: 'What happens if the bank lost my original Sale Deed while in mortgage custody?',
          a: 'The bank must immediately lodge a police GD, bear expenses to obtain certified duplicate copies from the Sub-Registry, issue a formal Loss Indemnity & Non-Encumbrance Certificate, and remain liable for civil compensation if marketability is impaired.'
        }
      ]
    },
    bn: {
      slug: 'jomi-bandhok-mortgage-mukti-ain-1882-bangladesh',
      enSlug: 'equitable-mortgage-title-deed-redemption-bangladesh-guide',
      title: 'জমি ও ফ্ল্যাট বন্ধক (মর্টগেজ) ও ঋণ শেষে দলিল ফেরত পাওয়ার আইন',
      metaTitle: 'জমি বন্ধক ও ঋণ শেষে দলিল ফেরত পাওয়ার আইন ১৮৮২ (BD)',
      metaDescription: 'সম্পত্তি হস্তান্তর আইন ১৮৮২ অনুযায়ী রেজিস্টার্ড ও ইকুইটেবল মর্টগেজ, ধারা ৬০ অনুযায়ী বন্ধক মুক্তির অধিকার এবং ব্যাংক দলিল আটকে রাখলে আইনি প্রতিকার।',
      category: 'জমি ও সম্পত্তি আইন',
      readTime: '৮ মিনিট',
      publishedDate: TODAY,
      lastModified: TODAY,
      isDraft: false,
      keywords: [
        'জমি বন্ধক বা মর্টগেজ আইন ১৮৮২',
        'ঋণ পরিশোধের পর দলিল ফেরত না দিলে করণীয়',
        'রিডেম্পশন দলিল রেজিস্ট্রি নিয়ম',
        'খাইখালাসি বন্ধক ও সাফ কবলা আইন',
        'ব্যাংক মর্টগেজ মামলা আইনজীবী ঢাকা'
      ],
      heroIntro: 'ব্যাংক ঋণ বা ব্যক্তিগত লেনদেনে জমি ও ফ্ল্যাট জামানত রাখার প্রক্রিয়াই হলো বন্ধক বা মর্টগেজ, যা মূলত সম্পত্তি হস্তান্তর আইন, ১৮৮২ (Transfer of Property Act, 1882)-এর ৫৮ থেকে ১০৪ ধারায় নিয়ন্ত্রিত। ঋণের আসল ও বৈধ সুদ পরিশোধের পরও ব্যাংক যদি দলিল আটকে রাখে কিংবা বেসরকারি ঋণদাতা জমি ফেরত দিতে গড়িমসি করে, তবে আইনের ৬০ ধারা অনুযায়ী মালিকের অলঙ্ঘনীয় ‘বন্ধক মুক্তির অধিকার’ (Right of Redemption) রয়েছে।',
      quickAnswer: {
        heading: '⚡ জমি বন্ধক (Mortgage) ও দলিল ফেরত আইন — মূল সারসংক্ষেপ',
        points: [
          'মূল আইন: সম্পত্তি হস্তান্তর আইন, ১৮৮২ (ধারা ৫৮–৬৭) ও নিবন্ধন আইন, ১৯০৮ (ধারা ১৭)',
          'বন্ধক মুক্তির অধিকার (ধারা ৬০): ঋণ পরিশোধের পর মূল দলিল ফেরত পাওয়া এবং বন্ধক বাতিলের চিরন্তন আইনি অধিকার ("Once a mortgage, always a mortgage")',
          'গোপন মালিকানা শর্ত বাতিল: "সময়মতো টাকা না দিলে জমি চিরতরে পাওনাদারের হয়ে যাবে"—এমন যেকোনো শর্ত (Clog on Redemption) আইনের দৃষ্টিতে বাতিল',
          'মর্টগেজ মুক্তি দলিল (Redemption Deed): ব্যাংক ঋণ শোধ করার পর শুধু NOC নিলেই চলবে না, সাব-রেজিস্ট্রি অফিসে মর্টগেজ মুক্তি দলিল ও পাওয়ার অব অ্যাটর্নি রদ করতে হবে'
        ]
      },
      toc: [
        'সম্পত্তি হস্তান্তর আইনের ৫৮ ধারায় বন্ধকের প্রকারভেদ',
        'ব্যাংক ঋণে রেজিস্টার্ড মর্টগেজ ও অপ্রত্যাহারযোগ্য পাওয়ার অব অ্যাটর্নি',
        'ধারা ৬০: বন্ধক মুক্তির অধিকার ও "ক্লগ অন রিডেম্পশন" নিষিদ্ধ',
        'ঋণ পরিশোধের পর মূল দলিল ফেরত ও রিডেম্পশন দলিল নিবন্ধনের ধাপ',
        'ব্যাংক দলিল আটকে রাখলে বা নিলাম নোটিশ দিলে আইনি প্রতিকার'
      ],
      sections: [
        {
          h2: 'সম্পত্তি হস্তান্তর আইনের ৫৮ ধারায় বন্ধকের প্রকারভেদ',
          content: '<p>সম্পত্তি হস্তান্তর আইন, ১৮৮২-এর <strong>৫৮ ধারা</strong> অনুসারে বাংলাদেশে প্রচলিত প্রধান বন্ধকগুলো হলো:</p><ul><li><strong>সরল বন্ধক (Simple Mortgage - ধারা ৫৮(খ)):</strong> জমির দখল মালিকের কাছেই থাকে, কিন্তু ঋণ খেলাপি হলে পাওনাদার আদালতের মাধ্যমে জমি নিলামে তুলে টাকা আদায়ের অধিকার রাখে।</li><li><strong>শর্তাধীন বিক্রয় বন্ধক (Conditional Sale - ধারা ৫৮(গ)):</strong> ঋণ শোধ হলে বিক্রয় বাতিল হবে এই শর্তে বন্ধক; তবে গ্রামাঞ্চলে প্রায়ই আলাদা অঙ্গীকারনামায় জমি লিখে নেওয়ার অপচেষ্টা চলে—সংশোধিত আইনে শর্তটি অবশ্যই একই দলিলে উল্লেখ থাকতে হয়।</li><li><strong>খাইখালাসি বা ভোগবন্ধক (Usufructuary - ধারা ৫৮(ঘ)):</strong> জমি পাওনাদারের দখলে দেওয়া হয় এবং জমির আয় থেকে ঋণ সমন্বয় করা হয়।</li><li><strong>দলিল জমা দিয়ে ইকুইটেবল মর্টগেজ (ধারা ৫৮(চ)):</strong> ঢাকা, চট্টগ্রাম বা খুলনার মতো নির্ধারিত শহরে মূল মালিকানা দলিল ব্যাংকের কাছে জমা রেখে ঋণ সুরক্ষা তৈরি।</li></ul>'
        },
        {
          h2: 'ব্যাংক ঋণে রেজিস্টার্ড মর্টগেজ ও অপ্রত্যাহারযোগ্য পাওয়ার অব অ্যাটর্নি',
          content: '<p>বাংলাদেশের বাণিজ্যিক ব্যাংকগুলো সাধারণত কেবল দলিল জমা নেওয়ার ওপর নির্ভর না করে সাব-রেজিস্ট্রি অফিসে দুটি নিবন্ধিত দলিল সম্পাদন করে:</p><ol><li><strong>রেজিস্টার্ড মর্টগেজ দলিল (ধারা ৫৯):</strong> যা সাব-রেজিস্ট্রির বালাম বইয়ে দায়বদ্ধতা হিসেবে নথিভুক্ত থাকে; এবং</li><li><strong>অপ্রত্যাহারযোগ্য সাধারণ পাওয়ার অব অ্যাটর্নি (IGPA):</strong> যার মাধ্যমে অর্থঋণ আদালত আইন ২০০৩-এর <strong>১২ ধারা</strong> অনুযায়ী ঋণ খেলাপি হলে আদালত ছাড়াই নিলাম নোটিশ দিয়ে সম্পত্তি বিক্রির ক্ষমতা ব্যাংক হাতে রাখে।</li></ol>'
        },
        {
          h2: 'ধারা ৬০: বন্ধক মুক্তির অধিকার ও "ক্লগ অন রিডেম্পশন" নিষিদ্ধ',
          content: '<p>সম্পত্তি হস্তান্তর আইনের <strong>৬০ ধারা</strong> জমির মালিককে অত্যন্ত শক্তিশালী সুরক্ষা দিয়েছে—আইনের নীতি হলো: <em>"Once a mortgage, always a mortgage."</em></p><p>চুক্তিতে যদি এমন কোনো শর্ত লেখাও থাকে যে নির্দিষ্ট তারিখে ঋণ শোধ না করতে পারলে জমিটি স্বয়ংক্রিয়ভাবে পাওনাদারের স্থায়ী মালিকানায় চলে যাবে (যাকে আইনি ভাষায় <strong>Clog on Redemption</strong> বলে), তবে সেই শর্ত <strong>সম্পূর্ণ অবৈধ ও বাতিল</strong>। আদালতের চূড়ান্ত ডিক্রি বা বৈধ নিলাম সম্পন্ন না হওয়া পর্যন্ত আসল ও বৈধ সুদ পরিশোধ করে জমি ছাড়িয়ে নেওয়ার অধিকার মালিকের থেকে যায়।</p>'
        },
        {
          h2: 'ঋণ পরিশোধের পর মূল দলিল ফেরত ও রিডেম্পশন দলিল নিবন্ধনের ধাপ',
          content: '<p>হোম লোন বা ব্যবসায়িক ঋণ সম্পূর্ণ পরিশোধ করার পর শুধু মৌখিক আশ্বাস বা সাধারণ চিঠিতে সন্তুষ্ট থাকবেন না; জমি সম্পূর্ণ দায়মুক্ত করতে নিচের ৪টি ধাপ সম্পন্ন করুন:</p><ul><li><strong>ক্লিয়ারেন্স সার্টিফিকেট (NOC):</strong> ব্যাংকের কাছ থেকে সুদ-আসল শূন্য হওয়ার চূড়ান্ত Loan Closure Letter সংগ্রহ করুন।</li><li><strong>সকল মূল দলিল যাচাই:</strong> ব্যাংক হেফাজতে জমা দেওয়া মূল সাফ কবলা দলিল, ভায়া দলিল, সিএস/এসএ/আরএস/বিএস খতিয়ান ও ডিসিআর বুঝে নিন।</li><li><strong>মর্টগেজ মুক্তি দলিল (Redemption Deed) রেজিস্ট্রি:</strong> পূর্বে সাব-রেজিস্ট্রি অফিসে মর্টগেজ ও IGPA নিবন্ধিত হয়ে থাকলে ব্যাংকের প্রতিনিধির স্বাক্ষরে একটি <strong>রিডেম্পশন দলিল ও পাওয়ার বাতিল দলিল</strong> রেজিস্ট্রি করে নিন; অন্যথায় ভবিষ্যতে জমি বিক্রি বা নামজারিতে মর্টগেজ দায় দেখাতে থাকবে।</li></ul>'
        },
        {
          h2: 'ব্যাংক দলিল আটকে রাখলে বা নিলাম নোটিশ দিলে আইনি প্রতিকার',
          content: '<p>সম্পূর্ণ ঋণ পরিশোধ করার পরও যদি ব্যাংক কোনো অপ্রাসঙ্গিক বা অন্য ব্যক্তির ঋণের অজুহাতে (বৈধ Cross-Collateral শর্ত ছাড়া) আপনার মূল দলিল ফেরত না দেয়, তবে অভিজ্ঞ আইনজীবীর মাধ্যমে লিগ্যাল নোটিশ পাঠিয়ে <strong>দেওয়ানি আদালতে বন্ধক মুক্তির মামলা (Suit for Redemption)</strong> বা বাংলাদেশ ব্যাংকে অভিযোগ দায়ের করা যায়। অনুরূপভাবে ত্রুটিপূর্ণ ১২ ধারার নিলাম নোটিশ চ্যালেঞ্জ করতে অর্থঋণ আদালত ও হাইকোর্ট বিভাগে রিট প্রতিকার রয়েছে।</p>'
        }
      ],
      faqs: [
        {
          q: 'আমার নিজের ঋণ শোধ হলেও অন্য কোনো ঋণের জন্য কি ব্যাংক আমার জমির দলিল আটকে রাখতে পারে?',
          a: 'কেবল মূল মর্টগেজ দলিল বা স্যাংশন লেটারে স্পষ্টভাবে উক্ত অন্য ঋণের বিপরীতেও ক্রস-সিকিউরিটি (Cross-Collateral) শর্ত উল্লেখ থাকলেই কেবল তা সম্ভব; অন্যথায় ৬০ ধারা অনুযায়ী ব্যাংক দলিল আটকে রাখতে পারে না।'
        },
        {
          q: 'ব্যাংক হেফাজত থেকে মূল দলিল হারিয়ে গেলে গ্রাহক কী করবেন?',
          a: 'ব্যাংককে নিজ খরচে থানায় জিডি করে সাব-রেজিস্ট্রি অফিস থেকে সার্টিফায়েড নকল সরবরাহ করতে হবে এবং ভবিষ্যতের আইনি দায়মুক্তি নিশ্চিত করে লিখিত Loss Indemnity সনদ দিতে হবে।'
        },
        {
          q: 'রিডেম্পশন দলিল রেজিস্ট্রি না করলে কি জমি বিক্রি করা যায় না?',
          a: 'সাব-রেজিস্ট্রিতে পূর্বে মর্টগেজ দলিল নিবন্ধিত হয়ে থাকলে রিডেম্পশন দলিল রেজিস্ট্রি না করা পর্যন্ত তল্লাশি রিপোর্টে জমিটি ‘বন্ধকবদ্ধ’ দেখায়, ফলে ক্রেতা ও নতুন ব্যাংক ঋণে আইনি জটিলতা সৃষ্টি হয়।'
        }
      ]
    }
  }
];

function checkPost(lang, p) {
  if (!p.metaTitle || p.metaTitle.length > 58) {
    throw new Error(`${lang}/${p.slug} metaTitle len=${(p.metaTitle || '').length} > 58: ${p.metaTitle}`);
  }
  if (!p.metaDescription || p.metaDescription.length < 110 || p.metaDescription.length > 165) {
    throw new Error(`${lang}/${p.slug} metaDescription len=${(p.metaDescription || '').length}: ${p.metaDescription}`);
  }
  if (!Array.isArray(p.sections) || p.sections.length < 5) {
    throw new Error(`${lang}/${p.slug} insufficient sections`);
  }
  if (!Array.isArray(p.toc) || p.toc.length !== p.sections.length) {
    throw new Error(`${lang}/${p.slug} toc length mismatch`);
  }
  if (!Array.isArray(p.faqs) || p.faqs.length < 3) {
    throw new Error(`${lang}/${p.slug} insufficient faqs`);
  }
}

for (const { en, bn } of pairs) {
  checkPost('en', en);
  checkPost('bn', bn);
  fs.writeFileSync(path.join(EN_DIR, `${en.slug}.json`), JSON.stringify(en, null, 2) + '\n');
  fs.writeFileSync(path.join(BN_DIR, `${bn.slug}.json`), JSON.stringify(bn, null, 2) + '\n');
  console.log(`Wrote pair: /blog/${en.slug} <-> /bn/blog/${bn.slug}`);
}

// SEO Metadata / CTR refreshes from GSC Weekly Scorecard (striking-distance / zero-click queries)
const ctrUpdates = [
  {
    file: path.join(EN_DIR, 'rs-khatian-online-check-bangladesh-2026.json'),
    patch: {
      metaDescription: 'Check RS Khatian online in Bangladesh at eporcha.gov.bd & dlrms.land.gov.bd using dag/khatian number. Download certified RS porcha & verify land ownership.',
      lastModified: TODAY,
    },
  },
  {
    file: path.join(BN_DIR, 'police-verification-clearance-certificate-bangladesh-bn.json'),
    patch: {
      metaTitle: 'পুলিশ ভেরিফিকেশন ও Police Verification সনদ ২০২৬',
      lastModified: TODAY,
    },
  },
  {
    file: path.join(EN_DIR, 'divorce-procedure-bangladesh.json'),
    patch: {
      metaTitle: 'Divorce Procedure Bangladesh: Wife Khul & Talaq',
      metaDescription: 'Follow divorce procedure in Bangladesh by wife or husband: Section 7 MFLO talaq notice, delegated talaq-e-tawfeez, judicial khul & Family Court steps.',
      lastModified: TODAY,
    },
  },
];

for (const { file, patch } of ctrUpdates) {
  const j = JSON.parse(fs.readFileSync(file, 'utf8'));
  Object.assign(j, patch);
  if (j.metaTitle && j.metaTitle.length > 58) {
    throw new Error(`CTR update metaTitle too long (${j.metaTitle.length}): ${j.metaTitle}`);
  }
  fs.writeFileSync(file, JSON.stringify(j, null, 2) + '\n');
  console.log(`Refreshed CTR metadata: ${path.relative(ROOT, file)} (titleLen=${j.metaTitle.length}, descLen=${j.metaDescription.length})`);
}
