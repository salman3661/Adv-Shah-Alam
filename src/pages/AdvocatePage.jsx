import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    Phone, MessageCircle, MapPin, Award, BookOpen,
    ChevronDown, ChevronUp, ExternalLink, ArrowRight, Scale
} from 'lucide-react';
import { telLink, waLink } from '../data/contactInfo';
import blogPosts from '../data/blogPosts';

/* ─── FAQ Accordion ──────────────────────────────────── */
const FAQItem = ({ question, answer }) => {
    const [open, setOpen] = useState(false);
    return (
        <div
            className="border rounded-xl overflow-hidden transition-all"
            style={{ borderColor: 'var(--card-border)' }}
        >
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-base"
                style={{ color: 'var(--text)', background: 'var(--card-bg)' }}
                aria-expanded={open}
            >
                <span>{question}</span>
                {open
                    ? <ChevronUp size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                    : <ChevronDown size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                }
            </button>
            {open && (
                <div
                    className="px-5 py-4 text-sm leading-relaxed"
                    style={{ color: 'var(--text-secondary)', background: 'var(--surface)' }}
                >
                    {answer}
                </div>
            )}
        </div>
    );
};

/* ─── Service Links ───────────────────────────────────── */
const serviceLinks = [
    {
        name: 'Criminal Lawyer – Uttara',
        path: '/services/criminal-lawyer',
        desc: 'FIR cases, bail, trial defence, appeals.',
    },
    {
        name: 'Divorce & Family Lawyer',
        path: '/services/divorce-lawyer',
        desc: 'Talaq, khula, child custody, maintenance.',
    },
    {
        name: 'Land & Property Lawyer',
        path: '/services/land-lawyer',
        desc: 'Title disputes, partition suits, injunctions.',
    },
    {
        name: 'Bail Lawyer – Dhaka',
        path: '/services/bail-lawyer',
        desc: 'Regular, anticipatory & interim bail applications.',
    },
    {
        name: 'Supreme Court Lawyer',
        path: '/services/supreme-court-lawyer',
        desc: 'High Court & Appellate Division practice.',
    },
    {
        name: 'Company & Corporate Law',
        path: '/services/company-corporate-lawyer',
        desc: 'Business formation, company disputes, partnerships & commercial matters.',
    },
];

/* ─── Schema Markup ──────────────────────────────────── */
const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Advocate Md. Shah Alam',
    alternateName: 'Adv. Md. Shah Alam',
    description:
        'Experienced advocate practising at the Supreme Court of Bangladesh, Metro Sessions Court Dhaka, and all subordinate courts. 10+ years specialising in criminal, family, property, and company & corporate law.',
    url: 'https://www.advmdshahalam.me/advocate-md-shah-alam',
    image: 'https://www.advmdshahalam.me/images/hero/hero-md-shah-alam.webp',
    worksFor: {
        '@type': 'LegalService',
        name: 'Supreme Court of Bangladesh',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Dhaka',
            addressCountry: 'BD',
        },
    },
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'House 46, Road 6/B, Sector 12, Uttara, Dhaka-1230',
        addressLocality: 'Dhaka',
        postalCode: '1230',
        addressCountry: 'BD',
    },
    telephone: '+8801712655546',
    email: 'shahalam0332@gmail.com',
    sameAs: [
        'https://www.facebook.com/advmd.shahalamfb',
        'https://maps.app.goo.gl/M3NXMwW3xkp2TE3h8',
        'https://www.advmdshahalam.me',
    ],
    knowsAbout: [
        'Criminal Law Bangladesh',
        'Bail Law Bangladesh',
        'Family Law Bangladesh',
        'Property Law Bangladesh',
        'Company & Corporate Law Bangladesh',
        'Supreme Court Practice Bangladesh',
    ],
    alumniOf: [
        {
            '@type': 'CollegeOrUniversity',
            name: 'Dhaka International University',
            sameAs: 'https://www.diu.ac',
        },
        {
            '@type': 'CollegeOrUniversity',
            name: 'Metro Police Ideal Law College, Dhaka',
        },
    ],
    memberOf: {
        '@type': 'Organization',
        name: 'Bangladesh Bar Council',
    },
};

const legalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Advocate Md. Shah Alam – Law Chambers',
    url: 'https://www.advmdshahalam.me',
    telephone: '+8801712655546',
    email: 'shahalam0332@gmail.com',
    image: 'https://www.advmdshahalam.me/images/hero/hero-md-shah-alam.webp',
    description:
        'Full-service legal practice in Uttara and Dhaka, Bangladesh. Criminal, family, property, and company & corporate law.',
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'House 46, Road 6/B, Sector 12, Uttara, Dhaka-1230',
        addressLocality: 'Dhaka',
        postalCode: '1230',
        addressCountry: 'BD',
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: 23.8747,
        longitude: 90.4023,
    },
    areaServed: [
        { '@type': 'City', name: 'Uttara' },
        { '@type': 'City', name: 'Dhaka' },
        { '@type': 'Country', name: 'Bangladesh' },
    ],
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Legal Services',
        itemListElement: serviceLinks.map((s, i) => ({
            '@type': 'Offer',
            position: i + 1,
            name: s.name,
            description: s.desc,
        })),
    },
};

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.advmdshahalam.me/',
        },
        {
            '@type': 'ListItem',
            position: 2,
            name: 'Advocate Md. Shah Alam',
            item: 'https://www.advmdshahalam.me/advocate-md-shah-alam',
        },
    ],
};

const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Advocate Md. Shah Alam Law Chambers',
    url: 'https://www.advmdshahalam.me',
    logo: 'https://www.advmdshahalam.me/images/hero/hero-md-shah-alam.webp',
    foundingDate: '2003',
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'House 46, Road 6/B, Sector 12, Uttara, Dhaka-1230',
        addressLocality: 'Dhaka',
        addressCountry: 'BD',
    },
    contactPoint: [
        {
            '@type': 'ContactPoint',
            telephone: '+8801712655546',
            contactType: 'customer service',
            availableLanguage: ['Bengali', 'English'],
        },
        {
            '@type': 'ContactPoint',
            telephone: '+8801955802007',
            contactType: 'customer service',
            contactOption: 'WhatsApp',
        },
    ],
    sameAs: [
        'https://www.facebook.com/advmd.shahalamfb',
        'https://maps.app.goo.gl/M3NXMwW3xkp2TE3h8',
    ],
};

const faqPageFaqs = [
    {
        question: 'Who is Advocate Md. Shah Alam?',
        answer:
            'Advocate Md. Shah Alam is an experienced lawyer based in Uttara, Dhaka, Bangladesh, practising at the Supreme Court of Bangladesh and the Metro Sessions Court, Dhaka. He has 10+ years of experience in criminal, family, property, and company & corporate law.',
    },
    {
        question: 'What areas of law does Advocate Shah Alam specialise in?',
        answer:
            'His primary practice areas are criminal law (including bail, FIR cases, and trials), family law (divorce, custody, maintenance), land & property law (title suits, partition, injunctions), bail applications, Supreme Court practice, and company & corporate matters.',
    },
    {
        question: 'Where does Advocate Shah Alam practise?',
        answer:
            'He practises primarily in Uttara and across Dhaka at all court levels — Magistrate Courts, Sessions Courts, the Dhaka High Court Division, and the Appellate Division of the Supreme Court of Bangladesh.',
    },
    {
        question: 'How can I contact Advocate Shah Alam for a consultation?',
        answer:
            'You can call +880 1712-655546 for a direct call, or send a WhatsApp message to +880 1955-802007. You can also send an email to shahalam0332@gmail.com.',
    },
    {
        question: 'Can Advocate Shah Alam handle Supreme Court cases?',
        answer:
            'Yes. Advocate Shah Alam is enrolled to practise at the Supreme Court of Bangladesh, including both the High Court Division and the Appellate Division. He handles criminal appeals, writ petitions, company law references, and other appellate matters.',
    },
    {
        question: 'Does Advocate Shah Alam handle cases outside Uttara?',
        answer:
            'Yes. While his primary offices are in Uttara and the Dhaka Courts complex, he represents clients across Dhaka and takes on Supreme Court matters from across Bangladesh.',
    },
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqPageFaqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
        },
    })),
};

/* ─── Main Component ─────────────────────────────────── */
const AdvocatePage = () => {
    // Latest 3 published articles for the knowledge hub section
    const today = new Date();
    const latestArticles = blogPosts
        .filter(p => new Date(p.publishedDate + 'T00:00:00') <= today)
        .slice(0, 3);

    return (
        <>
            {/* ── SEO / Head ── */}
            <Helmet>
                <title>Advocate Md. Shah Alam – Supreme Court Lawyer | Uttara, Dhaka</title>
                <meta
                    name="description"
                    content="Advocate Md. Shah Alam – experienced criminal, family, property & Supreme Court lawyer in Uttara, Dhaka, Bangladesh. 20+ years of legal excellence. Contact for consultation."
                />
                <link rel="canonical" href="https://www.advmdshahalam.me/advocate-md-shah-alam" />
                <meta property="og:title" content="Advocate Md. Shah Alam – Lawyer in Uttara, Dhaka" />
                <meta
                    property="og:description"
                    content="Experienced criminal, family, property & Supreme Court lawyer in Uttara, Dhaka. 20+ years of legal excellence. Book a consultation today."
                />
                <meta property="og:url" content="https://www.advmdshahalam.me/advocate-md-shah-alam" />
                <meta property="og:type" content="profile" />
                <meta property="og:image" content="https://www.advmdshahalam.me/images/hero/hero-md-shah-alam.webp" />
                <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(legalServiceSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
            </Helmet>

            {/* ── Hero / Header ── */}
            <section className="pt-28 pb-16 relative overflow-hidden" style={{ background: 'var(--hero-bg)' }}>
                <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(198,167,94,0.06) 0%, transparent 70%)' }} />
                <div className="container mx-auto px-6 max-w-5xl relative z-10">
                    {/* Breadcrumb */}
                    <nav className="mb-6 text-xs" aria-label="Breadcrumb">
                        <ol className="flex items-center gap-2" style={{ color: 'var(--hero-muted)' }}>
                            <li><Link to="/" className="hover:underline" style={{ color: 'var(--hero-text-2)' }}>Home</Link></li>
                            <li aria-hidden="true">/</li>
                            <li aria-current="page" style={{ color: 'var(--gold)' }}>Advocate Md. Shah Alam</li>
                        </ol>
                    </nav>

                    <span className="label-accent block mb-4" style={{ color: 'var(--gold)' }}>
                        Official Profile · Uttara, Dhaka
                    </span>
                    <h1
                        className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight mb-4"
                        style={{ color: 'var(--hero-text)', fontFamily: "'Playfair Display', serif" }}
                    >
                        Advocate Md. Shah Alam
                    </h1>
                    <p className="text-lg md:text-xl font-medium mb-6" style={{ color: 'var(--accent)' }}>
                        Lawyer in Uttara, Dhaka · Supreme Court of Bangladesh
                    </p>
                    <p className="text-base leading-relaxed max-w-2xl mb-8" style={{ color: 'var(--hero-text-2)' }}>
                        With over 10 years of experience, Advocate Md. Shah Alam is a trusted legal authority
                        in Uttara and across Dhaka, providing expert counsel in criminal, family, property, and
                        company & corporate law at all court levels in Bangladesh.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a href={waLink('I need legal advice')} target="_blank" rel="noopener noreferrer"
                            className="btn-whatsapp text-sm">
                            <MessageCircle size={17} /> WhatsApp Consultation
                        </a>
                        <a href={telLink()} className="btn-secondary text-sm"
                            style={{ borderColor: 'var(--hero-border)', color: 'var(--hero-text-2)' }}>
                            <Phone size={17} /> Call Now
                        </a>
                    </div>
                </div>
            </section>

            {/* ── Quick Facts ── */}
            <section className="py-12" style={{ background: 'var(--surface)' }}>
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="glass-card p-8 rounded-2xl">
                        <h2
                            className="text-xl font-bold mb-6 flex items-center gap-2"
                            style={{ color: 'var(--accent)', fontFamily: "'Playfair Display', serif" }}
                        >
                            <Scale size={20} /> Quick Facts
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {[
                                { label: 'Full Name', value: 'Advocate Md. Shah Alam' },
                                { label: 'Profession', value: 'Advocate (Lawyer)' },
                                { label: 'Enrolment', value: 'Bangladesh Bar Council' },
                                {
                                    label: 'Primary Courts',
                                    value: 'Supreme Court of Bangladesh · Metro Sessions Court, Dhaka · Judge Court, Dhaka'
                                },

                                { label: 'Main Practice Areas', value: 'Criminal · Family · Property · Company Law' },
                                { label: 'Service Locations', value: 'Uttara · Dhaka · Bangladesh (all courts)' },
                                { label: 'Experience', value: '10+ years of legal practice' },
                                { label: 'Phone (Call)', value: '+880 1712-655546' },
                                { label: 'WhatsApp', value: '+880 1955-802007' },
                            ].map((fact, i) => (
                                <div key={i} className="flex flex-col gap-1">
                                    <span className="text-xs font-bold uppercase tracking-wider"
                                        style={{ color: 'var(--text-muted)' }}>
                                        {fact.label}
                                    </span>
                                    <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                                        {fact.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Biography ── */}
            <section className="py-16" style={{ background: 'var(--bg)' }}>
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid lg:grid-cols-[1fr_300px] gap-12">
                        <div>
                            <h2
                                className="text-2xl md:text-3xl font-serif font-bold mb-6"
                                style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}
                            >
                                Professional Background
                            </h2>
                            <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                <p>
                                    Advocate Md. Shah Alam is a practicing advocate registered with the Bangladesh Bar Council
                                    and enrolled to appear before the Supreme Court of Bangladesh. He has been actively
                                    practising law for over two decades, with his primary chambers located in Uttara, Dhaka —
                                    one of the most densely populated and legally active areas of the capital.
                                </p>
                                <p>
                                    He completed his legal education at Metro Police Ideal Law College, Dhaka (LL.B),
                                    and later earned his Master of Laws (LL.M) from Dhaka International University.
                                    His academic background in both law and business has equipped him with a multidisciplinary
                                    perspective that strengthens his client representation across civil, criminal, and commercial matters.
                                </p>
                                <p>
                                    Throughout his career, Advocate Shah Alam has appeared before Magistrate Courts,
                                    Sessions Courts, the Metro Sessions Court Dhaka, the High Court Division, and the
                                    Appellate Division of the Supreme Court of Bangladesh. He is known for strategic
                                    legal thinking, calm advocacy, and a client-centred approach.
                                </p>
                                <p>
                                    His practice has a strong local presence serving clients in Uttara and across Dhaka,
                                    with a particular reputation in criminal defence (especially bail and FIR matters),
                                    family law disputes (divorce, custody, maintenance), land and property litigation,
                                    and company & corporate matters.
                                </p>
                            </div>
                        </div>

                        {/* Awards / Notable */}
                        <div className="space-y-4">
                            <div className="glass-card p-6 rounded-2xl" style={{ borderTop: '3px solid var(--accent)' }}>
                                <Award size={22} className="mb-3" style={{ color: 'var(--accent)' }} />
                                <h3 className="font-bold text-base mb-2" style={{ color: 'var(--text)' }}>
                                    10+ Years of Excellence
                                </h3>
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                    Consistent track record in criminal defence, family disputes, and appellate practice
                                    across Dhaka and Uttara courts.
                                </p>
                            </div>
                            <div className="glass-card p-6 rounded-2xl">
                                <MapPin size={22} className="mb-3" style={{ color: 'var(--gold)' }} />
                                <h3 className="font-bold text-base mb-2" style={{ color: 'var(--text)' }}>
                                    Serving Uttara & Dhaka
                                </h3>
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                    Primary chambers in Uttara West and court representation at all Dhaka court levels,
                                    including the Supreme Court of Bangladesh.
                                </p>
                            </div>
                            <div className="glass-card p-6 rounded-2xl">
                                <BookOpen size={22} className="mb-3" style={{ color: 'var(--accent)' }} />
                                <h3 className="font-bold text-base mb-2" style={{ color: 'var(--text)' }}>
                                    Bilingual Legal Guidance
                                </h3>
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                    Legal consultation and court representation available in both English and Bangla.
                                </p>
                            </div>

                            {/* Google Business link */}
                            <a
                                href="https://maps.app.goo.gl/M3NXMwW3xkp2TE3h8"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm px-4 py-3 rounded-xl transition-all hover:opacity-80"
                                style={{
                                    background: 'var(--card-bg)',
                                    border: '1px solid var(--card-border)',
                                    color: 'var(--text-secondary)',
                                }}
                            >
                                <MapPin size={15} style={{ color: 'var(--gold)' }} />
                                View on Google Maps
                                <ExternalLink size={13} className="ml-auto" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Practice Areas ── */}
            <section className="py-16" style={{ background: 'var(--surface)' }}>
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2
                        className="text-2xl md:text-3xl font-serif font-bold mb-3"
                        style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}
                    >
                        Practice Areas
                    </h2>
                    <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
                        Serving clients in Uttara and across Dhaka. Click a service to learn more.
                    </p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {serviceLinks.map((service, i) => (
                            <Link
                                key={i}
                                to={service.path}
                                className="glass-card p-6 rounded-xl group no-underline flex flex-col gap-2 transition-all hover:shadow-lg"
                            >
                                <h3
                                    className="font-bold text-base group-hover:underline decoration-dotted"
                                    style={{ color: 'var(--text)' }}
                                >
                                    {service.name}
                                </h3>
                                <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
                                    {service.desc}
                                </p>
                                <span
                                    className="inline-flex items-center gap-1 text-xs font-semibold mt-1"
                                    style={{ color: 'var(--accent)' }}
                                >
                                    Learn More <ArrowRight size={12} />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Latest Articles ── */}
            {latestArticles.length > 0 && (
                <section className="py-16" style={{ background: 'var(--bg)' }}>
                    <div className="container mx-auto px-6 max-w-5xl">
                        <h2
                            className="text-2xl md:text-3xl font-serif font-bold mb-3"
                            style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}
                        >
                            Latest Legal Articles
                        </h2>
                        <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
                            Plain-language legal guides on Bangladesh law by Advocate Md. Shah Alam.
                        </p>
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            {latestArticles.map(post => (
                                <Link
                                    key={post.slug}
                                    to={`/blog/${post.slug}`}
                                    className="glass-card p-5 rounded-xl no-underline flex flex-col gap-3 group"
                                >
                                    <span
                                        className="text-xs font-bold px-2 py-0.5 rounded-full self-start"
                                        style={{ background: 'rgba(198,167,94,0.15)', color: 'var(--gold)' }}
                                    >
                                        {post.category}
                                    </span>
                                    <h3
                                        className="text-sm font-bold leading-snug group-hover:underline decoration-dotted"
                                        style={{ color: 'var(--text)' }}
                                    >
                                        {post.title}
                                    </h3>
                                    <span
                                        className="text-xs mt-auto"
                                        style={{ color: 'var(--text-muted)' }}
                                    >
                                        {post.publishedDate}
                                    </span>
                                </Link>
                            ))}
                        </div>
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 text-sm font-semibold"
                            style={{ color: 'var(--accent)' }}
                        >
                            View All Legal Articles <ArrowRight size={15} />
                        </Link>
                    </div>
                </section>
            )}

            {/* ── FAQ ── */}
            <section className="py-16" style={{ background: 'var(--surface)' }}>
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2
                        className="text-2xl md:text-3xl font-serif font-bold mb-8"
                        style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}
                    >
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-3 max-w-3xl">
                        {faqPageFaqs.map((faq, i) => (
                            <FAQItem key={i} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-16" style={{ background: 'var(--bg)' }}>
                <div className="container mx-auto px-6 max-w-5xl">
                    <div
                        className="rounded-2xl p-10 text-center"
                        style={{
                            background: 'linear-gradient(135deg, var(--hero-bg) 0%, var(--hero-surface) 100%)',
                            border: '1px solid var(--hero-border)',
                        }}
                    >
                        <span className="label-accent block mb-3" style={{ color: 'var(--gold)' }}>
                            Free Initial Consultation
                        </span>
                        <h2
                            className="text-2xl md:text-3xl font-serif font-bold mb-3"
                            style={{ color: 'var(--hero-text)', fontFamily: "'Playfair Display', serif" }}
                        >
                            Speak with Advocate Shah Alam Today
                        </h2>
                        <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: 'var(--hero-text-2)' }}>
                            Serving clients in Uttara and across Dhaka. Contact us by phone, WhatsApp, or visit
                            our chambers for a confidential legal consultation.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                            <a
                                href={waLink('I would like a consultation with Advocate Shah Alam')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-whatsapp text-sm"
                            >
                                <MessageCircle size={17} /> WhatsApp Consultation
                            </a>
                            <a href={telLink()} className="btn-primary text-sm">
                                <Phone size={17} /> Call +880 1712-655546
                            </a>
                        </div>

                        {/* NAP block */}
                        <div
                            className="inline-flex items-start gap-2 text-xs px-4 py-3 rounded-xl"
                            style={{
                                background: 'rgba(0,0,0,0.2)',
                                color: 'var(--hero-muted)',
                                border: '1px solid var(--hero-border)',
                            }}
                        >
                            <MapPin size={13} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--gold)' }} />
                            <span>
                                House 46, Road 6/B, Sector 12, Uttara, Dhaka-1230
                                <br />
                                Also: Ainjeebi Samity Bhaban, 4th Floor, 6/7 Court House Street, Kotwali, Dhaka-1100
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AdvocatePage;
