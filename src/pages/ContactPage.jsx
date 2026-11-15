import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, Mail, Clock, Send, ExternalLink, Scale, ShieldCheck, CheckCircle2, CreditCard, ChevronRight, HelpCircle, FileText } from 'lucide-react';
import { CALL_NUMBER, CALL_DISPLAY, waLink } from '../data/contactInfo';
import siteInfo from '../content/siteInfo.json';
import AdSenseAd from '../components/AdSenseAd';

const CONTACT_FAQS_BN = [
    {
        q: 'আইনি পরামর্শের জন্য কীভাবে অ্যাপয়েন্টমেন্ট নেব?',
        a: 'আপনি সরাসরি 01712655546 নম্বরে কল করে অথবা ওয়েবসাইটের হোয়াটসঅ্যাপ ফর্মে বার্তা পাঠিয়ে উত্তরা সন্ধ্যা চেম্বার বা ঢাকা জজ কোর্ট চেম্বারে অ্যাপয়েন্টমেন্ট অথবা অনলাইন আইনি পরামর্শ বুক করতে পারেন।',
    },
    {
        q: 'পেইড কনসালটেশন ও কেস রিভিউ ফি কীভাবে পরিশোধ করতে হবে?',
        a: 'অনলাইন ভিডিও পরামর্শ বা ফোনালাপের মাধ্যমে বিস্তারিত নথিপত্র পর্যালোচনার জন্য বিকাশ নম্বর 01712655546-এ কনসালটেশন ফি পরিশোধ করে ট্রানজেকশন আইডি হোয়াটসঅ্যাপে পাঠিয়ে স্লট কনফার্ম করা যায়।',
    },
    {
        q: 'জরুরি গ্রেপ্তার, থানা জিডি বা জামিনের ক্ষেত্রে কি দ্রুত যোগাযোগ করা যাবে?',
        a: 'হ্যাঁ, জরুরি ফৌজদারি মামলা, থানা জিডি, পুলিশ রিমান্ড প্রতিরোধ এবং হাইকোর্ট বিভাগে ৪৯৮ ধারায় আগাম জামিনের বিষয়ে হোয়াটসঅ্যাপে বার্তা দিলে বা সরাসরি ফোনে দ্রুত পরামর্শ প্রদান করা হয়।',
    },
];

const CONTACT_FAQS_EN = [
    {
        q: 'How do I book a chamber consultation appointment?',
        a: 'You can call +880 1712-655546 directly or send your case summary through our WhatsApp intake form to schedule an in-person session at our Uttara Sector 12 or Dhaka Judge Court chamber, or an online video review.',
    },
    {
        q: 'What are the consultation fee payment methods?',
        a: 'For telephone consultations or remote NRB document and case reviews, fees can be remitted via bKash (01712655546) after confirming your time slot with the chamber desk.',
    },
    {
        q: 'Can I contact urgently for bail or arrest matters?',
        a: 'Yes, urgent criminal defence inquiries involving FIR registration, police custody remand protection, Section 497 surrender petitions, or High Court anticipatory bail are prioritized by phone and WhatsApp.',
    },
];

/* ─── 100/100 SEO JSON-LD Schemas ────────────────────────────── */
const buildContactSchema = (isBn) => {
    const BASE = 'https://www.advmdshahalam.me';
    const pageUrl = isBn ? `${BASE}/bn/contact` : `${BASE}/contact`;
    const faqs = isBn ? CONTACT_FAQS_BN : CONTACT_FAQS_EN;

    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebSite',
                '@id': `${BASE}/#website`,
                name: isBn ? 'এডভোকেট মোঃ শাহ আলম' : 'Advocate Md. Shah Alam',
                url: `${BASE}/`,
                inLanguage: isBn ? 'bn-BD' : 'en',
            },
            {
                '@type': 'Person',
                '@id': `${BASE}/#attorney`,
                name: 'Advocate Md. Shah Alam',
                jobTitle: 'Advocate, Supreme Court of Bangladesh',
                url: `${BASE}/advocate-md-shah-alam`,
                telephone: '+8801712655546',
                worksFor: { '@id': `${BASE}/#legalservice` },
            },
            {
                '@type': 'ContactPage',
                '@id': `${pageUrl}#webpage`,
                url: pageUrl,
                name: isBn ? 'যোগাযোগ ও আইনি চেম্বার | অ্যাডভোকেট মো. শাহ আলম' : 'Contact Advocate Md. Shah Alam | Uttara & Dhaka Court Chambers',
                inLanguage: isBn ? 'bn-BD' : 'en',
            },
            {
                '@type': 'LegalService',
                '@id': `${BASE}/#legalservice`,
                name: isBn ? 'অ্যাডভোকেট মো. শাহ আলম ল চেম্বার' : 'Advocate Md. Shah Alam Law Chamber',
                telephone: '+8801712655546',
                email: 'contact@advmdshahalam.me',
                url: BASE,
                image: `${BASE}/images/hero/hero-md-shah-alam.png`,
                priceRange: '৳৳',
                address: [
                    {
                        '@type': 'PostalAddress',
                        streetAddress: 'House 46, Road 6/B, Sector 12, Uttara West',
                        addressLocality: 'Uttara, Dhaka',
                        postalCode: '1230',
                        addressCountry: 'BD',
                    },
                    {
                        '@type': 'PostalAddress',
                        streetAddress: 'Ainjeebi Samity Bhaban, 4th Floor, 6/7 Court House Street, Kotwali',
                        addressLocality: 'Dhaka',
                        postalCode: '1100',
                        addressCountry: 'BD',
                    },
                ],
                geo: { '@type': 'GeoCoordinates', latitude: 23.8745, longitude: 90.3987 },
                openingHoursSpecification: {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
                    opens: '09:00',
                    closes: '21:00',
                },
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: isBn ? 'হোম' : 'Home', item: isBn ? `${BASE}/` : `${BASE}/en` },
                    { '@type': 'ListItem', position: 2, name: isBn ? 'যোগাযোগ' : 'Contact', item: pageUrl },
                ],
            },
            {
                '@type': 'FAQPage',
                mainEntity: faqs.map((f) => ({
                    '@type': 'Question',
                    name: f.q,
                    acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
            },
        ],
    };
};

const chambersEn = [
    {
        name: 'Uttara Chamber (Primary Office)',
        address: 'House 46, Road 6/B, Sector 12, Uttara West, Dhaka-1230',
        note: 'Primary consultation office & client chamber',
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

/* Expanded Practice Area Services Cards */
const practiceServicesBn = [
    {
        title: 'ফৌজদারি মামলা ও হাইকোর্ট জামিন',
        desc: 'থানা জিডি, এফআইআর, পুলিশ রিমান্ড প্রতিরোধ, নিয়মিত ও হাইকোর্ট আগাম জামিনের সুনির্দিষ্ট পরামর্শ।',
        link: '/bn/services/criminal-lawyer',
        badge: 'ফৌজদারি',
        color: '#EF4444'
    },
    {
        title: 'পারিবারিক আইন ও তালাক পরামর্শ',
        desc: 'মুসলিম পারিবারিক আইন, তালাক নোটিশ, দেনমোহর আদায়, সন্তানের অভিভাবকত্ব ও খোরপোষের মামলা।',
        link: '/bn/services/divorce-lawyer',
        badge: 'পারিবারিক',
        color: '#1D4ED8'
    },
    {
        title: 'সম্পত্তি বিবাদ ও বাটোয়ারা মামলা',
        desc: 'জমি কেনাবেচা চেকলিস্ট, খতিয়ান ভুল সংশোধন, বাটোয়ারা দলিল, নামজারি ও বেদখল জমি উদ্ধার মামলা।',
        link: '/bn/services/land-lawyer',
        badge: 'সম্পত্তি',
        color: '#10B981'
    },
    {
        title: 'হাইকোর্ট রিট পিটিশন ও আপিল',
        desc: 'মৌলিক অধিকার সুরক্ষা, সরকারি আদেশ চ্যালেঞ্জ, রিট পিটিশন ও সুপ্রিম কোর্ট আপিল কন্ডাক্ট।',
        link: '/bn/services/supreme-court-lawyer',
        badge: 'সুপ্রিম কোর্ট',
        color: '#3B82F6'
    },
    {
        title: 'ইনকাম ট্যাক্স ও এনবিআর নোটিশ',
        desc: 'আয়কর রিটার্ন, এনবিআর লিগ্যাল নোটিশ জবাব, আয়কর মামলা ও কর আপিল ট্রাইব্যুনাল শুনানি।',
        link: '/bn/services/tax-lawyer',
        badge: 'কর ও ভ্যাট',
        color: '#F59E0B'
    },
    {
        title: 'কোম্পানি ট্রেডমার্ক ও চুক্তি আইন',
        desc: 'ব্র্যান্ড ট্রেডমার্ক রেজিস্ট্রেশন, চুক্তিপত্র তৈরি, অংশীদারি ব্যবসা ও কর্পোরেট লিগ্যাল এডভাইস।',
        link: '/bn/services/company-corporate-lawyer',
        badge: 'কোম্পানি',
        color: '#065F46'
    },
];

const practiceServicesEn = [
    {
        title: 'Criminal Defence & High Court Bail',
        desc: 'Expert representation for FIR, police remand protection, anticipatory bail & High Court matters.',
        link: '/services/criminal-lawyer',
        badge: 'Criminal',
        color: '#EF4444'
    },
    {
        title: 'Family Law & Divorce Consultation',
        desc: 'Legal guidance on divorce notice, Mahr recovery, child custody & family court maintenance.',
        link: '/services/divorce-lawyer',
        badge: 'Family',
        color: '#1D4ED8'
    },
    {
        title: 'Property Disputes & Partition Suits',
        desc: 'Land title verification, khatian correction, partition deed, mutation & land recovery cases.',
        link: '/services/land-lawyer',
        badge: 'Property',
        color: '#10B981'
    },
    {
        title: 'Supreme Court Writ Petitions',
        desc: 'Fundamental rights protection, challenging arbitrary government orders & High Court writs.',
        link: '/services/supreme-court-lawyer',
        badge: 'Supreme Court',
        color: '#3B82F6'
    },
    {
        title: 'Income Tax & NBR Audit Notices',
        desc: 'Tax return compliance, NBR legal notice response & Tax Appeal Tribunal representation.',
        link: '/services/tax-lawyer',
        badge: 'Taxation',
        color: '#F59E0B'
    },
    {
        title: 'Corporate Law & Trademark Registration',
        desc: 'Brand trademark registration, drafting agreements & business dispute resolution.',
        link: '/services/company-corporate-lawyer',
        badge: 'Corporate',
        color: '#065F46'
    },
];

/* ─── Contact Form Component ─────────────────────────────────── */
const cleanField = (val, maxLen = 200) =>
    String(val || '').replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, maxLen);

const ContactForm = ({ isBn, initialService }) => {
    const preselectedSubject = initialService === 'case-review'
        ? (isBn ? 'পেইড কেস রিভিউ ($30–$75)' : 'Paid Case Review ($30–$75)')
        : '';
    const [formData, setFormData] = React.useState({ name: '', phone: '', subject: preselectedSubject, message: '', website: '' });
    const [submitted, setSubmitted] = React.useState(false);
    const mountedAt = React.useRef(Date.now());
    const lastSubmitAt = React.useRef(0);

    React.useEffect(() => {
        if (initialService === 'case-review') {
            setFormData((prev) => ({
                ...prev,
                subject: isBn ? 'পেইড কেস রিভিউ ($30–$75)' : 'Paid Case Review ($30–$75)',
            }));
        }
    }, [initialService, isBn]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        const now = Date.now();
        if (formData.website || now - mountedAt.current < 800 || now - lastSubmitAt.current < 4000) {
            return;
        }
        lastSubmitAt.current = now;
        const safeName = cleanField(formData.name, 80);
        const safePhone = cleanField(formData.phone, 25);
        const safeSub = cleanField(formData.subject, 120);
        const safeMsg = cleanField(formData.message, 1000);
        const text = isBn
            ? `*📋 আইনি পরমর্শ ও কেস সংক্রান্ত তথ্য (advmdshahalam.me)*\n\n*নাম:* ${safeName}\n*ফোন:* ${safePhone}\n*আইনি বিষয়:* ${safeSub}\n*বিবরণ:* ${safeMsg}`
            : `*📋 New Case Inquiry from advmdshahalam.me*\n\n*Name:* ${safeName}\n*Phone:* ${safePhone}\n*Subject:* ${safeSub}\n*Details:* ${safeMsg}`;
        window.open(waLink(text), '_blank', 'noopener,noreferrer');
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
        fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : "var(--font-en), sans-serif"
    };

    if (submitted) {
        return (
            <div className="glass-card p-10 text-center rounded-2xl border" style={{ borderColor: 'var(--card-border)' }}>
                <svg className="mb-4" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="m8 12.5 2.5 2.5L16 9.5" /></svg>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>
                    {isBn ? 'বার্তা সফলভাবে পাঠানো হয়েছে!' : 'Message Sent!'}
                </h3>
                <p className="text-sm mb-6" style={{ color: 'var(--text-muted)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>
                    {isBn ? 'আপনার বার্তাটি সরাসরি হোয়াটসঅ্যাপে পাঠানো হয়েছে। অ্যাডভোকেট মো. শাহ আলম খুব শীঘ্রই যোগাযোগ করবেন।' : "Your inquiry has been sent via WhatsApp."}
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-primary text-sm" style={{ fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>
                    {isBn ? 'আরেকটি বার্তা পাঠান' : 'Send Another Message'}
                </button>
            </div>
        );
    }

    return (
        <div className="glass-card p-8 md:p-10 rounded-2xl shadow-xl border" style={{ borderColor: 'var(--card-border)' }}>
            <h2 className="text-2xl font-bold mb-2"
                style={{ color: 'var(--text)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : "Georgia, serif" }}>
                {isBn ? 'আইনি পরামর্শের জন্য বার্তা পাঠান' : 'Send Your Case Details'}
            </h2>
            <p className="text-sm mb-7" style={{ color: 'var(--text-muted)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>
                {isBn ? 'নিচের ফর্মে আপনার আইনি তথ্য দিন, সরাসরি হোয়াটসঅ্যাপে পরামর্শ দেওয়া হবে।' : "Fill out the form below and we'll respond via WhatsApp within a few hours."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot anti-bot field */}
                <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden', opacity: 0, pointerEvents: 'none' }}>
                    <input name="website" type="text" tabIndex={-1} autoComplete="off" value={formData.website} onChange={handleChange} />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                        <label className="text-xs font-bold uppercase tracking-wider block mb-1.5"
                            style={{ color: 'var(--text-muted)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>
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
                            style={{ color: 'var(--text-muted)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>
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
                        style={{ color: 'var(--text-muted)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>
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
                                <option value="পেইড কেস রিভিউ ($30–$75)">পেইড কেস রিভিউ / ডকুমেন্ট ভেটিং ($30–$75)</option>
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
                                <option value="Paid Case Review ($30–$75)">Paid Case Review / Document Vetting ($30–$75)</option>
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
                        style={{ color: 'var(--text-muted)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>
                        {isBn ? 'মামলা বা ঘটনার বিবরণ *' : 'Case Details *'}
                    </label>
                    <textarea
                        name="message" rows="4" required
                        placeholder={isBn ? 'সংক্ষেপে আপনার আইনি বিষয়টি লিখুন...' : 'Briefly describe your legal situation...'}
                        value={formData.message} onChange={handleChange}
                        style={{ ...inputStyle, resize: 'none' }}
                        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                        onBlur={e => e.target.style.borderColor = 'var(--input-border)'}
                    />
                </div>

                <button type="submit" id="contact-submit-btn"
                    data-cta="consult"
                    data-placement="contact-form"
                    className="btn-primary w-full flex items-center justify-center gap-2 py-4 font-bold text-sm shadow-md rounded-xl"
                    style={{ fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>
                    <Send size={17} /> {isBn ? 'হোয়াটসঅ্যাপে পাঠান' : 'Send via WhatsApp'}
                </button>

                <p className="text-xs text-center" style={{ color: 'var(--text-muted)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>
                    {isBn ? 'আপনার পাঠানো তথ্য শতভাগ গোপন রাখা হয়।' : 'All consultations are strictly confidential.'}
                </p>
            </form>
        </div>
    );
};

/* ─── Main Contact Page ──────────────────────────────────────── */
const ContactPage = ({ lang }) => {
    const location = useLocation();
    const isBn = lang === 'bn' || location.pathname.startsWith('/bn');
    const initialService = new URLSearchParams(location.search).get('service') || '';

    const chambers = isBn ? chambersBn : chambersEn;
    const practiceServices = isBn ? practiceServicesBn : practiceServicesEn;

    return (
        <>
            <Helmet>
                <html lang={isBn ? 'bn' : 'en'} />
                <title>
                    {isBn
                        ? 'যোগাযোগ ও চেম্বার | এডভোকেট মোঃ শাহ আলম ঢাকা'
                        : 'Contact Advocate Md. Shah Alam | Dhaka Chamber'}
                </title>
                <meta name="description"
                    content={isBn
                        ? 'এডভোকেট মোঃ শাহ আলমের উত্তরা ও ঢাকা জজ কোর্ট চেম্বারে সরাসরি আইনি পরামর্শ ও মামলা মূল্যায়নের জন্য যোগাযোগ করুন। ফোন: +8801712655546।'
                        : 'Contact Advocate Md. Shah Alam for legal consultation in Dhaka & Uttara. Call +880 1712-655546 or WhatsApp for criminal, divorce, bail & property cases.'} />
                <link rel="canonical" href={isBn ? 'https://www.advmdshahalam.me/bn/contact' : 'https://www.advmdshahalam.me/contact'} />
                <link rel="alternate" hrefLang="en" href="https://www.advmdshahalam.me/contact" />
                <link rel="alternate" hrefLang="bn" href="https://www.advmdshahalam.me/bn/contact" />
                <link rel="alternate" hrefLang="x-default" href="https://www.advmdshahalam.me/contact" />
                <meta name="robots" content="index, follow" />

                <meta property="og:title" content={isBn ? 'যোগাযোগ ও চেম্বার | এডভোকেট মোঃ শাহ আলম ঢাকা' : 'Contact Advocate Md. Shah Alam | Dhaka Chamber'} />
                <meta property="og:description" content={isBn ? 'সুপ্রিম কোর্ট ও ঢাকা জজ কোর্ট চেম্বার। সরাসরি ফোন: ০১৭১২৬৫৫৫৪৬' : 'Reach Advocate Md. Shah Alam by phone, WhatsApp or visit our Uttara chamber.'} />
                <meta property="og:url" content={isBn ? 'https://www.advmdshahalam.me/bn/contact' : 'https://www.advmdshahalam.me/contact'} />

                <script type="application/ld+json">{JSON.stringify(buildContactSchema(isBn))}</script>
            </Helmet>

            {/* ── Hero Header ── */}
            <section className="pt-28 md:pt-32 pb-14 relative overflow-hidden" style={{ background: 'var(--hero-bg)' }}>
                <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at 60% 50%, rgba(198,167,94,0.08) 0%, transparent 70%)' }} />
                <div className="container mx-auto px-6 max-w-5xl relative z-10">
                    <nav className="mb-6 text-xs" aria-label="Breadcrumb">
                        <ol className="flex items-center gap-2" style={{ color: 'var(--hero-muted)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>
                            <li><Link to={isBn ? '/' : '/en'} className="hover:underline" style={{ color: 'var(--hero-text-2)' }}>{isBn ? 'হোম' : 'Home'}</Link></li>
                            <li aria-hidden="true">/</li>
                            <li aria-current="page" style={{ color: 'var(--gold)' }}>{isBn ? 'যোগাযোগ' : 'Contact'}</li>
                        </ol>
                    </nav>

                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-4 border" style={{ background: 'rgba(198,167,94,0.1)', color: 'var(--gold)', borderColor: 'rgba(198,167,94,0.3)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>
                        <Scale size={14} />
                        {isBn ? 'সুপ্রিম কোর্ট আইনজীবী সরাসরি পরামর্শ কার্যালয়' : 'Get Expert Legal Help'}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4"
                        style={{ color: 'var(--hero-text)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : "Georgia, serif" }}>
                        {isBn ? 'অ্যাডভোকেট মো. শাহ আলম – সরাসরি যোগাযোগ ও চেম্বার' : 'Contact Advocate Md. Shah Alam'}
                    </h1>

                    <p className="text-base md:text-lg leading-relaxed max-w-3xl mb-8" style={{ color: 'var(--hero-text-2)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>
                        {isBn
                            ? 'বাংলাদেশ সুপ্রিম কোর্ট ও ঢাকা জজ কোর্টের অভিজ্ঞ আইনজীবীর সাথে ফোন, হোয়াটসঅ্যাপ বা উত্তরা ও কোর্ট চেম্বারে সরাসরি সাক্ষাতের মাধ্যমে পূর্ণাঙ্গ আইনি সমাধান নিশ্চিত করুন।'
                            : 'Trusted criminal, divorce, bail, and property lawyer in Uttara, Dhaka. Contact us for a confidential consultation — available 6 days a week.'}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <a href={`tel:${CALL_NUMBER}`} data-cta="contact-hero-call" data-placement="contact-hero" className="btn-primary flex items-center gap-2 text-sm px-6 py-3.5 shadow-lg" style={{ fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>
                            <Phone size={17} /> {isBn ? 'সরাসরি কল করুন' : 'Call Now'}
                        </a>
                        <a href={waLink(isBn ? 'আমি সরাসরি আইনি পরামর্শ নিতে চাই' : 'I need legal advice')} target="_blank" rel="noopener noreferrer"
                            data-cta="contact-hero-whatsapp" data-placement="contact-hero"
                            className="btn-whatsapp flex items-center gap-2 text-sm px-6 py-3.5 shadow-lg">
                            <MessageCircle size={17} /> {isBn ? 'হোয়াটসঅ্যাপ আইনি পরামর্শ' : 'WhatsApp Consultation'}
                        </a>
                    </div>
                </div>
            </section>

            {/* ── Quick Contact Bar (Phone, WhatsApp, bKash Paid Consult) ── */}
            <section className="py-8" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--card-border)' }}>
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid sm:grid-cols-3 gap-4">
                        {[
                            { icon: Phone, label: isBn ? 'সরাসরি হটলাইন কল' : 'Phone', value: CALL_DISPLAY, href: `tel:${CALL_NUMBER}`, color: 'var(--accent)', cta: 'contact-quick-call' },
                            { icon: MessageCircle, label: isBn ? 'ইনস্ট্যান্ট হোয়াটসঅ্যাপ' : 'WhatsApp', value: '+880 1955-802007', href: waLink(), color: '#25D366', cta: 'contact-quick-whatsapp' },
                            { icon: CreditCard, label: isBn ? 'পেইড কনসালটেশন (bKash)' : 'bKash Paid Review', value: '01712655546', href: `tel:${CALL_NUMBER}`, color: 'var(--gold)', cta: 'contact-bkash-call' },
                        ].map(({ icon: Icon, label, value, href, color, cta }) => (
                            <a key={label} href={href}
                                data-cta={cta}
                                data-placement="contact-quick"
                                target={href.startsWith('http') ? '_blank' : undefined}
                                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className="glass-card flex items-center gap-4 p-4 group rounded-xl border transition-[color,background-color,border-color,box-shadow,opacity,transform] hover:scale-105"
                                style={{ textDecoration: 'none', borderColor: 'var(--card-border)' }}>
                                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                                    style={{ background: `${color}18`, color }}>
                                    <Icon size={20} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>{label}</p>
                                    <p className="text-sm font-bold" style={{ color: 'var(--text)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>{value}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Main Content: Chambers + Form ── */}
            <section className="py-16" style={{ background: 'var(--bg)' }}>
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid lg:grid-cols-[1fr_480px] gap-12 mb-16">

                        {/* Left: Chambers + Info */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold mb-6"
                                    style={{ color: 'var(--text)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : "Georgia, serif" }}>
                                    {isBn ? 'আইনি চেম্বারের সরাসরি ঠিকানা' : 'Chamber Locations'}
                                </h2>
                                <div className="space-y-4">
                                    {chambers.map((ch, i) => (
                                        <div key={i} className="glass-card p-6 rounded-2xl border shadow-md transition-[color,background-color,border-color,box-shadow,opacity,transform] hover:-translate-y-1" style={{ borderColor: 'var(--card-border)' }}>
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 mt-0.5"
                                                    style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
                                                    <MapPin size={22} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-bold text-lg mb-1" style={{ color: 'var(--accent)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>{ch.name}</p>
                                                    <p className="text-sm font-semibold mb-1.5 leading-relaxed" style={{ color: 'var(--text)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>{ch.address}</p>
                                                    <p className="text-xs mb-3" style={{ color: 'var(--text-muted)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>{ch.note}</p>
                                                    <a href={ch.mapLink} target="_blank" rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-[color,background-color,border-color,box-shadow,opacity,transform] hover:bg-[var(--accent)] hover:text-white"
                                                        style={{ color: 'var(--accent)', borderColor: 'var(--accent)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>
                                                        <ExternalLink size={13} /> {isBn ? 'গুগল ম্যাপে নেভিগেট করুন' : 'View on Google Maps'}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Office Hours */}
                            <div className="glass-card p-6 rounded-2xl border shadow-sm" style={{ borderColor: 'var(--card-border)' }}>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                        style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
                                        <Clock size={18} />
                                    </div>
                                    <p className="font-bold text-base" style={{ color: 'var(--text)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>
                                        {isBn ? 'চেম্বার সময়সূচি ও সাক্ষাতের সময়' : 'Office Hours'}
                                    </p>
                                </div>
                                <p className="text-sm font-bold" style={{ color: 'var(--text)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>
                                    {isBn ? 'শনিবার – বৃহস্পতিবার: সকাল ৯:০০ – রাত ৯:০০' : 'Saturday – Thursday: 9:00 AM – 9:00 PM'}
                                </p>
                                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>
                                    {isBn ? 'শুক্রবার: চেম্বার বন্ধ | অনলাইন ও হোয়াটসঅ্যাপ ২৪/৭ সচল' : 'Friday: Closed | WhatsApp available 7 days'}
                                </p>
                            </div>

                            {/* Google Maps Embed */}
                            <div className="rounded-2xl overflow-hidden shadow-lg border" style={{ borderColor: 'var(--card-border)', height: '320px' }}>
                                <iframe
                                    title="Advocate Md. Shah Alam Office – Sector 12, Uttara, Dhaka"
                                    width="100%" height="320" loading="lazy" allowFullScreen
                                    referrerPolicy="no-referrer-when-downgrade"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14597.38!2d90.3987!3d23.8745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c5743d9d4e7b%3A0xae8a9b0d5e0e4941!2sUttara%20Sector%2012%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000"
                                    style={{ border: 0 }}
                                />
                            </div>
                        </div>

                        {/* Right: Contact Form */}
                        <div>
                            <ContactForm isBn={isBn} initialService={initialService} />
                            <div className="mt-6 p-6 rounded-2xl text-center shadow-md border"
                                style={{ background: 'var(--surface)', borderColor: 'var(--card-border)' }}>
                                <p className="text-xs font-bold mb-2" style={{ color: 'var(--text)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>
                                    {isBn ? 'জরুরি প্রয়োজনে সরাসরি কল করুন:' : 'Prefer to call directly?'}
                                </p>
                                <a href={`tel:${CALL_NUMBER}`}
                                    data-cta="contact-direct-call"
                                    data-placement="contact-sidebar"
                                    className="inline-flex items-center gap-2 text-xl font-bold hover:scale-105 transition-transform"
                                    style={{ color: 'var(--accent)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>
                                    <Phone size={22} /> {CALL_DISPLAY}
                                </a>
                                <p className="text-xs mt-2" style={{ color: 'var(--text-muted)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>
                                    {isBn ? 'শনিবার–বৃহস্পতিবার (সকাল ৯টা - রাত ৯টা)' : 'Calls answered Sat–Thu, 9 AM – 9 PM'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ════ AD UNIT 1: BETWEEN CHAMBERS/FORM AND PRACTICE SERVICES ════ */}
                    <div className="my-10">
                        <AdSenseAd
                            key={`contact-mid-${isBn ? 'bn' : 'en'}`}
                            slot="8630877987"
                            format="auto"
                            responsive={true}
                            labelText={isBn ? 'বিজ্ঞাপন' : 'Advertisement'}
                            minHeight={250}
                        />
                    </div>

                    {/* ════ EXPANDED LEGAL SERVICES CARDS SECTION ════ */}
                    <div className="pt-12 border-t" style={{ borderColor: 'var(--card-border)' }}>
                        <div className="text-center max-w-2xl mx-auto mb-10">
                            <span className="text-xs font-bold px-3.5 py-1.5 rounded-full mb-3 inline-block"
                                style={{ background: 'var(--accent-subtle)', color: 'var(--accent)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>
                                {isBn ? 'আইনি সেবাসমূহ' : 'Legal Services & Solutions'}
                            </span>
                            <h2 className="text-2xl md:text-3xl font-bold"
                                style={{ color: 'var(--text)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : "Georgia, serif" }}>
                                {isBn ? 'আইনজীবীর সুনির্দিষ্ট বিশেষত্ব ও আইনি সেবা ক্ষেত্র' : 'Expert Practice Areas & Consultation'}
                            </h2>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {practiceServices.map((service, idx) => (
                                <div
                                    key={idx}
                                    className="glass-card p-6 rounded-2xl border flex flex-col justify-between transition-[color,background-color,border-color,box-shadow,opacity,transform] duration-300 hover:-translate-y-1 shadow-sm"
                                    style={{ borderColor: 'var(--card-border)' }}
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-[11px] font-bold px-2.5 py-1 rounded-md"
                                                style={{ background: 'var(--accent-subtle)', color: 'var(--accent)', border: '1px solid var(--card-border)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>
                                                {service.badge}
                                            </span>
                                            <Scale size={18} style={{ color: 'var(--gold)' }} />
                                        </div>

                                        <h3 className="text-lg font-bold mb-2 leading-snug"
                                            style={{ color: 'var(--text)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>
                                            {service.title}
                                        </h3>

                                        <p className="text-xs leading-relaxed mb-4"
                                            style={{ color: 'var(--text-secondary)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>
                                            {service.desc}
                                        </p>
                                    </div>

                                    <Link
                                        to={service.link}
                                        className="inline-flex items-center gap-1 text-xs font-bold group hover:underline"
                                        style={{ color: 'var(--accent)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}
                                    >
                                        {isBn ? 'আইনি গাইড দেখুন' : 'Learn More'} <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ════ SUBSTANTIVE CHAMBER CONSULTATION & PRE-VISIT GUIDANCE (500+ words parity) ════ */}
                    <div className="mt-12 grid md:grid-cols-2 gap-8 pt-10 border-t" style={{ borderColor: 'var(--card-border)' }}>
                        <div className="glass-card p-6 rounded-2xl border" style={{ borderColor: 'var(--card-border)' }}>
                            <h2 className="text-xl font-bold mb-3 flex items-center gap-2"
                                style={{ color: 'var(--text)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : "Georgia, serif" }}>
                                <ShieldCheck size={19} style={{ color: 'var(--accent)' }} />
                                {isBn ? 'আদালত অধিক্ষেত্র ও প্রবাসী (NRB) দূরবর্তী সেবা' : 'Court Jurisdiction & Remote NRB Representation'}
                            </h2>
                            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>
                                {isBn
                                    ? 'বাংলাদেশ বার কাউন্সিল ও সুপ্রিম কোর্টে ২০১৫ সাল থেকে তালিকাভুক্ত অ্যাডভোকেট মো. শাহ আলম ঢাকা চিফ মেট্রোপলিটন ম্যাজিস্ট্রেট (CMM) কোর্ট, মহানগর দায়রা জজ আদালত, পারিবারিক আদালত, বিশেষ ট্রাইব্যুনাল এবং বাংলাদেশ সুপ্রিম কোর্টের হাইকোর্ট ও আপিল বিভাগে মামলা পরিচালনা করেন।'
                                    : 'Enrolled with the Bangladesh Bar Council since 2015, Advocate Md. Shah Alam represents clients before the Dhaka Chief Metropolitan & Judicial Magistrate Courts, Metropolitan Sessions Judge Court, Family Courts, Administrative & Cyber Tribunals, and the High Court Division of the Supreme Court of Bangladesh.'}
                            </p>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>
                                {isBn
                                    ? 'যুক্তরাজ্য, যুক্তরাষ্ট্র, কানাডা, সংযুক্ত আরব আমিরাত ও ইউরোপে বসবাসরত প্রবাসী বাংলাদেশিরা দেশে না এসেই ভিডিও কলের মাধ্যমে জমি যাচাই, দূতাবাস-সত্যায়িত পাওয়ার অব অ্যাটর্নি, তালাক নোটিশ বা প্রতারণা মামলার আইনি সহায়তা নিতে পারেন। বিস্তারিত জানতে দেখুন '
                                    : 'Non-Resident Bangladeshis (NRBs) in the UK, USA, Canada, UAE, and Europe can arrange video case evaluations, deed & khatian vetting, Embassy-attested Power of Attorney drafts, and court filings remotely without flying to Dhaka via '}
                                <Link to="/nrb-legal-help" className="font-semibold underline" style={{ color: 'var(--accent)' }}>
                                    {isBn ? 'প্রবাসী আইনি সহায়তা ডেস্ক' : 'our NRB Legal Help Desk'}
                                </Link>
                                {' '}{isBn ? 'অথবা জানুন ' : 'and view '}
                                <Link to="/advocate-md-shah-alam" className="font-semibold underline" style={{ color: 'var(--accent)' }}>
                                    {isBn ? 'অ্যাডভোকেট পরিচিতি ও বার এনরোলমেন্ট।' : 'Advocate Md. Shah Alam profile & credentials.'}
                                </Link>
                            </p>
                        </div>

                        <div className="glass-card p-6 rounded-2xl border" style={{ borderColor: 'var(--card-border)' }}>
                            <h2 className="text-xl font-bold mb-3 flex items-center gap-2"
                                style={{ color: 'var(--text)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : "Georgia, serif" }}>
                                <FileText size={19} style={{ color: 'var(--gold)' }} />
                                {isBn ? 'সাক্ষাতের পূর্বে প্রস্তুতি ও পরামর্শ ফি' : 'Pre-Visit Document Checklist & Consultation Fee'}
                            </h2>
                            <ul className="space-y-2 text-sm mb-4" style={{ color: 'var(--text-secondary)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>
                                {(isBn
                                    ? [
                                          'ফৌজদারি ও জামিন মামলা: এজাহার (FIR), জিডি, চার্জশিট বা নিম্ন আদালতের জামিন নামঞ্জুর আদেশের কপি।',
                                          'জমি ও সম্পত্তি বিরোধ: সিএস/এসএ/আরএস/বিএস খতিয়ান, সর্বশেষ বায়া দলিল ও নামজারি ডিসিআর।',
                                          'পারিবারিক ও তালাক মামলা: কাবিননামা, সন্তানের জন্ম সনদ ও প্রয়োজনে প্রেরিত তালাক নোটিশের কপি।',
                                          'পেইড কেস রিভিউ ও দলিল ভেটিং ফি: ৪৫ মিনিটের ভিডিও/চেম্বার পরামর্শ (৳৩,০০০ / $৩০) থেকে বিস্তারিত দলিল যাচাই (৳৮,০০০ / $৭৫) — আনুমানিক; মামলার জটিলতা অনুযায়ী নির্ধারিত। বিকাশ: ০১৭১২৬৫৫৫৪৬।',
                                      ]
                                    : [
                                          'Criminal & Bail Matters: Copy of the FIR, General Diary (GD), charge sheet, arrest memo, or certified lower court rejection order.',
                                          'Land & Property Disputes: Registered sale deeds (Saf Kabala), Bia deeds, CS/SA/RS/BS khatian records, and e-mutation (Namjari) receipts.',
                                          'Divorce & Custody Matters: Registered Kabinnama, municipal talaq notice copies, or foreign court decree where applicable.',
                                          'Indicative Consultation & Case Review Fee: BDT 3,000 ($30) for structured 45-minute strategy review; BDT 5,000–8,000 ($50–$75) for written deed/khatian opinion (indicative only; chamber & court schedules govern). bKash: 01712655546.',
                                      ]
                                ).map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                        <CheckCircle2 size={15} className="mt-1 flex-shrink-0" style={{ color: 'var(--accent)' }} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* ════ AD UNIT 2: BETWEEN PRACTICE SERVICES AND FAQ ════ */}
                    <div className="mt-10">
                        <AdSenseAd
                            key={`contact-grid-${isBn ? 'bn' : 'en'}`}
                            slot="3667074343"
                            format="autorelaxed"
                            responsive={true}
                            labelText={isBn ? 'আরও দেখুন' : 'Sponsored Content'}
                            minHeight={280}
                        />
                    </div>

                    {/* ════ FREQUENTLY ASKED QUESTIONS (FAQ) SECTION ════ */}
                    <div className="mt-16 pt-12 border-t" style={{ borderColor: 'var(--card-border)' }}>
                        <div className="text-center max-w-xl mx-auto mb-10">
                            <h2 className="text-2xl font-bold mb-2"
                                style={{ color: 'var(--text)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : "Georgia, serif" }}>
                                {isBn ? 'যোগাযোগ সংক্রান্ত সাধারণ প্রশ্নাবলী (FAQ)' : 'Frequently Asked Questions'}
                            </h2>
                            <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>
                                {isBn ? 'চেম্বার অ্যাপয়েন্টমেন্ট ও কনসালটেশন সংক্রান্ত দরকারি তথ্য।' : 'Everything you need to know before contacting us.'}
                            </p>
                        </div>

                        <div className="space-y-4 max-w-3xl mx-auto">
                            {(isBn ? CONTACT_FAQS_BN : CONTACT_FAQS_EN).map((faq, i) => (
                                <div key={i} className="glass-card p-5 rounded-2xl border" style={{ borderColor: 'var(--card-border)' }}>
                                    <h3 className="text-sm font-bold mb-2 flex items-center gap-2"
                                        style={{ color: 'var(--text)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>
                                        <HelpCircle size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                                        {faq.q}
                                    </h3>
                                    <p className="text-xs leading-relaxed pl-6"
                                        style={{ color: 'var(--text-secondary)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>
                                        {faq.a}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* ── Disclaimer ── */}
            <section className="py-8" style={{ background: 'var(--surface)', borderTop: '1px solid var(--card-border)' }}>
                <div className="container mx-auto px-6 max-w-5xl">
                    <p className="text-xs text-center leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>
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
