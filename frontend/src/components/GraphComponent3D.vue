<template>
  <div class="q-pa-md">
    <q-drawer
      v-model="drawerLeft"
      :width="200"
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
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="dashboard"/>
            </q-item-section>
            <q-item-section>
              <q-btn to="/">2D Version</q-btn>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="warning"/>
            </q-item-section>
            <q-item-section>
              <q-btn @click="forceReload" to="/">Force Reload</q-btn>
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
    <div class="q-pa-lg">
      <div class="row">
        <div class="col-4"></div>
        <div class="col-4">
          <q-input v-model="searchInput" label="Suche" placeholder="Name, Tags, Typ.."/>
        </div>
        <div class="col-4"></div>

      </div>
      <div class="row">
        <div id="graph" class="col"/>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>

import axios from 'axios';
import {NodeObject} from 'force-graph';
import {Ref, ref, UnwrapRef, watch} from 'vue';
import ForceGraph3D from '3d-force-graph';

const remoteAddress = `http://${process.env.REMOTE_IP}:${process.env.REMOTE_PORT}/`
const detailsDrawer = ref(false);
const detailsNode: Ref<UnwrapRef<NodeObject>> | Ref<UnwrapRef<null>> = ref(null);
const searchInput: Ref<UnwrapRef<string>> = ref('');
const drawerLeft = ref(false);
const miniState = ref(true)

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

  return ForceGraph3D()(element)
    .graphData(gData)
    .warmupTicks(15)
    .linkDirectionalParticles(1)
    .nodeRelSize(NODE_R)
    .linkWidth(2)
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
    .linkWidth(link => highlightLinks.has(link) ? 5 : 2)
    .linkDirectionalParticles(4)
    .linkDirectionalParticleWidth(link => highlightLinks.has(link) ? 8 : 4)
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

  // return graph;
}
</script>
