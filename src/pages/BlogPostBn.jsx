import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    ArrowLeft, Clock, ChevronDown, ChevronUp,
    Phone, MessageCircle, ExternalLink, BookOpen
} from 'lucide-react';
import { CALL_NUMBER, CALL_DISPLAY, WA_NUMBER, WA_DISPLAY, waLink, telLink } from '../data/contactInfo';
import Disclaimer from '../components/Disclaimer';

// Load all BN blog posts from JSON files (bundled at build time by Vite)
const _bnModules = import.meta.glob('../content/posts/bn/*.json', { eager: true });
const postsBn = Object.values(_bnModules).map((m) => m.default ?? m);

function isPublishedBn(post) {
  try {
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }));
    const pub = new Date(post.publishedDate + 'T00:00:00');
    return pub <= now && !post.isDraft;
  } catch { return true; }
}

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

const BlogPostBn = () => {
    const { slug } = useParams();
    const post = postsBn.find(p => p.slug === slug);
    const [cName, setCName] = useState('');
    const [cPhone, setCPhone] = useState('');
    const [cMessage, setCMessage] = useState('');
    const [cSubmitted, setCSubmitted] = useState(false);

    const handleConsultSubmit = (e) => {
        e.preventDefault();
        const text = `*📋 আইনি পরামর্শের অনুরোধ*\n\n*নিবন্ধ:* ${post.title}\n*নাম:* ${cName}\n*মোবাইল:* ${cPhone}\n*আইনি সমস্যা:* ${cMessage}`;
        window.open(waLink(text), '_blank');
        setCSubmitted(true);
        setTimeout(() => {
            setCSubmitted(false);
            setCName('');
            setCPhone('');
            setCMessage('');
        }, 5000);
    };

    if (!post) {
        return (
            <>
                <Helmet><title>পোস্ট পাওয়া যায়নি | অ্যাডভোকেট মো. শাহ আলম</title></Helmet>
                <section className="pt-28 pb-20" style={{ background: 'var(--bg)' }}>
                    <div className="container mx-auto px-6 max-w-2xl text-center">
                        <div className="glass-card inline-flex flex-col items-center gap-5 px-10 py-14">
                            <BookOpen size={44} style={{ color: 'var(--accent)' }} />
                            <h1 className="text-2xl font-serif font-bold" style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
                                নিবন্ধটি পাওয়া যায়নি
                            </h1>
                            <p className="text-sm max-w-sm" style={{ color: 'var(--text-muted)' }}>
                                আপনি যে নিবন্ধটি খুঁজছেন তা পাওয়া যায়নি।
                            </p>
                            <Link to="/bn/blog" className="btn-primary text-sm">← ব্লগে ফিরুন</Link>
                        </div>
                    </div>
                </section>
            </>
        );
    }

    /* ── Coming Soon (future-dated post) ── */
    if (!isPublishedBn(post)) {
        return (
            <>
                <Helmet>
                    <html lang="bn" />
                    <title>আসছে শীঘ্রই | অ্যাডভোকেট মো. শাহ আলম</title>
                    <meta name="robots" content="noindex, nofollow" />
                </Helmet>
                <section className="pt-28 pb-20" style={{ background: 'var(--bg)' }}>
                    <div className="container mx-auto px-6 max-w-2xl text-center">
                        <div className="glass-card inline-flex flex-col items-center gap-5 px-10 py-14">
                            <Clock size={44} style={{ color: 'var(--accent)' }} />
                            <h1 className="text-2xl font-serif font-bold" style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
                                নিবন্ধটি শীঘ্রই আসছে
                            </h1>
                            <p className="text-sm max-w-sm" style={{ color: 'var(--text-muted)' }}>
                                এই নিবন্ধটি ভবিষ্যতে প্রকাশিত হবে। শীঘ্রই ফিরে আসুন।
                            </p>
                            <Link to="/bn/blog" className="btn-primary text-sm">← ব্লগে ফিরুন</Link>
                        </div>
                    </div>
                </section>
            </>
        );
    }

    const related = postsBn
        .filter(p => p.category === post.category && p.slug !== post.slug)
        .slice(0, 3);

    const blogPostingSchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.metaDescription,
        datePublished: post.publishedDate,
        dateModified: post.lastModified || post.publishedDate,
        inLanguage: 'bn',
        author: {
            '@type': 'Person',
            name: 'অ্যাডভোকেট মো. শাহ আলম',
            alternateName: 'Advocate Md. Shah Alam',
            jobTitle: 'Advocate – Supreme Court of Bangladesh',
            url: 'https://www.advmdshahalam.me/advocate-md-shah-alam',
            sameAs: ['https://www.facebook.com/advmd.shahalamfb'],
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
        url: `https://www.advmdshahalam.me/bn/blog/${post.slug}`,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://www.advmdshahalam.me/bn/blog/${post.slug}`,
        },
        image: 'https://www.advmdshahalam.me/images/hero/hero-md-shah-alam.png',
        keywords: post.keywords.join(', '),
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'হোম', item: 'https://www.advmdshahalam.me/' },
            { '@type': 'ListItem', position: 2, name: 'বাংলা ব্লগ', item: 'https://www.advmdshahalam.me/bn/blog' },
            { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.advmdshahalam.me/bn/blog/${post.slug}` },
        ],
    };

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
    };

    return (
        <>
            <Helmet>
                <html lang="bn" />
                <title>{post.metaTitle}</title>
                <meta name="description" content={post.metaDescription} />
                <meta name="keywords" content={post.keywords.join(', ')} />
                <link rel="canonical" href={`https://www.advmdshahalam.me/bn/blog/${post.slug}`} />
                <meta name="robots" content="index, follow" />
                {post.enSlug && (
                    <link rel="alternate" hrefLang="en" href={`https://www.advmdshahalam.me/blog/${post.enSlug}`} />
                )}
                <link rel="alternate" hrefLang="bn" href={`https://www.advmdshahalam.me/bn/blog/${post.slug}`} />
                {/* x-default points to EN version if available, else homepage — tells Google which is the authoritative default */}
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
                {/* Article OG — content freshness signals */}
                <meta property="article:published_time" content={post.publishedDate} />
                <meta property="article:modified_time" content={post.lastModified || post.publishedDate} />
                <meta property="article:section" content={post.category} />
                <meta property="article:tag" content={post.keywords.slice(0, 5).join(', ')} />
                <script type="application/ld+json">{JSON.stringify(blogPostingSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
            </Helmet>

            {/* Hero */}
            <section className="pt-28 pb-14 relative overflow-hidden" style={{ background: 'var(--hero-bg)' }}>
                <div className="container mx-auto px-6 max-w-4xl relative z-10">
                    <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                        <Link
                            to="/bn/blog"
                            className="inline-flex items-center gap-2 text-sm font-medium opacity-70 hover:opacity-100 transition-opacity"
                            style={{ color: 'var(--hero-text-2)' }}
                        >
                            <ArrowLeft size={15} /> ব্লগে ফিরুন
                        </Link>
                        {post.enSlug && (
                            <Link
                                to={`/blog/${post.enSlug}`}
                                className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all hover:opacity-80"
                                style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}
                            >
                                🇬🇧 Read in English
                            </Link>
                        )}
                    </div>
                    {/* Visual Breadcrumb — Google extracts visible breadcrumbs for SERP */}
                    <nav className="mb-5 text-xs" aria-label="Breadcrumb">
                        <ol className="flex items-center gap-1.5 flex-wrap" style={{ color: 'var(--hero-muted)' }}>
                            <li><Link to="/" className="hover:underline" style={{ color: 'var(--hero-text-2)' }}>হোম</Link></li>
                            <li aria-hidden="true">/</li>
                            <li><Link to="/bn/blog" className="hover:underline" style={{ color: 'var(--hero-text-2)' }}>ব্লগ</Link></li>
                            <li aria-hidden="true">/</li>
                            <li style={{ color: 'var(--gold)' }}>{post.category}</li>
                        </ol>
                    </nav>
                    <div className="flex items-center gap-3 mb-5">
                        <span
                            className="text-xs font-bold px-3 py-1 rounded-full"
                            style={{ background: 'rgba(198,167,94,0.15)', color: 'var(--gold)', letterSpacing: '0.06em' }}
                        >
                            {post.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--hero-muted)' }}>
                            <Clock size={12} /> {post.readTime}
                        </span>
                    </div>
                    <h1
                        className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight mb-5"
                        style={{ color: 'var(--hero-text)', fontFamily: "'Playfair Display', serif" }}
                    >
                        {post.title}
                    </h1>
                    <p className="text-lg leading-relaxed" style={{ color: 'var(--hero-text-2)', maxWidth: '680px' }}>
                        {post.heroIntro}
                    </p>
                </div>
            </section>

            {/* Body */}
            <section className="py-14" style={{ background: 'var(--bg)' }}>
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">

                        {/* Main content */}
                        <div>
                            {/* Bengali Legal Disclaimer — required for AdSense on legal content */}
                            <Disclaimer lang="bn" />

                            {/* TOC */}
                            {post.toc && post.toc.length > 0 && (
                                <nav
                                    className="glass-card p-6 mb-10"
                                    style={{ borderRadius: '1rem' }}
                                    aria-label="বিষয়বস্তু"
                                >
                                    <p className="text-xs font-bold uppercase mb-3" style={{ color: 'var(--accent)', letterSpacing: '0.1em' }}>
                                        বিষয়সূচি
                                    </p>
                                    <ol className="space-y-2">
                                        {post.toc.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                                                <span className="font-bold mt-0.5" style={{ color: 'var(--accent)', minWidth: '1.2rem' }}>{i + 1}.</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ol>
                                </nav>
                            )}

                            {/* Sections */}
                            {post.sections && post.sections.map((sec, i) => (
                                <div key={i} className="mb-10">
                                    <h2
                                        className="text-xl md:text-2xl font-serif font-bold mb-4"
                                        style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}
                                    >
                                        {sec.h2}
                                    </h2>
                                    <div
                                        className="prose-bn text-base"
                                        style={{ color: 'var(--text-secondary)', lineHeight: '1.8', wordBreak: 'break-word', overflowWrap: 'anywhere' }}
                                        dangerouslySetInnerHTML={{ __html: sec.content }}
                                    />
                                </div>
                            ))}

                            {/* FAQ */}
                            {post.faqs && post.faqs.length > 0 && (
                                <div className="mt-12">
                                    <h2
                                        className="text-2xl font-serif font-bold mb-6"
                                        style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}
                                    >
                                        সাধারণ জিজ্ঞাসা (FAQ)
                                    </h2>
                                    <div className="space-y-3">
                                        {post.faqs.map((faq, i) => (
                                            <FAQItem key={i} question={faq.question} answer={faq.answer} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* CTA Form */}
                            <div
                                className="rounded-2xl p-6 md:p-8 mt-12"
                                style={{ background: 'linear-gradient(135deg, var(--hero-bg) 0%, var(--hero-surface) 100%)', border: '1px solid var(--hero-border)' }}
                            >
                                <div className="text-center mb-6">
                                    <h2
                                        className="text-xl md:text-2xl font-serif font-bold mb-2"
                                        style={{ color: 'var(--hero-text)', fontFamily: "'Playfair Display', serif" }}
                                    >
                                        সরাসরি আইনি পরামর্শ
                                    </h2>
                                    <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--hero-text-2)' }}>
                                        নিচের ফর্মটি পূরণ করে সরাসরি হোয়াটসঅ্যাপের মাধ্যমে অ্যাডভোকেট মো. শাহ আলমের সাথে যোগাযোগ করুন।
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
                                        <h3 className="font-bold text-base mb-1" style={{ color: 'var(--hero-text)' }}>হোয়াটসঅ্যাপে যুক্ত করা হচ্ছে...</h3>
                                        <p className="text-xs" style={{ color: 'var(--hero-text-2)' }}>
                                            অ্যাডভোকেট মো. শাহ আলমের অফিসিয়াল হোয়াটসঅ্যাপ চ্যাট ওপেন হচ্ছে।
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleConsultSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-bold uppercase tracking-wider block mb-1.5" style={{ color: 'var(--hero-text-2)' }}>
                                                    আপনার নাম
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={cName}
                                                    onChange={e => setCName(e.target.value)}
                                                    placeholder="পূর্ণ নাম লিখুন"
                                                    className="w-full px-4 py-3 rounded-xl text-xs outline-none transition-all duration-200"
                                                    style={{ background: 'var(--input-bg)', border: '1.5px solid var(--input-border)', color: 'var(--text)' }}
                                                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                                                    onBlur={e => e.target.style.borderColor = 'var(--input-border)'}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold uppercase tracking-wider block mb-1.5" style={{ color: 'var(--hero-text-2)' }}>
                                                    মোবাইল নম্বর
                                                </label>
                                                <input
                                                    type="tel"
                                                    required
                                                    value={cPhone}
                                                    onChange={e => setCPhone(e.target.value)}
                                                    placeholder="মোবাইল নম্বর"
                                                    className="w-full px-4 py-3 rounded-xl text-xs outline-none transition-all duration-200"
                                                    style={{ background: 'var(--input-bg)', border: '1.5px solid var(--input-border)', color: 'var(--text)' }}
                                                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                                                    onBlur={e => e.target.style.borderColor = 'var(--input-border)'}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold uppercase tracking-wider block mb-1.5" style={{ color: 'var(--hero-text-2)' }}>
                                                আইনি সমস্যার সংক্ষিপ্ত বিবরণ
                                            </label>
                                            <textarea
                                                rows="3"
                                                required
                                                value={cMessage}
                                                onChange={e => setCMessage(e.target.value)}
                                                placeholder="আপনার আইনি সমস্যাটি সংক্ষেপে লিখুন (যেমন: জমি সংক্রান্ত বিরোধ, পারিবারিক সমস্যা, জামিনের আবেদন ইত্যাদি)"
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
                                                <MessageCircle size={15} /> হোয়াটসঅ্যাপে পরামর্শ শুরু করুন
                                            </button>
                                            <a
                                                href={telLink()}
                                                className="btn-secondary flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-xs hover:scale-[1.01] transition-transform"
                                                style={{ borderColor: 'var(--hero-border)', color: 'var(--hero-text-2)' }}
                                            >
                                                <Phone size={14} /> সরাসরি কল করুন
                                            </a>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="space-y-6 lg:w-72 shrink-0">
                            <div className="lg:sticky lg:top-28">
                                {/* CTA */}
                                <div
                                    className="glass-card p-6 text-center"
                                    style={{ borderRadius: '1rem', borderTop: '3px solid var(--accent)' }}
                                >
                                    <p className="text-sm font-semibold mb-4" style={{ color: 'var(--text)' }}>
                                        বিনামূল্যে আইনি পরামর্শ নিন
                                    </p>
                                    <a
                                        href={telLink()}
                                        className="btn-primary w-full flex items-center justify-center gap-2 mb-3 text-sm"
                                    >
                                        <Phone size={15} /> এখনই ফোন করুন
                                    </a>
                                    <a
                                        href={waLink(`আসসালামু আলাইকুম, আমি আপনার "${post.title}" নিবন্ধটি পড়েছি এবং এই বিষয়ে আইনি পরামর্শ চাই।`)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-whatsapp w-full flex items-center justify-center gap-2 text-sm"
                                    >
                                        <MessageCircle size={15} /> WhatsApp
                                    </a>
                                </div>

                                {/* Related service links */}
                                {post.relatedServiceLinks && post.relatedServiceLinks.length > 0 && (
                                    <div
                                        className="glass-card p-6"
                                        style={{ borderRadius: '1rem' }}
                                    >
                                        <p className="text-xs font-bold uppercase mb-4" style={{ color: 'var(--accent)', letterSpacing: '0.1em' }}>
                                            সেবা সমূহ
                                        </p>
                                        <div className="space-y-2">
                                            {post.relatedServiceLinks.map((link, i) => (
                                                <Link
                                                    key={i}
                                                    to={link.to}
                                                    className="flex items-center gap-2 text-sm py-2 px-3 rounded-lg transition-all hover:bg-opacity-80"
                                                    style={{
                                                        color: 'var(--text-secondary)',
                                                        background: 'var(--surface)',
                                                        borderRadius: '0.5rem',
                                                    }}
                                                >
                                                    <ExternalLink size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                                                    {link.text}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Related posts */}
                                {related.length > 0 && (
                                    <div className="glass-card p-6" style={{ borderRadius: '1rem' }}>
                                        <p className="text-xs font-bold uppercase mb-4" style={{ color: 'var(--accent)', letterSpacing: '0.1em' }}>
                                            সম্পর্কিত নিবন্ধ
                                        </p>
                                        <div className="space-y-3">
                                            {related.map(r => (
                                                <Link
                                                    key={r.slug}
                                                    to={`/bn/blog/${r.slug}`}
                                                    className="block text-sm font-medium hover:opacity-80 transition-opacity"
                                                    style={{ color: 'var(--text-secondary)' }}
                                                >
                                                    → {r.title}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BlogPostBn;
