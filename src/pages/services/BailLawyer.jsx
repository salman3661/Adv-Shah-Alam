import React from 'react';
import { Link } from 'react-router-dom';
import ServicePage from '../../components/ServicePage';

const BailLawyer = () => (
    <ServicePage
        metaTitle="Bail Lawyer in Dhaka | Advocate Shah Alam, Bangladesh"
        metaDesc="Need urgent release? Get help from a top Bail Lawyer in Dhaka. We secure same-day and anticipatory bail fast. Meet Adv. Shah Alam at his Uttara Chamber now."
        canonicalUrl="https://www.advmdshahalam.me/services/bail-lawyer"
        h1="Bail Lawyer in Dhaka – Fast Bail Applications Across Bangladesh"
        intro="Advocate Md. Shah Alam is a leading <strong>bail lawyer in Dhaka</strong>, known for handling urgent bail applications swiftly and effectively. Whether your case involves a bailable offence at the Magistrate Court or a serious non-bailable charge requiring High Court bail, Adv. Shah Alam has the expertise and court connections to act fast and protect your freedom."
        coverage={[
            'Regular bail applications in Magistrate Courts',
            'Sessions Court bail for non-bailable offences',
            'Anticipatory bail petitions (pre-arrest bail)',
            'High Court Division bail applications',
            'Bail in murder, rape, and serious criminal cases',
            'Bail for financial crimes and fraud cases',
            'Narcotics and arms act bail matters',
            'Bail violation and re-arrest matters',
            'Bail for foreign nationals in Bangladesh',
            'Emergency same-day bail filing',
        ]}
        contextNote={
            <>
                Bail matters are often closely connected to the underlying criminal charge. If you are facing a criminal case alongside your bail application, Adv. Shah Alam's dedicated{' '}
                <Link to="/services/criminal-lawyer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
                    criminal lawyer in Uttara
                </Link>{' '}
                service covers FIR defence, trial representation, and charge-sheet quashing. For a plain-language overview of how bail works in Bangladesh, read our detailed guide on{' '}
                <Link to="/blog/bail-process-bangladesh" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
                    the bail process in Bangladesh
                </Link>
                .
            </>
        }
        faqItems={[
            {
                q: 'How to get bail in Bangladesh for a non-bailable offence?',
                a: 'For non-bailable offences, bail must be sought from the Sessions Court or the High Court Division of the Supreme Court. The application must present compelling grounds — such as no prior record, health issues, cooperation with investigation, or weak prosecution case. A skilled bail lawyer in Dhaka will prepare the application, file promptly, and argue before the court.',
            },
            {
                q: 'What is anticipatory bail in Bangladesh?',
                a: 'Anticipatory bail (pre-arrest bail) is applied for when someone fears imminent arrest. It is filed before the arrest occurs, in the Sessions Court or High Court. If granted, it prevents arrest on the specific charge. This type of bail requires thorough legal arguments and is best handled by an experienced advocate.',
            },
            {
                q: 'How quickly can bail be obtained in Bangladesh?',
                a: 'In bailable cases, bail can sometimes be obtained within hours of arrest. For non-bailable matters, a well-prepared application can be heard within 1–3 days. High Court bail may take 1–2 weeks. Urgent cases are given priority. Contact Adv. Shah Alam immediately for the fastest possible bail assistance.',
            },
        ]}
        ctaText="Need Urgent Bail? Contact Us Now"
    />
);

export default BailLawyer;
