import React from 'react';
import { motion } from 'framer-motion';
import { waLink } from '../data/contactInfo';
import heroContent from '../content/hero.json';

const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

const Hero = () => (
    <section
        id="home"
        className="relative overflow-hidden"
        style={{ background: 'var(--hero-section-bg)', minHeight: '100vh', display: 'flex', alignItems: 'center' }}
    >
        {/* Subtle gradient layer */}
        <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 75% 60% at 65% 50%, var(--hero-glow-a) 0%, transparent 70%)',
        }} />
        <div style={{
            position: 'absolute', top: '-8%', left: '-4%', width: '420px', height: '420px',
            borderRadius: '50%', background: 'var(--hero-glow-b)', filter: 'blur(90px)', opacity: 0.55, pointerEvents: 'none',
        }} />

        <div className="container mx-auto px-6 relative z-10 py-28">
            <div className="grid md:grid-cols-2 gap-10 lg:gap-20 items-center">

                {/* ── LEFT ── */}
                <div className="order-2 md:order-1">

                    {/* Stats row — inspired by reference */}
                    <motion.div {...fade(0)} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', marginBottom: '2rem' }}>
                        {[
                            { label: '20+ Years Experience' },
                            { label: 'Supreme Court Advocate' },
                            { label: 'Uttara, Dhaka' },
                        ].map((s, i) => (
                            <span key={i} style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                                padding: '0.3rem 0.9rem', borderRadius: '9999px',
                                fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.01em',
                                background: 'var(--hero-pill-bg)', border: '1px solid var(--hero-pill-border)',
                                color: 'var(--hero-pill-text)',
                            }}>
                                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--hero-dot)', flexShrink: 0 }} />
                                {s.label}
                            </span>
                        ))}
                    </motion.div>

                    {/* H1 */}
                    <motion.h1 {...fade(0.08)} style={{
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                        fontSize: 'clamp(2.1rem, 4.8vw, 3.4rem)',
                        fontWeight: 800, lineHeight: 1.13, marginBottom: '0.9rem',
                        color: 'var(--hero-heading)', letterSpacing: '-0.03em',
                    }}>
                        {heroContent.headline}{' '}
                        <span style={{ color: 'var(--hero-accent)' }}>{heroContent.headlineAccent}</span>
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p {...fade(0.15)} style={{
                        fontSize: '1.0rem', lineHeight: 1.72, marginBottom: '2rem',
                        color: 'var(--hero-sub)', fontWeight: 400, maxWidth: '460px',
                    }}>
                        {heroContent.subheading}
                    </motion.p>

                    {/* Credentials — clean, no icons */}
                    <motion.div {...fade(0.22)} style={{ display: 'flex', flexDirection: 'column', gap: '0', marginBottom: '2rem', borderLeft: '3px solid var(--hero-accent)', paddingLeft: '1.1rem' }}>
                        <div style={{ marginBottom: '0.75rem' }}>
                            <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--hero-label)', marginBottom: '0.2rem' }}>Designation</div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--hero-heading)' }}>
                                Advocate, <span style={{ color: 'var(--hero-accent)' }}>Supreme Court of Bangladesh</span>
                            </div>
                        </div>
                        <div style={{ marginBottom: '0.75rem' }}>
                            <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--hero-label)', marginBottom: '0.2rem' }}>Former</div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--hero-heading)' }}>
                                Asst. Public Prosecutor,{' '}
                                <span style={{ color: 'var(--hero-accent)' }}>Metro Sessions Court, Dhaka</span>
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--hero-label)', marginBottom: '0.2rem' }}>Chamber</div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--hero-heading)' }}>Uttara, Dhaka</div>
                        </div>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div {...fade(0.3)} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <a href={waLink()} target="_blank" rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                padding: '0.78rem 1.6rem', borderRadius: '0.625rem',
                                background: 'var(--hero-cta-primary-bg)', color: 'var(--hero-cta-primary-text)',
                                fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none',
                                transition: 'opacity 0.2s, transform 0.2s',
                                boxShadow: '0 4px 16px var(--hero-cta-shadow)',
                            }}
                            onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                        >
                            {heroContent.cta1Label}
                        </a>
                        <a href="#contact"
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                padding: '0.78rem 1.6rem', borderRadius: '0.625rem',
                                background: 'var(--hero-cta-sec-bg)', color: 'var(--hero-cta-sec-text)',
                                fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none',
                                border: '1.5px solid var(--hero-cta-sec-border)',
                                transition: 'background 0.2s, border-color 0.2s',
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
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
                    className="order-1 md:order-2 flex justify-center md:justify-end"
                >
                    <div style={{ position: 'relative', width: '100%', maxWidth: '360px', aspectRatio: '4/5' }}>
                        {/* Glow behind photo */}
                        <div style={{
                            position: 'absolute', inset: '-16px', borderRadius: '2rem',
                            background: 'var(--hero-photo-glow)', filter: 'blur(32px)', zIndex: 0,
                        }} />
                        <div style={{
                            position: 'relative', borderRadius: '1.5rem', overflow: 'hidden',
                            border: '1px solid var(--hero-photo-border)',
                            boxShadow: '0 24px 64px var(--hero-photo-shadow)',
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
                            {/* Subtle gradient overlay bottom */}
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(10,17,36,0.68) 0%, transparent 100%)' }} />
                            {/* Photo caption badge */}
                            <div style={{
                                position: 'absolute', bottom: '1rem', right: '1rem',
                                background: 'var(--hero-accent)', color: '#fff',
                                fontSize: '0.7rem', fontWeight: 700, padding: '0.4rem 0.9rem',
                                borderRadius: '0.45rem', letterSpacing: '0.04em',
                            }}>
                                {heroContent.photoBadgeBottom}
                            </div>
                            {/* Top caption */}
                            <div style={{
                                position: 'absolute', top: '0.875rem', left: '0.875rem',
                                background: 'rgba(10,17,36,0.72)', backdropFilter: 'blur(12px)',
                                WebkitBackdropFilter: 'blur(12px)',
                                color: 'var(--hero-gold)', fontSize: '0.65rem', fontWeight: 700,
                                padding: '0.35rem 0.75rem', borderRadius: '0.45rem',
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