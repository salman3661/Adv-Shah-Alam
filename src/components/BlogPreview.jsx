import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const articles = [
    {
        title: 'Complete Guide to the Bail Process in Bangladesh',
        excerpt: 'Everything you need to know about how to apply for bail in Bangladesh — from magistrate court bail to High Court bail for non-bailable offences.',
        slug: 'bail-process-bangladesh',
        category: 'Criminal Law',
        readTime: '5 min',
        tagBg: 'rgba(59,130,246,0.1)',
        tagColor: '#3B82F6',
    },
    {
        title: 'Step-by-Step Divorce Procedure in Bangladesh (2024)',
        excerpt: 'A comprehensive breakdown of the Muslim divorce procedure in Bangladesh — talaq, khula, mutual consent, and family court divorce process.',
        slug: 'divorce-procedure-bangladesh',
        category: 'Family Law',
        readTime: '7 min',
        tagBg: 'rgba(236,72,153,0.1)',
        tagColor: '#EC4899',
    },
    {
        title: 'How to Win a Land Dispute Case in Bangladesh',
        excerpt: 'Key legal strategies, evidence requirements, and court procedures for resolving land dispute cases in Bangladesh civil courts.',
        slug: 'land-dispute-case-bangladesh',
        category: 'Property Law',
        readTime: '6 min',
        tagBg: 'rgba(34,197,94,0.1)',
        tagColor: '#22C55E',
    },
    {
        title: 'Income Tax Case Procedure in Bangladesh – NBR to Tribunal',
        excerpt: 'How to handle income tax disputes with NBR, file a tax appeal, and what to expect at the Taxes Appellate Tribunal in Bangladesh.',
        slug: 'income-tax-case-procedure-bangladesh',
        category: 'Tax Law',
        readTime: '5 min',
        tagBg: 'rgba(217,119,6,0.1)',
        tagColor: '#D97706',
    },
    {
        title: 'Cheque Dishonour Case Law in Bangladesh – Section 138 NI Act',
        excerpt: 'Full guide to cheque dishonour cases under the Negotiable Instruments Act — filing a case, legal notice, time limits, and court proceedings.',
        slug: 'cheque-dishonour-case-law-bangladesh',
        category: 'Civil Law',
        readTime: '6 min',
        tagBg: 'rgba(124,58,237,0.1)',
        tagColor: '#7C3AED',
    },
];

const BlogPreview = () => {
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
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                        <Link to="/blog" className="btn-outline inline-flex items-center gap-2 py-2.5 px-6 text-sm font-semibold whitespace-nowrap">
                            All Articles <ArrowRight size={15} />
                        </Link>
                    </motion.div>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article, i) => (
                        <motion.article key={i}
                            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                            className="glass-card p-6 flex flex-col group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold px-3 py-1 rounded-full"
                                    style={{ background: article.tagBg, color: article.tagColor }}>
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
                                {article.excerpt}
                            </p>

                            <Link to={`/blog/${article.slug}`}
                                className="inline-flex items-center gap-1.5 text-sm font-semibold"
                                style={{ color: 'var(--accent)' }}>
                                <BookOpen size={14} /> Read Article
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogPreview;
