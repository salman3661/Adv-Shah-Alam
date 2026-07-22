import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, Mail, Clock, Send, ExternalLink, Scale, ShieldCheck, CheckCircle2, CreditCard } from 'lucide-react';
import { CALL_NUMBER, CALL_DISPLAY, waLink } from '../data/contactInfo';
import siteInfo from '../content/siteInfo.json';

/* ─── Schema Markup ──────────────────────────────────────────── */
const contactPageSchemaEn = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Advocate Md. Shah Alam',
    url: 'https://www.advmdshahalam.me/contact',
    description: 'Contact Advocate Md. Shah Alam for criminal, divorce, bail and land law consultation in Dhaka & Uttara, Bangladesh.',
    mainEntity: {
        '@type': 'LegalService',
        name: 'Advocate Md. Shah Alam Law Chambers',
        telephone: '+8801712655546',
        email: 'contact@advmdshahalam.me',
        url: 'https://www.advmdshahalam.me',
        address: [
            {
                '@type': 'PostalAddress',
                streetAddress: 'House 46, Road 6/B, Sector 12, Uttara West',
                addressLocality: 'Dhaka',
                postalCode: '1230',
                addressCountry: 'BD',
                name: 'Uttara Chamber',
            },
            {
                '@type': 'PostalAddress',
                streetAddress: 'Ainjeebi Samity Bhaban, 4th Floor, 6/7 Court House Street, Kotwali',
                addressLocality: 'Dhaka',
                postalCode: '1100',
                addressCountry: 'BD',
                name: 'Court Chamber',
            },
        ],
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
            opens: '09:00',
            closes: '21:00',
        },
        areaServed: [
            { '@type': 'City', name: 'Uttara' },
            { '@type': 'City', name: 'Dhaka' },
            { '@type': 'Country', name: 'Bangladesh' },
        ],
        sameAs: [
            'https://www.facebook.com/advmd.shahalamfb',
            'https://maps.app.goo.gl/M3NXMwW3xkp2TE3h8',
        ],
    },
};

const chambersEn = [
    {
        name: 'Uttara Chamber (Primary Office)',
        address: 'House 46, Road 6/B, Sector 12, Uttara West, Dhaka-1230',
        note: 'Primary consultation office & chamber',
        mapLink: 'https://maps.app.goo.gl/M3NXMwW3xkp2TE3h8',
    },
    {
        name: 'Court Chamber (Dhaka Court)',
        address: 'Ainjeebi Samity Bhaban, 4th Floor, 6/7 Court House Street, Kotwali, Dhaka-1100',
        note: 'Near Dhaka Sessions Court & Judge Court',
        mapLink: 'https://maps.google.com/?q=6/7+Court+House+Street+Kotwali+Dhaka',
    },
];

const chambersBn = [
    {
        name: 'উত্তরা চেম্বার (প্রধান কার্যালয়)',
        address: 'হাউস ৪৬, রোড ৬/বি, সেক্টর ১২, উত্তরা পশ্চিম, ঢাকা-১২৩০',
        note: 'সরাসরি আইনি পরামর্শ ও ক্লায়েন্ট মিটিং চেম্বার',
        mapLink: 'https://maps.app.goo.gl/M3NXMwW3xkp2TE3h8',
    },
    {
        name: 'কোর্ট চেম্বার (ঢাকা বিচার আদালত)',
        address: 'আইনজীবী সমিতি ভবন, ৪র্থ তলা, ৬/৭ কোর্ট হাউজ স্ট্রিট, কোতোয়ালি, ঢাকা-১১০০',
        note: 'ঢাকা জজ কোর্ট ও মহানগর দায়রা জজ আদালত সংলগ্ন',
        mapLink: 'https://maps.google.com/?q=6/7+Court+House+Street+Kotwali+Dhaka',
    },
];

const practiceAreasBn = [
    'ফৌজদারি মামলা — এফআইআর, রিমান্ড ও হাইকোর্ট জামিন',
    'পারিবারিক আইন — তালাক, সন্তানের অভিভাবকত্ব ও খোরপোষ',
    'সম্পত্তি আইন — জমি বিরোধ, বাটোয়ারা ও ই-নামজারি',
    'হাইকোর্ট রিট — রিট পিটিশন ও আপিল বিভাগ',
    'কর ও ভ্যাট — ইনকাম ট্যাক্স ও এনবিআর লিগ্যাল নোটিশ',
    'কোম্পানি আইন — ব্র্যান্ড ট্রেডমার্ক ও চুক্তিপত্র',
];

const practiceAreasEn = [
    'Criminal Law — FIR, bail, trial & High Court appeals',
    'Family Law — Divorce, child custody & maintenance',
    'Land & Property — Disputes, registration & partition',
    'Bail — Regular, anticipatory & High Court bail',
    'Supreme Court — Writ petitions & appellate matters',
    'Corporate Law — Company registration & disputes',
];

/* ─── Form Component ─────────────────────────────────────────── */
const ContactForm = ({ isBn }) => {
    const [formData, setFormData] = React.useState({ name: '', phone: '', subject: '', message: '' });
    const [submitted, setSubmitted] = React.useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        const text = isBn
            ? `*📋 আইনি পরমর্শ ও কেস সংক্রান্ত তথ্য (advmdshahalam.me)*\n\n*নাম:* ${formData.name}\n*ফোন:* ${formData.phone}\n*আইনি বিষয়:* ${formData.subject}\n*বিস্তারিত বিবরণ:* ${formData.message}`
            : `*📋 New Case Inquiry from advmdshahalam.me*\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Subject:* ${formData.subject}\n*Details:* ${formData.message}`;
        window.open(waLink(text), '_blank');
        setSubmitted(true);
    };

    const inputStyle = {
        background: 'var(--input-bg)',
        border: '1.5px solid var(--input-border)',
        color: 'var(--text)',
        borderRadius: '0.75rem',
        padding: '0.75rem 1rem',
        width: '100%',
        fontSize: '0.875rem',
        outline: 'none',
        transition: 'border-color 0.2s',
        fontFamily: isBn ? "var(--font-bn), 'SolaimanLipi', sans-serif" : "var(--font-en), sans-serif"
    };

    if (submitted) {
        return (
            <div className="glass-card p-10 text-center rounded-2xl">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text)', fontFamily: isBn ? "var(--font-bn), 'SolaimanLipi', sans-serif" : 'inherit' }}>
                    {isBn ? 'তথ্য সফলভাবে পাঠানো হয়েছে!' : 'Message Sent!'}
                </h3>
                <p className="text-sm mb-6" style={{ color: 'var(--text-muted)', fontFamily: isBn ? "var(--font-bn), 'SolaimanLipi', sans-serif" : 'inherit' }}>
                    {isBn ? 'আপনার বার্তাটি সরাসরি হোয়াটসঅ্যাপে পাঠানো হয়েছে। অ্যাডভোকেট মো. শাহ আলম খুব শীঘ্রই আপনার সাথে যোগাযোগ করবেন।' : "Your inquiry has been sent via WhatsApp. Advocate Shah Alam will respond shortly."}
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-primary text-sm" style={{ fontFamily: isBn ? "var(--font-bn), 'SolaimanLipi', sans-serif" : 'inherit' }}>
                    {isBn ? 'আরেকটি বার্তা পাঠান' : 'Send Another Message'}
                </button>
            </div>
        );
    }

    return (
        <div className="glass-card p-8 md:p-10 rounded-2xl shadow-xl border" style={{ borderColor: 'var(--card-border)' }}>
            <h2 className="text-2xl font-bold mb-2"
                style={{ color: 'var(--text)', fontFamily: isBn ? "var(--font-bn), 'SolaimanLipi', sans-serif" : "'Playfair Display', serif" }}>
                {isBn ? 'আইনি পরামর্শের জন্য বার্তা পাঠান' : 'Send Your Case Details'}
            </h2>
            <p className="text-sm mb-7" style={{ color: 'var(--text-muted)', fontFamily: isBn ? "var(--font-bn), 'SolaimanLipi', sans-serif" : 'inherit' }}>
                {isBn ? 'নিচের ফর্মে আপনার আইনি সমস্যাটির বিবরণ লিখুন, সরাসরি হোয়াটসঅ্যাপের মাধ্যমে যোগাযোগ করা হবে।' : "Fill out the form below and we'll respond via WhatsApp within a few hours."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                        <label className="text-xs font-bold uppercase tracking-wider block mb-1.5"
                            style={{ color: 'var(--text-muted)', fontFamily: isBn ? "var(--font-bn), 'SolaimanLipi', sans-serif" : 'inherit' }}>
                            {isBn ? 'আপনার পূর্ণ নাম *' : 'Full Name *'}
                        </label>
                        <input
                            name="name" type="text" required placeholder={isBn ? 'আপনার নাম লিখুন' : 'Your full name'}
                            value={formData.name} onChange={handleChange}
                            style={inputStyle}
                            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                            onBlur={e => e.target.style.borderColor = 'var(--input-border)'}
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold uppercase tracking-wider block mb-1.5"
                            style={{ color: 'var(--text-muted)', fontFamily: isBn ? "var(--font-bn), 'SolaimanLipi', sans-serif" : 'inherit' }}>
                            {isBn ? 'মোবাইল নম্বর *' : 'Phone Number *'}
                        </label>
                        <input
                            name="phone" type="tel" required placeholder="+880 17XXXXXXXX"
                            value={formData.phone} onChange={handleChange}
                            style={inputStyle}
                            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                            onBlur={e => e.target.style.borderColor = 'var(--input-border)'}
                        />
                    </div>
                </div>

                <div>
                    <label className="text-xs font-bold uppercase tracking-wider block mb-1.5"
                        style={{ color: 'var(--text-muted)', fontFamily: isBn ? "var(--font-bn), 'SolaimanLipi', sans-serif" : 'inherit' }}>
                        {isBn ? 'আইনি বিষয়ের ক্যাটাগরি *' : 'Legal Matter Type *'}
                    </label>
                    <select
                        name="subject" required value={formData.subject} onChange={handleChange}
                        style={{ ...inputStyle, appearance: 'auto' }}
                        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                        onBlur={e => e.target.style.borderColor = 'var(--input-border)'}
                    >
                        {isBn ? (
                            <>
                                <option value="">আপনার আইনি বিষয়টি নির্বাচন করুন...</option>
                                <option value="ফৌজদারি মামলা / এফআইআর">ফৌজদারি মামলা / জিডি / এফআইআর</option>
                                <option value="জামিন আবেদন (অগাম / হাইকোর্ট)">জামিন আবেদন (নিয়মিত / আগাম / হাইকোর্ট)</option>
                                <option value="তালাক ও পারিবারিক আইন">তালাক / দেনমোহর / পারিবারিক বিবাদ</option>
                                <option value="সন্তানের অভিভাবকত্ব">সন্তানের হিজানাত ও অভিভাবকত্ব</option>
                                <option value="জমি জমা ও বাটোয়ারা">জমি জমা / বাটোয়ারা / দলিল ও নামজারি</option>
                                <option value="সুপ্রিম কোর্ট রিট পিটিশন">সুপ্রিম কোর্ট হাইকোর্ট রিট পিটিশন</option>
                                <option value="কর ও ভ্যাট লিগ্যাল নোটিশ">ইনকাম ট্যাক্স / কর ও ভ্যাট মামলা</option>
                                <option value="সাইবার ক্রাইম / মানহানি">সাইবার ক্রাইম / ব্ল্যাকমেইল / ফেসবুক মানহানি</option>
                                <option value="অন্যান্য আইনি বিষয়">অন্যান্য আইনি পরামর্শ</option>
                            </>
                        ) : (
                            <>
                                <option value="">Select your legal matter...</option>
                                <option value="Criminal Case / FIR">Criminal Case / FIR</option>
                                <option value="Bail Application">Bail Application (Regular / Anticipatory)</option>
                                <option value="Divorce / Family Law">Divorce / Family Law</option>
                                <option value="Child Custody">Child Custody</option>
                                <option value="Land / Property Dispute">Land / Property Dispute</option>
                                <option value="Supreme Court / High Court">Supreme Court / High Court Matter</option>
                                <option value="Company / Corporate Law">Company / Corporate Law</option>
                                <option value="Cyber Crime">Cyber Crime</option>
                                <option value="Other">Other Legal Matter</option>
                            </>
                        )}
                    </select>
                </div>

                <div>
                    <label className="text-xs font-bold uppercase tracking-wider block mb-1.5"
                        style={{ color: 'var(--text-muted)', fontFamily: isBn ? "var(--font-bn), 'SolaimanLipi', sans-serif" : 'inherit' }}>
                        {isBn ? 'মামলা বা ঘটনার বিবরণ *' : 'Case Details *'}
                    </label>
                    <textarea
                        name="message" rows="4" required
                        placeholder={isBn ? 'সংক্ষেপে আপনার আইনি বিষয়টি লিখুন (আদালত, থানার নাম বা মামলার নম্বর থাকলে দিতে পারেন)...' : 'Briefly describe your legal situation...'}
                        value={formData.message} onChange={handleChange}
                        style={{ ...inputStyle, resize: 'none' }}
                        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                        onBlur={e => e.target.style.borderColor = 'var(--input-border)'}
                    />
                </div>

                <button type="submit" id="contact-submit-btn"
                    className="btn-primary w-full flex items-center justify-center gap-2 py-4 font-bold text-sm shadow-md rounded-xl"
                    style={{ fontFamily: isBn ? "var(--font-bn), 'SolaimanLipi', sans-serif" : 'inherit' }}>
                    <Send size={17} /> {isBn ? 'হোয়াটসঅ্যাপে পাঠান' : 'Send via WhatsApp'}
                </button>

                <p className="text-xs text-center" style={{ color: 'var(--text-muted)', fontFamily: isBn ? "var(--font-bn), 'SolaimanLipi', sans-serif" : 'inherit' }}>
                    {isBn ? '🔒 আপনার পাঠানো সকল তথ্য শতভাগ গোপন রাখা হয়।' : 'All consultations are strictly confidential.'}
                </p>
            </form>
        </div>
    );
};

/* ─── Main Page ──────────────────────────────────────────────── */
const ContactPage = ({ lang }) => {
    const location = useLocation();
    const isBn = lang === 'bn' || location.pathname.startsWith('/bn');

    const chambers = isBn ? chambersBn : chambersEn;
    const practiceAreas = isBn ? practiceAreasBn : practiceAreasEn;

    return (
        <>
            <Helmet>
                <html lang={isBn ? 'bn' : 'en'} />
                <title>
                    {isBn
                        ? 'যোগাযোগ ও আইনি চেম্বার | অ্যাডভোকেট মো. শাহ আলম – উত্তরা ও ঢাকা কোর্ট'
                        : 'Contact Advocate Md. Shah Alam | Criminal, Divorce & Bail Lawyer – Uttara, Dhaka'}
                </title>
                <meta name="description"
                    content={isBn
                        ? 'অ্যাডভোকেট মো. শাহ আলমের সাথে সরাসরি কথা বলতে বা চেম্বারে পরামর্শের জন্য যোগাযোগ করুন। ফোন: ০১৭১২৬৫৫৫৪৬, বিকাশ ও হোয়াটসঅ্যাপ সেবা।'
                        : 'Contact Advocate Md. Shah Alam for legal consultation in Dhaka & Uttara. Call +880 1712-655546 or WhatsApp.'} />
                <link rel="canonical" href={isBn ? 'https://www.advmdshahalam.me/bn/contact' : 'https://www.advmdshahalam.me/contact'} />
                <meta name="robots" content="index, follow" />
                <script type="application/ld+json">{JSON.stringify(contactPageSchemaEn)}</script>
            </Helmet>

            {/* ── Hero Header ── */}
            <section className="pt-28 md:pt-32 pb-14 relative overflow-hidden" style={{ background: 'var(--hero-bg)' }}>
                <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at 60% 50%, rgba(198,167,94,0.08) 0%, transparent 70%)' }} />
                <div className="container mx-auto px-6 max-w-5xl relative z-10">
                    <nav className="mb-6 text-xs" aria-label="Breadcrumb">
                        <ol className="flex items-center gap-2" style={{ color: 'var(--hero-muted)', fontFamily: isBn ? "var(--font-bn), 'SolaimanLipi', sans-serif" : 'inherit' }}>
                            <li><Link to={isBn ? '/bn/blog' : '/'} className="hover:underline" style={{ color: 'var(--hero-text-2)' }}>{isBn ? 'হোম' : 'Home'}</Link></li>
                            <li aria-hidden="true">/</li>
                            <li aria-current="page" style={{ color: 'var(--gold)' }}>{isBn ? 'যোগাযোগ' : 'Contact'}</li>
                        </ol>
                    </nav>

                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-4 border" style={{ background: 'rgba(198,167,94,0.1)', color: 'var(--gold)', borderColor: 'rgba(198,167,94,0.3)', fontFamily: isBn ? "var(--font-bn), 'SolaimanLipi', sans-serif" : 'inherit' }}>
                        <Scale size={14} />
                        {isBn ? 'সুপ্রিম কোর্ট আইনজীবী পরামর্শ সার্ভিস' : 'Get Expert Legal Help'}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4"
                        style={{ color: 'var(--hero-text)', fontFamily: isBn ? "var(--font-bn), 'SolaimanLipi', sans-serif" : "'Playfair Display', serif" }}>
                        {isBn ? 'অ্যাডভোকেট মো. শাহ আলম – যোগাযোগ ও চেম্বার' : 'Contact Advocate Md. Shah Alam'}
                    </h1>

                    <p className="text-base md:text-lg leading-relaxed max-w-2xl mb-8" style={{ color: 'var(--hero-text-2)', fontFamily: isBn ? "var(--font-bn), 'SolaimanLipi', sans-serif" : 'inherit' }}>
                        {isBn
                            ? 'বাংলাদেশ সুপ্রিম কোর্ট ও ঢাকা জজ কোর্টের অভিজ্ঞ আইনজীবীর থেকে সরাসরি ও নির্ভরযোগ্য আইনি পরামর্শ পেতে যোগাযোগ করুন।'
                            : 'Trusted criminal, divorce, bail, and property lawyer in Uttara, Dhaka. Contact us for a confidential consultation — available 6 days a week.'}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <a href={`tel:${CALL_NUMBER}`} className="btn-primary flex items-center gap-2 text-sm px-6 py-3.5 shadow-lg" style={{ fontFamily: isBn ? "var(--font-bn), 'SolaimanLipi', sans-serif" : 'inherit' }}>
                            <Phone size={17} /> {isBn ? 'সরাসরি কল করুন' : 'Call Now'}
                        </a>
                        <a href={waLink(isBn ? 'আমি সরাসরি আইনি পরামর্শ নিতে চাই' : 'I need legal advice')} target="_blank" rel="noopener noreferrer"
                            className="btn-whatsapp flex items-center gap-2 text-sm px-6 py-3.5 shadow-lg">
                            <MessageCircle size={17} /> {isBn ? 'হোয়াটসঅ্যাপ কনসালটেশন' : 'WhatsApp Consultation'}
                        </a>
                    </div>
                </div>
            </section>

            {/* ── Quick Contact Bar (Phone, WhatsApp, bKash Paid Consult) ── */}
            <section className="py-8" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--card-border)' }}>
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid sm:grid-cols-3 gap-4">
                        {[
                            { icon: Phone, label: isBn ? 'সরাসরি কল' : 'Phone', value: CALL_DISPLAY, href: `tel:${CALL_NUMBER}`, color: 'var(--accent)' },
                            { icon: MessageCircle, label: isBn ? 'ইনস্ট্যান্ট হোয়াটসঅ্যাপ' : 'WhatsApp', value: '+880 1955-802007', href: waLink(), color: '#25D366' },
                            { icon: CreditCard, label: isBn ? 'পেইড কনসালটেশন (bKash)' : 'bKash Merchant', value: '01712655546', href: `tel:${CALL_NUMBER}`, color: 'var(--gold)' },
                        ].map(({ icon: Icon, label, value, href, color }) => (
                            <a key={label} href={href}
                                target={href.startsWith('http') ? '_blank' : undefined}
                                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className="glass-card flex items-center gap-4 p-4 group rounded-xl border transition-all hover:scale-105"
                                style={{ textDecoration: 'none', borderColor: 'var(--card-border)' }}>
                                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                                    style={{ background: `${color}18`, color }}>
                                    <Icon size={20} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)', fontFamily: isBn ? "var(--font-bn), 'SolaimanLipi', sans-serif" : 'inherit' }}>{label}</p>
                                    <p className="text-sm font-bold" style={{ color: 'var(--text)', fontFamily: isBn ? "var(--font-bn), 'SolaimanLipi', sans-serif" : 'inherit' }}>{value}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Main Content: Chambers + Form ── */}
            <section className="py-16" style={{ background: 'var(--bg)' }}>
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid lg:grid-cols-[1fr_480px] gap-12">

                        {/* Left: Chambers + Info */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold mb-6"
                                    style={{ color: 'var(--text)', fontFamily: isBn ? "var(--font-bn), 'SolaimanLipi', sans-serif" : "'Playfair Display', serif" }}>
                                    {isBn ? 'আইনি চেম্বারের ঠিকানা' : 'Chamber Locations'}
                                </h2>
                                <div className="space-y-4">
                                    {chambers.map((ch, i) => (
                                        <div key={i} className="glass-card p-5 rounded-xl border shadow-sm" style={{ borderColor: 'var(--card-border)' }}>
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                                                    style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
                                                    <MapPin size={18} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-bold text-base mb-1" style={{ color: 'var(--accent)', fontFamily: isBn ? "var(--font-bn), 'SolaimanLipi', sans-serif" : 'inherit' }}>{ch.name}</p>
                                                    <p className="text-sm font-medium mb-1.5" style={{ color: 'var(--text)', fontFamily: isBn ? "var(--font-bn), 'SolaimanLipi', sans-serif" : 'inherit' }}>{ch.address}</p>
                                                    <p className="text-xs mb-3" style={{ color: 'var(--text-muted)', fontFamily: isBn ? "var(--font-bn), 'SolaimanLipi', sans-serif" : 'inherit' }}>{ch.note}</p>
                                                    <a href={ch.mapLink} target="_blank" rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 text-xs font-bold"
                                                        style={{ color: 'var(--accent)', fontFamily: isBn ? "var(--font-bn), 'SolaimanLipi', sans-serif" : 'inherit' }}>
                                                        <ExternalLink size={13} /> {isBn ? 'গুগল ম্যাপে দেখুন' : 'View on Google Maps'}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Office Hours */}
                            <div className="glass-card p-5 rounded-xl border shadow-sm" style={{ borderColor: 'var(--card-border)' }}>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                                        style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
                                        <Clock size={16} />
                                    </div>
                                    <p className="font-bold text-sm" style={{ color: 'var(--text)', fontFamily: isBn ? "var(--font-bn), 'SolaimanLipi', sans-serif" : 'inherit' }}>
                                        {isBn ? 'চেম্বার সময়সূচি' : 'Office Hours'}
                                    </p>
                                </div>
                                <p className="text-sm font-bold" style={{ color: 'var(--text)', fontFamily: isBn ? "var(--font-bn), 'SolaimanLipi', sans-serif" : 'inherit' }}>
                                    {isBn ? 'শনিবার – বৃহস্পতিবার: সকাল ৯:০০ – রাত ৯:০০' : 'Saturday – Thursday: 9:00 AM – 9:00 PM'}
                                </p>
                                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)', fontFamily: isBn ? "var(--font-bn), 'SolaimanLipi', sans-serif" : 'inherit' }}>
                                    {isBn ? 'শুক্রবার: চেম্বার বন্ধ | হোয়াটসঅ্যাপ ২৪/৭ সচল' : 'Friday: Closed | WhatsApp available 7 days'}
                                </p>
                            </div>

                            {/* Practice Areas */}
                            <div>
                                <h2 className="text-xl font-bold mb-4"
                                    style={{ color: 'var(--text)', fontFamily: isBn ? "var(--font-bn), 'SolaimanLipi', sans-serif" : "'Playfair Display', serif" }}>
                                    {isBn ? 'আইনি সেবাসমূহ' : 'Practice Areas'}
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {practiceAreas.map((area, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)', fontFamily: isBn ? "var(--font-bn), 'SolaimanLipi', sans-serif" : 'inherit' }}>
                                            <Scale size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                                            {area}
                                        </div>
                                    ))}
                                </div>
                                <Link to={isBn ? '/bn/blog' : '/services/criminal-lawyer'}
                                    className="inline-flex items-center gap-1.5 text-sm font-bold mt-5 hover:underline"
                                    style={{ color: 'var(--accent)', fontFamily: isBn ? "var(--font-bn), 'SolaimanLipi', sans-serif" : 'inherit' }}>
                                    {isBn ? 'সকল আইনি পরামর্শ ব্লগ দেখুন →' : 'View All Services →'}
                                </Link>
                            </div>

                            {/* Google Maps Embed */}
                            <div className="rounded-2xl overflow-hidden shadow-sm" style={{ border: '1px solid var(--card-border)', height: '260px' }}>
                                <iframe
                                    title="Advocate Md. Shah Alam Office – Sector 12, Uttara, Dhaka"
                                    width="100%" height="260" loading="lazy" allowFullScreen
                                    referrerPolicy="no-referrer-when-downgrade"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14597.38!2d90.3987!3d23.8745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c5743d9d4e7b%3A0xae8a9b0d5e0e4941!2sUttara%20Sector%2012%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000"
                                    style={{ border: 0 }}
                                />
                            </div>
                        </div>

                        {/* Right: Contact Form */}
                        <div>
                            <ContactForm isBn={isBn} />
                            <div className="mt-6 p-5 rounded-xl text-center shadow-sm"
                                style={{ background: 'var(--surface)', border: '1px solid var(--card-border)' }}>
                                <p className="text-xs font-bold mb-2" style={{ color: 'var(--text)', fontFamily: isBn ? "var(--font-bn), 'SolaimanLipi', sans-serif" : 'inherit' }}>
                                    {isBn ? 'সরাসরি ফোনে কথা বলতে চান?' : 'Prefer to call directly?'}
                                </p>
                                <a href={`tel:${CALL_NUMBER}`}
                                    className="inline-flex items-center gap-2 text-lg font-bold"
                                    style={{ color: 'var(--accent)', fontFamily: isBn ? "var(--font-bn), 'SolaimanLipi', sans-serif" : 'inherit' }}>
                                    <Phone size={20} /> {CALL_DISPLAY}
                                </a>
                                <p className="text-xs mt-2" style={{ color: 'var(--text-muted)', fontFamily: isBn ? "var(--font-bn), 'SolaimanLipi', sans-serif" : 'inherit' }}>
                                    {isBn ? 'শনিবার–বৃহস্পতিবার (সকাল ৯টা - রাত ৯টা)' : 'Calls answered Sat–Thu, 9 AM – 9 PM'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Disclaimer ── */}
            <section className="py-8" style={{ background: 'var(--surface)', borderTop: '1px solid var(--card-border)' }}>
                <div className="container mx-auto px-6 max-w-5xl">
                    <p className="text-xs text-center leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: isBn ? "var(--font-bn), 'SolaimanLipi', sans-serif" : 'inherit' }}>
                        <strong>{isBn ? 'আইনি সতর্কবার্তা:' : 'Disclaimer:'}</strong> {isBn
                            ? 'মেসেজ বা ফোন কল করার মাধ্যমে সরাসরি আইনজীবী-ক্লায়েন্ট চুক্তি গঠিত হয় না। প্রেরিত সকল তথ্য সম্পূর্ণ গোপন রাখা হয়। জরুরি আইনি বিষয়ে সরাসরি ফোনে যোগাযোগের অনুরোধ করা যাচ্ছে। অ্যাডভোকেট মো. শাহ আলম বাংলাদেশ বার কাউন্সিলের তালিকাভুক্ত আইনজীবী।'
                            : 'Contacting us does not create an attorney-client relationship. Information submitted is kept confidential. For urgent legal matters, please call directly. Advocate Md. Shah Alam is enrolled with the Bangladesh Bar Council.'}
                    </p>
                </div>
            </section>
        </>
    );
};

export default ContactPage;
