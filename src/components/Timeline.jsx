import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Scale, Building } from 'lucide-react';

import { Link } from 'react-router-dom';

const Timeline = ({ isHome = false }) => {
    // Education Data - Complete List
    const education = [
        {
            institution: 'Dhaka International University (DIU)',
            degree: 'LL.M',
            year: '2010',
        },
        {
            institution: 'Metro Police Ideal Law College, Dhaka',
            degree: 'LL.B and Bar Council',
            year: '2008',
        },
        {
            institution: 'Gazipur Law College, Gazipur',
            degree: 'LL.B',
            year: '2006',
        },
        {
            institution: 'Asian University of Bangladesh (AUB)',
            degree: 'BBA, MBA',
            year: '2004 - 2007',
        },
        {
            institution: 'Tongi Govt. University & College, Tongi, Gazipur',
            degree: 'HSC, BA',
            year: '2002 - 2005',
        },
        {
            institution: 'Maligram High School, Bhanga, Faridpur',
            degree: 'SSC',
            year: '2000',
        },
    ];

    // Filter education for Home page
    const visibleEducation = isHome ? education.slice(0, 3) : education;

    // Work Experience Data
    const workExperience = [
        {
            title: 'Advocate',
            organization: 'Supreme Court of Bangladesh',
            period: '2008 – Present',
            isCurrent: true,
        },
        {
            title: 'APP (Assistant Public Prosecutor)',
            organization: 'Metro Sessions Court, Dhaka',
            period: '2015 – 2020',
            isCurrent: false,
        },
    ];

    // Placeholder SVG for logos
    const PlaceholderLogo = ({ text }) => (
        <div className="w-12 h-12 rounded-xl bg-navy/10 dark:bg-white/10 flex items-center justify-center flex-shrink-0 border border-navy/10 dark:border-white/10">
            <span className="text-navy dark:text-white font-bold text-xs text-center leading-tight px-1">
                {text.split(' ').map(word => word[0]).join('').slice(0, 3)}
            </span>
        </div>
    );

    return (
        <section id="timeline" className={`py-24 relative overflow-hidden ${isHome ? 'section-alt' : 'bg-transparent'}`}>
            {/* Background Texture - Only on Home or handled by parent */}
            {isHome && (
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 dark:opacity-10 pointer-events-none"></div>
            )}

            {/* Decorative Elements */}
            <div className="absolute left-0 top-1/4 w-1/4 h-1/2 bg-gold/5 blur-3xl rounded-full -z-10"></div>
            <div className="absolute right-0 bottom-1/4 w-1/3 h-1/2 bg-navy/5 dark:bg-gold/5 blur-3xl rounded-full -z-10"></div>

            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-gold-dark dark:text-gold text-xs font-bold tracking-[0.2em] uppercase block mb-3"
                    >
                        Education & Experience
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-serif font-bold text-[#1a1430] dark:text-white mb-4"
                    >
                        Professional Journey
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="w-24 h-1 bg-gold mx-auto rounded-full"
                    ></motion.div>
                </div>

                {/* Work Experience Section */}
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 mb-8"
                    >
                        <div className="w-10 h-10 rounded-full bg-gold/20 dark:bg-gold/30 flex items-center justify-center">
                            <Briefcase size={20} className="text-gold-dark dark:text-gold" />
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-[#1a1430] dark:text-white">
                            Work Experience
                        </h3>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {workExperience.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ duration: 0.2 }}
                                layout
                                className="timeline-card p-6 flex gap-4 cursor-default"
                            >
                                {/* Logo */}
                                <PlaceholderLogo text={item.organization} />

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <h4 className="text-lg font-bold text-[#1a1430] dark:text-white">
                                            {item.title}
                                        </h4>
                                        {item.isCurrent && (
                                            <span className="status-current flex-shrink-0">
                                                <span className="status-dot"></span>
                                                Current
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-slate-600 dark:text-gray-300 font-medium text-sm mb-2">
                                        {item.organization}
                                    </p>
                                    <p className="text-slate-400 dark:text-gray-500 text-xs font-medium uppercase tracking-wider">
                                        {item.period}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Education Section */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 mb-8"
                    >
                        <div className="w-10 h-10 rounded-full bg-navy/10 dark:bg-white/10 flex items-center justify-center">
                            <GraduationCap size={20} className="text-navy dark:text-white" />
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-[#1a1430] dark:text-white">
                            Education
                        </h3>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {visibleEducation.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ duration: 0.2 }}
                                layout
                                className="timeline-card p-6 cursor-default"
                            >
                                {/* Logo */}
                                <div className="flex items-start gap-4 mb-4">
                                    <PlaceholderLogo text={item.institution} />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-base font-bold text-[#1a1430] dark:text-white leading-tight mb-1">
                                            {item.degree}
                                        </h4>
                                        <p className="text-slate-600 dark:text-gray-300 text-sm leading-tight">
                                            {item.institution}
                                        </p>
                                    </div>
                                </div>

                                {/* Year */}
                                <div className="flex items-center justify-end">
                                    <span className="px-3 py-1 rounded-full bg-gold/10 dark:bg-gold/20 text-gold-dark dark:text-gold text-xs font-bold">
                                        {item.year}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Show More Button - Only on Home */}
                    {isHome && (
                        <div className="flex justify-center mt-8">
                            <Link
                                to="/education"
                                className="btn-outline-gold px-8 py-3 flex items-center gap-2 hover:bg-gold hover:text-navy transition-all"
                            >
                                View Detailed Education History
                                <GraduationCap size={18} />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Timeline;
