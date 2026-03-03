import React from 'react';
import { motion } from 'framer-motion';
import { WA_NUMBER } from '../data/contactInfo';
import { MessageCircle, Facebook, Scale, Briefcase } from 'lucide-react';

const Milestones = () => {
    const milestones = [
        {
            title: 'Advocate',
            subtitle: 'Supreme Court of Bangladesh',
            year: '2008 – Present',
            icon: <Scale size={24} />,
            type: 'court',
            link: '#',
        },
        {
            title: 'Public Prosecutor',
            subtitle: 'District & Sessions Judge Court',
            year: '2015 – 2020',
            icon: <Briefcase size={24} />,
            type: 'court',
            link: '#',
        },
        {
            title: 'Legal Consultant',
            subtitle: 'Direct Legal Support (WhatsApp)',
            year: 'Available Daily',
            icon: <MessageCircle size={24} />,
            type: 'whatsapp',
            link: `https://wa.me/${WA_NUMBER}`,
        },
        {
            title: 'Social Presence',
            subtitle: 'Legal Awareness & Community',
            year: 'Active',
            icon: <Facebook size={24} />,
            type: 'facebook',
            link: 'https://www.facebook.com/advmd.shahalamfb',
        },
    ];

    const getIconStyle = (type) => {
        switch (type) {
            case 'whatsapp':
                return { background: 'rgba(37,211,102,0.12)', color: '#25D366' };
            case 'facebook':
                return { background: 'rgba(24,119,242,0.12)', color: '#1877F2' };
            default:
                return { background: 'var(--accent-subtle)', color: 'var(--accent)' };
        }
    };

    return (
        <section id="milestones" className="py-24 relative overflow-hidden" style={{ background: 'var(--bg)' }}>
            {/* Background Decoration */}
            <div className="absolute left-0 top-1/4 w-1/3 h-1/2 blur-3xl rounded-full -z-10 pointer-events-none"
                style={{ background: 'var(--accent-subtle)' }}></div>

            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-16">
                    <span className="label-accent block mb-3">
                        Career Progression
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold"
                        style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
                        Professional Milestones
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {milestones.map((item, index) => (
                        <motion.a
                            href={item.link}
                            key={index}
                            target={item.link !== '#' ? '_blank' : '_self'}
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative flex flex-col items-center text-center p-8 rounded-2xl glass-card hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                            {/* Icon Box */}
                            <div
                                className="w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 shadow-sm"
                                style={getIconStyle(item.type)}
                            >
                                {item.icon}
                            </div>

                            {/* Content */}
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold transition-colors"
                                    style={{ color: 'var(--text)' }}>
                                    {item.title}
                                </h3>
                                <p className="text-sm font-bold"
                                    style={{ color: 'var(--text-secondary)' }}>
                                    {item.subtitle}
                                </p>
                                <p className="text-xs font-medium uppercase tracking-widest mt-4 pt-4 inline-block w-full"
                                    style={{
                                        color: 'var(--text-muted)',
                                        borderTop: '1px solid var(--card-border)'
                                    }}>
                                    {item.year}
                                </p>
                            </div>

                            {/* Hover Bottom Bar */}
                            <div className="absolute bottom-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ background: `linear-gradient(to right, transparent, var(--accent), transparent)` }}>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Milestones;
