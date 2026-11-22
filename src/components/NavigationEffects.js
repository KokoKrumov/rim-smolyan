import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const normalizePathname = (pathname) => pathname.replace(/\/+$/, '') || '/';

// Lazy routes and fetched content may not have rendered yet, so retry as the page changes.
function retryOnRender(attempt) {
  const observer = new MutationObserver(() => {
    if (attempt()) observer.disconnect();
  });
  observer.observe(document.getElementById('root'), { childList: true, subtree: true });
  return () => observer.disconnect();
}

// Page views are not sent from here: the Google tag already records one for
// every history change (Enhanced Measurement), so a manual one would be a duplicate.
export default function NavigationEffects() {
  const { key, pathname, hash, state } = useLocation();
  const navigationType = useNavigationType();
  const previousPathname = useRef(normalizePathname(pathname));
  const currentKey = useRef(key);
  const scrollPositions = useRef(new Map());

  useEffect(() => {
    const savePosition = () => scrollPositions.current.set(currentKey.current, window.scrollY);
    window.addEventListener('scroll', savePosition, { passive: true });
    return () => window.removeEventListener('scroll', savePosition);
  }, []);

  // Runs as a layout effect, before the browser reports the scroll caused by the new page's
  // layout: that scroll belongs to the entry being opened and must not replace the position
  // saved for it, or for the entry being left, before it has been read here.
  useLayoutEffect(() => {
    const normalizedPathname = normalizePathname(pathname);
    const isDifferentPage = previousPathname.current !== normalizedPathname;
    previousPathname.current = normalizedPathname;
    const savedPosition = navigationType === 'POP' ? scrollPositions.current.get(key) : undefined;
    currentKey.current = key;
    const resetsScroll = isDifferentPage && !state?.scrollToImage;

    // Back/Forward returns to where the visitor left the page. The browser restores that
    // position only once, often before fetched content has rendered, so it is applied
    // again here until the page is tall enough to reach it.
    if (savedPosition !== undefined && !state?.scrollToImage) {
      const restorePosition = () => {
        window.scrollTo({ top: savedPosition, left: 0, behavior: 'instant' });
        const { scrollHeight, clientHeight } = document.documentElement;
        return scrollHeight - clientHeight >= savedPosition - 1;
      };
      if (restorePosition()) return;

      const stopRestoring = retryOnRender(restorePosition);
      // Once the visitor interacts with the page it must not be moved under them.
      const interactions = ['wheel', 'touchstart', 'mousedown', 'keydown'];
      interactions.forEach((type) => window.addEventListener(type, stopRestoring, { passive: true }));
      return () => {
        stopRestoring();
        interactions.forEach((type) => window.removeEventListener(type, stopRestoring));
      };
    }

    if (!hash) {
      if (resetsScroll) window.scrollTo(0, 0);
      return;
    }

    const scrollToHash = () => {
      const target = document.getElementById(hash.slice(1));
      if (!target) return false;
      target.scrollIntoView();
      return true;
    };

    if (scrollToHash()) return;
    if (resetsScroll) window.scrollTo(0, 0);
    return retryOnRender(scrollToHash);
  }, [key, pathname, hash, state, navigationType]);

  return null;
}
