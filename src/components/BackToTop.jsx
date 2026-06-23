import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 320);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.25 }}
                    onClick={scrollTop}
                    aria-label="Back to top"
                    className="back-to-top-btn"
                    style={{
                        position: 'fixed',
                        left: '20px',
                        bottom: '24px',
                        zIndex: 1050,
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'var(--surface)',
                        border: '1.5px solid var(--card-border)',
                        color: 'var(--accent)',
                        cursor: 'pointer',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    }}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.92 }}
                >
                    <ArrowUp size={18} />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default BackToTop;
