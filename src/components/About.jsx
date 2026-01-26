import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { Scale, Users, Trophy, Clock } from 'lucide-react';

const AnimatedCounter = ({ value, suffix }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    useEffect(() => {
        if (isInView) {
            const animation = animate(count, value, { duration: 2.5, ease: "easeOut" });
            return animation.stop;
        }
    }, [isInView, value, count]);

    return (
        <span ref={ref} className="inline-flex">
            <motion.span>{rounded}</motion.span>
            <span>{suffix}</span>
        </span>
    );
};

const About = () => {
    const stats = [
        { icon: Clock, value: 20, suffix: '+', label: 'Years Experience', color: 'text-gold-dark dark:text-gold' },
        { icon: Scale, value: 5000, suffix: '+', label: 'Cases Handled', color: 'text-navy dark:text-white' },
        { icon: Trophy, value: 95, suffix: '%', label: 'Success Rate', color: 'text-green-600 dark:text-green-400' },
        { icon: Users, value: 3000, suffix: '+', label: 'Happy Clients', color: 'text-blue-600 dark:text-blue-400' },
    ];

    return (
        <section id="about" className="py-24 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute right-0 top-1/3 w-1/3 h-1/2 bg-gold/5 blur-3xl rounded-full -z-10"></div>
            <div className="absolute left-0 bottom-0 w-1/4 h-1/3 bg-navy/5 dark:bg-gold/5 blur-3xl rounded-full -z-10"></div>

            <div className="container mx-auto px-6 max-w-6xl">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-gold-dark dark:text-gold text-xs font-bold tracking-[0.2em] uppercase block mb-3"
                    >
                        About the Advocate
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-serif font-bold text-[#1a1430] dark:text-white mb-4"
                    >
                        Dedicated to Justice
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="w-24 h-1 bg-gold mx-auto rounded-full"
                    ></motion.div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <p className="text-lg text-slate-600 dark:text-gray-300 leading-relaxed">
                            Advocate Md. Shah Alam is a distinguished legal professional with over two decades of
                            experience practicing law at the Supreme Court of Bangladesh. His unwavering commitment
                            to justice has earned him recognition as one of the most trusted advocates in Dhaka.
                        </p>
                        <p className="text-slate-500 dark:text-gray-400 leading-relaxed">
                            Specializing in criminal and civil litigation, he has successfully represented clients
                            in high-stakes cases involving complex legal challenges. His approach combines thorough
                            legal research, strategic thinking, and compassionate client service.
                        </p>
                        <p className="text-slate-500 dark:text-gray-400 leading-relaxed">
                            Beyond the courtroom, Advocate Shah Alam is passionate about legal education and
                            community service, regularly contributing to legal awareness programs and mentoring
                            young lawyers.
                        </p>

                        {/* Mission Statement */}
                        <div className="glass-card p-6 border-l-4 border-l-gold mt-8">
                            <p className="text-navy dark:text-white font-serif text-lg italic">
                                "Justice delayed is justice denied. I strive to ensure every client receives
                                timely, effective legal representation with the utmost dedication and integrity."
                            </p>
                            <p className="text-gold-dark dark:text-gold font-bold mt-3">
                                — Adv. Md. Shah Alam
                            </p>
                        </div>
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid grid-cols-2 gap-6"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="glass-card p-8 text-center group cursor-default"
                            >
                                <div className={`w-14 h-14 mx-auto mb-4 rounded-full bg-navy/5 dark:bg-white/10 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                                    <stat.icon size={28} />
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold text-[#1a1430] dark:text-white mb-2">
                                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                </h3>
                                <p className="text-slate-500 dark:text-gray-400 text-sm font-medium">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
