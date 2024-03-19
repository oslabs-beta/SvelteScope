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
  import { text } from "d3";

  let currentData: any;

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
        {#each Object.entries(val) as [key, value]}
          <p><span style="color: red">{key}:</span> {value}</p>
        {/each}
      {/each}
    {/if}
  {/each}
{/if}
