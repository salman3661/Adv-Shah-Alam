import React from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const Journey = () => {
    const experiences = [
        {
            title: "Advocate",
            org: "Supreme Court of Bangladesh",
            period: "2008 – PRESENT",
            current: true,
            id: "SCo"
        },
        {
            title: "APP (Assistant Public Prosecutor)",
            org: "Metro Sessions Court, Dhaka",
            period: "2015 – 2020",
            id: "MSC"
        }
    ];

    const education = [
        {
            degree: "LL.M",
            institution: "Dhaka International University (DIU)",
            year: "2010",
            id: "DIU"
        },
        {
            degree: "LL.B and Bar Council",
            institution: "Metro Police Ideal Law College, Dhaka",
            year: "2008",
            id: "MPI"
        },
        {
            degree: "LL.B",
            institution: "Gazipur Law College, Gazipur",
            year: "2006",
            id: "GLC"
        }
    ];

    return (
        <section id="journey" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-navy-dark">
            {/* Background Accent */}
            <div className="absolute right-0 top-0 w-1/3 h-full bg-gold/5 -skew-x-12 z-0"></div>

            <div className="container mx-auto px-6 relative z-10 max-w-6xl">
                <div className="text-center mb-20">
                    <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase block mb-3">
                        Career Progression
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-navy dark:text-white">
                        Professional Journey
                    </h2>
                    <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
                </div>

                {/* --- Work Experience Section --- */}
                <div className="mb-24">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold-dark shadow-sm">
                            <Briefcase size={28} />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-navy dark:text-white">
                            Work Experience
                        </h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="glass-card p-8 group relative border border-white dark:border-navy-light/20 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-14 h-14 bg-navy/5 dark:bg-white/5 rounded-2xl flex items-center justify-center font-bold text-navy dark:text-gold text-sm tracking-widest border border-slate-100 dark:border-navy-light/10">
                                        {exp.id}
                                    </div>
                                    {exp.current && (
                                        <span className="bg-green-100 dark:bg-green-900/30 text-green-600 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest animate-pulse">
                                            ● Current
                                        </span>
                                    )}
                                </div>
                                <h4 className="text-2xl font-bold text-navy dark:text-white group-hover:text-gold-dark transition-colors">{exp.title}</h4>
                                <p className="text-slate-500 dark:text-gray-400 font-medium mt-2">{exp.org}</p>
                                <div className="mt-6 flex items-center gap-2">
                                    <div className="h-px w-8 bg-gold"></div>
                                    <p className="text-gold-dark font-bold text-sm tracking-tighter italic">{exp.period}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* --- Education Section --- */}
                <div>
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold-dark shadow-sm">
                            <GraduationCap size={28} />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-navy dark:text-white">
                            Education
                        </h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {education.map((edu, index) => (
                            <motion.div
                                key={edu.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="glass-card p-8 border border-white dark:border-navy-light/20 rounded-[2rem] shadow-lg hover:-translate-y-2 transition-all duration-300"
                            >
                                <div className="w-12 h-12 bg-navy/5 dark:bg-white/5 rounded-xl flex items-center justify-center font-bold text-navy-light dark:text-slate-500 text-xs mb-6">
                                    {edu.id}
                                </div>
                                <h4 className="text-xl font-bold text-navy dark:text-white mb-2">{edu.degree}</h4>
                                <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed mb-6 h-12">{edu.institution}</p>
                                <div className="inline-block bg-gold/10 text-gold-dark text-xs px-4 py-1.5 rounded-lg font-black tracking-widest">
                                    {edu.year}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Journey;