<script lang="ts">
  import SplitpaneContainer from '../lib/components/SplitpaneContainer.svelte';
  import { onMount } from 'svelte';
  import * as store from '../stores/Store.js';
  import rootData_Editor from '../stores/store-editor';

  let rootComponent: any;
  let svelteVersion: any;

  store.RootComponentStore.subscribe((data) => {
    rootComponent = data;
  });

  rootData_Editor.subcribe_rootData_Editor((data: any) => {
    rootComponent = data;
  });

  store.SvelteVersionStore.subscribe((data) => {
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
      store.SvelteVersionStore.update((currentData) => {
        return svelteVersion;
      });
    }

    if (message.type === 'updateRootComponent') {
      rootComponent = message.rootComponent;
      if (rootComponent) {
        store.RootComponentStore.update((currentData) => {
          return rootComponent;
        });
        // rootData_Editor.set_rootData_Editor(rootComponent)
        rootData_Editor.set_rootData_Editor({
          hello: 'change HI',
          ...rootComponent,
        });
        // createAndSaveNewSnapshot(rootComponent);
      }
    } else if (message.type === 'returnRootComponent') {
      rootComponent = message.rootComponent;

      if (rootComponent) {
        store.RootComponentStore.update((currentData) => {
          return rootComponent;
        });
        rootData_Editor.set_rootData_Editor({
          hello: 'hello there',
          ...rootComponent,
        });
      }
    } else if (message.type === 'returnTempRoot') {
      const tempRoot = message.rootComponent;
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
