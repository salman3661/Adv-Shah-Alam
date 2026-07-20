import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import About from '../components/About';
import BackToTop from '../components/BackToTop';

// Below-fold sections are lazy-loaded — reduces initial JS parse on mobile
const Services       = lazy(() => import('../components/Services'));
const FAQ            = lazy(() => import('../components/FAQ'));
const Testimonials   = lazy(() => import('../components/Testimonials'));
const HumanStory     = lazy(() => import('../components/HumanStory'));
const BlogPreview    = lazy(() => import('../components/BlogPreview'));
const Timeline       = lazy(() => import('../components/Timeline'));
const Chambers       = lazy(() => import('../components/Chambers'));
const Contact        = lazy(() => import('../components/Contact'));

// Minimal in-place fallback — preserves document height to avoid CLS
const SectionFallback = () => <div style={{ minHeight: '200px' }} aria-hidden="true" />;

const Home = ({ lang = 'en' }) => {
    const isBn = lang === 'bn';
    const title = isBn 
        ? "বিশ্বস্ত আইনজীবী বাংলাদেশ | অ্যাডভোকেট মো. শাহ আলম — উত্তরা, ঢাকা" 
        : "Trusted Lawyer in Bangladesh | Advocate Md. Shah Alam — Uttara, Dhaka";
    const description = isBn
        ? "অ্যাডভোকেট মো. শাহ আলম বাংলাদেশের সুপ্রিম কোর্টের একজন অভিজ্ঞ আইনজীবী। ফৌজদারি মামলা, বিবাহবিচ্ছেদ, জামিন ও জমি সংক্রান্ত সমস্যার জন্য উত্তরা চেম্বারে যোগাযোগ করুন।"
        : "Advocate Md. Shah Alam is a trusted lawyer in Bangladesh for criminal, divorce, bail & land cases. Visit our Uttara chamber in Dhaka – 10+ years of legal excellence.";
    const canonical = isBn
        ? "https://www.advmdshahalam.me/bn"
        : "https://www.advmdshahalam.me/";

    return (
        <>
            <Helmet htmlAttributes={{ lang: isBn ? 'bn' : 'en' }}>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={canonical} />
                <meta name="robots" content="index, follow" />
                {/* hreflang alternates */}
                <link rel="alternate" hreflang="en" href="https://www.advmdshahalam.me/" />
                <link rel="alternate" hreflang="bn" href="https://www.advmdshahalam.me/bn" />
                {/* OpenGraph */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={canonical} />
                <meta property="og:image" content="https://www.advmdshahalam.me/images/hero/hero-md-shah-alam.png" />
                <meta property="og:site_name" content="Advocate Md. Shah Alam" />
                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content="https://www.advmdshahalam.me/images/hero/hero-md-shah-alam.png" />
            </Helmet>
            <Hero lang={lang} />
            <About lang={lang} />
            <Suspense fallback={<SectionFallback />}>
                <Services lang={lang} />
                <FAQ lang={lang} />
                <Testimonials lang={lang} />
                <HumanStory lang={lang} />
                <BlogPreview lang={lang} />
                <Timeline lang={lang} />
                <Chambers lang={lang} />
                <Contact lang={lang} />
            </Suspense>
            <BackToTop />
        </>
    );
};

export default Home;
