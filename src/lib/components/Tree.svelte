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
  let domData;
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
    const processedTreeDataPromise = new Promise((resolve, reject) => {
      try {
        idCounter = 0;
        // const processedData = objDiver(currentData);
        // console.log('logging processed data: ', processedData);
        // buildTree(processedData);
        buildTree(currentData);
        resolve();
        // resolve(processedData);
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

  // /**
  //  * Transofrm data from RootComponentStore to only contain "tagName" and "children" properties.
  //  */
  // function objDiver(data: any): any {
  //   console.log('logging data inside of objDiver: ', data);
  //   componentCache.set(data);
  //   if (typeof data === 'object') {
  //     const componentData: TreeData = {
  //       tagName: data.tagName, // Handle missing tagName
  //       children: [],
  //     };

  //     if (data.children) {
  //       for (let i = 0; i < data.children.length; i++) {
  //         componentData.children.push(objDiver(data.children[i]));
  //       }
  //     }

  //     return componentData;
  //   }
  // }

  /**
   * Recursive method to prepare tree data to build Vis.js Network diagram.
   */
  function transformData(obj: {
    tagName: string;
    children: any[];
  }): NetworkData {
    let nodes: any[] = [];
    let edges: any[] = [];

    // const rootNodeId = generateUniqueId(obj.tagName); // Generate ID for the current node
    // nodes.push({ id: rootNodeId, label: obj.tagName });
    nodes.push({ id: obj.id, label: obj.tagName });

    function processNode(
      node: { tagName: string; children: any[] },
      parentId?: string
    ): void {
      for (const child of node.children) {
        // const childId = generateUniqueId(child.tagName);
        const childId = child.id;
        // edges.push({ from: parentId || rootNodeId, to: childId }); // Connect to parent (or root if no parent provided)
        edges.push({ from: parentId || obj.id, to: childId });
        nodes.push({ id: childId, label: child.tagName });
        processNode(child, childId); // Recursively process children
      }
    }

    processNode(obj); // Start processing from the root node (obj)

    return { nodes, edges };
  }

  // /**
  //  * Ensure all tree nodes have a unique id to handle duplicate component labels.
  //  */
  // function generateUniqueId(tagName: string) {
  //   return `${tagName}-${idCounter++}`; // Simple but sufficient for this example
  // }

  /**
   * Set diagram options and build to render within 'treeContainer' div.
   */
  async function buildTree(treeData: any) {
    if (!treeData) return;
    let allNodes: Node[] = [];
    let allEdges: Edge[] = [];
    const { nodes, edges } = await transformData(treeData);
    allNodes = allNodes.concat(nodes);
    allEdges = allEdges.concat(edges);

    const networkData = { nodes: allNodes, edges: allEdges };
    const options = {
      layout: {
        hierarchical: {
          enabled: true,
          parentCentralization: true,
          sortMethod: 'directed',
          direction: 'UD',
        },
      },
    };
    network = new vis.Network(treeContainer, networkData, options);

    network.on('click', (event) => {
      const clickedNodeId = event.nodes[0];
      handleNodeClick(event, clickedNodeId);
    });
  }

  /**
   * Updated active selected node via SelectedNodeAttributes store on node click.
   */
  function handleNodeClick(event, d) {
    // Access data associated with the clicked node
    SelectedNodeAttributes.update((data: any) => {
      console.log('logging dom data: ', domData);
      console.log('logging node id: ', d);
      // const originalObj = domData.find((item) => item.id === d);
      const originalObj = findComponentById(domData, d);
      return originalObj;
    });
  }

  function findComponentById(obj, targetId) {
    // check if current obj has an 'id' property
    if (obj.id === targetId) return obj.value;

    if (Array.isArray(obj.children)) {
      for (const child of obj.children) {
        const result = findComponentById(child, targetId);
        if (result !== undefined) {
          return result; // found the value!
        }
      }
    }

    for (const prop in obj) {
      console.log('loggign obj prop: ', prop, obj);
      // return obj[prop];
      // if (obj.id === targetId) return obj;
      if (obj.hasOwnProperty(prop.id) && typeof obj[prop] === 'object') {
        if (obj.id === targetId) return obj;
        //   const result = findComponentById(obj[prop], targetId);
        //   if (result !== undefined) {
        //     return result;
        //   }
      }
    }

    // // value not found:
    // return undefined;
  }

  /**
   * Clean up tree diagram on destroy.
   */
  onDestroy(() => {
    if (network) network.destroy();
  });
</script>

<div
  bind:this={treeContainer}
  style="width: 100%; height: 100%; position: sticky;"
></div>

<!-- <script lang="ts">
  import { onMount } from 'svelte';
  import {
    RootComponentStore,
    SelectedNodeAttributes,
  } from '../../stores/Store';

  interface TreeData {
    tagName: string;
    children: TreeData[];
  }

  let root;
  let treeData: any = null;
  let svg : any;
  let treeContainer;
  let selectedNode;

  RootComponentStore.subscribe((data) => {
    treeData = data;

    if (treeData) {
      const updatedTreeData: TreeData = objDiver(treeData);
      updateTree();
    }
  });

  SelectedNodeAttributes.subscribe((data) => {
    // console.log('subscribed to selected node attributes: ', data);
    selectedNode = data;
  });

  // console.log('selected node line 34: ', selectedNode);

  function objDiver(data: any): TreeData {
    if (typeof data === 'object') {
      const componentData: TreeData = {
        tagName: data.tagName, // Handle missing tagName
        children: [],
      };
      if (data.children) {
        for (let i = 0; i < data.children.length; i++) {
          componentData.children.push(objDiver(data.children[i]));
        }
      }
      return componentData;
    }
  }
  function handleMouseOver() {
    d3.select(this)
      .select('rect')
      .transition()
      .delay(10)
      .attr('stroke', 'black')
      .attr('stroke-width', '2px');
    // .attr('fill', 'orangered');
  }

  function handleMouseOut() {
    d3.select(this)
      .select('rect')
      .transition()
      .delay(10)
      .attr('stroke', 'none');
    // .attr('fill', 'orange');
  }

  // Function to update the tree
  function updateTree() {
    if (!treeData) return;
    d3.selectAll('svg > *').remove();
    treeContainer = d3.select('#treeContainer');
    // const treeContainer = d3.select('#tree-container');
    root = d3.hierarchy(treeData);

    svg = d3
      .select('#treeComponent')
      .append('g')
      .attr('transform', 'translate(width / 2 + height / 2)');

    const treeLayout = d3.tree().nodeSize([110, 120]);
    treeLayout(root);

    const treeGroup = svg.append('g').attr('transform', 'translate(20,20)');

    // Draw links
    treeGroup
      .selectAll('.link')
      .data(root.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr(
        'd',
        d3
          .linkVertical()
          .x((d) => d.x)
          .y((d) => d.y)
      );

    // Draw nodes and add click functionality
    const nodes = treeGroup
      .selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('style', 'cursor: pointer;')
      .attr('transform', (node) => `translate(${node.x},${node.y})`)
      .on('click', handleNodeClick);

    // Append rectangle for nodes
    nodes
      .append('rect')
      .attr('x', -50)
      .attr('y', 5)
      .attr('width', 100)
      .attr('height', 30)
      // .attr('stroke', '2px solid black')
      .attr('fill', 'orange')
      .attr('rx', '7px')
      .attr('ry', '7px')
      .attr(
        'style',
        'display: flex; align-items: center; justify-content: center; shape-rendering: geometricPrecision;'
      );

    // Append text for nodes
    nodes
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '24')
      .text((d) => d.data.tagName);

    nodes.on('mouseover', handleMouseOver).on('mouseout', handleMouseOut);

    svg.selectAll('.link').attr('fill', 'none').attr('stroke', 'black');
    //changing font size of text
    svg
      .selectAll('.node text')
      .attr('font-size', '12px')
      .attr('font-weight', '500')
      .attr('style', `font-family: 'system-ui';`);
  }

  function dragstarted(event, d) {
    d3.select(this).raise().classed('active', true);
  }

  function dragged(event, d) {
    d3.select(this).attr(
      'transform',
      'translate(' + event.x + ', ' + event.y + ')'
    );
  }

  function dragended(event, d) {
    d3.select(this).classed('active', false);
  }

  function handleNodeClick(event, d) {
    // Access data associated with the clicked node
    const clickedNodeData = d.data;
    SelectedNodeAttributes.update((data: any) => {
      return clickedNodeData;
    });
  }


  onMount(() => {
    treeContainer = d3.select('#treeContainer');
    updateTree();

    svg = d3.select('#treeComponent');

    const drag = d3
      .drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);

    svg.call(drag);
 
  });
</script>

<div class="tree-container" id="treeContainer">
  <svg bind:this={svg} height={'100%'} id="treeComponent"> </svg>
</div>

<style>
  .tree-container {
    overflow: visible;
    display: flex;
    position: sticky;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    cursor: grab;
  }

  #treeComponent {
    overflow: visible;
  }

  .tree-container:active {
    cursor: grabbing;
  }

  svg {
    width: 100%;
    height: 100%;
  }
</style> -->
