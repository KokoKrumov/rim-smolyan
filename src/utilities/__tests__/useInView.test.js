import React from 'react';
import { act, render, screen } from '@testing-library/react';
import DeferredBackground from '../../components/DeferredBackground';

describe('deferred backgrounds', () => {
  let callback;
  let observer;

  beforeEach(() => {
    observer = { observe: vi.fn(), disconnect: vi.fn() };
    vi.stubGlobal('IntersectionObserver', class {
      constructor(fn, options) {
        callback = fn;
        expect(options).toEqual({ rootMargin: '200px' });
        return observer;
      }
    });
  });

  afterEach(() => vi.unstubAllGlobals());

  it('keeps content mounted but only requests the background near the viewport', () => {
    render(<DeferredBackground image="/background.jpg">Content</DeferredBackground>);
    const region = screen.getByText('Content');
    expect(observer.observe).toHaveBeenCalledWith(region);
    expect(region.style.backgroundImage).toBe('');

    act(() => callback([{ isIntersecting: false }]));
    expect(region.style.backgroundImage).toBe('');
    act(() => callback([{ isIntersecting: true }]));
    expect(region.style.backgroundImage).toContain('/background.jpg');
    expect(observer.disconnect).toHaveBeenCalled();
  });

  it('disconnects when unmounted before entering the viewport', () => {
    const { unmount } = render(<DeferredBackground image="/background.jpg">Content</DeferredBackground>);
    unmount();
    expect(observer.disconnect).toHaveBeenCalled();
  });

  it('shows backgrounds on browsers without IntersectionObserver', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    render(<DeferredBackground image="/background.jpg">Content</DeferredBackground>);
    expect(screen.getByText('Content').style.backgroundImage).toContain('/background.jpg');
  });
});
