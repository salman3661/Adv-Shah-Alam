# Monetization & Revenue Projection Model (`www.advmdshahalam.me`)

## 1. AdSense Optimization (Zero-CLS, Interaction-Gated)
- **Publisher ID:** `ca-pub-1781126556775676` (`public/ads.txt` preserved)
- **Loading Strategy:** Interaction-gated loader in `index.html` (`scroll`, `wheel`, `touchstart`, `pointerdown`, `mousemove`, `keydown`) so initial FCP/LCP/TBT remain unblocked.
- **CLS Prevention:** `.ad-slot-reserved { min-height: 280px; }` reserves vertical space before ad fill. Max 4 units/page.

## 2. Owned-Revenue Conversion Funnel (High-Margin Legal Services)
- **NRB Legal Services Hub (`/nrb-legal-help`):**
  - 45-Min Video Case Review: **৳3,000 / $30**
  - Land Deed & Khatian Vetting (Written Legal Opinion): **৳8,000 / $75**
  - PoA / Legal Notice / Agreement Drafting: **৳5,000 / $50**
- **Booking & Fallback:** Direct WhatsApp (`+880 1955-802007`), Phone (`+880 1712-655546`), and `/contact?service=case-review` backed by `/api/contact`.

## 3. 12-Week Revenue Projection (Conservative vs Target)
| Channel | Baseline (Current) | 12-Week Conservative | 12-Week Target |
| :--- | :--- | :--- | :--- |
| Organic Sessions / mo | ~12,000 | 22,000 (+83%) | 35,000 (+191%) |
| AdSense RPM (BD + NRB mix) | $1.10 | $1.85 | $2.60 |
| AdSense Monthly Revenue | ~$13 | ~$41 | ~$91 |
| Paid NRB Case Reviews / mo | 2 ($60) | 10 ($350) | 22 ($880) |
| Local Chamber Retainers from Web / mo | 4 (~৳80,000) | 10 (~৳200,000) | 18 (~৳360,000) |

## 4. GA4 Event Taxonomy
Tracked automatically via `index.html` (`G-PJ4Z9WLRBS`):
- `whatsapp_click`, `call_click`, `consult_cta_click`, `form_start`, `form_submit`, `scroll_depth_50`, `scroll_depth_90`, `ad_click`.
