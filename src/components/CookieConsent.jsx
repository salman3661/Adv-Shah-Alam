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
                const timer = setTimeout(() => setVisible(true), 1500);
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
            className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md z-[100] transition-all duration-300 animate-fade-in"
        >
            <div
                className="p-4 sm:p-5 rounded-2xl shadow-2xl border backdrop-blur-xl"
                style={{
                    background: 'var(--surface-elevated, rgba(15, 23, 42, 0.95))',
                    borderColor: 'var(--card-border, rgba(198, 167, 94, 0.25))',
                    color: 'var(--text, #f8fafc)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(198, 167, 94, 0.15)'
                }}
            >
                <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-xl flex-shrink-0" style={{ background: 'rgba(198, 167, 94, 0.15)', color: 'var(--accent, #c6a75e)' }}>
                        <Cookie size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold font-serif flex items-center gap-1.5" style={{ color: 'var(--text, #f8fafc)' }}>
                            <ShieldCheck size={16} className="text-emerald-400" />
                            {isBn ? 'কুকি ও গোপনীয়তা নীতি' : 'Cookie & Privacy Settings'}
                        </h4>
                        <p className="text-xs leading-relaxed mt-1" style={{ color: 'var(--text-muted, #94a3b8)' }}>
                            {isBn ? (
                                <>
                                    আমরা আপনার ব্রাউজিং অভিজ্ঞতা উন্নত করতে এবং Google AdSense ও Analytics-এর জন্য কুকি ব্যবহার করি। বিস্তারিত জানতে আমাদের{' '}
                                    <Link to="/privacy-policy" className="underline font-medium hover:text-amber-300" style={{ color: 'var(--accent, #c6a75e)' }}>
                                        গোপনীয়তা নীতি
                                    </Link>{' '}
                                    দেখুন।
                                </>
                            ) : (
                                <>
                                    We use cookies to enhance your experience, analyze traffic, and serve relevant ads via Google AdSense. Learn more in our{' '}
                                    <Link to="/privacy-policy" className="underline font-medium hover:text-amber-300" style={{ color: 'var(--accent, #c6a75e)' }}>
                                        Privacy Policy
                                    </Link>.
                                </>
                            )}
                        </p>
                    </div>
                    <button
                        onClick={() => setVisible(false)}
                        aria-label="Close cookie banner"
                        className="text-gray-400 hover:text-gray-200 transition-colors p-1"
                    >
                        <X size={16} />
                    </button>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-700/40">
                    <Link
                        to="/privacy-policy"
                        className="text-xs px-3 py-1.5 rounded-lg transition-colors hover:bg-white/5 font-medium"
                        style={{ color: 'var(--text-muted, #94a3b8)' }}
                    >
                        {isBn ? 'নীতিমালা পড়ুন' : 'Learn More'}
                    </Link>
                    <button
                        onClick={handleAccept}
                        className="text-xs px-4 py-1.5 rounded-lg font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
                        style={{
                            background: 'linear-gradient(135deg, #c6a75e 0%, #a8873a 100%)',
                            color: '#0B1120'
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
