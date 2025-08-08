<script setup>
import {computed} from "vue"
import {useRoute} from "vue-router"
import Navbar from "./components/Navbar.vue"

const route = useRoute()
const hideNavbar = computed(() => route.meta?.hideNavbar)
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
