<script lang="ts">
  import { onDestroy } from 'svelte';
  import {
    RootComponentStore,
    SelectedNodeAttributes,
  } from '../../stores/Store';
  import * as vis from 'vis';

  interface TreeData {
    tagName: string;
    children: TreeData[];
  }

  interface Node {
    id: string;
    label: string;
  }

  interface Edge {
    from: string;
    to: string;
  }

  interface NetworkData {
    nodes: Node[];
    edges: Edge[];
  }

  /** GLOBAL VARIABLES: */
  let treeContainer: HTMLElement | null; // for the Vis.js network diagram
  let domData: any;
  let network: any;
  let selectedNode: any;
  let idCounter = 0;

  let treeDataPromise: Promise<any>; // to handle processing tree data asynchronously

  /**
   * Once data containing the current DOM data is updated, handle async logic to build tree.
   */
  RootComponentStore.subscribe((currentData) => {
    domData = currentData;
    console.log('logging dom data: ', domData);
    // console.log('subscribed to root component store', currentData);
    const processedTreeDataPromise = new Promise<void>((resolve, reject) => {
      try {
        idCounter = 0;
        buildTree(currentData);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
    treeDataPromise = processedTreeDataPromise;
    console.log('logging tree data promise: ', treeDataPromise);
  });

  /**
   * Update the current selected node to share globally with other components.
   */
  SelectedNodeAttributes.subscribe((currentData) => {
    selectedNode = currentData;
    console.log(
      'logging selected node attributes current data: ',
      selectedNode
    );
  });

  /**
   * Recursive method to prepare tree data to build Vis.js Network diagram.
   */
  function transformData(obj: {
    tagName: string;
    children: any[];
  }): NetworkData {
    let nodes: any[] = [];
    let edges: any[] = [];

    nodes.push({ id: obj.id, label: obj.tagName });

    function processNode(
      node: { tagName: string; children: any[] },
      parentId?: string
    ): void {
      for (const child of node.children) {
        const childId = child.id;
        edges.push({ from: parentId || obj.id, to: childId });
        nodes.push({ id: childId, label: child.tagName });
        processNode(child, childId); // Recursively process children
      }
    }

    processNode(obj); // Start processing from the root node (obj)

    return { nodes, edges };
  }

  /**
   * Set diagram options and build to render within 'treeContainer' div.
   */
  async function buildTree(treeData: any) {
    treeContainer.innerHTML = ''; // clear existing tree content before each build
    if (!treeData) return;
    let allNodes: Node[] = [];
    let allEdges: Edge[] = [];
    const { nodes, edges } = await transformData(treeData);
    allNodes = allNodes.concat(nodes);
    allEdges = allEdges.concat(edges);

    const networkData = { nodes: allNodes, edges: allEdges };
    const options = {
      autoResize: false,
      layout: {
        hierarchical: {
          enabled: true,
          parentCentralization: true,
          sortMethod: 'directed',
          direction: 'UD',
          nodeSpacing: 500,
        },
      },
      interaction: {
        hover: true,
      },
      nodes: {
        shape: 'box',
        borderWidth: 1,
        borderWidthSelected: 3,
        font: {
          size: 16,
          face: 'system-ui',
          color: 'black',
        },
        margin: {
          top: 15,
          bottom: 15,
          left: 15,
          right: 15,
        },
      },
      edges: {
        hoverWidth: 0,
        width: 1,
        scaling: {
          min: 1,
          max: 1,
        },
      },
      physics: {
        enabled: true,
      },
    };
    network = new vis.Network(treeContainer, networkData, options);

    // Prevent users from selecting edges in
    network.on('selectEdge', function (event: any) {
      event.event.preventDefault();
    });

    // Invoke handleNodeClick when node is selected
    network.on('selectNode', function (event: any, d: any) {
      const clickedNodeId = event.nodes[0];
      treeContainer!.style.cursor = 'grab';
      handleNodeClick(event, clickedNodeId);
    });

    network.on('release', function () {
      treeContainer!.style.cursor = 'default';
    });

    network.on('hoverNode', function () {
      treeContainer!.style.cursor = 'pointer';
    });

    network.on('dragStart', function () {
      treeContainer!.style.cursor = 'grabbing';
    });

    network.on('dragEnd', function () {
      treeContainer!.style.cursor = 'grab';
    });
  }

  /**
   * Updated active selected node via SelectedNodeAttributes store on node click.
   */
  function handleNodeClick(event, d) {
    // Access data associated with the clicked node
    SelectedNodeAttributes.update((data: any) => {
      console.log('logging d: ', d);
      const originalObj = findComponentById(domData, d);
      console.log('logging original obj: ', originalObj);
      return originalObj;
    });
  }

  function findComponentById(obj: any, targetId: Number) {
    console.log('logging obj: ', obj.id, obj.tagName);
    // console.log('logging targetId: ', targetId);
    let targetObj: any;

    // base case if obj.id === targetId
    if (obj.id == targetId) {
      console.log('target id found!', obj);
      return obj;
    } else {
      if (obj.children) {
        for (let i = 0; i < obj.children.length; i++) {
          const result: any = findComponentById(obj.children[i], targetId);
          if (result) return result;
        }
      }
    }
  }

  /**
   * Clean up tree diagram on destroy.
   */
  onDestroy(() => {
    if (network) network.destroy();
  });

</script>

<div
  class="tree-container"
  bind:this={treeContainer}
  style="width: 100%; height: 100%; position: sticky;"
></div>

<style>
  /* .tree-container {
    cursor: grab;
  } */
  /* 
  .tree-container:active {
    cursor: grabbing;
  } */
</style>
