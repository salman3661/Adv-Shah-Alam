import React, { useMemo, useState } from 'react';
import { Calculator } from 'lucide-react';
import AdSenseAd from './AdSenseAd';
import { AD_SLOTS } from './ads/adLayout';

/**
 * FeeCalculator (LegalCalculator) — Phase 5.1 Interactive In-Article Legal Calculator.
 *
 * Supports:
 *  1. type 'land'        : Land & Flat Registration Fee Calculation (Stamp Duty, Reg Fee, Local Tax, VAT, Gain Tax)
 *  2. type 'inheritance' : Muslim Inheritance / Faraiz Share Calculation (Land Decimals / BDT distributed to Spouse, Parents, Sons, Daughters)
 *  3. type 'kabinnama'   : Kabinnama / Marriage Registration Government Fee Calculation (12.50 BDT per 1,000 up to 4L, 100 BDT per lakh above 4L)
 *  4. type 'marriage'    : Court Marriage & Nikahnama Itemised Cost Estimator
 */

const BN_DIGITS = '০১২৩৪৫৬৭৮৯';
const normalizeDigits = (s) => String(s).replace(/[০-৯]/g, (d) => BN_DIGITS.indexOf(d)).replace(/[,\s৳]/g, '');

const LAND_DEFAULT_RATES = [
    { id: 'stamp', rate: 1.5, bn: 'স্ট্যাম্প শুল্ক (Stamp Duty)', en: 'Stamp duty' },
    { id: 'reg', rate: 1, bn: 'রেজিস্ট্রেশন ফি (Registration Fee)', en: 'Registration fee' },
    { id: 'local', rate: 3, bn: 'স্থানীয় সরকার কর (Local Govt Tax)', en: 'Local government tax' },
    { id: 'vat', rate: 1.5, bn: 'ভ্যাট (VAT)', en: 'VAT' },
    { id: 'tds', rate: 2, bn: 'উৎসে কর / গেইন ট্যাক্স (Source Tax)', en: 'Source / Gain tax' },
];

const MARRIAGE_ITEMS = {
    bn: [
        { id: 'notary', label: 'নোটারি অ্যাফিডেভিট (দুজনের)', min: 500, max: 1500, on: true },
        { id: 'kazi', label: 'কাজী অফিসে সরকারি কাবিন ফি (১ লাখ দেনমোহরে)', min: 1250, max: 1250, on: true },
        { id: 'stamp', label: 'কাবিননামার ফরম ও সরকারি স্ট্যাম্প', min: 300, max: 800, on: true },
        { id: 'cert', label: 'বিবাহ সনদ (Marriage Certificate / নিকাহনামা কপি)', min: 100, max: 300, on: true },
        { id: 'lawyer', label: 'আইনজীবী পরামর্শ ও ড্রাফটিং ফি (ঐচ্ছিক)', min: 2000, max: 5000, on: false },
    ],
    en: [
        { id: 'kazi', label: 'Kazi registration fee (government schedule per 1L Mahr)', min: 1250, max: 1250, on: true },
        { id: 'form', label: 'Kabinnama form and stamp', min: 200, max: 500, on: true },
        { id: 'kazipro', label: 'Notary affidavit & documentation', min: 500, max: 1500, on: true },
        { id: 'cert', label: 'Certified copy of Kabinnama', min: 100, max: 300, on: true },
        { id: 'lawyer', label: 'Lawyer assistance (optional)', min: 3000, max: 10000, on: false },
    ],
};

const T = {
    bn: {
        landTitle: '🧮 জমি ও ফ্ল্যাট রেজিস্ট্রি খরচ ক্যালকুলেটর ২০২৬',
        inheritanceTitle: '🧮 মুসলিম উত্তরাধিকার ও ফারায়েজ হিসাব ক্যালকুলেটর ২০২৬',
        kabinnamaTitle: '🧮 কাবিননামা সরকারি ফি ক্যালকুলেটর ২০২৬',
        marriageTitle: '🧮 কোর্ট ম্যারেজ ও কাবিন খরচ ক্যালকুলেটর ২০২৬',
        landNote: '২০২৬ সালের সরকারি ফি কাঠামো অনুযায়ী আনুমানিক হিসাব। এলাকাভেদে উৎস কর পরিবর্তিত হতে পারে — রেজিস্ট্রির আগে সাব-রেজিস্ট্রি অফিস থেকে যাচাই করুন।',
        inheritanceNote: 'মুসলিম পারিবারিক আইন অধ্যাদেশ ১৯৬১ ও হানাফি ফারায়েজ বিধান অনুযায়ী মৃত ব্যক্তির রেখে যাওয়া মোট জমি (শতাংশ) বা টাকার অংশ হিসাব করুন।',
        kabinnamaNote: 'মুসলিম বিবাহ ও তালাক (নিবন্ধন) বিধিমালা অনুযায়ী প্রথম ৪ লাখ টাকা পর্যন্ত প্রতি লাখে ১,২৫০ টাকা এবং পরবর্তী প্রতি লাখে ১০০ টাকা সরকারি কাবিন ফি (সর্বনিম্ন ২০০ টাকা)।',
        marriageNote: 'আনুমানিক হিসাব। এলাকা ও দেনমোহরের পরিমাণভেদে খরচ ভিন্ন হতে পারে। দেনমোহর সরকারি ফি নয়।',
        value: 'দলিলে প্রদর্শিত জমির মূল্য (৳)',
        placeholder: 'যেমন: ১০০০০০০',
        dowerLabel: 'মোট দেনমোহরের পরিমাণ (৳)',
        dowerPlaceholder: 'যেমন: ৫০০০০০ (৫ লাখ টাকা)',
        estateLabel: 'মোট সম্পত্তির পরিমাণ (শতাংশ অথবা টাকা)',
        estatePlaceholder: 'যেমন: ১০০ (শতাংশ জমি বা টাকা)',
        sonsLabel: 'ছেলের সংখ্যা (পুত্র)',
        daughtersLabel: 'মেয়ের সংখ্যা (কন্যা)',
        spouseLabel: 'জীবিত স্বামী / স্ত্রী',
        spouseNone: 'কেউ জীবিত নেই',
        spouseWife: 'স্ত্রী জীবিত (১/৮ বা ১/৪ অংশ)',
        spouseHusband: 'স্বামী জীবিত (১/৪ বা ১/২ অংশ)',
        fatherAlive: 'বাবা জীবিত আছেন (১/৬ অংশ)',
        motherAlive: 'মা জীবিত আছেন (১/৬ অংশ)',
        editRates: 'হার পরিবর্তন করুন (ঐচ্ছিক)',
        hideRates: 'হার সংক্ষিপ্ত করুন',
        calc: 'হিসাব দেখুন',
        ad: 'বিজ্ঞাপন',
        feeHead: 'বিবরণ / খাত',
        amount: 'পরিমাণ / অংশ',
        total: 'মোট আনুমানিক সরকারি খরচ',
        totalRange: 'মোট আনুমানিক খরচ',
        excluded: 'আইনজীবী ও দলিল লেখকের ফি এখানে অন্তর্ভুক্ত নয়।',
        invalid: 'সঠিক সংখ্যা লিখুন (যেমন: ১০০ বা ১০০০০০০)।',
        selectItems: 'যে খরচগুলো প্রযোজ্য সেগুলো বেছে নিন',
        currency: '৳',
        locale: 'bn-BD',
    },
    en: {
        landTitle: '🧮 Land & Flat Registration Fee Calculator 2026',
        inheritanceTitle: '🧮 Muslim Inheritance (Faraiz) Share Calculator 2026',
        kabinnamaTitle: '🧮 Kabinnama Government Fee Calculator 2026',
        marriageTitle: '🧮 Court Marriage Cost Calculator 2026',
        landNote: '2026 Official Fee Schedule estimate. Source tax varies by mouza classification — verify at the Sub-Registry office before registration.',
        inheritanceNote: 'Calculate exact Quranic & Hanafi Faraiz shares (in land decimals or BDT) for surviving spouse, parents, sons, and daughters.',
        kabinnamaNote: 'Under Bangladesh Muslim Marriage Registration Rules: BDT 1,250 per lakh up to 4 lakh Mahr, and BDT 100 per additional lakh (minimum BDT 200).',
        marriageNote: 'Estimate only. Costs vary by area and Mahr amount. Mahr is agreed between the parties and is not a government fee.',
        value: 'Deed Value of Land / Flat (BDT)',
        placeholder: 'e.g. 1000000',
        dowerLabel: 'Total Dower / Denmohor Amount (BDT)',
        dowerPlaceholder: 'e.g. 500000',
        estateLabel: 'Total Property (Land Decimals or BDT)',
        estatePlaceholder: 'e.g. 100',
        sonsLabel: 'Number of Sons',
        daughtersLabel: 'Number of Daughters',
        spouseLabel: 'Surviving Spouse',
        spouseNone: 'None',
        spouseWife: 'Wife Alive (1/8 or 1/4 share)',
        spouseHusband: 'Husband Alive (1/4 or 1/2 share)',
        fatherAlive: 'Father Alive (1/6 share)',
        motherAlive: 'Mother Alive (1/6 share)',
        editRates: 'Edit rates (optional)',
        hideRates: 'Hide rates',
        calc: 'Calculate Now',
        ad: 'Advertisement',
        feeHead: 'Category / Heir',
        amount: 'Share / Amount',
        total: 'Estimated total government cost',
        totalRange: 'Estimated total',
        excluded: 'Lawyer and deed-writer fees are not included.',
        invalid: 'Please enter a valid positive number.',
        selectItems: 'Select the costs that apply to you',
        currency: 'BDT ',
        locale: 'en-BD',
    },
};

const card = {
    margin: '2rem 0 2.5rem',
    padding: '1.5rem',
    borderRadius: '1rem',
    background: 'var(--card-bg, rgba(255,255,255,0.03))',
    border: '1.5px solid var(--card-border, rgba(198,167,94,0.32))',
    boxShadow: '0 8px 28px rgba(15, 23, 42, 0.06)',
};
const input = {
    width: '100%', boxSizing: 'border-box', padding: '0.75rem 0.9rem', borderRadius: '0.6rem', fontSize: '1rem',
    background: 'var(--surface, transparent)', color: 'var(--text, inherit)', border: '1px solid var(--card-border, #cbd5e1)',
};

export default function FeeCalculator({ type = 'land', lang = 'bn' }) {
    const t = T[lang] || T.en;
    const fmt = (n) => `${t.currency}${Math.round(n).toLocaleString(t.locale)}`;
    const fmtNum = (n) => Number(n.toFixed(2)).toLocaleString(t.locale);

    // Land & Kabinnama state
    const [value, setValue] = useState(type === 'inheritance' ? '100' : type === 'kabinnama' ? '500000' : '1000000');
    const [rates, setRates] = useState(() => LAND_DEFAULT_RATES.map((r) => ({ ...r })));
    const [showRates, setShowRates] = useState(false);
    const [items, setItems] = useState(() => (MARRIAGE_ITEMS[lang] || MARRIAGE_ITEMS.en).map((i) => ({ ...i })));

    // Inheritance (Faraiz) state
    const [sons, setSons] = useState(1);
    const [daughters, setDaughters] = useState(1);
    const [spouse, setSpouse] = useState('wife');
    const [fatherAlive, setFatherAlive] = useState(false);
    const [motherAlive, setMotherAlive] = useState(true);

    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const title =
        type === 'inheritance' ? t.inheritanceTitle :
        type === 'kabinnama' ? t.kabinnamaTitle :
        type === 'marriage' ? t.marriageTitle :
        t.landTitle;

    const note =
        type === 'inheritance' ? t.inheritanceNote :
        type === 'kabinnama' ? t.kabinnamaNote :
        type === 'marriage' ? t.marriageNote :
        t.landNote;

    const calculate = () => {
        setError('');
        if (type === 'marriage') {
            const sel = items.filter((i) => i.on);
            setResult({
                mode: 'marriage',
                rows: sel.map((i) => ({ label: i.label, min: i.min, max: i.max })),
                min: sel.reduce((a, i) => a + i.min, 0),
                max: sel.reduce((a, i) => a + i.max, 0),
            });
            return;
        }

        const v = parseFloat(normalizeDigits(value));
        if (!isFinite(v) || v <= 0) {
            setResult(null);
            setError(t.invalid);
            return;
        }

        if (type === 'kabinnama') {
            const upto4L = Math.min(v, 400000);
            const above4L = Math.max(0, v - 400000);
            const firstSlabFee = (upto4L / 1000) * 12.5;
            const extraLakhs = above4L > 0 ? Math.ceil(above4L / 100000) : 0;
            const secondSlabFee = extraLakhs * 100;
            const govtFee = Math.max(200, Math.round(firstSlabFee + secondSlabFee));
            const rows = [
                {
                    label: lang === 'bn' ? 'প্রথম ৪ লাখ টাকা পর্যন্ত ফি (প্রতি লাখে ১,২৫০৳)' : 'Fee on first BDT 4,00,000 (BDT 1,250/lakh)',
                    amount: Math.round(firstSlabFee),
                },
                {
                    label: lang === 'bn' ? '৪ লাখের অতিরিক্ত দেনমোহরের ফি (প্রতি লাখে ১০০৳)' : 'Fee on amount above BDT 4,00,000 (BDT 100/lakh)',
                    amount: Math.round(secondSlabFee),
                },
            ];
            setResult({
                mode: 'kabinnama',
                rows,
                total: govtFee,
                totalLabel: lang === 'bn' ? 'মোট সরকারি কাবিন রেজিস্ট্রেশন ফি' : 'Total Official Govt Kabinnama Fee',
            });
            return;
        }

        if (type === 'inheritance') {
            const nSons = Math.max(0, parseInt(sons, 10) || 0);
            const nDaughters = Math.max(0, parseInt(daughters, 10) || 0);
            const hasChildren = nSons > 0 || nDaughters > 0;

            let spouseShare = 0;
            if (spouse === 'wife') spouseShare = hasChildren ? 1 / 8 : 1 / 4;
            else if (spouse === 'husband') spouseShare = hasChildren ? 1 / 4 : 1 / 2;

            const motherShare = motherAlive ? (hasChildren ? 1 / 6 : 1 / 3) : 0;
            const fatherShare = fatherAlive ? (1 / 6) : 0;

            const fixedTotal = spouseShare + motherShare + fatherShare;
            const residue = Math.max(0, 1 - fixedTotal);

            const rows = [];
            if (spouseShare > 0) {
                rows.push({
                    label: lang === 'bn'
                        ? (spouse === 'wife' ? 'স্ত্রীর অংশ (১/৮ বা ১২.৫%)' : 'স্বামীর অংশ (১/৪ বা ২৫%)')
                        : (spouse === 'wife' ? 'Wife Share' : 'Husband Share'),
                    shareText: `${fmtNum(v * spouseShare)} (${fmtNum(spouseShare * 100)}%)`,
                });
            }
            if (motherShare > 0) {
                rows.push({
                    label: lang === 'bn' ? 'মায়ের অংশ (১/৬ বা ১৬.৬৭%)' : 'Mother Share (1/6)',
                    shareText: `${fmtNum(v * motherShare)} (${fmtNum(motherShare * 100)}%)`,
                });
            }
            if (fatherShare > 0) {
                rows.push({
                    label: lang === 'bn' ? 'বাবার অংশ (১/৬ বা ১৬.৬৭%)' : 'Father Share (1/6)',
                    shareText: `${fmtNum(v * fatherShare)} (${fmtNum(fatherShare * 100)}%)`,
                });
            }

            const totalChildUnits = nSons * 2 + nDaughters;
            if (totalChildUnits > 0) {
                const perUnit = residue / totalChildUnits;
                if (nSons > 0) {
                    const eachSon = perUnit * 2;
                    rows.push({
                        label: lang === 'bn'
                            ? `প্রত্যেক ছেলের অংশ (${nSons} জন ছেলে — মেয়ের দ্বিগুণ)`
                            : `Each Son's Share (${nSons} Son${nSons > 1 ? 's' : ''})`,
                        shareText: `${fmtNum(v * eachSon)} (${fmtNum(eachSon * 100)}%)`,
                    });
                }
                if (nDaughters > 0) {
                    const eachDaughter = perUnit;
                    rows.push({
                        label: lang === 'bn'
                            ? `প্রত্যেক মেয়ের অংশ (${nDaughters} জন মেয়ে)`
                            : `Each Daughter's Share (${nDaughters} Daughter${nDaughters > 1 ? 's' : ''})`,
                        shareText: `${fmtNum(v * eachDaughter)} (${fmtNum(eachDaughter * 100)}%)`,
                    });
                }
            }

            setResult({
                mode: 'inheritance',
                rows,
                totalText: `${fmtNum(v)} (100%)`,
                totalLabel: lang === 'bn' ? 'মোট বন্টিত সম্পত্তি (ফারায়েজ অনুযায়ী)' : 'Total Distributed Estate (100%)',
            });
            return;
        }

        const rows = rates.map((r) => ({
            label: lang === 'bn' ? r.bn : r.en,
            rate: r.rate,
            amount: (v * (Number(r.rate) || 0)) / 100,
        }));
        const total = rows.reduce((a, r) => a + r.amount, 0);
        setResult({
            mode: 'land',
            rows,
            total,
            pct: rows.reduce((a, r) => a + (Number(r.rate) || 0), 0),
        });
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
            <p style={{ margin: '0 0 1.1rem', fontSize: '0.88rem', lineHeight: 1.65, color: 'var(--text-muted, #94a3b8)' }}>{note}</p>

            {type === 'land' && (
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
            )}

            {type === 'kabinnama' && (
                <>
                    <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.4rem', color: 'var(--text, inherit)' }}>{t.dowerLabel}</label>
                    <input
                        inputMode="numeric" value={value} placeholder={t.dowerPlaceholder} style={input}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') calculate(); }}
                    />
                </>
            )}

            {type === 'inheritance' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '0.85rem' }}>
                    <div>
                        <label style={{ display: 'block', fontWeight: 700, fontSize: '0.86rem', marginBottom: '0.35rem', color: 'var(--text, inherit)' }}>{t.estateLabel}</label>
                        <input
                            inputMode="numeric" value={value} placeholder={t.estatePlaceholder} style={input}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontWeight: 700, fontSize: '0.86rem', marginBottom: '0.35rem', color: 'var(--text, inherit)' }}>{t.spouseLabel}</label>
                        <select value={spouse} onChange={(e) => setSpouse(e.target.value)} style={input}>
                            <option value="wife">{t.spouseWife}</option>
                            <option value="husband">{t.spouseHusband}</option>
                            <option value="none">{t.spouseNone}</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontWeight: 700, fontSize: '0.86rem', marginBottom: '0.35rem', color: 'var(--text, inherit)' }}>{t.sonsLabel}</label>
                        <input type="number" min="0" max="20" value={sons} onChange={(e) => setSons(e.target.value)} style={input} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontWeight: 700, fontSize: '0.86rem', marginBottom: '0.35rem', color: 'var(--text, inherit)' }}>{t.daughtersLabel}</label>
                        <input type="number" min="0" max="20" value={daughters} onChange={(e) => setDaughters(e.target.value)} style={input} />
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text, inherit)', cursor: 'pointer' }}>
                        <input type="checkbox" checked={motherAlive} onChange={(e) => setMotherAlive(e.target.checked)} />
                        <span>{t.motherAlive}</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text, inherit)', cursor: 'pointer' }}>
                        <input type="checkbox" checked={fatherAlive} onChange={(e) => setFatherAlive(e.target.checked)} />
                        <span>{t.fatherAlive}</span>
                    </label>
                </div>
            )}

            {type === 'marriage' && (
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
                                        {r.shareText !== undefined ? r.shareText : r.amount !== undefined ? fmt(r.amount) : `${fmt(r.min)} - ${fmt(r.max)}`}
                                    </td>
                                </tr>
                            ))}
                            <tr style={{ fontWeight: 800 }}>
                                <td style={{ padding: '0.65rem 0.25rem' }}>
                                    {result.mode === 'land'
                                        ? `${t.total} (~${(Math.round(result.pct * 100) / 100)}%)`
                                        : result.totalLabel || t.totalRange}
                                </td>
                                <td style={{ padding: '0.65rem 0.25rem', textAlign: 'right', whiteSpace: 'nowrap', color: 'var(--accent, #c6a75e)' }}>
                                    {result.mode === 'inheritance'
                                        ? result.totalText
                                        : result.mode === 'land' || result.mode === 'kabinnama'
                                            ? fmt(result.total)
                                            : `${fmt(result.min)} - ${fmt(result.max)}`}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {result.mode === 'land' && <p style={{ margin: '0.75rem 0 0', fontSize: '0.8rem', color: 'var(--text-muted, #94a3b8)' }}>{t.excluded}</p>}
                </div>
            )}
        </section>
    );
}
