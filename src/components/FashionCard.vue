<script setup lang="ts">
</script>

<template>
<div class="card-body">
  <div class="card-info">
    <h3 id="design-title">Example Title</h3>
    <p id="designer-name">Example Name</p>
  </div>
  <img id="card-image" alt="" src=""/>
</div>
</template>

<style scoped>
.card-body {
  border: #00000025 solid 2px;
  border-radius: 5px;
  height: 400px;
  width: 250px;
  position: relative;
}

#card-image {
  background-color: #333333;
  height: -webkit-fill-available;
  width: -webkit-fill-available;
  margin: 0 auto;
  position: absolute;
  display: inline;
  z-index: -1;
}

.card-info {
  display: inline-flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  padding: 1rem 0;
  background-color: #00000025;
}

#design-title {
  padding: 0;
  margin: 0 1rem;
}

#designer-name {
  padding: 0;
  margin: 0 1rem;
}
</style>