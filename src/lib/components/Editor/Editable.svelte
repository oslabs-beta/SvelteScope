<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let type: 'string' | 'number' | 'null';
  export let value: any;
  export let readonly: boolean;

  const dispatch = createEventDispatcher();
  let editing = false;
</script>

{#if editing}
  <input
    value={JSON.stringify(value)}
    on:blur={({ target }) => {
      editing = false;
      // @ts-expect-error - target and value exists
      const updated = target.value;
      value = JSON.parse(updated);
      dispatch('change', updated);
    }}
    on:keydown={({ key, target }) => {
      if (key !== 'Enter') return;
      editing = false;
      // @ts-expect-error - target and value exists
      const updated = target.value;
      value = JSON.parse(updated);
      dispatch('change', updated);
    }}
  />
{:else}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <span class:readonly class={type} on:click={() => (editing = !readonly)}>
    {JSON.stringify(value)}
  </span>
{/if}

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

  span,
  input {
    flex-grow: 1;
  }

  input {
    padding: 0.15rem 0.375rem;
    border: none;
    border-radius: inherit;
    font-size: inherit;
  }

  span:not(.readonly) {
    cursor: pointer;
  }
  span.string {
    color: rgb(67, 130, 237);
  }
  span.number {
    color: rgb(67, 130, 237);
  }
  span.null {
    color: rgb(67, 130, 237);
  }

  :global(.dark) span.string {
    color: rgb(255, 125, 233);
  }
</style>
