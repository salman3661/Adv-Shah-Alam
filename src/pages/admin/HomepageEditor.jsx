import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, RefreshCw, AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';
import { adminApi } from '../../lib/admin/api';
import { useToast } from '../../lib/admin/Toast';
import HeroEditor      from './editors/HeroEditor';
import ServicesEditor  from './editors/ServicesEditor';
import FaqEditor       from './editors/FaqEditor';
import SiteInfoEditor  from './editors/SiteInfoEditor';
import AboutEditor     from './editors/AboutEditor';

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  bg:       '#070b14',
  card:     'rgba(255,255,255,0.04)',
  border:   'rgba(255,255,255,0.07)',
  accent:   '#22c55e',
  accentBg: 'rgba(34,197,94,0.1)',
  text:     '#f1f5f9',
  muted:    '#64748b',
  muted2:   '#94a3b8',
};

// ─── Tabs config ──────────────────────────────────────────────────────────────
const TABS = [
  { id: 'hero',     label: '🏠 Hero',     fileKey: 'hero',     Editor: HeroEditor },
  { id: 'services', label: '⚖️ Services',  fileKey: 'services', Editor: ServicesEditor },
  { id: 'faq',      label: '❓ FAQ',       fileKey: 'faq',      Editor: FaqEditor },
  { id: 'about',    label: '👤 About',     fileKey: 'about',    Editor: AboutEditor },
  { id: 'siteInfo', label: '⚙️ Site Info', fileKey: 'siteInfo', Editor: SiteInfoEditor },
];

// ─── Save button states ───────────────────────────────────────────────────────
function SaveBar({ dirty, saving, saved, onSave, onReset }) {
  if (!dirty && !saved) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="savebar"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        style={{
          position: 'sticky',
          top: 60,
          zIndex: 20,
          background: dirty
            ? 'rgba(234,179,8,0.1)'
            : 'rgba(34,197,94,0.1)',
          border: `1px solid ${dirty ? 'rgba(234,179,8,0.3)' : 'rgba(34,197,94,0.3)'}`,
          borderRadius: 12,
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 20,
          backdropFilter: 'blur(10px)',
        }}
      >
        {dirty && !saving && <AlertTriangle size={16} color="#eab308" />}
        {saving && <Loader2 size={16} color={T.accent} style={{ animation: 'spin 1s linear infinite' }} />}
        {saved && !dirty && <CheckCircle2 size={16} color={T.accent} />}

        <span style={{ flex: 1, fontSize: '0.84rem', color: T.text, fontWeight: 500 }}>
          {saving ? 'Committing to GitHub...'
            : saved && !dirty ? 'Saved successfully ✓ — Site will redeploy in ~60s'
            : 'You have unsaved changes'}
        </span>

        {dirty && (
          <>
            <button onClick={onReset} disabled={saving}
              style={{ background: 'none', border: `1px solid ${T.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', color: T.muted, fontSize: '0.8rem' }}>
              Reset
            </button>
            <button onClick={onSave} disabled={saving}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: T.accent, border: 'none', borderRadius: 8,
                padding: '7px 18px', cursor: saving ? 'not-allowed' : 'pointer',
                color: '#000', fontSize: '0.82rem', fontWeight: 700,
                opacity: saving ? 0.6 : 1,
              }}>
              <Save size={14} /> Save & Deploy
            </button>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HomepageEditor() {
  const toast = useToast();

  const [activeTab, setActiveTab]   = useState('hero');
  const [states, setStates]         = useState({}); // { [fileKey]: { content, sha, original } }
  const [loading, setLoading]       = useState({});
  const [saving, setSaving]         = useState(false);
  const [savedKey, setSavedKey]     = useState(null);

  const currentTab = TABS.find((t) => t.id === activeTab);

  // ── Load tab data when switching ──────────────────────────────────────────
  const load = useCallback(async (fileKey) => {
    if (states[fileKey]?.content) return; // already loaded
    setLoading((prev) => ({ ...prev, [fileKey]: true }));
    try {
      const { content, sha } = await adminApi.loadContent(fileKey);
      setStates((prev) => ({
        ...prev,
        [fileKey]: { content, sha, original: JSON.parse(JSON.stringify(content)) },
      }));
    } catch (err) {
      toast.error(`Failed to load ${fileKey}: ${err.message}`);
    } finally {
      setLoading((prev) => ({ ...prev, [fileKey]: false }));
    }
  }, [states, toast]);

  useEffect(() => {
    load(currentTab.fileKey);
  }, [activeTab]); // eslint-disable-line

  // ── Unsaved-changes detection ─────────────────────────────────────────────
  const isDirty = useCallback((fileKey) => {
    const s = states[fileKey];
    if (!s) return false;
    return JSON.stringify(s.content) !== JSON.stringify(s.original);
  }, [states]);

  const dirty = isDirty(currentTab?.fileKey);

  // ── Warn before leaving with unsaved changes ───────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (TABS.some((t) => isDirty(t.fileKey))) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [isDirty]);

  // ── Save handler ──────────────────────────────────────────────────────────
  async function handleSave() {
    const fk = currentTab.fileKey;
    const s = states[fk];
    if (!s || !isDirty(fk)) return;

    setSaving(true);
    try {
      const result = await adminApi.saveContent(fk, s.content, s.sha);
      // Update sha and mark as saved
      setStates((prev) => ({
        ...prev,
        [fk]: { ...prev[fk], sha: result.sha, original: JSON.parse(JSON.stringify(s.content)) },
      }));
      setSavedKey(fk);
      toast.success(`${currentTab.label} saved! Vercel will redeploy in ~60s.`);
    } catch (err) {
      toast.error(`Save failed: ${err.message}`);
    } finally {
      setSaving(false);
    }
  }

  // ── Reset handler ─────────────────────────────────────────────────────────
  function handleReset() {
    const fk = currentTab.fileKey;
    if (!window.confirm('Discard all unsaved changes to this section?')) return;
    setStates((prev) => ({
      ...prev,
      [fk]: { ...prev[fk], content: JSON.parse(JSON.stringify(prev[fk].original)) },
    }));
  }

  // ── Content change handler ────────────────────────────────────────────────
  function handleContentChange(fileKey, newContent) {
    setStates((prev) => ({
      ...prev,
      [fileKey]: { ...prev[fileKey], content: newContent },
    }));
    if (savedKey === fileKey) setSavedKey(null);
  }

  const s = states[currentTab?.fileKey];
  const isLoading = loading[currentTab?.fileKey];
  const isSaved = savedKey === currentTab?.fileKey && !dirty;

  return (
    <div>
      {/* Page header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: T.text, margin: '0 0 6px', letterSpacing: '-0.03em' }}>
          Homepage Editor
        </h1>
        <p style={{ color: T.muted, fontSize: '0.85rem', margin: 0 }}>
          Edit every section of your homepage. Changes are committed to GitHub and automatically trigger a site redeploy.
        </p>
      </motion.div>

      {/* Tab bar */}
      <div style={{
        display: 'flex', gap: 4, flexWrap: 'wrap',
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${T.border}`,
        borderRadius: 12, padding: 4, marginBottom: 24,
      }}>
        {TABS.map((tab) => {
          const tabDirty = isDirty(tab.fileKey);
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 16px',
                borderRadius: 9,
                border: 'none',
                background: isActive ? T.accentBg : 'transparent',
                color: isActive ? T.accent : T.muted,
                fontSize: '0.82rem',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.18s ease',
                position: 'relative',
              }}
            >
              {tab.label}
              {tabDirty && (
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#eab308',
                  position: 'absolute', top: 6, right: 6,
                }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Save bar */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <SaveBar
        dirty={dirty}
        saving={saving}
        saved={isSaved}
        onSave={handleSave}
        onReset={handleReset}
      />

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
        >
          {isLoading && (
            <div style={{ textAlign: 'center', padding: '48px', color: T.muted }}>
              <Loader2 size={28} style={{ animation: 'spin 1s linear infinite', color: T.accent, marginBottom: 12 }} />
              <p style={{ margin: 0, fontSize: '0.85rem' }}>Loading content from GitHub...</p>
            </div>
          )}

          {!isLoading && !s?.content && (
            <div style={{ textAlign: 'center', padding: '48px', color: T.muted }}>
              <p style={{ margin: '0 0 12px' }}>Failed to load content.</p>
              <button onClick={() => load(currentTab.fileKey)} style={{
                display: 'flex', alignItems: 'center', gap: 6, margin: '0 auto',
                background: T.accentBg, border: '1px solid rgba(34,197,94,0.3)',
                borderRadius: 8, padding: '8px 16px', cursor: 'pointer', color: T.accent,
              }}>
                <RefreshCw size={14} /> Retry
              </button>
            </div>
          )}

          {!isLoading && s?.content && currentTab && (
            <currentTab.Editor
              data={s.content}
              onChange={(newContent) => handleContentChange(currentTab.fileKey, newContent)}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
