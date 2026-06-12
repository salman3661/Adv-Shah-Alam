import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, Mail, Clock, Send, ExternalLink, Scale } from 'lucide-react';
import { CALL_NUMBER, CALL_DISPLAY, waLink } from '../data/contactInfo';
import siteInfo from '../content/siteInfo.json';

/* ─── Schema Markup ──────────────────────────────────────────── */
const contactPageSchema = {
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

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.advmdshahalam.me/' },
        { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://www.advmdshahalam.me/contact' },
    ],
};

/* ─── Contact Info Data ──────────────────────────────────────── */
const chambers = [
    {
        name: 'Uttara Chamber',
        address: 'House 46, Road 6/B, Sector 12, Uttara West, Dhaka-1230',
        note: 'Primary consultation office',
        mapLink: 'https://maps.app.goo.gl/M3NXMwW3xkp2TE3h8',
    },
    {
        name: 'Court Chamber',
        address: 'Ainjeebi Samity Bhaban, 4th Floor, 6/7 Court House Street, Kotwali, Dhaka-1100',
        note: 'Near Dhaka Sessions Court',
        mapLink: 'https://maps.google.com/?q=6/7+Court+House+Street+Kotwali+Dhaka',
    },
];

const practiceAreas = [
    'Criminal Law — FIR, bail, trial & appeals',
    'Family Law — Divorce, child custody & maintenance',
    'Land & Property — Disputes, registration & partition',
    'Bail — Regular, anticipatory & High Court bail',
    'Supreme Court — Writ petitions & appellate matters',
    'Corporate Law — Company registration & disputes',
];

/* ─── Form Component ─────────────────────────────────────────── */
const ContactForm = () => {
    const [formData, setFormData] = React.useState({ name: '', phone: '', subject: '', message: '' });
    const [submitted, setSubmitted] = React.useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        const text = `*📋 New Case Inquiry from advmdshahalam.me*\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Subject:* ${formData.subject}\n*Details:* ${formData.message}`;
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
    };

    if (submitted) {
        return (
            <div className="glass-card p-10 text-center rounded-2xl">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>Message Sent!</h3>
                <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                    Your inquiry has been sent via WhatsApp. Advocate Shah Alam will respond shortly.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-primary text-sm">
                    Send Another Message
                </button>
            </div>
        );
    }

    return (
        <div className="glass-card p-8 md:p-10 rounded-2xl">
            <h2 className="text-2xl font-serif font-bold mb-2"
                style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
                Send Your Case Details
            </h2>
            <p className="text-sm mb-7" style={{ color: 'var(--text-muted)' }}>
                Fill out the form below and we'll respond via WhatsApp within a few hours.
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                        <label className="text-xs font-bold uppercase tracking-wider block mb-1.5"
                            style={{ color: 'var(--text-muted)' }}>Full Name *</label>
                        <input
                            name="name" type="text" required placeholder="Your full name"
                            value={formData.name} onChange={handleChange}
                            style={inputStyle}
                            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                            onBlur={e => e.target.style.borderColor = 'var(--input-border)'}
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold uppercase tracking-wider block mb-1.5"
                            style={{ color: 'var(--text-muted)' }}>Phone Number *</label>
                        <input
                            name="phone" type="tel" required placeholder="+880 XXXX-XXXXXX"
                            value={formData.phone} onChange={handleChange}
                            style={inputStyle}
                            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                            onBlur={e => e.target.style.borderColor = 'var(--input-border)'}
                        />
                    </div>
                </div>
                <div>
                    <label className="text-xs font-bold uppercase tracking-wider block mb-1.5"
                        style={{ color: 'var(--text-muted)' }}>Legal Matter Type *</label>
                    <select
                        name="subject" required value={formData.subject} onChange={handleChange}
                        style={{ ...inputStyle, appearance: 'auto' }}
                        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                        onBlur={e => e.target.style.borderColor = 'var(--input-border)'}
                    >
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
                    </select>
                </div>
                <div>
                    <label className="text-xs font-bold uppercase tracking-wider block mb-1.5"
                        style={{ color: 'var(--text-muted)' }}>Case Details *</label>
                    <textarea
                        name="message" rows="5" required
                        placeholder="Briefly describe your legal situation, any court dates, case numbers, or relevant details..."
                        value={formData.message} onChange={handleChange}
                        style={{ ...inputStyle, resize: 'none' }}
                        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                        onBlur={e => e.target.style.borderColor = 'var(--input-border)'}
                    />
                </div>
                <button type="submit" id="contact-submit-btn"
                    className="btn-primary w-full flex items-center justify-center gap-2 py-4 font-bold text-sm shadow-md rounded-xl">
                    <Send size={17} /> Send via WhatsApp
                </button>
                <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
                    Your message will open in WhatsApp. All consultations are confidential.
                </p>
            </form>
        </div>
    );
};

/* ─── Main Page ──────────────────────────────────────────────── */
const ContactPage = () => (
    <>
        <Helmet>
            <title>Contact Advocate Md. Shah Alam | Criminal, Divorce & Bail Lawyer – Uttara, Dhaka</title>
            <meta name="description"
                content="Contact Advocate Md. Shah Alam for legal consultation in Dhaka & Uttara. Call +880 1712-655546 or WhatsApp for criminal, divorce, bail & property cases." />
            <link rel="canonical" href="https://www.advmdshahalam.me/contact" />
            <meta name="robots" content="index, follow" />
            <meta property="og:title" content="Contact Advocate Md. Shah Alam | Lawyer in Dhaka, Bangladesh" />
            <meta property="og:description"
                content="Reach Advocate Md. Shah Alam by phone, WhatsApp or visit our Uttara chamber. Expert criminal, divorce, bail & property lawyer in Bangladesh." />
            <meta property="og:url" content="https://www.advmdshahalam.me/contact" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="https://www.advmdshahalam.me/images/hero/hero-md-shah-alam.png" />
            <script type="application/ld+json">{JSON.stringify(contactPageSchema)}</script>
            <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        </Helmet>

        {/* ── Hero ── */}
        <section className="pt-28 pb-14 relative overflow-hidden" style={{ background: 'var(--hero-bg)' }}>
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 60% 50%, rgba(198,167,94,0.07) 0%, transparent 70%)' }} />
            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                {/* Breadcrumb */}
                <nav className="mb-6 text-xs" aria-label="Breadcrumb">
                    <ol className="flex items-center gap-2" style={{ color: 'var(--hero-muted)' }}>
                        <li><Link to="/" className="hover:underline" style={{ color: 'var(--hero-text-2)' }}>Home</Link></li>
                        <li aria-hidden="true">/</li>
                        <li aria-current="page" style={{ color: 'var(--gold)' }}>Contact</li>
                    </ol>
                </nav>
                <span className="label-accent block mb-3" style={{ color: 'var(--gold)' }}>Get Expert Legal Help</span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight mb-4"
                    style={{ color: 'var(--hero-text)', fontFamily: "'Playfair Display', serif" }}>
                    Contact Advocate Md. Shah Alam
                </h1>
                <p className="text-lg leading-relaxed max-w-2xl mb-6" style={{ color: 'var(--hero-text-2)' }}>
                    Trusted criminal, divorce, bail, and property lawyer in Uttara, Dhaka. Contact us for a confidential consultation — available 6 days a week.
                </p>
                <div className="flex flex-wrap gap-4">
                    <a href={`tel:${CALL_NUMBER}`} className="btn-primary flex items-center gap-2 text-sm">
                        <Phone size={16} /> Call Now
                    </a>
                    <a href={waLink('I need legal advice')} target="_blank" rel="noopener noreferrer"
                        className="btn-whatsapp flex items-center gap-2 text-sm">
                        <MessageCircle size={16} /> WhatsApp Consultation
                    </a>
                </div>
            </div>
        </section>

        {/* ── Quick Contact Bar ── */}
        <section className="py-8" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--divider)' }}>
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="grid sm:grid-cols-3 gap-4">
                    {[
                        { icon: Phone, label: 'Phone', value: CALL_DISPLAY, href: `tel:${CALL_NUMBER}`, color: 'var(--accent)' },
                        { icon: MessageCircle, label: 'WhatsApp', value: '+880 1955-802007', href: waLink(), color: '#25D366' },
                        { icon: Mail, label: 'Email', value: siteInfo.email, href: `mailto:${siteInfo.email}`, color: 'var(--gold)' },
                    ].map(({ icon: Icon, label, value, href, color }) => (
                        <a key={label} href={href}
                            target={href.startsWith('http') ? '_blank' : undefined}
                            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="glass-card flex items-center gap-4 p-4 group rounded-xl"
                            style={{ textDecoration: 'none' }}>
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                                style={{ background: `${color}18`, color }}>
                                <Icon size={18} />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{label}</p>
                                <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{value}</p>
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
                            <h2 className="text-2xl font-serif font-bold mb-6"
                                style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
                                Chamber Locations
                            </h2>
                            <div className="space-y-4">
                                {chambers.map((ch, i) => (
                                    <div key={i} className="glass-card p-5 rounded-xl">
                                        <div className="flex items-start gap-3">
                                            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                                                style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
                                                <MapPin size={16} />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-sm mb-0.5" style={{ color: 'var(--accent)' }}>{ch.name}</p>
                                                <p className="text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>{ch.address}</p>
                                                <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>{ch.note}</p>
                                                <a href={ch.mapLink} target="_blank" rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 text-xs font-semibold"
                                                    style={{ color: 'var(--accent)' }}>
                                                    <ExternalLink size={12} /> View on Google Maps
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Office Hours */}
                        <div className="glass-card p-5 rounded-xl">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}>
                                    <Clock size={16} />
                                </div>
                                <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>Office Hours</p>
                            </div>
                            <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>Saturday – Thursday: 9:00 AM – 9:00 PM</p>
                            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Friday: Closed &nbsp;|&nbsp; WhatsApp available 7 days</p>
                        </div>

                        {/* Practice Areas */}
                        <div>
                            <h2 className="text-xl font-serif font-bold mb-4"
                                style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
                                Practice Areas
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {practiceAreas.map((area, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                                        <Scale size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                                        {area}
                                    </div>
                                ))}
                            </div>
                            <Link to="/services/criminal-lawyer"
                                className="inline-flex items-center gap-1.5 text-sm font-semibold mt-5"
                                style={{ color: 'var(--accent)' }}>
                                View All Services →
                            </Link>
                        </div>

                        {/* Google Maps Embed */}
                        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--card-border)', height: '260px' }}>
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
                        <ContactForm />
                        <div className="mt-6 p-5 rounded-xl text-center"
                            style={{ background: 'var(--surface)', border: '1px solid var(--card-border)' }}>
                            <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text)' }}>
                                Prefer to call directly?
                            </p>
                            <a href={`tel:${CALL_NUMBER}`}
                                className="inline-flex items-center gap-2 text-lg font-bold"
                                style={{ color: 'var(--accent)' }}>
                                <Phone size={20} /> {CALL_DISPLAY}
                            </a>
                            <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
                                Calls answered Sat–Thu, 9 AM – 9 PM
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* ── Disclaimer ── */}
        <section className="py-8" style={{ background: 'var(--surface)', borderTop: '1px solid var(--divider)' }}>
            <div className="container mx-auto px-6 max-w-5xl">
                <p className="text-xs text-center leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    <strong>Disclaimer:</strong> Contacting us does not create an attorney-client relationship. Information submitted is kept confidential. For urgent legal matters, please call directly.
                    Advocate Md. Shah Alam is enrolled with the Bangladesh Bar Council and authorised to practise at all courts in Bangladesh including the Supreme Court.
                </p>
            </div>
        </section>
    </>
);

export default ContactPage;
