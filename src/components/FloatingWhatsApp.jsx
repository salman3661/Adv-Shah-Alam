import React from 'react';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsApp = () => {
    return (
        <a
            href="https://wa.me/8801955802007"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-float w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 active:scale-95"
            style={{ background: 'var(--wa-green)' }}
            aria-label="Contact via WhatsApp"
        >
            <MessageCircle size={26} className="text-white" />
            {/* Static green dot — no pulse ring */}
        </a>
    );
};

export default FloatingWhatsApp;
