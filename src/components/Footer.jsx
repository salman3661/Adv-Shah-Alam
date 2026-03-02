import React from 'react';
import { Facebook, MessageCircle, Phone, Sun, Moon, MapPin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { theme, toggleTheme } = useTheme();

    const scrollTo = (e, id) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const serviceLinks = [
        { name: 'Criminal Lawyer in Uttara', path: '/services/criminal-lawyer' },
        { name: 'Divorce & Family Lawyer', path: '/services/divorce-lawyer' },
        { name: 'Land & Property Lawyer', path: '/services/land-lawyer' },
        { name: 'Bail Lawyer in Dhaka', path: '/services/bail-lawyer' },
        { name: 'Supreme Court Lawyer', path: '/services/supreme-court-lawyer' },
        { name: 'Income Tax & VAT Lawyer', path: '/services/tax-lawyer' },
    ];

    const quickLinks = [
        { name: 'Home', id: 'home' },
        { name: 'About', id: 'about' },
        { name: 'Services', id: 'services' },
        { name: 'FAQ', id: 'faq' },
        { name: 'Blog', id: 'blog' },
        { name: 'Contact', id: 'contact' },
    ];

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
                            Trusted advocate in Uttara, Dhaka with 20+ years of legal excellence across criminal, civil, and family law.
                        </p>
                        <div className="flex items-start gap-2 text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
                            <MapPin size={12} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--gold)' }} />
                            Ainjeebi Samity Bhaban, 4th Floor, 6/7 Court House Street, Kotwali, Dhaka-1100
                        </div>
                        <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                            <Phone size={12} className="flex-shrink-0" style={{ color: 'var(--gold)' }} />
                            +880 1712-655546
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider mb-4" style={{ color: 'var(--text)' }}>Quick Links</h4>
                        <nav className="space-y-2">
                            {quickLinks.map((link) => (
                                <a key={link.id} href={`#${link.id}`} onClick={(e) => scrollTo(e, link.id)}
                                    className={linkClass} style={{ color: 'var(--text-2)' }}>{link.name}</a>
                            ))}
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
                            <a href="tel:+8801712655546" className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-2)' }}>
                                <Phone size={14} style={{ color: 'var(--accent)' }} />+880 1712-655546
                            </a>
                            <a href="mailto:shahalam0332@gmail.com" className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-2)' }}>
                                <Mail size={14} style={{ color: 'var(--accent)' }} />shahalam0332@gmail.com
                            </a>
                        </div>
                        <div className="flex gap-2 mb-5">
                            <a href="https://wa.me/8801955802007" target="_blank" rel="noopener noreferrer"
                                aria-label="Chat on WhatsApp"
                                className="w-9 h-9 rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
                                style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
                                <MessageCircle size={16} className="icon-whatsapp" />
                            </a>
                            <a href="https://www.facebook.com/advmd.shahalamfb" target="_blank" rel="noopener noreferrer"
                                aria-label="Follow us on Facebook"
                                className="w-9 h-9 rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
                                style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
                                <Facebook size={16} className="icon-facebook" />
                            </a>
                        </div>
                        <a href="https://g.page/r/advmdshahalam" target="_blank" rel="noopener noreferrer"
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
                            © {currentYear} Advocate Md. Shah Alam. All Rights Reserved.
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                            <Link to="/privacy" className="hover:underline decoration-dotted">Privacy Policy</Link>
                            <span>·</span>
                            <Link to="/sitemap" className="hover:underline decoration-dotted">Sitemap</Link>
                            <span>·</span>
                            <Link to="/blog" className="hover:underline decoration-dotted">Blog</Link>
                        </div>
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
