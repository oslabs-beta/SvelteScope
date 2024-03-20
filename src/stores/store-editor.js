
import { writable } from 'svelte/store';

const rootData_Editor = writable({})
// const RootComponentStore_Editior = writable({}); 


const custom_rootData_Editor = {
    subcribe_rootData_Editor: rootData_Editor.subscribe,
    set_rootData_Editor: (data) => {
        rootData_Editor.set(data)
    },
    update_rootData_Editor: (updater) => {
        rootData_Editor.update(updater)
    }
}

export default custom_rootData_Editor;
