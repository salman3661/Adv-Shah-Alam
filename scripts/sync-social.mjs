// scripts/sync-social.mjs
// Dispatches new blog posts directly to Make.com Webhook for automated LinkedIn + GBP posting
import fs from 'fs';
import path from 'path';

const WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL || 'https://hook.us2.make.com/k368lkicdwxse9ka2v3wgvl1ydu9fx53';
const BASE_URL = 'https://www.advmdshahalam.me';
const STATE_FILE = path.join(process.cwd(), 'scripts', '.synced_social_posts.json');

// Load synced history
let syncedSlugs = new Set();
if (fs.existsSync(STATE_FILE)) {
    try {
        const raw = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
        syncedSlugs = new Set(raw);
    } catch {
        syncedSlugs = new Set();
    }
}

function saveSynced() {
    fs.writeFileSync(STATE_FILE, JSON.stringify([...syncedSlugs], null, 2), 'utf8');
}

function getPosts(dir, prefix) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir)
        .filter(f => f.endsWith('.json'))
        .map(f => {
            try {
                const fullPath = path.join(dir, f);
                const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
                data._prefix = prefix;
                data._mtime = fs.statSync(fullPath).mtimeMs;
                return data;
            } catch {
                return null;
            }
        })
        .filter(p => p && !p.isDraft && p.slug);
}

const bnPosts = getPosts(path.join('src', 'content', 'posts', 'bn'), '/bn/blog');
const enPosts = getPosts(path.join('src', 'content', 'posts', 'en'), '/blog');

const allPosts = [...bnPosts, ...enPosts].sort((a, b) => {
    const dateA = new Date(a.publishedDate || a.lastModified || '2026-01-01').getTime();
    const dateB = new Date(b.publishedDate || b.lastModified || '2026-01-01').getTime();
    if (dateB !== dateA) return dateB - dateA;
    return (b._mtime || 0) - (a._mtime || 0);
});

// Check if specific slug passed via argument: node scripts/sync-social.mjs --slug <slug>
const args = process.argv.slice(2);
const slugArgIdx = args.indexOf('--slug');
const targetSlug = slugArgIdx !== -1 ? args[slugArgIdx + 1] : null;

const toSync = targetSlug 
    ? allPosts.filter(p => p.slug === targetSlug)
    : allPosts.filter(p => !syncedSlugs.has(p.slug)).slice(0, 10);

console.log(`[Social Sync] Found ${toSync.length} post(s) to send to Make.com Webhook...`);

if (toSync.length === 0) {
    console.log('[Social Sync] All posts are already synced. Zero operations used!');
    process.exit(0);
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function run() {
    let successCount = 0;
    for (let i = 0; i < toSync.length; i++) {
        const post = toSync[i];
        const postUrl = `${BASE_URL}${post._prefix}/${post.slug}`;
        const rawDesc = post.metaDescription || (post.heroIntro ? post.heroIntro.replace(/<[^>]+>/g, '').slice(0, 300) : '');
        const summary = rawDesc.replace(/[\r\n]+/g, ' ').trim();

        const payload = {
            title: post.title,
            summary: summary,
            url: postUrl,
            guid: `${post._prefix}/${post.slug}`,
            published: post.publishedDate ? `${post.publishedDate}T12:00:00Z` : new Date().toISOString()
        };

        console.log(`[Social Sync] Sending (${i + 1}/${toSync.length}): "${post.title.slice(0, 45)}..."`);

        try {
            const res = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                console.log(`  ✓ Successfully accepted by Make.com (${res.status})`);
                syncedSlugs.add(post.slug);
                saveSynced();
                successCount++;
            } else {
                console.error(`  ✗ Make.com response error: ${res.status} ${res.statusText}`);
            }
        } catch (err) {
            console.error('  ✗ Network error sending post:', err.message);
        }

        if (i < toSync.length - 1) {
            await sleep(2500);
        }
    }

    console.log(`\n🎉 [Social Sync] Finished: ${successCount}/${toSync.length} posts dispatched to LinkedIn & GBP!\n`);
}

run();
