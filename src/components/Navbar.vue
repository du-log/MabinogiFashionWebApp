<script setup lang="ts">
import dropdown from './AccountDropdown.vue'
import { onMounted, onUnmounted } from 'vue'

const handleScroll = () => {
  const nav = document.querySelector('nav');
  if ( window.scrollY > 0 ) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>

  <nav>
    <div id="links">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="contact">Contact</router-link>
      <dropdown id="dropdown"/>
    </div>
  </nav>

</template>

<style scoped>

nav {
  border-top: solid;
  border-bottom: solid;
  border-width: 1px;
  border-color: #ffffff;
  background-color: #008000; /*green*/
  display: flex;
  justify-content: space-between;
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  overflow: visible;
  transition-property: background-color, border-color;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
}

nav.scrolled {
  background-color: #33333380;
  border-color: transparent;
  transition-property: background-color, border-color;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
  backdrop-filter: blur(5px);
}

#links {
  display: flex;
  align-items: center;
  background-color: transparent;
  color: white;
  padding: clamp(0.5rem, 5vw, 1rem) clamp(5rem, 10vw, 10rem);
  margin: 0 auto;
  gap: 2rem;
}

#dropdown {
  display: inline-block;
}

a {
  padding: 0.5rem 1rem;
  border-radius: 5px;

  color: #ffffff;
  font-weight: bold;
  font-size: clamp(0.5rem, 1.5vw, 1.5rem);
  text-decoration: none;
}

a:hover {
  background-color: #00000050;
}

a.router-link-exact-active {
  background-color: #333333;
}

</style>