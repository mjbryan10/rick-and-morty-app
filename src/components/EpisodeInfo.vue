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
     * Getter that returns the Episode data from the fetchResult
     * or null if there is none.
     */
    episode(): RnmApiResponse | null {
      return this.fetchResult;
    },
    charactersInEpisode(): string[] | null {
      if (!this.fetchResult) return null;
      return this.fetchResult.characters; // TODO
    },
  },
  created() {
    this.loading = true;
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
  /* margin: 1rem; */
  padding: 0.5rem;
  width: 100%;
  max-width: 300px;
  h3 {
    text-align: center;
  }
  p span {
    font-weight: bold;
  }
}
</style>
