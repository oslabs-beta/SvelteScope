<script lang="ts">
  import { onMount } from 'svelte';
  import SingleTab from './SingleTab.svelte';
  import {
    CurrentTabStore,
    DefaultSnapShotStore,
    SnapshotStore,
    SelectedNodeAttributes,
    RootComponentStore,
    DefaultRootComponentStore,
  } from '../../stores/Store';

  // /**
  //  * @type {any}
  //  */
  export let items = {};
  export let activeTabValue: number = 1;
  let currentdata: any;
  let root: any;
  let index: number = 2;
  let currentTab: number;
  const errors: Record<string, string | undefined> = {};
  let snapshot: any;
  let defaultRootComponent: any;
  let rootComponent: any;
  let refresh = false;

  //-------------------------------------------------------------------------------
  const handleClick = (tabValue: number) => () => {
    activeTabValue = tabValue;

    // Update currentTab value
    CurrentTabStore.update((tab) => {
      return { currentTab: activeTabValue };
    });

    CurrentTabStore.subscribe((tab) => {
    });

    //Step1: Because we change another tab, we need to make webpage back to original version
    //with  inspectedWindow
    DefaultSnapShotStore.subscribe((data: any) => {
      for (let key in data) {
        let key_inject_state = data[key].key;
        let value_inject_state = data[key].value;
        let id_inject_state = data[key].id;

        if (typeof value_inject_state === 'string') {
          chrome.devtools.inspectedWindow.eval(
            `__svelte_devtools_inject_state(${id_inject_state}, '${key_inject_state}', '${value_inject_state}')`,
            (_, error) => {
              errors[key_inject_state] =
                error && error.isException
                  ? error.value.substring(0, error.value.indexOf('\n'))
                  : undefined;
            }
          );
        } else if (typeof value_inject_state === 'object') {
          chrome.devtools.inspectedWindow.eval(
            `__svelte_devtools_inject_state(${id_inject_state}, '${key_inject_state}', ${JSON.stringify(value_inject_state)})`,
            (_, error) => {
              errors[key_inject_state] =
                error && error.isException
                  ? error.value.substring(0, error.value.indexOf('\n'))
                  : undefined;
            }
          );
        } else {
          chrome.devtools.inspectedWindow.eval(
            `__svelte_devtools_inject_state(${id_inject_state}, '${key_inject_state}', ${value_inject_state})`,
            (_, error) => {
              errors[key_inject_state] =
                error && error.isException
                  ? error.value.substring(0, error.value.indexOf('\n'))
                  : undefined;
            }
          );
        }
      }
    });

    //Step 2: After webpage changes back as original version
    //we continue makes changes for webpage with all changed props staying in Snapshotstore with specific tab
    SnapshotStore.subscribe((data: any) => {
      snapshot = data;

      for (let key in snapshot[currentTab]) {
        let key_inject_state = snapshot[currentTab][key].key;
        let value_inject_state = snapshot[currentTab][key].value;
        let id_inject_state = snapshot[currentTab][key].id;
       

        if (typeof value_inject_state === 'string') {
          chrome.devtools.inspectedWindow.eval(
            `__svelte_devtools_inject_state(${id_inject_state}, '${key_inject_state}', '${value_inject_state}')`,
            (_, error) => {
              errors[key_inject_state] =
                error && error.isException
                  ? error.value.substring(0, error.value.indexOf('\n'))
                  : undefined;
            }
          );
        } else if (typeof value_inject_state === 'object') {
          chrome.devtools.inspectedWindow.eval(
            `__svelte_devtools_inject_state(${id_inject_state}, '${key_inject_state}', ${JSON.stringify(value_inject_state)})`,
            (_, error) => {
              errors[key_inject_state] =
                error && error.isException
                  ? error.value.substring(0, error.value.indexOf('\n'))
                  : undefined;
            }
          );
        } else {
          chrome.devtools.inspectedWindow.eval(
            `__svelte_devtools_inject_state(${id_inject_state}, '${key_inject_state}', ${value_inject_state})`,
            (_, error) => {
              errors[key_inject_state] =
                error && error.isException
                  ? error.value.substring(0, error.value.indexOf('\n'))
                  : undefined;
            }
          );
        }
      }
    });
  };

  //CURRENT TAB FUNCTIONALITY-------------------------------------------------------------------
  CurrentTabStore.subscribe((currTab) => {
    currentTab = +currTab.currentTab;
  });

  //ADD TAB FUNCTION--------------------------------------------------------------------
  const addTab = () => () => {
    const tab: string = `Snapshot ${index}`;
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

    CurrentTabStore.subscribe((tab) => {
    });

    //Subscribe the rootComponent --> DefaultRootComponent
    //because of <Editor /> get rootComponent, we  need to run this function to make changes for webpage
    //with inspectedWindow
    DefaultSnapShotStore.subscribe((data: any) => {
      for (let key in data) {
        let key_inject_state = data[key].key;
        let value_inject_state = data[key].value;
        let id_inject_state = data[key].id;

        if (typeof value_inject_state === 'string') {
          chrome.devtools.inspectedWindow.eval(
            `__svelte_devtools_inject_state(${id_inject_state}, '${key_inject_state}', '${value_inject_state}')`,
            (_, error) => {
              errors[key_inject_state] =
                error && error.isException
                  ? error.value.substring(0, error.value.indexOf('\n'))
                  : undefined;
            }
          );
        } else if (typeof value_inject_state === 'object') {
          chrome.devtools.inspectedWindow.eval(
            `__svelte_devtools_inject_state(${id_inject_state}, '${key_inject_state}', ${JSON.stringify(value_inject_state)})`,
            (_, error) => {
              errors[key_inject_state] =
                error && error.isException
                  ? error.value.substring(0, error.value.indexOf('\n'))
                  : undefined;
            }
          );
        } else {
          chrome.devtools.inspectedWindow.eval(
            `__svelte_devtools_inject_state(${id_inject_state}, '${key_inject_state}', ${value_inject_state})`,
            (_, error) => {
              errors[key_inject_state] =
                error && error.isException
                  ? error.value.substring(0, error.value.indexOf('\n'))
                  : undefined;
            }
          );
        }
      }
    });

    index++;
  };

  //RESET TAB-------------------------------------------------------------------------------
  const resetAlertClick = () => {
    const confirmed = window.confirm(
      'Are you sure you want to reset all tabs?'
    );

    if (confirmed) {
      if (confirmed) {
        resetTab();
      }
    }
  };

  const resetTab = async () => {
    //updating UI to default snapshot 1
    items = {
      'Snapshot 1': {
        value: 1,
        component: SingleTab,
      },
    };
    index = 2;
    activeTabValue = 1;

    //make webpage come back to original version - original RootComponent
    DefaultSnapShotStore.subscribe((data: any) => {
      console.log('DefaultSnapShotStore when invoking addTab: ', data);

      for (let key in data) {
        let key_inject_state = data[key].key;
        let value_inject_state = data[key].value;
        let id_inject_state = data[key].id;

        if (typeof value_inject_state === 'string') {
          console.log('running for string');
          chrome.devtools.inspectedWindow.eval(
            `__svelte_devtools_inject_state(${id_inject_state}, '${key_inject_state}', '${value_inject_state}')`,

            (_, error) => {
              errors[key_inject_state] =
                error && error.isException
                  ? error.value.substring(0, error.value.indexOf('\n'))
                  : undefined;
            }
          );
        } else if (typeof value_inject_state === 'object') {
          chrome.devtools.inspectedWindow.eval(
            `__svelte_devtools_inject_state(${id_inject_state}, '${key_inject_state}', ${JSON.stringify(value_inject_state)})`,
            (_, error) => {
              errors[key_inject_state] =
                error && error.isException
                  ? error.value.substring(0, error.value.indexOf('\n'))
                  : undefined;
            }
          );
        } else {
          chrome.devtools.inspectedWindow.eval(
            `__svelte_devtools_inject_state(${id_inject_state}, '${key_inject_state}', ${value_inject_state})`,
            (_, error) => {
              errors[key_inject_state] =
                error && error.isException
                  ? error.value.substring(0, error.value.indexOf('\n'))
                  : undefined;
            }
          );
        }
      }
    });

    //Set the value in the store to default.
    CurrentTabStore.update((data) => {
      return { currentTab: 1 };
    });

    SnapshotStore.update((data) => {
      return {};
    });

    DefaultSnapShotStore.update((update) => {
      return {};
    });
  };

  //-------------------------------------------------------------------------------

  SelectedNodeAttributes.subscribe((data) => {
    currentdata = data.tagName;
  });

  RootComponentStore.subscribe((data) => {
    root = data.tagName;
  });

  //REMOVE TAB FUNCTION-----------------------------------------------------------------------
  const removeTab = (tabValue: number) => () => {
    //change activeTab to the last tab
    if (Object.keys(items).length > 1) {
      delete items[tabValue];
      activeTabValue = items[Object.keys(items).reverse()[0]].value;
      CurrentTabStore.update((tab) => {
        return { currentTab: activeTabValue };
      });
      items = items;
    }
  };
</script>

<div id="headerBox">
  <div class="logo-container">
    <svg
      class="logo-svg"
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 48 48"
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m28.072 17.405l7.05-10.424c.584-.864-.168-2.002-1.192-1.805L15.308 8.773L7.993 19.589a2.352 2.352 0 0 0 .63 3.266l10.817 7.314l21.397-4.132l-8.633 12.765l-18.622 3.596c-1.024.198-1.776-.941-1.192-1.805l7.05-10.424l8.632-12.764l12.765 8.632"
      />
    </svg>
    <h1>Svelte<span class="scope-span">Scope</span></h1>
  </div>

  <button id="reset" on:click={resetAlertClick}>
    <p>Reset all tabs</p>
    <svg
      class="reset-svg"
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 21 21"
    >
      <g
        fill="none"
        fill-rule="evenodd"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M6.5 3.5c-2.414 1.377-4 4.022-4 7a8 8 0 1 0 8-8" />
        <path d="M6.5 7.5v-4h-4" />
      </g>
    </svg>
  </button>
</div>

<ul>
  {#each Object.entries(items) as [key, value]}
    <li class={activeTabValue === value.value ? 'active' : ''}>
      <span class="li-span" on:click={handleClick(value.value)}>{key}</span>
    </li>
  {/each}
  <span class="button li-span" on:click={addTab()}>+</span>
</ul>

{#each Object.entries(items) as [key, value]}
  {#if activeTabValue == value.value}
    <div class="box">
      <div class="delete-button-container">
        {#if currentdata !== undefined}
          <h2 class="root">
            Currently editing: <span class="edit-component-span"
              >{currentdata}</span
            >
          </h2>
        {/if}
        {#if currentdata === undefined}
          <h2 class="root">
            Currently editing: <span class="edit-component-span">{root}</span>
          </h2>
        {/if}
        {#if Object.keys(items).length > 1}
          <button id="delete" on:click={removeTab(key)}>✖️</button>
        {:else}
          <button
            id="delete"
            disabled
            style="cursor:default; opacity:.25"
            on:click={removeTab(key)}>✖️</button
          >
        {/if}
      </div>
      <svelte:component this={value.component} />
    </div>
  {/if}
{/each}



<style>
  .delete-button-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo-container {
    display: flex;
    align-items: center;
  }

  .logo-svg {
    width: 30px;
    height: 30px;
    color: gray;
    padding: 0px 10px;
    stroke-width: 2px;
  }

  .scope-span {
    font-weight: normal;
  }

  h1 {
    font-size: 20px;
    font-weight: 100;
    margin: 0px;
    background-color: #dee2e6;
  }

  .delete-button-container > h2 {
    font-size: 14px;
    color: gray;
    font-weight: 300;
    letter-spacing: normal;
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

  .li-span {
    border: 1px solid transparent;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    display: block;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: 0.15s ease-in;
    font-weight: 400;
    box-shadow:
      0 0 1px 0 white inset,
      0 0 1px 0 white;
  }

  .li-span:hover {
    border-color: #e9ecef #e9ecef #dee2e6;
    background-color: orangered;
    color: black;
  }

  /* .edit-component-span {
    color: black;
  } */

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
  }

  #delete:focus {
    outline: none;
  }

  #delete:hover {
    color: red;
  }

  li.active > span {
    color: black;
    background-color: orange;
    border-color: #dee2e6 #dee2e6 #fff;
    font-weight: 600;
  }

  #headerBox {
    display: flex;
    flex-direction: row;
    flex: 2;
    justify-content: space-between;
    background-color: #dee2e6;
    align-items: center;
  }

  #reset {
    background: none;
    color: gray;
    margin: 7px;
    display: flex;
    align-items: center;
    outline: none;
    border: none;
  }

  #reset > svg {
    width: 20px;
    height: 20px;
    color: gray;
  }
  #reset > p {
    margin-right: 5px;
    font-size: 14px;
    font-weight: normal;
  }

  #reset:hover {
    border: none !important;
    outline: none !important;
    color: black !important;
    transition: none;
  }

  #reset:hover > * {
    color: black;
  }

  .root {
    font-size: 20px;
    color: black;
    margin: 0px;
    font-weight: normal;
    border-radius: 0.5rem;
    letter-spacing: 1px;
  }
</style>
