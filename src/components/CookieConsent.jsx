import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * CookieConsent — Ultra-minimal, non-intrusive 1-line Privacy bar (Prothom Alo style).
 * Sits slimly at the bottom with a simple [OK] button. Never blocks content or photos.
 */
const CookieConsent = () => {
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        try {
            const consent = localStorage.getItem('adv_cookie_consent');
            if (!consent) {
                const timer = setTimeout(() => setVisible(true), 600);
                return () => clearTimeout(timer);
            }
        } catch {}
    }, []);

    const handleAccept = () => {
        try {
            localStorage.setItem('adv_cookie_consent', 'accepted');
        } catch {}
        setVisible(false);
    };

    if (!visible) return null;

    const isBn = !location.pathname.startsWith('/en') &&
                 location.pathname !== '/blog' &&
                 !location.pathname.startsWith('/blog/');

    return (
        <aside
            role="region"
            aria-label={isBn ? "গোপনীয়তা সম্মতি" : "Privacy consent"}
            style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1040,
                background: '#0B132B',
                borderTop: '1px solid rgba(198, 167, 94, 0.25)',
                padding: '6px 14px',
                boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.4)',
            }}
        >
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px',
                fontSize: '0.74rem',
                color: '#E2E8F0',
            }}>
                <p style={{ margin: 0, lineHeight: 1.4, flex: 1, minWidth: '220px' }}>
                    {isBn ? (
                        <>
                            আমাদের সাইট ব্যবহার করে আপনি আমাদের{' '}
                            <Link to="/privacy-policy" style={{ color: '#C6A75E', fontWeight: 600, textDecoration: 'underline' }}>
                                Privacy Policy
                            </Link>{' '}
                            মেনে নিচ্ছেন।
                        </>
                    ) : (
                        <>
                            By using this site, you agree to our{' '}
                            <Link to="/privacy-policy" style={{ color: '#C6A75E', fontWeight: 600, textDecoration: 'underline' }}>
                                Privacy Policy
                            </Link>.
                        </>
                    )}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                        onClick={handleAccept}
                        style={{
                            background: '#1A3FBF',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '3px 12px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            letterSpacing: '0.02em',
                        }}
                    >
                        OK
                    </button>
                    <button
                        onClick={handleAccept}
                        aria-label="Close"
                        style={{
                            background: 'transparent',
                            color: '#94A3B8',
                            border: 'none',
                            padding: '2px 6px',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            lineHeight: 1,
                        }}
                    >
                        ✕
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default CookieConsent;
