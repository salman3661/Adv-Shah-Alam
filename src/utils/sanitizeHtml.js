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
    )
    // 5. Convert any residual Markdown **bold** into semantic <strong> tags
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

/**
 * Formats heroIntro into breathable, well-spaced executive paragraphs
 * while converting Markdown **bold** into highlighted <strong> tags.
 */
export function formatHeroIntro(rawHtml) {
  const clean = sanitizeHtml(rawHtml);
  if (!clean) return '';
  // Strip outer <p>...</p> if it's a single wrapper so we can split long walls of text cleanly
  const inner = clean.replace(/^\s*<p[^>]*>([\s\S]*?)<\/p>\s*$/i, '$1').trim();
  if (/<p\b/i.test(inner)) return inner;

  // Split into sentences on Bengali danda (।) or English period followed by space + capital/Bengali letter
  const parts = inner.split(/(?<=[।?!])\s+|(?<=[a-z0-9)"\]]\.)\s+(?=[A-Z\u0980-\u09FF])/);
  if (parts.length <= 2) {
    return `<p class="bpbn-intro-para">${inner}</p>`;
  }
  const paragraphs = [];
  let buf = [];
  for (let i = 0; i < parts.length; i++) {
    buf.push(parts[i]);
    if (buf.length >= 2 || buf.join(' ').length > 260 || i === parts.length - 1) {
      paragraphs.push(`<p class="bpbn-intro-para">${buf.join(' ')}</p>`);
      buf = [];
    }
  }
  return paragraphs.join('');
}

export default sanitizeHtml;
