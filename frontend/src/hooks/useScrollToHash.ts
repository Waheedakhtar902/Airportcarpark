import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scrolls to `#id` targets after navigation, or to the top on a new page. */
export function useScrollToHash(): void {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }
    // Wait a frame so lazily loaded sections are in the DOM.
    const id = requestAnimationFrame(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: 'smooth' });
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, hash]);
}
