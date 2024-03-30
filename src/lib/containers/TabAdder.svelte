<script lang="ts">
  import SingleTab from "./SingleTab.svelte";
  import Icon from '@iconify/svelte';
  import {
    CurrentTabStore,
    DefaultSnapShotStore,
    SnapshotStore,
    SelectedNodeAttributes,
    RootComponentStore,
    SvelteVersionStore,
    DefaultRootComponentStore,
  } from '../../stores/Store';

  /**
   * @type {any}
   */
  export let items = {};
  export let activeTabValue = 1;
  let currentdata: any;
  let root: any;
  let index = 2;
  let currentTab: number;
  const errors: Record<string, string | undefined> = {};
  let snapshot: any;
  let defaultRootComponent: any;

  //-------------------------------------------------------------------------------
  const handleClick = (/** @type {number} */ tabValue) => () => {
    activeTabValue = tabValue;
    // console.log("activeTabValue: ", activeTabValue);

    // Update currentTab value
    CurrentTabStore.update((tab) => {
      return { currentTab: activeTabValue };
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
      console.log(
        'SnapShotStore when invoking handleClick from <TabAdder />: ',
        snapshot
      );
      console.log(
        'snapshot[currentTab] when invoking handleClick from <TabAdder />: ',
        snapshot[currentTab]
      );
      for (let key in snapshot[currentTab]) {
        let key_inject_state = snapshot[currentTab][key].key;
        console.log(
          'key_inject_state: ',
          typeof key_inject_state,
          key_inject_state
        );
        let value_inject_state = snapshot[currentTab][key].value;
        console.log(
          'value_inject_state: ',
          typeof value_inject_state,
          value_inject_state
        );
        let id_inject_state = snapshot[currentTab][key].id;
        console.log(
          'id_inject_state: ',
          typeof id_inject_state,
          id_inject_state
        );
        // let idLength = id_inject_state.toString().split('').length;
        // let key_inject_state = key.split('').slice(0,  key.split('').length - idLength).join('');
        // console.log('key_inject_state: ', typeof key_inject_state, key_inject_state)

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

  //-------------------------------------------------------------------------------
  //CURRENT TAB
  CurrentTabStore.subscribe((currTab) => {
    currentTab = +currTab.currentTab;
  });

  //-------------------------------------------------------------------------------
  const addTab = (/** @type {number} */ tabValue) => () => {
    const tab = `Snapshot${index}`;
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

    //just subcribe the rootComponent --> DefaultRootComponent
    //because <Editor /> get rootComponent, need to run this function to make changes for webpage
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
  const resetTab = () => {
    //updating UI to default snapshot 1
    items = {
      Snapshot1: {
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

    //get values from DefaultRootComponentStore
    DefaultRootComponentStore.subscribe((data) => {
      defaultRootComponent = data;
    });
    RootComponentStore.update((data) => {
      data = defaultRootComponent;
      return data;
    });

    SelectedNodeAttributes.update((data) => {
      return {};
    });

    SnapshotStore.update((data) => {
      return {};
    });

    DefaultSnapShotStore.update((update) => {
      return {};
    });
  };
  SelectedNodeAttributes.subscribe((data) => {
    // console.log('subscribed to selected node attributes: ', data);
    currentdata = data.tagName;
  });

  RootComponentStore.subscribe((data) => {
    root = data.tagName;
  });

  //-------------------------------------------------------------------------------
  const removeTab = (/** @type {string} */ tabValue) => () => {
    //change activeTab to the last tab
    if (Object.keys(items).length > 1) {
      delete items[tabValue];
      activeTabValue = items[Object.keys(items).reverse()[0]].value;
      CurrentTabStore.update((tab) => {
        return { currentTab: activeTabValue };
      });
      items = items;
    } else {
      alert('Add new Tab if you want to delete the last tab?');
    }
  };
</script>

<div id="headerBox">
  <h1>Sveltune</h1>
  
  <button id="reset" on:click={resetTab}><img title="Reset Tabs" src="https://www.svgrepo.com/show/533701/refresh-cw.svg" height="20px" width="15px" alt="reset"></button>
  </div>


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
        {#if currentdata !== undefined}
          <h2 class="root">Editing: {currentdata} Component</h2>
        {/if}
        {#if currentdata === undefined}
          <h2 class="root">{root} Component</h2>
        {/if}
        <button id="delete" on:click={removeTab(key)}>✖️</button>
      </div>
      <svelte:component this={value.component} />
    </div>
  {/if}
{/each}

<style>
  .delete-button-container {
    display: flex;
    justify-content: space-between;
  }

  h1 {
    font-size: 24px;
    font-weight: 300;
    margin: 0px;
    padding: 10px 10px;
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

  #delete:hover{
    color: red
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

  #headerBox {
    display: flex;
    flex-direction: row;
    flex: 2;
    justify-content: space-between;
    background-color: #dee2e6;
  }

  #reset {
    background-color: #dee2e6;
    /* background-image: url('https://www.svgrepo.com/show/533701/refresh-cw.svg') ; */
    color: black;
    margin : 7px;
    transition: 0.25s ease-in;
  }

  #reset:hover {
    border-color: orangered;
  }
  .root {
    font-size: 20px;
    color: orangered;
    margin: 0px;
    padding: 20px 10px;

    border-radius: 0.5rem;

    letter-spacing: 1px;
  }
</style>
