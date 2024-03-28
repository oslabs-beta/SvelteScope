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



