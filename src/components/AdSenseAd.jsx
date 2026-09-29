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

    // Reset status when slot changes
    useEffect(() => {
        setIsUnfilled(false);
        pushed.current = false;
    }, [slot]);

    useEffect(() => {
        if (!slot || !adRef.current) return;

        // MutationObserver to collapse wrapper if AdSense explicitly marks status="unfilled"
        let observer = null;
        if (typeof window !== 'undefined' && window.MutationObserver) {
            observer = new MutationObserver((mutations) => {
                for (const mutation of mutations) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'data-ad-status') {
                        const status = adRef.current?.getAttribute('data-ad-status');
                        if (status === 'unfilled') {
                            setIsUnfilled(true);
                        } else if (status === 'filled') {
                            setIsUnfilled(false);
                        }
                    }
                }
            });
            observer.observe(adRef.current, { attributes: true });
        }

        // Push to AdSense queue if not yet requested
        if (!pushed.current) {
            pushed.current = true;
            try {
                const adsByGoogle = window.adsbygoogle || [];
                adsByGoogle.push({});
                window.adsbygoogle = adsByGoogle;
            } catch (e) {
                // Silently ignore AdSense script loading race conditions
            }
        }

        return () => {
            if (observer) observer.disconnect();
        };
    }, [slot]);

    // Fluid (In-Article) and Autorelaxed (Multiplex) native units do not take full-width-responsive
    const isFluidOrRelaxed = format === 'fluid' || format === 'autorelaxed' || layout === 'in-article';

    return (
        <div
            className={`adsense-wrapper ${className}`}
            style={{
                display: isUnfilled ? 'none' : 'block',
                textAlign: 'center',
                overflow: 'hidden',
                minHeight: (!isUnfilled && minHeight > 0) ? `${minHeight}px` : undefined,
                ...style,
                ...(isUnfilled ? { display: 'none', margin: 0, padding: 0, height: 0 } : {}),
            }}
        >
            {label && !isUnfilled && (
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
