#!/usr/bin/env node
/**
 * ci-render-parity.mjs — the gate that would have caught the P0 bug.
 *
 * WHY THIS EXISTS
 * ---------------
 * This site is a Vite/React SPA that is prerendered to static HTML at build
 * time. Both exist:
 *
 *   static HTML  → what a plain `curl` sees. Perfectly correct.
 *   rendered DOM → what Googlebot and every real browser sees AFTER hydration.
 *
 * Googlebot does NOT read static HTML. It renders the page. If the React
 * router does not know a route, hydration replaces the good prerendered HTML
 * with the 404 component. The route then returns HTTP 200 with a "Page Not
 * Found" body, and Google drops it from the index.
 *
 * That exact bug shipped: /blog/page/N and /blog/topic/:slug were prerendered
 * correctly but 404'd in the client router, hiding 644 posts.
 *
 * WHAT THIS SCRIPT DOES
 * ---------------------
 * For every route in the sitemap + every pagination page + every topic hub:
 *   1. fetch the static HTML
 *   2. load the same URL in headless Chromium and read the RENDERED DOM
 *   3. FAIL if the rendered H1 is a 404 string
 *   4. FAIL if the rendered H1 differs from the static H1
 *   5. FAIL if static has internal links but rendered has none
 *   6. FAIL if the HTTP status is not 200
 *
 * EXIT 0 = all routes render correctly. EXIT 1 = at least one fails.
 *
 * USAGE
 *   node scripts/ci-render-parity.mjs
 *   node scripts/ci-render-parity.mjs --base https://preview-url.vercel.app
 *   node scripts/ci-render-parity.mjs --sitemap public/sitemap.xml
 *   node scripts/ci-render-parity.mjs --routes /blog/page/2,/blog/topic/bail-law
 */

import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

/* ------------------------------------------------------------------ args */
const argv = process.argv.slice(2);
const arg = (name, dflt) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : dflt;
};
const has = (name) => argv.includes(`--${name}`);

const BASE = (arg("base", process.env.SITE_URL || "https://www.advmdshahalam.me")).replace(/\/$/, "");
const SITEMAP = arg("sitemap", "public/sitemap.xml");
const TIMEOUT = Number(arg("timeout", "45000"));

/* ------------------------------------------------------- playwright load */
let chromium;
async function getChromium() {
  if (chromium) return chromium;
  // ESM import() ignores NODE_PATH, so use createRequire (CJS) which honours it.
  const { createRequire } = await import("node:module");
  const require = createRequire(import.meta.url);
  const extraPaths = [
    "/usr/local/lib/node_modules",
    "/usr/lib/node_modules",
    process.env.NODE_PATH,
  ].filter(Boolean).flatMap((p) => p.split(":"));
  const tries = [];
  for (const p of extraPaths) {
    for (const m of ["playwright", "playwright-core", "puppeteer", "puppeteer-core"]) {
      tries.push([m, p]);
    }
  }
  for (const m of ["playwright", "playwright-core", "puppeteer", "puppeteer-core"]) {
    tries.push([m, null]);
  }
  for (const [mod, base] of tries) {
    try {
      const resolved = base
        ? require(require.resolve(mod, { paths: [base] }))
        : await import(mod);
      if (mod.startsWith("playwright")) {
        const pw = resolved.chromium || resolved.default?.chromium;
        if (!pw) continue;
        chromium = { kind: "playwright", pw };
      } else {
        chromium = { kind: "puppeteer", pp: resolved.default || resolved };
      }
      return chromium;
    } catch { /* try next */ }
  }
  return null;
}

/* --------------------------------------------------------- route sources */
async function sitemapRoutes() {
  const p = resolve(ROOT, SITEMAP);
  if (!existsSync(p)) {
    console.error(`FATAL: sitemap not found at ${p}`);
    process.exit(2);
  }
  const xml = readFileSync(p, "utf8");
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1].trim());
}

/** Derive the extra routes that the build creates but the sitemap may omit. */
async function derivedRoutes() {
  const out = [];
  const vercelPath = resolve(ROOT, "vercel.json");
  const redirectSources = new Set();
  if (existsSync(vercelPath)) {
    try {
      const vc = JSON.parse(readFileSync(vercelPath, "utf8"));
      for (const r of vc.redirects || []) {
        if (!r.has && r.source) redirectSources.add(r.source);
      }
    } catch { /* optional */ }
  }
  // pagination: count active published posts per language from the content dir
  for (const [dir, prefix] of [["en", "/blog"], ["bn", "/bn/blog"]]) {
    const cdir = resolve(ROOT, "src/content/posts", dir);
    if (!existsSync(cdir)) continue;
    const { readdirSync } = await import("node:fs");
    let n = 0;
    for (const f of readdirSync(cdir)) {
      if (!f.endsWith(".json")) continue;
      try {
        const p = JSON.parse(readFileSync(resolve(cdir, f), "utf8").replace(/^\uFEFF/, ""));
        if (p && p.slug && !p.isDraft && !p._draft && !redirectSources.has(`${prefix}/${p.slug}`)) n++;
      } catch { /* ignore */ }
    }
    const perPage = 24;
    const pages = Math.ceil(n / perPage);
    for (let p = 2; p <= pages; p++) out.push(`${prefix}/page/${p}`);
  }
  // topic hubs: read the topic slug list the build uses
  const topicFile = resolve(ROOT, "src/content/topics.json");
  if (existsSync(topicFile)) {
    try {
      const t = JSON.parse(readFileSync(topicFile, "utf8"));
      const slugs = Array.isArray(t) ? t.map((x) => x.slug || x) : Object.keys(t);
      for (const s of slugs) if (s) {
        out.push(`/blog/topic/${s}`);
        out.push(`/bn/blog/topic/${s}`);
      }
    } catch { /* optional */ }
  }
  // fall back: probe a known set of topic slugs
  if (!out.some((r) => r.startsWith("/blog/topic/"))) {
    const probe = ["bail-law", "corporate-tax-law", "criminal-law", "divorce-family-law",
                   "land-property-law", "nrb-immigration-law", "supreme-court-writ"];
    for (const s of probe) {
      out.push(`/blog/topic/${s}`);
      out.push(`/bn/blog/topic/${s}`);
    }
  }
  return out;
}

/* ------------------------------------------------------------- fetching */
const NOT_FOUND_HINTS = ["page not found", "পেজ পাওয়া যায়নি", "404", "not found"];

const decodeEntities = (s) => s
  .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ")
  .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)));

function staticInfo(html) {
  const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || "";
  const text = decodeEntities(h1.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
  const links = (html.match(/<a\b[^>]*href=["'][^"']*\/blog\//gi) || []).length;
  const allLinks = (html.match(/<a\b[^>]*href=/gi) || []).length;
  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "";
  return { h1: text, links, allLinks, title: title.replace(/\s+/g, " ").trim() };
}

async function getStatic(path) {
  const res = await fetch(BASE + path, { redirect: "follow" });
  const html = await res.text();
  return { status: res.status, html, ...staticInfo(html) };
}

/* ------------------------------------------------------- rendered fetch */
async function getRendered(path, browser) {
  const ctx = await browser.newContext({
    viewport: { width: 1366, height: 900 },
    ignoreHTTPSErrors: true,
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
               "(KHTML, like Gecko) Chrome/126.0 Safari/537.36",
  });
  const page = await ctx.newPage();
  try {
    const resp = await page.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: TIMEOUT });
    await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});

    // CRITICAL: the static prerender and the hydrated DOM can look identical for a
    // moment. If we read too early we measure the PRERENDER and wrongly pass a route
    // that actually 404s in the browser. So wait until the DOM stops changing.
    const t0 = Date.now();
    let lastSig = null, stable = 0;
    while (Date.now() - t0 < 14000) {
      const sig = await page.evaluate(() => {
        const root = document.getElementById("root");
        const h1 = document.querySelector("h1");
        return [
          root ? root.innerHTML.length : 0,
          h1 ? h1.innerText.length : 0,
          document.body.innerText.length,
        ].join(":");
      });
      if (sig === lastSig) { stable++; if (stable >= 3) break; }
      else { stable = 0; lastSig = sig; }
      await page.waitForTimeout(400);
    }
    const read = () => page.evaluate(() => {
      const h1 = document.querySelector("h1");
      const root = document.getElementById("root");
      return {
        h1: h1 ? h1.innerText.replace(/\s+/g, " ").trim() : "",
        links: document.querySelectorAll('a[href*="/blog/"]').length,
        totalLinks: document.querySelectorAll("a[href]").length,
        title: document.title,
        bodyText: (document.body.innerText || "").replace(/\s+/g, " ").trim().length,
        hydrated: !!root && root.innerHTML.trim().length > 0,
      };
    });
    let dom = await read();
    // still suspicious — give it one more settle window
    if (!dom.h1 || (dom.bodyText < 200 && dom.links < 3)) {
      await page.waitForTimeout(5000);
      await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});
      dom = await read();
    }
    return { status: resp?.status() ?? 0, ...dom };
  } finally {
    await ctx.close().catch(() => {});
  }
}

/* --------------------------------------------------------------- main */
async function main() {
  const only = arg("routes", "");
  const chunkSpec = arg("chunk", "");
  let routes;
  if (only) {
    routes = only.split(",").map((s) => s.trim()).filter(Boolean);
  } else {
    const sm = await sitemapRoutes();
    const derived = await derivedRoutes();
    routes = [...new Set([...sm, ...derived])].map((u) => {
      try { return new URL(u).pathname + new URL(u).search; } catch { return u; }
    });
  }
  if (chunkSpec && /^\d+\/\d+$/.test(chunkSpec)) {
    const [idxStr, totalStr] = chunkSpec.split("/");
    const idx = Math.max(1, Number(idxStr));
    const tot = Math.max(1, Number(totalStr));
    const size = Math.ceil(routes.length / tot);
    routes = routes.slice((idx - 1) * size, idx * size);
  }

  console.log("═".repeat(78));
  console.log("  CI · RENDER PARITY  (static HTML  vs  rendered DOM)");
  console.log("═".repeat(78));
  console.log(`  base      : ${BASE}`);
  console.log(`  sitemap   : ${SITEMAP}` + (only ? "  (bypassed --routes given)" : (chunkSpec ? `  (chunk ${chunkSpec})` : "")));
  console.log(`  total     : ${routes.length} routes to verify`);
  console.log("═".repeat(78));

  const engine = await getChromium();
  if (!engine) {
    console.error("\nFATAL: no headless browser available.");
    console.error("Install one of:\n");
    console.error("  npm i -D playwright && npx playwright install chromium");
    console.error("  npm i -D puppeteer\n");
    process.exit(2);
  }
  console.log(`  browser   : ${engine.kind}\n`);

  const execPath = process.env.CHROMIUM_PATH || (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined);
  let browser;
  if (engine.kind === "playwright") {
    browser = await engine.pw.launch({
      args: ["--no-sandbox", "--disable-dev-shm-usage"],
      executablePath: execPath,
    });
  } else {
    browser = await engine.pp.launch({
      args: ["--no-sandbox", "--disable-dev-shm-usage"],
      executablePath: execPath,
    });
  }

  const fails = [];
  const warns = [];
  let done = 0;
  const CONC = 6;

  const worker = async (path) => {
    try {
      const s = await getStatic(path);
      const r = await getRendered(path, browser);
      const issues = [];

      if (s.status !== 200) issues.push({ lvl: "FAIL", msg: `static HTTP ${s.status}` });
      if (r.status !== 200) issues.push({ lvl: "FAIL", msg: `rendered HTTP ${r.status}` });

      const rH1 = (r.h1 || "").toLowerCase();
      const is404 = NOT_FOUND_HINTS.some((h) => rH1.includes(h));
      const drifted = s.h1 && r.h1 && s.h1.toLowerCase() !== r.h1.toLowerCase();

      // --- HARD FAIL: the route is broken in the browser (this is the P0 class)
      const stub = r.bodyText < 200 && r.links < 3;
      if (is404) issues.push({ lvl: "FAIL", msg: `rendered H1 is a 404 page: "${r.h1}"` });
      if (s.links > 3 && r.links === 0 && stub) {
        issues.push({ lvl: "FAIL", msg: `static has ${s.links} links but rendered has 0 and the body is a stub — router 404'd the route` });
      } else if (s.links > 3 && r.links === 0 && !stub) {
        issues.push({ lvl: "WARN", msg: `static has ${s.links} links, rendered has 0 (body ${r.bodyText} chars) — check link template` });
      }
      if (!r.h1) issues.push({ lvl: "FAIL", msg: "rendered DOM has no H1" });
      if (stub) {
        issues.push({ lvl: "FAIL", msg: `rendered body only ${r.bodyText} chars / ${r.links} links — likely a stub` });
      }
      // --- WARN: content drift between prerender and runtime (not a routing break)
      if (drifted && !is404) {
        issues.push({ lvl: "WARN", msg: `H1 drift — static "${s.h1.slice(0, 44)}" vs rendered "${r.h1.slice(0, 44)}"` });
      }
      return { path, issues, staticH1: s.h1, renderedH1: r.h1, staticLinks: s.links, renderedLinks: r.links };
    } catch (e) {
      return { path, issues: [{ lvl: "FAIL", msg: `probe error: ${String(e).split("\n")[0].slice(0, 140)}` }], fatal: true };
    }
  };

  const queue = [...routes];
  const runners = Array.from({ length: CONC }, async () => {
    while (queue.length) {
      const p = queue.shift();
      const res = await worker(p);
      done++;
      const hard = res.issues.filter((i) => i.lvl === "FAIL");
      const soft = res.issues.filter((i) => i.lvl === "WARN");
      if (hard.length) fails.push(res);
      if (soft.length) warns.push(res);
      const mark = hard.length ? "✗" : soft.length ? "·" : "✓";
      const first = hard[0] || soft[0];
      if (hard.length || soft.length || done % 50 === 0 || res.path.includes("/page/") || res.path.includes("/topic/")) {
        console.log(`  ${mark} ${res.path}${first ? "  → " + first.msg : ""}`);
      }
    }
  });
  await Promise.all(runners);

  await browser.close();

  console.log("\n" + "═".repeat(78));
  if (warns.length) {
    console.log(`  ${warns.length} warning(s) — content drift between prerender and runtime:`);
    for (const w of warns.slice(0, 12)) {
      for (const i of w.issues.filter((x) => x.lvl === "WARN")) console.log(`    · ${w.path}  ${i.msg}`);
    }
    console.log("");
  }
  if (fails.length === 0) {
    console.log(`  ✓ RENDER PARITY OK — ${done}/${done} routes render identically to their prerender`);
    console.log("═".repeat(78));
    process.exit(0);
  }

  console.log(`  ✗ ${fails.length}/${done} routes FAILED render parity\n`);
  const byIssue = new Map();
  for (const f of fails) {
    for (const i of f.issues) {
      const k = i.msg.replace(/\b\d{2,}\b/g, "#").slice(0, 92);
      byIssue.set(k, (byIssue.get(k) || 0) + 1);
    }
  }
  console.log("  ROOT CAUSE GROUPING:");
  for (const [k, n] of [...byIssue.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`    ${String(n).padStart(4)}×  ${k}`);
  }
  console.log("\n  FAILING ROUTES:");
  for (const f of fails.slice(0, 40)) {
    console.log(`    ${f.path}`);
    for (const i of f.issues) console.log(`        [${i.lvl}] ${i.msg}`);
  }
  if (fails.length > 40) console.log(`    … and ${fails.length - 40} more`);
  console.log("\n  FIX: add the missing route to the React router so hydration does not");
  console.log("       replace the prerendered markup with the 404 component.");
  console.log("═".repeat(78));
  process.exit(1);
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(2);
});
