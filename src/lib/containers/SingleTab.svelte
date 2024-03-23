<script lang="ts">
  import { onMount } from "svelte";
  import Editor from "../components/Editor.svelte";
  import {
    DefaultRootComponentStore,
    CurrentTabStore,
    selectedNodeAttributes,

    RootComponentStore

  } from "../../stores/Store";

  let currentTab: number;
  // let defaultData: any;

  // export let currentProps: any = [];
  export let currentData: any;
  export let id: number;
  export let readonly = false;

  //------------------------------------------------------------------------------
  //CURRENT DATA

  onMount(() => {
    const unsubscribe = RootComponentStore.subscribe((data: any) => {
      currentData = data;
      console.log("currentData from SingleTab: ", currentData);
      id = currentData.id;
    });
    return unsubscribe;
  });

  // CURRENT TAB
  onMount(() => {
    const unsubscribe = CurrentTabStore.subscribe((data: any) => {
      currentTab = data.currentTab;
      console.log("currentTab from store: ", currentTab);
    });
    return unsubscribe;
  });

  //------------------------------------------------------------------------------
</script>

<main>
  <!-- //TYPE: COMPONENT----------------------------------------------------------- -->
  {#if currentData}
    <h2>EDITOR {currentTab}</h2>
    <Editor id={currentData.id} {readonly} />
    <hr />
  {/if}
</main>
