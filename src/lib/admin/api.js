import { auth } from './auth';

const BASE = '/api';

// ─── Core authenticated fetch ────────────────────────────────────────────────

async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`${BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...auth.authHeader(),
      ...options.headers,
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // If 401, clear stale token
    if (res.status === 401) auth.clearToken();
    const err = new Error(data?.error || `HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }

  return data;
}

// ─── Auth API ────────────────────────────────────────────────────────────────

export const adminApi = {
  /** Login — returns token on success */
  async login(password) {
    return apiFetch('/admin-auth', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });
  },

  // ─── Content CRUD ──────────────────────────────────────────────────────

  /**
   * Load a raw file from GitHub (returns raw text, not parsed JSON).
   * Used by BlogManager to read blogPosts.js / blogPostsBn.js source.
   * @param {string} filePath  — repo-relative path, e.g. 'src/data/blogPosts.js'
   * @returns {{ content: string, sha: string }}
   */
  async loadRawFile(filePath) {
    return apiFetch(`/admin-raw?path=${encodeURIComponent(filePath)}`);
  },

  /**
   * Load a content file from GitHub.
   * @param {'hero'|'services'|'faq'|'siteInfo'|'about'} fileKey
   * @returns {{ content: object, sha: string }}
   */
  async loadContent(fileKey) {
    return apiFetch(`/admin-content?file=${fileKey}`);
  },

  /**
   * Save a content file to GitHub (commits to repo → triggers Vercel redeploy).
   * @param {'hero'|'services'|'faq'|'siteInfo'|'about'} fileKey
   * @param {object} content  — new content object
   * @param {string} sha      — current file SHA from loadContent()
   * @returns {{ success: boolean, sha: string, commit: string }}
   */
  async saveContent(fileKey, content, sha) {
    return apiFetch(`/admin-content?file=${fileKey}`, {
      method: 'PUT',
      body: JSON.stringify({ content, sha }),
    });
  },

  // ─── Deploy ───────────────────────────────────────────────────────────

  /** Trigger a Vercel redeploy via deploy hook */
  async triggerDeploy() {
    return apiFetch('/admin-deploy', { method: 'POST' });
  },
};
