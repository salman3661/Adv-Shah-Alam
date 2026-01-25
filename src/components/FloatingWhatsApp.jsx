import React from 'react';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsApp = () => {
    return (
        <a
            href="https://wa.me/your-number"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 bg-gold rounded-full shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:bg-navy hover:text-gold text-white transition-all duration-300 group hover:-translate-y-1"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle size={28} className="relative z-10" />
            <div className="absolute inset-0 rounded-full bg-gold opacity-50 animate-ping"></div>
        </a>
    );
};

export default FloatingWhatsApp;
