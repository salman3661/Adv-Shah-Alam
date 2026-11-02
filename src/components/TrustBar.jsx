import React from 'react';
import { Shield, Star, Users, Clock, CheckCircle } from 'lucide-react';

const trustItemsEn = [
    { icon: Shield, text: 'Supreme Court Advocate', sub: 'Bangladesh Bar Council', isGold: false },
    { icon: Star, text: '4.9 Google Rating', sub: '47+ Verified Reviews', isGold: true },
    { icon: Clock, text: '10+ Years Practice', sub: 'Since 2015', isGold: false },
    { icon: Users, text: '5000+ Cases Handled', sub: 'Criminal · Family · Land', isGold: false },
    { icon: CheckCircle, text: 'Asst. Public Prosecutor', sub: 'Metro Sessions Court, Dhaka', isGold: true },
];

const trustItemsBn = [
    { icon: Shield, text: 'সুপ্রীম কোর্টের আইনজীবী', sub: 'বাংলাদেশ বার কাউন্সিল', isGold: false },
    { icon: Star, text: '৪.৯ গুগল রেটিং', sub: '৪৭+ যাচাইকৃত রিভিউ', isGold: true },
    { icon: Clock, text: '১০+ বছরের অভিজ্ঞতা', sub: '২০১৫ সাল থেকে', isGold: false },
    { icon: Users, text: '৫০০০+ মামলা পরিচালনা', sub: 'ফৌজদারি · পারিবারিক · ভূমি', isGold: false },
    { icon: CheckCircle, text: 'অ্যাসিস্ট্যান্ট পাবলিক প্রসিকিউটর', sub: 'মেট্রো সেশনস কোর্ট, ঢাকা', isGold: true },
];

const TrustBar = ({ lang = 'en' }) => {
    const isBn = lang === 'bn';
    const items = isBn ? trustItemsBn : trustItemsEn;

    return (
        <section
            aria-label={isBn ? 'বিশ্বাসযোগ্যতার সূচক' : 'Trust indicators'}
            className="google-anno-skip"
            style={{
                background: 'var(--surface)',
                borderTop: '1px solid var(--card-border)',
                borderBottom: '1px solid var(--card-border)',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
                {/* Desktop: horizontal grid */}
                <div
                    className="hidden md:grid py-3.5"
                    style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: '0' }}
                >
                    {items.map((item, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-2.5 py-2 px-3"
                            style={{
                                borderRight: i < items.length - 1 ? '1px solid var(--card-border)' : 'none',
                            }}
                        >
                            <div
                                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                                style={{
                                    background: item.isGold ? 'linear-gradient(135deg, #065F46 0%, #0F766E 100%)' : 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
                                    color: '#FFFFFF',
                                    boxShadow: item.isGold ? '0 3px 8px rgba(15, 118, 110, 0.25)' : '0 3px 8px rgba(37, 99, 235, 0.25)',
                                }}
                            >
                                <item.icon size={16} />
                            </div>
                            <div className="min-w-0">
                                <div
                                    className="text-xs font-bold leading-tight truncate"
                                    style={{ color: 'var(--text)' }}
                                >
                                    {item.text}
                                </div>
                                <div
                                    className="text-xs leading-tight truncate"
                                    style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}
                                >
                                    {item.sub}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile: scrollable row */}
                <div className="md:hidden py-2.5 overflow-x-auto no-scrollbar">
                    <div className="flex gap-4" style={{ width: 'max-content' }}>
                        {items.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2 flex-shrink-0"
                            >
                                <div
                                    className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                                    style={{
                                        background: item.isGold ? 'linear-gradient(135deg, #065F46 0%, #0F766E 100%)' : 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
                                        color: '#FFFFFF',
                                        boxShadow: item.isGold ? '0 3px 8px rgba(15, 118, 110, 0.25)' : '0 3px 8px rgba(37, 99, 235, 0.25)',
                                    }}
                                >
                                    <item.icon size={14} />
                                </div>
                                <div>
                                    <div
                                        className="text-xs font-bold whitespace-nowrap"
                                        style={{ color: 'var(--text)' }}
                                    >
                                        {item.text}
                                    </div>
                                </div>
                                {i < items.length - 1 && (
                                    <div
                                        className="h-4 w-px flex-shrink-0 ml-2"
                                        style={{ background: 'var(--card-border)' }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustBar;
