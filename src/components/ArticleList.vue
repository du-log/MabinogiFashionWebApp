<script setup>
import {onMounted, ref} from "vue";
import {useArticleStore} from "@/stores/articleStore";

const store = useArticleStore();
const articles = ref([])

onMounted(() => {
  try {
    store.fetchArticles()
  } catch (err) {
    console.error('Error', err)
  }
})
</script>

<template>

  <div class="container">
    <h1>Game News</h1>
    <ul v-if="store.articles.length">
      <li v-for="article in store.articles" :key="article.articleName">
        <a :href="article.articleLink" target="_blank">{{ article.articleName }}</a>
        <span>
          ({{ article.articleType }} - {{ article.postDate }})
        </span>
      </li>
    </ul>
    <a v-if="store.articles.length" href="https://www.nexon.com/mabinogi/news/all" target="_blank">See All</a>
    <p v-else>Loading articles...</p>
  </div>

</template>

<style scoped>

.container h1 {
  text-align: center;
  padding-bottom: 1rem;
  color: #FFF;
}

.container a {
  color: #FFF;
  text-decoration: none;
}

.container a:hover {
  text-decoration: underline;
}

.container {
  padding: 1rem;
  border-color: #FFF;
  border-style: solid;
  border-width: 1px;
  width: 380px;
}

</style>