/**
 * Central contact configuration — single source of truth.
 *
 * tel:   → CALL number  → 01712-655546  (direct call line)
 * wa.me  → WHATSAPP number → 01955-802007  (WhatsApp consultation)
 *
 * Rule: never swap these. Any change must happen here only.
 */

/** Dialled on "Call Now" / MobileCallButton (tel: link) */
export const CALL_NUMBER = '+8801712655546';
export const CALL_DISPLAY = '+880 1712-655546';

/** Used for WhatsApp links (wa.me / api.whatsapp.com) */
export const WA_NUMBER = '8801955802007';   // no plus — wa.me format
export const WA_DISPLAY = '+880 1955-802007';

/** Build a wa.me URL with a pre-filled message.
 *  Every message includes a source tag so the lawyer knows it came from
 *  the website (via Google SEO) rather than a random WhatsApp contact. */
export const waLink = (msg = '') => {
    const source = '🌐 *advmdshahalam.me (Google Website)*';
    const defaultMsg = `${source}\n\nAssalamu Alaikum, I found you on Google and need legal advice.`;
    const fullMsg = msg
        ? `${source}\n\n${msg}`
        : defaultMsg;
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(fullMsg)}`;
};

/** Build a tel: href */
export const telLink = () => `tel:${CALL_NUMBER}`;
