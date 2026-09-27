import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { telLink, waLink, PRIMARY_PHONE, SECONDARY_PHONE } from '../data/contactInfo';

// Responsive 2-button floating sticky bottom bar for mobile screens (< 768px)
// Step 7 CTR & CTA requirement: Left = Emergency WhatsApp, Right = Direct Call
const MobileCallButton = () => {
    const location = useLocation();

    // Detect Bengali page
    const isBn = !location.pathname.startsWith('/en') &&
                 !location.pathname.startsWith('/blog') &&
                 !location.pathname.startsWith('/advocate-md-shah-alam') &&
                 !location.pathname.startsWith('/contact') &&
                 !location.pathname.startsWith('/privacy-policy') &&
                 !location.pathname.startsWith('/terms');

    const waText = isBn 
        ? 'আইনি পরামর্শের জন্য যোগাযোগ' 
        : 'Hello Advocate Md. Shah Alam, I need urgent legal assistance.';

    const waHref = `https://wa.me/8801955802007?text=${encodeURIComponent(isBn ? 'আইনি পরামর্শের জন্য যোগাযোগ' : 'Hello Advocate Md. Shah Alam, I need legal consultation.')}`;

    return (
        <aside 
            className="md:hidden fixed z-[1000] left-3 right-3 bottom-[calc(10px+env(safe-area-inset-bottom,0px))] flex items-center gap-2.5 p-1.5 rounded-2xl shadow-2xl backdrop-blur-md"
            style={{
                background: 'rgba(11, 18, 32, 0.92)',
                border: '1px solid rgba(198, 167, 94, 0.35)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.08)'
            }}
            aria-label="Mobile Emergency Legal Contact Bar"
        >
            {/* Left Button: Emergency WhatsApp */}
            <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-bold text-xs sm:text-sm text-white shadow-md active:scale-95 transition-transform"
                style={{ background: '#25D366' }}
                aria-label={isBn ? 'জরুরি হোয়াটসঅ্যাপে যোগাযোগ করুন' : 'Chat on WhatsApp'}
            >
                <MessageCircle size={17} className="shrink-0 text-white fill-current" />
                <span className="truncate">{isBn ? 'জরুরি হোয়াটসঅ্যাপ' : 'WhatsApp'}</span>
            </a>

            {/* Right Button: Direct Call */}
            <a
                href="tel:+8801712655546"
                className="flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-bold text-xs sm:text-sm text-white shadow-md active:scale-95 transition-transform"
                style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)', border: '1px solid rgba(198, 167, 94, 0.4)' }}
                aria-label={isBn ? 'এডভোকেট মোঃ শাহ আলমকে সরাসরি কল করুন' : 'Call Directly'}
            >
                <Phone size={16} className="shrink-0 text-amber-400 phone-icon-animate" />
                <span className="truncate">{isBn ? 'সরাসরি কল করুন' : 'Direct Call'}</span>
            </a>
        </aside>
    );
};

export default MobileCallButton;
