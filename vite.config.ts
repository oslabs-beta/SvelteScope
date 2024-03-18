import { defineConfig } from 'vite'
import { resolve } from 'node:path';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      svelte()
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

