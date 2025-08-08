import {defineStore} from 'pinia'

export const useArticleStore = defineStore('articles', {
    state: () => ({
        articles: [],
        loaded: false,
    }),
    actions: {
        async fetchArticles() {
            if (!this.loaded) {
                const res = await fetch(`http://localhost:9090/articles/recent`)
                this.articles = await res.json()
                this.loaded = true
            }
        }
    }
})