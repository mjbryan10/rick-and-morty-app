<template>
  <div class="card-container" v-if="episode">
    <h3>First Appearance</h3>
    <p><span>{{ episode.episode }}: </span>{{ episode.name }}</p>
    <p><span>Aired: </span>{{ episode.air_date }}</p>
    <SimilarCharacters :episodeCharactersUrls="episode.characters" :characterId="characterId" />
  </div>
</template>

<script lang="ts">
import VueWithFetchHelpers from '@/mixins/VueWithFetchHelpers.vue';
import { RnmApiResponse, Episode } from '@/types/Interfaces';
import SimilarCharacters from './SimilarCharacters.vue';

const EpisodeInfo = VueWithFetchHelpers.extend({
  name: 'EpisodeInfo',
  props: {
    url: String,
    characterId: Number,
  },
  components: {
    SimilarCharacters,
  },
  computed: {
    /**
     * Returns the Episode data from the fetchResult
     * or null if there is none.
     */
    episode(): RnmApiResponse | null {
      return this.fetchResult;
    },
    /**
     * Returns an array of string URLs for the Rick and Morty API,
     * for each character that is also in this episode.
     */
    charactersInEpisode(): string[] | null {
      if (!this.fetchResult) return null;
      return this.fetchResult.characters;
    },
  },
  /**
   * Upon component creation, it will fetch an Episode from the API using
   * the url provided in the component props.
   *
   * If there is an error populates the error property appropiately.
   */
  created() {
    this.loading = true;
    this.error = '';
    this.fetchDataByUrl<Episode>(this.url)
      .then((result) => {
        this.fetchResult = result;
        this.loading = false;
      })
      .catch((error) => {
        this.error = error.toString();
      });
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
  h3, p {
    padding-left: 1em;
  }
  @media screen and (min-width: 805px) {
    h3, p {
      font-size: 130%;
    }
  }
}
</style>
