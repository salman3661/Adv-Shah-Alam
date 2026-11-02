# CLAUDE.md — Frontend Architecture & Anti-Slop Rules

Project: bilingual (EN/BN) legal-services site. Stack: Vite + React 18 + Tailwind v4 + framer-motion + lucide-react.
Source of truth for visual tokens: [`DESIGN.md`](./DESIGN.md). Tokens are implemented as CSS variables in `src/index.css`.

## 1. Visual Direction
- Stripe/Linear register: quiet, precise, high-density, hairline borders, restrained color, generous alignment discipline.
- One accent (indigo-free blue `--accent`). Gold (`--gold`) only for tiny credential marks, never for large fills.
- Depth comes from 1px borders + micro-shadows, not heavy drop shadows or glassmorphism stacks.

## 2. Hard Bans (Anti-Slop)
- NO purple/violet/indigo-to-blue or purple-to-pink gradients. NO gradient text. NO rainbow/mesh gradients.
- NO emoji as icons, bullets, tiles, or section markers. Use inline SVG (lucide-react or hand-authored).
- NO "icon-in-colored-square" card grids repeated 3-6 times as the default layout. Prefer lists, tables, definition rows, or split layouts.
- NO nested cards, no card-per-sentence clutter, no oversized `rounded-3xl` pills everywhere.
- NO glow blobs, floating orbs, bouncing/pulsing decorative animations, or infinite looping motion (except functional spinners).
- NO lorem-style filler, fake metrics, fake testimonials.
- NO `transition: all`. Name the properties.
- NO `outline: none` without a replacement `:focus-visible` style.

## 3. Tokens
- Use `var(--token)` only. No raw hex in components unless it is a third-party brand color (WhatsApp green).
- Radius: `--radius-sm 6px`, `--radius-md 8px`, `--radius-lg 12px`, `--radius-pill 999px`. Cards max `--radius-lg`.
- Shadows: only `--shadow-xs|sm|md`. Never custom large blurred shadows.
- Type: scale from DESIGN.md; body 16px/1.6 (EN), BN keeps 1.75 line-height. Do not override Bengali font stack.

## 4. Interaction & Motion
- Micro-transitions 120–200ms, `cubic-bezier(0.2, 0, 0, 1)`; properties limited to color, background-color, border-color, box-shadow, opacity, transform.
- Hover = subtle (border/bg shift, 1px translate max). No scale > 1.02.
- Every animation must respect `prefers-reduced-motion: reduce`.

## 5. Touch Targets
- Mobile / coarse pointer: interactive targets **≥ 44×44px**.
- Desktop / fine pointer: interactive targets **≥ 24×24px** (WCAG 2.2 AA minimum).
- Enforce via `--target-min` token and the `.tap-target` utility.

## 6. Accessibility
- Contrast ≥ 4.5:1 text, ≥ 3:1 UI/large text, both themes.
- Visible `:focus-visible` ring on all interactive elements (`--focus-ring`).
- Icon-only buttons need `aria-label`; decorative SVGs get `aria-hidden="true"`.
- Semantic landmarks, one `<h1>` per page, no skipped heading levels.
- Dark/light via `body[data-theme]`; never rely on color alone for meaning.

## 7. Performance & SEO Guardrails (do not break)
- Preserve all `<Helmet>` metadata, JSON-LD, canonical/hreflang, prerender (`scripts/prerender.mjs`), and AdSense wrappers/CLS reservations.
- Reserve dimensions for images/ads to avoid layout shift. Lazy-load below the fold.
- Do not edit generated content (`dist/`, blog/post data) as part of design work.

## 8. Code Hygiene
- Prefer composition + utility classes; shared patterns go to CSS utilities in `src/index.css` (`@layer components`).
- Keep diffs surgical. Run `npm run lint` and `npx vite build` (skip prebuild network scripts if offline) before finishing.
