import React from 'react';
import { Phone } from 'lucide-react';

// No Framer Motion slide-in — renders immediately at bottom to prevent
// the 1.2-second slide-up 'pop' that caused layout reflow on first paint.
const MobileCallButton = () => {
    return (
        <a
            href="tel:+8801712655546"
            className="mobile-call-bar fixed bottom-0 left-0 right-0 z-[1000] md:hidden flex items-center justify-center gap-3 py-4 font-bold text-sm text-white shadow-2xl"
            style={{ background: 'var(--btn-primary-bg)' }}
            aria-label="Call Advocate Md. Shah Alam"
        >
            {/* Pulse ring */}
            <span className="relative flex items-center justify-center w-6 h-6">
                <span
                    className="absolute inline-flex h-full w-full rounded-full animate-ping opacity-40"
                    style={{ background: 'rgba(255,255,255,0.5)' }}
                />
                <Phone size={16} className="relative text-white" />
            </span>
            Call Advocate Shah Alam
        </a>
    );
};

export default MobileCallButton;
