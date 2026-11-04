import { act, renderHook } from '@testing-library/react';
import { useMatchMedia } from './useMatchMedia';

const createMatchMedia = ({ matches, legacy = false }) => {
  const listeners = new Set();
  const watcher = { matches };

  if (legacy) {
    watcher.addListener = vi.fn((fn) => listeners.add(fn));
    watcher.removeListener = vi.fn((fn) => listeners.delete(fn));
  } else {
    watcher.addEventListener = vi.fn((_type, fn) => listeners.add(fn));
    watcher.removeEventListener = vi.fn((_type, fn) => listeners.delete(fn));
  }

  return {
    watcher,
    listeners,
    matchMedia: vi.fn(() => watcher),
    fire: (value) => listeners.forEach((fn) => fn({ matches: value })),
  };
};

describe('useMatchMedia', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns the current match state for the query', () => {
    const media = createMatchMedia({ matches: true });
    vi.stubGlobal('matchMedia', media.matchMedia);

    const { result } = renderHook(() => useMatchMedia('(max-width: 839px)', false));

    expect(media.matchMedia).toHaveBeenCalledWith('(max-width: 839px)');
    expect(result.current).toBe(true);
  });

  it('updates when the media query changes', () => {
    const media = createMatchMedia({ matches: false });
    vi.stubGlobal('matchMedia', media.matchMedia);

    const { result } = renderHook(() => useMatchMedia('(max-width: 839px)', true));
    expect(result.current).toBe(false);

    act(() => media.fire(true));
    expect(result.current).toBe(true);
  });

  it('removes the listener on unmount', () => {
    const media = createMatchMedia({ matches: false });
    vi.stubGlobal('matchMedia', media.matchMedia);

    const { unmount } = renderHook(() => useMatchMedia('(max-width: 839px)', false));
    expect(media.listeners.size).toBe(1);

    unmount();
    expect(media.watcher.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
    expect(media.listeners.size).toBe(0);
  });

  it('falls back to addListener/removeListener on older browsers', () => {
    const media = createMatchMedia({ matches: false, legacy: true });
    vi.stubGlobal('matchMedia', media.matchMedia);

    const { result, unmount } = renderHook(() => useMatchMedia('(max-width: 839px)', false));
    act(() => media.fire(true));
    expect(result.current).toBe(true);

    unmount();
    expect(media.watcher.addListener).toHaveBeenCalledTimes(1);
    expect(media.watcher.removeListener).toHaveBeenCalledTimes(1);
    expect(media.listeners.size).toBe(0);
  });
});
