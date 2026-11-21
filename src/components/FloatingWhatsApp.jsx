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
                /* Official Executive Floating WhatsApp */
                .wa-floating-container {
                    position: fixed;
                    right: 22px;
                    bottom: 26px;
                    z-index: 2147483645;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    text-decoration: none;
                    -webkit-tap-highlight-color: transparent;
                }

                @media (max-width: 768px) {
                    .wa-floating-container {
                        right: 16px;
                        bottom: 20px;
                    }
                }

                @keyframes wa-pulse {
                    0% {
                        box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
                    }
                    70% {
                        box-shadow: 0 0 0 16px rgba(37, 211, 102, 0);
                    }
                    100% {
                        box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
                    }
                }

                @keyframes wa-bounce-subtle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-4px); }
                }

                /* Main Button Circle with pulse & glow */
                .wa-glass-btn {
                    position: relative;
                    width: 58px;
                    height: 58px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
                    border: 2px solid #ffffff;
                    box-shadow: 0 8px 24px rgba(18, 140, 126, 0.45);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: wa-pulse 2s infinite, wa-bounce-subtle 4s ease-in-out infinite;
                    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
                }

                .wa-floating-container:hover .wa-glass-btn {
                    transform: scale(1.1) translateY(-2px);
                    box-shadow: 0 12px 30px rgba(37, 211, 102, 0.6);
                }

                .wa-floating-container:active .wa-glass-btn {
                    transform: scale(0.95);
                }

                /* Attention Unread Badge (1) */
                .wa-unread-badge {
                    position: absolute;
                    top: -4px;
                    right: -4px;
                    width: 20px;
                    height: 20px;
                    background: #EF4444;
                    color: #FFFFFF;
                    font-size: 11px;
                    font-weight: 800;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 2px solid #ffffff;
                    box-shadow: 0 2px 6px rgba(239, 68, 68, 0.5);
                    animation: pulse 1.5s infinite;
                }

                /* Status Chip / Badge */
                .wa-live-chip {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    padding: 7px 14px;
                    border-radius: 9999px;
                    background: rgba(11, 18, 32, 0.94);
                    border: 1px solid rgba(201, 162, 39, 0.5);
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
                    color: #F8FAFC;
                    font-size: 0.76rem;
                    font-weight: 700;
                    letter-spacing: 0.02em;
                    white-space: nowrap;
                    backdrop-filter: blur(8px);
                    transition: transform 0.2s ease, opacity 0.2s ease;
                }

                .wa-floating-container:hover .wa-live-chip {
                    border-color: #25D366;
                    color: #FFFFFF;
                }

                .wa-live-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #25D366;
                    box-shadow: 0 0 8px #25D366;
                }

                @media (max-width: 640px) {
                    .wa-live-chip {
                        display: none;
                    }
                    .wa-glass-btn {
                        width: 52px;
                        height: 52px;
                    }
                }
            `}</style>

            <a
                href={waLink('', isBn)}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="floating-whatsapp"
                data-placement="floating"
                className="wa-floating-container group"
                aria-label={isBn ? 'বিজ্ঞ আইনজীবীর সাথে সরাসরি WhatsApp-এ কথা বলুন' : 'Chat directly with Lawyer on WhatsApp'}
            >
                <div className="wa-live-chip">
                    <span className="wa-live-dot" />
                    <span>{isBn ? 'সরাসরি পরামর্শ • WhatsApp' : 'Direct Consultation • WhatsApp'}</span>
                </div>

                <div className="wa-glass-btn">
                    <span className="wa-unread-badge" aria-hidden="true">1</span>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                </div>
            </a>
        </>
    );
};

export default FloatingWhatsApp;
