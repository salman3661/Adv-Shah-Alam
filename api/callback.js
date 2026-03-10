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
 * Decap CMS requires a two-step handshake BEFORE the token is sent:
 *
 *   Step 1 — Popup  → Admin:  "authorizing:github"
 *   Step 2 — Admin  → Popup:  "authorizing:github"  (echo/acknowledgment)
 *   Step 3 — Popup  → Admin:  "authorization:github:success:{token,provider}"
 *
 * Source: decap-cms-lib-auth/src/netlify-auth.js → handshakeCallback()
 * The admin window only registers its token listener AFTER receiving the
 * handshake ping. If the popup sends the token directly (without the ping)
 * the admin is still in handshake-listening mode and silently drops the token.
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
    var authMessage  = ${JSON.stringify(message)};
    var isSuccess    = ${JSON.stringify(status === 'success')};
    var handshakeMsg = 'authorizing:github';

    function postToOpener(msg) {
      try {
        if (window.opener && !window.opener.closed) {
          window.opener.postMessage(msg, '*');
        }
      } catch (e) { /* should not happen — same domain */ }
    }

    if (isSuccess) {
      // ── Decap CMS two-step handshake (REQUIRED) ───────────────────
      // Step 1: Popup sends "authorizing:github" to admin window.
      // Step 2: Admin echoes "authorizing:github" back to popup.
      // Step 3: Popup receives echo → sends real token to admin.
      // Without step 1-2, admin is still in handshake-listen mode and
      // silently drops the token message.
      window.addEventListener('message', function handler(e) {
        if (e.data === handshakeMsg) {
          window.removeEventListener('message', handler, false);
          postToOpener(authMessage);
          setTimeout(function () { window.close(); }, 500);
        }
      }, false);
      postToOpener(handshakeMsg); // kick off step 1
    } else {
      // Error path — no handshake needed
      postToOpener(authMessage);
      setTimeout(function () { window.close(); }, 2500);
    }
  })();
</script>
</body>
</html>`;
}
