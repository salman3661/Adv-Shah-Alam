import React from 'react';
import ServicePage from '../../components/ServicePage';

const ALL_SERVICES = [
    { label: 'Divorce & Family Lawyer – Dhaka',        to: '/services/divorce-lawyer' },
    { label: 'Bail Lawyer – Fast Applications',         to: '/services/bail-lawyer' },
    { label: 'Land & Property Lawyer – Dhaka',         to: '/services/land-lawyer' },
    { label: 'Supreme Court Lawyer – Bangladesh',       to: '/services/supreme-court-lawyer' },
    { label: 'Company & Corporate Lawyer – Dhaka',     to: '/services/company-corporate-lawyer' },
    { label: 'Tax & VAT Lawyer – Bangladesh',          to: '/services/tax-lawyer' },
];

const CriminalLawyer = () => (
    <ServicePage
        metaTitle="Criminal Lawyer in Bangladesh (2026) – Expert Criminal Defence in Dhaka | Adv. Shah Alam"
        metaDesc="Facing criminal charges in Bangladesh? Advocate Shah Alam provides expert criminal defence — FIR, bail, trial & High Court appeals. 20+ years experience in Dhaka courts. Call now."
        canonicalUrl="https://www.advmdshahalam.me/services/criminal-lawyer"
        h1="Criminal Lawyer in Bangladesh (2026) – Expert Criminal Defence in Dhaka"
        intro="Advocate Md. Shah Alam is a highly experienced <strong>criminal lawyer in Dhaka, Bangladesh</strong> with 20+ years of proven expertise in criminal defence, FIR matters, bail applications, and trial representation before Magistrate Courts, Sessions Courts, and the Supreme Court of Bangladesh. Whether you face a minor charge or the most serious criminal case, Adv. Shah Alam delivers strategic, results-driven legal defence from arrest through final judgment."
        coverage={[
            'FIR (First Information Report) — defence, quashing & police matters',
            'Criminal trial representation — Magistrate & Sessions Courts',
            'Bail applications — bailable and non-bailable offences, all courts',
            'Criminal appeals in High Court Division & Appellate Division',
            'Murder, assault, robbery, fraud & financial crime defence',
            'Narcotics Control Act cases — bail & trial defence',
            'Arms Act and special tribunal cases',
            'Charge sheet (challan) quashing applications',
            'Anticipatory bail petitions in Sessions Court & High Court',
            'Digital Security Act / Cyber Security Act criminal defence',
            'False FIR defence — quashing and harassment cases',
            'Pre-arrest consultation, rights protection & strategy',
        ]}
        contextNote="In criminal cases, speed matters enormously. From the moment of arrest, every decision affects the outcome — bail, remand, charge framing, and trial strategy all require expert legal handling. Adv. Shah Alam is available for urgent consultation in Dhaka."
        faqItems={[
            {
                q: 'What should I do immediately if an FIR is filed against me in Bangladesh?',
                a: 'Contact a criminal lawyer immediately — before making any statement to police. Your lawyer will: (1) Review the FIR and assess the charges; (2) Apply for anticipatory bail if you have not yet been arrested; (3) Attend the police station with you if needed; (4) Build a defence strategy from day one. Do not speak to police without your lawyer present.',
            },
            {
                q: 'Can you get bail for a non-bailable criminal case in Bangladesh?',
                a: 'Yes — for non-bailable offences, bail is discretionary but can be obtained from the Sessions Court or High Court Division. Courts consider: gravity of offence, criminal record, flight risk, and strength of prosecution case. An experienced criminal lawyer can present compelling bail arguments even in serious cases.',
            },
            {
                q: 'How long does a criminal case take to resolve in Bangladesh?',
                a: 'Magistrate Court cases: 6–18 months for minor offences. Sessions Court cases (serious offences): 2–5 years. Cases involving multiple accused or complex evidence may take longer. Strong legal representation, regular hearing attendance, and proactive case management can significantly shorten the timeline.',
            },
            {
                q: 'What is the difference between bailable and non-bailable offences in Bangladesh?',
                a: 'Bailable offences: Bail is a legal right — police or Magistrate MUST grant it (examples: simple hurt, trespass, minor fraud). Non-bailable offences: Bail is discretionary — the court decides based on facts (examples: murder, robbery, rape, large-scale fraud, narcotics, cyber crimes). The CrPC First Schedule lists all bailable offences.',
            },
            {
                q: 'Can a false FIR be quashed in Bangladesh courts?',
                a: 'Yes. A false or malicious FIR can be challenged through: (1) Anticipatory bail — immediate protection from arrest; (2) Application to quash the FIR/chargesheet in the High Court Division under Article 102 of the Constitution (writ) or under Section 561A CrPC; (3) Filing a counter-FIR against the complainant for filing a false report. Early legal intervention gives the best chance of quashing.',
            },
            {
                q: 'What happens during police remand in Bangladesh and how can it be stopped?',
                a: 'Police remand means the accused is taken back to police custody for interrogation after production before a Magistrate. Remand is often used aggressively in Bangladesh. A lawyer can: (1) Object to the remand application and argue against it; (2) Apply for an interim bail or protective order; (3) File a writ in the High Court if remand is granted illegally or excessively. Act immediately — remand must be addressed the day of production before the Magistrate.',
            },
        ]}
        ctaText="Talk to a Criminal Lawyer in Dhaka Today"
        relatedBlogLinks={[
            { to: '/blog/bail-process-bangladesh', title: 'How to Get Bail in Bangladesh (2026) – Complete Guide', desc: 'All types of bail, required documents, court levels, and costs' },
            { to: '/blog/anticipatory-bail-bangladesh', title: 'Anticipatory Bail Bangladesh – Pre-Arrest Protection', desc: 'How to get bail before arrest and protect yourself from custody' },
            { to: '/blog/how-to-stop-false-criminal-case-bangladesh', title: 'How to Stop a False Criminal Case in Bangladesh', desc: 'Legal strategies: FIR quashing, anticipatory bail, counter-complaints' },
            { to: '/blog/police-remand-rights-bangladesh', title: 'Police Remand Rights in Bangladesh – Know Your Rights', desc: 'What remand is, your rights during it, and how to fight excessive remand' },
            { to: '/blog/arrest-without-warrant-bangladesh', title: 'Arrested Without Warrant in Bangladesh? Your Rights', desc: 'Constitutional rights after arrest and what police can and cannot do' },
        ]}
        relatedServices={ALL_SERVICES}
    />
);

export default CriminalLawyer;
