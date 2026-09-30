import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * CategoryStrip — BD Pratidin / Prothom Alo style horizontal category navigation
 * Shows below the navbar on blog-related pages.
 * On BN pages: Bengali category names → /bn/blog?cat=X
 * On EN pages: English category names → /blog?cat=X
 */

const BN_CATEGORIES = [
    { label: 'সব আইন',        slug: 'সব',             icon: '⚖️' },
    { label: 'ভূমি আইন',      slug: 'ভূমি আইন',       icon: '🏡' },
    { label: 'পারিবারিক আইন', slug: 'পারিবারিক আইন',  icon: '👨‍👩‍👧' },
    { label: 'ফৌজদারি আইন',   slug: 'ফৌজদারি আইন',   icon: '🔏' },
    { label: 'সাইবার আইন',    slug: 'সাইবার আইন',    icon: '💻' },
    { label: 'শ্রম আইন',      slug: 'শ্রম আইন',      icon: '👷' },
    { label: 'দেওয়ানি আইন',  slug: 'দেওয়ানি আইন',  icon: '📜' },
];

const EN_CATEGORIES = [
    { label: 'All Law',      slug: null,             icon: '⚖️' },
    { label: 'Property Law', slug: 'Property Law',   icon: '🏡' },
    { label: 'Family Law',   slug: 'Family Law',     icon: '👨‍👩‍👧' },
    { label: 'Criminal Law', slug: 'Criminal Law',   icon: '🔏' },
    { label: 'Labour Law',   slug: 'Labour Law',     icon: '👷' },
];

const CategoryStrip = () => {
    const location = useLocation();
    const isBn = location.pathname.startsWith('/bn');
    const isOnBlogPage = location.pathname.startsWith('/blog') || location.pathname.startsWith('/bn/blog');
    const scrollRef = useRef(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);

    // Only show on blog-related pages
    if (!isOnBlogPage) return null;

    const categories = isBn ? BN_CATEGORIES : EN_CATEGORIES;
    const blogBase = isBn ? '/bn/blog' : '/blog';

    // Get current active category from URL params
    const params = new URLSearchParams(location.search);
    const activeCatParam = params.get('cat') || 'সব';

    const checkScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        setShowLeft(el.scrollLeft > 8);
        setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (el) {
            el.addEventListener('scroll', checkScroll, { passive: true });
            checkScroll();
            return () => el.removeEventListener('scroll', checkScroll);
        }
    }, []);

    return (
        <nav
            aria-label={isBn ? 'আইনের বিভাগ' : 'Law Categories'}
            style={{
                background: 'var(--hero-bg, #0a0818)',
                borderBottom: '1px solid rgba(198,167,94,0.15)',
                position: 'sticky',
                top: '60px',   /* below header */
                zIndex: 100,
                boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
            }}
        >
            <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
                {/* Left fade + arrow */}
                {showLeft && (
                    <button
                        onClick={() => scrollRef.current?.scrollBy({ left: -180, behavior: 'smooth' })}
                        aria-hidden="true"
                        style={{
                            position: 'absolute', left: 0, top: 0, bottom: 0, zIndex: 2,
                            background: 'linear-gradient(90deg, var(--hero-bg, #0a0818) 60%, transparent)',
                            border: 'none', cursor: 'pointer', padding: '0 12px 0 6px',
                            color: 'rgba(198,167,94,0.8)', fontSize: '1rem',
                        }}
                    >‹</button>
                )}

                {/* Scrollable strip */}
                <div
                    ref={scrollRef}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0',
                        overflowX: 'auto',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        padding: '0 4px',
                    }}
                >
                    {categories.map((cat) => {
                        const isActive = activeCatParam === cat.slug;
                        const href = (cat.slug === 'সব' || cat.slug === null)
                            ? blogBase
                            : `${blogBase}?cat=${encodeURIComponent(cat.slug)}`;

                        return (
                            <Link
                                key={cat.label}
                                to={href}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    padding: '0.6rem 1rem',
                                    fontSize: '0.78rem',
                                    fontWeight: isActive ? 800 : 500,
                                    whiteSpace: 'nowrap',
                                    textDecoration: 'none',
                                    color: isActive ? '#e8c97d' : 'rgba(255,255,255,0.62)',
                                    borderBottom: isActive ? '2.5px solid #c6a75e' : '2.5px solid transparent',
                                    transition: 'all 0.18s ease',
                                    fontFamily: isBn
                                        ? "'SolaimanLipi', 'Noto Sans Bengali', sans-serif"
                                        : "'Plus Jakarta Sans', -apple-system, sans-serif",
                                    letterSpacing: isBn ? '0' : '0.01em',
                                    background: isActive ? 'rgba(198,167,94,0.06)' : 'transparent',
                                }}
                                onMouseEnter={e => {
                                    if (!isActive) {
                                        e.currentTarget.style.color = '#fff';
                                        e.currentTarget.style.borderBottomColor = 'rgba(198,167,94,0.4)';
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (!isActive) {
                                        e.currentTarget.style.color = 'rgba(255,255,255,0.62)';
                                        e.currentTarget.style.borderBottomColor = 'transparent';
                                    }
                                }}
                            >
                                <span style={{ fontSize: '0.85em' }}>{cat.icon}</span>
                                {cat.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Right fade + arrow */}
                {showRight && (
                    <button
                        onClick={() => scrollRef.current?.scrollBy({ left: 180, behavior: 'smooth' })}
                        aria-hidden="true"
                        style={{
                            position: 'absolute', right: 0, top: 0, bottom: 0, zIndex: 2,
                            background: 'linear-gradient(270deg, var(--hero-bg, #0a0818) 60%, transparent)',
                            border: 'none', cursor: 'pointer', padding: '0 6px 0 12px',
                            color: 'rgba(198,167,94,0.8)', fontSize: '1rem',
                        }}
                    >›</button>
                )}
            </div>

            {/* Hide scrollbar cross-browser */}
            <style>{`
                nav[aria-label="আইনের বিভাগ"] div::-webkit-scrollbar,
                nav[aria-label="Law Categories"] div::-webkit-scrollbar { display: none; }
            `}</style>
        </nav>
    );
};

export default CategoryStrip;
