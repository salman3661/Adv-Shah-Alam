import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { waLink } from '../data/contactInfo';
import { ChevronDown } from 'lucide-react';
import faqData from '../content/faq.json';
const faqs = faqData.items;

const FAQ = ({ lang = 'en' }) => {
    const isBn = lang === 'bn';
    const [openIndex, setOpenIndex] = useState(null);
    const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

    // FAQPage JSON-LD schema for Google rich results
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: isBn ? faq.q_bn : faq.q,
            acceptedAnswer: {
                '@type': 'Answer',
                text: isBn ? faq.a_bn : faq.a,
            },
        })),
    };

    return (
        <>
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(faqSchema)}
                </script>
            </Helmet>

            <section id="faq" className="py-24 relative overflow-hidden" style={{ background: 'var(--surface)' }}>
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border" style={{ borderColor: 'var(--accent)', background: 'rgba(var(--accent-rgb), 0.05)' }}>
                            <span className="text-sm font-medium tracking-wide uppercase" style={{ color: 'var(--accent)' }}>
                                {isBn ? 'সহায়তা' : 'Knowledge Base'}
                            </span>
                        </motion.div>
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-serif font-bold mb-6" style={{ color: 'var(--text)' }}>
                            {isBn ? 'আপনার জিজ্ঞাসা' : 'Frequently Asked'}
                        </motion.h2>
                        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                            className="text-lg opacity-80 max-w-lg mx-auto">
                            {isBn ? 'আইনি প্রক্রিয়ার জটিলতা সহজ করতে আমাদের সচরাচর জিজ্ঞাসিত প্রশ্নগুলো দেখুন।' : 'Clear up your legal uncertainties with our curated list of frequently asked questions.'}
                        </motion.p>
                    </div>

                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                                className="glass-card overflow-hidden transition-all duration-200 border"
                                style={{ borderColor: openIndex === i ? 'var(--accent)' : 'var(--card-border)' }}
                            >
                                <button onClick={() => toggle(i)}
                                    className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                                    aria-expanded={openIndex === i}>
                                    <span className="font-semibold text-sm md:text-base leading-snug pr-2" style={{ color: 'var(--text)' }}>
                                        {isBn ? faq.q_bn : faq.q}
                                    </span>
                                    <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.28 }}
                                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                                        style={{ background: openIndex === i ? 'var(--accent)' : 'rgba(29,78,216,0.08)', color: openIndex === i ? '#fff' : 'var(--accent)' }}>
                                        <ChevronDown size={17} />
                                    </motion.div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {openIndex === i && (
                                        <motion.div key="content"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.32, ease: [0.04, 0.62, 0.23, 0.98] }}>
                                            <div className="px-6 pb-6">
                                                <div className="w-full h-px mb-4" style={{ background: 'var(--card-border)' }}></div>
                                                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{isBn ? faq.a_bn : faq.a}</p>
                                                <a href={waLink()} target="_blank" rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 text-xs font-semibold mt-4 hover:underline"
                                                    style={{ color: 'var(--accent)' }}>
                                                    {isBn ? 'এই বিষয়ে বিশেষজ্ঞ পরামর্শ নিন →' : 'Get expert advice on this →'}
                                                </a>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default FAQ;
