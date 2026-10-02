import React, { useEffect, useRef, useState } from 'react';

/**
 * AdSenseAd — Production-ready Google AdSense component
 *
 * Props:
 *  slot        — Ad unit slot ID (from AdSense dashboard)
 *  format      — 'auto' | 'rectangle' | 'horizontal' | 'vertical' | 'fluid' | 'autorelaxed'
 *  layout      — 'in-article' | '' (for native in-article ad units)
 *  layoutKey   — layout key for in-feed ad units
 *  responsive  — boolean (default true) — enables data-full-width-responsive
 *  className   — extra CSS class
 *  style       — extra inline style on the outer wrapper
 *  label       — boolean (default true) — show "Advertisement" label
 *  labelText   — override label text (e.g., বিজ্ঞাপন for BN pages)
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
}) => {
    const adRef = useRef(null);
    const pushed = useRef(false);
    const [isFilled, setIsFilled] = useState(false);
    const [isUnfilled, setIsUnfilled] = useState(false);

    // Reset status when slot changes (e.g. route change)
    useEffect(() => {
        setIsFilled(false);
        setIsUnfilled(false);
        pushed.current = false;
    }, [slot]);

    useEffect(() => {
        if (!slot || !adRef.current) return;

        // MutationObserver to detect AdSense attribute changes on <ins>
        let observer = null;
        if (typeof window !== 'undefined' && window.MutationObserver) {
            observer = new MutationObserver((mutations) => {
                for (const mutation of mutations) {
                    if (mutation.type === 'attributes') {
                        const status = adRef.current?.getAttribute('data-ad-status');
                        if (status === 'unfilled') {
                            setIsUnfilled(true);
                        } else if (status === 'filled') {
                            setIsFilled(true);
                        }
                    }
                }
            });
            observer.observe(adRef.current, { attributes: true });
        }

        // Check if an actual Google ad iframe with content is present
        const checkIframe = setInterval(() => {
            if (!adRef.current) return clearInterval(checkIframe);
            const insEl = adRef.current;
            const iframe = insEl.querySelector('iframe');
            if (iframe) {
                const src = iframe.getAttribute('src') || '';
                // Real AdSense ad has doubleclick/googleads src
                if (src.includes('googleads') || src.includes('doubleclick')) {
                    setIsFilled(true);
                    clearInterval(checkIframe);
                    return;
                }
            }

            // If Google marked status as done but there's no ad iframe, it's unfilled
            if (insEl.getAttribute('data-adsbygoogle-status') === 'done') {
                const status = insEl.getAttribute('data-ad-status');
                if (status === 'unfilled' || (!iframe && insEl.querySelector('div[id^="aswift_"]'))) {
                    // Empty host div with no ad iframe
                    setTimeout(() => {
                        const retryIframe = insEl.querySelector('iframe');
                        if (!retryIframe) {
                            setIsUnfilled(true);
                        } else {
                            setIsFilled(true);
                        }
                        clearInterval(checkIframe);
                    }, 800);
                }
            }
        }, 400);

        // Push to AdSense queue after DOM mount
        if (!pushed.current) {
            pushed.current = true;
            requestAnimationFrame(() => {
                setTimeout(() => {
                    try {
                        (window.adsbygoogle = window.adsbygoogle || []).push({});
                    } catch (e) {
                        // Silently handle AdSense queue errors
                    }
                }, 100);
            });
        }

        // 6-second timeout: if neither filled nor explicitly unfilled, leave as is
        const timeout = setTimeout(() => {
            clearInterval(checkIframe);
        }, 6000);

        return () => {
            if (observer) observer.disconnect();
            clearInterval(checkIframe);
            clearTimeout(timeout);
        };
    }, [slot]);

    // Fluid (In-Article) and Autorelaxed (Multiplex) native units do not take full-width-responsive
    const isFluidOrRelaxed = format === 'fluid' || format === 'autorelaxed' || layout === 'in-article';

    // Completely collapse if confirmed unfilled (zero space, zero gap)
    if (isUnfilled) return null;

    return (
        <div
            className={`adsense-wrapper ${className}`}
            style={{
                display: 'block',
                textAlign: 'center',
                overflow: 'hidden',
                // Avoid forced large min-height so unfilled or loading ads don't create blank boxes
                minHeight: 'auto',
                ...style,
            }}
        >
            {label && isFilled && (
                <p style={{
                    fontSize: '0.58rem',
                    color: 'var(--text-muted, #94a3b8)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '4px',
                    opacity: 0.55,
                    userSelect: 'none',
                }}>
                    {labelText}
                </p>
            )}
            <ins
                ref={adRef}
                className="adsbygoogle"
                style={{ display: 'block', textAlign: 'center' }}
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
