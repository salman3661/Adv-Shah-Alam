import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Education from './pages/Education';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

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
              {/* Service short-slug aliases (used by blog internal links) */}
              <Route path="/criminal-lawyer-uttara" element={<CriminalLawyer />} />
              <Route path="/divorce-lawyer-uttara" element={<DivorceLawyer />} />
              <Route path="/land-property-lawyer-uttara" element={<LandLawyer />} />
              <Route path="/bail-lawyer-dhaka" element={<BailLawyer />} />
              <Route path="/supreme-court-lawyer-bangladesh" element={<SupremeCourtLawyer />} />
              <Route path="/tax-vat-lawyer-dhaka" element={<TaxLawyer />} />
              {/* Blog */}
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
