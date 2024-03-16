<script>
  import { onMount, onDestroy } from 'svelte';

  // Function to set up the panel
  async function setUpPanel() {
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });

      // alert(`tabid: ${tab.id}`)
      if (tab && tab.id !== undefined) {
        chrome.tabs.sendMessage(tab.id, { message: 'getRootComponent' });
        console.log(tab.id)
      }
    } catch (err) {
      console.log(err);
    }
  }

  // onMount(()=>{
  //   setUpPanel()
  // })

  // Message listener function
  function messageListener(message) {
    if (message.type === 'updateRootComponent') {
      const rootComponent = message.rootComponent;
      if (rootComponent) {
        // createAndSaveNewSnapshot(rootComponent);
        console.log('hi')
      }
    } else if (message.type === 'returnRootComponent') {
      const rootComponent = message.rootComponent;
      if (rootComponent) {
        // createAndSaveNewSnapshot(rootComponent);
        console.log('hi')
      } else {
        // setUnableToGetComponentData(true);
        console.log('hi')
      }
    } else if (message.type === 'returnTempRoot') {
      const tempRoot = message.rootComponent;
      // set the tempRoot as the current snapshot without saving it
      // dispatch({
      //   type: 'currentSnapshot/setCurrentSnapshot',
      //   payload: {
      //     rootComponent: tempRoot,
      //   },
      // });
      console.log(tempRoot)
    }
  }

  // Set up message listener and panel on mount
  onMount(() => {
    chrome.runtime.onMessage.addListener(messageListener);
    setUpPanel();
    messageListener();
    
    // Clean up listener on component destruction
    onDestroy(() => {
      chrome.runtime.onMessage.removeListener(messageListener);
    });
  });


</script>




<h1>Hello World 1</h1>

