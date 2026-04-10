import { createHmac } from 'crypto';

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

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

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).set(CORS_HEADERS).end();
  Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));

  if (!verifyToken(req.headers.authorization)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const hookUrl = process.env.VERCEL_DEPLOY_HOOK;
  if (!hookUrl) {
    return res.status(500).json({ error: 'VERCEL_DEPLOY_HOOK not configured' });
  }

  try {
    const response = await fetch(hookUrl, { method: 'POST' });
    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Deploy hook failed: ${response.status} ${body}`);
    }
    const data = await response.json().catch(() => ({}));
    return res.status(200).json({ success: true, job: data?.job?.id || 'triggered' });
  } catch (err) {
    console.error('[admin-deploy]', err.message);
    return res.status(500).json({ error: err.message });
  }
}
