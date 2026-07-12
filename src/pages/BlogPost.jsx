import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    ArrowLeft, Clock, ChevronDown, ChevronUp,
    Phone, MessageCircle, ExternalLink, BookOpen, AlertTriangle
} from 'lucide-react';
import { telLink, waLink } from '../data/contactInfo';
import Disclaimer from '../components/Disclaimer';
import ReadingProgress from '../components/ReadingProgress';

// Load all EN blog posts from JSON files (bundled at build time by Vite)
const _postModules = import.meta.glob('../content/posts/en/*.json', { eager: true });
const posts = Object.values(_postModules)
    .map((m) => m.default ?? m)
    .filter((p) => p && p.slug); // guard against malformed entries

/* ─── Error Boundary — catches JS crashes so we NEVER show blank page ─── */
class BlogPostErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, info) {
        console.error('[BlogPost] Render error:', error, info);
    }
    render() {
        if (this.state.hasError) {
            return (
                <section className="pt-28 pb-20" style={{ background: 'var(--bg)' }}>
                    <Helmet><title>Error | Advocate Md. Shah Alam</title><meta name="robots" content="noindex" /></Helmet>
                    <div className="container mx-auto px-6 max-w-2xl text-center">
                        <div className="glass-card inline-flex flex-col items-center gap-5 px-10 py-14">
                            <AlertTriangle size={44} style={{ color: 'var(--accent)' }} />
                            <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Something went wrong</h1>
                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>This article could not be loaded. Please try again or go back to the blog.</p>
                            <Link to="/blog" className="btn-primary text-sm">← Back to Blog</Link>
                        </div>
                    </div>
                </section>
            );
        }
        return this.props.children;
    }
}

function isPublished(post) {
  // Always check date on client — previous `typeof window` guard bypassed the check
  try {
    if (post.isDraft) return false;
    if (!post.publishedDate) return true; // no date = always show
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }));
    const pub = new Date(post.publishedDate + 'T00:00:00');
    return pub <= now;
  } catch { return true; }
}

/* ─── FAQ Accordion Item ─────────────────────────────── */
const FAQItem = ({ question, answer }) => {
    const [open, setOpen] = useState(false);
    return (
        <div
            className="border rounded-xl overflow-hidden transition-all"
            style={{ borderColor: 'var(--card-border)' }}
        >
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-base"
                style={{ color: 'var(--text)', background: 'var(--card-bg)' }}
                aria-expanded={open}
            >
                <span>{question}</span>
                {open
                    ? <ChevronUp size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                    : <ChevronDown size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                }
            </button>
            {open && (
                <div
                    className="px-5 py-4 text-sm leading-relaxed"
                    style={{ color: 'var(--text-secondary)', background: 'var(--surface)' }}
                >
                    {answer}
                </div>
            )}
        </div>
    );
};

/* ─── Main Component ─────────────────────────────────── */
const BlogPostInner = () => {
    const { slug } = useParams();
    const post = posts.find(p => p.slug === slug);
    const [cName, setCName] = useState('');
    const [cPhone, setCPhone] = useState('');
    const [cMessage, setCMessage] = useState('');
    const [cSubmitted, setCSubmitted] = useState(false);

    const handleConsultSubmit = (e) => {
        e.preventDefault();
        if (!post) return;
        const text = `*📋 New Consultation Request*\n\n*Article:* ${post.title}\n*Name:* ${cName}\n*Phone:* ${cPhone}\n*Brief Inquiry:* ${cMessage}`;
        window.open(waLink(text), '_blank');
        setCSubmitted(true);
        setTimeout(() => {
            setCSubmitted(false);
            setCName('');
            setCPhone('');
            setCMessage('');
        }, 5000);
    };

    // Auto-redirect to /blog when post is not found (fixes Soft 404)
    React.useEffect(() => {
        if (!post) {
            const t = setTimeout(() => { window.location.replace('/blog'); }, 3000);
            return () => clearTimeout(t);
        }
    }, [post]);

    /* ── 404 fallback — noindex + auto-redirect to /blog ── */
    if (!post) {
        return (
            <>
                <Helmet>
                    <title>Article Not Found | Advocate Md. Shah Alam</title>
                    <meta name="robots" content="noindex, nofollow" />
                    <meta httpEquiv="refresh" content="3;url=/blog" />
                </Helmet>
                <section className="pt-28 pb-20" style={{ background: 'var(--bg)' }}>
                    <div className="container mx-auto px-6 max-w-2xl text-center">
                        <div className="glass-card inline-flex flex-col items-center gap-5 px-10 py-14">
                            <BookOpen size={44} style={{ color: 'var(--accent)' }} />
                            <h1
                                className="text-2xl font-serif font-bold"
                                style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}
                            >
                                Article Not Found
                            </h1>
                            <p className="text-sm max-w-sm" style={{ color: 'var(--text-muted)' }}>
                                This article has been moved or updated. Redirecting you to our blog in 3 seconds...
                            </p>
                            <Link to="/blog" className="btn-primary text-sm">
                                ← Back to Blog
                            </Link>
                        </div>
                    </div>
                </section>
            </>
        );
    }

    /* ── Coming Soon (future-dated post) ── */
    if (!isPublished(post)) {
        return (
            <>
                <Helmet>
                    <title>Coming Soon | Advocate Md. Shah Alam</title>
                    <meta name="robots" content="noindex, nofollow" />
                </Helmet>
                <section className="pt-28 pb-20" style={{ background: 'var(--bg)' }}>
                    <div className="container mx-auto px-6 max-w-2xl text-center">
                        <div className="glass-card inline-flex flex-col items-center gap-5 px-10 py-14">
                            <Clock size={44} style={{ color: 'var(--accent)' }} />
                            <h1
                                className="text-2xl font-serif font-bold"
                                style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}
                            >
                                Article Coming Soon
                            </h1>
                            <p className="text-sm max-w-sm" style={{ color: 'var(--text-muted)' }}>
                                This article is scheduled for future publication. Check back soon.
                            </p>
                            <Link to="/blog" className="btn-primary text-sm">
                                ← Back to Blog
                            </Link>
                        </div>
                    </div>
                </section>
            </>
        );
    }

    /* ── Related posts (same category, exclude current) ── */
    const related = posts
        .filter(p => p.category === post.category && p.slug !== post.slug)
        .slice(0, 3);

    /* ── JSON-LD: BlogPosting ── */
    const blogPostingSchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.metaDescription,
        datePublished: post.publishedDate,
        dateModified: post.lastModified || post.publishedDate,
        inLanguage: 'en',
        author: {
            '@type': 'Person',
            name: 'Advocate Md. Shah Alam',
            jobTitle: 'Advocate – Supreme Court of Bangladesh',
            url: 'https://www.advmdshahalam.me/advocate-md-shah-alam',
            sameAs: [
                'https://www.facebook.com/advmd.shahalamfb',
                'https://maps.app.goo.gl/M3NXMwW3xkp2TE3h8',
            ],
        },
        publisher: {
            '@type': 'Organization',
            name: 'Advocate Md. Shah Alam Law Chambers',
            url: 'https://www.advmdshahalam.me',
            logo: {
                '@type': 'ImageObject',
                url: 'https://www.advmdshahalam.me/images/hero/hero-md-shah-alam.png',
            },
        },
        url: `https://www.advmdshahalam.me/blog/${post.slug}`,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://www.advmdshahalam.me/blog/${post.slug}`,
        },
        image: 'https://www.advmdshahalam.me/images/hero/hero-md-shah-alam.png',
        keywords: post.keywords.join(', '),
    };

    /* ── JSON-LD: BreadcrumbList ── */
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.advmdshahalam.me/' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.advmdshahalam.me/blog' },
            { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.advmdshahalam.me/blog/${post.slug}` },
        ],
    };

    /* ── JSON-LD: FAQPage ── */
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };

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
                {/* Article OG — content freshness signals */}
                <meta property="article:published_time" content={post.publishedDate} />
                <meta property="article:modified_time" content={post.lastModified || post.publishedDate} />
                <meta property="article:section" content={post.category} />
                <meta property="article:tag" content={post.keywords.slice(0, 5).join(', ')} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={post.metaTitle} />
                <meta name="twitter:description" content={post.metaDescription} />
                <meta name="twitter:image" content="https://www.advmdshahalam.me/images/hero/hero-md-shah-alam.png" />
                <meta name="author" content="Advocate Md. Shah Alam" />
                {/* hreflang — EN self + BN pair (when available) */}
                <link rel="alternate" hrefLang="en" href={`https://www.advmdshahalam.me/blog/${post.slug}`} />
                <link rel="alternate" hrefLang="x-default" href={`https://www.advmdshahalam.me/blog/${post.slug}`} />
                {post.bnSlug && (
                    <link rel="alternate" hrefLang="bn" href={`https://www.advmdshahalam.me/bn/blog/${post.bnSlug}`} />
                )}
                <script type="application/ld+json">{JSON.stringify(blogPostingSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
            </Helmet>

            {/* ── Hero ── */}
            <section className="pt-28 pb-14 relative overflow-hidden" style={{ background: 'var(--hero-bg)' }}>
                <div className="container mx-auto px-6 max-w-4xl relative z-10">
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 text-sm font-medium opacity-70 hover:opacity-100 transition-opacity"
                            style={{ color: 'var(--hero-text-2)' }}
                        >
                            <ArrowLeft size={15} /> Back to Blog
                        </Link>
                        {post.bnSlug && (
                            <Link
                                to={`/bn/blog/${post.bnSlug}`}
                                className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all hover:opacity-80"
                                style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}
                            >
                                🇧🇩 বাংলায় পড়ুন
                            </Link>
                        )}
                    </div>
                    {/* Visual Breadcrumb — Google extracts visible breadcrumbs for SERP */}
                    <nav className="mb-5 text-xs" aria-label="Breadcrumb">
                        <ol className="flex items-center gap-1.5 flex-wrap" style={{ color: 'var(--hero-muted)' }}>
                            <li><Link to="/" className="hover:underline" style={{ color: 'var(--hero-text-2)' }}>Home</Link></li>
                            <li aria-hidden="true">/</li>
                            <li><Link to="/blog" className="hover:underline" style={{ color: 'var(--hero-text-2)' }}>Blog</Link></li>
                            <li aria-hidden="true">/</li>
                            <li style={{ color: 'var(--gold)' }}>{post.category}</li>
                        </ol>
                    </nav>
                    <div className="flex items-center gap-3 mb-5">
                        <span
                            className="text-xs font-bold px-3 py-1 rounded-full"
                            style={{
                                background: 'rgba(198,167,94,0.15)',
                                color: 'var(--gold)',
                                letterSpacing: '0.06em',
                            }}
                        >
                            {post.category}
                        </span>
                        <span
                            className="flex items-center gap-1 text-xs"
                            style={{ color: 'var(--hero-muted)' }}
                        >
                            <Clock size={12} /> {post.readTime}
                        </span>
                    </div>
                    <h1
                        className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight mb-5"
                        style={{ color: 'var(--hero-text)', fontFamily: "'Playfair Display', serif" }}
                    >
                        {post.title}
                    </h1>
                    <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--hero-text-2)' }}>
                        {post.heroIntro}
                    </p>
                    <p className="text-sm mt-4" style={{ color: 'var(--hero-muted)' }}>
                        By <strong>Advocate Md. Shah Alam</strong> · Published {post.publishedDate}
                    </p>
                </div>
            </section>

            {/* ── Body ── */}
            <div className="py-14" style={{ background: 'var(--bg)' }}>
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="flex flex-col lg:flex-row gap-10">

                        {/* Main content */}
                        <article className="flex-1 min-w-0">

                            {/* Legal Disclaimer — required for AdSense on legal content */}
                            <Disclaimer lang="en" />

                            {/* Table of Contents */}
                            <nav
                                className="mb-10 p-6 rounded-2xl"
                                style={{ background: 'var(--surface)', border: '1px solid var(--card-border)' }}
                                aria-label="Table of Contents"
                            >
                                <h2
                                    className="text-base font-bold mb-4 flex items-center gap-2"
                                    style={{ color: 'var(--accent)' }}
                                >
                                    📋 In This Article
                                </h2>
                                <ol className="space-y-2">
                                    {post.toc.map((heading, i) => (
                                        <li key={i}>
                                            <a
                                                href={`#section-${i}`}
                                                className="text-sm hover:underline"
                                                style={{ color: 'var(--text-secondary)' }}
                                            >
                                                {i + 1}. {heading}
                                            </a>
                                        </li>
                                    ))}
                                </ol>
                            </nav>

                            {/* Sections */}
                            {post.sections.map((section, i) => (
                                <section key={i} id={`section-${i}`} className="mb-10">
                                    <h2
                                        className="text-xl md:text-2xl font-serif font-bold mb-4"
                                        style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}
                                    >
                                        {section.h2}
                                    </h2>
                                    <div
                                        className="text-base leading-relaxed space-y-4 prose-content"
                                        style={{ color: 'var(--text-secondary)' }}
                                        dangerouslySetInnerHTML={{ __html: section.content }}
                                    />
                                </section>
                            ))}

                            {/* Related Services */}
                            <div
                                className="my-10 p-6 rounded-2xl"
                                style={{ background: 'var(--surface)', border: '1px solid var(--card-border)' }}
                            >
                                <h2
                                    className="text-lg font-bold mb-4"
                                    style={{ color: 'var(--text)' }}
                                >
                                    🔗 Related Legal Services
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {post.relatedServiceLinks.map((link, i) => (
                                        <Link
                                            key={i}
                                            to={link.to}
                                            className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full transition-all hover:scale-105"
                                            style={{
                                                background: 'var(--accent-subtle)',
                                                color: 'var(--accent)',
                                                border: '1px solid var(--card-border)',
                                            }}
                                        >
                                            <ExternalLink size={13} /> {link.text}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* FAQ */}
                            <div className="mb-10">
                                <h2
                                    className="text-2xl font-serif font-bold mb-6"
                                    style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}
                                >
                                    Frequently Asked Questions
                                </h2>
                                <div className="space-y-3">
                                    {post.faqs.map((faq, i) => (
                                        <FAQItem key={i} question={faq.question} answer={faq.answer} />
                                    ))}
                                </div>
                            </div>

                            {/* CTA Form */}
                            <div
                                className="rounded-2xl p-6 md:p-8"
                                style={{ background: 'linear-gradient(135deg, var(--hero-bg) 0%, var(--hero-surface) 100%)', border: '1px solid var(--hero-border)' }}
                            >
                                <div className="text-center mb-6">
                                    <h2
                                        className="text-xl md:text-2xl font-serif font-bold mb-2"
                                        style={{ color: 'var(--hero-text)', fontFamily: "'Playfair Display', serif" }}
                                    >
                                        Direct Legal Consultation
                                    </h2>
                                    <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--hero-text-2)' }}>
                                        Fill out this quick form to initiate an official legal review and connect directly via WhatsApp.
                                    </p>
                                </div>

                                {cSubmitted ? (
                                    <div className="flex flex-col items-center justify-center py-8 text-center">
                                        <div
                                            className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                                            style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}
                                        >
                                            <MessageCircle size={24} />
                                        </div>
                                        <h3 className="font-bold text-base mb-1" style={{ color: 'var(--hero-text)' }}>Connecting to WhatsApp...</h3>
                                        <p className="text-xs" style={{ color: 'var(--hero-text-2)' }}>
                                            Advocate Md. Shah Alam's direct WhatsApp line has been opened.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleConsultSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-bold uppercase tracking-wider block mb-1.5" style={{ color: 'var(--hero-text-2)' }}>
                                                    Your Name
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={cName}
                                                    onChange={e => setCName(e.target.value)}
                                                    placeholder="Full Name"
                                                    className="w-full px-4 py-3 rounded-xl text-xs outline-none transition-all duration-200"
                                                    style={{ background: 'var(--input-bg)', border: '1.5px solid var(--input-border)', color: 'var(--text)' }}
                                                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                                                    onBlur={e => e.target.style.borderColor = 'var(--input-border)'}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold uppercase tracking-wider block mb-1.5" style={{ color: 'var(--hero-text-2)' }}>
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    required
                                                    value={cPhone}
                                                    onChange={e => setCPhone(e.target.value)}
                                                    placeholder="Mobile Number"
                                                    className="w-full px-4 py-3 rounded-xl text-xs outline-none transition-all duration-200"
                                                    style={{ background: 'var(--input-bg)', border: '1.5px solid var(--input-border)', color: 'var(--text)' }}
                                                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                                                    onBlur={e => e.target.style.borderColor = 'var(--input-border)'}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold uppercase tracking-wider block mb-1.5" style={{ color: 'var(--hero-text-2)' }}>
                                                Brief Legal Issue Details
                                            </label>
                                            <textarea
                                                rows="3"
                                                required
                                                value={cMessage}
                                                onChange={e => setCMessage(e.target.value)}
                                                placeholder="Describe your case briefly (e.g., Land dispute in Uttara, cheque bounce NI Act 138, etc.)"
                                                className="w-full px-4 py-3 rounded-xl text-xs outline-none transition-all duration-200 resize-none"
                                                style={{ background: 'var(--input-bg)', border: '1.5px solid var(--input-border)', color: 'var(--text)' }}
                                                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                                                onBlur={e => e.target.style.borderColor = 'var(--input-border)'}
                                            ></textarea>
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                            <button
                                                type="submit"
                                                className="btn-whatsapp flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-xs shadow-sm hover:scale-[1.01] transition-transform"
                                            >
                                                <MessageCircle size={15} /> Start WhatsApp Consult
                                            </button>
                                            <a
                                                href={telLink()}
                                                className="btn-secondary flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-xs hover:scale-[1.01] transition-transform"
                                                style={{ borderColor: 'var(--hero-border)', color: 'var(--hero-text-2)' }}
                                            >
                                                <Phone size={14} /> Call Chamber
                                            </a>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </article>

                        {/* Sidebar – Related Posts */}
                        {related.length > 0 && (
                            <aside className="lg:w-72 shrink-0">
                                <div className="lg:sticky lg:top-28">
                                    <h3
                                        className="text-base font-bold mb-5"
                                        style={{ color: 'var(--text)' }}
                                    >
                                        Related Articles
                                    </h3>
                                    <div className="space-y-4">
                                        {related.map(rp => (
                                            <Link
                                                key={rp.slug}
                                                to={`/blog/${rp.slug}`}
                                                className="block glass-card p-4 no-underline"
                                                style={{ borderRadius: '1rem' }}
                                            >
                                                <span
                                                    className="text-xs font-bold block mb-1"
                                                    style={{ color: 'var(--accent)' }}
                                                >
                                                    {rp.category}
                                                </span>
                                                <span
                                                    className="text-sm font-semibold leading-snug"
                                                    style={{ color: 'var(--text)' }}
                                                >
                                                    {rp.title}
                                                </span>
                                                <span
                                                    className="flex items-center gap-1 text-xs mt-2"
                                                    style={{ color: 'var(--text-muted)' }}
                                                >
                                                    <Clock size={11} /> {rp.readTime}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </aside>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

/* Wrap with error boundary so a JS crash never shows a blank white page */
const BlogPost = () => (
    <BlogPostErrorBoundary>
        <BlogPostInner />
    </BlogPostErrorBoundary>
);

export default BlogPost;
