const fs = require('fs');
const path = require('path');

const bnDir = path.join(__dirname, '..', 'src', 'content', 'posts', 'bn');
const enDir = path.join(__dirname, '..', 'src', 'content', 'posts', 'en');

const batch3 = [
  // 6. Police Verification Clearance Certificate BN
  {
    dir: bnDir,
    file: 'police-verification-clearance-certificate-bangladesh-bn.json',
    data: {
      slug: 'police-verification-clearance-certificate-bangladesh-bn',
      category: 'ফৌজদারি আইন',
      title: 'পুলিশ ক্লিয়ারেন্স সার্টিফিকেট পাওয়ার সঠিক নিয়ম ও অনলাইন আবেদন ২০২৬: পাসপোর্ট ও ভিসা ভেরিফিকেশন',
      metaTitle: 'পুলিশ ক্লিয়ারেন্স সার্টিফিকেট পাওয়ার নিয়ম ২০২৬ | অনলাইন আবেদন ও ফি',
      metaDescription: 'বিদেশে গমণ, ভিসা বা চাকরির জন্য পুলিশ ক্লিয়ারেন্স সার্টিফিকেট পাওয়ার অনলাইন নিয়ম ২০২৬। সরকারি ফি ৫০০ টাকা চালান, প্রয়োজনীয় কাগজপত্র ও দ্রুত ভেরিফিকেশনের উপায়।',
      keywords: [
        'police verification certificate bangladesh',
        'পুলিশ ক্লিয়ারেন্স পাওয়ার নিয়ম',
        'পুলিশ ক্লিয়ারেন্স কত টাকা লাগে',
        'pcc online application bangladesh',
        'পাসপোর্ট পুলিশ ভেরিফিকেশন'
      ],
      publishedDate: '2026-08-25',
      lastModified: '2026-08-26',
      readTime: '১০ মিনিট',
      heroIntro: 'বিদেশ ভ্রমণ, উচ্চশিক্ষা, ওয়ার্ক পারমিট বা বিদেশি ভিসার জন্য বাংলাদেশ পুলিশের <strong>অনলাইন পুলিশ ক্লিয়ারেন্স সার্টিফিকেট (Police Clearance Certificate - PCC)</strong> একটি বাধ্যতামূলক নথি। আবেদনকারীর বিরুদ্ধে কোনো ফৌজদারি মামলা বা অপরাধের রেকর্ড আছে কি না, তা যাচাই করে এই সনদ দেওয়া হয়। সুপ্রিম কোর্টের সিনিয়র আইনজীবী <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold;text-decoration:underline;">অ্যাডভোকেট মো. শাহ আলম</a>-এর এই কমপ্লিট গাইডে পুলিশ ক্লিয়ারেন্সের নিয়ম ও মিথ্যা মামলার কারণে ভেরিফিকেশন আটকে গেলে আইনি সমাধানের উপায় তুলে ধরা হলো। চেম্বার হটলাইন: <a href="tel:01712655546" style="color:var(--gold);font-weight:bold;">০১৭১২৬৫৫৫৪৬</a>।',
      quickAnswer: {
        heading: '⚡ পুলিশ ক্লিয়ারেন্স সার্টিফিকেট সংক্ষেপে',
        points: [
          'সরকারি ফি: সোনালী ব্যাংকের মাধ্যমে ৫০০/- (পাঁচশত) টাকা ট্রেজারি চালান (কোড: 1-2201-0001-2681)।',
          'প্রয়োজনীয় কাগজ: পাসপোর্ট সাইজ ছবি, মূল পাসপোর্টের সত্যায়িত কপি (কমপক্ষে ৩ মাস মেয়াদ) এবং জাতীয় পরিচয়পত্র/চেয়ারম্যান সনদ।',
          'ডেলিভারি সময়: অনলাইন আবেদনের পর স্থানীয় থানা ও ডিএসবি (DSB) তদন্ত শেষে ৭ থেকে ১০ কর্মদিবসের মধ্যে সার্টিফিকেট ইস্যু হয়।'
        ]
      },
      toc: [
        '১. পুলিশ ক্লিয়ারেন্স সার্টিফিকেট কি এবং কাদের জন্য প্রয়োজন',
        '২. প্রয়োজনীয় কাগজপত্র ও সরকারি চালানের নিয়ম',
        '৩. অনলাইন আবেদন করার ধারাবাহিক ধাপ (PCC Portal Step-by-Step)',
        '৪. ফৌজদারি মামলা বা জিডি থাকলে পুলিশ ক্লিয়ারেন্স পাওয়ার উপায়',
        '৫. মিথ্যা মামলায় ভেরিফিকেশন আটকে গেলে সুপ্রিম কোর্টের আইনি সহায়তা'
      ],
      sections: [
        {
          heading: '১. পুলিশ ক্লিয়ারেন্স সার্টিফিকেট কি এবং কাদের জন্য প্রয়োজন',
          content: '<p>পুলিশ ক্লিয়ারেন্স সার্টিফিকেট হলো বাংলাদেশ পুলিশ হেডকোয়ার্টার্স কর্তৃক ইস্যুকৃত একটি অফিসিয়াল প্রত্যয়নপত্র যা নিশ্চিত করে আবেদনকারী কোনো রাষ্ট্রবিরোধী বা ফৌজদারি অপরাধে সাজাপ্রাপ্ত নন।</p>'
        },
        {
          heading: '২. প্রয়োজনীয় কাগজপত্র ও সরকারি চালানের নিয়ম',
          content: '<p>পাসপোর্টের ১ম ও ২য় পাতার সত্যায়িত কপি, ৫০০ টাকার সোনালী ব্যাংক ট্রেজারি চালান, জাতীয় পরিচয়পত্র বা ওয়ার্ড কাউন্সিলর প্রত্যয়নপত্র এবং বর্তমান ঠিকানার প্রমাণপত্র আপলোড করতে হয়।</p>'
        },
        {
          heading: '৩. অনলাইন আবেদন করার ধারাবাহিক ধাপ (PCC Portal Step-by-Step)',
          content: '<ol><li>pcc.police.gov.bd পোর্টালে একাউন্ট রেজিস্টার করা।</li><li>পাসপোর্ট ও ব্যক্তিগত তথ্য নির্ভুলভাবে পূরণ করা।</li><li>চালান স্লিপ ও ডকুমেন্ট স্ক্যান করে আপলোড করা।</li><li>থানা তদন্ত শেষে সংশ্লিষ্ট এসপি/ডিসির অফিস থেকে হার্ডকপি সংগ্রহ।</li></ol>'
        },
        {
          heading: '৪. ফৌজদারি মামলা বা জিডি থাকলে পুলিশ ক্লিয়ারেন্স পাওয়ার উপায়',
          content: '<p>যদি কোনো ব্যক্তির বিরুদ্ধে পূর্বে মামলা থাকে এবং আদালত থেকে খালাস (Acquittal) বা অব্যাহতি (Discharge) পান, তবে আদালতের সার্টিফাইড রায়ের কপি জমা দিলে ক্লিয়ারেন্স পাওয়া যায়।</p>'
        },
        {
          heading: '৫. মিথ্যা মামলায় ভেরিফিকেশন আটকে গেলে সুপ্রিম কোর্টের আইনি সহায়তা',
          content: '<p>রাজনৈতিক বা হয়রানিমূলক মিথ্যা মামলার ক্ষেত্রে সুপ্রিম কোর্টের <a href="/services/supreme-court-lawyer" style="color:var(--gold);text-decoration:underline;">অভিজ্ঞ রিট আইনজীবীর</a> মাধ্যমে হাইকোর্ট থেকে স্টে অর্ডার বা মামলার কার্যধারা স্থগিত করে ভেরিফিকেশন ক্লিয়ার করা যায়। যোগাযোগ: <strong>০১৭১২৬৫৫৫৪৬</strong>।</p>'
        }
      ],
      faq: [
        {
          question: 'পুলিশ ক্লিয়ারেন্সের মেয়াদ কতদিন থাকে?',
          answer: 'সার্টিফিকেট ইস্যুর তারিখ থেকে সাধারণত ৬ (ছয়) মাস পর্যন্ত এটি আন্তর্জাতিকভাবে বৈধ থাকে।'
        }
      ]
    }
  },

  // 7. Wife Divorcing Husband (Stree Dara Swami Talak) BN & EN
  {
    dir: bnDir,
    file: 'stree-dara-swami-talak-prokriya-bangladesh-2026.json',
    data: {
      slug: 'stree-dara-swami-talak-prokriya-bangladesh-2026',
      category: 'পারিবারিক আইন',
      title: 'স্ত্রী কর্তৃক স্বামীকে তালাক দেওয়ার নিয়ম ২০২৬: তালাক-ই-তৌফিজ, কাবিননামার ১৮ নম্বর কলাম ও দেনমোহর আইন',
      metaTitle: 'স্ত্রী কর্তৃক স্বামীকে তালাক দেওয়ার নিয়ম ২০২৬ | তালাক-ই-তৌফিজ ও দেনমোহর',
      metaDescription: 'স্ত্রী কি স্বামীকে সরাসরি তালাক দিতে পারেন? কাবিননামার ১৮ নম্বর কলামে তালাক-ই-তৌফিজের অধিকার, ৯০ দিনের নোটিশ ও দেনমোহর আদায়ের পূর্ণাঙ্গ আইনি গাইড ২০২৬।',
      keywords: [
        'স্বামীকে ডিভোর্স দেওয়ার নিয়ম 2026',
        'স্ত্রী কর্তৃক তালাক দেওয়ার নিয়ম',
        'তালাক ই তৌফিজ কি',
        'কাবিননামার ১৮ নম্বর কলাম',
        'তালাক দিলে কি দেনমোহর দিতে হয়'
      ],
      publishedDate: '2026-08-25',
      lastModified: '2026-08-26',
      readTime: '১২ মিনিট',
      heroIntro: 'মুসলিম পারিবারিক আইন অধ্যাদেশ ১৯৬১ (MFLO 1961) এবং মুসলিম বিবাহ ও তালাক (নিবন্ধন) আইন ১৯৭৪ অনুযায়ী স্ত্রীও স্বামীকে বৈধভাবে তালাক প্রদান করতে পারেন। বিয়ের সময় কাবিননামার (নিকাহনামা) <strong>১৮ নম্বর কলামে স্বামী কর্তৃক স্ত্রীকে তালাক প্রদানের ক্ষমতা অর্পণ করা হলে তাকে “তালাক-ই-তৌফিজ” (Talaq-e-Tawfeez) বলা হয়</strong>। সুপ্রিম কোর্টের সিনিয়র ফ্যামিলি আইনজীবী <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold;text-decoration:underline;">অ্যাডভোকেট মো. শাহ আলম</a>-এর এই আর্টিকেলে স্ত্রীর তালাক দেওয়ার ধাপসমূহ ও দেনমোহরের অধিকার বিস্তারিত ব্যাখ্যা করা হলো। চেম্বার কনসাল্টেশন: <a href="tel:01712655546" style="color:var(--gold);font-weight:bold;">০১৭১২৬৫৫৫৪৬</a>।',
      quickAnswer: {
        heading: '⚡ স্ত্রী কর্তৃক তালাকের প্রধান আইনি বিষয়সমূহ',
        points: [
          'তালাক-ই-তৌফিজ: কাবিননামার ১৮ নম্বর কলামে ক্ষমতা দেওয়া থাকলে স্ত্রী স্বামীর অনুমতি ছাড়াই সরাসরি তালাক নোটিশ পাঠাতে পারেন।',
          'দেনমোহর প্রাপ্যতা: স্ত্রী তালাক দিলেও তার পাওনা বকেয়া দেনমোহর (Dower) বাতিল হয় না; স্বামী সম্পূর্ণ দেনমোহর পরিশোধ করতে বাধ্য।',
          '৯০ দিনের সালিশি মেয়াদ: সিটি কর্পোরেশন মেয়রের কাছে লিখিত নোটিশ পৌঁছানোর তারিখ থেকে ৯০ দিন পর তালাক চূড়ান্ত কার্যকর হয়।'
        ]
      },
      toc: [
        '১. তালাক-ই-তৌফিজ কি এবং কাবিননামার ১৮ নম্বর কলামের গুরুত্ব',
        '২. ১৮ নম্বর কলাম পূরণ না থাকলে স্ত্রীর আদালতের মাধ্যমে তালাকের উপায় (খোলা তালাক / ফ্যামিলি কোর্ট)',
        '৩. স্ত্রী তালাক দিলে দেনমোহর ও ইদ্দতকালীন খোরপোষের আইনি অধিকার',
        '৪. তালাক নোটিশ পাঠানোর সঠিক আইনি ধাপ ও সিটি কর্পোরেশন নোটিশ',
        '৫. তালাক কার্যকরের সার্টিফিকেট সংগ্রহ ও ভবিষ্যৎ সুরক্ষা'
      ],
      sections: [
        {
          heading: '১. তালাক-ই-তৌফিজ কি এবং কাবিননামার ১৮ নম্বর কলামের গুরুত্ব',
          content: '<p>মুসলিম আইনে স্বামী স্ত্রীকে তালাকের অধিকার ডেলিগেট বা অর্পণ করতে পারেন। নিকাহনামার ১৮ নম্বর কলামে যদি "হ্যাঁ" বা শর্তযুক্ত ক্ষমতা লেখা থাকে, তবে স্ত্রী স্বাধীনভাবে তালাক কার্যকর করতে পারেন।</p>'
        },
        {
          heading: '২. ১৮ নম্বর কলাম পূরণ না থাকলে স্ত্রীর আদালতের মাধ্যমে তালাকের উপায়',
          content: '<p>যদি ১৮ নম্বর কলামে ক্ষমতা না থাকে, তবে ১৯৩৯ সালের মুসলিম বিবাহ বিচ্ছেদ আইনের (Dissolution of Muslim Marriages Act 1939) আওতায় স্ত্রীর পারিবারিক আদালতে মামলা করে বিচারকের মাধ্যমে বিয়ে বিচ্ছেদ করার অধিকার রয়েছে।</p>'
        },
        {
          heading: '৩. স্ত্রী তালাক দিলে দেনমোহর ও ইদ্দতকালীন খোরপোষের আইনি অধিকার',
          content: '<p>আমাদের সমাজে প্রচলিত একটি ভুল ধারণা রয়েছে যে স্ত্রী তালাক দিলে দেনমোহর পাওয়া যায় না। <strong>এটি সম্পূর্ণ ভুল।</strong> তালাক যে পক্ষই প্রদান করুক না কেন, স্বামী স্ত্রীর ধার্যকৃত দেনমোহর ও ইদ্দতকালীন ৩ মাসের ভরণপোষণ পরিশোধ করতে আইনত বাধ্য।</p>'
        },
        {
          heading: '৪. তালাক নোটিশ পাঠানোর সঠিক আইনি ধাপ ও সিটি কর্পোরেশন নোটিশ',
          content: '<p>রেজিস্টার্ড কাজীর মাধ্যমে স্বামীর স্থায়ী ঠিকানায় এবং সংশ্লিষ্ট এলাকার সিটি কর্পোরেশন বা ইউনিয়ন পরিষদ চেয়ারম্যান বরাবর রেজিস্ট্রি ডাকযোগে লিখিত নোটিশ প্রেরণ করতে হবে।</p>'
        },
        {
          heading: '৫. তালাক কার্যকরের সার্টিফিকেট সংগ্রহ ও ভবিষ্যৎ সুরক্ষা',
          content: '<p>পারিবারিক তালাক ও দেনমোহর আদায়ের মামলায় সুপ্রিম কোর্ট ও জজ কোর্টের অভিজ্ঞ ফ্যামিলি আইনজীবী <strong>অ্যাডভোকেট মো. শাহ আলম</strong>-এর সরাসরি চেম্বার পরামর্শ নিন। ফোন: <strong>০১৭১২৬৫৫৫৪৬</strong>।</p>'
        }
      ],
      faq: [
        {
          question: 'তালাক নোটিশ পাঠানোর পর কি প্রত্যাহার করা যায়?',
          answer: '৯০ দিনের মধ্যে স্বামী ও স্ত্রী আপস মীমাংসা করলে নোটিশ প্রত্যাহার করে পুনর্বিবাহ ছাড়াই সংসার বজায় রাখা সম্ভব।'
        }
      ]
    }
  },
  {
    dir: enDir,
    file: 'talaq-e-tawfeez-delegated-divorce-wife-bangladesh.json',
    data: {
      slug: 'talaq-e-tawfeez-delegated-divorce-wife-bangladesh',
      category: 'Family Law',
      title: 'Talaq-e-Tawfeez in Bangladesh 2026: Procedure for Wife Divorcing Husband & Dower Rights',
      metaTitle: 'Wife Divorcing Husband in Bangladesh 2026 | Talaq-e-Tawfeez & Dower',
      metaDescription: 'How can a wife divorce her husband in Bangladesh? Legal guide on Talaq-e-Tawfeez under Column 18 of Nikahnama, 90-day statutory notice, and dower (Mahr) recovery.',
      keywords: [
        'wife divorce husband bangladesh',
        'talaq e tawfeez procedure bd',
        'column 18 of nikahnama bangladesh',
        'wife dower rights after divorce',
        'family lawyer dhaka'
      ],
      publishedDate: '2026-08-25',
      lastModified: '2026-08-26',
      readTime: '11 minutes',
      heroIntro: 'Under the Muslim Family Laws Ordinance 1961 (MFLO), a Muslim wife possesses the lawful power to pronounce divorce against her husband if such authority has been delegated under <strong>Column 18 of the Nikahnama, known as Talaq-e-Tawfeez</strong>. Authored by <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold;text-decoration:underline;">Advocate Md. Shah Alam</a>, Supreme Court Advocate. Call our Uttara chamber at <a href="tel:01712655546" style="color:var(--gold);font-weight:bold;">01712655546</a>.',
      quickAnswer: {
        heading: '⚡ Fast Facts: Wife Delegated Divorce in Bangladesh',
        points: [
          'Column 18 Delegation: If delegated in Nikahnama, the wife can unilaterally issue statutory notice without proving fault.',
          'Dower Rights Retained: The wife remains fully entitled to her unpaid dower (Mahr) and 90-day Iddat maintenance.',
          '90-Day Arbitration: Notice becomes effective 90 days after delivery to the Chairman/Mayor of the local authority.'
        ]
      },
      toc: [
        '1. Legal Doctrine of Talaq-e-Tawfeez in Bangladesh',
        '2. Judicial Divorce under Dissolution of Muslim Marriages Act 1939',
        '3. Wife Right to Full Dower (Mahr) upon Divorce',
        '4. Mandatory Notice under Section 7 MFLO 1961',
        '5. Legal Representation & Family Law Consultation'
      ],
      sections: [
        {
          heading: '1. Legal Doctrine of Talaq-e-Tawfeez in Bangladesh',
          content: '<p>Talaq-e-Tawfeez represents an irrevocable delegation of the marital dissolution power to the wife, allowing her to terminate the matrimonial knot smoothly without judicial intervention.</p>'
        },
        {
          heading: '2. Judicial Divorce under Dissolution of Muslim Marriages Act 1939',
          content: '<p>If Column 18 is blank, the wife can seek judicial dissolution before the Family Court on statutory grounds like cruelty, desertion, non-maintenance, or failure to perform marital obligations.</p>'
        },
        {
          heading: '3. Wife Right to Full Dower (Mahr) upon Divorce',
          content: '<p>Exercising Talaq-e-Tawfeez does NOT extinguish or diminish the wife right to claim the entire prompt and deferred dower money stipulated in the marriage contract.</p>'
        },
        {
          heading: '4. Mandatory Notice under Section 7 MFLO 1961',
          content: '<p>The notice of divorce must be transmitted via Registered Post to the Chairman/Mayor and a copy to the husband. An Arbitration Council is constituted for 90 days before final certificate issuance.</p>'
        },
        {
          heading: '5. Legal Representation & Family Law Consultation',
          content: '<p>For confidential legal guidance regarding divorce notices, maintenance, and child custody, contact <strong>Advocate Md. Shah Alam</strong> at <strong>01712655546</strong>.</p>'
        }
      ],
      faq: [
        {
          question: 'Can the wife remarry after Talaq-e-Tawfeez?',
          answer: 'Yes, upon expiry of the 90-day statutory notice period and completion of the Iddat period, the wife is legally free to remarry.'
        }
      ]
    }
  }
];

console.log('Writing batch 3...');
batch3.forEach(b => {
  fs.writeFileSync(path.join(b.dir, b.file), JSON.stringify(b.data, null, 2), 'utf8');
  console.log(`✅ Created ${b.file}`);
});
