<template>
  <transition name="fade">
    <div
      class="profile-container"
      v-if="!this.$store.state.isLoading && character"
    >
      <h2>Characterdex entry: {{ character.id }}</h2>
      <CharacterCard
        class="profile-card character-card"
        :character="character"
      />
      <CharacterInfo
        class="profile-card character-info"
        :character="character"
      />
      <EpisodeInfo
        class="profile-card character-episode"
        v-if="character.episode.length"
        :url="character.episode[0]"
        :characterId="character.id"
      />
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
  max-width: 1200px;
  .character-info {
    margin: 1rem;
  }
}
.profile-card {
  width: 100%;
  max-width: 300px;
}
@media screen and (min-width: 800px) {
  .profile-container {
    margin: 0 auto;
    flex-flow: row wrap;
    justify-content: center;
    align-items: flex-start;
    h2 {
      display: block;
      width: 100%;
    }
    .character-info {
      margin: 0;
      height: 100%;
      flex-grow: 1;
      position: relative;
      margin-left: 50px;
      /* &::after {
        content: ' ';
        $size: 150px;
        display:block;
        position: absolute;
        margin-top:-200px;
        margin-left:-100px;
        height: $size;
        width: $size;
        z-index: -1;
        border: 5px dashed rgba(0, 0, 0, 0.267);
        border-radius: 100px;
        animation: spin infinite 20s;
      }
      */
      &::before {
        content: '';
        display: block;
        height: 10px;
        width: 150px;
        position: absolute;
        z-index: -1;
        background-color: rgba(0,0,0,0.5);
        margin-left: -100px;
        margin-top: 100px;
        animation: swell 5s ease 1s infinite;
      }
      &::after {
        content: '';
        display: block;
        width: 10px;
        height: 150px;
        position: absolute;
        z-index: -1;
        background-color: rgba(0,0,0,0.5);
        margin-left: 100px;
        margin-top: 100px;
        animation: swell 5s ease 1s infinite;
      }
    }
    .character-episode {
      min-width: 51%;
      width: 80%;
      max-width: 1200px;
    }
  }
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes swell {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
