# DESIGN.md — Official Chambers Design Token System

Implemented in `src/index.css` (`body` = light, `body[data-theme="dark"]` = dark).
Visual direction: **Executive Legal Chambers (Fresh Sapphire & Teal)** — Royal Sapphire (`#2563EB`), Fresh Emerald-Teal (`#0D9488`), Airy Ice-Blue (`#F0F7FF`), and Deep Slate Ink (`#0F172A`). Zero deep yellow/mustard, zero purple gradients, and a grounded dark Midnight Sapphire footer across both themes.

## Color — Neutrals & Surfaces

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#F8FAFC` | `#070E1B` |
| `--surface` | `#FFFFFF` | `#0D182C` |
| `--surface-2` (subtle fill) | `#F0F7FF` | `#13233F` |
| `--card-bg` | `#FFFFFF` | `#0F1D33` |
| `--card-border` / `--border` | `#DCE6F4` | `rgba(148,163,184,.15)` |
| `--border-strong` | `#BFDBFE` | `rgba(148,163,184,.28)` |
| `--divider` | `#E2E8F0` | `rgba(148,163,184,.12)` |
| `--text` | `#0A1628` | `#F1F5F9` |
| `--text-secondary` | `#1E2F47` | `#CBD5E1` |
| `--text-2` | `#2C3E58` | `#CBD5E1` |
| `--text-muted` | `#556982` | `#94A3B8` |

## Color — Official Accents (Fresh Sapphire & Emerald-Teal)

| Token | Light | Dark |
|---|---|---|
| `--accent` | `#2563EB` | `#38BDF8` |
| `--accent-hover` | `#1D4ED8` | `#7DD3FC` |
| `--accent-subtle` | `rgba(37,99,235,.08)` | `rgba(56,189,248,.12)` |
| `--btn-primary-bg` | `#2563EB` | `#2563EB` |
| `--accent-ink` (text on accent) | `#FFFFFF` | `#FFFFFF` |
| `--gold` (Fresh Teal secondary) | `#0D9488` | `#2DD4BF` |
| `--gold-subtle` | `rgba(13,148,136,.08)` | `rgba(45,212,191,.12)` |
| `--gold-border` | `rgba(13,148,136,.24)` | `rgba(45,212,191,.28)` |
| `--wa-green` (WhatsApp action) | `#116B3A` | `#116B3A` |
| `--wa-green-hover` | `#0D562E` | `#0F7B43` |
| `--success` | `#0F7B43` | `#4ADE80` |
| `--danger` | `#B42318` | `#F87171` |

## Color — Grounded Institutional Footer (Both Themes)

| Token | Light | Dark |
|---|---|---|
| `--footer-bg` | `#0B1528` | `#050912` |
| `--footer-surface` | `#13223E` | `#0A1322` |
| `--footer-border` | `rgba(45,212,191,.22)` | `rgba(148,163,184,.16)` |
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
