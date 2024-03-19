<script lang="ts">
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import RootComponentStore from '../../stores/Store';
  // import { tree } from 'd3';
  import { stringify } from 'querystring';
  import Popup from '../../../static/Popup/Popup.svelte';

  const tree = d3.tree;

  interface TreeData {
    tagName: string;
    children: TreeData[];
  }

  let treeData: any = null;

  RootComponentStore.subscribe((data) => {
    // console.log('logging current data from Store from Tree component: ', data);
    treeData = data;

    if (treeData) {
      const updatedTreeData: TreeData = objDiver(treeData);
      console.log('logging updated tree data: ', updatedTreeData);
      updateTree();
    }
  });

  function objDiver(data: any): TreeData {
    if (typeof data === 'object') {
      console.log(data, 'mydata');
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

  // Function to update the tree
  function updateTree() {
    if (!treeData) return;

    const svg = d3.select('#treeComponent');

    const root = d3.hierarchy(treeData);
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

    // Draw nodes
    const nodes = treeGroup
      .selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (node) => `translate(${node.x},${node.y})`);

    // Append rectangle for nodes
    nodes
      .append('rect')
      .attr('x', -50)
      .attr('y', 5)
      .attr('width', 100)
      .attr('height', 20)
      .attr('stroke', 'black')
      .attr('fill', 'orange');

    // Append text for nodes
    nodes
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '15')
      .text((d) => d.data.tagName);

    svg.selectAll('.link').attr('fill', 'none').attr('stroke', 'black');
    //changing font size of text
    svg.selectAll('.node text').attr('font-size', '10px');
  }

  onMount(updateTree);
</script>

<svg width="100%" height="100%" id="treeComponent"> </svg>

<style>
</style>
