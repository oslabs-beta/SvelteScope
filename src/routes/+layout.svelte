<script lang="ts">
  import SplitpaneContainer from "../lib/components/SplitpaneContainer.svelte";
  import { onMount } from "svelte";
  import {
    RootComponentStore,
    SvelteVersionStore,
  } from "../stores/Store.js";

  let rootComponent: any;
  let svelteVersion: any;

  
  RootComponentStore.subscribe((data) => {
    rootComponent = data;
  });

  SvelteVersionStore.subscribe((data) => {
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
        chrome.tabs.sendMessage(tab.id, { message: "getRootComponent" });
        chrome.tabs.sendMessage(tab.id, { message: "getSvelteVersion" });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Message listener function
  function messageListener(message: any) {
    if (message.type === "returnSvelteVersion") {
      svelteVersion = message.svelteVersion;
      SvelteVersionStore.update((currentData) => {
        return svelteVersion;
      });
    }

    if (message.type === "updateRootComponent") {
      rootComponent = message.rootComponent;
      if (rootComponent) {
        RootComponentStore.update((currentData) => {
          return rootComponent;
        });
      }
    } else if (message.type === "returnRootComponent") {
      rootComponent = message.rootComponent;

      if (rootComponent) {
        RootComponentStore.update((currentData) => {
          return rootComponent;
        });
      }
    } else if (message.type === "returnTempRoot") {
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
