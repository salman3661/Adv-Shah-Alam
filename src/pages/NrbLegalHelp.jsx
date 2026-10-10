import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, MessageCircle, Globe2 } from 'lucide-react';
import AdSenseAd from '../components/AdSenseAd';

import postsMeta_en from '../content/posts-meta-en.json';
const _postModules = postsMeta_en;
const allPosts = Object.values(_postModules).map((m) => m.default ?? m);
const bySlug = Object.fromEntries(allPosts.map((p) => [p.slug, p]));

const GROUPS = [
    {
        title: 'Property & Land (Buying, Selling, Inheritance)',
        slugs: [
            'power-of-attorney-from-abroad-bangladesh-land-sale-attestation-guide',
            'nrb-inherited-property-recover-grabbed-land-dhaka',
            'buy-land-in-bangladesh-from-abroad-nrb-legal-checklist',
            'check-land-ownership-bangladesh-online-khatian-mutation-porcha',
            'land-mutation-namjari-from-abroad-step-by-step',
            'sell-property-in-bangladesh-while-living-overseas',
            'can-foreigner-or-dual-citizen-own-property-in-bangladesh',
            'stop-land-grabbing-bangladesh-nrb-legal-remedies',
            'property-inheritance-bangladesh-nrb-muslim-hindu-christian-law',
            'power-of-attorney-bangladesh-property-from-abroad',
        ],
    },
    {
        title: 'Family Law (Divorce, Marriage, Custody)',
        slugs: [
            'foreign-divorce-validity-bangladesh-talaq-registration-nrb-uk-usa',
            'divorce-in-bangladesh-for-expats-foreign-divorce-valid',
            'marriage-registration-bangladesh-nrb-foreign-spouse',
            'child-custody-bangladesh-when-parent-lives-abroad',
            'dower-denmohor-maintenance-claim-from-abroad-bangladesh',
        ],
    },
    {
        title: 'Documents, Citizenship & Certificates',
        slugs: [
            'dual-citizenship-nvr-bangladeshi-americans-legal-guide',
            'attest-documents-for-bangladesh-embassy-mofa-notary-guide',
            'dual-citizenship-nvr-bangladesh-nrb-guide',
            'police-clearance-certificate-bangladesh-from-abroad',
            'birth-death-certificate-correction-bangladesh-nrb',
        ],
    },
    {
        title: 'Money, Business & Court Cases',
        slugs: [
            'remittance-tax-nbr-scrutiny-property-purchase-bangladesh-nrb',
            'send-money-to-bangladesh-legally-remittance-rules-tax',
            'start-company-in-bangladesh-non-resident-registration-guide',
            'file-case-in-bangladesh-without-travelling-virtual-hearing',
            'cheque-dishonour-case-section-138-bangladesh-expats',
        ],
    },
];

const NrbLegalHelp = () => {
    const title = 'NRB Legal Help Bangladesh: Property, Family & Documents for Expats | Adv. Shah Alam';
    const description = 'Legal guides and help for Non-Resident Bangladeshis in the UK, USA, UAE and Canada: land purchase, Power of Attorney, divorce, inheritance, document attestation and court cases. Supreme Court advocate.';
    const canonical = 'https://www.advmdshahalam.me/nrb-legal-help';

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={canonical} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={canonical} />
                <meta property="og:type" content="website" />
            </Helmet>

            <section className="pt-28 pb-16" style={{ background: 'var(--bg)' }}>
                <div className="container mx-auto px-6 max-w-5xl">
                    <span className="label-accent inline-flex items-center gap-2 mb-3">
                        <Globe2 size={14} /> For Bangladeshis Abroad
                    </span>
                    <h1
                        className="text-3xl md:text-5xl font-bold mb-4"
                        style={{ color: 'var(--text)', fontFamily: "Georgia, serif", lineHeight: 1.2 }}
                    >
                        Legal Help for NRBs in Bangladesh
                    </h1>
                    <p className="text-base md:text-lg mb-6" style={{ color: 'var(--text-secondary)', maxWidth: '46rem', lineHeight: 1.8 }}>
                        Living in the UK, USA, UAE, Canada or elsewhere and need help with land, family or court matters in
                        Bangladesh? Read our practical guides below, or contact{' '}
                        <Link to="/advocate-md-shah-alam" style={{ color: 'var(--accent)', fontWeight: 700 }}>
                            Advocate Md. Shah Alam
                        </Link>{' '}
                        of the Supreme Court of Bangladesh. Remote consultation is available by phone and WhatsApp.
                    </p>

                    <div className="flex flex-wrap gap-3 mb-10">
                        <a
                            href="tel:01712655546"
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm"
                            style={{ background: 'var(--accent)', color: '#fff' }}
                        >
                            <Phone size={16} /> Call 01712655546
                        </a>
                        <a
                            href="https://wa.me/8801712655546"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm"
                            style={{ background: '#16a34a', color: '#fff' }}
                        >
                            <MessageCircle size={16} /> WhatsApp
                        </a>
                    </div>

                    {GROUPS.map((group, gi) => {
                        const posts = group.slugs.map((s) => bySlug[s]).filter(Boolean);
                        if (posts.length === 0) return null;
                        return (
                            <React.Fragment key={group.title}>
                                <h2
                                    className="text-xl md:text-2xl font-bold mt-10 mb-4"
                                    style={{ color: 'var(--text)', fontFamily: "Georgia, serif" }}
                                >
                                    {group.title}
                                </h2>
                                <div className="grid gap-3 md:grid-cols-2">
                                    {posts.map((post) => (
                                        <Link
                                            key={post.slug}
                                            to={`/blog/${post.slug}`}
                                            className="group block p-4 rounded-xl transition-all"
                                            style={{ background: 'var(--surface)', border: '1px solid var(--card-border)' }}
                                        >
                                            <div className="text-xs font-bold mb-1" style={{ color: 'var(--accent)' }}>
                                                {post.category} · {post.readTime}
                                            </div>
                                            <div className="font-semibold leading-snug" style={{ color: 'var(--text)' }}>
                                                {post.title}
                                            </div>
                                            <div className="mt-2 inline-flex items-center gap-1 text-xs font-bold" style={{ color: 'var(--accent)' }}>
                                                Read guide <ArrowRight size={12} />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                {gi === 1 && (
                                    <div style={{ margin: '2rem auto', maxWidth: '850px' }}>
                                        <AdSenseAd
                                            slot="8630877987"
                                            format="auto"
                                            responsive={true}
                                            labelText="Advertisement"
                                            style={{ borderRadius: '0.75rem', overflow: 'hidden' }}
                                        />
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}

                    <p className="text-xs mt-12" style={{ color: 'var(--text-muted)' }}>
                        These guides are general legal information, not legal advice. Please consult a qualified advocate for your specific case.
                    </p>
                </div>
            </section>
        </>
    );
};

export default NrbLegalHelp;
