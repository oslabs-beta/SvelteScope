<script lang="ts">
  import { onMount } from 'svelte';
  import custom_rootData_Editor from '../../stores/store-editor';

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
  //-----------------------------------------------------------------------------------

  //   function onChangeHandler(e, key){
  //     const newVal = e.target.value;

  //     // Update the value for the specific key
  //     custom_rootData_Editor.update_rootData_Editor((data: any) => {
  //         // Iterate over the ctx array to find the correct key and update its value
  //         const updatedCtx = data.detail.ctx.map(ctx => {
  //             if (Array.isArray(ctx.value)) {
  //                 ctx.value = ctx.value.map(val => {
  //                     // Check if the key matches the current key being updated
  //                     if (val[key] !== undefined) {
  //                         // Update the value for the current key
  //                         return { ...val, [key]: newVal };
  //                     } else {
  //                         return val;
  //                     }
  //                 });
  //             }
  //             return ctx;
  //         });

  //         // Update the data with the modified ctx array
  //         return { ...data, detail: { ...data.detail, ctx: updatedCtx } };
  //     });
  // }

  // function onChangeHandler(e, ctxKey, key) {
  //   const newVal = e.target.value;

  //   // Update the value for the specific key
  //   custom_rootData_Editor.update_rootData_Editor((data: any) => {
  //     // Iterate over the ctx array to find the correct key and update its value
  //     const updatedCtx = data.detail.ctx.map((ctx) => {
  //       if (ctx.key === ctxKey && Array.isArray(ctx.value)) {
  //         ctx.value = ctx.value.map((val) => {
  //           // Check if the key matches the current key being updated
  //           if (val[key] !== undefined) {
  //             // Update the value for the current key
  //             return { ...val, [key]: newVal };
  //           } else {
  //             return val;
  //           }
  //         });
  //       }
  //       return ctx;
  //     });

  //     // Update the data with the modified ctx array
  //     return { ...data, detail: { ...data.detail, ctx: updatedCtx } };
  //   });
  // }

  onMount(() => {
    const unsubscribe = custom_rootData_Editor.subcribe_rootData_Editor(
      (data: any) => {
        currentData = data;
        console.log('Data from rootData_Editor: ', currentData);
        id = currentData.id;
      }
    );
    return unsubscribe; // Cleanup subscription when component unmounts
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
          <!-- <p><span style="color: red">{key}:</span> {value}</p>
          <div>
            <label for={key}>{key}</label>
            <input type="text" id={key} on:input={onChangeHandler}/>
            
          </div> -->
        {/each}
        <!-- {#each Object.entries(val) as [key, value] (key)}
          <div>
            <label for={key}>{key}</label>
            <input
              type="text"
              id={key}
              {value}
              on:input={(e) => onChangeHandler(e, key)}
            />
          </div>
        {/each} -->

        <!-- 
        {#each Object.entries(val) as [key, value]}
          <div>
            <label for={ctx.key + "-" + key}>{key}</label>
            <input
              type="text"
              id={ctx.key + "-" + key}
              {value}
              on:input={(e) => onChangeHandler(e, ctx.key, key)
              }
            />
          </div>
        {/each} -->
      {/each}
    {/if}
  {/each}
{/if}

<!-- {#each entries as { key, value } (key)}
  <Expandable
    {readonly}
    {key}
    {value}
    error={errors[key]}
    on:change={(e) => change(key, e.detail)}
  />
{/each} -->
