<template>
  <div id="graph"/>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import axios from 'axios';
import {useQuasar} from 'quasar';
import ForceGraph from 'force-graph';

export default defineComponent({
  name: 'GraphComponent',
  props: {},
  setup() {
    axios.get('http://localhost:3000/', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
      }
    }).then((response) => {
      let gData = response.data;

      if (document.getElementById('graph')) {
        const el = document.getElementById('graph')

        const dashLen = 6;
        const gapLen = 8;

        const Graph = ForceGraph()(el!)
          .linkDirectionalParticles(1)
          .graphData(gData)
          .linkWidth(2)
          .linkLineDash(link => !link.enabled && [dashLen, gapLen])
          .nodeAutoColorBy(gData.nodes.val)
          .linkAutoColorBy(gData.links.group)
      }
    }).catch((error) => {
      console.error(error);
    })
  },
});
</script>
