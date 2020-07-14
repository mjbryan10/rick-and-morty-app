<template>
  <transition name="fade">
    <div class="profile-container" v-if="!this.$store.state.isLoading && character">
      <h2>Characterdex entry: {{ character.id }}</h2>
      <CharacterCard class="profile-card" :character="character" />
      <CharacterInfo class="profile-card" :character="character" />
      <div class="profile-card">
        <EpisodeInfo
          v-if="character.episode.length"
          :url="character.episode[0]"
          :characterId="character.id"
        />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Character, Episode, RnmApiResponse } from '@/types/Interfaces';
import VueWithFetchHelpers from '@/mixins/VueWithFetchHelpers.vue';
import CharacterCard from './CharacterCard.vue';
import EpisodeInfo from './EpisodeInfo.vue';
import CharacterInfo from './CharacterInfo.vue';

type ApiResponse = Character | Episode;
const CharacterProfile = VueWithFetchHelpers.extend({
  name: 'CharacterProfile',
  props: {
    id: [String, Number],
  },
  components: {
    EpisodeInfo,
    CharacterCard,
    CharacterInfo,
  },
  computed: {
    /**
     * Returns the properties and values of a character or null if there is none;
     */
    character(): RnmApiResponse | null {
      if (this.fetchResult) {
        return this.fetchResult;
      }
      return null;
    },
  },
  /**
   * Function triggers on created lifecycle.
   * Fetches a character by Id and populates the fetchResult data field.
   */
  created() {
    this.$store.commit('toggleIsLoading');
    this.fetchCharacterById(this.id)
      .then((result) => {
        this.fetchResult = result;
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
});
export default CharacterProfile;
</script>

<style scoped lang="scss">
.profile-container {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}
.profile-card {
  width: 300px;
}
</style>
