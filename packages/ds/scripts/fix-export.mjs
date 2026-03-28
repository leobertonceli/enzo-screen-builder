// Post-build fixes for dist-export/export.html + export-preview.html
import { readFileSync, writeFileSync, copyFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

function patchFile(file) {
  let html = readFileSync(file, 'utf-8')

  // Remove rel=".." and crossorigin from <style> tags (invalid on <style>)
  html = html.replace(/<style\s+[^>]*(rel|crossorigin)[^>]*>/g, '<style>')

  writeFileSync(file, html)
}

const exportFile    = resolve(__dirname, '../dist-export/export.html')
const previewFile   = resolve(__dirname, '../dist-export/export-preview.html')
const publicPreview = resolve(__dirname, '../public/export-preview.html')

patchFile(exportFile)
console.log('✔ dist-export/export.html patched')

// Copy to public/ so Playground Exportar can fetch it
copyFileSync(exportFile, publicPreview)
console.log('✔ public/export-preview.html updated from build')

try {
  patchFile(previewFile)
  console.log('✔ dist-export/export-preview.html patched')
} catch { /* may not exist */ }
