import { getSvelteVersion, getRootNodes } from 'svelte-listener';

console.log('hello from content script!');

let pageLoaded = false;
window.addEventListener('load', (event) => {
  pageLoaded = true;
  console.log(event);
});

chrome.tabs.query(
  {
    active: true,
    currentWindow: true,
  },
  function (tabs) {
    console.log(tabs);
    let activeTab = tabs[0];
    console.log('active tab: ', activeTab.id);
    chrome.tabs.sendMessage(activeTab.id, { message: 'myMessage' }, () => {
      const version = getSvelteVersion();
      const rootNodes = getRootNodes();
      console.log('version: ', version);
      console.log('root nodes: ', rootNodes);
    });
  }
);
