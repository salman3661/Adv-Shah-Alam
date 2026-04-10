import { createHmac } from 'crypto';

// ─── Constants ──────────────────────────────────────────────────────────────

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// Files allowed to be read via this endpoint (allowlist for security)
const ALLOWED_PATHS = new Set([
  'src/data/blogPosts.js',
  'src/data/blogPostsBn.js',
]);

const CORS_HEADERS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
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

// ─── Main handler ────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).set(CORS_HEADERS).end();
  }

  Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));
  res.setHeader('Cache-Control', 'no-store');

  // Only GET supported
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Auth check
  if (!verifyToken(req.headers.authorization)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Validate path
  const filePath = req.query?.path;
  if (!filePath || !ALLOWED_PATHS.has(filePath)) {
    return res.status(400).json({
      error: 'Invalid or disallowed file path',
      allowed: [...ALLOWED_PATHS],
    });
  }

  // GitHub credentials
  const token  = process.env.GITHUB_TOKEN;
  const owner  = process.env.GITHUB_OWNER;
  const repo   = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';

  if (!token || !owner || !repo) {
    return res.status(500).json({
      error: 'GitHub environment variables not configured',
      missing: [
        !token && 'GITHUB_TOKEN',
        !owner && 'GITHUB_OWNER',
        !repo  && 'GITHUB_REPO',
      ].filter(Boolean),
    });
  }

  try {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;
    const ghRes = await fetch(url, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'AdminPanel/1.0',
      },
    });

    if (!ghRes.ok) {
      const body = await ghRes.text();
      throw new Error(`GitHub GET ${filePath} failed: ${ghRes.status} ${body}`);
    }

    const ghData = await ghRes.json();

    // GitHub returns base64-encoded content
    const rawContent = Buffer.from(ghData.content, 'base64').toString('utf8');

    return res.status(200).json({
      content: rawContent,
      sha: ghData.sha,
      path: filePath,
      size: ghData.size,
    });
  } catch (err) {
    console.error('[admin-raw GET]', err.message);
    return res.status(500).json({ error: err.message });
  }
}
