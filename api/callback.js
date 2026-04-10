/**
 * api/callback.js — DISABLED
 *
 * This endpoint previously handled Decap CMS GitHub OAuth callback.
 * The old CMS has been removed. Returns 410 Gone.
 */
module.exports = function handler(req, res) {
  res.setHeader('Cache-Control', 'public, max-age=3600');
  return res.status(410).json({
    error: 'Gone',
    message: 'This OAuth callback endpoint has been decommissioned.',
  });
};
