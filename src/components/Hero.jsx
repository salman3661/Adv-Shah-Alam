import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center pt-20 overflow-hidden transition-colors duration-300"
            style={{ background: 'var(--bg)' }}
        >
            {/* Subtle background orbs */}
            <div className="absolute top-1/4 right-1/3 w-96 h-96 rounded-full -z-0 pointer-events-none"
                style={{ background: 'radial-gradient(circle, var(--accent-subtle) 0%, transparent 70%)' }}></div>
            <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full -z-0 pointer-events-none"
                style={{ background: 'radial-gradient(circle, var(--accent-subtle) 0%, transparent 70%)' }}></div>

            {/* Dark-mode hero gradient overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none dark:opacity-100 opacity-0 transition-opacity duration-500"
                style={{ background: 'linear-gradient(135deg, #0b1220 0%, #0f1b2d 100%)' }}></div>

            <div className="container mx-auto px-6 relative z-10 w-full grid md:grid-cols-2 gap-12 items-center">

                {/* Profile Photo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex justify-center md:justify-end order-1 md:order-2"
                >
                    <motion.div
                        animate={{ y: [0, -12, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="relative w-full max-w-sm lg:max-w-md aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl group"
                        style={{ border: '3px solid var(--card-border)' }}
                    >
                        <picture>
                            <source srcSet="/images/hero/hero-md-shah-alam.webp" type="image/webp" />
                            <img
                                src="/images/hero/hero-md-shah-alam.png"
                                alt="Advocate Md. Shah Alam – Experienced Lawyer in Uttara, Dhaka"
                                loading="eager"
                                decoding="async"
                                width="600"
                                height="750"
                                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://placehold.co/600x800/1D4ED8/FFFFFF?text=Adv.+Shah+Alam';
                                }}
                            />
                        </picture>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                        {/* Experience Badge */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                            className="absolute bottom-6 right-6 font-bold px-5 py-2 rounded-lg text-sm shadow-lg backdrop-blur-md"
                            style={{ background: 'var(--accent)', color: '#fff' }}
                        >
                            Experienced Lawyer.
                        </motion.div>

                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
                            className="absolute top-6 left-6 font-semibold px-3 py-1.5 rounded-lg text-xs shadow-lg backdrop-blur-md"
                            style={{ background: 'rgba(0,0,0,0.55)', color: 'var(--gold)', border: '1px solid rgba(198,167,94,0.3)' }}
                        >
                            ⚖️ Supreme Court
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Text Side */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="text-center md:text-left order-2 md:order-1"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full mb-6"
                        style={{ border: '1px solid var(--card-border)', background: 'var(--surface)' }}>
                        <span className="label-accent">
                            Advocate · Supreme Court of Bangladesh
                        </span>
                    </div>

                    {/* SEO H1 */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight mb-5"
                        style={{ color: 'var(--text)', fontFamily: "'Playfair Display', Georgia, serif" }}>
                        Experienced Lawyer in Uttara –{' '}
                        <span style={{ color: 'var(--accent)' }}>Advocate Md. Shah Alam</span>
                    </h1>

                    {/* SEO Subheading */}
                    <p className="text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 mb-4 font-medium"
                        style={{ color: 'var(--text-2)' }}>
                        Providing Legal Representation in Criminal, Divorce, Land, Bail, Tax &amp; Supreme Court Matters in Dhaka &amp; Bangladesh.
                    </p>

                    {/* Keyword-rich intro */}
                    <p className="text-sm md:text-base leading-relaxed max-w-lg mx-auto md:mx-0 mb-8"
                        style={{ color: 'var(--text-muted)' }}>
                        As a trusted <strong style={{ color: 'var(--text-2)' }}>lawyer in Uttara</strong> and <strong style={{ color: 'var(--text-2)' }}>advocate in Uttara</strong>, Adv. Shah Alam offers expert criminal, divorce, land, bail, Supreme Court, and income tax legal services in Dhaka. Experienced Lawyer with proven courtroom excellence.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <motion.a
                            href="https://wa.me/8801955802007"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            className="btn-whatsapp text-sm"
                        >
                            <MessageCircle size={18} />
                            WhatsApp Consult
                        </motion.a>

                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            className="btn-outline flex items-center justify-center gap-2 py-3.5 px-7 text-sm"
                        >
                            Request Consultation
                            <ArrowRight size={18} />
                        </motion.a>
                    </div>

                    {/* Speciality tags */}
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-7">
                        {['Criminal Law', 'Divorce Cases', 'Land Disputes', 'Bail Matters', 'Supreme Court'].map((tag) => (
                            <span key={tag}
                                className="text-xs px-3 py-1.5 rounded-full font-medium"
                                style={{ border: '1px solid var(--card-border)', color: 'var(--text-muted)', background: 'var(--surface)' }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;