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
  let currentComponent:any;
  //-----------------------------------
  
  export let id: number;
  export let readonly = false;
  export let currentProps: any;
  export let currentData2: any;

</script>

<main>

  <!-- //TYPE: COMPONENT----------------------------------------------------------- -->
  {#if currentData2 && currentData2.type === "component"}
  <!-- solve conflits----------------------------------- -->
  <h1>{currentComponent} Component</h1>
  <!-- solve conflits----------------------------------- -->

    <h2>Props - currentProp.detail.attributes</h2>
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
