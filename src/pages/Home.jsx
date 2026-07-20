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
        ? "বিশ্বস্ত আইনজীবী বাংলাদেশ | এডভোকেট মোঃ শাহ আলম — উত্তরা, ঢাকা" 
        : "Trusted Lawyer in Bangladesh | Advocate Md. Shah Alam — Uttara, Dhaka";
    const description = isBn
        ? "এডভোকেট মোঃ শাহ আলম — বাংলাদেশ সুপ্রীম কোর্টের অভিজ্ঞ আইনজীবী। ফৌজদারি মামলা, বিবাহবিচ্ছেদ, জামিন, ভূমি বিরোধ ও করপোরেট আইনে বিশেষজ্ঞ। উত্তরা, ঢাকায় আমাদের চেম্বারে আসুন অথবা সরাসরি WhatsApp করুন।"
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
                {isBn && <meta name="keywords" content="আইনজীবী ঢাকা, এডভোকেট উত্তরা, বাংলাদেশ সুপ্রীম কোর্ট আইনজীবী, জামিন আইনজীবী, ফৌজদারি মামলা, বিবাহবিচ্ছেদ আইনজীবী, ভূমি বিরোধ, এডভোকেট মোঃ শাহ আলম" />}
                {/* hreflang alternates */}
                <link rel="alternate" hreflang="en" href="https://www.advmdshahalam.me/" />
                <link rel="alternate" hreflang="bn" href="https://www.advmdshahalam.me/bn" />
                <link rel="alternate" hreflang="x-default" href="https://www.advmdshahalam.me/" />
                {/* OpenGraph */}
                <meta property="og:type" content="website" />
                <meta property="og:locale" content={isBn ? 'bn_BD' : 'en_US'} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={canonical} />
                <meta property="og:image" content="https://www.advmdshahalam.me/images/hero/hero-md-shah-alam.png" />
                <meta property="og:site_name" content={isBn ? 'এডভোকেট মোঃ শাহ আলম' : 'Advocate Md. Shah Alam'} />
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
