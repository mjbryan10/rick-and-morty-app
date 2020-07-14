<template>
  <transition name="fade">
    <div>
      <button class="sort-btn" @click="toggleAtoZ">
        Sort: <span :class="listingOrder">&darr;</span>
      </button>
      <ul>
        <li v-for="character in sortedCharacters" :key="character.id">
          <CharacterCard :character="character" />
        </li>
      </ul>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { Character } from '@/types/Interfaces';
import CharacterCard from '@/components/CharacterCard.vue';

interface State {
  listingOrder: string;
}

const CharactersResultsPage = Vue.extend({
  name: 'CharactersResultsPage',

  components: {
    CharacterCard,
  },
  data(): State {
    return {
      listingOrder: 'none',
    };
  },
  props: {
    characters: { type: Array as PropType<Character[]>, required: true },
  },
  computed: {
    /**
     * Returns a sorted array of Characters depending on the selected options.
     */
    sortedCharacters(): Character[] | [] {
      const charactersArray = [...this.characters];
      // Sort the array alphabetically/reverse alphabetically or not at all.
      if (this.listingOrder === 'AtoZ') {
        charactersArray.sort((a, b) => a.name.localeCompare(b.name));
      } else if (this.listingOrder === 'ZtoA') {
        charactersArray.sort((a, b) => b.name.localeCompare(a.name));
      } else return this.characters;

      return charactersArray;
    },
  },
  methods: {
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
export default CharactersResultsPage;
</script>

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
