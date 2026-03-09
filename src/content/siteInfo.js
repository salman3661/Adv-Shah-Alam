/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  src/content/siteInfo.js — Chamber, Contact & Site Info      ║
 * ║                                                              ║
 * ║  PHONE / WHATSAPP numbers → edit src/data/contactInfo.js     ║
 * ║  This file handles: address, email, social, maps, bio text   ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

const siteInfo = {
    // ─── Lawyer / Firm identity ─────────────────────────────────────
    advocateName:       'Advocate Md. Shah Alam',
    advocateShortName:  'Adv. Md. Shah Alam',
    court:              'Supreme Court of Bangladesh',
    yearsExperience:    20,                          // number only
    tagline:            'Supreme Court of Bangladesh',

    // ─── Chamber / Office address ───────────────────────────────────
    /** Displayed in footer, about section, contact section, and schema markup */
    chamberAddress:     'Ainjeebi Samity Bhaban, 4th Floor, 6/7 Court House Street, Kotwali, Dhaka-1100',

    /** Used by clients coming to the office — Sector 12, Uttara */
    practiceAddress:    'Mantrust Nazma Monzil, Sector 12, Uttara West, Dhaka-1230',

    /** Office hours (text, shown in contact section) */
    officeHours:        'Sat – Thu: 9:00 AM – 9:00 PM',

    // ─── Contact links ──────────────────────────────────────────────
    // Phone and WhatsApp → edit src/data/contactInfo.js (centralized)

    email:              'shahalam0332@gmail.com',
    facebookUrl:        'https://www.facebook.com/advmd.shahalamfb',
    googleMapsUrl:      'https://maps.app.goo.gl/M3NXMwW3xkp2TE3h8',
    googleMapsEmbed:    null,  // paste Google Maps iframe src here if you want to embed a map

    // ─── Footer bio text ────────────────────────────────────────────
    footerBio:
        'Trusted advocate in Uttara, Dhaka with 20+ years of legal excellence across criminal, civil, and family law.',

    // ─── Copyright text ─────────────────────────────────────────────
    /** Use {year} as a placeholder — it will be replaced with the current year */
    copyrightText: '© {year} Advocate Md. Shah Alam. All Rights Reserved.',

    // ─── Google Business ────────────────────────────────────────────
    googleBusinessLabel: '⭐ Google Business Profile',

    // ─── Footer service links (shown in Practice Areas column) ─────
    footerServiceLinks: [
        { name: 'Criminal Lawyer in Uttara',    path: '/services/criminal-lawyer' },
        { name: 'Divorce & Family Lawyer',       path: '/services/divorce-lawyer' },
        { name: 'Land & Property Lawyer',        path: '/services/land-lawyer' },
        { name: 'Bail Lawyer in Dhaka',          path: '/services/bail-lawyer' },
        { name: 'Supreme Court Lawyer',          path: '/services/supreme-court-lawyer' },
        { name: 'Company & Corporate Law',       path: '/services/company-corporate-lawyer' },
    ],
};

export default siteInfo;
