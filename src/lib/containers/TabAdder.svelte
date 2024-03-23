<script lang="ts">
  import SingleTab from "./SingleTab.svelte";
  import {
    CurrentTabStore,
    DefaultSnapShotStore,
    SnapshotStore,
  } from "../../stores/Store";
  /**
   * @type {any}
   */
  export let items = {};
  export let activeTabValue = 1;
  let index = 2;
  let currentTab: number;
  const errors: Record<string, string | undefined> = {};
  let snapshot: any;

  //-------------------------------------------------------------------------------
  const handleClick = (/** @type {number} */ tabValue) => () => {
    activeTabValue = tabValue;
    console.log("activeTabValue: ", activeTabValue);

    // Update currentTab value
    CurrentTabStore.update((tab) => {
      return { currentTab: activeTabValue };
    });

    DefaultSnapShotStore.subscribe((data: any) => {
      for (let key in data) {
        let key_inject_state = key;
        // console.log('key_inject_state: ', typeof key_inject_state, key_inject_state)
        let value_inject_state = data[key].value;
        // console.log('value_inject_state: ', typeof value_inject_state, value_inject_state)
        let id_inject_state = data[key].id;
        // console.log('id_inject_state: ', typeof id_inject_state, id_inject_state)

        chrome.devtools.inspectedWindow.eval(
          `__svelte_devtools_inject_state(${id_inject_state}, '${key_inject_state}', ${value_inject_state})`,
          (_, error) => {
            errors[key] =
              error && error.isException
                ? error.value.substring(0, error.value.indexOf("\n"))
                : undefined;
          }
        );
      }
    });

    SnapshotStore.subscribe((data: any) => {
      console.log("SnapshotStore from Editor is running");
      snapshot = data;
      console.log("snapshot from store: ", snapshot);
      console.log("currentSnapshot: ", snapshot[currentTab]);
      for (let key in snapshot[currentTab]) {
        let key_inject_state = key;
        // console.log('key_inject_state: ', typeof key_inject_state, key_inject_state)
        let value_inject_state = snapshot[currentTab][key].value;
        // console.log('value_inject_state: ', typeof value_inject_state, value_inject_state)
        let id_inject_state = snapshot[currentTab][key].id;
        // console.log('id_inject_state: ', typeof id_inject_state, id_inject_state)

        chrome.devtools.inspectedWindow.eval(
          `__svelte_devtools_inject_state(${id_inject_state}, '${key_inject_state}', ${value_inject_state})`,
          (_, error) => {
            errors[key] =
              error && error.isException
                ? error.value.substring(0, error.value.indexOf("\n"))
                : undefined;
          }
        );
      }
    });
  };

  //-------------------------------------------------------------------------------
  //CURRENT TAB
  CurrentTabStore.subscribe((currTab) => {
    currentTab = +currTab.currentTab;
  });

  //-------------------------------------------------------------------------------
  const addTab = (/** @type {number} */ tabValue) => () => {
    const tab = `Editor ${index}`;
    items[tab] = {
      value: index,
      component: SingleTab,
    };
    activeTabValue = index;
    items = items;

    // Update currentTab value
    CurrentTabStore.update((tab) => {
      return { currentTab: index };
    });

    DefaultSnapShotStore.subscribe((data: any) => {
      for (let key in data) {
        let key_inject_state = key;
        // console.log('key_inject_state: ', typeof key_inject_state, key_inject_state)
        let value_inject_state = data[key].value;
        // console.log('value_inject_state: ', typeof value_inject_state, value_inject_state)
        let id_inject_state = data[key].id;
        // console.log('id_inject_state: ', typeof id_inject_state, id_inject_state)

        chrome.devtools.inspectedWindow.eval(
          `__svelte_devtools_inject_state(${id_inject_state}, '${key_inject_state}', ${value_inject_state})`,
          (_, error) => {
            errors[key] =
              error && error.isException
                ? error.value.substring(0, error.value.indexOf("\n"))
                : undefined;
          }
        );
      }
    });

    index++;
  };

  //-------------------------------------------------------------------------------
  const removeTab = (/** @type {string} */ tabValue) => () => {
    delete items[tabValue];
    items = items;
  };
</script>

<h1>Sveltune</h1>

<!-- <hr /> -->

<ul>
  {#each Object.entries(items) as [key, value]}
    <li class={activeTabValue === value.value ? "active" : ""}>
      <span on:click={handleClick(value.value)}>{key}</span>
    </li>
  {/each}
  <span class="button" on:click={addTab()}>+</span>
</ul>

{#each Object.entries(items) as [key, value]}
  {#if activeTabValue == value.value}
    <div class="box">
      <button id="delete" on:click={removeTab(key)}>Delete Tab</button>
      <svelte:component this={value.component} />
    </div>
  {/if}
{/each}

<style>
  h1 {
    font-size: 24px;
    font-weight: 300;
    margin: 0px;
    padding: 20px 10px;
    background-color: #dee2e6;
  }

  .box {
    padding: 40px;
    border: solid white;
    border-radius: 0 0 0.5rem 0.5rem;
    border-top: 5px;
    overflow: scroll;
  }

  ul,
  li,
  span {
    font-weight: 500;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      "Open Sans",
      "Helvetica Neue",
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
      "Segoe UI",
      "Open Sans",
      "Helvetica Neue",
      sans-serif;
  }

  #delete {
    background-color: black;
    border: none;
    color: white;
    transition: 0.25s ease-in;
  }

  #delete:hover {
    background-color: orangered;
    color: black;
  }

  li.active > span {
    color: black;
    background-color: orange;
    border-color: #dee2e6 #dee2e6 #fff;
  }
</style>
