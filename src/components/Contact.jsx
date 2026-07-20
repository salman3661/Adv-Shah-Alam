import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Mail, Send, PhoneCall, Clock, CheckCircle } from 'lucide-react';
import { CALL_NUMBER, CALL_DISPLAY, waLink } from '../data/contactInfo';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import siteInfo from '../content/siteInfo.json';

const LOCAL_BUSINESS_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Advocate Md. Shah Alam – Law Chamber',
    image: 'https://www.advmdshahalam.me/images/hero/hero-md-shah-alam.png',
    url: 'https://www.advmdshahalam.me',
    telephone: CALL_NUMBER,
    email: 'contact@advmdshahalam.me',
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

const Contact = ({ lang = 'en' }) => {
    const isBn = lang === 'bn';
    const [activeTab, setActiveTab] = useState('whatsapp'); // 'whatsapp' | 'callback'
    const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
    const [callbackData, setCallbackData] = useState({ name: '', phone: '', time: '' });
    const [submitted, setSubmitted] = useState(false);
    const [callbackSent, setCallbackSent] = useState(false);
    const [sending, setSending] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleCallbackChange = (e) => setCallbackData({ ...callbackData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setSending(true);
        setTimeout(() => {
            const prefix = isBn ? '*📋 নতুন আইনি পরামর্শের অনুরোধ*' : '*📋 New Case Inquiry*';
            const nameLabel = isBn ? 'নাম' : 'Name';
            const phoneLabel = isBn ? 'ফোন' : 'Phone';
            const msgLabel = isBn ? 'বিবরণ' : 'Details';

            const text = `${prefix}\n\n*${nameLabel}:* ${formData.name}\n*${phoneLabel}:* ${formData.phone}\n*${msgLabel}:* ${formData.message}`;
            window.open(waLink(text), '_blank');
            setSending(false);
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 5000);
        }, 600);
    };

    const handleCallbackSubmit = (e) => {
        e.preventDefault();
        setSending(true);
        setTimeout(() => {
            const prefix = isBn ? '*📞 কলব্যাক অনুরোধ*' : '*📞 Callback Request*';
            const nameLabel = isBn ? 'নাম' : 'Name';
            const phoneLabel = isBn ? 'ফোন' : 'Phone';
            const timeLabel = isBn ? 'পছন্দের সময়' : 'Preferred Time';

            const text = `${prefix}\n\n*${nameLabel}:* ${callbackData.name}\n*${phoneLabel}:* ${callbackData.phone}\n*${timeLabel}:* ${callbackData.time || (isBn ? 'যেকোনো সময়' : 'Anytime')}`;
            window.open(waLink(text), '_blank');
            setSending(false);
            setCallbackSent(true);
            setTimeout(() => setCallbackSent(false), 5000);
        }, 600);
    };

    const contactInfo = [
        { icon: Phone, label: isBn ? 'ফোন' : 'Phone', value: CALL_DISPLAY, href: `tel:${CALL_NUMBER}` },
        { icon: Mail, label: isBn ? 'ইমেইল' : 'Email', value: siteInfo.email, href: `mailto:${siteInfo.email}` },
        { icon: MapPin, label: isBn ? 'চেম্বার ঠিকানা' : 'Office Address', value: isBn ? 'House 46, Road 6/B, Sector 12, উত্তরা, ঢাকা-১২৩০' : 'House 46, Road 6/B, Sector 12, Uttara, Dhaka-1230', href: 'https://maps.google.com/?q=Sector+12+Uttara+West+Dhaka' },
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
                        className="label-accent block mb-3">
                        {isBn ? 'আপনার কথা আমরা শুনতে চাই' : 'Get in Touch'}
                    </motion.span>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
                        {isBn ? 'যোগাযোগ করুন' : 'Contact Us'}
                    </motion.h2>
                    <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                        className="w-24 h-1 mx-auto rounded-full" style={{ background: 'var(--accent)' }}></motion.div>
                    <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }}
                        className="text-sm mt-4 max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
                        {isBn 
                            ? 'আপনার পরিস্থিতি যাই হোক না কেন — আমরা গোপনীয়তার সাথে শুনবো এবং সবচেয়ে ভালো পথ দেখাবো।'
                            : 'No matter how complex your legal situation — we are here to listen confidentially and guide you.'}
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left: Info + Map */}
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">
                        <h3 className="text-2xl font-serif font-bold mb-2" style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
                            {isBn ? 'আসুন, আপনার সমস্যা নিয়ে কথা বলি' : "Let's Discuss Your Case"}
                        </h3>
                        <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-muted)' }}>
                            {isBn 
                                ? 'আমাদের চেম্বার Sector 12, Uttara West, Dhaka-তে অবস্থিত। সরাসরি আসতে পারেন, ফোন করতে পারেন বা WhatsApp-এ মেসেজ করতে পারেন।'
                                : 'Our office is located in Sector 12, Uttara West, Dhaka. Walk-in consultations, phone calls, or WhatsApp messages are all welcome.'}
                        </p>

                        {/* Office hours */}
                        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl w-fit"
                            style={{ background: 'rgba(34,197,94,0.08)', color: '#16a34a', border: '1px solid rgba(34,197,94,0.2)' }}>
                            <Clock size={13} />
                            {isBn ? 'শনি–বৃহস্পতিবার, সকাল ৯টা – রাত ৯টা' : 'Sat–Thu, 9:00 AM – 9:00 PM'}
                        </div>

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
                            <MessageCircle size={17} /> {isBn ? 'WhatsApp-এ সরাসরি মেসেজ করুন' : 'WhatsApp Direct Message'}
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

                    {/* Right: Tabbed Form */}
                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
                        <div className="glass-card p-8 md:p-10">

                            {/* Tab switcher */}
                            <div className="flex rounded-xl overflow-hidden mb-7 p-1"
                                style={{ background: 'var(--input-bg)', border: '1px solid var(--card-border)' }}>
                                <button
                                    onClick={() => setActiveTab('whatsapp')}
                                    className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all duration-200"
                                    style={activeTab === 'whatsapp'
                                        ? { background: '#25D366', color: '#fff', boxShadow: '0 2px 8px rgba(37,211,102,0.3)' }
                                        : { background: 'transparent', color: 'var(--text-muted)' }}
                                >
                                    <MessageCircle size={15} /> WhatsApp
                                </button>
                                <button
                                    onClick={() => setActiveTab('callback')}
                                    className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all duration-200"
                                    style={activeTab === 'callback'
                                        ? { background: 'var(--accent)', color: '#fff', boxShadow: '0 2px 8px rgba(26,63,191,0.3)' }
                                        : { background: 'transparent', color: 'var(--text-muted)' }}
                                >
                                    <PhoneCall size={15} /> {isBn ? 'কলব্যাক চান?' : 'Request Callback'}
                                </button>
                            </div>

                            <AnimatePresence mode="wait">
                                {/* WhatsApp Tab */}
                                {activeTab === 'whatsapp' && (
                                    <motion.div key="whatsapp"
                                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.2 }}>
                                        <h3 className="text-xl font-serif font-bold mb-1" style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
                                            {isBn ? 'আপনার কথা শেয়ার করুন' : 'Send Case Details'}
                                        </h3>
                                        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                                            {isBn 
                                                ? 'আপনার সমস্যার সংক্ষিপ্ত বিবরণ দিন — আমরা WhatsApp-এ দ্রুত সাড়া দেবো।'
                                                : 'Provide a brief summary of your legal matter — we will respond quickly via WhatsApp.'}
                                        </p>

                                        {submitted ? (
                                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                                className="flex flex-col items-center justify-center py-10 text-center">
                                                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                                                    style={{ background: 'rgba(34,197,94,0.12)', color: '#16a34a' }}>
                                                    <CheckCircle size={32} />
                                                </div>
                                                <h4 className="font-bold text-lg mb-2" style={{ color: 'var(--text)' }}>
                                                    {isBn ? 'পাঠানো হয়েছে!' : 'Message Sent!'}
                                                </h4>
                                                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                                    {isBn 
                                                        ? 'আপনার WhatsApp খুলে গেছে। আমরা শীঘ্রই সাড়া দেবো। আপনি একা নন।'
                                                        : "Your WhatsApp app has opened. We'll be in touch shortly. You are not alone."}
                                                </p>
                                                <button onClick={() => setSubmitted(false)}
                                                    className="mt-5 text-xs font-semibold hover:underline" style={{ color: 'var(--accent)' }}>
                                                    {isBn ? 'আরেকটি বার্তা পাঠান' : 'Send another message'}
                                                </button>
                                            </motion.div>
                                        ) : (
                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                {[
                                                    { name: 'name', label: isBn ? 'আপনার নাম' : 'Your Name', type: 'text', placeholder: isBn ? 'পূর্ণ নাম লিখুন' : 'Full Name' },
                                                    { name: 'phone', label: isBn ? 'ফোন নম্বর' : 'Phone Number', type: 'tel', placeholder: '+880 XXXX-XXXXXX' },
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
                                                        {isBn ? 'আপনার সমস্যার সংক্ষিপ্ত বিবরণ' : 'Case Type & Details'}
                                                    </label>
                                                    <textarea name="message" rows="4" required
                                                        placeholder={isBn ? 'আপনার সমস্যাটি সংক্ষেপে বলুন — ফৌজদারি মামলা, বিবাহবিচ্ছেদ, জমির বিরোধ, জামিন...' : 'Briefly describe your legal matter (criminal, divorce, land dispute, bail...)'}
                                                        onChange={handleChange}
                                                        className={`${inputClass} resize-none`}
                                                        style={{ background: 'var(--input-bg)', border: '1.5px solid var(--input-border)', color: 'var(--text)' }}
                                                        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                                                        onBlur={e => e.target.style.borderColor = 'var(--input-border)'}
                                                    ></textarea>
                                                </div>
                                                <button type="submit" disabled={sending}
                                                    className="btn-primary w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm shadow-md"
                                                    style={{ opacity: sending ? 0.75 : 1 }}>
                                                    {sending ? (
                                                        <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> {isBn ? 'পাঠানো হচ্ছে...' : 'Sending...'}</>
                                                    ) : (
                                                        <><Send size={17} /> {isBn ? 'WhatsApp-এ পাঠান' : 'Send to WhatsApp'}</>
                                                    )}
                                                </button>
                                            </form>
                                        )}
                                    </motion.div>
                                )}

                                {/* Callback Tab */}
                                {activeTab === 'callback' && (
                                    <motion.div key="callback"
                                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.2 }}>
                                        <h3 className="text-xl font-serif font-bold mb-1" style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
                                            {isBn ? 'আমরা আপনাকে কল করবো' : 'We Will Call You'}
                                        </h3>
                                        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                                            {isBn 
                                                ? 'নম্বর দিন — আমরা ১–২ ঘণ্টার মধ্যে ফোন করবো।'
                                                : "Leave your number — we'll call you back within 1-2 hours."}
                                        </p>

                                        {callbackSent ? (
                                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                                className="flex flex-col items-center justify-center py-10 text-center">
                                                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                                                    style={{ background: 'rgba(26,63,191,0.12)', color: 'var(--accent)' }}>
                                                    <PhoneCall size={32} />
                                                </div>
                                                <h4 className="font-bold text-lg mb-2" style={{ color: 'var(--text)' }}>
                                                    {isBn ? 'অনুরোধ পৌঁছে গেছে!' : 'Request Received!'}
                                                </h4>
                                                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                                    {isBn 
                                                        ? 'আমরা শীঘ্রই আপনার সাথে যোগাযোগ করবো। ধন্যবাদ আমাদের বিশ্বাস করার জন্য।'
                                                        : 'We will reach out to you shortly. Thank you for your trust.'}
                                                </p>
                                                <button onClick={() => setCallbackSent(false)}
                                                    className="mt-5 text-xs font-semibold hover:underline" style={{ color: 'var(--accent)' }}>
                                                    {isBn ? 'আরেকটি অনুরোধ করুন' : 'Request another callback'}
                                                </button>
                                            </motion.div>
                                        ) : (
                                            <form onSubmit={handleCallbackSubmit} className="space-y-4">
                                                {[
                                                    { name: 'name', label: isBn ? 'আপনার নাম' : 'Your Name', type: 'text', placeholder: isBn ? 'পূর্ণ নাম লিখুন' : 'Full Name' },
                                                    { name: 'phone', label: isBn ? 'ফোন নম্বর (যেখানে কল করবো)' : 'Phone Number (To Call)', type: 'tel', placeholder: '+880 XXXX-XXXXXX' },
                                                ].map((field) => (
                                                    <div key={field.name}>
                                                        <label className="text-xs font-bold uppercase tracking-wider block mb-1.5" style={{ color: 'var(--text-muted)' }}>
                                                            {field.label}
                                                        </label>
                                                        <input name={field.name} type={field.type} required placeholder={field.placeholder}
                                                            onChange={handleCallbackChange}
                                                            className={inputClass}
                                                            style={{ background: 'var(--input-bg)', border: '1.5px solid var(--input-border)', color: 'var(--text)' }}
                                                            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                                                            onBlur={e => e.target.style.borderColor = 'var(--input-border)'}
                                                        />
                                                    </div>
                                                ))}
                                                <div>
                                                    <label className="text-xs font-bold uppercase tracking-wider block mb-1.5" style={{ color: 'var(--text-muted)' }}>
                                                        {isBn ? 'পছন্দের সময় (ঐচ্ছিক)' : 'Preferred Time (Optional)'}
                                                    </label>
                                                    <select name="time" onChange={handleCallbackChange}
                                                        className={inputClass}
                                                        style={{ background: 'var(--input-bg)', border: '1.5px solid var(--input-border)', color: 'var(--text)' }}
                                                        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                                                        onBlur={e => e.target.style.borderColor = 'var(--input-border)'}>
                                                        <option value="">{isBn ? 'যেকোনো সময়' : 'Anytime'}</option>
                                                        <option value="সকাল ৯–১২টা">{isBn ? 'সকাল ৯–১২টা' : '9:00 AM – 12:00 PM'}</option>
                                                        <option value="দুপুর ১২–৩টা">{isBn ? 'দুপুর ১২–৩টা' : '12:00 PM – 3:00 PM'}</option>
                                                        <option value="বিকেল ৩–৬টা">{isBn ? 'বিকেল ৩–৬টা' : '3:00 PM – 6:00 PM'}</option>
                                                        <option value="সন্ধ্যা ৬–৯টা">{isBn ? 'সন্ধ্যা ৬–৯টা' : '6:00 PM – 9:00 PM'}</option>
                                                    </select>
                                                </div>
                                                <button type="submit" disabled={sending}
                                                    className="btn-primary w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm shadow-md"
                                                    style={{ opacity: sending ? 0.75 : 1 }}>
                                                    {sending ? (
                                                        <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> {isBn ? 'পাঠানো হচ্ছে...' : 'Sending...'}</>
                                                    ) : (
                                                        <><PhoneCall size={17} /> {isBn ? 'কলব্যাকের অনুরোধ পাঠান' : 'Submit Callback Request'}</>
                                                    )}
                                                </button>
                                            </form>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Privacy note */}
                            <p className="text-xs text-center mt-5" style={{ color: 'var(--text-muted)' }}>
                                {isBn ? '🔒 আপনার তথ্য সম্পূর্ণ গোপনীয় — কখনো শেয়ার করা হয় না।' : '🔒 Your information is completely confidential and never shared.'}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
        </>
    );
};

export default Contact;