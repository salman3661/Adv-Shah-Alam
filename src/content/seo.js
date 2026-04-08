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
    siteUrl: 'https://www.advmdshahalam.me',

    defaultTitle: 'Trusted Lawyer in Bangladesh (2026) – Criminal, Divorce & Bail Expert | Uttara Chamber',
    defaultDesc: 'Trusted lawyer in Bangladesh for criminal, divorce and bail cases. Visit our Uttara chamber in Dhaka for expert legal consultation.',
    defaultOgImage: 'https://www.advmdshahalam.me/images/hero/hero-md-shah-alam.png',
    defaultOgImageAlt: 'Advocate Md. Shah Alam – Trusted Lawyer in Bangladesh | Uttara Chamber',

    // ─── Twitter / X card ───────────────────────────────────────────
    twitterCardType: 'summary_large_image',  // or 'summary'
    twitterHandle: null,                   // add @handle if you have one

    // ─── Per-page meta overrides ─────────────────────────────────────
    // These values MUST match what each page's <Helmet> actually outputs.
    pages: {
        home: {
            title: 'Trusted Lawyer in Bangladesh | Advocate Shah Alam',                     // 50 chars
            desc:  'Advocate Shah Alam is a trusted lawyer in Bangladesh for criminal, divorce, bail & land cases. Visit our Uttara chamber in Dhaka – 20+ years of legal excellence.',
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
            criminal:    { title: 'Criminal Lawyer in Bangladesh | Advocate Shah Alam',     // 51 chars
                           desc:  'Arrested or facing criminal charges? Advocate Shah Alam provides expert criminal defence, FIR help and bail in Uttara – Dhaka, Bangladesh. Call now.' },
            bail:        { title: 'Bail Lawyer in Dhaka | Advocate Shah Alam, Bangladesh',  // 54 chars
                           desc:  'Need urgent release? Get help from a top Bail Lawyer in Dhaka. We secure same-day and anticipatory bail fast. Meet Adv. Shah Alam at his Uttara Chamber now.' },
            divorce:     { title: 'Divorce & Family Lawyer Uttara | Advocate Shah Alam',    // 52 chars
                           desc:  'Need a divorce lawyer in Uttara, Dhaka? Advocate Shah Alam handles Muslim talaq, khula, child custody & maintenance in Bangladesh family courts. WhatsApp today.' },
            land:        { title: 'Land Lawyer in Uttara, Dhaka | Advocate Shah Alam',      // 50 chars
                           desc:  'Resolve land disputes, property registration & mutation in Dhaka. Expert land & property lawyer in Uttara – 20+ years experience. Free consultation. Call now.' },
            supremeCourt:{ title: 'Supreme Court Lawyer Bangladesh | Advocate Shah Alam',   // 53 chars
                           desc:  'Adv. Shah Alam is your expert Supreme Court lawyer in Bangladesh for writ petitions, criminal appeals, High Court bail & Appellate Division matters. Consult now.' },
            tax:         { title: 'Tax & VAT Lawyer Dhaka | Advocate Shah Alam, Bangladesh',// 56 chars
                           desc:  'Fighting a tax notice in Bangladesh? Adv. Shah Alam handles income tax appeals, VAT disputes & NBR cases in Dhaka. Experienced tax lawyer. Free consultation.' },
            company:     { title: 'Company Lawyer Dhaka, Bangladesh | Advocate Shah Alam',  // 54 chars
                           desc:  'Register a company or resolve corporate disputes in Bangladesh. Advocate Shah Alam handles RJSC filings, shareholder disputes & corporate litigation in Dhaka.' },
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
