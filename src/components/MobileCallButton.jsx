import React from 'react';
import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const MobileCallButton = () => {
    return (
        <motion.a
            href="tel:+8801955802007"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
            className="mobile-call-bar fixed bottom-0 left-0 right-0 z-[1000] md:hidden flex items-center justify-center gap-3 py-4 font-bold text-sm text-white shadow-2xl"
            style={{ background: 'var(--btn-primary-bg)' }}
            aria-label="Call Advocate Md. Shah Alam"
        >
            {/* Pulse ring */}
            <span className="relative flex items-center justify-center w-6 h-6">
                <span className="absolute inline-flex h-full w-full rounded-full animate-ping opacity-40"
                    style={{ background: 'rgba(255,255,255,0.5)' }}></span>
                <Phone size={16} className="relative text-white" />
            </span>
            Call Advocate Shah Alam
        </motion.a>
    );
};

export default MobileCallButton;
