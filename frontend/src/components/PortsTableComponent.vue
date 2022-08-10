<template>
  <div class="q-pa-md">
    <q-table
      title="Ports"
      :rows="portsData"
      :columns="columns"
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

const remoteAddress = `http://${process.env.REMOTE_IP}:${process.env.REMOTE_PORT}/`;
const pagination = ref({
  rowsPerPage: 0
})
const filter = ref('')

const response = await axios
  .get(remoteAddress + 'ports', {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    },
  });

const portsData = response.data;

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Channel',
    align: 'center',
    field: (row: { host: string, port: string, mode: string, channel: string }) => row.channel,
    sortable: true
  },
  {
    name: 'mode',
    required: true,
    label: 'Modus',
    align: 'center',
    field: (row: { host: string, port: string, mode: string, channel: string }) => row.mode,
    sortable: true
  },
  {
    name: 'port',
    required: true,
    label: 'Belegter Port',
    align: 'center',
    field: (row: { host: string, port: string, mode: string, channel: string }) => row.port,
    sortable: true
  },
  {
    name: 'host',
    required: true,
    label: 'Host-Adresse',
    align: 'center',
    field: (row: { host: string, port: string, mode: string, channel: string }) => row.host,
    sortable: true
  }
];

</script>
