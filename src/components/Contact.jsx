import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Mail, Send } from 'lucide-react';
import { CALL_NUMBER, CALL_DISPLAY, waLink } from '../data/contactInfo';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import siteInfo from '../content/siteInfo.json';

const LOCAL_BUSINESS_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Advocate Md. Shah Alam – Law Chamber',
    image: 'https://www.advmdshahalam.me/images/hero/hero-md-shah-alam.png',
    url: 'https://www.advmdshahalam.me',
    telephone: '+8801754440332',
    email: 'shahalam0332@gmail.com',
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'House 46, Road 6/B, Sector 12, Uttara West',
        addressLocality: 'Dhaka',
        postalCode: '1230',
        addressCountry: 'BD',
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: 23.8745,
        longitude: 90.3987,
    },
    openingHoursSpecification: [
        {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
            opens: '09:00',
            closes: '21:00',
        },
    ],
    areaServed: [
        { '@type': 'City', name: 'Uttara' },
        { '@type': 'City', name: 'Dhaka' },
        { '@type': 'Country', name: 'Bangladesh' },
    ],
    priceRange: 'Contact for consultation',
    sameAs: [
        'https://www.facebook.com/advmd.shahalamfb',
        'https://maps.app.goo.gl/M3NXMwW3xkp2TE3h8',
    ],
};

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        const text = `*New Case Inquiry*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Details:* ${formData.message}`;
        window.open(waLink(text), '_blank');
    };

    const contactInfo = [
        { icon: Phone, label: 'Phone', value: CALL_DISPLAY, href: `tel:${CALL_NUMBER}` },
        { icon: Mail, label: 'Email', value: siteInfo.email, href: `mailto:${siteInfo.email}` },
        { icon: MapPin, label: 'Office Address', value: 'House 46, Road 6/B, Sector 12, Uttara, Dhaka-1230', href: 'https://maps.google.com/?q=Sector+12+Uttara+West+Dhaka' },
    ];

    const inputClass = "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200";

    return (
        <>
            <Helmet>
                <script type="application/ld+json">{JSON.stringify(LOCAL_BUSINESS_SCHEMA)}</script>
            </Helmet>
            <section id="contact" className="py-24 relative overflow-hidden" style={{ background: 'var(--surface)' }}>
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center mb-14">
                    <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="label-accent block mb-3">Get in Touch</motion.span>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
                        Contact Us
                    </motion.h2>
                    <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                        className="w-24 h-1 mx-auto rounded-full" style={{ background: 'var(--accent)' }}></motion.div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left: Info + Map */}
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">
                        <h3 className="text-2xl font-serif font-bold mb-2" style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
                            Let's Discuss Your Case
                        </h3>
                        <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-muted)' }}>
                            Our office is in <strong style={{ color: 'var(--text-2)' }}>Sector 12, Uttara West, Dhaka</strong>. Walk-in consultations and WhatsApp inquiries welcome.
                        </p>

                        {contactInfo.map((info, i) => (
                            <motion.a key={i} href={info.href}
                                target={info.href.startsWith('http') ? '_blank' : undefined}
                                rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }}
                                className="glass-card flex items-start gap-4 p-4 group">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                                    style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
                                    <info.icon size={17} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: 'var(--accent)' }}>{info.label}</p>
                                    <p className="font-medium text-sm" style={{ color: 'var(--text)' }}>{info.value}</p>
                                </div>
                            </motion.a>
                        ))}

                        <a href={waLink()} target="_blank" rel="noopener noreferrer"
                            className="btn-whatsapp w-full justify-center text-sm">
                            <MessageCircle size={17} /> WhatsApp Direct Message
                        </a>

                        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                            className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--card-border)', height: '220px' }}>
                            <iframe
                                title="Advocate Md. Shah Alam Office – Sector 12, Uttara, Dhaka"
                                width="100%" height="220" loading="lazy" allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14597.38!2d90.3987!3d23.8745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c5743d9d4e7b%3A0xae8a9b0d5e0e4941!2sUttara%20Sector%2012%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000"
                                style={{ border: 0 }}></iframe>
                        </motion.div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
                        <div className="glass-card p-8 md:p-10">
                            <h3 className="text-xl font-serif font-bold mb-1" style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
                                Send Case Details
                            </h3>
                            <p className="text-sm mb-7" style={{ color: 'var(--text-muted)' }}>
                                Fill out the form below and we'll respond via WhatsApp within hours.
                            </p>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {[
                                    { name: 'name', label: 'Your Name', type: 'text', placeholder: 'Full Name' },
                                    { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+880 XXXX-XXXXXX' },
                                ].map((field) => (
                                    <div key={field.name}>
                                        <label className="text-xs font-bold uppercase tracking-wider block mb-1.5" style={{ color: 'var(--text-muted)' }}>
                                            {field.label}
                                        </label>
                                        <input name={field.name} type={field.type} required placeholder={field.placeholder}
                                            onChange={handleChange}
                                            className={inputClass}
                                            style={{ background: 'var(--input-bg)', border: '1.5px solid var(--input-border)', color: 'var(--text)' }}
                                            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                                            onBlur={e => e.target.style.borderColor = 'var(--input-border)'}
                                        />
                                    </div>
                                ))}
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider block mb-1.5" style={{ color: 'var(--text-muted)' }}>
                                        Case Type &amp; Details
                                    </label>
                                    <textarea name="message" rows="5" required
                                        placeholder="Briefly describe your legal matter (criminal case, divorce, land dispute, bail...)"
                                        onChange={handleChange}
                                        className={`${inputClass} resize-none`}
                                        style={{ background: 'var(--input-bg)', border: '1.5px solid var(--input-border)', color: 'var(--text)' }}
                                        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                                        onBlur={e => e.target.style.borderColor = 'var(--input-border)'}
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm shadow-md">
                                    <Send size={17} /> Send to WhatsApp
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