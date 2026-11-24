let initialized = false;
let localConsultSent = false;

export function resolveArea(el, pathname = typeof window !== 'undefined' ? window.location.pathname : '/') {
  const explicit = el?.getAttribute?.('data-area');
  if (explicit) return explicit;
  const p = String(pathname || '/').toLowerCase();
  if (p.includes('uttara')) return 'uttara_sector12';
  if (p.includes('bashundhara')) return 'bashundhara_ra';
  if (p.includes('gulshan')) return 'gulshan';
  if (p.includes('banani')) return 'banani';
  if (p.includes('turag')) return 'turag';
  if (p.includes('dakshinkhan')) return 'dakshinkhan';
  if (p.includes('airport')) return 'airport';
  if (p === '/' || p === '/en' || p.startsWith('/services/') || p.startsWith('/bn/services/') || p.includes('/contact') || p.includes('/advocate-md-shah-alam')) {
    return 'uttara_sector12';
  }
  return 'other';
}

export function resolveService(el, pathname = typeof window !== 'undefined' ? window.location.pathname : '/') {
  const explicit = el?.getAttribute?.('data-service');
  if (explicit && explicit !== 'general') return explicit;
  const p = String(pathname || '/').toLowerCase();
  if (p.includes('/criminal-lawyer')) return 'criminal_defence';
  if (p.includes('/bail-lawyer')) return 'criminal_bail';
  if (p.includes('/divorce-lawyer')) return 'family_divorce';
  if (p.includes('/land-lawyer')) return 'land_property';
  if (p.includes('/supreme-court-lawyer')) return 'supreme_court_writ';
  if (p.includes('/company-corporate-lawyer')) return 'corporate_company';
  if (p.includes('/tax-lawyer')) return 'tax_advisory';
  if (p.includes('/nrb-legal-help')) return 'nrb_property';
  if (p.includes('/gulshan-lawyer')) return 'gulshan_chamber';
  if (p.includes('/banani-lawyer')) return 'banani_chamber';
  if (p.includes('/bashundhara-ra-lawyer')) return 'bashundhara_property';
  if (p.includes('/uttara-lawyer')) return 'uttara_chamber';
  return explicit || 'general';
}

export function initCtaTracking() {
  if (typeof window === 'undefined' || initialized) return;
  initialized = true;

  document.addEventListener(
    'click',
    (e) => {
      const el = e.target?.closest?.('[data-cta],[data-placement]');
      if (!el) return;
      const href = el.getAttribute('href') || '';
      const kind = href.startsWith('tel:')
        ? 'call'
        : href.includes('wa.me')
          ? 'whatsapp'
          : href.startsWith('mailto:')
            ? 'email'
            : 'page';
      const pagePath = window.location.pathname;
      const area = resolveArea(el, pagePath);
      const service = resolveService(el, pagePath);
      window.gtag?.('event', 'cta_click', {
        cta_id: el.getAttribute('data-cta') || '',
        placement: el.getAttribute('data-placement') || '',
        cta_kind: kind,
        page_path: pagePath,
        page_lang: document.documentElement.lang || '',
        area,
        service,
      });
      if (!localConsultSent && area !== 'other' && (kind === 'whatsapp' || kind === 'call' || /consult|contact|chamber/i.test(el.getAttribute('data-cta') || ''))) {
        localConsultSent = true;
        window.gtag?.('event', 'local_consult_request', {
          area,
          service,
          page_path: pagePath,
        });
      }
    },
    { capture: true }
  );

  document.addEventListener(
    'submit',
    (e) => {
      const f = e.target;
      if (!(f instanceof HTMLFormElement)) return;
      const subject = f.querySelector('select[name=subject]')?.value || '';
      const pagePath = window.location.pathname;
      const area = resolveArea(f, pagePath);
      const service = subject || resolveService(f, pagePath);
      window.gtag?.('event', 'consult_request', {
        service,
        method: 'whatsapp',
        page_path: pagePath,
        area,
      });
      if (!localConsultSent && area !== 'other') {
        localConsultSent = true;
        window.gtag?.('event', 'local_consult_request', {
          area,
          service,
          page_path: pagePath,
        });
      }
    },
    { capture: true }
  );
}
