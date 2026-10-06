import React from 'react';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const ArticleSkeleton = ({ meta, lang = 'en' }) => {
    const isBn = lang === 'bn';
    const title = meta?.title;
    const category = meta?.category || (isBn ? 'আইন পরামর্শ' : 'Legal Guide');
    const readTime = meta?.readTime || (isBn ? '৫ মিনিট পাঠ' : '5 min read');
    const pubDate = meta?.publishedDate ? new Date(meta.publishedDate).toLocaleDateString(isBn ? 'bn-BD' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

    return (
        <div style={{ minHeight: '85vh', background: 'var(--bg)' }}>
            {/* ── HERO SKELETON ── */}
            <section style={{ background: 'var(--hero-bg)', paddingTop: '6.5rem', paddingBottom: '3.5rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, var(--gold), rgba(198,167,94,0.3))' }} />
                <div className="bp-hero-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.25rem' }}>
                    {/* Back link */}
                    <div style={{ marginBottom: '1.25rem' }}>
                        <Link to={isBn ? "/bn/blog" : "/blog"} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', color: 'var(--hero-text-2)', opacity: 0.75, textDecoration: 'none' }}>
                            <ArrowLeft size={14} /> {isBn ? 'ব্লগে ফিরে যান' : 'Back to Blog'}
                        </Link>
                    </div>

                    {/* Category pill */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 800, padding: '0.3rem 0.875rem', borderRadius: '9999px', background: 'rgba(198,167,94,0.15)', color: 'var(--gold)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
                            {category}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--hero-muted)', padding: '0.3rem 0.75rem', borderRadius: '9999px', background: 'rgba(255,255,255,0.05)' }}>
                            <Clock size={12} /> {readTime}
                        </span>
                    </div>

                    {/* Title */}
                    {title ? (
                        <h1 style={{
                            fontFamily: isBn ? "'SolaimanLipi', 'Noto Serif Bengali', serif" : "'Playfair Display', serif",
                            fontSize: 'clamp(1.875rem, 4vw, 3.5rem)',
                            fontWeight: 800, lineHeight: 1.2,
                            color: 'var(--hero-text)',
                            marginBottom: '1.375rem',
                            maxWidth: '900px'
                        }}>
                            {title}
                        </h1>
                    ) : (
                        <div style={{ maxWidth: '850px', marginBottom: '1.375rem' }}>
                            <div style={{ height: '2.5rem', background: 'rgba(255,255,255,0.12)', borderRadius: '0.5rem', marginBottom: '0.75rem', width: '85%', animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
                            <div style={{ height: '2.5rem', background: 'rgba(255,255,255,0.09)', borderRadius: '0.5rem', width: '60%', animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
                        </div>
                    )}

                    {/* Author chip */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                        <img
                            src="/images/hero/hero-md-shah-alam.webp"
                            alt="Advocate Md. Shah Alam"
                            style={{ width: '2.375rem', height: '2.375rem', borderRadius: '50%', objectFit: 'cover' }}
                            width="38"
                            height="38"
                        />
                        <div>
                            <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--hero-text)', margin: 0 }}>
                                {isBn ? 'অ্যাডভোকেট মো. শাহ আলম' : 'Advocate Md. Shah Alam'}
                            </p>
                            <p style={{ fontSize: '0.7rem', color: 'var(--hero-muted)', margin: 0 }}>
                                {isBn ? 'বাংলাদেশ সুপ্রিম কোর্ট' : 'Supreme Court of Bangladesh'}
                            </p>
                        </div>
                        {pubDate && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--hero-muted)', marginLeft: 'auto' }}>
                                <Calendar size={12} /> {pubDate}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ── BODY SKELETON ── */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2.5rem 1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem', maxWidth: '820px' }}>
                    {/* Quick summary placeholder */}
                    <div style={{
                        padding: '1.5rem',
                        borderRadius: '1rem',
                        background: 'linear-gradient(135deg, rgba(198,167,94,0.06), rgba(198,167,94,0.02))',
                        border: '1.5px solid rgba(198,167,94,0.18)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem'
                    }}>
                        <div style={{ width: '160px', height: '1.25rem', background: 'rgba(198,167,94,0.25)', borderRadius: '0.375rem', animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
                        <div style={{ width: '100%', height: '0.875rem', background: 'var(--card-border)', borderRadius: '0.25rem', opacity: 0.6, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
                        <div style={{ width: '90%', height: '0.875rem', background: 'var(--card-border)', borderRadius: '0.25rem', opacity: 0.5, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
                        <div style={{ width: '75%', height: '0.875rem', background: 'var(--card-border)', borderRadius: '0.25rem', opacity: 0.4, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
                    </div>

                    {/* Section 1 placeholder */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                        <div style={{ width: '220px', height: '1.75rem', background: 'var(--card-border)', borderRadius: '0.375rem', opacity: 0.8, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
                        <div style={{ width: '100%', height: '1rem', background: 'var(--card-border)', borderRadius: '0.25rem', opacity: 0.5, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
                        <div style={{ width: '96%', height: '1rem', background: 'var(--card-border)', borderRadius: '0.25rem', opacity: 0.5, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
                        <div style={{ width: '92%', height: '1rem', background: 'var(--card-border)', borderRadius: '0.25rem', opacity: 0.4, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
                        <div style={{ width: '80%', height: '1rem', background: 'var(--card-border)', borderRadius: '0.25rem', opacity: 0.4, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
                    </div>

                    {/* Section 2 placeholder */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                        <div style={{ width: '280px', height: '1.75rem', background: 'var(--card-border)', borderRadius: '0.375rem', opacity: 0.8, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
                        <div style={{ width: '100%', height: '1rem', background: 'var(--card-border)', borderRadius: '0.25rem', opacity: 0.5, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
                        <div style={{ width: '94%', height: '1rem', background: 'var(--card-border)', borderRadius: '0.25rem', opacity: 0.5, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
                        <div style={{ width: '88%', height: '1rem', background: 'var(--card-border)', borderRadius: '0.25rem', opacity: 0.4, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes skeleton-pulse {
                    0%, 100% { opacity: 0.45; }
                    50% { opacity: 0.85; }
                }
            `}</style>
        </div>
    );
};

export default ArticleSkeleton;
