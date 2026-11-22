import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Link, MemoryRouter, useNavigate } from 'react-router-dom';
import NavigationEffects from '../NavigationEffects';

const { send, event, gtag } = vi.hoisted(() => ({
  send: vi.fn(),
  event: vi.fn(),
  gtag: vi.fn(),
}));
vi.mock('react-ga4', () => ({ default: { send, event, gtag } }));

function BackButton() {
  const navigate = useNavigate();
  return <button onClick={() => navigate(-1)}>Back</button>;
}

function renderNavigation(path = '/') {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
  return render(
    <MemoryRouter initialEntries={[path]}>
      <NavigationEffects />
      <BackButton />
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

// jsdom has no layout, so the page height and scroll offset are set by hand
function setPageHeight(height) {
  Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: height });
}

function scrollPageTo(position) {
  Object.defineProperty(window, 'scrollY', { configurable: true, value: position });
  fireEvent.scroll(window);
}

// Leaves /news scrolled to 1200px for /administrative, where the next step is going back
async function leaveScrolledNewsPage(user) {
  const view = renderNavigation('/news');
  scrollPageTo(1200);
  await user.click(screen.getByRole('link', { name: 'Close panel' }));
  scrollPageTo(0);
  window.scrollTo.mockClear();
  return view;
}

const savedPosition = { top: 1200, left: 0, behavior: 'instant' };

describe('navigation effects', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });
  afterEach(() => {
    vi.restoreAllMocks();
    delete document.documentElement.scrollHeight;
    scrollPageTo(0);
  });

  it('restores the saved position on back navigation instead of scrolling to the top', async () => {
    const user = userEvent.setup();
    await leaveScrolledNewsPage(user);
    setPageHeight(5000);

    await user.click(screen.getByRole('button', { name: 'Back' }));

    expect(window.scrollTo).toHaveBeenCalledExactlyOnceWith(savedPosition);
  });

  it('finishes restoring the position once the remounted content is tall enough', async () => {
    const user = userEvent.setup();
    const { container } = await leaveScrolledNewsPage(user);
    setPageHeight(600);

    await user.click(screen.getByRole('button', { name: 'Back' }));
    expect(window.scrollTo).toHaveBeenCalledExactlyOnceWith(savedPosition);

    setPageHeight(5000);
    await act(async () => container.appendChild(document.createElement('div')));
    expect(window.scrollTo).toHaveBeenCalledTimes(2);
    expect(window.scrollTo).toHaveBeenLastCalledWith(savedPosition);

    await act(async () => container.appendChild(document.createElement('div')));
    expect(window.scrollTo).toHaveBeenCalledTimes(2);
  });

  it('stops restoring the position when the visitor starts scrolling', async () => {
    const user = userEvent.setup();
    const { container } = await leaveScrolledNewsPage(user);
    setPageHeight(600);
    await user.click(screen.getByRole('button', { name: 'Back' }));

    fireEvent.wheel(window);
    setPageHeight(5000);
    await act(async () => container.appendChild(document.createElement('div')));

    expect(window.scrollTo).toHaveBeenCalledOnce();
  });

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
