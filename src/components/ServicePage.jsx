import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { telLink, waLink } from '../data/contactInfo';
import { MessageCircle, Phone, CheckCircle, ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const BASE = 'https://www.advmdshahalam.me';

/**
 * Reusable service page layout.
 * Hero always dark (uses --hero-* vars that don't change with theme).
 * Coverage/FAQ/CTA use body CSS vars (theme-aware).
 */
const ServicePage = ({ metaTitle, metaDesc, canonicalUrl, h1, intro, coverage, faqItems, ctaText, contextNote, relatedBlogLinks, relatedServices }) => {
    const [openFaq, setOpenFaq] = useState(null);

    // Ensure www in canonical
    const wwwCanonical = canonicalUrl
        ? canonicalUrl.replace('https://advmdshahalam.me', BASE)
        : null;

    const breadcrumbSchema = wwwCanonical ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
            { '@type': 'ListItem', position: 2, name: 'Services', item: `${BASE}/#services` },
            { '@type': 'ListItem', position: 3, name: h1, item: wwwCanonical },
        ],
    } : null;

    const legalServiceSchema = wwwCanonical ? {
        '@context': 'https://schema.org',
        '@type': 'LegalService',
        name: h1,
        description: metaDesc,
        url: wwwCanonical,
        provider: {
            '@type': 'Person',
            name: 'Advocate Md. Shah Alam',
            jobTitle: 'Advocate',
            url: `${BASE}/advocate-md-shah-alam`,
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
                {wwwCanonical && <link rel="canonical" href={wwwCanonical} />}
                {/* OpenGraph */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDesc} />
                {wwwCanonical && <meta property="og:url" content={wwwCanonical} />}
                <meta property="og:image" content={`${BASE}/images/hero/hero-md-shah-alam.png`} />
                <meta property="og:site_name" content="Advocate Md. Shah Alam" />
                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={metaTitle} />
                <meta name="twitter:description" content={metaDesc} />
                <meta name="twitter:image" content={`${BASE}/images/hero/hero-md-shah-alam.png`} />
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

            {/* FAQ — theme-aware, interactive accordion */}
            {faqItems?.length > 0 && (
                <section className="py-16" style={{ background: 'var(--surface)' }}>
                    <div className="container mx-auto px-6 max-w-5xl">
                        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8"
                            style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-3">
                            {faqItems.map((faq, i) => (
                                <motion.div key={i}
                                    initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                                    className="glass-card overflow-hidden"
                                    style={{ borderColor: openFaq === i ? 'var(--accent)' : undefined }}>
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                                        aria-expanded={openFaq === i}>
                                        <span className="font-semibold text-sm md:text-base leading-snug pr-2" style={{ color: 'var(--text)' }}>
                                            {faq.q}
                                        </span>
                                        <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.28 }}
                                            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                                            style={{ background: openFaq === i ? 'var(--accent)' : 'var(--accent-subtle)', color: openFaq === i ? '#fff' : 'var(--accent)' }}>
                                            <ChevronDown size={17} />
                                        </motion.div>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {openFaq === i && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.32, ease: [0.04, 0.62, 0.23, 0.98] }}>
                                                <div className="px-6 pb-6">
                                                    <div className="w-full h-px mb-4" style={{ background: 'var(--card-border)' }} />
                                                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{faq.a}</p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Further Reading — service → blog internal linking */}
            {relatedBlogLinks?.length > 0 && (
                <section className="py-14" style={{ background: 'var(--bg)' }}>
                    <div className="container mx-auto px-6 max-w-5xl">
                        <h2 className="text-xl font-bold mb-5 flex items-center gap-2"
                            style={{ color: 'var(--text)' }}>
                            📖 Further Reading
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {relatedBlogLinks.map((link, i) => (
                                <Link key={i} to={link.to}
                                    className="glass-card p-5 flex items-start gap-3 group no-underline"
                                    style={{ textDecoration: 'none' }}>
                                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                                        style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
                                        <ArrowRight size={15} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold group-hover:underline decoration-dotted leading-snug" style={{ color: 'var(--text)' }}>
                                            {link.title}
                                        </p>
                                        {link.desc && (
                                            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{link.desc}</p>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Related Legal Services — cross-service interlinking */}
            {relatedServices?.length > 0 && (
                <section className="py-14" style={{ background: 'var(--surface)' }}>
                    <div className="container mx-auto px-6 max-w-5xl">
                        <h2 className="text-xl font-bold mb-5" style={{ color: 'var(--text)' }}>
                            ⚖️ Other Legal Services in Bangladesh
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {relatedServices.map((svc, i) => (
                                <Link key={i} to={svc.to}
                                    className="glass-card p-4 flex items-center gap-3 group no-underline"
                                    style={{ textDecoration: 'none' }}>
                                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                                        style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
                                        <ArrowRight size={13} />
                                    </div>
                                    <span className="text-sm font-medium group-hover:underline decoration-dotted"
                                        style={{ color: 'var(--text)' }}>
                                        {svc.label}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

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
