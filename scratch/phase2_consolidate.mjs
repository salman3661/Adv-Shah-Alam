/**
 * Phase 2: Content Cluster Consolidation
 * 
 * This script:
 * 1. Lists all duplicate slugs per cluster
 * 2. Adds 301 redirects to vercel.json
 * 3. Deletes duplicate JSON files (master files are preserved)
 * 
 * Run: node scratch/phase2_consolidate.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const BN_DIR = path.join(ROOT, 'src/content/posts/bn');
const VERCEL_JSON = path.join(ROOT, 'vercel.json');

// ============================================================
// CLUSTER DEFINITIONS
// Master slug → list of duplicate slugs to redirect + delete
// ============================================================
const CLUSTERS = {
  // --- CHEQUE / NI ACT 138 CLUSTER ---
  'cheque-dishonour-legal-notice-pathanor-niyom-ni-act': [
    '138-dhara-cheque-bounce-jamin-joggo-kina-2026',
    '138-dhara-cheque-dishonour-bail-punishment-bd',
    'check-bounce-138-ni-act-vs-420-dhara-case-study-2026-bn',
    'check-bounce-niyom-jamin-2026-notun',
    'chek-bounce-138-ni-act-mamla-jamin-saja-bd',
    'chek-dishonour-138-ni-act-taka-adai-prokriya-2026-bn',
    'cheque-bounce-138-ni-act-legal-notice-2026-bn',
    'cheque-bounce-legal-notice-cr-case-bd',
    'cheque-bounce-legal-notice-format-recovery-bangladesh-2026',
    'cheque-dishonar-notis-dhap-2026',
    'cheque-dishonour-138-ni-act-taka-adai-niyom',
    'cheque-dishonour-bangladesh-bn',
    'cheque-dishonour-case-138-ni-act-prokriya-bangladesh',
    'cheque-dishonour-case-bangladesh-bn',
    'cheque-dishonour-case-law-bangladesh-bn',
    'cheque-dishonour-notis-shomoy-niyom-2026',
    'ngo-shomobay-rin-blank-cheque-shud-protikar-2026-bn',
    'shakkhorito-faka-cheque-hariye-gele-ain-2026-bn',
  ],

  // --- AGAM JAMIN / ANTICIPATORY BAIL CLUSTER ---
  'agam-jamin-haikort-khoroch-2026': [
    'anticipatory-bail-agham-jamin-haikort-bangladesh',
    'anticipatory-bail-bangladesh-bn',
    'haikort-agam-jamin-khoroch-niyom-2026',
    'haikort-agham-jamin-prokriya-2026-bn',
    'haikort-agham-jamin-prokriya-rules-bd',
    'high-court-agam-jamin-anticipatory-bail-khoroch-2026',
    'high-court-agam-jamin-anticipatory-bail-khoroch',
    'high-court-agam-jamin-niyom-khoroch-2026',
    'high-court-agham-jamin-bangladesh-bn',
    'high-court-agham-jamin-khoroch-niyom-2026-bn',
    'high-court-anticipatory-bail-cost-procedure-2026',
  ],

  // --- STREE TALAK / WIFE DIVORCE CLUSTER ---
  'stree-kortrik-swamike-talak-deyar-sothik-niyom': [
    'stree-dara-swami-talak-prokriya-bangladesh-2026',
    'stree-korthrik-swamike-divorce-talak-tawfiz-niyom-2026',
    'stree-korthrik-swamike-talak-denmohor-niyom-2026',
    'stree-korthrik-talak-dewar-niyom-bangladesh',
    'stree-korthrik-talak-tawfeez-denmohor-2026-bn',
    'stree-swami-talak-dite-parbe-bangladesh-ain-2026',
    'stree-talak-notish-denmohor-aday-shamir-atmorokkha-2026-bn',
    'swamike-talak-dewar-niyom-stree-odhikar-bangladesh',
    'swamike-talak-dewar-niyom-talak-tawfeez',
  ],

  // --- TALAKNAMA WRITING CLUSTER (separate from wife divorce) ---
  'talaknama-lekhari-niyom-fee-prokriya-bangladesh-2026': [
    'talaknama-kivabe-likhben-form-niyom-2026',
    'talaknama-lekhar-niyom-form-notiish-bd',
    'talaknama-lekhar-sahih-niyom-2026',
    'talak-name-prokriya-bangladesh-bn',
    'talak-dewa-niyom-bangladesh',
    'swami-talak-dewa-niyom-2026',
    'swami-stree-talak-notice-niyom-dhap-2026',
    'divorce-process-bangladesh-bn',
    'divorce-procedure-bangladesh-bn',
  ],

  // --- JOMI REGISTRY KHOROCH CLUSTER ---
  'jomi-registry-khoroch-sarkaree-fee-bd': [
    'jomi-registry-khoroch-calculator-stamp-shulko-2026',
    'jomi-registry-khoroch-calculator-stamp-shulko',
    'jomi-registry-motel-khoroch-hisab-2026',
    'jomi-nibandhon-fee-2026-bn',
    'jomi-registration-bangladesh-bn',
    'land-registration-fee-calculator-bangladesh-2026',
    'paurosabha-elakay-jomi-registry-khoroch-hisab-2026',
  ],

  // --- E-NAMJARI / MUTATION CLUSTER ---
  'e-namjari-tracking-mutation-check-prokriya-bangladesh-2026': [
    'e-namjari-tracking-online-check-bd',
    'e-namjari-tracking-status-check-online-mutation-2026',
    'e-namjari-tracking-status-check-online-mutation',
    'namjari-khatian-check-online-prokriya-bangladesh',
    'namjari-online-check-korar-niyom-2026-complete',
    'namjari-tracking-check-bangladesh-2026',
    'online-mutation-check-bangladesh-2026-bn',
    'online-namjari-tracking-check-2026',
    'online-namzari-application-tracking-mutation-correction-2026',
    'land-mutation-check-online-2026',
    'land-mutation-procedure-bangladesh-bn',
    'mutation-obostha-check-2026-complete',
    'miss-case-namjari-batil-prokriya-ac-land-2026-bn',
  ],

  // --- INHERITANCE / SAMPATTI BANTON CLUSTER ---
  'sampatti-uttoradhikar-ain-2026-bn': [
    'baba-mayer-sampatti-bon-bhai-bhag-faraiz-hisab-2026',
    'baba-sampatti-vantan-ain-bangladesh-2026',
    'babar-sampatti-banton-ain-bangladesh-2026',
    'babar-sampatti-banton-ain-bangladesh',
    'babar-sampatti-banton-faraiz-hisab-bd',
    'babar-sampattite-meyer-adhikar-faraiz-ain-2026-bn',
    'babar-sampattite-meyer-adhikar-farayez-ain-2026',
    'inheritance-law-bangladesh-bn',
    'mrito-babar-sampatti-banton-faraiz-hisab-2026',
  ],

  // --- MAYER SAMPATTI (MOTHER'S PROPERTY) CLUSTER ---
  'mayer-sampatti-vibhajan-ain-bangladesh-2026': [
    'mayer-sampatti-vibhajan-ain-faraiz-hisab-2026',
    'mayer-sampatti-vibhajan-ain-faraiz-hisab',
    'mayer-sampatti-vibhajan-ain-shathik-niyom',
    'maer-sampatti-bhager-niyom-faraiz-ain-bangladesh',
    'mayer-paitrik-sampatti-mama-bhagne-bhag-faraiz-2026-bn',
    'mayer-sampatti-banton-ain-faraiz-hisab-2026-bn',
    'mayer-sampatti-theke-chele-meyer-odhikar-2026',
    'jibito-mayer-sampatti-vager-ain-adhikar-2026',
  ],
};

// ============================================================
// EXECUTION
// ============================================================

const vercelData = JSON.parse(fs.readFileSync(VERCEL_JSON, 'utf8'));
let newRedirects = [];
let deletedFiles = [];
let notFoundFiles = [];

for (const [master, duplicates] of Object.entries(CLUSTERS)) {
  const masterPath = path.join(BN_DIR, `${master}.json`);
  if (!fs.existsSync(masterPath)) {
    console.warn(`⚠️  Master not found: ${master}.json — skipping cluster`);
    continue;
  }

  console.log(`\n📌 Processing cluster: ${master}`);
  console.log(`   Duplicates to merge: ${duplicates.length}`);

  for (const dup of duplicates) {
    const dupPath = path.join(BN_DIR, `${dup}.json`);
    const dupMdPath = path.join(BN_DIR, `${dup}.md`);

    // Check if redirect already exists
    const alreadyExists = vercelData.redirects.some(
      r => r.source === `/bn/blog/${dup}`
    );

    if (!alreadyExists) {
      newRedirects.push({
        source: `/bn/blog/${dup}`,
        destination: `/bn/blog/${master}`,
        statusCode: 301,
      });
    } else {
      console.log(`   ↩️  Redirect already exists: /bn/blog/${dup}`);
    }

    // Delete duplicate JSON
    if (fs.existsSync(dupPath)) {
      fs.unlinkSync(dupPath);
      deletedFiles.push(dup + '.json');
      console.log(`   🗑️  Deleted: ${dup}.json`);
    } else {
      notFoundFiles.push(dup + '.json');
      console.log(`   ℹ️  Not found (skip): ${dup}.json`);
    }

    // Delete duplicate MD if exists
    if (fs.existsSync(dupMdPath)) {
      fs.unlinkSync(dupMdPath);
      deletedFiles.push(dup + '.md');
      console.log(`   🗑️  Deleted: ${dup}.md`);
    }
  }
}

// Add new redirects at the beginning of the redirects array (after host redirect)
if (newRedirects.length > 0) {
  vercelData.redirects = [
    vercelData.redirects[0], // keep the non-www host redirect first
    ...newRedirects,
    ...vercelData.redirects.slice(1),
  ];
  fs.writeFileSync(VERCEL_JSON, JSON.stringify(vercelData, null, 2));
  console.log(`\n✅ Added ${newRedirects.length} new redirects to vercel.json`);
} else {
  console.log('\n✅ No new redirects needed');
}

console.log(`\n📊 Summary:`);
console.log(`   Deleted files: ${deletedFiles.length}`);
console.log(`   New redirects added: ${newRedirects.length}`);
console.log(`   Files not found (already cleaned): ${notFoundFiles.length}`);
console.log('\n🎉 Phase 2 content consolidation complete!');
