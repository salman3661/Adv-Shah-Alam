import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    ArrowLeft, Clock, ChevronDown, ChevronUp, Phone, MessageCircle,
    ExternalLink, BookOpen, AlertTriangle, List, Calendar,
    TrendingUp, Newspaper, Flame
} from 'lucide-react';
import { telLink, waLink } from '../data/contactInfo';
import Disclaimer from '../components/Disclaimer';

/* ── Load all EN posts ── */
const _postModules = import.meta.glob('../content/posts/en/*.json', { eager: true });
const allPosts = Object.values(_postModules)
    .map(m => m.default ?? m)
    .filter(p => p && p.slug);

/* ── "Most Popular" slugs — curated from top verified posts ── */
const POPULAR_SLUGS = [
    '138-ni-act-bangladesh-cheque-case-guide',
    'anticipatory-bail-bangladesh',
    'anticipatory-bail-high-court-bangladesh',
    'arrest-without-warrant-bangladesh',
    'artha-rin-adalat-loan-recovery-bangladesh',
    'father-property-distribution-law-bangladesh-2026',
    'bail-bond-meaning-rules-bangladesh',
    'bail-bond-surety-rules-bangladesh',
    'bail-cancellation-bangladesh',
    'affidavit-bangladesh-types-process',
];


/* Category color map */
const CAT_COLOR = {
    'Criminal Law':   { bg: '#dc2626', text: '#fff' },
    'Family Law':     { bg: '#7c3aed', text: '#fff' },
    'Property Law':   { bg: '#0369a1', text: '#fff' },
    'Civil Law':      { bg: '#0891b2', text: '#fff' },
    'Cyber Law':      { bg: '#065f46', text: '#fff' },
    'Legal Procedures': { bg: '#92400e', text: '#fff' },
    'Labour Law':     { bg: '#be185d', text: '#fff' },
};
const catColor = cat => CAT_COLOR[cat] || { bg: 'var(--accent)', text: '#111' };

/* Clean duplicate leading numbers from section headings */
const cleanHeadingText = text => {
    if (!text) return '';
    return String(text).replace(/^[\(\[\{]?[\d\u09E6-\u09EF]+[\.\-\)\:\}\]]*\s*[\:\.\-]?\s*/, '').trim();
};

/* ─── Error Boundary ─── */
class BlogPostErrorBoundary extends React.Component {
    constructor(props) { super(props); this.state = { hasError: false }; }
    static getDerivedStateFromError() { return { hasError: true }; }
    componentDidCatch(e, i) { console.error('[BlogPost]', e, i); }
    render() {
        if (this.state.hasError) return (
            <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                <Helmet><title>Error | Advocate Md. Shah Alam</title><meta name="robots" content="noindex" /></Helmet>
                <div style={{ textAlign: 'center', maxWidth: '400px' }}>
                    <AlertTriangle size={48} style={{ color: 'var(--accent)', marginBottom: '1rem' }} />
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.75rem' }}>Something went wrong</h1>
                    <Link to="/blog" className="btn-primary">← Back to Blog</Link>
                </div>
            </div>
        );
        return this.props.children;
    }
}

function isPublished(post) {
    try {
        if (post.isDraft) return false;
        if (!post.publishedDate) return true;
        const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }));
        return new Date(post.publishedDate + 'T00:00:00') <= now;
    } catch { return true; }
}

/* ─── FAQ Item ─── */
const FAQItem = ({ question, answer, index }) => {
    const [open, setOpen] = useState(false);
    return (
        <div style={{
            borderRadius: '0.875rem', overflow: 'hidden',
            border: `1.5px solid ${open ? 'var(--accent)' : 'var(--card-border)'}`,
            background: 'var(--card-bg)', transition: 'border-color 0.2s',
        }}>
            <button onClick={() => setOpen(o => !o)} aria-expanded={open}
                style={{ width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '1.125rem 1.375rem', textAlign: 'left', gap: '0.875rem', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <span style={{ fontWeight: 600, fontSize: '0.9375rem', lineHeight: 1.45, flex: 1, color: 'var(--text)' }}>
                    <span style={{ color: 'var(--accent)', marginRight: '6px', fontWeight: 700 }}>Q{index + 1}.</span>{question}
                </span>
                <span style={{ flexShrink: 0, width: '1.625rem', height: '1.625rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: open ? 'var(--accent)' : 'var(--surface)', color: open ? '#111' : 'var(--text-muted)', transition: 'all 0.2s', marginTop: '1px' }}>
                    {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </span>
            </button>
            {open && (
                <div style={{ padding: '0.875rem 1.375rem 1.125rem', borderTop: '1px solid var(--card-border)', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.75 }}>
                    {answer}
                </div>
            )}
        </div>
    );
};

/* ─── Sidebar Glass Card Wrapper ─── */
const SbCard = ({ children, accentColor }) => (
    <div style={{
        background: 'rgba(255,255,255,0.025)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: `1px solid ${accentColor ? accentColor + '25' : 'rgba(198,167,94,0.14)'}`,
        borderRadius: '1rem',
        overflow: 'hidden',
        marginBottom: '1.125rem',
        boxShadow: '0 4px 28px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.05)',
        transition: 'box-shadow 0.3s, border-color 0.3s',
    }}>{children}</div>
);

const SbHeader = ({ icon: Icon, label, color = 'var(--accent)' }) => (
    <div style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.7rem 1.125rem',
        background: `linear-gradient(135deg, ${color}20 0%, transparent 60%)`,
        borderBottom: `1px solid ${color}22`,
    }}>
        <Icon size={13} style={{ color, flexShrink: 0 }} />
        <span style={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text)' }}>{label}</span>
        <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${color}30, transparent)`, marginLeft: '0.25rem' }} />
    </div>
);

/* ─── Sidebar: Most Popular ─── */
const PopularPosts = ({ currentSlug }) => {
    const popular = POPULAR_SLUGS
        .map(s => allPosts.find(p => p.slug === s))
        .filter(p => p && p.slug !== currentSlug)
        .slice(0, 7);
    if (popular.length === 0) return null;
    return (
        <SbCard>
            <SbHeader icon={Flame} label="Most Popular" color="#f59e0b" />
            <div style={{ padding: '0.5rem 0.75rem 0.75rem' }}>
                {popular.map((rp, idx) => {
                    const cc = catColor(rp.category);
                    const isTop3 = idx < 3;
                    return (
                        <Link key={rp.slug} to={`/blog/${rp.slug}`}
                            className="sb-item"
                            style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', padding: '0.5rem 0.5rem', borderRadius: '0.625rem', textDecoration: 'none', transition: 'all 0.2s', marginBottom: '0.125rem', border: '1px solid transparent' }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(198,167,94,0.07)'; e.currentTarget.style.borderColor = 'rgba(198,167,94,0.15)'; e.currentTarget.style.transform = 'translateX(3px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                            <span style={{
                                flexShrink: 0, width: '1.625rem', height: '1.625rem', borderRadius: '0.375rem',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: 900, fontSize: '0.75rem',
                                background: isTop3 ? 'linear-gradient(135deg, #c6a75e, #e8c97d)' : 'rgba(255,255,255,0.06)',
                                color: isTop3 ? '#111' : 'var(--text-muted)',
                                border: isTop3 ? 'none' : '1px solid rgba(255,255,255,0.08)',
                                boxShadow: isTop3 ? '0 2px 8px rgba(198,167,94,0.35)' : 'none',
                            }}>{idx + 1}</span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <span style={{ display: 'inline-block', fontSize: '0.58rem', fontWeight: 700, padding: '1px 5px', borderRadius: '3px', marginBottom: '0.2rem', background: cc.bg + 'cc', color: cc.text, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{rp.category}</span>
                                <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1.4, margin: 0 }}>{rp.title}</p>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}><Clock size={9} />{rp.readTime}</span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </SbCard>
    );
};

/* ─── Sidebar: Recent Posts (Fresh & Dynamic) ─── */
const RecentPosts = ({ currentSlug }) => {
    const recent = [...allPosts]
        .filter(p => p.slug !== currentSlug && p.publishedDate)
        .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
        .slice(0, 8);
    if (recent.length === 0) return null;
    return (
        <SbCard accentColor="var(--accent)">
            <SbHeader icon={Newspaper} label="Recent Legal Articles" color="var(--accent)" />
            <div style={{ padding: '0.625rem 0.875rem 0.875rem' }}>
                {recent.map((rp, idx) => {
                    const cc = catColor(rp.category);
                    return (
                        <Link key={rp.slug} to={`/blog/${rp.slug}`}
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '0.75rem',
                                padding: '0.65rem 0.5rem',
                                borderRadius: '0.625rem',
                                textDecoration: 'none',
                                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                                marginBottom: '0.25rem',
                                borderBottom: idx !== recent.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                                background: 'transparent'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'rgba(198,167,94,0.07)';
                                e.currentTarget.style.transform = 'translateX(4px)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.transform = 'translateX(0)';
                            }}>
                            <div style={{
                                flexShrink: 0,
                                width: '4px',
                                minHeight: '38px',
                                alignSelf: 'stretch',
                                borderRadius: '3px',
                                background: cc.bg,
                                marginTop: '2px'
                            }} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                    <span style={{
                                        display: 'inline-block',
                                        fontSize: '0.6rem',
                                        fontWeight: 700,
                                        padding: '1px 6px',
                                        borderRadius: '4px',
                                        background: `${cc.bg}22`,
                                        color: cc.bg,
                                        border: `1px solid ${cc.bg}40`,
                                        textTransform: 'uppercase'
                                    }}>
                                        {rp.category}
                                    </span>
                                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                                        <Calendar size={9} />
                                        {rp.publishedDate ? new Date(rp.publishedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : ''}
                                    </span>
                                </div>
                                <p style={{
                                    fontSize: '0.84rem',
                                    fontWeight: 600,
                                    color: 'var(--text)',
                                    lineHeight: 1.45,
                                    margin: 0,
                                    wordBreak: 'break-word'
                                }}>
                                    {rp.title}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </SbCard>
    );
};

/* ─── Related by Category ─── */
const RelatedByCategory = ({ category, currentSlug }) => {
    const related = allPosts.filter(p => p.category === category && p.slug !== currentSlug).slice(0, 4);
    if (related.length === 0) return null;
    const cc = catColor(category);
    return (
        <SbCard accentColor={cc.bg}>
            <SbHeader icon={TrendingUp} label={`More: ${category}`} color={cc.bg} />
            <div style={{ padding: '0.5rem 0.75rem 0.75rem' }}>
                {related.map(rp => (
                    <Link key={rp.slug} to={`/blog/${rp.slug}`}
                        style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', padding: '0.5rem 0.5rem', borderRadius: '0.625rem', textDecoration: 'none', transition: 'all 0.2s', marginBottom: '0.125rem', border: '1px solid transparent' }}
                        onMouseEnter={e => { e.currentTarget.style.background = cc.bg + '12'; e.currentTarget.style.borderColor = cc.bg + '25'; e.currentTarget.style.transform = 'translateX(3px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                        <span style={{ flexShrink: 0, width: '6px', height: '6px', borderRadius: '50%', background: cc.bg, marginTop: '6px', boxShadow: `0 0 6px ${cc.bg}88` }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1.4, margin: 0 }}>{rp.title}</p>
                            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{rp.readTime}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </SbCard>
    );
};

/* ─── Chamber Promo Card (Sidebar) ─── */
const ChamberPromoCard = () => (
    <div style={{
        borderRadius: '1rem', overflow: 'hidden', marginBottom: '1.125rem',
        background: 'linear-gradient(160deg, rgba(12,10,30,0.97) 0%, rgba(20,16,50,0.95) 100%)',
        border: '1px solid rgba(198,167,94,0.3)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
    }}>
        {/* Gold shimmer top */}
        <div style={{ height: '3px', background: 'linear-gradient(90deg, transparent, #c6a75e, #f0d98a, #c6a75e, transparent)' }} />
        {/* Lawyer Photo + Name */}
        <div style={{ padding: '1rem 1.125rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img
                src="/images/hero/hero-md-shah-alam.webp"
                alt="Advocate Md. Shah Alam"
                style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #c6a75e', flexShrink: 0, boxShadow: '0 4px 14px rgba(198,167,94,0.4)' }}
                loading="lazy" width="52" height="52"
            />
            <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: '0.8rem', fontWeight: 800, color: '#e8c97d', margin: 0, lineHeight: 1.2 }}>Adv. Md. Shah Alam</p>
                <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.55)', margin: '2px 0 0', lineHeight: 1.3 }}>Supreme Court of Bangladesh</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    {['★','★','★','★','★'].map((s,i) => <span key={i} style={{ fontSize: '0.6rem', color: '#f59e0b' }}>{s}</span>)}
                    <span style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.4)', marginLeft: '2px' }}>4.9</span>
                </div>
            </div>
        </div>
        {/* Office Info */}
        <div style={{ padding: '0 1.125rem 0.875rem' }}>
            <div style={{ background: 'rgba(198,167,94,0.07)', border: '1px solid rgba(198,167,94,0.15)', borderRadius: '0.625rem', padding: '0.625rem 0.75rem', marginBottom: '0.5rem' }}>
                <p style={{ fontSize: '0.6rem', fontWeight: 800, color: '#c6a75e', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 4px' }}>📍 Supreme Court Chamber</p>
                <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.5 }}>Moktob Bhaban (3rd Floor), Near Supreme Court, Dhaka-1000</p>
            </div>
            <div style={{ background: 'rgba(198,167,94,0.07)', border: '1px solid rgba(198,167,94,0.15)', borderRadius: '0.625rem', padding: '0.625rem 0.75rem', marginBottom: '0.875rem' }}>
                <p style={{ fontSize: '0.6rem', fontWeight: 800, color: '#c6a75e', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 4px' }}>📍 Uttara Branch</p>
                <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.5 }}>House 46, Road 6/B, Sector 12, Uttara West, Dhaka-1230</p>
            </div>
            <a href="https://wa.me/8801712655546?text=I+need+legal+consultation" target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.65rem', borderRadius: '0.5rem', fontSize: '0.78rem', fontWeight: 700, textDecoration: 'none', marginBottom: '0.4rem', background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#fff', boxShadow: '0 3px 12px rgba(34,197,94,0.35)', transition: 'transform 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <MessageCircle size={13} /> WhatsApp Now
            </a>
            <a href="tel:01712655546"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.6rem', borderRadius: '0.5rem', fontSize: '0.78rem', fontWeight: 600, textDecoration: 'none', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.12)', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}>
                <Phone size={12} /> 01712-655546
            </a>
            <div style={{ marginTop: '0.75rem', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.15)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e', flexShrink: 0 }} />
                <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.55)' }}>Sun–Thu: 10AM–6PM | Fri: 10AM–1PM</span>
            </div>
        </div>
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(198,167,94,0.2), transparent)' }} />
        <Link to="/contact" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem', padding: '0.6rem', fontSize: '0.7rem', fontWeight: 600, color: 'rgba(198,167,94,0.75)', textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#c6a75e'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(198,167,94,0.75)'}>
            📋 View Full Contact Details →
        </Link>
    </div>
);

/* ─── Quick Consult Widget ─── */
const ConsultWidget = ({ postTitle }) => (
    <div style={{
        borderRadius: '1rem', overflow: 'hidden', marginBottom: '1.125rem',
        background: 'linear-gradient(145deg, rgba(12,10,30,0.95) 0%, rgba(25,20,55,0.92) 100%)',
        border: '1px solid rgba(198,167,94,0.28)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(198,167,94,0.06) inset',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        position: 'relative',
    }}>
        {/* Gold shimmer line */}
        <div style={{ height: '2.5px', background: 'linear-gradient(90deg, transparent, #c6a75e, #e8c97d, #c6a75e, transparent)' }} />
        <div style={{ padding: '1rem 1.125rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.625rem' }}>
                <span style={{ fontSize: '0.9rem' }}>⚖️</span>
                <span style={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', background: 'linear-gradient(90deg, #c6a75e, #e8c97d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Free Legal Consultation</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '0.875rem' }}>
                Expert advice from <strong style={{ color: '#e8c97d' }}>Adv. Md. Shah Alam</strong> — Supreme Court, Bangladesh.
            </p>
            <a href={waLink(`I read: ${postTitle}. Need legal help.`)} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem', borderRadius: '0.625rem', fontSize: '0.8125rem', fontWeight: 700, textDecoration: 'none', marginBottom: '0.5rem', background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#fff', boxShadow: '0 4px 14px rgba(34,197,94,0.35)', transition: 'transform 0.15s, box-shadow 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(34,197,94,0.45)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(34,197,94,0.35)'; }}>
                <MessageCircle size={14} /> WhatsApp Now
            </a>
            <a href={telLink()}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.625rem', borderRadius: '0.625rem', fontSize: '0.8125rem', fontWeight: 600, textDecoration: 'none', color: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}>
                <Phone size={13} /> Call Chamber
            </a>
        </div>
    </div>
);

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
const BlogPostInner = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const post = allPosts.find(p => p.slug === slug);
    const [cName, setCName] = useState('');
    const [cPhone, setCPhone] = useState('');
    const [cMessage, setCMessage] = useState('');
    const [cSubmitted, setCSubmitted] = useState(false);
    const [activeSection, setActiveSection] = useState(0);
    const [tocOpen, setTocOpen] = useState(false);

    /* Redirect on 404 — use React Router navigate, not window.location */
    React.useEffect(() => {
        if (!post) {
            const t = setTimeout(() => navigate('/blog', { replace: true }), 2000);
            return () => clearTimeout(t);
        }
    }, [post, navigate]);

    /* Track active TOC section */
    useEffect(() => {
        if (!post) return;
        const obs = new IntersectionObserver(
            entries => entries.forEach(e => {
                if (e.isIntersecting) {
                    const id = e.target.getAttribute('id');
                    if (id?.startsWith('section-')) setActiveSection(parseInt(id.replace('section-', '')));
                }
            }),
            { rootMargin: '-10% 0px -70% 0px' }
        );
        document.querySelectorAll('[id^="section-"]').forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, [post]);

    const handleConsultSubmit = e => {
        e.preventDefault();
        const text = `*📋 Consultation*\n*Article:* ${post.title}\n*Name:* ${cName}\n*Phone:* ${cPhone}\n*Issue:* ${cMessage}`;
        window.open(waLink(text), '_blank');
        setCSubmitted(true);
        setTimeout(() => { setCSubmitted(false); setCName(''); setCPhone(''); setCMessage(''); }, 5000);
    };

    /* ── Error / Coming Soon states ── */
    if (!post) return (
        <>
            <Helmet><title>Not Found | Advocate Md. Shah Alam</title><meta name="robots" content="noindex" /></Helmet>
            <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <BookOpen size={48} style={{ color: 'var(--accent)', marginBottom: '1rem' }} />
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem', fontFamily: "'Playfair Display', serif" }}>Article Not Found</h1>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Redirecting to blog...</p>
                    <Link to="/blog" className="btn-primary">← Back to Blog</Link>
                </div>
            </div>
        </>
    );

    if (!isPublished(post)) return (
        <>
            <Helmet><title>Coming Soon | Advocate Md. Shah Alam</title><meta name="robots" content="noindex" /></Helmet>
            <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <Clock size={48} style={{ color: 'var(--accent)', marginBottom: '1rem' }} />
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>Coming Soon</h1>
                    <Link to="/blog" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>← Back to Blog</Link>
                </div>
            </div>
        </>
    );

    const pubDate = post.publishedDate ? new Date(post.publishedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
    const cc = catColor(post.category);

    /* ── Schema ── */
    const keywordsList = Array.isArray(post.keywords) ? post.keywords : (typeof post.keywords === 'string' ? [post.keywords] : []);

    const blogPostingSchema = {
        '@context': 'https://schema.org', '@type': 'BlogPosting',
        headline: post.title, description: post.metaDescription,
        datePublished: post.publishedDate, dateModified: post.lastModified || post.publishedDate,
        inLanguage: 'en',
        author: { '@type': 'Person', name: 'Advocate Md. Shah Alam', jobTitle: 'Advocate – Supreme Court of Bangladesh', url: 'https://www.advmdshahalam.me/advocate-md-shah-alam', sameAs: ['https://www.facebook.com/advmd.shahalamfb', 'https://www.linkedin.com/in/advmdshahalam/'] },
        publisher: { '@type': 'Organization', name: 'Advocate Md. Shah Alam Law Chambers', url: 'https://www.advmdshahalam.me', logo: { '@type': 'ImageObject', url: 'https://www.advmdshahalam.me/adv-md-shah-alam.png' } },
        url: `https://www.advmdshahalam.me/blog/${post.slug}`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.advmdshahalam.me/blog/${post.slug}` },
        image: 'https://www.advmdshahalam.me/adv-md-shah-alam.png',
        keywords: keywordsList.join(', '),
    };
    const breadcrumbSchema = {
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.advmdshahalam.me/' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.advmdshahalam.me/blog' },
            { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.advmdshahalam.me/blog/${post.slug}` },
        ],
    };
    const faqSchema = post.faqs?.length ? {
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: post.faqs.map(faq => ({ '@type': 'Question', name: faq.question || faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.answer || faq.a } })),
    } : null;

    return (
        <>
            <Helmet>
                <title>{post.metaTitle}</title>
                <meta name="description" content={post.metaDescription} />
                {keywordsList.length > 0 && <meta name="keywords" content={keywordsList.join(', ')} />}
                <link rel="canonical" href={`https://www.advmdshahalam.me/blog/${post.slug}`} />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content={post.metaTitle} />
                <meta property="og:description" content={post.metaDescription} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://www.advmdshahalam.me/blog/${post.slug}`} />
                <meta property="og:image" content="https://www.advmdshahalam.me/images/hero/hero-md-shah-alam.png" />
                <meta property="og:site_name" content="Advocate Md. Shah Alam" />
                <meta property="article:published_time" content={post.publishedDate} />
                <meta property="article:modified_time" content={post.lastModified || post.publishedDate} />
                <meta property="article:section" content={post.category} />
                {keywordsList.length > 0 && <meta property="article:tag" content={keywordsList.slice(0, 5).join(', ')} />}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={post.metaTitle} />
                <meta name="twitter:description" content={post.metaDescription} />
                <meta name="twitter:image" content="https://www.advmdshahalam.me/images/hero/hero-md-shah-alam.png" />
                <meta name="author" content="Advocate Md. Shah Alam" />
                <link rel="alternate" hrefLang="en" href={`https://www.advmdshahalam.me/blog/${post.slug}`} />
                <link rel="alternate" hrefLang="x-default" href={`https://www.advmdshahalam.me/blog/${post.slug}`} />
                {post.bnSlug && <link rel="alternate" hrefLang="bn" href={`https://www.advmdshahalam.me/bn/blog/${post.bnSlug}`} />}
                <script type="application/ld+json">{JSON.stringify(blogPostingSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
                {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
            </Helmet>

            {/* ════════════════ HERO ════════════════ */}
            <section style={{ background: 'var(--hero-bg)', paddingTop: '6.5rem', paddingBottom: '3.5rem', position: 'relative', overflow: 'hidden' }}>
                {/* Top accent bar */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${cc.bg}, var(--gold), ${cc.bg})`, opacity: 0.9 }} />
                {/* Radial glow */}
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 30% 50%, rgba(198,167,94,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />

                <div className="bp-hero-container">
                    {/* Nav row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.625rem' }}>
                        <Link to="/blog"
                            onClick={(e) => {
                                if (window.history.length > 2) {
                                    e.preventDefault();
                                    navigate(-1);
                                }
                            }}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', fontWeight: 500, color: 'var(--hero-text-2)', opacity: 0.75, textDecoration: 'none' }}
                            onMouseEnter={e => e.currentTarget.style.opacity = '1'} onMouseLeave={e => e.currentTarget.style.opacity = '0.75'}>
                            <ArrowLeft size={14} /> Back to Blog
                        </Link>
                        {post.bnSlug && (
                            <Link to={`/bn/blog/${post.bnSlug}`}
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.7rem', fontWeight: 700, padding: '0.3rem 0.875rem', borderRadius: '9999px', border: '1.5px solid var(--accent)', color: 'var(--accent)', background: 'rgba(198,167,94,0.07)', textDecoration: 'none' }}>
                                🇧🇩 বাংলায় পড়ুন
                            </Link>
                        )}
                    </div>

                    {/* Breadcrumb */}
                    <nav aria-label="Breadcrumb" style={{ marginBottom: '1rem' }}>
                        <ol style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', listStyle: 'none', padding: 0, margin: 0, fontSize: '0.75rem', flexWrap: 'wrap' }}>
                            <li><Link to="/" style={{ color: 'var(--hero-text-2)', textDecoration: 'none', opacity: 0.7 }}>Home</Link></li>
                            <li style={{ opacity: 0.3, color: 'var(--hero-muted)' }}>/</li>
                            <li><Link to="/blog" style={{ color: 'var(--hero-text-2)', textDecoration: 'none', opacity: 0.7 }}>Blog</Link></li>
                            <li style={{ opacity: 0.3, color: 'var(--hero-muted)' }}>/</li>
                            <li style={{ color: 'var(--gold)', fontWeight: 600 }}>{post.category}</li>
                        </ol>
                    </nav>

                    {/* Category + time pills */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 800, padding: '0.3rem 0.875rem', borderRadius: '9999px', background: cc.bg, color: cc.text, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
                            {post.category}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--hero-muted)', padding: '0.3rem 0.75rem', borderRadius: '9999px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                            <Clock size={12} /> {post.readTime}
                        </span>
                    </div>

                    {/* Title — full-width, no max-width cap on hero */}
                    <h1 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(1.875rem, 4vw, 3.5rem)',
                        fontWeight: 800, lineHeight: 1.18,
                        color: 'var(--hero-text)',
                        marginBottom: '1.375rem',
                        letterSpacing: '-0.025em',
                        maxWidth: '900px',
                    }}>
                        {post.title}
                    </h1>

                    {/* Hero intro */}
                    {post.heroIntro && (
                        <div className="bpbn-hero-intro-card">
                            <div className="bpbn-intro-header">
                                <div className="bpbn-intro-badge">
                                    <span className="bpbn-intro-dot" />
                                    <span>Legal Insights & Executive Brief</span>
                                </div>
                                <a href="tel:01712655546" className="bpbn-intro-call-chip">
                                    <Phone size={13} />
                                    <span>Direct Consultation: 01712655546</span>
                                </a>
                            </div>
                            <div
                                className="bpbn-intro-content"
                                dangerouslySetInnerHTML={{ __html: post.heroIntro }}
                            />
                        </div>
                    )}

                    {/* Author / date row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', flexWrap: 'wrap', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                        <img
                            src="/images/hero/hero-md-shah-alam.webp"
                            alt="Advocate Md. Shah Alam"
                            style={{ width: '2.375rem', height: '2.375rem', borderRadius: '50%', objectFit: 'cover', objectPosition: 'center top', border: `2px solid ${cc.bg}`, flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
                            loading="lazy"
                            width="38"
                            height="38"
                        />
                        <div>
                            <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--hero-text)', margin: 0 }}>Advocate Md. Shah Alam</p>
                            <p style={{ fontSize: '0.7rem', color: 'var(--hero-muted)', margin: 0 }}>Supreme Court of Bangladesh</p>
                        </div>
                        {pubDate && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--hero-muted)', marginLeft: 'auto' }}>
                                <Calendar size={12} /> {pubDate}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ════════════════ BODY ════════════════ */}
            <div style={{ background: 'var(--bg)' }}>
                <div className="bp-body-container">

                    {/* ── Mobile TOC ── */}
                    <div className="bp-mobile-toc" style={{ marginBottom: '1.25rem' }}>
                        <button onClick={() => setTocOpen(o => !o)}
                            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 1.125rem', borderRadius: '0.875rem', cursor: 'pointer', background: 'var(--surface)', border: '1px solid var(--card-border)', color: 'var(--text)', fontWeight: 600, fontSize: '0.875rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <List size={14} style={{ color: 'var(--accent)' }} /> Table of Contents
                            </span>
                            {tocOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                        </button>
                        {tocOpen && (
                            <div style={{ marginTop: '0.375rem', padding: '1rem 1.125rem', borderRadius: '0.875rem', background: 'var(--surface)', border: '1px solid var(--card-border)' }}>
                                <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                    {post.toc.map((h, i) => {
                                        const tocText = typeof h === 'string' ? h : (h?.title || h?.heading || h?.text || '');
                                        return (
                                            <li key={i}>
                                                <a href={`#section-${i}`} onClick={() => setTocOpen(false)}
                                                    style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem', padding: '0.4rem 0', textDecoration: 'none', color: i === activeSection ? 'var(--accent)' : 'var(--text-secondary)', fontWeight: i === activeSection ? 600 : 400 }}>
                                                    <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', opacity: 0.5, marginTop: '3px', flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
                                                    {tocText}
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ol>
                            </div>
                        )}
                    </div>

                    {/* ── Main 2-col grid ── */}
                    <div className="bp-main-grid">

                        {/* ══ ARTICLE COLUMN ══ */}
                        <div style={{ minWidth: 0 }}>

                            {/* Sticky TOC inside article (desktop only, above content) */}
                            <div className="bp-toc-inline">
                                <div style={{ padding: '1.125rem 1.375rem', borderRadius: '1rem', background: 'var(--surface)', border: '1px solid var(--card-border)', marginBottom: '2rem' }}>
                                    <p style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--accent)', marginBottom: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.375rem', margin: 0, paddingBottom: '0.625rem', borderBottom: '1px solid var(--card-border)' }}>
                                        <List size={12} /> In This Article
                                    </p>
                                    <ol style={{ margin: '0.75rem 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
                                        {post.toc.map((h, i) => {
                                            const tocText = typeof h === 'string' ? h : (h?.title || h?.heading || h?.text || '');
                                            return (
                                                <li key={i}>
                                                    <a href={`#section-${i}`} style={{
                                                        display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
                                                        padding: '0.375rem 0.5rem', borderRadius: '0.5rem',
                                                        fontSize: '0.8125rem', lineHeight: 1.4, textDecoration: 'none',
                                                        color: i === activeSection ? 'var(--accent)' : 'var(--text-muted)',
                                                        fontWeight: i === activeSection ? 600 : 400,
                                                        background: i === activeSection ? 'rgba(198,167,94,0.07)' : 'transparent',
                                                        borderLeft: i === activeSection ? '2px solid var(--accent)' : '2px solid transparent',
                                                        transition: 'all 0.15s',
                                                    }}>
                                                        <span style={{ fontSize: '0.65rem', fontFamily: 'monospace', opacity: 0.4, marginTop: '2px', flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
                                                        {tocText}
                                                    </a>
                                                </li>
                                            );
                                        })}
                                    </ol>
                                </div>
                            </div>

                            <article>
                                <Disclaimer lang="en" />

                                {/* Quick Answer */}
                                {post.quickAnswer && (
                                    <div style={{ marginBottom: '2.5rem', padding: '1.375rem 1.5rem', borderRadius: '1rem', background: 'linear-gradient(135deg, rgba(198,167,94,0.07), rgba(198,167,94,0.02))', border: '1.5px solid rgba(198,167,94,0.22)' }}>
                                        <p style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--gold)', marginBottom: '0.875rem' }}>
                                            {typeof post.quickAnswer === 'string' ? 'Quick Answer' : (post.quickAnswer.heading || 'Quick Answer')}
                                        </p>
                                        {typeof post.quickAnswer === 'string' ? (
                                            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                                                {post.quickAnswer}
                                            </p>
                                        ) : Array.isArray(post.quickAnswer?.points) ? (
                                            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                                {post.quickAnswer.points.map((pt, i) => (
                                                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                                                        <span style={{ flexShrink: 0, width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent)', marginTop: '9px' }} />
                                                        {pt}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : null}
                                    </div>
                                )}

                                {/* Article Sections — High-End Editorial Design */}
                                {post.sections.map((sec, i) => (
                                    <section key={i} id={`section-${i}`} style={{ marginBottom: '3.5rem', scrollMarginTop: '5rem' }}>
                                        {/* Editorial Section Header */}
                                        <div style={{
                                            position: 'relative',
                                            marginBottom: '1.75rem',
                                            paddingBottom: '1.125rem',
                                            borderBottom: '1px solid var(--card-border)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '0.625rem'
                                        }}>
                                            {/* Sub-pill badge */}
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <span style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '0.375rem',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 800,
                                                    letterSpacing: '0.08em',
                                                    textTransform: 'uppercase',
                                                    color: 'var(--gold, #c6a75e)',
                                                    background: 'rgba(198, 167, 94, 0.08)',
                                                    border: '1px solid rgba(198, 167, 94, 0.22)',
                                                    padding: '0.25rem 0.65rem',
                                                    borderRadius: '9999px',
                                                }}>
                                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold, #c6a75e)' }}></span>
                                                    <span>SECTION {String(i + 1).padStart(2, '0')}</span>
                                                </span>
                                            </div>

                                            {/* Clean Headline with vertical accent bar */}
                                            <h2 style={{
                                                fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                                                fontSize: 'clamp(1.35rem, 2.5vw, 1.75rem)',
                                                fontWeight: 800,
                                                lineHeight: 1.35,
                                                color: 'var(--text)',
                                                margin: 0,
                                                letterSpacing: '-0.02em',
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: '0.75rem'
                                            }}>
                                                <span style={{
                                                    display: 'inline-block',
                                                    width: '4px',
                                                    minHeight: '1.35em',
                                                    borderRadius: '4px',
                                                    background: `linear-gradient(180deg, var(--gold, #c6a75e), ${cc.bg})`,
                                                    flexShrink: 0,
                                                    marginTop: '0.12em'
                                                }}></span>
                                                <span style={{ flex: 1 }}>{cleanHeadingText(sec.heading || sec.h2 || sec.title || '')}</span>
                                            </h2>
                                        </div>

                                        <div className="prose-content"
                                            style={{ color: 'var(--text-secondary)', fontSize: '1.0625rem', lineHeight: '1.9', letterSpacing: '0.005em', wordBreak: 'break-word', overflowWrap: 'anywhere' }}
                                            dangerouslySetInnerHTML={{ __html: sec.content }}
                                        />
                                    </section>
                                ))}

                                {/* Related Services */}
                                {post.relatedServiceLinks?.length > 0 && (
                                    <div style={{ margin: '2rem 0', padding: '1.25rem 1.5rem', borderRadius: '1rem', background: 'var(--surface)', border: '1px solid var(--card-border)' }}>
                                        <h2 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text)', marginBottom: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                            🔗 Related Legal Services
                                        </h2>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                            {post.relatedServiceLinks.map((link, i) => (
                                                <Link key={i} to={link.to}
                                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8125rem', fontWeight: 600, padding: '0.4rem 0.875rem', borderRadius: '9999px', textDecoration: 'none', background: `${cc.bg}18`, color: cc.bg, border: `1px solid ${cc.bg}40`, transition: 'all 0.15s' }}
                                                    onMouseEnter={e => e.currentTarget.style.background = `${cc.bg}30`}
                                                    onMouseLeave={e => e.currentTarget.style.background = `${cc.bg}18`}>
                                                    <ExternalLink size={11} /> {link.text}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* FAQ */}
                                {post.faqs?.length > 0 && (
                                    <div style={{ marginBottom: '3rem' }}>
                                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.3rem, 2.2vw, 1.6rem)', fontWeight: 700, color: 'var(--text)', marginBottom: '1.375rem' }}>
                                            Frequently Asked Questions
                                        </h2>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                                            {post.faqs.map((faq, i) => <FAQItem key={i} index={i} question={faq.question || faq.q} answer={faq.answer || faq.a} />)}
                                        </div>
                                    </div>
                                )}

                                {/* CTA Form */}
                                <div style={{ borderRadius: '1.375rem', overflow: 'hidden', background: 'linear-gradient(135deg, var(--hero-bg) 0%, var(--hero-surface, #1c1c35) 100%)', border: '1px solid rgba(198,167,94,0.18)', marginBottom: '3rem' }}>
                                    <div style={{ background: `linear-gradient(90deg, ${cc.bg}, var(--gold))`, padding: '0.625rem 1.5rem' }}>
                                        <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>⚖️ Direct Legal Consultation</p>
                                    </div>
                                    <div style={{ padding: '2rem 2rem 1.75rem' }}>
                                        {cSubmitted ? (
                                            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                                                <div style={{ display: 'inline-flex', width: '3rem', height: '3rem', borderRadius: '50%', background: 'rgba(34,197,94,0.15)', color: '#22c55e', alignItems: 'center', justifyContent: 'center', marginBottom: '0.875rem' }}>
                                                    <MessageCircle size={24} />
                                                </div>
                                                <h3 style={{ fontWeight: 700, color: 'var(--hero-text)', marginBottom: '0.375rem' }}>Opening WhatsApp...</h3>
                                                <p style={{ fontSize: '0.875rem', color: 'var(--hero-text-2)' }}>Advocate Shah Alam's direct line is open.</p>
                                            </div>
                                        ) : (
                                            <form onSubmit={handleConsultSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.875rem' }}>
                                                    <div>
                                                        <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--hero-text-2)', marginBottom: '0.375rem' }}>Your Name</label>
                                                        <input type="text" required value={cName} onChange={e => setCName(e.target.value)} placeholder="Full Name"
                                                            style={{ width: '100%', padding: '0.8rem 0.875rem', borderRadius: '0.625rem', fontSize: '0.875rem', outline: 'none', background: 'var(--input-bg)', border: '1.5px solid var(--input-border)', color: 'var(--text)', boxSizing: 'border-box' }}
                                                            onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--input-border)'} />
                                                    </div>
                                                    <div>
                                                        <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--hero-text-2)', marginBottom: '0.375rem' }}>Phone</label>
                                                        <input type="tel" required value={cPhone} onChange={e => setCPhone(e.target.value)} placeholder="Mobile Number"
                                                            style={{ width: '100%', padding: '0.8rem 0.875rem', borderRadius: '0.625rem', fontSize: '0.875rem', outline: 'none', background: 'var(--input-bg)', border: '1.5px solid var(--input-border)', color: 'var(--text)', boxSizing: 'border-box' }}
                                                            onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--input-border)'} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--hero-text-2)', marginBottom: '0.375rem' }}>Your Legal Issue</label>
                                                    <textarea rows="3" required value={cMessage} onChange={e => setCMessage(e.target.value)} placeholder="e.g., Land dispute in Dhaka, cheque bounce case, divorce..."
                                                        style={{ width: '100%', padding: '0.8rem 0.875rem', borderRadius: '0.625rem', fontSize: '0.875rem', outline: 'none', resize: 'none', background: 'var(--input-bg)', border: '1.5px solid var(--input-border)', color: 'var(--text)', boxSizing: 'border-box' }}
                                                        onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--input-border)'} />
                                                </div>
                                                <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap' }}>
                                                    <button type="submit" className="btn-whatsapp"
                                                        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.875rem', borderRadius: '0.75rem', fontWeight: 700, fontSize: '0.875rem' }}>
                                                        <MessageCircle size={15} /> WhatsApp Consult
                                                    </button>
                                                    <a href={telLink()} className="btn-secondary"
                                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem', padding: '0.875rem 1.25rem', borderRadius: '0.75rem', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', color: 'var(--hero-text-2)' }}>
                                                        <Phone size={14} /> Call
                                                    </a>
                                                </div>
                                            </form>
                                        )}
                                    </div>
                                </div>
                            </article>
                        </div>

                        {/* ══ RIGHT SIDEBAR ══ */}
                        <aside className="bp-sidebar">
                            <div style={{ position: 'sticky', top: '5rem' }}>
                                <ConsultWidget postTitle={post.title} />
                                <PopularPosts currentSlug={post.slug} />
                                <RecentPosts currentSlug={post.slug} />
                            </div>
                        </aside>
                    </div>

                    {/* Mobile: bottom related posts */}
                    <div className="bp-mobile-bottom">
                        <div style={{ borderTop: '2px solid var(--accent)', paddingTop: '2rem', marginTop: '1rem' }}>
                            <p style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                                <Flame size={14} style={{ color: 'var(--accent)' }} /> More Articles
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.875rem' }}>
                                {allPosts.filter(p => p.slug !== post.slug).slice(0, 4).map(rp => {
                                    const rc = catColor(rp.category);
                                    return (
                                        <Link key={rp.slug} to={`/blog/${rp.slug}`}
                                            style={{ display: 'block', borderRadius: '0.875rem', overflow: 'hidden', textDecoration: 'none', background: 'var(--card-bg)', border: '1px solid var(--card-border)', transition: 'transform 0.2s, border-color 0.2s' }}
                                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = rc.bg; }}
                                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--card-border)'; }}>
                                            <div style={{ height: '4px', background: rc.bg }} />
                                            <div style={{ padding: '0.875rem' }}>
                                                <span style={{ fontSize: '0.65rem', fontWeight: 800, color: rc.bg, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.375rem' }}>{rp.category}</span>
                                                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1.4, margin: 0, marginBottom: '0.5rem' }}>{rp.title}</p>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}><Clock size={10} /> {rp.readTime}</span>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── STICKY MOBILE CONVERSION BAR (Slim, Glassy, Lag-Free) ── */}
            <div className="msb-bar">
                <div className="msb-inner">
                    <div className="msb-left">
                        <span className="msb-live-dot" />
                        <div className="msb-identity">
                            <span className="msb-name">Adv. Md. Shah Alam</span>
                            <span className="msb-sub">Supreme Court of Bangladesh</span>
                        </div>
                    </div>
                    <div className="msb-right">
                        <a href="tel:01712655546" className="msb-btn msb-call" aria-label="Direct Call">
                            <Phone size={13} strokeWidth={2.5} />
                            <span>Call</span>
                        </a>
                        <a href={`https://wa.me/8801712655546?text=${encodeURIComponent(`I read: ${post.title}. Need legal help.`)}`} target="_blank" rel="noopener noreferrer" className="msb-btn msb-wa" aria-label="WhatsApp">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                            <span>WhatsApp</span>
                        </a>
                    </div>
                </div>
            </div>

            <style>{`
                .bp-hero-container {
                    max-width: 1600px;
                    margin: 0 auto;
                    padding: 0 2.5rem;
                    position: relative;
                    z-index: 1;
                }
                .bp-body-container {
                    max-width: 1600px;
                    margin: 0 auto;
                    padding: 2rem 2.5rem 5rem;
                }
                .bp-main-grid {
                    display: grid;
                    grid-template-columns: 1fr 320px;
                    gap: 3rem;
                    align-items: start;
                }
                .bp-sidebar { display: block; }
                .bp-toc-inline { display: none; }
                .bp-mobile-toc { display: none; }
                .bp-mobile-bottom { display: none; }

                @media (max-width: 1200px) {
                    .bp-body-container, .bp-hero-container { padding-left: 1.5rem; padding-right: 1.5rem; }
                    .bp-main-grid {
                        grid-template-columns: 1fr 300px;
                        gap: 2rem;
                    }
                }

                @media (max-width: 900px) {
                    .bp-main-grid { grid-template-columns: 1fr; }
                    .bp-sidebar { display: none; }
                    .bp-toc-inline { display: block; }
                    .bp-mobile-toc { display: none; }
                    .bp-mobile-bottom { display: block; }
                }

                @media (max-width: 640px) {
                    .bp-toc-inline { display: none; }
                    .bp-mobile-toc { display: block; }
                    .bp-body-container, .bp-hero-container { padding-left: 1rem; padding-right: 1rem; }
                }

                /* ─── Premium Executive Hero Intro Box ─── */
                .bpbn-hero-intro-card {
                    margin: 1.5rem 0 2.25rem;
                    max-width: 900px;
                    padding: 1.5rem 1.75rem;
                    background: linear-gradient(135deg, rgba(15, 23, 42, 0.92) 0%, rgba(30, 41, 59, 0.82) 100%);
                    border: 1px solid rgba(198, 167, 94, 0.35);
                    border-left: 5px solid var(--gold, #C6A75E);
                    border-radius: 1rem;
                    box-shadow: 0 16px 36px -10px rgba(0, 0, 0, 0.5), 0 0 25px -6px rgba(198, 167, 94, 0.15);
                    position: relative;
                    backdrop-filter: blur(12px);
                }
                .bpbn-intro-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 0.75rem;
                    margin-bottom: 1rem;
                    padding-bottom: 0.85rem;
                    border-bottom: 1px solid rgba(198, 167, 94, 0.22);
                }
                .bpbn-intro-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.85rem;
                    font-weight: 800;
                    letter-spacing: 0.05em;
                    color: var(--gold, #C6A75E);
                }
                .bpbn-intro-dot {
                    width: 9px;
                    height: 9px;
                    border-radius: 50%;
                    background: var(--gold, #C6A75E);
                    box-shadow: 0 0 10px var(--gold, #C6A75E);
                    display: inline-block;
                }
                .bpbn-intro-call-chip {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.375rem;
                    padding: 0.35rem 0.95rem;
                    border-radius: 9999px;
                    background: rgba(198, 167, 94, 0.16);
                    border: 1px solid rgba(198, 167, 94, 0.45);
                    color: #F8EDD1;
                    font-size: 0.82rem;
                    font-weight: 700;
                    text-decoration: none;
                    transition: all 0.2s ease;
                }
                .bpbn-intro-call-chip:hover {
                    background: var(--gold, #C6A75E);
                    color: #0F172A;
                }
                .bpbn-intro-content {
                    font-size: 1.125rem;
                    line-height: 1.95;
                    color: #F1F5F9;
                }
                .bpbn-intro-content p {
                    margin: 0;
                }
                .bpbn-intro-content strong, .bpbn-intro-content b {
                    color: #FFFFFF;
                    font-weight: 700;
                    background: rgba(198, 167, 94, 0.16);
                    padding: 0.12rem 0.4rem;
                    border-radius: 4px;
                    border-bottom: 1.5px solid rgba(198, 167, 94, 0.4);
                }
                .bpbn-intro-content em {
                    color: #CBD5E1;
                    font-style: italic;
                }
                .bpbn-intro-content a {
                    color: var(--gold, #C6A75E) !important;
                    font-weight: 700;
                    text-decoration: underline;
                    text-underline-offset: 4px;
                }

                /* ── Prose typography — full-width, premium reading ── */
                .prose-content p { margin-bottom: 1.5rem; }
                .prose-content ul, .prose-content ol { padding-left: 1.75rem; margin-bottom: 1.5rem; }
                .prose-content li { margin-bottom: 0.7rem; line-height: 1.9; }
                .prose-content li::marker { color: var(--accent); font-weight: 700; }
                .prose-content strong { color: var(--text); font-weight: 700; }
                .prose-content b { color: var(--text); font-weight: 700; }
                .prose-content a { color: var(--accent); text-decoration: underline; text-decoration-color: rgba(198,167,94,0.35); text-underline-offset: 3px; transition: text-decoration-color 0.2s; }
                .prose-content a:hover { text-decoration-color: var(--accent); }
                .prose-content h3 { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 800; color: var(--text); margin: 2.25rem 0 1rem; padding: 0.5rem 0.875rem; border-left: 3px solid var(--gold, #C6A75E); background: linear-gradient(90deg, rgba(198,167,94,0.06), transparent); border-radius: 0 0.5rem 0.5rem 0; }
                .prose-content h4 { font-size: 1.05rem; font-weight: 700; color: var(--text); margin: 1.75rem 0 0.75rem; }
                .prose-content blockquote { border-left: 4px solid var(--gold, #C6A75E); padding: 1.125rem 1.375rem; margin: 2.25rem 0; color: var(--text-secondary); background: linear-gradient(90deg, rgba(198,167,94,0.06), rgba(198,167,94,0.02)); border-radius: 0 0.875rem 0.875rem 0; font-size: 1rem; line-height: 1.85; }
                
                /* ─── Theme-Aware Executive Table Styling ─── */
                .prose-content table {
                    width: 100%;
                    border-collapse: separate;
                    border-spacing: 0;
                    margin: 2rem 0;
                    font-size: 1rem;
                    border-radius: 12px;
                    overflow: hidden;
                    border: 1px solid var(--card-border, #E2E8F0);
                    box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.05);
                    background: var(--card-bg, #FFFFFF);
                }
                .prose-content table thead tr {
                    background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%) !important;
                }
                .prose-content th {
                    background: transparent !important;
                    color: #FFFFFF !important;
                    font-weight: 700;
                    padding: 14px 18px !important;
                    border-bottom: 2px solid var(--gold, #C6A75E) !important;
                    text-align: left;
                    font-size: 1.02rem;
                }
                .prose-content td {
                    padding: 14px 18px !important;
                    border-bottom: 1px solid var(--card-border, #E2E8F0) !important;
                    color: var(--text, #1E293B) !important;
                    line-height: 1.6;
                }
                .prose-content tbody tr {
                    background-color: var(--card-bg, #FFFFFF) !important;
                    transition: background-color 0.15s ease;
                }
                .prose-content tbody tr:nth-child(even) {
                    background-color: rgba(15, 23, 42, 0.025) !important;
                }
                .prose-content tbody tr:hover {
                    background-color: rgba(198, 167, 94, 0.06) !important;
                }
                .dark .prose-content table {
                    border-color: rgba(198, 167, 94, 0.22) !important;
                    background: #0B132B !important;
                }
                .dark .prose-content td {
                    color: #E2E8F0 !important;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
                }
                .dark .prose-content tbody tr {
                    background-color: #0E1726 !important;
                }
                .dark .prose-content tbody tr:nth-child(even) {
                    background-color: #131F33 !important;
                }
                .dark .prose-content tbody tr:hover {
                    background-color: rgba(198, 167, 94, 0.12) !important;
                }

                .prose-content ol { list-style: decimal; }
                .prose-content ul { list-style: none; padding-left: 0; }
                .prose-content ul li { padding-left: 1.5rem; position: relative; }
                .prose-content ul li::before { content: '▸'; position: absolute; left: 0; top: 0; color: var(--accent); font-size: 0.85em; font-weight: 700; }
                .prose-content div[style] { margin: 1.5rem 0; }
                .prose-content hr { border: none; height: 1px; background: linear-gradient(90deg, transparent, var(--card-border), transparent); margin: 2rem 0; }

                /* ═══ ULTRA-SLIM GLASSY LAG-FREE MOBILE BAR ═══ */
                .msb-bar {
                    display: none;
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    z-index: 9999;
                    background: rgba(11, 18, 32, 0.88);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border-top: 1px solid rgba(198, 167, 94, 0.28);
                    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.22);
                    padding: 6px 12px;
                    padding-bottom: max(6px, env(safe-area-inset-bottom, 6px));
                    transform: translateZ(0);
                    will-change: transform;
                }
                .msb-inner {
                    display: flex !important;
                    flex-direction: row !important;
                    align-items: center !important;
                    justify-content: space-between !important;
                    gap: 8px !important;
                    max-width: 600px !important;
                    margin: 0 auto !important;
                }
                .msb-left {
                    display: flex !important;
                    align-items: center !important;
                    gap: 6px !important;
                    min-width: 0 !important;
                    flex: 1 1 auto !important;
                }
                .msb-live-dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: #22c55e;
                    flex-shrink: 0;
                    box-shadow: 0 0 6px #22c55e;
                }
                .msb-identity {
                    display: flex !important;
                    flex-direction: column !important;
                    min-width: 0 !important;
                    line-height: 1.18 !important;
                }
                .msb-name {
                    font-size: 0.76rem !important;
                    font-weight: 700 !important;
                    color: #F8FAFC !important;
                    white-space: nowrap !important;
                    overflow: hidden !important;
                    text-overflow: ellipsis !important;
                }
                .msb-sub {
                    font-size: 0.6rem !important;
                    color: #C6A75E !important;
                    white-space: nowrap !important;
                    overflow: hidden !important;
                    text-overflow: ellipsis !important;
                }
                .msb-right {
                    display: flex !important;
                    align-items: center !important;
                    gap: 6px !important;
                    flex-shrink: 0 !important;
                }
                .msb-btn {
                    display: inline-flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    gap: 4px !important;
                    height: 32px !important;
                    padding: 0 11px !important;
                    border-radius: 9999px !important;
                    font-size: 0.74rem !important;
                    font-weight: 700 !important;
                    text-decoration: none !important;
                    white-space: nowrap !important;
                    transition: transform 0.12s ease !important;
                    -webkit-tap-highlight-color: transparent !important;
                }
                .msb-btn:active {
                    transform: scale(0.94) !important;
                }
                .msb-call {
                    background: linear-gradient(135deg, #C6A75E 0%, #A8873A 100%) !important;
                    color: #0B1120 !important;
                    box-shadow: 0 2px 8px rgba(198, 167, 94, 0.35) !important;
                }
                .msb-wa {
                    background: #128C7E !important;
                    color: #FFFFFF !important;
                    box-shadow: 0 2px 8px rgba(18, 140, 126, 0.35) !important;
                }
                @media (max-width: 900px) {
                    .msb-bar {
                        display: block !important;
                    }
                    /* Hide duplicate floating WhatsApp button on mobile so bottom bar is clean */
                    .whatsapp-float {
                        display: none !important;
                    }
                    /* Add clearance at bottom so content never gets covered */
                    .bp-body-container {
                        padding-bottom: 5.5rem !important;
                    }
                }
                @media (max-width: 360px) {
                    .msb-sub {
                        display: none !important;
                    }
                    .msb-btn {
                        padding: 0 8px !important;
                        font-size: 0.7rem !important;
                    }
                }
            `}</style>
        </>
    );
};

const BlogPost = () => (
    <BlogPostErrorBoundary>
        <BlogPostInner />
    </BlogPostErrorBoundary>
);

export default BlogPost;

