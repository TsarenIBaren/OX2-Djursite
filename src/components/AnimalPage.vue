<script setup>
import { ref, onMounted } from 'vue';
import { Contents, Image } from '/src/assets/scripts/resourceApi.js';

const pages = ref({});

onMounted(async () => {
    const homepage = await(Contents(['TMF', 'info', 'homepage']));
    pages.value[''] = homepage[0][0];

    const contents = await Contents(['TMF', 'animal', 'info']);
    for (let content of contents) {
        let contentImage = await Image(content[1]);
        pages.value[contentImage[1]] = content[0];
    };
});

const props = defineProps(['page']);
</script>
<template>
    <div id="page" v-html="pages[page]" />
</template>

<style scoped>
#page :deep(img) {
    height: auto;
}

#page :deep(h2) {
    text-align: center;
}
</style>