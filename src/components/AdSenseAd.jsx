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

const AdSenseAd = ({
    slot,
    format = 'auto',
    layout = '',
    responsive = true,
    className = '',
    style = {},
    label = true,
    labelText = 'Advertisement',
    layoutKey = '',
    minHeight = 0,
    densityGroup = null,
}) => {
    const wrapRef = useRef(null);
    const adRef = useRef(null);
    const pushed = useRef(false);
    const [state, setState] = useState('idle');
    const [prevSlot, setPrevSlot] = useState(slot);
    if (prevSlot !== slot) {
        setPrevSlot(slot);
        setState('idle');
        pushed.current = false;
    }

    useEffect(() => {
        const host = typeof window !== 'undefined' ? window.location.hostname : '';
        if (host && host !== 'www.advmdshahalam.me' && host !== 'advmdshahalam.me') {
            return;
        }
        const el = adRef.current;
        const wrap = wrapRef.current;
        if (!slot || !el || !wrap) return;

        let cancelled = false;

        const push = () => {
            if (cancelled || pushed.current || el.getAttribute('data-adsbygoogle-status')) return;
            // Ensure container has computed a non-zero responsive screen width before requesting ad size
            if (wrap.offsetWidth === 0) {
                requestAnimationFrame(() => {
                    if (!cancelled && !pushed.current && wrap.offsetWidth > 0) push();
                });
                return;
            }
            pushed.current = true;
            wrap.setAttribute('data-ad-requested', '1');
            try {
                if (typeof window.__ensureAdSenseLoaded === 'function') {
                    window.__ensureAdSenseLoaded();
                }
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch {
                // Ignore if script hasn't attached handler yet; adsbygoogle.js drains queued pushes on load
            }
        };

        // Track fill status accurately for accessibility while keeping reserved height (Zero-CLS)
        const mo = typeof MutationObserver !== 'undefined'
            ? new MutationObserver(() => {
                const st = el.getAttribute('data-ad-status');
                if (st === 'unfilled') setState('unfilled');
                else if (st === 'filled') setState('filled');
            })
            : null;
        if (mo) mo.observe(el, { attributes: true, attributeFilter: ['data-ad-status'] });

        // Request ads well before they scroll into view (1800px lookahead)
        if (typeof IntersectionObserver === 'undefined') {
            push();
            return () => {
                cancelled = true;
                if (mo) mo.disconnect();
            };
        }
        const io = new IntersectionObserver((entries) => {
            if (entries.some((e) => e.isIntersecting)) {
                push();
                io.disconnect();
            }
        }, { rootMargin: '1800px 0px' });
        io.observe(wrap);
        return () => {
            cancelled = true;
            io.disconnect();
            if (mo) mo.disconnect();
            wrap.removeAttribute('data-ad-requested');
            pushed.current = false;
        };
    }, [slot]);

    const isUnfilled = state === 'unfilled';
    const resolvedDesktopMin = minHeight > 0 ? minHeight : 250;
    const resolvedMobileMin = minHeight > 0 ? Math.min(minHeight, 100) : 100;

    const {
        margin: _ignoredMargin,
        marginBottom: _ignoredMarginBottom,
        borderRadius: _ignoredRadius,
        border: _ignoredBorder,
        background: _ignoredBg,
        boxShadow: _ignoredShadow,
        padding: _ignoredPadding,
        ...cleanStyle
    } = style || {};

    return (
        <div
            ref={wrapRef}
            className={`adsense-wrapper ad-slot-reserved ${className}`}
            aria-hidden={isUnfilled ? 'true' : undefined}
            {...(densityGroup ? { 'data-ad-group': densityGroup } : {})}
            style={{
                display: 'block',
                textAlign: 'center',
                margin: '1rem auto 1.25rem',
                padding: 0,
                width: '100%',
                maxWidth: '100%',
                clear: 'both',
                overflowX: 'hidden',
                overflowY: 'visible',
                boxSizing: 'border-box',
                background: 'transparent',
                border: 'none',
                boxShadow: 'none',
                '--ad-min-h-mobile': `${resolvedMobileMin}px`,
                '--ad-min-h-desktop': `${resolvedDesktopMin}px`,
                ...cleanStyle,
            }}
        >
            {label && !isUnfilled && (
                <div style={{ fontSize: '0.625rem', letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-muted, #64748b)', marginBottom: '0.25rem', opacity: 0.75 }}>
                    {labelText}
                </div>
            )}
            <ins
                ref={adRef}
                className="adsbygoogle"
                style={{
                    display: isUnfilled ? 'none' : 'block',
                    textAlign: 'center',
                    width: '100%',
                    maxWidth: '100%',
                }}
                data-ad-client={PUB_ID}
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={responsive ? 'true' : undefined}
                {...(layout ? { 'data-ad-layout': layout } : {})}
                {...(layoutKey ? { 'data-ad-layout-key': layoutKey } : {})}
            />
        </div>
    );
};

export default AdSenseAd;
