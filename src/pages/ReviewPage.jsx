import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Star, MapPin, ExternalLink, HeartHandshake, ShieldCheck, Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GOOGLE_REVIEW_URL, REVIEW_CONTENT } from '../content/reviewContent.mjs';
import { telLink, waLink } from '../data/contactInfo';

const BASE = 'https://www.advmdshahalam.me';

const ReviewPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'হোম', item: `${BASE}/` },
            { '@type': 'ListItem', position: 2, name: 'ক্লায়েন্ট রিভিউ ও মতামত', item: `${BASE}/review` },
        ],
    };

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: REVIEW_CONTENT.faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
    };

    return (
        <>
            <Helmet>
                <html lang="bn" />
                <title>{REVIEW_CONTENT.metaTitle}</title>
                <meta name="description" content={REVIEW_CONTENT.metaDesc} />
                <link rel="canonical" href={`${BASE}/review`} />
                <meta name="robots" content="index, follow" />
                <link rel="alternate" hrefLang="bn" href={`${BASE}/review`} />
                <link rel="alternate" hrefLang="x-default" href={`${BASE}/review`} />
                <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
            </Helmet>

            <section className="pt-28 pb-16 px-4" style={{ background: 'var(--bg)' }}>
                <div className="max-w-4xl mx-auto">
                    <nav aria-label="Breadcrumb" className="text-xs font-semibold mb-6 flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                        <Link to="/" className="hover:underline">হোম</Link>
                        <span>/</span>
                        <span style={{ color: 'var(--text)' }}>ক্লায়েন্ট রিভিউ ও মতামত</span>
                    </nav>

                    {/* Primary Review Prompt Card */}
                    <div
                        className="p-8 sm:p-10 rounded-3xl border shadow-lg text-center mb-12"
                        style={{ background: 'var(--surface)', borderColor: 'var(--card-border)' }}
                    >
                        <div
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-5 border"
                            style={{ background: 'var(--gold-subtle)', borderColor: 'var(--gold-border)', color: 'var(--gold)' }}
                        >
                            <HeartHandshake size={15} />
                            {REVIEW_CONTENT.badge}
                        </div>

                        <h1 className="text-2xl sm:text-4xl font-bold mb-4 tracking-tight" style={{ color: 'var(--text)' }}>
                            {REVIEW_CONTENT.h1}
                        </h1>

                        <p className="text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-6" style={{ color: 'var(--text-secondary)' }}>
                            {REVIEW_CONTENT.intro}
                        </p>

                        <div className="flex justify-center items-center gap-2 mb-7" aria-label="Google Rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} size={30} fill="#C9A227" stroke="#C9A227" />
                            ))}
                        </div>

                        <a
                            href={GOOGLE_REVIEW_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cta="review-google"
                            data-placement="review-hero"
                            className="inline-flex items-center justify-center gap-3 py-4 px-8 rounded-2xl font-bold text-white shadow-md text-base transition-transform hover:-translate-y-0.5"
                            style={{ background: 'var(--btn-primary-bg)' }}
                        >
                            <span>{REVIEW_CONTENT.ctaPrimary}</span>
                            <ExternalLink size={18} />
                        </a>

                        <p className="text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
                            {REVIEW_CONTENT.ctaHelper}
                        </p>
                    </div>

                    {/* Substantive Editorial Sections */}
                    <div className="space-y-8 mb-12">
                        {REVIEW_CONTENT.sections.map((sec, idx) => (
                            <article
                                key={idx}
                                className="p-6 sm:p-8 rounded-2xl border"
                                style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
                            >
                                <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text)' }}>
                                    <ShieldCheck size={20} style={{ color: 'var(--gold)' }} className="flex-shrink-0" />
                                    <span>{sec.heading}</span>
                                </h2>
                                {sec.paragraphs?.map((p, pi) => (
                                    <p key={pi} className="text-sm sm:text-base leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                                        {p}
                                    </p>
                                ))}
                                {sec.steps && (
                                    <ol className="list-decimal pl-6 space-y-2.5 text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
                                        {sec.steps.map((st, si) => (
                                            <li key={si} className="leading-relaxed">{st}</li>
                                        ))}
                                    </ol>
                                )}
                                {sec.bullets && (
                                    <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
                                        {sec.bullets.map((b, bi) => (
                                            <li key={bi} className="leading-relaxed">{b}</li>
                                        ))}
                                    </ul>
                                )}
                            </article>
                        ))}
                    </div>

                    {/* Related Practice Areas & Contact */}
                    <section className="mb-12">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>
                            আমাদের প্রধান আইনি সেবাসমূহ
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {REVIEW_CONTENT.serviceLinks.map((lnk) => (
                                <Link
                                    key={lnk.to}
                                    to={lnk.to}
                                    className="p-4 rounded-xl border flex items-center justify-between gap-2 text-sm font-semibold hover:underline"
                                    style={{ background: 'var(--surface)', borderColor: 'var(--card-border)', color: 'var(--text)' }}
                                >
                                    <span>{lnk.label}</span>
                                    <ArrowRight size={15} style={{ color: 'var(--accent)' }} />
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Visible FAQ Section matching FAQPage Schema */}
                    <section className="mb-12">
                        <h2 className="text-xl sm:text-2xl font-bold mb-5" style={{ color: 'var(--text)' }}>
                            রিভিউ ও পরামর্শ সম্পর্কিত সাধারণ প্রশ্নোত্তর
                        </h2>
                        <div className="space-y-4">
                            {REVIEW_CONTENT.faqs.map((faq, fi) => (
                                <div
                                    key={fi}
                                    className="p-5 rounded-xl border"
                                    style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
                                >
                                    <h3 className="font-bold text-base mb-2" style={{ color: 'var(--text)' }}>
                                        {faq.q}
                                    </h3>
                                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                        {faq.a}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Direct Chambers Consultation CTA */}
                    <div
                        className="p-7 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4"
                        style={{ background: 'var(--surface)', borderColor: 'var(--card-border)' }}
                    >
                        <div>
                            <div className="flex items-center gap-1.5 text-sm font-bold mb-1" style={{ color: 'var(--text)' }}>
                                <MapPin size={16} style={{ color: 'var(--gold)' }} />
                                <span>নতুন মামলা বা জরুরি আইনি পরামর্শের প্রয়োজন?</span>
                            </div>
                            <p className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
                                উত্তরা ও ঢাকা জজ কোর্ট চেম্বারে সরাসরি সাক্ষাৎ বা ফোনে পরামর্শ নিতে পারেন।
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <a
                                href={waLink('আমি আইনি পরামর্শ ও চেম্বার অ্যাপয়েন্টমেন্ট নিতে চাই।', true)}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-cta="whatsapp"
                                data-placement="review-bottom"
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white"
                                style={{ background: 'var(--wa-green)' }}
                            >
                                <MessageCircle size={16} /> হোয়াটসঅ্যাপ
                            </a>
                            <a
                                href={telLink()}
                                data-cta="call"
                                data-placement="review-bottom"
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white"
                                style={{ background: 'var(--btn-primary-bg)' }}
                            >
                                <Phone size={16} /> কল করুন
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ReviewPage;
