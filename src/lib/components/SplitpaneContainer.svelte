<script lang="ts">
  import { Splitpanes, Pane } from 'svelte-splitpanes';
  // import SnapShot from './SnapShot.svelte';
  import Editor from './Editor.svelte';
  // import Tree from './Tree.svelte';
  // import Tabs from '../containers/Tabs.svelte';
  // import Editor from './Editor.svelte';
</script>

<Splitpanes style="height: 100%">

  <Pane size={50} minSize={20}>
    <div class="panel">
      <p>left</p>
      <!-- <Tree /> -->
    </div>
  </Pane>

  <Pane size={50} minSize={20}>
    <div class="panel">
      <!-- <Tabs/> -->
      <Editor />
    </div>
    <!-- <SnapShot /> -->
  </Pane>
</Splitpanes>

<style>
  .panel {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  /* .pane2 {
    height: 100vh;
    display: flex;
    flex-direction: column;
    color: black;
  } */
</style>
