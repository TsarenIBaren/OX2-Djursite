<script setup>
import { ref, onMounted } from 'vue';
import { Contents, Image } from '/src/assets/scripts/resourceApi.js';

const pages = ref({});

onMounted(async () => {
    const homepage = await(Contents(['TMFHomeInfo']));
    pages.value[''] = homepage[0].content;

    const posts = await Contents(['TMFAnimalInfo']);
    for (let post of posts) {
        let associatedImage = await Image(post.featured);
        if (associatedImage) {
            pages.value[associatedImage[1]] = post.content;

        } else {
            console.log(`Skipping ${associatedImage}`);
        };
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