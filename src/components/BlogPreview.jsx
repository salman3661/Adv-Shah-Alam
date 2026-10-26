import React, { useState } from 'react';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import seo from '../content/seo.js';
import postsPreview from '../content/posts-preview.json';

const latestEn = Array.isArray(postsPreview?.en) ? postsPreview.en : [];
const latestBn = Array.isArray(postsPreview?.bn) ? postsPreview.bn : [];

// Convert seo.categoryColors (hex) into bg/color pairs for the badge
const categoryColors = Object.fromEntries(
    Object.entries(seo.categoryColors).map(([k, hex]) => [
        k,
        {
            bg: `${hex}1A`,   // ~10% opacity
            color: hex,
        }
    ])
);

const BlogPreview = ({ lang: initialLang = 'en' }) => {
    // Sync active language with the page language on mount
    const [activeLang, setLang] = useState(initialLang);
    const isBn = initialLang === 'bn';
    const articles = activeLang === 'en' ? latestEn : latestBn;
    const linkBase = activeLang === 'en' ? '/blog/' : '/bn/blog/';
    const readLabel = activeLang === 'en'
        ? (a) => `Read the complete guide: ${a.title}`
        : (a) => `পড়ুন: ${a.title}`;
    const readShort = activeLang === 'en' ? 'Read Full Guide' : 'সম্পূর্ণ পড়ুন';

    return (
        <section id="blog" className="py-24 relative overflow-hidden" style={{ background: 'var(--bg)' }}>
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <span className="label-accent block mb-3">
                            {activeLang === 'en' ? 'Legal Knowledge Hub' : 'আইনি জ্ঞানের ভাণ্ডার'}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--text)', fontFamily: activeLang === 'bn' ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : "Georgia, serif" }}>
                            {activeLang === 'en' ? 'Legal Guides & Case Insights' : 'আইনি পরামর্শ ও আপনার অধিকার'}
                        </h2>
                        <div className="w-20 h-1 rounded-full" style={{ background: 'var(--accent)' }}></div>
                    </div>

                    {/* Lang toggle + All Articles link */}
                    <div className="flex items-center gap-3 flex-wrap">
                        {/* EN / BN tab */}
                        <div className="flex rounded-full overflow-hidden border" style={{ borderColor: 'var(--card-border)' }}>
                            <button
                                onClick={() => setLang('en')}
                                className="px-4 py-1.5 text-xs font-bold transition-all"
                                style={activeLang === 'en'
                                    ? { background: 'var(--accent)', color: '#fff' }
                                    : { background: 'transparent', color: 'var(--text-muted)' }}
                                aria-pressed={activeLang === 'en'}
                            >
                                🇬🇧 English
                            </button>
                            <button
                                onClick={() => setLang('bn')}
                                className="px-4 py-1.5 text-xs font-bold transition-all"
                                style={activeLang === 'bn'
                                    ? { background: 'var(--accent)', color: '#fff' }
                                    : { background: 'transparent', color: 'var(--text-muted)' }}
                                aria-pressed={activeLang === 'bn'}
                            >
                                🇧🇩 বাংলা
                            </button>
                        </div>
                        <Link
                            to={activeLang === 'en' ? '/blog' : '/bn/blog'}
                            className="btn-outline inline-flex items-center gap-2 py-2.5 px-6 text-sm font-semibold whitespace-nowrap"
                            aria-label={activeLang === 'en' ? 'View all English legal articles' : 'আমাদের সব লেখা পড়ুন'}
                        >
                            {activeLang === 'en' ? 'All Articles' : 'আরো পড়ুন'} <ArrowRight size={15} />
                        </Link>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.length === 0 ? (
                        <div className="col-span-full text-center py-12">
                            <BookOpen size={40} className="mx-auto mb-4 opacity-30" style={{ color: 'var(--text-muted)' }} />
                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                            {activeLang === 'bn' ? 'এখনো কোনো লেখা প্রকাশিত হয়নি। শীঘ্রই আসবে।' : 'No articles published yet. Check back soon.'}
                        </p>
                        </div>
                    ) : articles.map((article, i) => {
                        const colors = categoryColors[article.category] || { bg: 'rgba(100,116,139,0.1)', color: '#64748B' };
                        return (
                            <article key={article.slug || i}
                                className="glass-card p-6 flex flex-col group"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs font-bold px-3 py-1 rounded-full"
                                        style={{ background: colors.bg, color: colors.color, letterSpacing: activeLang === 'bn' ? '0' : '0.04em', fontFamily: activeLang === 'bn' ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>
                                        {article.category}
                                    </span>
                                    <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                                        {article.publishedDate && (
                                            <span>{new Date(article.publishedDate).toLocaleDateString(
                                            activeLang === 'bn' ? 'bn-BD' : 'en-GB',
                                            { day: 'numeric', month: 'short', year: 'numeric' }
                                        )}</span>
                                        )}
                                        <span className="flex items-center gap-1">
                                            <Clock size={11} /> {article.readTime}{activeLang === 'en' ? ' read' : ''}
                                        </span>
                                    </div>
                                </div>

                                <h3 className="font-bold text-base leading-snug mb-3 flex-1 group-hover:underline decoration-dotted" style={{ color: 'var(--text)', fontFamily: activeLang === 'bn' ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>
                                    {article.title}
                                </h3>

                                <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-muted)', fontFamily: activeLang === 'bn' ? "var(--font-bn), 'Noto Serif Bengali', sans-serif" : 'inherit' }}>
                                    {article.heroIntro
                                        ? article.heroIntro.slice(0, 120) + (article.heroIntro.length > 120 ? '…' : '')
                                        : ''}
                                </p>

                                <Link
                                    to={`${linkBase}${article.slug}`}
                                    className="inline-flex items-center gap-1.5 text-sm font-semibold"
                                    style={{ color: 'var(--accent)' }}
                                    aria-label={readLabel(article)}
                                >
                                    <BookOpen size={14} /> {readShort}
                                </Link>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default BlogPreview;
