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
  let currentData: any;

  export let id: number;
  export let readonly = false;
  export let currentProps: any;

  //----------------------------------------------------------------------
  //CURRENT TAB
  CurrentTabStore.subscribe((currTab) => {
    currentTab = +currTab.currentTab;
    console.log("currentTab from Editor: ", currentTab);
  });

  RootComponentStore.subscribe((data) => {
    currentData = data;
  });

  SelectedNodeAttributes.subscribe((data: any) => {
    currentData = data;
    id = data.id;
    console.log("editor data: ", currentData);
    console.log("editor id: ", id);
  });

  // CURRENT SNAPSHOT

  // const snapshotClick = () => {
  //   SnapshotStore.subscribe((data: any) => {
  //     console.log("SnapshotStore from Editor is running");
  //     snapshot = data;
  //     console.log("snapshot from store: ", snapshot);
  //     console.log("currentSnapshot: ", snapshot[currentTab]);
  //     for (let key in snapshot[currentTab]) {
  //       let key_inject_state = key;
  //       // console.log('key_inject_state: ', typeof key_inject_state, key_inject_state)
  //       let value_inject_state = snapshot[currentTab][key].value;
  //       // console.log('value_inject_state: ', typeof value_inject_state, value_inject_state)
  //       let id_inject_state = snapshot[currentTab][key].id;
  //       // console.log('id_inject_state: ', typeof id_inject_state, id_inject_state)

  //       chrome.devtools.inspectedWindow.eval(
  //         `__svelte_devtools_inject_state(${id_inject_state}, '${key_inject_state}', ${value_inject_state})`,
  //         (_, error) => {
  //           errors[key] =
  //             error && error.isException
  //               ? error.value.substring(0, error.value.indexOf("\n"))
  //               : undefined;
  //         }
  //       );
  //     }
  //   });
  // };
  //----------------------------------------------------------------------
</script>

<main>
  <!-- <button on:click={snapshotClick}>Snapshot</button> -->

  <!-- //TYPE: COMPONENT----------------------------------------------------------- -->
  {#if currentData && currentData.type === "component"}
    <h2>Props - currentProp.detail.attributes</h2>
    <Props id={currentData.id} currentProps={currentData.detail.attributes} />
    <hr />

    <h2>Events</h2>
    <hr />

    <h2>State - currentProp.detail.ctx</h2>
    <Props id={currentData.id} currentProps={currentData.detail.ctx} />

    <!-- //TYPE: BLOCK AND ITERATION----------------------------------------------------------- -->
  {:else if (currentData && currentData.type === "block") || (currentData && currentData.type === "iteration")}
    <h2>State</h2>
    <Props
      readonly
      id={currentData.id}
      currentProps={currentData.detail.attributes}
    />

    <!-- //TYPE: ELEMENT----------------------------------------------------------- -->
  {:else if currentData && currentData.type === "element"}
    <h2>Attributes</h2>
    <Props
      readonly
      id={currentData.id}
      currentProps={currentData.detail.attributes}
    />

    <h2>Events</h2>
    <!-- <Props id={currentProp.id} currentProps={events} /> -->
  {/if}
</main>
