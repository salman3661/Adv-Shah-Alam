import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { telLink, waLink } from '../data/contactInfo';

/**
 * MobileCallButton — Google Material You Glassy CTA Bar
 * Frosted glass design with dynamic glow, smooth animations.
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

    // Slide up after 600ms for smooth entry
    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 600);
        return () => clearTimeout(t);
    }, []);

    const waMsg = isBn
        ? 'আইনি পরামর্শের জন্য যোগাযোগ করছি'
        : 'Hello Advocate Md. Shah Alam, I need legal consultation.';

    const waHref = `https://wa.me/8801955802007?text=${encodeURIComponent(waMsg)}`;

    return (
        <>
            <style>{`
                /* ── Google Glassy Mobile CTA Bar ── */
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
                        z-index: 1050;
                        gap: 8px;
                        align-items: stretch;
                        transform: translateY(${visible ? '0' : '110%'});
                        opacity: ${visible ? '1' : '0'};
                        transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1),
                                    opacity 0.35s ease;
                        will-change: transform, opacity;
                    }

                    /* Glassy pill wrapper */
                    .gcta-pill {
                        flex: 1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 7px;
                        padding: 0 16px;
                        height: 50px;
                        border-radius: 100px;
                        font-size: 0.82rem;
                        font-weight: 700;
                        text-decoration: none;
                        letter-spacing: 0.01em;
                        position: relative;
                        overflow: hidden;
                        -webkit-tap-highlight-color: transparent;
                        /* Frosted glass */
                        backdrop-filter: blur(20px) saturate(180%);
                        -webkit-backdrop-filter: blur(20px) saturate(180%);
                        transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1),
                                    box-shadow 0.18s ease;
                        user-select: none;
                    }

                    .gcta-pill:active {
                        transform: scale(0.95) !important;
                        transition-duration: 0.1s !important;
                    }

                    /* WhatsApp pill — glassy green with live beep radar */
                    .gcta-wa {
                        background: linear-gradient(135deg, rgba(37, 211, 102, 0.24) 0%, rgba(18, 140, 126, 0.28) 100%);
                        border: 1.5px solid rgba(37, 211, 102, 0.55);
                        color: #ffffff;
                        box-shadow:
                            0 6px 26px rgba(37, 211, 102, 0.32),
                            inset 0 1px 1px rgba(255, 255, 255, 0.25),
                            inset 0 -1px 0 rgba(0, 0, 0, 0.15);
                    }

                    .gcta-wa:hover {
                        box-shadow:
                            0 8px 34px rgba(37, 211, 102, 0.48),
                            inset 0 1px 1px rgba(255, 255, 255, 0.35);
                        transform: translateY(-1px);
                    }

                    /* Live Beep-Beep Radar Wave Pulse */
                    .gcta-beep-wave {
                        position: absolute;
                        inset: -4px;
                        border-radius: 100px;
                        border: 1.5px solid rgba(37, 211, 102, 0.8);
                        pointer-events: none;
                        animation: gcta-beep-pulse 2.2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
                    }

                    @keyframes gcta-beep-pulse {
                        0% {
                            transform: scale(0.97);
                            opacity: 0.9;
                        }
                        60% {
                            opacity: 0.35;
                        }
                        100% {
                            transform: scale(1.06, 1.25);
                            opacity: 0;
                        }
                    }

                    /* Call pill — glassy gold */
                    .gcta-call {
                        background: linear-gradient(135deg, rgba(198, 167, 94, 0.24) 0%, rgba(217, 119, 6, 0.22) 100%);
                        border: 1.5px solid rgba(198, 167, 94, 0.55);
                        color: #ffffff;
                        box-shadow:
                            0 6px 26px rgba(198, 167, 94, 0.28),
                            inset 0 1px 1px rgba(255, 255, 255, 0.25),
                            inset 0 -1px 0 rgba(0, 0, 0, 0.15);
                    }

                    .gcta-call:hover {
                        box-shadow:
                            0 6px 32px rgba(198, 167, 94, 0.35),
                            inset 0 1px 0 rgba(255, 255, 255, 0.15),
                            inset 0 -1px 0 rgba(0, 0, 0, 0.08);
                        transform: translateY(-1px);
                    }

                    /* Shimmer top-edge highlight */
                    .gcta-pill::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 10%;
                        right: 10%;
                        height: 1px;
                        background: linear-gradient(
                            90deg,
                            transparent,
                            rgba(255, 255, 255, 0.45),
                            transparent
                        );
                        border-radius: 100px;
                    }

                    /* Ripple press effect */
                    .gcta-pill::after {
                        content: '';
                        position: absolute;
                        inset: 0;
                        border-radius: inherit;
                        background: radial-gradient(circle at center, rgba(255,255,255,0.12), transparent 70%);
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    }
                    .gcta-pill:active::after {
                        opacity: 1;
                    }

                    /* Icon pulse — WA */
                    .gcta-wa-icon {
                        display: inline-flex;
                        animation: gcta-wa-pulse 2.8s ease-in-out infinite;
                        will-change: transform;
                        filter: drop-shadow(0 0 6px rgba(37, 211, 102, 0.7));
                    }
                    @keyframes gcta-wa-pulse {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.15); }
                    }

                    /* Icon pulse — Call */
                    .gcta-call-icon {
                        display: inline-flex;
                        animation: gcta-call-pulse 2.2s ease-in-out infinite;
                        will-change: transform;
                        filter: drop-shadow(0 0 5px rgba(198, 167, 94, 0.65));
                    }
                    @keyframes gcta-call-pulse {
                        0%, 100% { transform: rotate(0deg) scale(1); }
                        15% { transform: rotate(-12deg) scale(1.1); }
                        30% { transform: rotate(10deg) scale(1.1); }
                        45% { transform: rotate(-6deg) scale(1.05); }
                        60% { transform: rotate(4deg) scale(1.05); }
                        75% { transform: rotate(0deg) scale(1); }
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
                        opacity: 0.7;
                        white-space: nowrap;
                    }

                    /* Live dot */
                    .gcta-live-dot {
                        width: 6px;
                        height: 6px;
                        border-radius: 50%;
                        background: #4ade80;
                        box-shadow: 0 0 6px #4ade80, 0 0 12px rgba(74, 222, 128, 0.5);
                        animation: gcta-dot-blink 1.8s ease-in-out infinite;
                        flex-shrink: 0;
                    }
                    @keyframes gcta-dot-blink {
                        0%, 100% { opacity: 1; transform: scale(1); }
                        50% { opacity: 0.5; transform: scale(0.75); }
                    }

                    @media (prefers-reduced-motion: reduce) {
                        .gcta-wa-icon,
                        .gcta-call-icon,
                        .gcta-live-dot {
                            animation: none !important;
                        }
                    }
                }
            `}</style>

            <nav className="gcta-bar" aria-label="Mobile Legal Contact">
                {/* WhatsApp Button with Live Beep Radar */}
                <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gcta-pill gcta-wa"
                    aria-label={isBn ? 'WhatsApp এ যোগাযোগ করুন' : 'Chat on WhatsApp'}
                >
                    <div className="gcta-beep-wave" />
                    <span className="gcta-wa-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                    </span>
                    <span className="gcta-label">
                        <span className="gcta-main">{isBn ? 'WhatsApp' : 'WhatsApp'}</span>
                        <span className="gcta-sub">{isBn ? '🟢 লাইভ আছেন' : '🟢 Online Now'}</span>
                    </span>
                </a>

                {/* Call Button */}
                <a
                    href="tel:+8801712655546"
                    className="gcta-pill gcta-call"
                    aria-label={isBn ? 'সরাসরি কল করুন' : 'Direct Call'}
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
