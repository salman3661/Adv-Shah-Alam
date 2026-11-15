import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, MessageCircle, Globe2, FileCheck2, ShieldCheck, CalendarClock } from 'lucide-react';
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

const PAID_TIERS = [
    {
        pkg: 'Preliminary Case Screening',
        deliverable: '24–48h legal triage, conflict check & statutory filing eligibility assessment',
        fee: '৳500–৳1,500 / $5–$15',
    },
    {
        pkg: '45-Min Video Case Review',
        deliverable: 'Full legal strategy & statute roadmap session with Advocate Md. Shah Alam',
        fee: '৳3,000 / $30',
    },
    {
        pkg: 'Land Deed & Khatian Chain Vetting',
        deliverable: 'Written legal opinion on chain of title, Bia deeds, Sub-Registry records & e-Mutation',
        fee: '৳8,000 / $75',
    },
    {
        pkg: 'PoA / Legal Notice / Agreement Drafting',
        deliverable: 'Court-ready bilingual or English legal draft formatted for Embassy attestation',
        fee: '৳5,000 / $50',
    },
];

const NrbLegalHelp = () => {
    const title = 'NRB Legal Help Bangladesh | Property & Family Law';
    const description = 'Legal guides and remote legal services for Non-Resident Bangladeshis in the UK, USA, UAE and Canada: paid case review, deed vetting, MOFA attestation, retainer, divorce and court cases.';
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
                    <nav aria-label="Breadcrumb" className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
                        <Link to="/en" style={{ color: 'var(--accent)', fontWeight: 600 }}>Home</Link>
                        <span className="mx-2" aria-hidden="true">&rsaquo;</span>
                        <span>NRB Legal Help</span>
                    </nav>

                    <span className="label-accent inline-flex items-center gap-2 mb-3">
                        <Globe2 size={14} /> For Bangladeshis Abroad
                    </span>
                    <h1
                        className="text-3xl md:text-5xl font-bold mb-4"
                        style={{ color: 'var(--text)', fontFamily: "Georgia, serif", lineHeight: 1.2 }}
                    >
                        Legal Help for NRBs in Bangladesh
                    </h1>
                    <p
                        className="direct-answer text-base md:text-lg mb-6 p-4 rounded-xl"
                        style={{
                            color: 'var(--text-secondary)',
                            background: 'var(--surface)',
                            border: '1px solid var(--card-border)',
                            maxWidth: '52rem',
                            lineHeight: 1.8,
                        }}
                    >
                        <strong>Quick Summary:</strong> Non-Resident Bangladeshis (NRBs) in the UK, USA, Canada, UAE, and Europe can resolve land disputes, execute Embassy-attested Power of Attorney (PoA), vet khatian and Bia deeds, handle divorce/custody suits, and defend criminal/cheque matters in Bangladesh remotely through{' '}
                        <Link to="/advocate-md-shah-alam" style={{ color: 'var(--accent)', fontWeight: 700 }}>
                            Advocate Md. Shah Alam
                        </Link>{' '}
                        of the Supreme Court of Bangladesh without flying to Dhaka.
                    </p>

                    <div className="flex flex-wrap gap-3 mb-10">
                        <a
                            href="tel:+8801712655546"
                            data-cta="nrb-hero-call"
                            data-placement="nrb-hero"
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm min-h-[44px]"
                            style={{ background: 'var(--btn-primary-bg)', color: '#fff' }}
                        >
                            <Phone size={16} /> Call 01712655546
                        </a>
                        <a
                            href="https://wa.me/8801955802007"
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cta="nrb-hero-whatsapp"
                            data-placement="nrb-hero"
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm min-h-[44px]"
                            style={{ background: 'var(--wa-green)', color: '#fff' }}
                        >
                            <MessageCircle size={16} /> WhatsApp Consultation
                        </a>
                        <Link
                            to="/contact?service=case-review"
                            data-cta="consult"
                            data-placement="nrb-hero"
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm min-h-[44px]"
                            style={{ background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--card-border)' }}
                        >
                            <FileCheck2 size={16} /> Book Paid Case Review
                        </Link>
                    </div>

                    {/* Owned-Revenue Service Tier 1: Paid Case Review & Written Opinion */}
                    <section
                        aria-labelledby="nrb-paid-review-heading"
                        className="mb-10 p-6 md:p-7 rounded-2xl"
                        style={{ background: 'var(--surface)', border: '1px solid var(--card-border)' }}
                    >
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--accent)' }}>
                            <ShieldCheck size={15} /> Fixed-Scope Remote Legal Services
                        </div>
                        <h2
                            id="nrb-paid-review-heading"
                            className="text-xl md:text-2xl font-bold mb-2"
                            style={{ color: 'var(--text)', fontFamily: "Georgia, serif" }}
                        >
                            Paid Case Review &amp; Written Opinion
                        </h2>
                        <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                            Transparent pre-litigation case triage, video legal consultations, and written chain-of-title opinions delivered remotely. All listed fees are <em>indicative estimates</em> confirmed in writing once document scope is reviewed.
                        </p>
                        <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--card-border)' }}>
                            <table className="w-full text-sm text-left" style={{ borderCollapse: 'collapse', background: 'var(--bg)' }}>
                                <thead>
                                    <tr style={{ background: 'var(--btn-primary-bg)', color: '#fff' }}>
                                        <th className="p-3 font-bold">Service Package</th>
                                        <th className="p-3 font-bold">Deliverables</th>
                                        <th className="p-3 font-bold whitespace-nowrap">Indicative Fee (BDT / USD)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {PAID_TIERS.map((row, idx) => (
                                        <tr
                                            key={row.pkg}
                                            style={{ borderBottom: idx < PAID_TIERS.length - 1 ? '1px solid var(--card-border)' : 'none' }}
                                        >
                                            <td className="p-3 font-bold" style={{ color: 'var(--text)' }}>{row.pkg}</td>
                                            <td className="p-3" style={{ color: 'var(--text-secondary)' }}>{row.deliverable}</td>
                                            <td className="p-3 font-bold whitespace-nowrap" style={{ color: 'var(--accent)' }}>{row.fee}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-5 flex flex-wrap items-center gap-4">
                            <Link
                                to="/contact?service=case-review"
                                data-cta="consult"
                                data-placement="nrb-paid-review"
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm min-h-[44px]"
                                style={{ background: 'var(--btn-primary-bg)', color: '#fff' }}
                            >
                                Book Paid Case Review <ArrowRight size={15} />
                            </Link>
                            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                Payable via bKash, Nagad, bank transfer, or overseas remittance card.
                            </span>
                        </div>
                    </section>

                    {/* Owned-Revenue Service Tiers 2 & 3 */}
                    <div className="grid gap-6 md:grid-cols-2 mb-10">
                        <section
                            aria-labelledby="nrb-documents-heading"
                            className="p-6 rounded-2xl flex flex-col justify-between"
                            style={{ background: 'var(--surface)', border: '1px solid var(--card-border)' }}
                        >
                            <div>
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--accent)' }}>
                                    <FileCheck2 size={15} /> Embassy, MOFA &amp; Court Registry
                                </div>
                                <h2
                                    id="nrb-documents-heading"
                                    className="text-xl font-bold mb-3"
                                    style={{ color: 'var(--text)', fontFamily: "Georgia, serif" }}
                                >
                                    NRB Document &amp; Attestation Services
                                </h2>
                                <ul className="space-y-2 text-sm mb-4" style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                                    <li><strong>MOFA &amp; Bangladesh Embassy Attestation:</strong> Legal formatting and Ministry of Foreign Affairs verification for UK, USA, UAE, and Canada submissions.</li>
                                    <li><strong>Hague Apostille Coordination:</strong> Apostille authentication guidance for foreign birth, marriage, and Power of Attorney records.</li>
                                    <li><strong>NID, Birth &amp; Marriage Corrections:</strong> Affidavit drafting and magistrate/gazette correction steps.</li>
                                    <li><strong>Certified Court Copies &amp; Talashi Search:</strong> Direct Dhaka Sub-Registry index searches and certified deed extraction.</li>
                                </ul>
                                <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
                                    <strong>Indicative service fee:</strong> Starting from ৳4,000 / $40 depending on registry office and notarization count (government stamp duties separate).
                                </p>
                            </div>
                            <div>
                                <Link
                                    to="/contact?service=documents"
                                    data-cta="nrb-documents"
                                    data-placement="nrb-documents"
                                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm min-h-[44px]"
                                    style={{ background: 'var(--btn-primary-bg)', color: '#fff' }}
                                >
                                    Request Document Service <ArrowRight size={15} />
                                </Link>
                            </div>
                        </section>

                        <section
                            aria-labelledby="nrb-retainer-heading"
                            className="p-6 rounded-2xl flex flex-col justify-between"
                            style={{ background: 'var(--surface)', border: '1px solid var(--card-border)' }}
                        >
                            <div>
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--accent)' }}>
                                    <CalendarClock size={15} /> Ongoing Protection Abroad
                                </div>
                                <h2
                                    id="nrb-retainer-heading"
                                    className="text-xl font-bold mb-3"
                                    style={{ color: 'var(--text)', fontFamily: "Georgia, serif" }}
                                >
                                    NRB Monthly Legal Advisory Retainer
                                </h2>
                                <ul className="space-y-2 text-sm mb-4" style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                                    <li><strong>Family Property &amp; Land Monitoring:</strong> Periodic khatian, land tax (Khajna), and encroachment checks on ancestral Dhaka &amp; district properties.</li>
                                    <li><strong>Tenant &amp; Mutation Compliance:</strong> Lease vetting, eviction notice compliance, and e-Mutation status tracking.</li>
                                    <li><strong>Annual NBR Tax Return Coordination:</strong> Non-resident remittance exemption and return compliance documentation.</li>
                                    <li><strong>Priority UK/USA/UAE/Canada Line:</strong> Scheduled WhatsApp &amp; video check-ins across overseas time zones.</li>
                                </ul>
                                <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
                                    <strong>Indicative retainer fee:</strong> ৳12,000–৳25,000 / $110–$225 per month based on number of properties and active filings.
                                </p>
                            </div>
                            <div>
                                <Link
                                    to="/contact?service=retainer"
                                    data-cta="nrb-retainer"
                                    data-placement="nrb-retainer"
                                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm min-h-[44px]"
                                    style={{ background: 'var(--btn-primary-bg)', color: '#fff' }}
                                >
                                    Inquire About Retainer <ArrowRight size={15} />
                                </Link>
                            </div>
                        </section>
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
                                            className="group block p-4 rounded-xl transition-[color,background-color,border-color,box-shadow,opacity,transform]"
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
                                {gi === 0 && (
                                    <div style={{ margin: '2rem auto', maxWidth: '850px' }}>
                                        <AdSenseAd
                                            key="nrb-ad-top"
                                            slot="8630877987"
                                            format="auto"
                                            responsive={true}
                                            labelText="Advertisement"
                                            minHeight={250}
                                        />
                                    </div>
                                )}
                                {gi === 1 && (
                                    <div style={{ margin: '2rem auto', maxWidth: '850px' }}>
                                        <AdSenseAd
                                            key="nrb-ad-mid"
                                            slot="9118178745"
                                            format="fluid"
                                            layout="in-article"
                                            responsive={true}
                                            labelText="Advertisement"
                                            minHeight={250}
                                        />
                                    </div>
                                )}
                                {gi === 3 && (
                                    <div style={{ margin: '2rem auto', maxWidth: '850px' }}>
                                        <AdSenseAd
                                            key="nrb-ad-grid"
                                            slot="3667074343"
                                            format="autorelaxed"
                                            responsive={true}
                                            labelText="Sponsored Content"
                                            minHeight={280}
                                        />
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}

                    <p className="text-xs mt-12" style={{ color: 'var(--text-muted)' }}>
                        These guides are general legal information, not legal advice. All indicative fee figures exclude court stamps, embassy consular charges, and government revenue duties. Please consult a qualified advocate for your specific case.
                    </p>
                </div>
            </section>
        </>
    );
};

export default NrbLegalHelp;
