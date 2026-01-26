import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import PracticeAreas from '../components/PracticeAreas';
import Timeline from '../components/Timeline';
import Chambers from '../components/Chambers';
import Contact from '../components/Contact';

const Home = () => {
    return (
        <>
            <Hero />
            <About />
            <PracticeAreas />
            <Timeline isHome={true} />
            <Chambers />
            <Contact />
        </>
    );
};

export default Home;
