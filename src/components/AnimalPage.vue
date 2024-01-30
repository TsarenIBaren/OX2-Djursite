<script setup>
import { ref, onMounted } from 'vue';
import { Contents, AsyncImage } from '/src/assets/scripts/resourceApi.js';

const props = defineProps(['page']);
const pages = ref({});

onMounted(async () => {
    const homepage = await(Contents(['tmfhomeinfo']));
    pages.value[''] = homepage[0].content;

    const posts = await Contents(['tmfanimalinfo']);
    for (let post of posts) {
        AsyncImage((associatedImage => {
            if (associatedImage) {
                pages.value[associatedImage[1]] = post.content;

            } else {
                console.log(`Skipping ${associatedImage}`);
            };
        }), post.featured);
    };
});
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