<template>
  <div id="graph3d"/>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import axios from 'axios';
import {NodeObject} from 'force-graph';
import ForceGraph3D from '3d-force-graph';

export default defineComponent({
  name: 'GraphComponent3D',
  props: {},
  setup() {
    axios.get('http://localhost:3000/', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
      }
    }).then((response) => {
      let gData = response.data;

      if (document.getElementById('graph3d')) {
        const el = document.getElementById('graph3d')

        if (el) constructGraph(gData, el);
      }
    }).catch((error) => {
      console.error(error);
    })

    function constructGraph(gData: any, element: HTMLElement) {
      const dashLen = 6;
      const gapLen = 8;

      const highlightNodes = new Set();
      const highlightLinks = new Set();
      let hoverNode: NodeObject | null = null;

      let NODE_R = 5;

      // cross-link node objects
      gData.links.forEach((link: { source: string; target: string; }) => {
        const a = gData.nodes.find((node: NodeObject) => node.id == link.source);
        const b = gData.nodes.find((node: NodeObject) => node.id == link.target);
        !a.neighbors && (a.neighbors = []);
        !b.neighbors && (b.neighbors = []);
        a.neighbors.push(b);
        b.neighbors.push(a);

        !a.links && (a.links = []);
        !b.links && (b.links = []);
        a.links.push(link);
        b.links.push(link);
      });

      return ForceGraph3D()(element)
        .graphData(gData)
        .warmupTicks(15)
        .linkDirectionalParticles(1)
        .nodeRelSize(NODE_R)
        .linkWidth(2)
        .linkLabel((link) => link.group)
        .nodeAutoColorBy(node => node.group)
        .linkAutoColorBy(link => link.group)
        .onNodeHover((node, previousNode) => {
          highlightNodes.clear();
          highlightLinks.clear();
          if (node) {
            highlightNodes.add(node);
            if (node.neighbors) node.neighbors.forEach((neighbor) => highlightNodes.add(neighbor));
            if (node.links) node.links.forEach(link => highlightLinks.add(link));
          }

          hoverNode = node || null;
        })
        .onLinkHover(link => {
          highlightNodes.clear();
          highlightLinks.clear();

          if (link) {
            highlightLinks.add(link);
            highlightNodes.add(link.source);
            highlightNodes.add(link.target);
          }
        })
        .linkWidth(link => highlightLinks.has(link) ? 5 : 2)
        .linkDirectionalParticles(4)
        .linkDirectionalParticleWidth(link => highlightLinks.has(link) ? 8 : 4)
      /*.nodeCanvasObject((node, ctx, globalScale) => {
      const label = node.name;
      const fontSize = 12/globalScale;
      ctx.font = `${fontSize}px Sans-Serif`;
      const textWidth = ctx.measureText(label).width;
      const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = node.color;
      ctx.fillText(label, node.x, node.y);

      node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
      })
      .nodePointerAreaPaint((node, color, ctx) => {
      ctx.fillStyle = color;
      const bckgDimensions = node.__bckgDimensions;
      bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
      })*/

      // return graph;
    }
  },
});
</script>
