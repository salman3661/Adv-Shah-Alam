import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { Scale, Users, Trophy, Clock } from 'lucide-react';
import aboutContent from '../content/about.json';

// Icon map — matches what's stored in about.json stats (if needed in future)
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

const About = () => {
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
                        className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
                        {aboutContent.heading}
                    </motion.h2>
                    <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                        className="w-24 h-1 mx-auto rounded-full" style={{ background: 'var(--accent)' }}></motion.div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                        className="space-y-5">
                        {(aboutContent.bio || []).map((para, i) => (
                            <p key={i} className="text-base leading-relaxed"
                                style={{ color: i === 0 ? 'var(--text-2)' : 'var(--text-muted)' }}>
                                {para}
                            </p>
                        ))}

                        {/* Quote */}
                        <div className="glass-card p-6 mt-4" style={{ borderLeft: '4px solid var(--accent)' }}>
                            <p className="text-base font-serif italic" style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
                                "{aboutContent.quote}"
                            </p>
                            <p className="font-bold mt-3 text-sm" style={{ color: 'var(--accent)' }}>
                                — {aboutContent.quoteAuthor}
                            </p>
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
