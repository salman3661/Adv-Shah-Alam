import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import About from '../components/About';

// Below-fold sections are lazy-loaded — reduces initial JS parse on mobile
const Services    = lazy(() => import('../components/Services'));
const FAQ         = lazy(() => import('../components/FAQ'));
const BlogPreview = lazy(() => import('../components/BlogPreview'));
const Timeline    = lazy(() => import('../components/Timeline'));
const Chambers    = lazy(() => import('../components/Chambers'));
const Contact     = lazy(() => import('../components/Contact'));

// Minimal in-place fallback — preserves document height to avoid CLS
const SectionFallback = () => <div style={{ minHeight: '200px' }} aria-hidden="true" />;

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Trusted Lawyer in Bangladesh | Advocate Md. Shah Alam — Uttara, Dhaka</title>
                <meta name="description" content="Advocate Md. Shah Alam is a trusted lawyer in Bangladesh for criminal, divorce, bail &amp; land cases. Visit our Uttara chamber in Dhaka – 20+ years of legal excellence." />
                <link rel="canonical" href="https://advmdshahalam.me/" />
                <meta name="robots" content="index, follow" />
                {/* OpenGraph */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Trusted Lawyer in Bangladesh | Advocate Md. Shah Alam — Uttara, Dhaka" />
                <meta property="og:description" content="Trusted criminal, divorce, land &amp; Supreme Court lawyer in Uttara, Dhaka. 20+ years expertise. Free WhatsApp consultation today." />
                <meta property="og:url" content="https://advmdshahalam.me/" />
                <meta property="og:image" content="https://advmdshahalam.me/images/hero/hero-md-shah-alam.png" />
                <meta property="og:site_name" content="Advocate Md. Shah Alam" />
                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Trusted Lawyer in Bangladesh | Advocate Md. Shah Alam — Uttara, Dhaka" />
                <meta name="twitter:description" content="Expert criminal, divorce, land &amp; Supreme Court lawyer in Uttara, Dhaka. 20+ years experience." />
                <meta name="twitter:image" content="https://advmdshahalam.me/images/hero/hero-md-shah-alam.png" />
            </Helmet>
            <Hero />
            <About />
            <Suspense fallback={<SectionFallback />}>
                <Services />
                <FAQ />
                <BlogPreview />
                <Timeline />
                <Chambers />
                <Contact />
            </Suspense>
        </>
    );
};

export default Home;
