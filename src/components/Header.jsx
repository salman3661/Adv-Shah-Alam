import React, { useState, useEffect, useRef } from 'react';
import { Home, Scale, Award, GraduationCap, MapPin, Building2, User, Sun, Moon } from 'lucide-react';
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

            // Determine if at top of page
            setIsAtTop(currentScrollY < 50);

            // Determine scroll direction
            if (currentScrollY < lastScrollY.current - 10) {
                // Scrolling UP - show navbar
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY.current + 10 && currentScrollY > 100) {
                // Scrolling DOWN and past threshold - hide navbar
                setIsVisible(false);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle scroll on location change (if coming from another page)
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    const offset = 80;
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                        behavior: 'smooth',
                        top: elementPosition - offset,
                    });
                }
            }, 100);
        }
    }, [location]);

    // Smooth scroll handler
    const handleNavClick = (e, id) => {
        e.preventDefault();

        if (location.pathname !== '/') {
            navigate(`/#${id}`);
            return;
        }

        const element = document.getElementById(id);
        if (element) {
            const offset = 80; // Offset for floating navbar
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                behavior: 'smooth',
                top: elementPosition - offset,
            });
            // Update URL hash without jumping
            window.history.pushState(null, '', `#${id}`);
        }
    };

    const navLinks = [
        { name: 'Home', id: 'home', icon: Home },
        { name: 'About', id: 'about', icon: User },
        { name: 'Practice', id: 'practice-areas', icon: Scale },
        { name: 'Journey', id: 'timeline', icon: Award },
        { name: 'Chambers', id: 'chambers', icon: Building2 },
        { name: 'Contact', id: 'contact', icon: MapPin },
    ];

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.nav
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{
                        duration: 0.4,
                        ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
                >
                    <div
                        className={`
                            pointer-events-auto
                            flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3
                            rounded-full navbar-glass
                            transition-all duration-500
                            ${isAtTop
                                ? 'bg-white/40 dark:bg-navy/40 border-white/20 dark:border-white/5'
                                : 'bg-white/70 dark:bg-navy/95 shadow-lg border-white/30 dark:border-white/10'
                            }
                            max-w-[95vw] sm:max-w-fit overflow-x-auto no-scrollbar
                        `}
                    >
                        {/* Navigation Links */}
                        <div className="flex items-center gap-0.5 sm:gap-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={`#${link.id}`}
                                    onClick={(e) => handleNavClick(e, link.id)}
                                    className={`
                                        relative flex items-center justify-center
                                        px-2.5 sm:px-3 py-2 rounded-full text-sm font-medium 
                                        transition-all duration-300
                                        text-slate-600 dark:text-gray-300 
                                        hover:text-navy dark:hover:text-white
                                        hover:bg-white/60 dark:hover:bg-white/10
                                        active:scale-95
                                    `}
                                    title={link.name}
                                >
                                    <link.icon size={18} className="sm:mr-1.5 flex-shrink-0" />
                                    <span className="hidden md:inline whitespace-nowrap">{link.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default Header;
