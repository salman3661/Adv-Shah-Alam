import React from 'react';

/**
 * Strips all non-digit and non-plus characters, preserving leading +.
 * formatTelHref("+880 1712-655546") → "+8801712655546"
 */
export const formatTelHref = (phone) => {
    const cleaned = phone.replace(/[^\d+]/g, '');
    return cleaned;
};

/**
 * Formats a raw +880... number to a human-readable display string.
 * formatPhoneDisplay("+8801712655546") → "+880 1712-655546"
 */
export const formatPhoneDisplay = (phone) => {
    const cleaned = phone.replace(/[^\d+]/g, '');
    // +880 XXXX XXXXXX  (country code + 4 + 6)
    const match = cleaned.match(/^(\+880)(\d{4})(\d{6})$/);
    if (match) return `${match[1]} ${match[2]}-${match[3]}`;
    return phone; // fallback: return as-is
};

/**
 * Renders a phone number as a clickable tel: link with consistent formatting.
 *
 * Props:
 *   number  {string}  — the raw phone number, e.g. "+8801712655546"
 *   className {string} — optional extra class names for the <a> tag
 *   style   {object}  — optional inline styles
 */
const PhoneLink = ({ number, className = '', style = {} }) => {
    const href = `tel:${formatTelHref(number)}`;
    const display = formatPhoneDisplay(number);

    return (
        <a
            href={href}
            className={className}
            style={style}
        >
            {display}
        </a>
    );
};

export default PhoneLink;
