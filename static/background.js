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


