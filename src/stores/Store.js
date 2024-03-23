import { writable } from 'svelte/store';

//store for components
export const RootComponentStore = writable({});

//store for svelte version
export const SvelteVersionStore = writable();

//Selected Node Store
export const SelectedNodeAttributes = writable({});


export const DefaultRootComponentStore = writable({});
export const CurrentTabStore = writable({
  currentTab: 1
});
export const SnapshotStore = writable({})
export const DefaultSnapShotStore = writable({})

