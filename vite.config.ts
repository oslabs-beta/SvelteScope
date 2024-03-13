import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
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
