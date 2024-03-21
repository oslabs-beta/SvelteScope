<script lang="ts">
  import SplitpaneContainer from '../lib/components/SplitpaneContainer.svelte';
  import { onMount } from 'svelte';
  import {
    // custom_rootData_Editor,
    RootComponentStore,
    SvelteVersionStore,
  } from '../stores/Store.js';
  import items from '../lib/containers/TabAdder.svelte';

  let rootComponent: any;
  let svelteVersion: any;

  RootComponentStore.subscribe((data) => {
    rootComponent = data;
  });

  // custom_rootData_Editor.subcribe_rootData_Editor((data: any) => {
  //   rootComponent = data;
  // });

  SvelteVersionStore.subscribe((data) => {
    console.log('logging svelte version: ', data);
    svelteVersion = data;
  });

  // Function to set up the panel
  async function setUpPanel() {
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });

      if (tab && tab.id !== undefined) {
        chrome.tabs.sendMessage(tab.id, { message: 'getRootComponent' });
        chrome.tabs.sendMessage(tab.id, { message: 'getSvelteVersion' });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Message listener function
  function messageListener(message: any) {
    if (message.type === 'returnSvelteVersion') {
      svelteVersion = message.svelteVersion;
      SvelteVersionStore.update((currentData) => {
        return svelteVersion;
      });
    }

    if (message.type === 'updateRootComponent') {
      rootComponent = message.rootComponent;
      if (rootComponent) {
        RootComponentStore.update((currentData) => {
          return rootComponent;
        });
        // rootData_Editor.set_rootData_Editor(rootComponent)
        // custom_rootData_Editor.set_rootData_Editor({
        //   hello: 'change HI',
        //   ...rootComponent,
        // });
        // createAndSaveNewSnapshot(rootComponent);
      }
    } else if (message.type === 'returnRootComponent') {
      rootComponent = message.rootComponent;

      if (rootComponent) {
        RootComponentStore.update((currentData) => {
          return rootComponent;
        });
        // custom_rootData_Editor.set_rootData_Editor({
        //   hello: 'hello there',
        //   ...rootComponent,
        // });
      }
    } else if (message.type === 'returnTempRoot') {
      const tempRoot = message.rootComponent;
    } else if (message.type === 'handleBrowserRefresh') {
      RootComponentStore.set({});
      SvelteVersionStore.set(null);
      setUpPanel();
    }
  }

  // Set up message listener and panel on mount
  onMount(() => {
    chrome.runtime.onMessage.addListener(messageListener);
    setUpPanel();
  });
</script>

<main>
  <SplitpaneContainer />
</main>
