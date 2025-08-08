<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue';
import {useAuthStore} from '@/stores/authStore'
import {useRouter} from 'vue-router'

const isVisible = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

function handleOutsideClick(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isVisible.value = false
  }
}

function toggleList() {
  isVisible.value = !isVisible.value;
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
})

const authStore = useAuthStore();
const router = useRouter();

function toLogout() {
  authStore.logout()
  window.location.reload()
}

function toLogin() {
  router.push('/login')
}
</script>

<template>
  <div class="dropdown-active-account" ref="dropdownRef">
    <button @click="toggleList()">
      <img id="symbol" src="/celtic-knot.png" alt=""/>
    </button>
    <div class="dropdown">
      <ul id="dropdown-menu" :style="{ display: isVisible ? 'flex' : 'none' }">
        <li id="logged" v-if="authStore.isLoggedIn"><p>Logged in</p></li>
        <li v-if="authStore.isLoggedIn">
          <a href="#" @click.prevent="toLogout">Sign Out</a>
        </li>
        <li v-else>
          <a href="#" @click.prevent="toLogin">Sign In</a>
        </li>
        <li>
          <a href="#">Options</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.dropdown-active-account {
  position:relative;
  display: inline-block;
}

button {
  background: none;
  border: none;
  position: relative;
  z-index: 2;
}

button:hover {
  cursor: pointer;
}

#symbol {
  width: 2rem;
  height: 2rem;
  margin: 0 auto;
}

#symbol:hover {
  filter: opacity(0.5) drop-shadow(0 0 0 #90ee90) saturate(1000%);
  transition-duration: 0.2s;
}

#dropdown-menu {
  top: 100%;
  left: 0;
  z-index: 1;
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 10rem;
  margin: 0 auto;
  padding: 0;
  list-style-type: none;
  border: solid 2px #9acd32; /*yellow green*/
  border-radius: 0.5rem;
  background-color: #575757;
}

#dropdown-menu li p {
  margin: 0;
  font-size: clamp(0.5rem, 1.5vw, 1.5rem);
}

#logged:hover {
  background-color: transparent !important;
  cursor: default;
}

#dropdown-menu li {
  padding: 0.5rem 0.5rem;
}

#dropdown-menu li:hover {
  background-color: #ffffff50;
}

#dropdown-menu li a {
  text-decoration: none;
  font-size: clamp(0.5rem, 1.5vw, 1.5rem);
  color: #90ee90; /*light green*/
}

</style>