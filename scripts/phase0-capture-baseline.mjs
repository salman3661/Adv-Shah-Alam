import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

const ROOT = process.cwd();
const SITEMAP_PATH = path.join(ROOT, 'public', 'sitemap.xml');
const BASELINE_DIR = path.join(ROOT, 'baseline');
const PAGES_DIR = path.join(BASELINE_DIR, 'pages');

fs.mkdirSync(PAGES_DIR, { recursive: true });

const xml = fs.readFileSync(SITEMAP_PATH, 'utf8');
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());

console.log(`Found ${urls.length} URLs in public/sitemap.xml`);

function sha1(str) {
  return crypto.createHash('sha1').update(str).digest('hex');
}

function md5(buf) {
  return crypto.createHash('md5').update(buf).digest('hex');
}

async function fetchUrlWithCurl(url) {
  const urlSha1 = sha1(url);
  const htmlPath = path.join(PAGES_DIR, `${urlSha1}.html`);
  const hdrPath = path.join(PAGES_DIR, `${urlSha1}.headers.tmp`);

  try {
    const { stdout } = await execFileAsync('curl', [
      '-sS',
      '-L',
      '-D', hdrPath,
      '-o', htmlPath,
      '-w', '%{http_code}\t%{url_effective}\t%{size_download}\t%{num_redirects}',
      '--max-time', '20',
      url
    ]);

    const [statusStr, finalUrl, sizeStr, redirectsStr] = stdout.trim().split('\t');
    const htmlBuf = fs.existsSync(htmlPath) ? fs.readFileSync(htmlPath) : Buffer.alloc(0);
    const rawHeaders = fs.existsSync(hdrPath) ? fs.readFileSync(hdrPath, 'utf8') : '';
    if (fs.existsSync(hdrPath)) fs.unlinkSync(hdrPath);

    // Parse last header block
    const blocks = rawHeaders.trim().split(/\r?\n\r?\n/);
    const lastBlock = blocks[blocks.length - 1] || '';
    const headerLines = lastBlock.split(/\r?\n/);
    const headers = {};
    for (let i = 1; i < headerLines.length; i++) {
      const idx = headerLines[i].indexOf(':');
      if (idx > 0) {
        const k = headerLines[i].slice(0, idx).trim().toLowerCase();
        const v = headerLines[i].slice(idx + 1).trim();
        headers[k] = v;
      }
    }

    return {
      url,
      sha1: urlSha1,
      status: parseInt(statusStr, 10) || 0,
      finalUrl: finalUrl || url,
      numRedirects: parseInt(redirectsStr, 10) || 0,
      htmlBytes: htmlBuf.length,
      htmlSha1: sha1(htmlBuf),
      htmlMd5: md5(htmlBuf),
      headers,
      file: `baseline/pages/${urlSha1}.html`
    };
  } catch (err) {
    if (fs.existsSync(hdrPath)) fs.unlinkSync(hdrPath);
    return {
      url,
      sha1: urlSha1,
      status: 0,
      finalUrl: url,
      error: err.message,
      htmlBytes: 0,
      file: `baseline/pages/${urlSha1}.html`
    };
  }
}

async function main() {
  const CONCURRENCY = 25;
  const results = new Array(urls.length);
  let cursor = 0;
  let completed = 0;

  async function worker() {
    while (true) {
      const idx = cursor++;
      if (idx >= urls.length) break;
      const res = await fetchUrlWithCurl(urls[idx]);
      results[idx] = res;
      completed++;
      if (completed % 100 === 0 || completed === urls.length) {
        console.log(`Progress: ${completed}/${urls.length} (${res.status} ${res.url})`);
      }
    }
  }

  const start = Date.now();
  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);

  const indexData = {
    capturedAt: new Date().toISOString(),
    gitSha: '63b0a2480bd6a06065e698c98d65b8c6554d780d',
    totalUrls: results.length,
    statusCounts: results.reduce((acc, r) => {
      acc[r.status] = (acc[r.status] || 0) + 1;
      return acc;
    }, {}),
    elapsedSeconds: parseFloat(elapsed),
    pages: results
  };

  fs.writeFileSync(path.join(BASELINE_DIR, 'index.json'), JSON.stringify(indexData, null, 2), 'utf8');
  console.log(`Done in ${elapsed}s. Status counts:`, indexData.statusCounts);
}

main();
