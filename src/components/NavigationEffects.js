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
