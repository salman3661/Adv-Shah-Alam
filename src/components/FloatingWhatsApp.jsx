import React from 'react';
import { waLink } from '../data/contactInfo';
import { useLocation } from 'react-router-dom';

const FloatingWhatsApp = () => {
    const location = useLocation();
    const isBn = !location.pathname.startsWith('/en') &&
                 !location.pathname.startsWith('/blog') &&
                 !location.pathname.startsWith('/advocate-md-shah-alam') &&
                 !location.pathname.startsWith('/contact') &&
                 !location.pathname.startsWith('/privacy-policy') &&
                 !location.pathname.startsWith('/terms');

    return (
        <>
            <style>{`
                /* ── Google Glassy Floating WhatsApp with Live Beep Radar ── */
                .wa-floating-container {
                    position: fixed;
                    right: 22px;
                    bottom: 26px;
                    z-index: 1090;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    text-decoration: none;
                    -webkit-tap-highlight-color: transparent;
                }

                @media (max-width: 768px) {
                    /* On mobile, lift above the floating call dock if visible */
                    .wa-floating-container {
                        right: 16px;
                        bottom: calc(76px + env(safe-area-inset-bottom, 0px));
                    }
                }

                /* Live Beep-Beep Radar Wave Rings */
                .wa-beacon-ring {
                    position: absolute;
                    inset: -6px;
                    border-radius: 50%;
                    border: 2px solid rgba(37, 211, 102, 0.75);
                    opacity: 0;
                    pointer-events: none;
                    animation: wa-beep-radar 2.4s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
                }
                .wa-beacon-ring-2 {
                    position: absolute;
                    inset: -12px;
                    border-radius: 50%;
                    border: 2px solid rgba(37, 211, 102, 0.45);
                    opacity: 0;
                    pointer-events: none;
                    animation: wa-beep-radar 2.4s cubic-bezier(0.215, 0.61, 0.355, 1) infinite 0.7s;
                }

                @keyframes wa-beep-radar {
                    0% {
                        transform: scale(0.85);
                        opacity: 0.9;
                    }
                    50% {
                        opacity: 0.5;
                    }
                    100% {
                        transform: scale(1.45);
                        opacity: 0;
                    }
                }

                /* Main Button Pill / Circle */
                .wa-glass-btn {
                    position: relative;
                    width: 58px;
                    height: 58px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, rgba(37, 211, 102, 0.92) 0%, rgba(18, 140, 126, 0.95) 100%);
                    backdrop-filter: blur(16px) saturate(190%);
                    -webkit-backdrop-filter: blur(16px) saturate(190%);
                    border: 1.5px solid rgba(255, 255, 255, 0.35);
                    box-shadow: 
                        0 8px 28px rgba(37, 211, 102, 0.42),
                        0 2px 8px rgba(0, 0, 0, 0.25),
                        inset 0 1px 1px rgba(255, 255, 255, 0.6);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.22s ease;
                }

                .wa-floating-container:hover .wa-glass-btn {
                    transform: scale(1.08) translateY(-2px);
                    box-shadow: 
                        0 12px 36px rgba(37, 211, 102, 0.55),
                        0 4px 12px rgba(0, 0, 0, 0.3),
                        inset 0 1px 2px rgba(255, 255, 255, 0.8);
                }

                .wa-floating-container:active .wa-glass-btn {
                    transform: scale(0.94);
                }

                /* Live Beep Status Chip / Badge */
                .wa-live-chip {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 5px 11px;
                    border-radius: 9999px;
                    background: rgba(11, 18, 32, 0.85);
                    backdrop-filter: blur(12px) saturate(180%);
                    -webkit-backdrop-filter: blur(12px) saturate(180%);
                    border: 1px solid rgba(37, 211, 102, 0.45);
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
                    color: #e2e8f0;
                    font-size: 0.72rem;
                    font-weight: 700;
                    letter-spacing: 0.02em;
                    white-space: nowrap;
                    transition: transform 0.2s ease, opacity 0.2s ease;
                    pointer-events: none;
                }

                /* Beeping Dot inside Chip */
                .wa-live-dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: #22c55e;
                    box-shadow: 0 0 8px #22c55e, 0 0 14px rgba(34, 197, 94, 0.8);
                    animation: wa-beep-blink 1.2s ease-in-out infinite;
                }

                @keyframes wa-beep-blink {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    50% {
                        transform: scale(1.4);
                        opacity: 0.4;
                    }
                }

                /* Responsive badge placement */
                @media (max-width: 640px) {
                    .wa-live-chip {
                        display: none; /* keep clean on tiny screens */
                    }
                    .wa-glass-btn {
                        width: 52px;
                        height: 52px;
                    }
                }
            `}</style>

            <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="wa-floating-container group"
                aria-label={isBn ? 'বিজ্ঞ আইনজীবীর সাথে সরাসরি WhatsApp-এ কথা বলুন' : 'Chat directly with Lawyer on WhatsApp'}
            >
                {/* Live Online Badge / Chip */}
                <div className="wa-live-chip">
                    <span className="wa-live-dot" />
                    <span>{isBn ? 'লাইভ পরামর্শ • WhatsApp' : 'Live Consultation • WhatsApp'}</span>
                </div>

                {/* Glass Button with Expanding Radar Rings */}
                <div className="wa-glass-btn">
                    <div className="wa-beacon-ring" />
                    <div className="wa-beacon-ring-2" />
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden="true" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}>
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                </div>
            </a>
        </>
    );
};

export default FloatingWhatsApp;
