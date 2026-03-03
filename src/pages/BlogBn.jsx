import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, Clock, ChevronRight, BookOpen } from 'lucide-react';
import postsBn from '../data/blogPostsBn';

const CATEGORIES = ['সব', 'ফৌজদারি আইন', 'পারিবারিক আইন', 'সম্পত্তি আইন', 'কর আইন', 'দেওয়ানী আইন'];

const categoryColors = {
    'ফৌজদারি আইন': '#EF4444',
    'পারিবারিক আইন': '#8B5CF6',
    'সম্পত্তি আইন': '#10B981',
    'কর আইন': '#F59E0B',
    'দেওয়ানী আইন': '#3B82F6',
};

const BlogCardBn = ({ post }) => (
    <article
        className="glass-card flex flex-col h-full overflow-hidden"
        style={{ borderRadius: '1.25rem' }}
    >
        <div
            className="px-6 pt-6 pb-4"
            style={{ borderBottom: '1px solid var(--card-border)' }}
        >
            <div className="flex items-center justify-between mb-3">
                <span
                    className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{
                        background: (categoryColors[post.category] || '#888') + '18',
                        color: categoryColors[post.category] || 'var(--accent)',
                        letterSpacing: '0.06em',
                    }}
                >
                    {post.category}
                </span>
                <span
                    className="flex items-center gap-1 text-xs"
                    style={{ color: 'var(--text-muted)' }}
                >
                    <Clock size={12} />
                    {post.readTime}
                </span>
            </div>
            <h2
                className="text-lg font-bold leading-snug mb-3"
                style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}
            >
                {post.title}
            </h2>
            <p className="text-sm leading-relaxed line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
                {post.heroIntro}
            </p>
        </div>
        <div className="px-6 py-4 mt-auto flex items-center justify-between">
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {post.publishedDate}
            </span>
            <Link
                to={`/bn/blog/${post.slug}`}
                className="inline-flex items-center gap-1 text-sm font-semibold hover:gap-2 transition-all"
                style={{ color: 'var(--accent)' }}
                aria-label={`পড়ুন: ${post.title}`}
            >
                পড়ুন <ChevronRight size={16} />
            </Link>
        </div>
    </article>
);

const BlogBn = () => {
    const [activeCategory, setActiveCategory] = useState('সব');
    const [searchQuery, setSearchQuery] = useState('');

    const filtered = useMemo(() => {
        let posts = postsBn;
        if (activeCategory !== 'সব') {
            posts = posts.filter(p => p.category === activeCategory);
        }
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            posts = posts.filter(p =>
                p.title.toLowerCase().includes(q) ||
                (p.heroIntro && p.heroIntro.toLowerCase().includes(q)) ||
                (p.keywords && p.keywords.some(k => k.toLowerCase().includes(q)))
            );
        }
        return posts;
    }, [activeCategory, searchQuery]);

    return (
        <>
            <Helmet>
                <html lang="bn" />
                <title>আইনি ব্লগ বাংলা | অ্যাডভোকেট মো. শাহ আলম</title>
                <meta name="description" content="বাংলাদেশের আইন বিষয়ক বাংলা ব্লগ — জামিন, তালাক, জমি বিরোধ, কর মামলা ও আরও অনেক বিষয়ে বিশেষজ্ঞ পরামর্শ।" />
                <link rel="canonical" href="https://advmdshahalam.me/bn/blog" />
                <link rel="alternate" hrefLang="en" href="https://advmdshahalam.me/blog" />
                <link rel="alternate" hrefLang="bn" href="https://advmdshahalam.me/bn/blog" />
            </Helmet>

            {/* Hero */}
            <section className="pt-24 md:pt-28 pb-10" style={{ background: 'var(--bg)' }}>
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-5"
                        style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                    >
                        <BookOpen size={14} />
                        আইনি জ্ঞান কেন্দ্র
                    </div>
                    <h1
                        className="text-3xl md:text-5xl font-serif font-bold mb-5 leading-tight"
                        style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}
                    >
                        বাংলা আইনি ব্লগ
                    </h1>
                    <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto 2rem' }}>
                        বাংলাদেশের আইনি বিষয়ে সহজ বাংলায় বিশেষজ্ঞ গাইড।
                    </p>

                    {/* Search */}
                    <div className="relative max-w-xl mx-auto mb-8">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                        <input
                            type="search"
                            placeholder="আইনি বিষয় খুঁজুন…"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-5 py-3 rounded-2xl border text-sm outline-none focus:ring-2"
                            style={{
                                background: 'var(--surface)',
                                color: 'var(--text)',
                                borderColor: 'var(--card-border)',
                            }}
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className="px-4 py-1.5 rounded-full text-xs font-semibold border transition-all"
                                style={
                                    activeCategory === cat
                                        ? { background: 'var(--accent)', color: '#fff', borderColor: 'var(--accent)' }
                                        : { background: 'transparent', color: 'var(--text-secondary)', borderColor: 'var(--card-border)' }
                                }
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Grid */}
            <section className="pb-20" style={{ background: 'var(--bg)' }}>
                <div className="container mx-auto px-6 max-w-6xl">
                    {filtered.length === 0 ? (
                        <div className="text-center py-20" style={{ color: 'var(--text-muted)' }}>
                            কোনো পোস্ট পাওয়া যায়নি।
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filtered.map(post => (
                                <BlogCardBn key={post.slug} post={post} />
                            ))}
                        </div>
                    )}

                    {/* Language toggle */}
                    <div className="mt-12 text-center">
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full border transition-all hover:opacity-80"
                            style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}
                        >
                            🇬🇧 View English Blog
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BlogBn;
