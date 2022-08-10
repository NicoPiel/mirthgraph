<template>
  <div class="q-pa-lg">
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4"><q-input v-model="searchInput" label="Suche" placeholder="Name, Tags, Typ.."/></div>
      <div class="col-4"></div>

    </div>
    <div class="row">

      <div id="graph"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import ForceGraph, {NodeObject} from 'force-graph';
import {Ref, ref, UnwrapRef, watch} from 'vue';

const remoteAddress = `http://${process.env.REMOTE_IP}:${process.env.REMOTE_PORT}/`


axios.get(remoteAddress + 'graphs', {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*'
  }
}).then((response) => {
  let gData = response.data;

  if (document.getElementById('graph')) {
    const el = document.getElementById('graph')

    if (el) constructGraph(gData, el);
  }
}).catch((error) => {
  console.error(error);
})

let searchInput: Ref<UnwrapRef<string>> = ref('');

function constructGraph(gData: any, element: HTMLElement) {
  const dashLen = 6;
  const gapLen = 8;

  const highlightNodes = new Set();
  const highlightLinks = new Set();
  const searchHighlightNodes = new Set();
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

  return ForceGraph()(element)
    .graphData(gData)
    .warmupTicks(15)
    .linkDirectionalParticles(1)
    .nodeRelSize(NODE_R)
    .linkWidth(2)
    .linkLineDash(link => !link.enabled && [dashLen, gapLen])
    .linkLabel((link) => link.group)
    .nodeAutoColorBy(node => node.group)
    .linkAutoColorBy(link => link.group)
    .onEngineTick(() => {
      watch(searchInput, async (newString, oldString) => {
        searchHighlightNodes.clear();
        if (newString) {
          const results = await gData.nodes.filter((node: NodeObject) => node.name.toLowerCase().search(newString.toLowerCase()) > -1);
          results.forEach((result: NodeObject) => {
            searchHighlightNodes.add(result);
          })
        }
      });

    })
    .onNodeHover((node, previousNode) => {
      highlightNodes.clear();
      highlightLinks.clear();
      if (node) {
        highlightNodes.add(node);
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
    .autoPauseRedraw(false) // keep redrawing after engine has stopped
    .linkWidth(link => highlightLinks.has(link) ? 5 : 2)
    .linkDirectionalParticles(4)
    .linkDirectionalParticleWidth(link => highlightLinks.has(link) ? 8 : 4)
    .nodeCanvasObjectMode(node => searchHighlightNodes.has(node) || highlightNodes.has(node) ? 'before' : undefined)
    .nodeCanvasObject((node, ctx) => {
      if (node) {
        // add ring just for highlighted nodes
        ctx.beginPath();
        ctx.arc(node.x!, node.y!, NODE_R * 2.0, 0, 2 * Math.PI, false);
        ctx.fillStyle = searchHighlightNodes.has(node) || (node === hoverNode) ? 'red' : 'orange';
        ctx.fill();
      }
    });
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
</script>
