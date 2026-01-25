import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Chambers = () => {
    // Combined Chambers + Contact
    const locations = [
        { title: "Supreme Court Chamber", address: "Room 205, SCBA Bhaban, Shahbag, Dhaka", phone: "+880 1712-345678" },
        { title: "Evening Chamber", address: "House 12, Road 5, Dhanmondi, Dhaka", phone: "+880 1712-345678" }
    ];

    return (
        <section id="contact" className="py-24">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-12">

                    {/* Contact Info & Map */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-navy dark:text-white mb-6">Chambers & Locations</h2>
                            <div className="space-y-6">
                                {locations.map((loc, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="glass-card p-6 border-l-4 border-l-navy dark:border-l-gold"
                                    >
                                        <h3 className="font-bold text-lg text-navy dark:text-white">{loc.title}</h3>
                                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm mt-2">
                                            <MapPin size={16} className="text-gold" />
                                            {loc.address}
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm mt-1">
                                            <Phone size={16} className="text-gold" />
                                            {loc.phone}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="w-full h-64 rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700">
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
                    <div className="glass-card p-8 md:p-10">
                        <h2 className="text-2xl font-serif font-bold text-navy dark:text-white mb-2">
                            Request Consultation
                        </h2>
                        <p className="text-slate-500 mb-6 text-sm">Fill out the form below to start a conversation.</p>

                        <form className="space-y-5">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-navy dark:text-gold uppercase tracking-wider">Name</label>
                                <input type="text" className="w-full bg-white dark:bg-navy-light/50 border border-slate-200 dark:border-navy-light px-4 py-3 rounded-lg text-navy dark:text-white focus:outline-none focus:border-gold transition-colors" placeholder="Full Name" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-navy dark:text-gold uppercase tracking-wider">Phone</label>
                                <input type="tel" className="w-full bg-white dark:bg-navy-light/50 border border-slate-200 dark:border-navy-light px-4 py-3 rounded-lg text-navy dark:text-white focus:outline-none focus:border-gold transition-colors" placeholder="Phone Number" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-navy dark:text-gold uppercase tracking-wider">Details</label>
                                <textarea rows="4" className="w-full bg-white dark:bg-navy-light/50 border border-slate-200 dark:border-navy-light px-4 py-3 rounded-lg text-navy dark:text-white focus:outline-none focus:border-gold transition-colors resize-none" placeholder="Describe your case..."></textarea>
                            </div>

                            <button type="submit" className="w-full bg-gold hover:bg-navy text-navy hover:text-white font-bold py-4 rounded-lg shadow-lg transition-all duration-300">
                                Submit Inquiry
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Chambers;
