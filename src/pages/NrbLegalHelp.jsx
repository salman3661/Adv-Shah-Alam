import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, MessageCircle, Globe2, FileCheck2, ShieldCheck, CalendarClock } from 'lucide-react';
import AdSenseAd from '../components/AdSenseAd';
import LocalAreasStrip from '../components/LocalAreasStrip';

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

const NRB_FAQS = [
    {
        q: 'Is the first legal consultation really free for NRBs?',
        a: 'Yes. Your initial WhatsApp or phone consultation with Advocate Md. Shah Alam is completely free. You can explain your property, family, or court matter and receive an initial legal opinion on eligibility and jurisdiction before any paid work begins.',
    },
    {
        q: 'Can I sell, mutate, or protect my land in Bangladesh without flying to Dhaka?',
        a: 'Yes. Under the Power of Attorneys Act 2012 and the Registration Act 1908, an NRB can execute a Special or General Power of Attorney abroad, have it attested by the Bangladesh Embassy or High Commission, and complete MOFA verification in Dhaka so an authorized representative can act before the Sub-Registry or AC (Land) office.',
    },
    {
        q: 'How long does land deed and khatian vetting take for NRBs?',
        a: 'Preliminary case screening takes 24 to 48 hours. A full written chain-of-title opinion (verifying CS, SA, RS, and BS khatians, Bia deeds, and Sub-Registry Talashi index records) typically takes 3 to 7 working days depending on the district registry office.',
    },
    {
        q: 'How are fees paid if I live in the UK, USA, UAE, or Canada?',
        a: 'There is no advance online checkout. After your free initial consultation, if you choose to proceed with formal drafting, deed vetting, or court representation, the indicative fee is confirmed in writing and can be settled via bKash (01712655546), bank transfer, or by a family member at the Dhaka chamber.',
    },
    {
        q: 'Is a foreign divorce decree valid in Bangladesh for NRBs?',
        a: 'A foreign divorce decree is evaluated under Section 13 of the Code of Civil Procedure 1908 (CPC) and the Muslim Family Laws Ordinance 1961 (where applicable). Proper notice to the Union Parishad or City Corporation Mayor and statutory 90-day waiting compliance should be verified to prevent future marriage or inheritance disputes in Bangladesh.',
    },
];

const NrbLegalHelp = () => {
    const title = 'NRB Legal Help Bangladesh | Property & Family Law';
    const description = 'Legal guides and remote legal services for Non-Resident Bangladeshis in the UK, USA, UAE and Canada: free initial consultation, deed vetting, MOFA attestation, retainer, divorce and court cases.';
    const canonical = 'https://www.advmdshahalam.me/nrb-legal-help';

    const nrbSchema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                '@id': `${canonical}#webpage`,
                url: canonical,
                name: title,
                inLanguage: 'en',
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.advmdshahalam.me/en' },
                    { '@type': 'ListItem', position: 2, name: 'NRB Legal Help', item: canonical },
                ],
            },
            {
                '@type': 'FAQPage',
                mainEntity: NRB_FAQS.map((f) => ({
                    '@type': 'Question',
                    name: f.q,
                    acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
            },
        ],
    };

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

                    {/* 3-Step How It Works — First Consultation is Free */}
                    <section
                        aria-labelledby="nrb-how-it-works"
                        className="mb-10 p-6 md:p-7 rounded-2xl"
                        style={{ background: 'var(--surface)', border: '1px solid var(--accent)' }}
                    >
                        <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--accent)' }}>
                            How Remote NRB Legal Help Works
                        </div>
                        <h2
                            id="nrb-how-it-works"
                            className="text-xl md:text-2xl font-bold mb-3"
                            style={{ color: 'var(--text)', fontFamily: "Georgia, serif" }}
                        >
                            First Consultation is Free — Clear 3-Step Process
                        </h2>
                        <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                            <strong>First consultation is free.</strong> Share your case details on WhatsApp or phone — you will receive an initial legal opinion at no charge. Fees apply only if you decide to proceed with formal drafting, vetting, or court representation.
                        </p>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--card-border)' }}>
                                <div className="text-xs font-bold uppercase mb-1" style={{ color: 'var(--accent)' }}>Step 1 · Free</div>
                                <div className="font-bold text-sm mb-1" style={{ color: 'var(--text)' }}>WhatsApp / Phone Case Brief</div>
                                <p className="text-xs" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                    Message +880 1955-802007 or call +880 1712-655546 to explain your property, family, or court issue and get an initial opinion free of charge.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--card-border)' }}>
                                <div className="text-xs font-bold uppercase mb-1" style={{ color: 'var(--accent)' }}>Step 2 · Scope &amp; Documents</div>
                                <div className="font-bold text-sm mb-1" style={{ color: 'var(--text)' }}>Written Scope &amp; Indicative Fee</div>
                                <p className="text-xs" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                    If formal work is needed, you receive a written document checklist, expected court/registry timeline, and confirmed indicative fee before starting.
                                </p>
                            </div>
                            <div className="p-4 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--card-border)' }}>
                                <div className="text-xs font-bold uppercase mb-1" style={{ color: 'var(--accent)' }}>Step 3 · Execution</div>
                                <div className="font-bold text-sm mb-1" style={{ color: 'var(--text)' }}>Remote Filing &amp; Updates</div>
                                <p className="text-xs" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                    Your chamber desk handles Sub-Registry searches, Embassy PoA drafts, or Dhaka court appearances with regular WhatsApp/video updates.
                                </p>
                            </div>
                        </div>
                    </section>

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
                            <div className="flex flex-col gap-2">
                                <Link
                                    to="/contact?service=documents"
                                    data-cta="nrb-documents"
                                    data-placement="nrb-documents"
                                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm min-h-[44px] w-fit"
                                    style={{ background: 'var(--btn-primary-bg)', color: '#fff' }}
                                >
                                    Request Document Service <ArrowRight size={15} />
                                </Link>
                                <Link
                                    to="/contact?service=documents"
                                    data-cta="nrb-free-consult"
                                    data-placement="nrb-documents"
                                    className="text-xs font-bold underline w-fit"
                                    style={{ color: 'var(--accent)' }}
                                >
                                    Start with a free consultation &rarr;
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
                            <div className="flex flex-col gap-2">
                                <Link
                                    to="/contact?service=retainer"
                                    data-cta="nrb-retainer"
                                    data-placement="nrb-retainer"
                                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm min-h-[44px] w-fit"
                                    style={{ background: 'var(--btn-primary-bg)', color: '#fff' }}
                                >
                                    Inquire About Retainer <ArrowRight size={15} />
                                </Link>
                                <Link
                                    to="/contact?service=retainer"
                                    data-cta="nrb-free-consult"
                                    data-placement="nrb-retainer"
                                    className="text-xs font-bold underline w-fit"
                                    style={{ color: 'var(--accent)' }}
                                >
                                    Start with a free consultation &rarr;
                                </Link>
                            </div>
                        </section>
                    </div>

                    {/* Countries, Statutory Scope & Document Checklist (900+ words E-E-A-T depth) */}
                    <section className="mb-10 p-6 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--card-border)' }}>
                        <h2 className="text-xl md:text-2xl font-bold mb-3" style={{ color: 'var(--text)', fontFamily: "Georgia, serif" }}>
                            Countries Served, Statutory Framework &amp; Document Checklist
                        </h2>
                        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                            Advocate Md. Shah Alam (Enrolled with the Bangladesh Bar Council since 2015, practicing at the Supreme Court of Bangladesh and Dhaka Judge Court) coordinates remote legal representation for Non-Resident Bangladeshis residing in the <strong>United Kingdom (London, Birmingham, Manchester), United States (New York, New Jersey, Michigan, California, Texas), Canada (Toronto, Montreal, Ottawa), United Arab Emirates (Dubai, Abu Dhabi, Sharjah), Saudi Arabia, Qatar, Singapore, Australia, and EU countries</strong>. Consultations are scheduled across GMT, EST/PST, GST, and BST time zones so you never have to travel to Dhaka just for preliminary verification or document filing.
                        </p>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <h3 className="font-bold text-base mb-2" style={{ color: 'var(--text)' }}>Essential Documents to Keep Ready</h3>
                                <ul className="space-y-1.5 text-sm list-disc pl-5" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                    <li><strong>Property &amp; Inheritance:</strong> Scanned copies of Saf Kabala (sale deed), Bia deeds, CS/SA/RS/BS Khatian (Porcha), mutation DCR, Khajna (land development tax) receipts, and NID/passport copy.</li>
                                    <li><strong>Power of Attorney (PoA):</strong> Drafted under the Power of Attorneys Act 2012 and Registration Act 1908, signed before the Bangladesh Embassy/High Commission abroad and verified by MOFA in Dhaka.</li>
                                    <li><strong>Family &amp; Foreign Divorce:</strong> Registered Kabinnama, foreign divorce decree (evaluated under Section 13 of the Code of Civil Procedure 1908), and union/city corporation notice copies under the Muslim Family Laws Ordinance 1961.</li>
                                    <li><strong>Cheque Dishonour &amp; Criminal Matters:</strong> Dishonoured cheque copy, bank return memo, statutory 30-day legal notice under Section 138 of the Negotiable Instruments Act 1881, or FIR/GD copy.</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-base mb-2" style={{ color: 'var(--text)' }}>Typical Turnaround &amp; Fee Transparency</h3>
                                <ul className="space-y-1.5 text-sm list-disc pl-5" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                    <li><strong>Free Initial Consultation:</strong> Same-day or within 24 hours via WhatsApp or phone for initial legal triage.</li>
                                    <li><strong>Deed &amp; Khatian Vetting:</strong> 3 to 7 working days for Sub-Registry Talashi search and written chain-of-title opinion.</li>
                                    <li><strong>PoA &amp; Legal Notice Drafting:</strong> 24 to 72 hours for court-ready English or bilingual drafts formatted for Embassy attestation.</li>
                                    <li><strong>Transparent Settlement:</strong> No advance online payment gateway is used. Fees are confirmed in writing after initial review and exclude government stamp duties, Sub-Registry fees, and Embassy consular charges.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

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

                    {/* NRB Frequently Asked Questions */}
                    <section className="mt-12 mb-8" aria-labelledby="nrb-faq-heading">
                        <h2
                            id="nrb-faq-heading"
                            className="text-xl md:text-2xl font-bold mb-4"
                            style={{ color: 'var(--text)', fontFamily: "Georgia, serif" }}
                        >
                            Frequently Asked Questions for NRBs
                        </h2>
                        <div className="space-y-3">
                            {NRB_FAQS.map((f) => (
                                <div
                                    key={f.q}
                                    className="p-4 rounded-xl"
                                    style={{ background: 'var(--surface)', border: '1px solid var(--card-border)' }}
                                >
                                    <h3 className="font-bold text-sm md:text-base mb-1.5" style={{ color: 'var(--text)' }}>
                                        {f.q}
                                    </h3>
                                    <p className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                        {f.a}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="mt-8">
                        <LocalAreasStrip lang="en" />
                    </div>

                    <p className="text-xs mt-12" style={{ color: 'var(--text-muted)' }}>
                        These guides are general legal information, not legal advice. All indicative fee figures exclude court stamps, embassy consular charges, and government revenue duties. Please consult a qualified advocate for your specific case.
                    </p>
                </div>
            </section>
        </>
    );
};

export default NrbLegalHelp;
