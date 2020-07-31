<template>
  <CharactersResultPage
    v-if="characters && !this.$store.state.isLoadingGlobal"
    :characters="characters"
  />
  <ErrorMessage v-else-if="this.error.length" />
</template>

<script lang="ts">
import Vue from 'vue';
import CharactersResultPage from '@/components/CharactersResultsPage.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import { Character } from '@/types/Interfaces';

/**
 * Vue component that displays the first 10 characters from the Rick and Morty API.
 */
const HomePageCharacters = Vue.extend({
  name: 'HomePageCharacters',
  components: {
    CharactersResultPage,
    ErrorMessage,
  },
  /**
   * On component created lifecycle, triggers characters vuex logic fetch first page of
   * characters and populate the state.
   */
  created() {
    this.$store.dispatch('characters/loadCharactersByPage');
  },
  computed: {
    /**
     * Returns an array of 10 characters fetched from the API, or null if none.
     */
    characters(): Character[] | null {
      const { results, error } = this.$store.state.characters;
      if (results && !error) {
        return results.splice(0, 10);
      }
      return null;
    },
    /**
     * Getter that returns the current error string from the characters store.
     */
    error() {
      return this.$store.state.characters.error;
    },
  },
});
export default HomePageCharacters;
</script>

<style scoped lang="scss"></style>
