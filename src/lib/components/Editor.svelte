<script lang="ts">
  import { onMount } from "svelte";
  import {
    SnapshotStore,
    CurrentTabStore,
    RootComponentStore,
    SelectedNodeAttributes,
  } from "../../stores/Store";
  import Props from "./Editor/Props.svelte";
  //-----------------------------------------------------------------------------------
  let snapshot: any;
  let currentTab: number;
  const errors: Record<string, string | undefined> = {};

  //solve conflits-----------------------------------
  let currentData: any;

  let currentComponent: any;
  //-----------------------------------

  export let id: number;
  export let readonly = false;
  export let currentProps: any;
  export let currentData2: any;

  //   SelectedNodeAttributes.subscribe((data: any) => {
  //     currentData = data;
  //     currentComponent = data.tagName;
  //     id = data.id;
  //     console.log('editor data: ', currentData);
  //     console.log('editor id: ', id);
  //   });

  //   onMount(() => {
  //     // default currentData to root component stores topmost tagName property
  //     // const unsubscribe = SelectedNodeAttributes.subscribe((data: any) => {
  //     //   currentData = data;
  //     //   console.log('Data from SelectedNodeAttributes: ', currentData);
  //     //   id = currentData.id;
  //     // });
  //     // return unsubscribe;
  //   });
</script>

<main>
  <!-- //TYPE: COMPONENT----------------------------------------------------------- -->

  {#if currentData2 && currentData2.type === "component"}
  <h1>{currentData2.tagName} Component</h1> 
  <h2>Props - currentData2.detail.attributes</h2>
    <Props id={currentData2.id} currentProps={currentData2.detail.attributes} />

    <hr />

    <h2>Events</h2>
    <hr />

    <h2>State - currentProp.detail.ctx</h2>
    <Props id={currentData2.id} currentProps={currentData2.detail.ctx} />

  <!-- //TYPE: BLOCK AND ITERATION----------------------------------------------------------- -->
  {:else if (currentData2 && currentData2.type === "block") || (currentData2 && currentData2.type === "iteration")}
    <h2>State</h2>
    <Props
      readonly
      id={currentData2.id}
      currentProps={currentData2.detail.attributes}
    />

    <!-- //TYPE: ELEMENT----------------------------------------------------------- -->
  {:else if currentData2 && currentData2.type === "element"}
    <h2>Attributes</h2>
    <Props
      readonly
      id={currentData2.id}
      currentProps={currentData2.detail.attributes}
    />

    <h2>Events</h2>
    <!-- <Props id={currentProp.id} currentProps={events} /> -->
  {/if}
</main>

<style>
  h1 {
    font-size: 24px;
    color: orangered;
    margin: 0px;
    padding: 20px 10px;

    border-radius: 0.5rem;

    letter-spacing: 1px;
  }
</style>
