/**
 * Which article gets which calculator, and where it is inserted.
 * `afterHeading` - the widget is placed after the first section whose heading matches this pattern;
 *                  falls back to the middle of the article.
 */
export const FEE_CALCULATORS = {
    // Bengali pillars
    'jomi-registry-khoroch-sarkaree-fee-bd': { type: 'land', lang: 'bn', afterHeading: /গাণিতিক/ },
    'court-marriage-kagojpatra-complete-guide-2026': { type: 'marriage', lang: 'bn', afterHeading: /খরচ/ },
    // English pillar (hreflang partner of the court-marriage master)
    'court-marriage-procedure-bangladesh': { type: 'marriage', lang: 'en', afterHeading: /cost/i },
};

/** Index of the section after which the calculator should be rendered (or -1 when the post has none). */
export function calculatorSectionIndex(slug, sections = []) {
    const cfg = FEE_CALCULATORS[slug];
    if (!cfg || !sections.length) return -1;
    const heading = (s) => String(s.heading || s.h2 || s.title || '');
    const idx = sections.findIndex((s) => cfg.afterHeading.test(heading(s)));
    return idx >= 0 ? idx : Math.floor((sections.length - 1) / 2);
}
