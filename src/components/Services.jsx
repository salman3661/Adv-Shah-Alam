import React from 'react';
import { motion } from 'framer-motion';
import { waLink } from '../data/contactInfo';
import { Scale, Users, Home, Shield, Landmark, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import serviceCardsData from '../content/services.json';

// Map icon name strings to Lucide components
const ICON_MAP = { Shield, Users, Home, Scale, Landmark, FileText };

// Resolve icon components from content data (items array from JSON)
const services = serviceCardsData.items.map(s => ({
    ...s,
    icon: ICON_MAP[s.icon] ?? FileText,
}));

const Services = ({ lang = 'en' }) => {
    const isBn = lang === 'bn';

    return (
        <section id="services" className="py-20 relative overflow-hidden" style={{ background: 'var(--bg)' }}>
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="label-accent block mb-3">
                        {isBn ? 'আইনি সেবাসমূহ' : 'How We Help You'}
                    </motion.span>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-serif font-bold mb-3" style={{ color: 'var(--text)', fontFamily: isBn ? 'inherit' : "'Playfair Display', serif" }}>
                        {isBn ? 'আইনের প্রতিটি ক্ষেত্রে আমরা পাশে আছি' : 'Legal Services & Practice Areas'}
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
                        className="text-sm max-w-xl mx-auto mb-4" style={{ color: 'var(--text-muted)' }}>
                        {isBn 
                            ? 'ব্যক্তিগত সমস্যা থেকে জটিল আইনি বিরোধ — উত্তরা, ঢাকায় আমাদের চেম্বারে আসুন অথবা সরাসরি WhatsApp করুন।'
                            : 'From personal matters to complex litigation — visit our chamber in Uttara, Dhaka or contact us via WhatsApp.'}
                    </motion.p>
                    <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                        className="w-24 h-1 mx-auto rounded-full" style={{ background: 'var(--accent)' }}></motion.div>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {services.map((service) => (
                        <motion.div key={service.title}
                            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.48 }} viewport={{ once: true }}
                            className="glass-card p-7 flex flex-col group"
                        >
                            <div className="flex items-start justify-between mb-5">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                                    style={{ background: service.iconColor, color: service.iconText }}>
                                    <service.icon size={26} />
                                </div>
                                <span
                                    className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                                    style={{ background: 'rgba(34,197,94,0.10)', color: '#16a34a', border: '1px solid rgba(34,197,94,0.25)' }}
                                >
                                    {isBn ? 'পরামর্শ করুন' : 'Consultation'}
                                </span>
                            </div>

                            <h3 className="text-base font-bold mb-3 leading-snug" style={{ color: 'var(--text)' }}>
                                {isBn && service.titleBn ? service.titleBn : service.title}
                            </h3>

                            <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: 'var(--text-muted)' }}>
                                {isBn && service.descBn ? service.descBn : service.desc}
                            </p>

                            <Link to={service.link}
                                className="inline-flex items-center gap-1.5 text-sm font-semibold hover:gap-2.5 transition-all duration-200"
                                style={{ color: 'var(--accent)' }}
                                aria-label={`View details for ${service.title}`}>
                                {isBn ? 'বিস্তারিত দেখুন' : 'Explore Service'} <ArrowRight size={15} />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                    className="text-center mt-12">
                    <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                        {isBn 
                            ? 'কোন সেবাটি আপনার দরকার বুঝতে পারছেন না? সরাসরি জিজ্ঞেস করুন — আমরা সাহায্য করবো।'
                            : 'Not sure which service fits your situation? Ask us directly — we are here to guide you.'}
                    </p>
                    <a href={waLink()} target="_blank" rel="noopener noreferrer"
                        className="btn-primary inline-flex items-center gap-2 py-3.5 px-8 shadow-lg text-sm">
                        {isBn ? 'আজই কথা বলুন' : 'Speak with Us Today'}
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
