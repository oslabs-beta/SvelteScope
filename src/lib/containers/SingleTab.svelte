<script lang="ts">
  import { onMount } from 'svelte';
  import Editor from '../components/Editor.svelte';
  import {
    CurrentTabStore,
    SelectedNodeAttributes,
    RootComponentStore,
  } from '../../stores/Store';

  let currentTab: number;
  let currentData: any;

  export let id: number;
  export let readonly = false;
  export let currentData2: any;

  //------------------------------------------------------------------------------
  
  onMount(() => {
    const unsubscribe = CurrentTabStore.subscribe((data: any) => {
      currentTab = data.currentTab;
    });
    return unsubscribe;
  });

  SelectedNodeAttributes.subscribe((data: any) => {
    currentData = data;
    id = data.id;
    if (Object.keys(currentData).length === 0) {
      RootComponentStore.subscribe((data) => {
        currentData = data;
        
      });
    }
  });
  //------------------------------------------------------------------------------
</script>

<main>
  <!-- //TYPE: COMPONENT----------------------------------------------------------- -->
  {#if currentData}
    <Editor currentData2={currentData} id={currentData.id} {readonly} />
  {/if}
</main>
