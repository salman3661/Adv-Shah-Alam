import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // WhatsApp number (88 prefix soho)
        const myNumber = "8801955802007";

        // Message-er format banano
        const text = `*New Case Inquiry*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Details:* ${formData.message}`;

        // WhatsApp link-e pathiye deya
        const whatsappUrl = `https://wa.me/${myNumber}?text=${text}`;

        // Notun tab-e open hobe
        window.open(whatsappUrl, '_blank');
    };

    return (
        <>
            <Helmet>
                <title>Contact | Adv. Md. Shah Alam</title>
            </Helmet>
            <section id="contact" className="py-24 min-h-screen section-alt">
                <div className="container mx-auto px-6 max-w-6xl">

                    <div className="text-center mb-16">
                        <span className="text-gold-dark dark:text-gold text-xs font-bold tracking-[0.2em] uppercase block mb-3">Get in Touch</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-navy dark:text-white mb-4">Contact Us</h2>
                        <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Info Section */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-serif font-bold text-navy dark:text-white mb-6">Let's Discuss Your Case</h3>
                            <div className="space-y-4">
                                <div className="glass-card p-5 flex items-center gap-4">
                                    <Phone className="text-gold" />
                                    <a href="tel:+8801955802007" className="text-navy dark:text-white font-medium">+880 1955-802007</a>
                                </div>
                                <div className="glass-card p-5 flex items-center gap-4">
                                    <Mail className="text-gold" />
                                    <a href="mailto:shahalam0332@gmail.com" className="text-navy dark:text-white font-medium">shahalam0332@gmail.com</a>
                                </div>
                                <div className="glass-card p-5 flex items-center gap-4">
                                    <MapPin className="text-gold" />
                                    <p className="text-navy dark:text-white font-medium text-sm">Lawyers’ Association Building, Kotwali, Dhaka-1100</p>
                                </div>
                            </div>
                        </div>

                        {/* WhatsApp Form Section */}
                        <div className="glass-card p-8 md:p-10">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="text-xs font-bold text-navy dark:text-gold-dark uppercase mb-2 block">Name</label>
                                    <input name="name" type="text" required placeholder="Full Name" onChange={handleChange} className="w-full bg-white dark:bg-navy-dark/50 border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:border-gold" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-navy dark:text-gold-dark uppercase mb-2 block">Phone</label>
                                    <input name="phone" type="tel" required placeholder="Phone Number" onChange={handleChange} className="w-full bg-white dark:bg-navy-dark/50 border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:border-gold" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-navy dark:text-gold-dark uppercase mb-2 block">Case Details</label>
                                    <textarea name="message" rows="4" required placeholder="Briefly describe your case..." onChange={handleChange} className="w-full bg-white dark:bg-navy-dark/50 border border-slate-200 px-4 py-3 rounded-xl resize-none focus:outline-none focus:border-gold"></textarea>
                                </div>

                                <button type="submit" className="w-full bg-[#c9a44d] hover:bg-[#b08e3d] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all">
                                    <Send size={18} /> Send to WhatsApp
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;