import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Search, Trash2, Edit3, RefreshCw, Eye,
  FileText, Globe2, Calendar, Tag, Loader2,
} from 'lucide-react';
import { adminApi } from '../../lib/admin/api';
import { auth } from '../../lib/admin/auth';
import { useToast } from '../../lib/admin/Toast';

const T = {
  card:    'rgba(255,255,255,0.04)',
  border:  'rgba(255,255,255,0.07)',
  accent:  '#22c55e',
  accentBg:'rgba(34,197,94,0.1)',
  text:    '#f1f5f9',
  muted:   '#64748b',
  muted2:  '#94a3b8',
  error:   '#ef4444',
  danger:  'rgba(239,68,68,0.08)',
  dangerBorder:'rgba(239,68,68,0.25)',
};

// Fetch posts from Directus instance
async function fetchPosts(lang = 'en') {
  const collection = lang === 'en' ? 'posts_en' : 'posts_bn';
  const res = await fetch(
    `https://www.advmdshahalam.me/admin/api/collections/${collection}/entries?limit=100`,
    { headers: auth.authHeader() }
  );

  if (!res.ok) {
    // Fallback — try to load from local content files via GitHub API
    const { content } = await adminApi.loadContent('about'); // just to test auth
    return [];
  }

  const data = await res.json();
  return Array.isArray(data) ? data : data?.data || [];
}

function Badge({ color, bg, border, children }) {
  return (
    <span style={{
      background: bg, border: `1px solid ${border}`,
      borderRadius: 6, padding: '2px 8px',
      fontSize: '0.7rem', fontWeight: 600, color,
    }}>
      {children}
    </span>
  );
}

function PostRow({ post, lang, onEdit, onDelete }) {
  const isDraft = post.isDraft || post.draft || false;
  const title = post.title || post.titleBn || '(Untitled)';
  const date = post.publishedDate || post.date || '';
  const category = post.category || '';
  const slug = post.slug || '';

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
        gridTemplateColumns: '1fr auto auto auto',
        alignItems: 'center',
        gap: 14,
        marginBottom: 8,
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(34,197,94,0.25)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.border; }}
    >
      <div>
        <div style={{ fontSize: '0.88rem', fontWeight: 600, color: T.text, marginBottom: 4, lineClamp: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 500 }}>
          {title}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {isDraft
            ? <Badge color="#eab308" bg="rgba(234,179,8,0.1)" border="rgba(234,179,8,0.3)">Draft</Badge>
            : <Badge color={T.accent} bg={T.accentBg} border="rgba(34,197,94,0.3)">Published</Badge>
          }
          {category && <Badge color={T.muted2} bg="rgba(255,255,255,0.04)" border={T.border}>{category}</Badge>}
          {date && (
            <span style={{ fontSize: '0.72rem', color: T.muted, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Calendar size={11} /> {date}
            </span>
          )}
          {slug && (
            <span style={{ fontSize: '0.72rem', color: T.muted, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Tag size={11} /> /{slug}
            </span>
          )}
        </div>
      </div>

      {/* View */}
      <a
        href={`/${lang === 'bn' ? 'bn/' : ''}blog/${slug}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex', alignItems: 'center',
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${T.border}`,
          borderRadius: 8, padding: '7px 12px',
          color: T.muted, textDecoration: 'none', fontSize: '0.78rem', gap: 4,
          transition: 'color 0.2s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = T.text; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = T.muted; }}
      >
        <Eye size={13} /> View
      </a>

      {/* Edit */}
      <button onClick={() => onEdit(post)}
        style={{
          display: 'flex', alignItems: 'center', gap: 4,
          background: T.accentBg, border: '1px solid rgba(34,197,94,0.25)',
          borderRadius: 8, padding: '7px 12px',
          color: T.accent, cursor: 'pointer', fontSize: '0.78rem',
        }}>
        <Edit3 size={13} /> Edit
      </button>

      {/* Delete */}
      <button onClick={() => onDelete(post)}
        style={{
          display: 'flex', alignItems: 'center', gap: 4,
          background: T.danger, border: `1px solid ${T.dangerBorder}`,
          borderRadius: 8, padding: '7px 12px',
          color: T.error, cursor: 'pointer', fontSize: '0.78rem',
        }}>
        <Trash2 size={13} />
      </button>
    </motion.div>
  );
}

export default function BlogManager({ lang = 'en' }) {
  const toast = useToast();
  const [posts, setPosts]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [filter, setFilter]     = useState('all'); // all | published | draft

  const isEn = lang === 'en';
  const title = isEn ? 'Blog Posts (English)' : 'Blog Posts (বাংলা)';
  const Icon = isEn ? FileText : Globe2;
  const cmsBase = 'https://www.advmdshahalam.me/admin';
  const collection = isEn ? 'posts_en' : 'posts_bn';
  const newPostUrl = `${cmsBase}/#/collections/${collection}/entries/new`;

  async function load() {
    setLoading(true);
    try {
      const data = await fetchPosts(lang);
      setPosts(data);
    } catch (err) {
      toast.error('Could not load posts. Check Directus connection.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [lang]);

  const filtered = posts.filter((p) => {
    const title = (p.title || p.titleBn || '').toLowerCase();
    const matchSearch = title.includes(search.toLowerCase());
    const matchFilter =
      filter === 'all' ? true :
      filter === 'published' ? !p.isDraft && !p.draft :
      filter === 'draft' ? (p.isDraft || p.draft) : true;
    return matchSearch && matchFilter;
  });

  function handleEdit(post) {
    const url = `${cmsBase}/#/collections/${collection}/entries/${post.id || post.slug}`;
    window.open(url, '_blank');
  }

  function handleDelete(post) {
    toast.warning(`To delete posts, use the Directus CMS directly for safety.\nPost slug: ${post.slug}`);
  }

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}
      >
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f1f5f9', margin: '0 0 6px', letterSpacing: '-0.03em', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Icon size={22} color={T.accent} />
            {title}
          </h1>
          <p style={{ color: T.muted, fontSize: '0.85rem', margin: 0 }}>
            View and manage all blog posts.{' '}
            <a href={cmsBase} target="_blank" rel="noopener noreferrer" style={{ color: T.accent, textDecoration: 'none' }}>
              Open Directus CMS ↗
            </a>
          </p>
        </div>

        <a href={newPostUrl} target="_blank" rel="noopener noreferrer" style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: T.accent, border: 'none',
          borderRadius: 10, padding: '10px 20px',
          color: '#000', fontWeight: 700, fontSize: '0.85rem',
          textDecoration: 'none',
          boxShadow: '0 4px 16px rgba(34,197,94,0.25)',
        }}>
          <Plus size={16} /> New Post
        </a>
      </motion.div>

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

        {['all', 'published', 'draft'].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            style={{
              background: filter === f ? T.accentBg : T.card,
              border: `1px solid ${filter === f ? 'rgba(34,197,94,0.3)' : T.border}`,
              borderRadius: 8, padding: '9px 16px',
              color: filter === f ? T.accent : T.muted,
              cursor: 'pointer', fontSize: '0.8rem', fontWeight: filter === f ? 600 : 400,
              textTransform: 'capitalize',
            }}>
            {f}
          </button>
        ))}

        <button onClick={load}
          style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, padding: '9px 12px', cursor: 'pointer', color: T.muted, display: 'flex', alignItems: 'center' }}>
          <RefreshCw size={14} />
        </button>
      </div>

      {/* Count */}
      <div style={{ fontSize: '0.78rem', color: T.muted, marginBottom: 14 }}>
        {loading ? 'Loading...' : `${filtered.length} post${filtered.length !== 1 ? 's' : ''}`}
      </div>

      {/* Post list */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px', color: T.muted }}>
          <Loader2 size={28} style={{ animation: 'spin 1s linear infinite', color: T.accent, marginBottom: 12 }} />
          <p style={{ margin: 0, fontSize: '0.85rem' }}>Loading posts...</p>
        </div>
      ) : (
        <AnimatePresence>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px', color: T.muted }}>
              <p style={{ margin: '0 0 12px' }}>No posts found.</p>
              <a href={newPostUrl} target="_blank" rel="noopener noreferrer"
                style={{ color: T.accent, textDecoration: 'none', fontSize: '0.85rem' }}>
                + Create your first post
              </a>
            </div>
          ) : filtered.map((post, i) => (
            <PostRow
              key={post.id || post.slug || i}
              post={post}
              lang={lang}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </AnimatePresence>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
