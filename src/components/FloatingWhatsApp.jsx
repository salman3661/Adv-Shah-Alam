import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingWhatsApp = () => {
    return (
        <motion.a
            href="https://wa.me/8801712655546"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="whatsapp-float w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
            style={{ background: 'var(--wa-green)' }}
            aria-label="Contact via WhatsApp"
        >
            <MessageCircle size={26} className="text-white" />

            {/* Pulse Animation */}
            <span className="absolute inset-0 rounded-full animate-ping opacity-30"
                style={{ background: 'var(--wa-green)' }}></span>
        </motion.a>
    );
};

export default FloatingWhatsApp;
