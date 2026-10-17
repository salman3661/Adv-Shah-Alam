/**
 * Shared SEO helpers - imported by BOTH the React article pages (react-helmet-async) and
 * scripts/prerender.mjs, so runtime <head> and pre-rendered <head> can never drift apart.
 * Pure ESM, no JSX / no bundler aliases (must stay loadable from plain Node).
 */

export const SITE = 'https://www.advmdshahalam.me';

export const ENTITY_IDS = {
  legalService: `${SITE}/#legalservice`,
  attorney: `${SITE}/#attorney`,
};

const SAME_AS = [
  'https://www.facebook.com/advmd.shahalamfb',
  'https://www.linkedin.com/in/advmdshahalam/',
  'https://maps.app.goo.gl/M3NXMwW3xkp2TE3h8',
  'https://about.me/advmd.shahalam',
  'https://advmdshahalam.blogspot.com/',
  'https://bdadvocates.com/profile/1583',
];

/** LegalService + Attorney entities (single definition, reused on every article). */
export function legalEntities() {
  return [
    {
      '@type': 'LegalService',
      '@id': ENTITY_IDS.legalService,
      name: 'Advocate Md. Shah Alam Law Chamber',
      alternateName: 'এডভোকেট মোঃ শাহ আলম',
      url: SITE,
      logo: `${SITE}/adv-md-shah-alam.png`,
      image: `${SITE}/images/hero/hero-md-shah-alam.png`,
      telephone: '+8801712655546',
      email: 'contact@advmdshahalam.me',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'House 46, Road 6/B, Sector 12, Uttara',
        addressLocality: 'Dhaka',
        postalCode: '1230',
        addressCountry: 'BD',
      },
      areaServed: [
        { '@type': 'Country', name: 'Bangladesh' },
        { '@type': 'City', name: 'Dhaka' },
      ],
      employee: { '@id': ENTITY_IDS.attorney },
      sameAs: SAME_AS,
    },
    {
      '@type': 'Attorney',
      '@id': ENTITY_IDS.attorney,
      name: 'Advocate Md. Shah Alam',
      jobTitle: 'Advocate, Supreme Court of Bangladesh',
      url: `${SITE}/advocate-md-shah-alam`,
      image: `${SITE}/images/hero/hero-md-shah-alam.png`,
      worksFor: { '@id': ENTITY_IDS.legalService },
      sameAs: SAME_AS,
    },
  ];
}

/**
 * One JSON-LD @graph per article: LegalService + Attorney (+ FAQPage when the post has FAQs).
 * @param {{ url: string, lang?: 'bn'|'en', faqs?: Array<{question?:string,answer?:string,q?:string,a?:string}> }} opts
 */
export function buildEntityGraph({ url, lang = 'en', faqs = [] }) {
  const graph = legalEntities();
  const entries = (Array.isArray(faqs) ? faqs : [])
    .map((f) => ({ q: f.question || f.q || '', a: f.answer || f.a || '' }))
    .filter((f) => f.q && f.a);
  if (entries.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      url,
      inLanguage: lang,
      mainEntity: entries.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

/**
 * Reciprocal hreflang set for a blog article (Phase 4.1).
 * Includes regional (bn-BD / en-BD), language (bn / en), and x-default tags.
 * @returns {Array<{hrefLang:string, href:string}>}
 */
export function buildHreflang({ lang, slug, pairedSlug }) {
  const enUrl = (s) => `${SITE}/blog/${s}`;
  const bnUrl = (s) => `${SITE}/bn/blog/${s}`;
  if (lang === 'en') {
    const tags = [
      { hrefLang: 'en-BD', href: enUrl(slug) },
      { hrefLang: 'en', href: enUrl(slug) },
      { hrefLang: 'x-default', href: enUrl(slug) },
    ];
    if (pairedSlug) {
      tags.push({ hrefLang: 'bn-BD', href: bnUrl(pairedSlug) });
      tags.push({ hrefLang: 'bn', href: bnUrl(pairedSlug) });
    }
    return tags;
  }
  const tags = [
    { hrefLang: 'bn-BD', href: bnUrl(slug) },
    { hrefLang: 'bn', href: bnUrl(slug) },
  ];
  if (pairedSlug) {
    tags.push({ hrefLang: 'en-BD', href: enUrl(pairedSlug) });
    tags.push({ hrefLang: 'en', href: enUrl(pairedSlug) });
    tags.push({ hrefLang: 'x-default', href: enUrl(pairedSlug) });
  } else {
    tags.push({ hrefLang: 'x-default', href: bnUrl(slug) });
  }
  return tags;
}

/**
 * Phase 4.3: Topic Cluster Internal Linking (Hub & Spoke Model).
 * Maps any sub-article to its Master Pillar Page with exact-match anchor text.
 */
export function resolveMasterPillar(post, lang = 'bn') {
  if (!post || !post.slug) return null;
  const s = `${post.slug} ${post.category || ''} ${post.title || ''}`.toLowerCase();

  const bnClusters = [
    {
      match: /উত্তরাধিকার|ফারায়েজ|ফারায়েজ|ওয়ারিশ|ওয়ারিশ|সম্পত্তি বন্টন|মায়ের সম্পত্তি|বাবার সম্পত্তি|uttoradhikar|uttaradhikar|faraiz|warish|sampatti-banton|mayer-sampatti/,
      pillarSlug: 'sampatti-uttoradhikar-ain-2026-bn',
      anchorText: 'বাবার সম্পত্তি বন্টন আইন বাংলাদেশ ২০২৬ ও ফারায়েজ ক্যালকুলেটর',
      secondSlug: 'mayer-sampatti-vibhajan-ain-bangladesh-2026',
      secondAnchor: 'মায়ের সম্পত্তি ভাগের নিয়ম ২০২৬ (ছেলে-মেয়ের অংশ)',
      serviceUrl: '/bn/services/land-lawyer',
      serviceAnchor: 'ভূমি ও উত্তরাধিকার আইনজীবী ঢাকা',
    },
    {
      match: /রেজিস্ট্রি|দলিল খরচ|নিবন্ধন ফি|সাব-রেজিস্ট্রি|হেবা|দানপত্র|registry|nibandhon|heba|dalil|dolil/,
      pillarSlug: 'jomi-registry-khoroch-sarkaree-fee-bd',
      anchorText: 'জমি রেজিস্ট্রি খরচ কত ২০২৬-২০২৭ | সরকারি ফি তালিকা ও দলিল খরচ ক্যালকুলেটর',
      secondSlug: 'heba-bil-ewaz-dalil-batil-korar-niyom-2026',
      secondAnchor: 'হেবা ও দানপত্র দলিল করার নিয়ম ও খরচ ২০২৬',
      serviceUrl: '/bn/services/land-lawyer',
      serviceAnchor: 'জমি রেজিস্ট্রি ও দলিল আইনজীবী',
    },
    {
      match: /নামজারি|খারিজ|মিউটেশন|খতিয়ান|পর্চা|দাগ|ভূমি কর|খাজনা|namjari|kharij|mutation|khatian|porcha|khajna/,
      pillarSlug: 'jomi-kharij-namjari-khoroch-niyom-2026-bn',
      anchorText: 'ই-নামজারি ও জমি খারিজ করার নিয়ম, খরচ ও অনলাইন চেক ২০২৬',
      secondSlug: 'jomi-registry-khoroch-sarkaree-fee-bd',
      secondAnchor: 'জমি রেজিস্ট্রি খরচ ও দলিল ফি ক্যালকুলেটর ২০২৬',
      serviceUrl: '/bn/services/land-lawyer',
      serviceAnchor: 'ভূমি ও নামজারি আইনজীবী উত্তরা ঢাকা',
    },
    {
      match: /বাটোয়ারা|বন্টন মামলা|জমি দখল|উচ্ছেদ|দেওয়ানি|batwara|partition|dokhol|dewani/,
      pillarSlug: 'batwara-mamla-din-khoroch-prokriya-2026',
      anchorText: 'বাটোয়ারা মামলা কতদিন চলে ও খরচ কত ২০২৬ | কোর্ট ফি ও করার নিয়ম',
      secondSlug: 'sampatti-uttoradhikar-ain-2026-bn',
      secondAnchor: 'বাবার সম্পত্তি বন্টন আইন ও ফারায়েজ হিসাব ২০২৬',
      serviceUrl: '/bn/services/land-lawyer',
      serviceAnchor: 'দেওয়ানি ও জমি বাটোয়ারা মামলা আইনজীবী',
    },
    {
      match: /কাবিন|দেনমোহর|বিবাহ রেজিস্ট্রেশন|কাজী অফিস|বিয়ের নতুন আইন|kabin|denmohor|biye-notun-ain|nikah/,
      pillarSlug: 'biye-notun-ain-2026-kabinnama-sarkari-fee-hisab',
      anchorText: 'কাবিন নামা সরকারি ফি কত ২০২৬ | বিয়ের নতুন আইন ও কাজী অফিসের খরচের হিসাব',
      secondSlug: 'court-marriage-kagojpatra-complete-guide-2026',
      secondAnchor: 'কোর্ট ম্যারেজ করার নিয়ম, কাগজপত্র ও খরচ কত ২০২৬',
      serviceUrl: '/bn/services/divorce-lawyer',
      serviceAnchor: 'পারিবারিক ও বিবাহ আইনজীবী ঢাকা',
    },
    {
      match: /কোর্ট ম্যারেজ|কোট মেরেজ|বিশেষ বিবাহ|court-marriage|affidavit-marriage/,
      pillarSlug: 'court-marriage-kagojpatra-complete-guide-2026',
      anchorText: 'কোর্ট ম্যারেজ করার নিয়ম, কাগজপত্র ও খরচ কত ২০২৬ (কোট মেরেজ কাগজ PDF)',
      secondSlug: 'biye-notun-ain-2026-kabinnama-sarkari-fee-hisab',
      secondAnchor: 'কাবিন নামা সরকারি ফি ক্যালকুলেটর ও বিয়ের নতুন আইন ২০২৬',
      serviceUrl: '/bn/services/divorce-lawyer',
      serviceAnchor: 'কোর্ট ম্যারেজ ও পারিবারিক আইনজীবী',
    },
    {
      match: /তালাক|ডিভোর্স|খোলা তালাক|খোরপোষ|সন্তানের হেফাজত|পারিবারিক আদালত|talak|talaq|divorce|khula|khorposh|custody/,
      pillarSlug: 'stree-kortrik-swamike-talak-deyar-sothik-niyom',
      anchorText: 'স্ত্রী কর্তৃক স্বামীকে তালাক দেওয়ার নিয়ম ২০২৬ | ডিভোর্স নোটিশ, সময় ও দেনমোহর',
      secondSlug: 'biye-notun-ain-2026-kabinnama-sarkari-fee-hisab',
      secondAnchor: 'কাবিন নামা সরকারি ফি ও দেনমোহর আদায়ের নিয়ম ২০২৬',
      serviceUrl: '/bn/services/divorce-lawyer',
      serviceAnchor: 'তালাক ও পারিবারিক আদালত আইনজীবী ঢাকা',
    },
    {
      match: /পুলিশ ক্লিয়ারেন্স|ক্লিয়ারেন্স|জিডি|থানায় জিডি|পাসপোর্ট ভেরিফিকেশন|police-clearance|pcc|online-gd|general-diary/,
      pillarSlug: 'police-clearance-certificate-online-abedon-verification-2026',
      anchorText: 'পুলিশ ক্লিয়ারেন্স সার্টিফিকেট অনলাইন আবেদন ২০২৬ (pcc.police.gov.bd চেক ও খরচ)',
      secondSlug: 'agam-jamin-haikort-khoroch-2026',
      secondAnchor: 'হাইকোর্টে আগাম জামিন নেওয়ার নিয়ম ও খরচ ২০২৬',
      serviceUrl: '/bn/services/criminal-lawyer',
      serviceAnchor: 'ফৌজদারি ও থানা-পুলিশ বিষয়ক আইনজীবী',
    },
    {
      match: /সাইবার|ফেসবুক|হ্যাক|ব্ল্যাকমেইল|বিকাশ প্রতারণা|ডিজিটাল নিরাপত্তা|cyber|facebook|hack|blackmail|bkash/,
      pillarSlug: 'cyber-crime-helpline-online-complaint-bangladesh',
      anchorText: 'সাইবার ক্রাইম অভিযোগ করার নিয়ম ২০২৬ | পুলিশ হেল্পলাইন, জিডি ও আইনি প্রতিকার',
      secondSlug: 'police-clearance-certificate-online-abedon-verification-2026',
      secondAnchor: 'পুলিশ ক্লিয়ারেন্স সার্টিফিকেট অনলাইন আবেদন ও চেক ২০২৬',
      serviceUrl: '/bn/services/criminal-lawyer',
      serviceAnchor: 'সাইবার ক্রাইম ট্রাইব্যুনাল আইনজীবী ঢাকা',
    },
    {
      match: /জামিন|বেল বন্ড|আগাম জামিন|গ্রেপ্তার|এজাহার|চার্জশিট|ফৌজদারি|চেক ডিজঅনার|রিট|jamin|bail|arrest|fir|criminal|cheque|138|writ/,
      pillarSlug: 'agam-jamin-haikort-khoroch-2026',
      anchorText: 'হাইকোর্টে আগাম জামিন নেওয়ার নিয়ম ও খরচ ২০২৬ (Anticipatory Bail)',
      secondSlug: 'police-clearance-certificate-online-abedon-verification-2026',
      secondAnchor: 'পুলিশ ক্লিয়ারেন্স ও অনলাইন ভেরিফিকেশন গাইড ২০২৬',
      serviceUrl: '/bn/services/bail-lawyer',
      serviceAnchor: 'সুপ্রিম কোর্ট ও জজ কোর্ট জামিন আইনজীবী',
    },
  ];

  const enClusters = [
    {
      match: /cyber|facebook|hack|blackmail|bkash|digital-security|online-harassment/,
      pillarSlug: 'bangladesh-cyber-crime-complaint-portal-guide-2026',
      anchorText: 'Bangladesh Cyber Crime Complaint Online 2026 | Police Helpline, WhatsApp & GD',
      secondSlug: 'bail-bond-meaning-rules-bangladesh',
      secondAnchor: 'Bail Bond & Surety Rules in Bangladesh 2026',
      serviceUrl: '/services/criminal-lawyer',
      serviceAnchor: 'Cyber Crime & Criminal Defense Lawyer Dhaka',
    },
    {
      match: /registration|deed|heba|stamp-duty|flat-registration|property-transfer/,
      pillarSlug: 'land-registration-cost-fees-calculator-bangladesh-2026',
      anchorText: 'Land & Flat Registration Fee Calculator Bangladesh 2026 (Official Cost Chart)',
      secondSlug: 'e-namjari-online-check-bangladesh-2026',
      secondAnchor: 'E-Namjari Online Check & Mutation Fee Bangladesh 2026 (land.gov.bd)',
      serviceUrl: '/services/land-lawyer',
      serviceAnchor: 'Land & Property Registration Lawyer Bangladesh',
    },
    {
      match: /namjari|mutation|khatian|porcha|land-tax|dlrms|eporcha|inheritance|faraiz|partition|property/,
      pillarSlug: 'e-namjari-online-check-bangladesh-2026',
      anchorText: 'E-Namjari Online Check & Mutation Fee Bangladesh 2026 (land.gov.bd Guide)',
      secondSlug: 'land-registration-cost-fees-calculator-bangladesh-2026',
      secondAnchor: 'Land & Flat Registration Fee Calculator Bangladesh 2026',
      serviceUrl: '/services/land-lawyer',
      serviceAnchor: 'Land & Property Dispute Lawyer in Dhaka',
    },
    {
      match: /divorce|talaq|marriage|kabinnama|custody|dower|mahr|family/,
      pillarSlug: 'court-marriage-procedure-bangladesh',
      anchorText: 'Court Marriage Procedure, Documents & Fee in Bangladesh 2026',
      secondSlug: 'divorce-procedure-in-bangladesh',
      secondAnchor: 'Complete Divorce & Talaq Notice Procedure in Bangladesh 2026',
      serviceUrl: '/services/divorce-lawyer',
      serviceAnchor: 'Divorce & Family Court Lawyer in Bangladesh',
    },
    {
      match: /bail|arrest|fir|criminal|remand|surety|bond|cheque|138|writ|high-court/,
      pillarSlug: 'bail-bond-meaning-rules-bangladesh',
      anchorText: 'Bail Bond Meaning & Rules in Bangladesh 2026 | জামিনদার ও বেল বন্ডের নিয়ম',
      secondSlug: 'anticipatory-bail-bangladesh',
      secondAnchor: 'Anticipatory Bail in High Court Bangladesh — Complete Procedure',
      serviceUrl: '/services/bail-lawyer',
      serviceAnchor: 'Urgent Bail & Supreme Court Lawyer Dhaka',
    },
  ];

  const list = lang === 'bn' ? bnClusters : enClusters;
  const found = list.find((c) => c.match.test(s)) || list[list.length - 1];
  const prefix = lang === 'bn' ? '/bn/blog/' : '/blog/';
  const isSelfPillar = post.slug === found.pillarSlug;

  return {
    primaryUrl: `${prefix}${isSelfPillar ? found.secondSlug : found.pillarSlug}`,
    primaryAnchor: isSelfPillar ? found.secondAnchor : found.anchorText,
    secondaryUrl: isSelfPillar ? `${prefix}${found.pillarSlug}` : `${prefix}${found.secondSlug}`,
    secondaryAnchor: isSelfPillar ? found.anchorText : found.secondAnchor,
    serviceUrl: found.serviceUrl,
    serviceAnchor: found.serviceAnchor,
  };
}

/**
 * Phase 5.2: Featured Snippet & AI Overview (GEO) Quick Answer Table.
 * Returns structured key-value rows displaying key fees, governing laws, and official portals
 * (land.gov.bd, dlrms.land.gov.bd, pcc.police.gov.bd, eporcha.gov.bd).
 */
export function resolveQuickAnswerTable(post, lang = 'bn') {
  if (!post || !post.slug) return null;
  const s = `${post.slug} ${post.category || ''} ${post.title || ''}`.toLowerCase();

  if (lang === 'bn') {
    if (/উত্তরাধিকার|ফারায়েজ|ফারায়েজ|সম্পত্তি বন্টন|মায়ের সম্পত্তি|বাবার সম্পত্তি|uttoradhikar|uttaradhikar|faraiz|sampatti-banton|mayer-sampatti/.test(s)) {
      return {
        heading: 'এক নজরে মূল তথ্য (Quick Answer Table)',
        col1: 'বিষয় / আইনি মানদণ্ড',
        col2: 'বাংলাদেশ আইন ও সরকারি বিধান (২০২৬)',
        rows: [
          ['প্রযোজ্য আইন', 'মুসলিম পারিবারিক আইন অধ্যাদেশ, ১৯৬১ ও ফারায়েজ আইন (হানাফি ফিকহ)'],
          ['ছেলে ও মেয়ের অনুপাত', '২ : ১ (প্রত্যেক পুত্র ১ কন্যার দ্বিগুণ অংশ পাবে — সূরা নিসা ৪:১১)'],
          ['স্ত্রীর ও স্বামীর অংশ', 'সন্তান থাকলে স্ত্রী ১/৮ অংশ (১২.৫%), স্বামী ১/৪ অংশ (২৫%)'],
          ['মায়ের ও বাবার অংশ', 'সন্তান থাকলে মা ১/৬ অংশ (১৬.৬৭%) এবং বাবা ১/৬ অংশ'],
          ['সরকারি খতিয়ান ও নামজারি পোর্টাল', 'land.gov.bd, eporcha.gov.bd ও dlrms.land.gov.bd'],
        ],
      };
    }
    if (/রেজিস্ট্রি|দলিল খরচ|নিবন্ধন ফি|হেবা|registry|nibandhon|heba|dalil/.test(s)) {
      return {
        heading: 'এক নজরে মূল তথ্য (Quick Answer Table)',
        col1: 'ফি ও করের খাত',
        col2: 'সরকারি হার ও প্রযোজ্য বিধান (২০২৬-২০২৭)',
        rows: [
          ['রেজিস্ট্রেশন ফি ও স্ট্যাম্প শুল্ক', 'রেজিস্ট্রেশন ফি ১% + স্ট্যাম্প শুল্ক ১.৫% (দলিলে প্রদর্শিত মূল্যের ওপর)'],
          ['স্থানীয় সরকার কর ও ভ্যাট', 'স্থানীয় সরকার কর ২%–৩% + ভ্যাট ১.৫%–৪.৫% (অবস্থানভেদে)'],
          ['উৎসে কর (Gain Tax / TDS)', 'এলাকা ও মৌজা রেট অনুযায়ী ১% থেকে ৮% (আয়কর আইন ২০২৩)'],
          ['হেবা দলিলের সরকারি খরচ', 'রক্তের সম্পর্কের আত্মীয়দের মধ্যে নামমাত্র ফি (প্রায় ১,৫০০–২,৫০০ টাকা)'],
          ['অফিসিয়াল ভূমি ও দলিল পোর্টাল', 'land.gov.bd, dlrms.land.gov.bd ও eporcha.gov.bd'],
        ],
      };
    }
    if (/কাবিন|দেনমোহর|বিবাহ রেজিস্ট্রেশন|বিয়ের নতুন আইন|kabin|denmohor|biye-notun-ain/.test(s)) {
      return {
        heading: 'এক নজরে মূল তথ্য (Quick Answer Table)',
        col1: 'দেনমোহরের পরিমাণ / বিবরণ',
        col2: 'সরকারি কাবিন ফি ও আইনি বিধান (২০২৬)',
        rows: [
          ['প্রযোজ্য আইন ও বিধিমালা', 'মুসলিম বিবাহ ও তালাক (নিবন্ধন) আইন ১৯৭৪ ও বিধিমালা ২০০৯ (সংশোধিত)'],
          ['প্রথম ৪ লাখ টাকা পর্যন্ত দেনমোহর', 'প্রতি ১,০০০ টাকায় ১২.৫০ টাকা (অর্থাৎ প্রতি লাখে ১,২৫০ টাকা)'],
          ['৪ লাখ টাকার অতিরিক্ত দেনমোহর', 'পরবর্তী প্রতি ১ লাখ বা অংশবিশেষের জন্য মাত্র ১০০ টাকা'],
          ['সর্বনিম্ন সরকারি নিবন্ধন ফি', '২০০ টাকা (দেনমোহর কম হলেও সর্বনিম্ন ২০০ টাকা প্রযোজ্য)'],
          ['রসিদ ও সনদ যাচাই', 'কাজী অফিসের সরকারি রসিদ বহি ও নিবন্ধিত নিকাহনামা (ফরম-ডি)'],
        ],
      };
    }
    if (/কোর্ট ম্যারেজ|কোট মেরেজ|বিশেষ বিবাহ|court-marriage/.test(s)) {
      return {
        heading: 'এক নজরে মূল তথ্য (Quick Answer Table)',
        col1: 'বিষয় / প্রয়োজনীয়তা',
        col2: 'আইনি বিধান ও সরকারি হিসাব (২০২৬)',
        rows: [
          ['আইনগত ভিত্তি', 'মুসলিম পারিবারিক আইন ১৯৬১ (কাবিননামা বাধ্যতামূলক) / বিশেষ বিবাহ আইন ১৮৭২'],
          ['আইনগত ন্যূনতম বয়স', 'পাত্র কমপক্ষে ২১ বছর এবং পাত্রী কমপক্ষে ১৮ বছর (NID / জন্মসনদ অনুযায়ী)'],
          ['প্রয়োজনীয় কাগজপত্র', 'জাতীয় পরিচয়পত্র (NID), ৩ কপি ছবি, ২ জন প্রাপ্তবয়স্ক সাক্ষী ও হলফনামা'],
          ['নোটারি ও কাবিন মোট খরচ', 'সরকারি কাবিন ফি (লাখে ১,২৫০ টাকা) + নোটারি হলফনামা (৫০০–১,৫০০ টাকা)'],
          ['বৈধতার মূল শর্ত', 'শুধু নোটারি অ্যাফিডেভিট বিয়ে নয়; নিবন্ধিত কাজীর কাবিননামা (Nikahnama) আবশ্যক'],
        ],
      };
    }
    if (/পুলিশ ক্লিয়ারেন্স|ক্লিয়ারেন্স|জিডি|police-clearance|pcc|online-gd/.test(s)) {
      return {
        heading: 'এক নজরে মূল তথ্য (Quick Answer Table)',
        col1: 'সেবার ধরন / ধাপ',
        col2: 'সরকারি ফি, সময় ও অনলাইন পোর্টাল (২০২৬)',
        rows: [
          ['অফিসিয়াল আবেদন পোর্টাল', 'pcc.police.gov.bd (বাংলাদেশ পুলিশ ক্লিয়ারেন্স পোর্টাল)'],
          ['সরকারি চালান ফি', '৫০০ টাকা (সোনালী ব্যাংক ট্রেজারি চালান কোড: ১-২২০১-০০০১-২৬৮১ বা অনলাইন পেমেন্ট)'],
          ['প্রয়োজনীয় কাগজপত্র', 'পাসপোর্টের তথ্য পাতার কপি (মেয়াদ ন্যূনতম ৩ মাস) ও জাতীয় পরিচয়পত্র (NID)'],
          ['ভেরিফিকেশন ও ডেলিভারি সময়', 'সাধারণত ৭ থেকে ১৫ কার্যদিবস (থানা ভেরিফিকেশন ও SP/DC কাউন্টার সাইনসহ)'],
          ['অনলাইন স্ট্যাটাস চেক', 'pcc.police.gov.bd পোর্টালে পাসপোর্ট বা রেফারেন্স নম্বর দিয়ে চেক'],
        ],
      };
    }
    if (/বাটোয়ারা|বন্টন মামলা|batwara|partition/.test(s)) {
      return {
        heading: 'এক নজরে মূল তথ্য (Quick Answer Table)',
        col1: 'মামলার বিষয়',
        col2: 'দেওয়ানি আদালত বিধান ও খরচ (২০২৬)',
        rows: [
          ['প্রযোজ্য আইন', 'দ্য পার্টিশন অ্যাক্ট ১৮৯৩ ও দেওয়ানি কার্যবিধি ১৯০৮ (CPC)'],
          ['সরকারি কোর্ট ফি (Court Fee)', 'স্থির কোর্ট ফি (Fixed Court Fee) সাধারণত ১০০ টাকা থেকে ৩০০ টাকা'],
          ['মামলার দুটি প্রধান ধাপ', '১. প্রাথমিক ডিক্রি (Preliminary Decree - অংশ নির্ধারণ) ও ২. চূড়ান্ত ডিক্রি (সরেজমিন সীমানা ভাগ)'],
          ['আনুমানিক সময়সীমা', 'আপস-মীমাংসায় ৩–৬ মাস; প্রতিদ্বন্দ্বিতামূলক মামলায় ১–৩ বছর'],
          ['খতিয়ান ও ম্যাপ যাচাই পোর্টাল', 'eporcha.gov.bd, dlrms.land.gov.bd ও land.gov.bd'],
        ],
      };
    }
    if (/তালাক|ডিভোর্স|খোলা তালাক|talak|talaq|divorce/.test(s)) {
      return {
        heading: 'এক নজরে মূল তথ্য (Quick Answer Table)',
        col1: 'তালাকের ধাপ / বিষয়',
        col2: 'বাংলাদেশ পারিবারিক আইন বিধান (২০২৬)',
        rows: [
          ['প্রযোজ্য আইন', 'মুসলিম পারিবারিক আইন অধ্যাদেশ, ১৯৬১ (ধারা ৭ ও ৮) ও পারিবারিক আদালত আইন ২০২৩'],
          ['স্ত্রীর তালাক দেওয়ার ক্ষমতা', 'কাবিননামার ১৮ নং কলামে ক্ষমতা থাকলে "তালাক-ই-তৌফিজ" অথবা পারিবারিক আদালতে/খোলা তালাক'],
          ['তালাক কার্যকর হওয়ার সময়', 'ইউনিয়ন পরিষদ চেয়ারম্যান / সিটি মেয়র বরাবর নোটিশ পৌঁছানোর দিন থেকে ৯০ দিন'],
          ['দেনমোহর ও ইদ্দতকালীন খোরপোষ', 'তালাক-ই-তৌফিজেও স্ত্রী সম্পূর্ণ বকেয়া দেনমোহর ও ৯০ দিনের ইদ্দত খোরপোষ পাবেন'],
          ['নিবন্ধন ও সনদ', '৯০ দিন পূর্ণ হলে কাজী অফিসে তালাক রেজিস্ট্রেশন ও তালাক সনদ গ্রহণ'],
        ],
      };
    }
    if (/নামজারি|খারিজ|মিউটেশন|খতিয়ান|পর্চা|namjari|kharij|mutation|khatian|porcha/.test(s)) {
      return {
        heading: 'এক নজরে মূল তথ্য (Quick Answer Table)',
        col1: 'সেবার বিবরণ',
        col2: 'সরকারি ফি, সময় ও অফিসিয়াল পোর্টাল (২০২৬)',
        rows: [
          ['অফিসিয়াল অনলাইন পোর্টাল', 'mutation.land.gov.bd, land.gov.bd, dlrms.land.gov.bd ও eporcha.gov.bd'],
          ['মোট সরকারি নামজারি ফি', '১,১৭০ টাকা (কোর্ট ফি ২০ + নোটিশ ৫০ + রেকর্ড সংশোধন ১,০০০ + খতিয়ান ১০০ টাকা)'],
          ['নিষ্পত্তির নির্ধারিত সময়', 'সাধারণত ২৮ কার্যদিবস (প্রবাসীদের জন্য দ্রুত নিষ্পত্তির বিশেষ ব্যবস্থা)'],
          ['ভূমি সেবা হটলাইন', '১৬১২২ (কল সেন্টার) — ২৪ ঘণ্টা সরকারি ভূমি তথ্য ও অভিযোগ'],
          ['অনলাইন খতিয়ান ও ডিসিআর', 'অনলাইন পেমেন্টের পর কিউআর কোডযুক্ত ই-খতিয়ান ও DCR ডাউনলোড'],
        ],
      };
    }
    return {
      heading: 'এক নজরে মূল তথ্য (Quick Answer Table)',
      col1: 'আইনি বিষয় / মানদণ্ড',
      col2: 'বাংলাদেশ আইন ও সরকারি বিধান (২০২৬)',
      rows: [
        ['প্রযোজ্য আইন ও আদালত', 'বাংলাদেশ দণ্ডবিধি ১৮৬০, ফৌজদারি কার্যবিধি ১৮৯৮ (CrPC) ও সুপ্রিম কোর্ট হাইকোর্ট বিভাগ'],
        ['আগাম ও নিয়মিত জামিন', 'হাইকোর্ট বিভাগে আগাম জামিন (ধারা ৪৯৮ CrPC) ও ম্যাজিস্ট্রেট/দায়রা আদালতে নিয়মিত জামিন'],
        ['সরকারি পোর্টাল ও যাচাই', 'supremecourt.gov.bd, judiciary.gov.bd, pcc.police.gov.bd ও land.gov.bd'],
        ['জরুরি আইনি পরামর্শ চেম্বার', 'অ্যাডভোকেট মো. শাহ আলম (বাংলাদেশ সুপ্রিম কোর্ট) — ০১৭১২-৬৫৫৫৪৬'],
      ],
    };
  }

  // English Quick Answer Tables
  if (/cyber|facebook|hack|blackmail|bkash/.test(s)) {
    return {
      heading: 'Quick Answer Table — Key Legal Facts at a Glance (2026)',
      col1: 'Service / Legal Channel',
      col2: 'Official Bangladesh Portal, Helpline & Procedure',
      rows: [
        ['Governing Law', 'Cyber Security Act, 2023 & Penal Code, 1860 (Bangladesh)'],
        ['First Step at Police Station', 'File an Online or In-Person General Diary (GD) at gd.police.gov.bd / local Thana'],
        ['Police Cyber Support for Women (PCSW)', 'Helpline: 01320-000888 | Email: cybersupport.women@police.gov.bd'],
        ['CID / CTTC Cyber Crime Unit', '24/7 Emergency: 999 | Police Headquarters & Cyber Tribunal Dhaka'],
        ['Required Digital Evidence', 'Full URLs, unedited screenshots, transaction IDs (bKash/Nagad), and call logs'],
      ],
    };
  }
  if (/registration|deed|flat-registration|stamp-duty/.test(s)) {
    return {
      heading: 'Quick Answer Table — Key Legal Facts at a Glance (2026)',
      col1: 'Fee / Tax Component',
      col2: 'Official Government Rate & Portal (Bangladesh 2026)',
      rows: [
        ['Registration Fee & Stamp Duty', '1% Registration Fee + 1.5% Stamp Duty on deed value'],
        ['Local Government Tax & VAT', '2%–3% Local Govt Tax + 1.5%–4.5% VAT (varies by City/Pourosova/Union)'],
        ['Source Tax (Gain Tax / TDS)', '1% to 8% depending on mouza classification under Income Tax Act 2023'],
        ['Official Land & Mouza Portals', 'land.gov.bd, dlrms.land.gov.bd, and eporcha.gov.bd'],
      ],
    };
  }
  if (/namjari|mutation|khatian|porcha|dlrms|eporcha/.test(s)) {
    return {
      heading: 'Quick Answer Table — Key Legal Facts at a Glance (2026)',
      col1: 'Mutation / Khatian Metric',
      col2: 'Official Government Fee & Portal (2026)',
      rows: [
        ['Official Government Portals', 'land.gov.bd, mutation.land.gov.bd, dlrms.land.gov.bd & eporcha.gov.bd'],
        ['Total Official E-Namjari Fee', 'BDT 1,170 (Court fee 20 + Notice 50 + Record fee 1,000 + Khatian 100)'],
        ['Standard Processing Time', '28 Working Days (9–12 working days for NRB / expatriate applicants)'],
        ['National Land Helpline', '16122 (24/7 Ministry of Land Call Center)'],
      ],
    };
  }
  return {
    heading: 'Quick Answer Table — Key Legal Facts at a Glance (2026)',
    col1: 'Legal Parameter',
    col2: 'Bangladesh Statutory Provision & Court Procedure (2026)',
    rows: [
      ['Governing Statute', 'Code of Criminal Procedure 1898 (Sections 496, 497, 498, 499) & Penal Code 1860'],
      ['Bail & Surety Requirement', 'Execution of Form-42 Bail Bond (PR Bond / Jamindar Surety) upon court bail order'],
      ['Official Portals', 'supremecourt.gov.bd, judiciary.gov.bd, pcc.police.gov.bd & land.gov.bd'],
      ['Supreme Court Chamber', 'Advocate Md. Shah Alam — Uttara & Dhaka Judge Court (+880 1712-655546)'],
    ],
  };
}

/** Serialise for an inline <script type="application/ld+json"> (prevents </script> breakout). */
export function jsonLd(obj) {
  return JSON.stringify(obj).replace(/</g, '\\u003c');
}
