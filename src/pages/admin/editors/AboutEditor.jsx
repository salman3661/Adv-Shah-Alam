import React from 'react';
import { Field, Input, Textarea, SectionCard } from './EditorComponents';
import { T } from './EditorComponents';

export default function AboutEditor({ data, onChange }) {
  if (!data) return null;

  function set(key, value) {
    onChange({ ...data, [key]: value });
  }

  function updateBio(i, value) {
    const bio = [...(data.bio || [])];
    bio[i] = value;
    onChange({ ...data, bio });
  }

  function addBioParagraph() {
    onChange({ ...data, bio: [...(data.bio || []), ''] });
  }

  function removeBioParagraph(i) {
    onChange({ ...data, bio: data.bio.filter((_, idx) => idx !== i) });
  }

  function updateStat(i, key, value) {
    const stats = [...(data.stats || [])];
    stats[i] = { ...stats[i], [key]: key === 'value' ? Number(value) || 0 : value };
    onChange({ ...data, stats });
  }

  return (
    <div>
      <SectionCard title="📌 Section Labels">
        <Field label="Section Label" hint='Small accent text above the heading (e.g. "About the Advocate")'>
          <Input value={data.sectionLabel} onChange={(v) => set('sectionLabel', v)} placeholder="About the Advocate" />
        </Field>
        <Field label="Main Heading">
          <Input value={data.heading} onChange={(v) => set('heading', v)} placeholder="Dedicated to Justice" />
        </Field>
      </SectionCard>

      <SectionCard title="📝 Bio Paragraphs">
        <p style={{ fontSize: '0.78rem', color: T.muted, margin: '0 0 14px', lineHeight: 1.5 }}>
          Each block below is one paragraph in the About section.
        </p>
        {(data.bio || []).map((para, i) => (
          <div key={i} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: '0.7rem', color: T.muted, fontWeight: 700 }}>Paragraph {i + 1}</span>
              <button onClick={() => removeBioParagraph(i)}
                style={{ background: T.danger, border: `1px solid ${T.dangerBorder}`, borderRadius: 6, padding: '3px 7px', cursor: 'pointer', color: T.error, fontSize: '0.7rem' }}>
                Remove
              </button>
            </div>
            <Textarea value={para} onChange={(v) => updateBio(i, v)} rows={4} placeholder="Bio paragraph text..." />
          </div>
        ))}
        <button onClick={addBioParagraph} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: T.accentBg, border: '1px dashed rgba(34,197,94,0.35)',
          borderRadius: 9, padding: '8px 14px', cursor: 'pointer', color: T.accent,
          fontSize: '0.8rem', fontWeight: 600,
        }}>
          + Add Paragraph
        </button>
      </SectionCard>

      <SectionCard title="💬 Quote">
        <Field label="Quote Text">
          <Textarea value={data.quote} onChange={(v) => set('quote', v)} rows={3} placeholder="Justice delayed is justice denied..." />
        </Field>
        <Field label="Quote Author">
          <Input value={data.quoteAuthor} onChange={(v) => set('quoteAuthor', v)} placeholder="— Adv. Md. Shah Alam" />
        </Field>
      </SectionCard>

      <SectionCard title="📊 Stats Counter Cards">
        <p style={{ fontSize: '0.78rem', color: T.muted, margin: '0 0 14px' }}>
          These are the animated counter cards shown on the right side of the About section.
        </p>
        {(data.stats || []).map((stat, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '80px 60px 1fr', gap: 10,
            marginBottom: 10, alignItems: 'end',
          }}>
            <Field label={`Stat ${i + 1} Value`} style={{ margin: 0 }}>
              <Input value={String(stat.value)} onChange={(v) => updateStat(i, 'value', v)} placeholder="10" />
            </Field>
            <Field label="Suffix" style={{ margin: 0 }}>
              <Input value={stat.suffix} onChange={(v) => updateStat(i, 'suffix', v)} placeholder="+" />
            </Field>
            <Field label="Label" style={{ margin: 0 }}>
              <Input value={stat.label} onChange={(v) => updateStat(i, 'label', v)} placeholder="Years Experience" />
            </Field>
          </div>
        ))}
      </SectionCard>
    </div>
  );
}
