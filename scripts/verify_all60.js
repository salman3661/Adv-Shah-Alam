const fs = require('fs');

async function verifyAll60() {
  const sitemapXml = fs.readFileSync('public/sitemap.xml', 'utf8');
  
  // All 60 topics
  const topics = [
    // Batch 1 (1-20)
    { id: 1, bn: 'jomi-kharid-dalil-check-dhaka-bangladesh', en: 'land-purchase-document-verification-dhaka-bangladesh' },
    { id: 2, bn: 'e-namjari-tracking-status-khatian-check-2026', en: 'e-namjari-online-mutation-tracking-bangladesh' },
    { id: 3, bn: 'flat-apartment-registration-fee-bangladesh', en: 'flat-apartment-registration-fee-bangladesh' },
    { id: 4, bn: 'power-of-attorney-land-transfer-bangladesh-bn', en: 'power-of-attorney-property-transfer-registration-bangladesh' },
    { id: 5, bn: 'cheque-bounce-recovery-notice-procedure-section-138-ni-act', en: 'cheque-bounce-recovery-notice-procedure-section-138-ni-act' },
    { id: 6, bn: 'high-court-anticipatory-bail-cost-procedure-2026', en: 'high-court-anticipatory-bail-cost-procedure-2026' },
    { id: 7, bn: 'divorce-lawyer-dhaka-how-to-choose-bn', en: 'divorce-lawyer-dhaka-how-to-choose' },
    { id: 8, bn: 'talaknama-lekhari-niyom-fee-prokriya-bangladesh-2026', en: 'how-to-send-divorce-notice-bangladesh-step-by-step' },
    { id: 9, bn: 'child-custody-shishu-hifazat-father-mother-rights-2026-bn', en: 'child-custody-law-bangladesh' },
    { id: 10, bn: 'denmohar-aday-family-court-ain-bangladesh', en: 'wife-rights-after-divorce-bangladesh' },
    { id: 11, bn: 'mithya-nari-nirjaton-mamla-protirodh-defense-2026-bn', en: 'false-dowry-cases-defense-bangladesh' },
    { id: 12, bn: 'madak-mamlar-jamin-prokriya-bangladesh-2026', en: 'narcotics-case-bail-procedure-bangladesh' },
    { id: 13, bn: 'cyber-blackmail-fake-id-complaint-niyom-bangladesh', en: 'cyber-harassment-facebook-gd-procedure-bangladesh' },
    { id: 14, bn: 'mobile-banking-bkash-nagad-fraud-complaint-2026-bn', en: 'bkash-nagad-online-fraud-police-complaint-bangladesh' },
    { id: 15, bn: 'wrongful-termination-labour-law-bangladesh', en: 'wrongful-termination-labour-law-bangladesh' },
    { id: 16, bn: 'baba-mayer-sampatti-bon-bhai-bhag-faraiz-hisab-2026', en: 'muslim-inheritance-calculator-shares-bangladesh' },
    { id: 17, bn: 'rs-khatian-check-vua-porcha-chenar-upay-2026-bn', en: 'rs-khatian-online-check-bangladesh-2026' },
    { id: 18, bn: 'income-tax-return-filing-notice-appeal-2026-bn', en: 'income-tax-return-filing-appeal-bangladesh-2026' },
    { id: 19, bn: 'business-partnership-agreement-drafting-registration-bd', en: 'business-partnership-agreement-drafting-registration-bd' },
    { id: 20, bn: 'writ-petition-haikort-dhap-khoroch-2026', en: 'writ-petition-high-court-bangladesh-grounds-procedure' },
    // Batch 2 (21-40)
    { id: 21, bn: 'jomi-dakhol-punoruddhar-ain-2026', en: 'land-dispute-legal-remedies-bangladesh' },
    { id: 22, bn: 'nabalok-sampatti-bikroy-court-permission-bangladesh', en: 'nabalok-sampatti-bikroy-court-order-bd' },
    { id: 23, bn: 'dhaka-court-marriage-process-cost-bangladesh-2026', en: 'court-marriage-procedure-bangladesh' },
    { id: 24, bn: 'stree-korthrik-talak-tawfeez-denmohor-2026-bn', en: 'khula-divorce-wife-rights-bangladesh' },
    { id: 25, bn: 'paona-taka-aday-ortho-jari-mamla-bangladesh', en: 'money-recovery-suit-bangladesh-process-timeline' },
    { id: 26, bn: '54-dhara-grepthar-remand-rights-bangladesh', en: 'section-54-crpc-arrest-bangladesh' },
    { id: 27, bn: 'police-complaint-hoirani-ain-prokriya-bangladesh-2026', en: 'how-to-stop-false-criminal-case-bangladesh' },
    { id: 28, bn: 'trademark-brand-logo-registration-bangladesh', en: 'trademark-registration-bangladesh' },
    { id: 29, bn: 'company-formation-rjsc-registration-dhaka-bangladesh', en: 'company-formation-rjsc-registration-dhaka-bangladesh' },
    { id: 30, bn: 'bhara-tikki-bibad-bangladesh', en: 'tenant-eviction-rent-control-bangladesh' },
    { id: 31, bn: 'dwiteya-bibaha-ain-prothom-stree-odhikar-2026-bn', en: 'second-marriage-wife-rights-bangladesh' },
    { id: 32, bn: 'warish-sanad-orashinamah-sangraha-niyom-2026-bn', en: 'inheritance-law-bangladesh-legal-shares' },
    { id: 33, bn: 'thana-jidi-korar-niyom-bangladesh-bn', en: 'how-to-file-gd-bangladesh-police-station' },
    { id: 34, bn: 'police-remand-rights-constitutional-guarantee-2026-bn', en: 'police-remand-rights-bangladesh' },
    { id: 35, bn: 'yautuk-dowry-ain-bangladesh-bn', en: 'dowry-law-bangladesh' },
    { id: 36, bn: 'ghoroa-nir-jatan-suraksha-adesh-bangladesh', en: 'domestic-violence-law-bangladesh' },
    { id: 37, bn: 'probasi-nrb-jomi-rokha-byabasthapona-bangladesh', en: 'dlrms-land-record-management-bangladesh-2026' },
    { id: 38, bn: 'will-osiyotnama-heba-dalil-batil-rules', en: 'will-osiyotnama-heba-dalil-batil-rules' },
    { id: 39, bn: 'adalat-adesh-challenge-revision-bangladesh', en: 'challenge-court-order-revision-review-bangladesh' },
    { id: 40, bn: 'khatian-bhul-songshodhon-miss-case-prokriya-2026-bn', en: 'khatian-correction-miss-case-procedure-bangladesh' },
    // Batch 3 (41-60)
    { id: 41, bn: 'vet-ain-compliance-bangladesh', en: 'vat-registration-return-bangladesh' },
    { id: 42, bn: 'warant-samons-bivaad-bangladesh', en: 'warrant-vs-summons-bangladesh' },
    { id: 43, bn: 'business-contract-violation-mamla-bangladesh', en: 'contract-breach-legal-action-bangladesh' },
    { id: 44, bn: 'khas-jomi-chenar-upay-bondobasto-niyom-bangladesh', en: 'khas-land-claim-bangladesh' },
    { id: 45, bn: 'krishi-jomi-conversion-niyom-bangladesh', en: 'agricultural-land-conversion-commercial-rules-bangladesh' },
    { id: 46, bn: 'bap-dada-sampatti-bon-bhai-orashan-banton-2026', en: 'ancestral-property-partition-bangladesh' },
    { id: 47, bn: 'cheque-bounce-138-ni-act-legal-notice-2026-bn', en: 'cheque-dishonour-legal-notice-timeline-bangladesh' },
    { id: 48, bn: 'high-court-bail-cancellation-stay-order-procedure-2026', en: 'bail-cancellation-stay-order-high-court-bangladesh' },
    { id: 49, bn: 'stree-dara-swami-talak-prokriya-bangladesh-2026', en: 'talaq-e-tawfeez-delegated-divorce-wife-bangladesh' },
    { id: 50, bn: 'somopotti-batwara-ain-bangladesh', en: 'partition-suit-land-division-cost-bangladesh' },
    { id: 51, bn: 'nari-nirjaton-daman-ain-mithya-mamla-defend', en: 'nari-o-shishu-nirjatan-daman-ain-defense-bangladesh' },
    { id: 52, bn: 'madok-drobbo-control-act-2018-bail-guide-bangladesh', en: 'narcotics-control-act-2018-bail-provisions-bangladesh' },
    { id: 53, bn: 'cyber-crime-facebook-account-hack-police-report-2026', en: 'facebook-account-hack-cyber-crime-report-bangladesh' },
    { id: 54, bn: 'bank-taka-pratarana-cyber-remedies-bangladesh-2026', en: 'financial-cyber-crime-bank-fraud-remedies-bangladesh' },
    { id: 55, bn: 'shram-ain-job-termination-gratuity-aday-bangladesh', en: 'labour-law-bangladesh-gratuity-provident-fund-claims' },
    { id: 56, bn: 'mayer-sampatti-banton-ain-faraiz-hisab-2026-bn', en: 'mothers-property-distribution-muslim-law-bangladesh' },
    { id: 57, bn: 'namjari-khatian-check-online-prokriya-bangladesh', en: 'porcha-khatian-online-verification-guide-bangladesh' },
    { id: 58, bn: 'tax-appeal-tribunal-high-court-reference-bangladesh-2026', en: 'tax-appeal-tribunal-process-bangladesh' },
    { id: 59, bn: 'trademark-infringement-counterfeit-goods-lawsuit-bangladesh', en: 'trademark-infringement-counterfeiting-remedies-bangladesh' },
    { id: 60, bn: 'rit-petition-ki-haikort-prokriya-khoroch-bangladesh', en: 'writ-mandamus-certiorari-habeas-corpus-bangladesh' }
  ];

  console.log(`Verifying all ${topics.length} topics in Sitemap...`);
  let bnInSitemap = 0;
  let enInSitemap = 0;
  
  topics.forEach(t => {
    const bnUrl = `https://www.advmdshahalam.me/bn/blog/${t.bn};`;
    const bnClean = `https://www.advmdshahalam.me/bn/blog/${t.bn}`;
    const enClean = `https://www.advmdshahalam.me/blog/${t.en}`;
    
    if (sitemapXml.includes(bnClean)) bnInSitemap++;
    if (sitemapXml.includes(enClean)) enInSitemap++;
  });

  console.log(`BN URLs in Sitemap: ${bnInSitemap}/${topics.length}`);
  console.log(`EN URLs in Sitemap: ${enInSitemap}/${topics.length}`);
}

verifyAll60().catch(console.error);
