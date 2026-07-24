import React from 'react';
import { telLink } from '../data/contactInfo';
import { Phone } from 'lucide-react';
import { useLocation } from 'react-router-dom';

// Bilingual mobile call bar — shows Bengali text on Bengali pages, English on EN pages
const MobileCallButton = () => {
    const location = useLocation();

    // Detect Bengali page: same logic as Header.jsx
    const isBn = !location.pathname.startsWith('/en') &&
                 !location.pathname.startsWith('/blog') &&
                 !location.pathname.startsWith('/advocate-md-shah-alam') &&
                 !location.pathname.startsWith('/contact') &&
                 !location.pathname.startsWith('/privacy-policy') &&
                 !location.pathname.startsWith('/terms');

    return (
        <a
            href={telLink()}
            className="mobile-call-bar md:hidden flex items-center justify-center gap-3 font-bold text-sm text-white"
            style={{ background: 'var(--btn-primary-bg)' }}
            aria-label={isBn ? 'এডভোকেট মোঃ শাহ আলমকে সরাসরি কল করুন' : 'Call Advocate Md. Shah Alam'}
        >
            <span className="phone-icon-animate"><Phone size={16} className="text-white" /></span>
            {isBn ? 'সরাসরি কল করুন' : 'Call Advocate Shah Alam'}
        </a>
    );
};

export default MobileCallButton;
