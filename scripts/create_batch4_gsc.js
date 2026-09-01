const fs = require('fs');
const path = require('path');

const bnDir = path.join(__dirname, '..', 'src', 'content', 'posts', 'bn');
const enDir = path.join(__dirname, '..', 'src', 'content', 'posts', 'en');

const batch4 = [
  // Topic 8: Land Possession Recovery Suit (BN & EN)
  {
    dir: bnDir,
    file: 'jomi-dakhol-punoruddhar-ain-2026.json',
    data: {
      slug: 'jomi-dakhol-punoruddhar-ain-2026',
      category: 'ভূমি আইন',
      title: 'জমি জবরদখল হলে দখল পুনরুদ্ধারের দেওয়ানি মামলা ও প্রতিকার ২০২৬: সুনির্দিষ্ট প্রতিকার আইনের ৮ ও ৯ ধারা',
      metaTitle: 'জমি দখল পুনরুদ্ধার মামলা ও আইন ২০২৬ | সুনির্দিষ্ট প্রতিকার আইন ৮ ও ৯ ধারা',
      metaDescription: 'জমি বা বাড়ি বেদখল হলে কীভাবে জমি উদ্ধার করবেন? সুনির্দিষ্ট প্রতিকার আইনের ৮ ও ৯ ধারা, ১৪৫ ধারা ফৌজদারি মামলা ও ২০২৬ সালের দেওয়ানি প্রতিকার জানুন।',
      keywords: ['দখল পুনরুদ্ধার মামলা', 'দখল হওয়া বাড়ির প্রতিকার', 'specific relief act section 8 and 9 bd', 'জমি জবরদখল প্রতিকার', 'ভূমি অপরাধ প্রতিরোধ আইন'],
      publishedDate: '2026-08-25',
      lastModified: '2026-08-26',
      readTime: '১৩ মিনিট',
      heroIntro: 'জমি বা ফ্ল্যাট জবরদখল হয়ে গেলে কিংবা কোনো ভাড়াটিয়া চুক্তি শেষ হওয়ার পরও দখল ছাড়তে অস্বীকৃতি জানালে দেওয়ানি আদালতে <strong>সুনির্দিষ্ট প্রতিকার আইন ১৮৭৭ (Specific Relief Act)-এর ৮ ও ৯ ধারায়</strong> এবং ফৌজদারি কার্যবিধির ১৪৫ ধারায় আইনি প্রতিকার পাওয়া যায়। সুপ্রিম কোর্টের সিনিয়র আইনজীবী <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold;text-decoration:underline;">অ্যাডভোকেট মো. শাহ আলম</a>-এর এই নির্দেশিকায় জমি বেদখল হলে দ্রুত দখল পুনরুদ্ধারের ৩টি কার্যকর আইনি উপায় তুলে ধরা হলো। চেম্বার কল: <a href="tel:01712655546" style="color:var(--gold);font-weight:bold;">০১৭১২৬৫৫৫৪৬</a>।',
      quickAnswer: {
        heading: '⚡ জমি বেদখল হলে প্রধান আইনি প্রতিকারসমূহ',
        points: [
          '৯ ধারার মামলা (দ্রুত দখল ফেরত): বেদখল হওয়ার ৬ মাসের মধ্যে স্বত্ব প্রমাণ ছাড়াই পূর্ববর্তী দখলের ভিত্তিতে মামলা করা যায়।',
          '৮ ও ৪২ ধারার মামলা (স্বত্বসহ দখল পুনরুদ্ধার): মূল মালিকানা স্বত্ব ও খতিয়ান প্রমাণের মাধ্যমে ১২ বছরের মধ্যে মামলা দায়ের করা যায়।',
          '১৪৫ ধারা (ফৌজদারি শান্তি রক্ষা): জমিতে শান্তিভঙ্গের আশঙ্কা থাকলে নির্বাহী ম্যাজিস্ট্রেট আদালতে তাৎক্ষণিক দখল বজায় রাখার আদেশ পাওয়া যায়।'
        ]
      },
      toc: [
        '১. সুনির্দিষ্ট প্রতিকার আইনের ৮ ও ৯ ধারার মধ্যে পার্থক্য',
        '২. ৯ ধারার অধীনে ৬ মাসের মধ্যে দ্রুত দখল উদ্ধারের শর্ত',
        '৩. ৮ ও ৪২ ধারার স্বত্ব ঘোষণা ও অ্যাডভ্যালোরেম কোর্ট ফি হিসাব',
        '৪. ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩ অনুযায়ী ফৌজদারি সাজা',
        '৫. দেওয়ানি আদালতের রায় পাওয়ার পর পুলিশ ও নাজির দিয়ে দখল বুঝে নেওয়ার উপায়'
      ],
      sections: [
        {
          heading: '১. সুনির্দিষ্ট প্রতিকার আইনের ৮ ও ৯ ধারার মধ্যে পার্থক্য',
          content: '<p>৯ ধারায় বাদীকে জমির মালিকানা বা দলিল প্রমাণ করতে হয় না; শুধু প্রমাণ করতে হয় যে তাকে বেআইনিভাবে উচ্ছেদ করা হয়েছে। অন্যদিকে ৮ ধারায় দলিল ও খতিয়ানের মাধ্যমে চূড়ান্ত স্বত্ব (Title) প্রমাণ করতে হয়।</p>'
        },
        {
          heading: '২. ৯ ধারার অধীনে ৬ মাসের মধ্যে দ্রুত দখল উদ্ধারের শর্ত',
          content: '<p>৯ ধারায় মামলা করতে হলে বেদখল হওয়ার তারিখ থেকে অনধিক <strong>৬ (ছয়) মাসের মধ্যে</strong> মামলা দায়ের করতে হবে। সরকারের বিরুদ্ধে এই ধারায় মামলা চলে না।</p>'
        },
        {
          heading: '৩. ৮ ও ৪২ ধারার স্বত্ব ঘোষণা ও অ্যাডভ্যালোরেম কোর্ট ফি হিসাব',
          content: '<p>জমি বেদখলের ১২ বছরের মধ্যে তামাদি আইন অনুযায়ী ৮ ধারায় মামলা করা যায়। এতে জমি মূল্যের অনুপাতে সর্বোচ্চ ৫০,০০০ টাকা অ্যাডভ্যালোরেম কোর্ট ফি প্রদান করতে হয়।</p>'
        },
        {
          heading: '৪. ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩ অনুযায়ী ফৌজদারি সাজা',
          content: '<p>নতুন ভূমি আইনে জবরদখলকারীদের বিরুদ্ধে সর্বোচ্চ ৭ বছর পর্যন্ত কারাদণ্ড এবং জরিমানার কঠোর বিধান রাখা হয়েছে যা সরাসরি ফৌজদারি আদালতে বিচারযোগ্য।</p>'
        },
        {
          heading: '৫. দেওয়ানি আদালতের রায় পাওয়ার পর পুলিশ ও নাজির দিয়ে দখল বুঝে নেওয়ার উপায়',
          content: '<p>দেওয়ানি মামলায় ডিক্রি পাওয়ার পর জারি মামলা (Execution Case) দায়ের করে আদালতের নাজির ও পুলিশ ফোর্সের সহায়তায় জমিতে লাল নিশান টাঙিয়ে বাদীকে প্রকৃত দখল বুঝিয়ে দেওয়া হয়। জমি বিরোধে অভিজ্ঞ <strong>অ্যাডভোকেট মো. শাহ আলম</strong>-এর সাথে যোগাযোগ করুন: <strong>০১৭১২৬৫৫৫৪৬</strong>।</p>'
        }
      ],
      faq: [
        { question: 'দখল মামলায় কতদিন সময় লাগে?', answer: '৯ ধারার মামলা সাধারণত ১ থেকে ২ বছরের মধ্যে এবং ৮ ধারার পূর্ণাঙ্গ স্বত্ব মোকদ্দমা ২ থেকে ৩ বছরের মধ্যে নিষ্পত্তি হয়।' }
      ]
    }
  },
  {
    dir: enDir,
    file: 'land-possession-recovery-suit-bangladesh-2026.json',
    data: {
      slug: 'land-possession-recovery-suit-bangladesh-2026',
      category: 'Property Law',
      title: 'Illegal Land Dispossession & Recovery Suit in Bangladesh 2026: Section 8 & 9 Specific Relief Act',
      metaTitle: 'Land Possession Recovery Suit Bangladesh 2026 | Section 8 & 9 Specific Relief Act',
      metaDescription: 'Legal guide on reclaiming dispossessed land in Bangladesh under Section 8 and 9 of the Specific Relief Act 1877, Section 145 CrPC, and Land Crime Prevention Act 2023.',
      keywords: ['land possession recovery bangladesh', 'specific relief act section 8 and 9 bd', 'illegal land occupation remedy dhaka', 'land lawyer supreme court'],
      publishedDate: '2026-08-25',
      lastModified: '2026-08-26',
      readTime: '12 minutes',
      heroIntro: 'When real property is unlawfully grabbed or encroached upon, the dispossessed owner can seek civil remedies under <strong>Sections 8 & 9 of the Specific Relief Act 1877</strong> along with penal action under the Land Crime Prevention and Redress Act 2023. Authored by <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold;text-decoration:underline;">Advocate Md. Shah Alam</a>, Supreme Court Advocate. Chamber contact: <a href="tel:01712655546" style="color:var(--gold);font-weight:bold;">01712655546</a>.',
      quickAnswer: {
        heading: '⚡ Core Legal Remedies for Land Grab',
        points: [
          'Section 9 Suit (Summary Possession): Must be filed within 6 months of dispossession without proving ownership title.',
          'Section 8 Suit (Title & Possession): Filed within 12 years based on title deeds, khatians, and ad-valorem court fees.',
          'Section 145 CrPC: Prevents breach of peace and secures status quo before Executive Magistrate.'
        ]
      },
      toc: [
        '1. Section 8 vs Section 9 of the Specific Relief Act 1877',
        '2. Strict 6-Month Limitation under Section 9',
        '3. Declaration of Title and Recovery under Section 8 & 42',
        '4. Criminal Penalties under Land Crime Prevention Act 2023',
        '5. Executing Decrees with Court Nazir and Police Force'
      ],
      sections: [
        {
          heading: '1. Section 8 vs Section 9 of the Specific Relief Act 1877',
          content: '<p>Section 9 protects bare possession against unlawful eviction irrespective of title, while Section 8 determines substantive proprietary rights and ownership.</p>'
        },
        {
          heading: '2. Strict 6-Month Limitation under Section 9',
          content: '<p>Any person dispossessed without consent otherwise than in due course of law must institute suit within 6 months. No appeal lies against a decree under Section 9.</p>'
        },
        {
          heading: '3. Declaration of Title and Recovery under Section 8 & 42',
          content: '<p>Under Article 142 and 144 of the Limitation Act 1908, a comprehensive title suit can be instituted within 12 years subject to ad-valorem court fees.</p>'
        },
        {
          heading: '4. Criminal Penalties under Land Crime Prevention Act 2023',
          content: '<p>Encroachers and illegal grabbers face rigorous imprisonment up to 7 years and substantial monetary fines under the latest 2023 enactments.</p>'
        },
        {
          heading: '5. Executing Decrees with Court Nazir and Police Force',
          content: '<p>For enforcement of possession decrees through civil execution proceedings, consult Supreme Court Advocate <strong>Md. Shah Alam</strong> at <strong>01712655546</strong>.</p>'
        }
      ],
      faq: [
        { question: 'What is the court fee for Section 9 suit?', answer: 'Half the regular ad-valorem court fee of a standard title suit.' }
      ]
    }
  },

  // Topic 13: High Court Anticipatory Bail Cost (BN & EN)
  {
    dir: bnDir,
    file: 'high-court-anticipatory-bail-cost-procedure-2026.json',
    data: {
      slug: 'high-court-anticipatory-bail-cost-procedure-2026',
      category: 'ফৌজদারি আইন',
      title: 'হাইকোর্টে আগাম জামিন (Anticipatory Bail) নেওয়ার নিয়ম ও মোট খরচ ২০২৬: ধারা ৪৯৮ সিআরপিসি',
      metaTitle: 'হাইকোর্টে আগাম জামিন নেওয়ার নিয়ম ও খরচ ২০২৬ | ৪৯৮ ধারা CrPC',
      metaDescription: 'হাইকোর্ট থেকে আগাম জামিন নিতে কত টাকা লাগে এবং কি কি কাগজপত্র প্রয়োজন? ফৌজদারি কার্যবিধির ৪৯৮ ধারায় গ্রেপ্তার এড়াতে আগাম জামিনের পূর্ণাঙ্গ আইনি গাইড ২০২৬।',
      keywords: ['হাইকোর্ট থেকে আগাম জামিন নিতে কত টাকা লাগে', 'ফৌজদারি মামলায় জামিন নিতে কত টাকা লাগে', 'anticipatory bail high court cost bangladesh', 'আগাম জামিন নেওয়ার নিয়ম', 'section 498 crpc bail'],
      publishedDate: '2026-08-25',
      lastModified: '2026-08-26',
      readTime: '১২ মিনিট',
      heroIntro: 'মিথ্যা ফৌজদারি মামলা, রাজনৈতিক হয়রানি বা ব্যবসায়িক প্রতিহিংসামূলক মামলায় পুলিশ কর্তৃক গ্রেফতারের বাস্তব আশঙ্কা থাকলে <strong>ফৌজদারি কার্যবিধি ১৮৯৮-এর ৪৯৮ ধারা অনুযায়ী সরাসরি বাংলাদেশ সুপ্রিম কোর্টের হাইকোর্ট বিভাগে আবেদন করে “আগাম জামিন” (Anticipatory Bail)</strong> লাভ করা যায়। সুপ্রিম কোর্টের অভিজ্ঞ ক্রিমিনাল ও জামিন আইনজীবী <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold;text-decoration:underline;">অ্যাডভোকেট মো. শাহ আলম</a>-এর এই কমপ্লিট গাইডে আগাম জামিনের শর্তাবলী ও ২০২৬ সালের বাস্তব খরচ বিশ্লেষণ করা হলো। সরাসরি হটলাইন: <a href="tel:01712655546" style="color:var(--gold);font-weight:bold;">০১৭১২৬৫৫৫৪৬</a>।',
      quickAnswer: {
        heading: '⚡ হাইকোর্টে আগাম জামিন সংক্ষেপে',
        points: [
          'মূল নীতি: গ্রেপ্তার হওয়ার আগেই আদালতে সশরীরে উপস্থিত হয়ে অন্তর্বর্তীকালীন জামিন চাওয়া।',
          'প্রয়োজনীয় নথি: এজাহার (FIR) বা সিআর মামলার সার্টিফাইড কপি, জিডি কপি, ওকালতনামা ও হলফনামা।',
          'মেয়াদ: সাধারণত ৪ থেকে ৮ সপ্তাহের জন্য আগাম জামিন মঞ্জুর করা হয়, এরপর নিম্ন আদালতে আত্মসমর্পণ করে স্থায়ী জামিন নিতে হয়।'
        ]
      },
      toc: [
        '১. আগাম জামিন (Anticipatory Bail) কি এবং কোন কোন মামলায় পাওয়া যায়',
        '২. হাইকোর্টে আগাম জামিনের সুনির্দিষ্ট শর্তাবলী ও আসামির উপস্থিতি',
        '৩. ২০২৬ সালে হাইকোর্টে আগাম জামিন নিতে মোট কত টাকা খরচ হয় (Cost Structure)',
        '৪. আগাম জামিন পাওয়ার পর নিম্ন আদালতে নিয়মিত জামিনের নিয়ম',
        '৫. সুপ্রিম কোর্ট জামিন আইনজীবীর চেম্বার পরামর্শ'
      ],
      sections: [
        {
          heading: '১. আগাম জামিন (Anticipatory Bail) কি এবং কোন কোন মামলায় পাওয়া যায়',
          content: '<p>আগাম জামিন হলো এমন একটি আইনি সুবিধা যা কোনো ব্যক্তিকে অজামিনযোগ্য ধারায় পুলিশি গ্রেপ্তারের হাত থেকে আগাম সুরক্ষা প্রদান করে।</p>'
        },
        {
          heading: '২. হাইকোর্টে আগাম জামিনের সুনির্দিষ্ট শর্তাবলী ও আসামির উপস্থিতি',
          content: '<p>আদালতের নজির অনুযায়ী আগাম জামিন শুনানির সময় আসামিকে হাইকোর্টের সংশ্লিষ্ট বেঞ্চে <strong>সশরীরে উপস্থিত (Surrender in Court)</strong> থাকতে হয়।</p>'
        },
        {
          heading: '৩. ২০২৬ সালে হাইকোর্টে আগাম জামিন নিতে মোট কত টাকা খরচ হয় (Cost Structure)',
          content: '<p>হাইকোর্টে আগাম জামিনের খরচের মধ্যে রয়েছে কোর্ট ফি, ওকালতনামা, হলফনামা স্ট্যাম্প, মোশন মোশন ড্রাফটিং এবং সিনিয়র অ্যাডভোকেট ও অ্যাডভোকেট অন রেকর্ড ফি। মামলার জটিলতাভেদে মোট খরচ সাধারণত ২০,০০০ টাকা থেকে ৫০,০০০ টাকার মধ্যে হয়ে থাকে।</p>'
        },
        {
          heading: '৪. আগাম জামিন পাওয়ার পর নিম্ন আদালতে নিয়মিত জামিনের নিয়ম',
          content: '<p>হাইকোর্টের আদেশ অনুযায়ী নির্দিষ্ট মেয়াদের (৪-৮ সপ্তাহ) মধ্যে বিচারিক সেশন কোর্ট বা ম্যাজিস্ট্রেট আদালতে আত্মসমর্পণ করে নিয়মিত জামিননামা (Bail Bond) দাখিল করতে হয়।</p>'
        },
        {
          heading: '৫. সুপ্রিম কোর্ট জামিন আইনজীবীর চেম্বার পরামর্শ',
          content: '<p>জরুরি আগাম জামিন ও সুপ্রিম কোর্ট আইনি সহায়তার জন্য সরাসরি <strong>অ্যাডভোকেট মো. শাহ আলম</strong>-এর সাথে যোগাযোগ করুন: <strong>০১৭১২৬৫৫৫৪৬</strong>।</p>'
        }
      ],
      faq: [
        { question: 'আগাম জামিন কি বাতিল হতে পারে?', answer: 'আদালতের কোনো শর্ত ভঙ্গ করলে রাষ্ট্রপক্ষ জামিন বাতিলের আবেদন করতে পারে।' }
      ]
    }
  },
  {
    dir: enDir,
    file: 'high-court-anticipatory-bail-cost-procedure-2026.json',
    data: {
      slug: 'high-court-anticipatory-bail-cost-procedure-2026',
      category: 'Criminal Law',
      title: 'Anticipatory Bail in High Court Division Bangladesh 2026: Procedure, Grounds & Cost under Section 498 CrPC',
      metaTitle: 'Anticipatory Bail High Court Bangladesh 2026 | Section 498 CrPC Cost',
      metaDescription: 'Complete guide on obtaining Anticipatory Bail from the High Court Division of Bangladesh under Section 498 CrPC. Fee breakdown, surrender rules, and protection against police arrest.',
      keywords: ['anticipatory bail high court cost bangladesh', 'section 498 crpc bail dhaka', 'how to get anticipatory bail in bangladesh', 'bail lawyer supreme court'],
      publishedDate: '2026-08-25',
      lastModified: '2026-08-26',
      readTime: '11 minutes',
      heroIntro: 'Under <strong>Section 498 of the Code of Criminal Procedure 1898 (CrPC)</strong>, the High Court Division possesses extraordinary discretionary jurisdiction to grant Anticipatory Bail (Agam Jamin) to individuals reasonably apprehending arrest in fabricated or non-bailable offences. Authored by <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold;text-decoration:underline;">Advocate Md. Shah Alam</a>, Supreme Court Advocate. Call our Uttara chamber at <a href="tel:01712655546" style="color:var(--gold);font-weight:bold;">01712655546</a>.',
      quickAnswer: {
        heading: '⚡ Key Elements of Anticipatory Bail',
        points: [
          'Mandatory Personal Surrender: The applicant must be physically present before the High Court bench during the motion hearing.',
          'Limited Duration: Usually granted for a limited tenure of 4 to 8 weeks with a direction to surrender before the trial Sessions Court.',
          'Essential Grounds: Demonstrating political victimisation, mala fide intentions, commercial disputes disguised as criminal FIRs.'
        ]
      },
      toc: [
        '1. Statutory Basis under Section 498 CrPC',
        '2. Judicial Precedents & Surrender Requirement',
        '3. Comprehensive Breakdown of High Court Bail Costs (2026)',
        '4. Post-Bail Surrender in Trial Courts & Regular Bail Confirmation',
        '5. Consultation with Supreme Court Criminal Advocate'
      ],
      sections: [
        {
          heading: '1. Statutory Basis under Section 498 CrPC',
          content: '<p>Section 498 vests concurrent and unfettered powers upon the High Court Division to direct the release of any accused person on bail before actual custodial apprehension.</p>'
        },
        {
          heading: '2. Judicial Precedents & Surrender Requirement',
          content: '<p>As established by Appellate Division precedents, anticipatory bail is an exceptional relief granted to protect personal liberty from malicious prosecution.</p>'
        },
        {
          heading: '3. Comprehensive Breakdown of High Court Bail Costs (2026)',
          content: '<p>Includes stamp duties, Vakalatnama, motion petition drafting, Advocate-on-Record filing, and senior counsel representation, typically ranging between BDT 20,000 to BDT 50,000.</p>'
        },
        {
          heading: '4. Post-Bail Surrender in Trial Courts & Regular Bail Confirmation',
          content: '<p>Prior to expiration of the interim bail order, the accused must furnish local solvent bailors and obtain confirmation from the competent Sessions Judge.</p>'
        },
        {
          heading: '5. Consultation with Supreme Court Criminal Advocate',
          content: '<p>For urgent anticipatory bail representation, contact Supreme Court Lawyer <strong>Advocate Md. Shah Alam</strong> at <strong>01712655546</strong>.</p>'
        }
      ],
      faq: [
        { question: 'Can anticipatory bail be obtained without an FIR?', answer: 'Yes, if there is documented apprehension of arrest based on GD or imminent police raids.' }
      ]
    }
  },

  // Topic 16: Paternal Property Muslim Inheritance Shares (BN & EN)
  {
    dir: bnDir,
    file: 'baba-mayer-sampatti-bon-bhai-bhag-faraiz-hisab-2026.json',
    data: {
      slug: 'baba-mayer-sampatti-bon-bhai-bhag-faraiz-hisab-2026',
      category: 'পারিবারিক আইন',
      title: 'বাবার সম্পত্তি বন্টন আইন বাংলাদেশ ২০২৬: ভাই-বোনের সুনির্দিষ্ট অংশ, ফারায়েজ ক্যালকুলেটর ও বাটোয়ারা নিয়ম',
      metaTitle: 'বাবার সম্পত্তি বন্টন আইন বাংলাদেশ ২০২৬ | ভাই-বোনের অংশ ও ফারায়েজ',
      metaDescription: 'পিতার মৃত্যুর পর সম্পত্তিতে ছেলে ও মেয়ের ফারায়েজ হিসাব ২০২৬। ২:১ অনুপাতে ভাই-বোনের অংশ, বিধবা স্ত্রীর হিস্যা এবং বাটোয়ারা দলিলের সম্পূর্ণ আইনি নিয়ম।',
      keywords: ['বাবার সম্পত্তি বন্টন আইন বাংলাদেশ 2026', 'বাবার সম্পত্তি বন্টন আইন বাংলাদেশ ২০২৪', 'মুসলিম ফারায়েজ ক্যালকুলেটর', 'সম্পত্তিতে ভাই বোনের ভাগ', 'উত্তরাধিকার আইন বাংলাদেশ'],
      publishedDate: '2026-08-25',
      lastModified: '2026-08-26',
      readTime: '১৪ মিনিট',
      heroIntro: 'পিতার মৃত্যুর পর রেখে যাওয়া স্থাবর ও অস্থাবর সম্পত্তিতে মুসলিম ফারায়েজ আইন ও <strong>মুসলিম পারিবারিক আইন অধ্যাদেশ ১৯৬১ (MFLO)-এর ৪ ধারা অনুযায়ী</strong> ওয়ারিশদের মধ্যে নির্দিষ্ট অনুপাতে সম্পত্তি ভাগ হয়। পবিত্র কুরআনের বিধান অনুযায়ী ছেলে মেয়ের দ্বিগুণ অংশ (২:১ অনুপাতে) লাভ করে। সুপ্রিম কোর্টের সিনিয়র আইনজীবী <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold;text-decoration:underline;">অ্যাডভোকেট মো. শাহ আলম</a>-এর এই নির্দেশিকায় বাবার সম্পত্তি বন্টনের গাণিতিক হিসাব ও আপস বাটোয়ারা দলিলের নিয়ম তুলে ধরা হলো। চেম্বার কল: <a href="tel:01712655546" style="color:var(--gold);font-weight:bold;">০১৭১২৬৫৫৫৪৬</a>।',
      quickAnswer: {
        heading: '⚡ বাবার সম্পত্তি বন্টনের মৌলিক ফারায়েজ নিয়ম',
        points: [
          'বিধবা স্ত্রী (মা): সন্তান থাকলে স্ত্রী পাবেন মোট সম্পত্তির ৮ ভাগের ১ ভাগ (১/৮ অংশ)। সন্তান না থাকলে পাবেন ৪ ভাগের ১ ভাগ (১/৪ অংশ)।',
          'ছেলে ও মেয়ে (অবশিষ্টভোগী): স্ত্রীর ১/৮ অংশ দেওয়ার পর অবশিষ্ট ৭/৮ অংশ ছেলে ও মেয়েদের মধ্যে ২:১ অনুপাতে বণ্টিত হবে।',
          'আপস বাটোয়ারা দলিল: ওয়ারিশ সনদ নিয়ে সাব-রেজিস্ট্রারের মাধ্যমে রেজিস্ট্রি বাটোয়ারা দলিল করে প্রত্যেকে আলাদা নামে নামজারি করিয়ে নেওয়া বাধ্যতামূলক।'
        ]
      },
      toc: [
        '১. মুসলিম ফারায়েজ আইনের মূল ভিত্তি ও ওয়ারিশ নির্ধারণ',
        '২. গাণিতিক উদাহরণ: ১০০ শতক বা ১ কোটি টাকার সম্পত্তির নিখুঁত ভাগ',
        '৩. শুধু ১ জন বা একাধিক মেয়ে থাকলে সম্পত্তি বন্টনের বিশেষ নিয়ম',
        '৪. সৎ ভাই-বোন ও এতিম নাতি-নাতনির অধিকার (ধারা ৪ MFLO)',
        '৫. ভাইদের জমি বুঝিয়ে না দিলে বোনের দেওয়ানি বাটোয়ারা মামলা পদ্ধতি'
      ],
      sections: [
        {
          heading: '১. মুসলিম ফারায়েজ আইনের মূল ভিত্তি ও ওয়ারিশ নির্ধারণ',
          content: '<p>পিতার মৃত্যুর পর প্রথমে দাফন-কাফনের খরচ, ঋণ পরিশোধ এবং বৈধ উইল (সর্বোচ্চ ১/৩ অংশ) নিষ্পত্তির পর অবশিষ্ট নিট সম্পত্তি বৈধ ওয়ারিশদের মধ্যে বণ্টন করতে হয়।</p>'
        },
        {
          heading: '২. গাণিতিক উদাহরণ: ১০০ শতক বা ১ কোটি টাকার সম্পত্তির নিখুঁত ভাগ',
          content: '<p>ধরা যাক, পিতা ১০০ শতক জমি রেখে মারা গেছেন এবং ওয়ারিশ হিসেবে স্ত্রী, ২ ছেলে ও ২ মেয়ে রেখে গেছেন:</p><ul><li>স্ত্রী (১/৮): ১২.৫০ শতক</li><li>অবশিষ্ট সম্পত্তি: ৮৭.৫০ শতক</li><li>মোট শেয়ার: (২ ছেলে × ২) + (২ মেয়ে × ১) = ৬ শেয়ার</li><li>প্রতি মেয়ে পাবেন: ১৪.৫৮ শতক করে</li><li>প্রতি ছেলে পাবেন: ২৯.১৭ শতক করে (মেয়ের দ্বিগুণ)</li></ul>'
        },
        {
          heading: '৩. শুধু ১ জন বা একাধিক মেয়ে থাকলে সম্পত্তি বন্টনের বিশেষ নিয়ম',
          content: '<p>পিতার কোনো পুত্রসন্তান না থাকলে শুধু ১ মেয়ে থাকলে তিনি পাবেন মোট সম্পত্তির ১/২ অংশ এবং একাধিক মেয়ে থাকলে যৌথভাবে পাবেন ২/৩ অংশ। অবশিষ্ট অংশ মৃতের ভাই-ভাতিজা বা আসাবারা পাবেন (রদ্দ নীতির প্রয়োগ ছাড়া)।</p>'
        },
        {
          heading: '৪. সৎ ভাই-বোন ও এতিম নাতি-নাতনির অধিকার (ধারা ৪ MFLO)',
          content: '<p>মুসলিম পারিবারিক আইন অধ্যাদেশ ১৯৬১-এর ৪ ধারা অনুযায়ী পিতা জীবিত থাকা অবস্থায় কোনো সন্তান মারা গেলেও তার এতিম নাতি-নাতনিরা তাদের মৃত পিতা/মাতার প্রাপ্য অংশ পুরোপুরি লাভ করবে।</p>'
        },
        {
          heading: '৫. ভাইদের জমি বুঝিয়ে না দিলে বোনের দেওয়ানি বাটোয়ারা মামলা পদ্ধতি',
          content: '<p>ভাইয়েরা পৈতৃক ভিটা বা জমি বুঝিয়ে দিতে অস্বীকৃতি জানালে সহকারী জজ বা যুগ্ম জেলা জজ আদালতে <strong>দেওয়ানি বাটোয়ারা মামলা (Partition Suit)</strong> দায়ের করে নিজের অংশ সাহাম অনুযায়ী বুঝে নেওয়া যায়। পরামর্শের জন্য সরাসরি কল করুন: <strong>০১৭১২৬৫৫৫৪৬</strong>।</p>'
        }
      ],
      faq: [
        { question: 'বাটোয়ারা দলিলের সরকারি রেজিস্ট্রেশন ফি কত?', answer: 'সম্পত্তির মূল্যভেদে মাত্র ৫০০ থেকে সর্বোচ্চ ১,০০০ টাকা স্ট্যাম্প শুল্কে আপস বাটোয়ারা দলিল রেজিস্ট্রি করা যায়।' }
      ]
    }
  },
  {
    dir: enDir,
    file: 'muslim-inheritance-calculator-shares-bangladesh.json',
    data: {
      slug: 'muslim-inheritance-calculator-shares-bangladesh',
      category: 'Family Law',
      title: 'Muslim Inheritance Law Bangladesh 2026: Father Property Distribution & Faraiz Calculator',
      metaTitle: 'Muslim Inheritance Law Bangladesh 2026 | Father Property Distribution',
      metaDescription: 'Accurate legal calculation of father property distribution among sons, daughters, and widow under Islamic Faraiz law and Section 4 of MFLO 1961 in Bangladesh.',
      keywords: ['muslim inheritance law bangladesh', 'father property shares sons daughters', 'faraiz calculator bangladesh', 'partition suit lawyer dhaka'],
      publishedDate: '2026-08-25',
      lastModified: '2026-08-26',
      readTime: '13 minutes',
      heroIntro: 'In Bangladesh, estate succession following a father demise is governed by classical Sunni Hanafi Islamic jurisprudence harmonised with <strong>Section 4 of the Muslim Family Laws Ordinance 1961 (MFLO)</strong>. Authored by <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold;text-decoration:underline;">Advocate Md. Shah Alam</a>, Supreme Court Advocate. Call our Uttara chamber at <a href="tel:01712655546" style="color:var(--gold);font-weight:bold;">01712655546</a>.',
      quickAnswer: {
        heading: '⚡ Core Inheritance Principles in Bangladesh',
        points: [
          'Widow (Mother) Share: 1/8th of net estate if children exist; 1/4th if no children exist.',
          'Residuary Shares (Sons & Daughters): The remaining 7/8th is distributed among sons and daughters in a 2:1 statutory ratio.',
          'Orphaned Grandchildren: Protected under Section 4 MFLO 1961, inheriting the full share of their deceased parent.'
        ]
      },
      toc: [
        '1. Legal Framework: Quranic Sharers and Residuaries',
        '2. Mathematical Case Study: 100 Decimals of Land Division',
        '3. Distribution when Only Daughters Exist',
        '4. Rights of Orphaned Grandchildren (Section 4 MFLO)',
        '5. Filing a Civil Partition Suit against Non-Cooperative Heirs'
      ],
      sections: [
        {
          heading: '1. Legal Framework: Quranic Sharers and Residuaries',
          content: '<p>Net estate is determined after settling funeral expenses, lawful debts, and valid testamentary bequests (Wasiyyat) up to one-third of the estate.</p>'
        },
        {
          heading: '2. Mathematical Case Study: 100 Decimals of Land Division',
          content: '<p>For an estate of 100 decimals with widow, 2 sons, and 2 daughters: Widow receives 12.50 decimals; each daughter receives 14.58 decimals; each son receives 29.17 decimals.</p>'
        },
        {
          heading: '3. Distribution when Only Daughters Exist',
          content: '<p>A single daughter takes a fixed 1/2 share; multiple daughters jointly inherit 2/3 shares, with the residue descending to agnatic collaterals under classical Hanafi rules.</p>'
        },
        {
          heading: '4. Rights of Orphaned Grandchildren (Section 4 MFLO)',
          content: '<p>Predeceased children issue step into the shoes of their deceased parent to inherit their full per stirpes share under statutory law.</p>'
        },
        {
          heading: '5. Filing a Civil Partition Suit against Non-Cooperative Heirs',
          content: '<p>For instituting civil partition suits or drafting registered amicable partition deeds, consult <strong>Advocate Md. Shah Alam</strong> at <strong>01712655546</strong>.</p>'
        }
      ],
      faq: [
        { question: 'What is the court fee for a partition suit in Bangladesh?', answer: 'A nominal fixed court fee of BDT 300 is applicable for preliminary partition decrees.' }
      ]
    }
  }
];

console.log('Writing batch 4...');
batch4.forEach(b => {
  fs.writeFileSync(path.join(b.dir, b.file), JSON.stringify(b.data, null, 2), 'utf8');
  console.log(`✅ Created ${b.file}`);
});
