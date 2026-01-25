import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Users, Gavel, BookOpen } from 'lucide-react';

const Expertise = () => {
    const services = [
        {
            icon: <Users size={32} />,
            title: 'Client Counseling',
            desc: 'Strategic legal advice tailored to your personal or business needs.',
        },
        {
            icon: <Scale size={32} />,
            title: 'Criminal Law',
            desc: 'Expert defense for bail, trials, and appeals in all courts.',
        },
        {
            icon: <Gavel size={32} />,
            title: 'Civil Litigation',
            desc: 'Resolving land disputes, family matters, and contract issues.',
        },
        {
            icon: <BookOpen size={32} />,
            title: 'Legal Research',
            desc: 'Comprehensive case analysis and drafting for superior outcomes.',
        },
    ];

    return (
        <section id="expertise" className="py-24">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase block mb-3">
                        Areas of Practice
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy dark:text-white mb-4">Legal Expertise</h2>
                    <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="glass-card p-8 group text-center"
                        >
                            <div className="w-16 h-16 mx-auto bg-navy/5 dark:bg-white/10 rounded-full flex items-center justify-center text-navy dark:text-gold mb-6 group-hover:bg-gold group-hover:text-navy transition-colors duration-300">
                                {service.icon}
                            </div>

                            <h3 className="text-xl font-bold text-navy dark:text-white mb-3 group-hover:text-gold transition-colors duration-300">
                                {service.title}
                            </h3>
                            <p className="text-slate-500 dark:text-slate-300 leading-relaxed text-sm">
                                {service.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Expertise;
