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

// import { manifestTransformers } from 'rollup-plugin-chrome-extension';
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

import { chromeExtension, simpleReloader} from 'rollup-plugin-chrome-extension'

import svelte from 'rollup-plugin-svelte';

// import typescript from 'rollup-plugin-typescript2';
// import sourcemaps from 'rollup-plugin-sourcemaps';
// import nodeResolve from 'rollup-plugin-node-resolve';
// import { uglify } from 'rollup-plugin-uglify';


// export default {
//   input: 'static/manifest.json',
//   output: {
//     dir: 'build',
//     format: 'esm', //'iife'
//     sourcemap: true,
//   },
//   plugins: [
//     // always put chromeExtension() before other plugins
//     chromeExtension({
//       preloadEntries: [
//         'static/contentScript.js',
//         // 'static/background.js',
//         // Include other entry points as needed),
//       ],
//       manifestTransformers: [manifestTransformers.browser_specific_settings],
//     }),
//     simpleReloader(),
//     // the plugins below are optional
//     resolve(),
//     commonjs(),
//     svelte(),
//   ],
// }

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
        // 'static/background.js',
        // Include other entry points as needed),
      ],
      // manifestTransformers: [manifestTransformers.browser_specific_settings],
        }),
    simpleReloader(),
    // the plugins below are optional
    resolve(),
    commonjs(),
    svelte(),
  ],
}

// manifest: path.join(__dirname, 'static', 'manifest.json'),
// background: path.join(__dirname, 'static', 'background.js'),
// contentScriptMain: path.join(__dirname, 'static', 'contentScript.js'),
// contentScriptIsolated: path.join(__dirname, 'static', 'contentScript2.js'),
// devtools: path.join(__dirname, 'static', 'devtools.js'),
