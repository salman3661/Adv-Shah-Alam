/**
 * api/callback.js — GitHub OAuth callback (Vercel Serverless Function / CommonJS)
 *
 * GitHub redirects here after the user authorises the OAuth App.
 * Exchanges the one-time code for an access token and relays it
 * to the Decap CMS popup window via postMessage.
 *
 * Required Vercel environment variables:
 *   OAUTH_CLIENT_ID      — from your GitHub OAuth App
 *   OAUTH_CLIENT_SECRET  — from your GitHub OAuth App
 */

const https = require('https');

module.exports = async function handler(req, res) {
    const clientId     = process.env.OAUTH_CLIENT_ID;
    const clientSecret = process.env.OAUTH_CLIENT_SECRET;
    const { code, error, error_description } = req.query;

    // ── Error from GitHub ────────────────────────────────────────────
    if (error) {
        return res.status(200).send(page('error', '', error_description || error));
    }

    // ── Missing code ─────────────────────────────────────────────────
    if (!code) {
        return res.status(200).send(page('error', '', 'No OAuth code received from GitHub.'));
    }

    // ── Missing env vars ─────────────────────────────────────────────
    if (!clientId || !clientSecret) {
        return res.status(200).send(
            page('error', '',
                'OAuth credentials missing in Vercel. ' +
                'Add OAUTH_CLIENT_ID and OAUTH_CLIENT_SECRET in Vercel → Settings → Environment Variables.'
            )
        );
    }

    // ── Exchange code for access token ───────────────────────────────
    try {
        const body = JSON.stringify({
            client_id:     clientId,
            client_secret: clientSecret,
            code,
        });

        const tokenData = await post('https://github.com/login/oauth/access_token', body);

        if (tokenData.error || !tokenData.access_token) {
            const msg = tokenData.error_description || tokenData.error || 'GitHub did not return an access token.';
            return res.status(200).send(page('error', '', msg));
        }

        // ── Success — send token to CMS popup ───────────────────────────
        return res.status(200).send(page('success', tokenData.access_token));

    } catch (err) {
        return res.status(200).send(page('error', '', 'Token exchange failed: ' + err.message));
    }
};

// ── Helpers ───────────────────────────────────────────────────────────

/**
 * Simple HTTPS POST returning parsed JSON.
 * Uses the built-in `https` module (no external dependencies needed).
 */
function post(url, body) {
    return new Promise((resolve, reject) => {
        const u = new URL(url);
        const options = {
            hostname: u.hostname,
            path:     u.pathname,
            method:   'POST',
            headers: {
                'Content-Type':   'application/json',
                'Content-Length': Buffer.byteLength(body),
                'Accept':         'application/json',
            },
        };
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                try { resolve(JSON.parse(data)); }
                catch (e) { reject(new Error('Invalid JSON from GitHub: ' + data)); }
            });
        });
        req.on('error', reject);
        req.write(body);
        req.end();
    });
}

/**
 * Renders the postMessage relay page.
 *
 * Decap CMS listens for:
 *   authorization:github:success:{"token":"...","provider":"github"}
 *   authorization:github:error:message
 *
 * IMPORTANT: targetOrigin MUST be '*' — Decap CMS opens the popup from its own
 * internal handler and the postMessage must reach the opener regardless of the
 * exact origin (same-origin with wildcard is safe and is what Decap uses internally).
 */
function page(status, token, errorMsg) {
    const message = status === 'success'
        ? 'authorization:github:success:' + JSON.stringify({ token: token, provider: 'github' })
        : 'authorization:github:error:' + (errorMsg || 'Unknown error');

    const displayMsg = status === 'success'
        ? 'Login successful. This window will close automatically.'
        : '<b>Login error:</b><br>' + (errorMsg || '');

    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${status === 'success' ? 'Authenticated' : 'Auth Error'}</title>
  <style>
    body { font-family: system-ui; background: #0f172a; color: #e2e8f0;
           display: flex; align-items: center; justify-content: center;
           min-height: 100vh; margin: 0; text-align: center; }
    .box { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
           border-radius: 12px; padding: 40px; max-width: 400px; }
    .icon { font-size: 2.5rem; margin-bottom: 12px; }
    p { color: #94a3b8; font-size: 0.9rem; margin-top: 8px; }
  </style>
</head>
<body>
<div class="box">
  <div class="icon">${status === 'success' ? '✅' : '❌'}</div>
  <div>${displayMsg}</div>
  <p>${status === 'success' ? 'Redirecting to admin dashboard…' : 'Close this window and try again.'}</p>
</div>
<script>
  (function () {
    var msg = ${JSON.stringify(message)};

    // Send the auth result to the opener (Decap CMS admin window).
    // Must use '*' as targetOrigin — Decap CMS requires this for its internal
    // message listener to accept the token. A specific origin would silently
    // drop the message if there is any mismatch.
    function sendToOpener() {
      try {
        if (window.opener && !window.opener.closed) {
          window.opener.postMessage(msg, '*');
          return true;
        }
      } catch (e) {
        // opener may be cross-origin in unusual redirect scenarios; ignore
      }
      return false;
    }

    // Fire immediately (document is already parsed by the time this runs)
    sendToOpener();

    // Fire again after 200 ms in case the opener's listener wasn't ready yet
    setTimeout(sendToOpener, 200);

    // Close this popup after 800 ms — enough time for both sends to complete
    setTimeout(function () { window.close(); }, 800);
  })();
</script>
</body>
</html>`;
}
