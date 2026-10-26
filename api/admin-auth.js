import { createHmac } from 'crypto';
import {
  applySecurity,
  checkAuthLockout,
  clearAuthFailures,
  enforceRateLimit,
  recordAuthFailure,
  safeCompareHex,
} from './_security.js';

export default function handler(req, res) {
  if (applySecurity(req, res, 'POST, OPTIONS')) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Enforce IP rate limit + brute-force lockout (5 failures per 15 min)
  if (checkAuthLockout(req, res, { maxFailures: 5, windowMs: 15 * 60_000 })) return;
  if (enforceRateLimit(req, res, { bucket: 'admin-auth', max: 12, windowMs: 15 * 60_000 })) return;

  const secret = process.env.ADMIN_SECRET;
  const storedHash = process.env.ADMIN_PASSWORD_HASH;

  if (!secret || !storedHash) {
    console.error('[admin-auth] Missing ADMIN_SECRET or ADMIN_PASSWORD_HASH env vars');
    return res.status(500).json({ error: 'Server misconfiguration' });
  }

  const { password, website } = req.body || {};

  // Honeypot trap: if a bot filled the hidden "website" field, penalize and reject
  if (website && String(website).trim().length > 0) {
    recordAuthFailure(req);
    return new Promise((resolve) =>
      setTimeout(() => {
        res.status(401).json({ error: 'Invalid credentials' });
        resolve();
      }, 600)
    );
  }

  if (!password || typeof password !== 'string' || password.length > 256) {
    return res.status(400).json({ error: 'Valid password required' });
  }

  // SHA-256 HMAC of the submitted password — compared against stored hash in constant time
  const incomingHash = createHmac('sha256', secret).update(password.trim()).digest('hex');

  if (!safeCompareHex(incomingHash, storedHash.trim())) {
    recordAuthFailure(req);
    return new Promise((resolve) =>
      setTimeout(() => {
        res.status(401).json({ error: 'Invalid credentials' });
        resolve();
      }, 500)
    );
  }

  clearAuthFailures(req);

  // Build signed token: base64( timestamp + "." + hmac(timestamp, secret) )
  const ts = Date.now().toString();
  const sig = createHmac('sha256', secret).update(ts).digest('hex');
  const token = Buffer.from(`${ts}.${sig}`).toString('base64url');

  return res.status(200).json({ token, message: 'Authenticated' });
}
