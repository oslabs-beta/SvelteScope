import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import hotReloadExtension from 'hot-reload-extension-vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    hotReloadExtension({
      log: true,
      backgroundPath: 'devtools/background/background.js'
    })
  ],
  build: {
    outDir: './devtools/dist',
    rollupOptions: {
      output: {
        entryFileNames: 'bundle.js',
        assetFileNames: 'bundle.css'
      }
    }
  }
})
