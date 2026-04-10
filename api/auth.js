/**
 * api/auth.js — DISABLED
 *
 * This endpoint previously served Decap CMS GitHub OAuth.
 * The old CMS has been removed. The new admin panel at /admin
 * uses its own token-based auth via api/admin-auth.js instead.
 *
 * Returns 410 Gone so any cached links or bots learn this is permanently removed.
 */
module.exports = function handler(req, res) {
  res.setHeader('Cache-Control', 'public, max-age=3600');
  return res.status(410).json({
    error: 'Gone',
    message: 'This OAuth endpoint has been decommissioned. The legacy CMS has been replaced.',
  });
};
