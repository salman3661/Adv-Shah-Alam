import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Academics = () => {
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
        <>
            <Helmet>
                <title>Academic Background | Adv. Md. Shah Alam</title>
                <meta name="description" content="Academic qualifications and degrees of Advocate Md. Shah Alam." />
            </Helmet>
            <section id="academics" className="py-24 min-h-screen bg-soft-gray dark:bg-navy relative">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>

                <div className="container mx-auto px-6 max-w-5xl relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase block mb-3">
                            Education & Qualifications
                        </span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-navy dark:text-white mb-4">Academic Background</h2>
                        <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {education.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="glass-card p-10 text-center border-t-4 border-t-gold hover:translate-y-[-10px] transition-transform duration-300"
                            >
                                <div className="w-16 h-16 mx-auto bg-navy/5 dark:bg-white/10 rounded-full flex items-center justify-center text-gold mb-6 shadow-inner">
                                    <GraduationCap size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-navy dark:text-white mb-2">{item.degree}</h3>
                                <p className="text-slate-500 dark:text-slate-300 font-medium mb-4">{item.inst}</p>
                                <span className="inline-block px-4 py-1 rounded-full bg-gold/10 text-gold font-bold text-sm">
                                    {item.year}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Academics;
