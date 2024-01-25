<script setup>
import { ref, onMounted } from 'vue';
import { RouterView, RouterLink } from 'vue-router';
import { Image, Images } from '/src/assets/scripts/resourceApi.js';
import * as foreground from '/src/assets/scripts/foreground.js';

const logo = ref(null);
const bg = ref(null);

const mobileBreakpoint = 768;
const mobile = ref(window.innerWidth < mobileBreakpoint);
let touch = false;

if ('ontouchstart' in window || navigator.maxTouchPoints) {
  touch = true;
};

window.addEventListener('resize', () => {
  mobile.value = window.innerWidth < mobileBreakpoint;
});

document.addEventListener('mousemove', (e) => {
  const background = document.getElementById('bg');
  const amount = 100;

  if (!touch) {
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
  bg.value = await Image(242);
  logo.value = await Image(185);
  logo.value = logo.value[0];
  foreground.Play();

});

</script>
<template>
  <div class="cover" id="bg" :style="bg ? `background-image: url(${bg[0]});` : ''">
    <canvas id="fg-canvas" />
  </div>
  <div class="cover" id="fg" />
  <div id="mainwrapper">
    <header>
      <nav>
        <RouterLink class="nav-button" to="/"><img id="logo" :src="logo" height="50px" /></RouterLink>
        <RouterLink class="nav-button" to="/">Home</RouterLink>
        <RouterLink class="nav-button" to="/activities">Activities</RouterLink>
        <RouterLink class="nav-button" to="/live">Live</RouterLink>
        <div>
          <button @click="changeLanguage('eng')">
            <img src="" alt="English Flag" class="flag-icon">
          </button>
          <button @click="changeLanguage('swe')">
            <img src="" alt="Swedish Flag" class="flag-icon">
          </button>
        </div>
      </nav>
    </header>
    <div id="contentwrapper">
      <RouterView />
    </div>
  </div>
</template>

<style>
.flag-icon {
  width: 1em; 
  height: auto;
}
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
  flex-wrap: wrap;
  border-radius: 0.5em;
  border-bottom: 0.25em solid white;
  margin-bottom: 1.5em;
  align-items: center;
}

.nav-button {
  margin: 0;
  margin-right: 1em;
  font-size: 2em;
  color: white;
  text-decoration: none;
  transition: transform 0.125s ease-in-out;
}

.nav-button:hover {
  text-decoration: underline;
  transform: scale(105%);
}

.box {
  border-radius: 0.5em;
  padding: 1em;
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

#logo {
  transition: transform 0.125s ease-in-out;
}

#logo:hover {
  transform: scale(105%);
}
</style>
