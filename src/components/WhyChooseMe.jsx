import React from 'react';
import { CheckCircle, Award, Users, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const WhyChooseMe = () => {
    const features = [
        '20+ Years of Proven Legal Experience',
        'Advocate of Supreme Court & District Courts',
        'Former District Public Prosecutor (PP)',
        'Multiple Chambers for Client Convenience',
        'Client-Centric & Ethical Representation',
    ];

    const stats = [
        { icon: Award, value: '20+', label: 'Years Experience' },
        { icon: BookOpen, value: 'High', label: 'Success Rate', offset: true },
        { icon: Users, value: '500+', label: 'Happy Clients', negativeOffset: true },
        { icon: CheckCircle, value: '100%', label: 'Transparency' },
    ];

    return (
        <section
            id="why-choose-me"
            className="py-20 relative overflow-hidden"
            style={{ background: 'var(--bg)' }}
        >
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-[2px]" style={{ background: 'var(--accent)' }}></div>
                        <span className="font-bold uppercase tracking-widest text-sm"
                            style={{ color: 'var(--accent)' }}>
                            Why Choose Me
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8 leading-tight"
                        style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
                        Unwavering Dedication to <br />
                        <span style={{ color: 'var(--accent)' }}>Your Legal Rights.</span>
                    </h2>

                    <p className="text-lg mb-8 leading-relaxed"
                        style={{ color: 'var(--text-secondary)' }}>
                        With over two decades of experience in the legal field, I bring a wealth of knowledge
                        and a track record of success. My approach is rooted in integrity, thorough preparation,
                        and a relentless drive to secure the best possible outcome for my clients.
                    </p>

                    <div className="space-y-4">
                        {features.map((item, index) => (
                            <div key={index} className="flex items-center gap-3"
                                style={{ color: 'var(--text)' }}>
                                <CheckCircle className="shrink-0" size={20}
                                    style={{ color: 'var(--gold)' }} />
                                <span className="text-lg font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Right Stats */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 gap-6 relative"
                >
                    {/* Decorative bg blob */}
                    <div className="absolute inset-0 blur-3xl rounded-full transform rotate-45 -z-10"
                        style={{ background: 'var(--accent-subtle)' }}></div>

                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="p-6 rounded-lg text-center transition-colors shadow-sm"
                            style={{
                                background: 'var(--surface)',
                                border: '1px solid var(--card-border)',
                                marginTop: stat.offset ? '2rem' : stat.negativeOffset ? '-2rem' : '0'
                            }}
                        >
                            <stat.icon className="mx-auto mb-4" size={40}
                                style={{ color: 'var(--gold)' }} />
                            <h3 className="text-3xl font-bold mb-1"
                                style={{ color: 'var(--text)' }}>
                                {stat.value}
                            </h3>
                            <p className="text-sm uppercase tracking-wide"
                                style={{ color: 'var(--text-muted)' }}>
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default WhyChooseMe;
