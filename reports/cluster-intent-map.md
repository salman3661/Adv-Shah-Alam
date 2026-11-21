# Full 41-URL Cluster Intent Map

**Source of Truth:** `CLUSTER-MAP-2026-11-21.md` + `reports/live-urls.json` (all 41 URLs live HTTP `200`, present in `sitemap.xml`).
**Verdict Counts (41 URLs total):**
- `KEEP`: **14**
- `DIFFERENTIATE`: **5**
- `MERGE → X`: **20**
- `REDIRECT → X`: **2**

---

## Cluster A — Power of Attorney (15 URLs)

| # | URL | Live | Words | H2 | Verdict | Target | Reason |
|---|---|---|---|---|---|---|---|
| 1 | `/blog/power-of-attorney-from-abroad-bangladesh-land-sale-attestation-guide` | 200 | 5674 | 19 | `KEEP` | — | Strongest EN NRB land-sale POA + attestation pillar; linked from `/nrb-legal-help`; paired with BN #2 |
| 2 | `/bn/blog/nrb-power-of-attorney-jomi-bikroy-dutabas-attestation-2026-bn` | 200 | 4716 | 19 | `KEEP` | — | BN twin of #1 (NRB land-sale POA + embassy/MOFA attestation) |
| 3 | `/blog/nrb-power-of-attorney-bangladesh-embassy-attestation-guide` | 200 | 3812 | 16 | `DIFFERENTIATE` | — | Re-target H1/title specifically to USA/UK/Canada consulate-by-consulate attestation fees & timelines |
| 4 | `/bn/blog/oprotteharjogyo-power-of-attorney-batil-korar-ain-2026` | 200 | 2319 | 18 | `KEEP` | — | Strongest BN irrevocable POA revocation/cancellation pillar |
| 5 | `/blog/power-of-attorney-land-transfer-bangladesh` | 200 | 2258 | 12 | `KEEP` | — | Core EN domestic land-transfer POA pillar (v4 KEEP); paired with BN #10 |
| 6 | `/bn/blog/irrevocable-power-of-attorney-batil-niyom-bangladesh` | 200 | 1829 | 11 | `MERGE → X` | `/bn/blog/oprotteharjogyo-power-of-attorney-batil-korar-ain-2026` | Same irrevocable POA cancellation intent as #4; move unique statutory/procedure points before 301 |
| 7 | `/blog/power-of-attorney-bangladesh-property-from-abroad` | 200 | 1742 | 12 | `DIFFERENTIATE` | — | Linked from `/nrb-legal-help`; re-target to NRB property purchase/management (non-sale) from abroad |
| 8 | `/blog/power-of-attorney-types-registration-bangladesh` | 200 | 1394 | 9 | `KEEP` | — | Distinct sub-intent (General vs Special vs Irrevocable POA types & registration); paired with BN #12 |
| 9 | `/bn/blog/power-of-attorney-nibondhon-batil-niyom-bangladesh` | 200 | 1336 | 8 | `MERGE → X` | `/bn/blog/oprotteharjogyo-power-of-attorney-batil-korar-ain-2026` | Duplicate BN POA execution & cancellation guide; merge unique registration/revocation steps into #4 |
| 10 | `/bn/blog/power-of-attorney-land-transfer-bangladesh-bn` | 200 | 1284 | 10 | `KEEP` | — | BN twin of #5 (domestic land-transfer POA) |
| 11 | `/bn/blog/power-of-attorney-jomi-dakhol-batil-mokoddama-2026-bn` | 200 | 1228 | 11 | `DIFFERENTIATE` | — | Distinct sub-intent: civil suit for POA fraud & illegal land possession (জালিয়াতি ও জমি দখল মোকদ্দমা) |
| 12 | `/bn/blog/power-of-attorney-nibondhon-bangladesh` | 200 | 1124 | 8 | `KEEP` | — | BN twin of #8 (POA types & registration) |
| 13 | `/bn/blog/power-of-attorney-ammoktarnama-batil-korar-niyom-2026-bn` | 200 | 1003 | 9 | `MERGE → X` | `/bn/blog/oprotteharjogyo-power-of-attorney-batil-korar-ain-2026` | Near-duplicate BN POA cancellation guide; merge unique Ammoktarnama cancellation steps into #4 |
| 14 | `/bn/blog/power-of-attorney-batil-korar-niyom-2026` | 200 | 973 | 9 | `MERGE → X` | `/bn/blog/oprotteharjogyo-power-of-attorney-batil-korar-ain-2026` | Near-duplicate BN POA cancellation guide; merge unique challenge/revocation points into #4 |
| 15 | `/blog/power-of-attorney-property-transfer-registration-bangladesh` | 200 | 924 | 9 | `REDIRECT → X` | `/blog/power-of-attorney-land-transfer-bangladesh` | Strict subset of #5 (v4 Stage B Batch 1); no unique sections |

---

## Cluster B — মিথ্যা নারী/যৌতুক নির্যাতন (8 URLs)

| # | URL | Live | Words | H2 | Verdict | Target | Reason |
|---|---|---|---|---|---|---|---|
| 1 | `/bn/blog/mithya-yautuk-mamla-theke-mukti-nari-shishu-2026` | 200 | 2488 | 16 | `KEEP` | — | Strongest BN false dowry case (Sec 3/4 Dowry Act + 11(ga)) pillar |
| 2 | `/bn/blog/mithya-nari-nirjaton-mamla-atmoraksha-bd` | 200 | 1688 | 11 | `KEEP` | — | Core BN false Nari Nirjaton defense pillar (v4 KEEP) |
| 3 | `/bn/blog/mithya-nari-nirjaton-mamla-protirodh-defense-2026-bn` | 200 | 1451 | 11 | `MERGE → X` | `/bn/blog/mithya-nari-nirjaton-mamla-atmoraksha-bd` | Same defense intent as #2; unique evidence/bail sections already merged in v4 |
| 4 | `/bn/blog/mithya-nari-nirjaton-yautuk-mamla-khlash-quashment-2026-bn` | 200 | 1308 | 11 | `DIFFERENTIATE` | — | Re-target H1/title strictly to trial-stage cross-examination, acquittal (খালাস) & Sec 561A quashment |
| 5 | `/bn/blog/nari-nirjaton-daman-ain-mithya-mamla-defend` | 200 | 1300 | 10 | `MERGE → X` | `/bn/blog/mithya-nari-nirjaton-mamla-atmoraksha-bd` | Same false-case & bail defense intent as #2; merge unique points into #2 |
| 6 | `/bn/blog/mithya-nari-nirjaton-mamla-theke-bachar-ain-2026` | 200 | 1166 | 9 | `MERGE → X` | `/bn/blog/mithya-nari-nirjaton-mamla-atmoraksha-bd` | Same intent as #2; 24-hour arrest, FIR quash & counter-case sections merged in v4 |
| 7 | `/bn/blog/dv-act-mithya-nari-nirjaton-mamla-defense-2026-bn` | 200 | 1164 | 13 | `MERGE → X` | `/bn/blog/mithya-nari-nirjaton-mamla-atmoraksha-bd` | Same intent as #2 (real slug); 561A, 1–7 day plan & evidence sections merged in v4 |
| 8 | `/bn/blog/mithya-yautuk-nari-nirjaton-mamla-protikar-bangladesh` | 200 | 1096 | 8 | `MERGE → X` | `/bn/blog/mithya-yautuk-mamla-theke-mukti-nari-shishu-2026` | Same false dowry + family harassment intent as #1; merge unique points into #1 |

---

## Cluster C — Cyber Crime (15 URLs)

| # | URL | Live | Words | H2 | Verdict | Target | Reason |
|---|---|---|---|---|---|---|---|
| 1 | `/blog/bangladesh-cyber-crime-complaint-portal-guide-2026` | 200 | 3698 | 15 | `KEEP` | — | Strongest EN cyber crime reporting & helpline pillar (v4 KEEP); paired with BN #4 |
| 2 | `/blog/cyber-crime-bangladesh-laws-penalties-2026` | 200 | 2931 | 14 | `KEEP` | — | Distinct sub-intent: Cyber Security Act 2023 offences & penalties; paired with BN #13 |
| 3 | `/blog/cyber-crime-helpline-bangladesh-2026` | 200 | 2508 | 13 | `MERGE → X` | `/blog/bangladesh-cyber-crime-complaint-portal-guide-2026` | Same helpline/reporting intent as #1; helpline table & FAQs merged in v4 |
| 4 | `/bn/blog/cyber-crime-complaint-online-police-helpline-2026` | 200 | 2435 | 17 | `KEEP` | — | BN twin of #1 (strongest BN online complaint & helpline pillar) |
| 5 | `/bn/blog/cyber-crime-unit-bangladesh-2026-bn` | 200 | 2097 | 13 | `DIFFERENTIATE` | — | Re-target strictly to CID Cyber Police Centre (Malibagh) walk-in process & digital forensics |
| 6 | `/bn/blog/cyber-crime-kivabe-report-korben-bangladesh-2026` | 200 | 2048 | 13 | `MERGE → X` | `/bn/blog/cyber-crime-complaint-online-police-helpline-2026` | Same BN cyber crime reporting intent as #4; merge unique steps into #4 |
| 7 | `/bn/blog/cyber-crime-abiyog-korar-niyom-bangladesh` | 200 | 1969 | 8 | `MERGE → X` | `/bn/blog/cyber-crime-complaint-online-police-helpline-2026` | Same BN complaint procedure intent as #4; merge unique points into #4 |
| 8 | `/bn/blog/cyber-crime-complaint-online-police-helpline` | 200 | 1804 | 13 | `MERGE → X` | `/bn/blog/cyber-crime-complaint-online-police-helpline-2026` | Same BN helpline/reporting intent as #4; merge unique points into #4 |
| 9 | `/blog/cyberbullying-blackmail-police-cyber-crime-unit-bangladesh-2026` | 200 | 1631 | 12 | `KEEP` | — | Distinct sub-intent: cyberbullying, blackmail & fake ID remedies |
| 10 | `/bn/blog/cyber-crime-abiyog-korar-dhap-2026` | 200 | 1348 | 13 | `MERGE → X` | `/bn/blog/cyber-crime-complaint-online-police-helpline-2026` | Same 5-step BN reporting intent as #4; merge unique points into #4 |
| 11 | `/bn/blog/cyber-crime-abiyog-korar-poripurno-niyom-2026` | 200 | 1338 | 10 | `MERGE → X` | `/bn/blog/cyber-crime-complaint-online-police-helpline-2026` | Same BN complaint guide intent as #4; merge unique points into #4 |
| 12 | `/bn/blog/cyber-crime-helpline-online-complaint-bangladesh` | 200 | 1214 | 14 | `MERGE → X` | `/bn/blog/cyber-crime-complaint-online-police-helpline-2026` | Former BN twin of #3; merge unique helpline details into #4 |
| 13 | `/bn/blog/cybercrime-digital-security-bangladesh-bn` | 200 | 1198 | 11 | `KEEP` | — | BN twin of #2 (Cyber Security Act laws, rights & remedies) |
| 14 | `/bn/blog/cyber-crime-abiyog-bangladesh` | 200 | 1126 | 8 | `REDIRECT → X` | `/bn/blog/cyber-crime-complaint-online-police-helpline-2026` | Strict subset of #4; straight 301 |
| 15 | `/bn/blog/cyber-crime-helpline-btrc-police-report-2026-bn` | 200 | 1066 | 13 | `MERGE → X` | `/bn/blog/cyber-crime-complaint-online-police-helpline-2026` | Same BTRC + police helpline reporting intent as #4; merge unique BTRC steps into #4 |

---

## Cluster D — ভাড়াটিয়া উচ্ছেদ (3 URLs)

| # | URL | Live | Words | H2 | Verdict | Target | Reason |
|---|---|---|---|---|---|---|---|
| 1 | `/bn/blog/bari-vara-ain-varatia-ucched-jamanat-niyom-2026` | 200 | 2438 | 17 | `KEEP` | — | Distinct sub-intent: rent agreement, security deposit (জামানত) & House Rent Control Act rules |
| 2 | `/bn/blog/varatia-ucched-ainee-notice-bari-bhara-ain` | 200 | 1774 | 11 | `KEEP` | — | Core BN eviction notice (Sec 106 TP Act) & eviction suit pillar (v4 KEEP) |
| 3 | `/bn/blog/varatia-ucched-dokan-basa-106-dhara-legal-notice-2026-bn` | 200 | 1233 | 11 | `MERGE → X` | `/bn/blog/varatia-ucched-ainee-notice-bari-bhara-ain` | Same Sec 106 eviction notice/suit intent as #2; unique sections merged in v4 |
