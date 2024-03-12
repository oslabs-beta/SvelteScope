chrome.devtools.panels.create(
  'Svelte Component Explorer',
  'assets/tuner.png',
  'devtools.html',
  function (panel) {
    const app = document.getElementById('app');
    app.appendChild(panel);
  }
);
