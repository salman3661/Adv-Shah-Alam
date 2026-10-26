/**
 * Category -> cover artwork. Blog posts have no per-post image, so every post shows the artwork of its
 * legal topic in the hero, in "more articles" cards and in og:image / twitter:image share previews.
 * Files live in /public/images/covers (generated once, see scratch/make-covers.cjs).
 */
const RULES = [
    ['cyber', /সাইবার|cyber/i],
    ['criminal', /ফৌজদারি|criminal/i],
    ['immigration', /অভিবাসন|প্রবাসী|immigration|citizenship|nrb|overseas/i],
    ['family', /পারিবারিক|family/i],
    ['land', /ভূমি|সম্পত্তি|জমি|land|property|real estate|inheritance/i],
    ['business', /কর |কর$|corporate|business|company|banking|commercial|tax|finance/i],
    ['civil', /দেওয়ানি|দেওয়ani|civil|litigation|procedure|supreme|constitutional|document/i],
];

export const SITE_ORIGIN = 'https://www.advmdshahalam.me';

export function coverKey(category = '') {
    const c = String(category);
    for (const [key, re] of RULES) if (re.test(c)) return key;
    return 'general';
}

export function coverFor(category) {
    return `/images/covers/${coverKey(category)}.webp`;
}

export function coverAbsolute(category) {
    return `${SITE_ORIGIN}${coverFor(category)}`;
}
