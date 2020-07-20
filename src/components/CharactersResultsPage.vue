<template>
  <transition name="fade">
    <div>
      <label class="app-btn sort-btn">
        Sorted <span v-if="isAtoZ">A to Z</span><span v-else>Z to A</span>
        <input v-model="isAtoZ" type="checkbox" name="AtoZ-checkbox" class="hidden" />
      </label>
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
  isAtoZ: boolean;
}

const CharactersResultsPage = Vue.extend({
  name: 'CharactersResultsPage',

  components: {
    CharacterCard,
  },
  data(): State {
    return {
      listingOrder: 'AtoZ',
      isAtoZ: true,
    };
  },
  props: {
    characters: { type: Array as PropType<Character[]>, required: true },
  },
  computed: {
    /**
     * Returns a sorted array of Characters.
     *
     * Sorts alphabetically or reverse depending on isAtoZ property.
     */
    sortedCharacters(): Character[] | [] {
      const charactersArray = [...this.characters];
      if (this.isAtoZ) {
        charactersArray.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        charactersArray.sort((a, b) => b.name.localeCompare(a.name));
      }

      return charactersArray;
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
  margin: 8px 10px;
}
div,
ul {
  display: flex;
  flex-flow: column nowrap;
}
.sort-btn {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}
</style>
