<template>
  <CharactersResultPage
    v-if="characters && !this.$store.state.isLoading"
    :characters="characters"
  />
</template>

<script lang="ts">
import VueWithFetchHelpers from '@/mixins/VueWithFetchHelpers.vue';
import CharactersResultPage from '@/components/CharactersResultsPage.vue';
import { Character, CharactersAPIResponse } from '@/types/Interfaces';

interface State {
  fetchResult: CharactersAPIResponse | null;
}

const HomePageCharacters = VueWithFetchHelpers.extend({
  name: 'HomePageCharacters',

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
    this.loading = true;
    this.$store.commit('toggleIsLoading');
    this.fetchCharactersByPage()
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
  computed: {
    /**
     * Returns an array of 10 characters fetched from the API, or null if none.
     */
    characters(): Character[] | null {
      if (this.fetchResult) return this.fetchResult.results.splice(0, 10);
      return null;
    },
  },
});
export default HomePageCharacters;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
