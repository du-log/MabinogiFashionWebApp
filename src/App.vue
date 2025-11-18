<script setup>
import {computed} from "vue"
import {useRoute} from "vue-router"
import Navbar from "@/components/Navbar.vue"
import { onMounted } from 'vue'
import { useAuthStore } from "@/stores/authStore";

const route = useRoute()
const hideNavbar = computed(() => route.meta?.hideNavbar)
const authStore = useAuthStore()

onMounted(() => {
  if (authStore.token) {
    authStore.fetchCurrentUser()
  }
})
</script>
export default {
components: { Navbar }
<template>

  <div id="App">
    <Navbar v-if="!hideNavbar"/>
    <router-view/>
  </div>

</template>

<style scoped>

body {
  margin: 0 auto;
  padding: 0;
}

#App {
  padding-top: clamp(6rem, 5vw, 10rem);
}

</style>
