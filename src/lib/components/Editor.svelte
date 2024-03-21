<script lang="ts">
  import { onMount } from "svelte";
  // import custom_rootData_Editor from "../../stores/store-editor";
  import { selectedNodeAttributes } from '../../stores/Store';
  import Props from "./Editor/Props.svelte";
  //-----------------------------------------------------------------------------------
  let currentData: any;
  export let id: number;
  export let readonly = false;
  const errors: Record<string, string | undefined> = {};

  //-----------------------------------------------------------------------------------
  onMount(() => {
    // const unsubscribe = custom_rootData_Editor.subcribe_rootData_Editor(
    //   (data: any) => {
    //     currentData = data;
    //     console.log('Data from rootData_Editor: ', currentData);
    //     id = currentData.id;
    //   }
    // );
    // return unsubscribe; // Cleanup subscription when component unmounts

    const unsubscribe = selectedNodeAttributes.subscribe((data: any) => {
      currentData = data;
      console.log("Data from selectedNodeAttributes: ", currentData);
      id = currentData.id;
    });
    return unsubscribe;
  });
</script>

<main>
  <!-- //TYPE: COMPONENT----------------------------------------------------------- -->
  {#if currentData && currentData.type === "component"}
    <h2>Props - currentData.detail.attributes</h2>
    <Props id={currentData.id} currentProps={currentData.detail.attributes} />
    <hr />

    <h2>Events</h2>
    <hr />

    <h2>State - currentData.detail.ctx</h2>
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
    <!-- <Props id={currentData.id} currentProps={events} /> -->
  {/if}
</main>
