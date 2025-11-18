<script setup lang="ts">
import dropdown from './AccountDropdown.vue'
import {useAuthStore} from '@/stores/authStore'
import {onMounted, onUnmounted, ref} from 'vue'

const isVisible = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const handleScroll = () => {
  const nav = document.querySelector('nav')
  if (window.scrollY > 0) {
    nav.classList.add('scrolled')
  } else {
    nav.classList.remove('scrolled')
  }
};

function handleOutsideClick(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isVisible.value = false
  }
}

function toggleList() {
  isVisible.value = !isVisible.value
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', handleOutsideClick)
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleOutsideClick)
});

const authStore = useAuthStore();
</script>

<template>

  <nav>
    <dropdown id="dropdown"/>
    <div id="main" >
      <div id="links">
        <router-link to="/">Home</router-link>
        <a id="fashion-atr" ref="dropdownRef" @click.prevent="toggleList()">Fashion</a>
        <router-link to="about">About</router-link>
        <router-link to="contact">Contact</router-link>
      </div>
      <div id="dropdown-nav" :style="{ display: isVisible ? 'flex' : 'none' }">
        <router-link to="fashion">Eternity Fashion</router-link>
        <router-link to="fashion">Mobile Fashion</router-link>
      </div>
    </div>
  </nav>

</template>

<style scoped>

nav {
  background-color: #008000; /*green*/
  display: flex;
  justify-content: center;
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  overflow: visible;
  transition-property: background-color, border-color;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
  z-index: 1;
}

nav.scrolled {
  background-color: #33333380;
  border-color: transparent;
  transition-property: background-color, border-color;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
  backdrop-filter: blur(5px);
}

#main {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
}

#links {
  display: flex;
  position: relative;
  align-items: center;
  background-color: transparent;
  color: white;
  padding: 0.5rem;
  margin: 0 auto;
  gap: 2rem;
  z-index: 1;
}

#dropdown {
  position: absolute;
  top: 0;
  right: 0;
}

a {
  padding: 0.5rem 1rem;
  border-radius: 5px;

  color: #ffffff;
  font-weight: bold;
  font-size: 1rem;
  text-decoration: none;
}

a:hover {
  background-color: #00000050;
}

a.router-link-exact-active {
  background-color: #333333;
}

#dropdown-nav {
  z-index: -1;
  display: flex;
  flex-direction: row;
  top: 100%;
  width: 100%;
  position: absolute;
  margin: 0 auto;
  padding: 0.5rem;
  background-color: #575757;
  border: solid 2px #9acd32;
  border-top: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

#dropdown-nav a {
  margin: 0 auto;
  padding: 0.5rem;
  font-weight: bold;
  font-size: 1rem;
  color: #ffffff; /*light green*/
}

#fashion-atr:hover {
  cursor: pointer;
}

</style>