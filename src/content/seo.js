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
            title: 'Trusted Lawyer in Bangladesh (2026) – Criminal, Divorce & Bail Expert | Uttara Chamber',
            desc: 'Trusted lawyer in Bangladesh for criminal, divorce and bail cases. Visit our Uttara chamber in Dhaka for expert legal consultation.',
        },
        blog: {
            title: 'Free Legal Guides Bangladesh – Criminal, Divorce & Property Law | Adv. Shah Alam',
            desc: 'Free legal guides on bail, divorce, land disputes & criminal law in Bangladesh. Plain-language articles by Advocate Md. Shah Alam, expert lawyer in Uttara, Dhaka.',
        },
        blogBn: {
            title: 'আইনি ব্লগ – অ্যাডভোকেট মো. শাহ আলম | বাংলাদেশ আইন প্রবন্ধ',
            desc: 'বাংলাদেশের আইন বিষয়ক বিশেষজ্ঞ নিবন্ধ — ফৌজদারি, পারিবারিক, সম্পত্তি, কর্পোরেট আইন এবং আরও অনেক বিষয়ে।',
        },
        advocate: {
            title: 'Advocate Md. Shah Alam – Supreme Court Lawyer | Uttara, Dhaka',
            desc: 'Advocate Md. Shah Alam – experienced criminal, family, property & Supreme Court lawyer in Bangladesh. 10+ years of legal excellence. Contact for consultation.',
        },
        education: {
            title: 'Advocate Md. Shah Alam – Career, Education & Legal Journey | Lawyer in Bangladesh',
            desc: 'Explore the education, career timeline and professional milestones of Advocate Md. Shah Alam – LL.M lawyer practising at the Supreme Court of Bangladesh from Uttara, Dhaka.',
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
