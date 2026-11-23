const { render, initialize, send, event, gtag, preload } = vi.hoisted(() => ({
  render: vi.fn(),
  initialize: vi.fn(),
  send: vi.fn(),
  event: vi.fn(),
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
vi.mock('react-ga4', () => ({
  default: { initialize, send, event, gtag },
}));
vi.mock('../components/App', () => ({ default: () => null }));

describe('application startup', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    document.body.innerHTML = '<div id="root"></div>';
    window.history.replaceState(null, '', '/');
    vi.stubEnv('MODE', 'prod');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    document.body.innerHTML = '';
    window.history.replaceState(null, '', '/');
  });

  it('renders before starting analytics', async () => {
    await import('../index.jsx');

    expect(render).toHaveBeenCalledOnce();
    expect(initialize).toHaveBeenCalledExactlyOnceWith('G-Y09PXD41TG');
    expect(render.mock.invocationCallOrder[0]).toBeLessThan(initialize.mock.invocationCallOrder[0]);
    expect(preload).toHaveBeenCalledWith(expect.stringContaining('baseHero'), {
      as: 'image', fetchPriority: 'high',
    });
  });

  it('does not preload the homepage hero on other routes', async () => {
    window.history.replaceState(null, '', '/contact-us');
    await import('../index.jsx');
    expect(preload).not.toHaveBeenCalled();
    expect(render).toHaveBeenCalledOnce();
  });

  it('leaves page views to the Google tag instead of sending a duplicate', async () => {
    await import('../index.jsx');

    expect(initialize).toHaveBeenCalledOnce();
    expect(send).not.toHaveBeenCalled();
    expect(event).not.toHaveBeenCalled();
    expect(gtag).not.toHaveBeenCalled();
  });

  it('starts analytics in the dev environment', async () => {
    vi.stubEnv('MODE', 'dev');
    await import('../index.jsx');
    expect(initialize).toHaveBeenCalledExactlyOnceWith('G-Y09PXD41TG');
  });

  it.each(['staging', 'development', 'production', 'test'])('skips analytics in the %s mode', async mode => {
    vi.stubEnv('MODE', mode);
    await import('../index.jsx');
    expect(render).toHaveBeenCalledOnce();
    expect(initialize).not.toHaveBeenCalled();
  });

  it('reports initialization failures without preventing rendering', async () => {
    const error = new Error('Analytics unavailable');
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    initialize.mockImplementationOnce(() => { throw error; });

    await import('../index.jsx');

    expect(consoleError).toHaveBeenCalledWith(error);
    expect(render).toHaveBeenCalledOnce();
  });
});
