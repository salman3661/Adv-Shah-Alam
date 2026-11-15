# Architecture & Remediation Decisions (`feat/autonomous-remediation`)

## Decision 1 (Phase 1): Complete Merge Parity & Modulepreload + Article Wrapper
- **Context:** Hydration caused 404s on `/blog/page/:page` and `/blog/topic/:topic`, post body chunks lazy-loaded after main bundle hydration (causing a temporary stub window for Googlebot), posts lacked `<article>` wrappers, and post bodies lacked outbound post-to-post links.
- **Decision:** Added pagination and topic hub routes to `src/App.jsx`, extracted shared topic/heading sources (`src/content/topics.json`, `src/content/pageHeadings.json`) used by both `scripts/prerender.mjs` and React pages, injected `<link rel="modulepreload">` for each post's Vite JSON chunk + cover `<link rel="preload" as="image">`, wrapped articles in `<article>`, and generated deterministic cross-cluster related links (`src/content/related-links-{en,bn}.json`) via `scripts/gen-blog-meta.mjs`.
- **Reversibility:** Fully reversible via single PR/commit revert (`ROLLBACK.md`).

## Decision 2 (Phase 2): Include Topic Cluster Hubs in Sitemap, Exclude Pagination
- **Context:** Topic cluster hubs (`/blog/topic/*` and `/bn/blog/topic/*`, 14 pages) are standalone evergreen hubs with `CollectionPage` + `BreadcrumbList` + bilateral `hreflang` and should be indexed directly. Pagination routes (`/blog/page/2..N`, `/bn/blog/page/2..N`) emit `<link rel="prev">` and `<link rel="next">` and are linked via crawlable `<nav aria-label="Pagination">` anchor lists.
- **Decision:** Added the 14 topic hub URLs to `generate_sitemap.js` with `<lastmod>` computed from the freshest matching post date; excluded pagination pages from `sitemap.xml`; updated `scripts/ci-schema-lint.mjs` to validate topic hubs as `CollectionPage` + `BreadcrumbList`.

## Decision 3 (Phase 2): Expand `/review` Substantively (Option B — 650+ Words, Zero Fabricated Ratings)
- **Context:** `/review` previously had ~41 words and zero real reviews on disk. Fabricating `Review` or `aggregateRating` schema violates policy and remediation constraints.
- **Decision:** Chose Option (b): turned `/review` into a substantial Bengali guide (650+ words shared identically between `src/pages/ReviewPage.jsx` and `scripts/prerender.mjs` via `src/content/reviewContent.mjs`) covering Google review submission steps, review verification policy, chamber details, practice areas, direct WhatsApp/Call CTAs, and 6 visible FAQs backed by matching `FAQPage` + `BreadcrumbList` JSON-LD (zero `aggregateRating`).
