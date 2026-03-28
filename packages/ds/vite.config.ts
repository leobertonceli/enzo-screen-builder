/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// Plugin: serve dist-export/export.html as raw bytes (bypass Vite HTML transform)
function serveExportFileRaw() {
  return {
    name: 'serve-export-file-raw',
    configureServer(server: import('vite').ViteDevServer) {
      server.middlewares.use('/screen-builder/dist-export/export.html', (req, res, next) => {
        const filePath = path.resolve(dirname, 'dist-export/export.html')
        if (!fs.existsSync(filePath)) { next(); return }
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.setHeader('Cache-Control', 'no-store')
        res.end(fs.readFileSync(filePath))
      })
    },
  }
}

export default defineConfig({
  base: '/screen-builder/',
  plugins: [react(), tailwindcss(), serveExportFileRaw()],
  server: {
    fs: {
      allow: [path.resolve(dirname, '../..')],
    },
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});
