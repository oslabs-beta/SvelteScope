<script lang="ts">
  import Props from './Editor/Props.svelte';

  export const id:number = 0;
  export const readonly = false;
  export const currentProps = {};
  export let currentData2: any;
</script>

<main>
  <!-- //TYPE: COMPONENT----------------------------------------------------------- -->
  {#if currentData2 && currentData2.type === 'component'}
    <div class="section">
      <h2>Props</h2>
      <Props
        id={currentData2.id}
        currentProps={currentData2.detail.attributes}
      />
    </div>

    {@const events = currentData2.detail.listeners?.map((l) => {
      const suffix = l.modifiers?.length ? `|${l.modifiers.join('|')}` : '';
      const value = { __is: 'function', source: l.handler };
      return { key: l.event + suffix, value };
    })}
    <div class="section">
      <h2>Events</h2>
      <Props id={currentData2.id} currentProps={events} />
    </div>
    <div class="section">
      <h2>State</h2>
      <Props id={currentData2.id} currentProps={currentData2.detail.ctx} />
    </div>

    <!-- //TYPE: BLOCK AND ITERATION----------------------------------------------------------- -->
  {:else if (currentData2 && currentData2.type === 'block') || (currentData2 && currentData2.type === 'iteration')}
    <div class="section">
      <h2>State</h2>
      <Props
        readonly
        id={currentData2.id}
        currentProps={currentData2.detail.attributes}
      />
    </div>

    <!-- //TYPE: ELEMENT----------------------------------------------------------- -->
  {:else if currentData2 && currentData2.type === 'element'}
    <div class="section">
      <h2>Attributes</h2>
      <Props
        readonly
        id={currentData2.id}
        currentProps={currentData2.detail.attributes}
      />
    </div>

    {@const events = currentData2.detail.listeners?.map((l) => {
      const suffix = l.modifiers?.length ? `|${l.modifiers.join('|')}` : '';
      const value = { __is: 'function', source: l.handler };
      return { key: l.event + suffix, value };
    })}
    <div class="section">
      <h2>Events</h2>
      <Props id={currentData2.id} currentProps={events} />
    </div>
  {/if}
</main>

<style>
  * {
    font-size: 12px;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      'Open Sans',
      'Helvetica Neue',
      sans-serif;
  }

  .section {
    margin-bottom: 20px;
    padding: 10px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .section > h2 {
    margin-top: 0px;
    margin-left: 5px;
  }
</style>
