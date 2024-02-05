<script setup>
import { ref, onMounted } from 'vue';
import AnimalSidebar from '../components/AnimalSidebar.vue';
import AnimalPage from '../components/AnimalPage.vue';
import AnimalSideinfo from '../components/AnimalSideinfo.vue';

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
    <div class="content box" style="max-width:10em;">
      <AnimalSideinfo :page="currentPage" />
    </div>
  </div>
</template>

<style scoped>
#wrapper {
  display: flex;
}
</style>