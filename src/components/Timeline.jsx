import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const Timeline = ({ isHome = false }) => {
    const education = [
        { institution: 'Dhaka International University (DIU)', degree: 'LL.M', year: '2010' },
        { institution: 'Metro Police Ideal Law College, Dhaka', degree: 'LL.B & Bar Council', year: '2008' },
        { institution: 'Gazipur Law College, Gazipur', degree: 'LL.B', year: '2006' },
        { institution: 'Asian University of Bangladesh (AUB)', degree: 'BBA, MBA', year: '2004 – 2007' },
        { institution: 'Tongi Govt. University & College, Gazipur', degree: 'HSC, BA', year: '2002 – 2005' },
        { institution: 'Maligram High School, Bhanga, Faridpur', degree: 'SSC', year: '2000' },
    ];

    const workExperience = [
        { title: 'Advocate', organization: 'Supreme Court of Bangladesh', period: '2008 – Present', isCurrent: true },
        { title: 'APP (Assistant Public Prosecutor)', organization: 'Metro Sessions Court, Dhaka', period: '2015 – 2020', isCurrent: false },
    ];

    const visibleEducation = isHome ? education.slice(0, 3) : education;

    const LogoBadge = ({ text }) => (
        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-xs text-center leading-tight px-1"
            style={{ background: 'var(--accent-subtle)', color: 'var(--accent)', border: '1px solid var(--card-border)' }}>
            {text.split(' ').map(w => w[0]).join('').slice(0, 3)}
        </div>
    );

    return (
        <section id="timeline" className="py-24 relative overflow-hidden"
            style={{ background: isHome ? 'var(--bg)' : 'transparent' }}>

            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="label-accent block mb-3">
                        Education &amp; Experience
                    </motion.span>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-serif font-bold mb-4"
                        style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
                        Professional Journey
                    </motion.h2>
                    <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                        className="divider-accent mx-auto"></motion.div>
                </div>

                {/* Work Experience */}
                <div className="mb-16">
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                        className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
                            <Briefcase size={18} />
                        </div>
                        <h3 className="text-2xl font-serif font-bold" style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
                            Work Experience
                        </h3>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {workExperience.map((item, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.2 }}
                                className="timeline-card p-6 flex gap-4 cursor-default">
                                <LogoBadge text={item.organization} />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <h4 className="text-base font-bold leading-snug" style={{ color: 'var(--text)' }}>{item.title}</h4>
                                        {item.isCurrent && (
                                            <span className="status-current flex-shrink-0">
                                                <span className="status-dot"></span> Current
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>{item.organization}</p>
                                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{item.period}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Education */}
                <div>
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                        className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
                            <GraduationCap size={18} />
                        </div>
                        <h3 className="text-2xl font-serif font-bold" style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
                            Education
                        </h3>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {visibleEducation.map((item, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.2 }}
                                className="timeline-card p-6 cursor-default">
                                <div className="flex items-start gap-4 mb-4">
                                    <LogoBadge text={item.institution} />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-bold leading-tight mb-1" style={{ color: 'var(--text)' }}>{item.degree}</h4>
                                        <p className="text-xs leading-tight" style={{ color: 'var(--text-secondary)' }}>{item.institution}</p>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <span className="text-xs font-bold px-3 py-1 rounded-full"
                                        style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
                                        {item.year}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {isHome && (
                        <div className="flex justify-center mt-6">
                            <Link to="/education" className="btn-secondary inline-flex items-center gap-2 text-sm">
                                <GraduationCap size={17} /> View Detailed Education History
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Timeline;
