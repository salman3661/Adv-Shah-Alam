import React, { useState } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Home, FileText, Globe2, Settings,
  Rocket, LogOut, Menu, X, ChevronRight,
} from 'lucide-react';
import { auth } from '../../lib/admin/auth';

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  bg:      '#070b14',
  sidebar: '#0a0f1c',
  card:    'rgba(255,255,255,0.04)',
  border:  'rgba(255,255,255,0.07)',
  accent:  '#22c55e',
  accentBg:'rgba(34,197,94,0.1)',
  text:    '#f1f5f9',
  muted:   '#64748b',
  hover:   'rgba(255,255,255,0.05)',
};

const NAV_ITEMS = [
  { path: '/admin',            label: 'Dashboard',     icon: LayoutDashboard, exact: true },
  { path: '/admin/homepage',   label: 'Homepage Editor', icon: Home },
  { path: '/admin/blog',       label: 'Blog (English)',  icon: FileText },
  { path: '/admin/blog-bn',    label: 'Blog (Bangla)',   icon: Globe2 },
  { path: '/admin/settings',   label: 'Site Settings',  icon: Settings },
  { path: '/admin/deploy',     label: 'Deploy',          icon: Rocket },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleLogout() {
    auth.clearToken();
    navigate('/admin', { replace: true });
    window.location.reload();
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: T.bg,
      display: 'flex',
      fontFamily: "'Inter', system-ui, sans-serif",
      color: T.text,
    }}>
      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
              zIndex: 40, display: 'none',
            }}
            className="admin-mobile-overlay"
          />
        )}
      </AnimatePresence>

      {/* ── Sidebar ── */}
      <aside style={{
        width: 240,
        background: T.sidebar,
        borderRight: `1px solid ${T.border}`,
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0, left: 0, bottom: 0,
        zIndex: 50,
        flexShrink: 0,
      }}>
        {/* Brand */}
        <div style={{ padding: '24px 20px 20px', borderBottom: `1px solid ${T.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: T.accentBg,
              border: `1px solid rgba(34,197,94,0.25)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ fontSize: '1rem' }}>⚖️</span>
            </div>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: T.text, lineHeight: 1.2 }}>
                Admin Panel
              </div>
              <div style={{ fontSize: '0.68rem', color: T.muted, lineHeight: 1 }}>
                Shah Alam Website
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, color: T.muted, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '8px 10px 6px', margin: 0 }}>
            Navigation
          </p>
          {NAV_ITEMS.map(({ path, label, icon: Icon, exact }) => (
            <NavLink
              key={path}
              to={path}
              end={exact}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 10px',
                borderRadius: 9,
                marginBottom: 2,
                textDecoration: 'none',
                fontSize: '0.84rem',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? T.accent : T.text,
                background: isActive ? T.accentBg : 'transparent',
                border: `1px solid ${isActive ? 'rgba(34,197,94,0.2)' : 'transparent'}`,
                transition: 'all 0.18s ease',
              })}
              onMouseEnter={(e) => {
                if (!e.currentTarget.style.background.includes('accentBg') && !e.currentTarget.getAttribute('aria-current')) {
                  e.currentTarget.style.background = T.hover;
                }
              }}
              onMouseLeave={(e) => {
                if (!e.currentTarget.getAttribute('aria-current')) {
                  // NavLink handles active styling
                }
              }}
            >
              {({ isActive }) => (
                <>
                  <Icon size={16} style={{ flexShrink: 0, color: isActive ? T.accent : T.muted }} />
                  <span style={{ flex: 1 }}>{label}</span>
                  {isActive && <ChevronRight size={12} style={{ flexShrink: 0 }} />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: '12px 10px', borderTop: `1px solid ${T.border}` }}>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              width: '100%', background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: 9, padding: '9px 10px', cursor: 'pointer',
              color: '#f87171', fontSize: '0.84rem', fontWeight: 500,
              transition: 'all 0.18s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.15)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; }}
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main content area ── */}
      <main style={{
        flex: 1,
        marginLeft: 240,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Top bar */}
        <header style={{
          height: 56,
          background: 'rgba(10,15,28,0.8)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${T.border}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 28px',
          position: 'sticky',
          top: 0,
          zIndex: 30,
          gap: 12,
        }}>
          {/* Live badge */}
          <div style={{
            marginLeft: 'auto',
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(34,197,94,0.1)',
            border: '1px solid rgba(34,197,94,0.25)',
            borderRadius: 20, padding: '4px 10px',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: T.accent, animation: 'pulse-dot 2s ease-in-out infinite' }} />
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: T.accent }}>Live</span>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: T.card,
              border: `1px solid ${T.border}`,
              borderRadius: 8, padding: '5px 12px',
              color: T.muted, textDecoration: 'none',
              fontSize: '0.75rem', fontWeight: 500,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = T.text; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = T.muted; }}
          >
            View Site ↗
          </a>
        </header>

        {/* Page content */}
        <div style={{ flex: 1, padding: '28px', maxWidth: 1200, width: '100%' }}>
          <style>{`
            @keyframes pulse-dot {
              0%,100% { opacity:1; transform:scale(1); }
              50% { opacity:0.6; transform:scale(0.8); }
            }
            .admin-mobile-overlay { display: none; }
            @media (max-width: 768px) {
              .admin-mobile-overlay { display: block !important; }
            }
          `}</style>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
