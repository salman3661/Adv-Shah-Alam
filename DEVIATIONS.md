# Deviations Log (`feat/autonomous-remediation`)

This file records technical or environmental constraints encountered during autonomous execution that could not be bypassed from code or the VM, together with the lowest-risk mitigation applied and residual risk.

## 1. Vercel Preview Deployment Authentication (SSO Gate)
- **Constraint:** All Vercel preview URLs generated for non-`main` branches (`https://adv-shah-alam-portfolio-*.vercel.app`) return `HTTP 302` redirecting to `https://vercel.com/sso-api?...` (Vercel Deployment Protection SSO). Additionally, the `vercel` CLI is not installed in the execution environment and no Vercel bypass token (`x-vercel-protection-bypass`) is configured.
- **Impact:** Running headless Playwright checks (`scripts/ci-render-parity.mjs`) directly against a `vercel.app` preview URL cannot read the rendered app DOM behind the Vercel login wall.
- **Mitigation Applied:**
  1. Hardened `scripts/ci-render-parity.mjs` to track final URLs and fail on off-host redirects so external SSO login pages can never produce a false-positive pass.
  2. Ran complete local CI (`scripts/run-ci.mjs` — SEO lint, Schema lint, Hreflang verifier, `phase1-verify`, and full 791-route headless Chromium render-parity against local `dist/` HTTP server) BEFORE merging.
  3. Merged green builds to `main`, waited for Vercel `Production` deployment `success`, and ran live verification directly against public `https://www.advmdshahalam.me`.
- **Residual Risk:** Low. Code is verified both locally across 100% of built routes and on live production immediately after release, with documented `git revert` rollback in `ROLLBACK.md`.

## 2. Google Search Console Service Account Secret Absent
- **Constraint:** `scripts/gsc-fetch.mjs` requires either `./gsc-service-account.json` or environment variable `GSC_SERVICE_ACCOUNT` (JSON credentials for a Google Cloud service account with Search Console read access). Neither exists in the VM filesystem, `.env`, or GitHub repository secrets (`gh secret list` shows only `GEMINI_API_KEY`).
- **Impact:** Running `npm run prebuild` (`node scripts/gsc-fetch.mjs`) exits gracefully cleanly using existing cached datasets (`baseline/gsc-pages.csv`, `baseline/gsc-queries.csv`, `Search Console CSV/*.xlsx`, and `scripts/gsc_live_queries.json`) rather than refreshing live last-7-day query metrics from the Search Console API.
- **Mitigation Applied:**
  1. Preserved all existing GSC lookup fallbacks and ensured `.github/workflows/weekly-scorecard.yml` passes `${{ secrets.GSC_SERVICE_ACCOUNT }}`, `${{ secrets.GA4_SERVICE_ACCOUNT }}`, and `${{ secrets.ADSENSE_REFRESH_TOKEN }}` when added in GitHub Repository Settings → Secrets and variables → Actions.
  2. Used the most recent verified Search Console export (`baseline/gsc-pages.csv`, `baseline/gsc-queries.csv`, `Search Console CSV/advmdshahalam.me-Performance-on-Search-2026-10-17.xlsx`) to rank top EN/NRB unpaired posts by impressions for Phase 2 hreflang twinning and striking-distance analysis.
- **Residual Risk:** Medium until owner adds `GSC_SERVICE_ACCOUNT` JSON secret to GitHub Actions / Vercel Environment Variables; once added, scheduled weekly scorecards and `prebuild` sync automatically without code changes.
