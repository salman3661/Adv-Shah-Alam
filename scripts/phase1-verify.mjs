import fs from 'fs';
import path from 'path';
import http from 'http';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);
const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const vercel = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));

function matchRedirect(urlPath) {
  for (const r of (vercel.redirects || [])) {
    if (r.has) continue;
    if (r.source === urlPath) {
      return { destination: r.destination, statusCode: r.statusCode || 301 };
    }
    if (r.source.includes(':slug*')) {
      const prefix = r.source.replace(':slug*', '');
      if (urlPath.startsWith(prefix)) {
        const rest = urlPath.slice(prefix.length);
        const dest = r.destination.replace(':slug*', rest);
        return { destination: dest, statusCode: r.statusCode || 301 };
      }
    }
  }
  return null;
}

function getHeadersForPath(urlPath) {
  const out = {};
  for (const rule of (vercel.headers || [])) {
    if (rule.source === '/(.*)') {
      for (const h of rule.headers) out[h.key] = h.value;
    } else if (rule.source === '/(404|404\\.html|bn/404)' && /^\/(404|404\.html|bn\/404)$/.test(urlPath)) {
      for (const h of rule.headers) out[h.key] = h.value;
    }
  }
  return out;
}

function resolveStaticFile(urlPath) {
  const clean = urlPath.split('?')[0];
  if (clean === '/') return path.join(DIST, 'index.html');
  const rel = clean.replace(/^\/+/, '');
  const candidates = [
    path.join(DIST, rel),
    path.join(DIST, `${rel}.html`),
    path.join(DIST, rel, 'index.html'),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  }
  return null;
}

const server = http.createServer((req, res) => {
  const reqPath = (req.url || '/').split('?')[0];
  const redir = matchRedirect(reqPath);
  if (redir) {
    res.writeHead(redir.statusCode, { Location: redir.destination });
    res.end();
    return;
  }

  const hdrs = getHeadersForPath(reqPath);
  const file = resolveStaticFile(reqPath);
  if (file) {
    const ext = path.extname(file);
    const ct = ext === '.html' ? 'text/html; charset=utf-8'
      : ext === '.xml' ? 'application/xml; charset=utf-8'
      : ext === '.json' ? 'application/json; charset=utf-8'
      : ext === '.js' ? 'application/javascript; charset=utf-8'
      : ext === '.css' ? 'text/css; charset=utf-8'
      : 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': ct, ...hdrs });
    fs.createReadStream(file).pipe(res);
    return;
  }

  // Real 404 fallback
  const notFoundFile = reqPath.startsWith('/bn/')
    ? path.join(DIST, 'bn', '404', 'index.html')
    : path.join(DIST, '404.html');
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex, follow' });
  fs.createReadStream(notFoundFile).pipe(res);
});

async function curlStatus(url) {
  const { stdout } = await execFileAsync('curl', ['-s', '-o', '/dev/null', '-w', '%{http_code}', url]);
  return parseInt(stdout.trim(), 10);
}

async function curlRedirect(url) {
  const { stdout } = await execFileAsync('curl', ['-s', '-o', '/dev/null', '-w', '%{http_code} -> %{redirect_url}', url]);
  return stdout.trim();
}

async function main() {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  const BASE = `http://127.0.0.1:${port}`;

  try {
    // 1. 30 junk paths -> must all be 404
    const junkPaths = [
      '/.git/HEAD', '/.env', '/wp-login.php', '/backup.zip', '/sitemap.xml.bak',
      '/admin/login', '/wp-admin/install.php', '/xmlrpc.php', '/non-existent-page',
      '/blog/this-slug-does-not-exist-999', '/bn/blog/fake-post-404', '/services/fake-service',
      '/en/random-junk', '/api/secret', '/config.json', '/phpinfo.php',
      '/test-404-1', '/test-404-2', '/test-404-3', '/test-404-4', '/test-404-5',
      '/test-404-6', '/test-404-7', '/test-404-8', '/test-404-9', '/test-404-10',
      '/old-page.html', '/random/deep/path/here', '/bn/unknown/path', '/robots.txt.bak'
    ];
    console.log('=== 1. 30 Junk Paths (curl status) ===');
    let junkFails = 0;
    for (const jp of junkPaths) {
      const code = await curlStatus(`${BASE}${jp}`);
      if (code !== 404) junkFails++;
      console.log(`${code} ${jp}`);
    }
    console.log(`Junk paths returning 404: ${junkPaths.length - junkFails}/${junkPaths.length}`);

    // 2. All 746 sitemap URLs -> must all be 200
    const xml = fs.readFileSync(path.join(ROOT, 'public', 'sitemap.xml'), 'utf8');
    const sitemapUrls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m =>
      m[1].replace('https://www.advmdshahalam.me', '') || '/'
    );
    let ok200 = 0;
    const failedSitemap = [];
    for (let i = 0; i < sitemapUrls.length; i += 25) {
      const batch = sitemapUrls.slice(i, i + 25);
      const codes = await Promise.all(batch.map(async u => ({ u, code: await curlStatus(`${BASE}${u}`) })));
      for (const c of codes) {
        if (c.code === 200) ok200++;
        else failedSitemap.push(c);
      }
    }
    console.log(`\n=== 2. Sitemap URLs ===\n200 OK: ${ok200}/${sitemapUrls.length}`);
    if (failedSitemap.length) console.log('Failed sitemap URLs:', failedSitemap);

    // 3. /en/*, /bn, /review, /404, /bn/404 behavior
    console.log('\n=== 3. Route Spec Checks ===');
    for (const p of ['/en/blog', '/en/blog/anticipatory-bail-bangladesh', '/en/services/criminal-lawyer', '/en/contact', '/bn']) {
      console.log(`${p} => ${await curlRedirect(`${BASE}${p}`)}`);
    }
    console.log(`/review => ${await curlStatus(`${BASE}/review`)} (in sitemap? ${sitemapUrls.includes('/review')})`);
    console.log(`/404 => ${await curlStatus(`${BASE}/404`)}`);
    console.log(`/bn/404 => ${await curlStatus(`${BASE}/bn/404`)}`);

    // 4. Zero /posts/ links in rendered dist HTML
    function walk(dir, list = []) {
      for (const f of fs.readdirSync(dir)) {
        const p = path.join(dir, f);
        if (fs.statSync(p).isDirectory()) walk(p, list);
        else if (f.endsWith('.html')) list.push(p);
      }
      return list;
    }
    let postsLinkCount = 0;
    for (const f of walk(DIST)) {
      const h = fs.readFileSync(f, 'utf8');
      const m = h.match(/href=["'][^"']*\/posts\/[^"']*["']/g);
      if (m) postsLinkCount += m.length;
    }
    console.log(`\n=== 4. /posts/ Links in Rendered HTML ===\nCount: ${postsLinkCount}`);

    if (junkFails > 0 || failedSitemap.length > 0 || postsLinkCount > 0) {
      process.exitCode = 1;
    }
  } finally {
    server.close();
  }
}

main();
