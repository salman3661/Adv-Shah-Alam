/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  src/content/seo.js — Global SEO Defaults                    ║
 * ║  These values are used as fallbacks across all pages.        ║
 * ║  Each page also has its own metaTitle + metaDescription.     ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * Best practice:
 *  - metaTitle:       max 60 characters
 *  - metaDescription: max 160 characters
 *  - ogImage:         1200×630px recommended
 */

const seo = {
    // ─── Site-level defaults (used when page doesn't specify) ───────
    siteName: 'Advocate Md. Shah Alam',
    siteUrl: 'https://advmdshahalam.me',

    defaultTitle: 'Trusted Lawyer in Bangladesh (2026) – Criminal, Divorce & Bail Expert | Uttara Chamber',
    defaultDesc: 'Trusted lawyer in Bangladesh for criminal, divorce and bail cases. Visit our Uttara chamber in Dhaka for expert legal consultation.',
    defaultOgImage: 'https://advmdshahalam.me/images/hero/hero-md-shah-alam.png',
    defaultOgImageAlt: 'Advocate Md. Shah Alam — Trusted Lawyer in Bangladesh | Uttara, Dhaka',

    // ─── Twitter / X card ───────────────────────────────────────────
    twitterCardType: 'summary_large_image',  // or 'summary'
    twitterHandle: null,                   // add @handle if you have one

    // ─── Per-page meta overrides ─────────────────────────────────────
    // These values MUST match what each page's <Helmet> actually outputs.
    pages: {
        home: {
            title: 'Trusted Lawyer in Bangladesh | Advocate Md. Shah Alam — Uttara, Dhaka',
            desc:  'Need a trusted lawyer in Bangladesh? Advocate Md. Shah Alam offers expert criminal, divorce, bail & land legal services. 20+ years experience. Free consultation at our Uttara chamber.',
        },
        blog: {
            title: 'Legal Guides Bangladesh | Advocate Shah Alam, Uttara',                  // 53 chars
            desc:  'Free legal guides on bail, divorce, land & criminal law in Bangladesh. Plain-language articles by Advocate Shah Alam, expert lawyer in Uttara, Dhaka.',
        },
        blogBn: {
            title: 'আইনি ব্লগ বাংলা | অ্যাডভোকেট মো. শাহ আলম',
            desc:  'বাংলাদেশের আইন বিষয়ক বাংলা ব্লগ — জামিন, তালাক, জমি বিরোধ, কর মামলা ও আরও অনেক বিষয়ে বিশেষজ্ঞ পরামর্শ।',
        },
        advocate: {
            title: 'Advocate Shah Alam | Lawyer in Bangladesh, Uttara',                     // 50 chars
            desc:  'Advocate Md. Shah Alam – experienced criminal, family, property & Supreme Court lawyer in Bangladesh. 10+ years of legal excellence. Contact for consultation.',
        },
        education: {
            title: 'Career & Education | Advocate Shah Alam, Bangladesh',                   // 52 chars
            desc:  'Explore the education and career timeline of Advocate Shah Alam – LL.M lawyer practising at the Supreme Court of Bangladesh with a chamber in Uttara, Dhaka.',
        },
        services: {
            criminal:    { title: 'Criminal Lawyer in Bangladesh — Expert Defence | Adv. Shah Alam',
                           desc:  'Facing criminal charges? Get expert criminal defence from Advocate Shah Alam in Dhaka. FIR, bail, trial & High Court appeals. 20+ years. Call now.' },
            bail:        { title: 'Bail Lawyer in Bangladesh — Fast Bail Applications | Adv. Shah Alam',
                           desc:  'Arrested? Get urgent bail from a top bail lawyer in Dhaka. Same-day filing, anticipatory & High Court bail. 20+ years. Contact now.' },
            divorce:     { title: 'Divorce Lawyer in Bangladesh — Family Law Expert | Adv. Shah Alam',
                           desc:  'Need a divorce lawyer in Dhaka? Talaq, khula, child custody & maintenance. 20+ years family court experience. WhatsApp consultation available.' },
            land:        { title: 'Land Lawyer in Bangladesh — Property Dispute Expert | Adv. Shah Alam',
                           desc:  'Land dispute in Bangladesh? Title suits, mutation fraud, partition cases & property registration. Expert land lawyer in Dhaka. Free consultation.' },
            supremeCourt:{ title: 'Supreme Court Lawyer in Bangladesh — High Court Expert | Adv. Shah Alam',
                           desc:  'Need a Supreme Court lawyer? Writ petitions, criminal appeals, High Court bail & Appellate Division matters. 20+ years. Consult now.' },
            tax:         { title: 'Tax & VAT Lawyer in Dhaka — NBR & Tax Tribunal | Adv. Shah Alam',
                           desc:  'Tax dispute in Bangladesh? Income tax appeals, VAT disputes & NBR cases. Experienced tax lawyer in Dhaka. Free consultation.' },
            company:     { title: 'Company & Corporate Lawyer in Bangladesh | Adv. Shah Alam',
                           desc:  'Register a company or resolve corporate disputes. RJSC filings, shareholder disputes & business litigation in Dhaka. Expert corporate counsel.' },
        },
    },

    // ─── Blog category colors ────────────────────────────────────────
    // Used in BlogPreview.jsx and Blog.jsx for the category badge.
    // Add new categories here as they are created.
    categoryColors: {
        'Criminal Law': '#EF4444',
        'Family Law': '#EC4899',
        'Property Law': '#22C55E',
        'Company & Corporate Law': '#D97706',
        'Civil Law': '#3B82F6',
        'Legal Procedures': '#8B5CF6',
        'Cyber Law': '#06B6D4',
        // Bangla
        'ফৌজদারি আইন': '#EF4444',
        'পারিবারিক আইন': '#EC4899',
        'সম্পত্তি আইন': '#22C55E',
        'দেওয়ানি আইন': '#3B82F6',
        'সাইবার আইন': '#06B6D4',
        'আইনি পদ্ধতি': '#8B5CF6',
    },

    // ─── Blog categories (for filter tabs in Blog.jsx) ───────────────
    categoriesEn: [
        'All',
        'Criminal Law',
        'Family Law',
        'Property Law',
        'Company & Corporate Law',
        'Civil Law',
        'Cyber Law',
        'Legal Procedures',
    ],
    categoriesBn: [
        'সব',
        'ফৌজদারি আইন',
        'পারিবারিক আইন',
        'সম্পত্তি আইন',
        'দেওয়ানি আইন',
        'সাইবার আইন',
        'আইনি পদ্ধতি',
    ],
};

export default seo;
