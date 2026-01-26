import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';

const Chambers = () => {
    const chambers = [
        {
            name: 'Supreme Court Chamber',
            address: 'Room 02, SCBA Bhaban, Shahbag, Dhaka-1000',
            phone: '+8801955802007',
            hours: 'Sun-Thu: 9:00 AM - 5:00 PM',
            mapUrl: 'https://maps.app.goo.gl/QiUBeTLhxs3etUHT7',
            isPrimary: true,
        },
        {
            name: 'Evening Chamber',
            address: 'House 46, Road 6/B, Sector 12, Uttara, Dhaka-1230',
            phone: '+8801712655546',
            hours: 'Sun-Sat: 6:00 PM - 11:00 PM',
            mapUrl: 'https://maps.app.goo.gl/QebF9RVMYmzWGTrh7',
            isPrimary: false,
        },
    ];

    return (
        <section id="chambers" className="py-24 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute right-0 top-1/4 w-1/3 h-1/2 bg-gold/5 blur-3xl rounded-full -z-10"></div>

            <div className="container mx-auto px-6 max-w-6xl">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-gold-dark dark:text-gold text-xs font-bold tracking-[0.2em] uppercase block mb-3"
                    >
                        Visit Our Offices
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-serif font-bold text-navy dark:text-white mb-4"
                    >
                        Chamber Locations
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="w-24 h-1 bg-gold mx-auto rounded-full"
                    ></motion.div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {chambers.map((chamber, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className={`glass-card p-8 relative overflow-hidden ${chamber.isPrimary ? 'border-t-4 border-t-gold' : ''}`}
                        >
                            {/* Primary Badge */}
                            {chamber.isPrimary && (
                                <div className="absolute top-4 right-4">
                                    <span className="px-3 py-1 bg-gold/10 text-gold-dark dark:text-gold text-xs font-bold rounded-full">
                                        Primary
                                    </span>
                                </div>
                            )}

                            {/* Chamber Name */}
                            <h3 className="text-xl font-bold text-navy dark:text-white mb-6 pr-16">
                                {chamber.name}
                            </h3>

                            {/* Details */}
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-navy/5 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin size={18} className="text-gold-dark dark:text-gold" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-400 dark:text-gray-500 uppercase tracking-wider mb-1">
                                            Address
                                        </p>
                                        <p className="text-slate-600 dark:text-gray-300">
                                            {chamber.address}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-navy/5 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
                                        <Phone size={18} className="text-gold-dark dark:text-gold" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-400 dark:text-gray-500 uppercase tracking-wider mb-1">
                                            Phone
                                        </p>
                                        <a
                                            href={`tel:${chamber.phone}`}
                                            className="text-slate-600 dark:text-gray-300 hover:text-gold transition-colors"
                                        >
                                            {chamber.phone}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-navy/5 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
                                        <Clock size={18} className="text-gold-dark dark:text-gold" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-400 dark:text-gray-500 uppercase tracking-wider mb-1">
                                            Hours
                                        </p>
                                        <p className="text-slate-600 dark:text-gray-300">
                                            {chamber.hours}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Map Link */}
                        </motion.div>
                    ))}
                </div>

                {/* Map Embed */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-12 rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700/50"
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.0234567890123!2d90.3950567!3d23.7340123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8f0c1abcdef%3A0x1234567890abcdef!2sSupreme%20Court%20of%20Bangladesh!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                        width="100%"
                        height="350"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Supreme Court Location Map"
                        className="w-full"
                    ></iframe>
                </motion.div>
            </div>
        </section>
    );
};

export default Chambers;
