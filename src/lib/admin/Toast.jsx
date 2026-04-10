import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, AlertCircle, Info, X } from 'lucide-react';

// ─── Context ─────────────────────────────────────────────────────────────────

const ToastContext = createContext(null);

// ─── Types ────────────────────────────────────────────────────────────────────

const ICONS = {
  success: CheckCircle2,
  error:   XCircle,
  warning: AlertCircle,
  info:    Info,
};

const COLORS = {
  success: { bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.35)', icon: '#22c55e' },
  error:   { bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.35)', icon: '#ef4444' },
  warning: { bg: 'rgba(234,179,8,0.12)', border: 'rgba(234,179,8,0.35)', icon: '#eab308' },
  info:    { bg: 'rgba(96,165,250,0.12)', border: 'rgba(96,165,250,0.35)', icon: '#60a5fa' },
};

// ─── Single Toast ─────────────────────────────────────────────────────────────

function Toast({ id, type = 'info', message, onDismiss }) {
  const Icon = ICONS[type];
  const colors = COLORS[type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 60, scale: 0.92 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.88, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      style={{
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '12px',
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        maxWidth: '360px',
        width: '100%',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        cursor: 'default',
        pointerEvents: 'all',
      }}
    >
      <Icon size={18} style={{ color: colors.icon, flexShrink: 0, marginTop: 1 }} />
      <span style={{ color: '#f1f5f9', fontSize: '0.875rem', lineHeight: 1.5, flex: 1 }}>
        {message}
      </span>
      <button
        onClick={() => onDismiss(id)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: 0, flexShrink: 0 }}
      >
        <X size={14} />
      </button>
    </motion.div>
  );
}

// ─── Provider + Container ─────────────────────────────────────────────────────

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) =>
    setToasts((prev) => prev.filter((t) => t.id !== id)),
  []);

  const toast = useCallback((message, type = 'info', duration = 4000) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    if (duration > 0) {
      setTimeout(() => dismiss(id), duration);
    }
    return id;
  }, [dismiss]);

  // Shorthand helpers
  toast.success = (msg, d) => toast(msg, 'success', d);
  toast.error   = (msg, d) => toast(msg, 'error',   d);
  toast.warning = (msg, d) => toast(msg, 'warning', d);
  toast.info    = (msg, d) => toast(msg, 'info',    d);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Fixed toast container */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'flex-end',
        pointerEvents: 'none',
      }}>
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <Toast key={t.id} {...t} onDismiss={dismiss} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

/** Hook to access the toast function */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
