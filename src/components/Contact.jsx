import React from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Form submission logic here
        alert('Thank you for your inquiry. We will contact you shortly.');
    };

    return (
        <>
            <Helmet>
                <title>Contact | Adv. Md. Shah Alam</title>
                <meta name="description" content="Contact Advocate Md. Shah Alam for legal consultation. Supreme Court Chamber in Shahbag, Dhaka." />
            </Helmet>
            <section id="contact" className="py-24 min-h-screen section-alt">
                <div className="container mx-auto px-6 max-w-6xl">

                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-gold-dark dark:text-gold text-xs font-bold tracking-[0.2em] uppercase block mb-3"
                        >
                            Get in Touch
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-5xl font-serif font-bold text-navy dark:text-white mb-4"
                        >
                            Contact Us
                        </motion.h2>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="w-24 h-1 bg-gold mx-auto rounded-full"
                        ></motion.div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">

                        {/* Contact Information */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div>
                                <h3 className="text-2xl font-serif font-bold text-navy dark:text-white mb-6">
                                    Let's Discuss Your Case
                                </h3>
                                <p className="text-slate-600 dark:text-gray-300 leading-relaxed mb-8">
                                    Whether you're facing criminal charges, civil disputes, or need legal advice,
                                    we're here to help. Reach out for a confidential consultation.
                                </p>
                            </div>

                            {/* Contact Cards */}
                            <div className="space-y-4">
                                <div className="glass-card p-5 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                                        <Phone size={22} className="text-gold-dark dark:text-gold" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-400 dark:text-gray-500 uppercase tracking-wider mb-1">
                                            Phone
                                        </p>
                                        <a href="tel:+8801712345678" className="text-navy dark:text-white font-medium hover:text-gold transition-colors">
                                            +880 1712-345678
                                        </a>
                                    </div>
                                </div>

                                <div className="glass-card p-5 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                                        <Mail size={22} className="text-gold-dark dark:text-gold" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-400 dark:text-gray-500 uppercase tracking-wider mb-1">
                                            Email
                                        </p>
                                        <a href="mailto:advocate@shahalam.com" className="text-navy dark:text-white font-medium hover:text-gold transition-colors">
                                            shahalam0332@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="glass-card p-5 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin size={22} className="text-gold-dark dark:text-gold" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-400 dark:text-gray-500 uppercase tracking-wider mb-1">
                                            Main Office
                                        </p>
                                        <p className="text-navy dark:text-white font-medium">
                                            Room 205, SCBA Bhaban, Shahbag, Dhaka
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="glass-card p-8 md:p-10">
                                <h3 className="text-2xl font-serif font-bold text-navy dark:text-white mb-2">
                                    Request Consultation
                                </h3>
                                <p className="text-slate-500 dark:text-gray-400 mb-8 text-sm">
                                    Fill out the form below to start a conversation regarding your legal matters.
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-navy dark:text-gold-dark uppercase tracking-wider">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-white dark:bg-navy-dark/50 border border-slate-200 dark:border-navy-light px-4 py-3 rounded-xl text-navy dark:text-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all placeholder:text-slate-400"
                                            placeholder="Full Name"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-navy dark:text-gold-dark uppercase tracking-wider">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            className="w-full bg-white dark:bg-navy-dark/50 border border-slate-200 dark:border-navy-light px-4 py-3 rounded-xl text-navy dark:text-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all placeholder:text-slate-400"
                                            placeholder="Phone Number"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-navy dark:text-gold-dark uppercase tracking-wider">
                                            Case Details
                                        </label>
                                        <textarea
                                            rows="4"
                                            required
                                            className="w-full bg-white dark:bg-navy-dark/50 border border-slate-200 dark:border-navy-light px-4 py-3 rounded-xl text-navy dark:text-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all resize-none placeholder:text-slate-400"
                                            placeholder="Briefly describe your case..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full btn-gold py-4 rounded-xl shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                    >
                                        <Send size={18} />
                                        Submit Inquiry
                                    </button>
                                </form>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
