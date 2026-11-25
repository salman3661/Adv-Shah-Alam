import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { telLink, waLink } from '../data/contactInfo';
import { MessageCircle, Phone, CheckCircle, ArrowLeft, ArrowRight, ChevronDown, BookOpen, FileCheck, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import { sanitizeHtml } from '../utils/sanitizeHtml';
import AdSenseAd from './AdSenseAd';
import { ADVOCATE_NAP, getServiceAreaServed } from '../seo/entity';

const BASE = 'https://www.advmdshahalam.me';
const SERVICE_AD_SLOTS = {
    top: '8630877987',
    mid1: '9118178745',
    mid2: '6519719969',
    bottomGrid: '3667074343',
};

const ServicePage = ({ data, ...legacyProps }) => {
    const src = data || legacyProps;
    const {
        slug,
        metaTitle,
        metaDesc,
        canonicalUrl,
        h1,
        badge,
        directAnswer,
        atAGlance,
        intro,
        sections = [],
        feeTable,
        procedure,
        documentsChecklist,
        caseNote,
        coverage = [],
        faqItems = [],
        ctaText,
        contextNote,
        relatedBlogLinks = [],
        relatedServices = [],
    } = src;

    // Keep all FAQs expanded initially so visible DOM always matches FAQPage JSON-LD 100%
    const [openFaqs, setOpenFaqs] = useState(() => new Set(faqItems.map((_, idx) => idx)));

    const toggleFaq = (idx) => {
        setOpenFaqs((prev) => {
            const next = new Set(prev);
            if (next.has(idx)) next.delete(idx);
            else next.add(idx);
            return next;
        });
    };

    const isBn = Boolean(src.lang === 'bn' || canonicalUrl?.includes('/bn/'));
    const computedSlug = slug || (canonicalUrl ? canonicalUrl.split('/').filter(Boolean).pop() : 'criminal-lawyer');
    const wwwCanonical = canonicalUrl
        ? canonicalUrl.replace('https://advmdshahalam.me', BASE)
        : `${BASE}${isBn ? '/bn' : ''}/services/${computedSlug}`;
    const enUrl = `${BASE}/services/${computedSlug}`;
    const bnUrl = `${BASE}/bn/services/${computedSlug}`;

    const homeLabel = isBn ? 'হোম' : 'Home';
    const homeHref = isBn ? '/' : '/en';
    const servicesLabel = isBn ? 'আইনি সেবাসমূহ' : 'Legal Services';
    const servicesHref = isBn ? '/#services' : '/en#services';
    const bnFontStyle = isBn ? { fontFamily: "var(--font-bn), 'Noto Serif Bengali', sans-serif" } : {};

    const graphSchema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Service',
                '@id': `${wwwCanonical}#service`,
                name: h1,
                description: metaDesc,
                url: wwwCanonical,
                inLanguage: isBn ? 'bn-BD' : 'en',
                provider: {
                    '@type': 'LegalService',
                    name: 'Advocate Md. Shah Alam Law Chamber',
                    url: BASE,
                    telephone: '+8801712655546',
                    priceRange: '৳৳',
                    image: `${BASE}/images/hero/hero-md-shah-alam.png`,
                    address: {
                        '@type': 'PostalAddress',
                        streetAddress: 'House 46, Road 6/B, Sector 12, Uttara West',
                        addressLocality: 'Dhaka',
                        addressRegion: 'Dhaka',
                        postalCode: '1230',
                        addressCountry: 'BD',
                    },
                    geo: {
                        '@type': 'GeoCoordinates',
                        latitude: 23.8745,
                        longitude: 90.3987,
                    },
                    openingHoursSpecification: ADVOCATE_NAP.openingHoursSpecification,
                },
                openingHoursSpecification: ADVOCATE_NAP.openingHoursSpecification,
                areaServed: getServiceAreaServed(slug || wwwCanonical || h1),
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: homeLabel, item: `${BASE}${homeHref}` },
                    { '@type': 'ListItem', position: 2, name: servicesLabel, item: `${BASE}${servicesHref}` },
                    { '@type': 'ListItem', position: 3, name: h1, item: wwwCanonical },
                ],
            },
            ...(faqItems?.length > 0
                ? [
                      {
                          '@type': 'FAQPage',
                          mainEntity: faqItems.map((faq) => ({
                              '@type': 'Question',
                              name: faq.q,
                              acceptedAnswer: { '@type': 'Answer', text: faq.a },
                          })),
                      },
                  ]
                : []),
        ],
    };

    return (
        <>
            <Helmet>
                <html lang={isBn ? 'bn' : 'en'} />
                <title>{metaTitle}</title>
                <meta name="description" content={metaDesc} />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={wwwCanonical} />
                <link rel="alternate" hrefLang="en" href={enUrl} />
                <link rel="alternate" hrefLang="bn" href={bnUrl} />
                <link rel="alternate" hrefLang="x-default" href={enUrl} />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content={isBn ? 'bn_BD' : 'en_US'} />
                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDesc} />
                <meta property="og:url" content={wwwCanonical} />
                <meta property="og:image" content={`${BASE}/images/hero/hero-md-shah-alam.png`} />
                <meta property="og:site_name" content="Advocate Md. Shah Alam" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={metaTitle} />
                <meta name="twitter:description" content={metaDesc} />
                <meta name="twitter:image" content={`${BASE}/images/hero/hero-md-shah-alam.png`} />
            </Helmet>

            {/* ── Hero Header ── */}
            <section className="pt-28 pb-14 relative overflow-hidden" style={{ background: '#0A1424' }}>
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(22,58,112,0.2) 0%, transparent 70%)' }}
                />

                <div className="container mx-auto px-6 max-w-5xl relative z-10">
                    <nav aria-label="Breadcrumb" className="mb-4 text-xs" style={{ color: '#CBD5E1', ...bnFontStyle }}>
                        <ol className="flex flex-wrap items-center gap-2">
                            <li>
                                <Link to={homeHref} className="hover:underline" style={{ color: '#CBD5E1' }}>
                                    {homeLabel}
                                </Link>
                            </li>
                            <li aria-hidden="true">/</li>
                            <li>
                                <Link to={servicesHref} className="hover:underline" style={{ color: '#CBD5E1' }}>
                                    {servicesLabel}
                                </Link>
                            </li>
                            <li aria-hidden="true">/</li>
                            <li aria-current="page" style={{ color: '#E2C15A', fontWeight: 600 }}>
                                {h1}
                            </li>
                        </ol>
                    </nav>

                    <div className="mb-5">
                        <Link
                            to={homeHref}
                            className="inline-flex items-center gap-2 text-xs font-medium hover:underline opacity-85 hover:opacity-100"
                            style={{ color: '#93C5FD', ...bnFontStyle }}
                        >
                            <ArrowLeft size={14} /> {isBn ? 'হোমপেজে ফিরে যান' : 'Back to Home'}
                        </Link>
                    </div>

                    <span className="label-accent block mb-3" style={{ color: '#93C5FD', ...bnFontStyle }}>
                        {badge || (isBn ? 'আইনি সেবা · অ্যাডভোকেট মো. শাহ আলম' : 'Legal Services · Advocate Md. Shah Alam')}
                    </span>

                    <h1
                        className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight mb-5"
                        style={{ color: '#EEF2F8', fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'Georgia, serif' }}
                    >
                        {h1}
                    </h1>

                    {/* Direct-Answer Featured-Snippet Block immediately after H1 */}
                    {directAnswer && (
                        <p
                            className="direct-answer text-base md:text-lg leading-relaxed max-w-3xl mb-6 p-4 rounded-xl"
                            style={{
                                background: 'rgba(255, 255, 255, 0.06)',
                                borderLeft: '3.5px solid #C9A227',
                                color: '#F8FAFC',
                                ...bnFontStyle,
                            }}
                        >
                            {directAnswer}
                        </p>
                    )}

                    {intro && (
                        <p
                            className="text-base md:text-lg leading-relaxed max-w-3xl mb-7"
                            style={{ color: '#C8D4E8', ...bnFontStyle }}
                            dangerouslySetInnerHTML={{ __html: sanitizeHtml(intro) }}
                        />
                    )}

                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href={waLink(`Hello, I need legal consultation regarding "${h1}".`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cta="service-hero-whatsapp"
                            data-placement="service-hero"
                            className="btn-whatsapp text-sm"
                        >
                            <MessageCircle size={17} /> {isBn ? 'হোয়াটসঅ্যাপ পরামর্শ' : 'WhatsApp Consultation'}
                        </a>
                        <a
                            href={telLink()}
                            data-cta="service-hero-call"
                            data-placement="service-hero"
                            className="btn-secondary text-sm"
                            style={{ borderColor: 'rgba(140,160,190,0.35)', color: '#E2E8F0' }}
                        >
                            <Phone size={17} /> {isBn ? 'সরাসরি কল করুন' : 'Call Now'}
                        </a>
                    </div>
                </div>
            </section>

            {/* Ad Unit 1: Directly below Hero CTA (never above H1 / direct-answer) */}
            <div className="container mx-auto px-6 max-w-5xl py-6">
                <AdSenseAd
                    key={`svc-top-${computedSlug}-${isBn ? 'bn' : 'en'}`}
                    slot={SERVICE_AD_SLOTS.top}
                    format="auto"
                    responsive={true}
                    labelText={isBn ? 'বিজ্ঞাপন' : 'Advertisement'}
                    minHeight={250}
                    densityGroup="service"
                />
            </div>

            <article style={{ background: 'var(--bg)' }}>
                {/* At a Glance Strip */}
                {atAGlance?.length > 0 && (
                    <section className="py-8 border-y" style={{ background: 'var(--surface)', borderColor: 'var(--card-border)' }}>
                        <div className="container mx-auto px-6 max-w-5xl">
                            <h2
                                className="text-lg font-bold mb-4 flex items-center gap-2"
                                style={{ color: 'var(--text)', ...bnFontStyle }}
                            >
                                <Scale size={18} style={{ color: 'var(--gold)' }} />
                                {isBn ? 'এক নজরে গুরুত্বপূর্ণ তথ্য' : 'Legal Service At a Glance'}
                            </h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {atAGlance.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="p-4 rounded-xl border"
                                        style={{ background: 'var(--bg)', borderColor: 'var(--card-border)' }}
                                    >
                                        <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--accent)', ...bnFontStyle }}>
                                            {item.label}
                                        </p>
                                        <p className="text-sm leading-snug" style={{ color: 'var(--text-secondary)', ...bnFontStyle }}>
                                            {item.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Main Statutory Guide Sections */}
                {sections.length > 0 && (
                    <section className="py-12">
                        <div className="container mx-auto px-6 max-w-5xl space-y-10">
                            {sections.map((sec, idx) => (
                                <React.Fragment key={idx}>
                                    <div>
                                        <h2
                                            className="text-xl md:text-2xl font-serif font-bold mb-4"
                                            style={{
                                                color: 'var(--text)',
                                                fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'Georgia, serif',
                                            }}
                                        >
                                            {sec.heading}
                                        </h2>
                                        <div
                                            className="prose-content space-y-4 text-base leading-relaxed"
                                            style={{ color: 'var(--text-secondary)', ...bnFontStyle }}
                                            dangerouslySetInnerHTML={{ __html: sanitizeHtml(sec.html) }}
                                        />
                                    </div>

                                    {/* Ad Unit 2: Mid-content after section 2 */}
                                    {idx === 1 && (
                                        <div className="py-4">
                                            <AdSenseAd
                                                key={`svc-mid1-${computedSlug}-${isBn ? 'bn' : 'en'}`}
                                                slot={SERVICE_AD_SLOTS.mid1}
                                                format="fluid"
                                                layout="in-article"
                                                responsive={true}
                                                labelText={isBn ? 'বিজ্ঞাপন' : 'Advertisement'}
                                                minHeight={250}
                                                densityGroup="service"
                                            />
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </section>
                )}

                {/* Indicative Fee & Timeframe Table */}
                {feeTable && (
                    <section className="py-10" style={{ background: 'var(--surface)' }}>
                        <div className="container mx-auto px-6 max-w-5xl">
                            <h2
                                className="text-xl md:text-2xl font-serif font-bold mb-3"
                                style={{
                                    color: 'var(--text)',
                                    fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'Georgia, serif',
                                }}
                            >
                                {feeTable.heading}
                            </h2>
                            {feeTable.note && (
                                <p className="text-xs italic mb-5" style={{ color: 'var(--text-muted)', ...bnFontStyle }}>
                                    {feeTable.note}
                                </p>
                            )}
                            <div className="overflow-x-auto rounded-xl border" style={{ borderColor: 'var(--card-border)', background: 'var(--bg)' }}>
                                <table className="w-full text-left border-collapse text-sm" style={bnFontStyle}>
                                    <thead>
                                        <tr style={{ background: '#132A4A', color: '#FFFFFF' }}>
                                            {feeTable.columns.map((col, idx) => (
                                                <th key={idx} className="px-4 py-3 font-bold">
                                                    {col}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {feeTable.rows.map((row, rIdx) => (
                                            <tr key={rIdx} className="border-t" style={{ borderColor: 'var(--card-border)' }}>
                                                {row.map((cell, cIdx) => (
                                                    <td
                                                        key={cIdx}
                                                        className={`px-4 py-3 ${cIdx === 0 ? 'font-semibold' : ''}`}
                                                        style={{ color: cIdx === 0 ? 'var(--text)' : 'var(--text-secondary)' }}
                                                    >
                                                        {cell}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                )}

                {/* Procedure (<ol>) & Documents Checklist (<ul>) */}
                {(procedure || documentsChecklist) && (
                    <section className="py-12">
                        <div className="container mx-auto px-6 max-w-5xl grid md:grid-cols-2 gap-8">
                            {procedure && (
                                <div className="glass-card p-6 rounded-2xl border" style={{ borderColor: 'var(--card-border)' }}>
                                    <h2
                                        className="text-xl font-serif font-bold mb-4 flex items-center gap-2"
                                        style={{ color: 'var(--text)', ...bnFontStyle }}
                                    >
                                        <BookOpen size={18} style={{ color: 'var(--accent)' }} />
                                        {procedure.heading}
                                    </h2>
                                    <ol className="list-decimal pl-5 space-y-3 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', ...bnFontStyle }}>
                                        {procedure.steps.map((st, idx) => (
                                            <li key={idx}>{st}</li>
                                        ))}
                                    </ol>
                                </div>
                            )}

                            {documentsChecklist && (
                                <div className="glass-card p-6 rounded-2xl border" style={{ borderColor: 'var(--card-border)' }}>
                                    <h2
                                        className="text-xl font-serif font-bold mb-4 flex items-center gap-2"
                                        style={{ color: 'var(--text)', ...bnFontStyle }}
                                    >
                                        <FileCheck size={18} style={{ color: 'var(--gold)' }} />
                                        {documentsChecklist.heading}
                                    </h2>
                                    <ul className="list-disc pl-5 space-y-3 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', ...bnFontStyle }}>
                                        {documentsChecklist.items.map((item, idx) => (
                                            <li key={idx}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* Case Note + Key Coverage Areas */}
                <section className="py-10" style={{ background: 'var(--surface)' }}>
                    <div className="container mx-auto px-6 max-w-5xl">
                        {caseNote && (
                            <div
                                className="p-6 rounded-2xl border mb-10"
                                style={{
                                    background: 'var(--bg)',
                                    borderColor: 'var(--card-border)',
                                    borderLeft: '3.5px solid var(--gold)',
                                }}
                            >
                                <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--gold)', ...bnFontStyle }}>
                                    {caseNote.title}
                                </h3>
                                <p className="text-sm leading-relaxed m-0" style={{ color: 'var(--text-secondary)', ...bnFontStyle }}>
                                    {caseNote.body}
                                </p>
                            </div>
                        )}

                        {coverage.length > 0 && (
                            <>
                                <h2
                                    className="text-xl md:text-2xl font-serif font-bold mb-6"
                                    style={{
                                        color: 'var(--text)',
                                        fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'Georgia, serif',
                                    }}
                                >
                                    {isBn ? 'মূল আইনি সেবা ক্ষেত্রসমূহ' : 'What We Cover'}
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {coverage.map((item, i) => (
                                        <div key={i} className="glass-card flex items-start gap-3 p-4">
                                            <CheckCircle size={17} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                                            <span className="text-sm" style={{ color: 'var(--text-secondary)', ...bnFontStyle }}>
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {contextNote && (
                            <p
                                className="mt-6 text-sm leading-relaxed"
                                style={{ color: 'var(--text-secondary)', ...bnFontStyle }}
                                dangerouslySetInnerHTML={{ __html: sanitizeHtml(contextNote) }}
                            />
                        )}
                    </div>
                </section>

                {/* FAQ Section — All answers visible by default for FAQPage parity */}
                {faqItems?.length > 0 && (
                    <section className="py-12" style={{ background: 'var(--bg)' }}>
                        <div className="container mx-auto px-6 max-w-5xl">
                            <h2
                                className="text-2xl md:text-3xl font-serif font-bold mb-8"
                                style={{
                                    color: 'var(--text)',
                                    fontFamily: isBn ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'Georgia, serif',
                                }}
                            >
                                {isBn ? 'সাধারণ জিজ্ঞাসা (FAQ)' : 'Frequently Asked Questions'}
                            </h2>
                            <div className="space-y-3">
                                {faqItems.map((faq, i) => {
                                    const isOpen = openFaqs.has(i);
                                    return (
                                        <div
                                            key={i}
                                            className="glass-card overflow-hidden"
                                            style={{ borderColor: isOpen ? 'var(--accent)' : undefined }}
                                        >
                                            <button
                                                type="button"
                                                onClick={() => toggleFaq(i)}
                                                className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
                                                aria-expanded={isOpen}
                                            >
                                                <span className="font-semibold text-sm md:text-base leading-snug pr-2" style={{ color: 'var(--text)', ...bnFontStyle }}>
                                                    {faq.q}
                                                </span>
                                                <span
                                                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform"
                                                    style={{
                                                        background: isOpen ? 'var(--accent)' : 'var(--accent-subtle)',
                                                        color: isOpen ? '#fff' : 'var(--accent)',
                                                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                                    }}
                                                >
                                                    <ChevronDown size={17} />
                                                </span>
                                            </button>
                                            {isOpen && (
                                                <div className="px-6 pb-5">
                                                    <div className="w-full h-px mb-3" style={{ background: 'var(--card-border)' }} />
                                                    <p className="text-sm leading-relaxed m-0" style={{ color: 'var(--text-secondary)', ...bnFontStyle }}>
                                                        {faq.a}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {/* Ad Unit 3: Post-FAQ In-Article Native slot */}
                <div className="container mx-auto px-6 max-w-5xl py-6">
                    <AdSenseAd
                        key={`svc-mid2-${computedSlug}-${isBn ? 'bn' : 'en'}`}
                        slot={SERVICE_AD_SLOTS.mid2}
                        format="fluid"
                        layout="in-article"
                        responsive={true}
                        labelText={isBn ? 'বিজ্ঞাপন' : 'Advertisement'}
                        minHeight={250}
                    />
                </div>

                {/* Further Reading */}
                {relatedBlogLinks?.length > 0 && (
                    <section className="py-10" style={{ background: 'var(--surface)' }}>
                        <div className="container mx-auto px-6 max-w-5xl">
                            <h2 className="text-xl font-bold mb-5" style={{ color: 'var(--text)', ...bnFontStyle }}>
                                {isBn ? 'সংশ্লিষ্ট আইনি গাইড ও প্রবন্ধ' : 'Further Reading'}
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {relatedBlogLinks.map((link, i) => (
                                    <Link
                                        key={i}
                                        to={link.to}
                                        className="glass-card p-5 flex items-start gap-3 group no-underline"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <div
                                            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{
                                                background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
                                                color: '#FFFFFF',
                                            }}
                                        >
                                            <ArrowRight size={15} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold group-hover:underline leading-snug" style={{ color: 'var(--text)', ...bnFontStyle }}>
                                                {link.title}
                                            </p>
                                            {link.desc && (
                                                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)', ...bnFontStyle }}>
                                                    {link.desc}
                                                </p>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Related Legal Services */}
                {relatedServices?.length > 0 && (
                    <section className="py-10" style={{ background: 'var(--bg)' }}>
                        <div className="container mx-auto px-6 max-w-5xl">
                            <h2 className="text-xl font-bold mb-5" style={{ color: 'var(--text)', ...bnFontStyle }}>
                                {isBn ? 'অন্যান্য আইনি সেবাসমূহ' : 'Other Legal Services in Bangladesh'}
                            </h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {relatedServices.map((svc, i) => (
                                    <Link
                                        key={i}
                                        to={svc.to}
                                        className="glass-card p-4 flex items-center gap-3 group no-underline"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <div
                                            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                                            style={{
                                                background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
                                                color: '#FFFFFF',
                                            }}
                                        >
                                            <ArrowRight size={13} />
                                        </div>
                                        <span className="text-sm font-medium group-hover:underline" style={{ color: 'var(--text)', ...bnFontStyle }}>
                                            {svc.label}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Ad Unit 4: Bottom Multiplex grid before CTA */}
                <div className="container mx-auto px-6 max-w-5xl py-6">
                    <AdSenseAd
                        key={`svc-grid-${computedSlug}-${isBn ? 'bn' : 'en'}`}
                        slot={SERVICE_AD_SLOTS.bottomGrid}
                        format="autorelaxed"
                        responsive={true}
                        labelText={isBn ? 'আরও দেখুন' : 'Sponsored Content'}
                        minHeight={280}
                    />
                </div>

                {/* Bottom Consultation CTA Block */}
                <section className="py-12" style={{ background: 'var(--bg)' }}>
                    <div className="container mx-auto px-6 max-w-5xl">
                        <div
                            className="p-8 md:p-10 rounded-2xl text-center"
                            style={{
                                background: 'linear-gradient(135deg, #0B1220 0%, #132A4A 100%)',
                                border: '1px solid rgba(201, 162, 39, 0.45)',
                                color: '#F8FAFC',
                            }}
                        >
                            <span className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ color: '#E2C15A', ...bnFontStyle }}>
                                {isBn ? 'সরাসরি চেম্বার ও অনলাইন পরামর্শ' : 'Book a Consultation'}
                            </span>
                            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3" style={{ color: '#FFFFFF', ...bnFontStyle }}>
                                {ctaText || (isBn ? 'অ্যাডভোকেট মো. শাহ আলমের পরামর্শ নিন' : 'Need Expert Legal Help?')}
                            </h2>
                            <p className="text-sm mb-3 max-w-2xl mx-auto" style={{ color: '#CBD5E1', ...bnFontStyle }}>
                                {isBn
                                    ? 'উত্তরা চেম্বার (বাড়ি ৪৬, সড়ক ৬/বি, সেক্টর ১২, উত্তরা পশ্চিম, ঢাকা-১২৩০) অথবা ঢাকা জজ কোর্ট চেম্বারে সাক্ষাৎ বা হোয়াটসঅ্যাপে পরামর্শ নিন।'
                                    : 'Consult at Uttara Chamber (House 46, Road 6/B, Sector 12, Uttara West, Dhaka-1230), Dhaka Judge Court, or online via WhatsApp.'}
                            </p>
                            <p className="text-sm mb-3 max-w-2xl mx-auto px-4 py-2.5 rounded-xl" style={{ background: 'rgba(201, 162, 39, 0.14)', border: '1px solid rgba(201, 162, 39, 0.4)', color: '#F8FAFC', ...bnFontStyle }}>
                                {isBn ? (
                                    <><strong>প্রথম পরামর্শ ফ্রি।</strong> WhatsApp বা ফোনে আপনার মামলার কথা বলুন — কোনো ফি ছাড়াই আমি প্রথম মতামত দেব। কাজ এগোলে তখন ফি নির্ধারিত হবে।</>
                                ) : (
                                    <><strong>First consultation is free.</strong> Share your case details on WhatsApp or phone — you will receive an initial legal opinion at no charge. Fees apply only when formal work proceeds.</>
                                )}
                            </p>
                            <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center mt-5">
                                <a
                                    href={waLink(isBn ? `আসসালামু আলাইকুম, আমি "${h1}" বিষয়ে পরামর্শ নিতে চাই।` : `Hello, I need legal consultation regarding "${h1}".`)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-cta="post-bottom-whatsapp"
                                    data-placement="service-bottom"
                                    className="btn-whatsapp text-sm"
                                >
                                    <MessageCircle size={17} /> {isBn ? 'হোয়াটসঅ্যাপ: ০১৯৫৫-৮০২০০৭' : 'WhatsApp: +880 1955-802007'}
                                </a>
                                <a
                                    href={telLink()}
                                    data-cta="post-bottom-call"
                                    data-placement="service-bottom"
                                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm"
                                    style={{ background: '#C9A227', color: '#0B1220', textDecoration: 'none' }}
                                >
                                    <Phone size={17} /> {isBn ? 'কল করুন: ০১৭১২-৬৫৫৫৪৬' : 'Call Now: +880 1712-655546'}
                                </a>
                                <Link
                                    to="/contact?service=case-review"
                                    data-cta="consult"
                                    data-placement="service-bottom"
                                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm border"
                                    style={{ borderColor: 'rgba(226, 193, 90, 0.55)', color: '#F8FAFC', textDecoration: 'none' }}
                                >
                                    {isBn ? 'কেস রিভিউ বুক করুন' : 'Book Paid Case Review ($30–$75)'}
                                </Link>
                                <Link
                                    to={isBn ? '/bn/uttara-lawyer' : '/uttara-lawyer'}
                                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm border"
                                    style={{ borderColor: 'rgba(148, 163, 184, 0.35)', color: '#E2E8F0', textDecoration: 'none' }}
                                >
                                    {isBn ? 'উত্তরা আইনজীবী (সেক্টর ১২)' : 'Uttara Chamber Guide'}
                                </Link>
                            </div>
                            <p className="mt-4 text-xs" style={{ color: '#94A3B8' }}>
                                {isBn ? 'উত্তর ঢাকার অন্যান্য এলাকা: ' : 'Other North Dhaka areas served: '}
                                <Link to={isBn ? '/bn/gulshan-lawyer' : '/gulshan-lawyer'} style={{ color: '#E2C15A', textDecoration: 'underline' }}>
                                    {isBn ? 'গুলশান আইনজীবী' : 'Gulshan Lawyer'}
                                </Link>
                                {' · '}
                                <Link to={isBn ? '/bn/banani-lawyer' : '/banani-lawyer'} style={{ color: '#E2C15A', textDecoration: 'underline' }}>
                                    {isBn ? 'বনানী আইনজীবী' : 'Banani Lawyer'}
                                </Link>
                                {' · '}
                                <Link to={isBn ? '/bn/bashundhara-ra-lawyer' : '/bashundhara-ra-lawyer'} style={{ color: '#E2C15A', textDecoration: 'underline' }}>
                                    {isBn ? 'বসুন্ধরা আবাসিক এলাকা আইনজীবী' : 'Bashundhara R/A Lawyer'}
                                </Link>
                            </p>
                        </div>
                    </div>
                </section>
            </article>
        </>
    );
};

export default ServicePage;
