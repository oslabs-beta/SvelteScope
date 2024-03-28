import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import {
  chromeExtension,
  simpleReloader,
} from 'rollup-plugin-chrome-extension';
import svelte from 'rollup-plugin-svelte';
import css from 'rollup-plugin-css-only'

export default {
  input: 'static/manifest.json',
  output: {
    dir: 'build',
    format: 'esm',
    sourcemap: true,
  },
  plugins: [
    // always put chromeExtension() before other plugins
    chromeExtension({
      preloadEntries: [
        'static/contentScript.js',
        'static/contentScriptIsolate.js',
        // Include other entry points as needed),
      ],
    }),
    simpleReloader(),
    // the plugins below are optional
    resolve(),
    commonjs(),
    svelte(),
    css({
      output:{
        dir: 'build',
      }
    })
  ],
};
