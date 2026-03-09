/**
 * src/api/settings.js
 * ─────────────────────────────────────────────────────────────────
 * Global site settings — contact info, chamber address, SEO defaults.
 * Falls back to src/data/contactInfo.js when CMS is off.
 * ─────────────────────────────────────────────────────────────────
 */

import { getDirectus, CMS_ENABLED, safeFetch, readSingleton } from './directus.js';
import {
    CALL_NUMBER, CALL_DISPLAY,
    WA_NUMBER, WA_DISPLAY,
} from '../data/contactInfo.js';

// ─── Static fallback values ───────────────────────────────────────
const STATIC_SETTINGS = {
    callNumber:          CALL_NUMBER,
    callDisplay:         CALL_DISPLAY,
    whatsappNumber:      WA_NUMBER,
    whatsappDisplay:     WA_DISPLAY,
    whatsappDefaultMsg:  'আমাকে আইনি সহায়তা প্রয়োজন',
    chamberAddress:      'Mantrust Nazma Monzil, Sector 12, Uttara West, Dhaka-1230',
    googleMapsLink:      null,
    googleMapsEmbed:     null,
    lawyerName:          'Advocate Md. Shah Alam',
    barEnrollmentNumber: null,
    yearsExperience:     20,
    email:               'shahalam0332@gmail.com',
    officeHours:         'Sat – Thu: 9am – 9pm',
    siteTagline:         'Supreme Court Advocate · Uttara, Dhaka',
    footerCopyrightText: `© ${new Date().getFullYear()} Advocate Md. Shah Alam. All rights reserved.`,
    googleAnalyticsId:   null,
};

let _cachedSettings = null;

/**
 * Fetch site-wide settings.
 * Cached in memory — only one request per page load.
 */
export async function getSiteSettings() {
    if (_cachedSettings) return _cachedSettings;

    if (!CMS_ENABLED) {
        _cachedSettings = STATIC_SETTINGS;
        return STATIC_SETTINGS;
    }

    const client = getDirectus();
    const data = await safeFetch(() =>
        client.request(readSingleton('site_settings'))
    );

    if (!data) {
        _cachedSettings = STATIC_SETTINGS;
        return STATIC_SETTINGS;
    }

    _cachedSettings = { ...STATIC_SETTINGS, ...data };
    return _cachedSettings;
}

/**
 * Build a WhatsApp URL from CMS settings.
 * Used as a drop-in replacement for waLink() from contactInfo.js.
 */
export function buildWaLink(settings, msg = '') {
    const num = settings?.whatsappNumber ?? WA_NUMBER;
    const text = msg || settings?.whatsappDefaultMsg || '';
    return text
        ? `https://wa.me/${num}?text=${encodeURIComponent(text)}`
        : `https://wa.me/${num}`;
}

/**
 * Build a tel: href from CMS settings.
 * Used as a drop-in replacement for telLink() from contactInfo.js.
 */
export function buildTelLink(settings) {
    return `tel:${settings?.callNumber ?? CALL_NUMBER}`;
}
