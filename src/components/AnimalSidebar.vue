<script setup>
import { ref, onMounted } from 'vue';
import { Images } from '/src/assets/scripts/resourceApi.js';

const props = defineProps(['mobile']);
const animals = ref([]);

onMounted(async () => {
    animals.value = await Images(66);

    document.addEventListener('mousemove',(e) => {
        const elem = document.elementFromPoint(e.clientX, e.clientY);
        let labelElem;

        if (elem.classList.contains('sb-label')) {
            labelElem = elem;   
            labelElem?.classList.add('sb-label-active');
        }

        if (elem.classList.contains('category')) {
            labelElem = elem.children[0].children[0]
            labelElem?.classList.add('sb-label-active');
        }

        if (elem.parentElement?.classList?.contains('category')) {
            labelElem = elem.parentElement.children[0].children[0]
            labelElem?.classList.add('sb-label-active');
        }

        for (let elem of document.getElementsByClassName('sb-label-active')) {
            if (elem !== labelElem) {
                elem.classList.remove('sb-label-active');
            }
        }
    });
});
</script>

<template>
    <div id="sidebar" class="box" :style="props.mobile ? 'display: flex; flex-wrap: wrap; flex-basis:100%;' : 'margin-right: 1em; padding-bottom: 1.5em;'">
        <RouterLink v-for="animal in animals" to="/" class="category" :class="props.mobile ? 'compact' : 'wide'">
            <div v-if="!props.mobile">
                <div class="sb-label">{{ animal[1] }}</div>
            </div><img :src="animal[0]">
        </RouterLink>
    </div>
</template>

<style scoped>
#sidebar {
    justify-content: center;
}

.category {
    position: relative;
    margin: 0.25em;
    transition: transform 0.125s ease-in-out;
    z-index: 100;
    
}

.category:hover {
    transform: scale(105%);
}

.wide {
    display: flex;
    flex-basis: 100%;
    height: 5em;
}

.wide:nth-child(even) {
    margin-left: 6em;
}

.category > img {
    height: 6em;
    width: 6em;
    z-index: 102;
}

.category > div {
    position: absolute;
    top: 0;
    left: 3em;
    height: 6em;
    display: flex;
    align-items: center;
    z-index: 101;
}

.sb-label {
    color: black;
    text-decoration: none;
    background-color: white;
    padding: 0.5em;
    border-radius: 0.25em;
    outline: 0.125em solid hsl(0, 0%, 95%);
    white-space: nowrap;
    overflow: hidden;
    width: 0px;
    transition: width 0.25s ease-in-out, padding-left 0.25s ease-in-out;
}
.sb-label-active {
    padding-left: 3.5em;
    width: fit-content;
}
</style>