<script lang="ts">
  import SplitpaneContainer from '../lib/components/SplitpaneContainer.svelte';
  import { onMount, onDestroy } from 'svelte';

    // Function to set up the panel
  async function setUpPanel() {
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });

      if (tab && tab.id !== undefined) {
        chrome.tabs.sendMessage(tab.id, { message: "getRootComponent" });
        console.log("tab.id", tab.id);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Message listener function
  function messageListener(message) {
    console.log("message: ", message);

    if (message.type === "updateRootComponent") {
      const rootComponent = message.rootComponent;
      if (rootComponent) {
        // createAndSaveNewSnapshot(rootComponent);
        console.log("hi1");
      }
    } else if (message.type === "returnRootComponent") {
      const rootComponent = message.rootComponent;
      console.log("rootComponent - message", message);
      if (rootComponent) {
        // createAndSaveNewSnapshot(rootComponent);
        console.log("hi2");
      } else {
        // setUnableToGetComponentData(true);
        console.log("hi3");
      }
    } else if (message.type === "returnTempRoot") {
      const tempRoot = message.rootComponent;
      // set the tempRoot as the current snapshot without saving it
      // dispatch({
      //   type: 'currentSnapshot/setCurrentSnapshot',
      //   payload: {
      //     rootComponent: tempRoot,
      //   },
      // });
      console.log("tempRoot", tempRoot);
    }
  }

  // Set up message listener and panel on mount
  onMount(() => {
    console.log("onMount is runnning");
    chrome.runtime.onMessage.addListener(messageListener);
    setUpPanel();
    // chrome.runtime.onMessage.addListener(messageListener);

    // Clean up listener on component destruction
    // onDestroy(() => {
    //   chrome.runtime.onMessage.removeListener(messageListener);
    // });
  });

</script>

<main>
  <SplitpaneContainer />
</main>
