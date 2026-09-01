const fs = require('fs');
const path = require('path');

const batch2Topics = [
  { id: 21, name: 'চেক বাউন্স ও ১৩৮ ধারা এনআই অ্যাক্ট', bnSlug: 'chek-bounce-138-ni-act-mamla-jamin-saja-bd', enSlug: '138-ni-act-bangladesh-cheque-case-guide' },
  { id: 22, name: 'নাবালকের সম্পত্তি বিক্রি ও প্রতিকার', bnSlug: 'nabalok-sampatti-bikroy-court-permission-bangladesh', enSlug: 'nabalok-sampatti-bikroy-court-order-bd' },
  { id: 23, name: 'হেবা বিল এওয়াজ দলিল ও বাতিল', bnSlug: 'heba-bil-ewaz-dalil-batil-niyom-bangladesh', enSlug: 'heba-gift-deed-law-bangladesh' },
  { id: 24, name: 'জমি বন্ধক রাখার আইন ও খালাস', bnSlug: 'bandhak-jomi-ain-bangladesh-bn', enSlug: 'mortgage-law-bangladesh' },
  { id: 25, name: 'মাদক মামলার জামিন ও আইনি প্রক্রিয়া', bnSlug: 'madak-mamlar-jamin-prokriya-bangladesh-2026', enSlug: 'narcotics-case-law-bangladesh' },
  { id: 26, name: 'আদালতের নিষেধাজ্ঞা বা স্টে অর্ডার', bnSlug: 'sthagitadesh-bangladesh-adalat', enSlug: 'stay-order-bangladesh-court' },
  { id: 27, name: 'খাস জমি চেনার উপায় ও বন্দোবস্ত', bnSlug: 'khas-jomi-chenar-upay-bondobasto-niyom-bangladesh', enSlug: 'khas-land-claim-bangladesh' },
  { id: 28, name: 'পারিবারিক আপোসনামা ও সোলেনামা', bnSlug: 'family-court-solenama-apos-mimangsha-bangladesh', enSlug: 'family-property-partition-suit-bangladesh' },
  { id: 29, name: 'আইনি নোটিশ পাঠানো ও জবাবের নিয়ম', bnSlug: 'aini-notice-dakhil-bangladesh', enSlug: 'how-to-file-legal-notice-bangladesh' },
  { id: 30, name: 'কাজী ফি ও বিবাহ রেজিস্ট্রেশন খরচ', bnSlug: 'court-marriage-khoroch-niyom-papers-bangladesh-2026', enSlug: 'court-marriage-bangladesh-2026' },
  { id: 31, name: 'অনলাইন আর্থিক প্রতারণা ও সাইবার ফ্রড', bnSlug: 'mobile-banking-bkash-nagad-fraud-complaint-2026-bn', enSlug: 'mobile-banking-fraud-legal-action-bangladesh' },
  { id: 32, name: 'সিআইডি সাইবার পুলিশ সেন্টারে অভিযোগ', bnSlug: 'cyber-crime-unit-bangladesh-2026-bn', enSlug: 'cid-cyber-crime-unit-bangladesh-2026' },
  { id: 33, name: 'সিএস, এসএ, আরএস ও বিএস খতিয়ান', bnSlug: 'rs-survey-bangladesh-bn', enSlug: 'land-survey-map-dag-mouza-bangladesh' },
  { id: 34, name: 'দানপত্র হেবা দলিলের খরচ ও নিয়ম', bnSlug: 'heba-danpatra-ain-bangladesh', enSlug: 'heba-gift-deed-law-bangladesh' },
  { id: 35, name: 'ফৌজদারি মামলায় জামিন খরচ ও শর্ত', bnSlug: 'how-to-get-bail-bangladesh-2026-bn', enSlug: 'how-to-get-bail-in-bangladesh' },
  { id: 36, name: 'অপ্রত্যাহারযোগ্য পাওয়ার অব অ্যাটর্নি বাতিল', bnSlug: 'power-of-attorney-batil-korar-niyom-2026', enSlug: 'power-of-attorney-types-registration-bangladesh' },
  { id: 37, name: 'ডিভোর্স খরচ ও প্রক্রিয়া ২০২৬', bnSlug: 'divorce-kharch-bangladesh-2026', enSlug: 'divorce-cost-bangladesh-2026-complete-guide' },
  { id: 38, name: 'ই-টিন সার্টিফিকেট ও আয়কর নোটিশ', bnSlug: 'aaykar-return-notice-prokriya-bangladesh', enSlug: 'income-tax-case-procedure-bangladesh' },
  { id: 39, name: 'শান্তিভঙ্গ ও মিথ্যা মামলা প্রতিরোধ ১০৭ ধারা', bnSlug: 'police-complaint-hoirani-ain-prokriya-bangladesh-2026', enSlug: 'police-complaint-harassment-bangladesh' },
  { id: 40, name: 'জমি বেদখল রোধ ও ভূমি অপরাধ আইন ২০২৩', bnSlug: 'bhumi-oporadh-ain-2026-jomi-dakhol-vuya-dalil-protikar-bn', enSlug: 'land-fraud-fake-document-case-bangladesh-2026' }
];

const bnDir = path.join(__dirname, '..', 'src', 'content', 'posts', 'bn');
const enDir = path.join(__dirname, '..', 'src', 'content', 'posts', 'en');

console.log('=== BATCH 2: VERIFYING TOPICS 21 TO 40 ===');
batch2Topics.forEach(t => {
  const bnFile = path.join(bnDir, t.bnSlug + '.json');
  const enFile = path.join(enDir, t.enSlug + '.json');
  const bnExists = fs.existsSync(bnFile);
  const enExists = fs.existsSync(enFile);
  console.log(`Topic ${t.id}: ${t.name}`);
  console.log(`  BN [${t.bnSlug}]: ${bnExists ? '✅' : '❌ Not Found'}`);
  console.log(`  EN [${t.enSlug}]: ${enExists ? '✅' : '❌ Not Found'}`);
});
