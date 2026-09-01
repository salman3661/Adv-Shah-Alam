const fs = require('fs');
const path = require('path');

const bnDir = path.join(__dirname, '..', 'src', 'content', 'posts', 'bn');
const enDir = path.join(__dirname, '..', 'src', 'content', 'posts', 'en');

const articles = [
  // 1. Court Marriage Process & Cost 2026
  {
    bnFile: 'court-marriage-process-cost-bangladesh-2026.json',
    enFile: 'court-marriage-procedure-cost-bangladesh-2026.json',
    bnData: {
      slug: 'court-marriage-process-cost-bangladesh-2026',
      category: 'পারিবারিক আইন',
      title: 'কোর্ট ম্যারেজ করার নিয়ম ও খরচ ২০২৬: প্রয়োজনীয় কাগজপত্র, নোটারি এফিডেভিট ও নিকাহ রেজিস্ট্রেশন',
      metaTitle: 'কোর্ট ম্যারেজ করার নিয়ম ও খরচ ২০২৬ | প্রয়োজনীয় কাগজপত্র ও নোটারি',
      metaDescription: 'বাংলাদেশে কোর্ট ম্যারেজ করতে কত টাকা খরচ হয় এবং কি কি কাগজপত্র লাগে? ২০২৬ সালের সঠিক আইনি নিয়ম, নোটারি পাবলিক এফিডেভিট ও নিকাহ রেজিস্ট্রেশন ফি জানুন।',
      keywords: [
        'কোর্ট ম্যারেজ এর খরচ কত 2026',
        'কোর্ট ম্যারেজ এর কাগজ',
        'court marriage paper',
        'কোর্ট ম্যারেজ করতে কত টাকা খরচ হয়',
        'court marriage bangladesh'
      ],
      publishedDate: '2026-08-20',
      lastModified: '2026-08-26',
      readTime: '১২ মিনিট',
      heroIntro: 'বাংলাদেশে প্রচলিত ভাষায় যাকে “কোর্ট ম্যারেজ” বলা হয়, আইনের দৃষ্টিতে তা মূলত <strong>১ম শ্রেণীর ম্যাজিস্ট্রেট বা নোটারি পাবলিকের সম্মুখে হলফনামা (Affidavit)</strong> এবং <strong>মুসলিম বিবাহ ও তালাক (নিবন্ধন) আইন অনুযায়ী কাজী অফিসে নিকাহ রেজিস্ট্রেশন</strong>-এর একটি সমন্বিত আইনি প্রক্রিয়া। শুধুমাত্র নোটারি এফিডেভিট করলে বিবাহ সম্পূর্ণ বৈধ হয় না, এর সাথে কাবিননামা থাকা বাধ্যতামূলক। সুপ্রিম কোর্টের অভিজ্ঞ আইনজীবী <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold;text-decoration:underline;">অ্যাডভোকেট মো. শাহ আলম</a>-এর সরাসরি চেম্বার পরামর্শ পেতে যোগাযোগ করুন <a href="tel:01712655546" style="color:var(--gold);font-weight:bold;">০১৭১২৬৫৫৫৪৬</a> নাম্বারে।',
      quickAnswer: {
        heading: '⚡ একনজরে কোর্ট ম্যারেজ নিয়ম ও খরচ ২০২৬',
        points: [
          'আইনি বয়স: ছেলের বয়স সর্বনিম্ন ২১ বছর এবং মেয়ের বয়স সর্বনিম্ন ১৮ বছর হওয়া বাধ্যতামূলক।',
          'প্রয়োজনীয় কাগজ: উভয়ের জাতীয় পরিচয়পত্র (NID) / অনলাইন জন্ম সনদ, ৪ কপি পাসপোর্ট সাইজ ছবি এবং ২ জন প্রাপ্তবয়স্ক সাক্ষী।',
          'প্রকৃত খরচ: নোটারি এফিডেভিট ও আইনজীবী ফি সাধারণত ৩,০০০ - ৮,০০০ টাকা এবং মোহরানার অনুপাতে সরকারি কাজী রেজিস্ট্রেশন ফি নির্ধারিত হয়।',
          'আইনি সুরক্ষা: এফিডেভিট + সরকারি কাবিননামা একসাথে সম্পন্ন হলে মেয়ের পরিবারের মিথ্যা অপহরণ বা নারী নির্যাতন মামলা থেকে তাৎক্ষণিক আইনি সুরক্ষা পাওয়া যায়।'
        ]
      },
      toc: [
        '১. কোর্ট ম্যারেজ আসলে কি এবং আইনের চোখে এর বৈধতা',
        '২. কোর্ট ম্যারেজ করতে কি কি কাগজপত্র লাগে (Document Checklist)',
        '৩. ২০২৬ সালে কোর্ট ম্যারেজের সরকারি ফি ও আইনজীবী খরচের তালিকা',
        '৪. কাজী অফিসে কাবিননামা ছাড়া শুধু নোটারি এফিডেভিটের ঝুঁকি',
        '৫. পরিবারের মামলা ও পুলিশি হয়রানি থেকে আইনি সুরক্ষার উপায়',
        '৬. ধাপভিত্তিক কোর্ট ম্যারেজ সম্পন্ন করার প্রক্রিয়া',
        '৭. সাধারণ জিজ্ঞাসা (FAQ) ও চেম্বার অ্যাপয়েন্টমেন্ট'
      ],
      sections: [
        {
          heading: '১. কোর্ট ম্যারেজ আসলে কি এবং আইনের চোখে এর বৈধতা',
          content: '<p>আমাদের সমাজে অনেকেই মনে করেন আদালতে বিচারক বর-কনের বিয়ে পড়িয়ে দেন। কিন্তু আইনি সত্য হলো—<strong>আদালতে বিয়ে পড়ানোর কোনো আলাদা বিধান নেই</strong>। কোর্ট ম্যারেজ হলো বর ও কনের স্বজ্ঞানে, সাবালকত্ব প্রমাণ সাপেক্ষে এবং কারো প্ররোচনা ছাড়া স্বেচ্ছায় বিবাহবন্ধনে আবদ্ধ হওয়ার বিষয়ে <strong>ম্যাজিস্ট্রেট বা নোটারি পাবলিকের সামনে একটি আনুষ্ঠানিক ঘোষণাপত্র বা হলফনামা (Affidavit of Marriage) সম্পাদন করা</strong>। এরপর সরকারি নিবন্ধিত কাজী দ্বারা কাবিননামা (নিকাহনামা) সম্পন্ন করা হলে বিবাহটি শতভাগ পূর্ণাঙ্গ ও চ্যালেঞ্জহীন হয়।</p>'
        },
        {
          heading: '২. কোর্ট ম্যারেজ করতে কি কি কাগজপত্র লাগে (Document Checklist)',
          content: '<p>কোর্ট ম্যারেজ প্রক্রিয়া সুচারুভাবে সম্পন্ন করার জন্য বর ও কনেকে নিচের কাগজপত্র প্রস্তুত রাখতে হবে:</p><ul><li><strong>বয়সের প্রমাণপত্র:</strong> বর ও কনের মূল জাতীয় পরিচয়পত্র (NID), পাসপোর্ট অথবা ডিজিটাল অনলাইন জন্ম নিবন্ধন সনদ (English/Bangla 17-digit)।</li><li><strong>পাসপোর্ট সাইজ ছবি:</strong> বরের ৪ কপি এবং কনের ৪ কপি ল্যাব প্রিন্ট ছবি।</li><li><strong>সাক্ষীদের পরিচয়পত্র:</strong> কমপক্ষে ২ জন প্রাপ্তবয়স্ক সুস্থ মস্তিষ্কের সাক্ষীর এনআইডি কার্ডের কপি (ছেলে বা মেয়ের যে কোনো বন্ধু বা পরিচিতজন হতে পারে)।</li><li><strong>আগের বিবাহের ক্ষেত্রে:</strong> তালাকপ্রাপ্ত হলে পূর্বের তালাক কার্যকরের সার্টিফিকেট বা স্বামী/স্ত্রী মৃত হলে ডেথ সার্টিফিকেট।</li></ul>'
        },
        {
          heading: '৩. ২০২৬ সালে কোর্ট ম্যারেজের সরকারি ফি ও আইনজীবী খরচের তালিকা',
          content: '<p>কোর্ট ম্যারেজের খরচের মধ্যে রয়েছে স্ট্যাম্প শুল্ক, নোটারি পাবলিক ফি, অ্যাডভোকেট ড্রাফটিং চার্জ এবং সরকারি নিকাহ রেজিস্ট্রেশন ফি। নিচে বিস্তারিত তালিকা দেওয়া হলো:</p><table style="width:100%;border-collapse:collapse;margin:1.5rem 0;"><thead><tr style="background:rgba(198,167,94,0.1);"><th style="padding:10px;border:1px solid var(--card-border);">খরচের খাত</th><th style="padding:10px;border:1px solid var(--card-border);">আনুমানিক খরচ (টাকা)</th><th style="padding:10px;border:1px solid var(--card-border);">বিবরণ</th></tr></thead><tbody><tr><td style="padding:10px;border:1px solid var(--card-border);">নন-জুডিশিয়াল স্ট্যাম্প ও নোটারি ফি</td><td style="padding:10px;border:1px solid var(--card-border);">১,৫০০ - ৩,০০০/-</td><td style="padding:10px;border:1px solid var(--card-border);">৩০০ টাকার স্ট্যাম্পে হলফনামা ও নোটারি সিল</td></tr><tr><td style="padding:10px;border:1px solid var(--card-border);">আইনজীবী ড্রাফটিং ও লিগ্যাল সাপোর্ট</td><td style="padding:10px;border:1px solid var(--card-border);">২,০০০ - ৫,০০০/-</td><td style="padding:10px;border:1px solid var(--card-border);">আইনি সুরক্ষা ডকুমেন্টেশন ও পরামর্শ</td></tr><tr><td style="padding:10px;border:1px solid var(--card-border);">কাজী রেজিস্ট্রেশন ফি (১ লাখ দেনমোহর পর্যন্ত)</td><td style="padding:10px;border:1px solid var(--card-border);">১,২৫০/-</td><td style="padding:10px;border:1px solid var(--card-border);">প্রতি লাখে ১,২৫০ টাকা হারে সরকারি ফি</td></tr></tbody></table>'
        },
        {
          heading: '৪. কাজী অফিসে কাবিননামা ছাড়া শুধু নোটারি এফিডেভিটের ঝুঁকি',
          content: '<p>অনেক দম্পতি অসচেতনতাবশত কোনো দালালের খপ্পরে পড়ে শুধুমাত্র ২০০ বা ৩০০ টাকার স্ট্যাম্পে নোটারি করে বাড়ি ফিরে যান এবং ভাবেন বিয়ে হয়ে গেছে। <strong>এটি একটি মারাত্মক আইনি ভুল!</strong> মুসলিম বিবাহ ও তালাক (নিবন্ধন) আইন ১৯৭৪-এর ধারা ৫(২) অনুযায়ী নিকাহ রেজিস্ট্রি না করা একটি দণ্ডনীয় অপরাধ। শুধু এফিডেভিট দিয়ে পাসপোর্ট সংশোধন, স্ত্রীর ভরণপোষণ বা দেনমোহর দাবি কিংবা সন্তানের বৈধতার ক্ষেত্রে জটিলতা তৈরি হতে পারে। তাই এফিডেভিটের পাশাপাশি অবশ্যই সরকারি কাজী বালামে স্বাক্ষর করে নিকাহনামা সংগ্রহ করতে হবে।</p>'
        },
        {
          heading: '৫. পরিবারের মামলা ও পুলিশি হয়রানি থেকে আইনি সুরক্ষার উপায়',
          content: '<p>পারিবারিক অমতে বিয়ে হলে কনের পরিবার প্রায়ই বরের বিরুদ্ধে নারী ও শিশু নির্যাতন দমন আইন ২০০০-এর ৭/৮ ধারায় (অপহরণ ও ধর্ষণ) মিথ্যা মামলা দায়ের করে। এ ধরনের পরিস্থিতি এড়াতে:</p><ul><li>ম্যারেজ এফিডেভিটে কনের স্পষ্ট জবানবন্দি লিপিবদ্ধ থাকবে যে তিনি প্রাপ্তবয়স্ক এবং স্বেচ্ছায় স্বজ্ঞানে বিবাহ করেছেন।</li><li>বিয়ের দিনই সংশ্লিষ্ট থানার ডিউটি অফিসারকে বিয়ের কাবিননামা ও এফিডেভিটের অনুলিপিসহ অবহিতকরণ আবেদন বা জিডি করে রাখা বুদ্ধিমানের কাজ।</li><li>মামলা হলেও সুপ্রিম কোর্টের <a href="/services/bail-lawyer" style="color:var(--gold);text-decoration:underline;">অভিজ্ঞ জামিন আইনজীবীর</a> মাধ্যমে হাইকোর্ট থেকে তাৎক্ষণিক আগাম জামিন (Anticipatory Bail) নেওয়া সম্ভব।</li></ul>'
        },
        {
          heading: '৬. ধাপভিত্তিক কোর্ট ম্যারেজ সম্পন্ন করার প্রক্রিয়া',
          content: '<ol><li><strong>আইনজীবীর চেম্বারে পরামর্শ:</strong> জাতীয় পরিচয়পত্র যাচাই করে বয়স ও বৈবাহিক স্ট্যাটাস নিশ্চিত করা।</li><li><strong>হলফনামা (Affidavit) প্রস্তুত:</strong> সুপ্রিম কোর্ট বা জজ কোর্টের অ্যাডভোকেট কর্তৃক স্পেশাল ম্যারেজ ডিক্লারেশন খসড়া প্রস্তুত।</li><li><strong>ম্যাজিস্ট্রেট বা নোটারি পাবলিকের সামনে স্বাক্ষর:</strong> বর ও কনে উপস্থিত হয়ে হলফনামায় স্বাক্ষর ও নোটারি সিল গ্রহণ।</li><li><strong>নিকাহ রেজিস্ট্রি ও কাবিননামা গ্রহণ:</strong> সরকারি নিকাহ রেজিস্ট্রারের বালামে স্বাক্ষর এবং তাৎক্ষণিক ভলিউম কপি ও রসিদ সংগ্রহ।</li></ol>'
        },
        {
          heading: '৭. সাধারণ জিজ্ঞাসা (FAQ) ও চেম্বার অ্যাপয়েন্টমেন্ট',
          content: '<p>উত্তরা ও ঢাকা জজ কোর্টে ঝামেলামুক্ত, শতভাগ গোপনীয় ও আইনি সুরক্ষাসহ কোর্ট ম্যারেজ সম্পন্ন করতে সরাসরি সুপ্রিম কোর্টের আইনজীবী <strong>অ্যাডভোকেট মো. শাহ আলম</strong>-এর সাথে যোগাযোগ করুন। হটলাইন: <strong>০১৭১২৬৫৫৫৪৬</strong>।</p>'
        }
      ],
      faq: [
        {
          question: 'কোর্ট ম্যারেজ করতে কত সময় লাগে?',
          answer: 'প্রয়োজনীয় কাগজপত্র সাথে থাকলে অ্যাডভোকেট চেম্বারে মাত্র ২ থেকে ৩ ঘণ্টার মধ্যে নোটারি এফিডেভিট এবং কাজী নিকাহ রেজিস্ট্রেশন সম্পন্ন করা সম্ভব।'
        },
        {
          question: 'অভিভাবক বা মা-বাবার উপস্থিতি কি বাধ্যতামূলক?',
          answer: 'না। বর ও কনে উভয়ে প্রাপ্তবয়স্ক (ছেলে ২১ ও মেয়ে ১৮ বছর) হলে নিজেদের স্বাধীন সম্মতিতে বিবাহ করার সাংবিধানিক ও আইনি অধিকার রয়েছে। শুধু ২ জন প্রাপ্তবয়স্ক সাক্ষী উপস্থিত থাকলেই চলবে।'
        }
      ]
    },
    enData: {
      slug: 'court-marriage-procedure-cost-bangladesh-2026',
      category: 'Family Law',
      title: 'Court Marriage in Bangladesh 2026: Procedure, Documents, Notary Affidavit & Lawyer Fees',
      metaTitle: 'Court Marriage in Bangladesh 2026 | Rules, Cost & Documents',
      metaDescription: 'Complete legal guide on Court Marriage in Bangladesh. Learn about notary public affidavits, Nikahnama registration fees, required documents, and protection against false police cases.',
      keywords: [
        'court marriage in bangladesh',
        'court marriage paper',
        'court marriage cost bangladesh 2026',
        'marriage affidavit bangladesh',
        'court marriage lawyer dhaka'
      ],
      publishedDate: '2026-08-20',
      lastModified: '2026-08-26',
      readTime: '11 minutes',
      heroIntro: 'In Bangladesh, what is colloquially known as "Court Marriage" is legally a combined two-step procedure: executing a <strong>Declaration of Marriage Affidavit before a 1st Class Magistrate or Notary Public</strong> and completing <strong>statutory Nikahnama registration under the Muslim Marriages and Divorces (Registration) Act 1974</strong>. Authored by <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold;text-decoration:underline;">Advocate Md. Shah Alam</a>, Supreme Court Lawyer. For discreet and confidential legal assistance, call our Uttara chamber at <a href="tel:01712655546" style="color:var(--gold);font-weight:bold;">01712655546</a>.',
      quickAnswer: {
        heading: '⚡ Fast Facts: Court Marriage in Bangladesh (2026)',
        points: [
          'Statutory Age: Groom must be at least 21 years old and bride at least 18 years old.',
          'Mandatory Documents: National ID Cards (NID) or digital online birth certificates, passport photos, and 2 adult witnesses.',
          'Legal Reality: A notary affidavit alone does NOT constitute a complete marriage without government Kazi Nikahnama registration.',
          'Legal Protection: Simultaneous affidavit and Kabinnama documentation provides absolute immunity against false abduction (Nari-O-Shishu) charges.'
        ]
      },
      toc: [
        '1. Legal Definition & Reality of Court Marriage in Bangladesh',
        '2. Essential Documents Required (Checklist)',
        '3. Breakdown of Government Fees, Stamp Duty & Lawyer Charges (2026)',
        '4. Why a Notary Affidavit Alone is Incomplete Without Kazi Registration',
        '5. Legal Defence Against False Police FIRs and Family Harassment',
        '6. Step-by-Step Procedure at the Chamber',
        '7. FAQs & Chamber Contact'
      ],
      sections: [
        {
          heading: '1. Legal Definition & Reality of Court Marriage in Bangladesh',
          content: '<p>Contrary to common belief, judicial magistrates in Bangladesh do not solemnize marriages directly on the courtroom bench. Instead, court marriage refers to the lawful execution of a sworn <strong>Special Affidavit of Marriage</strong> affirming mutual free consent, majority, and sound mental health, followed immediately by religious solemnization and official registration with a licensed Marriage Registrar (Kazi).</p>'
        },
        {
          heading: '2. Essential Documents Required (Checklist)',
          content: '<p>Both parties must provide the following documentation:</p><ul><li><strong>Proof of Age:</strong> Valid NID cards, Smart Cards, passports, or verifiable online digital birth certificates (English/Bangla 17-digit format).</li><li><strong>Photographs:</strong> 4 recent passport-size photographs of each party.</li><li><strong>Witness Identifications:</strong> Copies of NID cards of at least two adult witnesses of sound mind.</li><li><strong>Divorce or Death Certificate:</strong> If either party was previously married, certified Talaknama or death certificate of previous spouse.</li></ul>'
        },
        {
          heading: '3. Breakdown of Government Fees, Stamp Duty & Lawyer Charges (2026)',
          content: '<p>Overall expenditure comprises non-judicial stamp paper, notarization fees, professional legal drafting, and statutory registration fees:</p><ul><li><strong>Stamp & Notary Public Costs:</strong> Approx. BDT 1,500 - 3,000 depending on stamp denominations.</li><li><strong>Lawyer Drafting & Certification:</strong> BDT 2,000 - 5,000 for robust legal protection drafting.</li><li><strong>Statutory Kazi Fee:</strong> BDT 1,250 per BDT 100,000 dower (Denmohar) value up to BDT 500,000 as per government gazette rates.</li></ul>'
        },
        {
          heading: '4. Why a Notary Affidavit Alone is Incomplete Without Kazi Registration',
          content: '<p>Under Section 5(2) of the Muslim Marriages and Divorces (Registration) Act 1974, failure to register a Muslim marriage is a punishable offence. Relying solely on a notary paper without a registered Nikahnama creates immense legal hurdles during visa processing, passport amendments, inheritance claims, or maintenance disputes.</p>'
        },
        {
          heading: '5. Legal Defence Against False Police FIRs and Family Harassment',
          content: '<p>When adult couples marry against parental wishes, disgruntled families sometimes lodge fabricated abduction charges under Section 7/8 of the Nari-O-Shishu Nirjatan Daman Ain 2000. Having an impeccably drafted affidavit confirming voluntary consent along with official Kabinnama allows the groom to obtain instantaneous <strong>Anticipatory Bail (Agam Jamin)</strong> from the High Court Division under Section 498 CrPC.</p>'
        },
        {
          heading: '6. Step-by-Step Procedure at the Chamber',
          content: '<ol><li>Document verification and age verification.</li><li>Drafting the Marriage Affidavit on official Non-Judicial Stamp.</li><li>Deposition and affirmation before the Notary Public.</li><li>Signing the official Marriage Volume (Nikahnama) with the government Marriage Registrar.</li></ol>'
        },
        {
          heading: '7. FAQs & Chamber Contact',
          content: '<p>To schedule a private, safe, and fully confidential consultation at our Uttara Chamber, contact <strong>Advocate Md. Shah Alam</strong> directly at <strong>01712655546</strong>.</p>'
        }
      ],
      faq: [
        {
          question: 'How long does the entire court marriage process take?',
          answer: 'With proper documentation, the affidavit drafting, notarization, and Nikahnama registration are completed within 2 to 3 hours.'
        },
        {
          question: 'Is parental presence or permission legally mandatory?',
          answer: 'No. Adult citizens (men aged 21+ and women aged 18+) have the constitutional and legal right to marry of their own volition with 2 adult witnesses.'
        }
      ]
    }
  },

  // 2. Land Registration Fee Calculator 2026
  {
    bnFile: 'land-registration-fee-calculator-bangladesh-2026.json',
    enFile: 'land-registration-fee-calculator-bangladesh-2026.json',
    bnData: {
      slug: 'land-registration-fee-calculator-bangladesh-2026',
      category: 'ভূমি আইন',
      title: 'জমি রেজিস্ট্রি খরচ ক্যালকুলেটর ২০২৬: স্ট্যাম্প শুল্ক, উৎসে কর, স্থানীয় সরকার ফি ও মোট খরচের হিসাব',
      metaTitle: 'জমি রেজিস্ট্রি খরচ ক্যালকুলেটর ২০২৬ | সরকারি ফি ও স্ট্যাম্প শুল্ক',
      metaDescription: '২০২৬ সালে বাংলাদেশে জমি বা প্লট রেজিস্ট্রেশন করতে মোট কত টাকা সরকারি ফি দিতে হবে? দলিল মূল্য অনুযায়ী স্ট্যাম্প ডিউটি, উৎসে কর, এন ফি ও স্থানীয় করের পূর্ণাঙ্গ হিসাব।',
      keywords: [
        'জমি রেজিস্ট্রি খরচ কত 2026',
        'land registration fee in bangladesh 2026',
        'land registration fee calculator',
        'দলিল রেজিস্ট্রেশন ফি হিসাব',
        'জমি খারিজ খরচ ২০২৬'
      ],
      publishedDate: '2026-08-21',
      lastModified: '2026-08-26',
      readTime: '১৪ মিনিট',
      heroIntro: 'জমি বা প্লট ক্রয় করার পর সাব-রেজিস্ট্রি অফিসে সাফ-কবলা দলিল নিবন্ধনের সময় ক্রেতাকে সরকারের নির্ধারিত বিভিন্ন কর ও শুল্ক পরিশোধ করতে হয়। সঠিক হিসাব না জানায় অনেকেই মধ্যস্বত্বভোগী বা দালালদের অতিরিক্ত টাকা দিয়ে প্রতারিত হন। সুপ্রিম কোর্টের অভিজ্ঞ জমি আইনজীবী <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold;text-decoration:underline;">অ্যাডভোকেট মো. শাহ আলম</a>-এর এই কমপ্লিট গাইডে ২০২৬ সালের অর্থ আইন ও ভূমি মন্ত্রণালয়ের সর্বশেষ গেজেট অনুযায়ী জমি রেজিস্ট্রির শতকরা হার এবং ১ লাখ থেকে ১ কোটি টাকার জমির সঠিক খরচ বিস্তারিত তুলে ধরা হলো। হটলাইন: <a href="tel:01712655546" style="color:var(--gold);font-weight:bold;">০১৭১২৬৫৫৫৪৬</a>।',
      quickAnswer: {
        heading: '⚡ ২০২৬ সালের জমি রেজিস্ট্রেশন খরচের সারসংক্ষেপ',
        points: [
          'সিটি কর্পোরেশন এলাকা: মোট রেজিস্ট্রি খরচ দলিল মূল্যের আনুমানিক ১০.৫% - ১১.৫%।',
          'পৌরসভা এলাকা: মোট রেজিস্ট্রি খরচ দলিল মূল্যের আনুমানিক ৯% - ৯.৫%।',
          'ইউনিয়ন পরিষদ (গ্রামাঞ্চল): মোট রেজিস্ট্রি খরচ দলিল মূল্যের আনুমানিক ৭.৫% - ৮.৫%।',
          'প্রধান করসমূহ: স্ট্যাম্প শুল্ক (১.৫%), রেজিস্ট্রি ফি (১%), স্থানীয় সরকার কর (২% - ৩%), এবং উৎসে আয়কর (এলাকাভেদে ২% - ৫% বা কাঠাপ্রতি ফিক্সড)।'
        ]
      },
      toc: [
        '১. জমি রেজিস্ট্রেশনের সরকারি ফির উপাদানসমূহ (Fee Breakdown)',
        '২. এলাকাভিত্তিক শতকরা হারের পূর্ণাঙ্গ চার্ট (City vs Pourashava vs Union)',
        '৩. ২০২৬ সালের উৎসে আয়কর (Gain Tax / AIT) হিসাব',
        '৪. একটি বাস্তব উদাহরণ: ১০ লাখ ও ৫০ লাখ টাকার জমির মোট রেজিস্ট্রি খরচ',
        '৫. হেবা দলিল, দানপত্র ও বাটোয়ারা দলিলের বিশেষ রেজিস্ট্রেশন ফি',
        '৬. সাব-রেজিস্ট্রারে দলিল রেজিস্ট্রির সময় দালাল প্রতারণা এড়ানোর উপায়',
        '৭. জমি ক্রয়ের পূর্বে আইনি যাচাই (Title Search) ও চেম্বার সেবা'
      ],
      sections: [
        {
          heading: '১. জমি রেজিস্ট্রেশনের সরকারি ফির উপাদানসমূহ (Fee Breakdown)',
          content: '<p>সাব-রেজিস্ট্রি অফিসে সাফ-কবলা দলিল রেজিস্ট্রির সময় মোট ফি কয়েকটি প্রধান সরকারি ফান্ডে জমা হয়:</p><ul><li><strong>রেজিস্ট্রেশন ফি (Registration Fee):</strong> দলিল মূল্যের ১.০০% (নূন্যতম ১০০ টাকা)।</li><li><strong>স্ট্যাম্প শুল্ক (Stamp Duty):</strong> দলিল মূল্যের ১.৫০% (দ্যা স্ট্যাম্প অ্যাক্ট অনুযায়ী পে-অর্ডারের মাধ্যমে প্রদেয়)।</li><li><strong>স্থানীয় সরকার কর (Local Govt Tax):</strong> সিটি কর্পোরেশন ও ক্যান্টনমেন্টে ৩%, পৌরসভায় ২%, ইউনিয়ন পরিষদে ২%।</li><li><strong>উৎস আয়কর (Section 53C Income Tax):</strong> এলাকাভিত্তিক নির্ধারিত রেট (ঢাকা/চট্টগ্রাম প্রাইম এরিয়ায় কাঠাপ্রতি বা মূল্যের ৪-৫%)।</li><li><strong>এন ফি (N Fee) ও এনএন ফি (NN Fee):</strong> প্রতি ৩০০ শব্দের জন্য ২৪ টাকা এবং নকল নবিস পারিশ্রমিক ৩৬ টাকা।</li><li><strong>ই-ফি (E-Fee) ও হলফনামা স্ট্যাম্প:</strong> ই-ফি ৩০০ টাকা এবং হলফনামা ৩০০ টাকার স্ট্যাম্প।</li></ul>'
        },
        {
          heading: '২. এলাকাভিত্তিক শতকরা হারের পূর্ণাঙ্গ চার্ট (City vs Pourashava vs Union)',
          content: '<table style="width:100%;border-collapse:collapse;margin:1.5rem 0;"><thead><tr style="background:rgba(198,167,94,0.1);"><th style="padding:10px;border:1px solid var(--card-border);">ফির খাত</th><th style="padding:10px;border:1px solid var(--card-border);">সিটি কর্পোরেশন</th><th style="padding:10px;border:1px solid var(--card-border);">পৌরসভা এলাকা</th><th style="padding:10px;border:1px solid var(--card-border);">ইউনিয়ন পরিষদ (গ্রাম)</th></tr></thead><tbody><tr><td style="padding:10px;border:1px solid var(--card-border);">রেজিস্ট্রেশন ফি</td><td style="padding:10px;border:1px solid var(--card-border);">১.০০%</td><td style="padding:10px;border:1px solid var(--card-border);">১.০০%</td><td style="padding:10px;border:1px solid var(--card-border);">১.০০%</td></tr><tr><td style="padding:10px;border:1px solid var(--card-border);">স্ট্যাম্প ডিউটি</td><td style="padding:10px;border:1px solid var(--card-border);">১.৫০%</td><td style="padding:10px;border:1px solid var(--card-border);">১.৫০%</td><td style="padding:10px;border:1px solid var(--card-border);">১.৫০%</td></tr><tr><td style="padding:10px;border:1px solid var(--card-border);">স্থানীয় সরকার কর</td><td style="padding:10px;border:1px solid var(--card-border);">৩.০০%</td><td style="padding:10px;border:1px solid var(--card-border);">২.০০%</td><td style="padding:10px;border:1px solid var(--card-border);">২.০০%</td></tr><tr><td style="padding:10px;border:1px solid var(--card-border);">উৎসে আয়কর (AIT)</td><td style="padding:10px;border:1px solid var(--card-border);">৪.০০% - ৫.০০%</td><td style="padding:10px;border:1px solid var(--card-border);">৩.০০% - ৪.০০%</td><td style="padding:10px;border:1px solid var(--card-border);">২.০০% - ৩.০০%</td></tr><tr style="font-weight:bold;background:rgba(198,167,94,0.05);"><td style="padding:10px;border:1px solid var(--card-border);">সর্বমোট আনুমানিক</td><td style="padding:10px;border:1px solid var(--card-border);">১০.০০% - ১১.০০%</td><td style="padding:10px;border:1px solid var(--card-border);">৮.০০% - ৯.০০%</td><td style="padding:10px;border:1px solid var(--card-border);">৭.০০% - ৮.০০%</td></tr></tbody></table>'
        },
        {
          heading: '৩. ২০২৬ সালের উৎসে আয়কর (Gain Tax / AIT) হিসাব',
          content: '<p>আয়কর আইন ২০২৩-এর আওতায় জমির বাণিজ্যিক গুরুত্ব ও ভৌগোলিক অবস্থানের ভিত্তিতে উৎসে করের হার ভিন্ন হয়। যেমন: গুলশান, বনানী, মতিঝিল, উত্তরা বা ধানমন্ডি এলাকার জন্য কাঠাপ্রতি ফিক্সড ট্যাক্স (সর্বোচ্চ ২০ লাখ টাকা কাঠাপ্রতি) অথবা শতকরা ৮% এর মধ্যে যেটি বেশি তা প্রযোজ্য হতে পারে। সাধারণ আবাসিক এলাকায় শতকরা ২% থেকে ৪% উৎসে কর ধার্য থাকে।</p>'
        },
        {
          heading: '৪. একটি বাস্তব উদাহরণ: ১০ লাখ ও ৫০ লাখ টাকার জমির মোট রেজিস্ট্রি খরচ',
          content: '<p>ধরা যাক, আপনি সাভার বা গাজীপুর পৌরসভা এলাকায় <strong>১০,০০,০০০ (দশ লাখ) টাকা</strong> মূল্যের জমি ক্রয় করলেন:</p><ul><li>রেজিস্ট্রেশন ফি (১%): ১০,০০০ টাকা</li><li>স্ট্যাম্প ডিউটি (১.৫%): ১৫,০০০ টাকা</li><li>পৌরসভা কর (২%): ২০,০০০ টাকা</li><li>উৎস কর (৩%): ৩০,০০০ টাকা</li><li>এন ফি, ই-ফি ও আনুষঙ্গিক: প্রায় ৩,৫০০ টাকা</li><li><strong>মোট সরকারি খরচ: আনুমানিক ৭৮,৫০০ টাকা।</strong></li></ul>'
        },
        {
          heading: '৫. হেবা দলিল, দানপত্র ও বাটোয়ারা দলিলের বিশেষ রেজিস্ট্রেশন ফি',
          content: '<p>রক্তের সম্পর্কের মধ্যে (যেমন: পিতা-মাতা, সন্তান, ভাই-বোন, স্বামী-স্ত্রী) হেবা দলিলের ক্ষেত্রে সাফ-কবলার মতো উচ্চ ফি দিতে হয় না। হেবা দলিলে রেজিস্ট্রেশন ফি মাত্র ১০০ টাকা এবং স্ট্যাম্প শুল্ক মাত্র ১,০০০ টাকার পে-অর্ডারে সম্পন্ন করা যায়।</p>'
        },
        {
          heading: '৬. সাব-রেজিস্ট্রারে দলিল রেজিস্ট্রির সময় দালাল প্রতারণা এড়ানোর উপায়',
          content: '<p>সব ফি সোনালী ব্যাংক বা যেকোনো অনুমোদিত ব্যাংকের মাধ্যমে চালানে বা পে-অর্ডারে জমা দিয়ে সরকারি রসিদ সংরক্ষণ করুন। কোনো অবস্থাতেই মৌখিক কথায় অতিরিক্ত অননুমোদিত টাকা প্রদান করবেন না।</p>'
        },
        {
          heading: '৭. জমি ক্রয়ের পূর্বে আইনি যাচাই (Title Search) ও চেম্বার সেবা',
          content: '<p>জমি কেনার আগে সিএস, এসএ, আরএস খতিয়ান, নামজারি ডিসিআর এবং খাজনা রসিদ সুপ্রিম কোর্টের অভিজ্ঞ <a href="/services/land-lawyer" style="color:var(--gold);text-decoration:underline;">জমি বিশেষজ্ঞ আইনজীবী</a> দ্বারা যাচাই করা অত্যন্ত জরুরি। আইনি সহায়তার জন্য সরাসরি কল করুন: <strong>০১৭১২৬৫৫৫৪৬</strong>।</p>'
        }
      ],
      faq: [
        {
          question: 'জমি রেজিস্ট্রির কতদিন পর মূল দলিল পাওয়া যায়?',
          answer: 'রেজিস্ট্রেশনের দিন সাব-রেজিস্ট্রার কর্তৃক ৫২ ধারার রসিদ প্রদান করা হয়। বালামে লিপিবদ্ধ ও বাঁধাই শেষে সাধারণত ৬ মাস থেকে ২ বছরের মধ্যে মূল দলিল উত্তোলন করা যায়।'
        },
        {
          question: 'দলিল রেজিস্ট্রির পর পরবর্তী করণীয় কি?',
          answer: 'দলিল পাওয়ার সাথে সাথেই সহকারী কমিশনার (ভূমি) অফিসে ই-নামজারি (E-Mutation) আবেদন করে নিজের নামে নতুন খতিয়ান ও খাজনা রসিদ কেটে জমি দখল নিশ্চিত করতে হবে।'
        }
      ]
    },
    enData: {
      slug: 'land-registration-fee-calculator-bangladesh-2026',
      category: 'Property Law',
      title: 'Land Registration Fee Calculator Bangladesh 2026: Stamp Duty, Gain Tax & Mutation Costs',
      metaTitle: 'Land Registration Fee Calculator Bangladesh 2026 | Stamp Duty & Taxes',
      metaDescription: 'Calculate accurate land registration fees in Bangladesh for 2026. Detailed breakdown of stamp duty, AIT source tax, registration fees, and local government taxes.',
      keywords: [
        'land registration fee in bangladesh 2026',
        'land registration fee calculator bangladesh',
        'deed registration cost bangladesh',
        'stamp duty property bangladesh',
        'land lawyer dhaka'
      ],
      publishedDate: '2026-08-21',
      lastModified: '2026-08-26',
      readTime: '13 minutes',
      heroIntro: 'When purchasing real estate or land in Bangladesh, property buyers must pay statutory government duties, stamp duties, local government taxes, and advance income taxes at the Sub-Registry office. Authored by <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold;text-decoration:underline;">Advocate Md. Shah Alam</a>, Supreme Court Advocate, this guide provides an exhaustive breakdown of the 2026 property registration tariff. For property title vetting and legal guidance, call our chamber at <a href="tel:01712655546" style="color:var(--gold);font-weight:bold;">01712655546</a>.',
      quickAnswer: {
        heading: '⚡ Summary: Property Registration Tariff (2026)',
        points: [
          'City Corporation Areas: Total registration cost is approximately 10.5% - 11.5% of deed value.',
          'Pourashava (Municipal) Areas: Total registration cost is approx. 8.5% - 9.5% of deed value.',
          'Union Parishad (Rural): Total registration cost is approx. 7.0% - 8.0% of deed value.',
          'Key Components: Registration Fee (1%), Stamp Duty (1.5%), Local Govt Tax (2-3%), and Advance Income Tax (AIT).'
        ]
      },
      toc: [
        '1. Breakdown of Property Registration Taxes & Duties in Bangladesh',
        '2. Regional Percentage Matrix (City Corporation vs Rural)',
        '3. Advance Income Tax (AIT / Gain Tax) Calculation 2026',
        '4. Numerical Case Study: BDT 1 Million & BDT 5 Million Property',
        '5. Special Exemptions: Heba (Gift) and Partition Deeds',
        '6. Guarding Against Fraud at the Sub-Registry Office',
        '7. Legal Title Search & Supreme Court Lawyer Consultation'
      ],
      sections: [
        {
          heading: '1. Breakdown of Property Registration Taxes & Duties in Bangladesh',
          content: '<p>Registering a Saf-Kabala (sale deed) involves distinct government levies: <strong>Registration Fee (1.00%)</strong> under the Registration Act 1908, <strong>Stamp Duty (1.50%)</strong> under the Stamp Act 1899, <strong>Local Government Tax (2.00% to 3.00%)</strong>, and <strong>Advance Income Tax (AIT)</strong> under Section 53C of the Income Tax Act 2023.</p>'
        },
        {
          heading: '2. Regional Percentage Matrix (City Corporation vs Rural)',
          content: '<p>Taxes vary according to the geographic and administrative tier of the property location. Urban city corporation properties attract higher municipal levies (3%) and commercial source taxes compared to rural Union Parishad lands (2%).</p>'
        },
        {
          heading: '3. Advance Income Tax (AIT / Gain Tax) Calculation 2026',
          content: '<p>Under the Income Tax Act 2023, prime Dhaka zones (Gulshan, Banani, Motijheel, Uttara, Dhanmondi) are subject to fixed per-katha source taxes or 8% of deed consideration, whichever is higher, whereas general municipal zones bear 3% to 4% tax.</p>'
        },
        {
          heading: '4. Numerical Case Study: BDT 1 Million & BDT 5 Million Property',
          content: '<p>For a property valued at BDT 1,000,000 in a municipal area: Registration Fee (1% = BDT 10,000), Stamp Duty (1.5% = BDT 15,000), Local Tax (2% = BDT 20,000), AIT (3% = BDT 30,000), and incidental e-fees (BDT 3,500), totaling approximately BDT 78,500.</p>'
        },
        {
          heading: '5. Special Exemptions: Heba (Gift) and Partition Deeds',
          content: '<p>Heba deeds between direct blood relatives (parents, children, spouses, siblings) enjoy nominal statutory fees of BDT 100 registration fee and BDT 1,000 stamp duty, dramatically reducing transfer costs.</p>'
        },
        {
          heading: '6. Guarding Against Fraud at the Sub-Registry Office',
          content: '<p>Always pay all fees through official Sonali Bank treasury challans or pay-orders and secure computerized official receipts. Never hand over unreceipted cash to unauthorized brokers.</p>'
        },
        {
          heading: '7. Legal Title Search & Supreme Court Lawyer Consultation',
          content: '<p>Before purchasing land, conducting a rigorous 30-year chain of title search across CS, SA, RS, and BS khatians is critical to prevent litigation. Contact Supreme Court Lawyer <strong>Advocate Md. Shah Alam</strong> at <strong>01712655546</strong>.</p>'
        }
      ],
      faq: [
        {
          question: 'How do I retrieve the original registered deed after execution?',
          answer: 'The Sub-Registry issues a Section 52 receipt on the date of registration. Once book volume entries are completed (usually 6 to 18 months), the original deed is retrieved by submitting the receipt.'
        },
        {
          question: 'What is the immediate next step after land registration?',
          answer: 'Apply for E-Namjari (online mutation) at the AC Land office to create a separate khatian in your name and pay the land development tax (Dakhila).'
        }
      ]
    }
  },

  // 3. Section 138 NI Act Cheque Dishonour Bail & Punishment
  {
    bnFile: '138-dhara-cheque-dishonour-bail-punishment-bd.json',
    enFile: 'section-138-ni-act-cheque-bounce-bail-punishment-bangladesh.json',
    bnData: {
      slug: '138-dhara-cheque-dishonour-bail-punishment-bd',
      category: 'ফৌজদারি আইন',
      title: '১৩৮ ধারা চেক ডিজঅনার মামলা কি জামিনযোগ্য? শাস্তি, লিগ্যাল নোটিশ ও আসামির আত্মরক্ষা ২০২৬',
      metaTitle: '১৩৮ ধারা চেক ডিজঅনার মামলা | জামিন, শাস্তি ও আত্মরক্ষা ২০২৬',
      metaDescription: 'নেগোশিয়েবল ইন্সট্রুমেন্ট অ্যাক্টের ১৩৮ ধারা চেক বাউন্স মামলা কি জামিনযোগ্য? সর্বোচ্চ শাস্তি, অর্থ আদায়ের পদ্ধতি ও আসামির আইনি বাঁচার উপায় জানুন।',
      keywords: [
        '১৩৮ ধারা কি জামিন যোগ্য',
        '১৩৮ ধারা মামলা কি',
        'চেক বাউন্স মামলার শাস্তি',
        'cheque dishonour 138 ni act bangladesh',
        'চেক ডিজঅনার নোটিশের নিয়ম'
      ],
      publishedDate: '2026-08-22',
      lastModified: '2026-08-26',
      readTime: '১২ মিনিট',
      heroIntro: 'ব্যবসায়িক দেনা-পাওনা বা ব্যক্তিগত ঋণের বিপরীতে প্রদত্ত ব্যাংক চেক একাউন্টে পর্যাপ্ত টাকা না থাকায় প্রত্যাখ্যাত হলে <strong>নেগোশিয়েবল ইন্সট্রুমেন্ট অ্যাক্ট ১৮৮১ (NI Act)-এর ১৩৮ ধারায়</strong> মামলা দায়ের করা হয়। চেক বাউন্স সংক্রান্ত মামলায় কোটি কোটি টাকার লেনদেনে অনেকেই গ্রেফতারি পরোয়ানার মুখে পড়েন। সুপ্রিম কোর্টের সিনিয়র আইনজীবী <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold;text-decoration:underline;">অ্যাডভোকেট মো. শাহ আলম</a>-এর এই বিশ্লেষণে ১৩৮ ধারার জামিন যোগ্যতা, সর্বোচ্চ ১ বছর কারাদণ্ড ও চেকের টাকার তিনগুণ পর্যন্ত জরিমানার আইনি বিধান তুলে ধরা হলো। কল করুন: <a href="tel:01712655546" style="color:var(--gold);font-weight:bold;">০১৭১২৬৫৫৫৪৬</a>।',
      quickAnswer: {
        heading: '⚡ ১৩৮ ধারা চেক ডিজঅনার মামলার মূল আইনি তথ্য',
        points: [
          'জামিনযোগ্যতা: ১৩৮ ধারার অপরাধ একটি জামিনযোগ্য (Bailable) অপরাধ। সমন বা পরোয়ানা নিয়ে আদালতে আত্মসমর্পণ করলে সাধারণত জামিন মঞ্জুর হয়।',
          'শাস্তির বিধান: সর্বোচ্চ ১ (এক) বছর মেয়াদের কারাদণ্ড অথবা চেকের বর্ণিত টাকার ৩ (তিন) গুণ পর্যন্ত অর্থদণ্ড, অথবা উভয় দণ্ড।',
          'লিগ্যাল নোটিশের সময়সীমা: চেক ডিজঅনার হওয়ার তারিখ থেকে ৩০ (ত্রিশ) দিনের মধ্যে আইনজীবীর মাধ্যমে লিখিত লিগ্যাল নোটিশ পাঠাতে হবে।',
          'মামলা দায়েরের সময়সীমা: নোটিশ প্রাপ্তির পর টাকা পরিশোধের জন্য ৩০ দিন সময় দিতে হবে। এরপর পরবর্তী ৩০ দিনের মধ্যে আদালতে মামলা করতে হবে।'
        ]
      },
      toc: [
        '১. নেগোশিয়েবল ইন্সট্রুমেন্ট অ্যাক্টের ১৩৮ ধারা কি এবং কখন প্রযোজ্য',
        '২. ১৩৮ ধারার মামলা কি জামিনযোগ্য? (Bailability & Surrender Rules)',
        '৩. মামলার সুনির্দিষ্ট সময়সীমা ও লিগ্যাল নোটিশের ধাপসমূহ (Timeline)',
        '৪. আপিলের ক্ষেত্রে চেকের টাকার ৫০% জমা দেওয়ার বাধ্যতামূলক শর্ত',
        '৫. আসামির আইনি আত্মরক্ষা: সিকিউরিটি চেক ও ব্লাঙ্ক চেকের অপব্যবহার রোধ',
        '৬. সিআর মামলা ও এনআই অ্যাক্ট মামলার মধ্যে মূল পার্থক্য',
        '৭. সুপ্রিম কোর্ট ও সেশন জজ কোর্ট লিগ্যাল কনসাল্টেশন'
      ],
      sections: [
        {
          heading: '১. নেগোশিয়েবল ইন্সট্রুমেন্ট অ্যাক্টের ১৩৮ ধারা কি এবং কখন প্রযোজ্য',
          content: '<p>কোনো ব্যক্তি আইনগত দায় বা ঋণ পরিশোধের জন্য অন্য কোনো ব্যক্তিকে ব্যাংক চেক প্রদান করার পর যদি ব্যাংক একাউন্টে পর্যাপ্ত তহবিল না থাকার কারণে (Insufficient Funds) চেকটি ব্যাংক কর্তৃক ডিজঅনার স্লিপসহ ফেরত আসে, তখনই ১৮৮১ সালের এনআই অ্যাক্টের ১৩৮ ধারার অধীন ফৌজদারি অপরাধ গঠিত হয়।</p>'
        },
        {
          heading: '২. ১৩৮ ধারার মামলা কি জামিনযোগ্য? (Bailability & Surrender Rules)',
          content: '<p><strong>হ্যাঁ, ১৩৮ ধারার অপরাধ সম্পূর্ণ জামিনযোগ্য (Bailable Offence)।</strong> আদালত থেকে সমন বা গ্রেপ্তারি পরোয়ানা (Warrant of Arrest) জারি হলে আসামি যদি উপযুক্ত আইনজীবীর মাধ্যমে বিজ্ঞ যুগ্ম মহানগর দায়রা জজ আদালত বা দায়রা আদালতে আত্মসমর্পণ করে জামিন প্রার্থনা করেন, তবে আদালত সাধারণত জামিন মঞ্জুর করে থাকেন। তবে বারবার আদালতে অনুপস্থিত থাকলে জামিন বাতিল হতে পারে।</p>'
        },
        {
          heading: '৩. মামলার সুনির্দিষ্ট সময়সীমা ও লিগ্যাল নোটিশের ধাপসমূহ (Timeline)',
          content: '<ol><li><strong>চেক ব্যাংকে উপস্থাপন:</strong> চেকের তারিখ হতে ৬ মাসের মধ্যে ব্যাংকে জমা দিতে হবে।</li><li><strong>লিগ্যাল নোটিশ প্রেরণ:</strong> ডিজঅনার স্লিপ পাওয়ার ৩০ দিনের মধ্যে রেজিস্ট্রি ডাকযোগে বা জাতীয় দৈনিকে লিগ্যাল নোটিশ পাঠাতে হবে।</li><li><strong>টাকা পরিশোধের ৩০ দিন সময়:</strong> নোটিশ গ্রহীতাকে টাকা পরিশোধের জন্য ৩০ দিন সময় দিতে হবে।</li><li><strong>মামলা দায়ের:</strong> উক্ত ৩০ দিন অতিবাহিত হওয়ার পরবর্তী ৩০ দিনের মধ্যে মেট্রোপলিটন ম্যাজিস্ট্রেট বা জুডিশিয়াল ম্যাজিস্ট্রেট আদালতে সিআর মামলা দায়ের করতে হবে।</li></ol>'
        },
        {
          heading: '৪. আপিলের ক্ষেত্রে চেকের টাকার ৫০% জমা দেওয়ার বাধ্যতামূলক শর্ত',
          content: '<p>১৩৮ ধারার মামলায় ট্রায়াল কোর্ট যদি আসামিকে দোষী সাব্যস্ত করে সাজা প্রদান করে, তবে উচ্চ আদালতে আপিল করতে হলে এনআই অ্যাক্টের ১৩৮ক ধারা অনুযায়ী <strong>চেকের মূল টাকার কমপক্ষে ৫০% (অর্ধেক) অর্থ সংশ্লিষ্ট আদালতে জমা দিয়ে</strong> আপিল দায়ের করতে হয়।</p>'
        },
        {
          heading: '৫. আসামির আইনি আত্মরক্ষা: সিকিউরিটি চেক ও ব্লাঙ্ক চেকের অপব্যবহার রোধ',
          content: '<p>বাস্তবে অনেক সময় জামানত হিসেবে রাখা সিকিউরিটি চেক বা স্বাক্ষরিত ব্লাঙ্ক চেক অবৈধভাবে বেশি টাকা বসিয়ে মামলা দায়ের করা হয়। আসামিপক্ষের আইনজীবীর মাধ্যমে প্রমাণ করা যায় যে কোনো বৈধ দেনা ছিল না এবং চেকের লেনদেন অবৈধ উদ্দেশ্যে হয়েছিল।</p>'
        },
        {
          heading: '৬. সিআর মামলা ও এনআই অ্যাক্ট মামলার মধ্যে মূল পার্থক্য',
          content: '<p>৪০৬/৪২০ ধারার সাধারণ প্রতারণা মামলায় শুধু শাস্তি হয় কিন্তু সরাসরি টাকা আদায়ের বাধ্যবাধকতা থাকে না। অন্যদিকে ১৩৮ ধারায় অর্থ আদায়ের স্পষ্ট বিধান থাকায় অর্থ উদ্ধারের জন্য এটি সবচেয়ে কার্যকরী আইনি হাতিয়ার।</p>'
        },
        {
          heading: '৭. সুপ্রিম কোর্ট ও সেশন জজ কোর্ট লিগ্যাল কনসাল্টেশন',
          content: '<p>চেক ডিজঅনার নোটিশ ড্রাফটিং বা মামলার শক্তিশালী আইনি প্রতিরক্ষার জন্য সরাসরি সুপ্রিম কোর্টের সিনিয়র ক্রিমিনাল আইনজীবী <strong>অ্যাডভোকেট মো. শাহ আলম</strong>-এর চেম্বার সহায়তা নিন। ফোন: <strong>০১৭১২৬৫৫৫৪৬</strong>।</p>'
        }
      ],
      faq: [
        {
          question: 'চেক হারিয়ে গেলে বা চুরি হলে কি ১৩৮ ধারায় মামলা করা যায়?',
          answer: 'চেক হারিয়ে গেলে অবিলম্বে সংশ্লিষ্ট থানায় জিডি করে ব্যাংকে লিখিতভাবে Stop Payment ইন্সট্রাকশন দিতে হবে, যাতে কেউ জালিয়াতি করে ডিজঅনার করাতে না পারে।'
        },
        {
          question: '১৩৮ ধারার মামলায় কতদিনের মধ্যে নিষ্পত্তি হয়?',
          answer: 'আইন অনুযায়ী বিচারিক আদালতে মামলাটি দ্রুত নিষ্পত্তির বিধান রয়েছে, তবে সাক্ষ্যগ্রহণ ও যুক্তিতর্ক সাপেক্ষে সাধারণত ৬ মাস থেকে ১ বছরের মধ্যে রায় ঘোষণা হয়।'
        }
      ]
    },
    enData: {
      slug: 'section-138-ni-act-cheque-bounce-bail-punishment-bangladesh',
      category: 'Criminal Law',
      title: 'Section 138 NI Act in Bangladesh: Cheque Bounce Bail, Punishment & Legal Notice Timeline 2026',
      metaTitle: 'Section 138 NI Act Cheque Bounce Bangladesh | Bail & Punishment 2026',
      metaDescription: 'Is cheque dishonour under Section 138 of the Negotiable Instruments Act bailable in Bangladesh? Complete guide on punishment, legal notice 30-day timeline, and legal defense.',
      keywords: [
        'section 138 ni act bangladesh',
        'cheque bounce bailable bangladesh',
        'cheque dishonour punishment bangladesh',
        'cheque legal notice timeline',
        'cheque bounce lawyer dhaka'
      ],
      publishedDate: '2026-08-22',
      lastModified: '2026-08-26',
      readTime: '12 minutes',
      heroIntro: 'When a bank cheque is dishonoured due to insufficient funds, the payee is legally empowered to initiate criminal proceedings under <strong>Section 138 of the Negotiable Instruments Act 1881 (NI Act)</strong>. With penalties extending up to 1 year imprisonment and fines up to triple the cheque amount, understanding statutory timelines and bail provisions is crucial. Authored by <a href="/advocate-md-shah-alam" style="color:var(--gold);font-weight:bold;text-decoration:underline;">Advocate Md. Shah Alam</a>, Supreme Court Advocate. Call our chamber at <a href="tel:01712655546" style="color:var(--gold);font-weight:bold;">01712655546</a>.',
      quickAnswer: {
        heading: '⚡ Fast Summary: Section 138 NI Act Cheque Bounce',
        points: [
          'Bailability: Offence under Section 138 NI Act is strictly Bailable upon formal surrender before the competent Court.',
          'Penal Consequences: Maximum 1 year imprisonment, or fine up to three times the cheque amount, or both.',
          'Notice Requirement: A statutory Legal Demand Notice must be served within 30 days from the date of the cheque dishonour memo.',
          'Statutory Timeline: The debtor is given 30 days to clear payment; if unpaid, the complaint must be filed in Court within the next 30 days.'
        ]
      },
      toc: [
        '1. Legal Anatomy of Section 138 of Negotiable Instruments Act 1881',
        '2. Is Cheque Bounce a Bailable Offence in Bangladesh?',
        '3. Strict Statutory Timelines: Dishonour to Filing',
        '4. Mandatory 50% Pre-Deposit Requirement for Appeal',
        '5. Effective Defence Strategies: Misuse of Security & Blank Cheques',
        '6. Section 138 NI Act vs Section 420 Penal Code',
        '7. Legal Consultation with Supreme Court Lawyer'
      ],
      sections: [
        {
          heading: '1. Legal Anatomy of Section 138 of Negotiable Instruments Act 1881',
          content: '<p>Section 138 penalizes any person who draws a cheque on a bank account maintained by them for the discharge of debt or liability, and such cheque returns unpaid due to insufficiency of funds or exceeding agreed overdraft limits.</p>'
        },
        {
          heading: '2. Is Cheque Bounce a Bailable Offence in Bangladesh?',
          content: '<p><strong>Yes, offences under Section 138 NI Act are bailable by law.</strong> Upon issuance of summons or arrest warrants, an accused represented by an advocate can surrender before the Sessions Judge / Joint Metropolitan Sessions Court and obtain regular bail upon furnishing bail bonds.</p>'
        },
        {
          heading: '3. Strict Statutory Timelines: Dishonour to Filing',
          content: '<p>The legal procedure is time-barred by strict limitation rules: (1) Cheque must be deposited within 6 months of validity; (2) Legal notice served within 30 days of dishonour memo; (3) 30-day grace period for payment; (4) Formal petition filed within 30 days after expiration of grace period.</p>'
        },
        {
          heading: '4. Mandatory 50% Pre-Deposit Requirement for Appeal',
          content: '<p>Under Section 138A of the NI Act, if a convicted debtor intends to appeal against a conviction judgment, they must deposit at least 50% of the awarded cheque sum with the trial court before the appeal is admitted.</p>'
        },
        {
          heading: '5. Effective Defence Strategies: Misuse of Security & Blank Cheques',
          content: '<p>Courts examine whether a legally enforceable debt existed when the cheque was issued. Undated security cheques retained after loan liquidation or signed blank cheques obtained under coercion can be successfully defended through documentary proof and bank statements.</p>'
        },
        {
          heading: '6. Section 138 NI Act vs Section 420 Penal Code',
          content: '<p>While Section 420 of the Penal Code 1860 deals with general cheating and fraud, Section 138 NI Act is a specialized commercial recovery mechanism providing direct monetary compensation to the victim alongside penal deterrence.</p>'
        },
        {
          heading: '7. Legal Consultation with Supreme Court Lawyer',
          content: '<p>For drafting statutory legal notices or representing cheque bounce litigation in Dhaka courts, contact <strong>Advocate Md. Shah Alam</strong> directly at <strong>01712655546</strong>.</p>'
        }
      ],
      faq: [
        {
          question: 'Can a cheque bounce case be settled through compromise?',
          answer: 'Yes. Section 138 NI Act offences are compoundable. The complainant can withdraw the case upon receiving the agreed settlement sum at any stage before final judgment.'
        },
        {
          question: 'What if the debtor changes their address to evade legal notice?',
          answer: 'Sending the notice to the last known address or official address by Registered Post with A/D is considered valid legal service under the General Clauses Act.'
        }
      ]
    }
  }
];

console.log('Writing batch of high-demand articles...');
articles.forEach(art => {
  fs.writeFileSync(path.join(bnDir, art.bnFile), JSON.stringify(art.bnData, null, 2), 'utf8');
  fs.writeFileSync(path.join(enDir, art.enFile), JSON.stringify(art.enData, null, 2), 'utf8');
  console.log(`✅ Created ${art.bnFile} and ${art.enFile}`);
});
