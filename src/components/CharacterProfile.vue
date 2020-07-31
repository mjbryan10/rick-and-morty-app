<template>
  <transition name="fade">
    <div
      class="profile-container"
      v-if="
        !this.$store.state.character.isLoading &&
          !this.$store.state.isLoadingGlobal &&
          character
      "
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
    <ErrorMessage v-else-if="this.$store.state.error.length" />
  </transition>
</template>

<script lang="ts">
import { Character, Episode } from '@/types/Interfaces';
import Vue from 'vue';
import CharacterCard from './CharacterCard.vue';
import EpisodeInfo from './EpisodeInfo.vue';
import CharacterInfo from './CharacterInfo.vue';
import ErrorMessage from './ErrorMessage.vue';

type ApiResponse = Character | Episode;

/**
 * A vue component for displaying all the information related to a Rick and Morty character,
 * after fetching it from the API.
 *
 * Displays the character's:
 * - image
 * - name
 * - details
 * - first episode info
 */
const CharacterProfile = Vue.extend({
  name: 'CharacterProfile',
  props: {
    id: [String, Number],
  },
  components: {
    EpisodeInfo,
    CharacterCard,
    CharacterInfo,
    ErrorMessage,
  },
  computed: {
    /**
     * Returns the properties and values of a character or null if there is none.
     */
    character(): Character | null {
      return this.$store.state.character.result || null;
      // return result ? result : null;
    },
  },
  /**
   * On created lifecycle triggers vuex store to retrieve character from database
   * and populate state.
   */
  created() {
    this.$store.dispatch('character/loadCharacterById', this.id);
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
@media screen and (min-width: 805px) {
  .profile-container {
    margin: 0 auto;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    h2 {
      display: block;
      width: 100%;
    }
    .character-card {
      margin-bottom: 8px;
    }
    .character-info {
      margin: 0;
      height: 100%;
      flex-grow: 1;
      position: relative;
      margin-left: 50px;
      max-width: 400px;

      /* Pipe effects to connect (visually) components */
      @mixin pipe {
        content: '';
        display: block;
        position: absolute;
        z-index: -1;
        background-color: rgba(0, 0, 0, 0.5);
        animation: pulse 5s ease 1s infinite;
      }
      &::before {
        @include pipe();
        height: 10px;
        width: 150px;
        margin-left: -100px;
        margin-top: 125px;
      }
      &::after {
        @include pipe();
        width: 10px;
        height: 150px;
        margin-left: 125px;
      }
      /* end */
    }
    .character-episode {
      min-width: 51%;
      width: 80%;
      max-width: 1200px;
    }
  }
}
/*
* Fades from opaque to transparent and back.
*/
@keyframes pulse {
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
