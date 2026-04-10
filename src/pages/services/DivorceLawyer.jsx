import React from 'react';
import { Link } from 'react-router-dom';
import ServicePage from '../../components/ServicePage';

const DivorceLawyer = () => (
    <ServicePage
        metaTitle="Divorce & Family Lawyer Uttara | Advocate Shah Alam"
        metaDesc="Need a divorce lawyer in Uttara, Dhaka? Advocate Shah Alam handles Muslim talaq, khula, child custody & maintenance in Bangladesh family courts. WhatsApp today."
        canonicalUrl="https://www.advmdshahalam.me/services/divorce-lawyer"
        h1="Divorce & Family Lawyer in Uttara – Bangladesh Family Law Expert"
        intro="Advocate Md. Shah Alam is a compassionate and knowledgeable <strong>divorce lawyer in Uttara, Dhaka</strong>, handling all aspects of family law including Muslim divorce procedure in Bangladesh, khula, child custody, maintenance, and dower (mahr) disputes. With sensitivity to the emotional weight of family matters, Adv. Shah Alam provides clear guidance and strong representation in family courts."
        coverage={[
            'Muslim divorce (talaq) — notice drafting and Union Parishad procedure',
            'Khula and mutual consent divorce procedures',
            'Family court representation (Dhaka & Gazipur)',
            'Child custody and guardianship disputes',
            'Maintenance (nafaqa) and alimony cases',
            'Dower (mahr) recovery and enforcement',
            'Restitution of conjugal rights cases',
            'Hindu and Christian personal law matters',
            'Judicial separation proceedings',
            'Marriage registration and documentation',
        ]}
        contextNote={
            <>
                Child custody arrangements are among the most sensitive outcomes of any divorce. Bangladesh family law defines clear guidelines on guardianship rights — learn more in our detailed guide on{' '}
                <Link to="/blog/child-custody-law-bangladesh" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
                    child custody law in Bangladesh
                </Link>
                , which covers the rights of both parents and how courts determine the best interest of the child.
            </>
        }
        faqItems={[
            {
                q: 'What is the divorce procedure in Bangladesh for Muslims?',
                a: 'A Muslim husband can pronounce talaq and must send a written notice within 30 days to the Union Parishad/City Corporation chairman and the wife. An arbitration council is formed, and the divorce becomes effective 90 days from notice if reconciliation fails. A wife may seek khula (divorce by mutual agreement) or file in family court on valid grounds.',
            },
            {
                q: 'How long does a divorce case take in Bangladesh?',
                a: 'A mutual consent divorce (khula) can be completed in 90 days. Contested family court cases typically take 1–3 years depending on complexity, cooperation of parties, and court schedule.',
            },
            {
                q: 'Who gets child custody after divorce in Bangladesh?',
                a: 'Under Muslim Family Law, the mother generally retains custody (hizanat) of children until a son turns 7 and a daughter reaches puberty. After that, the father may gain custody unless otherwise determined by the court based on the best interest of the child.',
            },
        ]}
        ctaText="Speak to a Divorce Lawyer in Uttara"
        relatedBlogLinks={[
            { to: '/blog/divorce-procedure-bangladesh', title: 'Divorce Procedure in Bangladesh – Complete Guide', desc: 'Step-by-step talaq, khula, and family court divorce procedures explained' },
            { to: '/blog/child-custody-law-bangladesh', title: 'Child Custody Law in Bangladesh', desc: 'Who gets custody after divorce and how courts decide in the child’s interest' },
        ]}
    />
);

export default DivorceLawyer;
