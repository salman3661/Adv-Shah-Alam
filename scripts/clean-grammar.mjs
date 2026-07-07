import fs from 'fs';
import path from 'path';

function cleanGrammar(text) {
    if (!text) return text;
    let cleaned = text;

    // Replace "সালের" or "সালে" when not preceded by a Bengali digit
    cleaned = cleaned.replace(/(?<![০-৯])সালের/g, '');
    cleaned = cleaned.replace(/(?<![০-৯])সালে/g, '');

    // English cleanups: e.g. "in 2026" -> "in " -> clean up trailing "in" or "for"
    cleaned = cleaned.replace(/\bin\s*$/gi, '');
    cleaned = cleaned.replace(/\bfor\s*$/gi, '');
    cleaned = cleaned.replace(/\s+in\s+/, ' ');
    cleaned = cleaned.replace(/\s+for\s+/, ' ');
    
    // Clean up spaces
    cleaned = cleaned.replace(/\s+/g, ' ').trim();
    // Clean up trailing/leading dashes or punctuation
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
        
        post.title = cleanGrammar(post.title);
        post.metaTitle = cleanGrammar(post.metaTitle);
        post.metaDescription = cleanGrammar(post.metaDescription);
        
        if (oldTitle !== post.title || oldMetaTitle !== post.metaTitle || oldMetaDesc !== post.metaDescription) {
            changedCount++;
        }
    });
    
    if (changedCount > 0) {
        fs.writeFileSync(indexPath, JSON.stringify(data, null, 2), 'utf8');
        console.log(`Grammar-cleaned ${indexPath} successfully. Cleaned ${changedCount} posts.`);
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
        
        post.title = cleanGrammar(post.title);
        post.metaTitle = cleanGrammar(post.metaTitle);
        post.metaDescription = cleanGrammar(post.metaDescription);
        
        if (oldTitle !== post.title || oldMetaTitle !== post.metaTitle || oldMetaDesc !== post.metaDescription) {
            changedCount++;
            fs.writeFileSync(filePath, JSON.stringify(post, null, 2), 'utf8');
        }
    });
    console.log(`Grammar-cleaned ${changedCount} individual JSON posts in ${dir}`);
});
