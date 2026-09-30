import React, { useState, useEffect } from 'react';
import AdSenseAd from './AdSenseAd';

/**
 * StickyBottomAd — Fixed bottom banner ad (bd-pratidin style)
 * Shows a dismissible sticky ad at the bottom of the viewport.
 */
const StickyBottomAd = ({ labelText = 'Advertisement', slot = '8630877987' }) => {
    const [dismissed, setDismissed] = useState(false);
    const [visible, setVisible] = useState(false);

    // Delay showing so it doesn't interfere with page load AdSense pushes
    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    if (dismissed || !visible) return null;

    return (
        <div
            style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 9999,
                background: 'var(--bg, #0f0d1a)',
                borderTop: '1px solid rgba(198,167,94,0.2)',
                boxShadow: '0 -4px 24px rgba(0,0,0,0.35)',
                padding: '6px 0 4px',
                animation: 'slideUpStickyAd 0.35s ease-out',
            }}
        >
            {/* Close button */}
            <button
                onClick={() => setDismissed(true)}
                aria-label="Close ad"
                style={{
                    position: 'absolute',
                    top: '4px',
                    right: '8px',
                    zIndex: 1,
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '11px',
                    lineHeight: 1,
                    padding: 0,
                    transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
            >
                ✕
            </button>

            <AdSenseAd
                slot={slot}
                format="auto"
                responsive={true}
                label={false}
                labelText={labelText}
                style={{ maxHeight: '90px', overflow: 'hidden' }}
            />

            <style>{`
                @keyframes slideUpStickyAd {
                    from { transform: translateY(100%); opacity: 0; }
                    to   { transform: translateY(0);    opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default StickyBottomAd;
