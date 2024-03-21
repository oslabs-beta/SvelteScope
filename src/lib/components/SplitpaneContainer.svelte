<script lang="ts">
  import { Splitpanes, Pane } from "svelte-splitpanes";
  // import SnapShot from './SnapShot.svelte';
  import Tree from "./Tree.svelte";
  import Tabs from "../containers/Tabs.svelte";
  import { SvelteVersionStore } from '../../stores/Store.js';

  let svelteVersion: number;

  SvelteVersionStore.subscribe((data) => {
    console.log('logging svelte version: ', data);
    svelteVersion = data;
  });
</script>

<Splitpanes style="height: 100%">
  <Pane minSize={20}>
    <div class="panel">
      <p>Svelte Version: {svelteVersion}</p>
      <Tree />
    </div>
  </Pane>

  <Pane minSize={20}>
    <div class="tabsPanel">
      <Tabs />
    </div>
  </Pane>
</Splitpanes>

<style>
  .panel {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .tabsPanel {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    color: black;
  }
</style>
