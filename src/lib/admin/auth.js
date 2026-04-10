// Admin auth helpers — token stored in sessionStorage for security
// Token lifetime is enforced server-side (24h). If localStorage is preferred
// for "remember me" support, swap the storage key below.

const STORAGE_KEY = 'adm_token';

export const auth = {
  /** Store token after successful login */
  setToken(token) {
    sessionStorage.setItem(STORAGE_KEY, token);
  },

  /** Retrieve stored token */
  getToken() {
    return sessionStorage.getItem(STORAGE_KEY);
  },

  /** Clear token (logout) */
  clearToken() {
    sessionStorage.removeItem(STORAGE_KEY);
  },

  /** Check if a token exists locally (does not verify server-side) */
  isLoggedIn() {
    return Boolean(sessionStorage.getItem(STORAGE_KEY));
  },

  /** Return Authorization header object for fetch calls */
  authHeader() {
    const token = auth.getToken();
    if (!token) return {};
    return { Authorization: `Bearer ${token}` };
  },
};
