import React from 'react';
import { motion } from 'framer-motion';
import { waLink } from '../data/contactInfo';
import heroContent from '../content/hero.json';

const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
});

const Hero = () => (
    <section
        id="home"
        className="relative overflow-hidden"
        style={{ background: 'var(--hero-section-bg)', minHeight: '100vh', display: 'flex', alignItems: 'center' }}
    >
        {/* Subtle radial glow */}
        <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 70% 55% at 68% 50%, var(--hero-glow-a) 0%, transparent 72%)',
        }} />
        <div style={{
            position: 'absolute', top: '-6%', left: '-3%', width: '380px', height: '380px',
            borderRadius: '50%', background: 'var(--hero-glow-b)', filter: 'blur(80px)', opacity: 0.5, pointerEvents: 'none',
        }} />

        <div className="container mx-auto px-6 relative z-10" style={{ paddingTop: '5.5rem', paddingBottom: '3rem' }}>
            <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">

                {/* ── LEFT ── */}
                <div className="order-2 md:order-1">

                    {/* Stat pills */}
                    <motion.div {...fade(0)} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        {[
                            { label: '10+ Years Experience' },
                            { label: 'Supreme Court Advocate' },
                            { label: 'Uttara, Dhaka' },
                        ].map((s, i) => (
                            <span key={i} style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.38rem',
                                padding: '0.28rem 0.85rem', borderRadius: '9999px',
                                fontSize: '0.71rem', fontWeight: 600,
                                background: 'var(--hero-pill-bg)', border: '1px solid var(--hero-pill-border)',
                                color: 'var(--hero-pill-text)',
                            }}>
                                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--hero-accent)', flexShrink: 0 }} />
                                {s.label}
                            </span>
                        ))}
                    </motion.div>

                    {/* H1 */}
                    <motion.h1 {...fade(0.07)} style={{
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                        fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                        fontWeight: 800, lineHeight: 1.13, marginBottom: '0.75rem',
                        color: 'var(--hero-heading)', letterSpacing: '-0.03em',
                    }}>
                        {heroContent.headline}{' '}
                        <span style={{ color: 'var(--hero-accent)' }}>{heroContent.headlineAccent}</span>
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p {...fade(0.13)} style={{
                        fontSize: '0.97rem', lineHeight: 1.68, marginBottom: '1.5rem',
                        color: 'var(--hero-sub)', fontWeight: 400, maxWidth: '450px',
                    }}>
                        {heroContent.subheading}
                    </motion.p>

                    {/* ── Credentials — highlighted cards ── */}
                    <motion.div {...fade(0.2)} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>

                        {/* Designation */}
                        <div style={{
                            display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                            padding: '0.65rem 0.9rem', borderRadius: '0.6rem',
                            background: 'var(--hero-cred-bg)',
                            border: '1px solid var(--hero-cred-border)',
                            boxShadow: '0 1px 6px var(--hero-cred-shadow)',
                        }}>
                            <div style={{
                                width: '3px', minHeight: '36px', borderRadius: '2px',
                                background: 'var(--hero-accent)', flexShrink: 0, marginTop: '2px',
                            }} />
                            <div>
                                <div style={{ fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--hero-label)', marginBottom: '0.18rem' }}>Designation</div>
                                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--hero-heading)' }}>
                                    Advocate,{' '}
                                    <span style={{
                                        color: '#fff', background: 'var(--hero-accent)',
                                        padding: '0.1rem 0.55rem', borderRadius: '0.3rem',
                                        fontSize: '0.82rem', fontWeight: 700,
                                    }}>
                                        Supreme Court of Bangladesh
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Former */}
                        <div style={{
                            display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                            padding: '0.65rem 0.9rem', borderRadius: '0.6rem',
                            background: 'var(--hero-cred-bg)',
                            border: '1px solid var(--hero-cred-border)',
                            boxShadow: '0 1px 6px var(--hero-cred-shadow)',
                        }}>
                            <div style={{
                                width: '3px', minHeight: '36px', borderRadius: '2px',
                                background: 'var(--hero-gold)', flexShrink: 0, marginTop: '2px',
                            }} />
                            <div>
                                <div style={{ fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--hero-label)', marginBottom: '0.18rem' }}>Former</div>
                                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--hero-heading)' }}>
                                    Asst. Public Prosecutor,{' '}
                                    <span style={{
                                        color: 'var(--hero-gold)',
                                        borderBottom: '2px solid var(--hero-gold)',
                                        paddingBottom: '1px',
                                    }}>
                                        Metro Sessions Court, Dhaka
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Chamber/Location */}
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.42rem 0.9rem', borderRadius: '0.5rem',
                            background: 'var(--hero-cred-bg)', border: '1px solid var(--hero-cred-border)',
                            width: 'fit-content',
                        }}>
                            <span style={{ fontSize: '0.75rem', color: 'var(--hero-label)', fontWeight: 500 }}>📍</span>
                            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--hero-sub)' }}>
                                Chamber: <strong style={{ color: 'var(--hero-heading)' }}>Uttara, Dhaka</strong>
                            </span>
                        </div>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div {...fade(0.27)} style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
                        {/* WhatsApp — green */}
                        <a href={waLink()} target="_blank" rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                padding: '0.72rem 1.4rem', borderRadius: '0.6rem',
                                background: '#25D366', color: '#fff',
                                fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none',
                                boxShadow: '0 4px 14px rgba(37,211,102,0.35)',
                                transition: 'opacity 0.2s, transform 0.15s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none'; }}
                        >
                            {/* WhatsApp SVG icon */}
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            {heroContent.cta1Label}
                        </a>
                        {/* Secondary */}
                        <a href="#contact"
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                                padding: '0.72rem 1.4rem', borderRadius: '0.6rem',
                                background: 'var(--hero-cta-sec-bg)', color: 'var(--hero-cta-sec-text)',
                                fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none',
                                border: '1.5px solid var(--hero-cta-sec-border)',
                                transition: 'background 0.18s, border-color 0.18s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'var(--hero-cta-sec-hover)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'var(--hero-cta-sec-bg)'; }}
                        >
                            {heroContent.cta2Label} →
                        </a>
                    </motion.div>
                </div>

                {/* ── RIGHT: Photo ── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    className="order-1 md:order-2 flex justify-center md:justify-end"
                >
                    <div style={{ position: 'relative', width: '100%', maxWidth: '340px', aspectRatio: '4/5' }}>
                        <div style={{
                            position: 'absolute', inset: '-14px', borderRadius: '2rem',
                            background: 'var(--hero-photo-glow)', filter: 'blur(28px)', zIndex: 0,
                        }} />
                        <div style={{
                            position: 'relative', borderRadius: '1.4rem', overflow: 'hidden',
                            border: '1px solid var(--hero-photo-border)',
                            boxShadow: '0 20px 56px var(--hero-photo-shadow)',
                            height: '100%', zIndex: 1,
                        }}>
                            <picture>
                                <source srcSet="/images/hero/hero-md-shah-alam.webp" type="image/webp" />
                                <img
                                    src="/images/hero/hero-md-shah-alam.png"
                                    alt={heroContent.photoAlt}
                                    loading="eager" fetchpriority="high" decoding="async"
                                    width="600" height="750"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                                    onError={e => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x800/1A3FBF/FFFFFF?text=Adv.+Shah+Alam'; }}
                                />
                            </picture>
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '38%', background: 'linear-gradient(to top, rgba(10,17,36,0.7) 0%, transparent 100%)' }} />
                            <div style={{
                                position: 'absolute', bottom: '0.875rem', right: '0.875rem',
                                background: 'var(--hero-accent)', color: '#fff',
                                fontSize: '0.68rem', fontWeight: 700, padding: '0.38rem 0.85rem',
                                borderRadius: '0.4rem', letterSpacing: '0.04em',
                            }}>
                                {heroContent.photoBadgeBottom}
                            </div>
                            <div style={{
                                position: 'absolute', top: '0.875rem', left: '0.875rem',
                                background: 'rgba(10,17,36,0.7)', backdropFilter: 'blur(12px)',
                                WebkitBackdropFilter: 'blur(12px)',
                                color: 'var(--hero-gold)', fontSize: '0.63rem', fontWeight: 700,
                                padding: '0.32rem 0.7rem', borderRadius: '0.4rem',
                                border: '1px solid rgba(198,167,94,0.3)', letterSpacing: '0.04em',
                            }}>
                                {heroContent.photoBadgeTop}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
);

export default Hero;