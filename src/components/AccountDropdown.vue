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
  isVisible.value = !isVisible.value
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
})

const authStore = useAuthStore()
const router = useRouter()

function toLogout() {
  authStore.logout()
  router.push('/').then(() => {
    window.scrollTo({top: 0, behavior: 'auto'})
  })
}

function toLogin() {
  router.push('/login')
}
</script>

<template>
  <div class="dropdown-active-account" ref="dropdownRef">
    <div class="user-wrapper">
      <img id="user-img" src="" v-if="authStore.isLoggedIn">
      <div id="name-options">
        <p id="username" v-if="authStore.isLoggedIn">{{ authStore.username }}</p>
        <p id="no-username" v-else @click="toggleList()">Not Logged In</p>
        <a v-if="authStore.isLoggedIn" @click.prevent="toggleList()">Options</a>
      </div>
    </div>
    <div class="dropdown">
      <ul class="menu" id="logged-in-dropdown-menu" v-if="authStore.isLoggedIn" :style="{ display: isVisible ? 'flex' : 'none' }">
        <li>
          <a href="#" @click.prevent="toLogout">Sign Out</a>
        </li>
      </ul>
      <ul class="menu" id="logged-out-dropdown-menu" v-else :style="{ display: isVisible ? 'flex' : 'none' }">
        <li>
          <a href="#" @click.prevent="toLogin">Sign In</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.dropdown-active-account {
  position: relative;
}

.user-wrapper {
  display: flex;
  flex-direction: row;
  border: solid 2px #9acd32;
  background-color: #333333;
  padding: 0.5rem 1rem 1rem;
  margin: 0;
  border-top: none;
  border-right: none;
  gap: 1rem;
  transition-property: background-color, border-color;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
}

.user-wrapper img {
  height: 3rem;
  width: 3rem;
  margin: 0 auto;
  padding: 0.5rem 0.5rem 0;
}

.user-wrapper p, .user-wrapper a {
  color: #ffffff;
  margin: 0 auto;
  padding: 0.5rem;
  font-size: 1rem;
  transition: color 0.1s ease-in-out;
}

.user-wrapper a, #username, #no-username {
  color: #ffffff;
  margin: 0 auto;
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  transition: color 0.1s ease-in-out;
}

.user-wrapper a:hover {
  cursor: pointer;
  color: #9acd32;
  transition: color 0.1s ease-in-out;
}

#no-username {
  text-decoration: underline;
}

#no-username:hover {
  cursor: pointer;
}

#name-options {
  display: flex;
  flex-direction: column;
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

.menu {
  top: 100%;
  left: 0;
  z-index: 1;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding: 0;
  list-style-type: none;
  border: solid 2px #9acd32; /*yellow green*/
  border-top: none;
  border-right: none;
  border-bottom-left-radius: 0.5rem;
  background-color: #333333;
}

.menu li p {
  margin: 0;
  font-size: 1rem;
}

.menu li {
  padding: 0.5rem 0.5rem;
}

.menu li a {
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  color: #90ee90; /*light green*/
}

.menu li a:hover {
  color: #ffff00;
}

</style>