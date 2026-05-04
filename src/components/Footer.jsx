import React from 'react';
import { Facebook, MessageCircle, Phone, Sun, Moon, MapPin, Mail } from 'lucide-react';
import { CALL_DISPLAY, telLink, waLink } from '../data/contactInfo';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import siteInfo from '../content/siteInfo.json';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { theme, toggleTheme } = useTheme();

    const scrollTo = (e, id) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const serviceLinks = siteInfo.footerServiceLinks;

    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/#about' },
        { name: 'Services', path: '/#services' },
        { name: 'FAQ', path: '/#faq' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/#contact' },
    ];

    const advocatePageLink = { name: 'About the Advocate', path: '/advocate-md-shah-alam' };

    const linkClass = "block text-sm transition-colors duration-200 hover:opacity-100 opacity-70 hover:underline decoration-dotted";

    return (
        <footer className="py-16 transition-colors" style={{ background: 'var(--surface)', borderTop: '1px solid var(--card-border)' }}>
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

                    {/* Brand */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <h3 className="font-serif font-bold text-2xl mb-1" style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
                            Adv. Md. Shah Alam
                        </h3>
                        <p className="text-sm font-semibold mb-3" style={{ color: 'var(--accent)' }}>Supreme Court of Bangladesh</p>
                        <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
                            {siteInfo.footerBio}
                        </p>
                        <div className="flex items-start gap-2 text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
                            <MapPin size={12} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--gold)' }} />
                            {siteInfo.chamberAddress}
                        </div>
                        <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                            <Phone size={12} className="flex-shrink-0" style={{ color: 'var(--gold)' }} />
                            {CALL_DISPLAY}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider mb-4" style={{ color: 'var(--text)' }}>Quick Links</h4>
                        <nav className="space-y-2">
                            {quickLinks.map((link) => (
                                <Link key={link.path} to={link.path}
                                    className={linkClass} style={{ color: 'var(--text-2)' }}>{link.name}</Link>
                            ))}
                            <Link to={advocatePageLink.path} className={linkClass} style={{ color: 'var(--text-2)' }}>
                                {advocatePageLink.name}
                            </Link>
                        </nav>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider mb-4" style={{ color: 'var(--text)' }}>Practice Areas</h4>
                        <nav className="space-y-2">
                            {serviceLinks.map((link) => (
                                <Link key={link.path} to={link.path} className={linkClass} style={{ color: 'var(--text-2)' }}>
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider mb-4" style={{ color: 'var(--text)' }}>Connect With Us</h4>
                        <div className="space-y-2 mb-5">
                            <a href={telLink()} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-2)' }}>
                                <Phone size={14} style={{ color: 'var(--accent)' }} />{CALL_DISPLAY}
                            </a>
                            <a href={`mailto:${siteInfo.email}`} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-2)' }}>
                                <Mail size={14} style={{ color: 'var(--accent)' }} />{siteInfo.email}
                            </a>
                        </div>
                        <div className="flex gap-2 mb-5">
                            <a href={waLink()} target="_blank" rel="noopener noreferrer"
                                aria-label="Chat on WhatsApp"
                                className="w-9 h-9 rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
                                style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
                                <MessageCircle size={16} className="icon-whatsapp" />
                            </a>
                            <a href={siteInfo.facebookUrl} target="_blank" rel="noopener noreferrer"
                                aria-label="Follow us on Facebook"
                                className="w-9 h-9 rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
                                style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
                                <Facebook size={16} className="icon-facebook" />
                            </a>
                        </div>
                        <a href={siteInfo.googleMapsUrl} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-full transition-colors hover:opacity-80"
                            style={{ border: '1px solid var(--card-border)', color: 'var(--text-2)' }}>
                            ⭐ Google Business Profile
                        </a>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 flex-wrap"
                    style={{ borderTop: '1px solid var(--card-border)' }}>
                    <div className="text-center md:text-left">
                        <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
                            © {currentYear} {siteInfo.advocateName}. All Rights Reserved.
                        </p>
                    </div>

                    <button onClick={toggleTheme}
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105"
                        style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', color: 'var(--text)' }}>
                        {theme === 'light'
                            ? <><Moon size={13} style={{ color: 'var(--accent)' }} /><span>Dark Mode</span></>
                            : <><Sun size={13} style={{ color: 'var(--gold)' }} /><span>Light Mode</span></>
                        }
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
