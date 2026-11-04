import utilizeScroll from '../utilizeScroll';

describe('utilizeScroll', () => {
  it('scrolls the referenced element into view', () => {
    const { elRef, executeScroll } = utilizeScroll();
    const scrollIntoView = vi.fn();
    elRef.current = { scrollIntoView };

    executeScroll();

    expect(scrollIntoView).toHaveBeenCalledTimes(1);
  });

  it('creates a separate ref per call', () => {
    expect(utilizeScroll().elRef).not.toBe(utilizeScroll().elRef);
  });
});
