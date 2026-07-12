import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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

/* ── "Most Popular" slugs — curated from top keyword searches ── */
const POPULAR_SLUGS = [
    'anticipatory-bail-bangladesh',
    'land-dispute-case-bangladesh',
    'divorce-process-bangladesh-complete-guide',
    'how-to-file-divorce-bangladesh',
    'child-custody-2026-bangladesh',
    '138-ni-act-bangladesh-cheque-case-guide',
    'property-registration-process-bangladesh',
    'how-to-challenge-false-criminal-case-bangladesh',
    'muslim-divorce-law-bangladesh',
    'supreme-court-writ-petition-bangladesh',
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

/* ─── Sidebar: Recent Posts ─── */
const RecentPosts = ({ currentSlug }) => {
    const recent = [...allPosts]
        .filter(p => p.slug !== currentSlug && p.publishedDate)
        .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
        .slice(0, 6);
    if (recent.length === 0) return null;
    return (
        <SbCard>
            <SbHeader icon={Newspaper} label="Recent Articles" color="#60a5fa" />
            <div style={{ padding: '0.5rem 0.75rem 0.75rem' }}>
                {recent.map(rp => {
                    const cc = catColor(rp.category);
                    return (
                        <Link key={rp.slug} to={`/blog/${rp.slug}`}
                            style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', padding: '0.5rem 0.5rem', borderRadius: '0.625rem', textDecoration: 'none', transition: 'all 0.2s', marginBottom: '0.125rem', border: '1px solid transparent' }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(96,165,250,0.06)'; e.currentTarget.style.borderColor = 'rgba(96,165,250,0.14)'; e.currentTarget.style.transform = 'translateX(3px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                            <div style={{ flexShrink: 0, width: '3px', alignSelf: 'stretch', borderRadius: '2px', background: cc.bg, minHeight: '36px', opacity: 0.9 }} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <span style={{ display: 'inline-block', fontSize: '0.58rem', fontWeight: 700, padding: '1px 5px', borderRadius: '3px', marginBottom: '0.2rem', background: cc.bg + 'cc', color: cc.text, textTransform: 'uppercase' }}>{rp.category}</span>
                                <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1.4, margin: 0 }}>{rp.title}</p>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}><Calendar size={9} />{rp.publishedDate ? new Date(rp.publishedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}</span>
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
    const post = allPosts.find(p => p.slug === slug);
    const [cName, setCName] = useState('');
    const [cPhone, setCPhone] = useState('');
    const [cMessage, setCMessage] = useState('');
    const [cSubmitted, setCSubmitted] = useState(false);
    const [activeSection, setActiveSection] = useState(0);
    const [tocOpen, setTocOpen] = useState(false);

    /* Redirect on 404 */
    React.useEffect(() => {
        if (!post) {
            const t = setTimeout(() => window.location.replace('/blog'), 3000);
            return () => clearTimeout(t);
        }
    }, [post]);

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
            <Helmet><title>Not Found | Advocate Md. Shah Alam</title><meta name="robots" content="noindex" /><meta httpEquiv="refresh" content="3;url=/blog" /></Helmet>
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
    const blogPostingSchema = {
        '@context': 'https://schema.org', '@type': 'BlogPosting',
        headline: post.title, description: post.metaDescription,
        datePublished: post.publishedDate, dateModified: post.lastModified || post.publishedDate,
        inLanguage: 'en',
        author: { '@type': 'Person', name: 'Advocate Md. Shah Alam', jobTitle: 'Advocate – Supreme Court of Bangladesh', url: 'https://www.advmdshahalam.me/advocate-md-shah-alam', sameAs: ['https://www.facebook.com/advmd.shahalamfb'] },
        publisher: { '@type': 'Organization', name: 'Advocate Md. Shah Alam Law Chambers', url: 'https://www.advmdshahalam.me', logo: { '@type': 'ImageObject', url: 'https://www.advmdshahalam.me/images/hero/hero-md-shah-alam.png' } },
        url: `https://www.advmdshahalam.me/blog/${post.slug}`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.advmdshahalam.me/blog/${post.slug}` },
        image: 'https://www.advmdshahalam.me/images/hero/hero-md-shah-alam.png',
        keywords: post.keywords.join(', '),
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
        mainEntity: post.faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
    } : null;

    return (
        <>
            <Helmet>
                <title>{post.metaTitle}</title>
                <meta name="description" content={post.metaDescription} />
                <meta name="keywords" content={post.keywords.join(', ')} />
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
                <meta property="article:tag" content={post.keywords.slice(0, 5).join(', ')} />
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
                        <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', fontWeight: 500, color: 'var(--hero-text-2)', opacity: 0.75, textDecoration: 'none' }}
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
                    <p style={{ fontSize: '1.0625rem', lineHeight: 1.8, color: 'var(--hero-text-2)', maxWidth: '680px', marginBottom: '2rem', opacity: 0.88 }}>
                        {post.heroIntro}
                    </p>

                    {/* Author / date row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', flexWrap: 'wrap', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                        <div style={{ width: '2.375rem', height: '2.375rem', borderRadius: '50%', background: `linear-gradient(135deg, ${cc.bg}, var(--gold))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, color: '#fff', flexShrink: 0 }}>SA</div>
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
                                    {post.toc.map((h, i) => (
                                        <li key={i}>
                                            <a href={`#section-${i}`} onClick={() => setTocOpen(false)}
                                                style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem', padding: '0.4rem 0', textDecoration: 'none', color: i === activeSection ? 'var(--accent)' : 'var(--text-secondary)', fontWeight: i === activeSection ? 600 : 400 }}>
                                                <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', opacity: 0.5, marginTop: '3px', flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
                                                {h}
                                            </a>
                                        </li>
                                    ))}
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
                                        {post.toc.map((h, i) => (
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
                                                    {h}
                                                </a>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>

                            <article>
                                <Disclaimer lang="en" />

                                {/* Quick Answer */}
                                {post.quickAnswer && (
                                    <div style={{ marginBottom: '2.5rem', padding: '1.375rem 1.5rem', borderRadius: '1rem', background: 'linear-gradient(135deg, rgba(198,167,94,0.07), rgba(198,167,94,0.02))', border: '1.5px solid rgba(198,167,94,0.22)' }}>
                                        <p style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--gold)', marginBottom: '0.875rem' }}>{post.quickAnswer.heading}</p>
                                        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                            {post.quickAnswer.points.map((pt, i) => (
                                                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                                                    <span style={{ flexShrink: 0, width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent)', marginTop: '9px' }} />
                                                    {pt}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Article Sections */}
                                {post.sections.map((sec, i) => (
                                    <section key={i} id={`section-${i}`} style={{ marginBottom: '3rem', scrollMarginTop: '5rem' }}>
                                        <h2 style={{
                                            fontFamily: "'Playfair Display', serif",
                                            fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                                            fontWeight: 700, lineHeight: 1.3,
                                            color: 'var(--text)',
                                            marginBottom: '1.125rem',
                                            paddingLeft: '0.875rem',
                                            borderLeft: `3px solid ${cc.bg}`,
                                        }}>
                                            {sec.h2}
                                        </h2>
                                        <div className="prose-content"
                                            style={{ color: 'var(--text-secondary)', fontSize: '1.0625rem', lineHeight: '1.9', letterSpacing: '0.008em' }}
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
                                            {post.faqs.map((faq, i) => <FAQItem key={i} index={i} question={faq.question} answer={faq.answer} />)}
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
                                <RelatedByCategory category={post.category} currentSlug={post.slug} />
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

            <style>{`
                /* ── Full-width hero container ── */
                .bp-hero-container {
                    max-width: 1600px;
                    margin: 0 auto;
                    padding: 0 2.5rem;
                    position: relative;
                    z-index: 1;
                }

                /* ── Full-width body wrapper ── */
                .bp-body-container {
                    max-width: 1600px;
                    margin: 0 auto;
                    padding: 2rem 2.5rem 5rem;
                }

                /* ── 2-col: wide article | sidebar ── */
                .bp-main-grid {
                    display: grid;
                    grid-template-columns: 1fr 320px;
                    gap: 3rem;
                    align-items: start;
                }

                /* TOC inline only shown on medium screens where sidebar is hidden */
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

                /* ── Prose typography — wide, comfortable reading ── */
                .prose-content p { margin-bottom: 1.4rem; max-width: 72ch; }
                .prose-content ul, .prose-content ol { padding-left: 1.75rem; margin-bottom: 1.4rem; max-width: 72ch; }
                .prose-content li { margin-bottom: 0.6rem; line-height: 1.85; }
                .prose-content strong { color: var(--text); font-weight: 700; }
                .prose-content a { color: var(--accent); text-decoration: underline; text-decoration-color: rgba(198,167,94,0.35); text-underline-offset: 3px; transition: text-decoration-color 0.2s; }
                .prose-content a:hover { text-decoration-color: var(--accent); }
                .prose-content h3 { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 700; color: var(--text); margin: 2rem 0 0.875rem; }
                .prose-content blockquote { border-left: 4px solid var(--accent); padding: 1rem 1.25rem; margin: 2rem 0; font-style: italic; color: var(--text-muted); background: var(--surface); border-radius: 0 0.75rem 0.75rem 0; }
                .prose-content table { width: 100%; border-collapse: collapse; margin-bottom: 1.75rem; font-size: 0.9rem; }
                .prose-content th, .prose-content td { padding: 0.75rem 1rem; border: 1px solid var(--card-border); }
                .prose-content th { background: var(--surface); font-weight: 700; color: var(--text); }
                .prose-content ol { list-style: decimal; }
                .prose-content ul { list-style: disc; }
                /* Wide reading on large screens */
                @media (min-width: 1400px) {
                    .prose-content p, .prose-content ul, .prose-content ol { max-width: 80ch; }
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

