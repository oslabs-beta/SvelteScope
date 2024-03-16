console.log('hello from background.js!');

chrome.runtime.onMessage.addListener((request) => {
  chrome.runtime.sendMessage({ message: 'handleClosedPanel' });
});

// chrome.tabs.onUpdated.addListener((tabId, tab) => {
//   console.log('tab: ', tab, tabId);

//   chrome.tabs.sendMessage(
//     tabId,
//     {
//       type: 'NEW',
//       tabId: tabId,
//     },
//     () => {
//       console.log('message sent!');
//     }
//   );
// });

// chrome.tabs.query(
//   {
//     active: true,
//     currentWindow: true,
//   },
//   function (tabs) {
//     let activeTab = tabs[0];
//     console.log('active tab: ', activeTab.id);
//     chrome.tabs.sendMessage(activeTab.id, { message: 'myMessage' }, () => {
//       console.log('message sent!');
//     });
//   }
// );

// chrome.runtime.sendMessage({
//   extensionId: 'kjodjbnochikcdomnmpmpooodienlhcn',
//   message: 'myMessage',
//   callback: () => {
//     console.log('message sent from background.js');
//   },
// });

// chrome.runtime.onConnect.addListener(function (devToolsConnection) {
//   const devToolsListener = function (message, sender, sendResponse) {
//     chrome.scripting.executeScript({
//       target: { tabId: message.tabId },
//       files: [message.scriptToInject],
//     });
//   };

//   devToolsConnection.onMessage.addListener(devToolsConnection);
//   // devToolsConnection.onDisconnect.addListener(function () {
//   //   devToolsConnection.onMessage.removeListener(devToolsListener);
//   // });
// });

// chrome.devtools.onShown.addListener((panel) => {
//   console.log('hello from background listener');
//   panel.onShown.addListener(() => {
//     const evaluateButton = document.querySelector('#evaluate-script');

//     evaluateButton.addEventListener('click', () => {
//       console.log('button clicked!');
//     });
//   });
//   // const evaluateButton = document.querySelectorAll('#evaluate-script');
//   // evaluateButton.addEventListener('click', () => {
//   //   console.log('hello from line 7 bg.js');
//     // const scriptToInject = `console.log('hello from bakground.js event listener!')`;

//     // const tab = await chrome.tabs.query({
//     //   active: true,
//     //   currentWindow: true,
//     // });

//     // console.log('logging tab: ', tab);
//     // const tabId = tab[0].id;
//     // chrome.tabs.sendMessage(tabId, { scriptToInject });
//   // });
// });
