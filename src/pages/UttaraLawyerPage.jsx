import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, MessageCircle, MapPin, Scale, ShieldCheck, ArrowRight, Clock } from 'lucide-react';
import { telLink, waLink } from '../data/contactInfo';
import { SITE_BASE } from '../seo/entity';
import { UTTARA_FAQS_EN, UTTARA_FAQS_BN } from '../data/uttaraFaqs';

const AREA_TABLE = [
  {
    areaEn: 'Uttara Sectors 11–14 (Chamber: Sector 12)',
    areaBn: 'উত্তরা সেক্টর ১১–১৪ (চেম্বার: সেক্টর ১২)',
    psEn: 'Uttara West PS — H-48, Road 18, Sector 11',
    psBn: 'উত্তরা পশ্চিম থানা — বাড়ি ৪৮, রোড ১৮, সেক্টর ১১',
    ward: 'DNCC Ward 51',
    wardBn: 'ডিএনসিসি ওয়ার্ড ৫১',
    focusEn: 'Land registration, mutation, cheque recovery, rent eviction, family disputes',
    focusBn: 'জমি রেজিস্ট্রি, নামজারি, চেক মামলা, ভাড়াটিয়া উচ্ছেদ, পারিবারিক বিরোধ',
  },
  {
    areaEn: 'Uttara Sectors 3, 5, 7, 9, 10',
    areaBn: 'উত্তরা সেক্টর ৩, ৫, ৭, ৯, ১০',
    psEn: 'Uttara West PS — H-48, Road 18, Sector 11',
    psBn: 'উত্তরা পশ্চিম থানা — বাড়ি ৪৮, রোড ১৮, সেক্টর ১১',
    ward: 'DNCC Ward 1 / 51',
    wardBn: 'ডিএনসিসি ওয়ার্ড ১ / ৫১',
    focusEn: 'Property transfer, bail & FIR matters, inheritance & succession',
    focusBn: 'জমি হস্তান্তর, জামিন ও জিডি/এফআইআর, উত্তরাধিকার সনদ',
  },
  {
    areaEn: 'Uttara Sectors 1, 2, 4, 6, 8',
    areaBn: 'উত্তরা সেক্টর ১, ২, ৪, ৬, ৮',
    psEn: 'Uttara East PS — R-14/D, Sector 4, H-12',
    psBn: 'উত্তরা পূর্ব থানা — রোড ১৪/ডি, সেক্টর ৪, বাড়ি ১২',
    ward: 'DNCC Ward 1',
    wardBn: 'ডিএনসিসি ওয়ার্ড ১',
    focusEn: 'Section 138 cheque dishonour, bail petitions, commercial & tenancy matters',
    focusBn: '১৩৮ ধারা চেক মামলা, জামিন, বাণিজ্যিক ও ভাড়া সংক্রান্ত বিরোধ',
  },
  {
    areaEn: 'Baunia, Dolipara, Diabari, Kamarpara, Bhatulia',
    areaBn: 'বাউনিয়া, দলিপাড়া, দিয়াবাড়ি, কামারপাড়া, ভাটুলিয়া',
    psEn: 'Uttara West PS / Turag PS / Dakshinkhan PS',
    psBn: 'উত্তরা পশ্চিম / তুরাগ / দক্ষিণখান থানা',
    ward: 'DNCC Ward 52–54',
    wardBn: 'ডিএনসিসি ওয়ার্ড ৫২–৫৪',
    focusEn: 'Khatian/CS-RS-BS record correction, boundary & partition suits, civil injunction',
    focusBn: 'খতিয়ান সংশোধন, সীমানা ও বাটোয়ারা মামলা, দেওয়ানি নিষেধাজ্ঞা',
  },
  {
    areaEn: 'Turag',
    areaBn: 'তুরাগ',
    psEn: 'Turag PS (DMP Directory)',
    psBn: 'তুরাগ থানা (ডিএমপি ডিরেক্টরি)',
    ward: 'DNCC Ward 1 / 52',
    wardBn: 'ডিএনসিসি ওয়ার্ড ১ / ৫২',
    focusEn: 'Land possession, tenancy disputes, criminal defence & bail',
    focusBn: 'জমি দখল ও মালিকানা বিরোধ, ভাড়াটিয়া বিরোধ, ফৌজদারি জামিন',
  },
  {
    areaEn: 'Dakshinkhan',
    areaBn: 'দক্ষিণখান',
    psEn: 'Dakshinkhan PS — Bidurbari Road, Thana More',
    psBn: 'দক্ষিণখান থানা — বিদুরবাড়ি রোড, থানা মোড়',
    ward: 'DNCC Ward 48–50',
    wardBn: 'ডিএনসিসি ওয়ার্ড ৪৮–৫০',
    focusEn: 'Family court cases, maintenance, custody, land mutation',
    focusBn: 'পারিবারিক আদালত, দেনমোহর ও খোরপোশ, সন্তানের হেফাজত, নামজারি',
  },
  {
    areaEn: 'Airport (Bimanbandar)',
    areaBn: 'বিমানবন্দর (এয়ারপোর্ট)',
    psEn: 'Bimanbandar PS — 1st Floor RAB (HQ), Uttara',
    psBn: 'বিমানবন্দর থানা — ১ম তলা র‍্যাব সদর দপ্তর, উত্তরা',
    ward: '—',
    wardBn: '—',
    focusEn: 'Urgent arrest/bail support, NRB arrival & travel-ban writ matters',
    focusBn: 'জরুরি গ্রেফতার ও জামিন সহায়তা, প্রবাসীদের ভ্রমণ-নিষেধাজ্ঞা রিট',
  },
  {
    areaEn: 'Gulshan',
    areaBn: 'গুলশান',
    psEn: 'Gulshan PS — H-32, 115 Gulshan Avenue, Gulshan-2',
    psBn: 'গুলশান থানা — বাড়ি ৩২, ১১৫ গুলশান অ্যাভিনিউ, গুলশান-২',
    ward: 'DNCC Ward 19 & 20',
    wardBn: 'ডিএনসিসি ওয়ার্ড ১৯ ও ২০',
    focusEn: 'Rent Control Act 1991 eviction, corporate advisory, embassy/MOFA attestation',
    focusBn: 'বাড়ি ভাড়া নিয়ন্ত্রণ আইন ১৯৯১-এ উচ্ছেদ, কর্পোরেট ও দূতাবাস সত্যায়ন',
  },
  {
    areaEn: 'Banani',
    areaBn: 'বনানী',
    psEn: 'Banani PS — R-7, H-37, Banani',
    psBn: 'বনানী থানা — রোড ৭, বাড়ি ৩৭, বনানী',
    ward: 'DNCC Ward 19',
    wardBn: 'ডিএনসিসি ওয়ার্ড ১৯',
    focusEn: 'RJSC company filings, commercial lease disputes, NRB Power of Attorney',
    focusBn: 'আরজেএসসি কোম্পানি রেজিস্ট্রেশন, বাণিজ্যিক চুক্তি ও প্রবাসী পাওয়ার অব অ্যাটর্নি',
  },
  {
    areaEn: 'Bashundhara Residential Area',
    areaBn: 'বসুন্ধরা আবাসিক এলাকা',
    psEn: 'Vatara PS — Progoti Soroni, Gulshan Notun Bazar (+ Badda / Khilkhet PS; proposed Bashundhara PS awaiting ministry approval)',
    psBn: 'ভাটারা থানা — প্রগতি সরণি, গুলশান নতুন বাজার (+ বাড্ডা / খিলক্ষেত থানা; প্রস্তাবিত বসুন্ধরা থানা মন্ত্রণালয়ের অনুমোদনের অপেক্ষায়)',
    ward: 'DNCC (Vatara / Khilkhet)',
    wardBn: 'ডিএনসিসি (ভাটারা / খিলক্ষেত)',
    focusEn: 'Plot/flat title verification, transfer approval, apartment committee & eviction',
    focusBn: 'প্লট ও ফ্ল্যাট দলিল যাচাই, হস্তান্তর অনুমোদন ও অ্যাপার্টমেন্ট বিরোধ',
  },
];

const SERVICES_EN = [
  { to: '/services/criminal-lawyer', label: 'Criminal Lawyer (Uttara West/East PS, Turag, Airport)' },
  { to: '/services/bail-lawyer', label: 'Bail & Anticipatory Bail Lawyer (CMM Court & High Court)' },
  { to: '/services/land-lawyer', label: 'Land, Mutation & Lis Pendens Lawyer (Uttara & Bashundhara)' },
  { to: '/services/divorce-lawyer', label: 'Family, Divorce & Child Custody Lawyer (Uttara, Gulshan, Banani)' },
  { to: '/services/supreme-court-lawyer', label: 'Supreme Court Writ & Appeal Lawyer' },
  { to: '/services/company-corporate-lawyer', label: 'Corporate & Commercial Lawyer (Banani, Gulshan, Uttara)' },
  { to: '/services/tax-lawyer', label: 'Tax & Regulatory Compliance Advisory' },
];

const SERVICES_BN = [
  { to: '/bn/services/criminal-lawyer', label: 'ফৌজদারি আইনজীবী (উত্তরা পশ্চিম/পূর্ব, তুরাগ, বিমানবন্দর)' },
  { to: '/bn/services/bail-lawyer', label: 'জামিন ও আগাম জামিন আইনজীবী (সিএমএম ও হাইকোর্ট)' },
  { to: '/bn/services/land-lawyer', label: 'জমি, নামজারি ও লিস পেন্ডেন্স আইনজীবী (উত্তরা ও বসুন্ধরা)' },
  { to: '/bn/services/divorce-lawyer', label: 'পারিবারিক, তালাক ও সন্তান হেফাজত আইনজীবী (উত্তরা, গুলশান, বনানী)' },
  { to: '/bn/services/supreme-court-lawyer', label: 'সুপ্রিম কোর্ট রিট ও আপিল আইনজীবী' },
  { to: '/bn/services/company-corporate-lawyer', label: 'কোম্পানি ও কর্পোরেট আইনজীবী (বনানী, গুলশান, উত্তরা)' },
  { to: '/bn/services/tax-lawyer', label: 'আয়কর ও রেগুলেটরি পরামর্শ সেবা' },
];

export default function UttaraLawyerPage({ lang = 'en' }) {
  const isBn = lang === 'bn';
  const pageUrl = `${SITE_BASE}${isBn ? '/bn/uttara-lawyer' : '/uttara-lawyer'}`;
  const title = isBn
    ? 'উত্তরা আইনজীবী ঢাকা — ফৌজদারি, জমি, জামিন ও পারিবারিক'
    : 'Uttara Lawyer in Dhaka — Criminal, Land, Bail & Family Law';
  const description = isBn
    ? 'উত্তরা সেক্টর ১২ চেম্বার থেকে উত্তরা, গুলশান, বনানী ও বসুন্ধরার জমি, জামিন, ফৌজদারি, পারিবারিক ও ভাড়াটিয়া উচ্ছেদ মামলার আইনি সহায়তা। প্রথম পরামর্শ ফ্রি।'
    : 'Experienced Uttara lawyer at Sector 12 chamber serving Uttara, Gulshan, Banani, Bashundhara, Turag & Dakshinkhan in criminal, bail, land & family law. First consultation free.';

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{ color: 'var(--text)' }}>
      <Helmet>
        <html lang={isBn ? 'bn' : 'en'} />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />
        <link rel="alternate" hrefLang="en" href={`${SITE_BASE}/uttara-lawyer`} />
        <link rel="alternate" hrefLang="bn" href={`${SITE_BASE}/bn/uttara-lawyer`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_BASE}/uttara-lawyer`} />
      </Helmet>

      <article className="max-w-5xl mx-auto space-y-10">
        {/* Hero */}
        <header className="rounded-2xl p-6 sm:p-10 border" style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--accent)' }}>
            <MapPin size={15} />
            <span>
              {isBn
                ? 'বাড়ি ৪৬, রোড ৬/বি, সেক্টর ১২, উত্তরা পশ্চিম, ঢাকা ১২৩০'
                : 'House 46, Road 6/B, Sector 12, Uttara West, Dhaka 1230'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
            {isBn
              ? 'উত্তরা আইনজীবী ঢাকা — ফৌজদারি, জমি, জামিন ও পারিবারিক আইনি সেবা'
              : 'Uttara Lawyer in Dhaka — Criminal, Land, Bail & Family Legal Services'}
          </h1>
          <p className="text-base sm:text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
            {isBn
              ? 'অ্যাডভোকেট মো. শাহ আলম বাংলাদেশের সুপ্রিম কোর্ট ও ঢাকা জজ কোর্টের একজন তালিকাভুক্ত আইনজীবী। উত্তরার সেক্টর ১২-তে অবস্থিত চেম্বার থেকে তিনি উত্তরা মডেল টাউনের ১ থেকে ১৭ নম্বর সেক্টর, উত্তরা পশ্চিম, উত্তরা পূর্ব, তুরাগ, দক্ষিণখান, বিমানবন্দর, গুলশান, বনানী এবং বসুন্ধরা আবাসিক এলাকার ক্লায়েন্টদের নিয়মিত আইনি সহায়তা প্রদান করেন। প্রথম পরামর্শ ফ্রি — কাজের পরিধি বুঝিয়ে ও ঠিক করার পরেই কেবল ফি নির্ধারণ করা হয়, কোনো অগ্রিম ফি নেওয়া হয় না।'
              : 'Advocate Md. Shah Alam is a Bangladesh Bar Council enrolled advocate practising before the Supreme Court of Bangladesh and Dhaka Judge Court. From his chamber in Sector 12, Uttara West, he represents local residents, businesses, and Non-Resident Bangladeshis (NRBs) with property or family matters across Uttara Sectors 1–17, Turag, Dakshinkhan, Airport, Gulshan, Banani, and Bashundhara Residential Area. The first consultation is free with no advance fee — legal fees are agreed only after explaining the scope of your matter.'}
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={waLink(isBn ? 'আসসালামু আলাইকুম, উত্তরা চেম্বারে আইনি পরামর্শের জন্য যোগাযোগ করছি।' : 'Hello, I would like a free first legal consultation regarding a matter in Uttara/North Dhaka.')}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="uttara_whatsapp_hero"
              data-placement="hero"
              data-area="uttara_sector12"
              data-service="general"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition"
            >
              <MessageCircle size={18} />
              <span>{isBn ? 'হোয়াটসঅ্যাপে ফ্রি পরামর্শ (+৮৮০ ১৯৫৫-৮০২০০৭)' : 'Free WhatsApp Consultation (+880 1955-802007)'}</span>
            </a>
            <a
              href={telLink()}
              data-cta="uttara_call_hero"
              data-placement="hero"
              data-area="uttara_sector12"
              data-service="general"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold border transition"
              style={{ borderColor: 'var(--card-border)', background: 'var(--surface)' }}
            >
              <Phone size={18} />
              <span>{isBn ? 'সরাসরি কল: ০১৭১২-৬৫৫৫৪৬' : 'Call Chamber: +880 1712-655546'}</span>
            </a>
            <Link
              to={isBn ? '/bn/contact' : '/contact'}
              data-cta="uttara_contact_link"
              data-placement="hero"
              data-area="uttara_sector12"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold border transition"
              style={{ borderColor: 'var(--card-border)' }}
            >
              <Clock size={18} />
              <span>{isBn ? 'চেম্বার অ্যাপয়েন্টমেন্ট' : 'Book Chamber Visit'}</span>
            </Link>
          </div>
        </header>

        {/* Quick Answer Table */}
        <section className="rounded-2xl p-6 sm:p-8 border" style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <h2 className="text-2xl font-bold mb-4">
            {isBn ? 'একনজরে উত্তরা চেম্বারের আইনি সহায়তা ও পরামর্শ তথ্য' : 'Quick Answer: Chamber Jurisdiction, Courts & Free First Consultation'}
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
                <tr>
                  <td className="p-3 border font-semibold" style={{ borderColor: 'var(--card-border)' }}>{isBn ? 'উত্তরা চেম্বার ঠিকানা' : 'Uttara Chamber Address'}</td>
                  <td className="p-3 border" style={{ borderColor: 'var(--card-border)' }}>{isBn ? 'বাড়ি ৪৬, রোড ৬/বি, সেক্টর ১২, উত্তরা পশ্চিম, ঢাকা ১২৩০ (রবি–বৃহস্পতি সকাল ৮টা–রাত ১০টা, শুক্র–শনি সকাল ১০টা–রাত ১০টা (উত্তরা))' : 'House 46, Road 6/B, Sector 12, Uttara West, Dhaka 1230 (Sun–Thu 08:00–22:00, Fri–Sat 10:00–22:00 (Uttara))'}</td>
                </tr>
                <tr>
                  <td className="p-3 border font-semibold" style={{ borderColor: 'var(--card-border)' }}>{isBn ? 'আওতাভুক্ত থানা' : 'Primary Police Stations'}</td>
                  <td className="p-3 border" style={{ borderColor: 'var(--card-border)' }}>{isBn ? 'উত্তরা পশ্চিম থানা, উত্তরা পূর্ব থানা, তুরাগ থানা, দক্ষিণখান থানা, বিমানবন্দর থানা, গুলশান, বনানী ও ভাটারা থানা' : 'Uttara West PS, Uttara East PS, Turag PS, Dakshinkhan PS, Bimanbandar (Airport) PS, Gulshan PS, Banani PS, Vatara PS'}</td>
                </tr>
                <tr>
                  <td className="p-3 border font-semibold" style={{ borderColor: 'var(--card-border)' }}>{isBn ? 'সংশ্লিষ্ট আদালত' : 'Courts Covered'}</td>
                  <td className="p-3 border" style={{ borderColor: 'var(--card-border)' }}>{isBn ? 'ঢাকা মেট্রোপলিটন ম্যাজিস্ট্রেট (সিএমএম) আদালত, ঢাকা জেলা ও দায়রা জজ আদালত (কোর্ট হাউস স্ট্রিট, কোতোয়ালি), পারিবারিক আদালত এবং বাংলাদেশ সুপ্রিম কোর্ট (হাইকোর্ট বিভাগ)' : 'Dhaka Chief Metropolitan Magistrate (CMM) Court, Dhaka Judge & Sessions Court (Kotwali), Family Court, and Supreme Court of Bangladesh (High Court Division)'}</td>
                </tr>
                <tr>
                  <td className="p-3 border font-semibold" style={{ borderColor: 'var(--card-border)' }}>{isBn ? 'পরামর্শ নীতি' : 'Consultation Policy'}</td>
                  <td className="p-3 border" style={{ borderColor: 'var(--card-border)' }}>{isBn ? 'প্রথম পরামর্শ ফ্রি — কোনো অগ্রিম ফি ছাড়াই আইনি অবস্থান ও করণীয় জেনে নিন। কাজের পরিধি নির্ধারণের পরেই কেবল ফি আলোচনা করা হয়।' : 'First consultation is free — no advance fee. Legal fees are discussed and agreed only after reviewing your documents and scope.'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Verified Local Area Table */}
        <section className="rounded-2xl p-6 sm:p-8 border" style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <h2 className="text-2xl font-bold mb-2">
            {isBn ? 'এলাকা অনুযায়ী আমরা কোথায় সাহায্য করি (উত্তরা, গুলশান, বনানী ও বসুন্ধরা)' : 'Areas We Serve Around Uttara, Gulshan, Banani & Bashundhara'}
          </h2>
          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
            {isBn
              ? 'উত্তরা ও উত্তর ঢাকার প্রতিটি এলাকা ও থানার অধিক্ষেত্র অনুযায়ী সঠিক আইনি পদক্ষেপ নেওয়া জরুরি। নিচের সারণিতে উত্তরা পশ্চিম, উত্তরা পূর্ব ও পার্শ্ববর্তী থানাগুলোর তথ্য (ঢাকা মেট্রোপলিটন পুলিশ ডিরেক্টরি অনুসারে) উল্লেখ করা হলো:'
              : 'Knowing the exact police station (thana) and DNCC ward jurisdiction avoids delays in filing a General Diary (GD), FIR, mutation, or eviction notice. The station names and addresses below are verified against the Dhaka Metropolitan Police (DMP) directory:'}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr style={{ background: 'var(--surface)' }}>
                  <th className="p-3 text-left border" style={{ borderColor: 'var(--card-border)' }}>{isBn ? 'এলাকা' : 'Area'}</th>
                  <th className="p-3 text-left border" style={{ borderColor: 'var(--card-border)' }}>{isBn ? 'সংশ্লিষ্ট থানা (DMP যাচাইকৃত)' : 'Police Station (DMP Verified)'}</th>
                  <th className="p-3 text-left border" style={{ borderColor: 'var(--card-border)' }}>{isBn ? 'ডিএনসিসি ওয়ার্ড' : 'DNCC Ward'}</th>
                  <th className="p-3 text-left border" style={{ borderColor: 'var(--card-border)' }}>{isBn ? 'প্রধান আইনি বিষয়' : 'Common Legal Matters'}</th>
                </tr>
              </thead>
              <tbody>
                {AREA_TABLE.map((row, idx) => (
                  <tr key={idx}>
                    <td className="p-3 border font-medium" style={{ borderColor: 'var(--card-border)' }}>{isBn ? row.areaBn : row.areaEn}</td>
                    <td className="p-3 border" style={{ borderColor: 'var(--card-border)' }}>{isBn ? row.psBn : row.psEn}</td>
                    <td className="p-3 border whitespace-nowrap" style={{ borderColor: 'var(--card-border)' }}>{isBn ? row.wardBn : row.ward}</td>
                    <td className="p-3 border" style={{ borderColor: 'var(--card-border)' }}>{isBn ? row.focusBn : row.focusEn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Detailed Practice Sections (ensures >= 1,200 words & deep helpful local guidance) */}
        <section className="rounded-2xl p-6 sm:p-8 border space-y-6" style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          {isBn ? (
            <>
              <div>
                <h2 className="text-2xl font-bold mb-3">উত্তরা এলাকায় জমি, ফ্ল্যাট নিবন্ধন ও নামজারি সংক্রান্ত আইনি সহায়তা</h2>
                <p className="leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                  উত্তরা মডেল টাউন, দিয়াবাড়ি, বাউনিয়া এবং পার্শ্ববর্তী বসুন্ধরা আবাসিক এলাকায় জমি বা ফ্ল্যাট ক্রয়-বিক্রয়ের আগে দলিল যাচাই অত্যন্ত গুরুত্বপূর্ণ। উত্তরার সেক্টর ১১, ১২, ১৩ ও ১৪-তে রাজউক প্লট হস্তান্তর, লিজে থাকা জমির অনুমোদন, বায়া দলিল (Chain of Deeds), সিএস-এসএ-আরএস ও মহানগর জরিপের খতিয়ান যাচাই এবং নামজারি (ই-নামজারি) সংক্রান্ত জটিলতা প্রায়ই দেখা যায়। উত্তরা সাব-রেজিস্ট্রি অফিস ও এসি (ল্যান্ড) অফিসের প্রক্রিয়া সম্পর্কে স্পষ্ট ধারণা না থাকলে ক্রেতা বড় ধরনের আর্থিক ঝুঁকিতে পড়তে পারেন।
                </p>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  আমাদের উত্তরা চেম্বার থেকে জমি ও ফ্ল্যাট রেজিস্ট্রির আগে লিগ্যাল ভেটিং (Title Due Diligence), লিস পেন্ডেন্স (Lis Pendens) বা মামলা চলমান আছে কি না তা যাচাই, বাটোয়ারা মামলা, হেবা বা দানপত্র দলিল, এবং প্রবাসী বাংলাদেশিদের (NRB) পাঠানো পাওয়ার অব অ্যাটর্নি যাচাই ও ব্যবহারের পূর্ণাঙ্গ আইনি সেবা দেওয়া হয়। উত্তরা এবং ঢাকার দেওয়ানি আদালতে জমির স্বত্ব ঘোষণা, দখল পুনরুদ্ধার ও নিষেধাজ্ঞার মোকদ্দমায় আমরা নিয়মিত মামলা পরিচালনা করি।
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">উত্তরা পশ্চিম ও উত্তরা পূর্ব থানায় ফৌজদারি মামলা, জিডি ও জামিন সহায়তা</h2>
                <p className="leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                  উত্তরা পশ্চিম থানা, উত্তরা পূর্ব থানা, তুরাগ, দক্ষিণখান বা বিমানবন্দর থানায় কোনো ফৌজদারি অভিযোগ বা এফআইআর (FIR) দায়ের হলে প্রথম ২৪ ঘণ্টার সিদ্ধান্ত সবচেয়ে গুরুত্বপূর্ণ। অনেক সময় পারিবারিক বিরোধ, ব্যবসায়িক পাওনা, বা জমি সংক্রান্ত দ্বন্দ্ব থেকে মিথ্যা মামলা বা হয়রানিমূলক অভিযোগ দায়ের করা হয়। গ্রেফতারের আশঙ্কা থাকলে ফৌজদারি কার্যবিধির ৪৯৮ ধারায় হাইকোর্ট বিভাগ থেকে আগাম জামিন (Anticipatory Bail) নেওয়া কিংবা নিম্ন আদালতে আত্মসমর্পণ করে জামিনের আবেদন করার সঠিক কৌশল নির্ধারণ করতে হয়।
                </p>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  উত্তরার ব্যবসায়িক ও ব্যক্তিগত লেনদেনে এনআই অ্যাক্টের ১৩৮ ধারায় চেক ডিজঅনার মামলাও খুব সাধারণ বিষয়। লিগ্যাল নোটিশ পাঠানো থেকে শুরু করে সিএমএম আদালতে মামলা দায়ের, সমন ও ওয়ারেন্ট জারি এবং আসামি পক্ষের জামিন ও আপস-মীমাংসা—প্রতিটি ধাপে উত্তরা চেম্বার থেকে দ্রুত পরামর্শ পাওয়া যায়। চেম্বার উত্তরা সেক্টর ১২-তে হওয়ায় উত্তরার বাসিন্দা ও পরিবারের সদস্যদের জন্য জরুরি কাগজপত্র নিয়ে সরাসরি দেখা করা সহজ হয়।
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">উত্তরা, গুলশান ও বনানীতে ভাড়াটিয়া উচ্ছেদ ও পারিবারিক মামলা</h2>
                <p className="leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                  উত্তরা, গুলশান এবং বনানীতে আবাসিক ফ্ল্যাট ও বাণিজ্যিক স্পেস ভাড়া নিয়ে বাড়িওয়ালা ও ভাড়াটিয়ার মধ্যে প্রায়ই বিরোধ তৈরি হয়। চুক্তির মেয়াদ শেষ হওয়ার পরও দোকান বা ফ্ল্যাট না ছাড়া, ভাড়া বকেয়া রাখা, কিংবা জামানত (Security Deposit) ফেরত না দেওয়া—এসব ক্ষেত্রে বাড়ি ভাড়া নিয়ন্ত্রণ আইন, ১৯৯১ এবং সম্পত্তি হস্তান্তর আইন, ১৮৮২-এর ১০৬ ধারা অনুযায়ী আইনানুগ নোটিশ ও দেওয়ানি আদালতে উচ্ছেদ মোকদ্দমা দায়ের করতে হয়। গায়ের জোরে তালা লাগানো বা বিদ্যুৎ-গ্যাস সংযোগ কাটা বেআইনি এবং তা বাড়ির মালিকের বিরুদ্ধেই ফৌজদারি মামলার ঝুঁকি তৈরি করে।
                </p>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  এছাড়া উত্তরা ও উত্তর ঢাকায় বসবাসরত পরিবারগুলোর তালাক, দেনমোহর ও খোরপোশ, সন্তানের হেফাজত (Child Custody), কোর্ট ম্যারেজ এবং প্রবাসীদের বিদেশি তালাক স্বীকৃতির বিষয়েও পারিবারিক আদালতে মামলা পরিচালনা ও মধ্যস্থতা করা হয়। উত্তরার সেক্টর ১২ চেম্বারে প্রথম পরামর্শ সম্পূর্ণ ফ্রি, যাতে আপনি মামলা করার আগে নিজের আইনগত অবস্থান ও বিকল্পগুলো পরিষ্কারভাবে বুঝতে পারেন।
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">বসুন্ধরা আবাসিক এলাকা ও প্রবাসী বাংলাদেশিদের (NRB) জন্য বিশেষ আইনি সেবা</h2>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  বসুন্ধরা আবাসিক এলাকার প্লট ও ফ্ল্যাট লেনদেনের আইনি কাঠামো সাধারণ এলাকার চেয়ে কিছুটা ভিন্ন—এখানে রাজউক অনুমোদন ও নামজারির পাশাপাশি হাউজিং কোম্পানির অভ্যন্তরীণ হস্তান্তর প্রক্রিয়া, অ্যাপার্টমেন্ট কমিটির নিয়ম এবং মালিকানা যাচাইয়ের প্রশ্ন জড়িত থাকে। উত্তরার কাছাকাছি অবস্থান হওয়ায় বসুন্ধরা আবাসিক এলাকা, গুলশান ও বনানীর ক্লায়েন্টরাও উত্তরার সেক্টর ১২ চেম্বারে এসে দলিল ও চুক্তিপত্র যাচাই করাতে পারেন। পাশাপাশি যুক্তরাজ্য, যুক্তরাষ্ট্র, কানাডা, অস্ট্রেলিয়া ও মধ্যপ্রাচ্যে থাকা প্রবাসী বাংলাদেশিরা উত্তরা এবং উত্তর ঢাকায় থাকা তাদের জমি, ফ্ল্যাট ও পারিবারিক মামলার জন্য পাওয়ার অব অ্যাটর্নি, দূতাবাস ও পররাষ্ট্র মন্ত্রণালয় (MOFA) সত্যায়ন এবং আদালতে প্রতিনিধিত্বের সুবিধা পান।
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h2 className="text-2xl font-bold mb-3">Land Registration, Mutation & Property Litigation in Uttara and Bashundhara</h2>
                <p className="leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                  Property transactions across Uttara Sectors 1–17, Diabari, Baunia, Turag, and nearby Bashundhara Residential Area carry significant title risks if deeds are not vetted before signing a Bayna (agreement for sale). Common issues include incomplete chain deeds (Baya Dalil), unverified RAJUK transfer permissions, mismatched CS/SA/RS/City Jarip Khatian records, pending civil suits (Lis Pendens), and delayed e-Namjari (mutation) before the local AC Land office.
                </p>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  From our Uttara Sector 12 chamber, we conduct pre-purchase title due diligence, draft sale deeds, Heba declarations, and partition deeds, verify Non-Resident Bangladeshi (NRB) Powers of Attorney executed abroad, and represent clients in civil suits for declaration of title, permanent injunction, cancellation of forged deeds, and recovery of possession before Dhaka civil courts.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">Criminal Defence, Bail & Section 138 Cheque Cases in Uttara Police Stations</h2>
                <p className="leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                  When a General Diary (GD), FIR, or warrant involves Uttara West Police Station, Uttara East Police Station, Turag PS, Dakshinkhan PS, or Bimanbandar (Airport) PS, early legal intervention protects your liberty and record. We assist with High Court anticipatory bail applications under Section 498 of the CrPC, regular bail hearings before the Dhaka CMM and Sessions Courts, police remand protection, and Section 561A quashment petitions for fabricated complaints.
                </p>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  For commercial and personal cheque dishonour disputes under Section 138 of the Negotiable Instruments Act, we handle statutory 30-day legal notices, filing complaints before the CMM Court, defending false cheque claims, and negotiating structured settlements. Having a local chamber inside Uttara Sector 12 allows families and business owners to bring certified copies and evidence without crossing the entire city during urgent deadlines.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">Rent Control, Tenant Eviction & Family Law Across Uttara, Gulshan & Banani</h2>
                <p className="leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                  Landlords and commercial tenants in Uttara, Gulshan, Banani, and Bashundhara frequently face disputes over unpaid rent, expired lease agreements, security deposit refunds, and refusal to vacate premises. Under the Premises Rent Control Act 1991 and Section 106 of the Transfer of Property Act 1882, landlords must serve a legally compliant notice to quit before filing an eviction suit in the Assistant Judge Court—cutting utility lines or locking premises forcefully exposes the landlord to criminal liability.
                </p>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Our family law practice covers divorce (Talaq, Khula, and Mubaraat), dower (Denmohor) and maintenance claims, child custody and guardianship petitions, court marriage under Muslim and Special Marriage Acts, and recognition of foreign divorce decrees for NRBs. Every matter begins with a free first consultation so you understand your legal position and options before committing to litigation.
                </p>
              </div>
            </>
          )}
        </section>


        {/* Local FAQs */}
        <section className="rounded-2xl p-6 sm:p-8 border space-y-4" style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <h2 className="text-2xl font-bold">
            {isBn ? 'উত্তরা চেম্বার ও আইনি সেবা সম্পর্কে সাধারণ প্রশ্নোত্তর (FAQ)' : 'Frequently Asked Questions — Uttara Legal Chamber'}
          </h2>
          <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {(isBn ? UTTARA_FAQS_BN : UTTARA_FAQS_EN).map((faq, idx) => (
              <div key={idx}>
                <h3 className="font-semibold text-base" style={{ color: 'var(--text)' }}>{faq.q}</h3>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal Links Hub (Services + Advocate + NRB + Related Blog) */}
        <section className="rounded-2xl p-6 sm:p-8 border" style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Scale size={22} style={{ color: 'var(--accent)' }} />
            <span>{isBn ? 'উত্তরা চেম্বারের বিশেষায়িত আইনি সেবাসমূহ' : 'Practice Areas & Legal Services'}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {(isBn ? SERVICES_BN : SERVICES_EN).map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className="flex items-center justify-between p-4 rounded-xl border hover:opacity-90 transition"
                style={{ borderColor: 'var(--card-border)', background: 'var(--surface)' }}
              >
                <span className="font-medium text-sm">{s.label}</span>
                <ArrowRight size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 text-sm font-semibold pt-2 border-t" style={{ borderColor: 'var(--card-border)' }}>
            <Link to={isBn ? '/bn/gulshan-lawyer' : '/gulshan-lawyer'} className="underline" style={{ color: 'var(--accent)' }}>
              {isBn ? 'গুলশান আইনজীবী (ওয়ার্ড ১৯ ও ২০)' : 'Gulshan Lawyer (DNCC Ward 19 & 20)'}
            </Link>
            <Link to={isBn ? '/bn/banani-lawyer' : '/banani-lawyer'} className="underline" style={{ color: 'var(--accent)' }}>
              {isBn ? 'বনানী আইনজীবী (ওয়ার্ড ১৯)' : 'Banani Lawyer (DNCC Ward 19)'}
            </Link>
            <Link to={isBn ? '/bn/bashundhara-ra-lawyer' : '/bashundhara-ra-lawyer'} className="underline" style={{ color: 'var(--accent)' }}>
              {isBn ? 'বসুন্ধরা আবাসিক এলাকা আইনজীবী' : 'Bashundhara R/A Lawyer'}
            </Link>
            <Link to="/advocate-md-shah-alam" className="underline" style={{ color: 'var(--accent)' }}>
              {isBn ? 'অ্যাডভোকেট মো. শাহ আলম — প্রোফাইল ও অভিজ্ঞতা' : 'Advocate Md. Shah Alam — Full Profile'}
            </Link>
            <Link to="/nrb-legal-help" className="underline" style={{ color: 'var(--accent)' }}>
              {isBn ? 'প্রবাসী বাংলাদেশিদের (NRB) আইনি সহায়তা' : 'NRB Legal Help (UK, USA, Canada, UAE)'}
            </Link>
            <Link to="/blog/uttara-dhaka-lawyer-legal-services-2026" className="underline" style={{ color: 'var(--accent)' }}>
              {isBn ? 'উত্তরা ঢাকা আইনি সেবা গাইড (ইংরেজি)' : 'Uttara Dhaka Legal Services Guide'}
            </Link>
            <Link to={isBn ? '/uttara-lawyer' : '/bn/uttara-lawyer'} className="underline" style={{ color: 'var(--accent)' }}>
              {isBn ? 'Read in English (Uttara Lawyer)' : 'বাংলায় পড়ুন (উত্তরা আইনজীবী)'}
            </Link>
          </div>
        </section>

        {/* Bilingual Free First Consultation Notice */}
        <section className="rounded-2xl p-6 sm:p-8 border" style={{ background: 'var(--surface)', borderColor: 'var(--card-border)' }}>
          <div className="flex items-start gap-3">
            <ShieldCheck size={24} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} />
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
