import { writable } from 'svelte/store';

//store for components
export const RootComponentStore = writable({});

//store for svelte version
export const SvelteVersionStore = writable();

//store for props
const rootData_Editor = writable({});

//Selected Node Store
export const SelectedNodeAttributes = writable({});


const globalStore = {

}

