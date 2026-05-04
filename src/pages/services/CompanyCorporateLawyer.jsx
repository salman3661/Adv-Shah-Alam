import React from 'react';
import ServicePage from '../../components/ServicePage';

const ALL_SERVICES = [
    { label: 'Divorce & Family Lawyer – Dhaka',        to: '/services/divorce-lawyer' },
    { label: 'Criminal Lawyer – Uttara, Dhaka',        to: '/services/criminal-lawyer' },
    { label: 'Bail Lawyer – Fast Applications',         to: '/services/bail-lawyer' },
    { label: 'Land & Property Lawyer – Dhaka',         to: '/services/land-lawyer' },
    { label: 'Supreme Court Lawyer – Bangladesh',       to: '/services/supreme-court-lawyer' },
    { label: 'Tax & VAT Lawyer – Bangladesh',          to: '/services/tax-lawyer' },
];

const CompanyCorporateLawyer = () => (
    <ServicePage
        metaTitle="Starting a Business? Company & Corporate Lawyer in Dhaka, Bangladesh"
        metaDesc="RJSC registration, shareholder disputes & corporate litigation. Expert business lawyer in Dhaka — 20+ years. Free first consultation."
        canonicalUrl="https://advmdshahalam.me/services/company-corporate-lawyer"
        h1="Company & Corporate Lawyer in Dhaka — From Formation to Litigation"
        intro="Advocate Md. Shah Alam provides comprehensive <strong>company and corporate legal services in Bangladesh</strong>, advising businesses, entrepreneurs, and investors on company formation, commercial contracts, shareholder disputes, regulatory compliance, and corporate litigation. With deep expertise in the Companies Act 1994 and strong courtroom experience before the High Court Division — Adv. Shah Alam is the trusted legal partner for businesses operating in Bangladesh."
        coverage={[
            'Company incorporation under the Companies Act 1994 — RJSC filings',
            'Shareholder agreements, partnership deeds & joint venture contracts',
            'Director and shareholder disputes — oppression & mismanagement petitions',
            'Commercial contract drafting, review & enforcement',
            'Corporate compliance — annual filings, board resolutions & governance',
            'Business dissolution, winding-up & insolvency proceedings',
            'Trade licence, business permit & regulatory matters',
            'Corporate debt recovery and creditor rights enforcement',
            'Employment contract disputes for businesses',
            'Intellectual property licensing and business agreements',
            'Foreign investment structuring and BIDA compliance',
            'High Court company petitions — oppression, mismanagement & rectification',
        ]}
        contextNote="Company disputes that remain unresolved at the corporate level often escalate to the <a href='/services/supreme-court-lawyer' style='color:var(--accent);text-decoration:underline'>High Court Division</a> — whether through oppression petitions under the Companies Act or commercial litigation. For businesses facing <a href='/services/tax-lawyer' style='color:var(--accent);text-decoration:underline'>tax or VAT disputes with the NBR</a>, Adv. Shah Alam provides integrated corporate and tax counsel."
        faqItems={[
            {
                q: 'How do I register a company in Bangladesh (2026)?',
                a: 'Company registration in Bangladesh is processed through the Registrar of Joint Stock Companies and Firms (RJSC) — now partly online. Steps: (1) Reserve a company name (name clearance); (2) Draft Memorandum and Articles of Association; (3) Execute Form I (declaration) and Form IX (consent of directors); (4) Pay stamp duty and RJSC registration fees; (5) Receive Certificate of Incorporation. A company lawyer ensures compliant documentation and fastest possible RJSC approval.',
            },
            {
                q: 'What can I do if a business partner breaches a partnership agreement?',
                a: 'If a business partner breaches your agreement, you may pursue: (1) Civil suit for damages or specific performance; (2) Injunction to prevent further breach or asset dissipation; (3) Account of profits — recovering profits improperly earned from the breach; (4) Dissolution of the partnership through court if the relationship is irrecoverable. Act quickly — delay weakens your legal position and allows the breach to compound.',
            },
            {
                q: 'Can a shareholder sue company directors in Bangladesh?',
                a: 'Yes. Under the Companies Act 1994, shareholders may file a petition before the High Court Division alleging: oppression (directors acting in a manner prejudicial to shareholders), mismanagement (company affairs conducted fraudulently), or breach of fiduciary duty. The High Court can regulate the company\'s affairs, order rectification of the register, direct a share buyout, or even appoint a receiver.',
            },
            {
                q: 'How do I recover a debt from a company in Bangladesh?',
                a: 'Corporate debt recovery options: (1) Artha Rin Adalat (Money Loan Court) — for bank and NBFI loans under the Artha Rin Adalat Ain 2003; (2) Civil suit for money decree — for commercial debts between businesses; (3) Winding-up petition in High Court — a last resort that can pressure payment of substantial debts; (4) Negotiated settlement with legal assistance. The right route depends on the nature and amount of the debt.',
            },
            {
                q: 'What are the legal requirements for foreign companies operating in Bangladesh?',
                a: 'Foreign companies in Bangladesh must: (1) Register a branch or liaison office with RJSC; (2) Obtain investment registration from BIDA (Bangladesh Investment Development Authority) for FDI; (3) Register for VAT and tax with the NBR; (4) Comply with the Foreign Exchange Regulation Act for capital transactions; (5) Follow sectoral regulations if operating in restricted sectors. A corporate lawyer ensures full compliance from day one.',
            },
            {
                q: 'How long does a company dispute case take in Bangladesh?',
                a: 'High Court company petitions (oppression/mismanagement): 2–5 years for a contested full hearing, though interim relief can be obtained much faster. Commercial contract civil suits: 2–4 years in district civil courts. Winding-up petitions: 1–3 years. Mediation and negotiated settlements (recommended where possible) can resolve disputes in weeks or months.',
            },
        ]}
        howWeHelp={{
            problems: [
                'You want to register a company but do not know the legal process',
                'A business partner has cheated you or breached the agreement',
                'You received an RJSC compliance notice and need urgent help',
                'A client or company owes you money and refuses to pay',
            ],
            steps: [
                { step: 'Business Consultation', desc: 'Tell us your business situation — we identify the legal solution' },
                { step: 'Documentation', desc: 'Memorandum, Articles, contracts, and board resolutions — all drafted' },
                { step: 'Filing & Registration', desc: 'RJSC filings, trade licence, BIDA registration — handled end to end' },
                { step: 'Dispute Resolution', desc: 'Court litigation, arbitration, or negotiated settlement — your best path' },
            ],
            scenario: 'Two co-founders of a tech startup in Dhaka disagreed over equity split after one invested more capital. The dispute threatened to shut down the company. Advocate Shah Alam drafted a revised shareholder agreement, resolved the equity dispute through mediation, and restructured the company within 6 weeks — no court case needed.',
            cta: 'Protect your business with expert legal counsel. Free first consultation — call or WhatsApp.',
        }}
        ctaText="Talk to a Company Lawyer in Dhaka"
        relatedBlogLinks={[
            { to: '/blog/artha-rin-adalat-loan-recovery-bangladesh', title: 'Artha Rin Adalat – Loan Recovery in Bangladesh', desc: 'How the Money Loan Court works for corporate debt recovery' },
            { to: '/blog/contract-breach-legal-action-bangladesh', title: 'Contract Breach – Legal Action in Bangladesh', desc: 'How to sue for breach of contract and recover damages' },
            { to: '/blog/writ-petition-high-court-bangladesh', title: 'Writ Petition in Bangladesh High Court – Complete Guide', desc: 'When and how to approach the High Court for company and corporate disputes' },
            { to: '/blog/cheque-dishonour-case-law-bangladesh', title: 'Cheque Dishonour Case Law Bangladesh – Section 138 Guide', desc: 'How to handle bounced cheques and recover corporate debts through courts' },
            { to: '/blog/cheque-dishonour-penalty-bangladesh-138-ni-act', title: 'Section 138 NI Act Bangladesh – Penalties & How to Win', desc: 'Complete guide to cheque bounce penalties and court procedure' },
        ]}
        relatedServices={ALL_SERVICES}
    />
);

export default CompanyCorporateLawyer;
