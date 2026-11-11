import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Link, MemoryRouter } from 'react-router-dom';
import NavigationEffects from '../NavigationEffects';

const { send, event, gtag } = vi.hoisted(() => ({
  send: vi.fn(),
  event: vi.fn(),
  gtag: vi.fn(),
}));
vi.mock('react-ga4', () => ({ default: { send, event, gtag } }));

function renderNavigation(path = '/') {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
  return render(
    <MemoryRouter initialEntries={[path]}>
      <NavigationEffects />
      <Link to="/news?page=2">News</Link>
      <Link to="/administrative/#13">Support</Link>
      <Link to="/administrative">Close panel</Link>
      <Link to="/administrative/">Trailing slash</Link>
      <Link to="/main-collections/detail/ethnography/chalice" state={{ scrollToImage: true }}>
        Next collection item
      </Link>
      <Link to="/main-collections/intro/ethnography#gallery">Back to gallery</Link>
    </MemoryRouter>,
    { container: root },
  );
}

describe('navigation effects', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });
  afterEach(() => vi.restoreAllMocks());

  it('scrolls to the top on router navigation and leaves page views to the Google tag', async () => {
    const user = userEvent.setup();
    renderNavigation();
    window.scrollTo.mockClear();

    await user.click(screen.getByRole('link', { name: 'News' }));

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    expect(send).not.toHaveBeenCalled();
    expect(event).not.toHaveBeenCalled();
    expect(gtag).not.toHaveBeenCalled();
  });

  it('scrolls to hash targets that mount after a lazy route resolves', async () => {
    const { container } = renderNavigation('/administrative/#13');
    const target = document.createElement('div');
    target.id = '13';
    target.scrollIntoView = vi.fn();
    act(() => container.appendChild(target));
    await waitFor(() => expect(target.scrollIntoView).toHaveBeenCalledOnce());
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it('does not reset scroll when an accordion hash is cleared or a trailing slash changes', async () => {
    const user = userEvent.setup();
    renderNavigation('/administrative/#13');
    window.scrollTo.mockClear();

    await user.click(screen.getByRole('link', { name: 'Close panel' }));
    expect(window.scrollTo).not.toHaveBeenCalled();

    await user.click(screen.getByRole('link', { name: 'Trailing slash' }));
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it('lets collection detail navigation handle its image scroll', async () => {
    const user = userEvent.setup();
    renderNavigation('/main-collections/detail/ethnography/vase');
    window.scrollTo.mockClear();

    await user.click(screen.getByRole('link', { name: 'Next collection item' }));

    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it('resets scroll for a missing hash target and observes for it to mount later', async () => {
    const user = userEvent.setup();
    const { container } = renderNavigation('/main-collections/detail/ethnography/vase');
    window.scrollTo.mockClear();

    await user.click(screen.getByRole('link', { name: 'Back to gallery' }));

    expect(window.scrollTo).toHaveBeenCalledOnce();
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    const target = document.createElement('div');
    target.id = 'gallery';
    target.scrollIntoView = vi.fn();
    act(() => container.appendChild(target));
    await waitFor(() => expect(target.scrollIntoView).toHaveBeenCalledOnce());
    expect(window.scrollTo).toHaveBeenCalledOnce();
  });

  it('disconnects a pending hash observer when the route changes', async () => {
    const disconnect = vi.spyOn(MutationObserver.prototype, 'disconnect');
    const user = userEvent.setup();
    renderNavigation('/administrative/#missing');
    await user.click(screen.getByRole('link', { name: 'News' }));
    expect(disconnect).toHaveBeenCalled();
  });
});
