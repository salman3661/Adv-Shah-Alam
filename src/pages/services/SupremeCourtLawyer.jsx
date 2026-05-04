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
        metaTitle="Supreme Court & High Court Lawyer — Writs, Appeals & Bail | Bangladesh"
        metaDesc="Lower court failed you? Adv. Shah Alam handles writ petitions, criminal appeals & High Court bail. 20+ years at the Supreme Court."
        canonicalUrl="https://advmdshahalam.me/services/supreme-court-lawyer"
        h1="Supreme Court Lawyer in Bangladesh — High Court & Appellate Division"
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
        contextNote="The Supreme Court of Bangladesh has two divisions — the High Court Division and the Appellate Division. Adv. Shah Alam practices in both. <a href='/services/bail-lawyer' style='color:var(--accent);text-decoration:underline'>High Court bail</a> is one of the most common Supreme Court matters — contact us immediately if lower court bail has been refused. We also handle appeals from <a href='/services/criminal-lawyer' style='color:var(--accent);text-decoration:underline'>criminal trial convictions</a> and civil court judgments."
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
        howWeHelp={{
            problems: [
                'The lower court gave an unjust verdict and you want to appeal',
                'A government authority has made an illegal decision against you',
                'Bail was refused at every lower court level',
                'You need a writ petition to protect your fundamental rights',
            ],
            steps: [
                { step: 'Case Review', desc: 'We study the lower court judgment and identify grounds for appeal' },
                { step: 'Petition Drafting', desc: 'Writ petition, criminal appeal, or civil appeal — meticulously prepared' },
                { step: 'High Court Filing', desc: 'Case filed at the Supreme Court with all supporting documents' },
                { step: 'Hearing & Judgment', desc: 'Adv. Shah Alam argues your case before the High Court or Appellate Division' },
            ],
            scenario: 'A garment factory owner received an arbitrary tax demand from the NBR with no proper hearing. The Taxes Appellate Tribunal upheld it. Advocate Shah Alam filed a writ petition in the High Court Division challenging the assessment as a violation of natural justice. The High Court struck down the demand and ordered a fresh hearing — saving the business over BDT 80 lakh.',
            cta: 'When lower courts fail, the Supreme Court is your answer. Consult Advocate Shah Alam today.',
        }}
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
