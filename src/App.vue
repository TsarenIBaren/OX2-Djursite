<script setup>
import { ref, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import AnimalSidebar from './components/AnimalSidebar.vue';
import AnimalPage from './components/AnimalPage.vue';
import OutdoorActivites from './components/OutdoorActivites.vue';
import { Image, Images } from '/src/assets/scripts/resourceApi.js';

const currentPage = ref('');
function PageTo(page) {
  currentPage.value = page;
};

const logo = ref(null);
const bg = ref(null);

const mobileBreakpoint = 768;
const mobile = ref(window.innerWidth < mobileBreakpoint);

window.addEventListener('resize', () => {
  mobile.value = window.innerWidth < mobileBreakpoint;
});

document.addEventListener('mousemove', (e) => {
  const background = document.getElementById('bg');
  const amount = 100;

  if (!mobile.value) {
    background.style.left = `${-amount-(e.clientX/window.innerWidth*amount)}px`;
    background.style.top = `${-amount-(e.clientY/window.innerHeight*amount)}px`;
    background.style.right = `${-amount+(e.clientX/window.innerWidth*amount)}px`;
    background.style.bottom = `${-amount+(e.clientY/window.innerHeight*amount)}px`;

  } else {
    background.style.left = '';
    background.style.top = '';
    background.style.right = '';
    background.style.bottom = '';
  };
});

onMounted(async () => {
  bg.value = await Images(['TMF','background']);
  logo.value = await Images(['TMF','ox2','logo']);
  logo.value = logo.value[0][0];
});
</script>
<template>
  <div class="cover" id="bg" :style="bg ? `background-image: url(${bg[0][0]});` : ''" />
  <div class="cover" id="fg" />
  <div id="mainwrapper">
    <header>
      <nav>
        <div @click="PageTo('')"><img id="logo" :src="logo" height="50px" /></div>
      </nav>
    </header>
    <div id="contentwrapper">
        <AnimalSidebar :mobile="mobile" @pageto="(e) => {PageTo(e);}" />
        <div id="infobox" class="content box">
          <AnimalPage :page="currentPage" />
        </div>
    </div>
    <div class="content box">
      <OutdoorActivites />
    </div>
  </div>
</template>

<style scoped>
.cover {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

#bg {
  background-size: cover;
  background-position: center bottom;
}

#fg {
  background-color: hsla(0, 0%, 50%, 0.2);
}

nav {
  padding: 0.5em;
  display: flex;
  border-radius: 0.5em;
  border-bottom: 0.25em solid white;
  margin-bottom: 1.5em;
}

.box {
  border-radius: 0.5em;
  padding: 0.5em;
  margin: 0.5em;
}

#mainwrapper {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  max-width: 1280px;
}

#contentwrapper {
  display: flex;
  flex-wrap: wrap;
}

.content {
  background-color: hsla(0, 0%, 50%, 0.5);
  border: 0.25em solid hsl(0, 0%, 100%);
  position: relative;
  color: white;
  overflow: hidden;
}

#infobox {
  flex-basis: 50%;
  flex-grow: 1;
}

#logo {
  transition: transform 0.125s ease-in-out;
}

#logo:hover {
  transform: scale(105%);
}
</style>
