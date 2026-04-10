import React from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';

// ─── Shared design tokens ─────────────────────────────────────────────────────
export const T = {
  bg:       '#070b14',
  surface:  '#0d1220',
  card:     'rgba(255,255,255,0.04)',
  border:   'rgba(255,255,255,0.07)',
  borderFocus: 'rgba(34,197,94,0.5)',
  accent:   '#22c55e',
  accentBg: 'rgba(34,197,94,0.1)',
  text:     '#f1f5f9',
  muted:    '#64748b',
  muted2:   '#94a3b8',
  error:    '#ef4444',
  danger:   'rgba(239,68,68,0.08)',
  dangerBorder: 'rgba(239,68,68,0.25)',
};

// ─── Field wrapper ─────────────────────────────────────────────────────────────
export function Field({ label, hint, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      {label && (
        <label style={{
          display: 'block',
          fontSize: '0.72rem',
          fontWeight: 700,
          color: T.muted,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 7,
        }}>
          {label}
        </label>
      )}
      {children}
      {hint && (
        <p style={{ margin: '6px 0 0', fontSize: '0.7rem', color: T.muted, lineHeight: 1.5 }}>{hint}</p>
      )}
    </div>
  );
}

// ─── Text input ───────────────────────────────────────────────────────────────
export function Input({ value, onChange, placeholder, disabled, style = {} }) {
  return (
    <input
      type="text"
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      style={{
        width: '100%',
        background: 'rgba(255,255,255,0.04)',
        border: `1.5px solid ${T.border}`,
        borderRadius: 9,
        padding: '10px 13px',
        color: T.text,
        fontSize: '0.875rem',
        outline: 'none',
        boxSizing: 'border-box',
        fontFamily: 'inherit',
        transition: 'border-color 0.2s ease',
        ...style,
      }}
      onFocus={(e) => { e.target.style.borderColor = T.accent; }}
      onBlur={(e) => { e.target.style.borderColor = T.border; }}
    />
  );
}

// ─── Textarea ─────────────────────────────────────────────────────────────────
export function Textarea({ value, onChange, placeholder, rows = 3, disabled }) {
  return (
    <textarea
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      style={{
        width: '100%',
        background: 'rgba(255,255,255,0.04)',
        border: `1.5px solid ${T.border}`,
        borderRadius: 9,
        padding: '10px 13px',
        color: T.text,
        fontSize: '0.875rem',
        outline: 'none',
        boxSizing: 'border-box',
        fontFamily: 'inherit',
        resize: 'vertical',
        lineHeight: 1.6,
        transition: 'border-color 0.2s ease',
      }}
      onFocus={(e) => { e.target.style.borderColor = T.accent; }}
      onBlur={(e) => { e.target.style.borderColor = T.border; }}
    />
  );
}

// ─── Section card wrapper ─────────────────────────────────────────────────────
export function SectionCard({ title, children }) {
  return (
    <div style={{
      background: T.card,
      border: `1px solid ${T.border}`,
      borderRadius: 14,
      padding: '22px 24px',
      marginBottom: 20,
    }}>
      {title && (
        <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: T.accent, margin: '0 0 18px', letterSpacing: '-0.01em' }}>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

// ─── Array item row (for tags / list items) ───────────────────────────────────
export function ArrayRow({ items, onChange, placeholder = 'Add item...' }) {
  function update(i, val) {
    const next = [...items];
    next[i] = val;
    onChange(next);
  }
  function remove(i) {
    onChange(items.filter((_, idx) => idx !== i));
  }
  function add() {
    onChange([...items, '']);
  }

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
          <GripVertical size={14} color={T.muted} style={{ flexShrink: 0 }} />
          <Input value={item} onChange={(v) => update(i, v)} placeholder={placeholder} />
          <button onClick={() => remove(i)} style={{
            background: T.danger, border: `1px solid ${T.dangerBorder}`,
            borderRadius: 8, padding: '8px 10px', cursor: 'pointer', color: T.error,
            flexShrink: 0, display: 'flex', alignItems: 'center',
          }}>
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <button onClick={add} style={{
        display: 'flex', alignItems: 'center', gap: 6,
        background: T.accentBg, border: `1px dashed rgba(34,197,94,0.35)`,
        borderRadius: 9, padding: '8px 14px', cursor: 'pointer', color: T.accent,
        fontSize: '0.8rem', fontWeight: 600, marginTop: 4,
      }}>
        <Plus size={14} /> Add Item
      </button>
    </div>
  );
}
