import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, CheckCircle2, XCircle, Loader2, GitBranch, ExternalLink, AlertTriangle } from 'lucide-react';
import { adminApi } from '../../lib/admin/api';
import { useToast } from '../../lib/admin/Toast';

const T = {
  card:    'rgba(255,255,255,0.04)',
  border:  'rgba(255,255,255,0.07)',
  accent:  '#22c55e',
  accentBg:'rgba(34,197,94,0.1)',
  text:    '#f1f5f9',
  muted:   '#64748b',
  muted2:  '#94a3b8',
};

const STEPS = [
  { label: 'Trigger deploy hook',  desc: 'Sends a POST to your Vercel deploy webhook'     },
  { label: 'Vercel builds site',   desc: 'Vercel clones your repo and runs npm run build'  },
  { label: 'CDN propagation',      desc: 'New build goes live on Vercel Edge Network'       },
];

export default function DeployPanel() {
  const toast = useToast();
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [deployTime, setDeployTime] = useState(null);

  async function handleDeploy() {
    if (!window.confirm('Trigger a full Vercel redeploy now?')) return;
    setStatus('loading');
    setErrorMsg('');
    try {
      await adminApi.triggerDeploy();
      setStatus('success');
      setDeployTime(new Date().toLocaleTimeString());
      toast.success('Deploy triggered! Your site will be live in ~60 seconds.');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
      toast.error(`Deploy failed: ${err.message}`);
    }
  }

  return (
    <div>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: T.text, margin: '0 0 6px', letterSpacing: '-0.03em', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Rocket size={22} color={T.accent} />
          Deploy
        </h1>
        <p style={{ color: T.muted, fontSize: '0.85rem', margin: 0 }}>
          Manually trigger a Vercel redeploy. Normally this happens automatically when you save content.
        </p>
      </motion.div>

      {/* Info card */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          background: T.card,
          border: `1px solid ${T.border}`,
          borderRadius: 14,
          padding: '24px',
          marginBottom: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <GitBranch size={16} color={T.accent} />
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: T.text }}>Deploy Flow</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {STEPS.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{
                  width: 26, height: 26, borderRadius: '50%',
                  background: T.accentBg,
                  border: `1px solid rgba(34,197,94,0.3)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.72rem', fontWeight: 700, color: T.accent,
                }}>
                  {i + 1}
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ width: 1, height: 28, background: T.border, margin: '3px 0' }} />
                )}
              </div>
              <div style={{ paddingTop: 4, paddingBottom: i < STEPS.length - 1 ? 14 : 0 }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: T.text, marginBottom: 2 }}>{step.label}</div>
                <div style={{ fontSize: '0.78rem', color: T.muted }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Action area */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          background: T.card,
          border: `1px solid ${T.border}`,
          borderRadius: 14,
          padding: '28px',
          textAlign: 'center',
        }}
      >
        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🚀</div>
              <p style={{ color: T.muted, fontSize: '0.88rem', marginBottom: 24 }}>
                Click the button below to trigger an immediate Vercel redeploy.<br/>
                Your site will be updated in approximately <strong style={{ color: T.text }}>60–90 seconds</strong>.
              </p>
              <button onClick={handleDeploy}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: T.accent,
                  border: 'none', borderRadius: 12,
                  padding: '14px 32px',
                  color: '#000', fontWeight: 700, fontSize: '0.95rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 24px rgba(34,197,94,0.3)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(34,197,94,0.4)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(34,197,94,0.3)'; }}
              >
                <Rocket size={18} /> Trigger Redeploy
              </button>
            </motion.div>
          )}

          {status === 'loading' && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Loader2 size={40} color={T.accent} style={{ animation: 'spin 1s linear infinite', marginBottom: 16 }} />
              <p style={{ color: T.muted, fontSize: '0.88rem', margin: 0 }}>Triggering deploy...</p>
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <CheckCircle2 size={44} color={T.accent} style={{ marginBottom: 12 }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: T.text, margin: '0 0 8px' }}>Deploy Triggered!</h3>
              <p style={{ color: T.muted, fontSize: '0.85rem', marginBottom: 20 }}>
                Triggered at {deployTime} — Your site should be live within 60–90 seconds.
              </p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="https://vercel.com/dashboard" target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    background: T.accentBg, border: '1px solid rgba(34,197,94,0.3)',
                    borderRadius: 9, padding: '9px 18px',
                    color: T.accent, textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600,
                  }}>
                  <ExternalLink size={13} /> View on Vercel
                </a>
                <button onClick={() => setStatus('idle')}
                  style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 9, padding: '9px 18px', cursor: 'pointer', color: T.muted, fontSize: '0.82rem' }}>
                  Deploy Again
                </button>
              </div>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div key="error" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <XCircle size={44} color="#ef4444" style={{ marginBottom: 12 }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: T.text, margin: '0 0 8px' }}>Deploy Failed</h3>
              <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 8, padding: '10px 14px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <AlertTriangle size={14} color="#ef4444" />
                <span style={{ fontSize: '0.8rem', color: '#ef4444' }}>{errorMsg}</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: T.muted, marginBottom: 16 }}>
                Make sure <code style={{ color: T.text }}>VERCEL_DEPLOY_HOOK</code> is set in your Vercel environment variables.
              </p>
              <button onClick={() => setStatus('idle')}
                style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 9, padding: '9px 18px', cursor: 'pointer', color: T.muted, fontSize: '0.82rem' }}>
                Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </motion.div>
    </div>
  );
}
