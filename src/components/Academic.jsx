import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const Academic = () => {
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
        <section id="academic" className="py-20 relative" style={{ background: 'var(--surface)' }}>
            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4"
                        style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
                        Academic Background
                    </h2>
                    <div className="w-20 h-1 mx-auto rounded-full"
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
                            className="glass-card p-8 text-center"
                            style={{ borderTop: '4px solid var(--accent)' }}
                        >
                            <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4"
                                style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
                                <GraduationCap size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-2"
                                style={{ color: 'var(--text)' }}>
                                {item.degree}
                            </h3>
                            <p className="font-medium mb-1"
                                style={{ color: 'var(--text-secondary)' }}>
                                {item.inst}
                            </p>
                            <p className="text-sm font-bold"
                                style={{ color: 'var(--gold)' }}>
                                {item.year}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Academic;
