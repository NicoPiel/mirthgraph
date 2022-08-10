<template>
  <q-page class="items-center justify-evenly">
    <graph-component2-d/>
  </q-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import GraphComponent2D from 'components/GraphComponent2D.vue';

export default defineComponent({
  name: 'IndexPage',
  components: {GraphComponent2D},
  setup() {
    return {};
  }
});
</script>
