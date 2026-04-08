import React from 'react';
import { Link } from 'react-router-dom';
import ServicePage from '../../components/ServicePage';

const LandLawyer = () => (
    <ServicePage
        metaTitle="Land Dispute Lawyer Uttara – Property, Mutation & Title | Adv. Shah Alam"
        metaDesc="Resolve land disputes, property registration & mutation in Dhaka. Expert land lawyer in Uttara – 20+ years experience. Free consultation. Call Adv. Shah Alam now."
        canonicalUrl="https://www.advmdshahalam.me/services/land-lawyer"
        h1="Land & Property Lawyer in Uttara – Land Dispute Expert in Dhaka"
        intro="Advocate Md. Shah Alam is a trusted <strong>land dispute lawyer in Uttara, Dhaka</strong>, skilled in resolving complex land and property cases across Bangladesh. From title disputes and illegal possession to mutation fraud and property registration — Adv. Shah Alam provides expert legal counsel and strong courtroom representation to protect your property rights."
        coverage={[
            'Title suit and declaration of land ownership',
            'Partition suit for joint family/shared property',
            'Khas land, waqf, and government land matters',
            'Property mutation (namjari) disputes',
            'Property registration and document verification',
            'Land fraud and forgery of deed cases',
            'Eviction and illegal possession cases',
            'Deed cancellation and injunction applications',
            'RS/BS khatian, CS record, and survey disputes',
            'Property boundary and wall cases',
        ]}
        contextNote={
            <>
                Two of the most common steps in any property transaction are mutation and registration. Our detailed guide on the{' '}
                <Link to="/blog/mutation-process-bangladesh" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
                    mutation process in Bangladesh
                </Link>{' '}
                explains how to transfer land records to your name, while the step-by-step{' '}
                <Link to="/blog/property-registration-process" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
                    property registration process
                </Link>{' '}
                covers deed registration, stamp duties, and required documentation at the Sub-Registrar office.
            </>
        }
        faqItems={[
            {
                q: 'How do I solve a land dispute case in Bangladesh?',
                a: 'Land disputes are typically resolved through civil courts by filing a title suit, partition suit, or injunction application. Key documents include deed of sale, mutation records, RS/BS khatian, and possession evidence. A land dispute lawyer can review your documents, advise on the best legal strategy, and represent you in civil court.',
            },
            {
                q: 'What is a partition suit and when is it needed?',
                a: "A partition suit is filed when co-owners of a property (usually siblings or joint family members) cannot agree on how to divide inherited property. The court will determine each party's share and order physical or monetary partition.",
            },
            {
                q: 'How long does a land dispute case take in Bangladesh?',
                a: 'A straightforward title or partition suit may take 2–5 years in the civil court. With proper documentation, aggressive pleading, and an experienced property lawyer, many cases can be resolved faster through injunctions or out-of-court settlements.',
            },
        ]}
        ctaText="Consult a Land Dispute Lawyer in Uttara"
    />
);

export default LandLawyer;
