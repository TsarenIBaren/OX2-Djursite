<script setup>
import { ref, onMounted } from 'vue';
import { Contents, Image } from '/src/assets/scripts/resourceApi.js';

const props = defineProps(['page']);
const pages = ref({});

Contents((data) => {
    Image((image) => {
        if (image) {
            pages.value[''] = [data[0].content, image[0]];
        };
    }, data[0].featured);
}, ['tmfhomesideinfo']);

const animals = ['Fish', 'Sheep', 'Insects', 'Birds', 'Bees'];
for (let animal of animals) {
    Contents((data) => {
        Image((image) => {
            if (image) {
                pages.value[animal] = [data[0].content, image[0]];
            };
        }, data[0].featured);
    }, [`tmf${animal.toLowerCase()}sideinfo`]);
};

</script>
<template>
    <div v-if="pages[page]" style="font-size:large; width:fit-content;">
        <img :src="pages[page][1]" width=200em>
        <div v-html="pages[page][0]" />
    </div>
</template>