import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, FileText } from 'lucide-react';

/**
 * Generic blog article placeholder.
 * Pass `title` and `description` as props via the route element.
 */
const BlogPlaceholder = ({ title, description, metaTitle, metaDesc }) => {
    return (
        <>
            <Helmet>
                <title>{metaTitle || title} | Advocate Md. Shah Alam</title>
                <meta name="description" content={metaDesc || description} />
                <meta name="robots" content="index, follow" />
            </Helmet>

            {/* Hero */}
            <section className="pt-28 pb-16 relative overflow-hidden" style={{ background: 'var(--hero-bg)' }}>
                <div className="container mx-auto px-6 max-w-4xl relative z-10">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm font-medium hover:underline opacity-80 hover:opacity-100 mb-6"
                        style={{ color: 'var(--hero-text-2)' }}
                    >
                        <ArrowLeft size={15} /> Back to Home
                    </Link>
                    <span className="label-accent block mb-4" style={{ color: 'var(--gold)' }}>
                        Legal Guide · Advocate Md. Shah Alam
                    </span>
                    <h1
                        className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight mb-6"
                        style={{ color: 'var(--hero-text)', fontFamily: "'Playfair Display', serif" }}
                    >
                        {title}
                    </h1>
                    <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--hero-text-2)' }}>
                        {description}
                    </p>
                </div>
            </section>

            {/* Coming Soon body */}
            <section className="py-20" style={{ background: 'var(--bg)' }}>
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <div
                        className="glass-card inline-flex flex-col items-center gap-5 px-12 py-14"
                        style={{ borderColor: 'var(--accent)' }}
                    >
                        <FileText size={40} style={{ color: 'var(--accent)' }} />
                        <h2
                            className="text-xl md:text-2xl font-serif font-bold"
                            style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}
                        >
                            Full Article Coming Soon
                        </h2>
                        <p className="text-sm max-w-md" style={{ color: 'var(--text-muted)' }}>
                            We are preparing a comprehensive legal guide on this topic. In the meantime, contact
                            Advocate Md. Shah Alam directly for expert advice on this matter.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 mt-2">
                            <a
                                href="https://wa.me/8801955802007"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-whatsapp text-sm"
                            >
                                WhatsApp Consultation
                            </a>
                            <Link to="/#contact" className="btn-secondary text-sm">
                                Send a Message
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BlogPlaceholder;
