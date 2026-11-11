import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import GA4React from 'ga-4-react';

export default function NavigationEffects() {
  const { pathname, search, hash, state } = useLocation();
  const previousPage = useRef(pathname + search);
  const previousPathname = useRef(pathname.replace(/\/+$/, '') || '/');

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
    const normalizedPathname = pathname.replace(/\/+$/, '') || '/';
    const isDifferentPage = previousPathname.current !== normalizedPathname;
    previousPathname.current = normalizedPathname;

    if (!hash) {
      if (isDifferentPage && !state?.scrollToImage) window.scrollTo(0, 0);
      return;
    }

    const scrollToHash = () => {
      const target = document.getElementById(hash.slice(1));
      if (!target) return false;
      target.scrollIntoView();
      return true;
    };

    if (scrollToHash()) return;
    if (isDifferentPage && !state?.scrollToImage) window.scrollTo(0, 0);
    // Lazy routes may not have mounted the hash target yet.
    const observer = new MutationObserver(() => {
      if (scrollToHash()) observer.disconnect();
    });
    observer.observe(document.getElementById('root'), { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [pathname, hash, state]);

  return null;
}
