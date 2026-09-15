import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Star, MapPin, ExternalLink, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';

const GOOGLE_REVIEW_URL = 'https://maps.app.goo.gl/M3NXMwW3xkp2TE3h8';

const ReviewPage = () => {
    useEffect(() => {
        // Auto-redirect after 1.8 seconds to give user time to read, while ensuring seamless flow
        const timer = setTimeout(() => {
            window.location.href = GOOGLE_REVIEW_URL;
        }, 1800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Helmet>
                <title>গুগলে ৫-স্টার রিভিউ দিন | এডভোকেট মোঃ শাহ আলম — বাংলাদেশ সুপ্রিম কোর্ট</title>
                <meta name="description" content="অ্যাডভোকেট মো. শাহ আলম স্যারের আইনি পরামর্শ ও সেবার অভিজ্ঞতা গুগলে শেয়ার করুন। আপনার মতামত অন্যদের সঠিক আইনি সাহায্য পেতে সহায়তা করবে।" />
                <link rel="canonical" href="https://www.advmdshahalam.me/review" />
            </Helmet>

            <section className="min-h-[85vh] flex items-center justify-center px-4 py-16" style={{ background: 'var(--bg)' }}>
                <div className="max-w-lg w-full text-center p-8 sm:p-10 rounded-3xl border shadow-2xl relative overflow-hidden"
                     style={{ background: 'var(--surface)', borderColor: 'var(--card-border)' }}>
                    
                    {/* Top ambient glow */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 border"
                         style={{ background: 'rgba(217,119,6,0.08)', borderColor: 'rgba(217,119,6,0.25)', color: '#d97706' }}>
                        <HeartHandshake size={15} />
                        আপনার মতামত আমাদের প্রেরণা
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight" style={{ color: 'var(--text)' }}>
                        আইনি সেবায় আপনি কি সন্তুষ্ট?
                    </h1>
                    <p className="text-sm sm:text-base leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
                        অ্যাডভোকেট মো. শাহ আলম স্যারের আইনি পরামর্শ ও সহায়তায় আপনার অভিজ্ঞতা কেমন ছিল? গুগলে আপনার মূল্যবান ২ মিনিটের মতামত শেয়ার করে অন্যদেরও সঠিক দিকনির্দেশনা পেতে সাহায্য করুন।
                    </p>

                    {/* 5-Star interactive display */}
                    <div className="flex justify-center items-center gap-2 mb-8">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} size={32} className="fill-amber-400 text-amber-400 animate-pulse" style={{ animationDelay: `${star * 150}ms` }} />
                        ))}
                    </div>

                    {/* Primary CTA */}
                    <a
                        href={GOOGLE_REVIEW_URL}
                        className="w-full py-4 px-6 rounded-2xl font-bold text-white shadow-lg flex items-center justify-center gap-3 text-base transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                        style={{
                            background: 'linear-gradient(135deg, #1A3FBF 0%, #3B5FD4 100%)',
                            boxShadow: '0 8px 25px rgba(26,63,191,0.35)'
                        }}
                    >
                        <span>সরাসরি গুগলে ৫-স্টার রিভিউ দিন</span>
                        <ExternalLink size={18} />
                    </a>

                    <p className="text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
                        স্বয়ংক্রিয়ভাবে গুগল ম্যাপসে রিডাইরেক্ট হচ্ছে... (বাটন চাপুন যদি নিজে থেকে ওপেন না হয়)
                    </p>

                    <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between text-xs gap-3"
                         style={{ borderColor: 'var(--card-border)', color: 'var(--text-muted)' }}>
                        <div className="flex items-center gap-1.5">
                            <MapPin size={14} className="text-amber-500" />
                            <span>উত্তরা ও সুপ্রিম কোর্ট চেম্বার</span>
                        </div>
                        <Link to="/" className="hover:underline font-medium" style={{ color: 'var(--accent)' }}>
                            হোমপেজে ফিরে যান →
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ReviewPage;
