import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

// Admin panel — standalone SPA with its own layout (no site Layout wrapper)
import AdminApp from './pages/admin/AdminApp';

// Eagerly imported public pages for instant transitions and zero flashes
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Education from './pages/Education';
import CriminalLawyer from './pages/services/CriminalLawyer';
import DivorceLawyer from './pages/services/DivorceLawyer';
import LandLawyer from './pages/services/LandLawyer';
import BailLawyer from './pages/services/BailLawyer';
import SupremeCourtLawyer from './pages/services/SupremeCourtLawyer';
import TaxLawyer from './pages/services/TaxLawyer';
import CompanyCorporateLawyer from './pages/services/CompanyCorporateLawyer';
import AdvocatePage from './pages/AdvocatePage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import ContactPage from './pages/ContactPage';

// Lazy-loaded large blog pages (and their JSON articles) to keep initial bundle size minimal
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const BlogBn = lazy(() => import('./pages/BlogBn'));
const BlogPostBn = lazy(() => import('./pages/BlogPostBn'));

// Minimal fallback — transparent and keeps layout stable
const PageFallback = () => null;

function App() {


  return (
    <>
      <HelmetProvider>
        <ThemeProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              {/* Admin panel — completely outside site Layout */}
              <Route path="/admin/*" element={<AdminApp />} />

              {/* Public site — wrapped in Layout */}
              <Route path="/*" element={
                <Layout>
                  <Suspense fallback={<PageFallback />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/education" element={<Education />} />
                      <Route path="/advocate-md-shah-alam" element={<AdvocatePage />} />

                      <Route path="/services/criminal-lawyer" element={<CriminalLawyer />} />
                      <Route path="/services/divorce-lawyer" element={<DivorceLawyer />} />
                      <Route path="/services/land-lawyer" element={<LandLawyer />} />
                      <Route path="/services/bail-lawyer" element={<BailLawyer />} />
                      <Route path="/services/supreme-court-lawyer" element={<SupremeCourtLawyer />} />
                      <Route path="/services/tax-lawyer" element={<TaxLawyer />} />
                      <Route path="/services/company-corporate-lawyer" element={<CompanyCorporateLawyer />} />

                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:slug" element={<BlogPost />} />

                      <Route path="/bn/blog" element={<BlogBn />} />
                      <Route path="/bn/blog/:slug" element={<BlogPostBn />} />

                      <Route path="/bn/services/criminal-lawyer" element={<Navigate to="/services/criminal-lawyer" replace />} />
                      <Route path="/bn/services/divorce-lawyer" element={<Navigate to="/services/divorce-lawyer" replace />} />
                      <Route path="/bn/services/land-lawyer" element={<Navigate to="/services/land-lawyer" replace />} />
                      <Route path="/bn/services/bail-lawyer" element={<Navigate to="/services/bail-lawyer" replace />} />
                      <Route path="/bn/services/supreme-court-lawyer" element={<Navigate to="/services/supreme-court-lawyer" replace />} />
                      <Route path="/bn/services/tax-lawyer" element={<Navigate to="/services/tax-lawyer" replace />} />
                      <Route path="/bn/services/company-corporate-lawyer" element={<Navigate to="/services/company-corporate-lawyer" replace />} />
                      <Route path="/bn/advocate-md-shah-alam" element={<Navigate to="/advocate-md-shah-alam" replace />} />

                      {/* Contact page — standalone, required by AdSense */}
                      <Route path="/contact" element={<ContactPage />} />

                      {/* Legal pages (AdSense compliance) */}
                      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                      <Route path="/terms" element={<TermsConditions />} />

                      {/* 404 — must be last */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </Layout>
              } />
            </Routes>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
      <SpeedInsights />
      <Analytics />
    </>
  );
}

export default App;
