import React from 'react';
import { telLink } from '../data/contactInfo';
import { Phone } from 'lucide-react';

// Static render — no entrance animation, no pulse ring.
const MobileCallButton = () => {
    return (
        <a
            href={telLink()}
            className="mobile-call-bar md:hidden flex items-center justify-center gap-3 font-bold text-sm text-white"
            style={{ background: 'var(--btn-primary-bg)' }}
            aria-label="Call Advocate Md. Shah Alam"
        >
            <span className="phone-icon-animate"><Phone size={16} className="text-white" /></span>
            Call Advocate Shah Alam
        </a>
    );
};

export default MobileCallButton;
