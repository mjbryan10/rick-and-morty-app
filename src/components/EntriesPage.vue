<template>
  <div class="EntiresTopTen">
    <h1>{{ msg }}</h1>
    <Spinner v-if="isLoading" />
    <div v-else>
      <input type="text" v-model="searchVal" placeholder="Type to search" />
      <button @click="toggleAtoZ">Click me!</button>
      <ul>
        <li v-for="entry in filteredEntries" :key="entry.Link">{{ entry.API }}</li>
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
import { API, Entry } from '@/types/Interfaces';
import Spinner from './Spinner.vue';

interface State {
  allEntries: Entry[];
  showLess: boolean;
  listAtoZ: boolean;
  searchVal: string;
  isLoading: boolean;
  error: string;
}

const EntriesPage = Vue.extend({
  name: 'EntriesPage',
  props: {
    msg: String,
  },
  components: {
    Spinner,
  },
  data(): State {
    return {
      allEntries: [],
      showLess: true,
      listAtoZ: true,
      searchVal: '',
      isLoading: true,
      error: '',
    };
  },
  /**
   * On component created lifecycle, fetches the API data and populates data fields.
   */
  created() {
    this.isLoading = true;
    this.fetchAllEntries()
      .then((res) => {
        this.allEntries = res.entries;
        this.isLoading = false;
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
    filteredEntries(): Entry[] | [] {
      if (!this.allEntries.length) return [];

      let entries = [...this.allEntries];

      if (this.listAtoZ) entries.sort((a, b) => a.API.localeCompare(b.API));
      else entries.sort((a, b) => b.API.localeCompare(a.API));

      if (this.searchVal.length) {
        entries = entries.filter((entry) => {
          const title = entry.API.toLowerCase();
          return title.includes(this.searchVal.toLowerCase());
        });
      }
      if (this.showLess) entries = entries.splice(0, 10);
      return entries;
    },
    /**
     * A unique list, with no duplicates, of all the Categories listed on each API entry.
     * Arranged alphabetically AtoZ.
     */
    categories(): string[] | [] {
      if (!this.allEntries.length) return [];
      const categories = [...new Set(this.allEntries.map((entry) => entry.Category))];
      categories.sort((a, b) => a.localeCompare(b));
      return categories;
    },
  },
  methods: {
    /**
     * Async function that returns the API as a promise.
     * Returns an object with count as a number and all entries as an array of objects.
     */
    async fetchAllEntries(): Promise<API> {
      const response = await fetch('https://api.publicapis.org/entries');
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
export default EntriesPage;
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
