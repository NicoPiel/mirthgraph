<template>
  <q-page class="row items-center justify-evenly">
    <graph-component
      title="Example component"
      active
    ></graph-component>
  </q-page>
</template>

<script lang="ts">
import GraphComponent from 'components/GraphComponent.vue';
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'IndexPage',
  components: {GraphComponent},
  setup() {
    return null;
  }
});
</script>
