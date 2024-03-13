import { defineConfig } from 'rollup';

export default defineConfig([
  {
    input: 'static/background.js',
    output: {
      file: 'build/background.js',
    },
  },
]);
