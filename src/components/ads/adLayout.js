import { useLayoutEffect, useEffect, useState } from 'react';

/**
 * AdSense layout constants + helpers for article pages (BlogPost / BlogPostBn).
 *
 * Active layout (3 units - spec "High-Viewability Ad Layout"):
 *   Unit 1  topInArticle  responsive display, injected after the 2nd paragraph (below the first H2)
 *   Unit 2  sidebar       sticky sidebar (desktop >= 901px)   |   midNative: native in-article after the 5th paragraph (mobile)
 *   Unit 3  calculator    sits inside the Fee Calculator widget (pages that have one)
 */
export const AD_SLOTS = {
    topInArticle: '8630877987',
    sidebar: '5064091502',
    midNative: '9118178745',
    calculator: '5230990345',
};

/**
 * DECOMMISSIONED units (telemetry: non-performing). Kept here only as a tombstone so nobody re-adds them.
 *   3423084657 Article Body 3 | 1128008083 Article Body 4 | 3667074343 Article Bottom Grid (multiplex)
 */
export const PURGED_SLOTS = ['3423084657', '1128008083', '3667074343'];

/** Breakpoint shared with the .bp-sidebar / .bpbn-sidebar CSS (sidebar is hidden at <= 900px). */
export const DESKTOP_QUERY = '(min-width: 901px)';

export function useMediaQuery(query) {
    const get = () => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query).matches : false);
    const [matches, setMatches] = useState(get);
    useEffect(() => {
        if (typeof window === 'undefined' || !window.matchMedia) return undefined;
        const mql = window.matchMedia(query);
        const onChange = () => setMatches(mql.matches);
        onChange();
        mql.addEventListener ? mql.addEventListener('change', onChange) : mql.addListener(onChange);
        return () => (mql.removeEventListener ? mql.removeEventListener('change', onChange) : mql.removeListener(onChange));
    }, [query]);
    return matches;
}

/**
 * Finds the Nth top-level paragraph of the rendered article body and inserts an empty anchor <div> after it.
 * Returns { [id]: HTMLElement } so the caller can render <AdSenseAd/> into each anchor with createPortal.
 *
 * Why DOM anchors instead of splitting the HTML string: article bodies are CMS HTML; splitting at "</p>"
 * can cut inside callout boxes / lists and corrupt nesting. Anchors never touch the markup.
 *
 * @param rootRef   ref of the <article> element
 * @param specs     [{ id, n, fallbackToLast?, skip? }]  n = 1-based paragraph index across the whole article
 * @param depKey    re-run key (post slug + any layout flags)
 */
export function useParagraphAnchors(rootRef, specs, depKey) {
    const [anchors, setAnchors] = useState({});
    useLayoutEffect(() => {
        const root = rootRef.current;
        if (!root) { setAnchors({}); return undefined; }
        const paras = Array.from(root.querySelectorAll('.prose-bn-content > p, .prose-content > p'))
            .filter((p) => p.textContent.trim().length >= 40);
        const created = [];
        const next = {};
        const used = new Set();
        for (const s of specs) {
            if (s.skip) continue;
            let target = paras[s.n - 1] || (s.fallbackToLast ? paras[paras.length - 1] : null);
            if (!target || used.has(target)) continue;
            used.add(target);
            const el = document.createElement('div');
            el.setAttribute('data-ad-anchor', s.id);
            el.style.clear = 'both';
            target.insertAdjacentElement('afterend', el);
            created.push(el);
            next[s.id] = el;
        }
        setAnchors(next);
        return () => { created.forEach((el) => el.remove()); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [depKey]);
    return anchors;
}
