import React, { useEffect, useRef } from 'react';

/**
 * AdSenseAd — Clean, standard production Google AdSense component
 *
 * Props:
 *  slot        — Ad unit slot ID
 *  format      — 'auto' | 'fluid' | 'autorelaxed'
 *  layout      — 'in-article' | ''
 *  layoutKey   — layout key for in-feed units
 *  responsive  — boolean (default true)
 *  className   — extra CSS class
 *  style       — extra inline style
 *  label       — boolean (default true) — show "বিজ্ঞাপন" / "Advertisement"
 *  labelText   — override label text
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
    labelText = 'বিজ্ঞাপন',
    layoutKey = '',
}) => {
    const adRef = useRef(null);
    const pushed = useRef(false);

    useEffect(() => {
        pushed.current = false;
    }, [slot]);

    useEffect(() => {
        if (!slot || !adRef.current) return;

        // Push to AdSense queue once the DOM element is mounted
        if (!pushed.current) {
            pushed.current = true;
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                // Silently ignore if AdSense script is still loading
            }
        }
    }, [slot]);

    const isFluidOrRelaxed = format === 'fluid' || format === 'autorelaxed' || layout === 'in-article';

    return (
        <div
            className={`adsense-wrapper ${className}`}
            style={{
                display: 'block',
                textAlign: 'center',
                margin: '1.75rem auto',
                maxWidth: '100%',
                clear: 'both',
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
