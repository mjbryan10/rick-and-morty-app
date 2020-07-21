<template>
  <CharactersResultPage
    v-if="characters && !this.$store.state.isLoading"
    :characters="characters"
  />
  <ErrorMessage v-else-if="this.error.length" />
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
 * Vue component that displays the first 10 characters from the Rick and Morty API.
 */
const HomePageCharacters = VueWithFetchHelpers.extend({
  name: 'HomePageCharacters',

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
    this.error = '';
    this.$store.commit('toggleIsLoading');
    this.fetchCharactersByPage()
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
  computed: {
    /**
     * Returns an array of 10 characters fetched from the API, or null if none.
     */
    characters(): Character[] | null {
      if (this.fetchResult && !this.fetchResult.error) {
        return this.fetchResult.results.splice(0, 10);
      }
      return null;
    },
  },
});
export default HomePageCharacters;
</script>

<style scoped lang="scss"></style>
