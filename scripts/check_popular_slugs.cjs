const fs = require('fs');
const path = require('path');

const enDir = 'src/content/posts/en';
const bnDir = 'src/content/posts/bn';

const enFiles = new Set(fs.readdirSync(enDir).map(f => f.replace('.json', '')));
const bnFiles = new Set(fs.readdirSync(bnDir).map(f => f.replace('.json', '')));

const POPULAR_SLUGS = [
    'anticipatory-bail-bangladesh',
    'land-dispute-case-bangladesh',
    'divorce-process-bangladesh-complete-guide',
    'how-to-file-divorce-bangladesh',
    'child-custody-2026-bangladesh',
    '138-ni-act-bangladesh-cheque-case-guide',
    'property-registration-process-bangladesh',
    'how-to-challenge-false-criminal-case-bangladesh',
    'muslim-divorce-law-bangladesh',
    'supreme-court-writ-petition-bangladesh',
];

const POPULAR_BN_SLUGS = [
    'jomi-nondoner-ain-bangladesh-bn',
    'rs-survey-bangladesh-bn',
    'talak-procedure-bangladesh-bn',
    'child-custody-bangladesh-bn',
    'yautuk-dowry-ain-bangladesh-bn',
    'family-court-bangladesh-bn',
    'land-mutation-porcha-bangladesh-bn',
    'anticipatory-bail-bangladesh-bn',
    'divorce-notice-bangladesh-bn',
    'wrongful-termination-labour-law-bangladesh-bn',
];

console.log('Checking POPULAR_SLUGS:');
for (const s of POPULAR_SLUGS) {
  console.log(`EN: ${s} -> exists: ${enFiles.has(s)}`);
}

console.log('Checking POPULAR_BN_SLUGS:');
for (const s of POPULAR_BN_SLUGS) {
  console.log(`BN: ${s} -> exists: ${bnFiles.has(s)}`);
}
