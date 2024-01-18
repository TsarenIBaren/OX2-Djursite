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
  <div id="infobox" class="content box">
    <AnimalPage :page="currentPage" />
  </div>
</template>

<style scoped>
#infobox {
  flex-basis: 50%;
  flex-grow: 1;
}
</style>