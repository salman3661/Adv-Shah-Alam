import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import FAQ from '../components/FAQ';
import BlogPreview from '../components/BlogPreview';
import Timeline from '../components/Timeline';
import Chambers from '../components/Chambers';
import Contact from '../components/Contact';

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Advocate Md. Shah Alam – Lawyer in Uttara, Dhaka | Supreme Court Bangladesh</title>
                <meta name="description" content="Advocate Md. Shah Alam – criminal, divorce, land & Supreme Court lawyer in Uttara, Dhaka. 20+ years experience. Free legal consultation – call +880 1712-655546." />
                <link rel="canonical" href="https://www.advmdshahalam.me/" />
                {/* OpenGraph */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Advocate Md. Shah Alam – Lawyer in Uttara, Dhaka" />
                <meta property="og:description" content="Experienced criminal, family, property & Supreme Court lawyer in Uttara, Dhaka. 20+ years expertise. Book a free consultation today." />
                <meta property="og:url" content="https://www.advmdshahalam.me/" />
                <meta property="og:image" content="https://www.advmdshahalam.me/images/hero/hero-md-shah-alam.png" />
                <meta property="og:site_name" content="Advocate Md. Shah Alam" />
                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Advocate Md. Shah Alam – Lawyer in Uttara, Dhaka" />
                <meta name="twitter:description" content="Expert criminal, divorce, land & Supreme Court lawyer in Uttara, Dhaka. 20+ years experience." />
                <meta name="twitter:image" content="https://www.advmdshahalam.me/images/hero/hero-md-shah-alam.png" />
            </Helmet>
            <Hero />
            <About />
            <Services />
            <FAQ />
            <BlogPreview />
            <Chambers />
            <Contact />
        </>
    );
};

export default Home;
