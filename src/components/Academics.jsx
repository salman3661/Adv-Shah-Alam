import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const Academics = () => {
    const education = [
        {
            inst: 'Dhaka International University - DIU',
            degree: 'Master of Laws (LLM)',
            year: '2019',
        },
        {
            inst: 'Metro Police Ideal Law College, Dhaka',
            degree: 'Bachelor of Laws (LLB)',
            year: '2014',
        },
        {
            inst: 'Bangladesh Bar Council',
            degree: 'Advocate Enrollment',
            year: '2010',
        },
    ];

    return (
        <section id="academics" className="py-24 min-h-screen relative" style={{ background: 'var(--bg)' }}>
            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <div className="text-center mb-16">
                    <span className="label-accent block mb-3">
                        Education &amp; Qualifications
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4"
                        style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
                        Academic Background
                    </h2>
                    <div className="w-24 h-1 mx-auto rounded-full"
                        style={{ background: 'var(--accent)' }}></div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {education.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="glass-card p-10 text-center hover:translate-y-[-10px] transition-transform duration-300"
                            style={{ borderTop: '4px solid var(--accent)' }}
                        >
                            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 shadow-inner"
                                style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
                                <GraduationCap size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-2"
                                style={{ color: 'var(--text)' }}>
                                {item.degree}
                            </h3>
                            <p className="font-medium mb-4"
                                style={{ color: 'var(--text-secondary)' }}>
                                {item.inst}
                            </p>
                            <span className="inline-block px-4 py-1 rounded-full font-bold text-sm"
                                style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
                                {item.year}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Academics;
