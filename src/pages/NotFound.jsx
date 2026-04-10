import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Scale, Home, BookOpen, Phone } from 'lucide-react';
import { waLink } from '../data/contactInfo';

const NotFound = () => (
    <>
        <Helmet>
            <title>Page Not Found – 404 | Advocate Md. Shah Alam</title>
            <meta name="description" content="The page you are looking for does not exist. Return to the homepage of Advocate Md. Shah Alam – trusted lawyer in Uttara, Dhaka." />
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
                        <p className="label-accent mb-3">Error 404</p>
                        <h1
                            className="text-3xl md:text-4xl font-serif font-bold mb-4"
                            style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}
                        >
                            Page Not Found
                        </h1>
                        <p className="text-base leading-relaxed max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
                            The page you are looking for doesn't exist or has been moved.
                            You can navigate back to explore our legal services.
                        </p>
                    </div>

                    {/* CTA buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <Link to="/" className="btn-primary text-sm flex items-center gap-2 justify-center">
                            <Home size={16} /> Back to Home
                        </Link>
                        <Link to="/blog" className="btn-outline text-sm flex items-center gap-2 justify-center">
                            <BookOpen size={16} /> Read Legal Guides
                        </Link>
                        <a
                            href={waLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-whatsapp text-sm flex items-center gap-2 justify-center"
                        >
                            <Phone size={16} /> Get Legal Help
                        </a>
                    </div>

                    {/* Quick links */}
                    <div className="w-full pt-4" style={{ borderTop: '1px solid var(--card-border)' }}>
                        <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-muted)' }}>
                            Popular Legal Services
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {[
                                { to: '/services/criminal-lawyer', label: 'Criminal Lawyer' },
                                { to: '/services/bail-lawyer', label: 'Bail Lawyer' },
                                { to: '/services/divorce-lawyer', label: 'Divorce Lawyer' },
                                { to: '/services/land-lawyer', label: 'Land Lawyer' },
                                { to: '/services/supreme-court-lawyer', label: 'Supreme Court' },
                            ].map(({ to, label }) => (
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
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
);

export default NotFound;
