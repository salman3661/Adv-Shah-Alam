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

    return (
        <section id="why-choose-me" className="py-20 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-[2px] bg-gold"></div>
                        <span className="text-gold font-bold uppercase tracking-widest text-sm">Why Choose Me</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-navy mb-8 leading-tight">
                        Unwavering Dedication to <br />
                        <span className="text-gold">Your Legal Rights.</span>
                    </h2>

                    <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                        With over two decades of experience in the legal field, I bring a wealth of knowledge
                        and a track record of success. My approach is rooted in integrity, thorough preparation,
                        and a relentless drive to secure the best possible outcome for my clients.
                    </p>

                    <div className="space-y-4">
                        {features.map((item, index) => (
                            <div key={index} className="flex items-center gap-3 text-navy">
                                <CheckCircle className="text-gold shrink-0" size={20} />
                                <span className="text-lg font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Right Stats / Visuals */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 gap-6 relative"
                >
                    {/* Decorative bg blob */}
                    <div className="absolute inset-0 bg-gold/10 blur-3xl rounded-full transform rotate-45 -z-10"></div>

                    <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg text-center hover:border-gold/50 transition-colors shadow-sm">
                        <Award className="text-gold mx-auto mb-4" size={40} />
                        <h3 className="text-3xl font-bold text-navy mb-1">20+</h3>
                        <p className="text-slate-500 text-sm uppercase tracking-wide">Years Experience</p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg text-center hover:border-gold/50 transition-colors shadow-sm mt-8">
                        <BookOpen className="text-gold mx-auto mb-4" size={40} />
                        <h3 className="text-3xl font-bold text-navy mb-1">High</h3>
                        <p className="text-slate-500 text-sm uppercase tracking-wide">Success Rate</p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg text-center hover:border-gold/50 transition-colors shadow-sm -mt-8">
                        <Users className="text-gold mx-auto mb-4" size={40} />
                        <h3 className="text-3xl font-bold text-navy mb-1">500+</h3>
                        <p className="text-slate-500 text-sm uppercase tracking-wide">Happy Clients</p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg text-center hover:border-gold/50 transition-colors shadow-sm">
                        <CheckCircle className="text-gold mx-auto mb-4" size={40} />
                        <h3 className="text-3xl font-bold text-navy mb-1">100%</h3>
                        <p className="text-slate-500 text-sm uppercase tracking-wide">Transparency</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default WhyChooseMe;
