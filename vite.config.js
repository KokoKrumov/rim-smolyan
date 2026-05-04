import { defineConfig, loadEnv, transformWithOxc } from 'vite';
import react from '@vitejs/plugin-react';
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
      return transformWithOxc(code, id.replace(/\.js$/, '.jsx'), { sourcemap });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(__dirname, 'environments'), '');

  return {
    plugins: [
      jsxPlugin(),
      react(),
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
  };
});
