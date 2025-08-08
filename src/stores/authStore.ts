import {defineStore} from 'pinia'

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        token: localStorage.getItem('token') || null,
    }),
    getters: {
        isLoggedIn: (state) => !!state.token,
    },
    actions: {
        login(token: string) {
            this.token = token
            localStorage.setItem('token', token)
        },
        logout() {
            this.token = null
            localStorage.removeItem('token')
        },
    },
})