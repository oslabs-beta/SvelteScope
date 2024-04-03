/*
  This is the ISOLATED content script! This can communicate with our MAIN content
  script. It can also communicate with the Popup and Panel. So it's kind of like
  the middle man of this Chrome extension
*/

let port = null;
// Listens to messages from ContentScriptMain
// and forwards them to other parts of the extension
window.addEventListener('message', async (msg) => {
  if (
    typeof msg !== 'object' ||
    msg === null ||
    msg.data?.source !== 'contentScript.js'
  ) {
    return;
  }

  switch (msg.data.type) {
    case 'updateRootComponent':
    case 'returnRootComponent':
    case 'returnTempRoot':
      chrome.runtime.sendMessage({
        type: msg.data.type,
        rootComponent: msg.data.rootComponent,
      });
      break;
    case 'returnSvelteVersion':
      chrome.runtime.sendMessage({
        type: msg.data.type,
        svelteVersion: msg.data.svelteVersion,
      });
      break;
    case 'handleBrowserRefresh':
      chrome.runtime.sendMessage({
        type: msg.data.type,
      })
    break;
    default:
      break;
  }
});


// Listens for a message from the Popup and Panel
// Forwards them to ContentScriptMain/index.js

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

  switch (request.message) {
    case 'getRootComponent':
    case 'getSvelteVersion':
    case 'handleClosedPanel':
      window.postMessage({
        type: request.message,
        source: 'contentScriptIsolate.js',
      });
      break;

    case 'injectState':
      window.postMessage({
        type: request.message,
        newState: request.newState,
        componentId: request.componentId,
        source: 'contentScriptIsolate.js',
      });
      break;

    case 'injectSnapshot':
      window.postMessage({
        type: request.message,
        snapshot: request.snapshot,
        source: 'contentScriptIsolate.js',
      });
      break;
  }
});

