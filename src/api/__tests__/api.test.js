describe('api clients', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it('streams uses VITE_API_URL as the base URL', async () => {
    vi.stubEnv('VITE_API_URL', 'https://api.example.test/wp-json/wp/v2');

    const { default: streams } = await import('./streams');

    expect(streams.defaults.baseURL).toBe('https://api.example.test/wp-json/wp/v2');
  });

  it('public client loads files from the site root', async () => {
    const { default: publicStreams } = await import('./public');

    expect(publicStreams.defaults.baseURL).toBe('/');
  });

  it('creates independent axios instances', async () => {
    const { default: axios } = await import('axios');
    const { default: streams } = await import('./streams');
    const { default: publicStreams } = await import('./public');

    expect(streams).not.toBe(axios);
    expect(publicStreams).not.toBe(axios);
    expect(streams).not.toBe(publicStreams);
  });

  it('exposes the local dev domain', async () => {
    const { DEV_DOMAIN } = await import('./nonenv');

    expect(DEV_DOMAIN).toBe('http://localhost:3000');
  });
});
