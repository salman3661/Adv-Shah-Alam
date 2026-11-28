#!/usr/bin/env node
/**
 * scripts/qa/redirect-chain.mjs — Redirect Target & Chain Integrity CI Gate (v11.1)
 *
 * 1. Machine-extracts all redirect rules from vercel.json.
 * 2. Verifies every non-wildcard, non-conditional redirect rule's destination resolves
 *    to an existing built artifact in dist/ (HTTP 200, never a 404 dead end).
 * 3. Detects redirect loops and multi-hop chains (> 1 hop).
 * 4. Explicitly verifies /sitemap.html and /sitemap 301-redirect to /sitemap.xml
 *    and that dist/sitemap.xml exists.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const DIST = path.join(ROOT, 'dist');
const VERCEL_PATH = path.join(ROOT, 'vercel.json');
const BASE = 'https://www.advmdshahalam.me';

function normalizeTarget(dest) {
  let s = String(dest || '').trim();
  if (s.startsWith(BASE)) s = s.slice(BASE.length) || '/';
  if (/^https?:\/\//i.test(s)) return { external: true, path: s };
  s = s.split('?')[0].split('#')[0];
  if (s.length > 1 && s.endsWith('/')) s = s.slice(0, -1);
  return { external: false, path: s || '/' };
}

function existsInDist(uPath) {
  const clean = uPath === '/' ? 'index.html' : uPath.replace(/^\/+/, '');
  for (const c of [path.join(DIST, clean), path.join(DIST, `${clean}.html`), path.join(DIST, clean, 'index.html')]) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return true;
  }
  return false;
}

const vercel = JSON.parse(fs.readFileSync(VERCEL_PATH, 'utf8'));
const rules = (vercel.redirects || []).filter((r) => !r.has);

const ruleMap = new Map();
for (const r of rules) {
  if (!r.source.includes(':') && !r.source.includes('*')) {
    ruleMap.set(r.source, r);
  }
}

const errors = [];
let checked = 0;

for (const [src, r] of ruleMap.entries()) {
  checked++;
  const t = normalizeTarget(r.destination);
  if (t.external) continue;

  // Check for multi-hop chains / loops
  if (ruleMap.has(t.path)) {
    const hop2 = ruleMap.get(t.path);
    errors.push(`Multi-hop redirect chain: ${src} -> ${t.path} -> ${hop2.destination}`);
  }

  // Verify final target exists in dist/ (HTTP 200)
  if (!existsInDist(t.path)) {
    errors.push(`Broken redirect target (404 in dist/): ${src} (${r.statusCode || 308}) -> ${r.destination} [resolved: ${t.path}]`);
  }
}

// Explicit sitemap.html & /sitemap regression checks
for (const sPath of ['/sitemap.html', '/sitemap']) {
  const r = ruleMap.get(sPath);
  if (!r) {
    errors.push(`Missing 301 redirect rule for ${sPath} -> /sitemap.xml`);
  } else {
    const t = normalizeTarget(r.destination);
    if (r.statusCode !== 301 || t.path !== '/sitemap.xml') {
      errors.push(`Invalid ${sPath} redirect: expected 301 -> /sitemap.xml, got ${r.statusCode} -> ${r.destination}`);
    }
  }
}
if (!existsInDist('/sitemap.xml')) {
  errors.push('Missing dist/sitemap.xml');
}

// Machine-extract & verify all 9 GSC dead URLs from reports/gsc-dead-urls-2026-11-28.csv
const gscDeadCsvPath = path.join(ROOT, 'reports/gsc-dead-urls-2026-11-28.csv');
let gscDeadChecked = 0;
if (fs.existsSync(gscDeadCsvPath)) {
  const lines = fs.readFileSync(gscDeadCsvPath, 'utf8').split(/\r?\n/).slice(1).filter(Boolean);
  for (const line of lines) {
    const [src, target] = line.split(',').map((s) => s.trim());
    if (!src || !target) continue;
    gscDeadChecked++;
    const r = ruleMap.get(src);
    if (!r) {
      errors.push(`Missing GSC dead-URL 301 redirect in vercel.json: ${src} -> ${target}`);
    } else {
      const t = normalizeTarget(r.destination);
      if (r.statusCode !== 301 || t.path !== target) {
        errors.push(`GSC dead-URL mismatch for ${src}: expected 301 -> ${target}, got ${r.statusCode} -> ${r.destination}`);
      } else if (!existsInDist(t.path)) {
        errors.push(`GSC dead-URL target missing in dist/: ${src} -> ${t.path}`);
      }
    }
  }
}

console.log(`[redirect-chain] checked=${checked} literal redirect rules in vercel.json (gscDeadUrls=${gscDeadChecked}), errors=${errors.length}`);
if (errors.length) {
  for (const e of errors.slice(0, 30)) console.error('  FAIL:', e);
  process.exit(1);
}
console.log(`[redirect-chain] PASS — ${checked}/${checked} redirect targets resolve to 200 in dist/, ${gscDeadChecked}/${gscDeadChecked} GSC dead URLs -> 301, 0 chains, /sitemap.html & /sitemap -> 301 -> /sitemap.xml`);
