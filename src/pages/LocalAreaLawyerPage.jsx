import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, MessageCircle, MapPin, Scale, ShieldCheck, ArrowRight, Clock } from 'lucide-react';
import { telLink, waLink } from '../data/contactInfo';
import { SITE_BASE, buildServicePageSchema, buildWebSiteEntity, buildPersonEntity } from '../seo/entity';
import { LOCAL_AREAS } from '../data/localAreas';

const SERVICES_EN = [
  { to: '/services/land-lawyer', label: 'Land, Mutation & Lis Pendens Lawyer' },
  { to: '/services/criminal-lawyer', label: 'Criminal Defence Lawyer (Dhaka CMM & Sessions)' },
  { to: '/services/bail-lawyer', label: 'Bail & Anticipatory Bail Lawyer (High Court)' },
  { to: '/services/divorce-lawyer', label: 'Family, Divorce & Child Custody Lawyer' },
  { to: '/services/company-corporate-lawyer', label: 'Corporate, RJSC & Commercial Lawyer' },
  { to: '/services/supreme-court-lawyer', label: 'Supreme Court Writ & Appeal Lawyer' },
  { to: '/services/tax-lawyer', label: 'Tax & Regulatory Compliance Advisory' },
];

const SERVICES_BN = [
  { to: '/bn/services/land-lawyer', label: 'জমি, নামজারি ও লিস পেন্ডেন্স আইনজীবী' },
  { to: '/bn/services/criminal-lawyer', label: 'ফৌজদারি আইনজীবী (ঢাকা সিএমএম ও দায়রা আদালত)' },
  { to: '/bn/services/bail-lawyer', label: 'জামিন ও আগাম জামিন আইনজীবী (হাইকোর্ট)' },
  { to: '/bn/services/divorce-lawyer', label: 'পারিবারিক, তালাক ও সন্তান হেফাজত আইনজীবী' },
  { to: '/bn/services/company-corporate-lawyer', label: 'কোম্পানি, আরজেএসসি ও কর্পোরেট আইনজীবী' },
  { to: '/bn/services/supreme-court-lawyer', label: 'সুপ্রিম কোর্ট রিট ও আপিল আইনজীবী' },
  { to: '/bn/services/tax-lawyer', label: 'আয়কর ও রেগুলেটরি পরামর্শ সেবা' },
];

const SIBLING_AREAS = [
  { key: 'uttara', enPath: '/uttara-lawyer', bnPath: '/bn/uttara-lawyer', enLabel: 'Uttara Lawyer (Sector 12 Chamber)', bnLabel: 'উত্তরা আইনজীবী (সেক্টর ১২ চেম্বার)' },
  { key: 'gulshan', enPath: '/gulshan-lawyer', bnPath: '/bn/gulshan-lawyer', enLabel: 'Gulshan Lawyer (DNCC Ward 19 & 20)', bnLabel: 'গুলশান আইনজীবী (ওয়ার্ড ১৯ ও ২০)' },
  { key: 'banani', enPath: '/banani-lawyer', bnPath: '/bn/banani-lawyer', enLabel: 'Banani Lawyer (DNCC Ward 19)', bnLabel: 'বনানী আইনজীবী (ওয়ার্ড ১৯)' },
  { key: 'bashundhara', enPath: '/bashundhara-ra-lawyer', bnPath: '/bn/bashundhara-ra-lawyer', enLabel: 'Bashundhara R/A Lawyer', bnLabel: 'বসুন্ধরা আবাসিক এলাকা আইনজীবী' },
];

export default function LocalAreaLawyerPage({ areaKey = 'gulshan', lang = 'en' }) {
  const area = LOCAL_AREAS[areaKey] || LOCAL_AREAS.gulshan;
  const isBn = lang === 'bn';
  const copy = isBn ? area.bn : area.en;
  const pagePath = isBn ? area.bnPath : area.enPath;
  const pageUrl = `${SITE_BASE}${pagePath}`;
  const homeUrl = isBn ? `${SITE_BASE}/` : `${SITE_BASE}/en`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      buildWebSiteEntity(lang),
      buildPersonEntity(),
      {
        ...buildServicePageSchema({
          url: pageUrl,
          lang,
          serviceType: copy.serviceType,
          name: copy.title,
          description: copy.description,
          slug: area.slug,
        }),
        areaServed: area.areaServed,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: isBn ? 'হোম' : 'Home', item: homeUrl },
          { '@type': 'ListItem', position: 2, name: copy.title, item: pageUrl },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: copy.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{ color: 'var(--text)' }}>
      <Helmet>
        <html lang={isBn ? 'bn' : 'en'} />
        <title>{copy.title}</title>
        <meta name="description" content={copy.description} />
        <link rel="canonical" href={pageUrl} />
        <link rel="alternate" hrefLang="en" href={`${SITE_BASE}${area.enPath}`} />
        <link rel="alternate" hrefLang="bn" href={`${SITE_BASE}${area.bnPath}`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_BASE}${area.enPath}`} />
      </Helmet>

      <article className="max-w-5xl mx-auto space-y-10">
        {/* Hero */}
        <header className="rounded-xl p-6 sm:p-10 border" style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--accent)' }}>
            <MapPin size={15} aria-hidden="true" />
            <span>{copy.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
            {copy.h1}
          </h1>
          <p className="text-base sm:text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
            {copy.intro}
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={waLink(copy.waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              data-cta={`${area.key}_whatsapp_hero`}
              data-placement="hero"
              data-area={area.gaArea}
              data-service={area.gaService}
              className="tap-target inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
            >
              <MessageCircle size={18} aria-hidden="true" />
              <span>{isBn ? 'হোয়াটসঅ্যাপে ফ্রি পরামর্শ (+৮৮০ ১৯৫৫-৮০২০০৭)' : 'Free WhatsApp Consultation (+880 1955-802007)'}</span>
            </a>
            <a
              href={telLink()}
              data-cta={`${area.key}_call_hero`}
              data-placement="hero"
              data-area={area.gaArea}
              data-service={area.gaService}
              className="tap-target inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold border transition-colors"
              style={{ borderColor: 'var(--card-border)', background: 'var(--surface)' }}
            >
              <Phone size={18} aria-hidden="true" />
              <span>{isBn ? 'সরাসরি কল: ০১৭১২-৬৫৫৫৪৬' : 'Call Chamber: +880 1712-655546'}</span>
            </a>
            <Link
              to={isBn ? '/bn/contact' : '/contact'}
              data-cta={`${area.key}_contact_link`}
              data-placement="hero"
              data-area={area.gaArea}
              data-service={area.gaService}
              className="tap-target inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold border transition-colors"
              style={{ borderColor: 'var(--card-border)' }}
            >
              <Clock size={18} aria-hidden="true" />
              <span>{isBn ? 'চেম্বার অ্যাপয়েন্টমেন্ট' : 'Book Chamber Visit'}</span>
            </Link>
          </div>
        </header>

        {/* Quick Answer Table */}
        <section className="rounded-xl p-6 sm:p-8 border" style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <h2 className="text-2xl font-bold mb-4">
            {isBn ? 'একনজরে থানা, ওয়ার্ড, চেম্বার ও পরামর্শ তথ্য' : 'Quick Answer: Verified Jurisdiction, Chamber Hours & Free Consultation'}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr style={{ background: 'var(--surface)' }}>
                  <th className="p-3 text-left border" style={{ borderColor: 'var(--card-border)' }}>{isBn ? 'বিষয়' : 'Item'}</th>
                  <th className="p-3 text-left border" style={{ borderColor: 'var(--card-border)' }}>{isBn ? 'বিস্তারিত তথ্য' : 'Details'}</th>
                </tr>
              </thead>
              <tbody>
                {copy.quickTable.map(([label, val], idx) => (
                  <tr key={idx}>
                    <td className="p-3 border font-semibold align-top" style={{ borderColor: 'var(--card-border)' }}>{label}</td>
                    <td className="p-3 border" style={{ borderColor: 'var(--card-border)' }}>{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Verified Local Jurisdiction Table */}
        <section className="rounded-xl p-6 sm:p-8 border" style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <h2 className="text-2xl font-bold mb-2">
            {isBn ? 'এলাকাভিত্তিক থানা ও ডিএনসিসি ওয়ার্ড (DMP ও DNCC যাচাইকৃত)' : 'Verified Police Station & DNCC Ward Jurisdiction'}
          </h2>
          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
            {isBn
              ? 'সঠিক থানা ও ওয়ার্ড জানা থাকলে জিডি, এফআইআর, নামজারি বা উচ্ছেদ নোটিশে অপ্রয়োজনীয় বিলম্ব এড়ানো যায়।'
              : 'Confirming the exact DMP police station and DNCC ward avoids procedural delays when filing a GD, FIR, mutation, or eviction notice.'}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr style={{ background: 'var(--surface)' }}>
                  <th className="p-3 text-left border" style={{ borderColor: 'var(--card-border)' }}>{isBn ? 'এলাকা' : 'Zone / Block'}</th>
                  <th className="p-3 text-left border" style={{ borderColor: 'var(--card-border)' }}>{isBn ? 'থানা (DMP যাচাইকৃত)' : 'Police Station (DMP Verified)'}</th>
                  <th className="p-3 text-left border" style={{ borderColor: 'var(--card-border)' }}>{isBn ? 'ডিএনসিসি ওয়ার্ড' : 'DNCC Ward'}</th>
                  <th className="p-3 text-left border" style={{ borderColor: 'var(--card-border)' }}>{isBn ? 'প্রধান আইনি বিষয়' : 'Common Legal Matters'}</th>
                </tr>
              </thead>
              <tbody>
                {copy.jurisdictionRows.map((row, idx) => (
                  <tr key={idx}>
                    <td className="p-3 border font-medium" style={{ borderColor: 'var(--card-border)' }}>{row[0]}</td>
                    <td className="p-3 border" style={{ borderColor: 'var(--card-border)' }}>{row[1]}</td>
                    <td className="p-3 border whitespace-nowrap" style={{ borderColor: 'var(--card-border)' }}>{row[2]}</td>
                    <td className="p-3 border" style={{ borderColor: 'var(--card-border)' }}>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Common Case Types & Procedural Stages Table */}
        {copy.caseTimelineTable && (
          <section className="rounded-xl p-6 sm:p-8 border" style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
            <h2 className="text-2xl font-bold mb-4">{copy.caseTimelineTable.heading}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr style={{ background: 'var(--surface)' }}>
                    {copy.caseTimelineTable.columns.map((col, idx) => (
                      <th key={idx} className="p-3 text-left border" style={{ borderColor: 'var(--card-border)' }}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {copy.caseTimelineTable.rows.map((row, idx) => (
                    <tr key={idx}>
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className={cIdx === 0 ? 'p-3 border font-medium align-top' : 'p-3 border align-top'}
                          style={{ borderColor: 'var(--card-border)' }}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Detailed Local Legal Guidance */}
        <section className="rounded-xl p-6 sm:p-8 border space-y-6" style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          {copy.sections.map((sec, idx) => (
            <div key={idx}>
              <h2 className="text-2xl font-bold mb-3">{sec.heading}</h2>
              {sec.paragraphs.map((p, pIdx) => (
                <p
                  key={pIdx}
                  className={pIdx < sec.paragraphs.length - 1 ? 'leading-relaxed mb-3' : 'leading-relaxed'}
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {p}
                </p>
              ))}
            </div>
          ))}
        </section>

        {/* Local FAQs */}
        <section className="rounded-xl p-6 sm:p-8 border space-y-4" style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <h2 className="text-2xl font-bold">
            {isBn ? 'সাধারণ প্রশ্নোত্তর (FAQ)' : 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {copy.faqs.map((faq, idx) => (
              <div key={idx}>
                <h3 className="font-semibold text-base" style={{ color: 'var(--text)' }}>{faq.q}</h3>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal Links Hub */}
        <section className="rounded-xl p-6 sm:p-8 border" style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Scale size={22} style={{ color: 'var(--accent)' }} aria-hidden="true" />
            <span>{isBn ? 'বিশেষায়িত আইনি সেবাসমূহ ও পার্শ্ববর্তী এলাকা' : 'Practice Areas & North Dhaka Local Chambers'}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {(isBn ? SERVICES_BN : SERVICES_EN).map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className="flex items-center justify-between p-4 rounded-lg border hover:opacity-90 transition-opacity"
                style={{ borderColor: 'var(--card-border)', background: 'var(--surface)' }}
              >
                <span className="font-medium text-sm">{s.label}</span>
                <ArrowRight size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} aria-hidden="true" />
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 text-sm font-semibold pt-3 border-t" style={{ borderColor: 'var(--card-border)' }}>
            {SIBLING_AREAS.filter((s) => s.key !== area.key).map((s) => (
              <Link key={s.key} to={isBn ? s.bnPath : s.enPath} className="underline" style={{ color: 'var(--accent)' }}>
                {isBn ? s.bnLabel : s.enLabel}
              </Link>
            ))}
            <Link to="/advocate-md-shah-alam" className="underline" style={{ color: 'var(--accent)' }}>
              {isBn ? 'অ্যাডভোকেট মো. শাহ আলম — প্রোফাইল' : 'Advocate Md. Shah Alam — Profile'}
            </Link>
            <Link to="/nrb-legal-help" className="underline" style={{ color: 'var(--accent)' }}>
              {isBn ? 'প্রবাসী (NRB) আইনি সহায়তা' : 'NRB Legal Help'}
            </Link>
            <Link to={isBn ? area.enPath : area.bnPath} className="underline" style={{ color: 'var(--accent)' }}>
              {isBn ? 'Read in English' : 'বাংলায় পড়ুন'}
            </Link>
          </div>
        </section>

        {/* Bilingual Free First Consultation Notice */}
        <section className="rounded-xl p-6 sm:p-8 border" style={{ background: 'var(--surface)', borderColor: 'var(--card-border)' }}>
          <div className="flex items-start gap-3">
            <ShieldCheck size={24} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
            <div className="space-y-2 text-sm leading-relaxed">
              <p className="font-bold text-base">
                {isBn ? 'প্রথম পরামর্শ ফ্রি — কোনো অগ্রিম ফি নেই' : 'First Consultation Is Free — No Advance Fee'}
              </p>
              <p style={{ color: 'var(--text-secondary)' }}>
                The first consultation is free — you pay nothing in advance. Legal fees are discussed and agreed only after reviewing your documents and explaining the scope of your matter.
              </p>
              <p style={{ color: 'var(--text-secondary)' }}>
                প্রথম পরামর্শ ফ্রি — কোনো অগ্রিম ফি ছাড়াই আপনার সমস্যার আইনি অবস্থান ও করণীয় জেনে নিন। কাজের পরিধি বুঝিয়ে ও ঠিক করার পরেই কেবল ফি নির্ধারণ করা হয়।
              </p>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
