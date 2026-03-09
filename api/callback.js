/**
 * api/callback.js — GitHub OAuth callback handler (Vercel Serverless Function)
 * ──────────────────────────────────────────────────────────────────────────────
 * GitHub redirects here after the user authorises the OAuth app.
 * This function exchanges the one-time code for an access token
 * and passes it back to the Decap CMS popup window via postMessage.
 *
 * Required environment variables in Vercel dashboard:
 *   OAUTH_CLIENT_ID      — from your GitHub OAuth App
 *   OAUTH_CLIENT_SECRET  — from your GitHub OAuth App
 * ──────────────────────────────────────────────────────────────────────────────
 */

export default async function handler(req, res) {
    const { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET } = process.env;
    const { code, error, error_description } = req.query;

    if (error) {
        return res.status(200).send(renderScript('error', null, error_description || error));
    }

    if (!code) {
        return res.status(400).send(renderScript('error', null, 'Missing OAuth code'));
    }

    if (!OAUTH_CLIENT_ID || !OAUTH_CLIENT_SECRET) {
        return res.status(500).send(renderScript('error', null, 'OAuth credentials not configured in Vercel'));
    }

    try {
        // Exchange code for access token
        const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                client_id:     OAUTH_CLIENT_ID,
                client_secret: OAUTH_CLIENT_SECRET,
                code,
            }),
        });

        const data = await tokenRes.json();

        if (data.error || !data.access_token) {
            return res.status(200).send(
                renderScript('error', null, data.error_description || 'Failed to get access token')
            );
        }

        // Signal success to the Decap CMS popup window
        return res.status(200).send(renderScript('success', data.access_token));

    } catch (err) {
        return res.status(200).send(renderScript('error', null, err.message));
    }
}

/**
 * Renders the postMessage page that sends the token to the CMS popup.
 * Decap CMS expects:  postMessage("authorization:github:success:TOKEN", origin)
 */
function renderScript(status, token, errorMsg = '') {
    const message = status === 'success'
        ? `authorization:github:${status}:${JSON.stringify({ token, provider: 'github' })}`
        : `authorization:github:${status}:${errorMsg}`;

    return `<!doctype html>
<html>
<head><title>Authenticating…</title></head>
<body>
<p style="font-family:system-ui;text-align:center;padding:40px;color:#64748b">
  ${status === 'success' ? 'Login successful. Closing…' : `Error: ${errorMsg}`}
</p>
<script>
  (function() {
    const msg = ${JSON.stringify(message)};
    if (window.opener) {
      window.opener.postMessage(msg, '*');
    }
    setTimeout(() => window.close(), 1200);
  })();
</script>
</body>
</html>`;
}
