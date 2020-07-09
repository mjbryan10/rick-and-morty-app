<template>
  <div class="details">
    <h1>Randomizer</h1>
    <CharacterProfile v-if="randomId" :id="randomId" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CharacterProfile from '@/components/CharacterProfile.vue';
import { CharactersAPI } from '@/types/Interfaces';

interface State {
  randomId: number | null;
  totalCount: number;
}
const Randomizer = Vue.extend({
  name: 'Randomizer',
  components: {
    CharacterProfile,
  },
  data(): State {
    return {
      randomId: null,
      totalCount: 0,
    };
  },
  created() {
    this.populateRandomId();
  },
  methods: {
    /**
     * Fetches the total amount of results from the API,
     * then choses a random number from the count.
     * Ids are incrementally related to results count.
     */
    populateRandomId(): void {
      this.fetchCharacters()
        .then((result) => {
          const numOfCharacters = result.info.count;
          const randomNum = Math.floor(Math.random() * numOfCharacters);
          this.randomId = randomNum;
        })
        .catch((error) => console.error(error));
    },
    /**
     * Async function that returns the API result as a promise.
     * Returns an object containing result info and array of results (characters).
     */
    async fetchCharacters(pageNum?: number): Promise<CharactersAPI> {
      let uri = 'https://rickandmortyapi.com/api/character/';
      if (pageNum) uri += `?page=${pageNum}`;
      const response = await fetch(uri);
      return response.json();
    },
  },
});
export default Randomizer;
</script>
<style lang="scss">
h1 {
  font-family: 'get_schwifty';
}
</style>
