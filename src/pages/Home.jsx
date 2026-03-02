import React from 'react';
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
