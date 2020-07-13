<template>
  <div v-if="fetchResult">
    <h3>Characters also from this episode</h3>
    <ul>
      <li v-for="character in fetchResult" :key="character.id">
        <CharacterCard :character="character" :imgSize="150" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import VueWithFetchHelpers from '@/mixins/VueWithFetchHelpers.vue';
import { RnmApiResponse } from '@/types/Interfaces';
import { PropType } from 'vue';
import CharacterCard from './CharacterCard.vue';

const SimilarCharacters = VueWithFetchHelpers.extend({
  name: 'SimilarCharacters',
  props: {
    episodeCharactersUrls: { type: Array as PropType<string[]>, required: true },
    characterId: Number,
  },
  components: {
    CharacterCard,
  },
  created() {
    const ids = this.filteredIds.toString();
    this.loading = true;
    this.fetchDataByUrl(`https://rickandmortyapi.com/api/character/${ids}`)
      .then((result) => {
        this.fetchResult = result;
        this.loading = false;
      })
      .catch((error) => {
        this.error = error.toString();
      });
  },
  computed: {
    /**
     * Getter that returns the Episode data from the fetchResult
     * or null if there is none.
     */
    characters(): RnmApiResponse | null {
      return this.fetchResult; // TODO
    },
    /**
     * Returns an array of character Ids (number) from the required episodeCharactersUrls prop.
     */
    characterIds(): number[] {
      const characterIds: number[] = [];
      this.episodeCharactersUrls.forEach((characterUrl: string) => {
        const id = characterUrl.split('/').pop();
        if (id) characterIds.push(parseInt(id, 10));
      });
      return characterIds;
    },
    /**
     * Returns the filtered list of character Ids, containing 3 Ids.
     * If ID passed as prop then it will filter it out of the list of IDs.
     * Then it will shuffle the array of IDs and then return 3 remaining.
     */
    filteredIds(): number[] {
      let filteredIds: number[] = this.characterId
        ? this.characterIds
        : this.characterIds.filter((id) => id !== this.characterId);
      if (this.characterIds.length <= 3) return this.characterIds;
      this.shuffleArray(filteredIds);
      filteredIds = filteredIds.splice(0, 3);
      return filteredIds;
    },
  },
  methods: {
    /**
     * Takes an array of any kind and reorders it using sort and Math.random.
     * @param arr An array of any kind.
     */
    shuffleArray(arr: unknown[]) {
      arr.sort(() => Math.random() - 0.5);
    },
  },
});
export default SimilarCharacters;
</script>

<style scoped lang="scss">
ul {
  display: flex;
  overflow: scroll;
  //TODO
}
ul li {
  list-style: none;
}
</style>
