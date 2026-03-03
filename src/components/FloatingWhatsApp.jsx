import React from 'react';
import { waLink } from '../data/contactInfo';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsApp = () => {
    return (
        <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-float w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: 'var(--wa-green)' }}
            aria-label="Contact via WhatsApp"
        >
            <MessageCircle size={26} className="text-white" />
            {/* Static green dot — no pulse ring */}
        </a>
    );
};

export default FloatingWhatsApp;
