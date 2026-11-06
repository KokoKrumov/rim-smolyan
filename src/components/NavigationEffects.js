import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import GA4React from 'ga-4-react';

export default function NavigationEffects() {
  const { pathname, search, hash } = useLocation();
  const previousPage = useRef(pathname + search);

  useEffect(() => {
    const page = pathname + search;
    if (previousPage.current !== page) {
      previousPage.current = page;
      if (GA4React.isInitialized()) {
        GA4React.getGA4React().pageview(page, window.location.href, document.title);
      }
    }
  }, [pathname, search]);

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const scrollToHash = () => {
      const target = document.getElementById(hash.slice(1));
      if (!target) return false;
      target.scrollIntoView();
      return true;
    };

    if (scrollToHash()) return;
    // Lazy routes may not have mounted the hash target yet.
    const observer = new MutationObserver(() => {
      if (scrollToHash()) observer.disconnect();
    });
    observer.observe(document.getElementById('root'), { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [pathname, hash]);

  return null;
}
