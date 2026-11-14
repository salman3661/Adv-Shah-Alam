# Architectural, SEO & Growth Decisions (`DECISIONS.md`)

**Project:** `https://www.advmdshahalam.me/` — Advocate Md. Shah Alam (Supreme Court of Bangladesh)  
**Baseline Git SHA:** `63b0a2480bd6a06065e698c98d65b8c6554d780d` (`baseline-phase0` tag)  
**Audit & Baseline Date:** 2026-11-14

---

## 1. Stack & Theme Decision: Why Astro + Tailwind CSS v4 (and Why "Google Argon" Is Rejected)

### 1.1 Why "Google Argon" (CodedThemes Bootstrap 5 + jQuery Admin Template) Is Rejected
The client inquired about using "Google Argon". After technical evaluation against our Core Web Vitals and SEO targets, **Argon is rejected** for four concrete engineering reasons:
1. **Wrong UI Paradigm:** Argon is an admin dashboard template (sidebar drawers, data widgets, metric cards). It lacks editorial article layouts, legal content hierarchy, bilingual serif/sans reading typography, and institutional authority signaling required for a Supreme Court Advocate's practice.
2. **Severe Core Web Vitals Regression:** Argon bundles Bootstrap 5 CSS/JS + jQuery + icon fonts (~150–250 KB of render-blocking CSS and main-thread JS). Introducing it would regress our passing mobile LCP (currently 776–1272ms) and INP metrics.
3. **No SSG / Multi-Page Static Routing Story:** Argon is built as a client-side dashboard shell, which reproduces the exact SPA catch-all anti-pattern responsible for **CRITICAL-1** (soft-404 HTTP 200 on every unknown URL) and client-only DOM mutations (**CRITICAL-4**).
4. **Zero Native Technical SEO Infrastructure:** Argon provides no deterministic build-time layer for `<link rel="canonical">`, reciprocal `hreflang` clusters, page-scoped JSON-LD `@graph` schemas, or paginated sitemaps.

### 1.2 Adopted Architecture: Static-First Content Engine (Astro + Tailwind CSS v4)
We adopt a **Static-First Architecture (`output: 'static'`) with Tailwind CSS v4** and structured Content Collections backed by our verified `src/content/posts/{en,bn}/*.json` corpus (`content-corpus.json`):
- **Zero Page-Specific JS on Content Pages:** Blog posts, service pages, and legal reference pages ship **0 KB of framework runtime**, reducing HTML payload from **122–194 KB** to **< 45 KB** per page.
- **Scoped Interactive Islands (≤ 30 KB total):** Client interactivity is restricted strictly to 4 lightweight enhancements:
  1. Theme toggle (`light` / `dark` with inline anti-FOUC snippet ≤ 400 bytes)
  2. Server-backed Contact & Consultation Form (with native HTML `<form action="/api/contact" method="POST">` fallback)
  3. Blog topic filter & instant search
  4. Interaction-gated Google AdSense loader (`ca-pub-1781126556775676`) with fixed-height CLS reservation containers
- **Verbatim Content Migration Rule:** All 720 blog posts are migrated **verbatim** from the verified repository JSON corpus (`720/720` posts verified at 100% byte-for-byte parity with live production HTML in Phase 0). Zero AI-rewriting or mass-generation is permitted.

---

## 2. URL Architecture, Internationalization & Redirect Policy

### 2.1 Zero-Churn Canonical URL Structure
To protect existing search equity across 745 indexed URLs, we preserve the existing canonical URL namespace without churn:
- **Bengali (`bn`):** `/` (Bengali Homepage), `/bn/blog`, `/bn/blog/[slug]`, `/bn/services/[slug]`, `/bn/contact`
- **English (`en`):** `/en` (English Homepage), `/blog`, `/blog/[slug]`, `/services/[slug]`, `/contact`, `/advocate-md-shah-alam`, `/review`, `/education`, `/privacy-policy`, `/terms-of-service`, `/nrb-legal-help`

### 2.2 Resolution of `/en/*` and `/bn` Route Ambiguities (Phase 1)
- **`/en/*` Mirror Routes:** Rather than migrating `/blog/*` and `/services/*` to `/en/blog/*` (which would force 300+ redirects on active ranking English pages), **root-level `/blog/*`, `/services/*`, and `/contact` remain the canonical English URLs**. We add permanent **301 redirects** from `/en/blog` → `/blog`, `/en/blog/:slug` → `/blog/:slug`, `/en/services/:slug` → `/services/:slug`, and `/en/contact` → `/contact`.
- **`/bn` Homepage Route:** Currently `/bn` 301-redirects to `/bn/blog`, leaving Bengali without a `/bn` homepage alias. Because `/` is already the canonical Bengali homepage, we update `/bn` → `/` (**301 permanent redirect**).
- **Elimination of `/posts/*` Legacy Links:** All 194 internal link instances using `/posts/[slug]` or `/bn/posts/[slug]` are rewritten at the source to `/blog/[slug]` and `/bn/blog/[slug]`, eliminating unnecessary 301 hops while retaining the `vercel.json` 301 rule for external backlinks.

### 2.3 True HTTP 404 Handling (Fixes CRITICAL-1)
- The catch-all SPA rewrite (`"source": "/(.*)", "destination": "/index.html"`) in `vercel.json` is removed.
- Static routes resolve directly from `dist/<path>/index.html`.
- Unknown paths return **HTTP 404** via `dist/404.html` (and localized `/bn/404.html`), carrying `<meta name="robots" content="noindex, follow">` and bilingual language detection.

### 2.4 Strict Redirect Policy
1. **301 Only:** Every consolidated, retired, or year-suffixed duplicate URL emits an **HTTP 301** (`permanent: true`). Zero 302/307 temporary redirects for content consolidation.
2. **Single-Hop Guarantee:** All redirect sources are flattened prior to build so redirect chain depth is strictly `≤ 1` (zero chains, zero loops).
3. **Sitemap Hygiene:** No redirected URL (`301`) or `noindex` URL may appear in `public/sitemap.xml`.

---

## 3. Content Consolidation & Cannibalization Strategy (Phase 2)

### 3.1 Topic Clustering & Pillar Selection
All 720 blog posts (289 EN + 431 BN) are grouped into **60–90 semantic topic clusters** by language and search intent. Within each cluster, the **Single Pillar URL** is chosen using:
$$\text{PillarScore} = \text{gscImpressions30d} + 3 \times \text{gscClicks30d} + \frac{\text{wordCount}}{500}$$
preferring clean, evergreen slugs (without `-2026` suffixes) when impressions are tied.

### 3.2 Action Matrix for Non-Pillar Posts
- **MERGE + 301 (`similarity ≥ 0.80` or identical search intent):** Fold unique statutory citations, tables, or FAQs into the pillar post, then 301-redirect the non-pillar URL to the pillar and remove the non-pillar from the sitemap.
- **CANONICALISE / DIFFERENTIATE (`0.60 ≤ similarity < 0.80` with distinct long-tail intent):** Differentiate title, H1, meta description, and opening Direct Answer Block so each targets a non-overlapping query; or point canonical to the pillar if thin.
- **Immediate Bug Fixes (Cosine = 1.000 & Near-1.000 Pairs):**
  1. `/blog/anticipatory-bail-high-court-bangladesh-cost-process-2026` → **301** → `/blog/anticipatory-bail-high-court-bangladesh-cost-process`
  2. `/blog/court-marriage-bangladesh-process-cost-documents-2026` → **301** → `/blog/court-marriage-bangladesh-process-cost-documents`
  3. `/blog/wife-divorce-rights-talaq-e-tawfeez-bangladesh` ↔ `/blog/divorce-cost-bangladesh-2026-complete-guide` → Restore distinct Talaq-e-Tawfeez statutory guide & unique title/description on `/blog/wife-divorce-rights-talaq-e-tawfeez-bangladesh` (fixing the copy-paste bug).
  4. `/bn/blog/batoara-mamla-kotodin-chole-khoroch-partition-suit-2026` → **301** → `/bn/blog/batwara-mamla-din-khoroch-prokriya-2026`
  5. `/bn/blog/rit-petition-ki-kivabe-korte-hoy-high-court-2026` → **301** → `/bn/blog/rit-petition-ki-kivabe-korte-hoy-high-court`
  6. `/bn/blog/cyber-harassment-emergency-helpline-online-complaint-2026` → **301** → `/bn/blog/cyber-crime-complaint-online-police-helpline`

### 3.3 `/nrb-legal-help` Resolution
Rather than redirecting `/nrb-legal-help` to `/`, we establish `/nrb-legal-help` as our dedicated **NRB Legal Services Hub** with a self-referencing canonical (`https://www.advmdshahalam.me/nrb-legal-help`), a single unique H1, unique title (`≤ 58` chars), unique description (`140–160` chars), and comprehensive content targeting high-CPM English queries from NRBs in the USA, UK, Canada, Middle East, and Singapore.

---

## 4. Structured Data & Hreflang Policy (Phases 3 & 4)

1. **Hreflang (Phase 3):**
   - Every bilingual pair emits **exact 3 tags**: `hreflang="en"`, `hreflang="bn"`, and `hreflang="x-default"` (pointing to the English URL).
   - Unpaired English posts emit `hreflang="en"` and `hreflang="x-default"` only; unpaired Bengali posts emit `hreflang="bn"` only.
   - `hreflang="en-BD"` is removed sitewide.
   - `og:locale` is set to `en_US` on English pages and `bn_BD` on Bengali pages.
2. **Structured Data (Phase 4):**
   - **Fabricated `aggregateRating` (`4.9` / `47`) is deleted immediately** from all client and server schemas unless backed by visible first-party reviews on `/review`.
   - **Page-Type Entity Scoping:**
     - Institutional pages (`/`, `/en`, `/advocate-md-shah-alam`, `/contact`, `/review`): `WebSite`, `Person` (`#advocate`), `LegalService` (`#legalservice`), `BreadcrumbList`.
     - Service pages (`/services/*`, `/bn/services/*`): `Service`, `FAQPage` (matching visible FAQs), `BreadcrumbList`, and site reference.
     - Blog posts (`/blog/*`, `/bn/blog/*`): `BlogPosting`, `BreadcrumbList` (`Home → Blog → Post`), plus `FAQPage` / `HowTo` only where matching visible content exists.

---

## 5. Visual Identity & Design Tokens (Phase 5)

- **Institutional Navy & Seal Gold Palette:**
  - `--ink`: `#0B1220` | `--navy`: `#132A4A` | `--navy-700`: `#1B3A63`
  - `--gold`: `#C9A227` | `--gold-soft`: `#E8D9A0` (strictly `≤ 5%` of viewport pixels: hairlines, credential seals, focus rings)
  - `--paper`: `#FFFFFF` | `--surface`: `#F7F8FA` | `--border`: `#E4E8EE`
  - `--text`: `#14171E` | `--muted`: `#5B6472` | `--success`: `#0F7B43` | `--danger`: `#B42318`
- **Typography:**
  - English Headings: `Source Serif 4` (self-hosted WOFF2, `font-display: swap`)
  - English Body: `Inter` (`16–17px`, line-height `1.65`)
  - Bengali Headings & Body: `Noto Serif Bengali` & `Noto Sans Bengali` (`16–17px`, line-height `1.75`)
