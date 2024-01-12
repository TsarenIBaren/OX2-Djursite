<script setup>
import { ref, onMounted } from 'vue';
import { RouterView } from 'vue-router'
import AnimalSidebar from './components/AnimalSidebar.vue';
import { Images } from '/src/assets/scripts/resourceApi.js';

const logo = ref(null);
const bg = ref(null);

const mobileBreakpoint = 768;
const mobile = ref(window.innerWidth < mobileBreakpoint);

window.addEventListener('resize', () => {
  mobile.value = window.innerWidth < mobileBreakpoint;
});

onMounted(async () => {
  bg.value = await Images(158);
  logo.value = await Images(183);
  logo.value = logo.value[0][0]
})
</script>
<template>
  <div class="cover" id="bg" :style="bg ? `background-image: url(${bg[0][0]});` : ''" />
  <div class="cover" id="fg" />
  <div id="mainwrapper">
    <header>
      <nav>
        <img :src="logo" height="50px">
      </nav>
    </header>
    <div id="contentwrapper">
      <AnimalSidebar :mobile="mobile"/>
      <main id="content" class="box">
        BÄBÄ VIT LAMMET
        <br>
        <iframe src="https://www.youtube.com/embed/w9uJg68CV4g" title="Live Video"></iframe>
        <RouterView />
      </main>
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

#content {
  background-color: hsl(0, 0%, 100%);
  position: relative;
  flex-grow: 1;

}
</style>