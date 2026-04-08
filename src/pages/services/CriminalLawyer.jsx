import React from 'react';
import { Link } from 'react-router-dom';
import ServicePage from '../../components/ServicePage';

const CriminalLawyer = () => (
    <ServicePage
        metaTitle="Criminal Lawyer in Bangladesh | Advocate Shah Alam"
        metaDesc="Arrested or facing criminal charges? Advocate Shah Alam provides expert criminal defence, FIR help and bail in Uttara – Dhaka, Bangladesh. Call now."
        canonicalUrl="https://www.advmdshahalam.me/services/criminal-lawyer"
        h1="Criminal Lawyer in Uttara – Expert Criminal Defense in Dhaka"
        intro="Advocate Md. Shah Alam is an experienced <strong>criminal lawyer in Uttara, Dhaka</strong> with 20+ years of proven expertise in criminal defense, FIR matters, bail applications, and trial representation before Sessions Courts and the Supreme Court of Bangladesh. Whether you face a misdemeanor or serious criminal charge, Adv. Shah Alam delivers strategic, results-driven legal defense."
        coverage={[
            'FIR (First Information Report) cases and police station matters',
            'Criminal trial representation in Magistrate & Sessions Courts',
            'Bail applications — bailable and non-bailable offences',
            'Criminal appeals in High Court Division',
            'Murder, robbery, assault, fraud, and financial crime defense',
            'Narcotic control law cases (BTRC, BNST)',
            'Arms Act and special tribunal cases',
            'Case dismissal applications and quashing of chargesheet',
            'Anticipatory bail petitions in High Court',
            'Pre-arrest legal consultation and rights protection',
        ]}
        contextNote={
            <>
                When facing criminal charges, securing bail at the earliest opportunity is critical — our dedicated{' '}
                <Link to="/services/bail-lawyer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
                    bail lawyer in Dhaka
                </Link>{' '}
                service handles both bailable and non-bailable applications with urgency. For criminal matters that escalate to the higher judiciary, Adv. Shah Alam also provides experienced{' '}
                <Link to="/services/supreme-court-lawyer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
                    Supreme Court representation
                </Link>{' '}
                before the Appellate Division of Bangladesh.
            </>
        }
        faqItems={[
            {
                q: 'What should I do if an FIR is filed against me in Bangladesh?',
                a: 'Contact a criminal lawyer immediately. Do not make any statements to police without legal advice. Your lawyer can review the FIR, assess the charges, apply for anticipatory bail if needed, and build a defense strategy from the earliest stage.',
            },
            {
                q: 'Can you get bail in a non-bailable criminal case in Bangladesh?',
                a: 'Yes — for non-bailable offences, bail must be sought from the Sessions Court or the High Court Division. The court considers factors like gravity of offence, flight risk, and past conduct. An experienced criminal lawyer can present compelling arguments to secure bail.',
            },
            {
                q: 'How long does a criminal case take in Bangladesh?',
                a: 'Magistrate Court cases may be resolved in 6–18 months. Sessions Court cases typically take 2–5 years. Expeditious legal action, strong evidence preparation, and regular follow-up can help shorten the timeline.',
            },
        ]}
        ctaText="Talk to a Criminal Lawyer in Uttara Today"
    />
);

export default CriminalLawyer;
