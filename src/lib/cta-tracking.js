let initialized = false;

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
      window.gtag?.('event', 'cta_click', {
        cta_id: el.getAttribute('data-cta') || '',
        placement: el.getAttribute('data-placement') || '',
        cta_kind: kind,
        page_path: window.location.pathname,
        page_lang: document.documentElement.lang || '',
      });
    },
    { capture: true }
  );

  document.addEventListener(
    'submit',
    (e) => {
      const f = e.target;
      if (!(f instanceof HTMLFormElement)) return;
      const subject = f.querySelector('select[name=subject]')?.value || '';
      window.gtag?.('event', 'consult_request', {
        service: subject,
        method: 'whatsapp',
        page_path: window.location.pathname,
      });
    },
    { capture: true }
  );
}
