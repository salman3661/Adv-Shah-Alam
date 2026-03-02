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
        <section id="journey" className="py-24 relative overflow-hidden" style={{ background: 'var(--bg)' }}>
            {/* Background Accent */}
            <div className="absolute right-0 top-0 w-1/3 h-full -skew-x-12 z-0 pointer-events-none"
                style={{ background: 'var(--accent-subtle)' }}></div>

            <div className="container mx-auto px-6 relative z-10 max-w-6xl">
                <div className="text-center mb-20">
                    <span className="label-accent block mb-3">
                        Career Progression
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold"
                        style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
                        Professional Journey
                    </h2>
                    <div className="w-24 h-1 mx-auto mt-4 rounded-full"
                        style={{ background: 'var(--accent)' }}></div>
                </div>

                {/* --- Work Experience Section --- */}
                <div className="mb-24">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
                            style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
                            <Briefcase size={28} />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold"
                            style={{ color: 'var(--text)' }}>
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
                                className="glass-card p-8 group relative rounded-[2rem] shadow-xl hover:shadow-2xl transition-all"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-sm tracking-widest"
                                        style={{
                                            background: 'var(--accent-subtle)',
                                            color: 'var(--accent)',
                                            border: '1px solid var(--card-border)'
                                        }}>
                                        {exp.id}
                                    </div>
                                    {exp.current && (
                                        <span className="status-current">
                                            <span className="status-dot"></span>
                                            Current
                                        </span>
                                    )}
                                </div>
                                <h4 className="text-2xl font-bold transition-colors"
                                    style={{ color: 'var(--text)' }}>
                                    {exp.title}
                                </h4>
                                <p className="font-medium mt-2"
                                    style={{ color: 'var(--text-muted)' }}>
                                    {exp.org}
                                </p>
                                <div className="mt-6 flex items-center gap-2">
                                    <div className="h-px w-8"
                                        style={{ background: 'var(--accent)' }}></div>
                                    <p className="font-bold text-sm tracking-tighter italic"
                                        style={{ color: 'var(--accent)' }}>
                                        {exp.period}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* --- Education Section --- */}
                <div>
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
                            style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
                            <GraduationCap size={28} />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold"
                            style={{ color: 'var(--text)' }}>
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
                                className="glass-card p-8 rounded-[2rem] shadow-lg hover:-translate-y-2 transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xs mb-6"
                                    style={{
                                        background: 'var(--accent-subtle)',
                                        color: 'var(--text-muted)',
                                        border: '1px solid var(--card-border)'
                                    }}>
                                    {edu.id}
                                </div>
                                <h4 className="text-xl font-bold mb-2"
                                    style={{ color: 'var(--text)' }}>
                                    {edu.degree}
                                </h4>
                                <p className="text-sm leading-relaxed mb-6 h-12"
                                    style={{ color: 'var(--text-muted)' }}>
                                    {edu.institution}
                                </p>
                                <div className="inline-block text-xs px-4 py-1.5 rounded-lg font-black tracking-widest"
                                    style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
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