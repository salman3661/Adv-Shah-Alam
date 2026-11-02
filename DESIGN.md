# DESIGN.md — Official Chambers Design Token System

Implemented in `src/index.css` (`body` = light, `body[data-theme="dark"]` = dark).
Visual direction: **Executive Legal Chambers** — Sovereign Navy, Warm Alabaster/Stone, Deep Oxford Ink, and understated Antique Brass credentials. No rainbow category palettes, no neon glows, and a grounded dark Oxford Navy footer across both themes.

## Color — Neutrals & Surfaces

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#F4F6F9` | `#080E1A` |
| `--surface` | `#FFFFFF` | `#0D1626` |
| `--surface-2` (subtle fill) | `#EAEFF5` | `#132036` |
| `--card-bg` | `#FFFFFF` | `#101B2E` |
| `--card-border` / `--border` | `#DCE3EE` | `rgba(148,163,184,.16)` |
| `--border-strong` | `#B8C4D6` | `rgba(148,163,184,.30)` |
| `--divider` | `#E2E8F0` | `rgba(148,163,184,.12)` |
| `--text` | `#0A1628` | `#F1F5F9` |
| `--text-secondary` | `#1E2F47` | `#CBD5E1` |
| `--text-2` | `#2C3E58` | `#CBD5E1` |
| `--text-muted` | `#556982` | `#94A3B8` |

## Color — Official Accents (Sovereign Navy & Antique Brass)

| Token | Light | Dark |
|---|---|---|
| `--accent` | `#163A70` | `#7AA2E3` |
| `--accent-hover` | `#0F2952` | `#9BB8EC` |
| `--accent-subtle` | `rgba(22,58,112,.07)` | `rgba(122,162,227,.12)` |
| `--btn-primary-bg` | `#163A70` | `#1E40AF` |
| `--accent-ink` (text on accent) | `#FFFFFF` | `#FFFFFF` |
| `--gold` (credential marks) | `#9A7420` | `#CCA856` |
| `--gold-subtle` | `rgba(154,116,32,.09)` | `rgba(204,168,86,.12)` |
| `--gold-border` | `rgba(154,116,32,.25)` | `rgba(204,168,86,.28)` |
| `--wa-green` (WhatsApp action) | `#116B3A` | `#116B3A` |
| `--wa-green-hover` | `#0D562E` | `#0F7B43` |
| `--success` | `#0F7B43` | `#4ADE80` |
| `--danger` | `#B42318` | `#F87171` |

## Color — Grounded Institutional Footer (Both Themes)

| Token | Light | Dark |
|---|---|---|
| `--footer-bg` | `#0A1424` | `#060B14` |
| `--footer-surface` | `#111F36` | `#0D1626` |
| `--footer-border` | `rgba(204,168,86,.24)` | `rgba(148,163,184,.14)` |
| `--footer-divider` | `rgba(148,163,184,.14)` | `rgba(148,163,184,.12)` |
| `--footer-text` | `#F8FAFC` | `#F8FAFC` |
| `--footer-text-2` | `#CBD5E1` | `#CBD5E1` |
| `--footer-muted` | `#94A3B8` | `#8E9BB0` |
| `--footer-gold` | `#CCA856` | `#CCA856` |

## Typography

- EN: system UI stack (`--font-en`); BN: `--font-bn` (Noto Serif Bengali) — unchanged.
- Scale (px / line-height): `--text-xs 12/16`, `--text-sm 14/20`, `--text-base 16/26`, `--text-lg 18/28`, `--text-xl 20/28`, `--text-2xl 24/32`, `--text-3xl 30/38`, `--text-4xl 36/44`, `--text-5xl 48/54`.
- Weights: 400 body, 500 UI/labels, 600–700 headings. Headings tracking `-0.02em` (EN only; BN tracking `0`).

## Spacing (4px base)
`--space-1 4` · `2 8` · `3 12` · `4 16` · `5 20` · `6 24` · `8 32` · `10 40` · `12 48` · `16 64`.

## Radius
`--radius-sm 6px` · `--radius-md 8px` · `--radius-lg 12px` · `--radius-pill 999px`.

## Elevation (micro-shadows)
| Token | Light | Dark |
|---|---|---|
| `--shadow-xs` | `0 1px 2px rgba(10,22,40,.04)` | `0 1px 2px rgba(0,0,0,.4)` |
| `--shadow-sm` | `0 2px 6px rgba(10,22,40,.05), 0 1px 2px rgba(10,22,40,.03)` | `0 2px 6px rgba(0,0,0,.45)` |
| `--shadow-md` | `0 6px 18px -4px rgba(10,22,40,.08), 0 2px 4px -2px rgba(10,22,40,.04)` | `0 8px 20px -4px rgba(0,0,0,.55)` |

## Motion & Accessibility
- `--ease: cubic-bezier(.2,0,0,1)` · `--dur-fast 120ms` · `--dur-base 180ms`. Reduced motion disables transitions/animations.
- `--focus-ring: 0 0 0 2px var(--surface), 0 0 0 4px var(--accent)`.
- `--target-min: 44px` (coarse pointer / ≤768px), `24px` (fine pointer, ≥769px).
