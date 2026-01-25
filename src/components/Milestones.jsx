import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Facebook, Scale, Briefcase } from 'lucide-react';

const Milestones = () => {
    // Milestones Data
    // Icon Colors: WhatsApp (Green), Facebook (Blue), Main (Gray/Navy)
    const milestones = [
        {
            title: 'Advocate',
            subtitle: 'Supreme Court of Bangladesh',
            year: '2008 – Present',
            icon: <Scale size={24} />,
            type: 'court', // gray
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
            type: 'whatsapp', // green
            link: 'https://wa.me/your-number',
        },
        {
            title: 'Social Presence',
            subtitle: 'Legal Awareness & Community',
            year: 'Active',
            icon: <Facebook size={24} />,
            type: 'facebook', // blue
            link: 'https://facebook.com/your-profile',
        },
    ];

    const getIconStyle = (type, theme) => {
        // Returns classes for the icon container based on type
        // Note: Tailwind v4 usage assumed based on project
        switch (type) {
            case 'whatsapp':
                return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
            case 'facebook':
                return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
            default:
                return 'bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-gray-300';
        }
    };

    return (
        <section id="milestones" className="py-24 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute left-0 top-1/4 w-1/3 h-1/2 bg-gold/5 blur-3xl rounded-full -z-10"></div>

            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-16">
                    <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase block mb-3">
                        Career Progression
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-navy dark:text-white">
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
                            className="group relative flex flex-col items-center text-center p-8 rounded-2xl glass-card hover:shadow-xl transition-all duration-300 border border-white/20 dark:border-white/5"
                        >
                            {/* Icon Box */}
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 shadow-sm ${getIconStyle(item.type)}`}>
                                {item.icon}
                            </div>

                            {/* Content */}
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-navy dark:text-white group-hover:text-gold transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
                                    {item.subtitle}
                                </p>
                                <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mt-4 border-t border-slate-200 dark:border-white/10 pt-4 inline-block w-full">
                                    {item.year}
                                </p>
                            </div>

                            {/* Hover Bottom Bar */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Milestones;
