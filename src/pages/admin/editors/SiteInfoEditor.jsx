import React from 'react';
import { Field, Input, Textarea, SectionCard } from './EditorComponents';

export default function SiteInfoEditor({ data, onChange }) {
  if (!data) return null;

  function set(key, value) {
    onChange({ ...data, [key]: value });
  }

  function setFooterLink(i, key, value) {
    const links = [...(data.footerServiceLinks || [])];
    links[i] = { ...links[i], [key]: value };
    onChange({ ...data, footerServiceLinks: links });
  }

  function removeFooterLink(i) {
    onChange({ ...data, footerServiceLinks: data.footerServiceLinks.filter((_, idx) => idx !== i) });
  }

  function addFooterLink() {
    onChange({ ...data, footerServiceLinks: [...(data.footerServiceLinks || []), { name: '', path: '' }] });
  }

  return (
    <div>
      <SectionCard title="👤 Advocate Details">
        <Field label="Full Name">
          <Input value={data.advocateName} onChange={(v) => set('advocateName', v)} placeholder="Advocate Md. Shah Alam" />
        </Field>
        <Field label="Short Name">
          <Input value={data.advocateShortName} onChange={(v) => set('advocateShortName', v)} placeholder="Adv. Md. Shah Alam" />
        </Field>
        <Field label="Court / Title Tagline">
          <Input value={data.court} onChange={(v) => set('court', v)} placeholder="Supreme Court of Bangladesh" />
        </Field>
        <Field label="Years of Experience">
          <Input value={String(data.yearsExperience ?? '')} onChange={(v) => set('yearsExperience', Number(v) || 0)} placeholder="20" />
        </Field>
      </SectionCard>

      <SectionCard title="📍 Address & Office">
        <Field label="Main Chamber Address">
          <Textarea value={data.chamberAddress} onChange={(v) => set('chamberAddress', v)} rows={2} placeholder="Ainjeebi Samity Bhaban..." />
        </Field>
        <Field label="Practice Address (Uttara)">
          <Textarea value={data.practiceAddress} onChange={(v) => set('practiceAddress', v)} rows={2} placeholder="Mantrust Nazma Monzil..." />
        </Field>
        <Field label="Office Hours">
          <Input value={data.officeHours} onChange={(v) => set('officeHours', v)} placeholder="Sat – Thu: 9:00 AM – 9:00 PM" />
        </Field>
      </SectionCard>

      <SectionCard title="📬 Contact & Social">
        <Field label="Email Address">
          <Input value={data.email} onChange={(v) => set('email', v)} placeholder="example@gmail.com" />
        </Field>
        <Field label="Facebook Profile URL">
          <Input value={data.facebookUrl} onChange={(v) => set('facebookUrl', v)} placeholder="https://www.facebook.com/..." />
        </Field>
        <Field label="Google Maps URL">
          <Input value={data.googleMapsUrl} onChange={(v) => set('googleMapsUrl', v)} placeholder="https://maps.app.goo.gl/..." />
        </Field>
        <Field label='Google Business Label' hint='Text shown next to the Google Business link in footer'>
          <Input value={data.googleBusinessLabel} onChange={(v) => set('googleBusinessLabel', v)} placeholder="⭐ Google Business Profile" />
        </Field>
      </SectionCard>

      <SectionCard title="🏷️ Footer">
        <Field label="Footer Bio" hint="Short description shown in the footer">
          <Textarea value={data.footerBio} onChange={(v) => set('footerBio', v)} rows={3} placeholder="Trusted lawyer in Bangladesh..." />
        </Field>
        <Field label="Copyright Text" hint='Use {year} as a placeholder for the current year'>
          <Input value={data.copyrightText} onChange={(v) => set('copyrightText', v)} placeholder="© {year} Advocate Md. Shah Alam..." />
        </Field>
      </SectionCard>

      <SectionCard title="🔗 Footer Service Links">
        {(data.footerServiceLinks || []).map((link, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 8, marginBottom: 8, alignItems: 'center' }}>
            <input
              type="text"
              value={link.name}
              onChange={(e) => setFooterLink(i, 'name', e.target.value)}
              placeholder="Link name"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1.5px solid rgba(255,255,255,0.07)',
                borderRadius: 8, padding: '9px 12px',
                color: '#f1f5f9', fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit',
              }}
              onFocus={(e) => { e.target.style.borderColor = '#22c55e'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.07)'; }}
            />
            <input
              type="text"
              value={link.path}
              onChange={(e) => setFooterLink(i, 'path', e.target.value)}
              placeholder="/services/..."
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1.5px solid rgba(255,255,255,0.07)',
                borderRadius: 8, padding: '9px 12px',
                color: '#f1f5f9', fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit',
              }}
              onFocus={(e) => { e.target.style.borderColor = '#22c55e'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.07)'; }}
            />
            <button onClick={() => removeFooterLink(i)}
              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 8, padding: '9px 11px', cursor: 'pointer', color: '#ef4444' }}>
              ✕
            </button>
          </div>
        ))}
        <button onClick={addFooterLink}
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(34,197,94,0.1)', border: '1px dashed rgba(34,197,94,0.35)', borderRadius: 9, padding: '8px 14px', cursor: 'pointer', color: '#22c55e', fontSize: '0.8rem', fontWeight: 600 }}>
          + Add Link
        </button>
      </SectionCard>
    </div>
  );
}
