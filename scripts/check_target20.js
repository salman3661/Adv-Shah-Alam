const fs = require('fs');
const path = require('path');

const target20 = [
  { id: 1, bn: 'court-marriage-process-cost-bangladesh-2026', en: 'court-marriage-procedure-cost-bangladesh-2026', name: 'কোর্ট ম্যারেজ নিয়ম ও খরচ' },
  { id: 2, bn: 'namjari-khatian-check-online-prokriya-bangladesh', en: 'porcha-khatian-online-verification-guide-bangladesh', name: 'নামজারি খতিয়ান ট্র্যাকিং' },
  { id: 3, bn: 'land-registration-fee-calculator-bangladesh-2026', en: 'land-registration-fee-calculator-bangladesh-2026', name: 'জমি রেজিস্ট্রেশন ফি ক্যালকুলেটর' },
  { id: 4, bn: 'mayer-sampatti-banton-ain-faraiz-hisab-2026-bn', en: 'mothers-property-distribution-muslim-law-bangladesh', name: 'মায়ের সম্পত্তি বন্টন ফারায়েজ' },
  { id: 5, bn: 'cyber-crime-helpline-online-complaint-bangladesh', en: 'cyber-crime-helpline-online-complaint-bangladesh', name: 'সাইবার ক্রাইম হেল্পলাইন ও অভিযোগ' },
  { id: 6, bn: 'stree-dara-swami-talak-prokriya-bangladesh-2026', en: 'talaq-e-tawfeez-delegated-divorce-wife-bangladesh', name: 'স্ত্রী কর্তৃক স্বামীকে তালাক' },
  { id: 7, bn: 'writ-petition-haikort-dhap-khoroch-2026', en: 'writ-petition-high-court-bangladesh-grounds-procedure', name: 'হাইকোর্টে রিট পিটিশন খরচ ও নিয়ম' },
  { id: 8, bn: 'jomi-dakhol-punoruddhar-ain-2026', en: 'land-possession-recovery-suit-bangladesh-2026', name: 'জমি দখল পুনরুদ্ধার মামলা' },
  { id: 9, bn: '138-dhara-cheque-dishonour-bail-punishment-bd', en: 'section-138-ni-act-cheque-bounce-bail-punishment-bangladesh', name: '১৩৮ ধারা চেক মামলা জামিন ও শাস্তি' },
  { id: 10, bn: 'nabalok-sampatti-ferot-obhibhaboktwo-ain', en: 'minor-property-custody-return-guardianship-bangladesh', name: 'নাবালকের সম্পত্তি ফেরত ও অভিভাবকত্ব' },
  { id: 11, bn: 'somopotti-batwara-ain-bangladesh', en: 'partition-suit-land-division-cost-bangladesh', name: 'বাটোয়ারা মামলা সময় ও খরচ' },
  { id: 12, bn: 'mobile-banking-bkash-nagad-fraud-complaint-2026-bn', en: 'bkash-nagad-online-fraud-police-complaint-bangladesh', name: 'বিকাশ নগদ অনলাইন প্রতারণা টাকা ফেরত' },
  { id: 13, bn: 'high-court-anticipatory-bail-cost-procedure-2026', en: 'high-court-anticipatory-bail-cost-procedure-2026', name: 'হাইকোর্টে আগাম জামিন খরচ' },
  { id: 14, bn: 'police-verification-clearance-certificate-bangladesh-bn', en: 'police-verification-certificate-bangladesh', name: 'পুলিশ ভেরিফিকেশন ও ক্লিয়ারেন্স' },
  { id: 15, bn: 'cyber-blackmail-fake-id-complaint-niyom-bangladesh', en: 'cyber-harassment-facebook-gd-procedure-bangladesh', name: 'সাইবার ব্ল্যাকমেইল ও ফেসবুক ফেক আইডি' },
  { id: 16, bn: 'baba-mayer-sampatti-bon-bhai-bhag-faraiz-hisab-2026', en: 'muslim-inheritance-calculator-shares-bangladesh', name: 'বাবার সম্পত্তি বোন ভাই ফারায়েজ' },
  { id: 17, bn: 'flat-apartment-registration-fee-bangladesh', en: 'flat-apartment-registration-fee-bangladesh', name: 'ফ্ল্যাট রেজিস্ট্রেশন ও নামজারি খরচ' },
  { id: 18, bn: 'shram-ain-job-termination-gratuity-aday-bangladesh', en: 'labour-law-bangladesh-gratuity-provident-fund-claims', name: 'চাকরিচ্যুতি গ্র্যাচুইটি শ্রম আদালত' },
  { id: 19, bn: 'power-of-attorney-land-transfer-bangladesh-bn', en: 'power-of-attorney-property-transfer-registration-bangladesh', name: 'পাওয়ার অব অ্যাটর্নি জমি বিক্রির নিয়ম' },
  { id: 20, bn: 'sthagitadesh-injunction-order-39-cpc-bangladesh', en: 'temporary-injunction-stay-order-cpc-bangladesh', name: 'জমিতে নিষেধাজ্ঞা ও স্থগিতাদেশ' }
];

const bnDir = 'src/content/posts/bn';
const enDir = 'src/content/posts/en';

console.log('=== Checking Target 20 High-Intent Posts ===');
target20.forEach(t => {
  const bnExists = fs.existsSync(path.join(bnDir, t.bn + '.json'));
  const enExists = fs.existsSync(path.join(enDir, t.en + '.json'));
  console.log(`Topic ${t.id}: ${t.name}`);
  console.log(`  BN: ${t.bn} -> ${bnExists ? '✅ EXISTS' : '❌ NEED TO CREATE'}`);
  console.log(`  EN: ${t.en} -> ${enExists ? '✅ EXISTS' : '❌ NEED TO CREATE'}`);
});
