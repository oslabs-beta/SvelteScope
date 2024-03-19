<!-- <script lang="ts">
  import { onMount } from "svelte";
    import rootData_Editor  from '../../stores/store-editor'

    let currentData: any;

    // onMount(() => {
    //     console.log('Data from RootComponentStore_Editior: ');
    // })
// interface Component{
//     tagName: string,
//     detail: any,
//     children: Array<Component>,
//     id: number
// }
// let testTreeData: any;


// RootComponentStore_Editior.subscribe((data) => {
//     console.log('Data from RootComponentStore_Editior: ', data);
//     currentData = data;
    // testTreeData = data;
    // testTreeData = testTreeData;
    // console.log('logging test tree data obj: ', testTreeData);

    // const updatedTreeData: TreeData = {
    //   tagName: '',
    //   children: [],
    // };

    // (function objDiver(...treeData: any) {
    //   console.log('incoming tree data: ', treeData);
    //   for (const node of treeData) {
    //     if (node.children) {
    //       updatedTreeData.tagName = node.tagName;
    //       updatedTreeData.children = node.children.map((child: TreeData[]) =>
    //         objDiver(child)
    //       );
    //     }
    //     updatedTreeData.tagName = node.tagName;
    //   }
    // })(testTreeData);

    // console.log('logging updated tree data: ', updatedTreeData);
//   });

// onMount(()=>{
//     // console.log('Try to get RootComponentStore_Editior: ', )
//     console.log('currentData from RootComponentStore_Editior: ', {$rootData_Editor})

// })

console.log($rootData_Editor)
</script>


<p>display props here</p> -->

<script lang="ts">
  import { onMount } from "svelte";
  import custom_rootData_Editor from "../../stores/store-editor";

  let currentData: any;


//   function onChangeHandler(e, key){
//     const newVal = e.target.value;

//     // Update the value for the specific key
//     custom_rootData_Editor.update_rootData_Editor((data: any) => {
//         // Iterate over the ctx array to find the correct key and update its value
//         const updatedCtx = data.detail.ctx.map(ctx => {
//             if (Array.isArray(ctx.value)) {
//                 ctx.value = ctx.value.map(val => {
//                     // Check if the key matches the current key being updated
//                     if (val[key] !== undefined) {
//                         // Update the value for the current key
//                         return { ...val, [key]: newVal };
//                     } else {
//                         return val;
//                     }
//                 });
//             }
//             return ctx;
//         });

//         // Update the data with the modified ctx array
//         return { ...data, detail: { ...data.detail, ctx: updatedCtx } };
//     });
// }

function onChangeHandler(e, ctxKey, key){
    const newVal = e.target.value;

    // Update the value for the specific key
    custom_rootData_Editor.update_rootData_Editor((data: any) => {
        // Iterate over the ctx array to find the correct key and update its value
        const updatedCtx = data.detail.ctx.map(ctx => {
            if (ctx.key === ctxKey && Array.isArray(ctx.value)) {
                ctx.value = ctx.value.map(val => {
                    // Check if the key matches the current key being updated
                    if (val[key] !== undefined) {
                        // Update the value for the current key
                        return { ...val, [key]: newVal };
                    } else {
                        return val;
                    }
                });
            }
            return ctx;
        });

        // Update the data with the modified ctx array
        return { ...data, detail: { ...data.detail, ctx: updatedCtx } };
    });
}

  onMount(() => {
    const unsubscribe = custom_rootData_Editor.subcribe_rootData_Editor(
      (data: any) => {
        currentData = data;
        console.log("Data from rootData_Editor: ", currentData);
      }
    );

    return unsubscribe; // Cleanup subscription when component unmounts
  });
</script>

{#if currentData}
  {#each currentData.detail.ctx as ctx}
    {#if Array.isArray(ctx.value)}
      <p>Key {ctx.key}</p>
      <hr />
      {#each ctx.value as val}
        <hr />
        <!-- {#each Object.entries(val) as [key, value]}
          <p><span style="color: red">{key}:</span> {value}</p>
          <div>
            <label for={key}>{key}</label>
            <input type="text" id={key} on:input={onChangeHandler}/>
            
          </div>
        {/each} -->
        <!-- {#each Object.entries(val) as [key, value] (key)}
          <div>
            <label for={key}>{key}</label>
            <input
              type="text"
              id={key}
              {value}
              on:input={(e) => onChangeHandler(e, key)}
            />
          </div>
        {/each} -->

        {#each Object.entries(val) as [key, value]}
  <div>
    <label for={ctx.key + '-' + key}>{key}</label>
    <input type="text" id={ctx.key + '-' + key} value={value} on:input={e => onChangeHandler(e, ctx.key, key)}/>
  </div>
{/each}
      {/each}
    {/if}
  {/each}
{/if}
