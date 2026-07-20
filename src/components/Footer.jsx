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

    const isBn = !location.pathname.startsWith('/en') &&
                 !location.pathname.startsWith('/blog') &&
                 !location.pathname.startsWith('/advocate-md-shah-alam') &&
                 !location.pathname.startsWith('/contact') &&
                 !location.pathname.startsWith('/privacy-policy') &&
                 !location.pathname.startsWith('/terms');

    const serviceLinks = siteInfo.footerServiceLinks.map(link => {
        let name = link.name;
        if (isBn) {
            if (link.name === 'Criminal Defense') name = 'ফৌজদারি মামলা';
            else if (link.name === 'Divorce & Family Law') name = 'পারিবারিক ও বিবাহবিচ্ছেদ';
            else if (link.name === 'Land & Property Disputes') name = 'ভূমি ও জমিজমা';
            else if (link.name === 'Bail Applications') name = 'জামিনের আবেদন';
            else if (link.name === 'Supreme Court Matters') name = 'সুপ্রীম কোর্ট মামলা';
            else if (link.name === 'Company & Corporate Law') name = 'কোম্পানি ও করপোরেট';
        }
        return { ...link, name };
    });

    const quickLinks = [
        { name: isBn ? 'হোম' : 'Home', path: isBn ? '/' : '/en' },
        { name: isBn ? 'আইনজীবী সম্পর্কে' : 'About Advocate', path: '/advocate-md-shah-alam' },
        { name: isBn ? 'সেবাসমূহ' : 'Services', path: isBn ? '/#services' : '/en#services' },
        { name: isBn ? 'প্রশ্নোত্তর' : 'FAQ', path: isBn ? '/#faq' : '/en#faq' },
        { name: isBn ? 'ব্লগ' : 'Blog', path: isBn ? '/bn/blog' : '/blog' },
        { name: isBn ? 'যোগাযোগ' : 'Contact Us', path: '/contact' },
    ];

    const linkClass = "block text-sm transition-colors duration-200 hover:opacity-100 opacity-70 hover:underline decoration-dotted";

    return (
        <footer className="py-16 transition-colors" style={{ background: 'var(--surface)', borderTop: '1px solid var(--card-border)' }}>
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

                    {/* Brand */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <h3 className="font-serif font-bold text-2xl mb-1" style={{ color: 'var(--text)', fontFamily: isBn ? 'inherit' : "'Playfair Display', serif" }}>
                            {isBn ? 'এডভোকেট মোঃ শাহ আলম' : 'Adv. Md. Shah Alam'}
                        </h3>
                        <p className="text-sm font-semibold mb-3" style={{ color: 'var(--accent)' }}>
                            {isBn ? 'বাংলাদেশ সুপ্রীম কোর্ট' : 'Supreme Court of Bangladesh'}
                        </p>
                        <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
                            {isBn
                                ? 'এডভোকেট মোঃ শাহ আলম — ঢাকা উত্তরা ও সুপ্রীম কোর্টের একজন অভিজ্ঞ আইনজীবী। ১০ বছরেরও বেশি সময় ধরে তিনি ফৌজদারি, পারিবারিক, ভূমি ও করপোরেট আইনে সফলতার সাথে আইনি সেবা দিয়ে আসছেন।'
                                : siteInfo.footerBio}
                        </p>
                        <div className="flex items-start gap-2 text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
                            <MapPin size={12} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--gold)' }} />
                            {isBn ? 'বাড়ি ৪৬, রাস্তা ৬/বি, সেক্টর ১২, উত্তরা, ঢাকা-১২৩০' : siteInfo.chamberAddress}
                        </div>
                        <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                            <Phone size={12} className="flex-shrink-0" style={{ color: 'var(--gold)' }} />
                            {CALL_DISPLAY}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider mb-4" style={{ color: 'var(--text)' }}>
                            {isBn ? 'সহজ লিঙ্ক' : 'Quick Links'}
                        </h4>
                        <nav className="space-y-2">
                            {quickLinks.map((link) => (
                                <Link key={link.path} to={link.path}
                                    className={linkClass} style={{ color: 'var(--text-2)' }}>{link.name}</Link>
                            ))}
                        </nav>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider mb-4" style={{ color: 'var(--text)' }}>
                            {isBn ? 'আইনি সেবাসমূহ' : 'Practice Areas'}
                        </h4>
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
                        <h4 className="font-bold text-xs uppercase tracking-wider mb-4" style={{ color: 'var(--text)' }}>
                            {isBn ? 'যোগাযোগ করুন' : 'Connect With Us'}
                        </h4>
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
                <div className="pt-8 flex flex-col items-center justify-center text-center gap-4"
                    style={{ borderTop: '1px solid var(--card-border)' }}>
                    <div className="w-full flex flex-col items-center">
                        <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
                            © {currentYear} {siteInfo.advocateName}. All Rights Reserved.
                        </p>
                        <div className="flex gap-3 justify-center mt-1">
                            <Link to="/privacy-policy" className="text-xs hover:underline transition-opacity opacity-60 hover:opacity-100"
                                style={{ color: 'var(--text-muted)' }}>Privacy Policy</Link>
                            <span className="text-xs opacity-30" style={{ color: 'var(--text-muted)' }}>|</span>
                            <Link to="/terms" className="text-xs hover:underline transition-opacity opacity-60 hover:opacity-100"
                                style={{ color: 'var(--text-muted)' }}>Terms & Conditions</Link>
                        </div>
                        <p className="text-xs mt-3 max-w-2xl mx-auto" style={{ color: 'var(--text-muted)', opacity: 0.55, lineHeight: 1.6 }}>
                            <strong>Disclaimer:</strong> The information on this website is for general informational purposes only and does not constitute legal advice. Visiting this site or contacting us does not create an attorney-client relationship. Please consult a qualified advocate for advice specific to your situation.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
