import { getSvelteVersion, getRootNodes } from 'svelte-listener';

// console.log('hello from content script!');

// let isPageLoaded = false;
// window.addEventListener('load', (event) => {
//   isPageLoaded = true;
//   console.log('page is loaded: ', isPageLoaded);
// });

let readyForUpdates = false;
window.addEventListener('message', async (msg) => {
  switch (msg.data.type) {
    case 'getRootComponent':
      console.log('getRootComponent message received');
      readyForUpdates = true;
      sendRootNodeToExtension('returnRootComponent');
      break;
    case 'handleClosedPanel':
      readyForUpdates = false;
      break;
  }
});

// Get component tree using Svelte listener and sent to dev tool panel!
function sendRootNodeToExtension(message) {
  // console.log('send root node to extension hit!');

  if (
    message !== 'updateRootComponent' &&
    message !== 'returnRootComponent' &&
    message !== 'returnTempRoot'
  ) {
    console.log(
      'You need a valid messageType in sendRootNodeToExtension() in ContentScriptMain/index.js'
    );
    return;
  }


  const rootNodes = getRootNodes();
  // console.log('logging root nodes from content script main: ', svelteVersion);
  console.log('logging root nodes: ', rootNodes);
}

// chrome.runtime.onMessage.addListener((obj, sender, response) => {
//   const { type, tabId } = obj;
//   console.log('type: ', type);

//   if (type === 'NEW') {
//     const svelteVersion = getSvelteVersion();
//     console.log('svelte version: ', svelteVersion);
//   }
// });

// let pageLoaded = false;
// window.addEventListener('load', (event) => {
//   pageLoaded = true;
//   console.log(event);
// });

// chrome.tabs.query(
//   {
//     active: true,
//     currentWindow: true,
//   },
//   function (tabs) {
//     console.log(tabs);
//     let activeTab = tabs[0];
//     console.log('active tab: ', activeTab.id);
//     chrome.tabs.sendMessage(activeTab.id, { message: 'myMessage' }, () => {
//       const version = getSvelteVersion();
//       const rootNodes = getRootNodes();
//       console.log('version: ', version);
//       console.log('root nodes: ', rootNodes);
//     });
//   }
// );
