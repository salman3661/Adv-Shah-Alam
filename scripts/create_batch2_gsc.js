const fs = require('fs');
const path = require('path');

const bnDir = path.join(__dirname, '..', 'src', 'content', 'posts', 'bn');
const enDir = path.join(__dirname, '..', 'src', 'content', 'posts', 'en');

const batch2 = [
  // 4. Minor Property Return & Guardianship
  {
    bnFile: 'nabalok-sampatti-ferot-obhibhaboktwo-ain.json',
    enFile: 'minor-property-custody-return-guardianship-bangladesh.json',
    bnData: {
      slug: 'nabalok-sampatti-ferot-obhibhaboktwo-ain',
      category: 'পারিবারিক আইন',
      title: 'নাবালকের সম্পত্তি ফেরত ও অভিভাবকত্ব আইন: বিক্রি করা জমি পুনরুদ্ধার ও জালিয়াতি প্রতিকার ২০২৬',
      metaTitle: 'নাবালকের সম্পত্তি ফেরত ও অভিভাবকত্ব আইন | জমি পুনরুদ্ধার ২০২৬',
      metaDescription: 'নাবালকের সম্পত্তি বেআইনি বিক্রি হলে কীভাবে ফেরত পাবেন? অভিভাবক ও প্রতিপাল্য আইন ১৮৯০ অনুযায়ী আদালতের অনুমতি ছাড়া জমি বিক্রির প্রতিকার জানুন।',
      keywords: [
        'নাবালকের সম্পত্তি ফেরত',
        'নাবালকের জমি বিক্রির নিয়ম',
        'অভিভাবকত্ব ফিরে পাওয়ার মামলা',
        'guardians and wards act bangladesh',
        'নাবালকের সম্পত্তি বাতিল'
      ],
      publishedDate: '2026-08-23',
      lastModified: '2026-08-26',
      readTime: '১১ মিনিট',
      heroIntro: 'পিতা বা বৈধ অভিভাবকের মৃত্যুর পর নাবালক সন্তানের জমি বা সম্পত্তি অনেক সময় অসৎ আত্মীয়-স্বজন বা অভিভাবক আদালতের অনুমতি ছাড়াই অবৈধভাবে বিক্রি করে ফেলে। <strong>অভিভাবক ও প্রতিপাল্য আইন ১৮৯০ (Guardians and Wards Act 1890)</strong> অনুযায়ী বিজ্ঞ জেলা জজ আদালতের পূর্বানুমোদন ছাড়া নাবালকের সম্পত্তি বিক্রি করা সম্পূর্ণ বেআইনি ও বাতিলযোগ্য (Voidable)। সুপ্রিম কোর্টের সিনিয়র আইনজীবী <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold;text-decoration:underline;">অ্যাডভোকেট মো. শাহ আলম</a>-এর এই নির্দেশিকায় নাবালকের জমি ফেরত পাওয়ার আইনি উপায় তুলে ধরা হলো। হটলাইন: <a href="tel:01712655546" style="color:var(--gold);font-weight:bold;">০১৭১২৬৫৫৫৪৬</a>।',
      quickAnswer: {
        heading: '⚡ নাবালকের সম্পত্তি সুরক্ষার মূল আইনি নীতি',
        points: [
          'আদালতের অনুমোদন বাধ্যতামূলক: জেলা জজের অনুমতি ছাড়া কোনো প্রাকৃতিক অভিভাবক (এমনকি মা-ও) নাবালকের স্থাবর সম্পত্তি বিক্রি করতে পারেন না।',
          'দলিল বাতিলের মামলা: সাবালকত্ব অর্জনের (১৮ বছর পূর্ণ হওয়ার) ৩ বছরের মধ্যে সুনির্দিষ্ট প্রতিকার আইনের ৩৯ ধারায় দলিল বাতিলের মামলা দায়ের করতে হয়।',
          'দখল পুনরুদ্ধার: সম্পত্তি বেদখল হয়ে থাকলে দেওয়ানি আদালতে স্বত্ব ঘোষণা ও দখল পুনরুদ্ধারের যৌথ মামলা করা যায়।'
        ]
      },
      toc: [
        '১. অভিভাবক ও প্রতিপাল্য আইন ১৮৯০ অনুযায়ী নাবালকের সম্পত্তির অধিকার',
        '২. আদালতের অনুমতি ছাড়া নাবালকের জমি বিক্রির আইনগত ফলাফল',
        '৩. সাবালক হওয়ার পর জমি ফেরত পাওয়ার সময়সীমা (Limitation Act Art 44)',
        '৪. দলিল বাতিল ও স্বত্ব ঘোষণার দেওয়ানি মামলা পদ্ধতি',
        '৫. মা বা অভিভাবক কি নাবালকের সম্পত্তি বন্ধক বা দান করতে পারেন?',
        '৬. প্রতারণা ও জাল দলিল সংশোধনে সুপ্রিম কোর্ট আইনজীবীর ভূমিকা'
      ],
      sections: [
        {
          heading: '১. অভিভাবক ও প্রতিপাল্য আইন ১৮৯০ অনুযায়ী নাবালকের সম্পত্তির অধিকার',
          content: '<p>১৮৯০ সালের গার্ডিয়ানস অ্যান্ড ওয়ার্ডস অ্যাক্ট অনুযায়ী নাবালক সন্তানের আর্থিক স্বার্থ রক্ষা করা আদালতের অন্যতম প্রধান দায়িত্ব। আদালত ছাড়া অন্য কেউ নাবালকের সম্পত্তির চূড়ান্ত অভিভাবক হতে পারেন না যদি না তিনি উইলে বা আদালতের আদেশে নিযুক্ত হন।</p>'
        },
        {
          heading: '২. আদালতের অনুমতি ছাড়া নাবালকের জমি বিক্রির আইনগত ফলাফল',
          content: '<p>আইনের ২৯ ধারা অনুযায়ী কোনো সম্পত্তি বিক্রির পূর্বে সংশ্লিষ্ট জেলা জজ আদালতে মিস কেস (Permission Case) দায়ের করে প্রমাণ করতে হয় যে বিক্রির টাকা নাবালকের শিক্ষা, চিকিৎসা বা মৌলিক প্রয়োজনে ব্যয় হবে। অনুমতিহীন যেকোনো দলিল আইনের দৃষ্টিতে বাতিলযোগ্য।</p>'
        },
        {
          heading: '৩. সাবালক হওয়ার পর জমি ফেরত পাওয়ার সময়সীমা (Limitation Act Art 44)',
          content: '<p>তামাদি আইন ১৯০৮-এর ৪৪ অনুচ্ছেদ অনুযায়ী নাবালক ব্যক্তি সাবালক (১৮ বছর পূর্ণ) হওয়ার পর থেকে <strong>৩ (তিন) বছরের মধ্যে</strong> অবৈধ বিক্রয় দলিল বাতিলের মামলা দায়ের করতে হবে। ১৮ বছর থেকে ২১ বছর বয়সের মধ্যে এই প্রতিকার চাওয়া সবচেয়ে নিরাপদ।</p>'
        },
        {
          heading: '৪. দলিল বাতিল ও স্বত্ব ঘোষণার দেওয়ানি মামলা পদ্ধতি',
          content: '<p>সুনির্দিষ্ট প্রতিকার আইন ১৮৭৭-এর ৩৯ ধারা অনুযায়ী সাব-রেজিস্ট্রারের রেজিস্ট্রি দলিল বাতিল এবং ৪২ ও ৮ ধারা অনুযায়ী জমিতে মালিকানা স্বত্ব ঘোষণা ও দখল পুনরুদ্ধারের দেওয়ানি মামলা সহকারী জজ বা সিনিয়র সহকারী জজ আদালতে দায়ের করতে হয়।</p>'
        },
        {
          heading: '৫. মা বা অভিভাবক কি নাবালকের সম্পত্তি বন্ধক বা দান করতে পারেন?',
          content: '<p>মুসলিম আইনে পিতা জীবিত না থাকলে মা সন্তানের স্বাভাবিক অভিভাবক (Natural Guardian) হিসেবে সম্পত্তি বিক্রয় বা বন্ধক দেওয়ার নিরঙ্কুশ ক্ষমতা পান না। আদালতের অনুমোদনহীন দান বা হস্তান্তর আইনগতভাবে টেকে না।</p>'
        },
        {
          heading: '৬. প্রতারণা ও জাল দলিল সংশোধনে সুপ্রিম কোর্ট আইনজীবীর ভূমিকা',
          content: '<p>নাবালকের জমি জালিয়াতি রোধে অভিজ্ঞ সুপ্রিম কোর্ট দেওয়ানি আইনজীবী <strong>অ্যাডভোকেট মো. শাহ আলম</strong>-এর আইনি পরামর্শ নিতে কল করুন <strong>০১৭১২৬৫৫৫৪৬</strong> নাম্বারে।</p>'
        }
      ],
      faq: [
        {
          question: 'নাবালকের বয়স কত বছর পর্যন্ত গণ্য হয়?',
          answer: 'সাধারণ ক্ষেত্রে ১৮ বছর। তবে আদালত কর্তৃক অভিভাবক নিযুক্ত হলে নাবালকের বয়স ২১ বছর পর্যন্ত গণ্য হয়।'
        }
      ]
    },
    enData: {
      slug: 'minor-property-custody-return-guardianship-bangladesh',
      category: 'Family Law',
      title: 'Minor Property Recovery and Guardianship Law Bangladesh 2026: Voiding Illegal Land Deeds',
      metaTitle: 'Minor Property Rights & Guardianship Law Bangladesh 2026',
      metaDescription: 'Legal guide on reclaiming property sold without court permission during childhood in Bangladesh under Guardians and Wards Act 1890 and Specific Relief Act.',
      keywords: [
        'minor property recovery bangladesh',
        'guardians and wards act 1890 bd',
        'cancel deed executed during minority',
        'child property protection lawyer dhaka'
      ],
      publishedDate: '2026-08-23',
      lastModified: '2026-08-26',
      readTime: '11 minutes',
      heroIntro: 'Under the <strong>Guardians and Wards Act 1890</strong>, transferring or disposing of real estate belonging to a minor child without prior leave from the competent District Judge is voidable at the instance of the minor. Authored by <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold;text-decoration:underline;">Advocate Md. Shah Alam</a>, Supreme Court Advocate. Call our Uttara chamber at <a href="tel:01712655546" style="color:var(--gold);font-weight:bold;">01712655546</a>.',
      quickAnswer: {
        heading: '⚡ Core Principles: Minor Property Law in Bangladesh',
        points: [
          'Mandatory Court Sanction: Natural guardians (including mothers) cannot alienate minor immovable property without permission under Section 29.',
          'Limitation to Challenge: A suit to set aside unauthorized transfer must be filed within 3 years of attaining majority (Age 18-21).',
          'Legal Remedy: Lawsuit for cancellation of instruments under Section 39 of the Specific Relief Act 1877.'
        ]
      },
      toc: [
        '1. Legal Safeguards under Guardians and Wards Act 1890',
        '2. Legal Effect of Unauthorized Sale of Minor Property',
        '3. 3-Year Limitation Period upon Attaining Majority',
        '4. Civil Lawsuit for Cancellation of Deed & Possession Recovery',
        '5. Powers of Mother as De Facto Guardian under Muslim Law',
        '6. Legal Representation with Supreme Court Advocate'
      ],
      sections: [
        {
          heading: '1. Legal Safeguards under Guardians and Wards Act 1890',
          content: '<p>The District Judge exercises parens patriae jurisdiction over minor property. Any alienation made without demonstrating evident necessity for the minor welfare is invalid in the eyes of law.</p>'
        },
        {
          heading: '2. Legal Effect of Unauthorized Sale of Minor Property',
          content: '<p>Under Section 30 of the Act, any disposal of immovable property without prior judicial permission is voidable at the option of the minor child upon attaining majority.</p>'
        },
        {
          heading: '3. 3-Year Limitation Period upon Attaining Majority',
          content: '<p>Under Article 44 of the Limitation Act 1908, the aggrieved party must institute a suit within 3 years from the date of attaining age 18 to set aside the transfer deed.</p>'
        },
        {
          heading: '4. Civil Lawsuit for Cancellation of Deed & Possession Recovery',
          content: '<p>The claimant can institute a civil suit under Section 39 and Section 42 of the Specific Relief Act 1877 before the Assistant Judge Court to cancel the deed and restore title.</p>'
        },
        {
          heading: '5. Powers of Mother as De Facto Guardian under Muslim Law',
          content: '<p>Under classical Islamic jurisprudence and Bangladesh case law, a mother is a de facto guardian of property and has no legal authority to sell immovable assets without judicial sanction.</p>'
        },
        {
          heading: '6. Legal Representation with Supreme Court Advocate',
          content: '<p>For robust representation in civil title and partition disputes, consult <strong>Advocate Md. Shah Alam</strong> at <strong>01712655546</strong>.</p>'
        }
      ],
      faq: [
        {
          question: 'What is the age of majority in Bangladesh?',
          answer: 'Generally 18 years, or 21 years if a guardian is appointed under the Guardians and Wards Act.'
        }
      ]
    }
  },

  // 5. Injunction & Stay Order CPC Order 39
  {
    bnFile: 'sthagitadesh-injunction-order-39-cpc-bangladesh.json',
    enFile: 'temporary-injunction-stay-order-cpc-bangladesh.json',
    bnData: {
      slug: 'sthagitadesh-injunction-order-39-cpc-bangladesh',
      category: 'দেওয়ানি আইন',
      title: 'জমিতে আদালতের স্থগিতাদেশ ও নিষেধাজ্ঞা (Stay Order / Injunction) পাওয়ার নিয়ম ও খরচ ২০২৬',
      metaTitle: 'জমিতে আদালতের নিষেধাজ্ঞা ও স্থগিতাদেশ পাওয়ার নিয়ম ২০২৬ | CPC Order 39',
      metaDescription: 'জমি বা সম্পত্তিতে অবৈধ দখল ও নির্মাণ ঠেকাতে আদালতে নিষেধাজ্ঞা (Temporary Injunction) বা স্থগিতাদেশ পাওয়ার দেওয়ানি নিয়ম, ৩টি প্রধান শর্ত ও খরচ জানুন।',
      keywords: [
        'জমিতে নিষেধাজ্ঞা দেওয়ার নিয়ম',
        'আদালতের স্থগিতাদেশ',
        'injunction stay order bangladesh',
        'cpc order 39 rules 1 and 2',
        'জমির স্ট্যাটাস কো আদেশ'
      ],
      publishedDate: '2026-08-24',
      lastModified: '2026-08-26',
      readTime: '১২ মিনিট',
      heroIntro: 'জমি নিয়ে বিরোধ বা জবরদখলের আশঙ্কা দেখা দিলে প্রতিপক্ষকে জমিতে প্রবেশ, গাছপালা কাটা বা নির্মাণ কাজ বন্ধ করার জন্য দেওয়ানি আদালতে <strong>অস্থায়ী নিষেধাজ্ঞা (Temporary Injunction) বা স্থিতাবস্থা (Status Quo)</strong> আদেশ প্রার্থনা করা হয়। <strong>দেওয়ানি কার্যবিধি ১৯০৮-এর ৩৯ আদেশের ১ ও ২ বিধি (Order 39 Rules 1 & 2 CPC)</strong> অনুযায়ী আদালত এই অন্তর্বর্তীকালীন আদেশ জারি করেন। সুপ্রিম কোর্টের অভিজ্ঞ দেওয়ানি আইনজীবী <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold;text-decoration:underline;">অ্যাডভোকেট মো. শাহ আলম</a>-এর বিস্তারিত আইনি পরামর্শ পেতে কল করুন <a href="tel:01712655546" style="color:var(--gold);font-weight:bold;">০১৭১২৬৫৫৫৪৬</a> নাম্বারে।',
      quickAnswer: {
        heading: '⚡ আদালতে নিষেধাজ্ঞা পাওয়ার ৩টি প্রধান আইনি শর্ত',
        points: [
          'প্রাথমিক সত্যতা (Prima Facie Case): জমিতে বাদীর বৈধ দলিল, খতিয়ান বা স্বত্ব-স্বার্থের প্রাথমিক প্রমাণ থাকতে হবে।',
          'অপূরণীয় ক্ষতি (Irreparable Loss): নিষেধাজ্ঞা না দিলে বাদীর এমন ক্ষতি হবে যা ভবিষ্যতে অর্থ দিয়ে পূরণ করা অসম্ভব।',
          'সুবিধার ভারসাম্য (Balance of Convenience): নিষেধাজ্ঞা মঞ্জুর না করলে বাদীর ক্ষতি প্রতিপক্ষের ক্ষতির তুলনায় অনেক বেশি হবে।'
        ]
      },
      toc: [
        '১. জমিতে নিষেধাজ্ঞা (Injunction) ও স্থগিতাদেশের অর্থ কি',
        '২. দেওয়ানি কার্যবিধির ৩৯ আদেশ অনুযায়ী নিষেধাজ্ঞার ৩টি মৌলিক নীতি',
        '৩. জরুরি পরিস্থিতিতে তাৎক্ষণিক একতরফা নিষেধাজ্ঞা (Ad-interim Injunction)',
        '৪. নিষেধাজ্ঞা অমান্য করলে শাস্তি ও জমি রক্ষা (Order 39 Rule 2A CPC)',
        '৫. আদালতে নিষেধাজ্ঞা আবেদন করতে প্রয়োজনীয় কাগজপত্র ও খরচ',
        '৬. নিষেধাজ্ঞা খারিজ হলে উচ্চ আদালতে আপিল বা রিভিশন করার নিয়ম',
        '৭. চেম্বার পরামর্শ ও সুপ্রিম কোর্ট দেওয়ানি প্র্যাকটিস'
      ],
      sections: [
        {
          heading: '১. জমিতে নিষেধাজ্ঞা (Injunction) ও স্থগিতাদেশের অর্থ কি',
          content: '<p>নিষেধাজ্ঞা হলো আদালতের একটি বিশেষ আদেশ যা কোনো পক্ষকে কোনো বেআইনি কাজ করা থেকে বিরত রাখে বা পূর্বের অবস্থা বজায় রাখতে বাধ্য করে। মূল মোকদ্দমা নিষ্পত্তি না হওয়া পর্যন্ত সম্পত্তির সুরক্ষায় অস্থায়ী নিষেধাজ্ঞা জারি করা হয়।</p>'
        },
        {
          heading: '২. দেওয়ানি কার্যবিধির ৩৯ আদেশ অনুযায়ী নিষেধাজ্ঞার ৩টি মৌলিক নীতি',
          content: '<p>আদালত ৩টি বিষয় বিশ্লেষণ করে আদেশ দেন: (১) বাদীর স্বত্বের পক্ষে প্রাইমাফেসি কেস, (২) অপূরণীয় ক্ষতির আশঙ্কা, এবং (৩) উভয় পক্ষের সুবিধার ভারসাম্য।'
        },
        {
          heading: '৩. জরুরি পরিস্থিতিতে তাৎক্ষণিক একতরফা নিষেধাজ্ঞা (Ad-interim Injunction)',
          content: '<p>প্রতিপক্ষ যদি দ্রুত জমিতে পাকা ভবন নির্মাণ শুরু করে, তবে নোটিশ জারি করার আগেই আদালত তাৎক্ষণিক অন্তর্বর্তীকালীন নিষেধাজ্ঞা (Ad-interim Injunction) জারি করতে পারেন।'
        },
        {
          heading: '৪. নিষেধাজ্ঞা অমান্য করলে শাস্তি ও জমি রক্ষা (Order 39 Rule 2A CPC)',
          content: '<p>আদালতের নিষেধাজ্ঞা অমান্য করলে ৩৯ আদেশের ২(ক) বিধি অনুযায়ী দোষী ব্যক্তিকে সর্বোচ্চ ৬ মাস পর্যন্ত দেওয়ানি কারাগারে আটক এবং তার সম্পত্তি ক্রোক করার আদেশ দেওয়া যায়।'
        },
        {
          heading: '৫. আদালতে নিষেধাজ্ঞা আবেদন করতে প্রয়োজনীয় কাগজপত্র ও খরচ',
          content: '<p>খতিয়ান, বায়া দলিল, খাজনা রসিদ ও বিরোধের ছবিসহ আইনজীবীর মাধ্যমে আবেদন দাখিল করতে হয়। কোর্ট ফি এবং আইনজীবী ফি সাধারণত ১০,০০০ - ৩০,০০০ টাকার মধ্যে সম্পন্ন হয়।'
        },
        {
          heading: '৬. নিষেধাজ্ঞা খারিজ হলে উচ্চ আদালতে আপিল বা রিভিশন করার নিয়ম',
          content: '<p>নিম্ন আদালতে নিষেধাজ্ঞা নামঞ্জুর হলে জেলা জজ আদালতে মিস আপিল (Misc Appeal) বা হাইকোর্টে সিভিল রিভিশন (Civil Revision under Section 115 CPC) দায়ের করা যায়।'
        },
        {
          heading: '৭. চেম্বার পরামর্শ ও সুপ্রিম কোর্ট দেওয়ানি প্র্যাকটিস',
          content: '<p>জমির তাৎক্ষণিক আইনি সুরক্ষা ও স্টে অর্ডারের জন্য সুপ্রিম কোর্টের দেওয়ানি বিশেষজ্ঞ <strong>অ্যাডভোকেট মো. শাহ আলম</strong>-এর সাথে যোগাযোগ করুন: <strong>০১৭১২৬৫৫৫৪৬</strong>।</p>'
        }
      ],
      faq: [
        {
          question: 'নিষেধাজ্ঞার মেয়াদ কতদিন থাকে?',
          answer: 'আদালত যতদিন নির্দিষ্ট করে দেন অথবা মামলার চূড়ান্ত নিষ্পত্তি না হওয়া পর্যন্ত নিষেধাজ্ঞা বহাল থাকে।'
        }
      ]
    },
    enData: {
      slug: 'temporary-injunction-stay-order-cpc-bangladesh',
      category: 'Civil Law',
      title: 'Temporary Injunction & Stay Order on Property in Bangladesh 2026: Order 39 CPC Rules & Cost',
      metaTitle: 'Temporary Injunction & Stay Order Bangladesh 2026 | Order 39 CPC',
      metaDescription: 'Complete legal guide on obtaining a Temporary Injunction, Status Quo, or Stay Order on disputed land in Bangladesh under Order 39 Rules 1 & 2 of the Code of Civil Procedure.',
      keywords: [
        'injunction stay order bangladesh',
        'cpc order 39 temporary injunction bangladesh',
        'status quo on land dispute dhaka',
        'civil stay order lawyer bangladesh'
      ],
      publishedDate: '2026-08-24',
      lastModified: '2026-08-26',
      readTime: '12 minutes',
      heroIntro: 'In property and land litigation, securing a <strong>Temporary Injunction or Status Quo order under Order 39 Rules 1 & 2 of the Code of Civil Procedure 1908 (CPC)</strong> is vital to restrain unauthorized construction, dispossession, or alienation pending suit adjudication. Authored by <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold;text-decoration:underline;">Advocate Md. Shah Alam</a>, Supreme Court Advocate. Call our Uttara chamber at <a href="tel:01712655546" style="color:var(--gold);font-weight:bold;">01712655546</a>.',
      quickAnswer: {
        heading: '⚡ 3 Golden Principles for Granting Temporary Injunction',
        points: [
          'Prima Facie Case: Strong initial legal title and documentary evidence supporting the plaintiff rights.',
          'Irreparable Loss: Proof that refusal of injunction will cause harm that monetary damages cannot remedy.',
          'Balance of Convenience: Greater comparative hardship on the plaintiff if relief is denied than on the defendant if granted.'
        ]
      },
      toc: [
        '1. Legal Definition: Injunction & Status Quo under Civil Law',
        '2. The Three Cardinal Tests for Injunction (Order 39 CPC)',
        '3. Urgent Ex-Parte Ad-Interim Injunctions',
        '4. Penal Consequences for Disobeying Injunction (Civil Imprisonment)',
        '5. Court Fee Structure and Document Checklist',
        '6. Appellate Remedies: Misc Appeal & Civil Revision under Section 115 CPC',
        '7. Supreme Court Civil Consultation'
      ],
      sections: [
        {
          heading: '1. Legal Definition: Injunction & Status Quo under Civil Law',
          content: '<p>An injunction is a preventive equitable relief preserving the subject-matter in dispute intact until rights are finally determined on merit.</p>'
        },
        {
          heading: '2. The Three Cardinal Tests for Injunction (Order 39 CPC)',
          content: '<p>The Court exercises judicial discretion by evaluating: (1) Prima facie arguable case, (2) Irreparable injury, and (3) Balance of convenience.</p>'
        },
        {
          heading: '3. Urgent Ex-Parte Ad-Interim Injunctions',
          content: '<p>When immediate unauthorized demolition or dispossession is imminent, courts grant ex-parte ad-interim injunctions pending show-cause notice hearing.</p>'
        },
        {
          heading: '4. Penal Consequences for Disobeying Injunction (Civil Imprisonment)',
          content: '<p>Under Order 39 Rule 2A CPC, deliberate violation of an injunction order is punishable with civil imprisonment up to 6 months and property attachment.</p>'
        },
        {
          heading: '5. Court Fee Structure and Document Checklist',
          content: '<p>Requires land registration deeds, khatians, municipal tax receipts, Dakhilas, and verified affidavit under Order 19 CPC.</p>'
        },
        {
          heading: '6. Appellate Remedies: Misc Appeal & Civil Revision under Section 115 CPC',
          content: '<p>Orders refusing or granting injunction are appealable before the District Judge under Order 43 Rule 1(r) CPC, with further revisional jurisdiction in the High Court Division under Section 115 CPC.</p>'
        },
        {
          heading: '7. Supreme Court Civil Consultation',
          content: '<p>For urgent civil injunction applications and High Court stays, contact <strong>Advocate Md. Shah Alam</strong> at <strong>01712655546</strong>.</p>'
        }
      ],
      faq: [
        {
          question: 'How quickly can an emergency stay order be obtained?',
          answer: 'In urgent situations, an ad-interim injunction can be argued and obtained within 24 to 48 hours of filing.'
        }
      ]
    }
  }
];

console.log('Writing batch 2 of high-demand articles...');
batch2.forEach(art => {
  fs.writeFileSync(path.join(bnDir, art.bnFile), JSON.stringify(art.bnData, null, 2), 'utf8');
  fs.writeFileSync(path.join(enDir, art.enFile), JSON.stringify(art.enData, null, 2), 'utf8');
  console.log(`✅ Created ${art.bnFile} and ${art.enFile}`);
});
