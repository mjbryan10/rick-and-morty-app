<template>
  <div class="EntiresTopTen">
    <h1>{{ msg }}</h1>
    <Spinner v-if="loading" />
    <div v-else>
      <input type="text" v-model="searchVal" placeholder="Type to search" />
      <button @click="toggleAtoZ">Click me!</button>
      <ul>
        <li v-for="character in filteredResults" :key="character.id">
          <CharacterCard :character="character" />
        </li>
      </ul>
      <ul>
        <li v-for="category in categories" :key="category">{{ category }}</li>
      </ul>
    </div>
    <button @click="toggleShowMore">
      Show
      <span v-if="showLess">more</span>
      <span v-else>less</span>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { CharactersAPI, Character } from '@/types/Interfaces';
import CharacterCard from '@/components/CharacterCard.vue';
import Spinner from '@/components/Spinner.vue';

interface State {
  results: Character[];
  showLess: boolean;
  listAtoZ: boolean;
  searchVal: string;
  loading: boolean;
  error: string;
}

const CharacterDisplayCase = Vue.extend({
  name: 'CharacterDisplayCase',

  components: {
    Spinner,
    CharacterCard,
  },
  data(): State {
    return {
      results: [],
      showLess: true,
      listAtoZ: true,
      searchVal: '',
      loading: true,
      error: '',
    };
  },
  /**
   * On component created lifecycle, fetches the API data and populates data fields.
   */
  created() {
    this.loading = true;
    this.fetchCharacters()
      .then((res) => {
        this.results = res.results;
        this.loading = false;
      })
      .catch((error) => {
        this.error = error.toString();
      });
  },
  computed: {
    /**
     * If the allEntries field has value,
     * it will use the searchVal to filter the results, then if showLess is true it will
     * limit the array to 10;
     */
    filteredResults(): Character[] | [] {
      if (!this.results.length) return [];

      let entries = [...this.results];

      if (this.listAtoZ) entries.sort((a, b) => a.name.localeCompare(b.name));
      else entries.sort((a, b) => b.name.localeCompare(a.name));

      if (this.searchVal.length) {
        entries = entries.filter((entry) => {
          const title = entry.name.toLowerCase();
          return title.includes(this.searchVal.toLowerCase());
        });
      }
      if (this.showLess) entries = entries.splice(0, 10);
      return entries;
    },
    /**
     * A unique list, with no duplicates, of all the species listed on each API entry.
     * Arranged alphabetically AtoZ.
     */
    species(): string[] | [] {
      if (!this.results.length) return [];
      const species = [...new Set(this.results.map((entry) => entry.species))];
      species.sort((a, b) => a.localeCompare(b));
      return species;
    },
  },
  methods: {
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
    /**
     * Toggles the showLess data field.
     * Subsequently results in filteredEntries to include either up to 10 or all entries.
     */
    toggleShowMore(): void {
      this.showLess = !this.showLess;
    },
    /**
     * Toggles the filteredEntries listing to be alphabetically listed AtoZ or ZtoA.
     */
    toggleAtoZ(): void {
      this.listAtoZ = !this.listAtoZ;
    },
  },
});
export default CharacterDisplayCase;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
