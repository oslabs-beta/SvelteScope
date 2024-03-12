import './app.css'
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app'),
});

chrome.devtools.panels.create(
  'Svelte Component Explorer',
  'src/assets/tuner.png',
  '../devtools.html',
  function(panel) {
    const app = document.getElementById('app');
    new App({ target: app });
  }
);

export default app
