import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import blogPosts from '../data/blogPosts';
import blogPostsBn from '../data/blogPostsBn';

// Pull the 3 newest posts from each dataset
const latestEn = blogPosts.slice(0, 3);
const latestBn = blogPostsBn.slice(0, 3);

const categoryColors = {
    'Criminal Law': { bg: 'rgba(59,130,246,0.1)', color: '#3B82F6' },
    'Family Law': { bg: 'rgba(236,72,153,0.1)', color: '#EC4899' },
    'Property Law': { bg: 'rgba(34,197,94,0.1)', color: '#22C55E' },
    'Tax Law': { bg: 'rgba(217,119,6,0.1)', color: '#D97706' },
    'Civil Law': { bg: 'rgba(124,58,237,0.1)', color: '#7C3AED' },
    'ফৌজদারি আইন': { bg: 'rgba(59,130,246,0.1)', color: '#3B82F6' },
    'পারিবারিক আইন': { bg: 'rgba(236,72,153,0.1)', color: '#EC4899' },
    'সম্পত্তি আইন': { bg: 'rgba(34,197,94,0.1)', color: '#22C55E' },
    'কর আইন': { bg: 'rgba(217,119,6,0.1)', color: '#D97706' },
    'দেওয়ানী আইন': { bg: 'rgba(124,58,237,0.1)', color: '#7C3AED' },
};

const BlogPreview = () => {
    const [lang, setLang] = useState('en');
    const articles = lang === 'en' ? latestEn : latestBn;
    const linkBase = lang === 'en' ? '/blog/' : '/bn/blog/';
    const readLabel = lang === 'en'
        ? (a) => `Read the complete guide: ${a.title}`
        : (a) => `পড়ুন: ${a.title}`;
    const readShort = lang === 'en' ? 'Read Full Guide' : 'সম্পূর্ণ পড়ুন';

    return (
        <section id="blog" className="py-24 relative overflow-hidden" style={{ background: 'var(--bg)' }}>
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="label-accent block mb-3">
                            Legal Knowledge Hub
                        </motion.span>
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-serif font-bold mb-2" style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
                            Legal Guides &amp; Case Insights
                        </motion.h2>
                        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                            className="w-24 h-1 rounded-full" style={{ background: 'var(--accent)' }}></motion.div>
                    </div>

                    {/* Lang toggle + All Articles link */}
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                        className="flex items-center gap-3 flex-wrap">
                        {/* EN / BN tab */}
                        <div className="flex rounded-full overflow-hidden border" style={{ borderColor: 'var(--card-border)' }}>
                            <button
                                onClick={() => setLang('en')}
                                className="px-4 py-1.5 text-xs font-bold transition-all"
                                style={lang === 'en'
                                    ? { background: 'var(--accent)', color: '#fff' }
                                    : { background: 'transparent', color: 'var(--text-muted)' }}
                                aria-pressed={lang === 'en'}
                            >
                                🇬🇧 English
                            </button>
                            <button
                                onClick={() => setLang('bn')}
                                className="px-4 py-1.5 text-xs font-bold transition-all"
                                style={lang === 'bn'
                                    ? { background: 'var(--accent)', color: '#fff' }
                                    : { background: 'transparent', color: 'var(--text-muted)' }}
                                aria-pressed={lang === 'bn'}
                            >
                                🇧🇩 বাংলা
                            </button>
                        </div>
                        <Link
                            to={lang === 'en' ? '/blog' : '/bn/blog'}
                            className="btn-outline inline-flex items-center gap-2 py-2.5 px-6 text-sm font-semibold whitespace-nowrap"
                            aria-label={lang === 'en' ? 'View all English legal articles' : 'সকল বাংলা আইনি নিবন্ধ দেখুন'}
                        >
                            {lang === 'en' ? 'All Articles' : 'সকল নিবন্ধ'} <ArrowRight size={15} />
                        </Link>
                    </motion.div>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article, i) => {
                        const colors = categoryColors[article.category] || { bg: 'rgba(100,116,139,0.1)', color: '#64748B' };
                        return (
                            <motion.article key={article.slug || i}
                                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                                className="glass-card p-6 flex flex-col group"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs font-bold px-3 py-1 rounded-full"
                                        style={{ background: colors.bg, color: colors.color }}>
                                        {article.category}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                                        <Clock size={11} /> {article.readTime} read
                                    </span>
                                </div>

                                <h3 className="font-bold text-base leading-snug mb-3 flex-1 group-hover:underline decoration-dotted" style={{ color: 'var(--text)' }}>
                                    {article.title}
                                </h3>

                                <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-muted)' }}>
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
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default BlogPreview;
