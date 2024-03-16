// import { defineConfig } from 'rollup';

// export default defineConfig([
//   {
//     input: 'static/background.js',
//     output: {
//       file: 'build/background.js',
//     },
//   },
//   {
//     input: 'static/contentScript.js',
//     output: {
//       file: 'build/contentScript.js',
//     },
//   },
// ]);

// rollup.config.js

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

import {
  chromeExtension,
  simpleReloader,
} from 'rollup-plugin-chrome-extension';

export default {
  input: 'static/manifest.json',
  output: {
    dir: 'build',
    format: 'esm',
  },
  plugins: [
    // always put chromeExtension() before other plugins
    chromeExtension(),
    simpleReloader(),
    // the plugins below are optional
    resolve(),
    commonjs(),
    json(),
  ],
};
