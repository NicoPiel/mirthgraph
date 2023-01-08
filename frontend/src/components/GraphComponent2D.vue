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
              <q-btn @click="forceReload(environment)" to="/" v-ripple>Force Reload</q-btn>
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
              icon="local_offer"
              label="Tags"
            >
              <q-list bordered separator>
                <q-item v-for="(tag, index) in detailsNode.tags" :key="index">
                  <div class="column">
                    <div class="row">
                      {{ tag }}
                    </div>
                  </div>
                </q-item>
              </q-list>
            </q-expansion-item>
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
      <div class="row full-width full-height">
        <div id="graph" class="col"/>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>

import axios from 'axios';
import ForceGraph, {ForceGraphInstance, LinkObject, NodeObject} from 'force-graph';
import {Ref, ref, toRaw, UnwrapRef, watch} from 'vue';
import * as d3 from 'd3-force';

const remoteAddress = `${process.env.REMOTE_IP}:${process.env.REMOTE_PORT}/`
const detailsDrawer = ref(false);
const detailsNode: Ref<UnwrapRef<NodeObject>> | Ref<UnwrapRef<null>> = ref(null);
const searchInput: Ref<UnwrapRef<string>> = ref('');
const drawerLeft = ref(false);
const miniState = ref(true);
const environment = ref('DATA_PRODUCTION');
const isDetailView = ref(false);
let graphRef: ForceGraphInstance | null = null;

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
  }).then((response) => makePage(response, null)).catch((error) => console.error(error))
}

function forceReload(serverEnv: string) {
  axios.post(remoteAddress + 'graphs/force', {
    data: serverEnv,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*'
    }
  }).then((response) => makePage(response)).catch((error) => console.error(error))
}

function makePage(response: any = null, customGData: any = null) {
  let gData;

  if (customGData) {
    gData = customGData;
    isDetailView.value = true;
  } else if (props.gData) {
    gData = props.gData;
    isDetailView.value = false;
  } else if (response.data) {
    gData = response.data;
    isDetailView.value = false;
  } else {
    console.error('No data');
  }

  const graphElement = document.getElementById('graph')

  if (graphElement) {
    if (!graphRef) graphRef =
      constructGraph(
        graphElement,
      )

    reloadGraph(gData,
      -30,
      30,
      false,
      20);
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

  const highlightLinksSet = new Set<LinkObject>();
  const highlightNodesSet = new Set(Array.from(searchHighlightNodes));

  highlightLinksSet.clear();
  highlightNodesSet.clear();

  searchHighlightNodes.forEach((node: any) => {
    if (node.neighbors && node.links) {
      node.neighbors.forEach((neighbor: NodeObject) => {
        highlightNodesSet.add(neighbor);
      })

      node.links.forEach((link: LinkObject) => {
        highlightNodesSet.add(link.source);
        highlightNodesSet.add(link.target);
        highlightLinksSet.add(link);
      })
    }
  })

  const newGData = {
    nodes: Array.from(highlightNodesSet),
    links: Array.from(highlightLinksSet),
  }

  makePage(null, newGData);
}

const dashLen = 6;
const gapLen = 8;

const highlightNodes = new Set();
const highlightLinks = new Set();
const searchHighlightNodes = new Set();
let hoverNode: NodeObject | null = null;

let NODE_R = 4;
let showNames = false;

function reloadGraph(gData: any, centerManyBodyStrength: number, forceCollideStrength: number, zoomToFit = false, engineTicksInSeconds: number) {
  searchHighlightNodes.clear();

  // console.log(gData);

  if (!isDetailView.value) {
    // cross-link node objects
    gData.links.forEach((link: { source: string; target: string; }) => {
      const a = gData.nodes.find((node: NodeObject) => node.id == link.source);
      const b = gData.nodes.find((node: NodeObject) => node.id == link.target);

      if (!a) console.error(`Couldn't find source ${link.source}`);
      if (!b) console.error(`Couldn't find target ${link.target}`);

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

  let selfLoopLinks = {};
  let sameNodesLinks = {};
  const curvatureMinMax = 0.5;

  // 1. assign each link a nodePairId that combines their source and target independent of the links direction
  // 2. group links together that share the same two nodes or are self-loops
  gData.links.forEach((link: LinkObject) => {
    link.nodePairId = link.source <= link.target ? (link.source + '_' + link.target) : (link.target + '_' + link.source);
    let map = link.source === link.target ? selfLoopLinks : sameNodesLinks;
    if (!map[link.nodePairId]) {
      map[link.nodePairId] = [];
    }
    map[link.nodePairId].push(link);
  });

  // Compute the curvature for self-loop links to avoid overlaps
  Object.keys(selfLoopLinks).forEach(id => {
    let links = selfLoopLinks[id];
    let lastIndex = links.length - 1;
    links[lastIndex].curvature = 1;
    let delta = (1 - curvatureMinMax) / lastIndex;
    for (let i = 0; i < lastIndex; i++) {
      links[i].curvature = curvatureMinMax + i * delta;
    }
  });

  // Compute the curvature for links sharing the same two nodes to avoid overlaps
  Object.keys(sameNodesLinks).filter(nodePairId => sameNodesLinks[nodePairId].length > 1).forEach((nodePairId: string) => {
    let links = sameNodesLinks[nodePairId];
    let lastIndex = links.length - 1;
    let lastLink = links[lastIndex];
    lastLink.curvature = curvatureMinMax;
    let delta = 2 * curvatureMinMax / lastIndex;
    for (let i = 0; i < lastIndex; i++) {
      links[i].curvature = -curvatureMinMax + i * delta;
      if (lastLink.source !== links[i].source) {
        links[i].curvature *= -1; // flip it around, otherwise they overlap
      }
    }
  });

  if (graphRef) {
    const centerForce = d3.forceManyBody();
    centerForce.strength(centerManyBodyStrength);

    graphRef.graphData(gData)
      .nodeRelSize(NODE_R) // Node size
      .linkCurvature('curvature') // Activates link curvature
      .nodeVal((node) => node.neighbors ? Math.sqrt(node.val * node.neighbors.length) : node.val) // Changes node size according to their value
      .linkDirectionalArrowLength((link) => highlightLinks.has(link) ? 15 : 9) // Activates arrows in links
      .linkDirectionalArrowRelPos(.8) // Sets position of arrows
      .linkLineDash(link => !link.enabled && [dashLen, gapLen]) // Dashes certain links
      .linkLabel((link) => link.group) // Sets link label
      .nodeAutoColorBy(node => node.group) // Colors nodes
      .linkAutoColorBy(link => link.group) // Colors links
      .onEngineTick(() => { // Happens every frame
        watch(searchInput, async (newString, oldString) => {
          searchHighlightNodes.clear();
          if (newString) {
            const results = await gData.nodes.filter((node: NodeObject) => {
              let result = false;

              if (node.name.toLowerCase().search(newString.toLowerCase()) > -1) result = true;

              if (node.tags) {
                node.tags.forEach((tag: string) => {
                  if (tag.toLowerCase().search(newString.toLowerCase()) > -1) result = true;
                })
              }

              return result;
            });

            results.forEach((result: NodeObject) => {
              searchHighlightNodes.add(result);
            })
          }
        });

      })
      // Happens whenever a node is hovered over
      .onNodeHover((node, previousNode) => {
        highlightNodes.clear();
        highlightLinks.clear();

        if (node) {
          highlightNodes.add(node);
          if (node.neighbors) {
            node.neighbors.forEach((neighbor: NodeObject) => {
              highlightNodes.add(neighbor);
            })
          }
          if (node.links) node.links.forEach(link => highlightLinks.add(link));
        }

        hoverNode = node || null;
      })
      // Happens whenever a link is hovered over
      .onLinkHover(link => {
        highlightNodes.clear();
        highlightLinks.clear();

        if (link) {
          highlightLinks.add(link);
          highlightNodes.add(link.source);
          highlightNodes.add(link.target);
        }
      })
      // Never stops drawing (because of selection)
      .autoPauseRedraw(false) // keep redrawing after engine has stopped
      // Sets link width
      .linkWidth(link => highlightLinks.has(link) ? 3 : 1)
      // Sets particles in links
      .linkDirectionalParticles(4)
      // Sets size of particles
      .linkDirectionalParticleWidth(link => highlightLinks.has(link) ? 7 : 3)
      // Render control for nodes based on certain conditions
      .nodeCanvasObjectMode(node => {
        if (showNames) return 'replace';
        else if (searchHighlightNodes.has(node) || highlightNodes.has(node)) return 'before';
        else if (!(searchHighlightNodes.has(node) || highlightNodes.has(node))) return 'after';
        else return undefined;
      })
      // Renders certain nodes differently than the rest
      .nodeCanvasObject((node, ctx, globalScale) => {
        if (node) {
          if (!showNames) {
            if (!(searchHighlightNodes.has(node) || highlightNodes.has(node))) {
              // add default ring
              ctx.beginPath();
              ctx.arc(node.x!, node.y!, node.neighbors ? NODE_R * Math.sqrt(Math.sqrt(node.val * node.neighbors.length)) : NODE_R * 2.0, 0, 2 * Math.PI, false);
              ctx.fillStyle = 'black';
              ctx.fill();
            } else {
              // add ring just for highlighted nodes
              ctx.beginPath();
              ctx.arc(node.x!, node.y!, node.neighbors ? NODE_R * Math.sqrt(Math.sqrt(node.val * node.neighbors.length) * 2) : NODE_R * 2.0, 0, 2 * Math.PI, false);
              ctx.fillStyle = searchHighlightNodes.has(node) || (node === hoverNode) ? 'red' : 'orange';
              ctx.fill();
            }
          } else {
            // Show name as node
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
      // Disable displacement of nodes
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
      // Enlarges link interaction collider
      .linkHoverPrecision(8)
      .onZoom(({k, x, y}) => {
        // k = zoom level
        showNames = k > 2.4;
      })
      .d3Force('collide', d3.forceCollide(forceCollideStrength))
      .d3Force('charge', centerForce)
  }
}

function constructGraph(element: HTMLElement) {
  return ForceGraph()(element).graphData({nodes: [], links: []});
}
</script>
