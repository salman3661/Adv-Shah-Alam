const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const dir = path.join(__dirname, '..', 'Search Console CSV');
const wb = XLSX.readFile(path.join(dir, 'advmdshahalam.me-Performance-on-Search-2026-09-06 (1).xlsx'));
const queries = XLSX.utils.sheet_to_json(wb.Sheets['Queries']);

const bn = queries.filter(q => /[\u0980-\u09FF]/.test(q['Top queries']));

const topics = {
  'inheritance': bn.filter(q => /সম্পত্তি|উত্তরাধিকার|ফারায়েজ|ওয়ারিশ/.test(q['Top queries'])),
  'marriage_divorce': bn.filter(q => /বিবাহ|বিয়ে|তালাক|ডিভোর্স|কাবিন|৪৯৪/.test(q['Top queries'])),
  'land_mutation': bn.filter(q => /জমি|রেজিস্ট্রি|নামজারি|খারিজ|খতিয়ান|পর্চা|মৌজা|দলিল|খাস|পৌরসভা/.test(q['Top queries'])),
  'criminal_bail': bn.filter(q => /জামিন|মামলা|ধারা|মাদক|গ্রেফতার|থানা|জিডি|অভিযোগ/.test(q['Top queries'])),
  'cyber_crime': bn.filter(q => /সাইবার/.test(q['Top queries']))
};

Object.entries(topics).forEach(([topic, list]) => {
  console.log(`=== TOPIC: ${topic} (Count: ${list.length}) ===`);
  list.sort((a,b) => b.Clicks - a.Clicks || b.Impressions - a.Impressions).slice(0, 10).forEach(q => {
    console.log(`  "${q['Top queries']}" | Clicks: ${q.Clicks}, Imp: ${q.Impressions}, CTR: ${(q.CTR*100).toFixed(1)}%`);
  });
});
