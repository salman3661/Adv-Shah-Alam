/**
 * Evergreen year helper for SEO titles / meta descriptions.
 *
 * URL slugs are NEVER passed through this helper - they stay timeless and unchanged.
 *
 * Rules (applied to display/meta text only):
 *  1. The token {{year}} is always replaced with the current year (Latin digits).
 *     Use it in newly authored titles, e.g. "জমি রেজিস্ট্রি খরচ {{year}}".
 *  2. A hard-coded year that is already stale (>= EVERGREEN_MIN_YEAR and < current year)
 *     is bumped to the current year, in the same digit script (English 2026 / Bengali ২০২৬).
 *     Today (2026) nothing changes; on 1 Jan 2027 every "2026" title silently becomes "2027".
 *  3. Years in the future or older than EVERGREEN_MIN_YEAR are left untouched
 *     (e.g. "2020 amendment", "2030 vision").
 *
 * Written without regex lookbehind so it parses on older Safari builds; shared by the browser
 * (react-helmet) and the Node pre-render script.
 */
export const EVERGREEN_MIN_YEAR = 2025;

const BN_DIGITS = '০১২৩৪৫৬৭৮৯';
const toLatin = (s) => s.replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)));
const toBengali = (s) => s.replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);

export function evergreenYear(text, now = new Date()) {
  if (typeof text !== 'string' || !text) return text;
  const current = now.getFullYear();

  let out = text.replace(/\{\{\s*year\s*\}\}/gi, String(current));

  // The second lookahead leaves fiscal-year ranges such as "2025-26" / "২০২৫-২৬" untouched.
  out = out.replace(/(^|[^0-9০-৯])([0-9০-৯]{4})(?![0-9০-৯])(?![-–/][0-9০-৯]{2}(?![0-9০-৯]))/g, (match, prefix, digits) => {
    const isBengali = /[০-৯]/.test(digits);
    const year = Number(toLatin(digits));
    if (year >= EVERGREEN_MIN_YEAR && year < current) {
      return prefix + (isBengali ? toBengali(String(current)) : String(current));
    }
    return match;
  });

  return out;
}
