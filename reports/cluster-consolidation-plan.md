# Cluster Consolidation Execution Plan (Ordered, ≤25% Per Cluster Per Batch)

**Precondition:** Stage A (`feature/post-freeze-release`) lands on `main` on **12 Dec 2026** and settles for 14 days.
**Non-Negotiable Rules:**
1. Every source URL must be validated against `reports/live-urls.json` (`assertLiveUrl`) and return HTTP `200` on live before redirecting.
2. Never 301 more than **25%** of a cluster's URLs in one deploy (Cluster A max 3, Cluster B max 2, Cluster C max 3; Cluster D has only 3 URLs total so 1 source is the minimum atomic unit).
3. Move all unique H2 sections into the KEEP target **before** enabling the 301 redirect.
4. Remove consolidated source URLs from `sitemap.xml`, `llms.txt`, and internal links; never add `noindex`; keep target canonicals self-referencing.
5. Wait **14 days** and verify live status + GSC/freeze-monitor before starting the next batch.

---

## Batch 1 — 26 Dec 2026 (Stage B Initial Consolidation · 5 URLs)

*(Adjusted from v4's 6 URLs by deferring `mithya-nari-nirjaton-mamla-protirodh-defense-2026-bn` to Batch 2 so Cluster B stays at `2/8 = 25%`.)*

| Cluster | % of Cluster | Action | Source URL | Target KEEP URL | Unique Content Moved Before 301 |
|---|---|---|---|---|---|
| A (15) | 6.7% (1/15) | `REDIRECT` | `/blog/power-of-attorney-property-transfer-registration-bangladesh` | `/blog/power-of-attorney-land-transfer-bangladesh` | None needed (strict subset) |
| B (8) | 25.0% (2/8) | `MERGE → 301` | `/bn/blog/mithya-nari-nirjaton-mamla-theke-bachar-ain-2026` | `/bn/blog/mithya-nari-nirjaton-mamla-atmoraksha-bd` | First 24h arrest checklist, FIR Quash, Penal Code 211/499-500 counter-case table, 2 FAQs |
| B (8) | 25.0% (2/8) | `MERGE → 301` | `/bn/blog/dv-act-mithya-nari-nirjaton-mamla-defense-2026-bn` | `/bn/blog/mithya-nari-nirjaton-mamla-atmoraksha-bd` | CrPC 561A quashing, 1–7 day action table, cost/timeline expectations |
| C (15) | 6.7% (1/15) | `MERGE → 301` | `/blog/cyber-crime-helpline-bangladesh-2026` | `/blog/bangladesh-cyber-crime-complaint-portal-guide-2026` | Dedicated Helpline table (PCSW `01320-000888`, `999`, BTRC `100`, CCIC, bKash `16247`, Nagad `16167`) + 2 FAQs |
| D (3) | 33.3% (1/3, min 1) | `MERGE → 301` | `/bn/blog/varatia-ucched-dokan-basa-106-dhara-legal-notice-2026-bn` | `/bn/blog/varatia-ucched-ainee-notice-bari-bhara-ain` | Assistant Judge eviction suit & bailiff possession, landlord risk note, 1991 vs 1882 Act comparison, lease clauses, 2 FAQs |

*(Note: `feature/stage-b-consolidation` currently includes `mithya-nari-nirjaton-mamla-protirodh-defense-2026-bn` in `seo/stage-b-clusters.json`; defer that 1 rule to Batch 2 before merging Stage B on 26 Dec if strict ≤25% per batch is desired, or keep all 6 if owner approves.)*

---

## Batch 2 — 09 Jan 2027 (+14 days · 6 URLs)

| Cluster | % of Cluster | Action | Source URL | Target KEEP URL | Unique Content to Move First |
|---|---|---|---|---|---|
| A (15) | 13.3% (2/15) | `MERGE → 301` | `/bn/blog/irrevocable-power-of-attorney-batil-niyom-bangladesh` | `/bn/blog/oprotteharjogyo-power-of-attorney-batil-korar-ain-2026` | Statutory grounds & registration-office cancellation steps under POA Act 2012 Sec 13 |
| A (15) | 13.3% (2/15) | `MERGE → 301` | `/bn/blog/power-of-attorney-nibondhon-batil-niyom-bangladesh` | `/bn/blog/oprotteharjogyo-power-of-attorney-batil-korar-ain-2026` | Execution + revocation checklist & stamp/fee notes |
| B (8) | 12.5% (1/8) | `MERGE → 301` | `/bn/blog/mithya-nari-nirjaton-mamla-protirodh-defense-2026-bn` | `/bn/blog/mithya-nari-nirjaton-mamla-atmoraksha-bd` | Evidence preparation & police-station/court bail process (already merged into KEEP in v4) |
| C (15) | 20.0% (3/15) | `MERGE → 301` | `/bn/blog/cyber-crime-helpline-online-complaint-bangladesh` | `/bn/blog/cyber-crime-complaint-online-police-helpline-2026` | Helpline table & BTRC/MFS emergency numbers (BN twin of Batch 1 EN source) |
| C (15) | 20.0% (3/15) | `MERGE → 301` | `/bn/blog/cyber-crime-complaint-online-police-helpline` | `/bn/blog/cyber-crime-complaint-online-police-helpline-2026` | Immediate helpline call flow & harassment evidence checklist |
| C (15) | 20.0% (3/15) | `MERGE → 301` | `/bn/blog/cyber-crime-kivabe-report-korben-bangladesh-2026` | `/bn/blog/cyber-crime-complaint-online-police-helpline-2026` | Any unique portal screenshots/email-format steps not in target |

---

## Batch 3 — 23 Jan 2027 (+14 days · 7 URLs)

| Cluster | % of Cluster | Action | Source URL | Target KEEP URL | Unique Content to Move First |
|---|---|---|---|---|---|
| A (15) | 13.3% (2/15) | `MERGE → 301` | `/bn/blog/power-of-attorney-ammoktarnama-batil-korar-niyom-2026-bn` | `/bn/blog/oprotteharjogyo-power-of-attorney-batil-korar-ain-2026` | Ammoktarnama revocation notice & sub-registry deed-cancellation steps |
| A (15) | 13.3% (2/15) | `MERGE → 301` | `/bn/blog/power-of-attorney-batil-korar-niyom-2026` | `/bn/blog/oprotteharjogyo-power-of-attorney-batil-korar-ain-2026` | PA challenge / civil cancellation grounds |
| B (8) | 25.0% (2/8) | `MERGE → 301` | `/bn/blog/nari-nirjaton-daman-ain-mithya-mamla-defend` | `/bn/blog/mithya-nari-nirjaton-mamla-atmoraksha-bd` | Any unique bail/defense arguments |
| B (8) | 25.0% (2/8) | `MERGE → 301` | `/bn/blog/mithya-yautuk-nari-nirjaton-mamla-protikar-bangladesh` | `/bn/blog/mithya-yautuk-mamla-theke-mukti-nari-shishu-2026` | Any unique false-dowry defense points |
| C (15) | 20.0% (3/15) | `MERGE → 301` | `/bn/blog/cyber-crime-abiyog-korar-niyom-bangladesh` | `/bn/blog/cyber-crime-complaint-online-police-helpline-2026` | Any unique GD/FIR drafting points |
| C (15) | 20.0% (3/15) | `MERGE → 301` | `/bn/blog/cyber-crime-abiyog-korar-dhap-2026` | `/bn/blog/cyber-crime-complaint-online-police-helpline-2026` | 5-step police reporting summary |
| C (15) | 20.0% (3/15) | `MERGE → 301` | `/bn/blog/cyber-crime-abiyog-korar-poripurno-niyom-2026` | `/bn/blog/cyber-crime-complaint-online-police-helpline-2026` | Any unique online complaint tips |

---

## Batch 4 — 06 Feb 2027 (+14 days · 2 URLs + 5 `DIFFERENTIATE` Rewrites)

| Cluster | % of Cluster | Action | Source URL | Target KEEP URL | Unique Content / Angle |
|---|---|---|---|---|---|
| C (15) | 13.3% (2/15) | `REDIRECT` | `/bn/blog/cyber-crime-abiyog-bangladesh` | `/bn/blog/cyber-crime-complaint-online-police-helpline-2026` | Strict subset; straight 301 |
| C (15) | 13.3% (2/15) | `MERGE → 301` | `/bn/blog/cyber-crime-helpline-btrc-police-report-2026-bn` | `/bn/blog/cyber-crime-complaint-online-police-helpline-2026` | BTRC telecom/SIM-fraud reporting steps |
| A | — | `DIFFERENTIATE` | `/blog/nrb-power-of-attorney-bangladesh-embassy-attestation-guide` | — | Re-target H1/title to country-by-country embassy/consulate attestation fees & timelines (USA/UK/Canada) |
| A | — | `DIFFERENTIATE` | `/blog/power-of-attorney-bangladesh-property-from-abroad` | — | Linked from `/nrb-legal-help`; re-target to NRB property purchase & management (non-sale) from abroad |
| A | — | `DIFFERENTIATE` | `/bn/blog/power-of-attorney-jomi-dakhol-batil-mokoddama-2026-bn` | — | Re-target strictly to civil suit for POA fraud & illegal land possession |
| B | — | `DIFFERENTIATE` | `/bn/blog/mithya-nari-nirjaton-yautuk-mamla-khlash-quashment-2026-bn` | — | Re-target strictly to trial-stage cross-examination, acquittal (খালাস) & Sec 561A quashment |
| C | — | `DIFFERENTIATE` | `/bn/blog/cyber-crime-unit-bangladesh-2026-bn` | — | Re-target strictly to CID Cyber Police Centre (Malibagh) walk-in process & digital forensics |
