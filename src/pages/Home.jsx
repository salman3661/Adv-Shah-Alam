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
                <title>Advocate Md. Shah Alam – Lawyer in Uttara, Dhaka</title>
                <meta name="description" content="Advocate Md. Shah Alam – criminal, divorce, land &amp; Supreme Court lawyer in Uttara, Dhaka. 20+ years experience. Call +880 1955-802007 for legal consultation." />
                <link rel="canonical" href="https://www.advmdshahalam.me/" />
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
