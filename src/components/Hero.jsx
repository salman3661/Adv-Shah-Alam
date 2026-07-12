import React from 'react';
import { motion } from 'framer-motion';
import { waLink } from '../data/contactInfo';
import {
    MessageCircle, ArrowRight, Scale, Shield, MapPin,
    Phone, Star, Award, Users, BookOpen, ChevronRight
} from 'lucide-react';
import heroContent from '../content/hero.json';
import { Link } from 'react-router-dom';

/* ── stat items ── */
const STATS = [
    { value: '20+', label: 'Years of Practice' },
    { value: '5000+', label: 'Cases Handled' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '6', label: 'Practice Areas' },
];

/* ── practice areas ── */
const PRACTICES = [
    { icon: '⚖️', name: 'Criminal Law', href: '/services/criminal-lawyer' },
    { icon: '💍', name: 'Divorce & Family', href: '/services/divorce-lawyer' },
    { icon: '🔒', name: 'Bail Matters', href: '/services/bail-lawyer' },
    { icon: '🏛️', name: 'Supreme Court', href: '/services/supreme-court-lawyer' },
    { icon: '🏡', name: 'Land & Property', href: '/services/land-lawyer' },
    { icon: '🏢', name: 'Company Law', href: '/services/company-corporate-lawyer' },
];

const Hero = () => {
    return (
        <section
            id="home"
            className="relative overflow-hidden transition-colors duration-300"
            style={{ background: 'var(--bg)', minHeight: '100vh' }}
        >
            {/* ── Background orbs ── */}
            <div className="absolute inset-0 pointer-events-none">
                <div style={{
                    position: 'absolute', top: '10%', right: '0',
                    width: '600px', height: '600px', borderRadius: '50%',
                    background: 'radial-gradient(circle, var(--accent-subtle) 0%, transparent 60%)',
                    filter: 'blur(60px)',
                }} />
                <div style={{
                    position: 'absolute', bottom: '0', left: '-5%',
                    width: '500px', height: '500px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(184,146,42,0.06) 0%, transparent 65%)',
                    filter: 'blur(70px)',
                }} />
            </div>

            {/* ════ MAIN CONTENT ════ */}
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-8 lg:gap-14 items-center pt-24 pb-10 min-h-[90vh]">

                    {/* ── LEFT: Text ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="order-2 md:order-1 flex flex-col"
                    >
                        {/* Top badge */}
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.35rem 0.875rem', borderRadius: '9999px', marginBottom: '1.25rem',
                            background: 'var(--surface)', border: '1px solid var(--card-border)',
                            width: 'fit-content',
                        }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
                            <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                                {heroContent.labelBadge}
                            </span>
                        </div>

                        {/* H1 */}
                        <h1 style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                            fontWeight: 800, lineHeight: 1.12, marginBottom: '1rem',
                            color: 'var(--text)', letterSpacing: '-0.025em',
                        }}>
                            {heroContent.headline}{' '}
                            <span style={{ color: 'var(--accent)' }}>{heroContent.headlineAccent}</span>
                        </h1>

                        {/* Subheading */}
                        <p style={{
                            fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.25rem',
                            color: 'var(--text-2)', fontWeight: 500, maxWidth: '480px',
                        }}>
                            {heroContent.subheading}
                        </p>

                        {/* ── Credential Cards ── */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.25rem' }}>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                                padding: '0.5rem 0.875rem', borderRadius: '0.625rem',
                                background: 'var(--surface)', border: '1px solid var(--card-border)',
                                width: 'fit-content', boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                            }}>
                                <Scale size={14} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                                <div>
                                    <span style={{ fontSize: '0.57rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--gold)', display: 'block', lineHeight: 1 }}>Designation</span>
                                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text)' }}>
                                        Advocate, <span style={{ color: 'var(--accent)' }}>Supreme Court of Bangladesh</span>
                                    </span>
                                </div>
                            </div>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                                padding: '0.5rem 0.875rem', borderRadius: '0.625rem',
                                background: 'var(--surface)', border: '1px solid var(--card-border)',
                                width: 'fit-content', boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                            }}>
                                <Shield size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                                <div>
                                    <span style={{ fontSize: '0.57rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--text-muted)', display: 'block', lineHeight: 1 }}>Former</span>
                                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text)' }}>
                                        Asst. Public Prosecutor, <span style={{ color: 'var(--accent)' }}>Metro Sessions Court, Dhaka</span>
                                    </span>
                                </div>
                            </div>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                                padding: '0.35rem 0.75rem', borderRadius: '9999px',
                                background: 'var(--surface)', border: '1px solid var(--card-border)',
                                width: 'fit-content',
                            }}>
                                <MapPin size={12} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                                    Chamber: <span style={{ color: 'var(--text)', fontWeight: 700 }}>Uttara, Dhaka</span>
                                </span>
                            </div>
                        </div>

                        {/* Available + CTAs */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.125rem' }}>
                            <span style={{
                                display: 'flex', alignItems: 'center', gap: '0.45rem',
                                padding: '0.35rem 0.875rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700,
                                background: 'rgba(34,197,94,0.1)', color: '#16a34a', border: '1px solid rgba(34,197,94,0.22)',
                            }}>
                                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', animation: 'hero-pulse 2s ease-in-out infinite' }} />
                                Available for Consultation
                            </span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Free WhatsApp Advice</span>
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
                            <motion.a
                                href={waLink()} target="_blank" rel="noopener noreferrer"
                                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                                className="btn-whatsapp text-sm"
                            >
                                <MessageCircle size={16} /> {heroContent.cta1Label}
                            </motion.a>
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                                className="btn-outline flex items-center gap-2 py-3 px-5 text-sm"
                            >
                                {heroContent.cta2Label} <ArrowRight size={15} />
                            </motion.a>
                        </div>

                        {/* ── STATS ROW ── */}
                        <div style={{
                            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: '0', borderRadius: '1rem', overflow: 'hidden',
                            border: '1px solid var(--card-border)',
                            background: 'var(--surface)',
                        }}>
                            {STATS.map((s, i) => (
                                <div key={i} style={{
                                    padding: '0.875rem 0.5rem', textAlign: 'center',
                                    borderRight: i < STATS.length - 1 ? '1px solid var(--card-border)' : 'none',
                                }}>
                                    <div style={{ fontSize: 'clamp(1.25rem, 2vw, 1.6rem)', fontWeight: 800, color: 'var(--accent)', lineHeight: 1, fontFamily: "'Playfair Display', serif" }}>{s.value}</div>
                                    <div style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-muted)', marginTop: '0.25rem', lineHeight: 1.3 }}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── RIGHT: Photo + Practice ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
                        className="order-1 md:order-2 flex flex-col gap-4"
                    >
                        {/* Photo */}
                        <div className="hero-float relative w-full max-w-sm mx-auto" style={{ aspectRatio: '4/5' }}>
                            <div style={{
                                position: 'absolute', inset: '-8px', borderRadius: '1.5rem',
                                background: 'linear-gradient(135deg, var(--accent-subtle) 0%, rgba(184,146,42,0.08) 100%)',
                                filter: 'blur(20px)', zIndex: 0,
                            }} />
                            <div className="relative rounded-2xl overflow-hidden group"
                                style={{
                                    border: '1.5px solid var(--card-border)',
                                    boxShadow: '0 16px 48px rgba(0,0,0,0.12)',
                                    zIndex: 1, height: '100%',
                                }}>
                                <picture>
                                    <source srcSet="/images/hero/hero-md-shah-alam.webp" type="image/webp" />
                                    <img
                                        src="/images/hero/hero-md-shah-alam.png"
                                        alt={heroContent.photoAlt}
                                        loading="eager" fetchpriority="high" decoding="async"
                                        width="600" height="750"
                                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x800/1A3FBF/FFFFFF?text=Adv.+Shah+Alam'; }}
                                    />
                                </picture>
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)' }} />

                                {/* Photo badges */}
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6, type: 'spring', stiffness: 220 }}
                                    style={{ position: 'absolute', bottom: '1rem', right: '0.875rem', background: 'var(--accent)', color: '#fff', fontSize: '0.7rem', fontWeight: 700, padding: '0.4rem 0.875rem', borderRadius: '0.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.25)' }}>
                                    {heroContent.photoBadgeBottom}
                                </motion.div>
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.75, type: 'spring', stiffness: 220 }}
                                    style={{ position: 'absolute', top: '0.875rem', left: '0.875rem', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', color: '#B8922A', fontSize: '0.67rem', fontWeight: 700, padding: '0.35rem 0.75rem', borderRadius: '0.5rem', border: '1px solid rgba(184,146,42,0.35)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                    <Scale size={11} /> {heroContent.photoBadgeTop}
                                </motion.div>

                                {/* Trust rating overlay */}
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.5 }}
                                    style={{ position: 'absolute', bottom: '1rem', left: '0.875rem', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)', padding: '0.375rem 0.75rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <div style={{ display: 'flex', gap: '2px', marginBottom: '2px' }}>
                                        {[1,2,3,4,5].map(n => <Star key={n} size={10} fill="#FBBF24" stroke="none" />)}
                                    </div>
                                    <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>Trusted by 5000+ clients</span>
                                </motion.div>
                            </div>
                        </div>

                        {/* ── PRACTICE AREAS GRID ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        >
                            <p style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.5rem', textAlign: 'center' }}>
                                Practice Areas
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
                                {PRACTICES.map((p, i) => (
                                    <Link key={i} to={p.href} style={{ textDecoration: 'none' }}>
                                        <motion.div
                                            whileHover={{ scale: 1.04, y: -2 }}
                                            style={{
                                                padding: '0.6rem 0.5rem', borderRadius: '0.625rem', textAlign: 'center',
                                                background: 'var(--surface)', border: '1px solid var(--card-border)',
                                                cursor: 'pointer', transition: 'box-shadow 0.2s',
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(26,63,191,0.1)'}
                                            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                                        >
                                            <div style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{p.icon}</div>
                                            <div style={{ fontSize: '0.62rem', fontWeight: 700, color: 'var(--text-2)', lineHeight: 1.3 }}>{p.name}</div>
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* ── BOTTOM TRUST BAR ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    style={{
                        borderTop: '1px solid var(--card-border)',
                        paddingTop: '1.25rem', paddingBottom: '1.5rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        flexWrap: 'wrap', gap: '1rem',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Award size={16} style={{ color: 'var(--gold)' }} />
                            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>Bangladesh Bar Council Enrolled</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Scale size={16} style={{ color: 'var(--accent)' }} />
                            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>Supreme Court of Bangladesh</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Users size={16} style={{ color: 'var(--accent)' }} />
                            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>5000+ Clients Served</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <BookOpen size={16} style={{ color: 'var(--gold)' }} />
                            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>LL.M — Dhaka International University</span>
                        </div>
                    </div>
                    <Link to="/blog" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent)', textDecoration: 'none' }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                        Read Legal Articles <ChevronRight size={14} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;