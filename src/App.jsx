import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

// Components
import Hero from './components/Hero';
import PracticeAreas from './components/PracticeAreas';
import Milestones from './components/Milestones';
import Academics from './components/Academics';
import Contact from './components/Contact';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        {/* ScrollToTop logic might need adjustment for single page, but keeping for reload reset */}
        <Layout>
          <Hero />
          <PracticeAreas />
          <Milestones />
          <Academics />
          <Contact />
        </Layout>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;


