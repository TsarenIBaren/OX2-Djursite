<script setup>
import { ref, onMounted } from 'vue';
import { Image, Images } from '/src/assets/scripts/resourceApi.js';

const props = defineProps(['mobile']);
const animals = ref([]);

onMounted(async () => {
  animals.value = await Images(['TMF','animal']);

  document.addEventListener('mousemove', (e) => {
    const elem = document.elementFromPoint(e.clientX, e.clientY);
    let labelElem;

    if (elem?.classList?.contains('sb-label')) {
      labelElem = elem;
      labelElem?.classList.add('sb-label-active');
    };

    if (elem?.parentElement?.classList?.contains('category')) {
      if (elem.tagName == 'IMG') {
        labelElem = elem.parentElement.children[0].children[0];
        labelElem?.classList.add('sb-label-active');
      };
    };

    for (let elem of document.getElementsByClassName('sb-label-active')) {
      if (elem !== labelElem) {
        elem.classList.remove('sb-label-active');
        elem.style.width = '';
      };
    };

    if (labelElem) {
      const computedStyle = getComputedStyle(labelElem);
      const labelElemWidth =
        labelElem.scrollWidth -
        parseFloat(computedStyle.paddingLeft) -
        parseFloat(computedStyle.paddingRight)
      labelElem.style.width = `${labelElemWidth}px`;
    };
  });
});
</script>

<template>
  <div
    id="sidebar"
    class="box"
    :style="
      props.mobile ? 'display: flex; flex-wrap: wrap; flex-basis:100%;' : 'padding-bottom: 1.5em;'
    "
  >
    <div
      v-for="animal in animals"
      @click="$emit('pageto', animal[1])"
      class="category"
      :class="props.mobile ? 'compact' : 'wide'"
    >
      <div v-if="!props.mobile">
        <div class="sb-label">{{ animal[1] }}</div>
      </div>
      <img :src="animal[0]" />
    </div>
  </div>
</template>

<style scoped>
#sidebar {
  justify-content: center;
}

.category {
  position: relative;
  margin: 0.25em;
  z-index: 100;
}

.wide {
  display: flex;
  flex-basis: 100%;
  height: 5em;
}

.wide:nth-child(even) {
  margin-left: 6em;
}

.compact {
  font-size: small;
}

.compact :deep(*) {
  font-size: inherit;
}

.category > img {
  height: 6em;
  width: 6em;
  z-index: 102;
  transition: transform 0.125s ease-in-out;
}

.category > img:hover {
  transform: scale(105%);
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
  white-space: nowrap;
  overflow: hidden;
  width: 0px;
  transition:
    width 0.125s ease-out,
    padding-left 0.25s ease-in;
}
.sb-label-active {
  padding-left: 3.5em;
}
</style>