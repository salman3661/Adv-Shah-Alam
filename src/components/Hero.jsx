import React from 'react';
import { Link } from 'react-router-dom';
import { waLink } from '../data/contactInfo';
import heroEn from '../content/hero.json';
import heroBn from '../content/hero_bn.json';
import SocialShare from './SocialShare';

const pillsEn = [
  { label: '10+ Years Experience',   dotColor: 'var(--accent)' },
  { label: 'Supreme Court Advocate', dotColor: 'var(--gold)' },
  { label: 'Uttara, Dhaka',          dotColor: 'var(--accent)' },
];

const pillsBn = [
  { label: '১০+ বছরের অভিজ্ঞতা',       dotColor: 'var(--accent)' },
  { label: 'সুপ্রিম কোর্টের আইনজীবী', dotColor: 'var(--gold)' },
  { label: 'উত্তরা, ঢাকা',             dotColor: 'var(--accent)' },
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
                  background: 'var(--hero-pill-bg)',
                  border: '1px solid var(--hero-pill-border)',
                  color: 'var(--hero-pill-text)',
                  boxShadow: 'var(--shadow-sm)',
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
                  background: 'var(--gold-subtle)',
                  border: '1px solid var(--gold-border)',
                  color: 'var(--gold)',
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
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
              <span style={{ color: 'var(--hero-accent)' }}>{heroContent.headlineAccent}</span>
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
                  width: '3.5px', height: '40px', borderRadius: '4px',
                  background: 'var(--accent)',
                  flexShrink: 0,
                }} />
                <div>
                  <div style={{ fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--hero-label)', marginBottom: '0.2rem' }}>
                    {isBn ? 'পদবি' : 'Designation'}
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--hero-heading)', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {isBn ? 'এডভোকেট,' : 'Advocate,'}
                    <span style={{
                      display: 'inline-block',
                      background: 'var(--accent-subtle)',
                      border: '1px solid var(--card-border)',
                      color: 'var(--accent)', padding: '0.15rem 0.65rem',
                      borderRadius: '0.4rem', fontSize: '0.81rem', fontWeight: 700,
                      letterSpacing: '0.01em',
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
                  width: '3.5px', height: '40px', borderRadius: '4px',
                  background: 'var(--gold)',
                  flexShrink: 0,
                }} />
                <div>
                  <div style={{ fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--hero-label)', marginBottom: '0.2rem' }}>
                    {isBn ? 'পদবি' : 'Designation'}
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--hero-heading)', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {isBn ? 'অ্যাসিস্ট্যান্ট পাবলিক প্রসিকিউটর,' : 'Asst. Public Prosecutor,'}
                    <span style={{
                      display: 'inline-block',
                      background: 'var(--gold-subtle)',
                      border: '1px solid var(--gold-border)',
                      color: 'var(--gold)', padding: '0.15rem 0.65rem',
                      borderRadius: '0.4rem', fontSize: '0.81rem', fontWeight: 700,
                      letterSpacing: '0.01em',
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
                  width: '3.5px', height: '30px', borderRadius: '4px',
                  background: 'var(--accent)',
                  flexShrink: 0,
                }} />
                <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--hero-heading)' }}>
                  <span style={{ fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--hero-label)', display: 'block', marginBottom: '0.15rem' }}>
                    {isBn ? 'চেম্বার' : 'Chamber'}
                  </span>
                  {isBn ? 'উত্তরা, ঢাকা' : 'Uttara, Dhaka'}
                </div>
              </div>
            </div>

            {/* Google Rating Social Proof */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.15rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[1,2,3,4,5].map(s => (
                  <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="var(--gold)" aria-hidden="true">
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
                color: 'var(--accent)',
                background: 'var(--accent-subtle)',
                border: '1px solid var(--card-border)',
                borderRadius: '9999px',
                padding: '0.15rem 0.6rem',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#116B3A', display: 'inline-block' }} />
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
                  fontSize: '0.75rem', fontWeight: 600,
                  padding: '0.28rem 0.8rem', borderRadius: '9999px',
                  background: 'var(--hero-pill-bg)',
                  border: '1px solid var(--hero-pill-border)',
                  color: 'var(--text-2)',
                  textDecoration: 'none',
                  transition: 'color 0.15s, border-color 0.15s, opacity 0.15s',
                  opacity: 0.9,
                  cursor: 'pointer',
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
                  background: '#0A1424',
                  border: '1px solid rgba(204, 168, 86, 0.45)',
                  color: '#F8FAFC', fontSize: '0.68rem', fontWeight: 700,
                  padding: '0.38rem 0.85rem', borderRadius: '0.5rem',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.35)',
                }}>
                  {heroContent.photoBadgeBottom}
                </div>
                <div style={{
                  position: 'absolute', top: '0.875rem', left: '0.875rem',
                  background: 'rgba(10, 20, 36, 0.84)', backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  color: '#CCA856', fontSize: '0.65rem', fontWeight: 700,
                  padding: '0.34rem 0.75rem', borderRadius: '0.5rem',
                  border: '1px solid rgba(204, 168, 86, 0.38)',
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
