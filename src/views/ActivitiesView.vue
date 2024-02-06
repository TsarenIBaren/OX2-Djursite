<script setup>
import { ref, onMounted } from 'vue';
import { Contents, Image } from '/src/assets/scripts/resourceApi.js';

const box1 = ref(null);
const box2 = ref(null);
const trailmap = ref(null);

Image((image) => {
    if (image) {
        trailmap.value = image[0];
    };
}, 1026);

Contents((data) => {
  box1.value = data[0].content;
}, ['tmfactivitiespage']);

Contents((data) => {
  box2.value = data[0].content;
}, ['tmftrailinfo']);
</script>

<template>
  <div id="temp" class="content box" v-html=box1 />
  <div id="trailmap">
    <div id="temp" class="content box" v-html=box2 />
    <div v-if="trailmap" class="content box" style="overflow: unset;">
      <img  :src="trailmap" height=400em;>
    </div>
  </div>
</template>

<style scoped>
#temp :deep(*) {
    text-align: center;
}

#trailmap {
  display: flex;
}
</style>