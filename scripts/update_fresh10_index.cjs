const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '../src/content/blog-bn-index.json');
const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

const newEntries = [
  {
    slug: 'mouza-map-noksha-online-abedon-dlrs-khoroch-2026',
    title: 'মৌজা ম্যাপ বা নকশা অনলাইনে তোলার নিয়ম ২০২৬: সিএস, এসএ ও আরএস ম্যাপ ফি ও পাওয়ার উপায়',
    category: 'ভূমি ও দেওয়ানি আইন',
    readTime: '১২ মিনিট',
    publishedDate: '2026-09-11',
    isDraft: false,
    enSlug: null,
    metaTitle: 'মৌজা ম্যাপ বা নকশা অনলাইনে তোলার নিয়ম ২০২৬: সিএস, এসএ ও আরএস ম্যাপ ফি',
    metaDescription: 'অনলাইনে মৌজা ম্যাপ (CS, SA, RS, BS নকশা) আবেদন করার সঠিক নিয়ম ২০২৬। ভূমি মন্ত্রণালয়ের DLRS পোর্টাল, সরকারি ফি, ডাকযোগে ডেলিভারি এবং দাগ নম্বর মিলিয়ে জমি মাপার পূর্ণাঙ্গ গাইড।'
  },
  {
    slug: 'pita-matar-bhoronposhon-ain-2013-mamla-shasti-2026',
    title: 'পিতা-মাতার ভরণপোষণ আইন ২০১৩: সন্তান দেখাশোনা না করলে মামলা ও শাস্তির আইনি নিয়ম ২০২৬',
    category: 'পারিবারিক ও সামাজিক সুরক্ষা আইন',
    readTime: '১২ মিনিট',
    publishedDate: '2026-09-11',
    isDraft: false,
    enSlug: null,
    metaTitle: 'পিতা-মাতার ভরণপোষণ আইন ২০১৩: মামলা ও শাস্তির নিয়ম ২০২৬',
    metaDescription: 'পিতা-মাতার ভরণপোষণ আইন ২০১৩ অনুযায়ী সন্তান খোরপোশ না দিলে বা বৃদ্ধাশ্রমে পাঠালে মামলার নিয়ম, ১ লাখ টাকা জরিমানা ও ৩ মাসের কারাদণ্ডের বিধান এবং ২০২৬ সালের আইনি অধিকার।'
  },
  {
    slug: 'adolat-obomannona-mamla-contempt-of-court-dhara-2026',
    title: 'আদালত অবমাননা (Contempt of Court) মামলা করার নিয়ম ২০২৬: আদেশ অমান্য করলে সাজা ও প্রতিকার',
    category: 'হাইকোর্ট ও দেওয়ানি আইন',
    readTime: '১২ মিনিট',
    publishedDate: '2026-09-11',
    isDraft: false,
    enSlug: null,
    metaTitle: 'আদালত অবমাননা মামলা করার নিয়ম ২০২৬ | Contempt of Court BD',
    metaDescription: 'হাইকোর্ট বা দেওয়ানি আদালতের স্থগিতাদেশ (Injunction/Stay Order) অমান্য করলে আদালত অবমাননা মামলা করার নিয়ম, সংবিধানের ১০৮ ও ১১২ অনুচ্ছেদ এবং ৬ মাসের কারাদণ্ড ও প্রতিকার ২০২৬।'
  },
  {
    slug: 'bail-bond-jamin-nama-dakhil-surety-niyom-2026',
    title: 'জামিননামা (Bail Bond) দাখিলের নিয়ম ২০২৬: জামিনদার (Surety)-এর শর্ত, বন্ডের স্ট্যাম্প ফি ও রিলিজ অর্ডার',
    category: 'ফৌজদারি ও জামিন আইন',
    readTime: '১২ মিনিট',
    publishedDate: '2026-09-11',
    isDraft: false,
    enSlug: null,
    metaTitle: 'জামিননামা (Bail Bond) দাখিলের নিয়ম ২০২৬ | Surety ও রিলিজ অর্ডার',
    metaDescription: 'আদালতে জামিন মঞ্জুরের পর জামিননামা (Bail Bond) দাখিলের সঠিক নিয়ম ২০২৬। জামিনদারের যোগ্যতা, প্রয়োজনীয় কাগজপত্র, বন্ডের স্ট্যাম্প ফি, জেলখানায় রিলিজ অর্ডার প্রেরণ ও মুক্তির প্রক্রিয়া।'
  },
  {
    slug: 'real-estate-ain-2010-developer-flat-delivery-mamla-2026',
    title: 'রিয়েল এস্টেট আইন ২০১০: ডেভেলপার কোম্পানি সময়মতো ফ্ল্যাট না দিলে বা চুক্তি ভাঙলে মামলার নিয়ম ২০২৬',
    category: 'ভূমি ও রিয়েল এস্টেট আইন',
    readTime: '১২ মিনিট',
    publishedDate: '2026-09-11',
    isDraft: false,
    enSlug: null,
    metaTitle: 'রিয়েল এস্টেট আইন ২০১০: ডেভেলপার ফ্ল্যাট না দিলে ক্ষতিপূরণ ও মামলা ২০২৬',
    metaDescription: 'রিয়েল এস্টেট উন্নয়ন ও ব্যবস্থাপনা আইন ২০১০ অনুযায়ী ডেভেলপার কোম্পানি ফ্ল্যাট হস্তান্তরে দেরি করলে বা অতিরিক্ত টাকা দাবি করলে আইনি নোটিশ, সালিশ ও ফৌজদারি মামলার নিয়ম ২০২৬।'
  },
  {
    slug: 'shorok-durghotona-khotipuron-mamla-ain-2018-2026',
    title: 'সড়ক দুর্ঘটনায় ক্ষতিপূরণ পাওয়ার আইনি নিয়ম ২০২৬: সড়ক পরিবহন আইন ২০১৮ ও আদালতে ক্ষতিপূরণ মামলা',
    category: 'দেওয়ানি ও ক্ষতিপূরণ আইন',
    readTime: '১২ মিনিট',
    publishedDate: '2026-09-11',
    isDraft: false,
    enSlug: null,
    metaTitle: 'সড়ক দুর্ঘটনায় ক্ষতিপূরণ পাওয়ার আইনি নিয়ম ২০২৬ | কোটি টাকার ক্লেইম',
    metaDescription: 'সড়ক দুর্ঘটনায় নিহত বা আহতের ক্ষতিপূরণ আদায়ের নিয়ম। সড়ক পরিবহন আইন ২০১৮-এর ৫৩ ধারা, ট্রাস্টি বোর্ডের আর্থিক সহায়তা এবং সুপ্রিম কোর্টে কোটি টাকার টর্ট ক্ষতিপূরণ মোকদ্দমা ২০২৬।'
  },
  {
    slug: 'bhokta-odhikar-ain-2009-ovijog-dakhil-25-percent-reward-2026',
    title: 'ভোক্তা অধিকার সংরক্ষণ আইন ২০০৯: অনলাইনে প্রতারণার অভিযোগ দায়ের ও জরিমানার ২৫% পুরস্কার পাওয়ার নিয়ম ২০২৬',
    category: 'বাণিজ্যিক ও ভোক্তা আইন',
    readTime: '১২ মিনিট',
    publishedDate: '2026-09-11',
    isDraft: false,
    enSlug: null,
    metaTitle: 'ভোক্তা অধিকার সংরক্ষণ আইন ২০০৯: অভিযোগ দায়ের ও ২৫% পুরস্কার ২০২৬',
    metaDescription: 'অনলাইনে কেনাকাটায় প্রতারণা, পণ্যের অতিরিক্ত দাম বা মেয়াদোত্তীর্ণ পণ্য বিক্রির বিরুদ্ধে ভোক্তা অধিকার সংরক্ষণ অধিদপ্তর (DNCRP)-এ অভিযোগ দায়ের ও জরিমানার ২৫% নগদ অর্থ পাওয়ার পূর্ণাঙ্গ গাইড ২০২৬।'
  },
  {
    slug: 'nikhoj-bektir-sampatti-banton-sakhyo-ain-108-dhara-2026',
    title: 'নিখোঁজ ব্যক্তির সম্পত্তি বণ্টন ও উত্তরাধিকার আইন ২০২৬: সাক্ষ্য আইনের ১০৮ ধারা — ৭ বছর নিখোঁজ বিধান',
    category: 'উত্তরাধিকার ও ফারায়েজ আইন',
    readTime: '১২ মিনিট',
    publishedDate: '2026-09-11',
    isDraft: false,
    enSlug: null,
    metaTitle: 'নিখোঁজ ব্যক্তির সম্পত্তি বণ্টন ও ফারায়েজ আইন ২০২৬ | ১০৮ ধারা',
    metaDescription: 'কোনো ব্যক্তি দীর্ঘ বছর নিখোঁজ বা গুম থাকলে তার সম্পত্তি কীভাবে ওয়ারিশদের মধ্যে বণ্টন ও বিক্রয় হবে? সাক্ষ্য আইনের ১০৮ ধারা, ৭ বছরের নিয়ম ও আদালতে মৃত্যুর ডিক্রি ২০২৬।'
  },
  {
    slug: 'dna-test-ain-2014-pitritto-nirdhoron-adolat-adesh-2026',
    title: 'ডিএনএ টেস্ট আইন ২০১৪ ও পিতৃত্ব নির্ধারণ: আদালত কখন ডিএনএ পরীক্ষার নির্দেশ দেন এবং সন্তানের অধিকার ২০২৬',
    category: 'পারিবারিক ও প্রমাণ আইন',
    readTime: '১২ মিনিট',
    publishedDate: '2026-09-11',
    isDraft: false,
    enSlug: null,
    metaTitle: 'ডিএনএ টেস্ট আইন ২০১৪ ও পিতৃত্ব নির্ধারণ | আদালতের নির্দেশ ২০২৬',
    metaDescription: 'বাংলাদেশে ডিঅক্সিরাইবোনিউক্লিক এসিড (ডিএনএ) আইন ২০১৪ অনুযায়ী আদালতে পিতৃত্ব নির্ধারণ, সন্তানের বৈধতা ও ভরণপোষণ দাবি এবং সাক্ষ্য আইনের ১১২ ধারার পূর্ণাঙ্গ গাইড ২০২৬।'
  },
  {
    slug: 'money-laundering-ain-2012-bank-account-freeze-protikar-2026',
    title: 'মানি লন্ডারিং প্রতিরোধ আইন ২০১২: ব্যাংক হিসাব ফ্রিজ (স্তগিত) হলে অবমুক্তির আইনি নিয়ম ও দুদকের মামলা ২০২৬',
    category: 'ফাইন্যান্সিয়াল ক্রাইম ও দুদক আইন',
    readTime: '১২ মিনিট',
    publishedDate: '2026-09-11',
    isDraft: false,
    enSlug: null,
    metaTitle: 'মানি লন্ডারিং আইন ২০১২: ব্যাংক অ্যাকাউন্ট ফ্রিজ হলে অবমুক্তির নিয়ম ২০২৬',
    metaDescription: 'মানি লন্ডারিং প্রতিরোধ আইন ২০১২-এর ১৪ ধারা অনুযায়ী বিএফআইইউ, সিআইডি বা দুদক ব্যাংক হিসাব ফ্রিজ করলে অবমুক্তির আইনি আবেদন, জামিন ও উচ্চ আদালতে রিটের সম্পূর্ণ গাইড ২০২৬।'
  }
];

// Deduplicate if already present
const newSlugs = new Set(newEntries.map(e => e.slug));
indexData.posts = indexData.posts.filter(p => !newSlugs.has(p.slug));

// Prepend to top
indexData.posts.unshift(...newEntries);

fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2), 'utf8');
console.log('Successfully updated blog-bn-index.json with 10 completely fresh posts! Total:', indexData.posts.length);
