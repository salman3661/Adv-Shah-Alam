import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-soft-gray dark:bg-navy transition-colors duration-500">
            {/* Background Gradients (Same as before) */}
            <div className="absolute inset-0 z-0 opacity-0 dark:opacity-100 transition-opacity duration-500"
                style={{ background: 'linear-gradient(135deg, #0b1e44 0%, #13274f 100%)' }}></div>
            <div className="absolute inset-0 z-0 opacity-100 dark:opacity-0 transition-opacity duration-500"
                style={{ background: 'linear-gradient(120deg, #f8f9fa 0%, #f0f2f5 50%, #e8eaef 100%)' }}></div>

            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 dark:opacity-10 z-0 mix-blend-soft-light pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10 w-full grid md:grid-cols-2 gap-12 items-center">

                {/* Left: Profile Photo (Updated for Full Size) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex justify-center md:justify-end order-1 md:order-2"
                >
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="relative w-full max-w-sm lg:max-w-md aspect-[4/5] rounded-2xl overflow-hidden border-4 border-gold/20 shadow-2xl group"
                    >
                        {/* Profile Image - Fixed Height to Full/Aspect Ratio */}
                        <img
                            src="/images/hero/hero-md-shah-alam.png"
                            alt="Advocate Md. Shah Alam"
                            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://placehold.co/600x800/1e2e5b/c9a44d?text=Adv+Shah+Alam';
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent"></div>

                        {/* Experience Badge */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                            className="absolute bottom-6 right-6 bg-gold text-navy font-bold px-5 py-2 rounded-lg text-sm shadow-lg border border-white/20 backdrop-blur-md"
                        >
                            12+ Years Exp.
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Right: Headline & Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="text-center md:text-left order-2 md:order-1"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full border border-gold/30 bg-navy/5 dark:bg-white/5 backdrop-blur-sm mb-6">
                        <span className="text-gold-dark dark:text-gold text-xs font-bold uppercase tracking-[0.2em]">
                            Supreme Court of Bangladesh
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-[#1a1430] dark:text-white leading-tight mb-4">
                        Adv. Md. Shah Alam
                        <span className="block text-2xl md:text-3xl text-gold-dark dark:text-gold mt-2 font-sans font-light">
                            Supreme Court, Dhaka
                        </span>
                    </h1>

                    <p className="text-slate-600 dark:text-gray-300 text-lg leading-relaxed max-w-lg mx-auto md:mx-0 mb-8 font-light">
                        Criminal & Civil Litigation Specialist with 12+ years of experience defending rights and securing futures with unwavering dedication.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <motion.a
                            href="https://wa.me/8801955802007"
                            target="_blank"
                            className="flex items-center justify-center gap-2 btn-gold py-4 px-8 shadow-lg rounded-full"
                        >
                            <MessageCircle size={20} />
                            WhatsApp Consult
                        </motion.a>

                        <motion.a
                            href="#contact"
                            className="flex items-center justify-center gap-2 btn-outline-gold py-4 px-8 rounded-full border border-gold text-gold"
                        >
                            Request Consultation
                            <ArrowRight size={20} />
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;