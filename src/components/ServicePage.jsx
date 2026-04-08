import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { telLink, waLink } from '../data/contactInfo';
import { MessageCircle, Phone, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Reusable service page layout.
 * Hero always dark (uses --hero-* vars that don't change with theme).
 * Coverage/FAQ/CTA use body CSS vars (theme-aware).
 */
const ServicePage = ({ metaTitle, metaDesc, canonicalUrl, h1, intro, coverage, faqItems, ctaText, contextNote }) => {

    const breadcrumbSchema = canonicalUrl ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://advmdshahalam.me/' },
            { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://advmdshahalam.me/#services' },
            { '@type': 'ListItem', position: 3, name: h1, item: canonicalUrl },
        ],
    } : null;

    const legalServiceSchema = canonicalUrl ? {
        '@context': 'https://schema.org',
        '@type': 'LegalService',
        name: h1,
        description: metaDesc,
        url: canonicalUrl,
        provider: {
            '@type': 'Person',
            name: 'Advocate Md. Shah Alam',
            jobTitle: 'Advocate',
            url: 'https://advmdshahalam.me/advocate-md-shah-alam',
        },
        areaServed: [
            { '@type': 'City', name: 'Uttara' },
            { '@type': 'City', name: 'Dhaka' },
            { '@type': 'Country', name: 'Bangladesh' },
        ],
    } : null;

    const faqSchema = faqItems?.length > 0 ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map(faq => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
    } : null;

    return (
        <>
            <Helmet>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDesc} />
                <meta name="robots" content="index, follow" />
                {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
                {/* OpenGraph */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDesc} />
                {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
                <meta property="og:image" content="https://advmdshahalam.me/images/hero/hero-md-shah-alam.png" />
                <meta property="og:site_name" content="Advocate Md. Shah Alam" />
                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={metaTitle} />
                <meta name="twitter:description" content={metaDesc} />
                <meta name="twitter:image" content="https://advmdshahalam.me/images/hero/hero-md-shah-alam.png" />
                {/* JSON-LD */}
                {breadcrumbSchema && <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>}
                {legalServiceSchema && <script type="application/ld+json">{JSON.stringify(legalServiceSchema)}</script>}
                {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
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
                        <a href={waLink()} target="_blank" rel="noopener noreferrer"
                            className="btn-whatsapp text-sm">
                            <MessageCircle size={17} /> WhatsApp Consultation
                        </a>
                        <a href={telLink()}
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
                    {contextNote && (
                        <p className="mt-6 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            {contextNote}
                        </p>
                    )}
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
                            <a href={waLink()} target="_blank" rel="noopener noreferrer"
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
