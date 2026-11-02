import React from 'react';
import { Link } from 'react-router-dom';
import { waLink } from '../data/contactInfo';
import heroEn from '../content/hero.json';
import heroBn from '../content/hero_bn.json';
import SocialShare from './SocialShare';

const pillsEn = [
  { label: '10+ Years Experience',   bg: 'linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 100%)', border: '#1E40AF', dotColor: '#93C5FD', shadow: 'rgba(29, 78, 216, 0.25)' },
  { label: 'Supreme Court Advocate', bg: 'linear-gradient(135deg, #065F46 0%, #0F766E 100%)', border: '#0F766E', dotColor: '#5EEAD4', shadow: 'rgba(15, 118, 110, 0.25)' },
  { label: 'Uttara, Dhaka',          bg: 'linear-gradient(135deg, #0C4A6E 0%, #0284C7 100%)', border: '#0369A1', dotColor: '#7DD3FC', shadow: 'rgba(2, 132, 199, 0.25)' },
];

const pillsBn = [
  { label: '১০+ বছরের অভিজ্ঞতা',       bg: 'linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 100%)', border: '#1E40AF', dotColor: '#93C5FD', shadow: 'rgba(29, 78, 216, 0.25)' },
  { label: 'সুপ্রিম কোর্টের আইনজীবী', bg: 'linear-gradient(135deg, #065F46 0%, #0F766E 100%)', border: '#0F766E', dotColor: '#5EEAD4', shadow: 'rgba(15, 118, 110, 0.25)' },
  { label: 'উত্তরা, ঢাকা',             bg: 'linear-gradient(135deg, #0C4A6E 0%, #0284C7 100%)', border: '#0369A1', dotColor: '#7DD3FC', shadow: 'rgba(2, 132, 199, 0.25)' },
];

const Hero = ({ lang = 'en' }) => {
  const isBn = lang === 'bn';
  const heroContent = isBn ? heroBn : heroEn;
  const pills = isBn ? pillsBn : pillsEn;

  return (
    <section
      id="home"
      className="relative overflow-hidden google-anno-skip"
      style={{ background: 'var(--hero-section-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      {/* Subtle atmospheric light */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 70% 55% at 68% 50%, var(--hero-glow-a) 0%, transparent 72%)' }} />

      <div className="container mx-auto px-6 relative z-10" style={{ paddingTop: '6.75rem', paddingBottom: '3.5rem' }}>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* LEFT */}
          <div className="order-2 md:order-1">

            {/* Official Credential Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem', marginBottom: '1.25rem' }}>
              {pills.map((p, i) => (
                <span key={i} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                  padding: '0.32rem 0.95rem', borderRadius: '9999px',
                  fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.01em',
                  background: p.bg,
                  border: `1px solid ${p.border}`,
                  color: '#FFFFFF',
                  boxShadow: `0 3px 10px ${p.shadow}`,
                }}>
                  <span style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: p.dotColor, flexShrink: 0,
                  }} />
                  {p.label}
                </span>
              ))}
            </div>

            {/* Priority Consultation Badge */}
            {heroContent.emergencyBadge && (
              <div style={{ marginBottom: '1.15rem' }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.35rem 0.95rem', borderRadius: '9999px',
                  fontSize: '0.72rem', fontWeight: 700,
                  background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)',
                  border: '1px solid #1D4ED8',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.22)',
                }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4ADE80', boxShadow: '0 0 8px #4ADE80', flexShrink: 0 }} />
                  {heroContent.emergencyBadge}
                </span>
              </div>
            )}

            {/* H1 */}
            <h1 style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
              fontWeight: 800, lineHeight: 1.13, marginBottom: '0.75rem',
              color: 'var(--hero-heading)', letterSpacing: '-0.03em',
            }}>
              {heroContent.headline}{' '}
              <span style={{
                background: 'linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 55%, #0F766E 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: '#1E3A8A',
              }}>{heroContent.headlineAccent}</span>
            </h1>

            {/* Subheading */}
            <p style={{
              fontSize: '0.97rem', lineHeight: 1.68, marginBottom: '1.4rem',
              color: 'var(--hero-sub)', fontWeight: 400, maxWidth: '480px',
            }}>
              {heroContent.subheading}
            </p>

            {/* Credential cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.5rem' }}>

              {/* Card 1 — Designation (Supreme Court) */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.85rem',
                padding: '0.75rem 1rem', borderRadius: '0.875rem',
                background: 'var(--hero-cred-bg)',
                border: '1px solid var(--hero-cred-border)',
                boxShadow: 'var(--shadow-sm)',
              }}>
                <div style={{
                  width: '4px', height: '42px', borderRadius: '4px',
                  background: 'linear-gradient(180deg, #1E3A8A 0%, #2563EB 100%)',
                  flexShrink: 0,
                }} />
                <div>
                  <div style={{ fontSize: '0.62rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--hero-label)', marginBottom: '0.22rem' }}>
                    {isBn ? 'পদবি' : 'Designation'}
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--hero-heading)', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.45rem' }}>
                    {isBn ? 'এডভোকেট,' : 'Advocate,'}
                    <span style={{
                      display: 'inline-block',
                      background: 'linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 100%)',
                      border: '1px solid #1E40AF',
                      color: '#FFFFFF', padding: '0.22rem 0.78rem',
                      borderRadius: '0.45rem', fontSize: '0.82rem', fontWeight: 700,
                      letterSpacing: '0.01em',
                      boxShadow: '0 3px 10px rgba(29, 78, 216, 0.28)',
                    }}>
                      {isBn ? 'বাংলাদেশ সুপ্রীম কোর্ট' : 'Supreme Court of Bangladesh'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2 — Designation (Public Prosecutor) */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.85rem',
                padding: '0.75rem 1rem', borderRadius: '0.875rem',
                background: 'var(--hero-cred-bg)',
                border: '1px solid var(--hero-cred-border)',
                boxShadow: 'var(--shadow-sm)',
              }}>
                <div style={{
                  width: '4px', height: '42px', borderRadius: '4px',
                  background: 'linear-gradient(180deg, #065F46 0%, #0D9488 100%)',
                  flexShrink: 0,
                }} />
                <div>
                  <div style={{ fontSize: '0.62rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--hero-label)', marginBottom: '0.22rem' }}>
                    {isBn ? 'পদবি' : 'Designation'}
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--hero-heading)', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.45rem' }}>
                    {isBn ? 'অ্যাসিস্ট্যান্ট পাবলিক প্রসিকিউটর,' : 'Asst. Public Prosecutor,'}
                    <span style={{
                      display: 'inline-block',
                      background: 'linear-gradient(135deg, #065F46 0%, #0F766E 100%)',
                      border: '1px solid #0F766E',
                      color: '#FFFFFF', padding: '0.22rem 0.78rem',
                      borderRadius: '0.45rem', fontSize: '0.82rem', fontWeight: 700,
                      letterSpacing: '0.01em',
                      boxShadow: '0 3px 10px rgba(15, 118, 110, 0.28)',
                    }}>
                      {isBn ? 'অতিরিক্ত মহানগর দায়রা জজ আদালত-১৪, ঢাকা' : 'Addl. Metro Sessions Court-14, Dhaka'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 3 — Chamber */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.85rem',
                padding: '0.6rem 1rem', borderRadius: '0.875rem',
                background: 'var(--hero-cred-bg)',
                border: '1px solid var(--hero-cred-border)',
                width: 'fit-content',
                boxShadow: 'var(--shadow-sm)',
              }}>
                <div style={{
                  width: '4px', height: '38px', borderRadius: '4px',
                  background: 'linear-gradient(180deg, #0C4A6E 0%, #0284C7 100%)',
                  flexShrink: 0,
                }} />
                <div>
                  <span style={{ fontSize: '0.62rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--hero-label)', display: 'block', marginBottom: '0.2rem' }}>
                    {isBn ? 'চেম্বার' : 'Chamber'}
                  </span>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--hero-heading)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{
                      display: 'inline-block',
                      background: 'linear-gradient(135deg, #0C4A6E 0%, #0284C7 100%)',
                      border: '1px solid #0369A1',
                      color: '#FFFFFF', padding: '0.2rem 0.75rem',
                      borderRadius: '0.45rem', fontSize: '0.82rem', fontWeight: 700,
                      letterSpacing: '0.01em',
                      boxShadow: '0 3px 10px rgba(2, 132, 199, 0.25)',
                    }}>
                      {isBn ? 'উত্তরা, ঢাকা' : 'Uttara, Dhaka'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Rating Social Proof */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.15rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[1,2,3,4,5].map(s => (
                  <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--hero-heading)' }}>4.9</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--hero-sub)' }}>
                {isBn ? '(৪৭+ গুগল রিভিউ)' : '(47+ Google Reviews)'}
              </span>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                fontSize: '0.7rem', fontWeight: 700,
                color: '#FFFFFF',
                background: 'linear-gradient(135deg, #065F46 0%, #059669 100%)',
                border: 'none',
                borderRadius: '9999px',
                padding: '0.2rem 0.72rem',
                boxShadow: '0 2px 8px rgba(5, 150, 105, 0.26)',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6EE7B7', boxShadow: '0 0 6px #6EE7B7', display: 'inline-block' }} />
                {isBn ? 'এখন উপলব্ধ' : 'Available Now'}
              </span>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
              <a href={waLink()} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.75rem 1.45rem', borderRadius: '0.65rem',
                  background: 'var(--wa-green)', color: '#fff',
                  fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(17, 107, 58, 0.25)',
                  transition: 'background-color 0.2s, transform 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--wa-green-hover)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--wa-green)'; e.currentTarget.style.transform = 'none'; }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {heroContent.cta1Label}
              </a>
              <a href="#contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                  padding: '0.75rem 1.45rem', borderRadius: '0.65rem',
                  background: 'var(--hero-cta-sec-bg)', color: 'var(--hero-cta-sec-text)',
                  fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none',
                  border: '1.5px solid var(--hero-cta-sec-border)',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'background 0.18s, transform 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--hero-cta-sec-hover)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--hero-cta-sec-bg)'; e.currentTarget.style.transform = 'none'; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                {heroContent.cta2Label}
              </a>
            </div>

            {/* Social Share */}
            <div style={{ marginTop: '1.1rem' }}>
              <SocialShare lang={lang} />
            </div>

            {/* Quick internal navigation links */}
            <div style={{ marginTop: '1.1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {(isBn ? [
                { label: 'আইনজীবী সম্পর্কে', href: '/advocate-md-shah-alam' },
                { label: 'আইনি সেবা', href: '#services', isAnchor: true },
                { label: 'ব্লগ', href: '/bn/blog' },
                { label: 'যোগাযোগ', href: '/bn/contact' },
                { label: 'প্রশ্নোত্তর', href: '#faq', isAnchor: true },
              ] : [
                { label: 'About Advocate', href: '/advocate-md-shah-alam' },
                { label: 'Our Services', href: '#services', isAnchor: true },
                { label: 'Legal Blog', href: '/blog' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'FAQ', href: '#faq', isAnchor: true },
              ]).map((link) => {
                const style = {
                  fontSize: '0.75rem', fontWeight: 700,
                  padding: '0.32rem 0.88rem', borderRadius: '9999px',
                  background: '#EFF6FF',
                  border: '1.5px solid #93C5FD',
                  color: '#1E3A8A',
                  textDecoration: 'none',
                  transition: 'color 0.15s, border-color 0.15s, opacity 0.15s',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(30, 58, 138, 0.08)',
                };

                if (link.isAnchor) {
                  return (
                    <a
                      key={link.label}
                      href={`#${link.href.replace('#', '')}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const id = link.href.replace('#', '');
                        const element = document.getElementById(id);
                        if (element) {
                          const offset = 85;
                          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                          window.scrollTo({ behavior: 'smooth', top: elementPosition - offset });
                          window.history.pushState(null, '', `#${id}`);
                        }
                      }}
                      style={style}
                      onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.borderColor = 'var(--hero-pill-border)'; }}
                    >
                      {link.label}
                    </a>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    style={style}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.borderColor = 'var(--hero-pill-border)'; }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

          </div>

          {/* RIGHT: Photo */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end google-anno-skip">
            <div className="google-anno-skip" style={{ position: 'relative', width: '100%', maxWidth: '340px', aspectRatio: '4/5' }}>
              <div style={{ position: 'absolute', inset: '-14px', borderRadius: '2rem', background: 'var(--hero-photo-glow)', filter: 'blur(28px)', zIndex: 0 }} />
              <div style={{
                position: 'relative', borderRadius: '1.25rem', overflow: 'hidden',
                border: '1.5px solid var(--hero-photo-border)',
                boxShadow: '0 20px 48px var(--hero-photo-shadow)',
                height: '100%', zIndex: 1,
              }}>
                <img
                  src="/images/hero/hero-md-shah-alam.webp"
                  srcSet="/images/hero/hero-md-shah-alam-420.webp 420w, /images/hero/hero-md-shah-alam.webp 828w"
                  sizes="(max-width: 768px) 240px, 340px"
                  alt={heroContent.photoAlt}
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                  width="600"
                  height="750"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '38%', background: 'linear-gradient(to top, rgba(10, 20, 36, 0.78) 0%, transparent 100%)' }} />
                <div style={{
                  position: 'absolute', bottom: '0.875rem', right: '0.875rem',
                  background: 'linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 100%)',
                  border: '1px solid rgba(147, 197, 253, 0.5)',
                  color: '#FFFFFF', fontSize: '0.7rem', fontWeight: 700,
                  padding: '0.4rem 0.9rem', borderRadius: '0.5rem',
                  boxShadow: '0 6px 16px rgba(15, 23, 42, 0.45)',
                }}>
                  {heroContent.photoBadgeBottom}
                </div>
                <div style={{
                  position: 'absolute', top: '0.875rem', left: '0.875rem',
                  background: 'linear-gradient(135deg, #065F46 0%, #0F766E 100%)',
                  color: '#FFFFFF', fontSize: '0.68rem', fontWeight: 700,
                  padding: '0.38rem 0.82rem', borderRadius: '0.5rem',
                  border: '1px solid rgba(94, 234, 212, 0.45)',
                  boxShadow: '0 6px 16px rgba(15, 23, 42, 0.4)',
                }}>
                  {heroContent.photoBadgeTop}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
