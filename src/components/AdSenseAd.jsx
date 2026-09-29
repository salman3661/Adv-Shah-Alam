import React, { useEffect, useRef } from 'react';

/**
 * AdSenseAd — Production-ready Google AdSense component
 *
 * Props:
 *  slot       — Ad unit slot ID (from AdSense dashboard)
 *  format     — 'auto' | 'rectangle' | 'horizontal' | 'vertical' | 'fluid'
 *  responsive — boolean (default true) — enables data-full-width-responsive
 *  className  — extra CSS class
 *  style      — extra inline style on the outer wrapper
 *  label      — boolean (default true) — show "Advertisement" label
 *  labelText  — override label text (e.g., বিজ্ঞাপন for BN pages)
 *
 * Publisher ID: ca-pub-1781126556775676
 */

const PUB_ID = 'ca-pub-1781126556775676';

const AdSenseAd = ({
    slot,
    format = 'auto',
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

    useEffect(() => {
        // Only push once per mount — prevents duplicate push errors
        if (pushed.current) return;
        pushed.current = true;

        try {
            const adsByGoogle = window.adsbygoogle || [];
            adsByGoogle.push({});
            window.adsbygoogle = adsByGoogle;
        } catch (e) {
            // AdSense not yet loaded — silently ignore
        }
    }, []);

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
                    fontSize: '0.6rem',
                    color: 'var(--text-muted)',
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
                style={{ display: 'block' }}
                data-ad-client={PUB_ID}
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={responsive ? 'true' : 'false'}
                {...(layoutKey ? { 'data-ad-layout-key': layoutKey } : {})}
            />
        </div>
    );
};

export default AdSenseAd;
