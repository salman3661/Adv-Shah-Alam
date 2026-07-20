import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { waLink } from '../data/contactInfo';

const testimonialsEn = [
    {
        id: 1,
        name: 'Rahim Uddin',
        location: 'Uttara, Dhaka',
        case: 'Criminal Defence',
        rating: 5,
        review: 'Advocate Shah Alam handled my son\'s case with exceptional dedication. He secured bail within 48 hours when we thought it was impossible. His knowledge of criminal law and quick action saved our family. Highly recommend for urgent criminal matters.',
        initial: 'R',
    },
    {
        id: 2,
        name: 'Nasrin Begum',
        location: 'Gazipur',
        case: 'Divorce & Family Law',
        rating: 5,
        review: 'After years of suffering, I finally got legal protection through Advocate Shah Alam. He guided me through every step of the divorce process with patience and professionalism. His team was always available to answer my questions. The khula process was completed smoothly.',
        initial: 'N',
    },
    {
        id: 3,
        name: 'Kamal Hossain',
        location: 'Mirpur, Dhaka',
        case: 'Land Dispute',
        rating: 5,
        review: 'I had a long-running land dispute that other lawyers couldn\'t resolve. Advocate Shah Alam studied all my documents carefully, identified the key legal angles, and won the case in Sessions Court. His attention to detail and courtroom presence is remarkable.',
        initial: 'K',
    },
    {
        id: 4,
        name: 'Shirin Akter',
        location: 'Uttara, Dhaka',
        case: 'Supreme Court Appeal',
        rating: 5,
        review: 'We needed an urgent writ petition at the High Court. Advocate Shah Alam filed it within 24 hours and got an interim stay order. His experience at the Supreme Court level is unmatched. We are grateful for his swift legal action.',
        initial: 'S',
    },
    {
        id: 5,
        name: 'Farhan Ahmed',
        location: 'Tongi, Gazipur',
        case: 'Company Law',
        rating: 5,
        review: 'For our company registration and partnership deed, Advocate Shah Alam provided very clear guidance. The process was completed much faster than we expected. Very professional, very knowledgeable, and fair in fees. Our go-to corporate lawyer.',
        initial: 'F',
    },
];

const testimonialsBn = [
    {
        id: 1,
        name: 'রহিম উদ্দিন',
        location: 'উত্তরা, ঢাকা',
        case: 'ফৌজদারি মামলা',
        rating: 5,
        review: 'অ্যাডভোকেট শাহ আলম আমার ছেলের মামলায় অসাধারণ নিষ্ঠা দিয়েছিলেন। যখন আমরা ভেবেছিলাম জামিন হবে না, তিনি ৪৮ ঘণ্টার মধ্যে জামিন আদায় করেছিলেন। ফৌজদারি বিষয়ে যেকোনো জরুরি বিষয়ে তাঁকে নিশ্চিন্তে বিশ্বাস করা যায়।',
        initial: 'র',
    },
    {
        id: 2,
        name: 'নাসরিন বেগম',
        location: 'গাজীপুর',
        case: 'তালাক ও পরিবার আইন',
        rating: 5,
        review: 'বছরের পর বছর কষ্টের পর অ্যাডভোকেট শাহ আলম আমাকে আইনি সুরক্ষা দিয়েছেন। প্রতিটি ধাপে ধৈর্যের সাথে বুঝিয়ে দিয়েছেন। খুলওয়ার প্রক্রিয়া স্বাভাবিকভাবেই সম্পন্ন হয়েছে। যেনো তেনো সময়ে আমার প্রশ্নের উত্তর দিয়েছেন।',
        initial: 'ন',
    },
    {
        id: 3,
        name: 'কামাল হোসেন',
        location: 'মিরপুর, ঢাকা',
        case: 'জমির বিরোধ',
        rating: 5,
        review: 'অন্য আইনজীবীরা যে মামলা সমাধান করতে পারেননি, অ্যাডভোকেট শাহ আলম সব কাগজপত্র ভালোকরে দেখে মূল দিকগুলো খুঁজে বের করলেন এবং দায়রা দণ্ড আদালতে জিতে দিলেন। তাঁর মনোযোগ ও আদালতে দক্ষতা সত্যিই অতুলনীয়।',
        initial: 'ক',
    },
    {
        id: 4,
        name: 'শিরিন আক্তার',
        location: 'উত্তরা, ঢাকা',
        case: 'হাইকোর্ট আপিল',
        rating: 5,
        review: 'আমরা জরুরিভাবে হাইকোর্টে রিট পিটিশন দায়ের করতে চেয়েছিলাম। অ্যাডভোকেট শাহ আলম ২৪ ঘণ্টার মধ্যে ফাইল করে স্থগিতাদেশ আদায় করেছিলেন। সুপ্রিম কোর্টে তাঁর অভিজ্ঞতা সত্যিই অতুলনীয়।',
        initial: 'শ',
    },
    {
        id: 5,
        name: 'ফারহান আহমেদ',
        location: 'টঙ্গী, গাজীপুর',
        case: 'কোম্পানি আইন',
        rating: 5,
        review: 'আমাদের কোম্পানি নিবন্ধন ডিড় পার্টনারশিপ ডিডের জন্য অ্যাডভোকেট শাহ আলম বিনা ঝামেলায় গাইড করেছেন। আমাদের প্রত্যাশার চেয়ে অনেক দ্রুত সম্পন্ন হয়েছে। প্রফেশনাল, জ্ঞানী, ও ফি যুক্তিসংগত।',
        initial: 'ফ',
    },
];

const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Advocate Md. Shah Alam – Law Chamber',
    url: 'https://www.advmdshahalam.me',
    aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        reviewCount: testimonialsEn.length.toString(),
        bestRating: '5',
        worstRating: '1',
    },
    review: testimonialsEn.map(t => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: t.name },
        reviewBody: t.review,
        reviewRating: {
            '@type': 'Rating',
            ratingValue: t.rating.toString(),
            bestRating: '5',
        },
    })),
};

const StarRating = ({ rating }) => (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map(i => (
            <Star
                key={i}
                size={14}
                fill={i <= rating ? '#F59E0B' : 'none'}
                stroke={i <= rating ? '#F59E0B' : '#D1D5DB'}
            />
        ))}
    </div>
);

const Testimonials = ({ lang = 'en' }) => {
    const isBn = lang === 'bn';
    const testimonials = isBn ? testimonialsBn : testimonialsEn;
    const [active, setActive] = useState(0);
    const total = testimonials.length;

    const prev = () => setActive(i => (i - 1 + total) % total);
    const next = () => setActive(i => (i + 1) % total);

    return (
        <>
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(reviewSchema)}
                </script>
            </Helmet>

            <section
                id="testimonials"
                className="py-24 relative overflow-hidden"
                style={{ background: 'var(--bg)' }}
            >
                {/* Background decoration */}
                <div
                    className="absolute left-0 top-1/3 w-80 h-80 rounded-full -z-0 pointer-events-none"
                    style={{ background: 'radial-gradient(circle, var(--accent-subtle) 0%, transparent 70%)' }}
                />

                <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    {/* Header */}
                    <div className="text-center mb-14">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="label-accent block mb-3"
                        >
                            {isBn ? 'তারা বিশ্বাস করেছিলেন, আমরা পাশে ছিলাম' : 'They Trusted Us, We Stood by Them'}
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-serif font-bold mb-4"
                            style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}
                        >
                            {isBn ? 'আমাদের মক্কেলদের কথা' : 'What Our Clients Say'}
                        </motion.h2>
                        <motion.div
                            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }} transition={{ delay: 0.2 }}
                            className="w-24 h-1 mx-auto rounded-full" style={{ background: 'var(--accent)' }}
                        />
                        {/* Aggregate rating badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ delay: 0.3 }}
                            className="flex items-center justify-center gap-2 mt-5"
                        >
                            <div className="flex gap-0.5">
                                {[1,2,3,4,5].map(i => (
                                    <Star key={i} size={18} fill="#F59E0B" stroke="#F59E0B" />
                                ))}
                            </div>
                            <span className="text-sm font-bold" style={{ color: 'var(--text)' }}>5.0</span>
                            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                {isBn ? `· ${total}টি যাচাইকৃত মতামত` : `· ${total} verified client reviews`}
                            </span>
                        </motion.div>
                    </div>

                    {/* Featured Case Story */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ delay: 0.15 }}
                        className="mb-10 rounded-2xl p-6 md:p-8 relative overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, rgba(26,63,191,0.08) 0%, rgba(198,167,94,0.06) 100%)', border: '1px solid rgba(26,63,191,0.18)' }}
                    >
                        <div className="flex items-start gap-3 mb-4">
                            <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: 'rgba(26,63,191,0.12)', color: 'var(--accent)' }}>
                                ⭐ {isBn ? 'বিশেষ ঘটনা' : 'Featured Story'}
                            </span>
                            <span className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Criminal Defence · Uttara, Dhaka</span>
                        </div>
                        <h4 className="text-lg font-serif font-bold mb-3" style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
                            {isBn ? '"৪৮ ঘণ্টায় জামিন — একটি পরিবার রক্ষার গল্প"' : '"Bail in 48 Hours — A Family Saved"'}
                        </h4>
                        <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-2)' }}>
                            {isBn 
                                ? 'রাত ১১টায় ফোন এলো — ছেলেকে আটক করা হয়েছে, পরিবার কী করবে বুঝতে পারছে না। পরদিন সকালে আমরা মামলার কাগজ দেখলাম, আইনি ফাঁক খুঁজে বের করলাম, এবং ৪৮ ঘণ্টার মধ্যে জামিন আদায় করলাম। পরিবারটি আজও কৃতজ্ঞ।'
                                : 'It was 11:00 PM when we got the call. A young man had been detained, and his family was in panic. The next morning, we studied the case files, found critical legal loopholes, and secured bail within 48 hours. The family\'s relief was our greatest reward.'}
                        </p>
                        <p className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>
                            {isBn ? '— রহিম উদ্দিন পরিবার, উত্তরা (নাম পরিবর্তিত)' : '— Rahim Uddin\'s Family, Uttara (Name changed)'}
                        </p>
                    </motion.div>

                    {/* Desktop: 3-column grid */}
                    <div className="hidden lg:grid grid-cols-3 gap-6 mb-10">
                        {testimonials.slice(0, 3).map((t, i) => (
                            <motion.article
                                key={t.id}
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-6 flex flex-col relative"
                            >
                                <Quote
                                    size={32}
                                    className="absolute top-5 right-5 opacity-10"
                                    style={{ color: 'var(--accent)' }}
                                />
                                <StarRating rating={t.rating} />
                                <p
                                    className="text-sm leading-relaxed my-4 flex-1 italic"
                                    style={{ color: 'var(--text-2)' }}
                                >
                                    "{t.review}"
                                </p>
                                <div className="flex items-center gap-3 mt-2">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                                        style={{ background: 'var(--accent)', color: '#fff' }}
                                    >
                                        {t.initial}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>
                                            {t.name}
                                        </p>
                                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                            {t.location} · {t.case}
                                        </p>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    {/* Mobile: carousel slider */}
                    <div className="lg:hidden relative">
                        <div className="overflow-hidden rounded-3xl">
                            <AnimatePresence mode="wait">
                                <motion.article
                                    key={active}
                                    initial={{ opacity: 0, x: 60 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -60 }}
                                    transition={{ duration: 0.35, ease: 'easeOut' }}
                                    className="glass-card p-7 flex flex-col relative"
                                >
                                    <Quote
                                        size={32}
                                        className="absolute top-5 right-5 opacity-10"
                                        style={{ color: 'var(--accent)' }}
                                    />
                                    <StarRating rating={testimonials[active].rating} />
                                    <p
                                        className="text-sm leading-relaxed my-5 italic"
                                        style={{ color: 'var(--text-2)' }}
                                    >
                                        "{testimonials[active].review}"
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                                            style={{ background: 'var(--accent)', color: '#fff' }}
                                        >
                                            {testimonials[active].initial}
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>
                                                {testimonials[active].name}
                                            </p>
                                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                                {testimonials[active].location} · {testimonials[active].case}
                                            </p>
                                        </div>
                                    </div>
                                </motion.article>
                            </AnimatePresence>
                        </div>

                        {/* Carousel controls */}
                        <div className="flex items-center justify-center gap-4 mt-6">
                            <button
                                onClick={prev}
                                aria-label="Previous testimonial"
                                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                                style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', color: 'var(--text)' }}
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <div className="flex gap-2">
                                {testimonials.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActive(i)}
                                        aria-label={`Go to testimonial ${i + 1}`}
                                        className="rounded-full transition-all duration-300"
                                        style={{
                                            width: i === active ? '24px' : '8px',
                                            height: '8px',
                                            background: i === active ? 'var(--accent)' : 'var(--card-border)',
                                        }}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={next}
                                aria-label="Next testimonial"
                                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                                style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', color: 'var(--text)' }}
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Desktop remaining 2 */}
                    <div className="hidden lg:grid grid-cols-2 gap-6 mt-6">
                        {testimonials.slice(3).map((t, i) => (
                            <motion.article
                                key={t.id}
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-6 flex flex-col relative"
                            >
                                <Quote
                                    size={28}
                                    className="absolute top-5 right-5 opacity-10"
                                    style={{ color: 'var(--accent)' }}
                                />
                                <StarRating rating={t.rating} />
                                <p
                                    className="text-sm leading-relaxed my-4 flex-1 italic"
                                    style={{ color: 'var(--text-2)' }}
                                >
                                    "{t.review}"
                                </p>
                                <div className="flex items-center gap-3 mt-2">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                                        style={{ background: 'var(--accent)', color: '#fff' }}
                                    >
                                        {t.initial}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>
                                            {t.name}
                                        </p>
                                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                            {t.location} · {t.case}
                                        </p>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ delay: 0.4 }}
                        className="text-center mt-12"
                    >
                        <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                            {isBn ? 'আপনার পাশে দাঁড়ানোর জন্য আমরা সবসময় প্রস্তুত।' : 'We are ready to stand by your side in your hour of need.'}
                        </p>
                        <a
                            href={waLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-whatsapp inline-flex items-center gap-2 text-sm"
                        >
                            {isBn ? 'আজই আমাদের সাথে কথা বলুন' : 'Speak with Us Today'}
                        </a>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default Testimonials;
