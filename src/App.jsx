import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Education from './pages/Education';
import BlogPlaceholder from './pages/BlogPlaceholder';

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
              {/* Blog Placeholder Pages */}
              <Route path="/blog/child-custody-law-bangladesh" element={
                <BlogPlaceholder
                  title="Child Custody Law in Bangladesh"
                  description="A comprehensive guide to child custody rights, guardianship laws, and how family courts in Bangladesh determine the best interest of the child after divorce or separation."
                  metaTitle="Child Custody Law in Bangladesh – Legal Guide"
                  metaDesc="Understand child custody law in Bangladesh — hizanat, guardianship rights, and how family courts determine custody after divorce. Expert guide by Advocate Md. Shah Alam."
                />
              } />
              <Route path="/blog/mutation-process-bangladesh" element={
                <BlogPlaceholder
                  title="Mutation Process in Bangladesh (Namjari)"
                  description="Step-by-step guide to the land mutation (namjari) process in Bangladesh — how to transfer land records to your name after purchase or inheritance."
                  metaTitle="Mutation Process in Bangladesh (Namjari) | Legal Guide"
                  metaDesc="Learn the land mutation (namjari) process in Bangladesh — required documents, steps, fees, and common pitfalls explained by Advocate Md. Shah Alam."
                />
              } />
              <Route path="/blog/property-registration-process" element={
                <BlogPlaceholder
                  title="Property Registration Process in Bangladesh"
                  description="A detailed walkthrough of the property deed registration process in Bangladesh — stamp duty, required documents, and Sub-Registrar office procedure."
                  metaTitle="Property Registration Process in Bangladesh | Legal Guide"
                  metaDesc="Complete guide to property registration in Bangladesh — stamp duties, required documents, deed preparation, and Sub-Registrar office procedure by Advocate Md. Shah Alam."
                />
              } />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
