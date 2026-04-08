import React from 'react';
import { Link } from 'react-router-dom';
import ServicePage from '../../components/ServicePage';

const CompanyCorporateLawyer = () => (
    <ServicePage
        metaTitle="Company Lawyer Dhaka, Bangladesh | Advocate Shah Alam"
        metaDesc="Register a company or resolve corporate disputes in Bangladesh. Advocate Shah Alam handles RJSC filings, shareholder disputes & corporate litigation in Dhaka."
        canonicalUrl="https://www.advmdshahalam.me/services/company-corporate-lawyer"
        h1="Company & Corporate Lawyer in Dhaka – Bangladesh Business Law Expert"
        intro="Advocate Md. Shah Alam provides comprehensive <strong>company and corporate legal services in Bangladesh</strong>, advising businesses, entrepreneurs, and investors on formation, compliance, disputes, and commercial transactions under the Companies Act 1994. With strong courtroom experience and practical business insight, Adv. Shah Alam helps protect your commercial interests at every stage."
        coverage={[
            'Company formation and incorporation under the Companies Act 1994',
            'Shareholder agreements, partnership deeds, and joint venture contracts',
            'Shareholder and director disputes',
            'Corporate compliance and annual filing requirements',
            'Commercial contract drafting and review',
            'Business dissolution and winding-up proceedings',
            'Trade licence and business permit matters',
            'Corporate debt recovery and creditor rights',
            'Employment contract disputes for businesses',
            'General business legal advisory for SMEs and corporates',
        ]}
        contextNote={
            <>
                For company disputes that escalate to the High Court Division — including oppression and mismanagement petitions under the Companies Act — Adv. Shah Alam's experience in{' '}
                <Link to="/services/supreme-court-lawyer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
                    Supreme Court representation
                </Link>{' '}
                ensures your corporate matter is argued at the highest level of legal expertise in Bangladesh.
            </>
        }
        faqItems={[
            {
                q: 'How do I register a company in Bangladesh?',
                a: 'Company registration in Bangladesh is done through the Registrar of Joint Stock Companies and Firms (RJSC). Steps include reserving a company name, preparing a Memorandum and Articles of Association, submitting required documents, and paying the registration fee. An experienced company lawyer can guide you through the process and ensure compliance from day one.',
            },
            {
                q: 'What can I do if a business partner breaches our partnership agreement?',
                a: 'If a business partner breaches a partnership agreement, you may pursue civil remedies including damages, account of profits, or dissolution of the partnership through court. A corporate lawyer can review your agreement, assess the breach, and advise on the most effective legal strategy to protect your investment.',
            },
            {
                q: 'Can a shareholder sue the company directors in Bangladesh?',
                a: 'Yes. Under the Companies Act 1994, shareholders may file a petition before the High Court Division alleging oppression or mismanagement by directors. The court can make orders to remedy the situation including regulating the company\'s affairs or even ordering a buyout of shares.',
            },
        ]}
        ctaText="Talk to a Company Lawyer in Dhaka"
    />
);

export default CompanyCorporateLawyer;
