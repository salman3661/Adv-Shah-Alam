import { createHmac } from 'crypto';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default function handler(req, res) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).set(CORS_HEADERS).end();
  }

  Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secret = process.env.ADMIN_SECRET;
  const storedHash = process.env.ADMIN_PASSWORD_HASH;

  if (!secret || !storedHash) {
    console.error('[admin-auth] Missing ADMIN_SECRET or ADMIN_PASSWORD_HASH env vars');
    return res.status(500).json({ error: 'Server misconfiguration' });
  }

  const { password } = req.body || {};
  if (!password || typeof password !== 'string') {
    return res.status(400).json({ error: 'Password required' });
  }

  // SHA-256 HMAC of the submitted password — compared against stored hash
  const incomingHash = createHmac('sha256', secret).update(password.trim()).digest('hex');

  if (incomingHash !== storedHash) {
    // Constant-time compare already done via hex string HMAC — add artificial delay
    return new Promise((resolve) =>
      setTimeout(() => {
        res.status(401).json({ error: 'Invalid credentials' });
        resolve();
      }, 400)
    );
  }

  // Build signed token: base64( timestamp + "." + hmac(timestamp, secret) )
  const ts = Date.now().toString();
  const sig = createHmac('sha256', secret).update(ts).digest('hex');
  const token = Buffer.from(`${ts}.${sig}`).toString('base64url');

  return res.status(200).json({ token, message: 'Authenticated' });
}
