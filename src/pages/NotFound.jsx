import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Scale, Home, BookOpen, Phone } from 'lucide-react';
import { waLink } from '../data/contactInfo';

const NotFound = () => {
    const location = useLocation();
    const isBn = location.pathname.startsWith('/bn') ||
        (!location.pathname.startsWith('/en') &&
         !location.pathname.startsWith('/blog') &&
         !location.pathname.startsWith('/advocate-md-shah-alam') &&
         !location.pathname.startsWith('/contact') &&
         !location.pathname.startsWith('/privacy-policy') &&
         !location.pathname.startsWith('/terms') &&
         !location.pathname.startsWith('/services'));

    return (
        <>
            <Helmet>
                <title>{isBn ? 'পেজ পাওয়া যায়নি – ৪০৪ | এডভোকেট মোঃ শাহ আলম' : 'Page Not Found – 404 | Advocate Md. Shah Alam'}</title>
                <meta name="description" content={isBn
                    ? 'আপনি যে পেজটি খুঁজছেন তা পাওয়া যায়নি। এডভোকেট মোঃ শাহ আলম-এর হোমপেজে ফিরে যান।'
                    : 'The page you are looking for does not exist. Return to the homepage of Advocate Md. Shah Alam – trusted lawyer in Uttara, Dhaka.'
                } />
                <meta name="robots" content="noindex, follow" />
            </Helmet>

            <section
                className="min-h-screen flex items-center justify-center pt-20 pb-20"
                style={{ background: 'var(--bg)' }}
            >
                <div className="container mx-auto px-6 max-w-2xl text-center">
                    <div className="glass-card p-12 flex flex-col items-center gap-6">
                        {/* Icon */}
                        <div
                            className="w-20 h-20 rounded-2xl flex items-center justify-center"
                            style={{ background: 'var(--accent-subtle)', border: '1px solid var(--card-border)' }}
                        >
                            <Scale size={40} style={{ color: 'var(--accent)' }} />
                        </div>

                        {/* Headline */}
                        <div>
                            <p className="label-accent mb-3">{isBn ? 'এরর ৪০৪' : 'Error 404'}</p>
                            <h1
                                className="text-3xl md:text-4xl font-serif font-bold mb-4"
                                style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}
                            >
                                {isBn ? 'পেজ পাওয়া যায়নি' : 'Page Not Found'}
                            </h1>
                            <p className="text-base leading-relaxed max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
                                {isBn
                                    ? 'আপনি যে পেজটি খুঁজছেন সেটি নেই বা সরানো হয়েছে। আমাদের আইনি সেবা সম্পর্কে জানতে হোমপেজে ফিরে যান।'
                                    : "The page you are looking for doesn't exist or has been moved. You can navigate back to explore our legal services."
                                }
                            </p>
                        </div>

                        {/* CTA buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                            <Link to={isBn ? '/' : '/en'} className="btn-primary text-sm flex items-center gap-2 justify-center">
                                <Home size={16} /> {isBn ? 'হোমে ফিরুন' : 'Back to Home'}
                            </Link>
                            <Link to={isBn ? '/bn/blog' : '/blog'} className="btn-outline text-sm flex items-center gap-2 justify-center">
                                <BookOpen size={16} /> {isBn ? 'আইনি নিবন্ধ পড়ুন' : 'Read Legal Guides'}
                            </Link>
                            <a
                                href={waLink()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-whatsapp text-sm flex items-center gap-2 justify-center"
                            >
                                <Phone size={16} /> {isBn ? 'আইনি সাহায্য নিন' : 'Get Legal Help'}
                            </a>
                        </div>

                        {/* Quick links */}
                        <div className="w-full pt-4" style={{ borderTop: '1px solid var(--card-border)' }}>
                            <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-muted)' }}>
                                {isBn ? 'জনপ্রিয় আইনি সেবাসমূহ' : 'Popular Legal Services'}
                            </p>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {[
                                    { to: '/services/criminal-lawyer', en: 'Criminal Lawyer', bn: 'ফৌজদারি আইনজীবী' },
                                    { to: '/services/bail-lawyer', en: 'Bail Lawyer', bn: 'জামিন আইনজীবী' },
                                    { to: '/services/divorce-lawyer', en: 'Divorce Lawyer', bn: 'তালাক আইনজীবী' },
                                    { to: '/services/land-lawyer', en: 'Land Lawyer', bn: 'ভূমি আইনজীবী' },
                                    { to: '/services/supreme-court-lawyer', en: 'Supreme Court', bn: 'সুপ্রিম কোর্ট' },
                                ].map(({ to, en, bn }) => (
                                    <Link
                                        key={to}
                                        to={to}
                                        className="text-xs px-3 py-1.5 rounded-full font-medium hover:opacity-80 transition-opacity"
                                        style={{
                                            border: '1px solid var(--card-border)',
                                            color: 'var(--accent)',
                                            background: 'var(--accent-subtle)',
                                        }}
                                    >
                                        {isBn ? bn : en}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default NotFound;

