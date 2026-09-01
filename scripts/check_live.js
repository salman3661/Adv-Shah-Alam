const fs = require('fs');

async function test() {
  console.log('=== CHECKING LIVE PRODUCTION STATUS ===');
  
  // 1. Check sitemap
  const sitemapRes = await fetch('https://www.advmdshahalam.me/sitemap.xml');
  const sitemapXml = await sitemapRes.text();
  const sitemapCount = (sitemapXml.match(/<loc>/g) || []).length;
  console.log('1. Live Sitemap URLs count:', sitemapCount);
  
  // Sample checks
  const samples = [
    'https://www.advmdshahalam.me/bn/blog/thana-jidi-korar-niyom-bangladesh-bn',
    'https://www.advmdshahalam.me/bn/blog/denmohar-aday-family-court-ain-bangladesh',
    'https://www.advmdshahalam.me/bn/blog/flat-apartment-registration-fee-bangladesh'
  ];
  samples.forEach(s => {
    console.log(`   - ${s} in sitemap: ${sitemapXml.includes(s) ? '✅ YES' : '❌ NO'}`);
  });

  // 2. Check live home & assets
  const pageRes = await fetch('https://www.advmdshahalam.me/bn/blog');
  const html = await pageRes.text();
  console.log('2. Live /bn/blog response code:', pageRes.status);

  // Check dist files locally
  const distFiles = fs.readdirSync('dist/assets');
  const bpBnFile = distFiles.find(f => f.startsWith('BlogPostBn-') && f.endsWith('.js'));
  if (bpBnFile) {
    const jsContent = fs.readFileSync(`dist/assets/${bpBnFile}`, 'utf8');
    console.log(`3. Local built dist/assets/${bpBnFile}:`);
    console.log('   - Has সর্বাধিক পঠিত:', jsContent.includes('সর্বাধিক পঠিত'));
    console.log('   - Has নতুন প্রকাশিত পোস্ট:', jsContent.includes('নতুন প্রকাশিত পোস্ট'));
  }
}

test().catch(console.error);
