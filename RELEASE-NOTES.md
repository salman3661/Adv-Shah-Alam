# RELEASE NOTES — `feature/post-freeze-release`

**Branch:** `feature/post-freeze-release` (branched from `main` at `ab0a69a`)
**Production Status:** **UNCHANGED** — 20-day freeze (`2026-11-21 → 2026-12-11`) is intact. Nothing has been merged to `main` or deployed.

## 1. Merge & Deploy Command (For 11 Dec 2026 or When Owner Says "deploy")
```bash
git checkout main && git merge --no-ff feature/post-freeze-release && npm run ci:qa && npm run build && git push origin main
```

## 2. Full Diff Summary
- `reports/baseline-pre-freeze.json` — Phase 0.5 live production baseline (`824` sitemap URLs, `0` non-200, `48/48` legacy redirects `200`).
- `src/seo/entity.js` — Single canonical entity module (`Person` + `LegalService` + `WebSite` `@id` graph, verified `sameAs`, exact NAP, no fabricated `priceRange` or directory URLs).
- `src/pages/Blog.jsx` — Wired `?q=` query parameter so `WebSite` `SearchAction` (`/blog?q={search_term_string}`) filters EN blog posts on load.
- `src/pages/AdvocatePage.jsx` — Added `/nrb-legal-help` link and bilingual (EN + BN) free-first-consultation statement to the `/advocate-md-shah-alam` CTA block.
- `scripts/prerender.mjs` — Wired `src/seo/entity.js` into `buildInstitutionalSchema`, upgraded all 14 service pages (`7 EN + 7 BN`) to `LegalService` schema (removing unconfirmed `priceRange: '৳৳'`), and strengthened `advocateBody()` with statutory scope, NRB summary, bilingual free consultation, and chamber details.
- `scripts/qa/dupcheck.mjs` — TF-IDF semantic duplicate gate (`< 0.80` on `--file`, baseline `corpusPairsGe90: 12` on legacy corpus).
- `scripts/qa/validate.mjs` — Post JSON validator (title length, meta description, slug, word count, statute citation regex, internal links ≥ 8, FAQs ≥ 5).
- `scripts/publish-nrb.sh` — 9-gate EN+BN twin publisher (refuses to run on `main`).
- `scripts/queue/topics.json` & `scripts/queue/publish-log.jsonl` — 30-day NRB + 5 brand/entity topic queue (`primaryStatute.verified: false` until verified) and append-only publish ledger.
- `package.json` — Added `ci:qa` script (`dupcheck.mjs` + `ci-seo-lint.mjs` + `ci-schema-lint.mjs` + `phase3-hreflang-verify.mjs`).
- `release-pack/profiles/directories-and-social.md` — NAP-consistent copy blocks for `lawchamber.com.bd`, `legalco.com.bd`, `bdadvocates.com`, Bangladesh Bar Council directory, LinkedIn, and Facebook.
- `release-pack/gbp/gbp-pack.md` — Google Business Profile setup pack (NAP, categories, hours, EN+BN descriptions, 5 real photo prompts).
- `release-pack/distribution/{copy-pack.md,utm-map.json,communities.md}` — Problem-first NRB & local BD distribution copy with verified `200` landing URLs and UTMs.

## 3. Phase 4 Verification Table (Measured on `feature/post-freeze-release`)

| Check | Measured Result | Status |
|---|---|---|
| Production Baseline (Phase 0.5) | `824` sitemap URLs (`0` non-200), `48/48` legacy redirects → `200` | PASS |
| Build & Prerender (`npm run build`) | `800` prerendered pages (`316 EN + 468 BN + core/service/hub`) | PASS |
| `ci-seo-lint.mjs` | `824` sitemap URLs, `0` H1/title/desc/noindex/chain/broken/redirect errors | PASS |
| `ci-schema-lint.mjs` | `824` pages (`2,379` schemas), `0` JSON/ID/breadcrumb/scope errors | PASS |
| `phase3-hreflang-verify.mjs` | `824` pages (`197` bilingual pairs), `0` errors | PASS |
| `ci-render-parity.mjs` | `10/10` core & changed routes identical to prerender | PASS |
| `ci-cwv-ads.mjs` | `26/26` passed (`CLS 0–0.0003`, `LCP 296–664ms`, `manual=4/2/3`, `minH=100/250`) | PASS |
| UTM Distribution Targets | `12/12` target paths verified in `dist/` | PASS |

## 4. Rollback Plan
- Before merge: `git checkout main && git branch -D feature/post-freeze-release`
- After merge: `git revert -m 1 <merge-commit-sha> && git push origin main` (or redeploy `ab0a69a` in Vercel Dashboard).

## 5. Owner Must Supply (Not Fabricated by Agent)
- Confirmed `sameAs` URLs for `lawchamber.com.bd`, `legalco.com.bd`, `bdadvocates.com`, and Bangladesh Bar Council directory (only existing `facebook`, `linkedin`, `maps.app.goo.gl` URLs are included in `src/seo/entity.js`).
- Exact Bar Council enrolment number & year (if you wish to display them on `/advocate-md-shah-alam`).
- Confirmed `priceRange` / chamber fee ranges (omitted from `LegalService` schema until confirmed).
- Verified client testimonials or official case counts (omitted).

## 6. Owner Must Execute (Off-Site)
1. **AdSense Dashboard (2 min):** `Find more ad placements on article pages → OFF`, `Allow Google to optimise existing ads → OFF`, `Minimum distance between ads → 310px`, `Maximum number of ads on a page → 6`.
2. **Google Business Profile (`release-pack/gbp/gbp-pack.md`):** Create & verify via phone (`+8801712655546`) with 5 real chamber photos.
3. **Lawyer Directories (`release-pack/profiles/directories-and-social.md`):** Create/update profiles on `lawchamber.com.bd`, `legalco.com.bd`, `bdadvocates.com` with identical NAP.
4. **NRB Distribution (`release-pack/distribution/copy-pack.md`):** Post problem-first variants in UK/US/CA/UAE NRB groups, Reddit, Quora, LinkedIn, and Uttara/Dhaka local groups.
