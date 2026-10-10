import React, { useEffect, useRef, useState } from 'react';

/**
 * AdSenseAd — production Google AdSense unit.
 *
 * Props:
 *  slot         — Ad unit slot ID
 *  format       — 'auto' | 'fluid' | 'autorelaxed'
 *  layout       — 'in-article' | ''
 *  layoutKey    — layout key for in-feed units
 *  responsive   — boolean (default true)
 *  className    — extra CSS class
 *  style        — extra inline style
 *  label        — boolean (default true) — show "বিজ্ঞাপন" / "Advertisement"
 *  labelText    — override label text
 *  minHeight    — px reserved for the unit BEFORE it fills (prevents CLS when the ad paints). 0 = none.
 *  densityGroup — units in the same group are never requested closer than MIN_GAP_VH of a viewport
 *                 to each other ('content' = in-article column, 'rail' = sidebar). Prevents two ads
 *                 occupying one screen of the same column (keeps ad density low for Core Web Vitals).
 *
 * Publisher ID: ca-pub-1781126556775676
 */

const PUB_ID = 'ca-pub-1781126556775676';

/** Minimum clear vertical space (as a fraction of the viewport height) between two ads of one group. */
const MIN_GAP_VH = 0.6;

/** True when another already-requested ad of the same group sits closer than the minimum gap. */
function tooCloseToAnotherAd(wrapper, group) {
    if (!wrapper || typeof window === 'undefined') return false;
    const gap = MIN_GAP_VH * window.innerHeight;
    const me = wrapper.getBoundingClientRect();
    const others = document.querySelectorAll(`.adsense-wrapper[data-ad-group="${group}"][data-ad-requested="1"]`);
    for (const o of others) {
        if (o === wrapper) continue;
        const r = o.getBoundingClientRect();
        const clear = Math.max(me.top - r.bottom, r.top - me.bottom, 0);
        if (clear < gap) return true;
    }
    return false;
}

const AdSenseAd = ({
    slot,
    format = 'auto',
    layout = '',
    responsive = true,
    className = '',
    style = {},
    label = true,
    labelText = 'বিজ্ঞাপন',
    layoutKey = '',
    minHeight = 0,
    densityGroup = null,
}) => {
    const wrapRef = useRef(null);
    const adRef = useRef(null);
    const pushed = useRef(false);
    // 'suppressed' = density guard refused the request; 'unfilled' = AdSense returned no ad
    const [state, setState] = useState('idle');
    const [prevSlot, setPrevSlot] = useState(slot);
    if (prevSlot !== slot) {
        setPrevSlot(slot);
        setState('idle');
    }

    useEffect(() => {
        const el = adRef.current;
        const wrap = wrapRef.current;
        if (!slot || !el || !wrap) return;

        const push = () => {
            if (pushed.current || el.getAttribute('data-adsbygoogle-status')) return;
            if (densityGroup && tooCloseToAnotherAd(wrap, densityGroup)) {
                pushed.current = true;
                setState('suppressed');
                return;
            }
            pushed.current = true;
            wrap.setAttribute('data-ad-requested', '1');
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch {
                // Silently ignore if AdSense script is still loading
            }
        };

        // Collapse the reserved space if AdSense reports "unfilled" (usually resolves off-screen thanks to the lookahead)
        const mo = typeof MutationObserver !== 'undefined'
            ? new MutationObserver(() => {
                if (el.getAttribute('data-ad-status') === 'unfilled') setState('unfilled');
            })
            : null;
        if (mo) mo.observe(el, { attributes: true, attributeFilter: ['data-ad-status'] });

        // Request ads well before they scroll into view (1500px lookahead) so they are ready when the reader arrives
        if (typeof IntersectionObserver === 'undefined') {
            push();
            return () => mo && mo.disconnect();
        }
        const io = new IntersectionObserver((entries) => {
            if (entries.some((e) => e.isIntersecting)) {
                push();
                io.disconnect();
            }
        }, { rootMargin: '1500px 0px' });
        io.observe(wrap);
        return () => {
            io.disconnect();
            if (mo) mo.disconnect();
            wrap.removeAttribute('data-ad-requested');
            pushed.current = false;
        };
    }, [slot, densityGroup]);

    if (state === 'suppressed' || state === 'unfilled') return null;

    const isFluidOrRelaxed = format === 'fluid' || format === 'autorelaxed' || layout === 'in-article';

    return (
        <div
            ref={wrapRef}
            className={`adsense-wrapper ${className}`}
            {...(densityGroup ? { 'data-ad-group': densityGroup } : {})}
            style={{
                display: 'block',
                textAlign: 'center',
                margin: '1.75rem auto',
                maxWidth: '100%',
                clear: 'both',
                ...(minHeight ? { minHeight: `${minHeight + (label ? 18 : 0)}px` } : {}),
                ...style,
            }}
        >
            {label && (
                <div style={{
                    fontSize: '0.625rem',
                    color: 'var(--text-muted, #94a3b8)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '4px',
                    opacity: 0.65,
                    userSelect: 'none',
                    textAlign: 'center',
                }}>
                    {labelText}
                </div>
            )}
            <ins
                ref={adRef}
                className="adsbygoogle"
                style={{
                    display: 'block',
                    textAlign: 'center',
                }}
                data-ad-client={PUB_ID}
                data-ad-slot={slot}
                data-ad-format={format}
                {...(!isFluidOrRelaxed && responsive ? { 'data-full-width-responsive': 'true' } : {})}
                {...(layout ? { 'data-ad-layout': layout } : {})}
                {...(layoutKey ? { 'data-ad-layout-key': layoutKey } : {})}
            />
        </div>
    );
};

export default AdSenseAd;
