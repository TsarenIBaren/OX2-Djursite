<script setup>
import { ref, onMounted } from 'vue';
import AnimalSidebar from '../components/AnimalSidebar.vue';
import AnimalPage from '../components/AnimalPage.vue';

const currentPage = ref('');
function PageTo(page) {
  currentPage.value = page;
};

const mobileBreakpoint = 768;
const mobile = ref(window.innerWidth < mobileBreakpoint);

window.addEventListener('resize', () => {
  mobile.value = window.innerWidth < mobileBreakpoint;
});
</script>

<template>
  <AnimalSidebar :mobile="mobile" @pageto="(e) => {PageTo(e);}" />
  <div id="infobox" class="content box" :style="mobile ? 'flex-wrap:wrap;' : ''">
    <AnimalPage :page="currentPage" />
    <div>
      <img src="https://www.natur.ax/wp-content/uploads/2021/08/mockelo-havsbad.jpg" width=100%>
      <p>Very cool image caption and useful information.</p>
      <p>Did you know that over any% of the population missed this critical information on the side here. Are people really that lazy? Yes, probably.</p>
    </div>
  </div>
</template>

<style scoped>
#infobox {
  flex-basis: 50%;
  flex-grow: 1;

  display: flex;
}

#infobox > * {
  font-size: x-large;
  padding: 0.75em;
  margin: 0;
}
</style>