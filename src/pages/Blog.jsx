import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, Clock, ChevronRight, BookOpen, Flame, Award, ShieldCheck, UserCheck, Scale, ArrowUpRight, X } from 'lucide-react';
import seo from '../content/seo.js';

// Load all EN blog posts from JSON files (bundled at build time by Vite)
const _postModules = import.meta.glob('../content/posts/en/*.json', { eager: true });
const blogPosts = Object.values(_postModules)
    .map((m) => m.default ?? m)
    .filter((p) => p && p.slug && p.title);

function isPublished(post) {
  try {
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }));
    const pub = new Date(post.publishedDate + 'T00:00:00');
    return pub <= now && !post.isDraft;
  } catch { return true; }
}

function stripHtml(html) {
  if (!html) return '';
  return String(html).replace(/<[^>]*>?/gm, '').trim();
}

const CATEGORIES = seo.categoriesEn;
const categoryColors = seo.categoryColors;

const getCatColor = (cat) => categoryColors[cat] || 'var(--accent)';

/* ─── Premium Glassmorphic Blog Card ─── */
const BlogCardEn = ({ post }) => {
    const catColor = getCatColor(post.category);
    return (
        <article
            className="group relative flex flex-col h-full overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
            style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid var(--card-border)',
                borderRadius: '1.25rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            }}
        >
            {/* Top Color Accent Line */}
            <div style={{ height: '3px', background: `linear-gradient(90deg, ${catColor}, var(--accent))` }} />

            <div className="p-6 flex flex-col flex-1">
                {/* Header Meta: Category Badge & Read Time */}
                <div className="flex items-center justify-between mb-3.5 gap-2 flex-wrap">
                    <span
                        className="text-xs font-bold px-3 py-1 rounded-md transition-transform group-hover:scale-105"
                        style={{
                            background: catColor + '18',
                            color: catColor,
                            letterSpacing: '0.04em',
                        }}
                    >
                        {post.category}
                    </span>
                    <span
                        className="inline-flex items-center gap-1 text-xs"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        <Clock size={13} style={{ color: catColor }} />
                        {post.readTime}
                    </span>
                </div>

                {/* Post Title */}
                <h2
                    className="text-lg md:text-xl font-bold leading-snug mb-3 group-hover:text-[var(--accent)] transition-colors"
                    style={{
                        color: 'var(--text)',
                        fontFamily: "'Playfair Display', serif",
                        lineHeight: 1.35
                    }}
                >
                    <Link to={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                    </Link>
                </h2>

                {/* Excerpt */}
                <p
                    className="text-sm leading-relaxed line-clamp-3 mb-4 flex-1"
                    style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.925rem',
                        lineHeight: 1.7
                    }}
                >
                    {stripHtml(post.heroIntro)}
                </p>

                {/* Author & Read Action Footer */}
                <div className="pt-4 border-t flex items-center justify-between mt-auto" style={{ borderColor: 'var(--card-border)' }}>
                    <div className="flex items-center gap-2">
                        <img
                            src="/images/hero/hero-md-shah-alam.webp"
                            alt="Advocate Md. Shah Alam"
                            className="w-7 h-7 rounded-full object-cover border border-[var(--gold)] flex-shrink-0 shadow-sm"
                            loading="lazy"
                            width="28"
                            height="28"
                        />
                        <span className="text-xs font-semibold" style={{ color: 'var(--text)' }}>
                            Adv. Md. Shah Alam
                        </span>
                    </div>

                    <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg transition-all group-hover:bg-[var(--accent)] group-hover:text-white"
                        style={{
                            background: 'var(--accent-subtle)',
                            color: 'var(--accent)',
                        }}
                        aria-label={`Read: ${post.title}`}
                    >
                        Read <ArrowUpRight size={14} />
                    </Link>
                </div>
            </div>
        </article>
    );
};

const Blog = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const publishedPosts = useMemo(() => blogPosts.filter(isPublished), []);

    // Dynamic Spotlight Featured Post
    const featuredPost = useMemo(() => {
        if (!publishedPosts.length) return null;
        const explicitFeatured = publishedPosts.find(p => p.featured === true);
        if (explicitFeatured) return explicitFeatured;
        return [...publishedPosts].sort((a, b) => new Date(b.publishedDate || 0) - new Date(a.publishedDate || 0))[0];
    }, [publishedPosts]);

    const categoryCounts = useMemo(() => {
        const counts = { All: publishedPosts.length };
        publishedPosts.forEach(p => {
            counts[p.category] = (counts[p.category] || 0) + 1;
        });
        return counts;
    }, [publishedPosts]);

    const filtered = useMemo(() => {
        let posts = [...publishedPosts];
        if (activeCategory !== 'All') {
            posts = posts.filter(p => p.category === activeCategory);
        }
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim();
            posts = posts.filter(p =>
                p.title.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q) ||
                (p.heroIntro && p.heroIntro.toLowerCase().includes(q)) ||
                (p.keywords && p.keywords.some(k => String(k).toLowerCase().includes(q)))
            );
        }
        return posts;
    }, [publishedPosts, activeCategory, searchQuery]);

    return (
        <>
            <Helmet>
                <title>Legal Guides &amp; Articles | Advocate Md. Shah Alam – Supreme Court Lawyer</title>
                <meta
                    name="description"
                    content="Comprehensive, plain-language legal guides on Bangladesh law — criminal defence, bail, divorce, land disputes, tax & corporate law by Advocate Md. Shah Alam."
                />
                <link rel="canonical" href="https://www.advmdshahalam.me/blog" />
                <meta name="robots" content="index, follow" />
                <link rel="alternate" hrefLang="en" href="https://www.advmdshahalam.me/blog" />
                <link rel="alternate" hrefLang="bn" href="https://www.advmdshahalam.me/bn/blog" />
            </Helmet>

            {/* ════ HERO HEADER ════ */}
            <section className="pt-28 md:pt-32 pb-12 relative overflow-hidden" style={{ background: 'var(--bg)' }}>
                <div
                    className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-20"
                    style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
                />

                <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
                    <div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6 shadow-sm border"
                        style={{
                            background: 'var(--accent-subtle)',
                            color: 'var(--accent)',
                            borderColor: 'rgba(198,167,94,0.25)',
                        }}
                    >
                        <Scale size={15} style={{ color: 'var(--gold)' }} />
                        Supreme Court Advocate Legal Resource Center
                    </div>

                    <h1
                        className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight"
                        style={{
                            color: 'var(--text)',
                            fontFamily: "'Playfair Display', serif",
                            letterSpacing: '-0.02em'
                        }}
                    >
                        Bangladesh Legal Knowledge Hub
                    </h1>

                    <p
                        className="text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        Practical, plain-language legal guides on criminal, divorce, land, tax &amp; corporate law in Bangladesh.
                    </p>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap justify-center items-center gap-6 mb-10 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                        <span className="flex items-center gap-1.5">
                            <ShieldCheck size={16} className="text-emerald-500" /> 100% Law &amp; Precedent Verified
                        </span>
                        <span className="flex items-center gap-1.5">
                            <UserCheck size={16} className="text-amber-500" /> Supreme Court Advocate Author
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Award size={16} className="text-blue-500" /> Free Information Access
                        </span>
                    </div>

                    {/* Interactive Search Bar */}
                    <div className="relative max-w-2xl mx-auto mb-8 shadow-lg rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--card-border)', background: 'var(--surface)' }}>
                        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--accent)' }} />
                        <input
                            type="search"
                            placeholder="Search legal topic (e.g. bail, divorce, land mutation, cheque)..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-28 py-4 text-sm md:text-base outline-none transition-all"
                            style={{
                                background: 'transparent',
                                color: 'var(--text)',
                            }}
                        />

                        {/* Search Action / Result Pill */}
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                            {searchQuery.trim() ? (
                                <>
                                    <span
                                        className="text-xs px-3 py-1.5 rounded-lg font-bold"
                                        style={{
                                            background: 'var(--accent-subtle)',
                                            color: 'var(--accent)',
                                        }}
                                    >
                                        {filtered.length} results
                                    </span>
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="p-1.5 rounded-lg hover:bg-black/10 text-gray-400 hover:text-gray-600 transition-all"
                                        title="Clear search"
                                    >
                                        <X size={16} />
                                    </button>
                                </>
                            ) : (
                                <button
                                    className="text-xs px-4 py-2 rounded-lg font-bold text-white shadow-md transition-all hover:scale-105"
                                    style={{
                                        background: 'linear-gradient(135deg, var(--accent), #1e1b4b)',
                                    }}
                                >
                                    Search
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap justify-center gap-2.5">
                        {CATEGORIES.map(cat => {
                            const count = categoryCounts[cat] || 0;
                            const isActive = activeCategory === cat;
                            const color = getCatColor(cat);
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className="px-4 py-2 rounded-xl text-xs md:text-sm font-semibold border transition-all flex items-center gap-1.5"
                                    style={
                                        isActive
                                            ? {
                                                background: 'linear-gradient(135deg, #1A3FBF, #0B1220)',
                                                color: '#fff',
                                                borderColor: 'var(--accent)',
                                                boxShadow: '0 4px 14px rgba(26,63,191,0.3)',
                                            }
                                            : {
                                                background: 'var(--surface)',
                                                color: 'var(--text-secondary)',
                                                borderColor: 'var(--card-border)',
                                            }
                                    }
                                >
                                    <span>{cat}</span>
                                    <span
                                        className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                                        style={{
                                            background: isActive ? 'rgba(255,255,255,0.2)' : 'var(--accent-subtle)',
                                            color: isActive ? '#fff' : color
                                        }}
                                    >
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ════ SPOTLIGHT DYNAMIC FEATURED ARTICLE ════ */}
            {activeCategory === 'All' && !searchQuery.trim() && featuredPost && (
                <section className="py-6" style={{ background: 'var(--bg)' }}>
                    <div className="container mx-auto px-6 max-w-6xl">
                        <div
                            className="relative overflow-hidden p-6 md:p-8 rounded-3xl border transition-all duration-300 hover:shadow-2xl"
                            style={{
                                background: 'linear-gradient(135deg, rgba(26,63,191,0.06) 0%, rgba(198,167,94,0.05) 100%)',
                                borderColor: 'rgba(198,167,94,0.3)',
                                backdropFilter: 'blur(20px)'
                            }}
                        >
                            <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: 'linear-gradient(135deg, #f59e0b, #be185d)' }}>
                                            <Flame size={13} /> Featured Legal Guide
                                        </span>
                                        <span className="text-xs text-[var(--text-muted)]">
                                            {featuredPost.readTime}
                                        </span>
                                    </div>
                                    <h2
                                        className="text-2xl md:text-3xl font-serif font-bold mb-3 leading-snug"
                                        style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}
                                    >
                                        <Link to={`/blog/${featuredPost.slug}`} className="hover:text-[var(--accent)] transition-colors">
                                            {featuredPost.title}
                                        </Link>
                                    </h2>
                                    <p
                                        className="text-sm md:text-base leading-relaxed line-clamp-3 mb-6"
                                        style={{ color: 'var(--text-secondary)' }}
                                    >
                                        {stripHtml(featuredPost.heroIntro)}
                                    </p>
                                    <Link
                                        to={`/blog/${featuredPost.slug}`}
                                        className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-xl text-white shadow-lg transition-all hover:scale-105"
                                        style={{ background: 'linear-gradient(135deg, var(--accent), #1e1b4b)' }}
                                    >
                                        Read Full Legal Guide <ChevronRight size={18} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ════ MAIN ARTICLES GRID ════ */}
            <section className="py-12 pb-24" style={{ background: 'var(--bg)' }}>
                <div className="container mx-auto px-6 max-w-6xl">
                    {filtered.length === 0 ? (
                        <div className="text-center py-20 rounded-2xl border" style={{ background: 'var(--surface)', borderColor: 'var(--card-border)', color: 'var(--text-muted)' }}>
                            <BookOpen size={48} className="mx-auto mb-4 text-[var(--accent)] opacity-50" />
                            <h3 className="text-lg font-bold mb-2">No Legal Guides Found</h3>
                            <p className="text-sm mb-4">Try searching with a different legal term or keyword.</p>
                            <button
                                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                                className="px-5 py-2 rounded-lg text-xs font-bold text-white bg-[var(--accent)] shadow-md transition-all hover:scale-105"
                            >
                                View All Articles
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filtered.map(post => (
                                <BlogCardEn key={post.slug} post={post} />
                            ))}
                        </div>
                    )}

                    {/* Language Switch Footer */}
                    <div className="mt-16 text-center">
                        <Link
                            to="/bn/blog"
                            className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-2xl border transition-all hover:bg-[var(--accent-subtle)] shadow-sm"
                            style={{ color: 'var(--accent)', borderColor: 'var(--accent)', fontFamily: "var(--font-bn), 'SolaimanLipi', sans-serif" }}
                        >
                            🇧🇩 বাংলা আইনি জ্ঞান কেন্দ্র ও ব্লগ দেখুন
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Blog;
