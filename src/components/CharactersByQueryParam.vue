<template>
  <div>
    <CharactersResultPage
      v-if="characters && !this.$store.state.isLoading"
      :characters="characters"
    />
    <div class="pagination-controls">
      <button :disabled="!prevUrl" class="app-btn" @click="loadData(prevUrl)">Prev Page</button>
      <button v-if="nextUrl" class="app-btn" @click="loadData(nextUrl)">Next Page</button>
    </div>
  </div>
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
    nextUrl(): string | null {
      if (!this.fetchResult) return null;
      return this.fetchResult.info.next;
    },
    prevUrl(): string | null {
      if (!this.fetchResult) return null;
      return this.fetchResult.info.prev;
    },
  },
  methods: {
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
    generateUrlByParam(): string {
      let result = 'https://rickandmortyapi.com/api/character';
      const { query } = this.$route;
      if (Object.keys(query).length) result += '/?';
      Object.keys(query).forEach((key) => {
        result += `${key}=${query[key]}`;
      });
      console.log('generateUrlByParam -> result', result);
      return result;
    },
  },
});
export default CharactersByQueryParam;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
div {
  position: relative;
}
.pagination-controls{
  /* position: absolute; */
  top: 150px;
  display: flex;
  margin: 0 10%;
  width: 80%;
  justify-content: space-between;
}
</style>
