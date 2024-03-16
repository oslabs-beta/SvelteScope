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



// import { defineConfig } from 'vite'
// import { resolve } from 'node:path';
// import { svelte } from '@sveltejs/vite-plugin-svelte';
// import hotReloadExtension from 'hot-reload-extension-vite';

// https://vitejs.dev/config/
// export default defineConfig(() => {
//   return {
//     plugins: [
//       svelte(),
//       hotReloadExtension({
//       log: true,
//       backgroundPath: 'static/background.js'
//     }),
//     {
//       name: 'content-scripts',
//       transform(code, id) {
//         if (id.includes('contentScript')) {
//           return {
//             code: `(function() { ${code} })()`, // Wrap in self-invoking function
//             map: { inline: false }, // Disable source maps (not needed in content scripts)
//           };
//         }
//         return null;
//       },
//   },                               
//     ],
//     build: {
//       outDir: 'build',
//       rollupOptions: {
//         output: {
//           dir: 'dist/contentScripts', // Output directory for built content scripts
//           format: 'iife', // Self-invoking function format for content scripts
//         },
//       },
//     },
//     publicDir: 'static',
//     resolve: {
//       alias: {
//         $lib: resolve(__dirname, 'src/lib'),
//       },
//     },
//   };
// });



// export default defineConfig({
//   build: {
//     // Regular build configuration for your extension's main script
//     ...

//     // Content script build configuration
//     rollupOptions: {
//       output: {
//         dir: 'dist/contentScripts', // Output directory for built content scripts
//         format: 'iife', // Self-invoking function format for content scripts
//       },
//     },
//     // Include your content scripts for building
//     plugins: [
//       {
//         name: 'content-scripts',
//         transform(code, id) {
//           if (id.includes('contentScript')) {
//             return {
//               code: `(function() { ${code} })()`, // Wrap in self-invoking function
//               map: { inline: false }, // Disable source maps (not needed in content scripts)
//             };
//           }
//           return null;
//         },
//       },
//     ],
//   },
// });



// export default defineConfig({
//   plugins: [
//     svelte(),
    // hotReloadExtension({
    //   log: true,
    //   backgroundPath: 'devtools/background/background.js'
    // })
//   ],
//   build: {
//     outDir: './devtools/dist',
//     rollupOptions: {
//       output: {
//         entryFileNames: 'bundle.js',
//         assetFileNames: 'bundle.css'
//       }
//     }
//   }
// })
