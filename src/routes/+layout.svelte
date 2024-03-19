<script lang="ts">
  import SplitpaneContainer from '../lib/components/SplitpaneContainer.svelte';
  import { onMount } from 'svelte';
  import RootComponentStore from '../stores/Store.js';
  import  rootData_Editor from '../stores/store-editor'

  let rootComponent: any;

  RootComponentStore.subscribe((data) => {
    rootComponent = data;
  });
  rootData_Editor.set_rootData_Editor(rootComponent)

  // Function to set up the panel
  async function setUpPanel() {
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });

      if (tab && tab.id !== undefined) {
        chrome.tabs.sendMessage(tab.id, { message: 'getRootComponent' });
        // console.log('tab.id', tab.id);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Message listener function
  function messageListener(message: any) {
    // console.log('message from messageListener: ', message);

    if (message.type === 'updateRootComponent') {
      rootComponent = message.rootComponent;
      if (rootComponent) {
        RootComponentStore.update((currentData) => {
          return rootComponent;
        });
        rootData_Editor.set_rootData_Editor(rootComponent)
        // createAndSaveNewSnapshot(rootComponent);
      }
    } else if (message.type === 'returnRootComponent') {
      
      rootComponent = message.rootComponent;
      // console.log('rootComponent from messageListener', message);
      
      if (rootComponent) {
        // createAndSaveNewSnapshot(rootComponent);
        RootComponentStore.update((currentData) => {
          return rootComponent;
        });
        rootData_Editor.set_rootData_Editor(rootComponent)
      } else {
        // setUnableToGetComponentData(true);
        // console.log('hi3');
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
      // console.log('tempRoot', tempRoot);
    }
  }

  // Set up message listener and panel on mount
  onMount(() => {
    chrome.runtime.onMessage.addListener(messageListener);
    setUpPanel();
    // console.log('logging root from onmount: ', rootComponent);
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
