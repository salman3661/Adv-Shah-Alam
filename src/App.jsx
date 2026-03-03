import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

// Home is eager — it IS the first paint
import Home from './pages/Home';

// All other pages are lazy-loaded (code split)
const Education = lazy(() => import('./pages/Education'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const BlogBn = lazy(() => import('./pages/BlogBn'));
const BlogPostBn = lazy(() => import('./pages/BlogPostBn'));
const CriminalLawyer = lazy(() => import('./pages/services/CriminalLawyer'));
const DivorceLawyer = lazy(() => import('./pages/services/DivorceLawyer'));
const LandLawyer = lazy(() => import('./pages/services/LandLawyer'));
const BailLawyer = lazy(() => import('./pages/services/BailLawyer'));
const SupremeCourtLawyer = lazy(() => import('./pages/services/SupremeCourtLawyer'));
const TaxLawyer = lazy(() => import('./pages/services/TaxLawyer'));

// Minimal fallback — keeps layout stable while the chunk loads
const PageFallback = () => (
  <div style={{ minHeight: '100vh', background: 'var(--bg)' }} aria-hidden="true" />
);

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <ScrollToTop />
          <Layout>
            <Suspense fallback={<PageFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/education" element={<Education />} />

                {/* Service Pages — canonical routes */}
                <Route path="/services/criminal-lawyer" element={<CriminalLawyer />} />
                <Route path="/services/divorce-lawyer" element={<DivorceLawyer />} />
                <Route path="/services/land-lawyer" element={<LandLawyer />} />
                <Route path="/services/bail-lawyer" element={<BailLawyer />} />
                <Route path="/services/supreme-court-lawyer" element={<SupremeCourtLawyer />} />
                <Route path="/services/tax-lawyer" element={<TaxLawyer />} />

                {/* Short-slug aliases used by blog internal links */}
                <Route path="/criminal-lawyer-uttara" element={<CriminalLawyer />} />
                <Route path="/divorce-lawyer-uttara" element={<DivorceLawyer />} />
                <Route path="/land-property-lawyer-uttara" element={<LandLawyer />} />
                <Route path="/bail-lawyer-dhaka" element={<BailLawyer />} />
                <Route path="/supreme-court-lawyer-bangladesh" element={<SupremeCourtLawyer />} />
                <Route path="/tax-vat-lawyer-dhaka" element={<TaxLawyer />} />

                {/* Blog */}
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />

                {/* Bangla Blog */}
                <Route path="/bn/blog" element={<BlogBn />} />
                <Route path="/bn/blog/:slug" element={<BlogPostBn />} />
              </Routes>
            </Suspense>
          </Layout>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
