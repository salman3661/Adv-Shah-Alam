# Phase 1 Redirect Tasks

## Broken URLs from Audit Report to fix in vercel.json:

1. /b/blog/:slug* → /bn/blog/:slug*  (typo b/ instead of bn/)
2. /bn/bank/:slug* → /bn/blog/:slug*  (typo bank/ instead of blog/)
3. /advmdshahalam.me/* → /  (nested domain concatenation bug - 410)
4. /bdlawspro.com → /  (external domain leak - 410)
5. /blog/artha-rin-adalat-loan-recovery-bangladesh → /blog/artha-rin-adalat-loan-recovery-bangladesh (non-www 301 already handled globally)

## Typo Slugs to redirect:
- /blog/cyber-crime-helpline-bankladesh-2026 → /blog/cyber-crime-helpline-bangladesh-2026
- /blog/heba-gift-deed-law-babgladesh → /blog/heba-gift-deed-law-bangladesh
- /bn/blog/baba-sampatti-vantan-ain-banglandesh-2026 → /bn/blog/babar-sampatti-banton-ain-bangladesh
- /bn/blog/batwara-mamla-court-yee-prokriya-bd → /bn/blog/batoara-mamla-kotodin-chole-khoroch-partition-suit
- /bn/blog/court-marriage-horoch-niyom-papers-bangladesh-2026 → /bn/blog/court-marriage-niyom-khoroch-bangladesh
- /bn/blog/miss-case-namjari-batil-prokriya-ac-land-20-bn → /bn/blog/jal-dolil-batil-mamla-specific-relief-act

## Cross-Language Misplaced Posts (EN /blog/ → BN /bn/blog/):
- /blog/sontan-custody-abhibhaboktwa-mamla-family-court-2026-bn → /bn/blog/
- /blog/bkash-nagad-fraud-taka-recovery-gd-court-order-2026-bn → /bn/blog/
- /blog/bari-vara-ain-varatia-ucched-jamanat-niyom-2026 → /bn/blog/varatia-ucched-ainee-notice-bari-bhara-ain
