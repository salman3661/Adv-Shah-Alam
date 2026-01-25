import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const Academic = () => {
    const education = [
        {
            inst: 'Dhaka University',
            degree: 'Master of Laws (LLM)',
            year: '2004',
        },
        {
            inst: 'Dhaka University',
            degree: 'Bachelor of Laws (LLB)',
            year: '2003',
        },
        {
            inst: 'Bangladesh Bar Council',
            degree: 'Advocate Enrollment',
            year: '2003',
        },
    ];

    return (
        <section id="academic" className="py-20 bg-navy dark:bg-black/20 text-white relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>

            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Academic Background</h2>
                    <div className="w-20 h-1 bg-gold mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {education.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="glass-card p-8 text-center border-t-4 border-t-gold"
                        >
                            <div className="w-12 h-12 mx-auto bg-white/10 rounded-full flex items-center justify-center text-gold mb-4">
                                <GraduationCap size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-navy dark:text-white mb-2">{item.degree}</h3>
                            <p className="text-slate-500 dark:text-slate-300 font-medium mb-1">{item.inst}</p>
                            <p className="text-gold text-sm font-bold">{item.year}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Academic;
