import React, { useState, useEffect } from 'react';
import { Facebook, Linkedin, Share2 } from 'lucide-react';

/**
 * SocialShare — lightweight sharing widget
 * Shown at bottom of Hero / Blog posts / Contact section
 * Addresses Seobility "few social sharing options" warning.
 */
const SocialShare = ({ lang = 'bn', url, title }) => {
    const isBn = lang === 'bn';
    // Detect native share only client-side to avoid SSR hydration mismatch (React error #418/#423)
    const [canNativeShare, setCanNativeShare] = useState(false);
    useEffect(() => {
        setCanNativeShare(typeof navigator !== 'undefined' && 'share' in navigator);
    }, []);

    const shareUrl  = url   || (typeof window !== 'undefined' ? window.location.href : 'https://www.advmdshahalam.me/');
    const shareText = title || (isBn
        ? 'বিশ্বস্ত আইনজীবী | এডভোকেট মোঃ শাহ আলম — উত্তরা, ঢাকা'
        : 'Trusted Lawyer in Bangladesh | Advocate Md. Shah Alam — Uttara, Dhaka');

    const encodedUrl  = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(shareText);

    const shares = [
        {
            name: 'Facebook',
            icon: Facebook,
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            color: '#1877F2',
            label: isBn ? 'ফেসবুকে শেয়ার করুন' : 'Share on Facebook',
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedText}`,
            color: '#0A66C2',
            label: isBn ? 'লিংকডইনে শেয়ার করুন' : 'Share on LinkedIn',
        },
        {
            name: 'WhatsApp',
            icon: () => (
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
            ),
            href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
            color: '#25D366',
            label: isBn ? 'হোয়াটসঅ্যাপে শেয়ার করুন' : 'Share on WhatsApp',
        },
    ];

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({ title: shareText, url: shareUrl });
            } catch (_) { /* user cancelled */ }
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                flexWrap: 'wrap',
            }}
            aria-label={isBn ? 'সোশ্যাল মিডিয়ায় শেয়ার করুন' : 'Share on social media'}
        >
            <span style={{ fontSize: '0.72rem', fontWeight: 700, opacity: 0.6, color: 'var(--text-2)', whiteSpace: 'nowrap' }}>
                {isBn ? 'শেয়ার করুন:' : 'Share:'}
            </span>
            {shares.map((s) => (
                <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        color: '#fff',
                        background: s.color,
                        flexShrink: 0,
                        transition: 'transform 0.18s, opacity 0.18s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.12)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                    <s.icon size={15} />
                </a>
            ))}
            {/* Native Share API button (mobile) — only rendered after hydration */}
            {canNativeShare && (
                <button
                    onClick={handleNativeShare}
                    aria-label={isBn ? 'আরও অ্যাপে শেয়ার করুন' : 'More sharing options'}
                    title={isBn ? 'আরও অ্যাপে শেয়ার করুন' : 'More sharing options'}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: 'var(--card-bg)',
                        border: '1.5px solid var(--card-border)',
                        color: 'var(--text-2)',
                        cursor: 'pointer',
                        flexShrink: 0,
                        transition: 'transform 0.18s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.12)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                    <Share2 size={14} />
                </button>
            )}
        </div>
    );
};

export default SocialShare;
