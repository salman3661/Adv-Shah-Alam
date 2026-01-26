import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Gavel, BookOpen, Share2 } from 'lucide-react';

const Journey = () => {
    // Horizontal Cards Desktop, Stacked Mobile
    const milestones = [
        {
            year: 'Present',
            title: 'Supreme Court',
            desc: 'Advocate of the High Court Division, specializing in complex appeals.',
            icon: <Scale size={24} />,
        },
        {
            year: '2015',
            title: 'Public Prosecutor',
            desc: 'Served as District PP, leading state prosecution for critical cases.',
            icon: <Gavel size={24} />,
        },
        {
            year: '2025',
            title: 'High Court',
            desc: 'Admitted to the Bar Council as a High Court practitioner.',
            icon: <BookOpen size={24} />,
        },
        {
            year: '2018',
            title: 'Legal Practice',
            desc: 'Started career at Dhaka District Court in civil litigation.',
            icon: <Share2 size={24} />,
        },
    ];

    return (
        <section id="journey" className="py-24 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute right-0 top-0 w-1/3 h-full bg-gold/5 -skew-x-12 z-0"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center md:text-left mb-12">
                    <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase block mb-3">
                        Career Progression
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-navy dark:text-white">
                        Professional Milestones
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {milestones.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="glass-card p-8 group relative overflow-hidden flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <span className="inline-block px-3 py-1 bg-navy/5 dark:bg-white/10 text-gold text-xs font-bold rounded-full border border-gold/20">
                                    {item.year}
                                </span>
                                <div className="text-navy dark:text-white group-hover:text-gold transition-colors">
                                    {item.icon}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-navy dark:text-white mb-3">
                                {item.title}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                {item.desc}
                            </p>

                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-navy via-navy-light to-navy group-hover:from-gold group-hover:via-gold-light group-hover:to-gold transition-all duration-500 opacity-50 group-hover:opacity-100"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Journey;
