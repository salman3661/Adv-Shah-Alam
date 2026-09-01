const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const dir = 'c:/Users/User/Desktop/Antigravity/Search Console CSV';
const f7d = path.join(dir, 'last 7 days advmdshahalam.me-Performance-on-Search-2026-08-26 (1).xlsx');

const wb = xlsx.readFile(f7d);
const qSheet = wb.Sheets['Queries'];
const queries = xlsx.utils.sheet_to_json(qSheet);

console.log(`Total 7-day queries: ${queries.length}`);

// Group by topic / category clusters
const clusters = {
  courtMarriage: queries.filter(q => /কোর্ট ম্যারেজ|court marriage/i.test(q['Top queries'])),
  namjariMutation: queries.filter(q => /namjari|mutation|নামজারি|খারিজ/i.test(q['Top queries'])),
  landRegistration: queries.filter(q => /registration|রেজিস্ট্রি|দলিল/i.test(q['Top queries'])),
  cyberCrime: queries.filter(q => /cyber|সাইবার|ব্ল্যাকমেইল|hack|হ্যাক|ফেসবুক/i.test(q['Top queries'])),
  inheritanceMotherFather: queries.filter(q => /সম্পত্তি|উত্তরাধিকার|বন্টন|ভাগ|faraiz|ফারায়েজ|বাটোয়ারা/i.test(q['Top queries'])),
  divorceTalak: queries.filter(q => /talak|তালাক|divorce|ডিভোর্স|খোরপোষ|দেনমোহর/i.test(q['Top queries'])),
  bailRemandCriminal: queries.filter(q => /bail|জামিন|remand|রিমান্ড|৫৪ ধারা|arrest|গ্রেপ্তার|মামলা/i.test(q['Top queries'])),
  writPetition: queries.filter(q => /writ|রিট|petition/i.test(q['Top queries'])),
  chequeBounce138: queries.filter(q => /cheque|চেক|১৩৮/i.test(q['Top queries'])),
  fraudDispute: queries.filter(q => /প্রতারণা|দখল|fraud|জাল/i.test(q['Top queries']))
};

Object.keys(clusters).forEach(k => {
  const items = clusters[k];
  const totalImp = items.reduce((sum, item) => sum + (item.Impressions || 0), 0);
  const totalClicks = items.reduce((sum, item) => sum + (item.Clicks || 0), 0);
  console.log(`\nCluster: ${k} (Total queries: ${items.length} | Imp: ${totalImp} | Clicks: ${totalClicks})`);
  items.slice(0, 5).forEach(item => {
    console.log(`  - "${item['Top queries']}" (Imp: ${item.Impressions}, Pos: ${item.Position.toFixed(1)})`);
  });
});
