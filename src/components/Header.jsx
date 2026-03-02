import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Home, Scale, Award, MapPin, Building2, User, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isAtTop, setIsAtTop] = useState(true);
    const lastScrollY = useRef(0);
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsAtTop(currentScrollY < 50);
            if (currentScrollY < lastScrollY.current - 10) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY.current + 10 && currentScrollY > 100) {
                setIsVisible(false);
            }
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    const offset = 80;
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({ behavior: 'smooth', top: elementPosition - offset });
                }
            }, 100);
        }
    }, [location]);

    const handleNavClick = (e, id) => {
        e.preventDefault();
        if (location.pathname !== '/') {
            navigate(`/#${id}`);
            return;
        }
        const element = document.getElementById(id);
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({ behavior: 'smooth', top: elementPosition - offset });
            window.history.pushState(null, '', `#${id}`);
        }
    };

    const navLinks = [
        { name: 'Home', id: 'home', icon: Home },
        { name: 'About', id: 'about', icon: User },
        { name: 'Services', id: 'services', icon: Scale },
        { name: 'FAQ', id: 'faq', icon: Award },
        { name: 'Blog', id: 'blog', icon: Building2 },
        { name: 'Contact', id: 'contact', icon: MapPin },
    ];

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.nav
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
                >
                    <div className={`
                        pointer-events-auto
                        flex items-center gap-1 px-3 sm:px-4 py-2.5
                        rounded-full navbar-glass
                        transition-all duration-500
                        max-w-[95vw] sm:max-w-fit overflow-x-auto no-scrollbar
                    `}>
                        {/* Nav Links */}
                        <div className="flex items-center gap-0.5">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={`#${link.id}`}
                                    onClick={(e) => handleNavClick(e, link.id)}
                                    style={{ color: 'var(--text-2)' }}
                                    className="
                                        relative flex items-center justify-center
                                        px-2.5 sm:px-3 py-2 rounded-full text-sm font-medium
                                        transition-all duration-200
                                        hover:bg-black/5 dark:hover:bg-white/8
                                        active:scale-95
                                    "
                                    title={link.name}
                                >
                                    <link.icon size={17} className="sm:mr-1.5 flex-shrink-0 opacity-70" style={{ color: 'inherit' }} />
                                    <span className="hidden md:inline whitespace-nowrap">{link.name}</span>
                                </a>
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="w-px h-5 bg-current opacity-10 mx-1"></div>

                        {/* Theme Toggle — pill button */}
                        <button
                            onClick={toggleTheme}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-250 hover:scale-105 active:scale-95"
                            style={{
                                background: 'var(--accent)',
                                color: '#ffffff',
                            }}
                            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        >
                            {theme === 'light'
                                ? <><Moon size={14} /><span className="hidden sm:inline">Dark</span></>
                                : <><Sun size={14} /><span className="hidden sm:inline">Light</span></>
                            }
                        </button>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default Header;
