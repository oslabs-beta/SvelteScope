// console.log('hello from content script!');

// chrome.runtime.sendMessage(null, 'landed on localhost!', (response) => {
//   console.log('im from the send response function: ', response);
// });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log(message);
//   console.log(sender);
// });

chrome.runtime.sendMessage(null, 'readScripts', (response) => {
  console.log('logging from contentScript sendMessage');
  
});
