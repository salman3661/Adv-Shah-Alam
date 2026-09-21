import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Cookie, X } from 'lucide-react';

const CookieConsent = () => {
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        try {
            const consent = localStorage.getItem('adv_cookie_consent');
            if (!consent) {
                // Short delay so it doesn't pop aggressively on initial paint
                const timer = setTimeout(() => setVisible(true), 1200);
                return () => clearTimeout(timer);
            }
        } catch {
            // Ignore localStorage errors
        }
    }, []);

    const handleAccept = () => {
        try {
            localStorage.setItem('adv_cookie_consent', 'accepted');
        } catch {
            // Ignore
        }
        setVisible(false);
    };

    if (!visible) return null;

    const isBn = !location.pathname.startsWith('/en') &&
                 location.pathname !== '/blog' &&
                 !location.pathname.startsWith('/blog/');

    return (
        <aside
            role="region"
            aria-label={isBn ? "কুকি সম্মতি বিজ্ঞপ্তি" : "Cookie consent banner"}
            className="fixed bottom-20 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-md z-[1200] transition-all duration-300 animate-fade-in"
        >
            <div
                className="p-4 sm:p-5 rounded-2xl border transition-colors duration-200"
                style={{
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--card-border)',
                    color: 'var(--text)',
                    boxShadow: '0 12px 32px -4px rgba(13, 27, 46, 0.16), 0 4px 12px -2px rgba(13, 27, 46, 0.08)'
                }}
            >
                <div className="flex items-start gap-3 mb-3">
                    <div
                        className="p-2 rounded-xl flex-shrink-0"
                        style={{
                            background: 'var(--accent-subtle, rgba(27, 54, 93, 0.08))',
                            color: 'var(--gold, #B8922A)'
                        }}
                    >
                        <Cookie size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                            <ShieldCheck size={16} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                            <h4 className="text-sm font-bold font-serif leading-tight" style={{ color: 'var(--text)' }}>
                                {isBn ? 'কুকি ও গোপনীয়তা নীতি' : 'Cookie & Privacy Settings'}
                            </h4>
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            {isBn ? (
                                <>
                                    আমরা আপনার ব্রাউজিং অভিজ্ঞতা উন্নত করতে এবং Google AdSense ও Analytics-এর জন্য কুকি ব্যবহার করি। বিস্তারিত জানতে আমাদের{' '}
                                    <Link to="/privacy-policy" className="underline font-semibold hover:opacity-80" style={{ color: 'var(--gold, #B8922A)' }}>
                                        গোপনীয়তা নীতি
                                    </Link>{' '}
                                    দেখুন।
                                </>
                            ) : (
                                <>
                                    We use cookies to enhance your experience, analyze traffic, and serve relevant ads via Google AdSense. Learn more in our{' '}
                                    <Link to="/privacy-policy" className="underline font-semibold hover:opacity-80" style={{ color: 'var(--gold, #B8922A)' }}>
                                        Privacy Policy
                                    </Link>.
                                </>
                            )}
                        </p>
                    </div>
                    <button
                        onClick={() => setVisible(false)}
                        aria-label="Close cookie banner"
                        className="p-1 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        <X size={16} />
                    </button>
                </div>

                <div
                    className="flex items-center justify-end gap-2 pt-3 mt-2"
                    style={{ borderTop: '1px solid var(--divider)' }}
                >
                    <Link
                        to="/privacy-policy"
                        className="text-xs px-3 py-1.5 rounded-lg transition-colors hover:opacity-80 font-medium"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        {isBn ? 'নীতিমালা পড়ুন' : 'Learn More'}
                    </Link>
                    <button
                        onClick={handleAccept}
                        className="text-xs px-4 py-2 rounded-xl font-semibold transition-all duration-150 hover:opacity-95 active:scale-95 shadow-sm cursor-pointer"
                        style={{
                            background: 'var(--btn-primary-bg, #1B365D)',
                            color: '#FFFFFF'
                        }}
                    >
                        {isBn ? 'সম্মতি দিচ্ছি' : 'Accept All'}
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default CookieConsent;
