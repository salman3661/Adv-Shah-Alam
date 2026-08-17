const fs = require('fs');
const path = require('path');

const batch3Topics = [
  { id: 41, name: 'বিয়ের দেনমোহর ও ভরণপোষণ দাবি মামলা', bnSlug: 'denmohar-aday-family-court-ain-bangladesh', enSlug: 'mahr-dower-rights-wife-bangladesh' },
  { id: 42, name: 'ভাড়াটিয়া উচ্ছেদ ও বাড়ি ভাড়া নিয়ন্ত্রণ আইন', bnSlug: 'bhara-tikki-bibad-bangladesh', enSlug: 'tenant-eviction-rent-control-bangladesh' },
  { id: 43, name: 'দ্বিতীয় বিবাহ করার আইনি শর্ত', bnSlug: 'dwiteya-bibaha-ain-prothom-stree-odhikar-2026-bn', enSlug: 'second-marriage-wife-rights-bangladesh' },
  { id: 44, name: 'ওয়ারিশ কায়েম ও ওয়ারিশান সনদ', bnSlug: 'warish-sanad-orashinamah-sangraha-niyom-2026-bn', enSlug: 'police-verification-certificate-bangladesh' },
  { id: 45, name: 'থানায় জিডি করার নিয়ম', bnSlug: 'thana-jidi-korar-niyom-bangladesh-bn', enSlug: 'how-to-file-gd-bangladesh-police-station' },
  { id: 46, name: 'পুলিশের রিমান্ড ও আসামির অধিকার', bnSlug: 'police-remand-rights-constitutional-guarantee-2026-bn', enSlug: 'police-remand-rights-bangladesh' },
  { id: 47, name: 'যৌতুক নিরোধ আইন ও প্রতিকার', bnSlug: 'yautuk-dowry-ain-bangladesh-bn', enSlug: 'dowry-law-bangladesh' },
  { id: 48, name: 'ট্রেডমার্ক ও ব্র্যান্ড লোগো রেজিস্ট্রেশন', bnSlug: 'trademark-brand-logo-registration-bangladesh', enSlug: 'trademark-registration-bangladesh' },
  { id: 49, name: 'সাইবার ব্ল্যাকমেইলিং ও ফেসবুক ফেক আইডি', bnSlug: 'cyber-blackmail-fake-id-complaint-niyom-bangladesh', enSlug: 'cyber-blackmail-sextortion-bangladesh' },
  { id: 50, name: 'বিনা পরোয়ানায় গ্রেপ্তার ৫৪ ধারা', bnSlug: '54-dhara-grepthar-remand-rights-bangladesh', enSlug: 'section-54-crpc-arrest-bangladesh' },
  { id: 51, name: 'চেক ডিজঅনার নোটিশ ও সময়সীমা', bnSlug: 'cheque-bounce-138-ni-act-legal-notice-2026-bn', enSlug: 'cheque-bounce-recovery-notice-procedure-section-138-ni-act' },
  { id: 52, name: 'সন্তানের কাস্টডি ও হেফাজত আইন', bnSlug: 'child-custody-shishu-hifazat-father-mother-rights-2026-bn', enSlug: 'child-custody-2026-bangladesh' },
  { id: 53, name: 'পারিবারিক সহিংসতা ও সুরক্ষা আদেশ', bnSlug: 'ghoroa-nir-jatan-suraksha-adesh-bangladesh', enSlug: 'domestic-violence-protection-order-bangladesh' },
  { id: 54, name: 'প্রবাসী বাংলাদেশীদের জমি রক্ষা', bnSlug: 'probasi-nrb-jomi-rokha-byabasthapona-bangladesh', enSlug: 'dlrms-land-record-management-bangladesh-2026' },
  { id: 55, name: 'অসিয়তনামা লেখার আইনি নিয়ম', bnSlug: 'will-osiyotnama-lekhari-niyom-bangladesh', enSlug: 'will-osiyotnama-heba-dalil-batil-rules' },
  { id: 56, name: 'আদালতের আদেশ চ্যালেঞ্জ রিভিশন', bnSlug: 'adalat-adesh-challenge-revision-bangladesh', enSlug: 'challenge-court-order-revision-review-bangladesh' },
  { id: 57, name: 'নামজারি ভুল সংশোধন মিস কেস', bnSlug: 'khatian-bhul-songshodhon-miss-case-prokriya-2026-bn', enSlug: 'rs-khatian-online-check-bangladesh-2026' },
  { id: 58, name: 'ভ্যাট নিবন্ধন ও ভ্যাট রিটার্ন', bnSlug: 'vet-ain-compliance-bangladesh', enSlug: 'vat-registration-return-bangladesh' },
  { id: 59, name: 'ওয়ারেন্ট বনাম সমন পার্থক্য', bnSlug: 'warant-samons-bivaad-bangladesh', enSlug: 'warrant-vs-summons-bangladesh' },
  { id: 60, name: 'ব্যবসায়িক চুক্তি লঙ্ঘন ও প্রতিকার', bnSlug: 'business-contract-violation-mamla-bangladesh', enSlug: 'contract-breach-specific-performance-bangladesh' }
];

const bnDir = path.join(__dirname, '..', 'src', 'content', 'posts', 'bn');
const enDir = path.join(__dirname, '..', 'src', 'content', 'posts', 'en');

console.log('=== BATCH 3: VERIFYING TOPICS 41 TO 60 ===');
batch3Topics.forEach(t => {
  const bnFile = path.join(bnDir, t.bnSlug + '.json');
  const enFile = path.join(enDir, t.enSlug + '.json');
  const bnExists = fs.existsSync(bnFile);
  const enExists = fs.existsSync(enFile);
  console.log(`Topic ${t.id}: ${t.name}`);
  console.log(`  BN [${t.bnSlug}]: ${bnExists ? '✅' : '❌ Not Found'}`);
  console.log(`  EN [${t.enSlug}]: ${enExists ? '✅' : '❌ Not Found'}`);
});
