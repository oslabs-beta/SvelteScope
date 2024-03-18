console.log('hello from background.js!');

chrome.runtime.onMessage.addListener((request) => {
  chrome.runtime.sendMessage({ message: 'handleClosedPanel' });
});

 // register content scripts here bc we're using Rollup so that we console.log at the TOP level 


