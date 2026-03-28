import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Standalone export build — outputs a single self-contained HTML
// Usage: npm run build:export
// Output: dist-export/export.html (open directly in any browser, no server needed)

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), viteSingleFile({ removeViteModuleLoader: true, useRecommendedBuildConfig: true })],
  resolve: {
    alias: [
      // Use pre-compressed MFC photos (16-18 KB each vs 4.9-6.4 MB originals)
      // so the export file stays under ~1 MB instead of 22 MB
      {
        find: /^(.*)\/assets\/mfc\/(mfc-[^/]+\.jpg)$/,
        replacement: path.resolve(__dirname, 'src/assets/mfc-export/$2'),
      },
    ],
  },
  build: {
    outDir: 'dist-export',
    emptyOutDir: true,
    assetsInlineLimit: 100 * 1024 * 1024, // inline everything (fonts, images)
    rollupOptions: {
      input: 'export.html',
      output: {
        format: 'es',
        entryFileNames: 'assets/[name].js',
      },
    },
  },
})
