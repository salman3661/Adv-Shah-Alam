/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  src/data/relatedServices.js — Centralized service links    ║
 * ║  Used by all service pages for cross-linking.               ║
 * ║  Each service page picks all OTHER services from this list. ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

const ALL_SERVICES = [
    { label: 'Criminal Lawyer – Dhaka',                slug: 'criminal-lawyer',          to: '/services/criminal-lawyer' },
    { label: 'Bail Lawyer – Fast Applications',        slug: 'bail-lawyer',              to: '/services/bail-lawyer' },
    { label: 'Divorce & Family Lawyer – Dhaka',        slug: 'divorce-lawyer',           to: '/services/divorce-lawyer' },
    { label: 'Land & Property Lawyer – Dhaka',         slug: 'land-lawyer',              to: '/services/land-lawyer' },
    { label: 'Supreme Court Lawyer – Bangladesh',      slug: 'supreme-court-lawyer',     to: '/services/supreme-court-lawyer' },
    { label: 'Company & Corporate Lawyer – Dhaka',     slug: 'company-corporate-lawyer', to: '/services/company-corporate-lawyer' },
    { label: 'Tax & VAT Lawyer – Bangladesh',          slug: 'tax-lawyer',               to: '/services/tax-lawyer' },
];

/**
 * Returns all services EXCEPT the one with the given slug.
 * @param {string} currentSlug - slug of the current service page
 */
export function getRelatedServices(currentSlug) {
    return ALL_SERVICES.filter(s => s.slug !== currentSlug);
}

export default ALL_SERVICES;
