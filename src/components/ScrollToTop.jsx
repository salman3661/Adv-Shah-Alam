import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();
    const navType = useNavigationType();
    const scrollMap = useRef(new Map());

    // Disable browser's glitchy auto-restoration so our manual restoration works smoothly
    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
    }, []);

    // Continuously record scroll position for current route
    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY;
            scrollMap.current.set(pathname, y);
            try {
                sessionStorage.setItem(`scroll_${pathname}`, String(y));
            } catch {}
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname]);

    useEffect(() => {
        // 1. If URL has a hash (e.g. /#services, /#faq, #bnsec-1)
        if (hash) {
            const id = hash.replace('#', '');
            let attempts = 0;
            const maxAttempts = 30;

            const tryScrollToHash = () => {
                const element = document.getElementById(id);
                if (element) {
                    const offset = 85;
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({ behavior: 'smooth', top: elementPosition - offset });
                } else if (attempts < maxAttempts) {
                    attempts++;
                    setTimeout(tryScrollToHash, 100);
                }
            };
            setTimeout(tryScrollToHash, 50);
            return;
        }

        // 2. If user pressed browser Back/Forward (POP), restore saved position
        if (navType === 'POP') {
            const savedY = scrollMap.current.get(pathname) ?? 
                Number(sessionStorage.getItem(`scroll_${pathname}`) || 0);

            if (savedY > 0) {
                let attempts = 0;
                const restore = () => {
                    const maxScroll = Math.max(
                        document.body.scrollHeight,
                        document.documentElement.scrollHeight
                    ) - window.innerHeight;

                    if (maxScroll >= savedY || attempts >= 15) {
                        window.scrollTo({ top: savedY, left: 0, behavior: 'instant' });
                    } else {
                        attempts++;
                        setTimeout(restore, 40);
                    }
                };
                setTimeout(restore, 30);
                return;
            }
        }

        // 3. New page navigation (PUSH/REPLACE) without hash -> scroll to top
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [pathname, hash, navType]);

    return null;
};

export default ScrollToTop;
