import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { waLink } from '../data/contactInfo';
import { ChevronDown } from 'lucide-react';
import faqData from '../content/faq.json';
const faqs = faqData.items;

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

    return (
        <section id="faq" className="py-24 relative overflow-hidden" style={{ background: 'var(--surface)' }}>
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-12">
                    <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="label-accent block mb-3">
                        Frequently Asked Questions
                    </motion.span>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
                        Legal Questions Answered
                    </motion.h2>
                    <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                        className="w-24 h-1 mx-auto rounded-full" style={{ background: 'var(--accent)' }}></motion.div>
                </div>

                <div className="space-y-3">
                    {faqs.map((faq, i) => (
                        <motion.div key={i}
                            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                            className="glass-card overflow-hidden transition-all duration-200"
                            style={{ borderColor: openIndex === i ? 'var(--accent)' : undefined }}
                        >
                            <button onClick={() => toggle(i)}
                                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                                aria-expanded={openIndex === i}>
                                <span className="font-semibold text-sm md:text-base leading-snug pr-2" style={{ color: 'var(--text)' }}>
                                    {faq.q}
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
                                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{faq.a}</p>
                                            <a href={waLink()} target="_blank" rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-xs font-semibold mt-4 hover:underline"
                                                style={{ color: 'var(--accent)' }}>
                                                Get expert advice on this →
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
    );
};

export default FAQ;
