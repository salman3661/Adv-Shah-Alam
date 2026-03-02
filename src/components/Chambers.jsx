import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import PhoneLink from './PhoneLink';

const PRIMARY_PHONE = '+8801712655546';

const chambers = [
    {
        name: 'Judge Court Chamber (Primary)',
        address: 'Ainjeebi Samity Bhaban, 4th Floor (Hall Room), 6/7 Court House Street, Kotwali, Dhaka-1100',
        phone: PRIMARY_PHONE,
        hours: 'Sun–Thu: 9:00 AM – 5:00 PM',
        mapUrl: 'https://maps.google.com/?q=6+Court+House+Street+Kotwali+Dhaka', // TODO: replace with exact link
        isPrimary: true,
    },
    {
        name: 'Metropolitan P.P Office — Dhaka (APP)',
        address: '4, Court House Street, Robboti Mansion, Kotwali, Dhaka-1100',
        phone: PRIMARY_PHONE,
        hours: 'Sun–Thu: 9:00 AM – 5:00 PM',
        mapUrl: 'https://maps.google.com/?q=4+Court+House+Street+Kotwali+Dhaka', // TODO: replace with exact link
        isPrimary: false,
    },
    {
        name: 'Supreme Court Chamber',
        address: 'Room 02, SCBA Bhaban, Shahbag, Dhaka-1000',
        phone: '+8801955802007',
        hours: 'Sun–Thu: 9:00 AM – 5:00 PM',
        mapUrl: 'https://maps.google.com/?q=Supreme+Court+Bar+Association+Dhaka',
        isPrimary: false,
    },
    {
        name: 'Evening Chamber — Uttara',
        address: 'House 46, Road 6/B, Sector 12, Uttara, Dhaka-1230',
        phone: PRIMARY_PHONE,
        hours: 'Sun–Sat: 6:00 PM – 11:00 PM',
        mapUrl: 'https://maps.app.goo.gl/QebF9RVMYmzWGTrh7',
        isPrimary: false,
    },
];

const Chambers = () => {
    return (
        <section id="chambers" className="py-24 relative overflow-hidden" style={{ background: 'var(--surface)' }}>
            <div className="container mx-auto px-6 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="label-accent block mb-3">
                        Visit Our Offices
                    </motion.span>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-serif font-bold mb-4"
                        style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
                        Chamber Locations
                    </motion.h2>
                    <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                        className="divider-accent mx-auto"></motion.div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {chambers.map((chamber, i) => (
                        <motion.div key={i}
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.12 }}
                            className="glass-card p-8 relative overflow-hidden flex flex-col justify-between"
                            style={chamber.isPrimary ? { borderTopWidth: '3px', borderTopColor: 'var(--accent)' } : {}}>

                            {/* Primary Badge */}
                            {chamber.isPrimary && (
                                <div className="absolute top-5 right-5">
                                    <span className="text-xs font-bold px-3 py-1 rounded-full"
                                        style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
                                        Primary
                                    </span>
                                </div>
                            )}

                            <div>
                                <h3 className="text-xl font-bold mb-6 pr-16" style={{ color: 'var(--text)' }}>
                                    {chamber.name}
                                </h3>

                                <div className="space-y-5">
                                    {/* Address */}
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
                                            <MapPin size={17} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider mb-1"
                                                style={{ color: 'var(--text-muted)' }}>Address</p>
                                            <a href={chamber.mapUrl} target="_blank" rel="noopener noreferrer"
                                                className="text-sm hover:underline decoration-dotted"
                                                style={{ color: 'var(--text-secondary)' }}>
                                                {chamber.address}
                                            </a>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
                                            <Phone size={17} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider mb-1"
                                                style={{ color: 'var(--text-muted)' }}>Phone</p>
                                            <PhoneLink
                                                number={chamber.phone}
                                                className="text-sm hover:underline decoration-dotted"
                                                style={{ color: 'var(--text-secondary)' }}
                                            />
                                        </div>
                                    </div>

                                    {/* Hours */}
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
                                            <Clock size={17} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider mb-1"
                                                style={{ color: 'var(--text-muted)' }}>Hours</p>
                                            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{chamber.hours}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6" style={{ borderTop: '1px solid var(--divider)' }}>
                                <a href={chamber.mapUrl} target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all group"
                                    style={{ color: 'var(--accent)' }}>
                                    View on Google Maps
                                    <ExternalLink size={15} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Chambers;