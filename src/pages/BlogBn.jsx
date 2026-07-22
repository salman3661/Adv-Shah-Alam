import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, Clock, ChevronRight, BookOpen, Flame, Award, ShieldCheck, UserCheck, Scale, ArrowUpRight, X } from 'lucide-react';

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

// Helper to strip HTML tags for clean card snippet display
function stripHtml(html) {
  if (!html) return '';
  return String(html).replace(/<[^>]*>?/gm, '').trim();
}

// Bengali unicode normalization helper
function normalizeBnText(str) {
  if (!str) return '';
  return String(str)
    .toLowerCase()
    .replace(/[\u200C\u200D]/g, '')
    .replace(/য়/g, 'য়')
    .replace(/ড়/g, 'ড়')
    .replace(/ঢ়/g, 'ঢ়')
    .trim();
}

// Common search synonyms for English <-> Bangla intent mapping
const SYNONYMS = {
  'bail': ['জামিন', 'অগাম জামিন', 'হাইকোর্ট', 'bail'],
  'divorce': ['তালাক', 'ডিভোর্স', 'খোরপোষ', 'দেনমোহর', 'পারিবারিক'],
  'talak': ['তালাক', 'ডিভোর্স', 'খোরপোষ'],
  'land': ['জমি', 'দলিল', 'খতিয়ান', 'নামজারি', 'বাটোয়ারা', 'সম্পত্তি'],
  'jomi': ['জমি', 'দলিল', 'খতিয়ান', 'নামজারি', 'বাটোয়ারা'],
  'mutation': ['নামজারি', 'ই-নামজারি', 'খতিয়ান'],
  'khatian': ['খতিয়ান', 'আরএস', 'বিএস', 'সিএস'],
  'cheque': ['চেক', 'চেক ডিজঅনার', '১৩৮ ধারা', 'এনআই অ্যাক্ট'],
  'remand': ['রিমান্ড', '৫৪ ধারা', 'পুলিশ'],
  'marriage': ['বিবাহ', 'কোর্ট ম্যারেজ', 'নিকাহনামা', 'রেজিস্ট্রি'],
  'tax': ['কর', 'ইনকাম ট্যাক্স', 'এনবিআর', 'টিআইএন'],
  'cyber': ['সাইবার', 'ফেসবুক', 'হ্যাকিং', 'ব্ল্যাকমেইল', 'ডিজিটাল নিরাপত্তা'],
  'police': ['পুলিশ', 'জিডি', 'এফআইআর', 'থানা', 'মামলা'],
};

const CATEGORIES = ['সব', 'ফৌজদারি আইন', 'পারিবারিক আইন', 'সম্পত্তি আইন', 'কর আইন', 'দেওয়ানী আইন', 'সাইবার আইন'];

const categoryColors = {
    'ফৌজদারি আইন': '#EF4444',
    'পারিবারিক আইন': '#8B5CF6',
    'সম্পত্তি আইন': '#10B981',
    'কর আইন': '#F59E0B',
    'দেওয়ানী আইন': '#3B82F6',
    'সাইবার আইন': '#065F46',
};

const getCatColor = (cat) => categoryColors[cat] || 'var(--accent)';

/* ─── Premium Glassmorphic Blog Card ─── */
const BlogCardBn = ({ post }) => {
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
                            fontFamily: "var(--font-bn), 'SolaimanLipi', sans-serif"
                        }}
                    >
                        {post.category}
                    </span>
                    <span
                        className="inline-flex items-center gap-1 text-xs"
                        style={{ color: 'var(--text-muted)', fontFamily: "var(--font-bn), 'SolaimanLipi', sans-serif" }}
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
                        fontFamily: "var(--font-bn), 'SolaimanLipi', sans-serif",
                        lineHeight: 1.35
                    }}
                >
                    <Link to={`/bn/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                    </Link>
                </h2>

                {/* Excerpt with stripped HTML */}
                <p
                    className="text-sm leading-relaxed line-clamp-3 mb-4 flex-1"
                    style={{
                        color: 'var(--text-secondary)',
                        fontFamily: "var(--font-bn), 'SolaimanLipi', sans-serif",
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
                            alt="অ্যাডভোকেট মো. শাহ আলম"
                            className="w-7 h-7 rounded-full object-cover border border-[var(--gold)] flex-shrink-0 shadow-sm"
                            loading="lazy"
                            width="28"
                            height="28"
                        />
                        <span className="text-xs font-semibold" style={{ color: 'var(--text)', fontFamily: "var(--font-bn), 'SolaimanLipi', sans-serif" }}>
                            অ্যাডভোকেট মো. শাহ আলম
                        </span>
                    </div>

                    <Link
                        to={`/bn/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg transition-all group-hover:bg-[var(--accent)] group-hover:text-white"
                        style={{
                            background: 'var(--accent-subtle)',
                            color: 'var(--accent)',
                            fontFamily: "var(--font-bn), 'SolaimanLipi', sans-serif"
                        }}
                        aria-label={`পড়ুন: ${post.title}`}
                    >
                        পড়ুন <ArrowUpRight size={14} />
                    </Link>
                </div>
            </div>
        </article>
    );
};

const BlogBn = () => {
    const [activeCategory, setActiveCategory] = useState('সব');
    const [searchQuery, setSearchQuery] = useState('');

    const allPublished = useMemo(() => postsBn.filter(isPublishedBn), []);

    // Dynamic Spotlight Featured Post (selects newest or marked featured post)
    const featuredPost = useMemo(() => {
        if (!allPublished.length) return null;
        const explicitFeatured = allPublished.find(p => p.featured === true);
        if (explicitFeatured) return explicitFeatured;
        // Dynamically select the newest published post
        return [...allPublished].sort((a, b) => new Date(b.publishedDate || 0) - new Date(a.publishedDate || 0))[0];
    }, [allPublished]);

    const categoryCounts = useMemo(() => {
        const counts = { 'সব': allPublished.length };
        allPublished.forEach(p => {
            counts[p.category] = (counts[p.category] || 0) + 1;
        });
        return counts;
    }, [allPublished]);

    // Intelligent Deep Search Filtering Algorithm
    const filtered = useMemo(() => {
        let posts = [...allPublished];

        if (activeCategory !== 'সব') {
            posts = posts.filter(p => p.category === activeCategory);
        }

        const rawQuery = searchQuery.trim();
        if (!rawQuery) return posts;

        const normalizedQ = normalizeBnText(rawQuery);
        const queryTokens = normalizedQ.split(/\s+/).filter(Boolean);

        // Check if query maps to any synonym terms
        let mappedTerms = [normalizedQ];
        Object.keys(SYNONYMS).forEach(synKey => {
            if (normalizedQ.includes(synKey) || synKey.includes(normalizedQ)) {
                mappedTerms.push(...SYNONYMS[synKey].map(normalizeBnText));
            }
        });

        return posts.filter(post => {
            const titleNorm = normalizeBnText(post.title);
            const metaTitleNorm = normalizeBnText(post.metaTitle);
            const metaDescNorm = normalizeBnText(post.metaDescription);
            const heroNorm = normalizeBnText(post.heroIntro);
            const slugNorm = normalizeBnText(post.slug);
            const categoryNorm = normalizeBnText(post.category);
            const keywordsNorm = (post.keywords || []).map(normalizeBnText).join(' ');

            const sectionsNorm = (post.sections || [])
                .map(s => normalizeBnText(s.heading) + ' ' + normalizeBnText(s.content))
                .join(' ');

            const faqsNorm = (post.faqs || [])
                .map(f => normalizeBnText(f.question) + ' ' + normalizeBnText(f.answer))
                .join(' ');

            const corpus = `${titleNorm} ${metaTitleNorm} ${metaDescNorm} ${heroNorm} ${slugNorm} ${categoryNorm} ${keywordsNorm} ${sectionsNorm} ${faqsNorm}`;

            if (corpus.includes(normalizedQ)) return true;
            if (mappedTerms.some(term => corpus.includes(term))) return true;
            if (queryTokens.length > 1 && queryTokens.every(token => corpus.includes(token))) return true;

            return false;
        });
    }, [allPublished, activeCategory, searchQuery]);

    return (
        <>
            <Helmet>
                <html lang="bn" />
                <title>বাংলা আইনি ব্লগ ও সমাধান নির্দেশিকা | অ্যাডভোকেট মো. শাহ আলম</title>
                <meta name="description" content="বাংলাদেশের সর্বোচ্চ আদালতের আইনজীবীর দ্বারা লিখিত নির্ভরযোগ্য বাংলা আইনি ব্লগ — জমি রেজিস্ট্রি, জামিন, তালাক, উত্তরাধিকার, শ্রম আইন ও সাইবার আইনের পূর্ণাঙ্গ সমাধান।" />
                <link rel="canonical" href="https://www.advmdshahalam.me/bn/blog" />
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
                            fontFamily: "var(--font-bn), 'SolaimanLipi', sans-serif"
                        }}
                    >
                        <Scale size={15} style={{ color: 'var(--gold)' }} />
                        বাংলাদেশ সুপ্রিম কোর্ট আইনজীবী স্পেশাল লাইব্রেরি
                    </div>

                    <h1
                        className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                        style={{
                            color: 'var(--text)',
                            fontFamily: "var(--font-bn), 'SolaimanLipi', sans-serif",
                            letterSpacing: '-0.02em'
                        }}
                    >
                        বাংলা আইনি জ্ঞান কেন্দ্র
                    </h1>

                    <p
                        className="text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed"
                        style={{
                            color: 'var(--text-secondary)',
                            fontFamily: "var(--font-bn), 'SolaimanLipi', sans-serif"
                        }}
                    >
                        জমি জমা, জামিন, পারিবারিক বিবাদ ও ফৌজদারি মামলার নির্ভরযোগ্য ও সহজ বাংলা আইনি নির্দেশিকা।
                    </p>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap justify-center items-center gap-6 mb-10 text-xs font-semibold" style={{ color: 'var(--text-muted)', fontFamily: "var(--font-bn), 'SolaimanLipi', sans-serif" }}>
                        <span className="flex items-center gap-1.5">
                            <ShieldCheck size={16} className="text-emerald-500" /> ১০০% আইনি ও নজিরনির্ভর
                        </span>
                        <span className="flex items-center gap-1.5">
                            <UserCheck size={16} className="text-amber-500" /> সুপ্রিম কোর্টের আইনজীবী পরামর্শ
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Award size={16} className="text-blue-500" /> বিনামূল্যে তথ্য সংকলন
                        </span>
                    </div>

                    {/* Interactive Search Bar */}
                    <div className="relative max-w-2xl mx-auto mb-8 shadow-lg rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--card-border)', background: 'var(--surface)' }}>
                        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--accent)' }} />
                        <input
                            type="search"
                            placeholder="আইনি বিষয় বা মামলা খুঁজুন (যেমন: জামিন, বাটোয়ারা, দেনমোহর, divorce, land)..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-28 py-4 text-sm md:text-base outline-none transition-all"
                            style={{
                                background: 'transparent',
                                color: 'var(--text)',
                                fontFamily: "var(--font-bn), 'SolaimanLipi', sans-serif"
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
                                            fontFamily: "var(--font-bn), 'SolaimanLipi', sans-serif"
                                        }}
                                    >
                                        {filtered.length} টি ফলাফল
                                    </span>
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="p-1.5 rounded-lg hover:bg-black/10 text-gray-400 hover:text-gray-600 transition-all"
                                        title="অনুসন্ধান ক্লিয়ার করুন"
                                    >
                                        <X size={16} />
                                    </button>
                                </>
                            ) : (
                                <button
                                    className="text-xs px-4 py-2 rounded-lg font-bold text-white shadow-md transition-all hover:scale-105"
                                    style={{
                                        background: 'linear-gradient(135deg, var(--accent), #1e1b4b)',
                                        fontFamily: "var(--font-bn), 'SolaimanLipi', sans-serif"
                                    }}
                                >
                                    খুঁজুন
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
                                                fontFamily: "var(--font-bn), 'SolaimanLipi', sans-serif"
                                            }
                                            : {
                                                background: 'var(--surface)',
                                                color: 'var(--text-secondary)',
                                                borderColor: 'var(--card-border)',
                                                fontFamily: "var(--font-bn), 'SolaimanLipi', sans-serif"
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

            {/* ════ SPOTLIGHT DYNAMIC FEATURED ARTICLE (IF NO SEARCH & ALL CATEGORY) ════ */}
            {activeCategory === 'সব' && !searchQuery.trim() && featuredPost && (
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
                                        <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: 'linear-gradient(135deg, #f59e0b, #be185d)', fontFamily: "var(--font-bn), 'SolaimanLipi', sans-serif" }}>
                                            <Flame size={13} /> সাম্প্রতিক সেরা নিবন্ধ
                                        </span>
                                        <span className="text-xs text-[var(--text-muted)]" style={{ fontFamily: "var(--font-bn), 'SolaimanLipi', sans-serif" }}>
                                            {featuredPost.readTime}
                                        </span>
                                    </div>
                                    <h2
                                        className="text-2xl md:text-3xl font-bold mb-3 leading-snug"
                                        style={{ color: 'var(--text)', fontFamily: "var(--font-bn), 'SolaimanLipi', sans-serif" }}
                                    >
                                        <Link to={`/bn/blog/${featuredPost.slug}`} className="hover:text-[var(--accent)] transition-colors">
                                            {featuredPost.title}
                                        </Link>
                                    </h2>
                                    <p
                                        className="text-sm md:text-base leading-relaxed line-clamp-3 mb-6"
                                        style={{ color: 'var(--text-secondary)', fontFamily: "var(--font-bn), 'SolaimanLipi', sans-serif" }}
                                    >
                                        {stripHtml(featuredPost.heroIntro)}
                                    </p>
                                    <Link
                                        to={`/bn/blog/${featuredPost.slug}`}
                                        className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-xl text-white shadow-lg transition-all hover:scale-105"
                                        style={{ background: 'linear-gradient(135deg, var(--accent), #1e1b4b)', fontFamily: "var(--font-bn), 'SolaimanLipi', sans-serif" }}
                                    >
                                        সম্পূর্ণ আইনি নিবন্ধটি পড়ুন <ChevronRight size={18} />
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
                            <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-bn), 'SolaimanLipi', sans-serif" }}>কোনো আইনি নিবন্ধ পাওয়া যায়নি</h3>
                            <p className="text-sm mb-4" style={{ fontFamily: "var(--font-bn), 'SolaimanLipi', sans-serif" }}>অন্য কোনো শব্দ দিয়ে পুনরায় অনুসন্ধান করুন।</p>
                            <button
                                onClick={() => { setSearchQuery(''); setActiveCategory('সব'); }}
                                className="px-5 py-2 rounded-lg text-xs font-bold text-white bg-[var(--accent)] shadow-md transition-all hover:scale-105"
                                style={{ fontFamily: "var(--font-bn), 'SolaimanLipi', sans-serif" }}
                            >
                                সব পোস্ট দেখুন
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filtered.map(post => (
                                <BlogCardBn key={post.slug} post={post} />
                            ))}
                        </div>
                    )}

                    {/* Language Switch Footer */}
                    <div className="mt-16 text-center">
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-2xl border transition-all hover:bg-[var(--accent-subtle)] shadow-sm"
                            style={{ color: 'var(--accent)', borderColor: 'var(--accent)', fontFamily: "var(--font-en), sans-serif" }}
                        >
                            🌐 Switch to English Legal Guides &amp; Articles
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BlogBn;
