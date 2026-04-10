import React from 'react';
import { waLink } from '../data/contactInfo';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsApp = () => {
    return (
        <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-float w-14 h-14 rounded-full flex items-center justify-center shadow-lg group"
            style={{ background: 'var(--wa-green)' }}
            aria-label="Contact via WhatsApp"
        >
            <MessageCircle size={26} className="text-white" />
            {/* Tooltip — desktop hover only */}
            <span
                className="hidden sm:block absolute bottom-full right-0 mb-2 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                style={{ background: 'var(--text)', color: 'var(--bg)', boxShadow: '0 2px 8px rgba(0,0,0,0.18)' }}
            >
                Chat with us ❤️
            </span>
        </a>
    );
};

export default FloatingWhatsApp;
