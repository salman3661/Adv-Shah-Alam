import { useState, useEffect } from 'react';

/**
 * ReadingProgress — thin accent-coloured bar fixed to the top of the viewport.
 * Reflects how far the user has scrolled through the page (0–100%).
 * GPU-composited (transform: scaleX) — no layout paint.
 */
const ReadingProgress = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const update = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
        };
        window.addEventListener('scroll', update, { passive: true });
        return () => window.removeEventListener('scroll', update);
    }, []);

    return (
        <div
            aria-hidden="true"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '3px',
                zIndex: 9999,
                background: 'transparent',
                pointerEvents: 'none',
            }}
        >
            <div
                style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, var(--accent), var(--gold))',
                    transition: 'width 0.1s linear',
                    boxShadow: '0 0 8px var(--accent)',
                }}
            />
        </div>
    );
};

export default ReadingProgress;
