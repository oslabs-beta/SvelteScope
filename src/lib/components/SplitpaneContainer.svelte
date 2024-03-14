<script lang="ts">
  import { Splitpanes, Pane } from 'svelte-splitpanes';
  import Editor from './Editor.svelte';
</script>

<Splitpanes style="height: 100%">
  <Pane size={50} minSize={20}>
    <div class="panel">
      <p>hello world!</p>
    </div>
  </Pane>
  <Pane size={50} minSize={20}>
    <div class="panel">
      <Editor />
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
</style>
