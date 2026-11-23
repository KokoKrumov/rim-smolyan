/// <reference types="vitest/config" />
import { defineConfig, loadEnv, transformWithOxc } from 'vite';
import react from '@vitejs/plugin-react';
import { existsSync } from 'node:fs';
import { rename } from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function jsxPlugin() {
  let sourcemap = false;
  return {
    name: 'treat-js-as-jsx',
    enforce: 'pre',
    configResolved(config) {
      sourcemap = !!config.build.sourcemap;
    },
    async transform(code, id) {
      if (!id.match(/src\/.*\.js$/)) return null;
      // Keep the real filename so source maps (and test coverage) point at the .js file
      return transformWithOxc(code, id, { lang: 'jsx', sourcemap });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(__dirname, 'environments'), '');

  return {
    plugins: [
      jsxPlugin(),
      react(),
      {
        name: 'rename-build-html',
        async writeBundle({ dir }) {
          await rename(path.join(dir, 'index.html'), path.join(dir, 'react.html'));
        },
        configurePreviewServer(server) {
          // A preview hook disables Vite's normal missing-output check.
          const outDir = server.config.environments.client.build.outDir;
          if (!existsSync(path.resolve(server.config.root, outDir))) {
            throw new Error(`The directory "${outDir}" does not exist. Did you build your project?`);
          }
          return () => {
            server.middlewares.use((req, _res, next) => {
              if (req.url === '/index.html') req.url = '/react.html';
              next();
            });
          };
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
        '~react-alice-carousel': path.resolve(__dirname, 'node_modules/react-alice-carousel'),
        'fonts': path.resolve(__dirname, 'src/assets/fonts'),
      },
    },
    server: {
      port: 3000,
      open: true,
    },
    build: {
      outDir: 'build',
      target: 'es2022',
      sourcemap: mode !== 'prod',
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [
              { name: 'react-vendor', test: /\/node_modules\/(react|react-dom|react-redux|redux|redux-thunk)\// },
              { name: 'react-router', test: /\/node_modules\/react-router-dom\// },
              { name: 'react-intl',   test: /\/node_modules\/react-intl\// },
              { name: 'ui-vendor',   test: /\/node_modules\/(bootstrap|react-bootstrap|styled-components|react-alice-carousel|react-transition-group|react-share)\// },
              { name: 'utils',       test: /\/node_modules\/(lodash|axios)\// },
            ],
          },
        },
      },
    },
    envDir: './environments',
    envPrefix: 'VITE_',
    oxc: {
      include: /src\/.*\.js$/,
    },
    optimizeDeps: {
      rolldownOptions: {
        moduleTypes: {
          '.js': 'jsx',
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: [
            'legacy-js-api',
            'import',
            'global-builtin',
            'color-functions',
            'slash-div',
            'abs-percent',
            'if-function',
          ],
          quietDeps: true,
        },
      },
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/setupTests.js',
      include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
      css: false,
      // Date helpers parse ISO dates as UTC; pin the zone so results don't depend on the machine
      env: { TZ: 'UTC' },
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html', 'lcov'],
        include: ['src/**/*.{js,jsx,ts,tsx}'],
        exclude: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}', 'src/setupTests.js', 'src/**/*.d.ts'],
      },
    },
  };
});
