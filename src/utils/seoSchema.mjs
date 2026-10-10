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
 * Reciprocal hreflang set for a blog article.
 *  - paired article  : self + partner + x-default (English is the default-language version)
 *  - unpaired article: self only (no misleading x-default pointing at the homepage)
 * @returns {Array<{hrefLang:string, href:string}>}
 */
export function buildHreflang({ lang, slug, pairedSlug }) {
  const enUrl = (s) => `${SITE}/blog/${s}`;
  const bnUrl = (s) => `${SITE}/bn/blog/${s}`;
  if (lang === 'en') {
    const tags = [
      { hrefLang: 'en', href: enUrl(slug) },
      { hrefLang: 'x-default', href: enUrl(slug) },
    ];
    if (pairedSlug) tags.push({ hrefLang: 'bn', href: bnUrl(pairedSlug) });
    return tags;
  }
  const tags = [{ hrefLang: 'bn', href: bnUrl(slug) }];
  if (pairedSlug) {
    tags.push({ hrefLang: 'en', href: enUrl(pairedSlug) });
    tags.push({ hrefLang: 'x-default', href: enUrl(pairedSlug) });
  }
  return tags;
}

/** Serialise for an inline <script type="application/ld+json"> (prevents </script> breakout). */
export function jsonLd(obj) {
  return JSON.stringify(obj).replace(/</g, '\\u003c');
}
