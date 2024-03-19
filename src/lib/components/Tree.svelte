<script lang="ts">
  import { onMount } from 'svelte';
  // import * as d3 from 'd3';
  import RootComponentStore from '../../stores/Store';
  import { tree } from 'd3';
  import { stringify } from 'querystring';
  import Popup from '../../../static/Popup/Popup.svelte';

  // interface TreeData {
  //   tagName: string;
  //   children: TreeData[];
  // }

  // const tree = d3.tree;

  let treeData: any = null;

  RootComponentStore.subscribe((data) => {
    // console.log('logging current data from Store from Tree component: ', data);
    treeData = data;

    if (treeData) {
      const updatedTreeData: any = objDiver(treeData);
      console.log('logging updated tree data: ', updatedTreeData);
      buildTree(updatedTreeData);
    }
  });
</script>

<script lang="ts">
  function buildTree(treeData) {
    console.log('buildTree() method hit!');
    let root = d3.hierarchy(treeData);
    let treeLayout = d3.tree().nodeSize([150, 150]);
    treeLayout(root);

    // let D3 know which element to render the tree inside of:
    let svg = d3.select('#treeComponent');
    let treeGroup = svg.append('g');

    // Create links between parents and children nodes:
    treeGroup.selectAll('.link')
    .data(root.links())
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('d', 
      d3.linkVertical()
      .x(({ x: any }) => d.x)
      .y(({ y: any }) => d.y)
    );

    // Create the nodes themselves:
    let nodes = treeGroup.selectAll('.node')
    .data(root.descendants())
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', ({ x: any; y: any}) => {
      `translate(${node.x}, ${node.y})`
    });

    // Append text to nodes:
    nodes.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '15')
      .text(({ data: { tagName: any} }) => {
        node.data.tagName
      })
      .on('click', () => handleNodeClick());

    // Create rectangular shape for nodes:
    // todo: insert code here after tree dynamically builds

    // Ensure tree fits entire panel:
    let maxX = -Infinity;
    root.each((node) => {
      if (Math.abs(node.x) > maxX) maxX = Math.abs(node.x);
    });

    svg.attr('height', maxY + 500);
    const xOffset = svg.attr('width') / 2;
    cosnt yOffset = 300;
    treeGroup.attr('transform', `translate(${xOffset}, ${yOffset})`);
  }

  function handleNodeClick() {
    console.log('node clicked!');
  }

  function objDiver(data: any): TreeData {
    if (typeof data === 'object') {
      console.log(data, 'mydata');
      const componentData: TreeData = {
        tagName: data.tagName, // Handle missing tagName
        children: [],
      };
      if (data.children) {
        componentData.children = data.children.map(objDiver);
      }
      return componentData;
    }
  }
</script>

<svg id="treeComponent"></svg>
