import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Users, Home, Shield, Landmark, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
    {
        icon: Shield,
        title: 'Criminal Lawyer in Uttara',
        desc: 'Expert criminal defense for FIR cases, bail applications, trial representation, and criminal case handling in Dhaka courts.',
        link: '/services/criminal-lawyer',
        iconColor: 'rgba(239,68,68,0.12)',
        iconText: '#EF4444',
    },
    {
        icon: Users,
        title: 'Divorce & Family Lawyer in Uttara',
        desc: 'Handle divorce procedure in Bangladesh, child custody, Muslim family law, mutual divorce, and all family court matters.',
        link: '/services/divorce-lawyer',
        iconColor: 'rgba(236,72,153,0.12)',
        iconText: '#EC4899',
    },
    {
        icon: Home,
        title: 'Land & Property Lawyer in Uttara',
        desc: 'Resolve land dispute cases, property mutation, registration, land fraud, and title deed matters in Bangladesh courts.',
        link: '/services/land-lawyer',
        iconColor: 'rgba(34,197,94,0.12)',
        iconText: '#22C55E',
    },
    {
        icon: Scale,
        title: 'Bail Lawyer in Dhaka',
        desc: 'Fast bail applications, anticipatory bail, High Court bail matters, and urgent bail proceedings across Bangladesh courts.',
        link: '/services/bail-lawyer',
        iconColor: 'rgba(59,130,246,0.12)',
        iconText: '#3B82F6',
    },
    {
        icon: Landmark,
        title: 'Supreme Court Lawyer Bangladesh',
        desc: 'Expert representation in High Court Division cases, writ petitions, appellate matters, and constitutional litigation.',
        link: '/services/supreme-court-lawyer',
        iconColor: 'rgba(124,58,237,0.12)',
        iconText: '#7C3AED',
    },
    {
        icon: FileText,
        title: 'Income Tax & VAT Lawyer in Dhaka',
        desc: 'Expert handling of tax disputes, income tax cases, VAT matters, NBR disputes, and the tax appeal process.',
        link: '/services/tax-lawyer',
        iconColor: 'rgba(217,119,6,0.12)',
        iconText: '#D97706',
    },
];

const Services = () => {
    return (
        <section id="services" className="py-24 relative overflow-hidden" style={{ background: 'var(--bg)' }}>
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Header */}
                <div className="text-center mb-14">
                    <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="label-accent block mb-3">
                        Legal Practice Areas
                    </motion.span>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-serif font-bold mb-3" style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
                        Our Legal Services
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
                        className="text-sm max-w-xl mx-auto mb-4" style={{ color: 'var(--text-muted)' }}>
                        As an experienced <strong style={{ color: 'var(--text-2)' }}>advocate in Uttara, Dhaka</strong>, Adv. Shah Alam provides dedicated legal representation across all major practice areas.
                    </motion.p>
                    <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                        className="w-24 h-1 mx-auto rounded-full" style={{ background: 'var(--accent)' }}></motion.div>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {services.map((service, index) => (
                        <motion.div key={index}
                            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.48, delay: index * 0.07 }} viewport={{ once: true }}
                            className="glass-card p-7 flex flex-col group"
                        >
                            <div className="w-13 h-13 rounded-2xl flex items-center justify-center mb-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 w-12 h-12"
                                style={{ background: service.iconColor, color: service.iconText }}>
                                <service.icon size={26} />
                            </div>

                            <h3 className="text-base font-bold mb-3 leading-snug" style={{ color: 'var(--text)' }}>
                                {service.title}
                            </h3>

                            <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: 'var(--text-muted)' }}>
                                {service.desc}
                            </p>

                            <Link to={service.link}
                                className="inline-flex items-center gap-1.5 text-sm font-semibold hover:gap-2.5 transition-all duration-200"
                                style={{ color: 'var(--accent)' }}
                                aria-label={`View details for ${service.title}`}>
                                Explore Service <ArrowRight size={15} />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                    className="text-center mt-12">
                    <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>Not sure which service you need?</p>
                    <a href="https://wa.me/8801955802007" target="_blank" rel="noopener noreferrer"
                        className="btn-primary inline-flex items-center gap-2 py-3.5 px-8 shadow-lg text-sm">
                        Get Free Consultation
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
