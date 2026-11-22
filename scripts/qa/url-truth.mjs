#!/usr/bin/env node
/**
 * scripts/qa/url-truth.mjs — machine-generated live-URL source of truth
 *
 * Fetches https://www.advmdshahalam.me/sitemap.xml, extracts every live URL,
 * writes a sorted list to reports/live-urls.json, and exposes:
 *   - assertLiveUrl(pathOrUrl): throws if path is not in reports/live-urls.json
 *   - loadLiveUrls(): returns { data, paths, set }
 *
 * CLI modes:
 *   node scripts/qa/url-truth.mjs                    # refresh reports/live-urls.json from live sitemap
 *   node scripts/qa/url-truth.mjs --check-redirects  # validate all Stage B sources against live-urls.json
 *   node scripts/qa/url-truth.mjs --regression       # assert Stage B sources pass AND old typo slug FAILS
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const LIVE_ORIGIN = 'https://www.advmdshahalam.me';
const OUT_FILE = path.join(ROOT, 'reports/live-urls.json');

export function normalizePath(pathOrUrl) {
  let s = String(pathOrUrl || '').trim();
  if (/^https?:\/\//i.test(s)) {
    s = new URL(s).pathname;
  }
  s = s.split('?')[0].split('#')[0];
  if (s.length > 1 && s.endsWith('/')) s = s.slice(0, -1);
  return s || '/';
}

let _cache = null;
export function loadLiveUrls(file = OUT_FILE) {
  if (_cache && file === OUT_FILE) return _cache;
  if (!fs.existsSync(file)) {
    throw new Error(`[url-truth] ${file} missing — run: node scripts/qa/url-truth.mjs`);
  }
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const set = new Set((data.paths || []).map(normalizePath));
  const res = { data, paths: data.paths || [], set };
  if (file === OUT_FILE) _cache = res;
  return res;
}

export function assertLiveUrl(pathOrUrl, file = OUT_FILE) {
  const { set } = loadLiveUrls(file);
  const p = normalizePath(pathOrUrl);
  if (!set.has(p)) {
    throw new Error(`[url-truth] NOT IN LIVE SITEMAP (${file}): ${p}`);
  }
  return p;
}

export async function refreshLiveUrls() {
  const res = await fetch(`${LIVE_ORIGIN}/sitemap.xml`, {
    headers: { 'user-agent': 'url-truth/1.0' },
  });
  if (!res.ok) {
    throw new Error(`[url-truth] failed to fetch ${LIVE_ORIGIN}/sitemap.xml: HTTP ${res.status}`);
  }
  const xml = await res.text();
  const rawLocs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1].trim());
  const paths = [...new Set(rawLocs.map(normalizePath))].sort();
  const urls = paths.map((p) => (p === '/' ? LIVE_ORIGIN : `${LIVE_ORIGIN}${p}`));
  const payload = {
    generatedAt: new Date().toISOString(),
    source: `${LIVE_ORIGIN}/sitemap.xml`,
    count: paths.length,
    paths,
    urls,
  };
  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(payload, null, 2) + '\n', 'utf8');
  _cache = null;
  return payload;
}

const EXPECTED_STAGE_B_REDIRECTS = 6;

function checkStageBRedirects() {
  const cfgPath = path.join(ROOT, 'seo/stage-b-clusters.json');
  const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
  const sources = [];
  const targets = new Set();
  for (const c of cfg.clusters) {
    assertLiveUrl(c.master);
    targets.add(normalizePath(c.master));
    for (const s of c.sources) {
      assertLiveUrl(s);
      sources.push(normalizePath(s));
    }
  }
  if (sources.length !== EXPECTED_STAGE_B_REDIRECTS) {
    throw new Error(`[url-truth] Stage B redirect count mismatch: expected ${EXPECTED_STAGE_B_REDIRECTS}, got ${sources.length}`);
  }
  // Ensure every Stage B source AND target is valid in vercel.json (301, non-404 target)
  const vercel = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));
  const vRules = (vercel.redirects || []).filter((r) => !r.has && r.statusCode === 301);
  const vMap = new Map(vRules.map((r) => [normalizePath(r.source), normalizePath(r.destination)]));
  let matched = 0;
  for (const c of cfg.clusters) {
    const master = normalizePath(c.master);
    assertLiveUrl(master);
    for (const s of c.sources) {
      const src = normalizePath(s);
      const dest = vMap.get(src);
      if (!dest) throw new Error(`[url-truth] Stage B source missing 301 rule in vercel.json: ${src}`);
      if (dest !== master) throw new Error(`[url-truth] Stage B rule destination mismatch: ${src} -> ${dest} (expected ${master})`);
      assertLiveUrl(dest);
      matched++;
    }
  }
  if (matched !== EXPECTED_STAGE_B_REDIRECTS) {
    throw new Error(`[url-truth] vercel.json Stage B rule count mismatch: expected ${EXPECTED_STAGE_B_REDIRECTS}, got ${matched}`);
  }
  return { checked: sources.length, masters: targets.size };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname);
if (isMain) {
  const args = process.argv.slice(2);
  if (args.includes('--check-redirects')) {
    const r = checkStageBRedirects();
    console.log(`[url-truth] PASS — ${r.checked} Stage B redirect sources + ${r.masters} masters verified against reports/live-urls.json`);
  } else if (args.includes('--regression')) {
    const r = checkStageBRedirects();
    const BAD_TYPO_SLUG = '/bn/blog/dv-act-mithya-nirjoton-mamla-defense-2026-bn';
    let threw = false;
    try {
      assertLiveUrl(BAD_TYPO_SLUG);
    } catch (e) {
      threw = true;
      console.log(`[url-truth] regression confirmed old typo slug FAILS: ${e.message}`);
    }
    if (!threw) {
      console.error(`[url-truth] FAIL — old typo slug ${BAD_TYPO_SLUG} was not rejected!`);
      process.exit(1);
    }
    const BAD_TARGET = '/blog/non-existent-broken-target-404';
    let targetThrew = false;
    try {
      assertLiveUrl(BAD_TARGET);
    } catch (e) {
      targetThrew = true;
      console.log(`[url-truth] regression confirmed broken target FAILS: ${e.message}`);
    }
    if (!targetThrew) {
      console.error(`[url-truth] FAIL — broken target ${BAD_TARGET} was not rejected!`);
      process.exit(1);
    }
    console.log(`[url-truth] REGRESSION PASS — ${r.checked} Stage B sources + ${r.masters} targets valid, typo slug & broken target rejected`);
  } else {
    const payload = await refreshLiveUrls();
    console.log(`[url-truth] wrote ${payload.count} sorted live URLs to reports/live-urls.json`);
  }
}
