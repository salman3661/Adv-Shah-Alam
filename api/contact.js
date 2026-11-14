export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  let data = req.body;
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch {
      const params = new URLSearchParams(data);
      data = Object.fromEntries(params.entries());
    }
  }

  const name = String(data?.name || '').trim();
  const phone = String(data?.phone || '').trim();
  const email = String(data?.email || '').trim();
  const matter = String(data?.matter || data?.caseType || 'General Consultation').trim();
  const message = String(data?.message || '').trim();

  if (!name || !phone || !message) {
    return res.status(400).json({ ok: false, error: 'Name, phone, and message are required.' });
  }

  // Log structured consultation request (no sensitive PII leaked to client)
  console.log('[CONTACT_SUBMISSION]', JSON.stringify({
    ts: new Date().toISOString(),
    matter,
    hasEmail: Boolean(email),
    phoneLen: phone.length,
  }));

  const acceptsJson = (req.headers.accept || '').includes('application/json');
  if (acceptsJson) {
    return res.status(200).json({ ok: true, message: 'Consultation request received.' });
  }
  return res.redirect(303, '/contact?submitted=1');
}
