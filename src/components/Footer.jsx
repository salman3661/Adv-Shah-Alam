import React from 'react';
import { Facebook, MessageCircle, Phone, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { theme, toggleTheme } = useTheme();

    const scrollToSection = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="bg-soft-cream dark:bg-navy-dark py-16 border-t border-slate-200/50 dark:border-white/5 transition-colors">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <h3 className="font-serif font-bold text-2xl text-navy dark:text-white mb-3">
                            Adv. Md. Shah Alam
                        </h3>
                        <p className="text-slate-500 dark:text-gray-400 text-sm mb-4">
                            Supreme Court of Bangladesh
                        </p>
                        <p className="text-slate-400 dark:text-gray-500 text-sm leading-relaxed">
                            Dedicated to providing exceptional legal representation with
                            integrity and professionalism.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-navy dark:text-white mb-4 uppercase tracking-wider text-sm">
                            Quick Links
                        </h4>
                        <nav className="space-y-3">
                            {[
                                { name: 'Home', id: 'home' },
                                { name: 'About', id: 'about' },
                                { name: 'Practice Areas', id: 'practice-areas' },
                                { name: 'Journey', id: 'timeline' },
                                { name: 'Chambers', id: 'chambers' },
                                { name: 'Contact', id: 'contact' },
                            ].map((link) => (
                                <a
                                    key={link.id}
                                    href={`#${link.id}`}
                                    onClick={(e) => scrollToSection(e, link.id)}
                                    className="block text-slate-500 dark:text-gray-400 hover:text-gold-dark dark:hover:text-gold transition-colors text-sm"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Contact & Social */}
                    <div>
                        <h4 className="font-bold text-navy dark:text-white mb-4 uppercase tracking-wider text-sm">
                            Connect With Us
                        </h4>
                        <div className="space-y-3 mb-6">
                            <a
                                href="tel:+8801712345678"
                                className="flex items-center gap-2 text-slate-500 dark:text-gray-400 hover:text-gold-dark dark:hover:text-gold transition-colors text-sm"
                            >
                                <Phone size={16} className="icon-phone" />
                                +880 1712-345678
                            </a>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-3">
                            <a
                                href="https://wa.me/8801712345678"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl bg-white dark:bg-navy-light flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
                                aria-label="WhatsApp"
                            >
                                <MessageCircle size={18} className="icon-whatsapp" />
                            </a>
                            <a
                                href="https://facebook.com/advocate.shahalam"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl bg-white dark:bg-navy-light flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
                                aria-label="Facebook"
                            >
                                <Facebook size={18} className="icon-facebook" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright & Theme Toggle */}
                <div className="pt-8 border-t border-slate-200/50 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <p className="text-slate-400 dark:text-gray-500 text-sm">
                            © {currentYear} Advocate Md. Shah Alam. All Rights Reserved.
                        </p>
                        <p className="text-slate-400 dark:text-gray-500 text-xs">
                            Supreme Court of Bangladesh, Dhaka
                        </p>
                    </div>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-navy-light text-navy dark:text-white font-medium text-sm transition-all duration-300 hover:scale-105 shadow-sm"
                        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                    >
                        {theme === 'light' ? (
                            <>
                                <Moon size={16} />
                                <span>Dark Mode 🌙</span>
                            </>
                        ) : (
                            <>
                                <Sun size={16} />
                                <span>Light Mode ☀️</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
