/**
 * cms/migrate-services.js
 * ──────────────────────────────────────────────────────────────────
 * Produces cms/data/services.json — ready to import into Directus.
 * Run with:  node cms/migrate-services.js
 * ──────────────────────────────────────────────────────────────────
 * Since service pages are JSX files (not data files), we hardcode
 * the props here based on the current file contents.
 * After import, edit them freely in the Directus dashboard.
 * ──────────────────────────────────────────────────────────────────
 */

import { writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, 'data');
mkdirSync(outDir, { recursive: true });

const BASE = 'https://www.advmdshahalam.me';

const services = [
    {
        status: 'published',
        slug: 'criminal-lawyer',
        h1: 'Criminal Lawyer in Uttara – Expert Criminal Defense in Dhaka',
        metaTitle: 'Criminal Lawyer in Uttara, Dhaka | Advocate Md. Shah Alam',
        metaDesc: 'Looking for a criminal lawyer in Uttara, Dhaka? Advocate Md. Shah Alam provides expert criminal defense — FIR cases, bail, trial representation, and appeals in all courts across Bangladesh.',
        canonicalUrl: `${BASE}/services/criminal-lawyer`,
        intro: 'Advocate Md. Shah Alam is an experienced <strong>criminal lawyer in Uttara, Dhaka</strong> with 20+ years of proven expertise in criminal defense, FIR matters, bail applications, and trial representation before Sessions Courts and the Supreme Court of Bangladesh.',
        coverage: [
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
        ],
        contextNote: 'When facing criminal charges, securing bail at the earliest opportunity is critical. For criminal matters that escalate to the higher judiciary, Adv. Shah Alam provides experienced Supreme Court representation before the Appellate Division of Bangladesh.',
        faqItems: [
            { q: 'What should I do if an FIR is filed against me in Bangladesh?', a: 'Contact a criminal lawyer immediately. Do not make any statements to police without legal advice. Your lawyer can review the FIR, assess the charges, apply for anticipatory bail if needed, and build a defense strategy from the earliest stage.' },
            { q: 'Can you get bail in a non-bailable criminal case in Bangladesh?', a: 'Yes — for non-bailable offences, bail must be sought from the Sessions Court or the High Court Division. The court considers factors like gravity of offence, flight risk, and past conduct. An experienced criminal lawyer can present compelling arguments to secure bail.' },
            { q: 'How long does a criminal case take in Bangladesh?', a: 'Magistrate Court cases may be resolved in 6–18 months. Sessions Court cases typically take 2–5 years. Expeditious legal action, strong evidence preparation, and regular follow-up can help shorten the timeline.' },
        ],
        ctaText: 'Talk to a Criminal Lawyer in Uttara Today',
        featuredImage: null,
        featuredImageAlt: 'Criminal Lawyer in Uttara Dhaka',
    },
    {
        status: 'published',
        slug: 'divorce-lawyer',
        h1: 'Divorce Lawyer in Uttara – Family Law Expert in Dhaka',
        metaTitle: 'Divorce Lawyer in Uttara, Dhaka | Advocate Md. Shah Alam',
        metaDesc: 'Expert divorce lawyer in Uttara, Dhaka. Advocate Md. Shah Alam handles Muslim divorce (talaq, khula), Family Court proceedings, child custody, maintenance, and mahr disputes across Bangladesh.',
        canonicalUrl: `${BASE}/services/divorce-lawyer`,
        intro: 'Advocate Md. Shah Alam is a trusted <strong>divorce lawyer in Uttara, Dhaka</strong> with extensive experience in Family Court proceedings, Muslim divorce (talaq and khula), judicial divorce, child custody, maintenance, and dower recovery.',
        coverage: [
            'Muslim divorce — talaq and khula procedures',
            'Judicial divorce through Family Court',
            'Mahr (dower) recovery and enforcement',
            'Wife\'s maintenance during marriage and after divorce',
            'Child custody and guardianship petitions',
            'Child maintenance — determination and enforcement',
            'Marriage registration (Kabinnama) verification and disputes',
            'Divorce certificate (divorce registration)',
            'Restitution of conjugal rights suits',
            'Non-Muslim divorce (Christian Marriage Act, Hindu separation)',
        ],
        contextNote: 'For divorce matters that involve international elements or appeals to the High Court Division, Adv. Shah Alam\'s Supreme Court practice ensures full-chain legal representation.',
        faqItems: [
            { q: 'How long does divorce take in Bangladesh?', a: 'A mutual divorce following MFLO procedure takes about 90 days plus registration. A contested Family Court divorce may take 6 months to 2 years depending on the complexity and court backlog.' },
            { q: 'Can a wife initiate divorce in Bangladesh?', a: 'Yes. A wife can seek khula (returning dower for release from marriage), file for mutual divorce, or bring a judicial divorce suit in Family Court on statutory grounds such as cruelty or desertion.' },
            { q: 'What happens to children after divorce in Bangladesh?', a: 'Custody is determined based on the best interests of the child. Mothers typically retain physical custody (hizanat) of young children, while fathers pay maintenance. The Family Court sets a visitation schedule for the non-custodial parent.' },
        ],
        ctaText: 'Talk to a Family Law Lawyer Today',
        featuredImage: null,
        featuredImageAlt: 'Divorce Lawyer in Uttara Dhaka',
    },
    {
        status: 'published',
        slug: 'land-lawyer',
        h1: 'Land & Property Lawyer in Uttara – Expert in Land Dispute Cases',
        metaTitle: 'Land & Property Lawyer in Uttara, Dhaka | Advocate Md. Shah Alam',
        metaDesc: 'Expert land and property lawyer in Uttara, Dhaka. Advocate Md. Shah Alam handles title suits, partition cases, injunctions, mutation, land fraud, and adverse possession across Bangladesh.',
        canonicalUrl: `${BASE}/services/land-lawyer`,
        intro: 'Advocate Md. Shah Alam is an experienced <strong>land and property lawyer in Uttara, Dhaka</strong>, providing expert legal representation in title disputes, partition suits, injunctions against encroachment, fraudulent deed cancellations, and all aspects of land litigation in Bangladesh.',
        coverage: [
            'Title declaration suits under Specific Relief Act 1877',
            'Partition suits for joint/inherited land',
            'Interim injunctions to stop encroachment',
            'Fraudulent deed cancellation cases',
            'Mutation (namjari) and land record disputes',
            'Adverse possession defence and claim',
            'Khatian and CS/SA/RS record verification',
            'Government land acquisition compensation disputes',
            'Property registration dispute resolution',
            'Emergency stay orders to prevent illegal construction',
        ],
        contextNote: 'For land cases that reach the High Court or Appellate Division — including complex title disputes, constitutional property rights matters, or government acquisition challenges — Adv. Shah Alam provides experienced Supreme Court representation.',
        faqItems: [
            { q: 'How do I stop someone from building on my land illegally?', a: 'File an urgent application for an interim injunction in the Civil Court. If the situation is extremely urgent, an ex parte (one-sided) injunction can be obtained within days without waiting for the other party. Your lawyer will present land records and evidence to satisfy the three-part injunction test.' },
            { q: 'What is a title suit in Bangladesh?', a: 'A title suit (declaration suit) under Section 42 of the Specific Relief Act is a civil case where you ask the court to declare you the rightful owner of a piece of land and cancel any fraudulent deeds. It is the primary tool for resolving ownership disputes in Bangladesh.' },
            { q: 'How long do land cases take in Bangladesh?', a: 'First-instance civil courts may take 3–8 years for a full trial. Injunction applications can be approved within days to weeks. Out-of-court mediation and compromise deeds can resolve simpler disputes much faster.' },
        ],
        ctaText: 'Talk to a Land Lawyer in Uttara Today',
        featuredImage: null,
        featuredImageAlt: 'Land and Property Lawyer in Uttara Dhaka',
    },
    {
        status: 'published',
        slug: 'bail-lawyer',
        h1: 'Bail Lawyer in Dhaka – Urgent Bail Applications at All Court Levels',
        metaTitle: 'Bail Lawyer in Dhaka | Advocate Md. Shah Alam – Urgent Bail Help',
        metaDesc: 'Need urgent bail in Dhaka? Advocate Md. Shah Alam is an experienced bail lawyer handling bailable and non-bailable offences, anticipatory bail, and High Court bail across Bangladesh.',
        canonicalUrl: `${BASE}/services/bail-lawyer`,
        intro: 'Advocate Md. Shah Alam is a dedicated <strong>bail lawyer in Dhaka</strong> with 20+ years of experience in securing bail at all court levels — from Magistrate Court and Sessions Court to the High Court Division of the Bangladesh Supreme Court.',
        coverage: [
            'Regular bail in bailable offences — Magistrate Court',
            'Non-bailable offence bail — Sessions and High Court',
            'Anticipatory bail before arrest — Sessions Court & High Court',
            'Interim bail pending full hearing',
            'Bail in Special Laws cases (DORA, Narcotics, Arms Act)',
            'High Court bail for persons remanded in custody',
            'Bail condition review and modification applications',
            'Bail cancellation defence (for accused seeking to oppose cancellation)',
            'Urgent same-day bail application for family emergencies',
        ],
        contextNote: 'For cases where the High Court Division or Appellate Division of the Supreme Court is involved, Adv. Shah Alam\'s Supreme Court practice experience ensures the highest quality of advocacy at the apex court level.',
        faqItems: [
            { q: 'How quickly can bail be obtained after arrest in Bangladesh?', a: 'For bailable offences, bail can sometimes be arranged the same day of arrest. For non-bailable offences in Magistrate Court, a bail hearing is typically within 1–3 court dates. High Court bail may take 1–2 weeks depending on the court\'s schedule. Contact a bail lawyer immediately after arrest for the fastest result.' },
            { q: 'Is anticipatory bail available in Bangladesh?', a: 'Yes. If you have reason to believe you are about to be arrested for a non-bailable offence, you can apply for anticipatory bail from the Sessions Court or directly from the High Court Division. If granted, it protects you from arrest until the main case is resolved.' },
            { q: 'What are the chances of getting bail in a murder case?', a: 'Murder is a non-bailable offence and bail is discretionary. It depends on the specific facts, evidence, the accused\'s background, and any special circumstances. The High Court Division has jurisdiction to grant bail in murder cases where lower courts have refused.' },
        ],
        ctaText: 'Contact a Bail Lawyer in Dhaka — Urgently',
        featuredImage: null,
        featuredImageAlt: 'Bail Lawyer in Dhaka Bangladesh',
    },
    {
        status: 'published',
        slug: 'supreme-court-lawyer',
        h1: 'Supreme Court Lawyer in Bangladesh – High Court & Appellate Division',
        metaTitle: 'Supreme Court Lawyer Bangladesh | Advocate Md. Shah Alam – High Court & Appellate',
        metaDesc: 'Enrolled Supreme Court advocate in Bangladesh. Advocate Md. Shah Alam handles High Court writ petitions, criminal appeals, civil appeals, and Appellate Division cases across Bangladesh.',
        canonicalUrl: `${BASE}/services/supreme-court-lawyer`,
        intro: 'Advocate Md. Shah Alam is a <strong>Supreme Court advocate in Bangladesh</strong>, enrolled to practise before both the High Court Division and the Appellate Division. With extensive experience in criminal appeals, writ petitions, civil revision, and constitutional matters, Adv. Shah Alam provides top-tier appellate representation.',
        coverage: [
            'High Court Division bail applications (non-bailable offences)',
            'Writ petitions (mandamus, certiorari, habeas corpus, quo warranto)',
            'Criminal appeals from Sessions Court to High Court',
            'Civil revision and review from subordinate courts',
            'Constitutional matters and fundamental rights enforcement',
            'High Court reference from Tax Appellate Tribunal',
            'Company law references and oppression/mismanagement petitions',
            'Appellate Division cases and leave petitions',
            'Stay orders pending appeal from High Court judgments',
            'Contempt of court applications',
        ],
        contextNote: 'Supreme Court litigation requires specialist expertise in appellate procedure, legal drafting, and constitutional law. Adv. Shah Alam combines deep knowledge of substantive law with practical experience in moving urgent applications before busy High Court benches.',
        faqItems: [
            { q: 'What is a writ petition in Bangladesh?', a: 'A writ petition is an application to the High Court Division to enforce fundamental rights or correct unlawful actions of government authorities. Common writs include mandamus (to compel a public authority to act), certiorari (to quash an unlawful administrative decision), and habeas corpus (to free an unlawfully detained person). Writs are often decided within months, much faster than ordinary civil suits.' },
            { q: 'When should I go to the Supreme Court instead of a lower court?', a: 'The Supreme Court is appropriate when: (1) lower courts have refused bail in a serious case, (2) a government order or administrative decision needs to be legally challenged, (3) you need to appeal a Sessions or High Court judgment, (4) there is a question of constitutional right involved.' },
            { q: 'Can Advocate Shah Alam handle cases in the Appellate Division?', a: 'Yes. Adv. Shah Alam is enrolled before both the High Court Division and the Appellate Division of the Supreme Court of Bangladesh and handles criminal, civil, and constitutional appeals at both levels.' },
        ],
        ctaText: 'Consult a Supreme Court Lawyer in Bangladesh',
        featuredImage: null,
        featuredImageAlt: 'Supreme Court Lawyer Bangladesh High Court',
    },
    {
        status: 'published',
        slug: 'company-corporate-lawyer',
        h1: 'Company & Corporate Lawyer in Dhaka – Bangladesh Business Law Expert',
        metaTitle: 'Company & Corporate Lawyer in Dhaka | Advocate Md. Shah Alam',
        metaDesc: 'Expert company and corporate lawyer in Bangladesh. Advocate Md. Shah Alam handles business formation, company disputes, shareholder matters, partnership agreements, and commercial legal issues in Dhaka.',
        canonicalUrl: `${BASE}/services/company-corporate-lawyer`,
        intro: 'Advocate Md. Shah Alam provides comprehensive <strong>company and corporate legal services in Bangladesh</strong>, advising businesses, entrepreneurs, and investors on formation, compliance, disputes, and commercial transactions under the Companies Act 1994.',
        coverage: [
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
        ],
        contextNote: 'For company disputes that escalate to the High Court Division — including oppression and mismanagement petitions under the Companies Act — Adv. Shah Alam\'s experience in Supreme Court representation ensures your corporate matter is argued at the highest level.',
        faqItems: [
            { q: 'How do I register a company in Bangladesh?', a: 'Company registration in Bangladesh is done through the Registrar of Joint Stock Companies and Firms (RJSC). Steps include reserving a company name, preparing a Memorandum and Articles of Association, submitting required documents, and paying the registration fee. An experienced company lawyer can guide you through the process and ensure compliance from day one.' },
            { q: 'What can I do if a business partner breaches our partnership agreement?', a: 'If a business partner breaches a partnership agreement, you may pursue civil remedies including damages, account of profits, or dissolution of the partnership through court. A corporate lawyer can review your agreement, assess the breach, and advise on the most effective legal strategy to protect your investment.' },
            { q: 'Can a shareholder sue company directors in Bangladesh?', a: 'Yes. Under the Companies Act 1994, shareholders may file a petition before the High Court Division alleging oppression or mismanagement by directors. The court can make orders to remedy the situation including regulating the company\'s affairs or ordering a buyout of shares.' },
        ],
        ctaText: 'Talk to a Company Lawyer in Dhaka',
        featuredImage: null,
        featuredImageAlt: 'Company Corporate Lawyer Dhaka Bangladesh',
    },
];

writeFileSync(path.join(outDir, 'services.json'), JSON.stringify(services, null, 2), 'utf-8');
console.log(`✅  Written cms/data/services.json (${services.length} service records)\n`);
console.log('📌  Import via Directus admin: Settings → Collections → services → Import JSON');
