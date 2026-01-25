import React, { useState, useEffect } from 'react';
import { Home, Scale, Award, GraduationCap, MapPin, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Smooth scroll handler
    const handleNavClick = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                behavior: 'smooth',
                top: element.offsetTop - 100, // Offset for fixed header
            });
        }
    };

    const navLinks = [
        { name: 'Home', id: 'home', icon: Home },
        { name: 'Practice Areas', id: 'practice-areas', icon: Scale },
        { name: 'Milestones', id: 'milestones', icon: Award },
        { name: 'Academics', id: 'academics', icon: GraduationCap },
        { name: 'Contact', id: 'contact', icon: MapPin },
    ];

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-4 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300 pointer-events-none`}
        >
            <div
                className={`
                    pointer-events-auto
                    flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full
                    backdrop-blur-xl border border-white/20 shadow-lg
                    transition-all duration-300
                    ${scrolled ? 'bg-navy/90 dark:bg-navy-dark/90 shadow-xl scale-[0.98]' : 'bg-white/70 dark:bg-navy/70'}
                    max-w-[95vw] sm:max-w-fit overflow-x-auto no-scrollbar
                `}
            >
                {/* Logo / Brand */}
                {/* Logic: Light Mode -> Show Text Name. Dark Mode -> Show nothing (centered aesthetic) or Home Icon acts as anchor */}
                {theme === 'light' && (
                    <div className="hidden lg:flex items-center mr-4 pr-4 border-r border-gray-300 dark:border-gray-700">
                        <span className="font-serif font-bold text-navy whitespace-nowrap">Adv. Shah Alam</span>
                    </div>
                )}

                <div className="flex items-center gap-1 sm:gap-1">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={`#${link.id}`}
                            onClick={(e) => handleNavClick(e, link.id)}
                            className={`
                                relative flex items-center justify-center
                                px-3 py-2 rounded-full text-sm font-medium transition-all duration-300
                                text-gray-600 dark:text-gray-300 hover:text-navy dark:hover:text-white
                                hover:bg-white/50 dark:hover:bg-white/10
                            `}
                        >
                            <link.icon size={18} className="sm:mr-1.5" />
                            <span className="hidden sm:inline whitespace-nowrap">{link.name}</span>
                        </a>
                    ))}
                </div>

                <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1 sm:mx-2"></div>

                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-white/50 dark:hover:bg-white/10 text-gold transition-colors"
                    aria-label="Toggle Theme"
                >
                    {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                </button>
            </div>
        </motion.nav>
    );
};

export default Header;
