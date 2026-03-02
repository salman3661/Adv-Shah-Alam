import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Education from './pages/Education';

// Service Pages
import CriminalLawyer from './pages/services/CriminalLawyer';
import DivorceLawyer from './pages/services/DivorceLawyer';
import LandLawyer from './pages/services/LandLawyer';
import BailLawyer from './pages/services/BailLawyer';
import SupremeCourtLawyer from './pages/services/SupremeCourtLawyer';
import TaxLawyer from './pages/services/TaxLawyer';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/education" element={<Education />} />
              {/* Service Pages */}
              <Route path="/services/criminal-lawyer" element={<CriminalLawyer />} />
              <Route path="/services/divorce-lawyer" element={<DivorceLawyer />} />
              <Route path="/services/land-lawyer" element={<LandLawyer />} />
              <Route path="/services/bail-lawyer" element={<BailLawyer />} />
              <Route path="/services/supreme-court-lawyer" element={<SupremeCourtLawyer />} />
              <Route path="/services/tax-lawyer" element={<TaxLawyer />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
