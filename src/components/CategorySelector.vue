<template>
  <div>
    <h3>Status:</h3>
    <div class="options-container">
      <router-link class="app-btn" :to="'/characters/?status=Alive'">Living Characters</router-link>
      <router-link class="app-btn" :to="'/characters/?status=Dead'">Dead Characters</router-link>
      <router-link class="app-btn" :to="'/characters/?status=Unknown'"
        >Unknown status Characters</router-link
      >
    </div>
    <h3>Gender:</h3>
    <div class="options-container">
      <router-link class="app-btn" :to="'/characters/?gender=Male'">Male Characters</router-link>
      <router-link class="app-btn" :to="'/characters/?gender=Female'"
        >Female Characters</router-link
      >
      <router-link class="app-btn" :to="'/characters/?gender=Genderless'"
        >Genderless Characters</router-link
      >
      <router-link class="app-btn" :to="'/characters/?gender=Unknown'"
        >Unknown gender Characters</router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

const CategorySelector = Vue.extend({
  name: 'CategorySelector',
});
export default CategorySelector;
</script>

<style scoped lang="scss">
.options-container {
  a {
    margin: 0.5rem 1rem;
  }
}
</style>
