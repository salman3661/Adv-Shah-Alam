import React from 'react';
import { Phone } from 'lucide-react';

// Static render — no entrance animation, no pulse ring.
const MobileCallButton = () => {
    return (
        <a
            href="tel:+8801712655546"
            className="mobile-call-bar fixed bottom-0 left-0 right-0 z-[1000] md:hidden flex items-center justify-center gap-3 font-bold text-sm text-white shadow-2xl"
            style={{ background: 'var(--btn-primary-bg)' }}
            aria-label="Call Advocate Md. Shah Alam"
        >
            <Phone size={16} className="text-white" />
            Call Advocate Shah Alam
        </a>
    );
};

export default MobileCallButton;
