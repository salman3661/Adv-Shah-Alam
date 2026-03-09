/**
 * api/auth.js — GitHub OAuth redirect handler (Vercel Serverless Function)
 * ─────────────────────────────────────────────────────────────────────────
 * Decap CMS calls GET /api/auth to start the GitHub OAuth flow.
 * This function redirects the user to GitHub's authorization page.
 *
 * Required environment variables in Vercel dashboard:
 *   OAUTH_CLIENT_ID      — from your GitHub OAuth App
 *   OAUTH_CLIENT_SECRET  — from your GitHub OAuth App
 * ─────────────────────────────────────────────────────────────────────────
 */

export default function handler(req, res) {
    const { OAUTH_CLIENT_ID } = process.env;

    if (!OAUTH_CLIENT_ID) {
        return res.status(500).json({
            error: 'OAUTH_CLIENT_ID environment variable is not set. See Vercel dashboard → Settings → Environment Variables.',
        });
    }

    const params = new URLSearchParams({
        client_id:    OAUTH_CLIENT_ID,
        scope:        'repo,user',
        redirect_uri: `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}/api/callback`,
    });

    res.redirect(302, `https://github.com/login/oauth/authorize?${params}`);
}
