import {defineStore} from 'pinia'

const API_URL = 'http://localhost:9090'

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        username: null as string | null,
        email: null as string | null,
        //profilePicUrl: null as string | null,
    }),
    getters: {
        isLoggedIn: (state) => !!state.token,
    },
    actions: {
        login(token: string, username: string, email: string) {
            this.token = token
            this.username = username
            this.email = email
            //this.profilePicUrl = profilePicUrl
            localStorage.setItem('token', token)
        },
        logout() {
            this.token = null
            this.username = null
            this.email = null
            //this.profilePicUrl = null
            localStorage.removeItem('token')
        },
        async fetchCurrentUser() {
            if (!this.token) return
            try {
                const response = await fetch(`${API_URL}/me`, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                })
                if (!response.ok) throw new Error('Unable to fetch current user')
                const data = await response.json()
                this.username = data.username
                this.email = data.email
                //this.profilePicUrl = data.profilePicUrl
            } catch (err) {
                console.error(err)
                this.logout()
            }
        },
        async loginRequest(email: string, password: string) {
            const response = await fetch(`${API_URL}/authenticate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email, password}),
            })

            let data: any = {}
            try {
                const text = await response.text()
                if (text) data = JSON.parse(text)
            } catch (_) {
                // fallback: empty object
                data = {}
            }

            if(!response.ok) throw new Error(data.error || 'Unable to login')
            this.login(data.token, data.username, data.email)
            return data
        },
    },
})