const fs = require('fs');

// Check exact bytes near metaTitle in LandLawyer.jsx
const land = fs.readFileSync('src/pages/services/LandLawyer.jsx', 'utf8');
const idx = land.indexOf('metaTitle=');
if (idx !== -1) {
    const slice = land.substring(idx, idx + 120);
    console.log('LandLawyer metaTitle value:', slice);
    // Find any non-ASCII chars
    const bytes = Buffer.from(slice, 'utf8');
    const hexParts = [];
    for (let i = 0; i < Math.min(bytes.length, 150); i++) {
        if (bytes[i] > 127) hexParts.push(i + ':' + bytes[i].toString(16));
    }
    console.log('Non-ASCII byte positions:', hexParts.join(', '));
}

// Check blog posts - find the exact metaTitle  
const blog = fs.readFileSync('src/data/blogPosts.js', 'utf8');
const bails = ['bail-process-bangladesh', 'divorce-procedure-bangladesh', 'land-dispute-case-bangladesh'];
bails.forEach(slug => {
    const idx = blog.indexOf("slug: '" + slug + "'");
    if (idx !== -1) {
        const slice = blog.substring(idx, idx + 300);
        const titleMatch = slice.match(/metaTitle:\s*'([^']+)'/);
        console.log('\n' + slug + ':');
        console.log('  metaTitle:', titleMatch ? titleMatch[1] : 'NOT FOUND');
    }
});
