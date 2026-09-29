import React, { useEffect, useRef, useState } from 'react';

/**
 * AdSenseAd — Production-ready Google AdSense component
 *
 * Props:
 *  slot        — Ad unit slot ID (from AdSense dashboard)
 *  format      — 'auto' | 'rectangle' | 'horizontal' | 'vertical' | 'fluid'
 *  layout      — 'in-article' | '' (for native in-article ad units)
 *  layoutKey   — layout key for in-feed ad units
 *  responsive  — boolean (default true) — enables data-full-width-responsive
 *  className   — extra CSS class
 *  style       — extra inline style on the outer wrapper
 *  label       — boolean (default true) — show "Advertisement" label
 *  labelText   — override label text (e.g., বিজ্ঞাপন for BN pages)
 *  minHeight   — minimum height placeholder (optional)
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
}) => {
    const adRef = useRef(null);
    const pushed = useRef(false);
    const [isUnfilled, setIsUnfilled] = useState(false);

    useEffect(() => {
        if (!slot) return;

        // Listen for AdSense unfilled status to collapse empty gaps
        if (adRef.current && window.MutationObserver) {
            const observer = new MutationObserver((mutations) => {
                for (const mutation of mutations) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'data-ad-status') {
                        const status = adRef.current?.getAttribute('data-ad-status');
                        if (status === 'unfilled') {
                            setIsUnfilled(true);
                        }
                    }
                }
            });
            observer.observe(adRef.current, { attributes: true });

            // Push to AdSense queue
            if (!pushed.current) {
                pushed.current = true;
                try {
                    const adsByGoogle = window.adsbygoogle || [];
                    adsByGoogle.push({});
                    window.adsbygoogle = adsByGoogle;
                } catch (e) {
                    // Ignore
                }
            }

            return () => observer.disconnect();
        } else if (!pushed.current) {
            pushed.current = true;
            try {
                const adsByGoogle = window.adsbygoogle || [];
                adsByGoogle.push({});
                window.adsbygoogle = adsByGoogle;
            } catch (e) {
                // Ignore
            }
        }
    }, [slot]);

    // If Google cannot fill this ad unit, completely collapse to avoid empty gaps
    if (isUnfilled) return null;

    return (
        <div
            className={`adsense-wrapper ${className}`}
            style={{
                display: 'block',
                textAlign: 'center',
                overflow: 'hidden',
                minHeight: minHeight > 0 ? `${minHeight}px` : undefined,
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
                data-full-width-responsive={responsive ? 'true' : 'false'}
                {...(layout ? { 'data-ad-layout': layout } : {})}
                {...(layoutKey ? { 'data-ad-layout-key': layoutKey } : {})}
            />
        </div>
    );
};

export default AdSenseAd;
