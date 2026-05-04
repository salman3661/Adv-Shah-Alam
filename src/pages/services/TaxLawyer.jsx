import React from 'react';
import { Link } from 'react-router-dom';
import ServicePage from '../../components/ServicePage';

const TaxLawyer = () => (
    <ServicePage
        metaTitle="Tax & VAT Lawyer Dhaka | Advocate Shah Alam, Bangladesh"
        metaDesc="Fighting a tax notice in Bangladesh? Adv. Shah Alam handles income tax appeals, VAT disputes & NBR cases in Dhaka. Experienced tax lawyer. Free consultation."
        canonicalUrl="https://advmdshahalam.me/services/tax-lawyer"
        h1="Income Tax & VAT Lawyer in Dhaka – Bangladesh Tax Law Expert"
        intro="Advocate Md. Shah Alam is a knowledgeable <strong>income tax lawyer in Bangladesh</strong>, providing comprehensive legal representation in tax disputes, NBR assessments, VAT matters, and tax appeal proceedings. With extensive experience before the Taxes Appellate Tribunal and the High Court Division in revenue cases, Adv. Shah Alam helps individuals and businesses protect their financial interests."
        coverage={[
            'Income tax assessment disputes with NBR',
            'Tax appeal before Taxes Appellate Tribunal',
            'VAT registration, compliance, and dispute resolution',
            'Transfer pricing and international tax matters',
            'Tax evasion defense and penalty mitigation',
            'Source tax (TDS/TCS) dispute resolution',
            'Advance ruling applications on tax matters',
            'High Court Division appeals on tax law questions',
            'Tax ombudsman complaints',
            'Income tax exemption and return filing advice',
        ]}
        contextNote={
            <>
                When a tax dispute progresses beyond the Taxes Appellate Tribunal, the case may be referred to the High Court Division or even the Appellate Division on substantial questions of law. In such situations, Adv. Shah Alam's experience in{' '}
                <Link to="/services/supreme-court-lawyer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
                    Supreme Court representation
                </Link>{' '}
                ensures your tax appeal is argued with the highest level of legal precision at the apex court of Bangladesh.
            </>
        }
        faqItems={[
            {
                q: 'How do I file an income tax appeal in Bangladesh?',
                a: 'If you disagree with an assessment order from the Deputy Commissioner of Taxes (DCT), you must file an appeal before the Commissioner of Taxes (Appeals) within 30 days of receiving the order. Further appeals go to the Taxes Appellate Tribunal within 45 days. A final appeal on a legal question can be made to the High Court Division. A tax lawyer ensures proper grounds are raised at each stage.',
            },
            {
                q: 'What if I disagree with an NBR tax notice in Bangladesh?',
                a: 'Do not ignore an NBR notice. Engage an income tax lawyer promptly to review the notice, respond within the deadline, and challenge any incorrect assessment. Proper legal representation can significantly reduce tax liabilities and penalties.',
            },
            {
                q: 'How much does a tax lawyer cost in Dhaka?',
                a: 'Tax lawyer fees vary based on the complexity of the case, the amount in dispute, and the stage of proceedings. Advocate Shah Alam offers a free initial consultation to assess your tax matter and provide transparent fee estimates before engagement.',
            },
        ]}
        relatedBlogLinks={[
            { to: '/blog/artha-rin-adalat-loan-recovery-bangladesh', text: 'Loan Recovery (Artha Rin Adalat) – Legal Guide' },
            { to: '/blog/contract-breach-legal-action-bangladesh', text: 'Contract Breach – How to Take Legal Action' },
            { to: '/blog/how-to-file-legal-notice-bangladesh', text: 'How to Send a Legal Notice in Bangladesh' },
        ]}
        relatedServices={[
            { to: '/services/company-corporate-lawyer', label: 'Company & Corporate Lawyer – Dhaka' },
            { to: '/services/criminal-lawyer', label: 'Criminal Lawyer – Dhaka' },
            { to: '/services/supreme-court-lawyer', label: 'Supreme Court Lawyer – Bangladesh' },
            { to: '/services/land-lawyer', label: 'Land & Property Lawyer – Dhaka' },
            { to: '/services/bail-lawyer', label: 'Bail Lawyer – Fast Applications' },
            { to: '/services/divorce-lawyer', label: 'Divorce & Family Lawyer – Dhaka' },
        ]}
        ctaText="Talk to a Tax Lawyer in Dhaka"
    />
);

export default TaxLawyer;
