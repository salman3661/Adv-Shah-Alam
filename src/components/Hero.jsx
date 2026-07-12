import React from 'react';
import { motion } from 'framer-motion';
import { waLink } from '../data/contactInfo';
import { MessageCircle, ArrowRight, Scale, Shield } from 'lucide-react';
import heroContent from '../content/hero.json';

const Hero = () => {
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center pt-16 overflow-hidden"
            style={{ background: 'var(--hero-bg)' }}
        >
            {/* Background layered glassy orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div style={{
                    position: 'absolute', top: '15%', right: '10%',
                    width: '520px', height: '520px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(26,63,191,0.18) 0%, transparent 65%)',
                    filter: 'blur(40px)',
                }} />
                <div style={{
                    position: 'absolute', bottom: '10%', left: '5%',
                    width: '380px', height: '380px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(184,146,42,0.12) 0%, transparent 65%)',
                    filter: 'blur(50px)',
                }} />
                <div style={{
                    position: 'absolute', top: '50%', left: '40%',
                    width: '300px', height: '300px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 65%)',
                    filter: 'blur(60px)',
                }} />
                {/* Subtle grid overlay */}
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }} />
            </div>

            <div className="container mx-auto px-6 relative z-10 w-full grid md:grid-cols-2 gap-10 lg:gap-16 items-center">

                {/* ── Profile Photo ── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.88, x: 40 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="flex justify-center md:justify-end order-1 md:order-2"
                >
                    <div className="hero-float relative w-full max-w-xs lg:max-w-sm" style={{ aspectRatio: '4/5' }}>
                        {/* Glassy ring glow behind photo */}
                        <div style={{
                            position: 'absolute', inset: '-12px', borderRadius: '1.5rem',
                            background: 'linear-gradient(135deg, rgba(184,146,42,0.2) 0%, rgba(26,63,191,0.15) 50%, transparent 100%)',
                            filter: 'blur(16px)', zIndex: 0,
                        }} />
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl group"
                            style={{
                                border: '1.5px solid rgba(184,146,42,0.25)',
                                boxShadow: '0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04) inset',
                                zIndex: 1, height: '100%',
                            }}>
                            <picture>
                                <source srcSet="/images/hero/hero-md-shah-alam.webp" type="image/webp" />
                                <img
                                    src="/images/hero/hero-md-shah-alam.png"
                                    alt={heroContent.photoAlt}
                                    loading="eager"
                                    fetchpriority="high"
                                    decoding="async"
                                    width="600"
                                    height="750"
                                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://placehold.co/600x800/1D4ED8/FFFFFF?text=Adv.+Shah+Alam';
                                    }}
                                />
                            </picture>

                            {/* Bottom gradient overlay */}
                            <div style={{
                                position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%',
                                background: 'linear-gradient(to top, rgba(10,17,32,0.92) 0%, rgba(10,17,32,0.4) 60%, transparent 100%)',
                            }} />

                            {/* Bottom badge */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.6, type: 'spring', stiffness: 220 }}
                                style={{
                                    position: 'absolute', bottom: '1.25rem', right: '1rem',
                                    background: 'linear-gradient(135deg, #1A3FBF, #2563EB)',
                                    backdropFilter: 'blur(12px)',
                                    color: '#fff', fontSize: '0.72rem', fontWeight: 700,
                                    padding: '0.45rem 0.875rem', borderRadius: '0.5rem',
                                    boxShadow: '0 4px 16px rgba(26,63,191,0.4)',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                }}
                            >
                                {heroContent.photoBadgeBottom}
                            </motion.div>

                            {/* Top badge */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.8, type: 'spring', stiffness: 220 }}
                                style={{
                                    position: 'absolute', top: '1rem', left: '1rem',
                                    background: 'rgba(0,0,0,0.6)',
                                    backdropFilter: 'blur(14px)',
                                    WebkitBackdropFilter: 'blur(14px)',
                                    color: '#B8922A', fontSize: '0.7rem', fontWeight: 700,
                                    padding: '0.375rem 0.75rem', borderRadius: '0.5rem',
                                    border: '1px solid rgba(184,146,42,0.35)',
                                    display: 'flex', alignItems: 'center', gap: '0.35rem',
                                }}
                            >
                                <Scale size={11} /> {heroContent.photoBadgeTop}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* ── Text Side ── */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.85, ease: 'easeOut', delay: 0.2 }}
                    className="text-center md:text-left order-2 md:order-1"
                >
                    {/* Label badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.375rem 0.875rem', borderRadius: '9999px', marginBottom: '1.5rem',
                            background: 'rgba(184,146,42,0.1)',
                            border: '1px solid rgba(184,146,42,0.28)',
                            backdropFilter: 'blur(8px)',
                        }}
                    >
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#B8922A', display: 'inline-block' }} />
                        <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#B8922A' }}>
                            {heroContent.labelBadge}
                        </span>
                    </motion.div>

                    {/* SEO H1 */}
                    <h1 style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                        fontWeight: 800, lineHeight: 1.15, marginBottom: '1.25rem',
                        color: 'var(--hero-text)', letterSpacing: '-0.02em',
                    }}>
                        {heroContent.headline}{' '}
                        <span style={{ color: '#60A5FA' }}>{heroContent.headlineAccent}</span>
                    </h1>

                    {/* Credential highlight cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45, duration: 0.5 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.375rem' }}
                    >
                        {/* Credential 1 */}
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.625rem',
                            padding: '0.5rem 1rem', borderRadius: '0.625rem',
                            background: 'linear-gradient(135deg, rgba(184,146,42,0.12) 0%, rgba(184,146,42,0.05) 100%)',
                            border: '1px solid rgba(184,146,42,0.22)',
                            backdropFilter: 'blur(10px)',
                            maxWidth: 'fit-content',
                        }}>
                            <Scale size={14} style={{ color: '#B8922A', flexShrink: 0 }} />
                            <div>
                                <span style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#B8922A', display: 'block', lineHeight: 1 }}>Designation</span>
                                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--hero-text)', lineHeight: 1.3 }}>
                                    Advocate, <span style={{ color: '#FBBF24' }}>Supreme Court of Bangladesh</span>
                                </span>
                            </div>
                        </div>

                        {/* Credential 2 */}
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.625rem',
                            padding: '0.5rem 1rem', borderRadius: '0.625rem',
                            background: 'linear-gradient(135deg, rgba(96,165,250,0.1) 0%, rgba(96,165,250,0.04) 100%)',
                            border: '1px solid rgba(96,165,250,0.2)',
                            backdropFilter: 'blur(10px)',
                            maxWidth: 'fit-content',
                        }}>
                            <Shield size={14} style={{ color: '#60A5FA', flexShrink: 0 }} />
                            <div>
                                <span style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#60A5FA', display: 'block', lineHeight: 1 }}>Former</span>
                                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--hero-text)', lineHeight: 1.3 }}>
                                    Asst. Public Prosecutor, <span style={{ color: '#93C5FD' }}>Metro Sessions Court, Dhaka</span>
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* SEO Subheading */}
                    <p style={{
                        fontSize: '1.0625rem', lineHeight: 1.75, maxWidth: '520px',
                        margin: '0 auto 0.875rem', color: 'var(--hero-text-2)', fontWeight: 500,
                    }} className="md:mx-0">
                        {heroContent.subheading}
                    </p>

                    {/* Keyword-rich intro */}
                    <p style={{
                        fontSize: '0.9rem', lineHeight: 1.8, maxWidth: '500px',
                        margin: '0 auto 1.625rem', color: 'var(--hero-muted)',
                    }} className="md:mx-0">
                        {heroContent.description}
                    </p>

                    {/* Available status badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.5 }}
                        className="flex items-center gap-2 justify-center md:justify-start mb-5"
                    >
                        <span style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.375rem 0.875rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700,
                            background: 'rgba(34,197,94,0.1)', color: '#4ADE80', border: '1px solid rgba(34,197,94,0.22)',
                        }}>
                            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 6px rgba(34,197,94,0.7)', animation: 'hero-pulse 2s ease-in-out infinite' }} />
                            Available for Consultation
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--hero-muted)' }}>· Free WhatsApp advice</span>
                    </motion.div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-7">
                        <motion.a
                            href={waLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.04, boxShadow: '0 8px 28px rgba(34,197,94,0.45)' }}
                            whileTap={{ scale: 0.96 }}
                            className="btn-whatsapp text-sm"
                        >
                            <MessageCircle size={17} />
                            {heroContent.cta1Label}
                        </motion.a>

                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            style={{
                                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                padding: '0.8rem 1.75rem', borderRadius: '0.75rem', fontSize: '0.9rem', fontWeight: 600,
                                border: '1.5px solid rgba(184,146,42,0.35)', color: '#B8922A',
                                background: 'rgba(184,146,42,0.07)', textDecoration: 'none',
                                backdropFilter: 'blur(8px)', transition: 'all 0.2s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(184,146,42,0.14)'; e.currentTarget.style.borderColor = 'rgba(184,146,42,0.55)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(184,146,42,0.07)'; e.currentTarget.style.borderColor = 'rgba(184,146,42,0.35)'; }}
                        >
                            {heroContent.cta2Label}
                            <ArrowRight size={17} />
                        </motion.a>
                    </div>

                    {/* Speciality tags */}
                    <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
                        {heroContent.tags.map((tag) => (
                            <span key={tag} style={{
                                fontSize: '0.72rem', padding: '0.3rem 0.75rem', borderRadius: '9999px', fontWeight: 600,
                                border: '1px solid rgba(255,255,255,0.1)', color: 'var(--hero-muted)',
                                background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(6px)',
                                transition: 'all 0.2s',
                            }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;