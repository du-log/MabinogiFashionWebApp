import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";

import Home from './pages/Home.vue'
import About from './pages/About.vue'
import Contact from './pages/Contact.vue'
import Login from './pages/LoginPage.vue'
import Register from './pages/AccountRegistration.vue'

const routes = [
    {path: '/', component: Home, meta: {hideNavbar: false}},
    {path: '/about', component: About},
    {path: '/contact', component: Contact},
    {path: '/login', component: Login, meta: {hideNavbar: true}},
    {path: '/register', component: Register, meta: {hideNavbar: true}},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App).use(createPinia()).use(router).mount('#app')
