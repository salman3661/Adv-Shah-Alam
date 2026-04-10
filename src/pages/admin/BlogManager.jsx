import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Trash2, Edit3, RefreshCw, Eye,
  FileText, Globe2, Calendar, Tag, Loader2,
  AlertCircle, ExternalLink, BookOpen, Plus,
  CheckCircle, Clock,
} from 'lucide-react';
import { adminApi } from '../../lib/admin/api';
import { useToast } from '../../lib/admin/Toast';

const T = {
  card:         'rgba(255,255,255,0.04)',
  border:       'rgba(255,255,255,0.07)',
  accent:       '#22c55e',
  accentBg:     'rgba(34,197,94,0.1)',
  text:         '#f1f5f9',
  muted:        '#64748b',
  muted2:       '#94a3b8',
  error:        '#ef4444',
  danger:       'rgba(239,68,68,0.08)',
  dangerBorder: 'rgba(239,68,68,0.25)',
  warn:         '#eab308',
  warnBg:       'rgba(234,179,8,0.1)',
  warnBorder:   'rgba(234,179,8,0.3)',
};

/* ─────────────────────────────────────────────────────────────────
  parseBlogPosts — Extract post metadata from the flat JS source.
  We read the .js file via GitHub API, then use regex to pull:
    slug, title, category, publishedDate, readTime, isDraft
  from each post block. We do NOT eval() — regex only for safety.
───────────────────────────────────────────────────────────────── */
function parseBlogPosts(jsSource) {
  const posts = [];
  const TODAY = new Date().toISOString().split('T')[0];

  // Resolve PUBLISHED constant value
  const publishedMatch = jsSource.match(/const PUBLISHED\d*\s*=\s*['"]([^'"]+)['"]/);
  const PUBLISHED = publishedMatch ? publishedMatch[1] : TODAY;

  // Split into post blocks by the /* ── N ── */ comment markers
  // Fallback: split by recurring `slug:` entries
  const slugMatches    = [...jsSource.matchAll(/slug:\s*['"]([^'"]+)['"]/g)];
  const titleMatches   = [...jsSource.matchAll(/title:\s*['"]([^'"]+)['"]/g)];
  const catMatches     = [...jsSource.matchAll(/category:\s*['"]([^'"]+)['"]/g)];
  const rtMatches      = [...jsSource.matchAll(/readTime:\s*['"]([^'"]+)['"]/g)];
  const dateMatches    = [...jsSource.matchAll(/publishedDate:\s*['"]([^'"]+)['"]/g)];
  const draftMatches   = [...jsSource.matchAll(/isDraft:\s*(true|false)/g)];

  slugMatches.forEach((sm, i) => {
    const slug         = sm[1];
    const title        = titleMatches[i]?.['1'] ?? '(Untitled)';
    const category     = catMatches[i]?.['1'] ?? '';
    const readTime     = rtMatches[i]?.['1'] ?? '';
    const publishedDate= dateMatches[i]?.['1'] ?? PUBLISHED;
    const isDraft      = draftMatches[i]?.['1'] === 'true';
    const isPublished  = !isDraft && publishedDate <= TODAY;
    const isFuture     = !isDraft && publishedDate > TODAY;

    posts.push({ slug, title, category, readTime, publishedDate, isDraft, isPublished, isFuture });
  });

  return posts;
}

/* ─── Badge ────────────────────────────────────────────────────── */
function Badge({ color, bg, border, children }) {
  return (
    <span style={{
      background: bg,
      border: `1px solid ${border}`,
      borderRadius: 6, padding: '2px 8px',
      fontSize: '0.7rem', fontWeight: 600, color,
      whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  );
}

/* ─── PostRow ────────────────────────────────────────────────────── */
function PostRow({ post, lang }) {
  const liveUrl = lang === 'bn'
    ? `https://www.advmdshahalam.me/bn/blog/${post.slug}`
    : `https://www.advmdshahalam.me/blog/${post.slug}`;

  const ghFile = lang === 'en'
    ? 'src/data/blogPosts.js'
    : 'src/data/blogPostsBn.js';

  const ghEditUrl = `https://github.com/salman3661/Adv-Shah-Alam/edit/main/${ghFile}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      style={{
        background: T.card,
        border: `1px solid ${T.border}`,
        borderRadius: 10,
        padding: '14px 18px',
        display: 'grid',
        gridTemplateColumns: '1fr auto auto',
        alignItems: 'center',
        gap: 12,
        marginBottom: 8,
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(34,197,94,0.25)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.border; }}
    >
      {/* Info */}
      <div>
        <div style={{
          fontSize: '0.88rem', fontWeight: 600, color: T.text,
          marginBottom: 5, overflow: 'hidden', textOverflow: 'ellipsis',
          whiteSpace: 'nowrap', maxWidth: 520,
        }}>
          {post.title}
        </div>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', alignItems: 'center' }}>
          {post.isDraft && (
            <Badge color={T.warn} bg={T.warnBg} border={T.warnBorder}>Draft</Badge>
          )}
          {post.isPublished && (
            <Badge color={T.accent} bg={T.accentBg} border="rgba(34,197,94,0.3)">Published</Badge>
          )}
          {post.isFuture && (
            <Badge color="#60a5fa" bg="rgba(96,165,250,0.1)" border="rgba(96,165,250,0.3)">Scheduled</Badge>
          )}
          {post.category && (
            <Badge color={T.muted2} bg="rgba(255,255,255,0.04)" border={T.border}>{post.category}</Badge>
          )}
          {post.publishedDate && (
            <span style={{ fontSize: '0.72rem', color: T.muted, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Calendar size={11} /> {post.publishedDate}
            </span>
          )}
          {post.readTime && (
            <span style={{ fontSize: '0.72rem', color: T.muted, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Clock size={11} /> {post.readTime}
            </span>
          )}
          {post.slug && (
            <span style={{ fontSize: '0.72rem', color: T.muted, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Tag size={11} /> /{post.slug}
            </span>
          )}
        </div>
      </div>

      {/* View Live */}
      {post.isPublished && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="View live post"
          style={{
            display: 'flex', alignItems: 'center', gap: 4,
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${T.border}`,
            borderRadius: 8, padding: '7px 12px',
            color: T.muted, textDecoration: 'none',
            fontSize: '0.78rem', transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = T.text; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = T.muted; }}
        >
          <Eye size={13} /> View
        </a>
      )}

      {/* Edit on GitHub */}
      <a
        href={ghEditUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Edit in GitHub (opens file editor)"
        style={{
          display: 'flex', alignItems: 'center', gap: 4,
          background: T.accentBg,
          border: '1px solid rgba(34,197,94,0.25)',
          borderRadius: 8, padding: '7px 12px',
          color: T.accent, textDecoration: 'none',
          fontSize: '0.78rem',
        }}
      >
        <Edit3 size={13} /> Edit
      </a>
    </motion.div>
  );
}

/* ─── BlogManager ────────────────────────────────────────────────── */
export default function BlogManager({ lang = 'en' }) {
  const toast  = useToast();
  const isEn   = lang === 'en';
  const title  = isEn ? 'Blog Posts (English)' : 'Blog Posts (বাংলা)';
  const Icon   = isEn ? FileText : Globe2;
  const ghFile = isEn ? 'src/data/blogPosts.js' : 'src/data/blogPostsBn.js';
  const ghNewUrl = `https://github.com/salman3661/Adv-Shah-Alam/edit/main/${ghFile}`;

  const [posts,    setPosts]   = useState([]);
  const [loading,  setLoading] = useState(true);
  const [error,    setError]   = useState(null);
  const [search,   setSearch]  = useState('');
  const [filter,   setFilter]  = useState('all'); // all | published | scheduled | draft

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Use the same GitHub API flow as HomepageEditor
      const { content } = await adminApi.loadRawFile(ghFile);
      const parsed = parseBlogPosts(content);
      setPosts(parsed);
    } catch (err) {
      console.error('BlogManager load error:', err);
      const msg = err?.message || 'Unknown error';
      setError(msg);
      toast.error(`Failed to load posts: ${msg}`);
    } finally {
      setLoading(false);
    }
  }, [lang, ghFile]);

  useEffect(() => { load(); }, [load]);

  const filtered = posts.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === 'all'       ? true :
      filter === 'published' ? p.isPublished :
      filter === 'scheduled' ? p.isFuture :
      filter === 'draft'     ? p.isDraft : true;
    return matchSearch && matchFilter;
  });

  const counts = {
    all:       posts.length,
    published: posts.filter(p => p.isPublished).length,
    scheduled: posts.filter(p => p.isFuture).length,
    draft:     posts.filter(p => p.isDraft).length,
  };

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 16 }}
      >
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f1f5f9', margin: '0 0 6px', letterSpacing: '-0.03em', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Icon size={22} color={T.accent} />
            {title}
          </h1>
          <p style={{ color: T.muted, fontSize: '0.82rem', margin: 0 }}>
            Posts are stored in <code style={{ color: T.muted2, fontSize: '0.78rem' }}>{ghFile}</code> and served statically.
            To add or edit a post, use the GitHub button on each row or the New Post button.
          </p>
        </div>

        <a
          href={ghNewUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: T.accent, border: 'none',
            borderRadius: 10, padding: '10px 20px',
            color: '#000', fontWeight: 700, fontSize: '0.85rem',
            textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(34,197,94,0.25)',
          }}
        >
          <Plus size={16} /> New Post
        </a>
      </motion.div>

      {/* Info banner — explains the architecture */}
      <div style={{
        display: 'flex', gap: 10, alignItems: 'flex-start',
        background: 'rgba(96,165,250,0.07)',
        border: '1px solid rgba(96,165,250,0.2)',
        borderRadius: 10, padding: '12px 16px', marginBottom: 20,
      }}>
        <BookOpen size={16} style={{ color: '#60a5fa', flexShrink: 0, marginTop: 2 }} />
        <div style={{ fontSize: '0.8rem', color: T.muted2, lineHeight: 1.6 }}>
          <strong style={{ color: '#93c5fd' }}>Blog Architecture:</strong>{' '}
          Blog posts are large structured JS objects (with sections, FAQs, keywords, schema, TOC) stored in{' '}
          <code style={{ fontSize: '0.75rem' }}>{ghFile}</code>. This list reads directly from GitHub —
          same system as all other content. Click <strong>Edit</strong> to open the file in GitHub's editor.
          After saving, Vercel auto-deploys (usually 30–60 seconds).
        </div>
      </div>

      {/* Stats row */}
      {!loading && !error && (
        <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
          {[
            { key: 'all',       label: 'Total',     icon: FileText,     color: T.muted2 },
            { key: 'published', label: 'Published',  icon: CheckCircle,  color: T.accent },
            { key: 'scheduled', label: 'Scheduled',  icon: Clock,        color: '#60a5fa' },
            { key: 'draft',     label: 'Drafts',     icon: Edit3,        color: T.warn },
          ].map(({ key, label, icon: Ic, color }) => (
            <div key={key} style={{
              background: T.card, border: `1px solid ${T.border}`,
              borderRadius: 10, padding: '10px 18px',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <Ic size={15} style={{ color }} />
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: T.text }}>{counts[key]}</span>
              <span style={{ fontSize: '0.75rem', color: T.muted }}>{label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Filter / Search bar */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: T.muted }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts..."
            style={{
              width: '100%', padding: '10px 12px 10px 34px',
              background: T.card, border: `1.5px solid ${T.border}`,
              borderRadius: 9, color: '#f1f5f9', fontSize: '0.85rem',
              outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
            }}
            onFocus={(e) => { e.target.style.borderColor = T.accent; }}
            onBlur={(e) => { e.target.style.borderColor = T.border; }}
          />
        </div>

        {['all', 'published', 'scheduled', 'draft'].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            style={{
              background: filter === f ? T.accentBg : T.card,
              border: `1px solid ${filter === f ? 'rgba(34,197,94,0.3)' : T.border}`,
              borderRadius: 8, padding: '9px 16px',
              color: filter === f ? T.accent : T.muted,
              cursor: 'pointer', fontSize: '0.8rem', fontWeight: filter === f ? 600 : 400,
              textTransform: 'capitalize',
            }}>
            {f} {counts[f] !== undefined ? `(${counts[f]})` : ''}
          </button>
        ))}

        <button onClick={load}
          title="Reload from GitHub"
          style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, padding: '9px 12px', cursor: 'pointer', color: T.muted, display: 'flex', alignItems: 'center' }}>
          <RefreshCw size={14} />
        </button>
      </div>

      {/* Count */}
      <div style={{ fontSize: '0.78rem', color: T.muted, marginBottom: 14 }}>
        {loading ? 'Loading from GitHub...' : `Showing ${filtered.length} of ${posts.length} post${posts.length !== 1 ? 's' : ''}`}
      </div>

      {/* Error state */}
      {error && !loading && (
        <div style={{
          background: T.danger, border: `1px solid ${T.dangerBorder}`,
          borderRadius: 10, padding: '16px 20px', marginBottom: 16,
          display: 'flex', gap: 12, alignItems: 'flex-start',
        }}>
          <AlertCircle size={18} style={{ color: T.error, flexShrink: 0, marginTop: 1 }} />
          <div>
            <div style={{ color: T.error, fontWeight: 600, fontSize: '0.85rem', marginBottom: 4 }}>
              Could not load posts from GitHub
            </div>
            <div style={{ color: T.muted2, fontSize: '0.8rem', marginBottom: 8 }}>{error}</div>
            <div style={{ fontSize: '0.78rem', color: T.muted }}>
              Make sure <code>GITHUB_TOKEN</code> is set in Vercel environment variables and has <code>repo</code> scope.
            </div>
          </div>
        </div>
      )}

      {/* Post list */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px', color: T.muted }}>
          <Loader2 size={28} style={{ animation: 'spin 1s linear infinite', color: T.accent, display: 'block', margin: '0 auto 12px' }} />
          <p style={{ margin: 0, fontSize: '0.85rem' }}>Reading from GitHub...</p>
        </div>
      ) : (
        <AnimatePresence>
          {filtered.length === 0 && !error ? (
            <div style={{ textAlign: 'center', padding: '48px', color: T.muted }}>
              <FileText size={36} style={{ margin: '0 auto 12px', display: 'block', color: T.muted }} />
              <p style={{ margin: '0 0 12px', fontSize: '0.9rem' }}>No posts match your filter.</p>
              {posts.length === 0 && (
                <a href={ghNewUrl} target="_blank" rel="noopener noreferrer"
                  style={{ color: T.accent, textDecoration: 'none', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Plus size={14} /> Add your first post on GitHub
                </a>
              )}
            </div>
          ) : filtered.map((post, i) => (
            <PostRow
              key={post.slug || i}
              post={post}
              lang={lang}
            />
          ))}
        </AnimatePresence>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
