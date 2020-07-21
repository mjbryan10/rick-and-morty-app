<template>
  <transition name="fade">
    <div v-if="!this.$store.state.isLoading">
      <CharactersResultPage
        v-if="characters && !this.$store.state.isLoading"
        :characters="characters"
        ref="characterResults"
      />
      <div v-if="nextUrl || prevUrl" class="pagination-controls">
        <button :disabled="!prevUrl" class="app-btn" @click="loadData(prevUrl)">Prev Page</button>
        <button :disabled="!nextUrl" class="app-btn" @click="loadData(nextUrl)">Next Page</button>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import VueWithFetchHelpers from '@/mixins/VueWithFetchHelpers.vue';
import CharactersResultPage from '@/components/CharactersResultsPage.vue';
import { Character, CharactersAPIResponse } from '@/types/Interfaces';

interface State {
  fetchResult: CharactersAPIResponse | null;
}

const CharactersByQueryParam = VueWithFetchHelpers.extend({
  name: 'CharactersByQueryParam',

  components: {
    CharactersResultPage,
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
     * @param url String value, should be the url of which to retrieve data from API
     */
    loadData(url: string) {
      this.loading = true;
      this.$store.commit('toggleIsLoading');
      this.fetchDataByUrl<CharactersAPIResponse>(url)
        .then((result) => {
          this.fetchResult = result;
          this.loading = false;
        })
        .catch((error) => {
          this.error = error.toString();
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
      let result = 'https://rickandmortyapi.com/api/character';
      const { query } = this.$route;
      if (Object.keys(query).length) result += '/?';
      Object.keys(query).forEach((key, index) => {
        if (index > 0) {
          result += '&';
        }
        result += `${key}=${query[key]}`;
      });
      return result;
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
