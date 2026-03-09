/**
 * src/api/postsBn.js
 * ─────────────────────────────────────────────────────────────────
 * Blog post data layer — BN (Bangla) posts.
 * Mirrors posts.js but targets language: "bn" and the BN static data.
 * ─────────────────────────────────────────────────────────────────
 */

import { getDirectus, CMS_ENABLED, safeFetch, readItems } from './directus.js';
import staticPostsBn from '../data/blogPostsBn.js';

// Reuse isPublished equivalent for BN (all have publishedDate set)
const isPublishedBn = p => Boolean(p.publishedDate && !p._draft);

const POST_FIELDS = [
    'id', 'slug', 'enSlug', 'pairId', 'language',
    'status', 'title', 'category', 'readTime',
    'publishedDate',
    'metaTitle', 'metaDescription', 'keywords',
    'heroIntro', 'toc', 'sections', 'faqs', 'relatedServiceLinks',
    'featuredImage.*', 'featuredImageAlt',
    'canonicalUrl',
];

function normalise(record) {
    return {
        slug:            record.slug,
        enSlug:          record.enSlug ?? undefined,
        pairId:          record.pairId ?? undefined,
        title:           record.title,
        category:        record.category,
        readTime:        record.readTime ?? '৫ মিনিট',
        metaTitle:       record.metaTitle,
        metaDescription: record.metaDescription,
        keywords:        record.keywords ?? [],
        publishedDate:   record.publishedDate,
        heroIntro:       record.heroIntro ?? '',
        toc:             record.toc ?? [],
        sections:        record.sections ?? [],
        faqs:            record.faqs ?? [],
        relatedServiceLinks: record.relatedServiceLinks ?? [],
        featuredImage:   record.featuredImage?.id
            ? `${import.meta.env.VITE_DIRECTUS_URL}/assets/${record.featuredImage.id}`
            : null,
        featuredImageAlt: record.featuredImageAlt ?? record.title,
        canonicalUrl:    record.canonicalUrl ?? null,
    };
}

export async function getAllPostsBn() {
    if (!CMS_ENABLED) {
        return staticPostsBn.filter(isPublishedBn);
    }

    const client = getDirectus();
    const data = await safeFetch(() =>
        client.request(readItems('blog_posts', {
            fields: POST_FIELDS,
            filter: { status: { _eq: 'published' }, language: { _eq: 'bn' } },
            sort: ['-publishedDate'],
            limit: -1,
        }))
    );

    if (!data) return staticPostsBn.filter(isPublishedBn);
    return data.map(normalise);
}

export async function getPostBnBySlug(slug) {
    if (!CMS_ENABLED) {
        return staticPostsBn.find(p => p.slug === slug && isPublishedBn(p));
    }

    const client = getDirectus();
    const data = await safeFetch(() =>
        client.request(readItems('blog_posts', {
            fields: POST_FIELDS,
            filter: {
                slug:     { _eq: slug },
                language: { _eq: 'bn' },
                status:   { _eq: 'published' },
            },
            limit: 1,
        }))
    );

    if (!data || data.length === 0) {
        return staticPostsBn.find(p => p.slug === slug && isPublishedBn(p));
    }
    return normalise(data[0]);
}

export async function getRecentPostsBn(limit = 3) {
    const all = await getAllPostsBn();
    return all.slice(0, limit);
}
