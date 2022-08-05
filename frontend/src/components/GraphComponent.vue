<template>
  <div>

  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import * as xml2js from 'xml2js';
import {readFile} from 'fs';

function readDataAndConvert() {
  const parser = new xml2js.Parser();
  readFile(__dirname + '/foo.xml', function (err, data) {
    parser.parseString(data, function (err, result) {
      console.dir(result);
      console.log('Done');
    });
  });
}

export default defineComponent({
  name: 'GraphComponent',
  props: {},
  setup() {
    readDataAndConvert();
    return null;
  },
});
</script>
