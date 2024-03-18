<script lang="ts">
  import { Splitpanes, Pane } from 'svelte-splitpanes';
  // import SnapShot from './SnapShot.svelte';
  import Tree from './Tree.svelte';
  import Tabs from '../containers/Tabs.svelte';
</script>

<Splitpanes style="height: 100%">
  <Pane size={50} minSize={20}>
    <!-- <SnapShot /> -->
    <div class="panel">
      <Tree />
      <!-- <p>tree</p> -->
    </div>
  </Pane>

  <Pane size={50} minSize={20}>
    <div class="tabsPanel">
      <Tabs />
      <!-- <p>tabs panel</p> -->
    </div>
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

  .tabsPanel {
    height: 100vh;
    display: flex;
    flex-direction: column;
    color: black;
  }
</style>
