// empty for now, this is the bridge between the browser and our dev tools application
// console.log('background.js is running');

// chrome.runtime.onInstalled.addListener((details) => {
//   console.log('details: ', details);
// });

// chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
//   console.log(msg, sender, sendResponse);
//   sendResponse('im from the background script');
//   chrome.tabs.sendMessage(sender.tab.id, 'got your message from background!');
// });

chrome.runtime.onMessage.addListener('readScripts', (details) => {
  console.log('logging details from readScript message: ', details);
});

console.log('background script running');

chrome.scripting.registerContentScripts([
  {
    id: 'inpage',
    matches: ['http://*/*', 'https://*/*'],
    js: ['contentScript.js'],
    runAt: 'document_start',
    world: 'MAIN',
  },
]);

// chrome.scripting
//   .registerContentScripts([
//     {
//       id: "session-script",
//       js: ["contentScript.js"],
//       persistAcrossSessions: false,
//       matches: ["*://www.google.com/*"],
//       runAt: "document_start",
//       world: "MAIN", // this fails
//     },
//   ])
//   .then(() => console.log("registration complete"))
//   .catch((err) => console.warn("unexpected error", err));



// chrome.scripting.registerContentScripts([
//   {
//     id: 'XMLOverride',
//     js: ['src/content/XMLOverride.js'],
//     matches: ['https://*.example.com/*'],
//     runAt: 'document_start',
//     world: 'MAIN',
//   },
// ]);


// chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//   chrome.tabs.executeScript(tabs[0].id, { file: 'contentScript.js' });
// });


// chrome.action.onClicked.addListener(async (tab) => {
//   try {
//     await chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       files: ['contentScript.js'],
//     });
//   } catch (err) {
//     console.error('Failed to inject content script:', err);
//   }
// });

// chrome.action.onClicked.addListener(async (tab) => {
//   try {
//     await chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       files: ['contentScript.js'],
//     });

//     await chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       world: 'MAIN',
//       func: executeInMainWorld,
//     });
//   } catch (err) {
//     console.error('Failed to inject content script:', err);
//   }
// });
//# sourceMappingURL=background.js.map
