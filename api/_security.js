import { createHmac, timingSafeEqual } from 'crypto';

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

const ALLOWED_ORIGINS = new Set([
  'https://www.advmdshahalam.me',
  'https://advmdshahalam.me',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
]);

// Known vulnerability scanners, brute-force tools, and exploit bots
const BLOCKED_UA_REGEX =
  /(sqlmap|nikto|nuclei|masscan|zgrab|gobuster|dirbuster|wfuzz|ffuf|hydra|nmap|acunetix|nessus|openvas|havij|commix|metasploit|burpcollaborator|censys|shodan|morfeus|zmEu)/i;

// In-memory rate-limit & brute-force stores (persisted across warm serverless invocations)
const rateBuckets = new Map();
const authFailures = new Map();

function cleanupMap(map, now) {
  if (map.size < 500) return;
  for (const [k, v] of map.entries()) {
    if (v.resetAt <= now) map.delete(k);
  }
}

export function getClientIp(req) {
  const xff = req.headers?.['x-forwarded-for'];
  if (typeof xff === 'string' && xff.length > 0) {
    return xff.split(',')[0].trim().slice(0, 64);
  }
  const realIp = req.headers?.['x-real-ip'];
  if (typeof realIp === 'string' && realIp.length > 0) {
    return realIp.trim().slice(0, 64);
  }
  return req.socket?.remoteAddress || 'unknown';
}

export function isOriginAllowed(origin) {
  if (!origin) return true; // Same-origin or server-to-server without Origin header
  if (ALLOWED_ORIGINS.has(origin)) return true;
  // Allow official Vercel preview deployments for this project
  if (/^https:\/\/[a-z0-9-]+-advmdshahalam[a-z0-9-]*\.vercel\.app$/i.test(origin)) {
    return true;
  }
  return false;
}

/**
 * Apply strict CORS and security headers. Returns true if the request was
 * already handled (e.g., OPTIONS preflight or blocked bot/origin).
 */
export function applySecurity(req, res, allowedMethods = 'GET, OPTIONS') {
  const origin = req.headers?.origin;
  const resolvedOrigin =
    origin && isOriginAllowed(origin) ? origin : 'https://www.advmdshahalam.me';

  const headers = {
    'Access-Control-Allow-Origin': resolvedOrigin,
    'Access-Control-Allow-Methods': allowedMethods,
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    Vary: 'Origin',
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-Robots-Tag': 'noindex, nofollow, noarchive',
    'Referrer-Policy': 'no-referrer',
  };

  Object.entries(headers).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true;
  }

  // Block known hacker/scanner User-Agents immediately
  const ua = String(req.headers?.['user-agent'] || '');
  if (!ua || BLOCKED_UA_REGEX.test(ua)) {
    res.status(403).json({ error: 'Forbidden' });
    return true;
  }

  // Block cross-origin requests from untrusted origins on state-changing or authenticated endpoints
  if (origin && !isOriginAllowed(origin)) {
    res.status(403).json({ error: 'Origin not allowed' });
    return true;
  }

  return false;
}

/**
 * Sliding-window IP rate limiter. Returns true if rate limit exceeded (response sent).
 */
export function enforceRateLimit(
  req,
  res,
  { bucket = 'api', max = 60, windowMs = 60_000 } = {}
) {
  const now = Date.now();
  cleanupMap(rateBuckets, now);

  const ip = getClientIp(req);
  const key = `${bucket}:${ip}`;
  let entry = rateBuckets.get(key);

  if (!entry || entry.resetAt <= now) {
    entry = { count: 0, resetAt: now + windowMs };
    rateBuckets.set(key, entry);
  }

  entry.count += 1;

  const remaining = Math.max(0, max - entry.count);
  res.setHeader('X-RateLimit-Limit', String(max));
  res.setHeader('X-RateLimit-Remaining', String(remaining));

  if (entry.count > max) {
    const retryAfterSec = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
    res.setHeader('Retry-After', String(retryAfterSec));
    res.status(429).json({
      error: `Too many requests. Please wait ${retryAfterSec} seconds and try again.`,
      retryAfter: retryAfterSec,
    });
    return true;
  }

  return false;
}

/**
 * Brute-force login lockout tracker (max 5 failed attempts per 15 minutes per IP).
 */
export function checkAuthLockout(req, res, { maxFailures = 5, windowMs = 15 * 60_000 } = {}) {
  const now = Date.now();
  cleanupMap(authFailures, now);

  const ip = getClientIp(req);
  const entry = authFailures.get(ip);

  if (entry && entry.resetAt > now && entry.count >= maxFailures) {
    const retryAfterSec = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
    res.setHeader('Retry-After', String(retryAfterSec));
    res.status(429).json({
      error: `Too many failed login attempts. Account locked for ${Math.ceil(retryAfterSec / 60)} minute(s).`,
      retryAfter: retryAfterSec,
    });
    return true;
  }
  return false;
}

export function recordAuthFailure(req, windowMs = 15 * 60_000) {
  const now = Date.now();
  const ip = getClientIp(req);
  let entry = authFailures.get(ip);
  if (!entry || entry.resetAt <= now) {
    entry = { count: 0, resetAt: now + windowMs };
  }
  entry.count += 1;
  authFailures.set(ip, entry);
}

export function clearAuthFailures(req) {
  const ip = getClientIp(req);
  authFailures.delete(ip);
}

/**
 * Constant-time hex digest comparison using crypto.timingSafeEqual
 * to prevent timing side-channel attacks.
 */
export function safeCompareHex(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  if (a.length === 0 || a.length !== b.length) return false;
  try {
    const bufA = Buffer.from(a, 'utf8');
    const bufB = Buffer.from(b, 'utf8');
    if (bufA.length !== bufB.length) return false;
    return timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

/**
 * Verify signed admin Bearer token using constant-time HMAC comparison.
 */
export function verifyToken(authHeader) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  const tokenPart = authHeader.slice(7).trim();
  if (!tokenPart || tokenPart.length > 512) return false;

  try {
    const raw = Buffer.from(tokenPart, 'base64url').toString('utf8');
    const [ts, sig] = raw.split('.');
    if (!ts || !sig || !/^\d{10,15}$/.test(ts)) return false;

    const age = Date.now() - parseInt(ts, 10);
    if (isNaN(age) || age < -5000 || age > TOKEN_TTL_MS) return false;

    const expected = createHmac('sha256', secret).update(ts).digest('hex');
    return safeCompareHex(sig, expected);
  } catch {
    return false;
  }
}

/**
 * Log internal error details on the server while returning a sanitized
 * error message to the client so internal tokens/URLs are never leaked.
 */
export function sendSafeError(res, contextTag, err, fallbackMessage = 'Internal server error') {
  console.error(contextTag, err?.message || err);
  return res.status(500).json({ error: fallbackMessage });
}
