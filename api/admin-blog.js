import { createHmac } from 'crypto';

// ─── Constants ──────────────────────────────────────────────────────────────

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000;
const ALLOWED_LANGS = new Set(['en', 'bn']);

const CORS_HEADERS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// ─── Auth ────────────────────────────────────────────────────────────────────

function verifyToken(authHeader) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || !authHeader?.startsWith('Bearer ')) return false;
  try {
    const raw = Buffer.from(authHeader.slice(7), 'base64url').toString('utf8');
    const [ts, sig] = raw.split('.');
    if (!ts || !sig) return false;
    const age = Date.now() - parseInt(ts, 10);
    if (isNaN(age) || age < 0 || age > TOKEN_TTL_MS) return false;
    const expected = createHmac('sha256', secret).update(ts).digest('hex');
    return sig === expected;
  } catch { return false; }
}

// ─── GitHub helpers ──────────────────────────────────────────────────────────

function ghHeaders() {
  return {
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'AdminPanel/1.0',
    'Content-Type': 'application/json',
  };
}

function ghUrl(path) {
  const owner  = process.env.GITHUB_OWNER;
  const repo   = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';
  return `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
}

async function ghGet(path) {
  const res = await fetch(ghUrl(path), { headers: ghHeaders() });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub GET ${path}: ${res.status} ${body.slice(0, 200)}`);
  }
  return res.json();
}

async function ghPut(path, contentStr, sha, message) {
  const owner  = process.env.GITHUB_OWNER;
  const repo   = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const body = {
    message,
    content: Buffer.from(contentStr, 'utf8').toString('base64'),
    branch,
    ...(sha ? { sha } : {}),
  };
  const res = await fetch(url, { method: 'PUT', headers: ghHeaders(), body: JSON.stringify(body) });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub PUT ${path}: ${res.status} ${err.slice(0, 200)}`);
  }
  return res.json();
}

async function ghDelete(path, sha, message) {
  const owner  = process.env.GITHUB_OWNER;
  const repo   = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const body = { message, sha, branch };
  const res = await fetch(url, { method: 'DELETE', headers: ghHeaders(), body: JSON.stringify(body) });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub DELETE ${path}: ${res.status} ${err.slice(0, 200)}`);
  }
  return res.json();
}

// ─── Path helpers ─────────────────────────────────────────────────────────────

function safeSlug(slug) {
  return typeof slug === 'string' && /^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(slug) && slug.length <= 80;
}

function postPath(lang, slug)  { return `src/content/posts/${lang}/${slug}.json`; }
function indexPath(lang)       { return `src/content/blog-${lang}-index.json`; }

// ─── Index helpers ────────────────────────────────────────────────────────────

async function loadIndex(lang) {
  try {
    const ghFile = await ghGet(indexPath(lang));
    const decoded = Buffer.from(ghFile.content, 'base64').toString('utf8');
    return { index: JSON.parse(decoded), sha: ghFile.sha };
  } catch (err) {
    // If index doesn't exist yet, return empty
    if (err.message.includes('404')) return { index: { posts: [] }, sha: null };
    throw err;
  }
}

function buildIndexEntry(post, lang) {
  return {
    slug:            post.slug,
    title:           post.title,
    category:        post.category || '',
    readTime:        post.readTime || '',
    publishedDate:   post.publishedDate || '',
    isDraft:         post.isDraft || false,
    metaTitle:       post.metaTitle || '',
    metaDescription: post.metaDescription || '',
    ...(lang === 'en' ? { bnSlug: post.bnSlug || null } : {}),
    ...(lang === 'bn' ? { enSlug: post.enSlug || null } : {}),
  };
}

async function upsertIndex(lang, post) {
  const { index, sha } = await loadIndex(lang);
  const entry = buildIndexEntry(post, lang);

  const existing = index.posts.findIndex((p) => p.slug === post.slug);
  if (existing >= 0) {
    index.posts[existing] = entry;
  } else {
    // Insert in publishedDate order (newest first for new posts)
    index.posts.unshift(entry);
  }

  const result = await ghPut(
    indexPath(lang),
    JSON.stringify(index, null, 2),
    sha,
    `admin: update ${lang} blog index [skip ci]`,
  );
  return result.content?.sha;
}

async function removeFromIndex(lang, slug) {
  const { index, sha } = await loadIndex(lang);
  const newPosts = index.posts.filter((p) => p.slug !== slug);
  if (newPosts.length === index.posts.length) return; // not found, skip

  index.posts = newPosts;
  await ghPut(
    indexPath(lang),
    JSON.stringify(index, null, 2),
    sha,
    `admin: remove ${slug} from ${lang} blog index [skip ci]`,
  );
}

// ─── Main handler ─────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).set(CORS_HEADERS).end();
  Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));
  res.setHeader('Cache-Control', 'no-store');

  // Auth
  if (!verifyToken(req.headers.authorization)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Validate env
  if (!process.env.GITHUB_TOKEN || !process.env.GITHUB_OWNER || !process.env.GITHUB_REPO) {
    return res.status(500).json({ error: 'GitHub environment variables not configured' });
  }

  const lang = req.query?.lang;
  const slug = req.query?.slug;

  if (!lang || !ALLOWED_LANGS.has(lang)) {
    return res.status(400).json({ error: 'lang must be "en" or "bn"' });
  }

  // ── GET: load index or single post ─────────────────────────────────────────
  if (req.method === 'GET') {
    try {
      if (slug === '_index') {
        // Load lightweight index
        const { index } = await loadIndex(lang);
        return res.status(200).json({ index });
      }

      if (!slug || !safeSlug(slug)) {
        return res.status(400).json({ error: 'Invalid slug' });
      }

      const ghFile = await ghGet(postPath(lang, slug));
      const decoded = Buffer.from(ghFile.content, 'base64').toString('utf8');
      const post = JSON.parse(decoded);
      return res.status(200).json({ post, sha: ghFile.sha });
    } catch (err) {
      console.error('[admin-blog GET]', err.message);
      if (err.message.includes('404')) {
        return res.status(404).json({ error: 'Post not found' });
      }
      return res.status(500).json({ error: err.message });
    }
  }

  // ── PUT: create or update post ──────────────────────────────────────────────
  if (req.method === 'PUT') {
    if (!slug || !safeSlug(slug)) {
      return res.status(400).json({ error: 'Invalid slug' });
    }

    const { post, sha } = req.body || {};
    if (!post || typeof post !== 'object') {
      return res.status(400).json({ error: 'post object required' });
    }

    // Enforce slug consistency
    post.slug = slug;
    post.lang = lang;

    // Required fields
    if (!post.title || !post.slug) {
      return res.status(400).json({ error: 'title and slug are required' });
    }

    try {
      // Get current SHA if updating (sha may be provided from GET response)
      let currentSha = sha || null;
      if (!currentSha) {
        // Try to get existing SHA
        try {
          const existing = await ghGet(postPath(lang, slug));
          currentSha = existing.sha;
        } catch { /* new file */ }
      }

      const postJson = JSON.stringify(post, null, 2);
      const commitMsg = `admin: ${currentSha ? 'update' : 'create'} ${lang} post "${slug}" [skip ci]`;
      const result = await ghPut(postPath(lang, slug), postJson, currentSha, commitMsg);

      // Update index
      await upsertIndex(lang, post);

      return res.status(200).json({
        success: true,
        sha: result.content?.sha,
        commit: result.commit?.html_url,
        isNew: !currentSha,
      });
    } catch (err) {
      console.error('[admin-blog PUT]', err.message);
      return res.status(500).json({ error: err.message });
    }
  }

  // ── DELETE: remove post ──────────────────────────────────────────────────────
  if (req.method === 'DELETE') {
    if (!slug || !safeSlug(slug)) {
      return res.status(400).json({ error: 'Invalid slug' });
    }

    const { sha } = req.body || {};
    if (!sha) {
      return res.status(400).json({ error: 'sha required for delete' });
    }

    try {
      await ghDelete(
        postPath(lang, slug),
        sha,
        `admin: delete ${lang} post "${slug}" [skip ci]`,
      );
      await removeFromIndex(lang, slug);

      return res.status(200).json({ success: true });
    } catch (err) {
      console.error('[admin-blog DELETE]', err.message);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
