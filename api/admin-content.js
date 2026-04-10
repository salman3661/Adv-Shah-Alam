import { createHmac } from 'crypto';

// ─── Constants ──────────────────────────────────────────────────────────────

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// Allowed content file paths (repo-relative)
const ALLOWED_FILES = {
  hero:     'src/content/hero.json',
  services: 'src/content/services.json',
  faq:      'src/content/faq.json',
  siteInfo: 'src/content/siteInfo.json',
  about:    'src/content/about.json',
};

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// ─── Auth helpers ────────────────────────────────────────────────────────────

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
  } catch {
    return false;
  }
}

// ─── GitHub API helpers ──────────────────────────────────────────────────────

async function githubGet(path) {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo  = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'AdminPanel/1.0',
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub GET ${path} failed: ${res.status} ${body}`);
  }

  return res.json(); // { content (base64), sha, ... }
}

async function githubPut(path, newContentStr, sha, commitMessage) {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo  = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const body = {
    message: commitMessage,
    content: Buffer.from(newContentStr, 'utf8').toString('base64'),
    sha,
    branch,
  };

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'User-Agent': 'AdminPanel/1.0',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`GitHub PUT ${path} failed: ${res.status} ${errBody}`);
  }

  return res.json();
}

// ─── Main handler ────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).set(CORS_HEADERS).end();
  }

  Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));
  res.setHeader('Cache-Control', 'no-store');

  // Auth check
  if (!verifyToken(req.headers.authorization)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Extract and validate content key (e.g. ?file=hero)
  const fileKey = req.query?.file;
  if (!fileKey || !ALLOWED_FILES[fileKey]) {
    return res.status(400).json({
      error: 'Invalid file key',
      allowed: Object.keys(ALLOWED_FILES),
    });
  }

  const filePath = ALLOWED_FILES[fileKey];

  // ── GET: read current file from GitHub ──────────────────────────────────
  if (req.method === 'GET') {
    try {
      const ghFile = await githubGet(filePath);
      const decoded = JSON.parse(Buffer.from(ghFile.content, 'base64').toString('utf8'));
      return res.status(200).json({
        content: decoded,
        sha: ghFile.sha,
        path: filePath,
      });
    } catch (err) {
      console.error('[admin-content GET]', err.message);
      return res.status(500).json({ error: err.message });
    }
  }

  // ── PUT: commit updated content to GitHub ────────────────────────────────
  if (req.method === 'PUT') {
    const { content, sha } = req.body || {};

    if (!content || !sha) {
      return res.status(400).json({ error: 'content and sha are required' });
    }

    try {
      // Validate that content is serialisable JSON
      const newJson = JSON.stringify(content, null, 2);
      const commitMsg = `admin: update ${fileKey} content [skip ci]`;
      const result = await githubPut(filePath, newJson, sha, commitMsg);

      return res.status(200).json({
        success: true,
        sha: result.content?.sha,
        commit: result.commit?.html_url,
      });
    } catch (err) {
      console.error('[admin-content PUT]', err.message);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
