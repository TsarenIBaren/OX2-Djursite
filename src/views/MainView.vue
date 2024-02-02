<script setup>
import { ref, onMounted } from 'vue';
import AnimalSidebar from '../components/AnimalSidebar.vue';
import AnimalPage from '../components/AnimalPage.vue';

const currentPage = ref('');
function PageTo(page) {
  currentPage.value = page;
};

const mobileBreakpoint = 1024;
const mobile = ref(window.innerWidth < mobileBreakpoint);

window.addEventListener('resize', () => {
  mobile.value = window.innerWidth < mobileBreakpoint;
});

onMounted(() => {
  currentPage.value = '';
});
</script>

<template>
  <div id="wrapper" :style="mobile ? 'flex-wrap: wrap;' : ''">
    <AnimalSidebar :mobile="mobile" @pageto="(e) => {PageTo(e);}" />
    <div class="content box">
      <AnimalPage :page="currentPage" />
    </div>
    <div class="content box">
      <img src="https://www.natur.ax/wp-content/uploads/2021/08/mockelo-havsbad.jpg" width=100%;>
      <p>Very cool image caption and useful information.</p>
      <p>Did you know that over any% of the population missed this critical information on the side here. Are people really that lazy? Yes, probably.</p>
    </div>
  </div>
</template>

<style scoped>
#wrapper {
  display: flex;
}
</style>