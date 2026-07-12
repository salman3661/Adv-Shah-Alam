import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    ArrowLeft, Clock, ChevronDown, ChevronUp,
    Phone, MessageCircle, ExternalLink, BookOpen,
    AlertTriangle, List, Calendar, ArrowRight
} from 'lucide-react';
import { telLink, waLink } from '../data/contactInfo';
import Disclaimer from '../components/Disclaimer';
import ReadingProgress from '../components/ReadingProgress';

const _postModules = import.meta.glob('../content/posts/en/*.json', { eager: true });
const posts = Object.values(_postModules)
    .map((m) => m.default ?? m)
    .filter((p) => p && p.slug);

/* ─── Error Boundary ─── */
class BlogPostErrorBoundary extends React.Component {
    constructor(props) { super(props); this.state = { hasError: false }; }
    static getDerivedStateFromError() { return { hasError: true }; }
    componentDidCatch(e, i) { console.error('[BlogPost]', e, i); }
    render() {
        if (this.state.hasError) return (
            <section className="pt-28 pb-20" style={{ background: 'var(--bg)' }}>
                <Helmet><title>Error | Advocate Md. Shah Alam</title><meta name="robots" content="noindex" /></Helmet>
                <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
                    <div className="glass-card" style={{ padding: '3.5rem 2.5rem', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
                        <AlertTriangle size={44} style={{ color: 'var(--accent)' }} />
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)' }}>Something went wrong</h1>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>This article could not be loaded.</p>
                        <Link to="/blog" className="btn-primary" style={{ fontSize: '0.875rem' }}>← Back to Blog</Link>
                    </div>
                </div>
            </section>
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

/* ─── FAQ Accordion ─── */
const FAQItem = ({ question, answer, index }) => {
    const [open, setOpen] = useState(false);
    return (
        <div style={{
            borderRadius: '1rem', overflow: 'hidden',
            border: open ? '1.5px solid var(--accent)' : '1.5px solid var(--card-border)',
            background: 'var(--card-bg)', transition: 'border-color 0.25s',
        }}>
            <button
                onClick={() => setOpen(o => !o)}
                style={{
                    width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                    padding: '1.25rem 1.5rem', textAlign: 'left', gap: '1rem',
                    color: 'var(--text)', background: 'transparent', border: 'none', cursor: 'pointer',
                }}
                aria-expanded={open}
            >
                <span style={{ fontWeight: 600, fontSize: '1rem', lineHeight: 1.4, flex: 1 }}>
                    <span style={{ color: 'var(--accent)', marginRight: '8px', fontWeight: 700 }}>Q{index + 1}.</span>
                    {question}
                </span>
                <span style={{
                    flexShrink: 0, width: '1.75rem', height: '1.75rem', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: open ? 'var(--accent)' : 'var(--surface)',
                    color: open ? '#111' : 'var(--text-muted)',
                    transition: 'background 0.25s, color 0.25s', marginTop: '2px',
                }}>
                    {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </span>
            </button>
            {open && (
                <div style={{
                    padding: '1rem 1.5rem 1.25rem',
                    borderTop: '1px solid var(--card-border)',
                    color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.75,
                }}>
                    {answer}
                </div>
            )}
        </div>
    );
};

/* ─── Main Component ─── */
const BlogPostInner = () => {
    const { slug } = useParams();
    const post = posts.find(p => p.slug === slug);
    const [cName, setCName] = useState('');
    const [cPhone, setCPhone] = useState('');
    const [cMessage, setCMessage] = useState('');
    const [cSubmitted, setCSubmitted] = useState(false);
    const [activeSection, setActiveSection] = useState(0);
    const [tocOpen, setTocOpen] = useState(false);

    const handleConsultSubmit = (e) => {
        e.preventDefault();
        if (!post) return;
        const text = `*📋 New Consultation Request*\n\n*Article:* ${post.title}\n*Name:* ${cName}\n*Phone:* ${cPhone}\n*Brief Inquiry:* ${cMessage}`;
        window.open(waLink(text), '_blank');
        setCSubmitted(true);
        setTimeout(() => { setCSubmitted(false); setCName(''); setCPhone(''); setCMessage(''); }, 5000);
    };

    useEffect(() => {
        if (!post) return;
        const obs = new IntersectionObserver(
            entries => entries.forEach(e => {
                if (e.isIntersecting) {
                    const id = e.target.getAttribute('id');
                    if (id && id.startsWith('section-')) setActiveSection(parseInt(id.replace('section-', '')));
                }
            }),
            { rootMargin: '-15% 0px -65% 0px' }
        );
        document.querySelectorAll('[id^="section-"]').forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, [post]);

    React.useEffect(() => {
        if (!post) {
            const t = setTimeout(() => window.location.replace('/blog'), 3000);
            return () => clearTimeout(t);
        }
    }, [post]);

    if (!post) return (
        <>
            <Helmet>
                <title>Article Not Found | Advocate Md. Shah Alam</title>
                <meta name="robots" content="noindex, nofollow" />
                <meta httpEquiv="refresh" content="3;url=/blog" />
            </Helmet>
            <section className="pt-28 pb-20" style={{ background: 'var(--bg)' }}>
                <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
                    <div className="glass-card" style={{ padding: '3.5rem 2.5rem', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
                        <BookOpen size={44} style={{ color: 'var(--accent)' }} />
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>Article Not Found</h1>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Redirecting to blog in 3 seconds...</p>
                        <Link to="/blog" className="btn-primary" style={{ fontSize: '0.875rem' }}>← Back to Blog</Link>
                    </div>
                </div>
            </section>
        </>
    );

    if (!isPublished(post)) return (
        <>
            <Helmet><title>Coming Soon | Advocate Md. Shah Alam</title><meta name="robots" content="noindex, nofollow" /></Helmet>
            <section className="pt-28 pb-20" style={{ background: 'var(--bg)' }}>
                <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
                    <div className="glass-card" style={{ padding: '3.5rem 2.5rem', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
                        <Clock size={44} style={{ color: 'var(--accent)' }} />
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>Article Coming Soon</h1>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Scheduled for future publication.</p>
                        <Link to="/blog" className="btn-primary" style={{ fontSize: '0.875rem' }}>← Back to Blog</Link>
                    </div>
                </div>
            </section>
        </>
    );

    const related = posts.filter(p => p.category === post.category && p.slug !== post.slug).slice(0, 4);

    const blogPostingSchema = {
        '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title,
        description: post.metaDescription, datePublished: post.publishedDate,
        dateModified: post.lastModified || post.publishedDate, inLanguage: 'en',
        author: { '@type': 'Person', name: 'Advocate Md. Shah Alam', jobTitle: 'Advocate – Supreme Court of Bangladesh', url: 'https://www.advmdshahalam.me/advocate-md-shah-alam', sameAs: ['https://www.facebook.com/advmd.shahalamfb', 'https://maps.app.goo.gl/M3NXMwW3xkp2TE3h8'] },
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
    const faqSchema = {
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: post.faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
    };

    const pubDate = post.publishedDate ? new Date(post.publishedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

    return (
        <>
            <ReadingProgress />
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
                <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
            </Helmet>

            {/* ══ HERO ══ */}
            <section style={{ background: 'var(--hero-bg)', paddingTop: '7rem', paddingBottom: '4.5rem', position: 'relative', overflow: 'hidden' }}>
                {/* Gold top line */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, transparent 0%, var(--gold) 30%, var(--accent) 50%, var(--gold) 70%, transparent 100%)', opacity: 0.7 }} />
                {/* Glow */}
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(198,167,94,0.09) 0%, transparent 70%)' }} />

                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
                    {/* Nav row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                        <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--hero-text-2)', opacity: 0.8, textDecoration: 'none', transition: 'opacity 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                            onMouseLeave={e => e.currentTarget.style.opacity = '0.8'}>
                            <ArrowLeft size={15} /> Back to Blog
                        </Link>
                        {post.bnSlug && (
                            <Link to={`/bn/blog/${post.bnSlug}`}
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', fontWeight: 700, padding: '0.375rem 1rem', borderRadius: '9999px', border: '1.5px solid var(--accent)', color: 'var(--accent)', background: 'rgba(198,167,94,0.07)', textDecoration: 'none', transition: 'transform 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                                🇧🇩 বাংলায় পড়ুন
                            </Link>
                        )}
                    </div>

                    {/* Breadcrumb */}
                    <nav style={{ marginBottom: '1.5rem' }} aria-label="Breadcrumb">
                        <ol style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', listStyle: 'none', padding: 0, margin: 0, fontSize: '0.75rem' }}>
                            <li><Link to="/" style={{ color: 'var(--hero-text-2)', textDecoration: 'none' }}>Home</Link></li>
                            <li style={{ color: 'var(--hero-muted)', opacity: 0.5 }}>/</li>
                            <li><Link to="/blog" style={{ color: 'var(--hero-text-2)', textDecoration: 'none' }}>Blog</Link></li>
                            <li style={{ color: 'var(--hero-muted)', opacity: 0.5 }}>/</li>
                            <li style={{ color: 'var(--gold)', fontWeight: 600 }}>{post.category}</li>
                        </ol>
                    </nav>

                    {/* Category + read time */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.35rem 1rem', borderRadius: '9999px', background: 'rgba(198,167,94,0.14)', color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', border: '1px solid rgba(198,167,94,0.22)' }}>
                            {post.category}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: 'var(--hero-muted)', padding: '0.35rem 0.875rem', borderRadius: '9999px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                            <Clock size={12} /> {post.readTime}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(1.8rem, 4.5vw, 3.25rem)',
                        fontWeight: 800, lineHeight: 1.2,
                        color: 'var(--hero-text)',
                        maxWidth: '860px', marginBottom: '1.5rem',
                        letterSpacing: '-0.02em',
                    }}>
                        {post.title}
                    </h1>

                    {/* Intro */}
                    <p style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--hero-text-2)', maxWidth: '700px', marginBottom: '2rem', opacity: 0.88 }}>
                        {post.heroIntro}
                    </p>

                    {/* Author row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--gold))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800, color: '#111', flexShrink: 0 }}>SA</div>
                            <div>
                                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--hero-text)', margin: 0 }}>Advocate Md. Shah Alam</p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--hero-muted)', margin: 0 }}>Supreme Court of Bangladesh</p>
                            </div>
                        </div>
                        {pubDate && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: 'var(--hero-muted)', marginLeft: 'auto' }}>
                                <Calendar size={12} /> {pubDate}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ══ BODY ══ */}
            <div style={{ background: 'var(--bg)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2.5rem 1.5rem 5rem' }}>

                    {/* Mobile TOC */}
                    <div className="bp-mobile-toc" style={{ marginBottom: '1.5rem' }}>
                        <button
                            onClick={() => setTocOpen(o => !o)}
                            style={{
                                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '1rem 1.25rem', borderRadius: '1rem', cursor: 'pointer',
                                background: 'var(--surface)', border: '1px solid var(--card-border)',
                                color: 'var(--text)', fontWeight: 600, fontSize: '0.9rem',
                            }}
                        >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <List size={15} style={{ color: 'var(--accent)' }} /> Table of Contents
                            </span>
                            {tocOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {tocOpen && (
                            <div style={{ marginTop: '0.5rem', padding: '1.25rem', borderRadius: '1rem', background: 'var(--surface)', border: '1px solid var(--card-border)' }}>
                                <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                    {post.toc.map((h, i) => (
                                        <li key={i}>
                                            <a href={`#section-${i}`} onClick={() => setTocOpen(false)}
                                                style={{
                                                    display: 'flex', alignItems: 'flex-start', gap: '0.625rem',
                                                    fontSize: '0.875rem', padding: '0.5rem 0.25rem', textDecoration: 'none',
                                                    color: i === activeSection ? 'var(--accent)' : 'var(--text-secondary)',
                                                    fontWeight: i === activeSection ? 600 : 400,
                                                }}>
                                                <span style={{
                                                    flexShrink: 0, width: '1.375rem', height: '1.375rem', borderRadius: '50%',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontSize: '0.7rem', fontWeight: 700, marginTop: '1px',
                                                    background: i === activeSection ? 'var(--accent)' : 'var(--card-bg)',
                                                    color: i === activeSection ? '#111' : 'var(--text-muted)',
                                                    border: '1px solid var(--card-border)',
                                                }}>{i + 1}</span>
                                                {h}
                                            </a>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        )}
                    </div>

                    {/* 3-col grid desktop */}
                    <div className="bp-grid">
                        {/* LEFT: TOC */}
                        <aside className="bp-left-toc">
                            <div style={{ position: 'sticky', top: '5.5rem' }}>
                                <p style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                                    <List size={12} /> In This Article
                                </p>
                                <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
                                    {post.toc.map((h, i) => (
                                        <li key={i}>
                                            <a href={`#section-${i}`} style={{
                                                display: 'flex', alignItems: 'flex-start', gap: '0.625rem',
                                                padding: '0.5rem 0.75rem', borderRadius: '0.625rem',
                                                fontSize: '0.8125rem', lineHeight: 1.45, textDecoration: 'none',
                                                color: i === activeSection ? 'var(--accent)' : 'var(--text-muted)',
                                                fontWeight: i === activeSection ? 600 : 400,
                                                background: i === activeSection ? 'rgba(198,167,94,0.08)' : 'transparent',
                                                borderLeft: i === activeSection ? '2px solid var(--accent)' : '2px solid transparent',
                                                transition: 'all 0.2s',
                                            }}>
                                                <span style={{ fontSize: '0.65rem', fontFamily: 'monospace', opacity: 0.45, marginTop: '3px', flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
                                                {h}
                                            </a>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </aside>

                        {/* CENTRE: Article */}
                        <article style={{ minWidth: 0 }}>
                            <Disclaimer lang="en" />

                            {/* Quick Answer */}
                            {post.quickAnswer && (
                                <div style={{
                                    marginBottom: '2.5rem', padding: '1.5rem', borderRadius: '1.125rem',
                                    background: 'linear-gradient(135deg, rgba(198,167,94,0.07) 0%, rgba(198,167,94,0.02) 100%)',
                                    border: '1.5px solid rgba(198,167,94,0.22)',
                                }}>
                                    <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--gold)', marginBottom: '0.875rem' }}>{post.quickAnswer.heading}</p>
                                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                                        {post.quickAnswer.points.map((pt, i) => (
                                            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                                                <span style={{ flexShrink: 0, width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', marginTop: '8px' }} />
                                                {pt}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Sections */}
                            {post.sections.map((sec, i) => (
                                <section key={i} id={`section-${i}`} style={{ marginBottom: '3rem', scrollMarginTop: '5.5rem' }}>
                                    <h2 style={{
                                        fontFamily: "'Playfair Display', serif",
                                        fontSize: 'clamp(1.2rem, 2.2vw, 1.55rem)',
                                        fontWeight: 700, lineHeight: 1.35,
                                        color: 'var(--text)',
                                        marginBottom: '1.125rem',
                                        paddingLeft: '1rem',
                                        borderLeft: '3px solid var(--accent)',
                                    }}>
                                        {sec.h2}
                                    </h2>
                                    <div
                                        className="prose-content"
                                        style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.9', letterSpacing: '0.008em' }}
                                        dangerouslySetInnerHTML={{ __html: sec.content }}
                                    />
                                </section>
                            ))}

                            {/* Related Services */}
                            {post.relatedServiceLinks && post.relatedServiceLinks.length > 0 && (
                                <div style={{ margin: '2.5rem 0', padding: '1.5rem', borderRadius: '1.125rem', background: 'var(--surface)', border: '1px solid var(--card-border)' }}>
                                    <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '1rem' }}>🔗 Related Legal Services</h2>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
                                        {post.relatedServiceLinks.map((link, i) => (
                                            <Link key={i} to={link.to}
                                                style={{
                                                    display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                                                    fontSize: '0.875rem', fontWeight: 500, padding: '0.5rem 1rem',
                                                    borderRadius: '9999px', textDecoration: 'none',
                                                    background: 'rgba(198,167,94,0.08)', color: 'var(--accent)',
                                                    border: '1px solid rgba(198,167,94,0.18)', transition: 'transform 0.2s',
                                                }}
                                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                                                <ExternalLink size={12} /> {link.text}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* FAQ */}
                            <div style={{ marginBottom: '3rem' }}>
                                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.3rem, 2.5vw, 1.65rem)', fontWeight: 700, color: 'var(--text)', marginBottom: '1.5rem' }}>
                                    Frequently Asked Questions
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {post.faqs.map((faq, i) => <FAQItem key={i} index={i} question={faq.question} answer={faq.answer} />)}
                                </div>
                            </div>

                            {/* CTA */}
                            <div style={{ borderRadius: '1.5rem', overflow: 'hidden', background: 'linear-gradient(135deg, var(--hero-bg) 0%, var(--hero-surface, #1c1c35) 100%)', border: '1px solid var(--hero-border, rgba(198,167,94,0.18))' }}>
                                <div style={{ padding: '2.5rem' }}>
                                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '3.5rem', height: '3.5rem', borderRadius: '1rem', background: 'rgba(198,167,94,0.14)', marginBottom: '1rem' }}>
                                            <MessageCircle size={24} style={{ color: 'var(--gold)' }} />
                                        </div>
                                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700, color: 'var(--hero-text)', marginBottom: '0.5rem' }}>Need Legal Help?</h2>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--hero-text-2)', opacity: 0.8, maxWidth: '360px', margin: '0 auto' }}>Send your case details and get a response via WhatsApp within minutes.</p>
                                    </div>
                                    {cSubmitted ? (
                                        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '3.5rem', height: '3.5rem', borderRadius: '50%', background: 'rgba(34,197,94,0.15)', color: '#22c55e', marginBottom: '1rem' }}>
                                                <MessageCircle size={26} />
                                            </div>
                                            <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--hero-text)', marginBottom: '0.375rem' }}>Connecting to WhatsApp...</h3>
                                            <p style={{ fontSize: '0.875rem', color: 'var(--hero-text-2)' }}>Advocate Md. Shah Alam's direct line is open.</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleConsultSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                                <div>
                                                    <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--hero-text-2)', marginBottom: '0.5rem' }}>Your Name</label>
                                                    <input type="text" required value={cName} onChange={e => setCName(e.target.value)} placeholder="Full Name"
                                                        style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '0.75rem', fontSize: '0.9rem', outline: 'none', background: 'var(--input-bg)', border: '1.5px solid var(--input-border)', color: 'var(--text)', boxSizing: 'border-box' }}
                                                        onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--input-border)'} />
                                                </div>
                                                <div>
                                                    <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--hero-text-2)', marginBottom: '0.5rem' }}>Phone Number</label>
                                                    <input type="tel" required value={cPhone} onChange={e => setCPhone(e.target.value)} placeholder="Mobile Number"
                                                        style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '0.75rem', fontSize: '0.9rem', outline: 'none', background: 'var(--input-bg)', border: '1.5px solid var(--input-border)', color: 'var(--text)', boxSizing: 'border-box' }}
                                                        onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--input-border)'} />
                                                </div>
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--hero-text-2)', marginBottom: '0.5rem' }}>Describe Your Case</label>
                                                <textarea rows="3" required value={cMessage} onChange={e => setCMessage(e.target.value)} placeholder="e.g., Land dispute in Uttara, cheque bounce case, divorce proceedings..."
                                                    style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '0.75rem', fontSize: '0.9rem', outline: 'none', resize: 'none', background: 'var(--input-bg)', border: '1.5px solid var(--input-border)', color: 'var(--text)', boxSizing: 'border-box' }}
                                                    onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--input-border)'} />
                                            </div>
                                            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                                <button type="submit" className="btn-whatsapp"
                                                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1rem', borderRadius: '0.875rem', fontWeight: 700, fontSize: '0.9rem' }}>
                                                    <MessageCircle size={16} /> Start WhatsApp Consult
                                                </button>
                                                <a href={telLink()} className="btn-secondary"
                                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1rem 1.5rem', borderRadius: '0.875rem', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', borderColor: 'var(--hero-border, rgba(198,167,94,0.18))', color: 'var(--hero-text-2)' }}>
                                                    <Phone size={15} /> Call
                                                </a>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>

                            {/* Mobile related */}
                            {related.length > 0 && (
                                <div className="bp-mobile-related" style={{ marginTop: '3rem' }}>
                                    <p style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: '1rem' }}>Related Articles</p>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
                                        {related.map(rp => (
                                            <Link key={rp.slug} to={`/blog/${rp.slug}`}
                                                style={{ display: 'block', padding: '1rem 1.25rem', borderRadius: '1rem', background: 'var(--card-bg)', border: '1px solid var(--card-border)', textDecoration: 'none', transition: 'border-color 0.2s, transform 0.2s' }}
                                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--card-border)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                                                <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: '0.5rem' }}>{rp.category}</span>
                                                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1.4, display: 'block', marginBottom: '0.625rem' }}>{rp.title}</span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}><Clock size={11} /> {rp.readTime}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </article>

                        {/* RIGHT: Sidebar */}
                        <aside className="bp-right-sidebar">
                            <div style={{ position: 'sticky', top: '5.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {related.length > 0 && (
                                    <div>
                                        <p style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: '1rem' }}>Related Articles</p>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                            {related.map(rp => (
                                                <Link key={rp.slug} to={`/blog/${rp.slug}`}
                                                    style={{ display: 'block', padding: '1rem 1.125rem', borderRadius: '1rem', background: 'var(--card-bg)', border: '1px solid var(--card-border)', textDecoration: 'none', transition: 'border-color 0.2s, transform 0.2s' }}
                                                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--card-border)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                                                    <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: '0.375rem' }}>{rp.category}</span>
                                                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1.4, display: 'block', marginBottom: '0.5rem' }}>{rp.title}</span>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}><Clock size={11} /> {rp.readTime}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div style={{ padding: '1.25rem', borderRadius: '1.125rem', background: 'linear-gradient(135deg, rgba(198,167,94,0.07) 0%, transparent 100%)', border: '1px solid rgba(198,167,94,0.18)' }}>
                                    <p style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold)', marginBottom: '0.75rem' }}>Quick Consult</p>
                                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.55 }}>Have a legal question? Get direct advice from Advocate Shah Alam.</p>
                                    <a href={waLink(`I read your article: ${post.title}. I need legal assistance.`)} target="_blank" rel="noopener noreferrer"
                                        className="btn-whatsapp"
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem', borderRadius: '0.75rem', fontSize: '0.8125rem', fontWeight: 700, textDecoration: 'none', marginBottom: '0.5rem' }}>
                                        <MessageCircle size={14} /> WhatsApp Now
                                    </a>
                                    <a href={telLink()}
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem', borderRadius: '0.75rem', fontSize: '0.8125rem', fontWeight: 600, textDecoration: 'none', color: 'var(--text-secondary)', border: '1px solid var(--card-border)', transition: 'border-color 0.2s' }}
                                        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                                        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--card-border)'}>
                                        <Phone size={14} /> Call Chamber
                                    </a>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>

            <style>{`
                .bp-grid {
                    display: grid;
                    grid-template-columns: 220px 1fr 260px;
                    gap: 3rem;
                    align-items: start;
                }
                .bp-left-toc { display: block; }
                .bp-right-sidebar { display: block; }
                .bp-mobile-toc { display: none; }
                .bp-mobile-related { display: none; }

                @media (max-width: 1200px) {
                    .bp-grid {
                        grid-template-columns: 200px 1fr;
                        gap: 2.5rem;
                    }
                    .bp-right-sidebar { display: none; }
                    .bp-mobile-related { display: block; }
                }
                @media (max-width: 860px) {
                    .bp-grid { display: block; }
                    .bp-left-toc { display: none; }
                    .bp-mobile-toc { display: block; }
                }

                .prose-content p { margin-bottom: 1.25rem; }
                .prose-content ul, .prose-content ol { padding-left: 1.5rem; margin-bottom: 1.25rem; }
                .prose-content li { margin-bottom: 0.5rem; }
                .prose-content strong { color: var(--text); font-weight: 700; }
                .prose-content a { color: var(--accent); text-decoration: underline; text-decoration-color: rgba(198,167,94,0.35); text-underline-offset: 3px; transition: text-decoration-color 0.2s; }
                .prose-content a:hover { text-decoration-color: var(--accent); }
                .prose-content h3 { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 700; color: var(--text); margin: 1.75rem 0 0.75rem; }
                .prose-content blockquote { border-left: 3px solid var(--accent); padding-left: 1rem; margin: 1.5rem 0; font-style: italic; color: var(--text-muted); }
                .prose-content table { width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; font-size: 0.875rem; }
                .prose-content th, .prose-content td { padding: 0.625rem 0.875rem; border: 1px solid var(--card-border); }
                .prose-content th { background: var(--surface); font-weight: 700; color: var(--text); }
                .prose-content ol { list-style: decimal; }
                .prose-content ul { list-style: disc; }
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

