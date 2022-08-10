<template>
  <div class="q-pa-md">
    <q-drawer
      v-model="drawerLeft"
      :width="250"
      :breakpoint="500"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      overlay
      bordered
      class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item>
            <q-item-section avatar>
              <q-icon name="3d_rotation"/>
            </q-item-section>
            <q-item-section>
              <q-btn to="/3d" v-ripple>3D Version</q-btn>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon name="warning"/>
            </q-item-section>
            <q-item-section>
              <q-btn @click="forceReload" to="/" v-ripple>Force Reload</q-btn>
            </q-item-section>
          </q-item>
          <q-separator/>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-drawer
      v-model="detailsDrawer"
      :width="300"
      :breakpoint="500"
      overlay
      bordered
      class="bg-grey-3"
      side="right"
    >
      <q-scroll-area class="fit">
        <div v-if="detailsNode">
          <div>ID: {{ detailsNode.id }}</div>
          <div>{{ detailsNode.name }}</div>
          <div>Gruppe: {{ detailsNode.group }}</div>
          <div>Beschreibung: {{ detailsNode.description }}</div>
          <q-separator/>
          <q-separator/>
          <div>Verbindungen zu:</div>
          <q-separator/>
          <q-separator/>
          <div v-for="(neighbor, index) in detailsNode.neighbors" :key="index">
            <div>ID: {{ neighbor.id }}</div>
            <div>{{ neighbor.name }}</div>
            <div>Gruppe: {{ neighbor.group }}</div>
            <q-separator :key="'sep' + index"/>
          </div>
        </div>
      </q-scroll-area>
    </q-drawer>
    <div class="q-pa-md">
      <div class="row col-1">
        <div class="col-5"/>
        <div class="col">
          <q-input v-model="searchInput" label="Suche" placeholder="Name, Tags, Typ.."/>
        </div>
        <div class="col-5"/>
      </div>
      <div class="row">
        <div id="graph" class="col"/>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>

import axios from 'axios';
import ForceGraph, {NodeObject} from 'force-graph';
import {Ref, ref, UnwrapRef, watch} from 'vue';
import * as d3 from 'd3-force';

const remoteAddress = `http://${process.env.REMOTE_IP}:${process.env.REMOTE_PORT}/`
const detailsDrawer = ref(false);
const detailsNode: Ref<UnwrapRef<NodeObject>> | Ref<UnwrapRef<null>> = ref(null);
const searchInput: Ref<UnwrapRef<string>> = ref('');
const drawerLeft = ref(false);
const miniState = ref(false)

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

function forceReload() {
  axios.get(remoteAddress + 'graphs/force', {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

function constructGraph(gData: any, element: HTMLElement) {
  const dashLen = 6;
  const gapLen = 8;

  const highlightNodes = new Set();
  const highlightLinks = new Set();
  const searchHighlightNodes = new Set();
  let hoverNode: NodeObject | null = null;

  let NODE_R = 5;
  let showNames = false;

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
    .linkDirectionalParticleWidth(link => highlightLinks.has(link) ? 9 : 5)
    .nodeCanvasObjectMode(node => {
      if (showNames) return 'replace';
      else if (searchHighlightNodes.has(node) || highlightNodes.has(node)) return 'before';
      else return undefined;
    })
    .nodeCanvasObject((node, ctx, globalScale) => {
      if (node) {
        if (!showNames) {
          // add ring just for highlighted nodes
          ctx.beginPath();
          ctx.arc(node.x!, node.y!, NODE_R * 2.0, 0, 2 * Math.PI, false);
          ctx.fillStyle = searchHighlightNodes.has(node) || (node === hoverNode) ? 'red' : 'orange';
          ctx.fill();
        } else {
          const label = node.name;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = node.color;
          ctx.fillText(label, node.x, node.y);

          node.__bckgDimensions = bckgDimensions;
        }
      }
    })
    .enableNodeDrag(false)
    .onNodeClick((node, event) => {
      detailsDrawer.value = true
      detailsNode.value = node;
      console.log('Clicked')
    })
    .onNodeRightClick((node, event) => {
      detailsDrawer.value = true
      detailsNode.value = node;
      console.log('Clicked')
    })
    .onBackgroundClick((event) => {
      detailsDrawer.value = false
      detailsNode.value = null;
      console.log('Clicked background')
    })
    .linkHoverPrecision(10)
    .onZoom(({k, x, y}) => {
      // k = zoom level
      showNames = k > 2.4;
    })
    .d3Force('collide', d3.forceCollide(15))

  // return graph;
}
</script>
