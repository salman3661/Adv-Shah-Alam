import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Home, FileText, Globe2, Settings,
  Rocket, LogOut, Menu, X, ChevronRight, BarChart2,
  PanelLeftClose, PanelLeftOpen,
} from 'lucide-react';
import { auth } from '../../lib/admin/auth';

// ─── Design tokens ─────────────────────────────────────────────────────────
const T = {
  bg:        '#070b14',
  sidebar:   '#0a0f1c',
  card:      'rgba(255,255,255,0.04)',
  border:    'rgba(255,255,255,0.07)',
  accent:    '#22c55e',
  accentBg:  'rgba(34,197,94,0.1)',
  text:      '#f1f5f9',
  muted:     '#64748b',
  hover:     'rgba(255,255,255,0.05)',
  overlay:   'rgba(0,0,0,0.65)',
};

const SIDEBAR_EXPANDED_W  = 240;
const SIDEBAR_COLLAPSED_W = 60;
const MOBILE_BREAKPOINT   = 768;

const NAV_ITEMS = [
  { path: '/admin',               label: 'Dashboard',       icon: LayoutDashboard, exact: true },
  { path: '/admin/homepage',      label: 'Homepage Editor', icon: Home },
  { path: '/admin/blog',          label: 'Blog (English)',  icon: FileText },
  { path: '/admin/blog-bn',       label: 'Blog (Bangla)',   icon: Globe2 },
  { path: '/admin/blog-analytics',label: 'Blog Analytics',  icon: BarChart2 },
  { path: '/admin/deploy',        label: 'Deploy',          icon: Rocket },
];

// ─── Tooltip for collapsed mode ────────────────────────────────────────────
function NavTooltip({ label, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -4 }}
          transition={{ duration: 0.14 }}
          style={{
            position: 'absolute',
            left: SIDEBAR_COLLAPSED_W + 8,
            top: '50%',
            transform: 'translateY(-50%)',
            background: '#1e293b',
            border: `1px solid ${T.border}`,
            borderRadius: 7,
            padding: '5px 10px',
            fontSize: '0.78rem',
            fontWeight: 600,
            color: T.text,
            whiteSpace: 'nowrap',
            zIndex: 200,
            pointerEvents: 'none',
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          }}
        >
          {label}
          {/* Arrow */}
          <div style={{
            position: 'absolute', left: -5, top: '50%', transform: 'translateY(-50%)',
            width: 0, height: 0,
            borderTop: '5px solid transparent',
            borderBottom: '5px solid transparent',
            borderRight: `5px solid #1e293b`,
          }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Single nav item ────────────────────────────────────────────────────────
function NavItem({ path, label, icon: Icon, exact, collapsed, onNavClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ position: 'relative' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <NavLink
        to={path}
        end={exact}
        onClick={onNavClick}
        style={({ isActive }) => ({
          display: 'flex',
          alignItems: 'center',
          gap: collapsed ? 0 : 10,
          padding: collapsed ? '10px 0' : '9px 10px',
          justifyContent: collapsed ? 'center' : 'flex-start',
          borderRadius: 9,
          marginBottom: 2,
          textDecoration: 'none',
          fontSize: '0.84rem',
          fontWeight: isActive ? 600 : 400,
          color: isActive ? T.accent : T.text,
          background: isActive ? T.accentBg : hovered ? T.hover : 'transparent',
          border: `1px solid ${isActive ? 'rgba(34,197,94,0.2)' : 'transparent'}`,
          transition: 'all 0.18s ease',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        })}
      >
        {({ isActive }) => (
          <>
            <Icon size={16} style={{ flexShrink: 0, color: isActive ? T.accent : T.muted }} />
            {!collapsed && (
              <>
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</span>
                {isActive && <ChevronRight size={12} style={{ flexShrink: 0 }} />}
              </>
            )}
          </>
        )}
      </NavLink>
      {/* Tooltip — only show when collapsed on desktop */}
      {collapsed && <NavTooltip label={label} visible={hovered} />}
    </div>
  );
}

// ─── Main AdminLayout ───────────────────────────────────────────────────────
export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // ── State ──
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);

  // Desktop: collapsed/expanded (persisted)
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem('admin-sidebar-collapsed') === 'true'; }
    catch { return false; }
  });

  // Mobile: drawer open/closed
  const [drawerOpen, setDrawerOpen] = useState(false);

  const overlayRef = useRef(null);

  // ── Responsive listener ──
  useEffect(() => {
    function onResize() {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      if (!mobile) setDrawerOpen(false); // close drawer on desktop resize
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Close drawer on route change (mobile)
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  // ── Toggle logic ──
  function toggleSidebar() {
    if (isMobile) {
      setDrawerOpen(d => !d);
    } else {
      setCollapsed(c => {
        const next = !c;
        try { localStorage.setItem('admin-sidebar-collapsed', String(next)); } catch {}
        return next;
      });
    }
  }

  function handleLogout() {
    auth.clearToken();
    navigate('/admin', { replace: true });
    window.location.reload();
  }

  // ── Sidebar width (desktop only) ──
  const sidebarW = isMobile ? SIDEBAR_EXPANDED_W : (collapsed ? SIDEBAR_COLLAPSED_W : SIDEBAR_EXPANDED_W);

  // ── Sidebar content (shared between desktop and mobile drawer) ──
  const SidebarContent = ({ insideDrawer = false }) => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Brand */}
      <div style={{
        padding: collapsed && !insideDrawer ? '20px 0' : '20px 16px',
        borderBottom: `1px solid ${T.border}`,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        justifyContent: collapsed && !insideDrawer ? 'center' : 'flex-start',
        overflow: 'hidden',
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 9,
          background: T.accentBg,
          border: '1px solid rgba(34,197,94,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{ fontSize: '0.9rem' }}>⚖️</span>
        </div>
        {(!collapsed || insideDrawer) && (
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: T.text, lineHeight: 1.2, whiteSpace: 'nowrap' }}>
              Admin Panel
            </div>
            <div style={{ fontSize: '0.68rem', color: T.muted, lineHeight: 1, whiteSpace: 'nowrap' }}>
              Shah Alam Website
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{
        flex: 1,
        padding: collapsed && !insideDrawer ? '12px 6px' : '12px 10px',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}>
        {(!collapsed || insideDrawer) && (
          <p style={{
            fontSize: '0.63rem', fontWeight: 700, color: T.muted,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '6px 4px 6px', margin: 0,
          }}>
            Navigation
          </p>
        )}
        {NAV_ITEMS.map(item => (
          <NavItem
            key={item.path}
            {...item}
            collapsed={collapsed && !insideDrawer}
            onNavClick={insideDrawer ? () => setDrawerOpen(false) : undefined}
          />
        ))}
      </nav>

      {/* Logout */}
      <div style={{
        padding: collapsed && !insideDrawer ? '10px 6px' : '10px 10px',
        borderTop: `1px solid ${T.border}`,
      }}>
        <button
          onClick={handleLogout}
          title="Sign Out"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: collapsed && !insideDrawer ? 0 : 10,
            justifyContent: collapsed && !insideDrawer ? 'center' : 'flex-start',
            width: '100%',
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.2)',
            borderRadius: 9,
            padding: collapsed && !insideDrawer ? '9px 0' : '9px 10px',
            cursor: 'pointer',
            color: '#f87171',
            fontSize: '0.84rem',
            fontWeight: 500,
            transition: 'all 0.18s ease',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.15)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; }}
        >
          <LogOut size={15} style={{ flexShrink: 0 }} />
          {(!collapsed || insideDrawer) && <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: T.bg,
      display: 'flex',
      fontFamily: "'Inter', system-ui, sans-serif",
      color: T.text,
    }}>

      {/* ── MOBILE: Overlay ── */}
      <AnimatePresence>
        {isMobile && drawerOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setDrawerOpen(false)}
            style={{
              position: 'fixed', inset: 0,
              background: T.overlay,
              zIndex: 998,
            }}
          />
        )}
      </AnimatePresence>

      {/* ── MOBILE: Slide-in drawer ── */}
      {isMobile && (
        <AnimatePresence>
          {drawerOpen && (
            <motion.aside
              key="drawer"
              initial={{ x: -SIDEBAR_EXPANDED_W }}
              animate={{ x: 0 }}
              exit={{ x: -SIDEBAR_EXPANDED_W }}
              transition={{ type: 'spring', stiffness: 340, damping: 30 }}
              style={{
                position: 'fixed',
                top: 0, left: 0, bottom: 0,
                width: SIDEBAR_EXPANDED_W,
                background: T.sidebar,
                borderRight: `1px solid ${T.border}`,
                zIndex: 999,
                display: 'flex', flexDirection: 'column',
              }}
            >
              {/* Drawer close button */}
              <button
                onClick={() => setDrawerOpen(false)}
                style={{
                  position: 'absolute', top: 12, right: 12,
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: T.muted, padding: 6, borderRadius: 6,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                aria-label="Close sidebar"
              >
                <X size={18} />
              </button>
              <SidebarContent insideDrawer />
            </motion.aside>
          )}
        </AnimatePresence>
      )}

      {/* ── DESKTOP: Persistent sidebar (animated width) ── */}
      {!isMobile && (
        <motion.aside
          animate={{ width: sidebarW }}
          transition={{ type: 'spring', stiffness: 340, damping: 30 }}
          style={{
            background: T.sidebar,
            borderRight: `1px solid ${T.border}`,
            position: 'fixed',
            top: 0, left: 0, bottom: 0,
            zIndex: 50,
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <SidebarContent />
        </motion.aside>
      )}

      {/* ── Main content ── */}
      <motion.main
        animate={{ marginLeft: isMobile ? 0 : sidebarW }}
        transition={{ type: 'spring', stiffness: 340, damping: 30 }}
        style={{
          flex: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ── Top bar ── */}
        <header style={{
          height: 56,
          background: 'rgba(10,15,28,0.85)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: `1px solid ${T.border}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          position: 'sticky',
          top: 0,
          zIndex: 30,
          gap: 10,
        }}>
          {/* Hamburger */}
          <button
            onClick={toggleSidebar}
            aria-label={isMobile ? (drawerOpen ? 'Close menu' : 'Open menu') : (collapsed ? 'Expand sidebar' : 'Collapse sidebar')}
            title={isMobile ? 'Toggle menu' : (collapsed ? 'Expand sidebar' : 'Collapse sidebar')}
            style={{
              background: 'none',
              border: `1px solid ${T.border}`,
              borderRadius: 8,
              padding: '6px 8px',
              cursor: 'pointer',
              color: T.muted,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.18s ease',
              flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = T.hover; e.currentTarget.style.color = T.text; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = T.muted; }}
          >
            {isMobile
              ? (drawerOpen ? <X size={18} /> : <Menu size={18} />)
              : (collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />)
            }
          </button>

          {/* Page title — breadcrumb */}
          <span style={{ fontSize: '0.8rem', color: T.muted, fontWeight: 500, flexShrink: 0 }}>
            {NAV_ITEMS.find(n => n.exact ? location.pathname === n.path : location.pathname.startsWith(n.path))?.label ?? 'Admin'}
          </span>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Live badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(34,197,94,0.08)',
            border: '1px solid rgba(34,197,94,0.2)',
            borderRadius: 20, padding: '4px 10px',
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: T.accent,
              animation: 'pulse-dot 2s ease-in-out infinite',
            }} />
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: T.accent }}>Live</span>
          </div>

          {/* View site */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: T.card,
              border: `1px solid ${T.border}`,
              borderRadius: 8, padding: '5px 11px',
              color: T.muted, textDecoration: 'none',
              fontSize: '0.75rem', fontWeight: 500,
              transition: 'color 0.18s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = T.text; }}
            onMouseLeave={e => { e.currentTarget.style.color = T.muted; }}
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
            /* Scrollbar inside sidebar nav */
            nav::-webkit-scrollbar { width: 4px; }
            nav::-webkit-scrollbar-track { background: transparent; }
            nav::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
          `}</style>
          <Outlet />
        </div>
      </motion.main>
    </div>
  );
}
