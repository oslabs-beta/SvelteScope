import { writable } from 'svelte/store';


const RootComponentStore = writable({});
const SvelteVersionStore = writable();

export { RootComponentStore, SvelteVersionStore };
