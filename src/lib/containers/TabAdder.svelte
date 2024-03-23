<script>
  import SingleTab from './SingleTab.svelte';
  import { SelectedNodeAttributes } from '../../stores/Store';

  /**
   * @type {any}
   */
  export let items = {};
  export let activeTabValue = 1;
  let index = 2;


  const handleClick = (/** @type {number} */ tabValue) => () =>
    (activeTabValue = tabValue);

  const addTab = (/** @type {number} */ tabValue) => () => {
    const tab = `Snapshot${index}`;
    items[tab] = {
      value: index,
      component: SingleTab,
    };
    activeTabValue = index;
    items = items;
    index++;
  };

  const removeTab = (/** @type {string} */ tabValue) => () => {
    delete items[tabValue];
    items = items;
  };


</script>

<h1>Sveltune</h1>



<ul>
  {#each Object.entries(items) as [key, value]}
    <li class={activeTabValue === value.value ? 'active' : ''}>
      <span on:click={handleClick(value.value)}>{key}</span>
    </li>
  {/each}
  <span class="button" on:click={addTab()}>+</span>
</ul>

{#each Object.entries(items) as [key, value]}
  {#if activeTabValue == value.value}
    <div class="box">
      <div class="delete-button-container">
        <button id="delete" on:click={removeTab(key)}>✖️</button>
      </div>
      <svelte:component this={value.component} />
    </div>
  {/if}
{/each}

<style>
  .delete-button-container {
    display: flex;
    justify-content: flex-end;
  }

  h1 {
    font-size: 24px;
    font-weight: 300;
    margin: 0px;
    padding: 20px 10px;
    background-color: #dee2e6;
  }


  .box {
    padding: 15px;
    border: solid white;
    border-radius: 0 0 0.5rem 0.5rem;
    border-top: 5px;
    overflow: scroll;
    height: 100%;
  }

  ul,
  li,
  span {
    font-weight: 500;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      'Open Sans',
      'Helvetica Neue',
      sans-serif;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    margin-top: 0;
    list-style: none;
    border-bottom: 1px solid #dee2e6;
    background-color: #dee2e6;
  }

  li {
    margin-bottom: -1px;
    color: #495057;
  }

  span {
    border: 1px solid transparent;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    display: block;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: 0.25s ease-in;
    font-weight: 400;
  }

  span:hover {
    border-color: #e9ecef #e9ecef #dee2e6;
    background-color: orangered;
    color: black;
  }

  .button {
    background-color: black;
    color: white;
    font-weight: 400;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      'Open Sans',
      'Helvetica Neue',
      sans-serif;
  }

  #delete {
    background-color: rgba(0, 0, 0, 0);
    font-size: 16px;
    border: 2px solid rgba(255, 68, 0, 0);
    text-align: center;
    color: black;
    background-color: none;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* transition: 0.25s ease-in; */
  }

  /* #delete:hover { */
  /* background-color: orangered; */
  /* border: 2px solid orangered; */
  /* color: black; */
  /* } */

  li.active > span {
    color: black;
    background-color: orange;
    border-color: #dee2e6 #dee2e6 #fff;
  }
</style>
