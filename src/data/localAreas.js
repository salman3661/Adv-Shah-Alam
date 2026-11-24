import { OFFICE_HOURS } from '../seo/entity.js';

export const LOCAL_AREAS = {
  gulshan: {
    key: 'gulshan',
    slug: 'gulshan-lawyer',
    enPath: '/gulshan-lawyer',
    bnPath: '/bn/gulshan-lawyer',
    gaArea: 'gulshan',
    gaService: 'gulshan_chamber',
    areaServed: [
      { '@type': 'Place', name: 'Gulshan-1, Dhaka' },
      { '@type': 'Place', name: 'Gulshan-2, Dhaka' },
      { '@type': 'Place', name: 'Niketan, Dhaka' },
      { '@type': 'Place', name: 'Mohakhali, Dhaka' },
      { '@type': 'Place', name: 'Baridhara Diplomatic Zone, Dhaka' },
      { '@type': 'Place', name: 'DNCC Ward 19 & Ward 20, Dhaka' },
      { '@type': 'City', name: 'Dhaka' },
      { '@type': 'Country', name: 'Bangladesh' },
    ],
    en: {
      title: 'Gulshan Lawyer in Dhaka — Rent, Corporate, Land & Bail',
      h1: 'Gulshan Lawyer in Dhaka — Rent Control, Corporate, Embassy Attestation & Property Law',
      description:
        'Supreme Court advocate serving Gulshan-1, Gulshan-2, Niketan & Mohakhali (DNCC Ward 19 & 20) in Rent Control eviction, corporate law, MOFA/embassy attestation, land & bail. First consultation free.',
      serviceType: 'Gulshan Legal Services — Rent Eviction, Corporate, Embassy Attestation, Land & Bail Law',
      badge: 'Serving Gulshan-1, Gulshan-2, Niketan & Mohakhali (DNCC Ward 19 & 20)',
      intro:
        'Advocate Md. Shah Alam is a Bangladesh Bar Council enrolled advocate practising before the Supreme Court of Bangladesh and Dhaka Judge Court. Serving residents, commercial landlords, diplomatic-zone offices, and Non-Resident Bangladeshis (NRBs) with properties in Gulshan-1, Gulshan-2, Niketan, and Mohakhali, our Uttara Sector 12 chamber and Kotwali Judge Court chamber handle Rent Control Act 1991 eviction suits, corporate and RJSC compliance, embassy and MOFA document legalisation, property due diligence, family law, and urgent criminal bail matters. The first consultation is free with no advance fee — legal fees are agreed only after reviewing your documents and scope.',
      waMessage:
        'Hello, I would like a free first legal consultation regarding a legal matter in Gulshan (Dhaka).',
      quickTable: [
        ['Primary Police Station (DMP Verified)', 'Gulshan PS — H-32, 115 Gulshan Avenue, Gulshan-2, Dhaka'],
        ['Verified DNCC Wards', 'DNCC Ward 19 (Gulshan 1–2, Banani, Korail) & DNCC Ward 20 (Mohakhali, Niketan)'],
        ['Chamber Locations', 'Uttara Chamber: House 46, Road 6/B, Sector 12, Uttara West, Dhaka 1230 · Judge Court Chamber: Ainjeebi Samity Bhaban, 4th Floor, 6/7 Court House Street, Kotwali, Dhaka-1100'],
        ['Office Hours', OFFICE_HOURS.en],
        ['Courts Covered', 'Dhaka CMM Court, Dhaka Judge & Sessions Court (Kotwali), Dhaka Civil / Assistant Judge Courts, Family Court & Supreme Court of Bangladesh (High Court Division)'],
        ['Consultation Policy', 'First consultation is free — no advance fee. Legal fees are discussed and agreed only after reviewing your documents and scope.'],
      ],
      jurisdictionRows: [
        ['Gulshan-1 & Gulshan-2 (Residential & Commercial)', 'Gulshan PS — H-32, 115 Gulshan Avenue, Gulshan-2', 'DNCC Ward 19', 'Commercial & residential rent eviction (Rent Control Act 1991), corporate retainers, NRB apartment title verification'],
        ['Niketan & Mohakhali', 'Gulshan PS / Banani PS (as applicable)', 'DNCC Ward 20', 'Flat sale & mutation (e-Namjari), tenant disputes, Section 138 cheque recovery, family law'],
        ['Gulshan Diplomatic Zone & Embassy Corridor', 'Gulshan PS — H-32, 115 Gulshan Avenue, Gulshan-2', 'DNCC Ward 19', 'Embassy & MOFA attestation, NRB Power of Attorney, foreign divorce decree recognition'],
        ['Adjacent Banani & Baridhara', 'Banani PS (R-7, H-37) / Gulshan PS / Vatara PS', 'DNCC Ward 19 / 18', 'RJSC corporate filings, high-value lease drafting, High Court writ & anticipatory bail'],
      ],
      caseTimelineTable: {
        heading: 'Common Gulshan Legal Matters, Governing Statutes & Procedural Stages',
        columns: ['Matter Type', 'Governing Law / Statute', 'Forum / Office', 'Key Procedural Stages'],
        rows: [
          ['Commercial / Residential Tenant Eviction', 'Premises Rent Control Act 1991; Section 106 Transfer of Property Act 1882', 'Dhaka Assistant Judge Court', 'Statutory written notice to quit, plaint filing, summons & written statement, evidence, decree & execution'],
          ['Apartment Purchase & Title Vetting', 'Registration Act 1908; Transfer of Property Act 1882; State Acquisition & Tenancy Act 1950', 'Sub-Registrar Office, RAJUK & AC Land', 'Chain deed (Baya Dalil) audit, CS/SA/RS/City Jarip Khatian check, Lis Pendens search, RAJUK clearance, deed execution & e-Namjari'],
          ['NRB Power of Attorney & Attestation', 'Power of Attorney Act 2012 & Rules 2015', 'Bangladesh Embassy abroad, MOFA Dhaka & DC Office', 'Drafting PoA, embassy attestation abroad, MOFA authentication in Dhaka, Deputy Commissioner (DC) stamping'],
          ['Section 138 Cheque Dishonour', 'Section 138 Negotiable Instruments Act 1881', 'Dhaka CMM Court & Sessions Court', 'Bank dishonour slip, 30-day statutory legal notice, 30-day payment window, complaint filing & trial'],
          ['Anticipatory & Regular Bail (Gulshan PS)', 'Sections 497 & 498 Code of Criminal Procedure 1898', 'High Court Division & Dhaka CMM Court', 'FIR/GD copy review, petition drafting, urgent High Court anticipatory bail or surrender & regular bail hearing'],
        ],
      },
      sections: [
        {
          heading: 'Premises Rent Control Act 1991 & Commercial Eviction in Gulshan',
          paragraphs: [
            'Gulshan-1, Gulshan-2, and Niketan have some of the highest residential apartment rents and commercial office leases in Dhaka. Disputes frequently arise when a commercial or residential tenant defaults on rent, holds over after lease expiry, sublets without written consent, or refuses to settle utility arrears and security deposit adjustments.',
            'Under the Premises Rent Control Act 1991 and Section 106 of the Transfer of Property Act 1882, landlords must serve a legally compliant written notice to quit before filing an eviction suit in the Assistant Judge Court. Self-help measures such as locking premises or disconnecting electricity, water, or gas lines are unlawful and expose landlords to criminal complaints at Gulshan Police Station. We draft airtight lease agreements, issue statutory eviction notices, and represent both landlords and commercial tenants in Dhaka civil courts.',
          ],
        },
        {
          heading: 'Embassy & MOFA Attestation and NRB Property Matters in Gulshan',
          paragraphs: [
            'Because Gulshan hosts foreign embassies, consulates, and a large concentration of apartments owned by Non-Resident Bangladeshis living in the UK, USA, Canada, UAE, and Europe, document legalisation and remote property management are core needs in this area. Buying, selling, gifting (Heba), or mutating a Gulshan apartment while living abroad requires a properly executed Power of Attorney under the Power of Attorney Act 2012, attested by the relevant Bangladesh Embassy and authenticated by the Ministry of Foreign Affairs (MOFA) in Dhaka.',
            'We handle complete title due diligence (chain deeds, RAJUK transfer permissions, CS/SA/RS/City Jarip Khatian verification, Lis Pendens search), e-Namjari mutation, sub-registry coordination, and recognition of foreign divorce decrees under Section 13 of the Code of Civil Procedure 1908 for NRB families with assets in Gulshan and Niketan.',
          ],
        },
        {
          heading: 'Step-by-Step Flat & Land Registration Verification in Gulshan and Niketan',
          paragraphs: [
            'High-value Gulshan and Niketan apartments often change hands through multiple past transfers, developer land-sharing agreements, or inheritance partitions. Under the Registration Act 1908 and the Transfer of Property Act 1882, buyers should verify every link in the chain of title deeds (Baya Dalil), inspect the RAJUK lease/allotment terms and transfer permission, cross-check CS/SA/RS and Mahanagar (City) Jarip Khatians, and confirm that no civil suit or mortgage encumbrance (Lis Pendens under Section 52 of the Transfer of Property Act 1882) clouds the property.',
            'Our chamber prepares a written title due diligence checklist before you sign a Bayna (agreement for sale), drafts clear payment-milestone clauses, coordinates deed registration at the relevant Sub-Registrar office, and follows through on e-Namjari mutation and land development tax (Khajna) updates at the AC Land office.',
          ],
        },
        {
          heading: 'Corporate Advisory, Section 138 Cheque Cases & Urgent Bail (Gulshan PS)',
          paragraphs: [
            'Corporate offices, NGOs, and commercial enterprises operating along Gulshan Avenue and Kemal Ataturk Avenue regularly require RJSC company incorporation under the Companies Act 1994, shareholder agreement drafting, director dispute resolution, employment contract review under the Bangladesh Labour Act 2006, and tax/VAT compliance support.',
            'For unpaid commercial invoices and dishonoured cheques under Section 138 of the Negotiable Instruments Act 1881, we issue statutory 30-day legal notices and prosecute or defend complaints before the Dhaka CMM Court. When an urgent FIR, GD, or arrest warrant involves Gulshan Police Station, we act swiftly for High Court anticipatory bail under Section 498 CrPC or regular bail hearings.',
          ],
        },
        {
          heading: 'Transparent Fee Structure & Scope Agreement (No Advance Fee for Initial Review)',
          paragraphs: [
            'We do not quote arbitrary flat fees before seeing your documents because legal work in Gulshan varies significantly between a single statutory eviction notice, a full apartment title audit, a contested civil suit, or a High Court writ/bail petition. Every engagement starts with a free first consultation.',
            'Once we examine your lease deed, Khatian, FIR, or corporate papers, we explain the exact statutory steps, distinguish government revenue/court-stamp charges from professional legal fees, and confirm the scope in writing before any paid work begins.',
          ],
        },
        {
          heading: 'How to Book Your Free First Consultation from Gulshan or Abroad',
          paragraphs: [
            'You can message our WhatsApp desk (+880 1955-802007) or call +880 1712-655546 directly to share a brief summary of your Gulshan, Niketan, or Mohakhali matter. In-person chamber appointments are available 7 days a week at our nearby Uttara Sector 12 chamber (Sunday – Thursday: 8:00 AM – 10:00 PM; Friday – Saturday (Uttara Chamber): 10:00 AM – 10:00 PM) and during court hours at Ainjeebi Samity Bhaban, Kotwali Judge Court.',
          ],
        },
      ],
      faqs: [
        {
          q: '1. Which police station and DNCC wards cover Gulshan-1, Gulshan-2, and Niketan?',
          a: 'Gulshan-1 and Gulshan-2 fall under Gulshan Police Station (H-32, 115 Gulshan Avenue, Gulshan-2) and DNCC Ward 19, while Mohakhali and Niketan fall under DNCC Ward 20.',
        },
        {
          q: '2. How do I legally evict a defaulting commercial or residential tenant in Gulshan?',
          a: 'You must serve a legally valid written notice under Section 106 of the Transfer of Property Act 1882 and proceed under the Premises Rent Control Act 1991 before the Assistant Judge Court. Never cut utility connections or change locks without a court decree.',
        },
        {
          q: '3. Can NRB apartment owners in Gulshan complete sale, mutation, or attestation without travelling immediately?',
          a: 'Yes. Through an embassy-attested Power of Attorney under the Power of Attorney Act 2012 authenticated by MOFA in Dhaka, our chamber can verify title deeds, coordinate mutation, and represent your interests in Dhaka courts or registries.',
        },
        {
          q: '4. What should be verified before paying Bayna for a Gulshan or Niketan flat?',
          a: 'Verify the complete chain of registered deeds (Baya Dalil), RAJUK transfer permission and approved plan, CS/SA/RS/City Jarip Khatian, current e-Namjari mutation, utility clearance, and a sub-registry search for any mortgage or pending civil suit (Lis Pendens).',
        },
        {
          q: '5. How quickly can bail be arranged if an FIR is lodged at Gulshan Police Station?',
          a: 'Once you share the FIR or GD copy, we immediately evaluate whether High Court anticipatory bail under Section 498 CrPC or surrender and regular bail before the Dhaka CMM Court is the safest legal route.',
        },
        {
          q: '6. Is the first consultation free for Gulshan clients?',
          a: 'Yes. The first consultation — whether via WhatsApp, phone, or at our nearby Uttara Sector 12 chamber or Judge Court chamber — is free with no advance fee.',
        },
      ],
    },
    bn: {
      title: 'গুলশান আইনজীবী ঢাকা — ভাড়া উচ্ছেদ, কর্পোরেট ও জমি',
      h1: 'গুলশান আইনজীবী ঢাকা — ভাড়াটিয়া উচ্ছেদ, কর্পোরেট, দূতাবাস সত্যায়ন ও সম্পত্তি আইন',
      description:
        'গুলশান-১, গুলশান-২, নিকেতন ও মহাখালী (ডিএনসিসি ওয়ার্ড ১৯ ও ২০) এলাকার ভাড়া উচ্ছেদ, কর্পোরেট, দূতাবাস/MOFA সত্যায়ন, জমি-ফ্ল্যাট ও জামিন মামলার আইনি সহায়তা। প্রথম পরামর্শ ফ্রি।',
      serviceType: 'গুলশান আইনি সেবা — ভাড়া উচ্ছেদ, কর্পোরেট, দূতাবাস সত্যায়ন, জমি ও জামিন',
      badge: 'গুলশান-১, গুলশান-২, নিকেতন ও মহাখালী (ডিএনসিসি ওয়ার্ড ১৯ ও ২০)',
      intro:
        'অ্যাডভোকেট মো. শাহ আলম বাংলাদেশের সুপ্রিম কোর্ট ও ঢাকা জজ কোর্টের একজন তালিকাভুক্ত আইনজীবী। গুলশান-১, গুলশান-২, নিকেতন ও মহাখালীর বাসিন্দা, বাণিজ্যিক প্রতিষ্ঠানের মালিক এবং প্রবাসী বাংলাদেশি (NRB) ফ্ল্যাট মালিকদের জন্য আমাদের উত্তরা সেক্টর ১২ চেম্বার ও কোতোয়ালি জজ কোর্ট চেম্বার থেকে বাড়ি ভাড়া নিয়ন্ত্রণ আইন ১৯৯১-এ উচ্ছেদ, কর্পোরেট ও আরজেএসসি, দূতাবাস ও পররাষ্ট্র মন্ত্রণালয় (MOFA) সত্যায়ন, ফ্ল্যাট দলিল যাচাই, পারিবারিক ও ফৌজদারি জামিন সহায়তা প্রদান করা হয়। প্রথম পরামর্শ ফ্রি — কোনো অগ্রিম ফি ছাড়াই কাজের পরিধি বুঝিয়ে দেওয়া হয়।',
      waMessage:
        'আসসালামু আলাইকুম, গুলশান এলাকার একটি আইনি বিষয়ে ফ্রি প্রথম পরামর্শের জন্য যোগাযোগ করছি।',
      quickTable: [
        ['প্রধান থানা (DMP যাচাইকৃত)', 'গুলশান থানা — বাড়ি ৩২, ১১৫ গুলশান অ্যাভিনিউ, গুলশান-২, ঢাকা'],
        ['যাচাইকৃত ডিএনসিসি ওয়ার্ড', 'ডিএনসিসি ওয়ার্ড ১৯ (গুলশান ১–২, বনানী, কড়াইল) এবং ওয়ার্ড ২০ (মহাখালী, নিকেতন)'],
        ['চেম্বার ঠিকানা', 'উত্তরা চেম্বার: বাড়ি ৪৬, রোড ৬/বি, সেক্টর ১২, উত্তরা পশ্চিম, ঢাকা ১২৩০ · জজ কোর্ট চেম্বার: আইনজীবী সমিতি ভবন, ৪র্থ তলা, ৬/৭ কোর্ট হাউস স্ট্রিট, কোতোয়ালি, ঢাকা-১১০০'],
        ['অফিস সময়', OFFICE_HOURS.bn],
        ['সংশ্লিষ্ট আদালত', 'ঢাকা সিএমএম আদালত, ঢাকা জেলা ও দায়রা জজ আদালত (কোতোয়ালি), সহকারী জজ (দেওয়ানি) আদালত, পারিবারিক আদালত ও বাংলাদেশ সুপ্রিম কোর্ট (হাইকোর্ট বিভাগ)'],
        ['পরামর্শ নীতি', 'প্রথম পরামর্শ ফ্রি — কোনো অগ্রিম ফি নেই। কাগজপত্র পর্যালোচনা ও কাজের পরিধি নির্ধারণের পরেই কেবল ফি আলোচনা করা হয়।'],
      ],
      jurisdictionRows: [
        ['গুলশান-১ ও গুলশান-২ (আবাসিক ও বাণিজ্যিক)', 'গুলশান থানা — বাড়ি ৩২, ১১৫ গুলশান অ্যাভিনিউ, গুলশান-২', 'ডিএনসিসি ওয়ার্ড ১৯', 'বাড়ি ভাড়া নিয়ন্ত্রণ আইন ১৯৯১-এ উচ্ছেদ, কর্পোরেট লিগ্যাল রিটেইনার, প্রবাসী ফ্ল্যাট দলিল যাচাই'],
        ['নিকেতন ও মহাখালী', 'গুলশান থানা / বনানী থানা (প্রযোজ্য ক্ষেত্রে)', 'ডিএনসিসি ওয়ার্ড ২০', 'ফ্ল্যাট ক্রয়-বিক্রয় ও ই-নামজারি, ভাড়াটিয়া বিরোধ, ১৩৮ ধারা চেক মামলা, পারিবারিক আইন'],
        ['গুলশান কূটনৈতিক এলাকা ও দূতাবাস জোন', 'গুলশান থানা — বাড়ি ৩২, ১১৫ গুলশান অ্যাভিনিউ, গুলশান-২', 'ডিএনসিসি ওয়ার্ড ১৯', 'দূতাবাস ও পররাষ্ট্র মন্ত্রণালয় (MOFA) সত্যায়ন, প্রবাসী পাওয়ার অব অ্যাটর্নি, বিদেশি তালাক স্বীকৃতি'],
        ['পার্শ্ববর্তী বনানী ও বারিধারা', 'বনানী থানা (রোড ৭, বাড়ি ৩৭) / গুলশান থানা / ভাটারা থানা', 'ডিএনসিসি ওয়ার্ড ১৯ / ১৮', 'আরজেএসসি কোম্পানি রেজিস্ট্রেশন, বাণিজ্যিক লিজ চুক্তি, হাইকোর্ট রিট ও আগাম জামিন'],
      ],
      caseTimelineTable: {
        heading: 'গুলশান এলাকার সাধারণ মামলার ধরন, প্রযোজ্য আইন ও ধাপসমূহ',
        columns: ['মামলার ধরন', 'প্রযোজ্য আইন', 'সংশ্লিষ্ট আদালত / দপ্তর', 'প্রধান আইনি ধাপসমূহ'],
        rows: [
          ['বাণিজ্যিক বা আবাসিক ভাড়াটিয়া উচ্ছেদ', 'বাড়ি ভাড়া নিয়ন্ত্রণ আইন, ১৯৯১; সম্পত্তি হস্তান্তর আইন, ১৮৮২ (ধারা ১০৬)', 'ঢাকা সহকারী জজ আদালত', 'আইনসম্মত লিখিত নোটিশ, আরজি দাখিল, সমন ও জবাব, সাক্ষ্যগ্রহণ, ডিক্রি ও ডিক্রি জারি'],
          ['ফ্ল্যাট ক্রয়-বিক্রয় ও দলিল যাচাই', 'রেজিস্ট্রেশন আইন, ১৯০৮; সম্পত্তি হস্তান্তর আইন, ১৮৮২; রাষ্ট্রীয় অধিগ্রহণ ও প্রজাস্বত্ব আইন, ১৯৫০', 'সাব-রেজিস্ট্রি অফিস, রাজউক ও এসি (ল্যান্ড)', 'বায়া দলিলের ধারাবাহিকতা, খতিয়ান যাচাই, লিস পেন্ডেন্স তল্লাশি, রাজউক অনুমোদন, দলিল নিবন্ধন ও ই-নামজারি'],
          ['প্রবাসী পাওয়ার অব অ্যাটর্নি ও সত্যায়ন', 'পাওয়ার অব অ্যাটর্নি আইন, ২০১২ ও বিধিমালা ২০১৫', 'বিদেশে বাংলাদেশ দূতাবাস, পররাষ্ট্র মন্ত্রণালয় (MOFA) ও ডিসি অফিস', 'খসড়া প্রণয়ন, দূতাবাসে সত্যায়ন, ঢাকায় MOFA সত্যায়ন ও জেলা প্রশাসকের কার্যালয়ে স্ট্যাম্পিং'],
          ['১৩৮ ধারা চেক ডিজঅনার মামলা', 'নেগোশিয়েবল ইনস্ট্রুমেন্টস অ্যাক্ট, ১৮৮১ (ধারা ১৩৮)', 'ঢাকা সিএমএম ও দায়রা আদালত', 'ব্যাংক ডিজঅনার স্লিপ, ৩০ দিনের মধ্যে লিগ্যাল নোটিশ, পরিশোধের ৩০ দিন সময় ও মামলা দায়ের'],
          ['গুলশান থানায় ফৌজদারি ও আগাম জামিন', 'ফৌজদারি কার্যবিধি, ১৮৯৮ (ধারা ৪৯৭ ও ৪৯৮)', 'হাইকোর্ট বিভাগ ও ঢাকা সিএমএম আদালত', 'এজাহার/জিডি পর্যালোচনা, পিটিশন প্রস্তুতি, হাইকোর্টে আগাম জামিন বা সিএমএম আদালতে নিয়মিত জামিন'],
        ],
      },
      sections: [
        {
          heading: 'গুলশানে বাড়ি ভাড়া নিয়ন্ত্রণ আইন ১৯৯১ ও বাণিজ্যিক উচ্ছেদ মামলা',
          paragraphs: [
            'গুলশান-১, গুলশান-২ ও নিকেতনে আবাসিক ফ্ল্যাট ও বাণিজ্যিক অফিস স্পেস ভাড়া নিয়ে বাড়িওয়ালা ও ভাড়াটিয়ার মধ্যে বিরোধ অত্যন্ত সাধারণ। ভাড়া বকেয়া রাখা, চুক্তির মেয়াদ শেষ হওয়ার পরও দখল না ছাড়া, লিখিত অনুমতি ছাড়া সাবলেট দেওয়া বা জামানত (Security Deposit) ফেরত নিয়ে জটিলতা প্রায়ই আদালতে গড়ায়।',
            'বাড়ি ভাড়া নিয়ন্ত্রণ আইন, ১৯৯১ এবং সম্পত্তি হস্তান্তর আইন, ১৮৮২-এর ১০৬ ধারা অনুযায়ী উচ্ছেদ মোকদ্দমা দায়েরের আগে আইনসম্মত লিখিত নোটিশ প্রদান বাধ্যতামূলক। আদালতের আদেশ ছাড়া তালা লাগানো বা বিদ্যুৎ-গ্যাস-পানি সংযোগ বিচ্ছিন্ন করা বেআইনি এবং এতে গুলশান থানায় ফৌজদারি মামলার ঝুঁকি তৈরি হয়। আমরা আইনসম্মত ভাড়া চুক্তিপত্র প্রণয়ন, উচ্ছেদ নোটিশ এবং দেওয়ানি আদালতে মামলা পরিচালনা করি।',
          ],
        },
        {
          heading: 'গুলশানে দূতাবাস ও MOFA সত্যায়ন এবং প্রবাসী (NRB) ফ্ল্যাট ব্যবস্থাপনা',
          paragraphs: [
            'গুলশান কূটনৈতিক এলাকা হওয়ায় এবং এখানে যুক্তরাজ্য, যুক্তরাষ্ট্র, কানাডা, ইউরোপ ও মধ্যপ্রাচ্যে বসবাসরত প্রবাসী বাংলাদেশিদের উল্লেখযোগ্য সংখ্যক ফ্ল্যাট থাকায় দূতাবাস সত্যায়ন ও দূরবর্তী সম্পত্তি ব্যবস্থাপনা অত্যন্ত গুরুত্বপূর্ণ। বিদেশে থেকে গুলশানের ফ্ল্যাট ক্রয়-বিক্রয়, হেবা বা নামজারি করতে পাওয়ার অব অ্যাটর্নি আইন, ২০১২ অনুযায়ী সংশ্লিষ্ট বাংলাদেশ দূতাবাসে সম্পাদিত এবং ঢাকায় পররাষ্ট্র মন্ত্রণালয় (MOFA) কর্তৃক সত্যায়িত পাওয়ার অব অ্যাটর্নি প্রয়োজন হয়।',
            'আমাদের চেম্বার থেকে গুলশান ও নিকেতনের ফ্ল্যাট কেনার আগে বায়া দলিল, রাজউক হস্তান্তর অনুমোদন, খতিয়ান ও লিস পেন্ডেন্স যাচাই, ই-নামজারি এবং দেওয়ানি কার্যবিধির ১৩ ধারা অনুযায়ী বিদেশি তালাক স্বীকৃতিসহ প্রবাসীদের পারিবারিক ও উত্তরাধিকার সংক্রান্ত আইনি সহায়তা দেওয়া হয়।',
          ],
        },
        {
          heading: 'গুলশান ও নিকেতনে ফ্ল্যাট ও জমি কেনাবেচার ধাপে ধাপে আইনি যাচাই প্রক্রিয়া',
          paragraphs: [
            'গুলশান ও নিকেতনের উচ্চমূল্যের ফ্ল্যাট ও প্লট প্রায়ই একাধিক হস্তান্তর, ডেভেলপার শেয়ারিং চুক্তি বা উত্তরাধিকার বণ্টনের মধ্য দিয়ে আসে। রেজিস্ট্রেশন আইন, ১৯০৮ এবং সম্পত্তি হস্তান্তর আইন, ১৮৮২-এর ৫২ ধারা (লিস পেন্ডেন্স) বিবেচনায় নিয়ে বায়না করার আগেই বায়া দলিলের ধারাবাহিকতা, রাজউক লিজ ও হস্তান্তর অনুমোদন, সিএস-এসএ-আরএস ও মহানগর জরিপের খতিয়ান এবং কোনো ব্যাংক বন্ধক বা দেওয়ানি মামলা চলমান আছে কি না তা যাচাই করা আবশ্যক।',
            'আমাদের চেম্বার থেকে ক্রেতা ও বিক্রেতার জন্য লিখিত দলিল যাচাই প্রতিবেদন, সুরক্ষিত বায়না ও সাফ কবলা দলিল প্রণয়ন, সাব-রেজিস্ট্রি অফিসে নিবন্ধন সমন্বয় এবং এসি (ল্যান্ড) অফিসে ই-নামজারি ও খাজনা হালনাগাদের পূর্ণাঙ্গ আইনি সহায়তা দেওয়া হয়।',
          ],
        },
        {
          heading: 'কর্পোরেট পরামর্শ, ১৩৮ ধারা চেক মামলা ও গুলশান থানায় জরুরি জামিন',
          paragraphs: [
            'গুলশান অ্যাভিনিউ ও আশপাশের বাণিজ্যিক প্রতিষ্ঠানগুলোর জন্য কোম্পানি আইন, ১৯৯৪ অনুযায়ী আরজেএসসি (RJSC) কোম্পানি নিবন্ধন, শেয়ারহোল্ডার চুক্তি, ডিরেক্টর বিরোধ নিষ্পত্তি, বাংলাদেশ শ্রম আইন, ২০০৬ অনুযায়ী নিয়োগ চুক্তি এবং আয়কর-ভ্যাট পরামর্শ প্রদান করা হয়।',
            'এনআই অ্যাক্টের ১৩৮ ধারায় চেক ডিজঅনার মামলায় ৩০ দিনের লিগ্যাল নোটিশ পাঠানো, সিএমএম আদালতে মামলা দায়ের ও পরিচালনা এবং গুলশান থানায় কোনো এফআইআর বা গ্রেফতারের আশঙ্কা থাকলে হাইকোর্ট বিভাগে ফৌজদারি কার্যবিধির ৪৯৮ ধারায় আগাম জামিন ও নিম্ন আদালতে জামিন শুনানিতে দ্রুত আইনি পদক্ষেপ নেওয়া হয়।',
          ],
        },
        {
          heading: 'স্বচ্ছ ফি কাঠামো ও কাজের পরিধি নির্ধারণ (অগ্রিম ফি ছাড়া প্রথম পরামর্শ)',
          paragraphs: [
            'গুলশান এলাকার প্রতিটি আইনি বিষয়ের জটিলতা ভিন্ন—একটি উচ্ছেদ নোটিশ, পূর্ণাঙ্গ ফ্ল্যাট দলিল যাচাই, দেওয়ানি মোকদ্দমা কিংবা হাইকোর্টের জামিন পিটিশনের শ্রম ও ধাপ এক নয়। তাই কাগজপত্র দেখার আগে অনুমানভিত্তিক ফি বলা হয় না।',
            'প্রথম পরামর্শে আপনার ভাড়া চুক্তি, খতিয়ান, এজাহার বা কর্পোরেট নথিপত্র পর্যালোচনা করে সরকারি কোর্ট-ফি/স্ট্যাম্প খরচ এবং আইনজীবীর পেশাগত ফি আলাদাভাবে বুঝিয়ে ও লিখিত সম্মতির পরই আনুষ্ঠানিক কাজ শুরু করা হয়।',
          ],
        },
        {
          heading: 'গুলশান বা বিদেশ থেকে ফ্রি প্রথম পরামর্শ নেওয়ার নিয়ম',
          paragraphs: [
            'হোয়াটসঅ্যাপ (+৮৮০ ১৯৫৫-৮০২০০৭) অথবা সরাসরি ফোনে (+৮৮০ ১৭১২-৬৫৫৫৪৬) আপনার গুলশান, নিকেতন বা মহাখালীর আইনি বিষয়টি সংক্ষেপে জানাতে পারেন। সরাসরি সাক্ষাতের জন্য আমাদের উত্তরা সেক্টর ১২ চেম্বার সপ্তাহে ৭ দিন খোলা (রবিবার – বৃহস্পতিবার: সকাল ৮:০০ – রাত ১০:০০; শুক্র – শনিবার (উত্তরা চেম্বার): সকাল ১০:০০ – রাত ১০:০০) এবং আদালত চলাকালীন কোতোয়ালি জজ কোর্টের আইনজীবী সমিতি ভবনে সাক্ষাৎ করা যায়।',
          ],
        },
      ],
      faqs: [
        {
          q: '১. গুলশান-১, গুলশান-২ ও নিকেতন কোন থানা ও ডিএনসিসি ওয়ার্ডের অধীনে?',
          a: 'গুলশান-১ ও গুলশান-২ গুলশান থানা (বাড়ি ৩২, ১১৫ গুলশান অ্যাভিনিউ, গুলশান-২) এবং ডিএনসিসি ওয়ার্ড ১৯-এর অধীনে; মহাখালী ও নিকেতন ডিএনসিসি ওয়ার্ড ২০-এর অন্তর্ভুক্ত।',
        },
        {
          q: '২. গুলশানে ভাড়াটিয়া ফ্ল্যাট বা অফিস না ছাড়লে আইনগতভাবে কীভাবে উচ্ছেদ করা যায়?',
          a: 'সম্পত্তি হস্তান্তর আইনের ১০৬ ধারায় লিখিত নোটিশ দিয়ে বাড়ি ভাড়া নিয়ন্ত্রণ আইন ১৯৯১ অনুযায়ী সহকারী জজ আদালতে উচ্ছেদ মোকদ্দমা দায়ের করতে হয়। গায়ের জোরে সংযোগ কাটা বা তালা দেওয়া বেআইনি।',
        },
        {
          q: '৩. প্রবাসী বাংলাদেশিরা কি দেশে না এসে গুলশানের ফ্ল্যাট বিক্রি বা নামজারি করতে পারবেন?',
          a: 'হ্যাঁ। পাওয়ার অব অ্যাটর্নি আইন, ২০১২ অনুযায়ী সংশ্লিষ্ট বাংলাদেশ দূতাবাস ও ঢাকায় MOFA সত্যায়িত পাওয়ার অব অ্যাটর্নির মাধ্যমে দলিল যাচাই, নামজারি ও হস্তান্তর প্রক্রিয়া সম্পন্ন করা সম্ভব।',
        },
        {
          q: '৪. গুলশান বা নিকেতনে ফ্ল্যাট কেনার আগে কী কী কাগজপত্র যাচাই করা জরুরি?',
          a: 'বায়া দলিলের ধারাবাহিকতা, রাজউক হস্তান্তর অনুমোদন ও নকশা, সিএস-এসএ-আরএস ও মহানগর খতিয়ান, হালনাগাদ ই-নামজারি, ইউটিলিটি বকেয়া এবং সাব-রেজিস্ট্রি অফিসে কোনো বন্ধক বা লিস পেন্ডেন্স মামলা আছে কি না তা যাচাই করা আবশ্যক।',
        },
        {
          q: '৫. গুলশান থানায় এফআইআর হলে কত দ্রুত জামিনের পদক্ষেপ নেওয়া যায়?',
          a: 'এজাহার বা জিডির কপি পাওয়ার সাথে সাথেই আমরা যাচাই করে হাইকোর্টে ৪৯৮ ধারায় আগাম জামিন অথবা ঢাকা সিএমএম আদালতে নিয়মিত জামিনের জন্য দ্রুত পিটিশন প্রস্তুত করি।',
        },
        {
          q: '৬. গুলশানের ক্লায়েন্টদের জন্য কি প্রথম পরামর্শ ফ্রি?',
          a: 'হ্যাঁ। হোয়াটসঅ্যাপ, ফোন অথবা আমাদের উত্তরা সেক্টর ১২ ও জজ কোর্ট চেম্বারে প্রথম পরামর্শ সম্পূর্ণ ফ্রি — কোনো অগ্রিম ফি লাগে না।',
        },
      ],
    },
  },

  banani: {
    key: 'banani',
    slug: 'banani-lawyer',
    enPath: '/banani-lawyer',
    bnPath: '/bn/banani-lawyer',
    gaArea: 'banani',
    gaService: 'banani_chamber',
    areaServed: [
      { '@type': 'Place', name: 'Banani, Dhaka' },
      { '@type': 'Place', name: 'Banani DOHS, Dhaka' },
      { '@type': 'Place', name: 'Kemal Ataturk Avenue, Banani, Dhaka' },
      { '@type': 'Place', name: 'DNCC Ward 19, Dhaka' },
      { '@type': 'City', name: 'Dhaka' },
      { '@type': 'Country', name: 'Bangladesh' },
    ],
    en: {
      title: 'Banani Lawyer in Dhaka — Corporate, Lease, Cheque & Bail',
      h1: 'Banani Lawyer in Dhaka — Corporate & RJSC, Commercial Lease, Section 138 Cheque & Family Law',
      description:
        'Supreme Court advocate serving Banani & Banani DOHS (DNCC Ward 19, Banani PS) for corporate/RJSC filings, commercial leases, Rent Control eviction, Section 138 cheque & bail. First consultation free.',
      serviceType: 'Banani Legal Services — Corporate, RJSC, Commercial Lease, Cheque Recovery & Bail',
      badge: 'Serving Banani, Kemal Ataturk Avenue & Banani DOHS (DNCC Ward 19)',
      intro:
        'Advocate Md. Shah Alam is a Bangladesh Bar Council enrolled advocate practising before the Supreme Court of Bangladesh and Dhaka Judge Court. Serving businesses, startups, property owners, and families in Banani and Banani DOHS (DNCC Ward 19), our Uttara Sector 12 chamber and Kotwali Judge Court chamber provide focused legal representation in RJSC company incorporation and corporate compliance, commercial lease and Rent Control Act 1991 disputes, Section 138 cheque dishonour recovery, tax advisory, property title vetting, family law, and Banani Police Station criminal/bail matters. The first consultation is free with no advance fee.',
      waMessage:
        'Hello, I would like a free first legal consultation regarding a legal matter in Banani (Dhaka).',
      quickTable: [
        ['Primary Police Station (DMP Verified)', 'Banani PS — R-7, H-37, Banani, Dhaka'],
        ['Verified DNCC Ward', 'DNCC Ward 19 (Banani, Gulshan 1–2, Korail)'],
        ['Chamber Locations', 'Uttara Chamber: House 46, Road 6/B, Sector 12, Uttara West, Dhaka 1230 · Judge Court Chamber: Ainjeebi Samity Bhaban, 4th Floor, 6/7 Court House Street, Kotwali, Dhaka-1100'],
        ['Office Hours', OFFICE_HOURS.en],
        ['Courts Covered', 'Dhaka CMM Court, Dhaka Judge & Sessions Court (Kotwali), Dhaka Civil / Assistant Judge Courts, Company Bench & High Court Division (Supreme Court of Bangladesh)'],
        ['Consultation Policy', 'First consultation is free — no advance fee. Legal fees are agreed only after reviewing your documents and scope.'],
      ],
      jurisdictionRows: [
        ['Banani Commercial Hub (Kemal Ataturk Ave, Road 11)', 'Banani PS — R-7, H-37, Banani', 'DNCC Ward 19', 'RJSC company registration, shareholder & commercial contracts, Section 138 cheque cases, commercial lease eviction'],
        ['Banani Residential Blocks (A–L)', 'Banani PS — R-7, H-37, Banani', 'DNCC Ward 19', 'Apartment title vetting, Rent Control Act 1991 notices, inheritance & family court representation'],
        ['Banani DOHS & Cantonment Border', 'Banani PS / Cantonment PS (as applicable)', 'DOHS / DNCC Ward 19', 'NRB Power of Attorney, flat transfer due diligence, civil injunction & succession certificate'],
        ['Adjacent Gulshan & Mohakhali', 'Gulshan PS (H-32, 115 Gulshan Ave) / Banani PS', 'DNCC Ward 19 & 20', 'Tax & VAT advisory, embassy/MOFA attestation, High Court writ & anticipatory bail'],
      ],
      caseTimelineTable: {
        heading: 'Common Banani Legal Matters, Governing Statutes & Procedural Stages',
        columns: ['Matter Type', 'Governing Law / Statute', 'Forum / Office', 'Key Procedural Stages'],
        rows: [
          ['Company Incorporation & Shareholder Disputes', 'Companies Act 1994 (including Section 233 minority protection)', 'RJSC Dhaka & High Court Company Bench', 'Name clearance, MoA/AoA drafting, RJSC incorporation/Schedule X & Form XII filings, or Company Bench petition'],
          ['Commercial Lease & Showroom Eviction', 'Premises Rent Control Act 1991; Section 106 Transfer of Property Act 1882', 'Dhaka Assistant Judge Court', 'Lease audit, statutory written eviction notice, civil suit filing, evidence & decree execution'],
          ['B2B & Rent Cheque Dishonour', 'Section 138 Negotiable Instruments Act 1881', 'Dhaka CMM Court & Sessions Court', 'Bank dishonour memo, written legal notice within 30 days, 30-day statutory wait, CMM Court complaint'],
          ['Apartment Purchase & DOHS Transfer Vetting', 'Registration Act 1908; Transfer of Property Act 1882', 'Sub-Registrar Office, RAJUK / DOHS Parishad & AC Land', 'Baya Dalil chain review, Khatian & mutation check, Lis Pendens search, transfer approval & deed registration'],
          ['Banani PS FIR, GD & Bail', 'Sections 497 & 498 Code of Criminal Procedure 1898', 'High Court Division & Dhaka CMM Court', 'Certified FIR review, High Court anticipatory bail petition or regular bail hearing'],
        ],
      },
      sections: [
        {
          heading: 'Corporate Law, RJSC Filings & Commercial Contracts in Banani',
          paragraphs: [
            'Banani — especially along Kemal Ataturk Avenue and Road 11 — is one of Dhaka’s busiest hubs for technology firms, agencies, trading houses, and hospitality businesses. Legal disputes often stem from undocumented founder equity splits, defective vendor contracts, delayed RJSC annual filings (Schedule X, Form XII), or share-transfer disagreements.',
            'Under the Companies Act 1994, we assist Banani companies with private limited company incorporation at RJSC, drafting Memorandum & Articles of Association, founder and shareholder agreements, commercial service contracts, employment policies under the Bangladesh Labour Act 2006, and Company Bench litigation (including Section 233 petitions) before the High Court Division where minority shareholder oppression or director removal arises.',
          ],
        },
        {
          heading: 'Commercial Lease Disputes, Rent Eviction & Section 138 Cheque Recovery',
          paragraphs: [
            'Showroom, restaurant, and office leases in Banani involve substantial advance deposits and fit-out investments. When rent arrears accumulate or lease renewal terms break down, both landlords and tenants need strict compliance with the Premises Rent Control Act 1991 and Section 106 of the Transfer of Property Act 1882 to protect their rights without triggering criminal counter-allegations.',
            'Where post-dated rent or B2B trade cheques bounce, Section 138 of the Negotiable Instruments Act 1881 requires a formal legal notice within 30 days of dishonour and a complaint before the Dhaka CMM Court within the statutory window. We manage both prosecution and defence of cheque dishonour cases as well as civil money recovery suits under Order 37 of the Code of Civil Procedure 1908.',
          ],
        },
        {
          heading: 'Step-by-Step Flat & Property Transaction Vetting in Banani and Banani DOHS',
          paragraphs: [
            'Residential blocks (A–L) in Banani and properties in Banani DOHS require meticulous document inspection before signing any Bayna or paying earnest money. Under the Registration Act 1908 and the Transfer of Property Act 1882, buyers must verify the full chain of registered deeds (Baya Dalil), CS/SA/RS and Mahanagar Jarip Khatian records, updated e-Namjari mutation, RAJUK or DOHS transfer clearance, and sub-registry Lis Pendens records.',
            'For Non-Resident Bangladeshi (NRB) families selling or managing Banani apartments from abroad, we prepare compliant Powers of Attorney under the Power of Attorney Act 2012, coordinate embassy and MOFA attestation steps, and oversee safe registration and mutation in Dhaka.',
          ],
        },
        {
          heading: 'Banani PS Criminal/Bail Support, Tax Advisory & Family Law',
          paragraphs: [
            'For urgent FIRs, General Diaries (GDs), or commercial complaints lodged at Banani Police Station (Road 7, House 37), immediate legal advice is essential to prepare High Court anticipatory bail applications under Section 498 CrPC or regular bail petitions in the CMM Court.',
            'We also advise Banani businesses and professionals on Income Tax Act 2023 and VAT compliance notices, and represent Banani residents confidentially in Muslim and Special Marriage Act divorce, maintenance, child custody, and succession matters.',
          ],
        },
        {
          heading: 'Transparent Fee Policy & Written Scope Before Paid Work',
          paragraphs: [
            'Every corporate, commercial lease, or litigation brief in Banani has a distinct document load and court timeline. We start with a free first consultation so you can review your options without any advance fee.',
            'After examining your contracts, cheques, RJSC records, or property deeds, we outline the exact statutory steps, separate government filing/stamp fees from professional legal fees, and confirm the scope in writing before proceeding.',
          ],
        },
        {
          heading: 'How to Start Your Free First Consultation from Banani',
          paragraphs: [
            'Reach us directly on WhatsApp (+880 1955-802007) or phone (+880 1712-655546) to share your Banani or Banani DOHS legal question. You may also schedule an in-person visit at our nearby Uttara Sector 12 chamber (Sunday – Thursday: 8:00 AM – 10:00 PM; Friday – Saturday (Uttara Chamber): 10:00 AM – 10:00 PM) or at our Kotwali Judge Court chamber.',
          ],
        },
      ],
      faqs: [
        {
          q: '1. Which police station and DNCC ward cover Banani?',
          a: 'Banani falls under Banani Police Station (Road 7, House 37, Banani) and DNCC Ward 19.',
        },
        {
          q: '2. What is the deadline to send a legal notice for a dishonoured commercial cheque in Bangladesh?',
          a: 'Under Section 138 of the Negotiable Instruments Act 1881, the payee must issue a written legal notice within 30 days of receiving the bank dishonour slip, giving the drawer 30 days to pay before filing a CMM Court complaint.',
        },
        {
          q: '3. Can you assist Banani businesses with RJSC filings and commercial lease drafting?',
          a: 'Yes. Under the Companies Act 1994 and Premises Rent Control Act 1991, we handle RJSC company formation, share transfers, shareholder agreements, commercial lease drafting, and eviction notices.',
        },
        {
          q: '4. What should be checked before buying an apartment in Banani or Banani DOHS?',
          a: 'Inspect the complete chain of registered deeds (Baya Dalil), CS/SA/RS/City Jarip Khatian, updated e-Namjari mutation, RAJUK or DOHS transfer permission, and a sub-registry search for any mortgage or pending civil suit (Lis Pendens).',
        },
        {
          q: '5. Can urgent bail be filed if a commercial dispute turns into a criminal FIR at Banani PS?',
          a: 'Yes. Commercial disputes are sometimes framed as criminal breach of trust or cheating complaints. We review the FIR immediately and move for High Court anticipatory bail under Section 498 CrPC or CMM Court regular bail.',
        },
        {
          q: '6. How does the free first consultation work for Banani clients?',
          a: 'You can reach us on WhatsApp (+880 1955-802007), call +880 1712-655546, or book a visit to our nearby Uttara Sector 12 chamber or Kotwali Judge Court chamber. There is no advance fee for the initial discussion.',
        },
      ],
    },
    bn: {
      title: 'বনানী আইনজীবী ঢাকা — কর্পোরেট, ভাড়া, চেক ও জামিন',
      h1: 'বনানী আইনজীবী ঢাকা — কর্পোরেট ও আরজেএসসি, বাণিজ্যিক চুক্তি, ১৩৮ ধারা চেক ও পারিবারিক আইন',
      description:
        'বনানী ও বনানী ডিওএইচএস (ডিএনসিসি ওয়ার্ড ১৯, বনানী থানা) এলাকার কোম্পানি/RJSC, বাণিজ্যিক ভাড়া ও উচ্ছেদ, ১৩৮ ধারা চেক মামলা, জমি ও জামিন মামলার আইনি সহায়তা। প্রথম পরামর্শ ফ্রি।',
      serviceType: 'বনানী আইনি সেবা — কর্পোরেট, আরজেএসসি, বাণিজ্যিক ভাড়া, চেক ও জামিন',
      badge: 'বনানী, কামাল আতাতুর্ক অ্যাভিনিউ ও বনানী ডিওএইচএস (ডিএনসিসি ওয়ার্ড ১৯)',
      intro:
        'অ্যাডভোকেট মো. শাহ আলম বাংলাদেশের সুপ্রিম কোর্ট ও ঢাকা জজ কোর্টের একজন তালিকাভুক্ত আইনজীবী। বনানী ও বনানী ডিওএইচএস (ডিএনসিসি ওয়ার্ড ১৯)-এর ব্যবসায়ী, কর্পোরেট প্রতিষ্ঠান, ফ্ল্যাট মালিক ও পরিবারগুলোর জন্য আমাদের উত্তরা সেক্টর ১২ ও কোতোয়ালি জজ কোর্ট চেম্বার থেকে আরজেএসসি (RJSC) কোম্পানি রেজিস্ট্রেশন ও কর্পোরেট কমপ্লায়েন্স, বাণিজ্যিক ভাড়া ও উচ্ছেদ, ১৩৮ ধারা চেক ডিজঅনার মামলা, আয়কর পরামর্শ, ফ্ল্যাট দলিল যাচাই, পারিবারিক ও বনানী থানার ফৌজদারি জামিন সহায়তা দেওয়া হয়। প্রথম পরামর্শ সম্পূর্ণ ফ্রি।',
      waMessage:
        'আসসালামু আলাইকুম, বনানী এলাকার একটি আইনি বিষয়ে ফ্রি প্রথম পরামর্শের জন্য যোগাযোগ করছি।',
      quickTable: [
        ['প্রধান থানা (DMP যাচাইকৃত)', 'বনানী থানা — রোড ৭, বাড়ি ৩৭, বনানী, ঢাকা'],
        ['যাচাইকৃত ডিএনসিসি ওয়ার্ড', 'ডিএনসিসি ওয়ার্ড ১৯ (বনানী, গুলশান ১–২, কড়াইল)'],
        ['চেম্বার ঠিকানা', 'উত্তরা চেম্বার: বাড়ি ৪৬, রোড ৬/বি, সেক্টর ১২, উত্তরা পশ্চিম, ঢাকা ১২৩০ · জজ কোর্ট চেম্বার: আইনজীবী সমিতি ভবন, ৪র্থ তলা, ৬/৭ কোর্ট হাউস স্ট্রিট, কোতোয়ালি, ঢাকা-১১০০'],
        ['অফিস সময়', OFFICE_HOURS.bn],
        ['সংশ্লিষ্ট আদালত', 'ঢাকা সিএমএম আদালত, ঢাকা জেলা ও দায়রা জজ আদালত (কোতোয়ালি), সহকারী জজ আদালত, হাইকোর্টের কোম্পানি বেঞ্চ ও বাংলাদেশ সুপ্রিম কোর্ট'],
        ['পরামর্শ নীতি', 'প্রথম পরামর্শ ফ্রি — কোনো অগ্রিম ফি নেই। কাগজপত্র দেখে কাজের পরিধি নির্ধারণের পরেই কেবল ফি আলোচনা করা হয়।'],
      ],
      jurisdictionRows: [
        ['বনানী বাণিজ্যিক এলাকা (কামাল আতাতুর্ক অ্যাভিনিউ, রোড ১১)', 'বনানী থানা — রোড ৭, বাড়ি ৩৭, বনানী', 'ডিএনসিসি ওয়ার্ড ১৯', 'আরজেএসসি কোম্পানি রেজিস্ট্রেশন, শেয়ারহোল্ডার ও বাণিজ্যিক চুক্তি, ১৩৮ ধারা চেক মামলা, বাণিজ্যিক উচ্ছেদ'],
        ['বনানী আবাসিক ব্লক (এ–এল)', 'বনানী থানা — রোড ৭, বাড়ি ৩৭, বনানী', 'ডিএনসিসি ওয়ার্ড ১৯', 'ফ্ল্যাট দলিল যাচাই, বাড়ি ভাড়া নিয়ন্ত্রণ আইন ১৯৯১-এ নোটিশ, উত্তরাধিকার ও পারিবারিক মামলা'],
        ['বনানী ডিওএইচএস ও সংলগ্ন এলাকা', 'বনানী থানা / ক্যান্টনমেন্ট থানা (প্রযোজ্য ক্ষেত্রে)', 'ডিওএইচএস / ডিএনসিসি ওয়ার্ড ১৯', 'প্রবাসী পাওয়ার অব অ্যাটর্নি, ফ্ল্যাট হস্তান্তর যাচাই, দেওয়ানি নিষেধাজ্ঞা ও উত্তরাধিকার সনদ'],
        ['পার্শ্ববর্তী গুলশান ও মহাখালী', 'গুলশান থানা (বাড়ি ৩২, ১১৫ গুলশান অ্যাভিনিউ) / বনানী থানা', 'ডিএনসিসি ওয়ার্ড ১৯ ও ২০', 'আয়কর ও ভ্যাট পরামর্শ, দূতাবাস/MOFA সত্যায়ন, হাইকোর্ট রিট ও আগাম জামিন'],
      ],
      caseTimelineTable: {
        heading: 'বনানী এলাকার সাধারণ মামলার ধরন, প্রযোজ্য আইন ও ধাপসমূহ',
        columns: ['মামলার ধরন', 'প্রযোজ্য আইন', 'সংশ্লিষ্ট আদালত / দপ্তর', 'প্রধান আইনি ধাপসমূহ'],
        rows: [
          ['কোম্পানি নিবন্ধন ও শেয়ারহোল্ডার বিরোধ', 'কোম্পানি আইন, ১৯৯৪ (ধারা ২৩৩ সংখ্যালঘু শেয়ারহোল্ডার সুরক্ষাসহ)', 'আরজেএসসি ঢাকা ও হাইকোর্ট কোম্পানি বেঞ্চ', 'নাম ছাড়পত্র, মেমোরেন্ডাম ও আর্টিকেলস, আরজেএসসি রিটার্ন (Schedule X / Form XII) বা কোম্পানি বেঞ্চ পিটিশন'],
          ['বাণিজ্যিক ভাড়া ও শোরুম উচ্ছেদ', 'বাড়ি ভাড়া নিয়ন্ত্রণ আইন, ১৯৯১; সম্পত্তি হস্তান্তর আইন, ১৮৮২ (ধারা ১০৬)', 'ঢাকা সহকারী জজ আদালত', 'চুক্তি পর্যালোচনা, আইনসম্মত লিখিত নোটিশ, উচ্ছেদ মোকদ্দমা দায়ের, সাক্ষ্য ও ডিক্রি জারি'],
          ['ব্যবসায়িক ও ভাড়ার চেক ডিজঅনার', 'নেগোশিয়েবল ইনস্ট্রুমেন্টস অ্যাক্ট, ১৮৮১ (ধারা ১৩৮)', 'ঢাকা সিএমএম ও দায়রা আদালত', 'ব্যাংক ডিজঅনার স্লিপ, ৩০ দিনের মধ্যে লিগ্যাল নোটিশ, ৩০ দিন অপেক্ষা ও সিএমএম আদালতে মামলা'],
          ['ফ্ল্যাট ক্রয় ও ডিওএইচএস হস্তান্তর যাচাই', 'রেজিস্ট্রেশন আইন, ১৯০৮; সম্পত্তি হস্তান্তর আইন, ১৮৮২', 'সাব-রেজিস্ট্রি অফিস, রাজউক / ডিওএইচএস পরিষদ ও এসি (ল্যান্ড)', 'বায়া দলিল যাচাই, খতিয়ান ও ই-নামজারি তল্লাশি, লিস পেন্ডেন্স যাচাই, হস্তান্তর অনুমোদন ও নিবন্ধন'],
          ['বনানী থানায় এফআইআর, জিডি ও জামিন', 'ফৌজদারি কার্যবিধি, ১৮৯৮ (ধারা ৪৯৭ ও ৪৯৮)', 'হাইকোর্ট বিভাগ ও ঢাকা সিএমএম আদালত', 'এজাহার পর্যালোচনা, হাইকোর্টে আগাম জামিন আবেদন বা সিএমএম আদালতে নিয়মিত জামিন শুনানি'],
        ],
      },
      sections: [
        {
          heading: 'বনানীতে কর্পোরেট আইন, আরজেএসসি (RJSC) ও বাণিজ্যিক চুক্তিপত্র',
          paragraphs: [
            'বনানীর কামাল আতাতুর্ক অ্যাভিনিউ ও রোড ১১ জুড়ে আইটি প্রতিষ্ঠান, এজেন্সি, ট্রেডিং কোম্পানি ও কর্পোরেট অফিসের ঘনত্ব অনেক বেশি। লিখিত শেয়ারহোল্ডার চুক্তির অভাব, ত্রুটিপূর্ণ ভেন্ডর চুক্তি, আরজেএসসি বার্ষিক রিটার্ন (Schedule X, Form XII) বকেয়া বা শেয়ার হস্তান্তর নিয়ে ব্যবসায়িক বিরোধ প্রায়ই দেখা যায়।',
            'কোম্পানি আইন, ১৯৯৪ এবং বাংলাদেশ শ্রম আইন, ২০০৬ অনুযায়ী আমরা প্রাইভেট লিমিটেড কোম্পানি নিবন্ধন, মেমোরেন্ডাম ও আর্টিকেলস প্রণয়ন, শেয়ারহোল্ডার ও বাণিজ্যিক চুক্তি, নিয়োগ নীতিমালা এবং প্রয়োজনে হাইকোর্টের কোম্পানি বেঞ্চে ২৩৩ ধারায় শেয়ারহোল্ডার বিরোধের মামলা পরিচালনা করি।',
          ],
        },
        {
          heading: 'বাণিজ্যিক ভাড়া বিরোধ, উচ্ছেদ ও এনআই অ্যাক্ট ১৩৮ ধারা চেক মামলা',
          paragraphs: [
            'বনানীতে শোরুম, রেস্টুরেন্ট ও অফিস ভাড়ায় বড় অঙ্কের অগ্রিম জামানত জড়িত থাকে। ভাড়া বকেয়া বা চুক্তির মেয়াদ শেষে বিরোধ হলে বাড়ি ভাড়া নিয়ন্ত্রণ আইন, ১৯৯১ ও সম্পত্তি হস্তান্তর আইন, ১৮৮২-এর ১০৬ ধারা মেনে লিখিত নোটিশ ও দেওয়ানি পদক্ষেপ নিতে হয়।',
            'ভাড়া বা ব্যবসায়িক পাওনার চেক ডিজঅনার হলে এনআই অ্যাক্টের ১৩৮ ধারা অনুযায়ী ব্যাংক ডিজঅনার স্লিপ পাওয়ার ৩০ দিনের মধ্যে লিখিত লিগ্যাল নোটিশ পাঠানো বাধ্যতামূলক। আমরা চেক মামলার নোটিশ, সিএমএম আদালতে মামলা দায়ের, আসামি পক্ষের আইনি প্রতিরক্ষা এবং দেওয়ানি কার্যবিধির ৩৭ আদেশে অর্থ আদায়ের মামলা পরিচালনা করি।',
          ],
        },
        {
          heading: 'বনানী ও বনানী ডিওএইচএস-এ ফ্ল্যাট কেনাবেচার ধাপে ধাপে দলিল যাচাই',
          paragraphs: [
            'বনানীর আবাসিক ব্লক (এ–এল) এবং বনানী ডিওএইচএস-এ ফ্ল্যাট বা প্লট কেনার আগে বায়না চুক্তি সই করার পূর্বেই নিখুঁত আইনি যাচাই জরুরি। রেজিস্ট্রেশন আইন, ১৯০৮ ও সম্পত্তি হস্তান্তর আইন, ১৮৮২ অনুযায়ী বায়া দলিলের ধারাবাহিকতা, সিএস-এসএ-আরএস ও মহানগর জরিপের খতিয়ান, হালনাগাদ ই-নামজারি, রাজউক বা ডিওএইচএস হস্তান্তর অনুমোদন এবং সাব-রেজিস্ট্রি অফিসে লিস পেন্ডেন্স যাচাই করা আবশ্যক।',
            'বিদেশে থাকা প্রবাসী বাংলাদেশিদের (NRB) বনানীর ফ্ল্যাট বিক্রি বা ব্যবস্থাপনার জন্য আমরা পাওয়ার অব অ্যাটর্নি আইন, ২০১২ অনুযায়ী দূতাবাস ও MOFA সত্যায়ন প্রক্রিয়া এবং ঢাকায় নিরাপদ দলিল নিবন্ধনে পূর্ণাঙ্গ সহায়তা দিই।',
          ],
        },
        {
          heading: 'বনানী থানায় ফৌজদারি জামিন, আয়কর পরামর্শ ও পারিবারিক আইন',
          paragraphs: [
            'বনানী থানায় (রোড ৭, বাড়ি ৩৭) কোনো এফআইআর, জিডি বা বাণিজ্যিক অভিযোগ দায়ের হলে দ্রুত হাইকোর্ট বিভাগে ফৌজদারি কার্যবিধির ৪৯৮ ধারায় আগাম জামিন কিংবা সিএমএম আদালতে নিয়মিত জামিনের আবেদন প্রস্তুত করা জরুরি।',
            'পাশাপাশি আয়কর আইন, ২০২৩ ও ভ্যাট নোটিশ জবাব এবং বনানীর বাসিন্দাদের তালাক, দেনমোহর, খোরপোশ, সন্তান হেফাজত ও উত্তরাধিকার সনদ সংক্রান্ত পারিবারিক আদালতে গোপনীয়তার সাথে আইনি প্রতিনিধিত্ব প্রদান করা হয়।',
          ],
        },
        {
          heading: 'স্বচ্ছ ফি প্রক্রিয়া ও লিখিত কাজের পরিধি',
          paragraphs: [
            'বনানীর কর্পোরেট, বাণিজ্যিক ভাড়া বা মামলা-মোকদ্দমার প্রতিটি বিষয়ের কাগজপত্র ও আদালতের ধাপ ভিন্ন। তাই প্রথম আলোচনায় কোনো অগ্রিম ফি নেওয়া হয় না।',
            'আপনার চুক্তিপত্র, চেক, আরজেএসসি নথি বা জমির দলিল পর্যালোচনা করার পর সরকারি ফি/স্ট্যাম্প খরচ এবং আইনজীবীর পেশাগত ফি স্পষ্টভাবে আলাদা করে জানিয়ে ও পারস্পরিক সম্মতির পরই আনুষ্ঠানিক কাজ শুরু করা হয়।',
          ],
        },
        {
          heading: 'বনানী থেকে ফ্রি প্রথম পরামর্শ কীভাবে পাবেন',
          paragraphs: [
            'হোয়াটসঅ্যাপ (+৮৮০ ১৯৫৫-৮০২০০৭) বা ফোনে (+৮৮০ ১৭১২-৬৫৫৫৪৬) আপনার বনানী বা বনানী ডিওএইচএস-এর আইনি বিষয়টি জানাতে পারেন। সরাসরি সাক্ষাতের জন্য আমাদের উত্তরা সেক্টর ১২ চেম্বার সপ্তাহে ৭ দিন খোলা (রবিবার – বৃহস্পতিবার: সকাল ৮:০০ – রাত ১০:০০; শুক্র – শনিবার (উত্তরা চেম্বার): সকাল ১০:০০ – রাত ১০:০০) এবং জজ কোর্ট চেম্বারেও সাক্ষাৎ করা যায়।',
          ],
        },
      ],
      faqs: [
        {
          q: '১. বনানী কোন থানা ও ডিএনসিসি ওয়ার্ডের অধীনে?',
          a: 'বনানী এলাকা বনানী থানা (রোড ৭, বাড়ি ৩৭, বনানী) এবং ডিএনসিসি ওয়ার্ড ১৯-এর অধীনে।',
        },
        {
          q: '২. চেক ডিজঅনার হলে কত দিনের মধ্যে লিগ্যাল নোটিশ পাঠাতে হয়?',
          a: 'এনআই অ্যাক্টের ১৩৮ ধারা অনুযায়ী ব্যাংক থেকে চেক ডিজঅনারের তথ্য পাওয়ার ৩০ দিনের মধ্যে লিখিত লিগ্যাল নোটিশ পাঠাতে হয় এবং প্রাপককে পরিশোধের জন্য ৩০ দিন সময় দিতে হয়।',
        },
        {
          q: '৩. বনানীর ব্যবসা প্রতিষ্ঠানের জন্য কি আরজেএসসি ও বাণিজ্যিক ভাড়া চুক্তি সেবা পাওয়া যায়?',
          a: 'হ্যাঁ। কোম্পানি আইন, ১৯৯৪ ও বাড়ি ভাড়া নিয়ন্ত্রণ আইন, ১৯৯১ অনুযায়ী আরজেএসসি কোম্পানি রেজিস্ট্রেশন, শেয়ার হস্তান্তর, বাণিজ্যিক লিজ চুক্তি এবং উচ্ছেদ নোটিশ ও মামলা আমরা নিয়মিত পরিচালনা করি।',
        },
        {
          q: '৪. বনানী বা বনানী ডিওএইচএস-এ ফ্ল্যাট কেনার আগে কী কী যাচাই করতে হয়?',
          a: 'বায়া দলিলের ধারাবাহিকতা, সিএস-এসএ-আরএস ও মহানগর খতিয়ান, হালনাগাদ ই-নামজারি, রাজউক বা ডিওএইচএস হস্তান্তর অনুমোদন এবং সাব-রেজিস্ট্রি অফিসে কোনো বন্ধক বা লিস পেন্ডেন্স মামলা আছে কি না তা যাচাই করা জরুরি।',
        },
        {
          q: '৫. ব্যবসায়িক বিরোধ থেকে বনানী থানায় ফৌজদারি মামলা হলে কি আগাম জামিন নেওয়া যায়?',
          a: 'হ্যাঁ। অনেক সময় দেওয়ানি বা ব্যবসায়িক বিরোধে বিশ্বাসভঙ্গ বা প্রতারণার ফৌজদারি মামলা হয়। এজাহার পর্যালোচনা করে আমরা হাইকোর্টে ৪৯৮ ধারায় আগাম জামিন বা সিএমএম আদালতে নিয়মিত জামিনের পদক্ষেপ নিই।',
        },
        {
          q: '৬. বনানীর ক্লায়েন্টদের প্রথম পরামর্শ কি ফ্রি?',
          a: 'হ্যাঁ। হোয়াটসঅ্যাপ (+৮৮০ ১৯৫৫-৮০২০০৭), ফোন (+৮৮০ ১৭১২-৬৫৫৫৪৬) অথবা উত্তরা সেক্টর ১২ ও জজ কোর্ট চেম্বারে প্রথম পরামর্শ সম্পূর্ণ ফ্রি।',
        },
      ],
    },
  },

  bashundhara: {
    key: 'bashundhara',
    slug: 'bashundhara-ra-lawyer',
    enPath: '/bashundhara-ra-lawyer',
    bnPath: '/bn/bashundhara-ra-lawyer',
    gaArea: 'bashundhara_ra',
    gaService: 'bashundhara_property',
    areaServed: [
      { '@type': 'Place', name: 'Bashundhara Residential Area, Dhaka' },
      { '@type': 'Place', name: 'Vatara, Dhaka' },
      { '@type': 'Place', name: 'Kuril & Khilkhet, Dhaka' },
      { '@type': 'Place', name: 'Baridhara J-Block, Dhaka' },
      { '@type': 'City', name: 'Dhaka' },
      { '@type': 'Country', name: 'Bangladesh' },
    ],
    en: {
      title: 'Bashundhara R/A Lawyer Dhaka — Land, Flat & Bail Law',
      h1: 'Bashundhara R/A Lawyer in Dhaka — Plot & Flat Title Verification, Housing Disputes & Bail',
      description:
        'Supreme Court advocate serving Bashundhara Residential Area (Vatara PS / Badda / Khilkhet PS) for plot & flat due diligence, RAJUK/housing transfer, apartment disputes, inheritance & bail. First consultation free.',
      serviceType: 'Bashundhara R/A Legal Services — Land Title Verification, Apartment Disputes, Inheritance & Bail',
      badge: 'Serving Bashundhara R/A Blocks A–N, Vatara, Kuril & Khilkhet',
      intro:
        'Advocate Md. Shah Alam is a Bangladesh Bar Council enrolled advocate practising before the Supreme Court of Bangladesh and Dhaka Judge Court. Located minutes away in Uttara Sector 12 alongside our Kotwali Judge Court chamber, we assist plot owners, apartment buyers, landlords, and Non-Resident Bangladeshis (NRBs) in Bashundhara Residential Area with pre-purchase title due diligence, RAJUK and housing-society transfer verification, apartment committee and developer disputes, inheritance and civil court litigation, Rent Control eviction, and urgent criminal/bail matters under Vatara, Badda, and Khilkhet Police Stations. The first consultation is free with no advance fee.',
      waMessage:
        'Hello, I would like a free first legal consultation regarding a property or legal matter in Bashundhara R/A (Dhaka).',
      quickTable: [
        ['Current Police Station Jurisdiction (DMP Verified)', 'Vatara PS — Progoti Soroni, Gulshan Notun Bazar (primary for most blocks), plus Badda PS and Khilkhet PS depending on block. Note: A dedicated Bashundhara PS was approved in principle by the cabinet on 7 May 2026 but is not yet formally established (awaiting ministry notification; not yet in the 49 active DMP police stations list).'],
        ['Chamber Locations', 'Uttara Chamber: House 46, Road 6/B, Sector 12, Uttara West, Dhaka 1230 · Judge Court Chamber: Ainjeebi Samity Bhaban, 4th Floor, 6/7 Court House Street, Kotwali, Dhaka-1100'],
        ['Office Hours', OFFICE_HOURS.en],
        ['Courts Covered', 'Dhaka Civil / Assistant Judge & Joint District Judge Courts, Dhaka CMM Court, Dhaka Sessions Court (Kotwali), Family Court & Supreme Court of Bangladesh (High Court Division)'],
        ['Consultation Policy', 'First consultation is free — no advance fee. Legal fees are agreed only after reviewing your documents and scope.'],
      ],
      jurisdictionRows: [
        ['Bashundhara R/A Core Blocks (Most Blocks)', 'Vatara PS — Progoti Soroni, Gulshan Notun Bazar', 'DNCC (Vatara Zone)', 'Plot & flat title due diligence, developer & housing-society transfer verification, apartment committee disputes'],
        ['Bashundhara R/A Northern / Kuril Edge', 'Khilkhet PS (DMP Directory)', 'DNCC (Khilkhet Zone)', 'Boundary & possession verification, e-Namjari mutation, civil injunction & criminal bail'],
        ['Bashundhara R/A Southern / Badda Edge', 'Badda PS (DMP Directory)', 'DNCC (Badda Zone)', 'Rent Control Act 1991 eviction, Section 138 cheque cases, inheritance & partition suits'],
        ['Proposed Bashundhara Police Station Status', 'Not yet established — awaiting ministry approval (Cabinet decision 7 May 2026)', 'Currently Vatara / Badda / Khilkhet PS', 'Always verify the exact block-to-thana jurisdiction before filing a GD or FIR to avoid jurisdictional delay'],
      ],
      caseTimelineTable: {
        heading: 'Common Bashundhara R/A Legal Matters, Governing Statutes & Procedural Stages',
        columns: ['Matter Type', 'Governing Law / Statute', 'Forum / Office', 'Key Procedural Stages'],
        rows: [
          ['Plot & Flat Pre-Purchase Due Diligence', 'Registration Act 1908; Transfer of Property Act 1882; Specific Relief Act 1877', 'Sub-Registrar Office, AC Land, RAJUK & Housing Office', 'Baya Dalil chain review, CS/SA/RS/City Jarip Khatian check, Lis Pendens search, RAJUK & society transfer check, deed execution & e-Namjari'],
          ['Developer Handover Delay & Breach', 'Contract Act 1872; Real Estate Development & Management Act 2010; Specific Relief Act 1877', 'Dhaka Civil Court / Arbitration Forum', 'Agreement audit, formal legal notice, mediation/arbitration or civil suit for specific performance & compensation'],
          ['Inheritance & Co-Heir Partition', 'Muslim Personal Law / Hindu Law; Partition Act 1893; Code of Civil Procedure 1908', 'AC Land, Sub-Registrar & Dhaka Civil Court', 'Warishan certificate, e-Namjari mutation, registered Partition Deed (Bontonnama) or civil Batwara suit'],
          ['Tenant Eviction & Rent Arrears', 'Premises Rent Control Act 1991; Section 106 Transfer of Property Act 1882', 'Dhaka Assistant Judge Court', 'Statutory written notice to quit, eviction plaint, summons & trial, decree execution'],
          ['Vatara / Badda / Khilkhet PS Criminal & Bail', 'Sections 497 & 498 Code of Criminal Procedure 1898', 'High Court Division & Dhaka CMM Court', 'Confirm block-level PS jurisdiction, FIR review, High Court anticipatory bail or regular bail hearing'],
        ],
      },
      sections: [
        {
          heading: 'Plot & Apartment Title Verification in Bashundhara Residential Area',
          paragraphs: [
            'Buying or selling a plot or apartment in Bashundhara Residential Area involves two parallel layers of verification: statutory land records under the Registration Act 1908 and State Acquisition & Tenancy Act 1950 (chain of registered deeds/Baya Dalil, CS/SA/RS/City Jarip Khatian, updated e-Namjari mutation, land development tax receipts, and sub-registry Lis Pendens checks under Section 52 of the Transfer of Property Act 1882) and private housing-society / developer transfer documentation, allotment history, and RAJUK plan compliance.',
            'Before paying any Bayna (earnest money) or signing a tripartite transfer agreement, independent legal due diligence protects buyers from undisclosed mortgages, pending partition or inheritance suits, unapproved floor deviations, or disputed society transfer procedures. We review full deed chains and draft protective Bayna and sale deeds.',
          ],
        },
        {
          heading: 'Step-by-Step Land & Flat Registration Workflow (RAJUK, Sub-Registrar & AC Land)',
          paragraphs: [
            'A clean transaction in Bashundhara R/A follows five disciplined checkpoints: (1) verifying the seller’s registered title deed and all prior Baya Dalils back to the original mouza record, (2) checking CS/SA/RS and Mahanagar Jarip Khatian consistency along with current DCR and Khajna receipts, (3) conducting a sub-registry search for any mortgage or civil suit (Lis Pendens), (4) verifying RAJUK building plan approval and housing-society transfer requirements, and (5) executing the registered Saf Kabala deed followed promptly by e-Namjari mutation at the local AC Land office.',
            'For Non-Resident Bangladeshis (NRBs) purchasing or selling Bashundhara R/A apartments from the UK, USA, Canada, UAE, or Europe, we also coordinate embassy-attested Powers of Attorney under the Power of Attorney Act 2012 and MOFA authentication in Dhaka.',
          ],
        },
        {
          heading: 'Apartment Owners’ Committee, Developer Delays & Rent Eviction Disputes',
          paragraphs: [
            'Across Bashundhara R/A’s high-density apartment blocks, recurring disputes involve delayed developer handover under the Real Estate Development and Management Act 2010, defective deed of agreement terms, utility and service-charge disagreements with apartment welfare committees, and residential tenants refusing to vacate after lease expiry.',
            'We represent flat owners in developer breach notices, civil suits for specific performance under the Specific Relief Act 1877 or compensation, lawful eviction proceedings under the Premises Rent Control Act 1991 and Section 106 of the Transfer of Property Act 1882, and structured settlement negotiations without unlawful self-help.',
          ],
        },
        {
          heading: 'Inheritance vs Civil Court Suits & Verified Police Station Jurisdiction (Vatara / Badda / Khilkhet)',
          paragraphs: [
            'When a plot or flat owner in Bashundhara R/A passes away, heirs frequently confuse succession certificates under the Succession Act 1925 (which cover movable assets like bank accounts and shares) with the civil court remedies required for immovable property — namely mutation based on Warishan certificate, registered partition deeds (Bontonnama), or civil partition suits (Batwara) when co-heirs disagree.',
            'For urgent criminal complaints, GDs, or bail matters in Bashundhara R/A, note that a separate Bashundhara Police Station is not yet operational (awaiting ministry approval following the 7 May 2026 cabinet decision). Matters currently fall under Vatara PS (Progoti Soroni, Gulshan Notun Bazar) for most blocks, and Badda PS or Khilkhet PS for bordering blocks. We handle urgent High Court anticipatory bail (Section 498 CrPC) and Dhaka CMM Court bail hearings across all three jurisdictions.',
          ],
        },
        {
          heading: 'Transparent Fee Structure & Written Scope Before Paid Work',
          paragraphs: [
            'Every Bashundhara R/A plot audit, developer dispute, partition suit, or bail petition involves different statutory filings and timelines. We never charge an advance fee for an initial discussion — your first consultation is free.',
            'After reviewing your allotment letter, deeds, Khatian, or FIR, we explain the exact legal steps, separate government registration/stamp duties from professional legal fees, and confirm the scope in writing before commencing formal work.',
          ],
        },
        {
          heading: 'How to Book Your Free First Consultation from Bashundhara R/A',
          paragraphs: [
            'Message us on WhatsApp (+880 1955-802007) or call +880 1712-655546 to discuss your Bashundhara R/A property, developer, inheritance, or bail matter. Our Uttara Sector 12 chamber is just minutes away and open 7 days a week (Sunday – Thursday: 8:00 AM – 10:00 PM; Friday – Saturday (Uttara Chamber): 10:00 AM – 10:00 PM), alongside our Kotwali Judge Court chamber.',
          ],
        },
      ],
      faqs: [
        {
          q: '1. Does Bashundhara R/A have its own police station yet?',
          a: 'No. While a cabinet decision on 7 May 2026 moved forward on a proposed Bashundhara Police Station, it is not yet formally established and does not appear in the 49 active DMP police stations list. Most Bashundhara R/A blocks are currently served by Vatara PS (Progoti Soroni, Gulshan Notun Bazar), with bordering blocks under Badda PS or Khilkhet PS.',
        },
        {
          q: '2. What documents should be checked before buying a plot or flat in Bashundhara R/A?',
          a: 'Verify the complete chain of registered deeds (Baya Dalil), CS/SA/RS/City Jarip Khatian, current e-Namjari mutation and land tax receipts, RAJUK approved building plan, housing-society allotment/transfer clearance, and a sub-registry search for any mortgage or pending civil suit (Lis Pendens).',
        },
        {
          q: '3. How are inheritance disputes over Bashundhara R/A flats or plots resolved?',
          a: 'If all heirs agree, property can be mutated and divided via a registered Partition Deed (Bontonnama). If co-heirs disagree or one heir blocks possession, a civil Partition Suit (Batwara) or declaration suit must be filed in the Dhaka Civil Court.',
        },
        {
          q: '4. What legal remedy is available if a developer delays handing over a Bashundhara R/A apartment?',
          a: 'Under the Real Estate Development and Management Act 2010, Contract Act 1872, and Specific Relief Act 1877, buyers can serve a formal legal notice, invoke arbitration if provided in the agreement, or file a civil suit for specific performance and compensation.',
        },
        {
          q: '5. How do landlords in Bashundhara R/A lawfully evict a defaulting tenant?',
          a: 'Serve a written notice to quit under Section 106 of the Transfer of Property Act 1882 and file an eviction suit under the Premises Rent Control Act 1991 in the Assistant Judge Court. Cutting utilities or locking out a tenant without a court order is illegal.',
        },
        {
          q: '6. Is the first consultation free for Bashundhara R/A clients?',
          a: 'Yes. The first consultation is free with no advance fee — via WhatsApp, phone, or in person at our nearby Uttara Sector 12 chamber or Kotwali Judge Court chamber.',
        },
      ],
    },
    bn: {
      title: 'বসুন্ধরা আবাসিক এলাকা আইনজীবী — জমি, ফ্ল্যাট ও জামিন',
      h1: 'বসুন্ধরা আবাসিক এলাকা আইনজীবী ঢাকা — প্লট ও ফ্ল্যাট দলিল যাচাই, অ্যাপার্টমেন্ট বিরোধ ও জামিন',
      description:
        'বসুন্ধরা আবাসিক এলাকা (ভাটারা / বাড্ডা / খিলক্ষেত থানা) এর প্লট ও ফ্ল্যাট দলিল যাচাই, রাজউক/হাউজিং হস্তান্তর, অ্যাপার্টমেন্ট বিরোধ, উত্তরাধিকার ও জামিন মামলার আইনি সহায়তা। প্রথম পরামর্শ ফ্রি।',
      serviceType: 'বসুন্ধরা আবাসিক এলাকা আইনি সেবা — জমি ও ফ্ল্যাট যাচাই, অ্যাপার্টমেন্ট বিরোধ, উত্তরাধিকার ও জামিন',
      badge: 'বসুন্ধরা আবাসিক এলাকা ব্লক এ–এন, ভাটারা, কুড়িল ও খিলক্ষেত',
      intro:
        'অ্যাডভোকেট মো. শাহ আলম বাংলাদেশের সুপ্রিম কোর্ট ও ঢাকা জজ কোর্টের একজন তালিকাভুক্ত আইনজীবী। বসুন্ধরা আবাসিক এলাকার কাছাকাছি উত্তরা সেক্টর ১২ চেম্বার ও কোতোয়ালি জজ কোর্ট চেম্বার থেকে আমরা বসুন্ধরা আবাসিক এলাকার প্লট ও ফ্ল্যাট ক্রেতা-বিক্রেতা, বাড়িওয়ালা এবং প্রবাসী বাংলাদেশিদের (NRB) দলিল যাচাই (Title Due Diligence), রাজউক ও হাউজিং হস্তান্তর প্রক্রিয়া, ডেভেলপার ও অ্যাপার্টমেন্ট কমিটি বিরোধ, উত্তরাধিকার ও দেওয়ানি মামলা, ভাড়াটিয়া উচ্ছেদ এবং ভাটারা, বাড্ডা ও খিলক্ষেত থানার ফৌজদারি জামিন মামলায় নিয়মিত আইনি সহায়তা প্রদান করি। প্রথম পরামর্শ সম্পূর্ণ ফ্রি।',
      waMessage:
        'আসসালামু আলাইকুম, বসুন্ধরা আবাসিক এলাকার একটি জমি/ফ্ল্যাট বা আইনি বিষয়ে ফ্রি প্রথম পরামর্শের জন্য যোগাযোগ করছি।',
      quickTable: [
        ['বর্তমান থানার অধিক্ষেত্র (DMP যাচাইকৃত)', 'ভাটারা থানা — প্রগতি সরণি, গুলশান নতুন বাজার (বেশিরভাগ ব্লক), এবং ব্লকভেদে বাড্ডা ও খিলক্ষেত থানা। দ্রষ্টব্য: ৭ মে ২০২৬ ক্যাবিনেট সিদ্ধান্তের পর প্রস্তাবিত বসুন্ধরা থানা এখনো প্রতিষ্ঠিত হয়নি (মন্ত্রণালয়ের অনুমোদনের অপেক্ষায়; DMP-র ৪৯টি সক্রিয় থানার তালিকায় এখনো নেই)।'],
        ['চেম্বার ঠিকানা', 'উত্তরা চেম্বার: বাড়ি ৪৬, রোড ৬/বি, সেক্টর ১২, উত্তরা পশ্চিম, ঢাকা ১২৩০ · জজ কোর্ট চেম্বার: আইনজীবী সমিতি ভবন, ৪র্থ তলা, ৬/৭ কোর্ট হাউস স্ট্রিট, কোতোয়ালি, ঢাকা-১১০০'],
        ['অফিস সময়', OFFICE_HOURS.bn],
        ['সংশ্লিষ্ট আদালত', 'ঢাকা সহকারী জজ ও যুগ্ম জেলা জজ (দেওয়ানি) আদালত, ঢাকা সিএমএম আদালত, দায়রা জজ আদালত (কোতোয়ালি), পারিবারিক আদালত ও বাংলাদেশ সুপ্রিম কোর্ট (হাইকোর্ট বিভাগ)'],
        ['পরামর্শ নীতি', 'প্রথম পরামর্শ ফ্রি — কোনো অগ্রিম ফি নেই। কাগজপত্র পর্যালোচনা ও কাজের পরিধি নির্ধারণের পরেই কেবল ফি আলোচনা করা হয়।'],
      ],
      jurisdictionRows: [
        ['বসুন্ধরা আবাসিক এলাকা (বেশিরভাগ ব্লক)', 'ভাটারা থানা — প্রগতি সরণি, গুলশান নতুন বাজার', 'ডিএনসিসি (ভাটারা অঞ্চল)', 'প্লট ও ফ্ল্যাট দলিল যাচাই, ডেভেলপার ও হাউজিং হস্তান্তর অনুমোদন, অ্যাপার্টমেন্ট কমিটি বিরোধ'],
        ['বসুন্ধরা উত্তর ও কুড়িল সংলগ্ন অংশ', 'খিলক্ষেত থানা (ডিএমপি ডিরেক্টরি)', 'ডিএনসিসি (খিলক্ষেত অঞ্চল)', 'সীমানা ও দখল যাচাই, ই-নামজারি, দেওয়ানি নিষেধাজ্ঞা ও ফৌজদারি জামিন'],
        ['বসুন্ধরা দক্ষিণ ও বাড্ডা সংলগ্ন অংশ', 'বাড্ডা থানা (ডিএমপি ডিরেক্টরি)', 'ডিএনসিসি (বাড্ডা অঞ্চল)', 'বাড়ি ভাড়া নিয়ন্ত্রণ আইন ১৯৯১-এ উচ্ছেদ, ১৩৮ ধারা চেক মামলা, উত্তরাধিকার ও বাটোয়ারা মামলা'],
        ['প্রস্তাবিত বসুন্ধরা থানার অবস্থান', 'এখনো প্রতিষ্ঠিত হয়নি — মন্ত্রণালয়ের অনুমোদনের অপেক্ষায় (ক্যাবিনেট সিদ্ধান্ত ৭ মে ২০২৬)', 'বর্তমানে ভাটারা / বাড্ডা / খিলক্ষেত থানা', 'জিডি বা এফআইআর করার আগে সঠিক ব্লকের থানা অধিক্ষেত্র নিশ্চিত করে নেওয়া জরুরি'],
      ],
      caseTimelineTable: {
        heading: 'বসুন্ধরা আবাসিক এলাকার সাধারণ মামলার ধরন, প্রযোজ্য আইন ও ধাপসমূহ',
        columns: ['মামলার ধরন', 'প্রযোজ্য আইন', 'সংশ্লিষ্ট আদালত / দপ্তর', 'প্রধান আইনি ধাপসমূহ'],
        rows: [
          ['প্লট ও ফ্ল্যাট কেনার আগে দলিল যাচাই', 'রেজিস্ট্রেশন আইন, ১৯০৮; সম্পত্তি হস্তান্তর আইন, ১৮৮২; সুনির্দিষ্ট প্রতিকার আইন, ১৮৭৭', 'সাব-রেজিস্ট্রি অফিস, এসি (ল্যান্ড), রাজউক ও হাউজিং অফিস', 'বায়া দলিল যাচাই, সিএস-এসএ-আরএস ও মহানগর খতিয়ান, লিস পেন্ডেন্স তল্লাশি, রাজউক ও হাউজিং অনুমোদন, নিবন্ধন ও ই-নামজারি'],
          ['ডেভেলপার ফ্ল্যাট হস্তান্তর বিলম্ব ও চুক্তিভঙ্গ', 'চুক্তি আইন, ১৮৭২; রিয়েল এস্টেট উন্নয়ন ও ব্যবস্থাপনা আইন, ২০১০; সুনির্দিষ্ট প্রতিকার আইন, ১৮৭৭', 'ঢাকা দেওয়ানি আদালত / সালিশি ফোরাম', 'চুক্তি পর্যালোচনা, লিগ্যাল নোটিশ, সালিশি বা চুক্তি বাস্তবায়ন ও ক্ষতিপূরণের দেওয়ানি মোকদ্দমা'],
          ['উত্তরাধিকার ও সহ-ওয়ারিশ বাটোয়ারা', 'মুসলিম / হিন্দু উত্তরাধিকার আইন; পার্টিশন অ্যাক্ট, ১৮৯৩; দেওয়ানি কার্যবিধি, ১৯০৮', 'এসি (ল্যান্ড), সাব-রেজিস্ট্রি অফিস ও ঢাকা দেওয়ানি আদালত', 'ওয়ারিশান সনদ, ই-নামজারি, রেজিস্ট্রিকৃত বণ্টননামা দলিল অথবা দেওয়ানি বাটোয়ারা মোকদ্দমা'],
          ['ভাড়াটিয়া উচ্ছেদ ও বকেয়া ভাড়া আদায়', 'বাড়ি ভাড়া নিয়ন্ত্রণ আইন, ১৯৯১; সম্পত্তি হস্তান্তর আইন, ১৮৮২ (ধারা ১০৬)', 'ঢাকা সহকারী জজ আদালত', 'আইনসম্মত লিখিত নোটিশ, উচ্ছেদ আরজি দাখিল, সমন ও সাক্ষ্যগ্রহণ, ডিক্রি জারি'],
          ['ভাটারা / বাড্ডা / খিলক্ষেত থানায় ফৌজদারি ও জামিন', 'ফৌজদারি কার্যবিধি, ১৮৯৮ (ধারা ৪৯৭ ও ৪৯৮)', 'হাইকোর্ট বিভাগ ও ঢাকা সিএমএম আদালত', 'ব্লক অনুযায়ী সঠিক থানা যাচাই, এজাহার পর্যালোচনা, হাইকোর্টে আগাম জামিন বা সিএমএম আদালতে নিয়মিত জামিন'],
        ],
      },
      sections: [
        {
          heading: 'বসুন্ধরা আবাসিক এলাকায় প্লট ও ফ্ল্যাট কেনার আগে দলিল যাচাই',
          paragraphs: [
            'বসুন্ধরা আবাসিক এলাকায় প্লট বা ফ্ল্যাট ক্রয়-বিক্রয়ের ক্ষেত্রে দুই স্তরের আইনি যাচাই অপরিহার্য: একদিকে রেজিস্ট্রেশন আইন, ১৯০৮ ও রাষ্ট্রীয় অধিগ্রহণ ও প্রজাস্বত্ব আইন, ১৯৫০ অনুযায়ী সরকারি ভূমি রেকর্ড (বায়া দলিলের ধারাবাহিকতা, সিএস-এসএ-আরএস ও মহানগর জরিপের খতিয়ান, হালনাগাদ ই-নামজারি ও খাজনার রসিদ এবং সম্পত্তি হস্তান্তর আইনের ৫২ ধারায় লিস পেন্ডেন্স তল্লাশি), অন্যদিকে হাউজিং কোম্পানির বরাদ্দ ও হস্তান্তর অনুমোদন এবং রাজউক অনুমোদিত নকশা যাচাই।',
            'বায়না চুক্তি সই করা বা অগ্রিম টাকা দেওয়ার আগে একজন অভিজ্ঞ জমি আইনজীবী দিয়ে কাগজপত্র যাচাই করলে বন্ধকী দায়, চলমান উত্তরাধিকার বা বাটোয়ারা মামলা, নকশাবহির্ভূত নির্মাণ বা হস্তান্তর-সংক্রান্ত জটিলতা থেকে নিরাপদ থাকা যায়।',
          ],
        },
        {
          heading: 'বসুন্ধরায় জমি ও ফ্ল্যাট নিবন্ধনের ধাপে ধাপে প্রক্রিয়া (রাজউক, সাব-রেজিস্ট্রার ও এসি ল্যান্ড)',
          paragraphs: [
            'বসুন্ধরা আবাসিক এলাকায় নিরাপদ সম্পত্তি হস্তান্তরের পাঁচটি প্রধান ধাপ রয়েছে: (১) বিক্রেতার মূল সাফ কবলা ও পূর্ববর্তী সব বায়া দলিল যাচাই, (২) সিএস-এসএ-আরএস ও মহানগর জরিপের খতিয়ান এবং হালনাগাদ ডিসিআর ও ভূমি উন্নয়ন করের রসিদ মিলিয়ে দেখা, (৩) সাব-রেজিস্ট্রি অফিসে কোনো বন্ধক বা দেওয়ানি মামলা (লিস পেন্ডেন্স) আছে কি না তা তল্লাশি করা, (৪) রাজউক অনুমোদিত নকশা ও হাউজিং কোম্পানির হস্তান্তর প্রক্রিয়া নিশ্চিত করা, এবং (৫) রেজিস্ট্রিকৃত সাফ কবলা সম্পাদনের পরপরই সংশ্লিষ্ট এসি (ল্যান্ড) অফিসে ই-নামজারি সম্পন্ন করা।',
            'যুক্তরাজ্য, যুক্তরাষ্ট্র, কানাডা, ইউরোপ বা মধ্যপ্রাচ্যে বসবাসরত প্রবাসী বাংলাদেশিদের (NRB) বসুন্ধরা আবাসিক এলাকার ফ্ল্যাট বা প্লট কেনাবেচার ক্ষেত্রে আমরা পাওয়ার অব অ্যাটর্নি আইন, ২০১২ অনুযায়ী দূতাবাস ও ঢাকায় MOFA সত্যায়নসহ নিরাপদ রেজিস্ট্রেশনে সহায়তা করি।',
          ],
        },
        {
          heading: 'ডেভেলপার বিরোধ, অ্যাপার্টমেন্ট কমিটি ও ভাড়াটিয়া উচ্ছেদ',
          paragraphs: [
            'বসুন্ধরা আবাসিক এলাকার অ্যাপার্টমেন্ট ভবনগুলোতে রিয়েল এস্টেট উন্নয়ন ও ব্যবস্থাপনা আইন, ২০১০ লঙ্ঘন করে নির্ধারিত সময়ে ফ্ল্যাট হস্তান্তর না করা, চুক্তিপত্রের শর্ত ভঙ্গ, সার্ভিস চার্জ ও অ্যাপার্টমেন্ট কমিটির বিরোধ এবং ভাড়াটিয়ার ফ্ল্যাট না ছাড়ার ঘটনা প্রায়ই ঘটে।',
            'আমরা ডেভেলপারকে লিগ্যাল নোটিশ, সুনির্দিষ্ট প্রতিকার আইন, ১৮৭৭ অনুযায়ী দেওয়ানি আদালতে চুক্তি বাস্তবায়ন বা ক্ষতিপূরণের মোকদ্দমা, বাড়ি ভাড়া নিয়ন্ত্রণ আইন, ১৯৯১ ও সম্পত্তি হস্তান্তর আইনের ১০৬ ধারা অনুযায়ী আইনসম্মত উচ্ছেদ মামলা এবং মধ্যস্থতার মাধ্যমে দ্রুত সমাধানে সহায়তা করি।',
          ],
        },
        {
          heading: 'উত্তরাধিকার বনাম দেওয়ানি মামলা ও থানার সঠিক অধিক্ষেত্র (ভাটারা / বাড্ডা / খিলক্ষেত)',
          paragraphs: [
            'বসুন্ধরা আবাসিক এলাকার কোনো প্লট বা ফ্ল্যাট মালিকের মৃত্যুর পর উত্তরাধিকারীরা প্রায়ই সাকসেশন অ্যাক্ট, ১৯২৫-এর অধীনে সাকসেশন সার্টিফিকেট (যা কেবল ব্যাংক হিসাব বা অস্থাবর সম্পত্তির জন্য) এবং স্থাবর সম্পত্তির বণ্টন প্রক্রিয়াকে গুলিয়ে ফেলেন। স্থাবর জমি-ফ্ল্যাটের ক্ষেত্রে ওয়ারিশান সনদ অনুযায়ী নামজারি, রেজিস্ট্রিকৃত বণ্টননামা দলিল অথবা মতবিরোধ থাকলে পার্টিশন অ্যাক্ট ও দেওয়ানি কার্যবিধি অনুযায়ী দেওয়ানি আদালতে বাটোয়ারা মোকদ্দমা দায়ের করতে হয়।',
            'ফৌজদারি মামলা বা জিডির ক্ষেত্রে মনে রাখা জরুরি যে বসুন্ধরা থানা এখনো চালু হয়নি (৭ মে ২০২৬-এর ক্যাবিনেট সিদ্ধান্তের পর মন্ত্রণালয়ের অনুমোদনের অপেক্ষায়)। বর্তমানে বেশিরভাগ ব্লক ভাটারা থানা (প্রগতি সরণি, গুলশান নতুন বাজার) এবং প্রান্তিক ব্লকগুলো বাড্ডা ও খিলক্ষেত থানার অধীনে। এই তিন থানার যেকোনো মামলায় হাইকোর্টে ৪৯৮ ধারায় আগাম জামিন ও সিএমএম আদালতে জামিন শুনানিতে আমরা দ্রুত আইনি সহায়তা দিই।',
          ],
        },
        {
          heading: 'স্বচ্ছ ফি কাঠামো ও কাজের পরিধি নির্ধারণ',
          paragraphs: [
            'বসুন্ধরা আবাসিক এলাকার প্লট দলিল যাচাই, ডেভেলপার বিরোধ, বাটোয়ারা মামলা বা জামিন পিটিশনের প্রতিটি ক্ষেত্রে আইনি শ্রম ও সরকারি খরচের ধরন ভিন্ন। তাই প্রথম আলোচনায় কোনো অগ্রিম ফি নেওয়া হয় না।',
            'আপনার অ্যালটমেন্ট লেটার, বায়া দলিল, খতিয়ান বা এজাহার পর্যালোচনার পর সরকারি স্ট্যাম্প/কোর্ট-ফি এবং আইনজীবীর পেশাগত ফি আলাদাভাবে বুঝিয়ে ও লিখিত সম্মতির পরই আনুষ্ঠানিক কাজ শুরু করা হয়।',
          ],
        },
        {
          heading: 'বসুন্ধরা আবাসিক এলাকা থেকে ফ্রি প্রথম পরামর্শ নেওয়ার নিয়ম',
          paragraphs: [
            'হোয়াটসঅ্যাপ (+৮৮০ ১৯৫৫-৮০২০০৭) অথবা ফোনে (+৮৮০ ১৭১২-৬৫৫৫৪৬) আপনার বসুন্ধরা আবাসিক এলাকার জমি, ফ্ল্যাট, ডেভেলপার বা জামিন সংক্রান্ত বিষয়টি জানাতে পারেন। আমাদের উত্তরা সেক্টর ১২ চেম্বার বসুন্ধরার খুব কাছেই এবং সপ্তাহে ৭ দিন খোলা (রবিবার – বৃহস্পতিবার: সকাল ৮:০০ – রাত ১০:০০; শুক্র – শনিবার (উত্তরা চেম্বার): সকাল ১০:০০ – রাত ১০:০০), পাশাপাশি কোতোয়ালি জজ কোর্ট চেম্বারেও সাক্ষাৎ করা যায়।',
          ],
        },
      ],
      faqs: [
        {
          q: '১. বসুন্ধরা আবাসিক এলাকার কি নিজস্ব থানা চালু হয়েছে?',
          a: 'না। ৭ মে ২০২৬-এ ক্যাবিনেট সিদ্ধান্ত হলেও বসুন্ধরা থানা এখনো প্রতিষ্ঠিত হয়নি এবং DMP-র ৪৯টি সক্রিয় থানার তালিকায় নেই। বর্তমানে বেশিরভাগ ব্লক ভাটারা থানা (প্রগতি সরণি, গুলশান নতুন বাজার) এবং পার্শ্ববর্তী অংশ বাড্ডা ও খিলক্ষেত থানার অধীনে।',
        },
        {
          q: '২. বসুন্ধরা আবাসিক এলাকায় জমি বা ফ্ল্যাট কেনার আগে কী কী যাচাই করতে হয়?',
          a: 'বায়া দলিলের ধারাবাহিকতা, সিএস-এসএ-আরএস ও মহানগর খতিয়ান, হালনাগাদ ই-নামজারি ও ভূমি উন্নয়ন করের রসিদ, রাজউক অনুমোদিত নকশা, হাউজিং কোম্পানির হস্তান্তর অনুমোদন এবং কোনো বন্ধক বা লিস পেন্ডেন্স মামলা আছে কি না তা যাচাই করা আবশ্যক।',
        },
        {
          q: '৩. বসুন্ধরার ফ্ল্যাট বা প্লটের উত্তরাধিকার বিরোধ কীভাবে নিষ্পত্তি হয়?',
          a: 'সব ওয়ারিশ একমত হলে রেজিস্ট্রিকৃত বণ্টননামা দলিলের মাধ্যমে ভাগ ও নামজারি করা যায়। মতবিরোধ থাকলে ঢাকা দেওয়ানি আদালতে বাটোয়ারা (Partition) মোকদ্দমা দায়ের করতে হয়।',
        },
        {
          q: '৪. ডেভেলপার সময়মতো বসুন্ধরার ফ্ল্যাট বুঝিয়ে না দিলে আইনি প্রতিকার কী?',
          a: 'রিয়েল এস্টেট উন্নয়ন ও ব্যবস্থাপনা আইন, ২০১০, চুক্তি আইন, ১৮৭২ এবং সুনির্দিষ্ট প্রতিকার আইন, ১৮৭৭ অনুযায়ী লিগ্যাল নোটিশ, সালিশি (চুক্তিতে থাকলে) অথবা দেওয়ানি আদালতে চুক্তি বাস্তবায়ন ও ক্ষতিপূরণের মোকদ্দমা করা যায়।',
        },
        {
          q: '৫. বসুন্ধরা আবাসিক এলাকায় ভাড়াটিয়া ফ্ল্যাট না ছাড়লে কীভাবে উচ্ছেদ করা যায়?',
          a: 'সম্পত্তি হস্তান্তর আইনের ১০৬ ধারায় লিখিত নোটিশ দিয়ে বাড়ি ভাড়া নিয়ন্ত্রণ আইন, ১৯৯১ অনুযায়ী সহকারী জজ আদালতে উচ্ছেদ মোকদ্দমা দায়ের করতে হয়। আদালতের আদেশ ছাড়া সংযোগ কাটা বা তালা দেওয়া বেআইনি।',
        },
        {
          q: '৬. বসুন্ধরা আবাসিক এলাকার ক্লায়েন্টদের জন্য কি প্রথম পরামর্শ ফ্রি?',
          a: 'হ্যাঁ। হোয়াটসঅ্যাপ, ফোন অথবা আমাদের উত্তরা সেক্টর ১২ ও জজ কোর্ট চেম্বারে প্রথম পরামর্শ সম্পূর্ণ ফ্রি — কোনো অগ্রিম ফি লাগে না।',
        },
      ],
    },
  },
};

export const LOCAL_AREA_LIST = [LOCAL_AREAS.gulshan, LOCAL_AREAS.banani, LOCAL_AREAS.bashundhara];
