<template>
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
  <Suspense>
    <template #default>
      <PortsTableComponent :environment="environment" :key="environment"/>
    </template>
    <template #fallback>
      <q-circular-progress
        indeterminate
        size="50px"
        :thickness="0.22"
        color="lime"
        track-color="grey-3"
        class="q-ma-md"
      />
    </template>
  </Suspense>
</template>

<script lang="ts" setup>
import PortsTableComponent from 'components/PortsTableComponent.vue';
import {ref} from 'vue';

const environment = ref('DATA_PRODUCTION')

function changeEnvironment(newEnv: string) {
  environment.value = newEnv;
}
</script>
