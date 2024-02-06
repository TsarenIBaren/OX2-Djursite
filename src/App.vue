<script setup>
import translations from '/src/assets/translations.json';
import { ref, onMounted, watch } from 'vue';
import { RouterView, RouterLink } from 'vue-router';
import { loadingMeta, loading, cookies, Image } from '/src/assets/scripts/resourceApi.js';
import * as fireflies from '/src/assets/scripts/fireflies.js';
import * as snowfall from '/src/assets/scripts/snowfall.js';

const isLoading = ref(loading);
const isLoadingMeta = ref(loadingMeta);

const logo = ref(null);
const bg = ref(null);

const en = ref(null);
const sv = ref(null);
const de = ref(null);
const fi = ref(null);

const time = ref('Day');
const season = ref('Summer');

const mobileBreakpoint = 1024;
const mobile = ref(window.innerWidth < mobileBreakpoint);
let touch = false;
if ('ontouchstart' in window || navigator.maxTouchPoints) {
  touch = true;
};

if (!cookies['lang']) {
  document.cookie = 'lang=en';
  location.reload();
};

window.addEventListener('resize', () => {
  mobile.value = window.innerWidth < mobileBreakpoint;
});

document.addEventListener('mousemove', (e) => {
  sessionStorage.setItem('mouseX', e.clientX);
  sessionStorage.setItem('mouseY', e.clientY);
});

//Fetch background
Image((data) => {
  bg.value = data[0];
}, 242);
//Fetch logo
Image((data) => {
  logo.value = data[0];
}, 185);
//Fetch en icon
Image((data) => {
  en.value = data[0];
}, 632);
//Fetch sv icon
Image((data) => {
  sv.value = data[0];
}, 647);
//Fetch de icon
Image((data) => {
  de.value = data[0];
}, 643);
//Fetch fi icon
Image((data) => {
  fi.value = data[0];
}, 651);

onMounted(async () => {
  setInterval(() => {
    isLoading.value = loading;
    isLoadingMeta.value = loadingMeta;
    MoveBackground();
  });
});

function SwitchLang(language) {
  document.cookie = `lang=${language}`;
  location.reload();
};

function SwitchTime() {
  if (time.value == 'Day') {
    time.value = 'Night';

  } else {
    time.value = 'Day';
  };

  SwitchBackground();
};

function SwitchSeason() {
  if (season.value == 'Summer') {
    season.value = 'Winter';

  } else {
    season.value = 'Summer';
  };

  SwitchBackground();
};

function SwitchBackground() {
  switch (`${season.value} ${time.value}`) {
    case 'Summer Day':
      Image((data) => {
        bg.value = data[0];
        fireflies.Stop();
        snowfall.Stop();
      }, 242);
      break;
    
    case 'Summer Night':
      Image((data) => {
        bg.value = data[0];
        fireflies.Play();
        snowfall.Stop();
      }, 332);
      break;

    case 'Winter Day':
      Image((data) => {
        bg.value = data[0];
        fireflies.Stop();
        snowfall.Stop();
      }, 841);
      break;

    case 'Winter Night':
      Image((data) => {
        bg.value = data[0];
        fireflies.Stop();
        snowfall.Play();
      }, 842);
      break;
  };
};

function MoveBackground(e={}) {
  const background = document.getElementById('bg');
  const parallaxAmount = 100;
  let yep = false;

  if (e.detail == undefined) {
    e.clientX = parseFloat(sessionStorage.getItem('mouseX'));
    e.clientY = parseFloat(sessionStorage.getItem('mouseY'));
  };

  if (!touch) {
    background.style.left = `${-parallaxAmount-(e.clientX/window.innerWidth*parallaxAmount-parallaxAmount/2)}px`;
    background.style.top = `${-parallaxAmount-(e.clientY/window.innerHeight*parallaxAmount-parallaxAmount/2)}px`;
    background.style.right = `${-parallaxAmount+(e.clientX/window.innerWidth*parallaxAmount-parallaxAmount/2)}px`;
    background.style.bottom = `${-parallaxAmount+(e.clientY/window.innerHeight*parallaxAmount-parallaxAmount/2)}px`;

  } else {
    background.style.left = '';
    background.style.top = '';
    background.style.right = '';
    background.style.bottom = '';
  };
};

</script>
<template>
  <div class="cover" id="bg" :style="bg ? `background-image: url(${bg});` : ''">
    <canvas id="fg-canvas" />
  </div>
  <div class="cover" id="fg" />
  <div v-if="!isLoadingMeta">
    <div id="mainwrapper" :style="isLoading ? 'display:none;' : ''">
      <header>
        <nav :class="mobile ? 'nav-mobile' : ''">
          <RouterLink to="/" onclick="location.reload();"><img id="logo" :src="logo" height="50px" /></RouterLink>
          <div class="nav-btnwrap"><RouterLink class="nav-button" to="/">{{translations.data['homebtn'][cookies['lang']]}}</RouterLink></div>
          <div class="nav-btnwrap"><RouterLink class="nav-button" to="/activities">{{translations.data['activitiesbtn'][cookies['lang']]}}</RouterLink></div>
          <div class="nav-btnwrap"><RouterLink class="nav-button" to="/live">{{translations.data['livebtn'][cookies['lang']]}}</RouterLink></div>
          <div id="lang-picker">
            <img @click="SwitchLang('en')" :src="en" alt="en" title="English" class="flag-icon">
            <img @click="SwitchLang('sv')" :src="sv" alt="sv" title="Svenska" class="flag-icon">
            <img @click="SwitchLang('de')" :src="de" alt="de" title="Deutch" class="flag-icon">
            <img @click="SwitchLang('fi')" :src="fi" alt="fi" title="Suomi" class="flag-icon">
          </div>  
        </nav>
      </header>
      <RouterView />
    </div>
    <div v-if="isLoading">
      <div class="cover" id="loading-cover"><img height=100em src="/src/assets/Anisheep.gif"></div>
    </div>
  </div>
  <div style="position:fixed; top:0; left:0;">
    <button class="tempbtn" @click="SwitchTime()">Time: {{time}}</button>
    <button class="tempbtn" @click="SwitchSeason()">Season: {{season}}</button>
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

#loading-cover {
  top: 50%;
  left: 50%;
  width: fit-content;
  height: fit-content;
  transform: translate(-50%, -50%);
}

nav {
  padding: 0.5em;
  display: flex;
  flex-wrap: wrap;
  border-radius: 0.5em;
  border-bottom: 0.25em solid white;
  margin-bottom: 1.5em;
  align-items: center;
  justify-content: center;
}

.nav-mobile > * {
  flex-basis: 100%;
  margin: 0;
  margin-top: 0.125em;
  margin-bottom: 0.125em;
  text-align: center;
}

.nav-btnwrap {
  margin: 0.5em;
  flex-basis: unset;
}

.nav-button {
  font-size: 2em;
  color: white;
  text-decoration: none;
  transition: transform 0.125s ease-in-out;
}

.nav-button:hover {
  text-decoration: underline;
  transform: scale(105%);
}

#lang-picker {
  padding: 0.5em;
  margin-left: auto;
}

.flag-icon {
  height: 3em;
  margin: 0.25em;
  width: auto;
  transition: transform 0.125s ease-in-out;
}

.flag-icon:hover {
  transform: scale(105%);
}

.box {
  border-radius: 0.5em;
  padding: 1em;
  margin: 0.25em;
  font-size: x-large;
  background-color: hsla(0, 0%, 50%, 0.5);
  border: 0.175em solid hsl(0, 0%, 100%);
}

#mainwrapper {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  max-width: 1280px;
}

.content {
  position: relative;
  color: white;
  overflow: hidden;
}

#logo {
  transition: transform 0.125s ease-in-out;
  margin: 0.5em;
}

#logo:hover {
  transform: scale(105%);
}

.tempbtn {
  padding: 0.25em;
  border: 0;
}
</style>