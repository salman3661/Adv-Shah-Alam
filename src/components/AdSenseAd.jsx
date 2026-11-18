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
    mobileMinHeight = 0,
    densityGroup = null,
}) => {
    const wrapRef = useRef(null);
    const adRef = useRef(null);
    const pushed = useRef(false);
    const [stateObj, setStateObj] = useState({ slot, status: 'idle' });
    const state = stateObj.slot === slot ? stateObj.status : 'idle';

    useEffect(() => {
        pushed.current = false;
        const host = typeof window !== 'undefined' ? window.location.hostname : '';
        if (host && host !== 'www.advmdshahalam.me' && host !== 'advmdshahalam.me') {
            return;
        }
        const el = adRef.current;
        const wrap = wrapRef.current;
        if (!slot || !el || !wrap) return;

        let cancelled = false;

        let widthRetries = 0;
        const push = () => {
            if (cancelled || pushed.current || el.getAttribute('data-adsbygoogle-status')) return;
            // Ensure container has computed a non-zero responsive screen width before requesting ad size
            if (wrap.offsetWidth === 0) {
                if (widthRetries < 12) {
                    widthRetries += 1;
                    requestAnimationFrame(() => {
                        if (!cancelled && !pushed.current) push();
                    });
                }
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
                if (st === 'unfilled') setStateObj({ slot, status: 'unfilled' });
                else if (st === 'filled') setStateObj({ slot, status: 'filled' });
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
    const resolvedDesktopMin = minHeight > 0 ? Math.max(320, minHeight) : 320;
    const resolvedMobileMin = mobileMinHeight > 0 ? Math.max(320, mobileMinHeight) : 320;

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
            data-ad-status-wrapper={state}
            {...(densityGroup ? { 'data-ad-group': densityGroup } : {})}
            style={{
                display: 'block',
                textAlign: 'center',
                margin: '1rem auto 1.25rem',
                padding: 0,
                width: '100%',
                maxWidth: '100%',
                clear: 'both',
                overflow: 'hidden',
                contain: 'layout style',
                boxSizing: 'border-box',
                background: 'transparent',
                border: 'none',
                boxShadow: 'none',
                '--ad-min-h-mobile': `${resolvedMobileMin}px`,
                '--ad-min-h-desktop': `${resolvedDesktopMin}px`,
                height: `var(--ad-min-h-mobile)`,
                ...cleanStyle,
            }}
        >
            {label && (
                <div
                    aria-hidden={isUnfilled ? 'true' : undefined}
                    style={{
                        fontSize: '0.625rem',
                        letterSpacing: '0.07em',
                        textTransform: 'uppercase',
                        color: 'var(--text-muted, #64748b)',
                        marginBottom: '0.25rem',
                        opacity: isUnfilled ? 0 : 0.75,
                        visibility: isUnfilled ? 'hidden' : 'visible',
                        height: '14px',
                        lineHeight: '14px',
                    }}
                >
                    {labelText}
                </div>
            )}
            <ins
                ref={adRef}
                className="adsbygoogle"
                style={{
                    display: 'block',
                    textAlign: 'center',
                    width: '100%',
                    maxWidth: '100%',
                    visibility: isUnfilled ? 'hidden' : 'visible',
                    opacity: isUnfilled ? 0 : 1,
                }}
                data-ad-client={PUB_ID}
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={format === 'auto' && responsive ? 'true' : undefined}
                {...(layout ? { 'data-ad-layout': layout } : {})}
                {...(layoutKey ? { 'data-ad-layout-key': layoutKey } : {})}
            />
        </div>
    );
};

export default AdSenseAd;
