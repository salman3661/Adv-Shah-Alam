import React from 'react';
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
        contextNote="When a tax dispute progresses beyond the Taxes Appellate Tribunal, the case may be referred to the <a href='/services/supreme-court-lawyer' style='color:var(--accent);text-decoration:underline'>High Court Division on a question of law</a>. Adv. Shah Alam's experience at the apex court ensures your tax appeal is argued with precision. For businesses needing integrated <a href='/services/company-corporate-lawyer' style='color:var(--accent);text-decoration:underline'>corporate and tax advisory</a>, we provide end-to-end counsel."
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
        howWeHelp={{
            problems: [
                'You received a tax demand notice from the NBR that seems wrong',
                'Your business is being audited and you need legal representation',
                'A VAT dispute is threatening your company operations',
                'You need to appeal a tax assessment before the Taxes Appellate Tribunal',
            ],
            steps: [
                { step: 'Tax Review', desc: 'We analyse your tax notice, assessment, or dispute documents' },
                { step: 'Legal Strategy', desc: 'Appeal, objection, or tribunal hearing — we choose the strongest path' },
                { step: 'Representation', desc: 'Adv. Shah Alam represents you before NBR, VAT authorities, or Tribunal' },
                { step: 'Resolution', desc: 'Tax demand reduced, penalty waived, or assessment overturned' },
            ],
            scenario: 'A Dhaka-based import business received a VAT demand of BDT 45 lakh for alleged under-declaration. Advocate Shah Alam reviewed the assessment records, identified procedural errors in the audit, and filed an appeal before the VAT Appellate Tribunal. The demand was reduced by 70% — saving the business over BDT 31 lakh.',
            cta: 'Tax disputes can be resolved. Call Advocate Shah Alam for a free initial assessment.',
        }}
        ctaText="Consult a Tax Lawyer in Dhaka"
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
