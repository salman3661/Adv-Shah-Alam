/**
 * api/auth.js — GitHub OAuth redirect (Vercel Serverless Function / CommonJS)
 *
 * Decap CMS calls GET /api/auth to start the OAuth flow.
 * This redirects the browser to GitHub's authorization page.
 *
 * Required Vercel environment variables:
 *   OAUTH_CLIENT_ID      — from your GitHub OAuth App
 *   OAUTH_CLIENT_SECRET  — from your GitHub OAuth App
 */

module.exports = function handler(req, res) {
    const clientId = process.env.OAUTH_CLIENT_ID;

    if (!clientId) {
        res.setHeader('Content-Type', 'text/plain');
        return res.status(500).send(
            'OAUTH_CLIENT_ID is not set.\n' +
            'Go to Vercel dashboard → Settings → Environment Variables and add it.'
        );
    }

    const params = new URLSearchParams({
        client_id:    clientId,
        scope:        'repo,user',
        redirect_uri: 'https://www.advmdshahalam.me/api/callback',
    });

    return res.redirect(302, `https://github.com/login/oauth/authorize?${params}`);
};
