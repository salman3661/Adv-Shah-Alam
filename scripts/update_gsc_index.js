const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'src', 'content', 'blog-bn-index.json');
const existing = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

const newEntries = [
  {
    slug: 'mayer-sampatti-theke-chele-meyer-odhikar-2026',
    title: 'মায়ের সম্পত্তিতে ছেলেমেয়ের অধিকার কতটুকু? ২০২৬ সালের আইনি ব্যাখ্যা',
    category: 'সম্পত্তি আইন',
    readTime: '১৩ মিনিট',
    publishedDate: '2026-09-01',
    isDraft: false,
    enSlug: 'mothers-property-rights-children-2026',
    metaTitle: 'মায়ের সম্পত্তি ভাগের নিয়ম ২০২৬ | ছেলেমেয়ে কতটুকু পাবে?',
    metaDescription: 'মায়ের সম্পত্তিতে ছেলেমেয়ের অধিকার কতটুকু? মা জীবিত থাকলে বা মারা গেলে ইসলামি উত্তরাধিকার আইনে ভাগ কীভাবে হয় — সম্পূর্ণ বাংলা গাইড ২০২৬।'
  },
  {
    slug: 'jomi-registry-motel-khoroch-hisab-2026',
    title: 'জমি রেজিস্ট্রি করতে আসলে মোট কত টাকা লাগে? সরকারি ফি + আনুষঙ্গিক খরচের সম্পূর্ণ হিসাব ২০২৬',
    category: 'ভূমি আইন',
    readTime: '১৫ মিনিট',
    publishedDate: '2026-09-01',
    isDraft: false,
    enSlug: 'land-registration-total-cost-2026',
    metaTitle: 'জমি রেজিস্ট্রি খরচ ২০২৬ | সরকারি ফি + স্ট্যাম্প ডিউটি + আইনজীবী ফি সম্পূর্ণ হিসাব',
    metaDescription: 'বাংলাদেশে জমি রেজিস্ট্রি করতে কত টাকা লাগে? স্ট্যাম্প ডিউটি, রেজিস্ট্রেশন ফি, আইনজীবী ফি — সম্পূর্ণ খরচের তালিকা ও ক্যালকুলেটর ২০২৬।'
  },
  {
    slug: 'cyber-crime-abiyog-korar-poripurno-niyom-2026',
    title: 'সাইবার ক্রাইম অভিযোগ কোথায় ও কীভাবে করবেন? সম্পূর্ণ গাইড ২০২৬',
    category: 'সাইবার আইন',
    readTime: '১২ মিনিট',
    publishedDate: '2026-09-01',
    isDraft: false,
    enSlug: 'cyber-crime-complaint-complete-guide-2026',
    metaTitle: 'সাইবার ক্রাইম অভিযোগ করার নিয়ম ২০২৬ | অনলাইনে কীভাবে রিপোর্ট করবেন?',
    metaDescription: 'সাইবার ক্রাইম অভিযোগ কোথায় করবেন? পুলিশ সাইবার ক্রাইম ইউনিট, BTRC, অনলাইন পোর্টাল — ধাপে ধাপে সম্পূর্ণ প্রক্রিয়া বাংলায় ২০২৬।'
  },
  {
    slug: 'stree-swami-talak-dite-parbe-bangladesh-ain-2026',
    title: 'স্ত্রী কি স্বামীকে তালাক দিতে পারেন? বাংলাদেশে নারীর তালাকের সম্পূর্ণ আইন ২০২৬',
    category: 'পারিবারিক আইন',
    readTime: '১৪ মিনিট',
    publishedDate: '2026-09-01',
    isDraft: false,
    enSlug: 'wife-divorce-husband-bangladesh-law-2026',
    metaTitle: 'স্বামীকে ডিভোর্স দেওয়ার নিয়ম ২০২৬ | স্ত্রীর তালাকের আইনি অধিকার বাংলাদেশ',
    metaDescription: 'স্ত্রী কি স্বামীকে তালাক দিতে পারেন? খুলা তালাক, তালাক-ই-তাফউইজ, ফামিলি কোর্টে ডিভোর্স — নারীর তালাকের সম্পূর্ণ আইনি গাইড ২০২৬।'
  },
  {
    slug: 'court-marriage-total-khoroch-prokriya-bangladesh-2026',
    title: 'কোর্ট ম্যারেজ করতে আসলে কত টাকা লাগে? সম্পূর্ণ খরচ ও প্রক্রিয়া ২০২৬',
    category: 'পারিবারিক আইন',
    readTime: '১১ মিনিট',
    publishedDate: '2026-09-01',
    isDraft: false,
    enSlug: 'court-marriage-total-cost-process-bangladesh-2026',
    metaTitle: 'কোর্ট ম্যারেজ খরচ ২০২৬ | বাংলাদেশে কোর্ট ম্যারেজের নিয়ম ও কাগজপত্র',
    metaDescription: 'বাংলাদেশে কোর্ট ম্যারেজ করতে কত টাকা লাগে? কাজী ফি, অ্যাফিডেভিট, আইনজীবী ফি সহ সম্পূর্ণ খরচের তালিকা ও কাগজপত্র ২০২৬।'
  },
  {
    slug: 'check-bounce-niyom-jamin-2026-notun',
    title: 'চেক বাউন্স মামলার নতুন নিয়ম ২০২৬: ১৩৮ ধারায় জামিন, সাজা ও আদায়ের প্রক্রিয়া',
    category: 'ব্যবসায়িক আইন',
    readTime: '১৩ মিনিট',
    publishedDate: '2026-09-01',
    isDraft: false,
    enSlug: 'cheque-dishonour-case-new-rules-2026',
    metaTitle: 'চেক ডিজঅনার মামলার নতুন নিয়ম ২০২৬ | ১৩৮ ধারায় জামিন ও শাস্তি',
    metaDescription: 'চেক বাউন্স হলে করণীয় কী? NI Act ১৩৮ ধারায় মামলা করার নিয়ম, জামিন, সাজা ও টাকা আদায়ের সম্পূর্ণ প্রক্রিয়া ২০২৬।'
  },
  {
    slug: 'talaknama-kivabe-likhben-form-niyom-2026',
    title: 'তালাকনামা কীভাবে লিখবেন? সঠিক ফরম, নোটিশের নিয়ম ও পুরো প্রক্রিয়া ২০২৬',
    category: 'পারিবারিক আইন',
    readTime: '১১ মিনিট',
    publishedDate: '2026-09-01',
    isDraft: false,
    enSlug: 'talak-notice-form-writing-rules-2026',
    metaTitle: 'তালাকনামা লেখার নিয়ম ২০২৬ | তালাকনামা ফরম ও নোটিশ বাংলাদেশ',
    metaDescription: 'তালাকনামা কীভাবে লিখতে হয়? সঠিক ফরম্যাট, চেয়ারম্যানকে নোটিশ দেওয়ার নিয়ম, ৯০ দিনের প্রক্রিয়া — সম্পূর্ণ গাইড বাংলায় ২০২৬।'
  },
  {
    slug: 'batwara-mamla-din-khoroch-prokriya-2026',
    title: 'বাটোয়ারা মামলা কত দিনে শেষ হয়? খরচ ও সম্পূর্ণ প্রক্রিয়া ২০২৬',
    category: 'ভূমি আইন',
    readTime: '১৩ মিনিট',
    publishedDate: '2026-09-01',
    isDraft: false,
    enSlug: 'partition-suit-duration-cost-2026',
    metaTitle: 'বাটোয়ারা মামলার খরচ ও সময় ২০২৬ | জমি ভাগের মামলার সম্পূর্ণ গাইড',
    metaDescription: 'বাটোয়ারা মামলা কতদিন চলে? কোর্ট ফি কত? আইনজীবী ফি? কীভাবে মামলা করবেন? সম্পূর্ণ গাইড ও বাস্তব খরচের তালিকা ২০২৬।'
  },
  {
    slug: 'heba-bil-ewaz-dalil-ki-batil-niyom-2026',
    title: 'হেবা বিল এওয়াজ দলিল কি? কম খরচে জমি দান করার আইনি উপায় ২০২৬',
    category: 'ভূমি আইন',
    readTime: '১২ মিনিট',
    publishedDate: '2026-09-01',
    isDraft: false,
    enSlug: 'heba-bil-ewaz-deed-gift-property-2026',
    metaTitle: 'হেবা বিল এওয়াজ দলিল কি ২০২৬ | কম খরচে সম্পত্তি হস্তান্তরের নিয়ম',
    metaDescription: 'হেবা বিল এওয়াজ দলিল কি? সাধারণ হেবার সাথে পার্থক্য কি? কম খরচে জমি দান করার এই আইনি পদ্ধতি সম্পর্কে বিস্তারিত জানুন ২০২৬।'
  },
  {
    slug: 'mithya-nari-nirjaton-mamla-theke-bachar-ain-2026',
    title: 'মিথ্যা নারী নির্যাতন মামলায় ফাঁসলে কী করবেন? আইনি প্রতিরক্ষা ও মুক্তির উপায় ২০২৬',
    category: 'ফৌজদারি আইন',
    readTime: '১৪ মিনিট',
    publishedDate: '2026-09-01',
    isDraft: false,
    enSlug: 'false-domestic-violence-case-defense-2026',
    metaTitle: 'মিথ্যা নারী নির্যাতন মামলা থেকে বাঁচার উপায় ২০২৬ | আইনি প্রতিরক্ষা',
    metaDescription: 'মিথ্যা নারী নির্যাতন মামলায় পড়েছেন? জামিন নেওয়া, মামলা খারিজ করা, প্রতিরোধ ও মিথ্যা মামলার বিরুদ্ধে পাল্টা মামলার সম্পূর্ণ গাইড ২০২৬।'
  },
  {
    slug: 'police-clearance-certificate-kivabe-paben-2026',
    title: 'পুলিশ ক্লিয়ারেন্স সার্টিফিকেট কীভাবে পাবেন? অনলাইন আবেদনের সম্পূর্ণ নিয়ম ২০২৬',
    category: 'সরকারি সেবা',
    readTime: '১০ মিনিট',
    publishedDate: '2026-09-01',
    isDraft: false,
    enSlug: 'police-clearance-certificate-online-2026',
    metaTitle: 'পুলিশ ক্লিয়ারেন্স সার্টিফিকেট ২০২৬ | অনলাইনে আবেদনের নিয়ম বাংলাদেশ',
    metaDescription: 'পুলিশ ক্লিয়ারেন্স সার্টিফিকেট কীভাবে পাবেন? অনলাইন আবেদন প্রক্রিয়া, প্রয়োজনীয় কাগজপত্র ও ফি — সম্পূর্ণ গাইড বাংলায় ২০২৬।'
  },
  {
    slug: 'vuya-rs-khatian-chenar-upay-jomi-record-2026',
    title: 'ভুয়া খতিয়ান চেনার উপায় এবং অনলাইনে RS/BS খতিয়ান যাচাই করার সম্পূর্ণ নিয়ম ২০২৬',
    category: 'ভূমি আইন',
    readTime: '১২ মিনিট',
    publishedDate: '2026-09-01',
    isDraft: false,
    enSlug: 'fake-khatian-detection-rs-bs-check-online-2026',
    metaTitle: 'RS Khatian Online Check ২০২৬ | ভুয়া খতিয়ান চেনার উপায় বাংলাদেশ',
    metaDescription: 'RS বা BS খতিয়ান অনলাইনে কীভাবে যাচাই করবেন? ভুয়া খতিয়ান চেনার উপায়, eporcha.gov.bd-এ নাম দিয়ে খতিয়ান দেখার সম্পূর্ণ গাইড ২০২৬।'
  }
];

// Check which slugs already exist
const existingData = existing.posts || existing;
const existingSlugs = Array.isArray(existingData) 
  ? existingData.map(p => p.slug)
  : [];

const toAdd = newEntries.filter(e => !existingSlugs.includes(e.slug));
console.log(`Found ${existingSlugs.length} existing entries`);
console.log(`Adding ${toAdd.length} new entries`);

// Prepend new entries
let updatedPosts;
if (existing.posts) {
  updatedPosts = { ...existing, posts: [...toAdd, ...existing.posts] };
} else {
  updatedPosts = [...toAdd, ...existingData];
}

fs.writeFileSync(indexPath, JSON.stringify(updatedPosts, null, 2), 'utf8');
console.log(`✅ Updated blog-bn-index.json with ${toAdd.length} new entries`);
toAdd.forEach(e => console.log(`  + ${e.slug}`));
