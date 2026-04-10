import React from 'react';
import { Field, Input, Textarea, SectionCard, ArrayRow } from './EditorComponents';

export default function HeroEditor({ data, onChange }) {
  if (!data) return null;

  function set(key, value) {
    onChange({ ...data, [key]: value });
  }

  return (
    <div>
      <SectionCard title="🏷️ Badge & Label">
        <Field label="Label Badge" hint='Shown as the small badge above the headline, e.g. "Advocate · Supreme Court"'>
          <Input value={data.labelBadge} onChange={(v) => set('labelBadge', v)} placeholder="e.g. Advocate · Supreme Court of Bangladesh" />
        </Field>
      </SectionCard>

      <SectionCard title="📝 Headline">
        <Field label="Headline (before accent)" hint='First part of the H1 heading'>
          <Input value={data.headline} onChange={(v) => set('headline', v)} placeholder="e.g. Trusted Lawyer in Bangladesh –" />
        </Field>
        <Field label="Headline Accent" hint="Highlighted part of the headline in accent color">
          <Input value={data.headlineAccent} onChange={(v) => set('headlineAccent', v)} placeholder="e.g. Advocate Md. Shah Alam" />
        </Field>
      </SectionCard>

      <SectionCard title="💬 Description">
        <Field label="Subheading" hint="Bold subtitle shown below the headline">
          <Textarea value={data.subheading} onChange={(v) => set('subheading', v)} rows={2} placeholder="e.g. Experienced Criminal, Divorce & Bail Lawyer..." />
        </Field>
        <Field label="Description (HTML allowed)" hint="Short paragraph under the subheading. You can use <strong> tags for bold keywords.">
          <Textarea value={data.description} onChange={(v) => set('description', v)} rows={4} placeholder="e.g. As a trusted <strong>lawyer in Bangladesh</strong>..." />
        </Field>
      </SectionCard>

      <SectionCard title="🔘 Buttons">
        <Field label="CTA Button 1 Label (WhatsApp)">
          <Input value={data.cta1Label} onChange={(v) => set('cta1Label', v)} placeholder="e.g. WhatsApp Consult" />
        </Field>
        <Field label="CTA Button 2 Label (Contact)">
          <Input value={data.cta2Label} onChange={(v) => set('cta2Label', v)} placeholder="e.g. Request Consultation" />
        </Field>
      </SectionCard>

      <SectionCard title="📸 Photo Badges">
        <Field label="Photo Badge — Bottom Right">
          <Input value={data.photoBadgeBottom} onChange={(v) => set('photoBadgeBottom', v)} placeholder="e.g. Experienced Lawyer." />
        </Field>
        <Field label="Photo Badge — Top Left">
          <Input value={data.photoBadgeTop} onChange={(v) => set('photoBadgeTop', v)} placeholder="e.g. ⚖️ Supreme Court" />
        </Field>
        <Field label="Photo Alt Text (SEO)">
          <Input value={data.photoAlt} onChange={(v) => set('photoAlt', v)} placeholder="Alt text for the hero photo" />
        </Field>
      </SectionCard>

      <SectionCard title="🏷️ Specialty Tags">
        <Field label="Tags" hint="Small pill tags shown below the buttons">
          <ArrayRow items={data.tags || []} onChange={(v) => set('tags', v)} placeholder="e.g. Criminal Law" />
        </Field>
      </SectionCard>
    </div>
  );
}
