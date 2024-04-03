<script lang="ts">
  import { onDestroy } from 'svelte';
  import {
    RootComponentStore,
    SelectedNodeAttributes,
  } from '../../stores/Store';
  import * as vis from 'vis';
  import { select } from 'd3';

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
  let idCounter = 0;
  let dragEnabled: boolean = false;
  let selectedNode: any = null;
  let treeDataPromise: Promise<any>; // to handle processing tree data asynchronously

  /**
   * Once data containing the current DOM data is updated, handle async logic to build tree.
   */
  RootComponentStore.subscribe((currentData) => {
    domData = currentData;
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
  });

  /**
   * Update the current selected node to share globally with other components.
   */
  SelectedNodeAttributes.subscribe((currentData) => {
    selectedNode = currentData;
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
    treeContainer!.innerHTML = ''; // clear existing tree content before each build
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
        multiselect: true,
        selectConnectedEdges: false,
        hoverConnectedEdges: false,
        dragNodes: false,
        hover: true,
      },
      nodes: {
        color: {
          background: '#FFA500',
          border: '#808080',
          highlight: {
            border: '#000000',
            background: '#FF4500',
          },
          hover: {
            border: '#000000',
            background: '#FF4500',
          },
        },
        shape: 'box',
        borderWidth: 1,
        borderWidthSelected: 1,
        font: {
          size: 16,
          face: 'system-ui',
          color: '#000000',
        },
        margin: {
          top: 15,
          bottom: 15,
          left: 15,
          right: 15,
        },
      },
      edges: {
        labelHighlightBold: false,
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
      dragEnabled = false;
      selectedNode = event.nodes[0];
      const clickedNodeId = event.nodes[0];
      // set mouse cursor to 'grab'
      // treeContainer!.style.cursor = 'grab';
      // set font color to white when selected
      network.body.nodes[clickedNodeId].setOptions({
        background: {
          color: '#orangered',
        },
        font: {
          color: '#FFFFFF',
        },
      });
      handleNodeClick(event, clickedNodeId);
    });

    // Revert node text to black when deselected
    network.on('deselectNode', function (params) {
  
      // check if there was a previously selected node
      if (params.previousSelection.nodes.length > 0) {
        var deselectedNodeId = params.previousSelection.nodes[0];
        var node = network.body.nodes[deselectedNodeId];

        node.setOptions({
          font: {
            color: '#000000',
          },
        });
      }
    });

    network.on('hoverNode', function (event: any) {
      treeContainer!.style.cursor = 'pointer';
    });

    network.on('blurNode', function (event: any) {
      dragEnabled = true;
    });

    network.on('mousedown', function (event: any) {
      if (event.nodes.length > 0) {
        // check if it was a node click
        dragEnabled = true;
        selectedNode = event.nodes[0]; // store the selected node ID
      }
    });

    network.on('mousemove', function (event) {
      if (!dragEnabled) {
        event.event.preventDefault();
      }
    });

    network.on('mouseup', function (event: any) {
      dragEnabled = false;
      if (
        selectedNode &&
        event.nodes.length > 0 &&
        event.nodes[0] !== selectedNode
      ) {
        network.selectNodes(event.nodes[0]); // select the new node
        selectedNode = event.nodes[0];
      } else if (!event.nodes.length && selectedNode) {
        // clicked on an empty area to deselect
        network.deselectNodes();
        selectedNode = null;
      }
    });

    network.on('dragging', function (event) {
      if (!dragEnabled) {
        event.event.preventDefault();
      } else {
        treeContainer!.style.cursor = 'grabbing';
      }
    });

    network.on('dragEnd', function () {
      treeContainer!.style.cursor = 'grab';
    });
  }

  /**
   * Updated active selected node via SelectedNodeAttributes store on node click.
   */
  function handleNodeClick(event: any, d: any) {
    // Access data associated with the clicked node
    SelectedNodeAttributes.update((data: any) => {
      const originalObj = findComponentById(domData, d);
      return originalObj;
    });
  }

  // Return the original component data from RootComponentStore when a node is selected.
  function findComponentById(obj: any, targetId: Number) {
    // Recursive base case: if obj.id === targetId, return obj
    if (obj.id == targetId) {
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

  // Recenter network diagram to center of screen if re-center button is clicked.
  function recenterDiagram() {
    network.fit({
      animation: {
        duration: 500,
        easingFunction: 'easeInOutQuad',
      },
    });
  }

  /**
   * Clean up tree diagram on destroy.
   */
  onDestroy(() => {
    if (network) network.destroy();
  });
</script>

<div class="tree-controls">
  <button class="recenter-btn" on:click={recenterDiagram}>
    <svg
      role="button"
      aria-roledescription="Recenter network diagram on click."
      class="recenter-svg"
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      >
        <path
          d="M7.5 20.886c-1.463-.144-2.447-.47-3.182-1.204c-.735-.735-1.06-1.72-1.204-3.182M7.5 3.114c-1.463.144-2.447.47-3.182 1.204c-.735.735-1.06 1.72-1.204 3.182M16.5 3.114c1.463.144 2.447.47 3.182 1.204c.735.735 1.06 1.72 1.204 3.182M16.5 20.886c1.463-.144 2.447-.47 3.182-1.204c.735-.735 1.06-1.72 1.204-3.182"
        />
        <path stroke-miterlimit="1" d="M15 12a3 3 0 1 0-6 0a3 3 0 0 0 6 0" />
      </g>
    </svg>
    <p>Re-center diagram</p>
  </button>
  <div
    class="tree-container"
    bind:this={treeContainer}
    style="width: 100%; height: 100%; position: sticky;"
  ></div>
</div>

<style>
  .tree-controls {
    width: 100%;
    height: 100%;
  }

  .recenter-btn {
    z-index: 10;
    cursor: pointer;
    position: absolute;
    bottom: 0;
    margin-bottom: 10px;
    margin-left: 10px;
    color: gray;
    background-color: transparent;
    border: none;
    padding: 0;
    display: flex;
    align-items: center;
  }

  .recenter-btn > p {
    font-size: 14px;
  }

  .recenter-btn:focus {
    outline: none;
  }

  .recenter-svg {
    width: 25px;
    height: 25px;
    margin-right: 10px;
  }

  .recenter-btn:hover {
    color: black;
  }
</style>
