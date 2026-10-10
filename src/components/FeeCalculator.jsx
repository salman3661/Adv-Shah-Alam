import React, { useMemo, useState } from 'react';
import { Calculator } from 'lucide-react';
import AdSenseAd from './AdSenseAd';
import { AD_SLOTS } from './ads/adLayout';

/**
 * FeeCalculator - interactive in-article estimator (Unit 3 of the ad layout).
 *
 * Ad placement: the AdSense unit sits between the inputs and the "calculate" button, separated by 3rem of
 * clear space on each side and labelled "Advertisement". AdSense policy forbids placing ads so close to an
 * interactive control that users could click them by accident - do NOT reduce that spacing.
 *
 * type 'land'     : % based government fees on the deed value (rates editable, defaults from the published article)
 * type 'marriage' : itemised fee ranges (each item can be toggled)
 *
 * All outputs are ESTIMATES. Rates / schedules change by government notification and by area.
 */

const BN_DIGITS = '০১২৩৪৫৬৭৮৯';
const normalizeDigits = (s) => String(s).replace(/[০-৯]/g, (d) => BN_DIGITS.indexOf(d)).replace(/[,\s৳]/g, '');

/* ---- configuration (single place to edit rates) ---- */
const LAND_DEFAULT_RATES = [
    { id: 'stamp', rate: 1.5, bn: 'স্ট্যাম্প শুল্ক', en: 'Stamp duty' },
    { id: 'reg', rate: 1, bn: 'রেজিস্ট্রেশন ফি', en: 'Registration fee' },
    { id: 'local', rate: 3, bn: 'স্থানীয় সরকার কর', en: 'Local government tax' },
    { id: 'vat', rate: 1.5, bn: 'ভ্যাট (VAT)', en: 'VAT' },
    { id: 'tds', rate: 1, bn: 'উৎসে কর', en: 'Source tax' },
];

const MARRIAGE_ITEMS = {
    bn: [
        { id: 'notary', label: 'নোটারি অ্যাফিডেভিট (দুজনের)', min: 500, max: 1500, on: true },
        { id: 'kazi', label: 'কাজী অফিসে নিবন্ধন ফি', min: 200, max: 500, on: true },
        { id: 'stamp', label: 'কাবিননামার সরকারি স্ট্যাম্প', min: 300, max: 800, on: true },
        { id: 'cert', label: 'বিবাহ সনদ (Marriage Certificate)', min: 100, max: 300, on: true },
        { id: 'lawyer', label: 'আইনজীবী ফি (ঐচ্ছিক)', min: 2000, max: 5000, on: false },
    ],
    en: [
        { id: 'kazi', label: 'Kazi registration fee (government schedule)', min: 500, max: 1500, on: true },
        { id: 'form', label: 'Kabinnama form and stamp', min: 200, max: 500, on: true },
        { id: 'kazipro', label: "Kazi's professional fee", min: 2000, max: 5000, on: true },
        { id: 'cert', label: 'Certified copy of Kabinnama', min: 100, max: 300, on: true },
        { id: 'lawyer', label: 'Lawyer assistance (optional)', min: 3000, max: 10000, on: false },
    ],
};

const T = {
    bn: {
        landTitle: 'জমি রেজিস্ট্রি খরচ ক্যালকুলেটর',
        marriageTitle: 'কোর্ট ম্যারেজ খরচ ক্যালকুলেটর',
        landNote: 'আনুমানিক হিসাব। হার এলাকাভেদে ও সরকারি প্রজ্ঞাপন অনুযায়ী বদলাতে পারে — রেজিস্ট্রির আগে সাব-রেজিস্ট্রি অফিস থেকে যাচাই করুন।',
        marriageNote: 'আনুমানিক হিসাব। এলাকা ও কাজীভেদে খরচ ভিন্ন হতে পারে। দেনমোহর সরকারি ফি নয়।',
        value: 'দলিলে প্রদর্শিত জমির মূল্য (৳)',
        placeholder: 'যেমন: ১০০০০০০',
        editRates: 'হার পরিবর্তন করুন (ঐচ্ছিক)',
        hideRates: 'হার সংক্ষিপ্ত করুন',
        calc: 'খরচ হিসাব করুন',
        ad: 'বিজ্ঞাপন',
        feeHead: 'ফি-এর ধরন',
        amount: 'পরিমাণ',
        total: 'মোট আনুমানিক সরকারি খরচ',
        totalRange: 'মোট আনুমানিক খরচ',
        excluded: 'আইনজীবী ও দলিল লেখকের ফি এখানে অন্তর্ভুক্ত নয়।',
        invalid: 'সঠিক জমির মূল্য লিখুন।',
        selectItems: 'যে খরচগুলো প্রযোজ্য সেগুলো বেছে নিন',
        currency: '৳',
        locale: 'bn-BD',
    },
    en: {
        landTitle: 'Land Registration Cost Calculator',
        marriageTitle: 'Court Marriage Cost Calculator',
        landNote: 'Estimate only. Rates vary by area and government notification - verify at the sub-registry office before registering.',
        marriageNote: 'Estimate only. Costs vary by area and Kazi. Mahr is agreed between the parties and is not a government fee.',
        value: 'Land value shown in the deed (BDT)',
        placeholder: 'e.g. 1000000',
        editRates: 'Edit rates (optional)',
        hideRates: 'Hide rates',
        calc: 'Calculate cost',
        ad: 'Advertisement',
        feeHead: 'Fee',
        amount: 'Amount',
        total: 'Estimated total government cost',
        totalRange: 'Estimated total',
        excluded: 'Lawyer and deed-writer fees are not included.',
        invalid: 'Enter a valid land value.',
        selectItems: 'Select the costs that apply to you',
        currency: 'BDT ',
        locale: 'en-BD',
    },
};

const card = {
    margin: '2.5rem 0',
    padding: '1.5rem',
    borderRadius: '1rem',
    background: 'var(--card-bg, rgba(255,255,255,0.03))',
    border: '1.5px solid var(--card-border, rgba(198,167,94,0.25))',
};
const input = {
    width: '100%', boxSizing: 'border-box', padding: '0.75rem 0.9rem', borderRadius: '0.6rem', fontSize: '1rem',
    background: 'var(--surface, transparent)', color: 'var(--text, inherit)', border: '1px solid var(--card-border, #cbd5e1)',
};

export default function FeeCalculator({ type = 'land', lang = 'bn' }) {
    const t = T[lang] || T.en;
    const fmt = (n) => `${t.currency}${Math.round(n).toLocaleString(t.locale)}`;

    const [value, setValue] = useState('');
    const [rates, setRates] = useState(() => LAND_DEFAULT_RATES.map((r) => ({ ...r })));
    const [showRates, setShowRates] = useState(false);
    const [items, setItems] = useState(() => (MARRIAGE_ITEMS[lang] || MARRIAGE_ITEMS.en).map((i) => ({ ...i })));
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const title = type === 'marriage' ? t.marriageTitle : t.landTitle;
    const note = type === 'marriage' ? t.marriageNote : t.landNote;

    const calculate = () => {
        setError('');
        if (type === 'marriage') {
            const sel = items.filter((i) => i.on);
            setResult({ rows: sel.map((i) => ({ label: i.label, min: i.min, max: i.max })), min: sel.reduce((a, i) => a + i.min, 0), max: sel.reduce((a, i) => a + i.max, 0) });
            return;
        }
        const v = parseFloat(normalizeDigits(value));
        if (!isFinite(v) || v <= 0) { setResult(null); setError(t.invalid); return; }
        const rows = rates.map((r) => ({ label: lang === 'bn' ? r.bn : r.en, rate: r.rate, amount: (v * (Number(r.rate) || 0)) / 100 }));
        const total = rows.reduce((a, r) => a + r.amount, 0);
        setResult({ rows, total, pct: rows.reduce((a, r) => a + (Number(r.rate) || 0), 0) });
    };

    const adBlock = useMemo(() => (
        <AdSenseAd
            slot={AD_SLOTS.calculator}
            format="fluid"
            layout="in-article"
            labelText={t.ad}
            minHeight={250}
            densityGroup="content"
            style={{ margin: '3rem auto' }}
        />
    ), [t.ad]);

    return (
        <section aria-label={title} style={card} data-fee-calculator={type}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                <Calculator size={20} style={{ color: 'var(--gold, #c6a75e)' }} aria-hidden="true" />
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text, inherit)' }}>{title}</h3>
            </div>
            <p style={{ margin: '0 0 1.1rem', fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text-muted, #94a3b8)' }}>{note}</p>

            {type === 'land' ? (
                <>
                    <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.4rem', color: 'var(--text, inherit)' }}>{t.value}</label>
                    <input
                        inputMode="numeric" value={value} placeholder={t.placeholder} style={input}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') calculate(); }}
                    />
                    <button type="button" onClick={() => setShowRates((s) => !s)}
                        style={{ marginTop: '0.75rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: '0.82rem', color: 'var(--accent, #c6a75e)', textDecoration: 'underline' }}>
                        {showRates ? t.hideRates : t.editRates}
                    </button>
                    {showRates && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.6rem', marginTop: '0.75rem' }}>
                            {rates.map((r, idx) => (
                                <label key={r.id} style={{ fontSize: '0.8rem', color: 'var(--text-secondary, inherit)' }}>
                                    {lang === 'bn' ? r.bn : r.en} (%)
                                    <input type="number" min="0" step="0.1" value={r.rate} style={{ ...input, padding: '0.5rem 0.6rem', marginTop: '0.25rem' }}
                                        onChange={(e) => setRates((prev) => prev.map((p, i) => (i === idx ? { ...p, rate: e.target.value } : p)))} />
                                </label>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                    <legend style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text, inherit)' }}>{t.selectItems}</legend>
                    {items.map((i, idx) => (
                        <label key={i.id} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.4rem 0', fontSize: '0.92rem', color: 'var(--text-secondary, inherit)', cursor: 'pointer' }}>
                            <input type="checkbox" checked={i.on} onChange={() => setItems((prev) => prev.map((p, k) => (k === idx ? { ...p, on: !p.on } : p)))} />
                            <span style={{ flex: 1 }}>{i.label}</span>
                            <span style={{ opacity: 0.7, whiteSpace: 'nowrap' }}>{fmt(i.min)} - {fmt(i.max)}</span>
                        </label>
                    ))}
                </fieldset>
            )}

            {/* Unit 3 - 3rem of clear space above and below; never move this adjacent to the button */}
            {adBlock}

            <button type="button" onClick={calculate}
                style={{ width: '100%', padding: '0.95rem 1rem', borderRadius: '0.7rem', border: 'none', cursor: 'pointer', fontWeight: 800, fontSize: '1rem', background: 'var(--gold, #c6a75e)', color: '#111' }}>
                {t.calc}
            </button>

            {error && <p role="alert" style={{ color: '#dc2626', fontSize: '0.88rem', margin: '0.75rem 0 0' }}>{error}</p>}

            {result && (
                <div style={{ marginTop: '1.25rem' }} aria-live="polite">
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92rem' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--card-border, #e2e8f0)' }}>
                                <th style={{ padding: '0.5rem 0.25rem' }}>{t.feeHead}</th>
                                <th style={{ padding: '0.5rem 0.25rem', textAlign: 'right' }}>{t.amount}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.rows.map((r) => (
                                <tr key={r.label} style={{ borderBottom: '1px solid var(--card-border, #e2e8f0)' }}>
                                    <td style={{ padding: '0.5rem 0.25rem' }}>{r.label}{r.rate !== undefined ? ` (${r.rate}%)` : ''}</td>
                                    <td style={{ padding: '0.5rem 0.25rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                                        {r.amount !== undefined ? fmt(r.amount) : `${fmt(r.min)} - ${fmt(r.max)}`}
                                    </td>
                                </tr>
                            ))}
                            <tr style={{ fontWeight: 800 }}>
                                <td style={{ padding: '0.65rem 0.25rem' }}>{type === 'land' ? `${t.total} (~${(Math.round(result.pct * 100) / 100)}%)` : t.totalRange}</td>
                                <td style={{ padding: '0.65rem 0.25rem', textAlign: 'right', whiteSpace: 'nowrap', color: 'var(--accent, #c6a75e)' }}>
                                    {type === 'land' ? fmt(result.total) : `${fmt(result.min)} - ${fmt(result.max)}`}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {type === 'land' && <p style={{ margin: '0.75rem 0 0', fontSize: '0.8rem', color: 'var(--text-muted, #94a3b8)' }}>{t.excluded}</p>}
                </div>
            )}
        </section>
    );
}
