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
    // These are defaults — each page can override any field.
    pages: {
        home: {
            title: 'Trusted Lawyer in Bangladesh (2026) – Criminal, Divorce & Bail Expert | Uttara Chamber',
            desc: 'Trusted lawyer in Bangladesh for criminal, divorce and bail cases. Visit our Uttara chamber in Dhaka for expert legal consultation.',
        },
        blog: {
            title: 'Legal Blog – Advocate Md. Shah Alam | Law Articles Bangladesh',
            desc: 'Read expert legal articles on criminal law, family law, property disputes, civil law, and company & corporate law in Bangladesh by Advocate Md. Shah Alam.',
        },
        blogBn: {
            title: 'আইনি ব্লগ – অ্যাডভোকেট মো. শাহ আলম | বাংলাদেশ আইন প্রবন্ধ',
            desc: 'বাংলাদেশের আইন বিষয়ক বিশেষজ্ঞ নিবন্ধ — ফৌজদারি, পারিবারিক, সম্পত্তি, কর্পোরেট আইন এবং আরও অনেক বিষয়ে।',
        },
        advocate: {
            title: 'Advocate Md. Shah Alam – Supreme Court Advocate, Uttara, Dhaka',
            desc: 'Advocate Md. Shah Alam is a Supreme Court advocate based in Uttara, Dhaka with 20+ years of experience in criminal, civil, family, and corporate law across Bangladesh.',
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
