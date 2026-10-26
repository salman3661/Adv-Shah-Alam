import {
  applySecurity,
  enforceRateLimit,
  sendSafeError,
  verifyToken,
} from './_security.js';

export default async function handler(req, res) {
  if (applySecurity(req, res, 'POST, OPTIONS')) return;
  if (enforceRateLimit(req, res, { bucket: 'admin-deploy', max: 10, windowMs: 60_000 })) return;

  if (!verifyToken(req.headers.authorization)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const hookUrl = process.env.VERCEL_DEPLOY_HOOK;
  if (!hookUrl) {
    return res.status(500).json({ error: 'Deploy hook not configured' });
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
    return sendSafeError(res, '[admin-deploy]', err, 'Failed to trigger deployment');
  }
}
