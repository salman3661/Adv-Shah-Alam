# RELEASE NOTES — `feature/post-freeze-release` (Stage A) & `feature/stage-b-consolidation` (Stage B)

**Branches:**
- **Stage A:** `feature/post-freeze-release` (branched from `main` at `ab0a69a`)
- **Stage B:** `feature/stage-b-consolidation` (branched from `feature/post-freeze-release` at `1b656fa`)

**Production Status:** **UNCHANGED** — `main` is still at `ab0a69a`. 20-day freeze (`2026-11-21 → 2026-12-11`) is intact. Nothing has been merged to `main` or deployed.

---

## 1. Staged Deploy Commands (Stage A → Stage B)

### Stage A — 12 Dec 2026 (Zero new URLs, zero ranking pages removed → near-zero risk)
Merges entity graph, `LegalService` schema, `/blog?q=` search fix, `priceRange` removal, publish machine (`scripts/publish-nrb.sh` with 2 EN+BN/day cap), intent-level `dupcheck.mjs` gate, `topics.json` queue, and distribution pack. Also creates `scripts/queue/.stage-a-landed` on `main` to unlock `scripts/publish-nrb.sh`.

```bash
git checkout main && git merge --no-ff feature/post-freeze-release && touch scripts/queue/.stage-a-landed && git add scripts/queue/.stage-a-landed && git commit -m "chore(release): mark Stage A landed" && npm run ci:qa && npm run build && git push origin main
```

### Stage B — 26 Dec 2026 (14 days after Stage A settles)
Merges the 4 duplicate-cluster content merges into the KEEP pages, the permanent 301 redirects in `vercel.json` (plus flattened legacy chains and rewritten internal links), and automatic removal of the 6 consolidated source URLs from `sitemap.xml` (giving Google 14 days to re-evaluate the KEEP pages first).

```bash
git checkout main && git merge --no-ff feature/stage-b-consolidation && npm run ci:qa && npm run build && git push origin main
```

> **Publishing Rate Rule:** After Stage A lands, `scripts/publish-nrb.sh` enforces a strict cap of **at most 2 EN posts per UTC day**, each with its BN twin, with all 9 QA gates enforced.

---

## 2. Full Diff Summary

### Stage A (`feature/post-freeze-release`)
- `reports/baseline-pre-freeze.json` — Phase 0.5 live production baseline (`824` sitemap URLs, `0` non-200, `48/48` legacy redirects `200`).
- `src/seo/entity.js` — Single canonical entity module (`Person` + `LegalService` + `WebSite` `@id` graph, verified `sameAs`, exact NAP, no fabricated `priceRange` or directory URLs).
- `src/pages/Blog.jsx` — Wired `?q=` query parameter so `WebSite` `SearchAction` (`/blog?q={search_term_string}`) filters EN blog posts on load.
- `src/pages/AdvocatePage.jsx` — Added `/nrb-legal-help` link and bilingual (EN + BN) free-first-consultation statement to the `/advocate-md-shah-alam` CTA block.
- `scripts/prerender.mjs` — Wired `src/seo/entity.js` into `buildInstitutionalSchema`, upgraded all 14 service pages (`7 EN + 7 BN`) to `LegalService` schema (removing unconfirmed `priceRange: '৳৳'`), and strengthened `advocateBody()` with statutory scope, NRB summary, bilingual free consultation, and chamber details.
- `scripts/qa/dupcheck.mjs` — Upgraded to intent-level duplicate gate (body TF-IDF `>= 0.80`, title token cosine `>= 0.85`, H2 Jaccard overlap `>= 0.45`, intent IDF cosine `>= 0.65` or `>= 0.50` with body `>= 0.65`, plus `xlang` undeclared twin flag). 3-way verdict (`publish`, `merge-candidate`, `reject` only when body `>= 0.90 && title >= 0.90`), `--scan` mode, and `--regression` test for Clusters A–D.
- `scripts/qa/validate.mjs` — Post JSON validator (title length, meta description, slug, word count, statute citation regex, internal links `>= 8`, FAQs `>= 5`).
- `scripts/publish-nrb.sh` — 9-gate EN+BN twin publisher (refuses to run on `main`, refuses to run until `scripts/queue/.stage-a-landed` exists on `origin/main`, enforces max 2 EN+BN pairs/day, blocks only on `dupcheck` verdict `reject`).
- `scripts/qa/verify-stage.mjs` — Rendered-DOM verifier for `/blog?q=` search filtering and Stage B 301 redirects.
- `scripts/queue/topics.json` & `scripts/queue/publish-log.jsonl` — 30-day NRB + 5 brand/entity topic queue (`primaryStatute.verified: false` until verified) and append-only publish ledger.
- `package.json` — Added `dupcheck.mjs --regression` and `dupcheck.mjs` to `ci:qa`.
- `release-pack/profiles/directories-and-social.md` & `release-pack/gbp/gbp-pack.md` — NAP-consistent copy blocks with Uttara West marked as **PRIMARY chamber** and Judge Court/Kotwali marked as **Secondary / registered address (on-site schema only)**.
- `release-pack/distribution/{copy-pack.md,utm-map.json,communities.md}` — Problem-first NRB & local BD distribution copy with verified `200` landing URLs and UTMs.

### Stage B (`feature/stage-b-consolidation`)
- `seo/stage-b-clusters.json`, `seo/stage-b-redirects-map.csv`, `scripts/stage-b/apply-merges.mjs`, `scripts/stage-b/apply-redirects.mjs` — Idempotent Stage B content merge and 301 consolidation tooling.
- **Cluster A (EN POA):** `301` `/blog/power-of-attorney-property-transfer-registration-bangladesh` → `/blog/power-of-attorney-land-transfer-bangladesh` (strict subset; no content merge needed).
- **Cluster B (BN মিথ্যা নারী নির্যাতন):** Merged unique sections (`গ্রেফতার হলে প্রথম ২৪ ঘণ্টায় কী করবেন?`, `থানা ও আদালতে জামিনের সঠিক প্রক্রিয়া`, `প্রথম ১–৭ দিনের কর্মপরিকল্পনা`, `আইনি প্রতিরক্ষায় প্রমাণের গুরুত্ব ও নথিপত্র প্রস্তুতকরণ`, `মামলা খারিজ (Quashing): ফৌজদারি কার্যবিধির ৫৬১-এ ধারা ও FIR Quash`, `মিথ্যা মামলার বিরুদ্ধে অন্যান্য পাল্টা আইনি ব্যবস্থা`, `সময়, খরচ ও ফলাফল সম্পর্কে বাস্তব ধারণা`, plus Quick Answer point & 3 FAQs) into `/bn/blog/mithya-nari-nirjaton-mamla-atmoraksha-bd`; `301` from all 3 duplicate URLs.
- **Cluster C (EN Cyber Crime):** Merged dedicated `"All Cyber Crime Helpline & Contact Numbers in Bangladesh (2026)"` section (PCSW `01320-000888`, National Emergency `999`, BTRC `100`, CCIC/CID `cybercrime.gov.bd`, bKash `16247`, Nagad `16167`) + 2 FAQs into `/blog/bangladesh-cyber-crime-complaint-portal-guide-2026`; `301` from `/blog/cyber-crime-helpline-bangladesh-2026`.
- **Cluster D (BN ভাড়াটিয়া উচ্ছেদ):** Merged landlord risk note, `সহকারী জজ আদালতে উচ্ছেদ মোকদ্দমা দায়ের ও ডিক্রির পর দখল গ্রহণ`, `বাড়ি ভাড়া নিয়ন্ত্রণ আইন ১৯৯১ বনাম সম্পত্তি হস্তান্তর আইন ১৮৮২: তুলনা`, `ভবিষ্যতে ঝামেলা এড়াতে ভাড়া চুক্তিতে যে শর্তগুলো রাখা জরুরি`, + 2 FAQs into `/bn/blog/varatia-ucched-ainee-notice-bari-bhara-ain`; `301` from `/bn/blog/varatia-ucched-dokan-basa-106-dhara-legal-notice-2026-bn`.
- `vercel.json` — Added the 6 permanent `301` redirects and flattened 2 pre-existing redirects (`/blog/cyber-crime-complaint-bangladesh`, `/blog/cyber-crime-helpline-bankladesh-2026`) directly to `/blog/bangladesh-cyber-crime-complaint-portal-guide-2026` (no chains).
- Rewrote 4 internal links (`mithya-sakkhya-dondobidhi-193-211-shasti.json`, `rajuk-building-plan-fire-license-bnbc-ain-bangladesh.json`, `flat-apartment-registration-fee-bangladesh.json`, `public/llms.txt`), removed 2 hreflang `enSlug` pointers referencing 301 sources, and excluded the 6 consolidated URLs from `public/sitemap.xml` via build.

---

## 3. Verification Results (Measured on `feature/stage-b-consolidation`)

| Check | Measured Result | Status |
|---|---|---|
| Production Baseline (Phase 0.5) | `824` sitemap URLs (`0` non-200), `48/48` legacy redirects → `200` | PASS |
| Build & Prerender (`npm run build`) | `794` prerendered pages (`314 EN + 464 BN + core/service/hub`) | PASS |
| `dupcheck.mjs --regression` | `4/4` known clusters (A, B, C, D) detected | PASS |
| `ci-seo-lint.mjs` | `818` sitemap URLs, `0` H1/title/desc/noindex/chain/broken/redirect errors | PASS |
| `ci-schema-lint.mjs` | `818` pages (`2,362` schemas), `0` JSON/ID/breadcrumb/scope errors | PASS |
| `phase3-hreflang-verify.mjs` | `818` pages (`195` bilingual pairs), `0` errors | PASS |
| `verify-stage.mjs --redirects --search` | `6/6` Stage B `301 → KEEP → 200` (no chain, no self-canonical); `3/3` `/blog?q=` distinct | PASS |
| `ci-render-parity.mjs` | `8/8` core & KEEP routes identical to prerender | PASS |
| `ci-cwv-ads.mjs` | `26/26` passed (`CLS 0–0.0003`, `manual=4/2/3`, `minH=100/250`, `auto=0`) | PASS |

---

## 4. `/blog?q=` Before / After Evidence

- **Before (Live Production `main` at `ab0a69a`):**
  - `GET /blog?q=bail`, `GET /blog?q=cheque`, `GET /blog?q=zzzzznotfound` all returned identical static HTML (`sha1: 2288cf8f6fd6`, H1 `"Bangladesh Legal Knowledge Hub"`). `WebSite` `SearchAction` pointed to a non-filtering page.
- **After (Branch `dist/` verified in headless Chromium via `scripts/qa/verify-stage.mjs --search`):**
  - `/blog?q=bail` → `12` post links (`["/blog/anticipatory-bail-high-court-bangladesh-cost-process", "/blog/bail-cancellation-bangladesh", "/blog/bail-cost-criminal-case-bangladesh"]`)
  - `/blog?q=cheque` → `12` post links (`["/blog/cheque-bounce-recovery-notice-procedure-section-138-ni-act", "/blog/cheque-dishonour-case-law-bangladesh", "/blog/cheque-dishonour-case-section-138-bangladesh-expats"]`)
  - `/blog?q=zzzzznotfound` → `0` post links (`[]`)
  - **Result:** `3/3` distinct filtered sets (`PASS`).

---

## 5. `dupcheck.mjs --scan` Output Summary

- **Thresholds:** `body >= 0.80`, `title >= 0.85`, `h2 >= 0.45`, `intent >= 0.65` (or `intent >= 0.50 && body >= 0.65`), plus `xlang` undeclared cross-language twin flag.
- **Stage A (`posts=785`, saved in `reports/dupcheck-scan-stage-a.txt`):**
  ```text
  # dupcheck --scan  posts=785  thresholds: body>=0.8 title>=0.85 h2>=0.45 intent>=0.65
  pairs flagged: 418   clusters: 95   cross-language (undeclared twin) flags: 60
  ```
- **Stage B (`posts=778`, after excluding the 6 consolidated 301 sources):**
  ```text
  # dupcheck --scan  posts=778  thresholds: body>=0.8 title>=0.85 h2>=0.45 intent>=0.65
  pairs flagged: 395   clusters: 96   cross-language (undeclared twin) flags: 57
  ```
- **Regression (`node scripts/qa/dupcheck.mjs --regression`):**
  ```text
  [regression] cluster A (2 URLs): DETECTED
  [regression] cluster B (4 URLs): DETECTED
  [regression] cluster C (2 URLs): DETECTED
  [regression] cluster D (2 URLs): DETECTED
  [regression] PASS — 4/4 known clusters detected
  ```
- **URL Truth Gate (`node scripts/qa/url-truth.mjs --regression`):**
  - Generated `reports/live-urls.json` (`824` sorted live URLs from `https://www.advmdshahalam.me/sitemap.xml`).
  - `assertLiveUrl` validates every Stage B redirect source & master at apply/check time and in `ci:qa` and `verify-stage.mjs --redirects`.
  - Regression test confirms `6/6` Stage B sources pass AND the old typo'd slug (`/bn/blog/dv-act-mithya-nirjoton-mamla-defense-2026-bn`) throws/fails.
- **Full 41-URL Cluster Audit & Batch Plan:**
  - `reports/cluster-intent-map.md`: all 41 URLs classified (`14 KEEP`, `5 DIFFERENTIATE`, `20 MERGE → X`, `2 REDIRECT → X`).
  - `reports/cluster-consolidation-plan.md`: 4-batch execution plan (`≤25%` per cluster per batch, 14 days apart).
- **Cross-Language Hreflang (`reports/hreflang-opportunities.md`, separate branch `feature/hreflang-twins`):**
  - Of 60 `xlang` flags: **4 GENUINE** (unpaired, exact match — applied on `feature/hreflang-twins` to ship with Stage A), **9 FALSE_POSITIVE**, and **47 NEEDS_HUMAN** (already paired to an alternate variant or slightly different scope — see `reports/hreflang-opportunities.md` for the full list requiring human judgement).

---

## 6. Rollback Plan
- Before merge: `git checkout main && git branch -D feature/stage-b-consolidation feature/post-freeze-release`
- After merge: `git revert -m 1 <merge-commit-sha> && git push origin main` (or redeploy `ab0a69a` in Vercel Dashboard).

---

## 7. Owner Must Supply / Confirm (Not Fabricated by Agent)
1. **Two-Address Decision (Blocking for GBP & Directory Submissions):** `src/seo/entity.js` (`LegalService` schema) declares two addresses:
   - **Primary Chamber (marked primary in `release-pack/gbp/` and `release-pack/profiles/`):** `House 46, Road 6/B, Sector 12, Uttara West, Dhaka 1230`
   - **Secondary / Registered Address (kept in on-site schema only):** `Lawyers Association Building, 4th Floor, 6/7 Court House Street, Kotwali, Judge Court, Dhaka 1100`
   - **Owner must confirm** both addresses are currently active and confirm Uttara West is the single primary before directory/GBP submissions go out (NAP consistency requires one primary address used identically everywhere).
2. Confirmed `sameAs` URLs for `lawchamber.com.bd`, `legalco.com.bd`, `bdadvocates.com`, and Bangladesh Bar Council directory (only existing `facebook`, `linkedin`, `maps.app.goo.gl` URLs are included in `src/seo/entity.js`).
3. Exact Bar Council enrolment number & year (if you wish to display them on `/advocate-md-shah-alam`).
4. Confirmed `priceRange` / chamber fee ranges (omitted from `LegalService` schema until confirmed).
5. Verified client testimonials or official case counts (omitted).

---

## 8. Owner Must Execute (Off-Site)
1. **AdSense Dashboard:** No AdSense dashboard change is required at this time. Revisit only if fill rate becomes non-zero.
2. **Google Business Profile (`release-pack/gbp/gbp-pack.md`):** After confirming the primary address above, create & verify via phone (`+8801712655546`) with 5 real chamber photos.
3. **Lawyer Directories (`release-pack/profiles/directories-and-social.md`):** After confirming the primary address above, create/update profiles on `lawchamber.com.bd`, `legalco.com.bd`, `bdadvocates.com` with identical NAP.
4. **NRB Distribution (`release-pack/distribution/copy-pack.md`):** Post problem-first variants in UK/US/CA/UAE NRB groups, Reddit, Quora, LinkedIn, and Uttara/Dhaka local groups.
