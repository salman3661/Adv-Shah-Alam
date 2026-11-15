#!/usr/bin/env node
import fs from 'fs';
import http from 'http';
import path from 'path';
import { spawn } from 'child_process';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const vercel = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

function matchRedirect(urlPath) {
  for (const r of (vercel.redirects || [])) {
    if (r.has) continue;
    if (r.source === urlPath) return { destination: r.destination, statusCode: r.statusCode || 301 };
    if (r.source.includes(':slug*')) {
      const prefix = r.source.replace(':slug*', '');
      if (urlPath.startsWith(prefix)) {
        const rest = urlPath.slice(prefix.length);
        return { destination: r.destination.replace(':slug*', rest), statusCode: r.statusCode || 301 };
      }
    }
  }
  return null;
}

function resolveStaticFile(urlPath) {
  const clean = urlPath.split('?')[0];
  if (clean === '/') return path.join(DIST, 'index.html');
  const rel = clean.replace(/^\/+/, '');
  for (const c of [path.join(DIST, rel), path.join(DIST, `${rel}.html`), path.join(DIST, rel, 'index.html')]) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  }
  return null;
}

function startDistServer() {
  const server = http.createServer((req, res) => {
    const reqPath = (req.url || '/').split('?')[0];
    const redir = matchRedirect(reqPath);
    if (redir) {
      res.writeHead(redir.statusCode, { Location: redir.destination });
      res.end();
      return;
    }
    const file = resolveStaticFile(reqPath);
    if (file) {
      const ext = path.extname(file).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      fs.createReadStream(file).pipe(res);
      return;
    }
    const nf = reqPath.startsWith('/bn/')
      ? path.join(DIST, 'bn', '404', 'index.html')
      : path.join(DIST, '404.html');
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex, follow' });
    fs.createReadStream(nf).pipe(res);
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)));
}

function runStep(cmd, args) {
  return new Promise((resolve, reject) => {
    console.log(`\n▶ ${cmd} ${args.join(' ')}`);
    const child = spawn(cmd, args, { stdio: 'inherit', cwd: ROOT });
    child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} ${args.join(' ')} exited with ${code}`))));
    child.on('error', reject);
  });
}

async function main() {
  if (!fs.existsSync(DIST)) {
    console.error('dist/ not found — run `npm run build` first.');
    process.exit(2);
  }
  const args = process.argv.slice(2);
  const baseIdx = args.indexOf('--base');
  const explicitBase = baseIdx >= 0 ? args[baseIdx + 1] : process.env.CI_BASE;
  const chunkIdx = args.indexOf('--chunk');
  const chunkArg = chunkIdx >= 0 && args[chunkIdx + 1] ? args[chunkIdx + 1] : null;

  let server = null;
  let baseUrl = explicitBase;
  if (!baseUrl) {
    server = await startDistServer();
    baseUrl = `http://127.0.0.1:${server.address().port}`;
  }

  try {
    await runStep('node', ['scripts/ci-seo-lint.mjs']);
    await runStep('node', ['scripts/ci-schema-lint.mjs']);
    await runStep('node', ['scripts/phase3-hreflang-verify.mjs']);
    await runStep('node', ['scripts/phase1-verify.mjs']);
    const parityArgs = ['scripts/ci-render-parity.mjs', '--base', baseUrl];
    if (chunkArg) parityArgs.push('--chunk', chunkArg);
    await runStep('node', parityArgs);
    console.log('\n✅ ALL CI GATES PASSED');
  } finally {
    if (server) server.close();
  }
}

main().catch((err) => {
  console.error('\n❌ CI FAILED:', err.message);
  process.exit(1);
});
