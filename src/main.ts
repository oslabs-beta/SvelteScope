import './app.css'
import App from './App.svelte';

console.log('logging main.ts!')

const app = new App({
  target: document.getElementById('app'),
});

// chrome.devtools.panels.create(
//   'Svelte Component Explorer',
//   'src/assets/tuner.png',
//   '../devtools.html',
//   function(panel) {
//     // const app = document.getElementById('app');
//     new App({ target: document.getElementById('app') });
//   }
// );

export default app
