<script lang="ts">
  import { Splitpanes, Pane } from 'svelte-splitpanes';
</script>

<Splitpanes style="height: 100%">
  <Pane size={50} minSize={20}>
    <div class="pane">
      <p>hello world!</p>
    </div>
  </Pane>
  <Pane size={50} minSize={20}>
    <div class="pane">
      <p>more edits!</p>
    </div>
  </Pane>
</Splitpanes>

<style>
  .pane {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
