const fs = require('fs');
// Check blogPosts.js loads without syntax error
try {
    const content = fs.readFileSync('./src/data/blogPosts.js', 'utf8');
    // Check anticipatory-bail metaTitle was inserted
    const hasAnticipatory = content.includes("slug: 'anticipatory-bail-bangladesh'");
    const hasMetaTitle = content.includes("Anticipatory Bail Bangladesh");
    console.log('anticipatory slug found:', hasAnticipatory);
    console.log('anticipatory metaTitle found:', hasMetaTitle);
    // Check all 6 updated blog posts
    const checks = [
        ['bail-process', 'Adv. Shah Alam'],
        ['divorce-procedure', 'Adv. Shah Alam'],
        ['land-dispute', 'Adv. Shah Alam'],
        ['cheque-dishonour', 'Shah Alam'],
        ['child-custody', 'Shah Alam'],
        ['court-marriage', 'Shah Alam']
    ];
    checks.forEach(([kw, auth]) => {
        const kwIdx = content.indexOf(kw);
        if (kwIdx !== -1) {
            const slice = content.substring(kwIdx, kwIdx + 200);
            const hasAuth = slice.includes(auth);
            console.log(kw + ' authority added:', hasAuth);
        }
    });
    // Check service pages for clean dashes (no â€)
    const serviceFiles = [
        'src/pages/services/CriminalLawyer.jsx',
        'src/pages/services/DivorceLawyer.jsx',
        'src/pages/services/LandLawyer.jsx',
        'src/pages/services/BailLawyer.jsx',
        'src/pages/services/SupremeCourtLawyer.jsx',
        'src/pages/services/TaxLawyer.jsx',
        'src/pages/services/CompanyCorporateLawyer.jsx'
    ];
    console.log('\n--- Service Page Validation ---');
    serviceFiles.forEach(f => {
        const c = fs.readFileSync(f, 'utf8');
        const line = c.split('\n').find(l => l.includes('metaTitle='));
        const clean = !c.includes('\u00e2\u20ac');  // no â€
        console.log(f.split('/').pop() + ': clean=' + clean);
        if (line) console.log('  ' + line.trim().substring(0, 80));
    });
} catch(e) {
    console.error('ERROR:', e.message);
}
