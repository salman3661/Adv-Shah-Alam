import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Home, Scale, Award, MapPin, BookOpen, User, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';

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
        { name: 'Home',     href: '/',                      icon: Home,     isPage: true },
        { name: 'About',    href: '/advocate-md-shah-alam', icon: User,     isPage: true },
        { name: 'Services', id: 'services',                 icon: Scale,    isPage: false },
        { name: 'FAQ',      id: 'faq',                      icon: Award,    isPage: false },
        { name: 'Blog',     href: '/blog',                  icon: BookOpen, isPage: true },
        { name: 'Contact',  href: '/contact',               icon: MapPin,   isPage: true },
    ];

    const isActive = (link) => {
        if (!link.isPage) return false;
        if (link.href === '/') return location.pathname === '/';
        return location.pathname.startsWith(link.href);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.nav
                    initial={{ y: -80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -80, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="fixed top-3 left-0 right-0 z-[60] flex justify-center px-4 pointer-events-none"
                >
                    <div className={`
                        pointer-events-auto
                        flex items-center gap-1 px-2 sm:px-3 py-1.5
                        rounded-full navbar-glass
                        transition-all duration-500
                        max-w-[95vw] sm:max-w-fit overflow-x-auto no-scrollbar
                    `}>
                        {/* Nav Links */}
                        <div className="flex items-center gap-0">
                            {navLinks.map((link) => {
                                const active = isActive(link);
                                return link.isPage ? (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        className="relative flex items-center justify-center px-2.5 sm:px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 active:scale-95"
                                        style={{ color: active ? 'var(--nav-active-text, #fff)' : 'var(--text-2)' }}
                                        title={link.name}
                                    >
                                        {/* Sliding background pill */}
                                        {active && (
                                            <motion.span
                                                layoutId="nav-pill"
                                                className="absolute inset-0 rounded-full"
                                                style={{ background: 'var(--accent)' }}
                                                transition={{ type: 'spring', stiffness: 380, damping: 34, mass: 0.8 }}
                                            />
                                        )}
                                        <span className="relative z-10 flex items-center gap-1.5">
                                            <link.icon
                                                size={15}
                                                className="flex-shrink-0"
                                                style={{ opacity: active ? 1 : 0.65, color: 'inherit' }}
                                            />
                                            <span className="hidden md:inline whitespace-nowrap text-xs font-semibold">
                                                {link.name}
                                            </span>
                                        </span>
                                    </Link>
                                ) : (
                                    <a
                                        key={link.name}
                                        href={`#${link.id}`}
                                        onClick={(e) => handleNavClick(e, link.id)}
                                        className="relative flex items-center justify-center px-2.5 sm:px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/8 active:scale-95"
                                        style={{ color: 'var(--text-2)' }}
                                        title={link.name}
                                    >
                                        <span className="flex items-center gap-1.5">
                                            <link.icon size={15} className="flex-shrink-0 opacity-65" style={{ color: 'inherit' }} />
                                            <span className="hidden md:inline whitespace-nowrap text-xs font-semibold">{link.name}</span>
                                        </span>
                                    </a>
                                );
                            })}
                        </div>

                        {/* Divider */}
                        <div className="w-px h-4 bg-current opacity-10 mx-1 flex-shrink-0" />

                        {/* Theme Toggle */}
                        <motion.button
                            onClick={toggleTheme}
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.94 }}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold flex-shrink-0"
                            style={{
                                background: 'var(--accent)',
                                color: '#ffffff',
                            }}
                            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {theme === 'light' ? (
                                    <motion.span key="dark"
                                        initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
                                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                        exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
                                        transition={{ duration: 0.18 }}
                                        className="flex items-center gap-1"
                                    >
                                        <Moon size={13} /><span className="hidden sm:inline">Dark</span>
                                    </motion.span>
                                ) : (
                                    <motion.span key="light"
                                        initial={{ opacity: 0, rotate: 30, scale: 0.7 }}
                                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                        exit={{ opacity: 0, rotate: -30, scale: 0.7 }}
                                        transition={{ duration: 0.18 }}
                                        className="flex items-center gap-1"
                                    >
                                        <Sun size={13} /><span className="hidden sm:inline">Light</span>
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default Header;
