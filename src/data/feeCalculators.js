/**
 * Phase 5.1: Interactive Legal Calculator configuration.
 * Maps pillar pages to the interactive calculator type:
 *  - 'land'        : Land & Flat Registration Fee Calculator (2026 Gazette)
 *  - 'inheritance' : Muslim Inheritance / Faraiz Share Calculator (Son/Daughter/Spouse/Parents)
 *  - 'kabinnama'   : Kabinnama / Marriage Registration Government Fee Calculator (Per Lakh BDT)
 *  - 'marriage'    : Court Marriage & Nikahnama Total Cost Estimator
 */
export const FEE_CALCULATORS = {
    // 1. Land & Flat Registration Fee Calculators
    'jomi-registry-khoroch-sarkaree-fee-bd': { type: 'land', lang: 'bn', afterIntro: true },
    'jomi-nibandhon-fee-2026-bn': { type: 'land', lang: 'bn', afterIntro: true },
    'flat-registration-fee-bangladesh-2026': { type: 'land', lang: 'bn', afterIntro: true },
    'land-registration-fee-calculator-bangladesh-2026': { type: 'land', lang: 'bn', afterIntro: true },
    'land-registration-cost-fees-calculator-bangladesh-2026': { type: 'land', lang: 'en', afterIntro: true },

    // 2. Muslim Inheritance / Faraiz Share Calculators
    'sampatti-uttoradhikar-ain-2026-bn': { type: 'inheritance', lang: 'bn', afterIntro: true },
    'mayer-sampatti-vibhajan-ain-bangladesh-2026': { type: 'inheritance', lang: 'bn', afterIntro: true },
    'babar-sampatti-banton-ain-bangladesh-2026': { type: 'inheritance', lang: 'bn', afterIntro: true },
    'mayer-sampatti-vibhajan-ain-shathik-niyom': { type: 'inheritance', lang: 'bn', afterIntro: true },
    'muslim-uttaradhikar-ain-faraiz-calculator-bangladesh-2026': { type: 'inheritance', lang: 'bn', afterIntro: true },
    'father-property-distribution-law-bangladesh-2026': { type: 'inheritance', lang: 'en', afterIntro: true },

    // 3. Kabinnama / Marriage Govt Fee Calculators
    'biye-notun-ain-2026-kabinnama-sarkari-fee-hisab': { type: 'kabinnama', lang: 'bn', afterIntro: true },
    'kabinnama-fee-koto-2026': { type: 'kabinnama', lang: 'bn', afterIntro: true },
    'court-marriage-kagojpatra-complete-guide-2026': { type: 'marriage', lang: 'bn', afterIntro: true },
    'court-marriage-procedure-bangladesh': { type: 'marriage', lang: 'en', afterIntro: true },
};

/**
 * Index of the section after which the calculator should be rendered:
 *  - -2 when `afterIntro: true` (rendered right after the introduction / Quick Answer Table)
 *  - >= 0 when matched to a specific section heading
 *  - -1 when the post has no calculator
 */
export function calculatorSectionIndex(slug, sections = []) {
    const cfg = FEE_CALCULATORS[slug];
    if (!cfg) return -1;
    if (cfg.afterIntro) return -2;
    if (!sections.length) return -1;
    const heading = (s) => String(s.heading || s.h2 || s.title || '');
    const idx = cfg.afterHeading ? sections.findIndex((s) => cfg.afterHeading.test(heading(s))) : -1;
    return idx >= 0 ? idx : 0;
}
