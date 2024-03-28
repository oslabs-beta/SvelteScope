<script lang="ts">
  import Expandable from "./Expandable.svelte";
  import {
    SnapshotStore,
    CurrentTabStore,
    DefaultSnapShotStore,
  } from "../../../stores/Store";
  import SnapShot from "../SnapShot.svelte";

  let currentTab: any;
  const errors: Record<string, string | undefined> = {};
  // let defaultValueObject: any;

  export let currentProps: any = [];
  export let id: number;
  export let readonly = false;

  //-------------------------------------------------------------------------------

  CurrentTabStore.subscribe((currTab) => {
    currentTab = +currTab.currentTab;
  });

  //-------------------------------------------------------------------------------
  function change(key: string, value: any, defaultValue: any) {
    DefaultSnapShotStore.update((defaultValueObj) => {
      //Because nested object or array will have same key,
      //add id to key to make unique key
      //if [key+id] property exist => not change anything
      if (!defaultValueObj[key + id]) {
        // if (typeof defaultValue === "object") {
        //   for (let keyObj in defaultValue) {
        //     defaultValueObj[key + id + keyObj] = {
        //       key: key,
        //       id: id,
        //       value: JSON.parse(JSON.stringify(defaultValue[keyObj])),
        //     };
        //   }
        // }
        defaultValueObj[key + id] = {
          key: key,
          id: id,
          value: JSON.parse(JSON.stringify(defaultValue)),
        };
      }
      return defaultValueObj;
    });

    DefaultSnapShotStore.subscribe((defaultValueObj) => {
      // defaultValueObject = defaultValueObj;
      console.log(
        "DefaultSnapShotStore when invoking change from <Props />: ",
        defaultValueObj
      );
    });

    SnapshotStore.update((tabs) => {
      if (!tabs[currentTab]) {
        tabs[currentTab] = {};
      }

      tabs[currentTab][`${key}${id}`] = {
        key: key,
        id: id,
        value: JSON.parse(value),
      };

      return tabs;
    });

    SnapshotStore.subscribe((snapshot) => {
      console.log(
        "SnapShotStore when invoking change from <Props />: ",
        snapshot
      );
      console.log(
        "snapshot[currentTab] when invoking change from <Props />: ",
        snapshot[currentTab]
      );
    });

    console.log("'${key}' : ", key);

    chrome.devtools.inspectedWindow.eval(
      `__svelte_devtools_inject_state(${id}, '${key}', ${value})`,
      (_, error) => {
        errors[key] =
          error && error.isException
            ? error.value.substring(0, error.value.indexOf("\n"))
            : undefined;
      }
    );
  }
</script>

<!-- //------------------------------------------------------------------------------- -->

{#if currentProps.length}
  <ul>
    {#each currentProps as { key, value } (key)}
      <Expandable
        {readonly}
        {key}
        {value}
        error={errors[key]}
        on:change={(e) => change(key, e.detail, value)}
      />
    {/each}
  </ul>
{:else}
  <div style:padding-left="1rem" style:color="rgb(118, 118, 118)">None</div>
{/if}

<style>
  ul {
    display: grid;
    gap: 0.25rem;
    padding-left: 1rem;
    font-size: 0.75rem;
  }
</style>
