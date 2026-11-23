// @vitest-environment node
import { mkdtemp, mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build, preview } from 'vite';

const configFile = fileURLToPath(new URL('../../vite.config.js', import.meta.url));

describe('build HTML entry', () => {
  let root;
  let outDir;
  let server;
  let baseURL;

  const buildFixture = () => build({
    root,
    configFile,
    mode: 'prod',
    logLevel: 'silent',
    build: { outDir, emptyOutDir: false, sourcemap: false },
  });

  beforeAll(async () => {
    root = await mkdtemp(path.join(tmpdir(), 'rim-build-'));
    outDir = path.join(root, 'build');
    await mkdir(path.join(root, 'public'));
    await mkdir(path.join(root, 'src'));
    await Promise.all([
      writeFile(path.join(root, 'index.html'), '<html><body>Built entry<script type="module" src="/src/main.js"></script></body></html>'),
      writeFile(path.join(root, 'public', 'index.html'), '<html>Old public entry</html>'),
      writeFile(path.join(root, 'public', 'favicon.ico'), 'fixture icon'),
      writeFile(path.join(root, 'src', 'main.js'), 'document.body.dataset.ready = "yes";'),
    ]);

    await buildFixture();
    server = await preview({
      root,
      configFile,
      logLevel: 'silent',
      build: { outDir },
      preview: { host: '127.0.0.1', port: 0, strictPort: true },
    });
    const address = server.httpServer.address();
    if (!address || typeof address === 'string') throw new Error('Preview server did not start');
    baseURL = `http://127.0.0.1:${address.port}`;
  }, 30000);

  afterAll(async () => {
    if (server) await server.close();
    if (root) await rm(root, { recursive: true, force: true });
  });

  it('emits the processed entry as react.html without leaving the public index.html', async () => {
    const html = await readFile(path.join(outDir, 'react.html'), 'utf8');
    expect(html).toContain('Built entry');
    expect(html).not.toContain('Old public entry');
    const script = html.match(/<script[^>]+src="([^"]+)"/);
    expect(script?.[1]).toMatch(/^\/assets\/.+\.js$/);
    await expect(stat(path.join(outDir, script[1].slice(1)))).resolves.toBeDefined();
    await expect(stat(path.join(outDir, 'index.html'))).rejects.toMatchObject({ code: 'ENOENT' });
  });

  it.each(['/', '/news/example', '/react.html'])('previews the entry at %s', async (url) => {
    const response = await fetch(`${baseURL}${url}`, { headers: { Accept: 'text/html' } });
    expect(response.status).toBe(200);
    expect(await response.text()).toContain('Built entry');
  });

  it('continues serving assets and returns 404 for missing non-HTML requests', async () => {
    const icon = await fetch(`${baseURL}/favicon.ico`);
    expect(await icon.text()).toBe('fixture icon');
    const missing = await fetch(`${baseURL}/missing.js`, { headers: { Accept: 'application/javascript' } });
    expect(missing.status).toBe(404);
  });

  it('reports a missing preview output directory', async () => {
    let unexpectedServer;
    try {
      const start = preview({
        root,
        configFile,
        logLevel: 'silent',
        build: { outDir: path.join(root, 'missing-build') },
        preview: { host: '127.0.0.1', port: 0, strictPort: true },
      }).then((started) => {
        unexpectedServer = started;
        return started;
      });
      await expect(start).rejects.toThrow('does not exist. Did you build your project?');
    } finally {
      if (unexpectedServer) await unexpectedServer.close();
    }
  });

  it('copies the PHP front controller as index.php into the build', async () => {
    const publicDir = fileURLToPath(new URL('../../public', import.meta.url));
    const deploymentDir = path.join(root, 'deployment-build');
    await build({
      root,
      configFile,
      mode: 'prod',
      logLevel: 'silent',
      publicDir,
      build: { outDir: deploymentDir, sourcemap: false },
    });

    const php = await readFile(path.join(deploymentDir, 'index.php'), 'utf8');
    expect(php).toBe(await readFile(path.join(publicDir, 'index.php'), 'utf8'));
    expect(php).toContain("include('react.html')");
    await expect(stat(path.join(deploymentDir, 'react.html'))).resolves.toBeDefined();
    await expect(stat(path.join(deploymentDir, 'router.php'))).rejects.toMatchObject({ code: 'ENOENT' });
  }, 30000);

  it('replaces react.html on subsequent builds without emptying the output', async () => {
    await writeFile(path.join(root, 'index.html'), '<html><body>Updated entry</body></html>');
    await buildFixture();
    expect(await readFile(path.join(outDir, 'react.html'), 'utf8')).toContain('Updated entry');
    await expect(stat(path.join(outDir, 'index.html'))).rejects.toMatchObject({ code: 'ENOENT' });
  }, 30000);
});
