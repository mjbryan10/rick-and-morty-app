<template>
  <div class="card-container" v-if="episode">
    <h3>First Appearance</h3>
    <p>
      <span>{{ episode.episode }}: </span>{{ episode.name }}
    </p>
    <p><span>Aired: </span>{{ episode.air_date }}</p>
    <SimilarCharacters
      :episodeCharactersUrls="episode.characters"
      :characterId="characterId"
    />
  </div>
  <ErrorMessage v-else-if="this.error.length" class="card-container" />
</template>

<script lang="ts">
import Vue from 'vue';
import { Episode } from '@/types/Interfaces';
import SimilarCharacters from './SimilarCharacters.vue';
import ErrorMessage from './ErrorMessage.vue';

/**
 * Vue compoent that fetches and displays information regarding a specific episode
 * from the Rick and Morty API.
 *
 * @props url The string url link for which to retrieve the episode data.
 * @props characterId The numeric id for the character who is in the episode.
 * This is then passed to the `SimilarCharacters` component for filtering.
 */
const EpisodeInfo = Vue.extend({
  name: 'EpisodeInfo',
  props: {
    url: String,
    characterId: Number,
  },
  components: {
    SimilarCharacters,
    ErrorMessage,
  },
  computed: {
    /**
     * Returns the Episode data from the fetchResult
     * or null if there is none.
     */
    episode(): Episode | null {
      const { error, result } = this.$store.state.episode;
      return !error.length && result ? result : null;
    },
    /**
     * Getter that returns the error field from the episode store.
     */
    error(): string {
      return this.$store.state.episode.error;
    },
  },
  /**
   * Upon component creation, it will fetch an Episode from the API using
   * the url provided in the component props.
   *
   * If there is an error populates the error property appropiately.
   */
  created() {
    this.$store.dispatch('episode/loadEpisode', this.url);
  },
});
export default EpisodeInfo;
</script>

<style scoped lang="scss">
.card-container {
  display: block;
  background-color: #f5f5f5;
  color: inherit;
  border-radius: 5px;
  border: 2px solid black;
  text-align: left;
  padding: 0.5rem;
  width: 100%;
  max-width: 300px;
  padding-bottom: 1em;
  h3 {
    text-align: center;
  }
  p span {
    font-weight: bold;
  }
  h3,
  p {
    padding-left: 1em;
  }
  @media screen and (min-width: 805px) {
    h3,
    p {
      font-size: 130%;
    }
  }
}
</style>
