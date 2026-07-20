import React, { useState } from 'react';
import { CALL_NUMBER, WA_NUMBER } from '../data/contactInfo';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Clock, ExternalLink, ChevronLeft, ChevronRight, X } from 'lucide-react';
import PhoneLink from './PhoneLink';

// Chamber gallery photos (pre-compressed WebP)
const GALLERY = [
    {
        src: '/images/chambers/chamber-front.webp',
        alt: 'উত্তরা চেম্বার — সামনের দৃশ্য',
        altEn: 'Uttara Chamber — Front View',
    },
    {
        src: '/images/chambers/chamber-left.webp',
        alt: 'উত্তরা চেম্বার — বাম দিক',
        altEn: 'Uttara Chamber — Left Angle',
    },
    {
        src: '/images/chambers/chamber-rear.webp',
        alt: 'উত্তরা চেম্বার — পিছনের দৃশ্য',
        altEn: 'Uttara Chamber — Rear View',
    },
];

const Chambers = ({ lang = 'en' }) => {
    const isBn = lang === 'bn';
    const [lightboxIdx, setLightboxIdx] = useState(null);

    const chambers = [
        {
            name: isBn ? 'জজ কোর্ট চেম্বার (প্রধান)' : 'Judge Court Chamber (Primary)',
            address: isBn ? 'আইনজীবী সমিতি ভবন, ১ম তলা (হল রুম), ৬/৭ কোর্ট হাউস স্ট্রিট, কোতোয়ালি, ঢাকা' : 'Ainjeebi Samity Bhaban, 4th Floor (Hall Room), 6/7 Court House Street, Kotwali, Dhaka-1100',
            phone: CALL_NUMBER,
            hours: isBn ? 'রবিবার–বৃহস্পতিবার: সকাল ৯টা – বিকেল ৫টা' : 'Sun–Thu: 9:00 AM – 5:00 PM',
            mapUrl: 'https://maps.google.com/?q=6+Court+House+Street+Kotwali+Dhaka',
            isPrimary: true,
        },
        {
            name: isBn ? 'মেট্রোপলিটন পিপি অফিস — ঢাকা' : 'Metropolitan P.P Office — Dhaka (APP)',
            address: isBn ? '৪, কোর্ট হাউস স্ট্রিট, রব্বতি মানশন, কোতোয়ালি, ঢাকা' : '4, Court House Street, Robboti Mansion, Kotwali, Dhaka-1100',
            phone: CALL_NUMBER,
            hours: isBn ? 'রবিবার–বৃহস্পতিবার: সকাল ৯টা – বিকেল ৫টা' : 'Sun–Thu: 9:00 AM – 5:00 PM',
            mapUrl: 'https://maps.google.com/?q=4+Court+House+Street+Kotwali+Dhaka',
            isPrimary: false,
        },
        {
            name: isBn ? 'সুপ্রিম কোর্ট চেম্বার' : 'Supreme Court Chamber',
            address: isBn ? 'কক্ষ ০২, SCBA ভবন, শাহবাগ, ঢাকা-১০০০' : 'Room 02, SCBA Bhaban, Shahbag, Dhaka-1000',
            phone: '+' + WA_NUMBER,
            hours: isBn ? 'রবিবার–বৃহস্পতিবার: সকাল ৯টা – বিকেল ৫টা' : 'Sun–Thu: 9:00 AM – 5:00 PM',
            mapUrl: 'https://maps.google.com/?q=Supreme+Court+Bar+Association+Dhaka',
            isPrimary: false,
        },
        {
            name: isBn ? 'সন্ধ্যা চেম্বার — উত্তরা' : 'Evening Chamber — Uttara',
            address: isBn ? 'বাড়ি ৪৬, রাস্তা ৬/বি, সেক্টর ১২, উত্তরা, ঢাকা-১২৩০' : 'House 46, Road 6/B, Sector 12, Uttara, Dhaka-1230',
            phone: CALL_NUMBER,
            hours: isBn ? 'রবি–শনি: সন্ধ্যা ৬টা – রাত ১১টা' : 'Sun–Sat: 6:00 PM – 11:00 PM',
            mapUrl: 'https://maps.app.goo.gl/QebF9RVMYmzWGTrh7',
            isPrimary: false,
        },
    ];

    const prevPhoto = () => setLightboxIdx(i => (i - 1 + GALLERY.length) % GALLERY.length);
    const nextPhoto = () => setLightboxIdx(i => (i + 1) % GALLERY.length);

    return (
        <section id="chambers" className="py-20 relative overflow-hidden" style={{ background: 'var(--surface)' }}>
            <div className="container mx-auto px-6 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-14">
                    <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="label-accent block mb-3">
                        {isBn ? 'আমাদের অফিসে আসুন' : 'Visit Our Offices'}
                    </motion.span>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-serif font-bold mb-3"
                        style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
                        {isBn ? 'চেম্বারের ঠিকানা' : 'Chamber Locations'}
                    </motion.h2>
                    <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                        className="w-20 h-1 mx-auto rounded-full" style={{ background: 'var(--accent)' }} />
                </div>

                {/* Photo Gallery */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="mb-14 rounded-3xl overflow-hidden"
                    style={{ border: '1px solid var(--card-border)' }}>
                    <div className="grid grid-cols-3 gap-0.5" style={{ background: 'var(--card-border)' }}>
                        {GALLERY.map((photo, i) => (
                            <button
                                key={i}
                                onClick={() => setLightboxIdx(i)}
                                className="relative overflow-hidden group focus:outline-none"
                                style={{ aspectRatio: i === 0 ? '16/9' : '4/3' }}
                                aria-label={isBn ? photo.alt : photo.altEn}>
                                <img
                                    src={photo.src}
                                    alt={isBn ? photo.alt : photo.altEn}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    style={{ display: 'block' }}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center">
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white text-xs font-bold px-3 py-1.5 rounded-full"
                                        style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }}>
                                        {isBn ? 'বড় করে দেখুন' : 'View'}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                    <div className="px-5 py-3 flex items-center gap-2" style={{ background: 'var(--card-bg)' }}>
                        <MapPin size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                            {isBn ? 'সন্ধ্যা চেম্বার, সেক্টর ১২, উত্তরা, ঢাকা — সন্ধ্যা ৬টা থেকে রাত ১১টা পর্যন্ত খোলা থাকে।' : 'Evening Chamber, Sector 12, Uttara, Dhaka — Open 6:00 PM to 11:00 PM daily.'}
                        </p>
                    </div>
                </motion.div>

                {/* Chamber cards */}
                <div className="grid md:grid-cols-2 gap-7">
                    {chambers.map((chamber, i) => (
                        <motion.div key={i}
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="glass-card p-7 relative overflow-hidden flex flex-col justify-between"
                            style={chamber.isPrimary ? { borderTopWidth: '3px', borderTopColor: 'var(--accent)' } : {}}>

                            {chamber.isPrimary && (
                                <div className="absolute top-5 right-5">
                                    <span className="text-xs font-bold px-3 py-1 rounded-full"
                                        style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
                                        {isBn ? '★ প্রধান' : '★ Primary'}
                                    </span>
                                </div>
                            )}

                            <div>
                                <h3 className="text-base font-bold mb-5 pr-16 leading-snug" style={{ color: 'var(--text)' }}>
                                    {chamber.name}
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
                                            <MapPin size={15} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider mb-0.5"
                                                style={{ color: 'var(--text-muted)' }}>{isBn ? 'ঠিকানা' : 'Address'}</p>
                                            <a href={chamber.mapUrl} target="_blank" rel="noopener noreferrer"
                                                className="text-sm hover:underline decoration-dotted leading-snug"
                                                style={{ color: 'var(--text-secondary)' }}>
                                                {chamber.address}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
                                            <Phone size={15} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider mb-0.5"
                                                style={{ color: 'var(--text-muted)' }}>{isBn ? 'ফোন' : 'Phone'}</p>
                                            <PhoneLink
                                                number={chamber.phone}
                                                className="text-sm hover:underline decoration-dotted"
                                                style={{ color: 'var(--text-secondary)' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
                                            <Clock size={15} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider mb-0.5"
                                                style={{ color: 'var(--text-muted)' }}>{isBn ? 'সময়' : 'Hours'}</p>
                                            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{chamber.hours}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-5" style={{ borderTop: '1px solid var(--divider)' }}>
                                <a href={chamber.mapUrl} target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all group"
                                    style={{ color: 'var(--accent)' }}>
                                    {isBn ? 'গুগল ম্যাপে দেখুন' : 'View on Google Maps'}
                                    <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxIdx !== null && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
                        style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(12px)' }}
                        onClick={() => setLightboxIdx(null)}>
                        <button
                            onClick={() => setLightboxIdx(null)}
                            className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-white"
                            style={{ background: 'rgba(255,255,255,0.15)' }}>
                            <X size={18} />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
                            className="absolute left-4 w-10 h-10 rounded-full flex items-center justify-center text-white"
                            style={{ background: 'rgba(255,255,255,0.15)' }}>
                            <ChevronLeft size={20} />
                        </button>
                        <motion.img
                            key={lightboxIdx}
                            initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
                            src={GALLERY[lightboxIdx].src}
                            alt={isBn ? GALLERY[lightboxIdx].alt : GALLERY[lightboxIdx].altEn}
                            onClick={e => e.stopPropagation()}
                            className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain"
                            style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.6)' }}
                        />
                        <button onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
                            className="absolute right-4 w-10 h-10 rounded-full flex items-center justify-center text-white"
                            style={{ background: 'rgba(255,255,255,0.15)' }}>
                            <ChevronRight size={20} />
                        </button>
                        <div className="absolute bottom-5 text-white text-xs font-semibold"
                            style={{ opacity: 0.65 }}>
                            {lightboxIdx + 1} / {GALLERY.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Chambers;