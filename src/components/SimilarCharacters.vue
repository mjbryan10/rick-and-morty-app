<template>
  <div v-if="characters.length" class="similar-characters-container">
    <h4>Characters also from this episode:</h4>
    <Carousel
      :perPage="1"
      :paginationActiveColor="'#827b7f'"
      :paginationColor="'#c3bdba'"
      :perPageCustom="[[805, 3]]"
    >
      <Slide v-for="character in characters" :key="character.id">
        <CharacterCard
          :style="{ margin: '0 auto' }"
          :character="character"
          :imgSize="characterCardImgSize"
        />
      </Slide>
    </Carousel>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { Slide, Carousel } from 'vue-carousel'; // @see https://ssense.github.io/vue-carousel
import { Character } from '@/types/Interfaces';
import CharacterCard from './CharacterCard.vue';

/**
 * A vue component to render a carousel of characters that feature also in the
 * episode as the characterId passed in props.
 *
 * Carousel responsively shows all characters or operates as carousel depending on page size.
 * @props episodeCharactersUrls - The Urls of characters from a Rick and Morty episode.
 * @props characterId - The id of the character that will not be displayed.
 */
const SimilarCharacters = Vue.extend({
  name: 'SimilarCharacters',
  props: {
    episodeCharactersUrls: {
      type: Array as PropType<string[]>,
      required: true,
    },
    characterId: Number,
  },
  components: {
    CharacterCard,
    Carousel,
    Slide,
  },
  /**
   * Upon component creation fetches 3 characters that share an episode,
   * but are not the featured character, from the Rick and Morty Api.
   */
  created() {
    this.$store.dispatch(
      'similarCharacters/loadCharactersByIds',
      this.filteredIds,
    );
  },
  computed: {
    /**
     * Returns appropiate images size for characterCard depending on screen size.
     */
    characterCardImgSize(): number {
      return window.innerWidth < 300 ? 150 : 200;
    },
    /**
     * Getter that returns the characters array from the SimilarCharactersModule
     * within the vuex store.
     */
    characters(): Character[] | null {
      return this.$store.state.similarCharacters.results;
    },
    /**
     * Returns an array of character ids from the required episodeCharactersUrls prop.
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
     * Returns the filtered Array of character ids, containing 3 Ids.
     *
     * If a characterId is passed as prop, then it will filter it out of the list of IDs.
     *
     * Then it will shuffle the array of ids and then return 3.
     */
    filteredIds(): number[] {
      let filteredIds: number[] = this.characterId
        ? this.characterIds.filter((id) => id !== this.characterId)
        : this.characterIds;
      if (this.characterIds.length <= 3) return this.characterIds;
      this.shuffleArray(filteredIds);
      filteredIds = filteredIds.splice(0, 3);
      return filteredIds;
    },
  },
  methods: {
    /**
     * Takes an array of any kind and reorders it using Array.sort and Math.random.
     * Note: Mutates original array.
     * @param arr An array of unknown kind.
     */
    shuffleArray(arr: unknown[]) {
      arr.sort(() => Math.random() - 0.5);
    },
  },
});
export default SimilarCharacters;
</script>

<style scoped lang="scss">
.similar-characters-container {
  &::before {
    content: '';
    display: block;
    width: 60%;
    margin: 0 auto;
    border-top: 2px dashed rgba(0, 0, 0, 0.3);
  }
}
h4 {
  padding-left: 1em;
}
</style>
