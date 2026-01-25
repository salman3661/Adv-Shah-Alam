import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
    const locations = [
        { title: "Supreme Court Chamber", address: "Room 205, SCBA Bhaban, Shahbag, Dhaka", phone: "+880 1712-345678" },
        { title: "Evening Chamber", address: "House 12, Road 5, Dhanmondi, Dhaka", phone: "+880 1712-345678" }
    ];

    return (
        <>
            <Helmet>
                <title>Contact & Chambers | Adv. Md. Shah Alam</title>
                <meta name="description" content="Contact Advocate Md. Shah Alam. Chamber locations in Shahbag and Dhanmondi, Dhaka." />
            </Helmet>
            <section id="contact" className="py-12 min-h-screen">
                <div className="container mx-auto px-6 max-w-6xl">

                    <div className="text-center mb-16">
                        <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase block mb-3">
                            Get in Touch
                        </span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-navy dark:text-white mb-6">Chambers & Locations</h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">

                        {/* Contact Info & Map */}
                        <div className="space-y-8 order-2 lg:order-1">
                            <div>
                                <div className="space-y-6">
                                    {locations.map((loc, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="glass-card p-6 border-l-4 border-l-gold hover:bg-white/80 dark:hover:bg-navy-light/50 transition-colors"
                                        >
                                            <h3 className="font-bold text-xl text-navy dark:text-white">{loc.title}</h3>
                                            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm mt-3">
                                                <MapPin size={18} className="text-gold" />
                                                {loc.address}
                                            </div>
                                            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm mt-2">
                                                <Phone size={18} className="text-gold" />
                                                {loc.phone}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full h-80 rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.1234!2d90.4!3d23.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQyJzAwLjAiTiA5MMKwMjQnMDAuMCJF!5e0!3m2!1sen!2sbd!4v1600000000000!5m2!1sen!2sbd"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="Map"
                                ></iframe>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="order-1 lg:order-2">
                            <div className="glass-card p-8 md:p-10 sticky top-24">
                                <h2 className="text-2xl font-serif font-bold text-navy dark:text-white mb-2">
                                    Request Consultation
                                </h2>
                                <p className="text-slate-500 mb-8 text-sm">Fill out the form below to start a conversation regarding your legal matters.</p>

                                <form className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-navy dark:text-gold uppercase tracking-wider">Name</label>
                                        <input type="text" className="w-full bg-white dark:bg-navy-dark/50 border border-slate-200 dark:border-navy-light px-4 py-3 rounded-lg text-navy dark:text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all" placeholder="Full Name" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-navy dark:text-gold uppercase tracking-wider">Phone</label>
                                        <input type="tel" className="w-full bg-white dark:bg-navy-dark/50 border border-slate-200 dark:border-navy-light px-4 py-3 rounded-lg text-navy dark:text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all" placeholder="Phone Number" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-navy dark:text-gold uppercase tracking-wider">Details</label>
                                        <textarea rows="4" className="w-full bg-white dark:bg-navy-dark/50 border border-slate-200 dark:border-navy-light px-4 py-3 rounded-lg text-navy dark:text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all resize-none" placeholder="Briefly describe your case..."></textarea>
                                    </div>

                                    <button type="submit" className="w-full bg-gold hover:bg-gold-hover text-navy font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                                        Submit Inquiry
                                    </button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
