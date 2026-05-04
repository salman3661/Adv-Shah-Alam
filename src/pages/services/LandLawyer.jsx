import React from 'react';
import ServicePage from '../../components/ServicePage';

const ALL_SERVICES = [
    { label: 'Divorce & Family Lawyer – Dhaka',        to: '/services/divorce-lawyer' },
    { label: 'Criminal Lawyer – Uttara, Dhaka',        to: '/services/criminal-lawyer' },
    { label: 'Bail Lawyer – Fast Applications',         to: '/services/bail-lawyer' },
    { label: 'Supreme Court Lawyer – Bangladesh',       to: '/services/supreme-court-lawyer' },
    { label: 'Company & Corporate Lawyer – Dhaka',     to: '/services/company-corporate-lawyer' },
    { label: 'Tax & VAT Lawyer – Bangladesh',          to: '/services/tax-lawyer' },
];

const LandLawyer = () => (
    <ServicePage
        metaTitle="Land Lawyer in Bangladesh (2026) – Property & Mutation Expert in Dhaka | Adv. Shah Alam"
        metaDesc="Land dispute in Bangladesh? Advocate Shah Alam resolves title suits, mutation fraud, partition cases & property registration in Dhaka. 20+ years experience. Free consultation."
        canonicalUrl="https://advmdshahalam.me/services/land-lawyer"
        h1="Land & Property Lawyer in Bangladesh (2026) – Land Dispute Expert in Dhaka"
        intro="Advocate Md. Shah Alam is a trusted <strong>land and property lawyer in Dhaka, Bangladesh</strong>, specialising in resolving complex land disputes, title suits, mutation fraud, and property transactions across Bangladesh. With 20+ years of hands-on experience in civil courts, High Court writ proceedings, and the Sub-Registrar system — Adv. Shah Alam provides expert legal counsel and decisive courtroom representation to protect your land rights."
        coverage={[
            'Title suit and declaration of land ownership in civil court',
            'Partition suit for inherited or jointly-owned property',
            'Land mutation (namjari) disputes — AC Land & Revenue Court',
            'Fraudulent mutation challenge and cancellation',
            'Property registration — Sub-Registrar process & deed drafting',
            'Khas land, waqf, and government land matters',
            'Land fraud and forgery of deed criminal cases',
            'Eviction and illegal possession recovery cases',
            'Deed cancellation and injunction (stay order) applications',
            'RS/BS khatian, CS porcha & survey record disputes',
            'Property boundary and wall encroachment cases',
            'Pre-purchase land title verification and due diligence',
        ]}
        contextNote="Land cases in Bangladesh often span both civil courts and the AC Land office simultaneously. Adv. Shah Alam's dual expertise in civil litigation and revenue administration provides comprehensive protection for your property rights."
        faqItems={[
            {
                q: 'How do I resolve a land dispute in Bangladesh?',
                a: 'Land disputes are resolved through civil courts by filing the appropriate suit (title suit, partition suit, or injunction application). Key documents needed: registered sale deed, mutation khatian, RS/BS khatian, DCR (khajna receipt), and possession evidence. A land lawyer reviews your documents, advises on the strongest legal strategy, and represents you throughout the case.',
            },
            {
                q: 'What is land mutation (namjari) and why is it essential?',
                a: 'Mutation (namjari) is the administrative process of updating the government land revenue record (khatian) so your name appears as the new owner after buying, inheriting, or receiving land as a gift. Without mutation: banks won\'t grant mortgage loans, future buyers will reject the property, and fraudsters can mutate the land in their own name while yours remains unmutated. Complete mutation immediately after any land transaction.',
            },
            {
                q: 'What is a partition suit and when is it needed?',
                a: 'A partition suit is filed when co-owners (usually siblings or heirs) of inherited or joint property cannot agree on how to divide it. The civil court determines each party\'s share based on their legal entitlement and orders either physical partition (separate plots) or monetary compensation (buyout). Adv. Shah Alam regularly handles partition suits for family property in Dhaka and across Bangladesh.',
            },
            {
                q: 'How long does a land dispute case take in Bangladesh?',
                a: 'A straightforward title suit or partition suit typically takes 2–5 years in civil court. Cases with multiple parties, complex title chains, or overlapping criminal allegations can take longer. With strong documentation, early injunctions to prevent alienation of the property, and aggressive legal management, many cases resolve faster than average.',
            },
            {
                q: 'What can I do if someone has fraudulently mutated my land?',
                a: 'Act immediately: (1) File a complaint with the AC Land office to cancel the fraudulent mutation; (2) File a criminal FIR under Sections 420, 467, 468, 471 of the Penal Code for forgery and cheating; (3) File a civil title suit for declaration of your ownership; (4) Apply for an injunction (stay order) to prevent any further sale or transfer. Every day of delay worsens your legal position.',
            },
            {
                q: 'How do I verify land ownership before buying property in Bangladesh?',
                a: 'Before purchasing, conduct: (1) Khatian verification — check CS, SA, RS, BS khatian at the AC Land office or land.gov.bd; (2) Sub-Registrar search — verify all registered deeds for the plot over the past 12–30 years; (3) Physical inspection — confirm seller\'s actual possession; (4) Mutation check — confirm the seller\'s name appears in the current khatian. A property lawyer can conduct all these searches for you.',
            },
        ]}
        ctaText="Consult a Land Lawyer in Dhaka Today"
        relatedBlogLinks={[
            { to: '/blog/mutation-process-bangladesh', title: 'Land Mutation (Namjari) Bangladesh (2026) – Complete Guide', desc: 'AC Land process, documents, fees, timeline and what to do if refused' },
            { to: '/blog/land-law-bangladesh-complete-guide', title: 'Land Law Bangladesh – Complete Legal Guide (2026)', desc: 'Comprehensive A-Z guide to land ownership, disputes, and remedies' },
            { to: '/blog/land-dispute-legal-remedies-bangladesh', title: 'Land Dispute Bangladesh – Legal Remedies & How to Win', desc: 'Title suits, partition suits, injunctions and criminal remedies for land fraud' },
            { to: '/blog/how-to-register-land-bangladesh', title: 'How to Register Land in Bangladesh (2026)', desc: 'Sub-Registrar process, stamp duty, required documents, and deed registration' },
            { to: '/blog/namjari-online-check-land-record-bangladesh', title: 'Check Land Records Online in Bangladesh – Khatian Guide', desc: 'How to check khatian, RS porcha and mutation status at land.gov.bd' },
        ]}
        relatedServices={ALL_SERVICES}
    />
);

export default LandLawyer;
