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


