import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, Clock, ChevronRight, BookOpen } from 'lucide-react';
import blogPosts from '../data/blogPosts';
import { telLink, waLink } from '../data/contactInfo';

const CATEGORIES = ['All', 'Criminal Law', 'Family Law', 'Property Law', 'Tax Law', 'Civil Law'];

const categoryColors = {
    'Criminal Law': '#EF4444',
    'Family Law': '#8B5CF6',
    'Property Law': '#10B981',
    'Tax Law': '#F59E0B',
    'Civil Law': '#3B82F6',
};

const BlogCard = ({ post }) => (
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
                        background: categoryColors[post.category] + '18',
                        color: categoryColors[post.category],
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
                to={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1 text-sm font-semibold hover:gap-2 transition-all"
                style={{ color: 'var(--accent)' }}
                aria-label={`Read article: ${post.title}`}
            >
                Read Article <ChevronRight size={16} />
            </Link>
        </div>
    </article>
);

const Blog = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filtered = useMemo(() => {
        let posts = blogPosts;
        if (activeCategory !== 'All') {
            posts = posts.filter(p => p.category === activeCategory);
        }
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            posts = posts.filter(p =>
                p.title.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q)
            );
        }
        return posts;
    }, [activeCategory, searchQuery]);

    return (
        <>
            <Helmet>
                <title>Legal Blog – Bangladesh Law Guide | Advocate Md. Shah Alam</title>
                <meta
                    name="description"
                    content="Expert legal articles on criminal, family, property &amp; tax law in Bangladesh by Advocate Md. Shah Alam. Guides on bail, divorce, land disputes and more."
                />
                <link rel="canonical" href="https://www.advmdshahalam.me/blog" />
            </Helmet>

            {/* Hero */}
            <section
                className="pt-24 md:pt-28 pb-16 relative overflow-hidden"
                style={{ background: 'var(--hero-bg)' }}
            >
                <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
                    <span className="label-accent block mb-4" style={{ color: 'var(--gold)' }}>
                        Legal Knowledge · Bangladesh
                    </span>
                    <h1
                        className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6"
                        style={{ color: 'var(--hero-text)', fontFamily: "'Playfair Display', serif" }}
                    >
                        Legal Blog & Guides
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--hero-text-2)' }}>
                        Practical, plain-language legal guides on Bangladesh law — criminal, family,
                        property, and tax matters — written by Advocate Md. Shah Alam.
                    </p>
                </div>
            </section>

            {/* Filters + Search */}
            <section className="py-4 md:py-6 sticky top-[68px] z-40" style={{ background: 'var(--nav-bg)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--divider)' }}>
                <div className="container mx-auto px-6 max-w-5xl flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    {/* Category chips */}
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
                                style={{
                                    background: activeCategory === cat ? 'var(--accent)' : 'var(--card-bg)',
                                    color: activeCategory === cat ? '#fff' : 'var(--text)',
                                    border: `1.5px solid ${activeCategory === cat ? 'var(--accent)' : 'var(--card-border)'}`,
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full sm:w-60">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                        <input
                            type="search"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="input-field pl-9 py-2 text-sm"
                            aria-label="Search blog articles"
                        />
                    </div>
                </div>
            </section>

            {/* Grid */}
            <section className="py-16" style={{ background: 'var(--bg)' }}>
                <div className="container mx-auto px-6 max-w-5xl">
                    {filtered.length === 0 ? (
                        <div className="text-center py-20">
                            <BookOpen size={40} className="mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
                            <p className="text-lg font-semibold" style={{ color: 'var(--text)' }}>No articles found</p>
                            <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
                                Try a different category or search term.
                            </p>
                        </div>
                    ) : (
                        <>
                            <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
                                Showing <strong>{filtered.length}</strong> article{filtered.length !== 1 ? 's' : ''}
                            </p>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filtered.map(post => (
                                    <BlogCard key={post.slug} post={post} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 section-alt">
                <div className="container mx-auto px-6 max-w-3xl text-center">
                    <h2
                        className="text-2xl md:text-3xl font-serif font-bold mb-4"
                        style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}
                    >
                        Need Legal Advice?
                    </h2>
                    <p className="text-base mb-8" style={{ color: 'var(--text-secondary)' }}>
                        These guides are for general information. For your specific case, speak directly
                        with Advocate Md. Shah Alam.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href={telLink()} className="btn-primary">
                            📞 Call Now
                        </a>
                        <a
                            href={waLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-whatsapp"
                        >
                            WhatsApp Consultation
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Blog;
