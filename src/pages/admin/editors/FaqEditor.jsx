import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';
import { Field, Input, Textarea, T } from './EditorComponents';

function FaqItem({ item, index, total, onChange, onRemove, onMove }) {
  const [expanded, setExpanded] = useState(false);

  function set(key, value) {
    onChange({ ...item, [key]: value });
  }

  return (
    <div style={{
      background: T.card,
      border: `1px solid ${T.border}`,
      borderRadius: 12,
      marginBottom: 10,
      overflow: 'hidden',
    }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 10 }}>
        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: T.muted, minWidth: 24 }}>
          Q{index + 1}
        </span>
        <div
          style={{ flex: 1, cursor: 'pointer', fontSize: '0.85rem', color: T.text, fontWeight: 500 }}
          onClick={() => setExpanded(!expanded)}
        >
          {item.q || <span style={{ color: T.muted }}>New question...</span>}
        </div>

        <button onClick={() => onMove(index, -1)} disabled={index === 0}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.muted, padding: 3 }}>
          <ChevronUp size={14} />
        </button>
        <button onClick={() => onMove(index, 1)} disabled={index === total - 1}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.muted, padding: 3 }}>
          <ChevronDown size={14} />
        </button>
        <button onClick={onRemove}
          style={{ background: T.danger, border: `1px solid ${T.dangerBorder}`, borderRadius: 6, padding: '4px 7px', cursor: 'pointer', color: T.error, display: 'flex', alignItems: 'center' }}>
          <Trash2 size={12} />
        </button>
        <button onClick={() => setExpanded(!expanded)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.muted2, padding: 3 }}>
          <ChevronRight size={14} style={{ transform: expanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
        </button>
      </div>

      {/* Expanded edit area */}
      {expanded && (
        <div style={{ padding: '0 16px 16px', borderTop: `1px solid ${T.border}` }}>
          <div style={{ paddingTop: 16 }}>
            <Field label="Question">
              <Input value={item.q} onChange={(v) => set('q', v)} placeholder="Enter the FAQ question..." />
            </Field>
            <Field label="Answer">
              <Textarea value={item.a} onChange={(v) => set('a', v)} rows={5} placeholder="Enter the detailed answer..." />
            </Field>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FaqEditor({ data, onChange }) {
  if (!data) return null;

  const items = data.items || [];

  function updateItem(i, updated) {
    const next = [...items];
    next[i] = updated;
    onChange({ ...data, items: next });
  }

  function removeItem(i) {
    if (!window.confirm('Remove this FAQ item?')) return;
    onChange({ ...data, items: items.filter((_, idx) => idx !== i) });
  }

  function moveItem(i, dir) {
    const next = [...items];
    const target = i + dir;
    if (target < 0 || target >= next.length) return;
    [next[i], next[target]] = [next[target], next[i]];
    onChange({ ...data, items: next });
  }

  function addItem() {
    onChange({ ...data, items: [...items, { q: '', a: '' }] });
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <span style={{ fontSize: '0.8rem', color: T.muted }}>
          {items.length} FAQ item{items.length !== 1 ? 's' : ''} — click an item to expand and edit
        </span>
        <button onClick={addItem} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: T.accentBg, border: '1px solid rgba(34,197,94,0.3)',
          borderRadius: 9, padding: '8px 16px', cursor: 'pointer', color: T.accent,
          fontSize: '0.82rem', fontWeight: 600,
        }}>
          <Plus size={14} /> Add FAQ
        </button>
      </div>

      {items.length === 0 && (
        <div style={{ textAlign: 'center', padding: '32px', color: T.muted, fontSize: '0.85rem' }}>
          No FAQ items yet. Click "Add FAQ" to get started.
        </div>
      )}

      {items.map((item, i) => (
        <FaqItem
          key={i}
          item={item}
          index={i}
          total={items.length}
          onChange={(u) => updateItem(i, u)}
          onRemove={() => removeItem(i)}
          onMove={moveItem}
        />
      ))}
    </div>
  );
}
