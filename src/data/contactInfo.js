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

/** Aliases for component convenience */
export const PRIMARY_PHONE = CALL_NUMBER;
export const SECONDARY_PHONE = '+8801955802007';

/** Build a wa.me URL with a pre-filled message.
 *  Every message includes a source tag so the lawyer knows it came from
 *  the official website (advmdshahalam.me) rather than an unknown contact. */
export const waLink = (msg = '', isBn = false, articleTitle = '') => {
    const siteTagBn = '🌐 *advmdshahalam.me* (অফিসিয়াল ওয়েবসাইট)';
    const siteTagEn = '🌐 *advmdshahalam.me* (Official Website)';

    if (articleTitle) {
        const fullMsg = isBn
            ? `${siteTagBn}\n\nআসসালামু আলাইকুম অ্যাডভোকেট মো. শাহ আলম,\nআমি আপনার ওয়েবসাইটের "${articleTitle}" লেখাটি পড়েছি এবং এ বিষয়ে জরুরি আইনি পরামর্শ চাই।`
            : `${siteTagEn}\n\nAssalamu Alaikum Advocate Md. Shah Alam,\nI read your article "${articleTitle}" on your website and need urgent legal consultation.`;
        return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(fullMsg)}`;
    }

    if (msg) {
        if (msg.includes('advmdshahalam.me')) {
            return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
        }
        const isMsgBn = isBn || /[\u0980-\u09FF]/.test(msg);
        const tag = isMsgBn ? siteTagBn : siteTagEn;
        return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`${tag}\n\n${msg}`)}`;
    }

    const defaultMsg = isBn
        ? `${siteTagBn}\n\nআসসালামু আলাইকুম অ্যাডভোকেট মো. শাহ আলম,\nআমি আপনার ওয়েবসাইট advmdshahalam.me দেখে সরাসরি আইনি পরামর্শের জন্য যোগাযোগ করছি।`
        : `${siteTagEn}\n\nAssalamu Alaikum Advocate Md. Shah Alam,\nI found your website advmdshahalam.me and would like legal consultation.`;

    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(defaultMsg)}`;
};

/** Build a tel: href */
export const telLink = () => `tel:${CALL_NUMBER}`;
