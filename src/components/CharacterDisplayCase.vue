<template>
  <div class="EntiresTopTen">
    <div v-if="fetchResult && !this.$store.state.isLoading" class="fade-in">
      <button class="sort-btn" @click="toggleAtoZ">
        Sort: <span :class="listingOrder">&darr;</span>
      </button>
      <ul>
        <li v-for="character in filteredResults" :key="character.id">
          <CharacterCard :character="character" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import VueWithFetchHelpers from '@/mixins/VueWithFetchHelpers.vue';
import { Character, CharactersAPIResponse } from '@/types/Interfaces';
import CharacterCard from '@/components/CharacterCard.vue';

interface State {
  fetchResult: CharactersAPIResponse | null;
  showLess: boolean;
  listingOrder: string;
}

const CharacterDisplayCase = VueWithFetchHelpers.extend({
  name: 'CharacterDisplayCase',

  components: {
    CharacterCard,
  },
  data(): State {
    return {
      fetchResult: null,
      showLess: true,
      listingOrder: 'none',
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
    characters(): Character[] | null {
      if (this.fetchResult) return this.fetchResult.results;
      return null;
    },
    /**
     * If the allEntries field has value,
     * it will use the searchVal to filter the results, then if showLess is true it will
     * limit the array to 10;
     */
    filteredResults(): Character[] | [] {
      // If there are no characters, return empty array
      if (!this.characters) return [];

      // Creates a new array which can be mutated.
      let charactersArray = [...this.characters];

      // Sort the array alphabetically(or reverse) if option has been selected
      if (this.listingOrder === 'AtoZ') {
        charactersArray.sort((a, b) => a.name.localeCompare(b.name));
      } else if (this.listingOrder === 'ZtoA') {
        charactersArray.sort((a, b) => b.name.localeCompare(a.name));
      }
      // Reduces array length to 10, unless show more has been clicked.
      if (this.showLess) charactersArray = charactersArray.splice(0, 10);

      return charactersArray;
    },
  },
  methods: {
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
      switch (this.listingOrder) {
        case 'AtoZ':
          this.listingOrder = 'ZtoA';
          return;
        case 'ZtoA':
          this.listingOrder = 'none';
          return;
        default:
          this.listingOrder = 'AtoZ';
      }
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
.sort-btn {
  span {
    display: block;
    transition: 0.2s ease-out;
    &.ZtoA {
      transform: rotate(-180deg);
    }
    &.none {
      opacity: 0;
    }
  }
}
.loader-btn {
  border-radius: 10px;
}
</style>
