import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    ArrowLeft, Clock, ChevronDown, ChevronUp, Phone, MessageCircle,
    ExternalLink, BookOpen, AlertTriangle, List, Calendar,
    TrendingUp, Newspaper, Flame
} from 'lucide-react';
import { waLink, telLink } from '../data/contactInfo';
import Disclaimer from '../components/Disclaimer';

/* ── Load all BN posts ── */
const _bnModules = import.meta.glob('../content/posts/bn/*.json', { eager: true });
const allBnPosts = Object.values(_bnModules)
    .map(m => m.default ?? m)
    .filter(p => p && p.slug);

/* ── "Most Popular" BN slugs ── */
const POPULAR_BN_SLUGS = [
    'jomi-nondoner-ain-bangladesh-bn',
    'rs-survey-bangladesh-bn',
    'talak-procedure-bangladesh-bn',
    'child-custody-bangladesh-bn',
    'yautuk-dowry-ain-bangladesh-bn',
    'family-court-bangladesh-bn',
    'land-mutation-porcha-bangladesh-bn',
    'anticipatory-bail-bangladesh-bn',
    'divorce-notice-bangladesh-bn',
    'wrongful-termination-labour-law-bangladesh-bn',
];

/* Category color map */
const CAT_COLOR = {
    'ভূমি আইন':      { bg: '#0369a1', text: '#fff' },
    'পারিবারিক আইন': { bg: '#7c3aed', text: '#fff' },
    'ফৌজদারি আইন':   { bg: '#dc2626', text: '#fff' },
    'সাইবার আইন':    { bg: '#065f46', text: '#fff' },
    'শ্রম আইন':      { bg: '#be185d', text: '#fff' },
    'দেওয়ানি আইন':  { bg: '#0891b2', text: '#fff' },
    'Criminal Law':   { bg: '#dc2626', text: '#fff' },
    'Family Law':     { bg: '#7c3aed', text: '#fff' },
    'Property Law':   { bg: '#0369a1', text: '#fff' },
    'Labour Law':     { bg: '#be185d', text: '#fff' },
};
const catColor = cat => CAT_COLOR[cat] || { bg: 'var(--accent)', text: '#111' };

/* ─── Error Boundary ─── */
class BlogPostBnErrorBoundary extends React.Component {
    constructor(props) { super(props); this.state = { hasError: false }; }
    static getDerivedStateFromError() { return { hasError: true }; }
    componentDidCatch(e, i) { console.error('[BlogPostBn]', e, i); }
    render() {
        if (this.state.hasError) return (
            <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                <Helmet><title>Error | Advocate Md. Shah Alam</title><meta name="robots" content="noindex" /></Helmet>
                <div style={{ textAlign: 'center', maxWidth: '400px' }}>
                    <AlertTriangle size={48} style={{ color: 'var(--accent)', marginBottom: '1rem' }} />
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.75rem' }}>কিছু একটা ভুল হয়েছে</h1>
                    <Link to="/bn/blog" className="btn-primary">← ব্লগে ফিরুন</Link>
                </div>
            </div>
        );
        return this.props.children;
    }
}

function isPublishedBn(post) {
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
        <div style={{ borderRadius: '0.875rem', overflow: 'hidden', border: `1.5px solid ${open ? 'var(--accent)' : 'var(--card-border)'}`, background: 'var(--card-bg)', transition: 'border-color 0.2s' }}>
            <button onClick={() => setOpen(o => !o)} aria-expanded={open}
                style={{ width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '1.125rem 1.375rem', textAlign: 'left', gap: '0.875rem', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <span style={{ fontWeight: 600, fontSize: '0.9375rem', lineHeight: 1.45, flex: 1, color: 'var(--text)' }}>
                    <span style={{ color: 'var(--accent)', marginRight: '6px', fontWeight: 700 }}>প্র{index + 1}.</span>{question}
                </span>
                <span style={{ flexShrink: 0, width: '1.625rem', height: '1.625rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: open ? 'var(--accent)' : 'var(--surface)', color: open ? '#111' : 'var(--text-muted)', transition: 'all 0.2s' }}>
                    {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </span>
            </button>
            {open && (
                <div style={{ padding: '0.875rem 1.375rem 1.125rem', borderTop: '1px solid var(--card-border)', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8, wordBreak: 'break-word' }}>
                    {answer}
                </div>
            )}
        </div>
    );
};

/* ─── Sidebar Glass Wrappers ─── */
const SbCard = ({ children, accentColor }) => (
    <div style={{
        background: 'rgba(255,255,255,0.025)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: `1px solid ${accentColor ? accentColor + '25' : 'rgba(198,167,94,0.14)'}`,
        borderRadius: '1rem', overflow: 'hidden', marginBottom: '1.125rem',
        boxShadow: '0 4px 28px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.05)',
    }}>{children}</div>
);
const SbHeader = ({ icon: Icon, label, color = 'var(--accent)' }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 1.125rem', background: `linear-gradient(135deg, ${color}20 0%, transparent 60%)`, borderBottom: `1px solid ${color}22` }}>
        <Icon size={13} style={{ color, flexShrink: 0 }} />
        <span style={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text)', fontFamily: "'SolaimanLipi', 'Noto Sans Bengali', sans-serif" }}>{label}</span>
        <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${color}30, transparent)`, marginLeft: '0.25rem' }} />
    </div>
);

/* ─── Sidebar: Most Popular BN ─── */
const PopularBnPosts = ({ currentSlug }) => {
    const popular = POPULAR_BN_SLUGS
        .map(s => allBnPosts.find(p => p.slug === s))
        .filter(p => p && p.slug !== currentSlug)
        .slice(0, 7);
    if (popular.length === 0) return null;
    return (
        <SbCard>
            <SbHeader icon={Flame} label="সর্বাধিক পঠিত" color="#f59e0b" />
            <div style={{ padding: '0.5rem 0.75rem 0.75rem' }}>
                {popular.map((rp, idx) => {
                    const cc = catColor(rp.category);
                    const isTop3 = idx < 3;
                    return (
                        <Link key={rp.slug} to={`/bn/blog/${rp.slug}`}
                            style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', padding: '0.5rem 0.5rem', borderRadius: '0.625rem', textDecoration: 'none', transition: 'all 0.2s', marginBottom: '0.125rem', border: '1px solid transparent' }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(198,167,94,0.07)'; e.currentTarget.style.borderColor = 'rgba(198,167,94,0.15)'; e.currentTarget.style.transform = 'translateX(3px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                            <span style={{ flexShrink: 0, width: '1.625rem', height: '1.625rem', borderRadius: '0.375rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.75rem', background: isTop3 ? 'linear-gradient(135deg, #c6a75e, #e8c97d)' : 'rgba(255,255,255,0.06)', color: isTop3 ? '#111' : 'var(--text-muted)', border: isTop3 ? 'none' : '1px solid rgba(255,255,255,0.08)', boxShadow: isTop3 ? '0 2px 8px rgba(198,167,94,0.35)' : 'none' }}>{idx + 1}</span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <span style={{ display: 'inline-block', fontSize: '0.58rem', fontWeight: 700, padding: '1px 5px', borderRadius: '3px', marginBottom: '0.2rem', background: cc.bg + 'cc', color: cc.text, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{rp.category}</span>
                                <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1.45, margin: 0, fontFamily: "'SolaimanLipi', 'Noto Sans Bengali', sans-serif" }}>{rp.title}</p>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}><Clock size={9} />{rp.readTime}</span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </SbCard>
    );
};

/* ─── Sidebar: Recent BN Posts ─── */
const RecentBnPosts = ({ currentSlug }) => {
    const recent = [...allBnPosts]
        .filter(p => p.slug !== currentSlug && p.publishedDate)
        .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
        .slice(0, 6);
    if (recent.length === 0) return null;
    return (
        <SbCard>
            <SbHeader icon={Newspaper} label="সাম্প্রতিক নিবন্ধ" color="#60a5fa" />
            <div style={{ padding: '0.5rem 0.75rem 0.75rem' }}>
                {recent.map(rp => {
                    const cc = catColor(rp.category);
                    return (
                        <Link key={rp.slug} to={`/bn/blog/${rp.slug}`}
                            style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', padding: '0.5rem 0.5rem', borderRadius: '0.625rem', textDecoration: 'none', transition: 'all 0.2s', marginBottom: '0.125rem', border: '1px solid transparent' }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(96,165,250,0.06)'; e.currentTarget.style.borderColor = 'rgba(96,165,250,0.14)'; e.currentTarget.style.transform = 'translateX(3px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                            <div style={{ flexShrink: 0, width: '3px', alignSelf: 'stretch', borderRadius: '2px', background: cc.bg, minHeight: '36px', opacity: 0.9 }} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <span style={{ display: 'inline-block', fontSize: '0.58rem', fontWeight: 700, padding: '1px 5px', borderRadius: '3px', marginBottom: '0.2rem', background: cc.bg + 'cc', color: cc.text, textTransform: 'uppercase' }}>{rp.category}</span>
                                <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1.45, margin: 0, fontFamily: "'SolaimanLipi', 'Noto Sans Bengali', sans-serif" }}>{rp.title}</p>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}><Calendar size={9} />{rp.publishedDate ? new Date(rp.publishedDate).toLocaleDateString('bn-BD', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}</span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </SbCard>
    );
};

/* ─── Related by Category BN ─── */
const RelatedBnByCategory = ({ category, currentSlug }) => {
    const related = allBnPosts.filter(p => p.category === category && p.slug !== currentSlug).slice(0, 4);
    if (related.length === 0) return null;
    const cc = catColor(category);
    return (
        <SbCard accentColor={cc.bg}>
            <SbHeader icon={TrendingUp} label="আরো দেখুন" color={cc.bg} />
            <div style={{ padding: '0.5rem 0.75rem 0.75rem' }}>
                {related.map(rp => (
                    <Link key={rp.slug} to={`/bn/blog/${rp.slug}`}
                        style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', padding: '0.5rem 0.5rem', borderRadius: '0.625rem', textDecoration: 'none', transition: 'all 0.2s', marginBottom: '0.125rem', border: '1px solid transparent' }}
                        onMouseEnter={e => { e.currentTarget.style.background = cc.bg + '12'; e.currentTarget.style.borderColor = cc.bg + '25'; e.currentTarget.style.transform = 'translateX(3px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                        <span style={{ flexShrink: 0, width: '6px', height: '6px', borderRadius: '50%', background: cc.bg, marginTop: '6px', boxShadow: `0 0 6px ${cc.bg}88` }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1.45, margin: 0, fontFamily: "'SolaimanLipi', 'Noto Sans Bengali', sans-serif" }}>{rp.title}</p>
                            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{rp.readTime}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </SbCard>
    );
};

/* ─── Consult Widget BN ─── */
const ConsultBnWidget = ({ postTitle }) => (
    <div style={{
        borderRadius: '1rem', overflow: 'hidden', marginBottom: '1.125rem',
        background: 'linear-gradient(145deg, rgba(12,10,30,0.95) 0%, rgba(25,20,55,0.92) 100%)',
        border: '1px solid rgba(198,167,94,0.28)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(198,167,94,0.06) inset',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
    }}>
        <div style={{ height: '2.5px', background: 'linear-gradient(90deg, transparent, #c6a75e, #e8c97d, #c6a75e, transparent)' }} />
        <div style={{ padding: '1rem 1.125rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.625rem' }}>
                <span style={{ fontSize: '0.9rem' }}>⚖️</span>
                <span style={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', background: 'linear-gradient(90deg, #c6a75e, #e8c97d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: "'SolaimanLipi', 'Noto Sans Bengali', sans-serif" }}>বিনামূল্যে আইনি পরামর্শ</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '0.875rem', fontFamily: "'SolaimanLipi', 'Noto Sans Bengali', sans-serif" }}>
                <strong style={{ color: '#e8c97d' }}>অ্যাডভোকেট মো. শাহ আলম</strong> — বাংলাদেশ সুপ্রিম কোর্টের আইনজীবীর কাছ থেকে বিশেষজ্ঞ পরামর্শ নিন।
            </p>
            <a href={waLink(`আমি পড়লাম: ${postTitle}। আইনি সাহায্য দরকার।`)} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem', borderRadius: '0.625rem', fontSize: '0.8125rem', fontWeight: 700, textDecoration: 'none', marginBottom: '0.5rem', background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#fff', boxShadow: '0 4px 14px rgba(34,197,94,0.35)', transition: 'transform 0.15s, box-shadow 0.15s', fontFamily: "'SolaimanLipi', 'Noto Sans Bengali', sans-serif" }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(34,197,94,0.45)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(34,197,94,0.35)'; }}>
                <MessageCircle size={14} /> এখনই WhatsApp করুন
            </a>
            <a href={telLink()}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.625rem', borderRadius: '0.625rem', fontSize: '0.8125rem', fontWeight: 600, textDecoration: 'none', color: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.15s', fontFamily: "'SolaimanLipi', 'Noto Sans Bengali', sans-serif" }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}>
                <Phone size={13} /> ফোন করুন
            </a>
        </div>
    </div>
);

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
const BlogPostBnInner = () => {
    const { slug } = useParams();
    const post = allBnPosts.find(p => p.slug === slug);
    const [cName, setCName] = useState('');
    const [cPhone, setCPhone] = useState('');
    const [cMessage, setCMessage] = useState('');
    const [cSubmitted, setCSubmitted] = useState(false);
    const [activeSection, setActiveSection] = useState(0);
    const [tocOpen, setTocOpen] = useState(false);

    React.useEffect(() => {
        if (!post) {
            const t = setTimeout(() => window.location.replace('/bn/blog'), 3000);
            return () => clearTimeout(t);
        }
    }, [post]);

    useEffect(() => {
        if (!post) return;
        const obs = new IntersectionObserver(
            entries => entries.forEach(e => {
                if (e.isIntersecting) {
                    const id = e.target.getAttribute('id');
                    if (id?.startsWith('bnsec-')) setActiveSection(parseInt(id.replace('bnsec-', '')));
                }
            }),
            { rootMargin: '-10% 0px -70% 0px' }
        );
        document.querySelectorAll('[id^="bnsec-"]').forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, [post]);

    const handleConsultSubmit = e => {
        e.preventDefault();
        const text = `*📋 আইনি পরামর্শের অনুরোধ*\n*নিবন্ধ:* ${post.title}\n*নাম:* ${cName}\n*মোবাইল:* ${cPhone}\n*আইনি সমস্যা:* ${cMessage}`;
        window.open(waLink(text), '_blank');
        setCSubmitted(true);
        setTimeout(() => { setCSubmitted(false); setCName(''); setCPhone(''); setCMessage(''); }, 5000);
    };

    if (!post) return (
        <>
            <Helmet><title>পাওয়া যায়নি | অ্যাডভোকেট মো. শাহ আলম</title><meta name="robots" content="noindex" /><meta httpEquiv="refresh" content="3;url=/bn/blog" /></Helmet>
            <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <BookOpen size={48} style={{ color: 'var(--accent)', marginBottom: '1rem' }} />
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem', fontFamily: "'Playfair Display', serif" }}>নিবন্ধটি পাওয়া যায়নি</h1>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>ব্লগে নিয়ে যাওয়া হচ্ছে...</p>
                    <Link to="/bn/blog" className="btn-primary">← ব্লগে ফিরুন</Link>
                </div>
            </div>
        </>
    );

    if (!isPublishedBn(post)) return (
        <>
            <Helmet><html lang="bn" /><title>শীঘ্রই আসছে | অ্যাডভোকেট মো. শাহ আলম</title><meta name="robots" content="noindex" /></Helmet>
            <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <Clock size={48} style={{ color: 'var(--accent)', marginBottom: '1rem' }} />
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>শীঘ্রই আসছে</h1>
                    <Link to="/bn/blog" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>← ব্লগে ফিরুন</Link>
                </div>
            </div>
        </>
    );

    const pubDate = post.publishedDate ? new Date(post.publishedDate).toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
    const cc = catColor(post.category);

    const blogPostingSchema = {
        '@context': 'https://schema.org', '@type': 'BlogPosting',
        headline: post.title, description: post.metaDescription,
        datePublished: post.publishedDate, dateModified: post.lastModified || post.publishedDate,
        inLanguage: 'bn',
        author: { '@type': 'Person', name: 'অ্যাডভোকেট মো. শাহ আলম', alternateName: 'Advocate Md. Shah Alam', jobTitle: 'Advocate – Supreme Court of Bangladesh', url: 'https://www.advmdshahalam.me/advocate-md-shah-alam', sameAs: ['https://www.facebook.com/advmd.shahalamfb'] },
        publisher: { '@type': 'Organization', name: 'Advocate Md. Shah Alam Law Chambers', url: 'https://www.advmdshahalam.me', logo: { '@type': 'ImageObject', url: 'https://www.advmdshahalam.me/images/hero/hero-md-shah-alam.png' } },
        url: `https://www.advmdshahalam.me/bn/blog/${post.slug}`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.advmdshahalam.me/bn/blog/${post.slug}` },
        image: 'https://www.advmdshahalam.me/images/hero/hero-md-shah-alam.png',
        keywords: post.keywords.join(', '),
    };
    const breadcrumbSchema = {
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'হোম', item: 'https://www.advmdshahalam.me/' },
            { '@type': 'ListItem', position: 2, name: 'বাংলা ব্লগ', item: 'https://www.advmdshahalam.me/bn/blog' },
            { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.advmdshahalam.me/bn/blog/${post.slug}` },
        ],
    };
    const faqSchema = post.faqs?.length ? {
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: post.faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
    } : null;

    return (
        <>
            <Helmet>
                <html lang="bn" />
                <link rel="stylesheet" href="https://fonts.maateen.me/solaiman-lipi/font.css" />
                <title>{post.metaTitle}</title>
                <meta name="description" content={post.metaDescription} />
                <meta name="keywords" content={post.keywords.join(', ')} />
                <link rel="canonical" href={`https://www.advmdshahalam.me/bn/blog/${post.slug}`} />
                <meta name="robots" content="index, follow" />
                {post.enSlug && <link rel="alternate" hrefLang="en" href={`https://www.advmdshahalam.me/blog/${post.enSlug}`} />}
                <link rel="alternate" hrefLang="bn" href={`https://www.advmdshahalam.me/bn/blog/${post.slug}`} />
                <link rel="alternate" hrefLang="x-default" href={post.enSlug ? `https://www.advmdshahalam.me/blog/${post.enSlug}` : 'https://www.advmdshahalam.me/'} />
                <meta property="og:title" content={post.metaTitle} />
                <meta property="og:description" content={post.metaDescription} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://www.advmdshahalam.me/bn/blog/${post.slug}`} />
                <meta property="og:image" content="https://www.advmdshahalam.me/images/hero/hero-md-shah-alam.png" />
                <meta property="og:site_name" content="Advocate Md. Shah Alam" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={post.metaTitle} />
                <meta name="twitter:description" content={post.metaDescription} />
                <meta name="twitter:image" content="https://www.advmdshahalam.me/images/hero/hero-md-shah-alam.png" />
                <meta name="author" content="অ্যাডভোকেট মো. শাহ আলম" />
                <meta property="article:published_time" content={post.publishedDate} />
                <meta property="article:modified_time" content={post.lastModified || post.publishedDate} />
                <meta property="article:section" content={post.category} />
                <meta property="article:tag" content={post.keywords.slice(0, 5).join(', ')} />
                <script type="application/ld+json">{JSON.stringify(blogPostingSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
                {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
            </Helmet>

            {/* ════ HERO ════ */}
            <section style={{ background: 'var(--hero-bg)', paddingTop: '6.5rem', paddingBottom: '3.5rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${cc.bg}, var(--gold), ${cc.bg})` }} />
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 30% 50%, rgba(198,167,94,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />

                <div className="bpbn-hero-container">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.625rem' }}>
                        <Link to="/bn/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', fontWeight: 500, color: 'var(--hero-text-2)', opacity: 0.75, textDecoration: 'none' }}
                            onMouseEnter={e => e.currentTarget.style.opacity = '1'} onMouseLeave={e => e.currentTarget.style.opacity = '0.75'}>
                            <ArrowLeft size={14} /> ব্লগে ফিরুন
                        </Link>
                        {post.enSlug && (
                            <Link to={`/blog/${post.enSlug}`}
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.7rem', fontWeight: 700, padding: '0.3rem 0.875rem', borderRadius: '9999px', border: '1.5px solid var(--accent)', color: 'var(--accent)', background: 'rgba(198,167,94,0.07)', textDecoration: 'none' }}>
                                🇬🇧 Read in English
                            </Link>
                        )}
                    </div>

                    <nav aria-label="Breadcrumb" style={{ marginBottom: '1rem' }}>
                        <ol style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', listStyle: 'none', padding: 0, margin: 0, fontSize: '0.75rem', flexWrap: 'wrap' }}>
                            <li><Link to="/" style={{ color: 'var(--hero-text-2)', textDecoration: 'none', opacity: 0.7 }}>হোম</Link></li>
                            <li style={{ opacity: 0.3 }}>/</li>
                            <li><Link to="/bn/blog" style={{ color: 'var(--hero-text-2)', textDecoration: 'none', opacity: 0.7 }}>ব্লগ</Link></li>
                            <li style={{ opacity: 0.3 }}>/</li>
                            <li style={{ color: 'var(--gold)', fontWeight: 600 }}>{post.category}</li>
                        </ol>
                    </nav>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 800, padding: '0.3rem 0.875rem', borderRadius: '9999px', background: cc.bg, color: cc.text, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
                            {post.category}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--hero-muted)', padding: '0.3rem 0.75rem', borderRadius: '9999px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                            <Clock size={12} /> {post.readTime}
                        </span>
                    </div>

                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.875rem, 4vw, 3.5rem)', fontWeight: 800, lineHeight: 1.18, color: 'var(--hero-text)', marginBottom: '1.375rem', letterSpacing: '-0.025em', maxWidth: '900px' }}>
                        {post.title}
                    </h1>

                    <p style={{ fontSize: '1.0625rem', lineHeight: 1.8, color: 'var(--hero-text-2)', maxWidth: '680px', marginBottom: '2rem', opacity: 0.88 }}>
                        {post.heroIntro}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', flexWrap: 'wrap', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                        <div style={{ width: '2.375rem', height: '2.375rem', borderRadius: '50%', background: `linear-gradient(135deg, ${cc.bg}, var(--gold))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, color: '#fff', flexShrink: 0 }}>SA</div>
                        <div>
                            <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--hero-text)', margin: 0 }}>অ্যাডভোকেট মো. শাহ আলম</p>
                            <p style={{ fontSize: '0.7rem', color: 'var(--hero-muted)', margin: 0 }}>বাংলাদেশ সুপ্রিম কোর্ট</p>
                        </div>
                        {pubDate && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--hero-muted)', marginLeft: 'auto' }}>
                                <Calendar size={12} /> {pubDate}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ════ BODY ════ */}
            <div style={{ background: 'var(--bg)' }}>
                <div className="bpbn-body-container">

                    {/* Mobile TOC */}
                    <div className="bpbn-mobile-toc" style={{ marginBottom: '1.25rem' }}>
                        <button onClick={() => setTocOpen(o => !o)}
                            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 1.125rem', borderRadius: '0.875rem', cursor: 'pointer', background: 'var(--surface)', border: '1px solid var(--card-border)', color: 'var(--text)', fontWeight: 600, fontSize: '0.875rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <List size={14} style={{ color: 'var(--accent)' }} /> বিষয়সূচি
                            </span>
                            {tocOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                        </button>
                        {tocOpen && (
                            <div style={{ marginTop: '0.375rem', padding: '1rem 1.125rem', borderRadius: '0.875rem', background: 'var(--surface)', border: '1px solid var(--card-border)' }}>
                                <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                    {post.toc?.map((h, i) => (
                                        <li key={i}>
                                            <a href={`#bnsec-${i}`} onClick={() => setTocOpen(false)}
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

                    {/* 2-col grid */}
                    <div className="bpbn-main-grid">

                        {/* ── ARTICLE ── */}
                        <div style={{ minWidth: 0 }}>

                            {/* Inline TOC — tablet only */}
                            <div className="bpbn-toc-inline">
                                <div style={{ padding: '1.125rem 1.375rem', borderRadius: '1rem', background: 'var(--surface)', border: '1px solid var(--card-border)', marginBottom: '2rem' }}>
                                    <p style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--accent)', margin: 0, paddingBottom: '0.625rem', borderBottom: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                                        <List size={12} /> বিষয়সূচি
                                    </p>
                                    <ol style={{ margin: '0.75rem 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
                                        {post.toc?.map((h, i) => (
                                            <li key={i}>
                                                <a href={`#bnsec-${i}`} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', padding: '0.375rem 0.5rem', borderRadius: '0.5rem', fontSize: '0.8125rem', lineHeight: 1.4, textDecoration: 'none', color: i === activeSection ? 'var(--accent)' : 'var(--text-muted)', fontWeight: i === activeSection ? 600 : 400, background: i === activeSection ? 'rgba(198,167,94,0.07)' : 'transparent', borderLeft: i === activeSection ? '2px solid var(--accent)' : '2px solid transparent', transition: 'all 0.15s' }}>
                                                    <span style={{ fontSize: '0.65rem', fontFamily: 'monospace', opacity: 0.4, marginTop: '2px', flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
                                                    {h}
                                                </a>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>

                            <article>
                                <Disclaimer lang="bn" />

                                {/* Quick Answer */}
                                {post.quickAnswer && (
                                    <div style={{ marginBottom: '2.5rem', padding: '1.375rem 1.5rem', borderRadius: '1rem', background: 'linear-gradient(135deg, rgba(198,167,94,0.07), rgba(198,167,94,0.02))', border: '1.5px solid rgba(198,167,94,0.22)' }}>
                                        <p style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--gold)', marginBottom: '0.875rem' }}>{post.quickAnswer.heading}</p>
                                        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                            {post.quickAnswer.points.map((pt, i) => (
                                                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                                    <span style={{ flexShrink: 0, width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent)', marginTop: '9px' }} />
                                                    {pt}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Sections */}
                                {post.sections?.map((sec, i) => (
                                    <section key={i} id={`bnsec-${i}`} style={{ marginBottom: '3rem', scrollMarginTop: '5rem' }}>
                                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', fontWeight: 700, lineHeight: 1.3, color: 'var(--text)', marginBottom: '1.125rem', paddingLeft: '0.875rem', borderLeft: `3px solid ${cc.bg}` }}>
                                            {sec.h2}
                                        </h2>
                                        <div className="prose-bn-content"
                                            style={{ color: 'var(--text-secondary)', fontSize: '1.0625rem', lineHeight: '1.9', letterSpacing: '0.008em', wordBreak: 'break-word', overflowWrap: 'anywhere' }}
                                            dangerouslySetInnerHTML={{ __html: sec.content }}
                                        />
                                    </section>
                                ))}

                                {/* Related Services */}
                                {post.relatedServiceLinks?.length > 0 && (
                                    <div style={{ margin: '2rem 0', padding: '1.25rem 1.5rem', borderRadius: '1rem', background: 'var(--surface)', border: '1px solid var(--card-border)' }}>
                                        <h2 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text)', marginBottom: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                            🔗 সংশ্লিষ্ট আইনি সেবা
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
                                            সাধারণ জিজ্ঞাসা (FAQ)
                                        </h2>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                                            {post.faqs.map((faq, i) => <FAQItem key={i} index={i} question={faq.question} answer={faq.answer} />)}
                                        </div>
                                    </div>
                                )}

                                {/* CTA Form */}
                                <div style={{ borderRadius: '1.375rem', overflow: 'hidden', background: 'linear-gradient(135deg, var(--hero-bg) 0%, var(--hero-surface, #1c1c35) 100%)', border: '1px solid rgba(198,167,94,0.18)', marginBottom: '3rem' }}>
                                    <div style={{ background: `linear-gradient(90deg, ${cc.bg}, var(--gold))`, padding: '0.625rem 1.5rem' }}>
                                        <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>⚖️ সরাসরি আইনি পরামর্শ</p>
                                    </div>
                                    <div style={{ padding: '2rem' }}>
                                        {cSubmitted ? (
                                            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                                                <div style={{ display: 'inline-flex', width: '3rem', height: '3rem', borderRadius: '50%', background: 'rgba(34,197,94,0.15)', color: '#22c55e', alignItems: 'center', justifyContent: 'center', marginBottom: '0.875rem' }}>
                                                    <MessageCircle size={24} />
                                                </div>
                                                <h3 style={{ fontWeight: 700, color: 'var(--hero-text)', marginBottom: '0.375rem' }}>হোয়াটসঅ্যাপ খুলছে...</h3>
                                                <p style={{ fontSize: '0.875rem', color: 'var(--hero-text-2)' }}>অ্যাডভোকেট শাহ আলমের চ্যাট ওপেন হচ্ছে।</p>
                                            </div>
                                        ) : (
                                            <form onSubmit={handleConsultSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.875rem' }}>
                                                    <div>
                                                        <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--hero-text-2)', marginBottom: '0.375rem' }}>আপনার নাম</label>
                                                        <input type="text" required value={cName} onChange={e => setCName(e.target.value)} placeholder="পূর্ণ নাম লিখুন"
                                                            style={{ width: '100%', padding: '0.8rem 0.875rem', borderRadius: '0.625rem', fontSize: '0.875rem', outline: 'none', background: 'var(--input-bg)', border: '1.5px solid var(--input-border)', color: 'var(--text)', boxSizing: 'border-box' }}
                                                            onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--input-border)'} />
                                                    </div>
                                                    <div>
                                                        <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--hero-text-2)', marginBottom: '0.375rem' }}>মোবাইল নম্বর</label>
                                                        <input type="tel" required value={cPhone} onChange={e => setCPhone(e.target.value)} placeholder="মোবাইল নম্বর"
                                                            style={{ width: '100%', padding: '0.8rem 0.875rem', borderRadius: '0.625rem', fontSize: '0.875rem', outline: 'none', background: 'var(--input-bg)', border: '1.5px solid var(--input-border)', color: 'var(--text)', boxSizing: 'border-box' }}
                                                            onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--input-border)'} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--hero-text-2)', marginBottom: '0.375rem' }}>আইনি সমস্যার সংক্ষিপ্ত বিবরণ</label>
                                                    <textarea rows="3" required value={cMessage} onChange={e => setCMessage(e.target.value)} placeholder="জমি সংক্রান্ত বিরোধ, তালাক, জামিন ইত্যাদি..."
                                                        style={{ width: '100%', padding: '0.8rem 0.875rem', borderRadius: '0.625rem', fontSize: '0.875rem', outline: 'none', resize: 'none', background: 'var(--input-bg)', border: '1.5px solid var(--input-border)', color: 'var(--text)', boxSizing: 'border-box' }}
                                                        onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--input-border)'} />
                                                </div>
                                                <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap' }}>
                                                    <button type="submit" className="btn-whatsapp"
                                                        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.875rem', borderRadius: '0.75rem', fontWeight: 700, fontSize: '0.875rem' }}>
                                                        <MessageCircle size={15} /> হোয়াটসঅ্যাপে পরামর্শ
                                                    </button>
                                                    <a href={telLink()}
                                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem', padding: '0.875rem 1.25rem', borderRadius: '0.75rem', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', color: 'var(--hero-text-2)', border: '1px solid rgba(255,255,255,0.15)' }}>
                                                        <Phone size={14} /> কল করুন
                                                    </a>
                                                </div>
                                            </form>
                                        )}
                                    </div>
                                </div>
                            </article>
                        </div>

                        {/* ── RIGHT SIDEBAR ── */}
                        <aside className="bpbn-sidebar">
                            <div style={{ position: 'sticky', top: '5rem' }}>
                                <ConsultBnWidget postTitle={post.title} />
                                <PopularBnPosts currentSlug={post.slug} />
                                <RecentBnPosts currentSlug={post.slug} />
                                <RelatedBnByCategory category={post.category} currentSlug={post.slug} />
                            </div>
                        </aside>
                    </div>

                    {/* Mobile bottom related */}
                    <div className="bpbn-mobile-bottom">
                        <div style={{ borderTop: '2px solid var(--accent)', paddingTop: '2rem', marginTop: '1rem' }}>
                            <p style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                                <Flame size={14} style={{ color: 'var(--accent)' }} /> আরও নিবন্ধ
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '0.875rem' }}>
                                {allBnPosts.filter(p => p.slug !== post.slug).slice(0, 4).map(rp => {
                                    const rc = catColor(rp.category);
                                    return (
                                        <Link key={rp.slug} to={`/bn/blog/${rp.slug}`}
                                            style={{ display: 'block', borderRadius: '0.875rem', overflow: 'hidden', textDecoration: 'none', background: 'var(--card-bg)', border: '1px solid var(--card-border)', transition: 'transform 0.2s, border-color 0.2s' }}
                                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = rc.bg; }}
                                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--card-border)'; }}>
                                            <div style={{ height: '4px', background: rc.bg }} />
                                            <div style={{ padding: '0.875rem' }}>
                                                <span style={{ fontSize: '0.65rem', fontWeight: 800, color: rc.bg, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '0.375rem' }}>{rp.category}</span>
                                                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1.4, margin: 0, marginBottom: '0.5rem', wordBreak: 'break-word' }}>{rp.title}</p>
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
                .bpbn-hero-container {
                    max-width: 1600px;
                    margin: 0 auto;
                    padding: 0 2.5rem;
                    position: relative;
                    z-index: 1;
                }
                .bpbn-body-container {
                    max-width: 1600px;
                    margin: 0 auto;
                    padding: 2rem 2.5rem 5rem;
                }
                .bpbn-main-grid {
                    display: grid;
                    grid-template-columns: 1fr 320px;
                    gap: 3rem;
                    align-items: start;
                }
                .bpbn-sidebar { display: block; }
                .bpbn-toc-inline { display: none; }
                .bpbn-mobile-toc { display: none; }
                .bpbn-mobile-bottom { display: none; }

                @media (max-width: 1200px) {
                    .bpbn-body-container, .bpbn-hero-container { padding-left: 1.5rem; padding-right: 1.5rem; }
                    .bpbn-main-grid { grid-template-columns: 1fr 300px; gap: 2rem; }
                }
                @media (max-width: 900px) {
                    .bpbn-main-grid { grid-template-columns: 1fr; }
                    .bpbn-sidebar { display: none; }
                    .bpbn-toc-inline { display: block; }
                    .bpbn-mobile-bottom { display: block; }
                }
                @media (max-width: 640px) {
                    .bpbn-toc-inline { display: none; }
                    .bpbn-mobile-toc { display: block; }
                    .bpbn-body-container, .bpbn-hero-container { padding-left: 1rem; padding-right: 1rem; }
                }
                .prose-bn-content p { margin-bottom: 1.4rem; max-width: 72ch; }
                .prose-bn-content ul, .prose-bn-content ol { padding-left: 1.75rem; margin-bottom: 1.4rem; max-width: 72ch; }
                .prose-bn-content li { margin-bottom: 0.6rem; line-height: 1.9; }
                .prose-bn-content strong { color: var(--text); font-weight: 700; }
                .prose-bn-content a { color: var(--accent); text-decoration: underline; text-decoration-color: rgba(198,167,94,0.35); text-underline-offset: 3px; }
                .prose-bn-content a:hover { text-decoration-color: var(--accent); }
                .prose-bn-content h3 { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 700; color: var(--text); margin: 2rem 0 0.875rem; }
                .prose-bn-content blockquote { border-left: 4px solid var(--accent); padding: 1rem 1.25rem; margin: 2rem 0; font-style: italic; color: var(--text-muted); background: var(--surface); border-radius: 0 0.75rem 0.75rem 0; }
                .prose-bn-content table { width: 100%; border-collapse: collapse; margin-bottom: 1.75rem; font-size: 0.9rem; }
                .prose-bn-content th, .prose-bn-content td { padding: 0.75rem 1rem; border: 1px solid var(--card-border); }
                .prose-bn-content th { background: var(--surface); font-weight: 700; color: var(--text); }
                .prose-bn-content ol { list-style: decimal; }
                .prose-bn-content ul { list-style: disc; }
                @media (min-width: 1400px) {
                    .prose-bn-content p, .prose-bn-content ul, .prose-bn-content ol { max-width: 80ch; }
                }
            `}</style>
        </>
    );
};

const BlogPostBn = () => (
    <BlogPostBnErrorBoundary>
        <BlogPostBnInner />
    </BlogPostBnErrorBoundary>
);

export default BlogPostBn;

