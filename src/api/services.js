/**
 * src/api/services.js
 * ─────────────────────────────────────────────────────────────────
 * Service page data layer.
 * Falls back to hardcoded values (from JSX props) when CMS is off.
 * ─────────────────────────────────────────────────────────────────
 */

import { getDirectus, CMS_ENABLED, safeFetch, readItems, readSingleton } from './directus.js';

const SERVICE_FIELDS = [
    'id', 'status', 'slug', 'h1', 'intro', 'coverage', 'contextNote',
    'faqItems', 'ctaText', 'metaTitle', 'metaDesc', 'canonicalUrl',
    'featuredImage.*', 'featuredImageAlt', 'date_updated',
];

function normalise(record) {
    return {
        slug:       record.slug,
        h1:         record.h1,
        intro:      record.intro,
        coverage:   record.coverage ?? [],
        contextNote:record.contextNote ?? null,
        faqItems:   record.faqItems ?? [],
        ctaText:    record.ctaText ?? 'Talk to Our Lawyer',
        metaTitle:  record.metaTitle,
        metaDesc:   record.metaDesc,
        canonicalUrl: record.canonicalUrl,
        featuredImage: record.featuredImage?.id
            ? `${import.meta.env.VITE_DIRECTUS_URL}/assets/${record.featuredImage.id}`
            : null,
        featuredImageAlt: record.featuredImageAlt ?? record.h1,
    };
}

/**
 * Get all published services (for listings/nav).
 */
export async function getAllServices() {
    if (!CMS_ENABLED) return null; // components handle their own props when CMS off
    const client = getDirectus();
    const data = await safeFetch(() =>
        client.request(readItems('services', {
            fields: SERVICE_FIELDS,
            filter: { status: { _eq: 'published' } },
            sort: ['id'],
            limit: -1,
        }))
    );
    return data ? data.map(normalise) : null;
}

/**
 * Get a single service by slug.
 * Returns null when CMS is off (component uses its own JSX props).
 */
export async function getServiceBySlug(slug) {
    if (!CMS_ENABLED) return null;
    const client = getDirectus();
    const data = await safeFetch(() =>
        client.request(readItems('services', {
            fields: SERVICE_FIELDS,
            filter: { slug: { _eq: slug }, status: { _eq: 'published' } },
            limit: 1,
        }))
    );
    if (!data || data.length === 0) return null;
    return normalise(data[0]);
}
