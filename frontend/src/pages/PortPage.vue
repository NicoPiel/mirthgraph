<template>
  <div></div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { log } from 'console';

const remoteAddress = `http://${process.env.REMOTE_IP}:${process.env.REMOTE_PORT}/`;

axios
  .get(remoteAddress + 'ports', {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    },
  })
  .then((response) => {
    console.log(response);
    return response;
  });
</script>

<style scoped></style>
