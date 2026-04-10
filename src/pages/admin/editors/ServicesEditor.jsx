import React from 'react';
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { Field, Input, Textarea, SectionCard, T } from './EditorComponents';

const ICON_OPTIONS = ['Shield', 'Users', 'Home', 'Scale', 'Landmark', 'FileText', 'Briefcase', 'BookOpen', 'Gavel'];

const COLOR_PRESETS = [
  { label: 'Red',    bg: 'rgba(239,68,68,0.12)', color: '#EF4444' },
  { label: 'Pink',   bg: 'rgba(236,72,153,0.12)', color: '#EC4899' },
  { label: 'Green',  bg: 'rgba(34,197,94,0.12)',  color: '#22C55E' },
  { label: 'Blue',   bg: 'rgba(59,130,246,0.12)', color: '#3B82F6' },
  { label: 'Purple', bg: 'rgba(124,58,237,0.12)', color: '#7C3AED' },
  { label: 'Amber',  bg: 'rgba(217,119,6,0.12)',  color: '#D97706' },
];

function ServiceCard({ item, index, total, onChange, onRemove, onMove }) {
  function set(key, value) {
    onChange({ ...item, [key]: value });
  }

  const selectedPreset = COLOR_PRESETS.find((p) => p.color === item.iconColor) || null;

  return (
    <div style={{
      background: T.card,
      border: `1px solid ${T.border}`,
      borderRadius: 14,
      padding: '20px',
      marginBottom: 14,
      position: 'relative',
    }}>
      {/* Card header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: item.iconBg || 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          fontSize: '0.75rem', color: item.iconColor || T.muted,
        }}>
          #{index + 1}
        </div>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: T.text, flex: 1 }}>
          {item.title || 'Service Card'}
        </span>
        {/* Move up/down */}
        <button onClick={() => onMove(index, -1)} disabled={index === 0}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: index === 0 ? T.muted : T.muted2, padding: 4 }}>
          <ChevronUp size={15} />
        </button>
        <button onClick={() => onMove(index, 1)} disabled={index === total - 1}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: index === total - 1 ? T.muted : T.muted2, padding: 4 }}>
          <ChevronDown size={15} />
        </button>
        <button onClick={onRemove}
          style={{ background: T.danger, border: `1px solid ${T.dangerBorder}`, borderRadius: 7, padding: '5px 8px', cursor: 'pointer', color: T.error, display: 'flex', alignItems: 'center' }}>
          <Trash2 size={13} />
        </button>
      </div>

      <Field label="Title">
        <Input value={item.title} onChange={(v) => set('title', v)} placeholder="e.g. Criminal Lawyer in Bangladesh" />
      </Field>
      <Field label="Description">
        <Textarea value={item.desc} onChange={(v) => set('desc', v)} rows={3} placeholder="Brief description of this service..." />
      </Field>
      <Field label="URL Path" hint='Link path for this service card, e.g. "/services/criminal-lawyer"'>
        <Input value={item.link} onChange={(v) => set('link', v)} placeholder="/services/..." />
      </Field>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Field label="Icon Name" hint="Lucide icon key">
          <select
            value={item.icon || ''}
            onChange={(e) => set('icon', e.target.value)}
            style={{
              width: '100%', background: 'rgba(255,255,255,0.04)', border: `1.5px solid ${T.border}`,
              borderRadius: 9, padding: '10px 13px', color: T.text, fontSize: '0.875rem', outline: 'none',
              fontFamily: 'inherit',
            }}
          >
            {ICON_OPTIONS.map((ico) => <option key={ico} value={ico}>{ico}</option>)}
          </select>
        </Field>

        <Field label="Icon Color">
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', paddingTop: 4 }}>
            {COLOR_PRESETS.map((preset) => (
              <button
                key={preset.color}
                onClick={() => { set('iconColor', preset.color); set('iconBg', preset.bg); }}
                title={preset.label}
                style={{
                  width: 26, height: 26, borderRadius: 6,
                  background: preset.bg,
                  border: `2px solid ${item.iconColor === preset.color ? preset.color : 'transparent'}`,
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: preset.color, margin: 'auto' }} />
              </button>
            ))}
          </div>
        </Field>
      </div>
    </div>
  );
}

export default function ServicesEditor({ data, onChange }) {
  if (!data) return null;

  const items = data.items || [];

  function updateItem(i, updated) {
    const next = [...items];
    next[i] = updated;
    onChange({ ...data, items: next });
  }

  function removeItem(i) {
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
    onChange({
      ...data,
      items: [...items, {
        icon: 'Briefcase',
        title: '',
        desc: '',
        link: '/services/',
        iconBg: 'rgba(59,130,246,0.12)',
        iconColor: '#3B82F6',
      }],
    });
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <span style={{ fontSize: '0.8rem', color: T.muted }}>{items.length} service card{items.length !== 1 ? 's' : ''}</span>
        <button onClick={addItem} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: T.accentBg, border: '1px solid rgba(34,197,94,0.3)',
          borderRadius: 9, padding: '8px 16px', cursor: 'pointer', color: T.accent,
          fontSize: '0.82rem', fontWeight: 600,
        }}>
          <Plus size={14} /> Add Service
        </button>
      </div>

      {items.map((item, i) => (
        <ServiceCard
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
