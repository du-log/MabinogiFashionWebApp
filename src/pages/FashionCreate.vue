<script setup lang="ts">

</script>

<template>
  <h1>Create a New Fashion Look</h1>
<div id="main-container">
  <div id="info-container">
    <h1>Basic Information</h1>
    <div class="wrapper">
      <label>Fashion Name</label>
      <input type="text" id="name-area" name="fashionName" placeholder="Name your look here." required />
    </div>
    <div class="desc-wrapper">
      <label>Fashion Description</label>
      <textarea id="description-area" name="fashionDescription" placeholder="Describe your look here (Optional)." maxlength="250"/>
    </div>
  </div>
  <div id="button-container">
    <button>Clear All</button>
    <button>Submit</button>
  </div>
</div>
</template>

<style scoped>
#main-container h1 {
  color: #9acd32;
}
#main-container {
  border: #90ee90 2px solid;
  border-radius: 10px;
  background-color: #008000;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

#info-container {
  border: transparent 1px solid;
  border-radius: 5px;
  background-color: #333333;
  padding: 1rem;
}

#button-container {
  padding: 1rem;
  margin: 0 auto;
  display: flex;
  gap: 1rem;
}

.wrapper, .desc-wrapper {
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  gap: 0.5rem;
}

.wrapper, .desc-wrapper label {
  font-weight: bold;
  font-size: 1.1rem;
  color: #9acd32;
}

.wrapper input {
  height: 1.5rem;
  font-size: 1rem;
  width: 25%;
}

.desc-wrapper textarea {
  height: 5rem;
  width: 100%;
  font-size: 1rem;
  resize: none;
}
</style>