import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Globe2, Search, RefreshCw, Plus, Edit3, Trash2,
  Eye, EyeOff, Save, Upload, ArrowLeft, CheckCircle, Clock,
  AlertCircle, Loader2, Calendar, Tag, BookOpen, List, X,
  ChevronDown, ChevronUp, GripVertical, BarChart2, ExternalLink,
  Copy, CheckSquare, Info, Sparkles,
} from 'lucide-react';
import { adminApi } from '../../lib/admin/api';
import { useToast } from '../../lib/admin/Toast';

// ─── Design Tokens ────────────────────────────────────────────────────────────
const T = {
  bg:           '#070b14',
  card:         'rgba(255,255,255,0.04)',
  cardHover:    'rgba(255,255,255,0.06)',
  border:       'rgba(255,255,255,0.07)',
  accent:       '#22c55e',
  accentBg:     'rgba(34,197,94,0.1)',
  accentBorder: 'rgba(34,197,94,0.25)',
  text:         '#f1f5f9',
  muted:        '#64748b',
  muted2:       '#94a3b8',
  error:        '#ef4444',
  errorBg:      'rgba(239,68,68,0.08)',
  errorBorder:  'rgba(239,68,68,0.25)',
  warn:         '#eab308',
  warnBg:       'rgba(234,179,8,0.08)',
  warnBorder:   'rgba(234,179,8,0.25)',
  info:         '#60a5fa',
  infoBg:       'rgba(96,165,250,0.07)',
  infoBorder:   'rgba(96,165,250,0.2)',
  input:        'rgba(255,255,255,0.05)',
  inputFocus:   'rgba(34,197,94,0.15)',
};

// ─── TODAY (Dhaka timezone) ───────────────────────────────────────────────────
function todayDhaka() {
  return new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Dhaka' }).split(' ')[0];
}

function isPostPublished(post) {
  try {
    if (post.isDraft) return false;
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }));
    const pub = new Date(post.publishedDate + 'T00:00:00');
    return pub <= now;
  } catch { return true; }
}

function postStatus(post) {
  if (post.isDraft) return 'draft';
  const today = todayDhaka();
  if (post.publishedDate > today) return 'scheduled';
  return 'published';
}

// ─── Empty post template ──────────────────────────────────────────────────────
function emptyPost(lang) {
  return {
    slug: '',
    lang,
    title: '',
    category: lang === 'en' ? 'Criminal Law' : 'ফৌজদারি আইন',
    readTime: lang === 'en' ? '7 min read' : '৭ মিনিট পড়ুন',
    metaTitle: '',
    metaDescription: '',
    keywords: [],
    publishedDate: todayDhaka(),
    isDraft: true,
    heroIntro: '',
    toc: [],
    sections: [{ h2: '', content: '' }],
    faqs: [{ question: '', answer: '' }],
    relatedServiceLinks: [],
    ...(lang === 'en' ? { bnSlug: '' } : { enSlug: '' }),
  };
}

const EN_CATEGORIES = ['Criminal Law', 'Family Law', 'Property Law', 'Tax Law', 'Civil Law', 'Corporate Law'];
const BN_CATEGORIES = ['ফৌজদারি আইন', 'পারিবারিক আইন', 'সম্পত্তি আইন', 'কর আইন', 'দেওয়ানী আইন', 'কর্পোরেট আইন'];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Badge({ color, bg, border, children, style }) {
  return (
    <span style={{
      background: bg, border: `1px solid ${border}`,
      borderRadius: 6, padding: '2px 8px',
      fontSize: '0.68rem', fontWeight: 600, color,
      whiteSpace: 'nowrap', ...style,
    }}>
      {children}
    </span>
  );
}

function StatusBadge({ status }) {
  const map = {
    published: { color: T.accent, bg: T.accentBg, border: T.accentBorder, label: 'Published' },
    scheduled:  { color: T.info,  bg: T.infoBg,   border: T.infoBorder,  label: 'Scheduled' },
    draft:      { color: T.warn,  bg: T.warnBg,   border: T.warnBorder,  label: 'Draft' },
  };
  const s = map[status] || map.draft;
  return <Badge color={s.color} bg={s.bg} border={s.border}>{s.label}</Badge>;
}

// ─── Input primitives ────────────────────────────────────────────────────────
function Field({ label, hint, children, required }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: T.muted2, marginBottom: 6, letterSpacing: '0.02em' }}>
        {label}{required && <span style={{ color: T.error, marginLeft: 3 }}>*</span>}
        {hint && <span style={{ fontWeight: 400, color: T.muted, marginLeft: 8, fontSize: '0.72rem' }}>{hint}</span>}
      </label>
      {children}
    </div>
  );
}

const inputStyle = (focused) => ({
  width: '100%', padding: '10px 12px',
  background: focused ? T.inputFocus : T.input,
  border: `1.5px solid ${focused ? T.accent : T.border}`,
  borderRadius: 9, color: T.text, fontSize: '0.875rem',
  outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
  transition: 'all 0.15s',
});

function TextInput({ value, onChange, placeholder, ...rest }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={inputStyle(focused)}
      {...rest}
    />
  );
}

function TextArea({ value, onChange, placeholder, rows = 4, mono }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputStyle(focused),
        resize: 'vertical',
        fontFamily: mono ? "'JetBrains Mono', 'Consolas', monospace" : 'inherit',
        fontSize: mono ? '0.8rem' : '0.875rem',
        lineHeight: 1.6,
      }}
    />
  );
}

function SelectInput({ value, onChange, options }) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{ ...inputStyle(focused), cursor: 'pointer' }}
    >
      {options.map((o) => (
        <option key={o.value ?? o} value={o.value ?? o} style={{ background: '#0a0f1c' }}>
          {o.label ?? o}
        </option>
      ))}
    </select>
  );
}

// ─── Tag / Keyword Input ──────────────────────────────────────────────────────
function TagInput({ tags = [], onChange, placeholder = 'Add tag, press Enter' }) {
  const [input, setInput] = useState('');
  const [focused, setFocused] = useState(false);

  function add() {
    const t = input.trim();
    if (t && !tags.includes(t)) onChange([...tags, t]);
    setInput('');
  }

  function remove(tag) { onChange(tags.filter((t) => t !== tag)); }

  return (
    <div style={{
      background: focused ? T.inputFocus : T.input,
      border: `1.5px solid ${focused ? T.accent : T.border}`,
      borderRadius: 9, padding: '6px 10px',
      display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center',
      cursor: 'text', transition: 'all 0.15s',
    }}
      onClick={(e) => { e.currentTarget.querySelector('input')?.focus(); }}
    >
      {tags.map((tag) => (
        <span key={tag} style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          background: T.accentBg, border: `1px solid ${T.accentBorder}`,
          borderRadius: 6, padding: '2px 8px',
          fontSize: '0.75rem', color: T.accent,
        }}>
          {tag}
          <button
            type="button"
            onClick={() => remove(tag)}
            style={{ background: 'none', border: 'none', color: T.accent, cursor: 'pointer', padding: 0, lineHeight: 1, fontSize: '0.8rem' }}
          >×</button>
        </span>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(); } }}
        placeholder={tags.length === 0 ? placeholder : ''}
        onFocus={() => setFocused(true)}
        onBlur={() => { setFocused(false); if (input.trim()) add(); }}
        style={{
          background: 'none', border: 'none', outline: 'none',
          color: T.text, fontSize: '0.85rem', fontFamily: 'inherit',
          flex: 1, minWidth: 120,
        }}
      />
    </div>
  );
}

// ─── Dynamic List Editor ──────────────────────────────────────────────────────
function StringListEditor({ items = [], onChange, placeholder = 'Add item...', label }) {
  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
          <span style={{ color: T.muted, fontSize: '0.75rem', width: 22, textAlign: 'right', flexShrink: 0 }}>{i + 1}.</span>
          <TextInput
            value={item}
            onChange={(v) => { const next = [...items]; next[i] = v; onChange(next); }}
            placeholder={placeholder}
          />
          <button
            type="button"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
            style={{ background: T.errorBg, border: `1px solid ${T.errorBorder}`, borderRadius: 7, padding: '8px 10px', color: T.error, cursor: 'pointer', flexShrink: 0 }}
          ><X size={13} /></button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, ''])}
        style={{ display: 'flex', alignItems: 'center', gap: 6, background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, padding: '7px 14px', color: T.muted2, cursor: 'pointer', fontSize: '0.8rem', marginTop: 4 }}
      >
        <Plus size={13} /> Add {label}
      </button>
    </div>
  );
}

// ─── Sections Editor ─────────────────────────────────────────────────────────
function SectionsEditor({ sections = [], onChange }) {
  const [open, setOpen] = useState(() => sections.map(() => true));

  function update(i, key, value) {
    const next = sections.map((s, j) => j === i ? { ...s, [key]: value } : s);
    onChange(next);
  }

  function add() {
    onChange([...sections, { h2: '', content: '' }]);
    setOpen((o) => [...o, true]);
  }

  function remove(i) {
    onChange(sections.filter((_, j) => j !== i));
    setOpen((o) => o.filter((_, j) => j !== i));
  }

  function toggle(i) {
    setOpen((o) => o.map((v, j) => j === i ? !v : v));
  }

  return (
    <div>
      {sections.map((sec, i) => (
        <div key={i} style={{
          background: T.card, border: `1px solid ${T.border}`,
          borderRadius: 10, marginBottom: 10, overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'rgba(255,255,255,0.02)' }}>
            <span style={{ color: T.muted, fontSize: '0.75rem', width: 22, textAlign: 'center', flexShrink: 0, fontWeight: 600 }}>§{i + 1}</span>
            <span style={{ flex: 1, color: sec.h2 ? T.text : T.muted, fontSize: '0.85rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {sec.h2 || '(untitled section)'}
            </span>
            <button type="button" onClick={() => toggle(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.muted, padding: 4 }}>
              {open[i] ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>
            <button type="button" onClick={() => remove(i)} style={{ background: T.errorBg, border: `1px solid ${T.errorBorder}`, borderRadius: 6, padding: '4px 8px', color: T.error, cursor: 'pointer' }}>
              <Trash2 size={12} />
            </button>
          </div>

          {/* Body */}
          {open[i] && (
            <div style={{ padding: '12px 14px', borderTop: `1px solid ${T.border}` }}>
              <Field label="Section Heading (H2)">
                <TextInput value={sec.h2} onChange={(v) => update(i, 'h2', v)} placeholder="Section heading..." />
              </Field>
              <Field label="Content (HTML)" hint="Full HTML supported — <p>, <ul>, <li>, <strong>, <a href='...'>, etc.">
                <TextArea
                  value={sec.content}
                  onChange={(v) => update(i, 'content', v)}
                  placeholder="<p>Section content...</p>"
                  rows={8}
                  mono
                />
              </Field>
              {/* Preview */}
              {sec.content && (
                <details style={{ marginTop: 8 }}>
                  <summary style={{ fontSize: '0.75rem', color: T.muted2, cursor: 'pointer', marginBottom: 8 }}>
                    Preview rendered HTML
                  </summary>
                  <div
                    style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 8, padding: '12px 16px', fontSize: '0.85rem', color: T.muted2, lineHeight: 1.7 }}
                    dangerouslySetInnerHTML={{ __html: sec.content }}
                  />
                </details>
              )}
            </div>
          )}
        </div>
      ))}

      <button type="button" onClick={add}
        style={{ display: 'flex', alignItems: 'center', gap: 6, background: T.card, border: `1px solid ${T.border}`, borderRadius: 9, padding: '9px 16px', color: T.muted2, cursor: 'pointer', fontSize: '0.82rem', width: '100%', justifyContent: 'center' }}>
        <Plus size={14} /> Add Section
      </button>
    </div>
  );
}

// ─── FAQs Editor ─────────────────────────────────────────────────────────────
function FAQsEditor({ faqs = [], onChange }) {
  function update(i, key, value) {
    onChange(faqs.map((f, j) => j === i ? { ...f, [key]: value } : f));
  }

  return (
    <div>
      {faqs.map((faq, i) => (
        <div key={i} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, padding: '12px 14px', marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: T.accent }}>FAQ #{i + 1}</span>
            <button type="button" onClick={() => onChange(faqs.filter((_, j) => j !== i))}
              style={{ background: T.errorBg, border: `1px solid ${T.errorBorder}`, borderRadius: 6, padding: '4px 8px', color: T.error, cursor: 'pointer' }}>
              <Trash2 size={12} />
            </button>
          </div>
          <Field label="Question">
            <TextInput value={faq.question} onChange={(v) => update(i, 'question', v)} placeholder="Frequently asked question..." />
          </Field>
          <Field label="Answer">
            <TextArea value={faq.answer} onChange={(v) => update(i, 'answer', v)} placeholder="Answer..." rows={3} />
          </Field>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...faqs, { question: '', answer: '' }])}
        style={{ display: 'flex', alignItems: 'center', gap: 6, background: T.card, border: `1px solid ${T.border}`, borderRadius: 9, padding: '9px 16px', color: T.muted2, cursor: 'pointer', fontSize: '0.82rem', width: '100%', justifyContent: 'center' }}>
        <Plus size={14} /> Add FAQ
      </button>
    </div>
  );
}

// ─── Related Links Editor ────────────────────────────────────────────────────
function LinksEditor({ links = [], onChange }) {
  function update(i, key, value) {
    onChange(links.map((l, j) => j === i ? { ...l, [key]: value } : l));
  }

  return (
    <div>
      {links.map((link, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 8, marginBottom: 8, alignItems: 'center' }}>
          <TextInput value={link.text} onChange={(v) => update(i, 'text', v)} placeholder="Link text" />
          <TextInput value={link.to} onChange={(v) => update(i, 'to', v)} placeholder="/services/bail-lawyer" />
          <button type="button" onClick={() => onChange(links.filter((_, j) => j !== i))}
            style={{ background: T.errorBg, border: `1px solid ${T.errorBorder}`, borderRadius: 7, padding: '8px 10px', color: T.error, cursor: 'pointer' }}>
            <X size={13} />
          </button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...links, { text: '', to: '' }])}
        style={{ display: 'flex', alignItems: 'center', gap: 6, background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, padding: '7px 14px', color: T.muted2, cursor: 'pointer', fontSize: '0.8rem', marginTop: 4 }}>
        <Plus size={13} /> Add Link
      </button>
    </div>
  );
}

// ─── Post List Row ────────────────────────────────────────────────────────────
function PostRow({ post, lang, onEdit }) {
  const status = postStatus(post);
  const liveUrl = lang === 'en'
    ? `https://advmdshahalam.me/blog/${post.slug}`
    : `https://advmdshahalam.me/bn/blog/${post.slug}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      style={{
        background: T.card, border: `1px solid ${T.border}`,
        borderRadius: 10, padding: '12px 16px',
        display: 'grid', gridTemplateColumns: '1fr auto auto',
        alignItems: 'center', gap: 10, marginBottom: 6,
        transition: 'border-color 0.15s',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = T.accentBorder; e.currentTarget.style.background = T.cardHover; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.card; }}
      onClick={() => onEdit(post.slug)}
    >
      {/* Info */}
      <div>
        <div style={{ fontSize: '0.87rem', fontWeight: 600, color: T.text, marginBottom: 5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 500 }}>
          {post.title || '(Untitled)'}
        </div>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', alignItems: 'center' }}>
          <StatusBadge status={status} />
          {post.category && <Badge color={T.muted2} bg="rgba(255,255,255,0.04)" border={T.border}>{post.category}</Badge>}
          {post.publishedDate && (
            <span style={{ fontSize: '0.7rem', color: T.muted, display: 'flex', alignItems: 'center', gap: 3 }}>
              <Calendar size={10} /> {post.publishedDate}
            </span>
          )}
          {post.readTime && (
            <span style={{ fontSize: '0.7rem', color: T.muted, display: 'flex', alignItems: 'center', gap: 3 }}>
              <Clock size={10} /> {post.readTime}
            </span>
          )}
          <span style={{ fontSize: '0.7rem', color: T.muted }}>/{post.slug}</span>
        </div>
      </div>

      {/* View live */}
      {status === 'published' && (
        <a
          href={liveUrl} target="_blank" rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          title="View live"
          style={{ display: 'flex', alignItems: 'center', gap: 4, background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, padding: '7px 12px', color: T.muted, textDecoration: 'none', fontSize: '0.78rem', whiteSpace: 'nowrap' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = T.text; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = T.muted; }}
        >
          <Eye size={12} /> View
        </a>
      )}

      {/* Edit */}
      <button
        onClick={(e) => { e.stopPropagation(); onEdit(post.slug); }}
        style={{ display: 'flex', alignItems: 'center', gap: 4, background: T.accentBg, border: `1px solid ${T.accentBorder}`, borderRadius: 8, padding: '7px 14px', color: T.accent, cursor: 'pointer', fontSize: '0.78rem', whiteSpace: 'nowrap' }}
      >
        <Edit3 size={12} /> Edit
      </button>
    </motion.div>
  );
}

// ─── BLOG LIST VIEW ───────────────────────────────────────────────────────────
function BlogListView({ lang, onEdit, onNew }) {
  const toast = useToast();
  const isEn = lang === 'en';
  const [posts,   setPosts]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [search,  setSearch]  = useState('');
  const [filter,  setFilter]  = useState('all');

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const { index } = await adminApi.loadBlogIndex(lang);
      setPosts(index?.posts ?? []);
    } catch (err) {
      setError(err?.message || 'Failed to load posts');
      toast.error(`Failed to load posts: ${err?.message}`);
    } finally {
      setLoading(false);
    }
  }, [lang]);

  useEffect(() => { load(); }, [load]);

  const filtered = posts.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = !q ||
      p.title?.toLowerCase().includes(q) ||
      p.slug?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q);
    const status = postStatus(p);
    const matchFilter = filter === 'all' || status === filter;
    return matchSearch && matchFilter;
  });

  const counts = {
    all:       posts.length,
    published: posts.filter((p) => postStatus(p) === 'published').length,
    scheduled: posts.filter((p) => postStatus(p) === 'scheduled').length,
    draft:     posts.filter((p) => postStatus(p) === 'draft').length,
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: T.text, margin: '0 0 5px', display: 'flex', alignItems: 'center', gap: 10 }}>
            {isEn ? <FileText size={22} color={T.accent} /> : <Globe2 size={22} color={T.accent} />}
            {isEn ? 'Blog Posts (English)' : 'Blog Posts (বাংলা)'}
          </h1>
          <p style={{ color: T.muted, fontSize: '0.8rem', margin: 0 }}>
            {loading ? 'Loading...' : `${posts.length} posts stored in GitHub JSON files`}
          </p>
        </div>
        <button onClick={onNew}
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: T.accent, border: 'none', borderRadius: 10, padding: '10px 20px', color: '#000', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', boxShadow: '0 4px 16px rgba(34,197,94,0.3)' }}>
          <Plus size={16} /> New Post
        </button>
      </div>

      {/* Stats */}
      {!loading && !error && (
        <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
          {[
            { key: 'all',       label: 'Total',     color: T.muted2 },
            { key: 'published', label: 'Published', color: T.accent },
            { key: 'scheduled', label: 'Scheduled', color: T.info },
            { key: 'draft',     label: 'Drafts',    color: T.warn },
          ].map(({ key, label, color }) => (
            <div key={key} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '1.15rem', fontWeight: 700, color: T.text }}>{counts[key]}</span>
              <span style={{ fontSize: '0.73rem', color }}>{label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Search + Filter */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={13} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: T.muted }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search posts..."
            style={{ width: '100%', padding: '9px 12px 9px 32px', background: T.input, border: `1.5px solid ${T.border}`, borderRadius: 9, color: T.text, fontSize: '0.84rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
            onFocus={(e) => { e.target.style.borderColor = T.accent; }}
            onBlur={(e) => { e.target.style.borderColor = T.border; }}
          />
        </div>
        {['all', 'published', 'scheduled', 'draft'].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ background: filter === f ? T.accentBg : T.card, border: `1px solid ${filter === f ? T.accentBorder : T.border}`, borderRadius: 8, padding: '8px 14px', color: filter === f ? T.accent : T.muted, cursor: 'pointer', fontSize: '0.8rem', fontWeight: filter === f ? 600 : 400, textTransform: 'capitalize' }}>
            {f} ({counts[f] ?? 0})
          </button>
        ))}
        <button onClick={load} title="Refresh" style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, padding: '8px 12px', cursor: 'pointer', color: T.muted, display: 'flex', alignItems: 'center' }}>
          <RefreshCw size={14} />
        </button>
      </div>

      {/* Error */}
      {error && !loading && (
        <div style={{ background: T.errorBg, border: `1px solid ${T.errorBorder}`, borderRadius: 10, padding: '14px 18px', marginBottom: 16, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <AlertCircle size={17} style={{ color: T.error, flexShrink: 0, marginTop: 1 }} />
          <div>
            <div style={{ color: T.error, fontWeight: 600, fontSize: '0.85rem', marginBottom: 4 }}>Failed to load posts from GitHub</div>
            <div style={{ color: T.muted2, fontSize: '0.8rem' }}>{error}</div>
            <div style={{ fontSize: '0.75rem', color: T.muted, marginTop: 6 }}>
              Make sure GITHUB_TOKEN is set in Vercel env vars with <code>repo</code> scope.
            </div>
          </div>
        </div>
      )}

      {/* Post list */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px', color: T.muted }}>
          <Loader2 size={28} style={{ animation: 'spin 1s linear infinite', color: T.accent, display: 'block', margin: '0 auto 12px' }} />
          <p style={{ margin: 0, fontSize: '0.85rem' }}>Loading posts from GitHub...</p>
        </div>
      ) : (
        <AnimatePresence>
          {filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '48px', color: T.muted }}>
              <FileText size={36} style={{ margin: '0 auto 12px', display: 'block', color: T.muted }} />
              <p style={{ margin: '0 0 12px', fontSize: '0.9rem' }}>No posts match your search.</p>
              {posts.length === 0 && (
                <button onClick={onNew} style={{ color: T.accent, background: T.accentBg, border: `1px solid ${T.accentBorder}`, borderRadius: 9, padding: '9px 18px', cursor: 'pointer', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Plus size={14} /> Create your first post
                </button>
              )}
            </motion.div>
          ) : filtered.map((post) => (
            <PostRow key={post.slug} post={post} lang={lang} onEdit={onEdit} />
          ))}
        </AnimatePresence>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─── BLOG EDITOR VIEW ─────────────────────────────────────────────────────────
function BlogEditorView({ lang, slug: initialSlug, onBack, onSaved }) {
  const toast = useToast();
  const isEn  = lang === 'en';
  const isNew = !initialSlug;

  const [post,     setPost]    = useState(null);
  const [sha,      setSha]     = useState(null);
  const [loading,  setLoading] = useState(!isNew);
  const [saving,   setSaving]  = useState(false);
  const [deleting, setDeleting]= useState(false);
  const [error,    setError]   = useState(null);
  const [dirty,    setDirty]   = useState(false);
  const [activeTab, setActiveTab] = useState('meta');
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  function update(path, value) {
    setPost((p) => {
      if (path.includes('.')) {
        const [a, b] = path.split('.');
        return { ...p, [a]: { ...p[a], [b]: value } };
      }
      return { ...p, [path]: value };
    });
    setDirty(true);
  }

  // Load post
  useEffect(() => {
    if (isNew) {
      setPost(emptyPost(lang));
      setLoading(false);
      return;
    }
    setLoading(true); setError(null);
    adminApi.loadBlogPost(lang, initialSlug)
      .then(({ post: p, sha: s }) => { setPost(p); setSha(s); })
      .catch((err) => { setError(err?.message); toast.error('Failed to load post: ' + err?.message); })
      .finally(() => setLoading(false));
  }, [lang, initialSlug]);

  async function handleSave(publishNow = false) {
    if (!post.title?.trim()) { toast.error('Title is required'); return; }
    if (!post.slug?.trim())  { toast.error('Slug is required'); return; }
    if (!/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(post.slug)) {
      toast.error('Slug must be lowercase letters, numbers, and hyphens only'); return;
    }

    setSaving(true);
    try {
      const postToSave = {
        ...post,
        isDraft: publishNow ? false : post.isDraft,
        publishedDate: publishNow && !post.publishedDate ? todayDhaka() : post.publishedDate,
      };
      const result = await adminApi.saveBlogPost(lang, post.slug, postToSave, sha);
      setSha(result.sha);
      setPost(postToSave);
      setDirty(false);
      toast.success(result.isNew ? '✅ Post created!' : publishNow ? '✅ Post published!' : '✅ Saved!');
      onSaved?.(post.slug);
    } catch (err) {
      toast.error('Save failed: ' + (err?.message || 'Unknown error'));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!sha) { toast.error('Cannot delete: SHA not loaded'); return; }
    setDeleting(true);
    try {
      await adminApi.deleteBlogPost(lang, post.slug, sha);
      toast.success('Post deleted');
      onBack();
    } catch (err) {
      toast.error('Delete failed: ' + err?.message);
    } finally {
      setDeleting(false); setDeleteConfirm(false);
    }
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '64px' }}>
        <Loader2 size={32} style={{ animation: 'spin 1s linear infinite', color: T.accent, display: 'block', margin: '0 auto 16px' }} />
        <p style={{ color: T.muted }}>Loading post from GitHub...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '48px' }}>
        <div style={{ background: T.errorBg, border: `1px solid ${T.errorBorder}`, borderRadius: 12, padding: '24px', display: 'inline-block', maxWidth: 500 }}>
          <AlertCircle size={32} style={{ color: T.error, marginBottom: 12 }} />
          <p style={{ color: T.error, fontWeight: 600, marginBottom: 8 }}>{error}</p>
          <button onClick={onBack} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 9, padding: '9px 18px', color: T.muted2, cursor: 'pointer' }}>← Back to list</button>
        </div>
      </div>
    );
  }

  if (!post) return null;

  const status = postStatus(post);
  const liveUrl = lang === 'en'
    ? `https://advmdshahalam.me/blog/${post.slug}`
    : `https://advmdshahalam.me/bn/blog/${post.slug}`;

  const TABS = [
    { id: 'meta',     label: 'Meta & SEO',  icon: Tag },
    { id: 'content',  label: 'Content',     icon: FileText },
    { id: 'seo',      label: 'Structured',  icon: List },
  ];

  return (
    <div>
      {/* ── Editor Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <button onClick={onBack}
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: T.card, border: `1px solid ${T.border}`, borderRadius: 9, padding: '8px 14px', color: T.muted2, cursor: 'pointer', fontSize: '0.82rem' }}>
          <ArrowLeft size={14} /> Posts
        </button>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: '1.1rem', fontWeight: 700, color: T.text, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 400 }}>
              {post.title || (isNew ? 'New Post' : '(Untitled)')}
            </h1>
            <StatusBadge status={status} />
            {dirty && <Badge color={T.warn} bg={T.warnBg} border={T.warnBorder}>Unsaved</Badge>}
          </div>
          {post.slug && (
            <p style={{ margin: '3px 0 0', fontSize: '0.75rem', color: T.muted }}>
              /{lang === 'bn' ? 'bn/' : ''}blog/{post.slug}
            </p>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {status === 'published' && post.slug && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 5, background: T.card, border: `1px solid ${T.border}`, borderRadius: 9, padding: '8px 14px', color: T.muted2, textDecoration: 'none', fontSize: '0.82rem' }}>
              <Eye size={13} /> View Live
            </a>
          )}

          {!isNew && !deleteConfirm && (
            <button onClick={() => setDeleteConfirm(true)}
              style={{ display: 'flex', alignItems: 'center', gap: 5, background: T.errorBg, border: `1px solid ${T.errorBorder}`, borderRadius: 9, padding: '8px 14px', color: T.error, cursor: 'pointer', fontSize: '0.82rem' }}>
              <Trash2 size={13} /> Delete
            </button>
          )}

          {deleteConfirm && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: '0.78rem', color: T.error }}>Are you sure?</span>
              <button onClick={handleDelete} disabled={deleting}
                style={{ background: T.error, border: 'none', borderRadius: 8, padding: '7px 14px', color: '#fff', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
                {deleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
              <button onClick={() => setDeleteConfirm(false)}
                style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, padding: '7px 12px', color: T.muted2, cursor: 'pointer', fontSize: '0.8rem' }}>
                Cancel
              </button>
            </div>
          )}

          <button onClick={() => handleSave(false)} disabled={saving || !dirty}
            style={{ display: 'flex', alignItems: 'center', gap: 5, background: dirty ? T.card : 'rgba(255,255,255,0.02)', border: `1px solid ${dirty ? T.border : 'rgba(255,255,255,0.04)'}`, borderRadius: 9, padding: '8px 16px', color: dirty ? T.muted2 : T.muted, cursor: dirty ? 'pointer' : 'default', fontSize: '0.82rem' }}>
            <Save size={13} /> Save Draft
          </button>

          <button onClick={() => handleSave(true)} disabled={saving}
            style={{ display: 'flex', alignItems: 'center', gap: 5, background: T.accent, border: 'none', borderRadius: 9, padding: '8px 18px', color: '#000', fontWeight: 700, fontSize: '0.85rem', cursor: saving ? 'wait' : 'pointer', boxShadow: '0 4px 14px rgba(34,197,94,0.3)', opacity: saving ? 0.7 : 1 }}>
            {saving ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Upload size={13} />}
            {saving ? 'Saving...' : 'Publish'}
          </button>
        </div>
      </div>

      {/* ── Tab nav ── */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 20, background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, padding: 4, width: 'fit-content', flexWrap: 'wrap' }}>
        {TABS.map(({ id, label, icon: Ic }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, background: activeTab === id ? T.accentBg : 'transparent', border: `1px solid ${activeTab === id ? T.accentBorder : 'transparent'}`, borderRadius: 7, padding: '7px 14px', color: activeTab === id ? T.accent : T.muted, cursor: 'pointer', fontSize: '0.82rem', fontWeight: activeTab === id ? 600 : 400, whiteSpace: 'nowrap' }}>
            <Ic size={14} /> {label}
          </button>
        ))}
      </div>

      {/* ── Tab content ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >

          {/* META & SEO TAB */}
          {activeTab === 'meta' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {/* Left column */}
              <div>
                <section style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: '18px 20px', marginBottom: 16 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: T.accent, marginBottom: 14, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Basic Details
                  </div>
                  <Field label="Post Title" required>
                    <TextInput value={post.title} onChange={(v) => update('title', v)} placeholder={isEn ? 'Bail Process in Bangladesh...' : 'বাংলাদেশে জামিনের প্রক্রিয়া...'} />
                  </Field>
                  <Field label="Slug / URL" required hint="lowercase, hyphens only">
                    <TextInput value={post.slug} onChange={(v) => update('slug', v.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-'))} placeholder="bail-process-bangladesh" />
                  </Field>
                  <Field label="Hero Intro">
                    <TextArea value={post.heroIntro} onChange={(v) => update('heroIntro', v)} placeholder="Brief introduction shown at the top of the post..." rows={4} />
                  </Field>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <Field label="Category">
                      <SelectInput
                        value={post.category}
                        onChange={(v) => update('category', v)}
                        options={isEn ? EN_CATEGORIES : BN_CATEGORIES}
                      />
                    </Field>
                    <Field label="Read Time">
                      <TextInput value={post.readTime} onChange={(v) => update('readTime', v)} placeholder={isEn ? '7 min read' : '৭ মিনিট পড়ুন'} />
                    </Field>
                  </div>
                </section>

                <section style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: '18px 20px', marginBottom: 16 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: T.accent, marginBottom: 14, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Publication
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <Field label="Publish Date">
                      <TextInput type="date" value={post.publishedDate} onChange={(v) => update('publishedDate', v)} />
                    </Field>
                    <Field label="Status">
                      <SelectInput
                        value={post.isDraft ? 'draft' : 'published'}
                        onChange={(v) => update('isDraft', v === 'draft')}
                        options={[
                          { value: 'published', label: 'Published' },
                          { value: 'draft',     label: 'Draft' },
                        ]}
                      />
                    </Field>
                  </div>
                  <Field label={isEn ? 'Bangla Counterpart Slug (bnSlug)' : 'English Counterpart Slug (enSlug)'} hint="optional — for language toggle">
                    <TextInput
                      value={isEn ? (post.bnSlug ?? '') : (post.enSlug ?? '')}
                      onChange={(v) => update(isEn ? 'bnSlug' : 'enSlug', v)}
                      placeholder={isEn ? 'bail-process-bangladesh-bn' : 'bail-process-bangladesh'}
                    />
                  </Field>
                </section>
              </div>

              {/* Right column — SEO */}
              <div>
                <section style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: '18px 20px', marginBottom: 16 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: T.accent, marginBottom: 14, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    SEO Metadata
                  </div>
                  <Field label="Meta Title" hint="≤ 60 chars recommended">
                    <TextInput value={post.metaTitle} onChange={(v) => update('metaTitle', v)} placeholder="Bail Process Bangladesh – Complete Guide..." />
                    {post.metaTitle && (
                      <div style={{ fontSize: '0.7rem', color: post.metaTitle.length > 60 ? T.warn : T.muted, marginTop: 4, textAlign: 'right' }}>
                        {post.metaTitle.length} / 60 chars
                      </div>
                    )}
                  </Field>
                  <Field label="Meta Description" hint="≤ 160 chars recommended">
                    <TextArea value={post.metaDescription} onChange={(v) => update('metaDescription', v)} placeholder="Comprehensive guide to bail in Bangladesh..." rows={4} />
                    {post.metaDescription && (
                      <div style={{ fontSize: '0.7rem', color: post.metaDescription.length > 160 ? T.warn : T.muted, marginTop: 4, textAlign: 'right' }}>
                        {post.metaDescription.length} / 160 chars
                      </div>
                    )}
                  </Field>
                  <Field label="Keywords / Tags" hint="press Enter or , to add">
                    <TagInput tags={post.keywords ?? []} onChange={(v) => update('keywords', v)} />
                  </Field>
                </section>

                {/* SEO preview card */}
                {(post.metaTitle || post.metaDescription) && (
                  <section style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: '18px 20px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: T.muted2, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Google Preview
                    </div>
                    <div style={{ background: '#fff', borderRadius: 10, padding: '16px', fontFamily: 'Arial, sans-serif' }}>
                      <div style={{ fontSize: '0.78rem', color: '#1a0dab', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 400, marginBottom: 4 }}>
                        {post.metaTitle || post.title || '(no title)'}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#006621', marginBottom: 4 }}>
                        advmdshahalam.me/{lang === 'bn' ? 'bn/' : ''}blog/{post.slug || '...'}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#545454', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                        {post.metaDescription || '(no meta description)'}
                      </div>
                    </div>
                  </section>
                )}
              </div>
            </div>
          )}

          {/* CONTENT TAB */}
          {activeTab === 'content' && (
            <div>
              <section style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: '18px 20px', marginBottom: 16 }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: T.accent, marginBottom: 14, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Table of Contents
                </div>
                <div style={{ fontSize: '0.78rem', color: T.muted, marginBottom: 12 }}>
                  These are the section titles shown in the TOC navigation at the top of the post.
                </div>
                <StringListEditor
                  items={post.toc ?? []}
                  onChange={(v) => update('toc', v)}
                  placeholder="TOC item (matches a section heading)..."
                  label="TOC item"
                />
              </section>

              <section style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: '18px 20px', marginBottom: 16 }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: T.accent, marginBottom: 14, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Content Sections
                </div>
                <div style={{ fontSize: '0.78rem', color: T.muted, marginBottom: 12 }}>
                  Each section has an H2 heading and HTML content body. HTML is fully supported.
                </div>
                <SectionsEditor sections={post.sections ?? []} onChange={(v) => update('sections', v)} />
              </section>
            </div>
          )}

          {/* STRUCTURED DATA TAB */}
          {activeTab === 'seo' && (
            <div>
              <section style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: '18px 20px', marginBottom: 16 }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: T.accent, marginBottom: 14, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  FAQ Schema
                </div>
                <div style={{ fontSize: '0.78rem', color: T.muted, marginBottom: 12 }}>
                  These FAQs render as an interactive accordion on the post page AND appear in Google rich results.
                </div>
                <FAQsEditor faqs={post.faqs ?? []} onChange={(v) => update('faqs', v)} />
              </section>

              <section style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: '18px 20px', marginBottom: 16 }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: T.accent, marginBottom: 14, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Related Service Links
                </div>
                <div style={{ fontSize: '0.78rem', color: T.muted, marginBottom: 12 }}>
                  Shown in the sidebar. Link to your service pages like /services/bail-lawyer.
                </div>
                <LinksEditor links={post.relatedServiceLinks ?? []} onChange={(v) => update('relatedServiceLinks', v)} />
              </section>

              {/* JSON preview */}
              <section style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: '18px 20px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: T.muted2, marginBottom: 14, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Raw JSON Preview
                </div>
                <div style={{ fontSize: '0.72rem', color: T.muted, marginBottom: 10 }}>
                  This is exactly what gets saved to <code>src/content/posts/{lang}/{post.slug || 'slug'}.json</code>
                </div>
                <pre style={{
                  background: '#00000040', borderRadius: 9, padding: '14px', overflow: 'auto',
                  fontSize: '0.72rem', color: T.muted2, lineHeight: 1.5, maxHeight: 400,
                }}>
                  {JSON.stringify(post, null, 2)}
                </pre>
              </section>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Sticky save bar */}
      {dirty && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(10,15,28,0.95)', backdropFilter: 'blur(12px)',
            border: `1px solid ${T.warnBorder}`, borderRadius: 14,
            padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 16,
            zIndex: 999, boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          <span style={{ fontSize: '0.82rem', color: T.warn, display: 'flex', alignItems: 'center', gap: 6 }}>
            <AlertCircle size={14} /> Unsaved changes
          </span>
          <button onClick={() => handleSave(false)} disabled={saving}
            style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 9, padding: '7px 16px', color: T.muted2, cursor: 'pointer', fontSize: '0.82rem' }}>
            Save Draft
          </button>
          <button onClick={() => handleSave(true)} disabled={saving}
            style={{ background: T.accent, border: 'none', borderRadius: 9, padding: '7px 18px', color: '#000', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}>
            {saving ? 'Saving...' : '↑ Publish'}
          </button>
        </motion.div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─── ROOT BLOG MANAGER ────────────────────────────────────────────────────────
export default function BlogManager({ lang = 'en' }) {
  const [view, setView]       = useState('list'); // 'list' | 'edit' | 'new'
  const [editSlug, setEditSlug] = useState(null);

  function openEdit(slug)  { setEditSlug(slug); setView('edit'); }
  function openNew()        { setEditSlug(null); setView('new');  }
  function backToList()     { setEditSlug(null); setView('list'); }
  function onSavedNew(slug) { setEditSlug(slug);  setView('edit'); }

  return (
    <AnimatePresence mode="wait">
      {view === 'list' ? (
        <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <BlogListView lang={lang} onEdit={openEdit} onNew={openNew} />
        </motion.div>
      ) : (
        <motion.div key={view + editSlug} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
          <BlogEditorView
            lang={lang}
            slug={view === 'new' ? null : editSlug}
            onBack={backToList}
            onSaved={view === 'new' ? onSavedNew : undefined}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
