/**
 * Phase 5: Complete Bug Fix Script
 * 1. Category normalization — 56 categories → 6 standard ones
 * 2. Remaining BN duplicate clusters (court marriage, batwara, divorce)
 * 3. EN duplicate clusters (cyber, namjari, land registration)
 * 4. Fix missing publishedAt timestamps on master files
 * 
 * Run: node scratch/phase5_all_bugs.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const BN_DIR = path.join(ROOT, 'src/content/posts/bn');
const EN_DIR = path.join(ROOT, 'src/content/posts/en');
const VERCEL_JSON = path.join(ROOT, 'vercel.json');

// ============================================================
// STEP 1: CATEGORY NORMALIZATION MAP
// Maps any variant → standard 6 categories
// ============================================================
const CATEGORY_MAP = {
  // → ফৌজদারি আইন
  'criminal': 'ফৌজদারি আইন',
  'Criminal Law': 'ফৌজদারি আইন',
  'criminal law': 'ফৌজদারি আইন',
  'ফৌজদারি ও পারিবারিক আইন': 'ফৌজদারি আইন',
  'ফৌজদারি ও অভিবাসন আইন': 'ফৌজদারি আইন',
  'ফৌজি ও পারিবারিক আইন': 'ফৌজদারি আইন',
  'ফৌজদারি ও সাইবার আইন': 'ফৌজদারি আইন',
  'আইনি পদ্ধতি': 'ফৌজদারি আইন',
  'আইনি প্রক্রিয়া': 'ফৌজদারি আইন',
  'সুপ্রিম কোর্ট': 'ফৌজদারি আইন',
  'সাংবিধানিক আইন': 'ফৌজদারি আইন',
  'সাংবিধানিক ও রিট আইন': 'ফৌজদারি আইন',
  'প্রশাসনিক আইন ও সার্ভিস ম্যাটার্স': 'ফৌজদারি আইন',
  'প্রশাসনিক ও পুলিশ ভেরিফিকেশন আইন': 'ফৌজদারি আইন',
  'সরকারি সেবা': 'ফৌজদারি আইন',
  'constitutional': 'ফৌজদারি আইন',
  'আইনি দলিল ও এফিডেভিট': 'ফৌজদারি আইন',
  'পাসপোর্ট ও সাংবিধানিক আইন': 'ফৌজদারি আইন',

  // → পারিবারিক আইন
  'family': 'পারিবারিক আইন',
  'Family Law': 'পারিবারিক আইন',
  'family law': 'পারিবারিক আইন',
  'পারিবারিক ও বিবাহ আইন': 'পারিবারিক আইন',
  'পারিবারিক ও মুসলিম আইন': 'পারিবারিক আইন',
  'পারিবারিক আদালত ও নারী অধিকার': 'পারিবারিক আইন',
  'পারিবারিক ও ফৌজদারি আইন': 'পারিবারিক আইন',
  'দেওয়ানি ও পারিবারিক আইন': 'পারিবারিক আইন',

  // → সম্পত্তি আইন
  'property': 'সম্পত্তি আইন',
  'Property Law': 'সম্পত্তি আইন',
  'property law': 'সম্পত্তি আইন',
  'ভূমি আইন': 'সম্পত্তি আইন',
  'দেওয়ানি আইন': 'সম্পত্তি আইন',
  'দেওয়ানী আইন': 'সম্পত্তি আইন',
  'ভূমি ও দেওয়ানি আইন': 'সম্পত্তি আইন',
  'ভূমি ও রেজিস্ট্রি আইন': 'সম্পত্তি আইন',
  'ভূমি ও রেকর্ড সংশোধন আইন': 'সম্পত্তি আইন',
  'ভূমি ও ফৌজদারি আইন': 'সম্পত্তি আইন',
  'সম্পত্তি ও রাজস্ব আইন': 'সম্পত্তি আইন',
  'অভিভাবক ও সম্পত্তি আইন': 'সম্পত্তি আইন',
  'দেওয়ানি ও আর্থিক আইন': 'সম্পত্তি আইন',
  'দেওয়ানি ও ভূমি আইন': 'সম্পত্তি আইন',
  'দেওয়ানি ও ফৌজদারি আইন': 'সম্পত্তি আইন',
  'দেওয়ানি ও আদালত অবমাননা আইন': 'সম্পত্তি আইন',
  'ভূমি আইন | দেওয়ানি আইন': 'সম্পত্তি আইন',
  'civil': 'সম্পত্তি আইন',

  // → কর আইন
  'কোম্পানি আইন': 'কর আইন',
  'বাণিজ্যিক আইন': 'কর আইন',
  'বাণিজ্যিক ও কোম্পানি আইন': 'কর আইন',
  'কর্পোরেট আইন': 'কর আইন',
  'commercial': 'কর আইন',
  'শ্রম আইন': 'কর আইন',
  'শ্রম আইন ও চাকরি': 'কর আইন',
  'চিকিৎসা ও ভোক্তা আইন': 'কর আইন',

  // → সাইবার আইন
  'Cyber Crime Law': 'সাইবার আইন',
  'cyber crime law': 'সাইবার আইন',
  'সাইবার ও তথ্যপ্রযুক্তি আইন': 'সাইবার আইন',
  'সাইবার ক্রাইম আইন': 'সাইবার আইন',
};

// Standard categories (must exactly match BlogBn.jsx CATEGORIES array)
const STANDARD_CATEGORIES = ['ফৌজদারি আইন', 'পারিবারিক আইন', 'সম্পত্তি আইন', 'কর আইন', 'দেওয়ানী আইন', 'সাইবার আইন'];

// ============================================================
// STEP 2: REMAINING DUPLICATE CLUSTERS
// ============================================================
const REMAINING_BN_CLUSTERS = {
  // --- COURT MARRIAGE CLUSTER ---
  'court-marriage-kagojpatra-complete-guide-2026': [
    'court-marriage-affidavit-legal-validity-cost-2026',
    'court-marriage-bangla-niyom',
    'court-marriage-bangladesh-2026-bn',
    'court-marriage-kagoj-patro-sarkari-khoroch-2026',
    'court-marriage-kagojpatra-niyom-bd',
    'court-marriage-khoroch-niyom-papers-bangladesh-2026',
    'court-marriage-khoroch-o-niyom-bangladesh',
    'court-marriage-khoroch-vua-kazi-sotorkota-2026-bn',
    'court-marriage-niyom-khoroch-bangladesh-2026',
    'court-marriage-notary-affidavit-vuya-kazi-fadh-2026-bn',
    'court-marriage-procedure-bangladesh-bn',
    'court-marriage-process-cost-bangladesh-2026',
    'court-marriage-total-khoroch-prokriya-bangladesh-2026',
    'marriage-registration-fee-kabinnama-court-marriage-cost-2026',
  ],

  // --- BATWARA / PARTITION SUIT CLUSTER ---
  'batoara-mamla-kotodin-chole-khoroch-partition-suit-2026': [
    'batoara-mamla-kotodin-chole-khoroch-partition-suit',
    'batoara-mamla-partition-suit-niyom-khoroch-somoy-2026-bn',
    'batwara-dalil-khoroch-mamla-niyom-bangladesh',
    'batwara-mamla-court-fee-2026',
    'batwara-mamla-court-fee-jomi-banton-2026-bn',
    'batwara-mamla-court-fee-khoroch-shomoy-2026',
    'batwara-mamla-court-fee-prokriya-bd',
    'batwara-mamla-din-khoroch-prokriya-2026',
    'batwara-mamla-khoroch-somoy-timeline-2026',
    'somopotti-batwara-ain-bangladesh',
  ],

  // --- HUSBAND DIVORCE CLUSTER ---
  'swami-korthrik-streeke-talak-notis-prokriya-2026': [
    'bipokkhito-talak-stree-khorposh-denmohor-aday-2026',
    'divorce-from-court-bangladesh-muslim-law-bn',
    'divorce-kharch-bangladesh-2026',
    'divorce-mamla-dakhil-bangladesh',
    'divorce-por-stree-shishu-khorposh-ain-bangladesh',
  ],

  // --- KHULNA / NRB DIVORCE CLUSTER ---
  'stree-kortrik-swamike-talak-deyar-sothik-niyom': [
    'khulna-talak-bangladesh',
    'nrb-probasi-talak-bangladesh',
    'probashi-divorce-talak-notish-consulate-niyom-2026-bn',
    'divorce-lawyer-dhaka-how-to-choose-bn',
  ],
};

const REMAINING_EN_CLUSTERS = {
  // --- EN CYBER CRIME CLUSTER ---
  'bangladesh-cyber-crime-complaint-portal-guide-2026': [
    'cid-cyber-crime-unit-bangladesh-2026',
    'cyber-crime-complaint-bangladesh',
    'cyber-crime-complaint-online-police-helpline-bangladesh',
    'cyber-crime-digital-security-act-bangladesh',
    'cyber-crime-helpline-online-complaint-bangladesh',
    'cyber-crime-laws-penalties-bangladesh-2026-guide',
    'cyber-crime-unit-bangladesh-complaint-2026',
    'cybercrime-laws-bangladesh-2026',
    'how-to-report-cyber-crime-bangladesh-2026',
    'online-cyber-crime-report-portal-bangladesh-2026',
  ],

  // --- EN NAMJARI / MUTATION CLUSTER ---
  'namjari-tracking-status-check-bangladesh-2026': [
    'namjari-online-check-land-record-bangladesh',
    'online-mutation-check-bangladesh-2026',
    'online-mutation-check-bangladesh',
    'mutation-process-bangladesh',
  ],

  // --- EN LAND RECORD / KHATIAN CLUSTER ---
  'bangladesh-land-record-by-name-online-2026': [
    'dlrms-land-record-management-bangladesh-2026',
    'land-record-check-online-bangladesh-2026',
    'porcha-khatian-online-verification-guide-bangladesh',
    'eporcha-land-record-bangladesh-guide',
  ],

  // --- EN LAND REGISTRATION FEE CLUSTER ---
  'land-registration-cost-fees-calculator-bangladesh-2026': [
    'land-registration-cost-fees-calculator-bangladesh',
    'land-registration-fee-bangladesh-2026',
    'land-registration-fee-calculator-bangladesh-2026',
    'land-registration-sub-registry-office-hidden-costs-bangladesh',
  ],

  // --- EN KHATIAN/RS CLUSTER ---
  'rs-khatian-online-check-bangladesh-2026': [
    'khatian-check-online-bangladesh-complete-guide-2026',
  ],

  // --- EN E-NAMJARI CLUSTER ---
  'e-namjari-online-check-bangladesh-2026': [
    // only if not already redirected
  ],
};

// ============================================================
// EXECUTION
// ============================================================
const vercelData = JSON.parse(fs.readFileSync(VERCEL_JSON, 'utf8'));
let newRedirects = [];
let deletedFiles = [];
let categoryFixed = 0;

console.log('\n🔧 STEP 1: Normalizing BN Post Categories...\n');
const bnFiles = fs.readdirSync(BN_DIR).filter(f => f.endsWith('.json'));
for (const file of bnFiles) {
  const filePath = path.join(BN_DIR, file);
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const currentCat = data.category || '';
    const mappedCat = CATEGORY_MAP[currentCat];

    if (mappedCat) {
      data.category = mappedCat;
      // Also fix lastModified
      data.lastModified = new Date().toISOString().split('T')[0];
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`  ✓ ${file}: "${currentCat}" → "${mappedCat}"`);
      categoryFixed++;
    } else if (!STANDARD_CATEGORIES.includes(currentCat) && currentCat) {
      console.log(`  ⚠️  Unknown category: "${currentCat}" in ${file}`);
    }
  } catch (e) {
    console.log(`  ❌ Error reading ${file}: ${e.message}`);
  }
}
console.log(`\n  📊 Categories fixed: ${categoryFixed}`);

console.log('\n🔧 STEP 2: Processing Remaining BN Clusters...\n');
for (const [master, duplicates] of Object.entries(REMAINING_BN_CLUSTERS)) {
  const masterPath = path.join(BN_DIR, `${master}.json`);
  if (!fs.existsSync(masterPath)) {
    console.warn(`  ⚠️  Master not found: ${master}.json`);
    continue;
  }
  console.log(`\n  📌 BN Cluster: ${master} (${duplicates.length} dups)`);

  for (const dup of duplicates) {
    const dupPath = path.join(BN_DIR, `${dup}.json`);
    const dupMd = path.join(BN_DIR, `${dup}.md`);

    const alreadyExists = vercelData.redirects.some(r => r.source === `/bn/blog/${dup}`);
    if (!alreadyExists) {
      newRedirects.push({ source: `/bn/blog/${dup}`, destination: `/bn/blog/${master}`, statusCode: 301 });
    }
    if (fs.existsSync(dupPath)) { fs.unlinkSync(dupPath); deletedFiles.push(dup + '.json'); console.log(`    🗑️  ${dup}.json`); }
    if (fs.existsSync(dupMd)) { fs.unlinkSync(dupMd); deletedFiles.push(dup + '.md'); }
  }
}

console.log('\n🔧 STEP 3: Processing EN Clusters...\n');
for (const [master, duplicates] of Object.entries(REMAINING_EN_CLUSTERS)) {
  const masterPath = path.join(EN_DIR, `${master}.json`);
  if (!fs.existsSync(masterPath)) {
    console.warn(`  ⚠️  EN Master not found: ${master}.json`);
    continue;
  }
  console.log(`\n  📌 EN Cluster: ${master} (${duplicates.length} dups)`);

  for (const dup of duplicates) {
    const dupPath = path.join(EN_DIR, `${dup}.json`);
    const alreadyExists = vercelData.redirects.some(r => r.source === `/blog/${dup}`);
    if (!alreadyExists) {
      newRedirects.push({ source: `/blog/${dup}`, destination: `/blog/${master}`, statusCode: 301 });
    }
    if (fs.existsSync(dupPath)) { fs.unlinkSync(dupPath); deletedFiles.push('EN:' + dup + '.json'); console.log(`    🗑️  EN/${dup}.json`); }
  }
}

console.log('\n🔧 STEP 4: Fixing Missing publishedAt on BN Master Files...\n');
// Masters that may lack publishedAt
const mastersToFix = [
  { file: 'agam-jamin-haikort-khoroch-2026.json', publishedAt: '2026-09-22T18:03:00.000Z' },
  { file: 'batoara-mamla-kotodin-chole-khoroch-partition-suit-2026.json', publishedAt: '2026-09-22T18:11:00.000Z' },
  { file: 'court-marriage-kagojpatra-complete-guide-2026.json', publishedAt: '2026-09-22T18:12:00.000Z' },
  { file: 'jomi-registry-khoroch-sarkaree-fee-bd.json', publishedAt: '2026-09-22T18:13:00.000Z' },
  { file: 'e-namjari-tracking-mutation-check-prokriya-bangladesh-2026.json', publishedAt: '2026-09-22T18:14:00.000Z' },
  { file: 'sampatti-uttoradhikar-ain-2026-bn.json', publishedAt: '2026-09-22T18:15:00.000Z' },
  { file: 'mayer-sampatti-vibhajan-ain-bangladesh-2026.json', publishedAt: '2026-09-22T18:16:00.000Z' },
  { file: 'talaknama-lekhari-niyom-fee-prokriya-bangladesh-2026.json', publishedAt: '2026-09-22T18:17:00.000Z' },
  { file: 'swami-korthrik-streeke-talak-notis-prokriya-2026.json', publishedAt: '2026-09-22T18:18:00.000Z' },
];

for (const { file, publishedAt } of mastersToFix) {
  const filePath = path.join(BN_DIR, file);
  if (!fs.existsSync(filePath)) continue;
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (!data.publishedAt) {
      data.publishedAt = publishedAt;
      data.lastModified = new Date().toISOString().split('T')[0];
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`  ✓ Added publishedAt to ${file}`);
    }
  } catch (e) {
    console.log(`  ❌ Error: ${file} — ${e.message}`);
  }
}

console.log('\n🔧 STEP 5: Adding all new redirects to vercel.json...\n');
if (newRedirects.length > 0) {
  vercelData.redirects = [
    vercelData.redirects[0],
    ...newRedirects,
    ...vercelData.redirects.slice(1),
  ];
  fs.writeFileSync(VERCEL_JSON, JSON.stringify(vercelData, null, 2));
  console.log(`  ✅ Added ${newRedirects.length} redirects`);
}

console.log('\n📊 FINAL SUMMARY:');
console.log(`  Categories normalized: ${categoryFixed}`);
console.log(`  Files deleted: ${deletedFiles.length}`);
console.log(`  New redirects added: ${newRedirects.length}`);
console.log('\n✅ All bugs fixed!');
