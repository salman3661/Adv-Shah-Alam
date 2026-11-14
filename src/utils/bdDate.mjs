/**
 * Bangladesh Standard Time (Asia/Dhaka, UTC+6) date utilities.
 * Ensures blog dates and post timestamps always render according to BD time,
 * regardless of the visitor's device timezone or build server timezone (UTC).
 */

export const BD_TIME_ZONE = 'Asia/Dhaka';

/**
 * Return current YYYY-MM-DD string in Asia/Dhaka (UTC+6).
 */
export function getBdTodayIso(nowMs = Date.now()) {
  return new Date(nowMs + 6 * 3600 * 1000).toISOString().split('T')[0];
}

/**
 * Parse a YYYY-MM-DD date string or full ISO timestamp into a Date anchored
 * safely to Asia/Dhaka (UTC+6), preventing off-by-1-day shifts in non-BD timezones.
 */
export function parseBdDate(input) {
  if (!input) return null;
  if (input instanceof Date) {
    return Number.isNaN(input.getTime()) ? null : input;
  }
  const str = String(input).trim();
  if (!str) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    const d = new Date(`${str}T00:00:00+06:00`);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  const d = new Date(str);
  return Number.isNaN(d.getTime()) ? null : d;
}

/**
 * Format a date/timestamp string in Asia/Dhaka timezone.
 */
export function formatBdDate(
  input,
  locale = 'en-GB',
  options = { day: 'numeric', month: 'short', year: 'numeric' }
) {
  const d = parseBdDate(input);
  if (!d) return '';
  return d.toLocaleDateString(locale, { ...options, timeZone: BD_TIME_ZONE });
}
