import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Page views are not sent from here: the Google tag already records one for
// every history change (Enhanced Measurement), so a manual one would be a duplicate.
export default function NavigationEffects() {
  const { pathname, hash, state } = useLocation();
  const previousPathname = useRef(pathname.replace(/\/+$/, '') || '/');

  useEffect(() => {
    const normalizedPathname = pathname.replace(/\/+$/, '') || '/';
    const isDifferentPage = previousPathname.current !== normalizedPathname;
    previousPathname.current = normalizedPathname;

    if (!hash) {
      if (isDifferentPage && !state?.scrollToImage && !state?.preserveScroll) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
      return;
    }

    const scrollToHash = () => {
      const target = document.getElementById(hash.slice(1));
      if (!target) return false;
      if (isDifferentPage) target.scrollIntoView({ behavior: 'instant' });
      else target.scrollIntoView();
      return true;
    };

    if (scrollToHash()) return;
    if (isDifferentPage && !state?.scrollToImage && !state?.preserveScroll) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    // Lazy routes may not have mounted the hash target yet.
    const observer = new MutationObserver(() => {
      if (scrollToHash()) observer.disconnect();
    });
    observer.observe(document.getElementById('root'), { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [pathname, hash, state]);

  return null;
}
