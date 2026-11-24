# মাপামাপ: কোন এলাকা টাকা আনছে — GA4 + Chamber Log

> **এটাই আসল KPI.** AdSense-এর RPM নয়, AdSense-এর views নয় — **কত টাকা আসছে কোন এলাকা থেকে**।

---

## ১. GA4 — যা already কাজ করছে (live-verified ২৪ নভে)

`/uttara-lawyer` এর WhatsApp CTA-তে click করলে যে payload যায়:
```
en=cta_click              ep.cta_id=uttara_whatsapp_hero
                          ep.placement=hero
                          ep.cta_kind=whatsapp
                          ep.page_lang=en
                          ep.area=uttara_sector12          ← area tag ✅
en=local_consult_request  ep.area=uttara_sector12          ← ★ আসল lead event
                          ep.service=general
en=whatsapp_click         ep.link_url=https://wa.me/8801955802007?text=…
```

### GA4-তে যে report বানাবে (২ মিনিট)
```
Explore → Funnel / Free-form
  Segment: Event = local_consult_request
  Dimension 1: area          (page_path-এর বদলে এটা দেখাও)
  Dimension 2: service
  Dimension 3: page_lang     (en / bn — বাংলা পেজ কি বেশি convert করছে?)
  Metric    : Event count

  পাশে রাখো: Users, Sessions, Total revenue (AdSense-এর revenue দিয়ে cross-check)
```

### পড়ার নিয়ম
```
area-এর event count = ওই এলাকা থেকে কতজন lead দিয়েছেন
কিন্তু বেশিরভাগ BD ক্লায়েন্ট ফোন/WhatsApp-এ আসে, form ফাইল করে না
   ⇒ GA4 event count = আনুমানিক (under-count)
   ⇒ বাকিটা reports/chamber-client-log.csv থেকে আসবে
GA4 + CSV মিলিয়ে পুরো ছবি পাওয়া যাবে
```

---

## ২. Chamber Log — প্রতিটি client এক লাইন (CSV)

`reports/chamber-client-log.csv` — কলাম:

| কলাম | কী লিখবে | উদাহরণ |
|---|---|---|
| `date` | মামলা/ফ্রি কনসাল্টেশনের তারিখ | `2026-11-24` |
| `area` | ক্লায়েন্ট কোন এলাকা থেকে | `uttara_sector12` · `gulshan` · `banani` · `bashundhara_ra` · `turag` |
| `service` | কী ধরনের কাজ | `criminal_bail` · `land_mutation` · `family_divorce` · `nrb_property` · `corporate` |
| `source` | কোথা থেকে এসেছে | `whatsapp` · `phone` · `google_maps` · `gbp` · `referral` · `facebook_group` · `nrb_reddit` |
| `fee_agreed_bdt` | চুক্তি হওয়া ফি (টাকা) | `25000` |
| `fee_agreed_usd` | USD (হিসাব করতে সুবিধা হয়) | `228` |
| `paid` | টাকা আসছে কি না | `yes` / `no` / `partial` |
| `referred_by` | কে রেফার করেছে | নাম/ফোন |
| `notes` | সংক্ষেপে বিষয় | `498 bail` · `mutation correction` |

### ⚠️ নিয়ম
```
· প্রতিটি ফ্রি কনসাল্টেশনেও ১ লাইন (fee_agreed = 0) — lead pipeline দেখা যাবে
· ফোনে আসা ক্লায়েন্টও লিখবে (সবচেয়ে বেশি এখানেই আসে)
· bKash 01712655546-এ পেমেন্ট হলে paid=yes
```

### ১ মাস পরে যে ৩টি সংখ্যা দেখবে (এগুলোই সিদ্ধান্ত নেবে)
```
১. কোন area-তে সবচেয়ে বেশি paid client        → বাজেট সেখানে
২. কোন service-এর average fee সবচেয়ে বেশি    → কোনটা প্রথমে প্রমোট করবে
৩. কোন source সবচেয়ে বেশি paid দেয়          → GBP? Facebook group? Referral?
```
**এই তিনটা সংখ্যা না জানলে কোনো marketing টাকা সঠিক জায়গায় যাবে না।**

---

## ৩. মাসিক রিভিউ চেকলিস্ট (প্রতি ১ তারিখে, ১৫ মিনিট)
```
□ GA4: local_consult_request → area তে break down
□ CSV: area অনুযায়ী paid count ও total fee
□ AdSense: revenue ও RPM (তুলনার জন্য)
□ কোন এলাকা/সার্ভিস paid ক্লায়েন্ট দেয় না → ১ মাসে কমিয়ে দাও
□ কোন source কাজ করছে → সেটাতে আরও টাকা দাও
```

---

## ৪. GBP → সাইটে আসা lead আলাদা করার জন্য (v10-এর পরে)
```
Google থেকে আসা ভিজিটরকে চিনতে: URL-এ ?utm_source=google&utm_medium=organic
বা /gulshan-lawyer লিংক দিয়ে GBP-তে পোস্ট করো (UTM সহ)
```
📄 UTM ফরম্যাট: `?utm_source=google&utm_medium=organic&utm_campaign=gmb&utm_content=post1`
```
GA4 → Acquisition → Traffic acquisition → Session campaign: gmb
তাহলে জানবে Maps থেকে কত lead আসছে
```
