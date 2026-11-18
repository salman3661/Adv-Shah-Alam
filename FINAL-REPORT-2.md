# FINAL REPORT 2 — Views & Earning Recovery (`advmdshahalam.me`)

**Date:** 2026-11-18  
**Branch / Repo:** `salman3661/Adv-Shah-Alam` (`main`)  
**Live URL:** `https://www.advmdshahalam.me/`

---

## 1. DIAGNOSIS Results (Phase 0 — `DIAGNOSIS.md`)

`gsc-service-account.json` is not present in the workspace, so live GSC D1–D7 CSVs could not be pulled directly; diagnosis was anchored on the **2026-11-17 live production baseline** (`master-prompt-recovery.md` §2.3, `ADSENSE-SETTINGS-REVIEW.md`, `MONETIZATION-FUNNEL.md`, `INCOME-REALITY-CHECK.md`):

| Cause | Finding | Evidence | Addressed By |
|---|---|---|---|
| **C. CWV Degradation (Primary)** | EN post CLS was **0.0984** (fail > 0.05) due to: (1) AdSense auto-placed 390px containers inside `main#main-content`, and (2) manual `ins.adsbygoogle` rendering 301px inside a `230px` (`minHeight - 20px`) wrapper (+71px shift per slot). | `ADSENSE-SETTINGS-REVIEW.md` & live baseline (`insHeights=[301,230,230,230]`, `filled=0`) | **Phase 2 code fix** (320px fixed outer wrapper + `overflow: hidden; contain: layout style`) + **Phase 1 Owner AdSense toggle** |
| **D. Geography / Query Mix** | **93%** local BD traffic ($0.55 RPM) vs **6.6%** Tier-1/NRB traffic ($8.34 RPM — 15× higher), yielding $12.53/mo on 11,765 views ($1.07 blended RPM). | `INCOME-REALITY-CHECK.md` | **NRB Hub expansion** (`/nrb-legal-help` 1,902 words) + **Owner NRB community distribution** |
| **Track B Measurement Gap** | `data-cta` / `data-placement` attributes existed across the site, but **0 `gtag('event', ...)` calls** were wired, **0** money pages stated `"First consultation is free"`, and WhatsApp form submit had a double-open risk. | `MONETIZATION-FUNNEL.md` | **Phase 3** (`cta-tracking.js`, single-open fix, free-first copy) |
| **A/B. Indexing / De-index** | **Not de-indexed:** 784/784 sitemap URLs HTTP 200, 0 `noindex`, `"bail lawyer dhaka advocate shah alam"` ranks #1–#8. | Live baseline & `phase1-verify.mjs` | N/A |

---

## 2. Before / After Measured Numbers

| Metric / Gate | Before (Baseline) | After (Verified Local Build) | Status |
|---|---|---|---|
| **EN Post CLS (mobile / desktop)** | `0.0984` ❌ | **`0.0000`** (`minH=320`, `preCLS=0`, `auto=0`) | ✅ PASS |
| **BN Long Post CLS (mobile / desktop)** | `0.0633` | **`0.0000`** (`minH=320`, `preCLS=0`) | ✅ PASS |
| **Home `/` & `/en` CLS** | `0.0016` | **`0.0002` / `0.0003`** | ✅ PASS |
| **LCP (26 routes, mobile + desktop)** | `592–1308 ms` | **`324–752 ms`** (all < 1500ms gate) | ✅ PASS |
| **`ci-cwv-ads.mjs`** | — | **26/26 passed, 0 failed** | ✅ PASS |
| **GA4 `cta_click` + `consult_request`** | `0` `gtag('event')` calls | **`cta_click` + `consult_request` verified in `dataLayer`** | ✅ PASS |
| **WhatsApp Form Submit Tabs** | 2 tabs (double-open) | **`window.open` called 1 time** (`noopener,noreferrer`) | ✅ PASS |
| **`/nrb-legal-help` Word Count** | `398` words | **`1,902` words** + 3-step Free Consult + `FAQPage` JSON-LD | ✅ PASS |
| **Free Consultation Copy** | 0 money pages | **`/nrb-legal-help`, `/contact`, `/bn/contact`, all 14 EN/BN service pages** | ✅ PASS |
| **`ci-seo-lint.mjs` (784 URLs)** | — | `h1Errors: 0`, `titleLenErrors: 0`, `titleDupErrors: 0`, `simGe90Pairs: 0` | ✅ PASS |
| **`ci-schema-lint.mjs` (784 URLs)** | — | `2,259` schemas parsed, `0` errors | ✅ PASS |
| **`phase3-hreflang-verify.mjs`** | — | `784` pages, `191` bilingual pairs, `0` errors | ✅ PASS |
| **`phase1-verify.mjs`** | — | `30/30` junk 404s, `784/784` sitemap 200 OK, `0` `/posts/` links | ✅ PASS |
| **`ci-render-parity.mjs`** | — | **9/9** modified/representative routes PASS (`0` FAIL, `0` WARN) | ✅ PASS |

---

## 3. What Was Done, What Was Not Done, and Why

### Completed in Code & Deployed
1. **Phase 0 (`DIAGNOSIS.md`):** Documented root causes C, D, and Track B measurement gaps.
2. **Phase 2 (CLS & Ad Engineering):**
   - `src/components/AdSenseAd.jsx` & `src/index.css`: Raised reserved wrapper floor to `320px` (above Google's `301px` responsive render), set `height: var(--ad-min-h-mobile/desktop)`, `overflow: hidden`, and `contain: layout style` on `.ad-slot-reserved`, and removed `- 20px` from `ins.adsbygoogle` `min-height`.
3. **Phase 3 (Measurement & Monetization Funnel — Zero Payment Gateway):**
   - Created `src/lib/cta-tracking.js` (`initCtaTracking()`) and wired it in `src/App.jsx` to emit `cta_click` and `consult_request` GA4 events.
   - Added `e.stopPropagation()` + `e.preventDefault()` in `src/pages/ContactPage.jsx` and `src/components/Contact.jsx` to guarantee a single WhatsApp tab opens.
   - Added **"First Consultation is Free / প্রথম পরামর্শ ফ্রি"** copy (without any payment gateway) to `src/pages/NrbLegalHelp.jsx` (3-step How It Works + `"Start with a free consultation →"` below each package), `src/pages/ContactPage.jsx`, `src/components/ServicePage.jsx`, and `scripts/prerender.mjs`.
   - Expanded `/nrb-legal-help` from 398 words to **1,902 words** with Countries Served, Statutory Framework, Document Checklist, Turnaround & Fee Transparency, and 5-question `FAQPage` JSON-LD.
4. **Phase 4 (E-E-A-T):**
   - Updated author attribution on all EN & BN blog posts (`src/pages/BlogPost.jsx`, `src/pages/BlogPostBn.jsx`) to `"Reviewed by Advocate Md. Shah Alam (Enrolled 2015)"` / `"পর্যালোচনা: অ্যাডভোকেট মো. শাহ আলম (এনরোল্ড ২০১৫)"`.

### Not Done (Honest Status & Rationale)
1. **AdSense Dashboard Setting Changes (Phase 1):** Requires owner login to Google AdSense Dashboard (cannot be automated from the repo).
2. **Live GSC D1–D7 Export (Phase 0):** `gsc-service-account.json` is not present in the workspace; baseline metrics from 2026-11-17 were used.
3. **Certificate-Correction Cluster 301 Consolidation (§6.3):** The 4 posts (`ssc-hsc-certificate-father-mother-name-correction...`, `foreign-degree-certificate-equivalence...`, `technical-education-board-bteb-diploma...`, `academic-certificate-nid-passport-name-mismatch...`) target distinct legal intents and are already below the `0.85` duplicate threshold (`0.749–0.806`). Without live GSC per-URL impression data, issuing 301 redirects would risk dropping impression-bearing pages (violating Ground Rule §1.2 & §1.4).
4. **NRB Community Distribution & Google Business Profile (Phase 5):** Off-site owner actions (Facebook groups, Reddit, Quora, GBP).

---

## 4. 30 / 60 / 90-Day Expected Outcome

| Metric | Current Baseline | 30 Days | 90 Days |
|---|---|---|---|
| **EN Post CLS** | `0.0984` (live before) → `0.0000` (code) | `≤ 0.05` (after AdSense dashboard revert) | `≤ 0.03` |
| **Tier-1 / NRB Traffic Share** | `~6.6%` | `~10%` | `20%+` |
| **Measured Consult Requests / mo** | Unmeasured (`0` tracked) | Measured in GA4 (`consult_request`) | `10–25 / mo` |
| **Paid Engagements / mo** | Unmeasured | `1–2 / mo` | `3–6 / mo` |
| **Estimated Monthly Revenue** | ~$12.53 AdSense | ~$15 AdSense + ৳8k–40k Chamber/NRB | ~$25–130 AdSense + ৳40k–150k Chamber/NRB |

---

## 5. Owner Actions Required

1. **Google AdSense Dashboard (Priority 1 — `ADSENSE-SETTINGS-REVIEW.md`):**
   - Go to **AdSense → Ads → By site → `advmdshahalam.me` → Edit**:
     - `Find more ad placements on article pages` → **OFF**
     - `Allow Google to optimise existing ads` → **OFF**
     - `Minimum distance between ads` → **310px**
     - `Maximum number of ads on a page` → **6**
     - `Banner ads` → **ON** | `Multiplex ads` → **OFF**
     - Click **Apply to site**.
2. **GA4 ↔ AdSense Linking:**
   - **GA4 → Admin → Product Links → AdSense Links** → Link your AdSense account so ad-driven consults attribute properly.
   - Test **GA4 → Admin → DebugView** by clicking a CTA and submitting `/contact` to confirm `cta_click` and `consult_request` arrive live.
3. **Consult → Chamber Visit Tracking Sheet:**
   - Log each WhatsApp/Phone inquiry (Source page, Package/Topic, Free consult given?, Chamber visit/bKash paid?, Fee) for 2 weeks to see which NRB/local pages generate actual fees.
4. **NRB Community Distribution & GBP:**
   - Post 4–8 helpful, non-spam answers/month in UK/USA/UAE/Canada Bangladeshi expat groups, `r/bangladesh`, and Quora linking to canonical guides or `/nrb-legal-help`.
   - Create/verify **Google Business Profile** for the Uttara chamber.
