<script setup>
import { ref, onMounted } from 'vue';
import { Contents, Image } from '/src/assets/scripts/resourceApi.js';

const box1 = ref(null);
const box2 = ref(null);
const trailmap = ref(null);

const mobileBreakpoint = 1024;
const mobile = ref(window.innerWidth < mobileBreakpoint);

window.addEventListener('resize', () => {
  mobile.value = window.innerWidth < mobileBreakpoint;
});

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
  <div class="content box" v-html=box1 />
  <div id="trailmap" :style="mobile ? 'flex-wrap:wrap;' : ''">
    <div class="content box" v-html=box2 />
    <div class="content box">
      <img v-if="trailmap" :src="trailmap" style="max-width:100%;">
    </div>
  </div>
</template>

<style scoped>
.content :deep(*) {
  text-align: center;
}

#trailmap {
  display: flex;
}

</style>