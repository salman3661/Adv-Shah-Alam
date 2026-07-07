import fs from 'fs';
import path from 'path';

function cleanText(text) {
    if (!text) return text;
    // Replace:
    // " (2026)" or " (2025)"
    // " 2026" or " 2025"
    // " (২০২৬)" or " (২০২৫)"
    // " ২০২৬" or " ২০২৫"
    // Handle cases like "2026 -" or "- 2026"
    let cleaned = text
        .replace(/\s*\(202[56]\)/g, '')
        .replace(/\s*\(২০২[৫৬]\)/g, '')
        .replace(/\b202[56]\b/g, '')
        .replace(/২০২[৫৬]/g, '');
        
    // Clean up double spaces
    cleaned = cleaned.replace(/\s+/g, ' ').trim();
    
    // Clean up double dashes or trailing/leading dashes or punctuation
    cleaned = cleaned.replace(/^[-–—\s]+/, '').replace(/[-–—\s]+$/, '');
    cleaned = cleaned.replace(/\s*[-–—]\s*[-–—]\s*/g, ' – ');
    cleaned = cleaned.replace(/\s*[-–—]\s*$/, '');
    cleaned = cleaned.replace(/^[-–—]\s*/, '');
    
    return cleaned;
}

const indexes = ['src/content/blog-en-index.json', 'src/content/blog-bn-index.json'];

indexes.forEach(indexPath => {
    const data = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    let changedCount = 0;
    
    data.posts.forEach(post => {
        const oldTitle = post.title;
        const oldMetaTitle = post.metaTitle;
        const oldMetaDesc = post.metaDescription;
        
        post.title = cleanText(post.title);
        post.metaTitle = cleanText(post.metaTitle);
        post.metaDescription = cleanText(post.metaDescription);
        
        if (oldTitle !== post.title || oldMetaTitle !== post.metaTitle || oldMetaDesc !== post.metaDescription) {
            changedCount++;
            console.log(`[INDEX CLEAN] ${post.slug}:`);
            if (oldTitle !== post.title) console.log(`  Title: "${oldTitle}" -> "${post.title}"`);
            if (oldMetaTitle !== post.metaTitle) console.log(`  MetaTitle: "${oldMetaTitle}" -> "${post.metaTitle}"`);
            if (oldMetaDesc !== post.metaDescription) console.log(`  MetaDesc: "${oldMetaDesc}" -> "${post.metaDescription}"`);
        }
    });
    
    if (changedCount > 0) {
        fs.writeFileSync(indexPath, JSON.stringify(data, null, 2), 'utf8');
        console.log(`Updated ${indexPath} successfully. Cleaned ${changedCount} posts.`);
    }
});

// Now let's do the same for all post files in src/content/posts/en/ and bn/
const langs = ['en', 'bn'];
langs.forEach(lang => {
    const dir = path.join('src', 'content', 'posts', lang);
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
    let changedCount = 0;
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const post = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        const oldTitle = post.title;
        const oldMetaTitle = post.metaTitle;
        const oldMetaDesc = post.metaDescription;
        
        post.title = cleanText(post.title);
        post.metaTitle = cleanText(post.metaTitle);
        post.metaDescription = cleanText(post.metaDescription);
        
        if (oldTitle !== post.title || oldMetaTitle !== post.metaTitle || oldMetaDesc !== post.metaDescription) {
            changedCount++;
            fs.writeFileSync(filePath, JSON.stringify(post, null, 2), 'utf8');
        }
    });
    console.log(`Cleaned years from ${changedCount} individual JSON posts in ${dir}`);
});
