import { writable } from 'svelte/store';

//store for components
export const RootComponentStore = writable({});

//store for svelte version
export const SvelteVersionStore = writable();

//store for props
// const rootData_Editor = writable({});

// export const custom_rootData_Editor = {
//   subcribe_rootData_Editor: rootData_Editor.subscribe,
//   set_rootData_Editor: (data) => {
//     rootData_Editor.set(data);
//   },
//   update_rootData_Editor: (updater) => {
//     rootData_Editor.update(updater);
//   },
// };

//Selected Node Store
export const selectedNodeAttributes = writable({});


export const DefaultRootComponentStore = writable({});
export const CurrentTabStore = writable({
  currentTab: 1
});
export const SnapshotStore = writable({})
export const DefaultSnapShotStore = writable({})



