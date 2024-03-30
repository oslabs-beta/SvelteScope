chrome.runtime.onMessage.addListener('readScripts', (details) => {
  console.log('logging details from readScript message: ', details);
});

chrome.scripting.registerContentScripts([
  {
    id: 'inpage',
    matches: ['http://*/*', 'https://*/*'],
    js: ['ContentScripts/contentScript.js'],
    runAt: 'document_start',
    world: 'MAIN',
  },
]);

// Listen for messages from the content script
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.type === 'handleBrowserRefresh') {
//     // Get the current tab ID
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       const tabId = tabs[0].id;

//       // Reinject the content script when the tab is reloaded
//       chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//         if (changeInfo.status === 'complete' && changeInfo.url) {
//           chrome.tabs.executeScript(tabId, { file: 'contentScript.js' });
//           chrome.tabs.onUpdated.removeListener(this);
//         }
//       });
//     });
//   }
// });




//-----------------------------------------------------------------------------
// Import your Svelte store
// import {}

// // Function to generate a unique key for the store version
// function generateKey() {
//     return `store_version_${Date.now()}`;
// }

// // Function to save store version to Chrome storage
// function saveStoreVersionToStorage(key, state) {
//     const serializedState = JSON.stringify(state);
//     chrome.storage.local.set({ [key]: serializedState });
// }

// // Subscribe to changes in the store
// const unsubscribe = myStore.subscribe(newState => {
//     const key = generateKey();
//     saveStoreVersionToStorage(key, newState); // Save the current version of the store to Chrome storage
// });

// // Make sure to unsubscribe from the store when your extension unloads
// chrome.runtime.onSuspend.addListener(() => {
//     unsubscribe();
// });



