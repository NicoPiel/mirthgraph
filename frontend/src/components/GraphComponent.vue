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
          .nodeAutoColorBy(node => node.val)
          .linkAutoColorBy(link => link.group)
          .nodeCanvasObject((node, ctx, globalScale) => {
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
          })
      }
    }).catch((error) => {
      console.error(error);
    })
  },
});
</script>
