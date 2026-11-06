import { waitFor } from '@testing-library/react';

const { render, initialize, pageview, gtag, preload } = vi.hoisted(() => ({
  render: vi.fn(),
  initialize: vi.fn(),
  pageview: vi.fn(),
  gtag: vi.fn(),
  preload: vi.fn(),
}));

vi.mock('react-dom', async importOriginal => ({
  ...await importOriginal(),
  preload,
}));
vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({ render })),
}));
vi.mock('ga-4-react', () => ({
  default: class {
    initialize = initialize;
  },
}));
vi.mock('../components/App', () => ({ default: () => null }));

describe('application startup', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    document.body.innerHTML = '<div id="root"></div>';
    window.history.replaceState(null, '', '/');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
    window.history.replaceState(null, '', '/');
  });

  it('renders before starting analytics, even while initialization is pending', async () => {
    initialize.mockImplementation(() => new Promise(() => {}));

    await import('../index.jsx');

    expect(render).toHaveBeenCalledOnce();
    expect(initialize).toHaveBeenCalledOnce();
    expect(render.mock.invocationCallOrder[0]).toBeLessThan(initialize.mock.invocationCallOrder[0]);
    expect(pageview).not.toHaveBeenCalled();
    expect(preload).toHaveBeenCalledWith(expect.stringContaining('baseHero'), {
      as: 'image', fetchPriority: 'high',
    });
  });

  it('does not preload the homepage hero on other routes', async () => {
    window.history.replaceState(null, '', '/contact-us');
    initialize.mockImplementation(() => new Promise(() => {}));
    await import('../index.jsx');
    expect(preload).not.toHaveBeenCalled();
    expect(render).toHaveBeenCalledOnce();
  });

  it('preserves page-view tracking after analytics initializes', async () => {
    initialize.mockResolvedValue({ pageview, gtag });

    await import('../index.jsx');

    await waitFor(() => expect(pageview).toHaveBeenCalledWith(
      window.location.pathname + window.location.search,
      window.location.href,
      document.title,
    ));
    expect(gtag).not.toHaveBeenCalled();
    expect(render).toHaveBeenCalledOnce();
  });

  it('reports initialization failures without preventing rendering', async () => {
    const error = new Error('Analytics unavailable');
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    initialize.mockRejectedValue(error);

    await import('../index.jsx');

    await waitFor(() => expect(consoleError).toHaveBeenCalledWith(error));
    expect(render).toHaveBeenCalledOnce();
    expect(pageview).not.toHaveBeenCalled();
  });
});
