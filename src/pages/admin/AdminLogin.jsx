import React, { useState, useRef, useEffect } from 'react';
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
  const [honeypot, setHoneypot]   = useState('');
  const [showPw, setShowPw]       = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');
  const [lockedUntil, setLockedUntil] = useState(0);
  const inputRef = useRef(null);
  const mountedAt = useRef(Date.now());

  useEffect(() => { inputRef.current?.focus(); }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!password.trim()) return;

    const now = Date.now();
    if (lockedUntil > now) {
      const waitSec = Math.ceil((lockedUntil - now) / 1000);
      setError(`Too many attempts. Please wait ${waitSec}s before trying again.`);
      return;
    }

    // Block automated bot submissions faster than 400ms after mount
    if (now - mountedAt.current < 400) {
      setError('Please wait a moment and try again.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { token } = await adminApi.login(password, honeypot);
      auth.setToken(token);
      onLogin();
    } catch (err) {
      if (err.status === 429) {
        setLockedUntil(Date.now() + 60_000);
        setError(err.message || 'Too many failed attempts. Temporarily locked.');
      } else if (err.status === 401) {
        setError('Incorrect password. Please try again.');
      } else {
        setError(`Error: ${err.message}`);
      }
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
      fontFamily: "system-ui, -apple-system, sans-serif",
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

      <div
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
          <div
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
          </div>

          <h1
            style={{ fontSize: '1.35rem', fontWeight: 700, color: T.text, margin: '0 0 6px', letterSpacing: '-0.02em' }}
          >
            Admin Panel
          </h1>
          <p
            style={{ fontSize: '0.8rem', color: T.muted, margin: 0 }}
          >
            Advocate Md. Shah Alam — Website Management
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} autoComplete="off">
          {/* Honeypot field — hidden from humans, traps automated bots */}
          <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden', opacity: 0, pointerEvents: 'none' }}>
            <label htmlFor="admin-website-hp">Website</label>
            <input
              id="admin-website-hp"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

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
                maxLength={256}
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
            <div
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
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !password.trim()}
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
              transition: 'background 0.2s ease, transform 0.15s ease',
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
          </button>
        </form>

        {/* Security note */}
        <p style={{ textAlign: 'center', fontSize: '0.7rem', color: T.muted, marginTop: 20, marginBottom: 0 }}>
          🔒 Brute-force protected · Session auto-expires in 24h
        </p>
      </div>
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
