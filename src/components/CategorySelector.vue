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

/**
 * Component that displays some possible categories from the Rick and Morty API.
 * Provides links to the relevant routes to render the chosen content.
 */
const CategorySelector = Vue.extend({
  name: 'CategorySelector',
});
export default CategorySelector;
</script>

<style scoped lang="scss">
.options-container {
  display: flex;
  flex-flow: column nowrap;
  a {
    margin: 0.5rem 1rem;
  }
}
@media screen and (min-width: 800px){
  .options-container {
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    max-width: 900px;
    margin: 0 auto;
    a {
      min-width: 300px;
      max-width: 400px;
    }
  }
}
</style>
