/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  src/content/services.js — Homepage Service Cards            ║
 * ║  Edit titles, descriptions, and links here.                  ║
 * ║  icon must be a Lucide icon name (imported in Services.jsx)  ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * Available icons: Shield, Users, Home, Scale, Landmark, FileText
 * Icon colors: use hex or rgba values.
 */

const serviceCards = [
    {
        icon: 'Shield',
        title: 'Criminal Lawyer in Uttara',
        desc: 'Expert criminal defense for FIR cases, bail applications, trial representation, and criminal case handling in Dhaka courts.',
        link: '/services/criminal-lawyer',
        iconBg:   'rgba(239,68,68,0.12)',
        iconColor: '#EF4444',
    },
    {
        icon: 'Users',
        title: 'Divorce & Family Lawyer in Uttara',
        desc: 'Handle divorce procedure in Bangladesh, child custody, Muslim family law, mutual divorce, and all family court matters.',
        link: '/services/divorce-lawyer',
        iconBg:   'rgba(236,72,153,0.12)',
        iconColor: '#EC4899',
    },
    {
        icon: 'Home',
        title: 'Land & Property Lawyer in Uttara',
        desc: 'Resolve land dispute cases, property mutation, registration, land fraud, and title deed matters in Bangladesh courts.',
        link: '/services/land-lawyer',
        iconBg:   'rgba(34,197,94,0.12)',
        iconColor: '#22C55E',
    },
    {
        icon: 'Scale',
        title: 'Bail Lawyer in Dhaka',
        desc: 'Fast bail applications, anticipatory bail, High Court bail matters, and urgent bail proceedings across Bangladesh courts.',
        link: '/services/bail-lawyer',
        iconBg:   'rgba(59,130,246,0.12)',
        iconColor: '#3B82F6',
    },
    {
        icon: 'Landmark',
        title: 'Supreme Court Lawyer Bangladesh',
        desc: 'Expert representation in High Court Division cases, writ petitions, appellate matters, and constitutional litigation.',
        link: '/services/supreme-court-lawyer',
        iconBg:   'rgba(124,58,237,0.12)',
        iconColor: '#7C3AED',
    },
    {
        icon: 'FileText',
        title: 'Company & Corporate Law',
        desc: 'Business formation, company disputes, partnerships, corporate compliance, and commercial legal matters.',
        link: '/services/company-corporate-lawyer',
        iconBg:   'rgba(217,119,6,0.12)',
        iconColor: '#D97706',
    },
];

export default serviceCards;
