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
 *
 * KEY FIX: Start hidden (height:0 + overflow:hidden) → show only when AdSense marks "filled"
 * This eliminates the blank gap that appears while Google decides whether to fill or not.
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
    // Start as hidden — only show once AdSense confirms "filled"
    // This prevents the blank gap/space from showing while waiting for ad response
    const [adStatus, setAdStatus] = useState('pending'); // 'pending' | 'filled' | 'unfilled'

    // Reset status when slot changes (e.g. route change)
    useEffect(() => {
        setAdStatus('pending');
        pushed.current = false;
    }, [slot]);

    useEffect(() => {
        if (!slot || !adRef.current) return;

        // MutationObserver — detect when AdSense sets data-ad-status
        let observer = null;
        if (typeof window !== 'undefined' && window.MutationObserver) {
            observer = new MutationObserver((mutations) => {
                for (const mutation of mutations) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'data-ad-status') {
                        const status = adRef.current?.getAttribute('data-ad-status');
                        if (status === 'unfilled') {
                            setAdStatus('unfilled');
                        } else if (status === 'filled') {
                            setAdStatus('filled');
                        }
                    }
                }
            });
            observer.observe(adRef.current, { attributes: true });
        }

        // Also check data-adsbygoogle-status="done" to detect fill via iframe injection
        const checkFillViaIframe = setInterval(() => {
            if (!adRef.current) return clearInterval(checkFillViaIframe);
            const insEl = adRef.current;
            const done = insEl.getAttribute('data-adsbygoogle-status') === 'done';
            if (done) {
                clearInterval(checkFillViaIframe);
                const adStatus = insEl.getAttribute('data-ad-status');
                if (adStatus === 'unfilled') {
                    setAdStatus('unfilled');
                } else {
                    // Has iframe child = filled
                    const iframe = insEl.querySelector('iframe');
                    if (iframe && parseInt(iframe.height || '0') > 0) {
                        setAdStatus('filled');
                    } else if (!adStatus) {
                        // status not set yet but done — give it 500ms more
                        setTimeout(() => {
                            const st = insEl.getAttribute('data-ad-status');
                            setAdStatus(st === 'unfilled' ? 'unfilled' : 'filled');
                        }, 500);
                    }
                }
            }
        }, 300);

        // Push to AdSense queue after next paint (critical for React SPA)
        if (!pushed.current) {
            pushed.current = true;
            requestAnimationFrame(() => {
                setTimeout(() => {
                    try {
                        (window.adsbygoogle = window.adsbygoogle || []).push({});
                    } catch (e) {
                        // Silently ignore AdSense script loading race conditions
                    }
                }, 100);
            });
        }

        return () => {
            if (observer) observer.disconnect();
            clearInterval(checkFillViaIframe);
        };
    }, [slot]);

    // Fluid (In-Article) and Autorelaxed (Multiplex) native units do not take full-width-responsive
    const isFluidOrRelaxed = format === 'fluid' || format === 'autorelaxed' || layout === 'in-article';

    // Collapse cleanly if AdSense officially confirms unfilled
    if (adStatus === 'unfilled') return null;

    return (
        <div
            className={`adsense-wrapper ${className}`}
            style={{
                display: 'block',
                textAlign: 'center',
                overflow: 'hidden',
                minHeight: isFluidOrRelaxed ? '90px' : '100px',
                transition: 'opacity 0.2s ease',
                ...style,
            }}
        >
            {label && (
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
