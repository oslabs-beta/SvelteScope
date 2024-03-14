window.addEventListener('message', async (msg) => {
  //   if (
  //     typeof msg !== 'object' ||
  //     msg === null ||
  //     msg.data?.source !== 'contentScript.js'
  //   ) {
  //     return;
  //   }

  chrome.runtime.sendMessage({
    type: msg
  })
//   console.log('msg from isolated: ', msg);
});
