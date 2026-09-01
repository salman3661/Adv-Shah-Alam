const fs = require('fs');
const path = require('path');

const targetTopics = [
  { id: 1, name: 'বাবার সম্পত্তি বণ্টন আইন', bnSlug: 'babar-sampatti-banton-ain-bangladesh-2026', enSlug: 'baba-sampatti-vantan-ain-bangladesh-2026' },
  { id: 2, name: 'মায়ের সম্পত্তি ভাগের নিয়ম', bnSlug: 'mayer-sampatti-vibhajan-ain-bangladesh-2026', enSlug: 'property-inheritance-distribution-bangladesh-2026' },
  { id: 3, name: 'জমি রেজিস্ট্রি খরচ কত 2026', bnSlug: 'jomi-nibondhon-kharch-bangladesh-2026', enSlug: 'land-registration-fee-bangladesh-2026' },
  { id: 4, name: 'ফ্ল্যাট কেনার চেকলিস্ট', bnSlug: 'flat-kena-checklist-bangladesh-2026', enSlug: 'flat-apartment-purchase-legal-checklist-bangladesh' },
  { id: 5, name: 'ফ্ল্যাট রেজিস্ট্রি খরচ', bnSlug: 'flat-apartment-registration-fee-bangladesh', enSlug: 'flat-apartment-registration-fee-bangladesh' },
  { id: 6, name: 'অনলাইন ই-নামজারি ট্র্যাকিং', bnSlug: 'namjari-tracking-check-bangladesh-2026', enSlug: 'e-namjari-online-check-bangladesh-2026' },
  { id: 7, name: 'সাইবার ক্রাইম অভিযোগ ও হেল্পলাইন', bnSlug: 'cyber-crime-kivabe-report-korben-bangladesh-2026', enSlug: 'cyber-crime-helpline-bangladesh-2026' },
  { id: 8, name: 'হাইকোর্টে আগাম জামিন', bnSlug: 'agam-jamin-haikort-khoroch-2026', enSlug: 'anticipatory-bail-high-court-bangladesh' },
  { id: 9, name: 'হাইকোর্টে রিট পিটিশন', bnSlug: 'rit-petition-high-court-prokriya-khoroch', enSlug: 'writ-petition-high-court-bangladesh' },
  { id: 10, name: 'কোর্ট ম্যারেজ কাগজপত্র ও খরচ', bnSlug: 'court-marriage-kagojpatra-complete-guide-2026', enSlug: 'court-marriage-bangladesh-complete-guide-2026' },
  { id: 11, name: 'স্ত্রী কর্তৃক স্বামীকে তালাক', bnSlug: 'swamike-talak-dewar-niyom-stree-odhikar-bangladesh', enSlug: 'wife-rights-after-divorce-bangladesh' },
  { id: 12, name: 'হিন্দু উত্তরাধিকার আইন', bnSlug: 'bangladesh-uttaradhikar-ain-dhorm-2026', enSlug: 'inheritance-law-bangladesh-legal-guide' },
  { id: 13, name: 'বাটোয়ারা মামলা কতদিন চলে ও খরচ', bnSlug: 'batwara-mamla-court-fee-prokriya-bd', enSlug: 'property-partition-suit-lawsuit-procedure-bangladesh-2026' },
  { id: 14, name: 'ডিভোর্স আইনজীবী ও আইনি সমাধান', bnSlug: 'divorce-lawyer-dhaka-how-to-choose-bn', enSlug: 'divorce-lawyer-dhaka-how-to-choose' },
  { id: 15, name: 'পাওয়ার অব অ্যাটর্নি দলিল ও বাতিল', bnSlug: 'power-of-attorney-nibondhon-batil-niyom-bangladesh', enSlug: 'power-of-attorney-land-transfer-bangladesh' },
  { id: 16, name: 'অনলাইনে খতিয়ান যাচাই', bnSlug: 'khatian-check-online-bangladesh-2026', enSlug: 'khatian-check-online-bangladesh-complete-guide-2026' },
  { id: 17, name: 'উত্তরাধিকার সাকসেশন সার্টিফিকেট', bnSlug: 'uttaradhikar-certificate-bank-taka-prokriya-bangladesh', enSlug: 'how-to-get-succession-certificate-bank-property-bangladesh' },
  { id: 18, name: 'মিথ্যা মামলা ও ভুয়া এফআইআর খারিজ', bnSlug: 'mithya-mamla-theke-mukti-bangladesh-2026', enSlug: 'how-to-cancel-false-fir-quashment-high-court-bangladesh' },
  { id: 19, name: 'কোম্পানি রেজিস্ট্রেশন প্রক্রিয়া RJSC', bnSlug: 'bangladeshe-company-registration-niyom-prokriya', enSlug: 'company-registration-cost-bangladesh' },
  { id: 20, name: 'শ্রম আইন ও চাকরিচ্যুতি ক্ষতিপূরণ', bnSlug: 'shram-ain-job-termination-gratuity-aday-bangladesh', enSlug: 'workplace-harassment-wrongful-termination-labour-law-bangladesh-2026' }
];

const bnDir = path.join(__dirname, '..', 'src', 'content', 'posts', 'bn');
const enDir = path.join(__dirname, '..', 'src', 'content', 'posts', 'en');

console.log('=== VERIFYING TOP 20 TOPICS IN WEBSITE FILES ===');
targetTopics.forEach(t => {
  const bnFile = path.join(bnDir, t.bnSlug + '.json');
  const enFile = path.join(enDir, t.enSlug + '.json');
  const bnExists = fs.existsSync(bnFile);
  const enExists = fs.existsSync(enFile);
  
  let bnWords = 0, enWords = 0;
  if (bnExists) {
    const data = JSON.parse(fs.readFileSync(bnFile, 'utf8'));
    bnWords = JSON.stringify(data).length;
  }
  if (enExists) {
    const data = JSON.parse(fs.readFileSync(enFile, 'utf8'));
    enWords = JSON.stringify(data).length;
  }

  console.log(`Topic ${t.id}: ${t.name}`);
  console.log(`  BN [${t.bnSlug}]: ${bnExists ? '✅ (' + bnWords + ' bytes)' : '❌ Not Found'}`);
  console.log(`  EN [${t.enSlug}]: ${enExists ? '✅ (' + enWords + ' bytes)' : '❌ Not Found'}`);
});
