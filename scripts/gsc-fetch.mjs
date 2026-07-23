import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const keyPath = path.resolve('gsc-service-account.json');

function base64url(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

async function getAccessToken(credentials) {
  const header = { alg: 'RS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const claimSet = {
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud: credentials.token_uri,
    exp: now + 3600,
    iat: now
  };

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedClaimSet = base64url(JSON.stringify(claimSet));
  const signatureInput = `${encodedHeader}.${encodedClaimSet}`;

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signatureInput);
  const signature = signer.sign(credentials.private_key, 'base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const jwt = `${signatureInput}.${signature}`;

  const res = await fetch(credentials.token_uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt
    })
  });

  const data = await res.json();
  if (!data.access_token) {
    throw new Error('Failed to obtain access token: ' + JSON.stringify(data));
  }
  return data.access_token;
}

async function runGscSync() {
  let updatedFromApi = false;
  let credentials = null;

  if (fs.existsSync(keyPath)) {
    try {
      credentials = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
    } catch (e) {
      console.log('[GSC File Read Warning]', e.message);
    }
  } else if (process.env.GSC_SERVICE_ACCOUNT) {
    try {
      credentials = JSON.parse(process.env.GSC_SERVICE_ACCOUNT);
    } catch (e) {
      console.log('[GSC Env Var Read Warning]', e.message);
    }
  }

  if (credentials) {
    try {
      const token = await getAccessToken(credentials);
      console.log('[GSC API] Authenticated successfully with Google Search Console.');

      const siteVariants = [
        'sc-domain:advmdshahalam.me',
        'https://www.advmdshahalam.me/'
      ];

      const now = new Date();
      const endDate = now.toISOString().split('T')[0];
      const startDateDate = new Date();
      startDateDate.setDate(now.getDate() - 30);
      const startDate = startDateDate.toISOString().split('T')[0];

      for (const siteUrl of siteVariants) {
        const apiUrl = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;
        const apiRes = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ startDate, endDate, dimensions: ['page'], rowLimit: 100 })
        });

        const analyticsData = await apiRes.json();
        if (analyticsData.rows && analyticsData.rows.length) {
          console.log(`[GSC API] Received live Search Console data from ${siteUrl} for ${analyticsData.rows.length} pages.`);
          const pageStats = {};
          analyticsData.rows.forEach(row => {
            const url = row.keys[0];
            const match = url.match(/\/bn\/blog\/([a-zA-Z0-9\-]+)/);
            if (match && match[1]) {
              const slug = match[1];
              pageStats[slug] = { clicks: row.clicks, impressions: row.impressions };
            }
          });

          const sorted = Object.keys(pageStats).sort((a, b) => pageStats[b].impressions - pageStats[a].impressions);
          if (sorted.length) {
            updatePosts(pageStats, sorted[0]);
            updatedFromApi = true;
            break;
          }
        }
      }
    } catch (err) {
      console.log('[GSC API Note]', err.message);
    }
  }

  if (!updatedFromApi) {
    console.log('[GSC Analytics] Using fallback top post for spotlight banner...');
    const topSlug = 'jomi-nibandhon-fee-2026-bn';
    updatePosts({}, topSlug);
  }
}

function updatePosts(pageStats, topSlug) {
  try {
    const bnDir = path.resolve('src/content/posts/bn');
    if (!fs.existsSync(bnDir)) return;
    const files = fs.readdirSync(bnDir).filter(f => f.endsWith('.json'));

    files.forEach(f => {
      const filePath = path.join(bnDir, f);
      const post = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const slug = post.slug;

      if (pageStats[slug]) {
        post.impressions = pageStats[slug].impressions;
        post.clicks = pageStats[slug].clicks;
      }

      if (slug === topSlug) {
        post.featured = true;
      } else {
        post.featured = false;
      }

      fs.writeFileSync(filePath, JSON.stringify(post, null, 2), 'utf8');
    });

    console.log(`[GSC Sync Success] Featured Spotlight post set to: ${topSlug}`);
  } catch (e) {
    console.log('[Update Posts Warning]', e.message);
  }
}

runGscSync().catch(err => {
  console.log('[GSC Sync Safe Handled Error]', err.message);
});
