import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Users, Gavel, BookOpen, Shield, FileText } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const PracticeAreas = () => {
    const services = [
        {
            icon: <Users size={32} />,
            title: 'Client Counseling',
            desc: 'Strategic legal advice tailored to your personal or business needs, ensuring clarity and direction.',
        },
        {
            icon: <Scale size={32} />,
            title: 'Criminal Law',
            desc: 'Expert defense for bail, trials, and appeals in all courts. Protecting your rights with vigor.',
        },
        {
            icon: <Gavel size={32} />,
            title: 'Civil Litigation',
            desc: 'Resolving land disputes, family matters, and contract issues with precise legal strategies.',
        },
        {
            icon: <BookOpen size={32} />,
            title: 'Legal Research',
            desc: 'Comprehensive case analysis and drafting for superior outcomes in complex litigations.',
        },
        {
            icon: <Shield size={32} />,
            title: 'Corporate Law',
            desc: 'Advising businesses on compliance, contracts, and dispute resolution.',
        },
        {
            icon: <FileText size={32} />,
            title: 'Writ Jurisdiction',
            desc: 'Filing writs in the High Court Division to protect fundamental rights.',
        }
    ];

    return (
        <>
            <Helmet>
                <title>Practice Areas | Adv. Md. Shah Alam</title>
                <meta name="description" content="Legal expertise in Criminal Law, Civil Litigation, Writ Jurisdiction, and Corporate Law." />
            </Helmet>
            <section id="practice-areas" className="py-24 min-h-screen section-alt">
                <div className="container mx-auto px-6">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="label-accent block mb-3"
                        >
                            Areas of Practice
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-serif font-bold mb-4"
                            style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}
                        >
                            Legal Expertise
                        </motion.h2>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="w-24 h-1 mx-auto rounded-full"
                            style={{ background: 'var(--accent)' }}
                        ></motion.div>
                    </div>

                    {/* Services Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="glass-card p-8 group text-center flex flex-col items-center"
                            >
                                {/* Icon */}
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 shadow-sm group-hover:scale-110"
                                    style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
                                    {service.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold mb-3"
                                    style={{ color: 'var(--text)' }}>
                                    {service.title}
                                </h3>

                                {/* Description */}
                                <p className="leading-relaxed text-sm"
                                    style={{ color: 'var(--text-muted)' }}>
                                    {service.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default PracticeAreas;
