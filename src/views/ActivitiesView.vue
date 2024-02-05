<script setup>
import { ref, onMounted } from 'vue';
import { Contents } from '/src/assets/scripts/resourceApi.js';

const page = ref(null);
Contents((data) => {
  page.value = data[0].content;
}, ['tmfactivitiespage']);
</script>

<template>
  <div id="temp" class="content box" v-html=page>
  </div>
</template>

<style scoped>
#temp :deep(*) {
    text-align: center;
}
</style>