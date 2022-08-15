<template>
  <div class="q-pa-md">
    <q-drawer
      v-model="drawerLeft"
      :width="250"
      :breakpoint="500"
      show-if-above
      :mini="miniState"
      @click.capture="drawerClick"
      overlay
      bordered
      class="bg-grey-3"
    >
      <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -50px">
        <q-btn
          dense
          round
          unelevated
          color="accent"
          icon="chevron_left"
          @click="miniState = true"
        />
      </div>
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item>
            <q-item-section avatar>
              <q-icon name="dns"/>
            </q-item-section>
            <q-item-section>
              <q-btn-dropdown
                split
                label="Umgebung"
              >
                <q-list>
                  <q-item clickable v-close-popup @click="changeEnvironment('DATA_PRODUCTION')">
                    <q-item-section>
                      Produktionsumgebung
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="changeEnvironment('DATA_DICOM')">
                    <q-item-section>
                      DICOM-Server
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="changeEnvironment('DATA_TEST')">
                    <q-item-section>
                      Testumgebung
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </q-item-section>
          </q-item>
          <q-separator/>
          <q-item>
            <q-item-section avatar>
              <q-icon name="3d_rotation"/>
            </q-item-section>
            <q-item-section>
              <q-btn to="/3d" v-ripple>3D Version (WIP)</q-btn>
            </q-item-section>
          </q-item>
          <q-separator/>
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
      :width="500"
      :breakpoint="500"
      overlay
      bordered
      class="bg-grey-3"
      side="right"
    >
      <q-scroll-area class="fit">
        <div v-if="detailsNode">
          <q-list bordered separator>
            <q-item>
              <q-btn @click="showDetailsView(detailsNode)">Detail-Ansicht</q-btn>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon name="fingerprint"></q-icon>
              </q-item-section>
              <q-item-section>
                ID: {{ detailsNode.id }}
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon name="badge"></q-icon>
              </q-item-section>
              <q-item-section>
                {{ detailsNode.name }}
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon name="workspaces"></q-icon>
              </q-item-section>
              <q-item-section>
                Gruppe: {{ detailsNode.group }}
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon name="description"></q-icon>
              </q-item-section>
              <q-item-section>
                Beschreibung: <p>{{ detailsNode.description }}</p>
              </q-item-section>
            </q-item>
            <q-expansion-item
              expand-separator
              icon="share"
              label="Verbindungen"
            >
              <q-list bordered separator>
                <q-item v-for="(neighbor, index) in detailsNode.neighbors" :key="index">
                  <div class="column">
                    <div class="row">
                      ID: {{ neighbor.id }}
                    </div>
                    <div class="row">
                      {{ neighbor.name }}
                    </div>
                    <div class="row">
                      Gruppe: {{ neighbor.group }}
                    </div>
                  </div>
                </q-item>
              </q-list>
            </q-expansion-item>
          </q-list>
        </div>
      </q-scroll-area>
    </q-drawer>
    <div class="q-pa-md">
      <div class="row col-1">
        <div class="col-2"/>
        <div class="col-2">
          <q-btn v-if="isDetailView" @click="loadPage(environment)">Zurück zur Übersicht</q-btn>
        </div>
        <div class="col-3">
          <q-input v-model="searchInput" label="Suche" placeholder="Name, Tags, Typ..">
            <template v-slot:after>
              <q-btn type="submit" @click="searchSubmit" color="primary">Details anzeigen</q-btn>
            </template>
          </q-input>
        </div>
        <div class="col"/>
      </div>
      <div class="row">
        <div id="graph" class="col"/>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>

import axios from 'axios';
import ForceGraph, {LinkObject, NodeObject} from 'force-graph';
import {Ref, ref, toRaw, UnwrapRef, watch} from 'vue';
import {useRouter} from 'vue-router';
import * as d3 from 'd3-force';

const router = useRouter();

const remoteAddress = `http://${process.env.REMOTE_IP}:${process.env.REMOTE_PORT}/`
const detailsDrawer = ref(false);
const detailsNode: Ref<UnwrapRef<NodeObject>> | Ref<UnwrapRef<null>> = ref(null);
const searchInput: Ref<UnwrapRef<string>> = ref('');
const drawerLeft = ref(false);
const miniState = ref(true);
const environment = ref('DATA_PRODUCTION');
const isDetailView = ref(false);

const props = defineProps([
  'gData',
])

loadPage('DATA_PRODUCTION');

watch(environment, async (value, oldValue, onCleanup) => {
  loadPage(value);
});

function loadPage(serverEnv: string) {
  axios.post(remoteAddress + 'graphs', {
    data: serverEnv,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*'
    }
  }).then((response) => makePage(response)).catch((error) => console.error(error))
}

function forceReload() {
  axios.post(remoteAddress + 'graphs/force', {
    data: 'DATA_PRODUCTION',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*'
    }
  }).then((response) => makePage(response)).catch((error) => console.error(error))
}

function makePage(response: any = null, customGData: any = null, forceManyBodyStrength = -10, forceCollideStrength = 10) {
  let gData;

  if (customGData) {
    gData = customGData;
    isDetailView.value = true;
  } else if (props.gData) {
    gData = props.gData;
    isDetailView.value = false;
  } else {
    gData = response.data;
    isDetailView.value = false;
  }

  if (document.getElementById('graph')) {
    const el = document.getElementById('graph')

    if (el) constructGraph(gData, el, forceManyBodyStrength, forceCollideStrength);
  }
}

function drawerClick(e: any) {
  // if in "mini" state and user
  // click on drawer, we switch it to "normal" mode
  if (miniState.value) {
    miniState.value = false

    // we need to stop further propagation as this click is
    // intended for switching drawer to "normal" mode only
    e.stopPropagation()
  }
}

function changeEnvironment(newEnv: string) {
  environment.value = newEnv;
}

function showDetailsView(node: NodeObject) {
  const unwrapped = toRaw(node);

  makePage(null, {
    nodes: [unwrapped, ...unwrapped.neighbors],
    links: unwrapped.links
  });
}

function searchSubmit() {
  isDetailView.value = true;

  const highlightLinks: LinkObject[] = [];
  const highlightNodesArray = Array.from(searchHighlightNodes);

  searchHighlightNodes.forEach((node: any) => {
    if (node.neighbors && node.links) {
      highlightNodesArray.push(...node.neighbors);
      highlightLinks.push(...node.links);
    }
  })

  const newGData = {
    nodes: highlightNodesArray,
    links: highlightLinks,
  }

  console.log(newGData);

  makePage(null, newGData, -1, 1);
}

const searchHighlightNodes = new Set();

function constructGraph(gData: any, element: HTMLElement, centerManyBodyStrength = -10, forceCollideStrength = 10) {
  const dashLen = 6;
  const gapLen = 8;

  const highlightNodes = new Set();
  const highlightLinks = new Set();
  let hoverNode: NodeObject | null = null;

  let NODE_R = 5;
  let showNames = false;

  if (!isDetailView.value) {
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
  }

  const centerForce = d3.forceManyBody();
  centerForce.strength(centerManyBodyStrength);

  const graph = ForceGraph()(element)
    .graphData(gData)
    .cooldownTime(10000)
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
    })
    .onNodeRightClick((node, event) => {
      detailsDrawer.value = true
      detailsNode.value = node;
    })
    .onBackgroundClick((event) => {
      detailsDrawer.value = false
      detailsNode.value = null;
    })
    .linkHoverPrecision(10)
    .onZoom(({k, x, y}) => {
      // k = zoom level
      showNames = k > 2.4;
    })
    .d3Force('collide', d3.forceCollide(forceCollideStrength))
    .d3Force('charge', centerForce)

  graph.onEngineStop(() => {
    graph.zoomToFit(200);
  })
  return graph;
}
</script>
