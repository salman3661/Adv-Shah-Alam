import React from 'react';
import { Link } from 'react-router-dom';
import ServicePage from '../../components/ServicePage';

const SupremeCourtLawyer = () => (
    <ServicePage
        metaTitle="Supreme Court Lawyer Bangladesh | Advocate Shah Alam"
        metaDesc="Adv. Shah Alam is your expert Supreme Court lawyer in Bangladesh for writ petitions, criminal appeals, High Court bail & Appellate Division matters. Consult now."
        canonicalUrl="https://advmdshahalam.me/services/supreme-court-lawyer"
        h1="Supreme Court Lawyer Bangladesh – High Court & Appellate Expert"
        intro="Advocate Md. Shah Alam is a seasoned <strong>Supreme Court lawyer in Bangladesh</strong>, practicing at the High Court Division and Appellate Division of the Supreme Court of Bangladesh. He handles writ petitions, constitutional matters, criminal appeals, civil appellate cases, and all High Court Division proceedings with precision and expertise built over two decades of practice."
        coverage={[
            'Writ petition (certiorari, mandamus, prohibition, quo warranto, habeas corpus)',
            'Criminal appeals from Sessions Court to High Court Division',
            'Civil appellate cases in High Court Division',
            'Constitutional law matters and fundamental rights violations',
            'High Court bail applications in serious criminal cases',
            'Appellate Division leave-to-appeal applications',
            'Administrative law and judicial review cases',
            'Company law and corporate disputes at High Court',
            'Tax and revenue appellate matters',
            'Contempt of court proceedings',
        ]}
        contextNote={
            <>
                High Court bail applications are among the most common Supreme Court matters. If you need urgent bail in a serious criminal case, Adv. Shah Alam's specialist{' '}
                <Link to="/services/bail-lawyer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
                    bail lawyer in Dhaka
                </Link>{' '}
                service is specifically dedicated to fast bail applications at all court levels. To understand your constitutional options, read our in-depth guide on{' '}
                <Link to="/blog/writ-petition-bangladesh" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
                    how to file a writ petition in Bangladesh
                </Link>
                .
            </>
        }
        faqItems={[
            {
                q: 'What types of cases does the High Court Division hear?',
                a: 'The High Court Division hears writ petitions under Article 102 of the Constitution, criminal appeals from Sessions Courts, civil appeals, company law matters, admiralty cases, and tax disputes. It also has original jurisdiction in certain matters and appellate jurisdiction over lower courts.',
            },
            {
                q: 'What is a writ petition in Bangladesh?',
                a: 'A writ petition is a constitutional remedy filed in the High Court Division under Article 102 of the Bangladesh Constitution. It is used to enforce fundamental rights, challenge illegal government actions, seek release from unlawful detention (habeas corpus), or compel a public authority to perform its duty (mandamus).',
            },
            {
                q: 'How do I appeal a Sessions Court decision to the High Court?',
                a: 'An appeal against a Sessions Court verdict (criminal or civil) must be filed in the High Court Division within the specified limitation period — typically 60 to 90 days for criminal appeals. The appeal must clearly state grounds of law or fact on which the lower court erred. An experienced Supreme Court lawyer is essential for proper framing of appellate arguments.',
            },
        ]}
        ctaText="Consult a Supreme Court Lawyer in Bangladesh"
    />
);

export default SupremeCourtLawyer;
