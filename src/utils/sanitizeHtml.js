/**
 * Lightweight, zero-dependency HTML sanitizer to protect against XSS
 * when rendering rich HTML content via `dangerouslySetInnerHTML`.
 *
 * Strips:
 *  - Dangerous tags: <script>, <iframe>, <object>, <embed>, <applet>, <meta>, <base>, <form>, <input>
 *  - Inline event handlers: onclick, onerror, onload, onmouseover, onfocus, etc.
 *  - Dangerous URI schemes in href/src/xlink:href/action/formaction: javascript:, vbscript:, data:text/html
 */
export function sanitizeHtml(rawHtml) {
  if (!rawHtml || typeof rawHtml !== 'string') return '';

  return rawHtml
    // 1. Remove paired dangerous tags and their contents
    .replace(/<(script|iframe|object|embed|applet|style|form)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
    // 2. Remove self-closing or unclosed dangerous tags
    .replace(/<\/?(script|iframe|object|embed|applet|meta|base|link|form|input|textarea|button)\b[^>]*\/?>/gi, '')
    // 3. Remove inline event handler attributes (e.g. onerror="...", onclick='...', onload=...)
    .replace(/\s+on[a-z0-9_-]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    // 4. Neutralize javascript:, vbscript:, and data:text/html protocols in href/src/action attributes
    .replace(
      /\b(href|src|xlink:href|action|formaction)\s*=\s*(['"]?)\s*(?:javascript|vbscript|data\s*:\s*text\/html)\s*:[^'">\s]*\2/gi,
      '$1="#"'
    );
}

export default sanitizeHtml;
