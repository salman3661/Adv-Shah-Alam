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
  /** Direct authenticated fetch — useful for custom endpoints */
  apiFetch,

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

  // ─── Blog CRUD ────────────────────────────────────────────────────────

  /**
   * Load the lightweight blog index (all post metadata, no sections).
   * @param {'en'|'bn'} lang
   * @returns {{ index: { posts: object[] } }}
   */
  async loadBlogIndex(lang) {
    return apiFetch(`/admin-blog?lang=${lang}&slug=_index`);
  },

  /**
   * Load a single full blog post from GitHub.
   * @param {'en'|'bn'} lang
   * @param {string} slug
   * @returns {{ post: object, sha: string }}
   */
  async loadBlogPost(lang, slug) {
    return apiFetch(`/admin-blog?lang=${lang}&slug=${encodeURIComponent(slug)}`);
  },

  /**
   * Save (create or update) a blog post to GitHub.
   * @param {'en'|'bn'} lang
   * @param {string} slug
   * @param {object} post  - full post object
   * @param {string|null} sha  - current file SHA (null for new posts)
   * @returns {{ success: boolean, sha: string, commit: string, isNew: boolean }}
   */
  async saveBlogPost(lang, slug, post, sha = null) {
    return apiFetch(`/admin-blog?lang=${lang}&slug=${encodeURIComponent(slug)}`, {
      method: 'PUT',
      body: JSON.stringify({ post, sha }),
    });
  },

  /**
   * Delete a blog post from GitHub.
   * @param {'en'|'bn'} lang
   * @param {string} slug
   * @param {string} sha  - current file SHA
   */
  async deleteBlogPost(lang, slug, sha) {
    return apiFetch(`/admin-blog?lang=${lang}&slug=${encodeURIComponent(slug)}`, {
      method: 'DELETE',
      body: JSON.stringify({ sha }),
    });
  },

  // ─── Deploy ───────────────────────────────────────────────────────────

  /** Trigger a Vercel redeploy via deploy hook */
  async triggerDeploy() {
    return apiFetch('/admin-deploy', { method: 'POST' });
  },
};
