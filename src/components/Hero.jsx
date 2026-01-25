import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-soft-gray dark:bg-navy transition-colors duration-500">
            {/* Gradient Background: Navy -> Subtle Gold (Dark Mode) */}
            <div
                className="absolute inset-0 z-0 opacity-0 dark:opacity-100 transition-opacity duration-500"
                style={{
                    background: 'linear-gradient(135deg, #0f1c3c 0%, #1e2e5b 60%, #2b2515 100%)'
                }}
            ></div>

            {/* Light Mode Gradient */}
            <div
                className="absolute inset-0 z-0 opacity-100 dark:opacity-0 transition-opacity duration-500"
                style={{
                    background: 'linear-gradient(100deg, #f5f6f8 0%, #e2e8f0 100%)'
                }}
            ></div>

            {/* Texture overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 dark:opacity-20 z-0 mix-blend-soft-light pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10 w-full grid md:grid-cols-2 gap-12 items-center">

                {/* Left: Profile Photo (Circle Cropped) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex justify-center md:justify-end order-1 md:order-1"
                >
                    <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full border-4 border-gold/50 p-2 shadow-2xl bg-white/50 dark:bg-navy/50 backdrop-blur-sm transition-colors duration-500">
                        <div className="w-full h-full rounded-full overflow-hidden bg-gray-200 dark:bg-navy-light relative flex items-center justify-center group">
                            {/* Placeholder Image - Replace with real photo */}
                            <img
                                src="https://placehold.co/400x400/1e2e5b/d4af37?text=Adv+Shah+Alam"
                                alt="Advocate Md. Shah Alam"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-transparent"></div>
                        </div>
                        {/* Decorative Badge */}
                        <div className="absolute bottom-4 right-4 bg-gold text-navy font-bold px-4 py-2 rounded-full text-xs shadow-lg animate-bounce-slow">
                            20+ Years Exp.
                        </div>
                    </div>
                </motion.div>

                {/* Right: Headline & Content */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="text-center md:text-left order-2 md:order-2"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full border border-gold/30 bg-navy/5 dark:bg-white/5 backdrop-blur-sm mb-6 transition-colors duration-500">
                        <span className="text-gold text-xs font-bold uppercase tracking-[0.2em]">
                            Supreme Court of Bangladesh
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-navy dark:text-white leading-tight mb-4 transition-colors duration-500">
                        Adv. Md. Shah Alam
                        <span className="block text-2xl md:text-3xl text-gold mt-2 font-sans font-light">Supreme Court Dhaka</span>
                    </h1>

                    <p className="text-slate-600 dark:text-gray-300 text-lg leading-relaxed max-w-lg mx-auto md:mx-0 mb-8 font-light transition-colors duration-500">
                        Criminal & Civil Litigation Specialist with 20+ years of experience defending rights and securing futures with unwavering dedication.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <a
                            href="https://wa.me/your-number"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-hover text-navy font-bold py-3.5 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-gold/20"
                        >
                            <MessageCircle size={20} />
                            WhatsApp Consult
                        </a>

                        <a
                            href="#contact"
                            className="flex items-center justify-center gap-2 border border-gold text-gold hover:bg-gold hover:text-navy font-bold py-3.5 px-8 rounded-full transition-all duration-300"
                        >
                            Request Consultation
                            <ArrowRight size={20} />
                        </a>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;
