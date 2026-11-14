import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const vercel = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));

const redirectMap = new Map();
for (const r of (vercel.redirects || [])) {
  if (!r.has && !r.source.includes(':') && !r.source.includes('*')) {
    redirectMap.set(r.source, r.destination);
  }
}

function resolveFinal(urlPath) {
  let u = urlPath
    .replace(/^\/bn\/posts\//, '/bn/blog/')
    .replace(/^\/en\/posts\//, '/blog/')
    .replace(/^\/posts\//, '/blog/');

  const seen = new Set();
  while (redirectMap.has(u) && !seen.has(u)) {
    seen.add(u);
    u = redirectMap.get(u);
  }
  return u;
}

function walk(dir, list = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      walk(p, list);
    } else if (/\.(json|js|jsx|mjs|cjs)$/i.test(f) && !/posts-meta-(en|bn)\.json$|ga4_summary\.json$/.test(f)) {
      list.push(p);
    }
  }
  return list;
}

const files = walk(path.join(ROOT, 'src'));
let filesChanged = 0;
let linksRewritten = 0;

// Match href='...' or href="..." or href=\"...\" or to="..." or "link": "..."
const attrRegex = /(href\s*=\s*|to\s*=\s*|["']?(?:link|url|serviceUrl)["']?\s*:\s*)(["']|\\")(\/[^"'\\\s#?]+)\2/g;

for (const f of files) {
  const orig = fs.readFileSync(f, 'utf8');
  let changedInFile = 0;

  const updated = orig.replace(attrRegex, (full, prefix, quote, target) => {
    if (target.startsWith('/assets/') || target.startsWith('/images/') || target.startsWith('/fonts/') || target.startsWith('/api/')) {
      return full;
    }
    const resolved = resolveFinal(target);
    if (resolved !== target) {
      changedInFile++;
      linksRewritten++;
      return `${prefix}${quote}${resolved}${quote}`;
    }
    return full;
  });

  if (changedInFile > 0) {
    fs.writeFileSync(f, updated, 'utf8');
    filesChanged++;
  }
}

console.log(`Phase 1 internal link fix complete: rewrote ${linksRewritten} links across ${filesChanged} files.`);
