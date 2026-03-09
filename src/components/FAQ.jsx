import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { waLink } from '../data/contactInfo';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        q: 'How to get bail in Bangladesh?',
        a: 'To get bail in Bangladesh, a bail application must be filed in the appropriate court — either a Sessions Court, Metropolitan Sessions Court, or the High Court Division, depending on the nature of the charge. An experienced bail lawyer in Dhaka will prepare and file the application, present valid grounds (no flight risk, clean record, health conditions), and argue before the judge. For non-bailable offences, the High Court bail process is often required. Contact Adv. Shah Alam for urgent bail matters.',
    },
    {
        q: 'What is divorce procedure in Bangladesh?',
        a: 'For Muslims, a husband may issue a talaq notice under the Muslim Family Laws Ordinance 1961, which must be sent to the Union Parishad/City Corporation chairman and the spouse. A wife may seek divorce via khula (mutual consent) or through family court on grounds like cruelty or desertion. For Hindus and Christians, separate personal laws apply. All divorce procedures require proper legal documentation and often court proceedings. A divorce lawyer in Uttara can guide you through the complete process.',
    },
    {
        q: 'How long does a criminal case take in Bangladesh?',
        a: 'Simple cases in Magistrate Courts may conclude in 6–18 months. Sessions Court cases often take 2–5 years depending on complexity, number of witnesses, and court schedule. Cases reaching the High Court Division can take longer. Prompt legal action, strong evidence preparation, and an experienced criminal lawyer in Uttara can help accelerate the process.',
    },
    {
        q: 'How to solve land dispute cases in Bangladesh?',
        a: 'Land disputes in Bangladesh are resolved through civil courts by filing a title suit, partition suit, or declaration suit. Supporting documents include deed of sale, mutation records, RS/BS khatian, and possession evidence. An experienced land dispute lawyer in Uttara can assess your documents, represent you in court, and pursue swift resolution.',
    },
    {
        q: 'What does a Company & Corporate lawyer do in Bangladesh?',
        a: 'A company and corporate lawyer in Bangladesh helps with business formation under the Companies Act 1994, drafting partnership agreements, shareholder disputes, corporate compliance, and commercial contract review. Advocate Shah Alam advises businesses and entrepreneurs across Dhaka on protecting their commercial interests.',
    },
];

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
