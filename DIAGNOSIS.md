# DIAGNOSIS — advmdshahalam.me (Views + Earning Recovery)
**Date:** 2026-11-17  
**Baseline Source:** Live production measurements from `master-prompt-recovery.md` §2.3, `ADSENSE-SETTINGS-REVIEW.md`, `INCOME-REALITY-CHECK.md`, and `MONETIZATION-FUNNEL.md`.

---

## 1. GSC D1–D7 Status & Assumptions
- `gsc-service-account.json` is not present in the local workspace (`prebuild` skips live GSC/GA4/AdSense API sync cleanly).
- Per `master-prompt-recovery.md` §0 & §2.3, this diagnosis uses the independently measured live production baseline (17 Nov 2026) and `FINAL-REPORT.md` AdSense/GSC figures as the baseline:
  - **Traffic & Mix:** ~11,765 views / 30d (~392 views/day), **93% local Bangladesh** (`10,984` views → `$6.02`, **$0.55 RPM**) vs **6.6% Tier-1 / NRB English** (`781` views → `$6.51`, **$8.34 RPM** — 15× higher yield).
  - **Ranking Sanity:** `"bail lawyer dhaka advocate shah alam"` ranks `#1–#8` (site is **not** de-indexed).
  - **Technical Baseline:** `784` sitemap URLs (all HTTP `200`, `0` `noindex`), `821/821` render parity PASS, `0` duplicate titles, `0` similarity ≥ `0.85`.

---

## 2. Root Causes Identified (A / B / C / D)

### Primary Technical Cause: **C — CWV / CLS Degradation from AdSense Auto-Ads & Slot Overflow**
- **Measured Impact:** Clean A/B test on EN post (`ADSENSE-SETTINGS-REVIEW.md` §3):
  - Ads blocked: `CLS = 0.0000` (0 shifts)
  - Ads allowed: `CLS = 0.0984` (up to `0.308` on run-to-run variance) → **Core Web Vitals FAIL**.
- **Two Concrete Sources:**
  1. **AdSense Dashboard Auto-Placement:** `"Find more ad placements on article pages"` + `"Allow Google to optimise existing ads"` inject a `390px` `div.google-auto-placed` directly inside `main#main-content` with zero reserved space, while `filled = 0` (zero revenue gain, pure CWV loss). *(Requires Owner Dashboard toggle OFF.)*
  2. **Manual Slot Overflow (`230px` vs `301px`):** In `src/index.css`, `.ad-slot-reserved[data-ad-status-wrapper="unfilled"] ins.adsbygoogle` had `min-height: calc(var(--ad-min-h-mobile, 100px) - 20px)` (`230px`), while Google responsive ads render at `301px` (+71px vertical jump per slot). Fixed by reserving `320px` on the outer `.ad-slot-reserved` wrapper with `height: var(--ad-min-h-mobile)` and `overflow: hidden`.

### Primary Revenue / Conversion Cause: **Track B Measurement Gap & Missing Free-First Copy**
- **GA4 Event Gap:** `data-cta` and `data-placement` attributes exist across the site, but **zero `gtag('event', ...)` listeners** exist anywhere in the JS bundle (`events: []`). It is impossible to attribute WhatsApp/Call consultations to specific pages or ad placements.
- **Missing "First Consultation is Free" Messaging:** `0` occurrences on `/nrb-legal-help`, `/contact`, and service pages. High-intent NRB visitors see a `"Paid Case Review ($30–$75)"` table first without knowing the initial call/WhatsApp consultation is free.
- **WhatsApp Form Double-Open:** Submitting the contact form can trigger two tabs unless `e.preventDefault()` + `e.stopPropagation()` and a single-fire guard are enforced.

### Primary Traffic / RPM Cause: **D — Geography & Authority Binding Constraint**
- **Content Targeting is Already 99% NRB/Tier-1:** `301` EN posts are already in the high-RPM NRB lane (`299/301` geo/service qualified).
- **Real Bottleneck:** New domain with low backlink authority ranks for local BD queries (`$0.55 RPM`) but lacks authority for competitive Tier-1 NRB queries (`$8.34 RPM`). Daily publishing must shift from 10/day mixed BN+EN to **2/day EN NRB-targeted**, paired with off-site NRB community distribution and consolidating the `0.806` certificate-correction cluster.

---

## 3. Execution Plan
- **Phase 1 (Owner Dashboard):** Revert AdSense auto-placement toggles (`Find more ad placements` OFF, `Optimise existing ads` OFF, `Min distance` 310px, `Max ads` 6, `Multiplex` OFF).
- **Phase 2 (Code — CLS & Ad Engineering):** Fix `src/components/AdSenseAd.jsx` & `src/index.css` to `320px` fixed outer wrapper height + `overflow: hidden` + remove `- 20px` CSS floor.
- **Phase 3 (Code — Measurement & Funnel):** Add `src/lib/cta-tracking.js` (`cta_click`, `consult_request`), wire in `src/App.jsx`, fix WhatsApp double-open, add "First consultation is free" / "প্রথম পরামর্শ ফ্রি" copy to `/nrb-legal-help` (expanded to `900+` words), `/contact`, `/bn/contact`, and service pages.
- **Phase 4 (Content & E-E-A-T):** Consolidate certificate-correction cluster / add `"Reviewed by Advocate Md. Shah Alam, Enrolled 2015"` E-E-A-T signal.
- **Phase 5–7 (CI Gates, Deploy & Report):** Run all CI checks (`ci-seo-lint.mjs`, `ci-schema-lint.mjs`, `phase3-hreflang-verify.mjs`, `ci-cwv-ads.mjs`, `ci-render-parity.mjs`), push to `origin/main` (Vercel auto-deploy), verify live, and write `FINAL-REPORT-2.md`.
