import React from 'react';
import { motion } from 'framer-motion';
import { waLink } from '../data/contactInfo';
import { MessageCircle, ArrowRight, Scale, Shield, MapPin } from 'lucide-react';
import heroContent from '../content/hero.json';

const Hero = () => {
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center pt-16 overflow-hidden transition-colors duration-300"
            style={{ background: 'var(--bg)' }}
        >
            {/* Background orbs — theme-aware */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div style={{
                    position: 'absolute', top: '15%', right: '8%',
                    width: '480px', height: '480px', borderRadius: '50%',
                    background: 'radial-gradient(circle, var(--accent-subtle) 0%, transparent 65%)',
                    filter: 'blur(50px)',
                }} />
                <div style={{
                    position: 'absolute', bottom: '10%', left: '5%',
                    width: '360px', height: '360px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(184,146,42,0.07) 0%, transparent 65%)',
                    filter: 'blur(60px)',
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
                        {/* Glow ring */}
                        <div style={{
                            position: 'absolute', inset: '-10px', borderRadius: '1.5rem',
                            background: 'linear-gradient(135deg, var(--accent-subtle) 0%, rgba(184,146,42,0.1) 100%)',
                            filter: 'blur(18px)', zIndex: 0,
                        }} />
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl group"
                            style={{
                                border: '1.5px solid var(--card-border)',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
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
                                        e.target.src = 'https://placehold.co/600x800/1A3FBF/FFFFFF?text=Adv.+Shah+Alam';
                                    }}
                                />
                            </picture>

                            {/* Gradient overlay bottom */}
                            <div style={{
                                position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%',
                                background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
                            }} />

                            {/* Bottom badge */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.6, type: 'spring', stiffness: 220 }}
                                style={{
                                    position: 'absolute', bottom: '1rem', right: '0.875rem',
                                    background: 'var(--accent)',
                                    backdropFilter: 'blur(10px)',
                                    color: '#fff', fontSize: '0.72rem', fontWeight: 700,
                                    padding: '0.4rem 0.875rem', borderRadius: '0.5rem',
                                    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
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
                                    position: 'absolute', top: '0.875rem', left: '0.875rem',
                                    background: 'rgba(0,0,0,0.55)',
                                    backdropFilter: 'blur(12px)',
                                    WebkitBackdropFilter: 'blur(12px)',
                                    color: '#B8922A', fontSize: '0.68rem', fontWeight: 700,
                                    padding: '0.35rem 0.75rem', borderRadius: '0.5rem',
                                    border: '1px solid rgba(184,146,42,0.35)',
                                    display: 'flex', alignItems: 'center', gap: '0.3rem',
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
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.35rem 0.875rem', borderRadius: '9999px', marginBottom: '1.25rem',
                            background: 'var(--surface)',
                            border: '1px solid var(--card-border)',
                        }}
                    >
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} />
                        <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                            {heroContent.labelBadge}
                        </span>
                    </motion.div>

                    {/* SEO H1 */}
                    <h1 style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: 'clamp(1.9rem, 4vw, 3rem)',
                        fontWeight: 800, lineHeight: 1.15, marginBottom: '1.125rem',
                        color: 'var(--text)', letterSpacing: '-0.02em',
                    }}>
                        {heroContent.headline}{' '}
                        <span style={{ color: 'var(--accent)' }}>{heroContent.headlineAccent}</span>
                    </h1>

                    {/* ── Credential Highlight Cards ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.42, duration: 0.5 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.25rem' }}
                    >
                        {/* Credential 1: Advocate, Supreme Court */}
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.625rem',
                            padding: '0.5rem 0.9rem', borderRadius: '0.625rem',
                            background: 'var(--surface)',
                            border: '1px solid var(--card-border)',
                            maxWidth: 'fit-content',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                        }}>
                            <Scale size={14} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                            <div>
                                <span style={{ fontSize: '0.58rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--gold)', display: 'block', lineHeight: 1.1 }}>Designation</span>
                                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.3 }}>
                                    Advocate, <span style={{ color: 'var(--accent)' }}>Supreme Court of Bangladesh</span>
                                </span>
                            </div>
                        </div>

                        {/* Credential 2: Asst. Public Prosecutor */}
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.625rem',
                            padding: '0.5rem 0.9rem', borderRadius: '0.625rem',
                            background: 'var(--surface)',
                            border: '1px solid var(--card-border)',
                            maxWidth: 'fit-content',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                        }}>
                            <Shield size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                            <div>
                                <span style={{ fontSize: '0.58rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--text-muted)', display: 'block', lineHeight: 1.1 }}>Former</span>
                                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.3 }}>
                                    Asst. Public Prosecutor, <span style={{ color: 'var(--accent)' }}>Metro Sessions Court, Dhaka</span>
                                </span>
                            </div>
                        </div>

                        {/* Location badge */}
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                            padding: '0.35rem 0.75rem', borderRadius: '9999px',
                            background: 'var(--surface)',
                            border: '1px solid var(--card-border)',
                            maxWidth: 'fit-content',
                        }}>
                            <MapPin size={12} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                                Chamber: <span style={{ color: 'var(--text-2)', fontWeight: 700 }}>Uttara, Dhaka</span>
                            </span>
                        </div>
                    </motion.div>

                    {/* Subheading — trimmed */}
                    <p style={{
                        fontSize: '1rem', lineHeight: 1.7, maxWidth: '500px',
                        margin: '0 auto 1.5rem', color: 'var(--text-2)', fontWeight: 500,
                    }} className="md:mx-0">
                        {heroContent.subheading}
                    </p>

                    {/* Available status */}
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.85, duration: 0.5 }}
                        className="flex items-center gap-2 justify-center md:justify-start mb-4"
                    >
                        <span style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.35rem 0.875rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700,
                            background: 'rgba(34,197,94,0.1)', color: '#16a34a', border: '1px solid rgba(34,197,94,0.25)',
                        }}>
                            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'hero-pulse 2s ease-in-out infinite' }} />
                            Available for Consultation
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>· Free WhatsApp</span>
                    </motion.div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-6">
                        <motion.a
                            href={waLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.04 }}
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
                            className="btn-outline flex items-center justify-center gap-2 py-3 px-6 text-sm"
                        >
                            {heroContent.cta2Label}
                            <ArrowRight size={16} />
                        </motion.a>
                    </div>

                    {/* Specialty tags */}
                    <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
                        {heroContent.tags.map((tag) => (
                            <span key={tag} style={{
                                fontSize: '0.72rem', padding: '0.3rem 0.75rem', borderRadius: '9999px', fontWeight: 600,
                                border: '1px solid var(--card-border)', color: 'var(--text-muted)',
                                background: 'var(--surface)',
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