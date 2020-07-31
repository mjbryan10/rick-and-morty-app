<template>
  <transition name="fade">
    <div
      v-if="
        (!this.$store.state.isLoadingGlobal &&
          !this.$store.state.characters.isLoading) &&
          characters
      "
    >
      <CharactersResultPage :characters="characters" ref="characterResults" />
      <div v-if="nextUrl || prevUrl" class="pagination-controls">
        <button
          :disabled="!prevUrl"
          class="app-btn"
          @click="loadPageData(prevUrl)"
        >
          Prev Page
        </button>
        <button
          :disabled="!nextUrl"
          class="app-btn"
          @click="loadPageData(nextUrl)"
        >
          Next Page
        </button>
      </div>
    </div>
    <ErrorMessage v-else-if="this.error.length" />
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';
import CharactersResultPage from '@/components/CharactersResultsPage.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import { Character, CharactersAPIResponse } from '@/types/Interfaces';

/** Local state for the component */
interface State {
  fetchResult: CharactersAPIResponse | null;
}

/**
 * Vue component that fetches  and displays characters from the Rick and Morty API that match
 * the query parameters in the url.
 */
const CharactersByQueryParam = Vue.extend({
  name: 'CharactersByQueryParam',

  components: {
    CharactersResultPage,
    ErrorMessage,
  },
  /**
   * On component created lifecycle, fetches the API data and populates data fields.
   */
  created() {
    this.$store.dispatch('characters/loadCharactersByQuery', this.$route.query);
  },
  computed: {
    /**
     * Returns an array of 10 characters fetched from the database, or null if none.
     */
    characters(): Character[] | null {
      if (!this.$store.state.characters.results) return null;
      return this.$store.state.characters.results;
    },
    /**
     * Returns a string URL for the next array of characters.
     * Or null if there is none/no result.
     */
    nextUrl(): string | null {
      if (!this.$store.state.characters.info) return null;
      return this.$store.state.characters.info.next;
    },
    /**
     * Returns a string URL for the previous array of characters.
     * Or null if there is none/no result.
     */
    prevUrl(): string | null {
      if (!this.$store.state.characters.info) return null;
      return this.$store.state.characters.info.prev;
    },
    /**
     * Returns the string error from the store for characters
     */
    error(): string | null {
      if (!this.$store.state.characters.error) return '';
      return this.$store.state.characters.error;
    },
  },
  methods: {
    loadPageData(url: string) {
      this.$store.dispatch('characters/loadCharactersByUrl', url);
    },
  },
});
export default CharactersByQueryParam;
</script>

<style scoped lang="scss">
.pagination-controls {
  display: flex;
  margin: 0 auto;
  width: 80%;
  max-width: 600px;
  justify-content: space-between;
}
</style>
