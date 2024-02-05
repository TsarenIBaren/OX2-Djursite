<script setup>
import { ref, onMounted } from 'vue';
import { Contents, Image } from '/src/assets/scripts/resourceApi.js';

const props = defineProps(['page']);
const pages = ref({});

Contents((data) => {
    pages.value[''] = data[0].content;

},['tmfhomeinfo']);

Contents((data) => {
    for (let post of data) {
        Image((associatedImage => {
            if (associatedImage) {
                pages.value[associatedImage[1]] = post.content;

            } else {
                console.log(`Skipping ${associatedImage}`);
            };
        }), post.featured);
    };
} ,['tmfanimalinfo']);
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