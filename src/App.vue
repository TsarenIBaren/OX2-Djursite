<script setup>
import { ref, onMounted } from 'vue';
import { RouterView, RouterLink } from 'vue-router';
import { Image, Images } from '/src/assets/scripts/resourceApi.js';
import * as foreground from '/src/assets/scripts/foreground.js';
import * as fg2 from '/src/assets/scripts/fg2.js';

const logo = ref(null);
const bg = ref(null);
const en = ref(null);
const sv = ref(null);

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
    background.style.left = `${-amount-(e.clientX/window.innerWidth*amount-amount/2)}px`;
    background.style.top = `${-amount-(e.clientY/window.innerHeight*amount-amount/2)}px`;
    background.style.right = `${-amount+(e.clientX/window.innerWidth*amount-amount/2)}px`;
    background.style.bottom = `${-amount+(e.clientY/window.innerHeight*amount-amount/2)}px`;

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

  en.value = await Image(589);
  en.value = en.value[0];
  sv.value = await Image(590);
  sv.value = sv.value[0];

  foreground.Play();
});

function SwitchLang(language) {
  document.cookie = `lang=${language}`;
  location.reload();
};

</script>
<template>
  <div class="cover" id="bg" :style="bg ? `background-image: url(${bg[0]});` : ''">
    <canvas id="fg-canvas" />
  </div>
  <div class="cover" id="fg" />
  <div id="mainwrapper">
    <header>
      <nav :class="mobile ? 'nav-mobile' : ''">
        <RouterLink class="nav-button" to="/"><img id="logo" :src="logo" height="50px" /></RouterLink>
        <RouterLink class="nav-button" to="/">Home</RouterLink>
        <RouterLink class="nav-button" to="/activities">Activities</RouterLink>
        <RouterLink class="nav-button" to="/live">Live</RouterLink>
        <div>
          <img @click="SwitchLang('en')" :src="en" alt="en" class="flag-icon">
          <img @click="SwitchLang('sv')" :src="sv" alt="sv" class="flag-icon">
        </div>  
      </nav>
    </header>
    <div id="contentwrapper">
      <RouterView />
    </div>
  </div>
</template>

<style>
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

nav > * {
  margin-right: 1em;
}

.nav-mobile > * {
  flex-basis: 100%;
}

.nav-button {
  margin: 0;
  font-size: 2em;
  color: white;
  text-decoration: none;
  margin-right: 1em;
  transition: transform 0.125s ease-in-out;
}

.nav-button:hover {
  text-decoration: underline;
  transform: scale(105%);
}

.flag-icon {
  height: 3em;
  margin-right: 0.5em;
  width: auto;
  transition: transform 0.125s ease-in-out;
}

.flag-icon:hover {
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
