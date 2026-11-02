import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { waLink } from '../data/contactInfo';

/**
 * MobileCallButton — Official Executive Chambers Mobile CTA Bar
 * Only renders on mobile (< 768px) via CSS.
 */
const MobileCallButton = () => {
    const location = useLocation();
    const [visible, setVisible] = useState(false);

    // Detect Bengali page
    const isBn = !location.pathname.startsWith('/en') &&
                 !location.pathname.startsWith('/blog') &&
                 !location.pathname.startsWith('/advocate-md-shah-alam') &&
                 !location.pathname.startsWith('/contact') &&
                 !location.pathname.startsWith('/privacy-policy') &&
                 !location.pathname.startsWith('/terms');

    // Smoothly appear after 1.5s or slight scroll (40px) so mobile users immediately see WhatsApp & Call options
    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, 1500);

        const onScroll = () => {
            if (window.scrollY > 40) {
                setVisible(true);
            }
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    const waHref = waLink('', isBn);

    return (
        <>
            <style>{`
                /* Official Chambers Mobile CTA Bar */
                .gcta-bar {
                    display: none;
                }

                @media (max-width: 768px) {
                    .gcta-bar {
                        display: flex;
                        position: fixed;
                        left: 12px;
                        right: 12px;
                        bottom: calc(10px + env(safe-area-inset-bottom, 0px));
                        z-index: 2147483640;
                        max-height: 56px;
                        gap: 8px;
                        padding: 5px 6px;
                        border-radius: 100px;
                        background: rgba(10, 20, 36, 0.96);
                        backdrop-filter: blur(20px);
                        -webkit-backdrop-filter: blur(20px);
                        border: 1px solid rgba(204, 168, 86, 0.28);
                        box-shadow: 0 10px 28px rgba(0, 0, 0, 0.42);
                        align-items: center;
                        transform: translateY(${visible ? '0' : '140%'});
                        opacity: ${visible ? '1' : '0'};
                        pointer-events: ${visible ? 'auto' : 'none'};
                        transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1),
                                    opacity 0.24s ease;
                        will-change: transform, opacity;
                    }

                    .gcta-pill {
                        flex: 1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                        padding: 0 14px;
                        height: 44px;
                        max-height: 46px;
                        border-radius: 100px;
                        font-size: 0.82rem;
                        font-weight: 700;
                        text-decoration: none;
                        letter-spacing: 0.01em;
                        position: relative;
                        overflow: hidden;
                        -webkit-tap-highlight-color: transparent;
                        transition: transform 0.18s cubic-bezier(0.16, 1, 0.3, 1),
                                    box-shadow 0.18s ease,
                                    background-color 0.18s ease;
                        user-select: none;
                    }

                    .gcta-pill:active {
                        transform: scale(0.97) !important;
                        transition-duration: 0.1s !important;
                    }

                    /* WhatsApp pill — Official Deep Emerald */
                    .gcta-wa {
                        background-color: #116B3A;
                        border: 1px solid rgba(255, 255, 255, 0.22);
                        color: #ffffff;
                        box-shadow: 0 2px 10px rgba(17, 107, 58, 0.30);
                    }

                    .gcta-wa:hover {
                        background-color: #0C522C;
                        transform: translateY(-1px);
                    }

                    /* Call pill — Official Sovereign Navy with Antique Brass border */
                    .gcta-call {
                        background-color: #163A70;
                        border: 1px solid rgba(204, 168, 86, 0.42);
                        color: #ffffff;
                        box-shadow: 0 2px 10px rgba(10, 22, 40, 0.35);
                    }

                    .gcta-call:hover {
                        background-color: #1E40AF;
                        transform: translateY(-1px);
                    }

                    .gcta-wa-icon {
                        display: inline-flex;
                    }

                    .gcta-call-icon {
                        display: inline-flex;
                        color: #CCA856;
                    }

                    /* Text label */
                    .gcta-label {
                        display: flex;
                        flex-direction: column;
                        line-height: 1.15;
                    }
                    .gcta-main {
                        font-size: 0.82rem;
                        font-weight: 700;
                        white-space: nowrap;
                    }
                    .gcta-sub {
                        font-size: 0.6rem;
                        font-weight: 500;
                        opacity: 0.92;
                        white-space: nowrap;
                    }

                    .gcta-live-dot {
                        width: 6px;
                        height: 6px;
                        border-radius: 50%;
                        background: #CCA856;
                        flex-shrink: 0;
                    }
                }
            `}</style>

            <nav className="gcta-bar google-anno-skip" aria-label="Mobile Legal Contact">
                {/* WhatsApp Button */}
                <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gcta-pill gcta-wa"
                    aria-label={isBn ? 'WhatsApp লাইভ আছেন' : 'WhatsApp Online Now'}
                >
                    <span className="gcta-wa-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                    </span>
                    <span className="gcta-label">
                        <span className="gcta-main">{isBn ? 'WhatsApp' : 'WhatsApp'}</span>
                        <span className="gcta-sub">{isBn ? 'সরাসরি চ্যাট' : 'Direct Chat'}</span>
                    </span>
                </a>

                {/* Call Button */}
                <a
                    href="tel:+8801712655546"
                    className="gcta-pill gcta-call"
                    aria-label={isBn ? 'কল করুন 01712-655546' : 'Call Now 01712-655546'}
                >
                    <span className="gcta-call-icon">
                        <Phone size={17} />
                    </span>
                    <span className="gcta-label">
                        <span className="gcta-main">{isBn ? 'কল করুন' : 'Call Now'}</span>
                        <span className="gcta-sub">01712-655546</span>
                    </span>
                    <span className="gcta-live-dot" title="Available now" />
                </a>
            </nav>
        </>
    );
};

export default MobileCallButton;
