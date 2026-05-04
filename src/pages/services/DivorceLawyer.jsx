import React from 'react';
import ServicePage from '../../components/ServicePage';

const ALL_SERVICES = [
    { label: 'Criminal Lawyer – Uttara, Dhaka',        to: '/services/criminal-lawyer' },
    { label: 'Bail Lawyer – Fast Applications',         to: '/services/bail-lawyer' },
    { label: 'Land & Property Lawyer – Dhaka',         to: '/services/land-lawyer' },
    { label: 'Supreme Court Lawyer – Bangladesh',       to: '/services/supreme-court-lawyer' },
    { label: 'Company & Corporate Lawyer – Dhaka',     to: '/services/company-corporate-lawyer' },
    { label: 'Tax & VAT Lawyer – Bangladesh',          to: '/services/tax-lawyer' },
];

const DivorceLawyer = () => (
    <ServicePage
        metaTitle="Divorce Lawyer in Bangladesh (2026) – Expert Family Lawyer in Dhaka | Adv. Shah Alam"
        metaDesc="Need a divorce lawyer in Dhaka, Bangladesh? Advocate Shah Alam handles Muslim talaq, khula, child custody, mahr & maintenance with 20+ years family court experience. WhatsApp now."
        canonicalUrl="https://advmdshahalam.me/services/divorce-lawyer"
        h1="Divorce Lawyer in Bangladesh (2026) – Family Law Expert in Uttara, Dhaka"
        intro="Advocate Md. Shah Alam is a compassionate and highly experienced <strong>divorce lawyer in Dhaka, Bangladesh</strong>, handling all aspects of family law — Muslim talaq, khula, child custody, maintenance (nafaqa), and dower (mahr) recovery. With 20+ years practicing in Bangladesh Family Courts and the Supreme Court, Adv. Shah Alam provides clear guidance, protects your rights, and delivers results. Serving clients from Uttara, Dhaka, and Gazipur."
        coverage={[
            'Muslim divorce (talaq) — notice drafting & Union Parishad procedure',
            'Khula (wife-initiated) and mutual consent divorce',
            'Family Court representation (Dhaka, Gazipur & nationwide)',
            'Child custody (hizanat) and guardianship disputes',
            'Maintenance (nafaqa) and alimony cases — interim and final',
            'Dower (mahr) recovery and enforcement through court',
            'Restitution of conjugal rights cases',
            'Domestic violence protection orders under the 2010 Act',
            'Second marriage disputes and polygamy under MFLO 1961',
            'Marriage registration and Kabinnama documentation',
            'NRB/overseas divorce — divorces for Bangladeshis abroad',
            'Hindu and Christian personal law matters',
        ]}
        contextNote="Divorce cases often involve child custody, unpaid mahr, and ongoing maintenance — all of which are litigated simultaneously. Adv. Shah Alam has deep expertise in the full spectrum of family law remedies in Bangladesh."
        faqItems={[
            {
                q: 'What is the divorce procedure in Bangladesh for Muslims (2026)?',
                a: 'A Muslim husband pronounces talaq and must send written notice within 30 days to the Union Parishad/City Corporation chairman AND to the wife. An arbitration council is formed, and divorce becomes effective 90 days from the notice if reconciliation fails. A wife may seek khula (consensus) or file in Family Court on valid grounds. The full process takes a minimum of 90 days.',
            },
            {
                q: 'How long does a divorce case take in Bangladesh?',
                a: 'A mutual consent divorce (khula) with both parties agreeing can be completed in 90 days. Contested Family Court cases typically take 1–3 years depending on complexity and cooperation of parties. Adv. Shah Alam works to achieve the fastest possible resolution through expert case management.',
            },
            {
                q: 'Who gets child custody after divorce in Bangladesh?',
                a: 'Under Muslim Family Law and the Guardians and Wards Act, the mother retains hizanat (primary custody) of sons until age 7 and daughters until puberty. After those ages, custody may transfer depending on the child\'s best interest as assessed by the court. The father is always responsible for financial maintenance regardless of custody.',
            },
            {
                q: 'How much does a divorce cost in Bangladesh?',
                a: 'Total divorce costs depend on whether the case is contested or uncontested. Lawyer fees for a straightforward talaq procedure: BDT 10,000–25,000. Contested Family Court cases involving maintenance and custody can cost BDT 30,000–1,00,000+ depending on duration. Government court fees are nominal.',
            },
            {
                q: 'Can a wife get a divorce in Bangladesh without the husband\'s agreement?',
                a: 'Yes. A wife can seek divorce through three routes: (1) Khula — requesting the husband agree in exchange for returning mahr; (2) Delegated divorce (tafwid) — if the Kabinnama granted her the right to divorce herself; (3) Family Court — filing for dissolution of marriage on grounds of cruelty, desertion, failure to maintain, or other legal grounds.',
            },
            {
                q: 'What is a wife\'s right to maintenance after divorce in Bangladesh?',
                a: 'A divorced wife is entitled to: (1) Iddat maintenance — full financial support for approximately 3 months after divorce; (2) Unpaid mahr — immediately payable upon divorce; (3) Child maintenance — the father must support all children financially regardless of who has custody. Post-iddat spousal maintenance may also be awarded by court in certain circumstances.',
            },
        ]}
        ctaText="Speak to a Divorce Lawyer in Dhaka Today"
        relatedBlogLinks={[
            { to: '/blog/divorce-procedure-bangladesh', title: 'Divorce Procedure in Bangladesh (2026) – Complete Guide', desc: 'Step-by-step talaq, khula, and family court divorce procedures explained' },
            { to: '/blog/child-custody-law-bangladesh', title: 'Child Custody Law in Bangladesh – Who Gets Custody?', desc: 'How courts decide custody and what both parents\' rights are' },
            { to: '/blog/divorce-alimony-maintenance-wife-bangladesh', title: 'Divorce Maintenance & Alimony for Wives (2026)', desc: 'Mahr, iddat, child maintenance — complete guide to wife\'s financial rights' },
            { to: '/blog/wife-rights-after-divorce-bangladesh', title: 'Wife\'s Rights After Divorce in Bangladesh', desc: 'Complete guide to mahr, custody, property, and enforcement through courts' },
            { to: '/blog/domestic-violence-law-bangladesh', title: 'Domestic Violence Law Bangladesh – Protection Orders', desc: 'Legal remedies and protection orders under the 2010 Act' },
        ]}
        relatedServices={ALL_SERVICES}
    />
);

export default DivorceLawyer;
