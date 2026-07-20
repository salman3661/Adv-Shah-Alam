import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { Scale, Users, Trophy, Clock, Heart, CheckCircle } from 'lucide-react';
import aboutEn from '../content/about.json';
import aboutBn from '../content/about_bn.json';

// Icon map
const STAT_ICONS = [Clock, Scale, Trophy, Users];

const AnimatedCounter = ({ value, suffix }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    useEffect(() => {
        if (isInView) {
            const animation = animate(count, value, { duration: 2.5, ease: "easeOut" });
            return animation.stop;
        }
    }, [isInView, value, count]);

    return (
        <span ref={ref} className="inline-flex">
            <motion.span>{rounded}</motion.span>
            <span>{suffix}</span>
        </span>
    );
};

const About = ({ lang = 'en' }) => {
    const isBn = lang === 'bn';
    const aboutContent = isBn ? aboutBn : aboutEn;

    const stats = (aboutContent.stats || []).map((s, i) => ({
        icon: STAT_ICONS[i % STAT_ICONS.length],
        value: s.value,
        suffix: s.suffix,
        label: s.label,
    }));

    return (
        <section id="about" className="py-24 relative overflow-hidden" style={{ background: 'var(--surface)' }}>
            <div className="absolute right-0 top-1/3 w-1/3 h-1/2 rounded-full -z-10 pointer-events-none"
                style={{ background: 'radial-gradient(circle, var(--accent-subtle) 0%, transparent 70%)' }}></div>

            <div className="container mx-auto px-6 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="label-accent block mb-3">
                        {aboutContent.sectionLabel}
                    </motion.span>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: 'var(--text)', fontFamily: isBn ? 'inherit' : "'Playfair Display', serif" }}>
                        {aboutContent.heading}
                    </motion.h2>
                    <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                        className="w-24 h-1 mx-auto rounded-full" style={{ background: 'var(--accent)' }}></motion.div>
                </div>

                {/* Empathy reassurance banner */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}
                    className="mb-12 rounded-2xl px-6 py-5 flex items-start gap-4"
                    style={{ background: 'linear-gradient(135deg, rgba(26,63,191,0.08) 0%, rgba(198,167,94,0.06) 100%)', border: '1px solid rgba(26,63,191,0.15)' }}
                >
                    <Heart size={22} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
                        {isBn ? (
                            <>
                                <strong style={{ color: 'var(--text)' }}>আমরা জানি এই মুহূর্তটা আপনার জন্য কঠিন।</strong> আইনি সমস্যা মানুষকে একা এবং অসহায় করে দেয়। কিন্তু আপনি একা নন — আমরা আপনার পাশে আছি, প্রতিটি পদক্ষেপে।
                            </>
                        ) : (
                            <>
                                <strong style={{ color: 'var(--text)' }}>We know this is a difficult time for you.</strong> Legal challenges can leave you feeling alone and overwhelmed. But you do not have to carry this burden alone — we are here to support you every step of the way.
                            </>
                        )}
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Content */}
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                        className="space-y-5">
                        {(aboutContent.bio || []).map((para, i) => (
                            <p key={i} className="text-base leading-relaxed"
                                style={{ color: i === 0 ? 'var(--text-2)' : 'var(--text-muted)' }}>
                                {para}
                            </p>
                        ))}

                        {/* Personal note / Founder's story */}
                        {aboutContent.personalNote && (
                            <motion.div
                                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                                className="rounded-2xl p-6 mt-2"
                                style={{ background: 'linear-gradient(135deg, rgba(198,167,94,0.08) 0%, rgba(26,63,191,0.06) 100%)', border: '1px solid rgba(198,167,94,0.2)' }}
                            >
                                <p className="text-sm leading-relaxed italic mb-4" style={{ color: 'var(--text-2)', fontFamily: isBn ? 'inherit' : "'Playfair Display', serif" }}>
                                    ❝ {aboutContent.personalNote} ❞
                                </p>
                                {/* Signature */}
                                <div className="flex items-center gap-3 pt-2" style={{ borderTop: '1px solid rgba(198,167,94,0.15)' }}>
                                    <div>
                                        <span style={{
                                            fontFamily: isBn ? "'Noto Serif Bengali', serif" : "'Dancing Script', 'Brush Script MT', cursive",
                                            fontSize: isBn ? '1.25rem' : '1.4rem',
                                            color: 'var(--accent)',
                                            fontWeight: 600,
                                            letterSpacing: '0.02em',
                                            lineHeight: 1.2,
                                            display: 'block',
                                            fontStyle: isBn ? 'italic' : 'normal'
                                        }}>
                                            {aboutContent.personalNoteAuthor}
                                        </span>
                                        <span className="text-xs font-semibold tracking-wide" style={{ color: 'var(--text-muted)', display: 'block', marginTop: '0.15rem' }}>
                                            {isBn ? 'এডভোকেট, সুপ্রীম কোর্ট অব বাংলাদেশ' : 'Advocate, Supreme Court of Bangladesh'}
                                        </span>
                                        <span className="text-xs font-semibold tracking-wide" style={{ color: 'var(--text-muted)', display: 'block', marginTop: '0.05rem' }}>
                                            {isBn ? 'অ্যাসিস্ট্যান্ট পাবলিক প্রসিকিউটর, ঢাকা' : 'Assistant Public Prosecutor, Dhaka'}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        )}


                        {/* Trust markers */}
                        <div className="flex flex-wrap gap-3 pt-2">
                            {(isBn 
                                ? ['সততার সাথে কাজ করি', 'সরল ভাষায় বুঝিয়ে দিই', 'সময়মতো সাড়া দিই']
                                : ['Dedicated & Honest Service', 'Clear & Plain Explanation', 'Responsive & Caring Communication']
                            ).map((item, i) => (
                                <span key={i} className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                                    style={{ background: 'rgba(26,63,191,0.08)', color: 'var(--accent)', border: '1px solid rgba(26,63,191,0.15)' }}>
                                    <CheckCircle size={12} /> {item}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid grid-cols-2 gap-5">
                        {stats.map((stat, index) => (
                            <motion.div key={index}
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                className="glass-card p-7 text-center group cursor-default"
                            >
                                <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                                    style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
                                    <stat.icon size={24} />
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold mb-1" style={{ color: 'var(--text)' }}>
                                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                </h3>
                                <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
