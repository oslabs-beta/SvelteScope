chrome.devtools.panels.create(
  'Svelte Component Explorer',
  'icons/tuner.png',
  'index.html'
);

// create connection to the background page
// var backgroundPageConnection = chrome.runtime.connect({
//   name: 'devtools'
// });

// backgroundPageConnection.onMessage.addListener(function(message) {
//   console.log('hello from background page connection listener devtools.js');
// });

// backgroundPageConnection.postMessage({
//   tabId: chrome.devtools.inspectedWindow.tabId,
//   scriptToInject: "contentScript.js"
// });
