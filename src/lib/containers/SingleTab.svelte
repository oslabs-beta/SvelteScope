<script lang="ts">
  import { onMount } from "svelte";
  import Editor from "../components/Editor.svelte";
  import {
    // DefaultRootComponentStore,
    CurrentTabStore,
    SelectedNodeAttributes,
    RootComponentStore

  } from "../../stores/Store";

  let currentTab: number;
  // let defaultData: any;
  let currentData: any;

  // export let currentProps: any = [];
  // export let currentData: any;
  export let id: number;
  export let readonly = false;
  export let currentData2:any; 
  

  //------------------------------------------------------------------------------
  //CURRENT DATA

  // onMount(() => {
  //   const unsubscribe = RootComponentStore.subscribe((data: any) => {
  //     currentData = data;
  //     console.log("currentData from SingleTab: ", currentData);
  //     id = currentData.id;
  //   });
  //   return unsubscribe;
  // });

  // onMount(() => {
  //   const unsubscribe = RootComponentStore.subscribe((data: any) => {
  //     currentData = data;
  //     // console.log("RootComponentStore, currentData from SingleTab: ", currentData);
  //     id = currentData.id;
  //   });
  //   return unsubscribe;
  // });
  

  // CURRENT TAB
  onMount(() => {
    const unsubscribe = CurrentTabStore.subscribe((data: any) => {
      currentTab = data.currentTab;
      // console.log("currentTab from store: ", currentTab);
    });
    return unsubscribe;
  });

  SelectedNodeAttributes.subscribe((data: any) => {
    currentData = data;
    id = data.id;
    console.log('SelectedNodeAttributes.subscribe is running from <SingleTab />')
    console.log("SelectedNodeAttributes, currentData: ", currentData);
    if (Object.keys(currentData).length === 0) {
      RootComponentStore.subscribe((data) => {
        currentData = data;
        console.log("RootComponentStore, currentData: ", data);
      });
    }
  });
  //------------------------------------------------------------------------------
</script>

<main>
  <!-- //TYPE: COMPONENT----------------------------------------------------------- -->
  {#if currentData}
    <h2>EDITOR {currentTab}</h2>
    <Editor currentData2={currentData} id={currentData.id} {readonly} />
    <hr />
  {/if}
</main>
