/**
 * src/api/posts.js
 * ─────────────────────────────────────────────────────────────────
 * Blog post data layer — EN posts.
 *
 * Priority:
 *  1. If CMS_ENABLED → fetch from Directus API
 *  2. Else → use static src/data/blogPosts.js (existing data)
 *
 * Every function returns the exact same shape as the existing
 * blogPosts.js records, so existing components need zero changes.
 * ─────────────────────────────────────────────────────────────────
 */

import { getDirectus, CMS_ENABLED, safeFetch, readItems, readItem } from './directus.js';
import staticPosts, { isPublished } from '../data/blogPosts.js';

// ─── Field list to request from Directus ─────────────────────────
const POST_FIELDS = [
    'id', 'slug', 'enSlug', 'pairId', 'language',
    'status', 'title', 'category', 'readTime',
    'publishedDate', 'scheduledDate',
    'metaTitle', 'metaDescription', 'keywords',
    'heroIntro', 'toc', 'sections', 'faqs', 'relatedServiceLinks',
    'featuredImage.*', 'featuredImageAlt',
    'canonicalUrl', 'ogTitle', 'ogDescription',
];

// ─── Normalise a Directus post record → same shape as blogPosts.js ─
function normalise(record) {
    return {
        slug:            record.slug,
        enSlug:          record.enSlug ?? undefined,
        pairId:          record.pairId ?? undefined,
        title:           record.title,
        category:        record.category,
        readTime:        record.readTime ?? '5 min read',
        metaTitle:       record.metaTitle,
        metaDescription: record.metaDescription,
        keywords:        record.keywords ?? [],
        publishedDate:   record.publishedDate,
        heroIntro:       record.heroIntro ?? '',
        toc:             record.toc ?? [],
        sections:        record.sections ?? [],
        faqs:            record.faqs ?? [],
        relatedServiceLinks: record.relatedServiceLinks ?? [],
        // Extra CMS fields (available to new components)
        featuredImage:   record.featuredImage?.id
            ? `${import.meta.env.VITE_DIRECTUS_URL}/assets/${record.featuredImage.id}`
            : null,
        featuredImageAlt: record.featuredImageAlt ?? record.title,
        canonicalUrl:    record.canonicalUrl ?? null,
    };
}

// ─── Public API ───────────────────────────────────────────────────

/**
 * Get all published EN posts (sorted by date desc).
 * Returns the same array shape as blogPosts.js default export.
 */
export async function getAllPosts() {
    if (!CMS_ENABLED) {
        return staticPosts.filter(isPublished);
    }

    const client = getDirectus();
    const data = await safeFetch(() =>
        client.request(readItems('blog_posts', {
            fields: POST_FIELDS,
            filter: { status: { _eq: 'published' }, language: { _eq: 'en' } },
            sort: ['-publishedDate'],
            limit: -1,
        }))
    );

    if (!data) return staticPosts.filter(isPublished); // fallback
    return data.map(normalise);
}

/**
 * Get a single EN post by slug.
 * Returns undefined if not found (same as .find() on the static array).
 */
export async function getPostBySlug(slug) {
    if (!CMS_ENABLED) {
        return staticPosts.find(p => p.slug === slug && isPublished(p));
    }

    const client = getDirectus();
    const data = await safeFetch(() =>
        client.request(readItems('blog_posts', {
            fields: POST_FIELDS,
            filter: {
                slug:     { _eq: slug },
                language: { _eq: 'en' },
                status:   { _eq: 'published' },
            },
            limit: 1,
        }))
    );

    if (!data || data.length === 0) {
        return staticPosts.find(p => p.slug === slug && isPublished(p));
    }
    return normalise(data[0]);
}

/**
 * Get N most recent published EN posts (for BlogPreview homepage widget).
 */
export async function getRecentPosts(limit = 3) {
    if (!CMS_ENABLED) {
        return staticPosts.filter(isPublished).slice(0, limit);
    }
    const all = await getAllPosts();
    return all.slice(0, limit);
}

/**
 * Get posts filtered by category.
 */
export async function getPostsByCategory(category) {
    const all = await getAllPosts();
    if (!category || category === 'All') return all;
    return all.filter(p => p.category === category);
}

// ─── Keep backward-compat with sync imports ──────────────────────
// Some existing code does: import blogPosts from '../data/blogPosts.js'
// Those files will continue to work — they use the static data directly.
// Only components that are updated to use hooks will get CMS data.
