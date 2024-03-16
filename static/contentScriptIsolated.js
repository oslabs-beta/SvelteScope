console.log('hello from content script isolated!');

window.addEventListener('message', async (msg) => {
  // console.log('msg.data.type: ', msg.data.type);
  if (msg.data.message === 'getRootComponent') {
    console.log('getRootNode message found');
  }
//   console.log('logging message from content script isolated: ', msg);
});

// Listens for a message from the dev tools panel and forwards it to  main contentScript
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('logging request message: ', request.message);

  switch (request.message) {
    case 'getRootComponent':
    case 'handleClosedPanel':
      window.postMessage({
        type: request.message,
        source: 'contentScriptIsolated.js',
      });
      break;
  }
});
