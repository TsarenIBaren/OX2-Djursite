<script setup>
import { ref, onMounted } from 'vue';
import { Contents, Image } from '/src/assets/scripts/resourceApi.js';

const page = ref(null);

onMounted(async () => {
    const data = await(Contents(['TMF', 'activities']));
    page.value = data[0][0];
});
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