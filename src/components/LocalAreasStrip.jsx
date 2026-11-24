import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const AREAS = [
  { enPath: '/uttara-lawyer', bnPath: '/bn/uttara-lawyer', en: 'Uttara Lawyer (Sector 12)', bn: 'উত্তরা আইনজীবী (সেক্টর ১২)' },
  { enPath: '/gulshan-lawyer', bnPath: '/bn/gulshan-lawyer', en: 'Gulshan Lawyer', bn: 'গুলশান আইনজীবী' },
  { enPath: '/banani-lawyer', bnPath: '/bn/banani-lawyer', en: 'Banani Lawyer', bn: 'বনানী আইনজীবী' },
  { enPath: '/bashundhara-ra-lawyer', bnPath: '/bn/bashundhara-ra-lawyer', en: 'Bashundhara R/A Lawyer', bn: 'বসুন্ধরা আবাসিক এলাকা আইনজীবী' },
];

export default function LocalAreasStrip({ lang = 'en' }) {
  const isBn = lang === 'bn';
  return (
    <nav
      aria-label={isBn ? 'আমাদের স্থানীয় চেম্বার সেবার এলাকা' : 'North Dhaka Local Chamber Areas'}
      className="rounded-xl p-4 sm:p-5 border"
      style={{ background: 'var(--surface)', borderColor: 'var(--card-border)' }}
    >
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color: 'var(--accent)' }}>
        <MapPin size={14} aria-hidden="true" />
        <span>{isBn ? 'উত্তর ঢাকায় স্থানীয় আইনি চেম্বার সেবা' : 'Local Chamber Services Across North Dhaka'}</span>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold">
        {AREAS.map((a) => (
          <Link
            key={a.enPath}
            to={isBn ? a.bnPath : a.enPath}
            className="underline hover:opacity-80 transition-opacity"
            style={{ color: 'var(--text)' }}
          >
            {isBn ? a.bn : a.en}
          </Link>
        ))}
      </div>
    </nav>
  );
}
