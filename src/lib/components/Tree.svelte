<script lang="ts">
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import RootComponentStore from '../../stores/Store';

  interface TreeData {
    tagName: string;
    children: TreeData[];
  }

  let root;
  let treeData: any = null;

  RootComponentStore.subscribe((data) => {
    treeData = data;

    if (treeData) {
      const updatedTreeData: TreeData = objDiver(treeData);
      updateTree();
    }
  });

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

  // Function to update the tree
  function updateTree() {
    if (!treeData) return;
    d3.selectAll('svg > *').remove();
    root = d3.hierarchy(treeData);

    const svg = d3
      .select('#treeComponent')
      .append('g')
      .attr('transform', 'translate(width / 2 + height / 2)');

    const drag = d3
      .drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);

    svg.call(drag);

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
      .attr('transform', (node) => `translate(${node.x},${node.y})`)
      .attr('style', 'cursor: pointer;')
      .on('click', (event, d) => {
        console.log(d.data.tagName + ' clicked');
      });

    // Append rectangle for nodes
    nodes
      .append('rect')
      .attr('x', -50)
      .attr('y', 5)
      .attr('width', 100)
      .attr('height', 30)
      .attr('stroke', 'black')
      .attr('fill', 'orange')
      .attr('rx', '2px')
      .attr('ry', '2px')
      .attr(
        'style',
        'display: flex; align-items: center; justify-content: center;'
      );

    // Append text for nodes
    nodes
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('font-size', '20px')
      .attr('font-weight', '600')
      .attr(
        'font-family',
        `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`
      )
      .attr('dy', '23')
      .text((d) => d.data.tagName);

    svg.selectAll('.link').attr('fill', 'none').attr('stroke', 'black');
    //changing font size of text
    svg.selectAll('.node text').attr('font-size', '10px');
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

  onMount(updateTree);
</script>

<div class="tree-container">
  <!-- <svg width="100%" height="100%" id="treeComponent"> </svg> -->
  <!-- <svg width={'100%'} id="treeComponent"> </svg> -->
  <svg height={'100%'} id="treeComponent"> </svg>
</div>

<style>
  svg {
    width: 100%;
    height: 100%;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      'Open Sans',
      'Helvetica Neue',
      sans-serif;
  }

  .tree-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
  }
</style>
