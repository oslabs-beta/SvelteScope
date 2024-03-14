import { defineConfig } from 'vite'
import { resolve } from 'node:path';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import hotReloadExtension from 'hot-reload-extension-vite';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      svelte(),
      hotReloadExtension({
      log: true,
      backgroundPath: 'static/background.js'
    })
    ],
    build: {
      outDir: 'build',
    },
    publicDir: 'static',
    resolve: {
      alias: {
        $lib: resolve(__dirname, 'src/lib'),
      },
    },
  };
});
