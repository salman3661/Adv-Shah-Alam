/**
 * src/api/directus.js
 * ─────────────────────────────────────────────────────────────────
 * Directus SDK client — single instance for the whole app.
 *
 * Environment variables (set in .env):
 *   VITE_DIRECTUS_URL  = https://your-directus.railway.app
 *   VITE_DIRECTUS_TOKEN = your-public-read-token (optional but recommended)
 *
 * When VITE_DIRECTUS_URL is not set (local dev or Directus not yet deployed),
 * the app automatically falls back to the static JS data files.
 * ─────────────────────────────────────────────────────────────────
 */

import { createDirectus, rest, readItems, readItem, readSingleton, staticToken } from '@directus/sdk';

/** Is Directus configured? */
export const DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL ?? null;
const DIRECTUS_TOKEN      = import.meta.env.VITE_DIRECTUS_TOKEN ?? null;

/** True when Directus URL is provided — switches app to CMS mode */
export const CMS_ENABLED = Boolean(DIRECTUS_URL);

/** Directus SDK client (only created when URL is available) */
let _client = null;

export function getDirectus() {
    if (!CMS_ENABLED) return null;
    if (_client) return _client;

    _client = DIRECTUS_TOKEN
        ? createDirectus(DIRECTUS_URL).with(staticToken(DIRECTUS_TOKEN)).with(rest())
        : createDirectus(DIRECTUS_URL).with(rest());

    return _client;
}

/**
 * Safe fetch wrapper — returns null on error instead of throwing.
 * Handles network errors, CORS issues, and Directus API errors gracefully.
 */
export async function safeFetch(fn) {
    try {
        return await fn();
    } catch (err) {
        if (import.meta.env.DEV) {
            console.warn('[CMS] Fetch failed, using static fallback:', err?.message ?? err);
        }
        return null;
    }
}

// Re-export Directus SDK query helpers for use in api files
export { readItems, readItem, readSingleton };
