const fs = require('fs');
const filePath = './src/data/blogPostsBn.js';

try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    // Convert to CommonJS string
    let evalContent = fileContent
        .replace(/export\s+default\s+postsBn;/, 'module.exports = postsBn;')
        .replace(/export\s+const\s+isPublishedBn/, 'const isPublishedBn');
    
    const tempPath = './temp_blogPostsBn.js';
    fs.writeFileSync(tempPath, evalContent);
    
    const posts = require(tempPath);
    
    if (!Array.isArray(posts)) {
        throw new Error('Parsed data is not an array.');
    }

    let totalPosts = posts.length;
    let missingFieldsCount = 0;
    let duplicateSlugs = [];
    let slugSet = new Set();
    let brokenPosts = [];
    
    // Count exact number of "new" posts. The batch I wrote had `publishedDate: '2026-03-24'`.
    // Let's also check posts created after '2026-03-02' (the PUBLISHED constant)
    const newPosts = posts.filter(p => p.publishedDate === '2026-03-24');
    
    posts.forEach((post, index) => {
        if (!post.title || !post.slug) {
            brokenPosts.push(`Post index ${index} missing title or slug`);
            missingFieldsCount++;
        }
        
        if (!post.sections && !post.content) {
             brokenPosts.push(`Post index ${index} missing content/sections`);
             missingFieldsCount++;
        }

        if (post.slug) {
            if (slugSet.has(post.slug)) {
                duplicateSlugs.push(post.slug);
            } else {
                slugSet.add(post.slug);
            }
        }
    });
    
    console.log(JSON.stringify({
        status: 'valid',
        totalPosts: totalPosts,
        newPostsCount: newPosts.length,
        missingToReach15New: Math.max(0, 15 - newPosts.length),
        missingFieldsCount: missingFieldsCount,
        brokenPosts: brokenPosts,
        duplicateSlugs: duplicateSlugs
    }, null, 2));

    fs.unlinkSync(tempPath);

} catch (err) {
    console.log(JSON.stringify({
        status: 'broken',
        error: err.message
    }, null, 2));
}
