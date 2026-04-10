import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff, Lock, AlertCircle } from 'lucide-react';
import { adminApi } from '../../lib/admin/api';
import { auth } from '../../lib/admin/auth';

// ─── Design tokens (carbon dark) ─────────────────────────────────────────────
const T = {
  bg:       '#070b14',
  surface:  '#0d1220',
  card:     'rgba(255,255,255,0.04)',
  border:   'rgba(255,255,255,0.08)',
  accent:   '#22c55e',
  accentBg: 'rgba(34,197,94,0.1)',
  text:     '#f1f5f9',
  muted:    '#64748b',
  error:    '#ef4444',
  errorBg:  'rgba(239,68,68,0.1)',
};

export default function AdminLogin({ onLogin }) {
  const [password, setPassword]   = useState('');
  const [showPw, setShowPw]       = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!password.trim()) return;
    setLoading(true);
    setError('');

    try {
      const { token } = await adminApi.login(password);
      auth.setToken(token);
      onLogin();
    } catch (err) {
      setError(err.status === 401 ? 'Incorrect password. Please try again.' : `Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: T.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: "'Inter', system-ui, sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background glow orbs */}
      <div style={{
        position: 'absolute', top: '20%', left: '30%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '15%', right: '25%',
        width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,197,94,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Grid pattern overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%',
          maxWidth: 420,
          background: T.card,
          border: `1px solid ${T.border}`,
          borderRadius: 20,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          padding: '40px 36px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Logo / Brand */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 20 }}
            style={{
              width: 60, height: 60, borderRadius: 16,
              background: T.accentBg,
              border: `1px solid rgba(34,197,94,0.3)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 0 30px rgba(34,197,94,0.15)',
            }}
          >
            <Shield size={28} color={T.accent} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            style={{ fontSize: '1.35rem', fontWeight: 700, color: T.text, margin: '0 0 6px', letterSpacing: '-0.02em' }}
          >
            Admin Panel
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            style={{ fontSize: '0.8rem', color: T.muted, margin: 0 }}
          >
            Advocate Md. Shah Alam — Website Management
          </motion.p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Password Field */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: T.muted, marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Admin Password
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: T.muted, pointerEvents: 'none' }}>
                <Lock size={15} />
              </div>
              <input
                ref={inputRef}
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                disabled={loading}
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.04)',
                  border: `1.5px solid ${error ? T.error : T.border}`,
                  borderRadius: 10,
                  padding: '12px 44px 12px 42px',
                  color: T.text,
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s ease',
                  fontFamily: 'inherit',
                }}
                onFocus={(e) => { if (!error) e.target.style.borderColor = T.accent; }}
                onBlur={(e) => { if (!error) e.target.style.borderColor = T.border; }}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: T.muted, padding: 4,
                  display: 'flex', alignItems: 'center',
                }}
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: T.errorBg,
                border: `1px solid rgba(239,68,68,0.3)`,
                borderRadius: 8,
                padding: '10px 12px',
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <AlertCircle size={14} color={T.error} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.8rem', color: T.error }}>{error}</span>
            </motion.div>
          )}

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading || !password.trim()}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            style={{
              width: '100%',
              background: loading ? 'rgba(34,197,94,0.4)' : T.accent,
              border: 'none',
              borderRadius: 10,
              padding: '13px',
              color: '#000',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'background 0.2s ease',
              letterSpacing: '-0.01em',
              boxShadow: loading ? 'none' : '0 4px 20px rgba(34,197,94,0.25)',
            }}
          >
            {loading ? (
              <>
                <Spinner />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </motion.button>
        </form>

        {/* Security note */}
        <p style={{ textAlign: 'center', fontSize: '0.7rem', color: T.muted, marginTop: 20, marginBottom: 0 }}>
          🔒 Secure session · Auto-expires in 24h
        </p>
      </motion.div>
    </div>
  );
}

function Spinner() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="50" strokeDashoffset="15" strokeLinecap="round" />
    </svg>
  );
}
