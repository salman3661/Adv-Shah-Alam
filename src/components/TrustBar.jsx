import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Star, Users, Clock, CheckCircle } from 'lucide-react';

const trustItemsEn = [
    { icon: Shield, text: 'Supreme Court Advocate', sub: 'Bangladesh Bar Council' },
    { icon: Star, text: '4.9★ Google Rating', sub: '47+ Reviews', accent: '#C6A75E' },
    { icon: Clock, text: '10+ Years Practice', sub: 'Since 2015' },
    { icon: Users, text: '500+ Cases Handled', sub: 'Criminal · Family · Land' },
    { icon: CheckCircle, text: 'Asst. Public Prosecutor', sub: 'Metro Sessions Court, Dhaka', accent: '#22C55E' },
];

const trustItemsBn = [
    { icon: Shield, text: 'সুপ্রীম কোর্টের আইনজীবী', sub: 'বাংলাদেশ বার কাউন্সিল' },
    { icon: Star, text: '৪.৯★ গুগল রেটিং', sub: '৪৭+ রিভিউ', accent: '#C6A75E' },
    { icon: Clock, text: '১০+ বছরের অভিজ্ঞতা', sub: '২০১৫ সাল থেকে' },
    { icon: Users, text: '৫০০+ মামলা পরিচালনা', sub: 'ফৌজদারি · পারিবারিক · ভূমি' },
    { icon: CheckCircle, text: 'অ্যাসিস্ট্যান্ট পাবলিক প্রসিকিউটর', sub: 'মেট্রো সেশনস কোর্ট, ঢাকা', accent: '#22C55E' },
];

const TrustBar = ({ lang = 'en' }) => {
    const isBn = lang === 'bn';
    const items = isBn ? trustItemsBn : trustItemsEn;

    return (
        <section
            aria-label={isBn ? 'বিশ্বাসযোগ্যতার সূচক' : 'Trust indicators'}
            style={{
                background: 'var(--surface)',
                borderTop: '1px solid var(--card-border)',
                borderBottom: '1px solid var(--card-border)',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            {/* Subtle gradient overlay */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'linear-gradient(135deg, rgba(26,63,191,0.03) 0%, rgba(198,167,94,0.02) 100%)',
            }} />

            <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
                {/* Desktop: horizontal grid | Mobile: scrollable row */}
                <div
                    className="hidden md:grid py-3"
                    style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: '0' }}
                >
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.07 }}
                            className="flex items-center gap-2.5 py-2 px-3"
                            style={{
                                borderRight: i < items.length - 1 ? '1px solid var(--card-border)' : 'none',
                            }}
                        >
                            <div
                                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                                style={{
                                    background: item.accent
                                        ? `${item.accent}15`
                                        : 'var(--accent-subtle)',
                                    color: item.accent || 'var(--accent)',
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
                        </motion.div>
                    ))}
                </div>

                {/* Mobile: auto-scrolling marquee */}
                <div className="md:hidden py-2 overflow-x-auto no-scrollbar">
                    <div className="flex gap-4" style={{ width: 'max-content' }}>
                        {items.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2 flex-shrink-0"
                            >
                                <div
                                    className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                                    style={{
                                        background: item.accent
                                            ? `${item.accent}15`
                                            : 'var(--accent-subtle)',
                                        color: item.accent || 'var(--accent)',
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
