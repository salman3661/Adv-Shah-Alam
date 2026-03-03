import React from 'react';
import { MessageCircle } from 'lucide-react';

// No Framer Motion pop-in — renders immediately to prevent the 1-second
// pop/flash after hydration. Hover/tap CSS transitions are kept.
const FloatingWhatsApp = () => {
    return (
        <a
            href="https://wa.me/8801712655546"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-float w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow hover:scale-110 active:scale-95"
            style={{ background: 'var(--wa-green)' }}
            aria-label="Contact via WhatsApp"
        >
            <MessageCircle size={26} className="text-white" />
            {/* Pulse ring */}
            <span
                className="absolute inset-0 rounded-full animate-ping opacity-30"
                style={{ background: 'var(--wa-green)' }}
            />
        </a>
    );
};

export default FloatingWhatsApp;
