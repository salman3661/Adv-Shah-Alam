const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'src', 'content', 'blog-bn-index.json');
const existing = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

const newEntries = [
  {
    slug: 'namjari-online-check-korar-niyom-2026-complete',
    title: 'নামজারি অনলাইনে চেক করার সম্পূর্ণ নিয়ম ২০২৬ — ঘরে বসেই জানুন আবেদনের অবস্থা',
    category: 'ভূমি আইন',
    readTime: '১০ মিনিট',
    publishedDate: '2026-09-02',
    isDraft: false,
    enSlug: null,
    metaTitle: 'নামজারি অনলাইন চেক ২০২৬ | namjari online check bangladesh',
    metaDescription: 'নামজারি বা খারিজ আবেদনের অবস্থা অনলাইনে কীভাবে দেখবেন? land.gov.bd ও eporcha পোর্টালে নামজারি চেক করার সম্পূর্ণ গাইড ২০২৬।'
  },
  {
    slug: 'mutation-obostha-check-2026-complete',
    title: 'মিউটেশন আবেদনের সর্বশেষ অবস্থা কীভাবে চেক করবেন? সম্পূর্ণ গাইড ২০২৬',
    category: 'ভূমি আইন',
    readTime: '১১ মিনিট',
    publishedDate: '2026-09-02',
    isDraft: false,
    enSlug: null,
    metaTitle: 'মিউটেশন আবেদনের সর্বশেষ অবস্থা ২০২৬ | অনলাইনে মিউটেশন চেক',
    metaDescription: 'মিউটেশন আবেদনের বর্তমান অবস্থা কীভাবে জানবেন? অনলাইন পোর্টালে ট্র্যাকিং, মিউটেশন আটকে গেলে করণীয় — সম্পূর্ণ গাইড বাংলায় ২০২৬।'
  },
  {
    slug: 'haikort-agam-jamin-khoroch-niyom-2026',
    title: 'হাইকোর্ট থেকে আগাম জামিন নিতে কত টাকা লাগে? সম্পূর্ণ খরচ ও প্রক্রিয়া ২০২৬',
    category: 'ফৌজদারি আইন',
    readTime: '১৩ মিনিট',
    publishedDate: '2026-09-02',
    isDraft: false,
    enSlug: null,
    metaTitle: 'হাইকোর্ট থেকে আগাম জামিন নিতে কত টাকা লাগে ২০২৬ | আগাম জামিনের নিয়ম',
    metaDescription: 'হাইকোর্ট থেকে আগাম জামিন নিতে কত টাকা লাগে? আইনজীবী ফি, কোর্ট ফি ও প্রক্রিয়া সহ সম্পূর্ণ গাইড বাংলায় ২০২৬।'
  },
  {
    slug: 'bari-vara-ain-varatia-malikar-odhikar-2026',
    title: 'বাড়ি ভাড়া আইন ২০২৬: ভাড়াটিয়া ও বাড়িওয়ালার অধিকার ও দায়িত্ব সম্পূর্ণ গাইড',
    category: 'পারিবারিক আইন',
    readTime: '১৩ মিনিট',
    publishedDate: '2026-09-02',
    isDraft: false,
    enSlug: null,
    metaTitle: 'বাড়ি ভাড়া আইন ২০২৬ | ভাড়াটিয়ার অধিকার ও বাড়িওয়ালার দায়িত্ব বাংলাদেশ',
    metaDescription: 'বাড়ি ভাড়া আইনে ভাড়াটিয়া কি বাড়ি থেকে বের করা যায়? বাড়িওয়ালা হঠাৎ ভাড়া বাড়াতে পারবেন? ভাড়া বৃদ্ধি নোটিশ — সম্পূর্ণ আইনি গাইড ২০২৬।'
  },
  {
    slug: 'warish-sanad-kibhabe-paben-2026-complete',
    title: 'ওয়ারিশ সনদ কীভাবে পাবেন? কোথায় আবেদন করবেন ও কী কাগজ লাগবে — সম্পূর্ণ গাইড ২০২৬',
    category: 'সম্পত্তি আইন',
    readTime: '১০ মিনিট',
    publishedDate: '2026-09-02',
    isDraft: false,
    enSlug: null,
    metaTitle: 'ওয়ারিশ সনদ পাওয়ার নিয়ম ২০২৬ | ওয়ারিশ সনদ আবেদন প্রক্রিয়া বাংলাদেশ',
    metaDescription: 'ওয়ারিশ সনদ কোথায় পাবেন? কী কাগজ লাগে? কতদিনে পাবেন? ইউনিয়ন পরিষদ ও পৌরসভায় আবেদনের সম্পূর্ণ প্রক্রিয়া বাংলায় ২০২৬।'
  },
  {
    slug: 'swami-dwitio-biye-prothom-stree-odhikar-2026',
    title: 'স্বামীর দ্বিতীয় বিয়েতে প্রথম স্ত্রীর আইনি অধিকার কী? ২০২৬ সালের সম্পূর্ণ গাইড',
    category: 'পারিবারিক আইন',
    readTime: '১৩ মিনিট',
    publishedDate: '2026-09-02',
    isDraft: false,
    enSlug: null,
    metaTitle: 'স্বামীর দ্বিতীয় বিয়েতে প্রথম স্ত্রীর অধিকার ২০২৬ | বাংলাদেশ পারিবারিক আইন',
    metaDescription: 'স্বামী দ্বিতীয় বিয়ে করলে প্রথম স্ত্রী কী করতে পারেন? অনুমতি ছাড়া দ্বিতীয় বিয়ে কি অবৈধ? ভরণপোষণ, ডিভোর্স ও ক্ষতিপূরণের অধিকার জানুন।'
  },
  {
    slug: 'jomi-dalil-hariye-gele-koronio-2026',
    title: 'জমির দলিল হারিয়ে গেলে কী করবেন? সার্টিফাইড কপি পাওয়ার সম্পূর্ণ উপায় ২০২৬',
    category: 'ভূমি আইন',
    readTime: '১১ মিনিট',
    publishedDate: '2026-09-02',
    isDraft: false,
    enSlug: null,
    metaTitle: 'জমির দলিল হারিয়ে গেলে করণীয় ২০২৬ | সার্টিফাইড কপি পাওয়ার নিয়ম বাংলাদেশ',
    metaDescription: 'জমির দলিল হারিয়ে গেলে কি মালিকানা যাবে? সার্টিফাইড কপি কোথায় পাবেন? সাব-রেজিস্ট্রি অফিস থেকে দলিলের নকল পাওয়ার সম্পূর্ণ প্রক্রিয়া ২০২৬।'
  },
  {
    slug: 'yautuk-mamla-theke-bachar-ain-prokriya-2026',
    title: 'যৌতুক মামলা থেকে বাঁচার আইনি উপায় ২০২৬ — মিথ্যা যৌতুক অভিযোগে প্রতিরক্ষা',
    category: 'ফৌজদারি আইন',
    readTime: '১৪ মিনিট',
    publishedDate: '2026-09-02',
    isDraft: false,
    enSlug: null,
    metaTitle: 'যৌতুক মামলা থেকে বাঁচার উপায় ২০২৬ | মিথ্যা যৌতুক অভিযোগ প্রতিরোধ',
    metaDescription: 'যৌতুক মামলায় গ্রেফতার হলে কী করবেন? জামিন, মামলা খারিজ ও মিথ্যা যৌতুক অভিযোগের বিরুদ্ধে আইনি প্রতিরক্ষার সম্পূর্ণ গাইড ২০২৬।'
  },
  {
    slug: 'jomi-jorip-dag-nombor-check-online-2026',
    title: 'জমির দাগ নম্বর দিয়ে অনলাইনে জমি চেক করার সম্পূর্ণ নিয়ম ২০২৬',
    category: 'ভূমি আইন',
    readTime: '১০ মিনিট',
    publishedDate: '2026-09-02',
    isDraft: false,
    enSlug: null,
    metaTitle: 'দাগ নম্বর দিয়ে জমি চেক ২০২৬ | অনলাইনে জমির তথ্য জানার উপায় বাংলাদেশ',
    metaDescription: 'দাগ নম্বর দিয়ে জমির মালিক কে? কতটুকু জমি আছে? অনলাইনে eporcha.gov.bd থেকে জমির তথ্য চেক করার সম্পূর্ণ গাইড ২০২৬।'
  },
  {
    slug: 'sampatti-uphar-danapatra-dalil-niyom-2026',
    title: 'দানপত্র বা গিফট ডিড কীভাবে করবেন? সম্পত্তি উপহার দেওয়ার সম্পূর্ণ আইনি নিয়ম ২০২৬',
    category: 'ভূমি আইন',
    readTime: '১২ মিনিট',
    publishedDate: '2026-09-02',
    isDraft: false,
    enSlug: null,
    metaTitle: 'দানপত্র দলিল ২০২৬ | Gift Deed বাংলাদেশ | সম্পত্তি উপহার দেওয়ার নিয়ম',
    metaDescription: 'বাংলাদেশে দানপত্র বা গিফট ডিড কীভাবে করবেন? কাকে দান করা যায়? খরচ কত? মুসলিম হেবা ও হিন্দু দানপত্রের পার্থক্য — সম্পূর্ণ গাইড ২০২৬।'
  }
];

const existingData = existing.posts || existing;
const existingSlugs = Array.isArray(existingData) 
  ? existingData.map(p => p.slug)
  : [];

const toAdd = newEntries.filter(e => !existingSlugs.includes(e.slug));
console.log(`Found ${existingSlugs.length} existing entries`);
console.log(`Adding ${toAdd.length} new entries`);

let updatedPosts;
if (existing.posts) {
  updatedPosts = { ...existing, posts: [...toAdd, ...existing.posts] };
} else {
  updatedPosts = [...toAdd, ...existingData];
}

fs.writeFileSync(indexPath, JSON.stringify(updatedPosts, null, 2), 'utf8');
console.log(`✅ Updated blog-bn-index.json with ${toAdd.length} new entries`);
toAdd.forEach(e => console.log(`  + ${e.slug}`));
