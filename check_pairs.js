const fs = require('fs');
const fileContent = fs.readFileSync('./src/data/blogPostsBn.js', 'utf-8');
const evalContent = fileContent
    .replace(/export\s+default\s+postsBn;/, 'module.exports = postsBn;')
    .replace(/export\s+const\s+isPublishedBn/, 'const isPublishedBn');
fs.writeFileSync('./temp3.js', evalContent);
const posts = require('./temp3.js');

const my15EnSlugs = [
    'hire-criminal-lawyer-bangladesh',
    'how-to-file-divorce-petition-bangladesh',
    'land-registration-fees-process-bangladesh',
    'company-registration-cost-bangladesh',
    'writ-petition-high-court-guide-bangladesh',
    'mahr-dower-rights-wife-bangladesh',
    'quash-false-case-bangladesh',
    'hire-cyber-crime-lawyer-bangladesh',
    'bail-cost-criminal-case-bangladesh',
    'tenant-landlord-dispute-bangladesh',
    'police-complaint-harassment-bangladesh',
    'succession-certificate-process-bangladesh',
    'contract-breach-legal-action-bangladesh',
    'domestic-violence-legal-protection-bangladesh',
    'company-director-liability-bangladesh'
];

let existing = posts.filter(p => my15EnSlugs.includes(p.enSlug));
console.log("Existing pairs: " + existing.map(p => p.enSlug).join(', '));
fs.unlinkSync('./temp3.js');
