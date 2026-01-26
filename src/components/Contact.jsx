import React, { useRef, useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const form = useRef();
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSending(true);

        // --- EI KHANE APNAR ID GULO BOSHARE HOBE ---
        emailjs.sendForm(
            'service_xxxxxxx',   // Apnar SERVICE ID ekhane din
            'template_xxxxxxx',  // Apnar TEMPLATE ID ekhane din
            form.current,
            'xxxxxxxxxxxxxxxxx'  // Apnar PUBLIC KEY ekhane din
        )
            .then((result) => {
                setIsSending(false);
                setIsSent(true);
                form.current.reset(); // Form khali hoye jabe
                setTimeout(() => setIsSent(false), 5000); // 5 sec por message chole jabe
            }, (error) => {
                setIsSending(false);
                alert('Dukhito! Message-ti jaini. Abar chesta korun ba call korun.');
            });
    };

    return (
        <>
            <Helmet>
                <title>Contact | Adv. Md. Shah Alam</title>
                <meta name="description" content="Contact Advocate Md. Shah Alam for legal consultation." />
            </Helmet>
            <section id="contact" className="py-24 min-h-screen section-alt">
                <div className="container mx-auto px-6 max-w-6xl">

                    <div className="text-center mb-16">
                        <span className="text-gold-dark dark:text-gold text-xs font-bold tracking-[0.2em] uppercase block mb-3">
                            Get in Touch
                        </span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-navy dark:text-white mb-4">
                            Contact Us
                        </h2>
                        <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Left Side: Contact Info */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-serif font-bold text-navy dark:text-white mb-6">
                                Let's Discuss Your Case
                            </h3>
                            <div className="space-y-4">
                                <div className="glass-card p-5 flex items-center gap-4">
                                    <Phone className="text-gold" />
                                    <a href="tel:+8801712655546" className="text-navy dark:text-white font-medium">+880 1712-655546</a>
                                </div>
                                <div className="glass-card p-5 flex items-center gap-4">
                                    <Mail className="text-gold" />
                                    <a href="mailto:shahalam0332@gmail.com" className="text-navy dark:text-white font-medium">shahalam0332@gmail.com</a>
                                </div>
                                <div className="glass-card p-5 flex items-center gap-4">
                                    <MapPin className="text-gold" />
                                    <p className="text-navy dark:text-white font-medium text-sm">Lawyers’ Association Building, 4th Floor, Kotwali, Dhaka-1100</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: The Form */}
                        <div className="glass-card p-8 md:p-10">
                            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="text-xs font-bold text-navy dark:text-gold-dark uppercase mb-2 block">Name</label>
                                    <input name="user_name" type="text" required placeholder="Full Name" className="w-full bg-white dark:bg-navy-dark/50 border border-slate-200 px-4 py-3 rounded-xl" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-navy dark:text-gold-dark uppercase mb-2 block">Phone</label>
                                    <input name="user_phone" type="tel" required placeholder="Phone Number" className="w-full bg-white dark:bg-navy-dark/50 border border-slate-200 px-4 py-3 rounded-xl" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-navy dark:text-gold-dark uppercase mb-2 block">Case Details</label>
                                    <textarea name="message" rows="4" required placeholder="Briefly describe your case..." className="w-full bg-white dark:bg-navy-dark/50 border border-slate-200 px-4 py-3 rounded-xl resize-none"></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSending}
                                    className={`w-full ${isSent ? 'bg-green-600' : 'bg-[#c9a44d]'} text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all`}
                                >
                                    {isSending ? "Sending..." : isSent ? <><CheckCircle size={18} /> Sent Successfully!</> : <><Send size={18} /> Submit Inquiry</>}
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