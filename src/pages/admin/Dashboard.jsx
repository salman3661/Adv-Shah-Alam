import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Home, FileText, Globe2, Rocket, ArrowRight,
  Edit3, RefreshCw, BarChart3,
} from 'lucide-react';

const T = {
  bg:       '#070b14',
  card:     'rgba(255,255,255,0.04)',
  cardHover:'rgba(255,255,255,0.07)',
  border:   'rgba(255,255,255,0.07)',
  accent:   '#22c55e',
  accentBg: 'rgba(34,197,94,0.1)',
  text:     '#f1f5f9',
  muted:    '#64748b',
  muted2:   '#94a3b8',
};

const QUICK_ACTIONS = [
  {
    label: 'Edit Homepage',
    desc: 'Hero, Services, FAQ, About',
    icon: Home,
    to: '/admin/homepage',
    color: T.accent,
    colorBg: T.accentBg,
  },
  {
    label: 'Manage Blog (EN)',
    desc: 'English blog posts',
    icon: FileText,
    to: '/admin/blog',
    color: '#60a5fa',
    colorBg: 'rgba(96,165,250,0.1)',
  },
  {
    label: 'Manage Blog (BN)',
    desc: 'Bangla blog posts',
    icon: Globe2,
    to: '/admin/blog-bn',
    color: '#f472b6',
    colorBg: 'rgba(244,114,182,0.1)',
  },
  {
    label: 'Deploy Site',
    desc: 'Trigger Vercel redeploy',
    icon: Rocket,
    to: '/admin/deploy',
    color: '#f97316',
    colorBg: 'rgba(249,115,22,0.1)',
  },
];

const STAT_CARDS = [
  { label: 'Homepage Sections', value: '5', sub: 'Editable sections', icon: Edit3, color: T.accent },
  { label: 'Blog Posts (EN)', value: '—', sub: 'Loaded from GitHub', icon: FileText, color: '#60a5fa' },
  { label: 'Blog Posts (BN)', value: '—', sub: 'Loaded from GitHub', icon: Globe2, color: '#f472b6' },
  { label: 'Last Deploy', value: 'Vercel', sub: 'Auto on git push', icon: RefreshCw, color: '#f97316' },
];

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.06 } } },
  item: {
    hidden: { opacity: 0, y: 20 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  },
};

export default function Dashboard() {
  return (
    <div>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: T.text, margin: '0 0 6px', letterSpacing: '-0.03em' }}>
          Welcome back 👋
        </h1>
        <p style={{ color: T.muted, fontSize: '0.88rem', margin: 0 }}>
          Manage your website content, blog posts, and deployments from here.
        </p>
      </motion.div>

      {/* Stats row */}
      <motion.div
        variants={stagger.container}
        initial="hidden"
        animate="show"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}
      >
        {STAT_CARDS.map(({ label, value, sub, icon: Icon, color }) => (
          <motion.div key={label} variants={stagger.item} style={{
            background: T.card,
            border: `1px solid ${T.border}`,
            borderRadius: 14,
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: `${color}18`,
              border: `1px solid ${color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon size={18} color={color} />
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: T.text, lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: '0.78rem', fontWeight: 600, color: T.text, marginTop: 4 }}>{label}</div>
              <div style={{ fontSize: '0.72rem', color: T.muted, marginTop: 2 }}>{sub}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick actions */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <BarChart3 size={16} color={T.muted} />
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: T.muted, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Quick Actions
          </span>
        </div>

        <motion.div
          variants={stagger.container}
          initial="hidden"
          animate="show"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}
        >
          {QUICK_ACTIONS.map(({ label, desc, icon: Icon, to, color, colorBg }) => (
            <motion.div key={to} variants={stagger.item}>
              <Link to={to} style={{ textDecoration: 'none' }}>
                <motion.div
                  whileHover={{ y: -3, borderColor: color }}
                  transition={{ duration: 0.2 }}
                  style={{
                    background: T.card,
                    border: `1px solid ${T.border}`,
                    borderRadius: 14,
                    padding: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: 42, height: 42, borderRadius: 11,
                    background: colorBg,
                    border: `1px solid ${color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={20} color={color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: T.text }}>{label}</div>
                    <div style={{ fontSize: '0.75rem', color: T.muted, marginTop: 2 }}>{desc}</div>
                  </div>
                  <ArrowRight size={15} color={T.muted} />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Info box */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          background: 'rgba(34,197,94,0.06)',
          border: '1px solid rgba(34,197,94,0.2)',
          borderRadius: 12,
          padding: '16px 20px',
          marginTop: 24,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 12,
        }}
      >
        <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>💡</span>
        <div>
          <p style={{ margin: '0 0 4px', fontSize: '0.83rem', fontWeight: 600, color: T.accent }}>
            GitHub-backed persistence
          </p>
          <p style={{ margin: 0, fontSize: '0.78rem', color: T.muted2, lineHeight: 1.6 }}>
            Every save commits changes directly to your GitHub repo. Vercel auto-deploys on every commit — your site updates live within ~60 seconds of saving.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
