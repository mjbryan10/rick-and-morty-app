<template>
  <transition name="fade">
    <div v-if="!this.$store.state.isLoading && characters">
      <CharactersResultPage :characters="characters" ref="characterResults" />
      <div v-if="nextUrl || prevUrl" class="pagination-controls">
        <button :disabled="!prevUrl" class="app-btn" @click="loadData(prevUrl)">
          Prev Page
        </button>
        <button :disabled="!nextUrl" class="app-btn" @click="loadData(nextUrl)">
          Next Page
        </button>
      </div>
    </div>
    <ErrorMessage v-else-if="this.error.length" />
  </transition>
</template>

<script lang="ts">
import VueWithFetchHelpers from '@/mixins/VueWithFetchHelpers.vue';
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
const CharactersByQueryParam = VueWithFetchHelpers.extend({
  name: 'CharactersByQueryParam',

  components: {
    CharactersResultPage,
    ErrorMessage,
  },
  data(): State {
    return {
      fetchResult: null,
    };
  },
  /**
   * On component created lifecycle, fetches the API data and populates data fields.
   */
  created() {
    const url = this.generateUrlByParam();
    this.loadData(url);
  },
  computed: {
    /**
     * Returns an array of 10 characters fetched from the database, or null if none.
     */
    characters(): Character[] | null {
      if (!this.fetchResult) return null;
      return this.fetchResult.results;
    },
    /**
     * Returns a string URL for the next array of characters.
     * Or null if there is none/no result.
     */
    nextUrl(): string | null {
      if (!this.fetchResult) return null;
      return this.fetchResult.info.next;
    },
    /**
     * Returns a string URL for the previous array of characters.
     * Or null if there is none/no result.
     */
    prevUrl(): string | null {
      if (!this.fetchResult) return null;
      return this.fetchResult.info.prev;
    },
  },
  methods: {
    /**
     * Attempts to fetch Data using the given url and then populates the fetchRsult
     * field with the result.
     *
     * Otherwise populates the error field with the error result stringified.
     *
     * @param {string} url The url of which to retrieve data from API
     */
    loadData(url: string) {
      this.error = '';
      this.$store.commit('toggleIsLoading');
      this.fetchDataByUrl<CharactersAPIResponse>(url)
        .then((result) => {
          if (result.error) throw new Error('invalid request');
          this.fetchResult = result;
          this.$store.commit('setServerStatus', 'OK');
        })
        .catch((error) => {
          this.error = error.toString();
          if (error.message === 'invalid request') {
            this.$store.commit('setServerStatus', 'warning');
          } else {
            this.$store.commit('setServerStatus', 'offline');
          }
        })
        .finally(() => {
          setTimeout(() => {
            this.$store.commit('toggleIsLoading');
          }, 1000);
        });
    },
    /**
     * Iterates through each query in the page route and generates the url to be used by loadData.
     *
     * If there are no queries, uses the default url for all characters.
     */
    generateUrlByParam(): string {
      let url = 'https://rickandmortyapi.com/api/character';
      const { query } = this.$route;
      if (Object.keys(query).length) url += '/?';
      Object.keys(query).forEach((key, index) => {
        if (index > 0) {
          url += '&';
        }
        url += `${key}=${query[key]}`;
      });
      return url;
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
