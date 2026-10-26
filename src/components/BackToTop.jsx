import React, { useState, useEffect } from 'react';
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
        <button
            type="button"
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
                opacity: visible ? 1 : 0,
                transform: visible ? 'scale(1)' : 'scale(0.7)',
                pointerEvents: visible ? 'auto' : 'none',
                transition: 'opacity 0.25s ease, transform 0.25s ease, box-shadow 0.2s ease',
            }}
        >
            <ArrowUp size={18} />
        </button>
    );
};

export default BackToTop;
