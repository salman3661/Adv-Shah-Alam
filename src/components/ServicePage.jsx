import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Reusable service page layout.
 * Hero always dark (uses --hero-* vars that don't change with theme).
 * Coverage/FAQ/CTA use body CSS vars (theme-aware).
 */
const ServicePage = ({ metaTitle, metaDesc, h1, intro, coverage, faqItems, ctaText }) => {
    return (
        <>
            <Helmet>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDesc} />
                <meta name="robots" content="index, follow" />
            </Helmet>

            {/* Hero — intentionally always dark charcoal */}
            <section className="pt-28 pb-16 relative overflow-hidden"
                style={{ background: 'var(--hero-bg)' }}>
                <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(29,78,216,0.10) 0%, transparent 70%)' }}></div>

                <div className="container mx-auto px-6 max-w-5xl relative z-10">
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-6">
                        <Link to="/"
                            className="inline-flex items-center gap-2 text-sm font-medium hover:underline transition-opacity hover:opacity-100 opacity-80"
                            style={{ color: 'var(--hero-text-2)' }}>
                            <ArrowLeft size={15} /> Back to Home
                        </Link>
                    </motion.div>

                    <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
                        className="label-accent block mb-4" style={{ color: 'var(--gold)' }}>
                        Legal Services · Advocate Md. Shah Alam
                    </motion.span>

                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight mb-6"
                        style={{ color: 'var(--hero-text)', fontFamily: "'Playfair Display', serif" }}>
                        {h1}
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="text-lg leading-relaxed max-w-3xl"
                        style={{ color: 'var(--hero-text-2)' }}
                        dangerouslySetInnerHTML={{ __html: intro }} />

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
                        className="flex flex-col sm:flex-row gap-4 mt-8">
                        <a href="https://wa.me/8801955802007" target="_blank" rel="noopener noreferrer"
                            className="btn-whatsapp text-sm">
                            <MessageCircle size={17} /> WhatsApp Consultation
                        </a>
                        <a href="tel:+8801955802007"
                            className="btn-secondary text-sm"
                            style={{ borderColor: 'var(--hero-border)', color: 'var(--hero-text-2)' }}>
                            <Phone size={17} /> Call Now
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Coverage — theme-aware */}
            <section className="py-16" style={{ background: 'var(--bg)' }}>
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8"
                        style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
                        What We Cover
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {coverage.map((item, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                                className="glass-card flex items-start gap-3 p-4">
                                <CheckCircle size={17} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ — theme-aware */}
            {faqItems?.length > 0 && (
                <section className="py-16" style={{ background: 'var(--surface)' }}>
                    <div className="container mx-auto px-6 max-w-5xl">
                        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8"
                            style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-4">
                            {faqItems.map((faq, i) => (
                                <motion.div key={i}
                                    initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                                    className="glass-card p-6">
                                    <h3 className="font-bold text-sm md:text-base mb-3" style={{ color: 'var(--text)' }}>{faq.q}</h3>
                                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{faq.a}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA — theme-aware */}
            <section className="py-16" style={{ background: 'var(--bg)' }}>
                <div className="container mx-auto px-6 max-w-5xl">
                    <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="glass-card p-10 text-center" style={{ borderColor: 'var(--accent)' }}>
                        <span className="label-accent block mb-3">Free Consultation</span>
                        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4"
                            style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
                            {ctaText || 'Need Expert Legal Help?'}
                        </h2>
                        <p className="text-sm mb-7 max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
                            Contact Advocate Md. Shah Alam in Uttara, Dhaka today. Call, WhatsApp, or visit our office.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="https://wa.me/8801955802007" target="_blank" rel="noopener noreferrer"
                                className="btn-whatsapp text-sm">
                                <MessageCircle size={17} /> WhatsApp Now
                            </a>
                            <Link to="/#contact" className="btn-secondary text-sm">
                                Send Message
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default ServicePage;
