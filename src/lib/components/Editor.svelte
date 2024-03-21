<script lang="ts">
  import { onMount } from 'svelte';
  import custom_rootData_Editor from '../../stores/store-editor';
  import { selectedNodeAttributes } from '../../stores/selectedNodeAttributes';

  let currentData: any;
  //-----------------------------------------------------------------------------------
  import Expandable from './Editor/Expandable.svelte';

  // export let entries: Array<{ key: string; value: any }> = [];
  export let id: number;
  export let readonly = false;

  const errors: Record<string, string | undefined> = {};

  function change(key: string, value: any) {
    chrome.devtools.inspectedWindow.eval(
      `__svelte_devtools_inject_state(${id}, '${key}', ${value})`,
      (_, error) => {
        errors[key] =
          error && error.isException
            ? error.value.substring(0, error.value.indexOf('\n'))
            : undefined;
      }
    );
  }

  onMount(() => {
    const unsubscribe = selectedNodeAttributes.subscribe((data: any) => {
      currentData = data;
      id = currentData.id;
    });

    return unsubscribe;
  });
</script>

<h2>detail.attributes</h2>
{#if currentData && currentData.type === 'component'}
  <ul>
    {#each currentData.detail.attributes as { key, value } (key)}
      <Expandable
        {readonly}
        {key}
        {value}
        error={errors[key]}
        on:change={(e) => change(key, e.detail)}
      />
    {/each}
  </ul>
{:else}
  <div style:padding-left="1rem" style:color="rgb(118, 118, 118)">None</div>
{/if}

{#if currentData}
  <h2>Ctx.value - Array</h2>
  {#each currentData.detail.ctx as ctx}
    {#if Array.isArray(ctx.value)}
      <p>Key {ctx.key}</p>
      <hr />
      {#each ctx.value as val}
        <hr />
        {#each Object.entries(val) as [key, value]}
          <Expandable
            {readonly}
            {key}
            {value}
            error={errors[key]}
            on:change={(e) => change(key, e.detail)}
          />
        {/each}
      {/each}
    {/if}
  {/each}
{/if}
