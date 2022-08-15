<template>
  <div class="q-pa-md">
    <q-table
      title="Ports"
      :rows="portsData"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      :filter="filter"
      style="height: 800px"
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Suche nach Port oder IP">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import {ref} from 'vue';

const props = defineProps([
  'environment',
])

const remoteAddress = `http://${process.env.REMOTE_IP}:${process.env.REMOTE_PORT}/`;
const pagination = ref({
  rowsPerPage: 0
})
const filter = ref('')

const response = await axios
  .post(remoteAddress + 'ports', {
    data: props.environment,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    },
  });

const portsData = response.data;

</script>
