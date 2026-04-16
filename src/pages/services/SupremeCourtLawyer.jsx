import React from 'react';
import ServicePage from '../../components/ServicePage';

const ALL_SERVICES = [
    { label: 'Divorce & Family Lawyer – Dhaka',        to: '/services/divorce-lawyer' },
    { label: 'Criminal Lawyer – Uttara, Dhaka',        to: '/services/criminal-lawyer' },
    { label: 'Bail Lawyer – Fast Applications',         to: '/services/bail-lawyer' },
    { label: 'Land & Property Lawyer – Dhaka',         to: '/services/land-lawyer' },
    { label: 'Company & Corporate Lawyer – Dhaka',     to: '/services/company-corporate-lawyer' },
    { label: 'Tax & VAT Lawyer – Bangladesh',          to: '/services/tax-lawyer' },
];

const SupremeCourtLawyer = () => (
    <ServicePage
        metaTitle="Supreme Court Lawyer in Bangladesh (2026) – High Court & Appellate Expert | Adv. Shah Alam"
        metaDesc="Need a Supreme Court lawyer in Bangladesh? Advocate Shah Alam handles writ petitions, criminal appeals, High Court bail & Appellate Division matters. 20+ years experience. Consult now."
        canonicalUrl="https://www.advmdshahalam.me/services/supreme-court-lawyer"
        h1="Supreme Court Lawyer in Bangladesh (2026) – High Court & Appellate Division Expert"
        intro="Advocate Md. Shah Alam is a seasoned <strong>Supreme Court lawyer in Bangladesh</strong>, practicing at the High Court Division and Appellate Division of the Supreme Court of Bangladesh. With 20+ years of experience before the highest courts in the country, he handles writ petitions, constitutional matters, criminal appeals, civil appellate cases, High Court bail applications, and administrative law proceedings with precision and deep expertise."
        coverage={[
            'Writ petition under Article 102 — certiorari, mandamus, prohibition, habeas corpus',
            'Criminal appeals from Sessions Court to High Court Division',
            'Civil appellate cases — first appeal and second appeal',
            'Constitutional law and fundamental rights violation cases',
            'High Court Division bail applications for serious criminal cases',
            'Appellate Division leave-to-appeal and civil petition applications',
            'Administrative law and judicial review of government decisions',
            'Company law disputes and corporate petitions at High Court',
            'Tax and revenue appellate matters — VAT Tribunal appeals',
            'Contempt of court proceedings — both civil and criminal',
            'Habeas corpus applications for illegal detention',
            'Stay orders and injunctions from High Court',
        ]}
        contextNote="The Supreme Court of Bangladesh has two divisions — the High Court Division (ordinary and appellate jurisdiction) and the Appellate Division (final appellate court). Adv. Shah Alam practices in both. High Court bail is one of the most common Supreme Court matters — contact us immediately if lower court bail has been refused."
        faqItems={[
            {
                q: 'What types of cases does the High Court Division hear in Bangladesh?',
                a: 'The High Court Division has multiple jurisdictions: (1) Original jurisdiction — company law petitions, admiralty, contempt; (2) Appellate jurisdiction — appeals from Sessions Courts, civil courts, and tribunals; (3) Constitutional jurisdiction — writ petitions under Article 102; (4) Supervisory jurisdiction — overseeing all subordinate courts in Bangladesh.',
            },
            {
                q: 'What is a writ petition in Bangladesh and when should I file one?',
                a: 'A writ petition is filed in the High Court Division under Article 102 of the Bangladesh Constitution to: enforce fundamental rights (habeas corpus for unlawful detention, mandamus to compel a public authority to act), challenge illegal government decisions or administrative actions, quash illegal orders of lower courts or tribunals. A writ is the most powerful legal remedy in Bangladesh — it directly reaches the constitutional court.',
            },
            {
                q: 'How do I appeal a Sessions Court criminal conviction to the High Court?',
                a: 'An appeal against a Sessions Court criminal verdict must be filed in the High Court Division within the limitation period — typically 60 days for criminal appeals. The appeal must specify grounds of law or fact where the lower court erred. Strong appellate arguments require: careful reading of the trial judgment, identification of factual errors or legal misapplication, and experienced High Court criminal advocacy.',
            },
            {
                q: 'Can I get bail from the High Court if a lower court has refused?',
                a: 'Yes — and this is one of the most common Supreme Court applications. The High Court hears bail applications entirely independently of lower court refusals. The High Court regularly grants bail in murder, narcotics, fraud, and cyber crime cases where: the prosecution evidence is weak, the accused has been held for a long period, or there are health or family circumstances to consider. Act immediately after a Sessions Court refusal.',
            },
            {
                q: 'What is the Appellate Division of the Supreme Court?',
                a: 'The Appellate Division is the highest court in Bangladesh — the final court of appeal. It hears: (1) Appeals from High Court Division judgments; (2) Leave-to-appeal petitions (civil petitions for leave); (3) Criminal petitions from confirmed High Court verdicts. The Appellate Division only hears cases involving substantial questions of law — ordinary fact disputes are not entertained at this level.',
            },
            {
                q: 'How long does a High Court case take in Bangladesh?',
                a: 'High Court writ petitions: 6 months to 3+ years depending on complexity and urgency. Criminal appeals: 1–5 years. High Court bail applications: 1–4 weeks for a hearing. Urgent matters (habeas corpus, urgent stay applications) can be heard the same day of filing in genuine emergencies. Interim orders are often obtained much faster than the final judgment.',
            },
        ]}
        ctaText="Consult a Supreme Court Lawyer in Bangladesh"
        relatedBlogLinks={[
            { to: '/blog/writ-petition-high-court-bangladesh', title: 'How to File a Writ Petition in Bangladesh (2026)', desc: 'When to go to High Court, types of writs, and the filing process' },
            { to: '/blog/bail-refusal-appeal-bangladesh', title: 'Bail Refused? How to Appeal to High Court (2026)', desc: 'Step-by-step High Court bail after Sessions Court refusal' },
            { to: '/blog/criminal-appeal-procedure-bangladesh', title: 'Criminal Appeal Procedure in Bangladesh – High Court Guide', desc: 'How to appeal a criminal conviction from Sessions Court to High Court' },
            { to: '/blog/bail-process-bangladesh', title: 'How to Get Bail in Bangladesh (2026) – Complete Guide', desc: 'All bail types, High Court bail, documents, costs, and timeline' },
            { to: '/blog/arrest-without-warrant-bangladesh', title: 'Arrested Without Warrant? Your Rights in Bangladesh', desc: 'Constitutional rights on arrest and how the High Court protects them' },
        ]}
        relatedServices={ALL_SERVICES}
    />
);

export default SupremeCourtLawyer;
