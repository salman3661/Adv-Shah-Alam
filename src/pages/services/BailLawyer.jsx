import React from 'react';
import ServicePage from '../../components/ServicePage';

const ALL_SERVICES = [
    { label: 'Divorce & Family Lawyer – Dhaka',        to: '/services/divorce-lawyer' },
    { label: 'Criminal Lawyer – Uttara, Dhaka',        to: '/services/criminal-lawyer' },
    { label: 'Land & Property Lawyer – Dhaka',         to: '/services/land-lawyer' },
    { label: 'Supreme Court Lawyer – Bangladesh',       to: '/services/supreme-court-lawyer' },
    { label: 'Company & Corporate Lawyer – Dhaka',     to: '/services/company-corporate-lawyer' },
    { label: 'Tax & VAT Lawyer – Bangladesh',          to: '/services/tax-lawyer' },
];

const BailLawyer = () => (
    <ServicePage
        metaTitle="Bail Lawyer in Bangladesh (2026) – Fast Bail Applications in Dhaka | Adv. Shah Alam"
        metaDesc="Arrested in Bangladesh? Get urgent bail from a top bail lawyer in Dhaka. Magistrate, Sessions & High Court bail — same-day filing available. 20+ years experience. Call now."
        canonicalUrl="https://advmdshahalam.me/services/bail-lawyer"
        h1="Bail Lawyer in Bangladesh (2026) – Urgent Bail Applications in Dhaka & High Court"
        intro="Advocate Md. Shah Alam is Bangladesh's trusted <strong>bail lawyer in Dhaka</strong>, known for securing urgent bail applications at every court level — from Magistrate hearings to the High Court Division and Appellate Division. Whether facing a bailable offence or a serious non-bailable charge, Adv. Shah Alam acts with speed and legal precision. Anticipatory bail, High Court bail, and emergency same-day applications are a core specialisation."
        coverage={[
            'Regular bail applications — Magistrate Court (bailable & non-bailable)',
            'Sessions Court bail for serious non-bailable offences',
            'Anticipatory bail (pre-arrest bail) — before arrest occurs',
            'High Court Division bail — when lower courts refuse',
            'Appellate Division bail for exceptional cases',
            'Bail for murder, assault, robbery & serious criminal charges',
            'Bail for financial crimes, fraud & cheque dishonour cases',
            'Narcotics (BNST), Arms Act & special tribunal bail',
            'Bail after remand and police custody release',
            'Bail bond (surety) preparation and court compliance',
            'Bail violation matters — cancellation and reapplication',
            'Emergency same-day bail filing for urgent arrests',
        ]}
        contextNote="Bail matters are often linked to the underlying criminal charge. Adv. Shah Alam handles both bail and the full criminal defence — ensuring a consistent, strategic legal defence from custody through trial."
        faqItems={[
            {
                q: 'How to get bail in Bangladesh for a non-bailable offence?',
                a: 'For non-bailable offences, bail must be sought from the Sessions Court or the High Court Division. The application must present compelling grounds — such as no prior criminal record, health issues, weak prosecution case, or long pre-trial detention. An experienced bail lawyer prepares the petition, files promptly, and argues effectively before the court.',
            },
            {
                q: 'What is anticipatory bail in Bangladesh and how does it work?',
                a: 'Anticipatory bail is applied for before arrest when a person has reasonable grounds to believe they will be arrested. It is filed in the Sessions Court (faster) or High Court Division. If granted, police must release the applicant immediately upon any arrest. Apply at the first sign of an FIR — do not wait for a warrant.',
            },
            {
                q: 'How quickly can bail be obtained in Bangladesh?',
                a: 'For bailable offences, bail can be obtained within hours of arrest. For non-bailable matters, a well-prepared application is typically heard within 1–3 days in Magistrate/Sessions Courts. High Court bail takes 1–3 weeks, but interim protection can sometimes be obtained the same day of filing.',
            },
            {
                q: 'What happens if bail is refused by the Magistrate Court?',
                a: 'A Magistrate refusal is NOT the end. File a fresh bail application immediately at the Sessions Court — this is an independent hearing, not technically an appeal. If Sessions Court also refuses, apply to the High Court Division. Each application is heard on its own merits. A bail refusal at one level does not bind higher courts.',
            },
            {
                q: 'What documents are needed for a bail application in Bangladesh?',
                a: 'Key documents: FIR copy (lawyer can obtain), NID of the accused, surety\'s NID and property/land documents (or government employment certificate), copy of charge sheet (if filed), medical certificate (if health is cited), character references, and employment documents showing community ties. Your lawyer will compile everything.',
            },
            {
                q: 'Can bail be obtained for narcotics and drug cases in Bangladesh?',
                a: 'Narcotics cases under the Narcotics Control Act have special bail restrictions at lower court levels. However, the High Court regularly grants bail in narcotics cases where: the accused is a first offender, the quantity seized is small, the evidence is weak or procedurally flawed, or the accused has been in custody for a long period. A High Court bail application is almost always the right route.',
            },
        ]}
        ctaText="Need Urgent Bail? Contact Us Now"
        relatedBlogLinks={[
            { to: '/blog/bail-process-bangladesh', title: 'How to Get Bail in Bangladesh (2026) – Complete Guide', desc: 'All bail types, eligibility, court levels, costs, and step-by-step process' },
            { to: '/blog/anticipatory-bail-bangladesh', title: 'Anticipatory Bail Bangladesh – Before Arrest Guide', desc: 'Who qualifies, how to apply, and what happens if it is refused' },
            { to: '/blog/bail-refusal-appeal-bangladesh', title: 'Bail Refused? How to Appeal to High Court (2026)', desc: 'Step-by-step guide to Sessions Court and High Court bail after refusal' },
            { to: '/blog/narcotics-case-law-bangladesh', title: 'Narcotics Case Bangladesh – Bail & Defence Guide', desc: 'How to fight narcotics charges and secure bail at every court level' },
            { to: '/blog/how-to-stop-false-criminal-case-bangladesh', title: 'How to Stop a False Criminal Case in Bangladesh', desc: 'Legal strategies to fight fabricated FIRs and quash false cases' },
        ]}
        relatedServices={ALL_SERVICES}
    />
);

export default BailLawyer;
