<template>
  <Suspense>
    <template #default>
      <PortsTableComponent/>
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
import PortsTableComponent from 'components/PortsTableComponent.vue';</script>
