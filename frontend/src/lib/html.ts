import DOMPurify from 'dompurify';

/**
 * The parking API sends some fields as HTML. It is third-party content, so it is always sanitised
 * before rendering: scripts, event handlers, styles, iframes and forms are removed.
 */
export function sanitizeHtml(html: string | null | undefined): string {
  if (!html) return '';
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'div', 'span', 'br', 'strong', 'b', 'em', 'i', 'u', 'ul', 'ol', 'li', 'h3', 'h4', 'h5', 'a'],
    ALLOWED_ATTR: ['href'],
    ALLOW_DATA_ATTR: false,
  });
}

/** Turns an HTML <ul><li>… list into plain strings (no HTML is rendered). */
export function htmlListToItems(html: string | null | undefined): string[] {
  if (!html) return [];
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const items = [...doc.querySelectorAll('li')].map((li) => li.textContent?.trim() ?? '').filter(Boolean);
  if (items.length) return items;
  const text = doc.body.textContent?.trim();
  return text ? [text] : [];
}

/** True when sanitised HTML has visible text. */
export const hasText = (html: string): boolean =>
  new DOMParser().parseFromString(html, 'text/html').body.textContent?.trim() !== '';
