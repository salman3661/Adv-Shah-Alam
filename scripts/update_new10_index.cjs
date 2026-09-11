const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '../src/content/blog-bn-index.json');
const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

const newEntries = [
  {
    slug: 'online-namjari-tracking-mutation-abedon-status-check-2026',
    title: 'অনলাইনে নামজারি ট্র্যাকিং করার নিয়ম ২০২৬: ই-নামজারি আবেদনের সর্বশেষ অবস্থা ও ফি যাচাই',
    category: 'ভূমি ও দেওয়ানি আইন',
    readTime: '১৪ মিনিট',
    publishedDate: '2026-09-11',
    isDraft: false,
    enSlug: null,
    metaTitle: 'অনলাইনে নামজারি ট্র্যাকিং ও আবেদনের সর্বশেষ অবস্থা যাচাই ২০২৬',
    metaDescription: 'ই-নামজারি আবেদন ট্র্যাকিং করার সঠিক নিয়ম ২০২৬। আবেদনের বর্তমান অবস্থা, শুনানির তারিখ, ডিসিআর ফি পরিশোধ এবং খারিজ খতিয়ান ডাউনলোডের সম্পূর্ণ প্রক্রিয়া।'
  },
  {
    slug: 'jomi-registry-khoroch-calculator-gazette-hisab-2026',
    title: '২০২৬ সালে জমি রেজিস্ট্রেশন খরচ কত? সরকারি গেজেট ও ক্যালকুলেটর হিসাব',
    category: 'ভূমি ও দেওয়ানি আইন',
    readTime: '১৪ মিনিট',
    publishedDate: '2026-09-11',
    isDraft: false,
    enSlug: null,
    metaTitle: '২০২৬ সালে জমি রেজিস্ট্রেশন খরচ কত? সরকারি গেজেট ও ক্যালকুলেটর হিসাব',
    metaDescription: '২০২৬ সালের জমি রেজিস্ট্রেশন খরচের সম্পূর্ণ হিসাব। সাব-কবলা, হেবা, হেবা-বিল-এওয়াজ ও বায়না দলিলের স্ট্যাম্প ডিউটি, রেজিস্ট্রেশন ফি, উৎসে কর এবং সিটি কর্পোরেশন ও জেলা পরিষদ ট্যাক্স ক্যালকুলেটর।'
  },
  {
    slug: 'court-marriage-asol-khoroch-kagojpotro-niyom-2026',
    title: 'কোর্ট ম্যারেজ করার আসল খরচ, কাগজপত্র ও নিয়ম ২০২৬: এফিডেভিট বনাম কাজী রেজিস্ট্রি',
    category: 'পারিবারিক ও বিবাহ আইন',
    readTime: '১৩ মিনিট',
    publishedDate: '2026-09-11',
    isDraft: false,
    enSlug: null,
    metaTitle: 'কোর্ট ম্যারেজ করার আসল খরচ, কাগজপত্র ও নিয়ম ২০২৬',
    metaDescription: 'কোর্ট ম্যারেজ কি আসল বিয়ে? নোটারি পাবলিক এফিডেভিট বনাম কাজী অফিসে মুসলিম বিবাহ নিবন্ধন, প্রকৃত খরচ, প্রয়োজনীয় কাগজপত্র এবং পুলিশি ঝামেলা এড়ানোর সম্পূর্ণ আইনি গাইড।'
  },
  {
    slug: 'batwara-mamla-kotodin-chole-court-fee-hisab-2026',
    title: 'বণ্টন মামলা (বাটোয়ারা) কতদিন চলে ও কোর্ট ফি কত? বণ্টন মামলার নতুন আইন ২০২৬',
    category: 'ভূমি ও দেওয়ানি আইন',
    readTime: '১৪ মিনিট',
    publishedDate: '2026-09-11',
    isDraft: false,
    enSlug: null,
    metaTitle: 'বণ্টন মামলা কতদিন চলে ও কোর্ট ফি কত? বাটোয়ারা মামলার নিয়ম ২০২৬',
    metaDescription: 'জমির বাটোয়ারা বা বণ্টন মামলা নিষ্পত্তি হতে কতদিন লাগে? প্রাথমিক ও চূড়ান্ত ডিক্রি, কোর্ট ফি, অ্যাডভোকেট কমিশনারের সাহাম বণ্টন এবং ২০২৬ সালের নতুন বণ্টন আইন পর্যালোচনা।'
  },
  {
    slug: 'check-dishonor-mamla-notun-niyom-138-dhara-2026',
    title: 'চেক ডিজঅনার মামলার নতুন নিয়ম ও আপিল বিধান ২০২৬: এনআই অ্যাক্ট ১৩৮ ধারা গাইড',
    category: 'চেক ডিজঅনার ও ব্যাংক আইন',
    readTime: '১৫ মিনিট',
    publishedDate: '2026-09-11',
    isDraft: false,
    enSlug: null,
    metaTitle: 'চেক ডিজঅনার মামলার নতুন নিয়ম ২০২৬ | এনআই অ্যাক্ট ১৩৮ ধারা ও আপিল',
    metaDescription: 'ব্যাংক চেক বাউন্স বা ডিজঅনার হলে মামলা করার আধুনিক নিয়ম। ৩০ দিনের লিগ্যাল নোটিশ, ৫০% টাকা জমা দিয়ে আপিল এবং সুপ্রিম কোর্টের গুরুত্বপূর্ণ রায় ২০২৬।'
  },
  {
    slug: 'heba-bil-ewaj-dalil-ki-batil-korar-ain-2026',
    title: 'হেবা বিল এওয়াজ দলিল কি বাতিল করা যায়? রেজিস্ট্রেশন খরচ ও সুপ্রিম কোর্টের নতুন রায় ২০২৬',
    category: 'ভূমি ও দেওয়ানি আইন',
    readTime: '১৩ মিনিট',
    publishedDate: '2026-09-11',
    isDraft: false,
    enSlug: null,
    metaTitle: 'হেবা বিল এওয়াজ দলিল কি বাতিল করা যায়? রেজিস্ট্রেশন ফি ও আইন ২০২৬',
    metaDescription: 'হেবা বিল এওয়াজ দলিল কী, সাধারণ হেবার সাথে পার্থক্য, রেজিস্ট্রেশন খরচ এবং সুনির্দিষ্ট প্রতিকার আইনের ৩৯ ধারা অনুযায়ী দলিল বাতিলের আইনি শর্তাবলি ও ২০২৬ সালের সুপ্রিম কোর্টের গুরুত্বপূর্ণ রায়।'
  },
  {
    slug: 'stree-korthrik-swamike-divorce-talak-tafweez-2026',
    title: 'স্ত্রী কর্তৃক স্বামীকে তালাক দেওয়ার নিয়ম ও আইন ২০২৬: তালাক-ই-তৌফিজ, নোটিশ ও দেনমোহর অধিকার',
    category: 'পারিবারিক ও বিবাহ আইন',
    readTime: '১৩ মিনিট',
    publishedDate: '2026-09-11',
    isDraft: false,
    enSlug: null,
    metaTitle: 'স্ত্রী কর্তৃক স্বামীকে ডিভোর্স দেওয়ার নিয়ম ও নোটিশ প্রক্রিয়া ২০২৬',
    metaDescription: 'স্ত্রী কীভাবে স্বামীকে বৈধভাবে তালাক দিতে পারে? মুসলিম বিবাহ ও তালাক (নিবন্ধন) আইন, কাবিননামার ১৮ নম্বর কলাম (তালাক-ই-তৌফিজ), ৯০ দিনের নোটিশ ও দেনমোহর আদায়ের সম্পূর্ণ আইনি গাইড।'
  },
  {
    slug: 'high-court-writ-petition-khoroch-niyom-article-102-bn',
    title: 'হাইকোর্টে রিট পিটিশন করার নিয়ম, খরচ ও ৫ প্রকার রিট: সংবিধানের ১০২ অনুচ্ছেদ গাইড ২০২৬',
    category: 'হাইকোর্ট ও জামিন আইন',
    readTime: '১৪ মিনিট',
    publishedDate: '2026-09-11',
    isDraft: false,
    enSlug: null,
    metaTitle: 'হাইকোর্টে রিট পিটিশন করার নিয়ম ও খরচ ২০২৬: সংবিধানের ১০২ অনুচ্ছেদ',
    metaDescription: 'সুপ্রিম কোর্টের হাইকোর্ট বিভাগে রিট দায়েরের শর্ত, প্রয়োজনীয় নথিপত্র, খরচ, ৫ প্রকার রিটের প্রয়োগ এবং প্রশাসনিক অবিচারের বিরুদ্ধে স্থগিতাদেশ (Stay Order) পাওয়ার নিয়ম ২০২৬।'
  },
  {
    slug: 'nabaloker-sampatti-adalt-onumoti-chara-bikroy-protikar-2026',
    title: 'নাবালকের সম্পত্তি আদালতের অনুমতি ছাড়া বিক্রয় হলে কি তা বাতিল হবে? আইনি প্রতিকার ২০২৬',
    category: 'অভিভাবক ও সম্পত্তি আইন',
    readTime: '১২ মিনিট',
    publishedDate: '2026-09-11',
    isDraft: false,
    enSlug: null,
    metaTitle: 'নাবালকের সম্পত্তি আদালতের অনুমতি ছাড়া বিক্রয় বাতিলের আইন ২০২৬',
    metaDescription: 'অভিভাবক ও প্রতিপাল্য আইন ১৮৯০ অনুযায়ী নাবালকের জমি বিক্রয়ে জেলা জজ আদালতের অনুমতি কেন বাধ্যতামূলক? অনুমতিবিহীন বিক্রয় দলিল বাতিলের মোকদ্দমা ও সুপ্রিম কোর্টের নজির।'
  },
  {
    slug: 'mithya-nari-nirjaton-mamla-bachar-upay-jamin-khash-2026',
    title: 'মিথ্যা নারী ও শিশু নির্যাতন মামলা থেকে বাঁচার উপায় ও জামিন: ১৭ ধারায় পাল্টা মামলার আইন ২০২৬',
    category: 'ফৌজদারি ও পারিবারিক আইন',
    readTime: '১২ মিনিট',
    publishedDate: '2026-09-11',
    isDraft: false,
    enSlug: null,
    metaTitle: 'মিথ্যা নারী নির্যাতন মামলা থেকে বাঁচার উপায় ও জামিন ২০২৬',
    metaDescription: 'পারিবারিক বিরোধে মিথ্যা নারী নির্যাতন (১১/গ বা যৌতুক) মামলায় ফাঁসলে বাঁচার আইনি কৌশল, হাইকোর্ট থেকে আগাম জামিন, ডিজিটাল সাক্ষ্য সংগ্রহ এবং ১৭ ধারায় পাল্টা মামলার নিয়ম ২০২৬।'
  }
];

// Remove any duplicate if exists
const newSlugs = new Set(newEntries.map(e => e.slug));
indexData.posts = indexData.posts.filter(p => !newSlugs.has(p.slug));

// Prepend new entries to the top
indexData.posts.unshift(...newEntries);

fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2), 'utf8');
console.log('Successfully updated blog-bn-index.json! Total posts now:', indexData.posts.length);
